
import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, RefreshCw } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState(800000);
  const [age, setAge] = useState(35);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState(150000);
  const [taxResult, setTaxResult] = useState({
    oldRegime: {
      taxableIncome: 0,
      taxAmount: 0,
      effectiveTaxRate: 0,
      inHandIncome: 0,
      breakup: [] as { name: string; value: number; color: string }[]
    },
    newRegime: {
      taxableIncome: 0,
      taxAmount: 0,
      effectiveTaxRate: 0,
      inHandIncome: 0,
      breakup: [] as { name: string; value: number; color: string }[]
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateTax = () => {
    // Calculate tax under old regime
    let taxableIncomeOld = Math.max(0, income - deductions);
    let taxAmountOld = 0;
    
    if (taxableIncomeOld <= 250000) {
      taxAmountOld = 0;
    } else if (taxableIncomeOld <= 500000) {
      taxAmountOld = (taxableIncomeOld - 250000) * 0.05;
    } else if (taxableIncomeOld <= 1000000) {
      taxAmountOld = 12500 + (taxableIncomeOld - 500000) * 0.2;
    } else {
      taxAmountOld = 112500 + (taxableIncomeOld - 1000000) * 0.3;
    }
    
    // Apply age-based exemption for old regime
    if (age >= 60 && age < 80) {
      if (taxableIncomeOld <= 300000) {
        taxAmountOld = 0;
      } else if (taxableIncomeOld <= 500000) {
        taxAmountOld = (taxableIncomeOld - 300000) * 0.05;
      }
    } else if (age >= 80) {
      if (taxableIncomeOld <= 500000) {
        taxAmountOld = 0;
      }
    }
    
    // Calculate tax under new regime
    let taxableIncomeNew = income;
    let taxAmountNew = 0;
    
    if (taxableIncomeNew <= 300000) {
      taxAmountNew = 0;
    } else if (taxableIncomeNew <= 600000) {
      taxAmountNew = (taxableIncomeNew - 300000) * 0.05;
    } else if (taxableIncomeNew <= 900000) {
      taxAmountNew = 15000 + (taxableIncomeNew - 600000) * 0.1;
    } else if (taxableIncomeNew <= 1200000) {
      taxAmountNew = 45000 + (taxableIncomeNew - 900000) * 0.15;
    } else if (taxableIncomeNew <= 1500000) {
      taxAmountNew = 90000 + (taxableIncomeNew - 1200000) * 0.2;
    } else {
      taxAmountNew = 150000 + (taxableIncomeNew - 1500000) * 0.3;
    }
    
    // Apply 4% cess on both
    const cessOld = taxAmountOld * 0.04;
    const cessNew = taxAmountNew * 0.04;
    
    taxAmountOld += cessOld;
    taxAmountNew += cessNew;
    
    const effectiveTaxRateOld = (taxAmountOld / income) * 100;
    const effectiveTaxRateNew = (taxAmountNew / income) * 100;
    
    const inHandIncomeOld = income - taxAmountOld;
    const inHandIncomeNew = income - taxAmountNew;
    
    // Calculate breakup for old regime
    const oldRegimeBreakup = [
      { name: 'Take Home', value: inHandIncomeOld, color: '#4ade80' },
      { name: 'Tax', value: taxAmountOld - cessOld, color: '#f87171' },
      { name: 'Cess', value: cessOld, color: '#fb923c' }
    ];
    
    // Calculate breakup for new regime
    const newRegimeBreakup = [
      { name: 'Take Home', value: inHandIncomeNew, color: '#4ade80' },
      { name: 'Tax', value: taxAmountNew - cessNew, color: '#f87171' },
      { name: 'Cess', value: cessNew, color: '#fb923c' }
    ];
    
    setTaxResult({
      oldRegime: {
        taxableIncome: taxableIncomeOld,
        taxAmount: taxAmountOld,
        effectiveTaxRate: effectiveTaxRateOld,
        inHandIncome: inHandIncomeOld,
        breakup: oldRegimeBreakup
      },
      newRegime: {
        taxableIncome: taxableIncomeNew,
        taxAmount: taxAmountNew,
        effectiveTaxRate: effectiveTaxRateNew,
        inHandIncome: inHandIncomeNew,
        breakup: newRegimeBreakup
      }
    });
  };

  useEffect(() => {
    calculateTax();
  }, [income, age, deductions]);

  const handleReset = () => {
    setIncome(800000);
    setAge(35);
    setDeductions(150000);
    setRegime('new');
  };

  // Get the current regime results
  const currentRegimeResults = regime === 'old' ? taxResult.oldRegime : taxResult.newRegime;
  const alternativeRegimeResults = regime === 'old' ? taxResult.newRegime : taxResult.oldRegime;
  
  // Determine if the current regime is better
  const isCurrentRegimeBetter = currentRegimeResults.inHandIncome >= alternativeRegimeResults.inHandIncome;

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Calculate your income tax liability under old and new tax regimes"
      icon={<Calculator className="h-6 w-6" />}
      calculatorType="tax"
    >
      <Tabs defaultValue={regime} onValueChange={(value) => setRegime(value as 'old' | 'new')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="new">New Tax Regime</TabsTrigger>
          <TabsTrigger value="old">Old Tax Regime</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Annual Income</label>
                <span className="text-sm font-bold">{formatCurrency(income)}</span>
              </div>
              <Slider 
                value={[income]} 
                min={300000} 
                max={5000000} 
                step={50000}
                onValueChange={(value) => setIncome(value[0])}
                className="bg-finance-green/10"
              />
              <Input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Age</label>
                <span className="text-sm font-bold">{age} years</span>
              </div>
              <Slider 
                value={[age]} 
                min={18} 
                max={100} 
                step={1}
                onValueChange={(value) => setAge(value[0])}
                className="bg-finance-green/10"
              />
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {regime === 'old' && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Deductions (Section 80C, etc.)</label>
                  <span className="text-sm font-bold">{formatCurrency(deductions)}</span>
                </div>
                <Slider 
                  value={[deductions]} 
                  min={0} 
                  max={250000} 
                  step={5000}
                  onValueChange={(value) => setDeductions(value[0])}
                  className="bg-finance-green/10"
                />
                <Input
                  type="number"
                  value={deductions}
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Values
            </Button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-finance-green/5 border-finance-green/20">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Take Home Income</div>
                  <div className="text-2xl font-bold text-finance-green">
                    {formatCurrency(currentRegimeResults.inHandIncome)}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Tax Amount</div>
                    <div className="text-lg font-bold text-finance-green">
                      {formatCurrency(currentRegimeResults.taxAmount)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Effective Tax Rate</div>
                    <div className="text-lg font-bold">
                      {currentRegimeResults.effectiveTaxRate.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="rounded-md border p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentRegimeResults.breakup}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {currentRegimeResults.breakup.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <Card className={isCurrentRegimeBetter ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
              <CardContent className="p-4">
                <p className="text-sm font-medium">
                  {isCurrentRegimeBetter 
                    ? `The ${regime === 'old' ? 'Old' : 'New'} Regime is better for you by ${formatCurrency(Math.abs(currentRegimeResults.inHandIncome - alternativeRegimeResults.inHandIncome))}`
                    : `The ${regime === 'old' ? 'New' : 'Old'} Regime might be better for you by ${formatCurrency(Math.abs(currentRegimeResults.inHandIncome - alternativeRegimeResults.inHandIncome))}`
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="text-lg font-medium text-amber-800 mb-2">How to use this calculator?</h3>
        <p className="text-sm text-amber-700">
          This Income Tax Calculator helps you compare your tax liability under both the old and new tax regimes in India. 
          Enter your annual income, age, and applicable deductions to see which regime offers better tax savings for your specific situation.
          The pie chart shows the breakdown of your income into tax components and take-home amount.
        </p>
      </div>
    </CalculatorLayout>
  );
};

export default IncomeTaxCalculator;
