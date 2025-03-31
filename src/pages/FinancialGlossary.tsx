
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, ArrowRight, MessageSquare, Bookmark, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { GlossaryAI } from '@/components/GlossaryAI';

// Define the glossary term type
interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'investing' | 'banking' | 'insurance' | 'taxes' | 'retirement' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
}

// Sample glossary data
const glossaryData: GlossaryTerm[] = [
  {
    id: '1',
    term: 'APR (Annual Percentage Rate)',
    definition: 'The yearly interest rate charged on borrowed money. This rate includes fees and other costs associated with making the loan. It helps consumers compare loan costs on an equitable basis.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '2',
    term: 'Asset Allocation',
    definition: 'The process of dividing investments among different kinds of assets, such as stocks, bonds, and cash, to optimize the risk/reward trade-off based on an individual's specific situation and goals.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '3',
    term: 'Bull Market',
    definition: 'A financial market in which prices are rising or expected to rise. This term is most often used to refer to the stock market but can be applied to anything that is traded, such as bonds, real estate, currencies, and commodities.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '4',
    term: 'Bear Market',
    definition: 'A market condition in which the prices of securities are falling, and widespread pessimism causes the negative sentiment to be self-sustaining. Generally, a bear market occurs when a broad market index falls by 20% or more over at least a two-month period.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '5',
    term: 'Compound Interest',
    definition: 'Interest calculated on the initial principal and also on the accumulated interest of previous periods. Compound interest can be thought of as "interest on interest," and will make a sum grow at a faster rate than simple interest.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '6',
    term: 'Diversification',
    definition: 'A risk management strategy that mixes a wide variety of investments within a portfolio. The rationale behind this technique is that a portfolio constructed of different kinds of assets will, on average, yield higher long-term returns and lower the risk of any individual holding or security.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '7',
    term: 'ETF (Exchange-Traded Fund)',
    definition: 'A type of investment fund and exchange-traded product, ETFs are traded on stock exchanges. They can be structured to track anything from the price of an individual commodity to a large and diverse collection of securities. ETFs are similar to mutual funds, except they can be bought and sold throughout the trading day like stocks.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '8',
    term: 'FICO Score',
    definition: 'A credit score created by the Fair Isaac Corporation. Lenders use borrowers\' FICO scores along with other details on borrowers\' credit reports to assess credit risk and determine whether to extend credit.',
    category: 'banking',
    level: 'beginner'
  },
  {
    id: '9',
    term: 'IRA (Individual Retirement Account)',
    definition: 'A tax-advantaged investing tool that individuals use to earmark funds for retirement savings. There are several types of IRAs: Traditional IRAs, Roth IRAs, SIMPLE IRAs, and SEP IRAs.',
    category: 'retirement',
    level: 'beginner'
  },
  {
    id: '10',
    term: 'Liquidity',
    definition: 'The degree to which an asset or security can be quickly bought or sold in the market without affecting the asset\'s price. Cash is considered the most liquid asset, while real estate, fine art, and collectibles are relatively illiquid.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '11',
    term: 'Mutual Fund',
    definition: 'An investment vehicle made up of a pool of funds collected from many investors for the purpose of investing in securities such as stocks, bonds, money market instruments, and other assets.',
    category: 'investing',
    level: 'beginner'
  },
  {
    id: '12',
    term: 'Net Worth',
    definition: 'The value of all assets, minus the total of all liabilities. Put another way, net worth is what is owned minus what is owed.',
    category: 'general',
    level: 'beginner'
  },
  {
    id: '13',
    term: 'P/E Ratio (Price-to-Earnings Ratio)',
    definition: 'A valuation ratio of a company\'s current share price compared to its per-share earnings. In general, a high P/E suggests that investors are expecting higher earnings growth in the future compared to companies with a lower P/E.',
    category: 'investing',
    level: 'advanced'
  },
  {
    id: '14',
    term: '401(k)',
    definition: 'A retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out. Taxes aren\'t paid until the money is withdrawn from the account.',
    category: 'retirement',
    level: 'beginner'
  },
  {
    id: '15',
    term: 'Tax Deduction',
    definition: 'An expense that can be subtracted from gross income to reduce the total amount of income subject to tax. Examples include mortgage interest, charitable donations, and certain business expenses.',
    category: 'taxes',
    level: 'beginner'
  },
  {
    id: '16',
    term: 'Term Life Insurance',
    definition: 'A type of life insurance that guarantees payment of a stated death benefit during a specified term. Once the term expires, the policyholder can either renew it for another term, convert the policy to permanent coverage, or allow the policy to terminate.',
    category: 'insurance',
    level: 'beginner'
  },
  {
    id: '17',
    term: 'Yield',
    definition: 'The income returned on an investment, such as the interest or dividends received from holding a particular security. The yield is usually expressed as an annual percentage rate based on the investment\'s cost, current market value, or face value.',
    category: 'investing',
    level: 'intermediate'
  },
  {
    id: '18',
    term: 'Zero-Based Budgeting',
    definition: 'A method of budgeting in which all expenses must be justified for each new period. The process of zero-based budgeting starts from a "zero base," and every function within an organization is analyzed for its needs and costs.',
    category: 'general',
    level: 'intermediate'
  },
  {
    id: '19',
    term: 'Amortization',
    definition: 'The paying off of debt with a fixed repayment schedule in regular installments over a period of time. Mortgage loans and car loans are examples of amortizing loans.',
    category: 'banking',
    level: 'intermediate'
  },
  {
    id: '20',
    term: 'Capital Gains',
    definition: 'An increase in the value of a capital asset when it\'s sold. When you sell the asset, the difference between the amount you paid for the asset and the amount you sold it for is the capital gain (or capital loss if you sold it for less than you paid).',
    category: 'taxes',
    level: 'intermediate'
  }
];

const FinancialGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [userQuery, setUserQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>([]);

  // Filter terms based on search, category, and letter
  const filteredTerms = glossaryData.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesLetter = selectedLetter === 'all' || term.term.charAt(0).toLowerCase() === selectedLetter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Sort terms alphabetically
  const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

  // Generate alphabet for filter
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Handle AI query submission
  const handleAiQuery = () => {
    if (!userQuery.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a financial term or question.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Find if the query matches any term
      const matchedTerm = glossaryData.find(
        term => term.term.toLowerCase().includes(userQuery.toLowerCase())
      );
      
      if (matchedTerm) {
        setAiResponse(`**${matchedTerm.term}**: ${matchedTerm.definition}\n\nWould you like to know more about related concepts like ${matchedTerm.category === 'investing' ? 'diversification or risk management' : matchedTerm.category === 'banking' ? 'interest rates or loans' : 'financial planning or budgeting'}?`);
      } else {
        setAiResponse(`Based on your query about "${userQuery}", I recommend exploring these financial concepts:\n\n1. If you're interested in investments, consider researching "Asset Allocation" and "Diversification"\n\n2. For personal finance management, "Budgeting" and "Emergency Fund" are essential concepts\n\n3. Tax-related terms like "Tax Deductions" and "Capital Gains" might be relevant if you're planning your taxes\n\nIs there a specific aspect of finance you'd like me to explain in more detail?`);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Handle bookmark toggling
  const toggleBookmark = (termId: string) => {
    setBookmarkedTerms(prev => 
      prev.includes(termId) 
        ? prev.filter(id => id !== termId) 
        : [...prev, termId]
    );
    
    toast({
      title: bookmarkedTerms.includes(termId) ? "Bookmark Removed" : "Bookmark Added",
      description: bookmarkedTerms.includes(termId) 
        ? "Term removed from your bookmarks" 
        : "Term added to your bookmarks for future reference",
    });
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Financial Glossary</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Demystifying financial jargon with straightforward definitions and AI-powered explanations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search financial terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
                  <TabsList className="grid grid-cols-3 sm:grid-cols-7">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="investing">Investing</TabsTrigger>
                    <TabsTrigger value="banking">Banking</TabsTrigger>
                    <TabsTrigger value="taxes">Taxes</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    <TabsTrigger value="retirement">Retirement</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant={selectedLetter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedLetter('all')}
                >
                  All
                </Button>
                {alphabet.map(letter => (
                  <Button 
                    key={letter} 
                    variant={selectedLetter === letter ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </Button>
                ))}
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-8">
                      {sortedTerms.length > 0 ? (
                        sortedTerms.map(term => (
                          <div key={term.id} className="pb-6 border-b last:border-0">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-finance-green">{term.term}</h3>
                              <button 
                                onClick={() => toggleBookmark(term.id)}
                                className="text-finance-green hover:text-finance-gold transition-colors"
                              >
                                <Bookmark 
                                  className={`h-5 w-5 ${bookmarkedTerms.includes(term.id) ? 'fill-finance-gold' : ''}`} 
                                />
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                              <span className={`kb-pill ${term.level === 'beginner' ? 'kb-pill-beginner' : term.level === 'intermediate' ? 'kb-pill-intermediate' : 'kb-pill-advanced'}`}>
                                {term.level.charAt(0).toUpperCase() + term.level.slice(1)}
                              </span>
                              <span className="kb-pill bg-blue-100 text-blue-800">
                                {term.category.charAt(0).toUpperCase() + term.category.slice(1)}
                              </span>
                            </div>
                            <p className="mt-2 text-muted-foreground">{term.definition}</p>
                            <Button variant="link" className="p-0 mt-2 text-finance-green">
                              Learn more <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-xl font-medium mb-2">No matching terms found</h3>
                          <p className="text-muted-foreground">
                            Try adjusting your search or filters to find what you're looking for.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <GlossaryAI glossaryTerms={sortedTerms.map(term => term.term)} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancialGlossary;
