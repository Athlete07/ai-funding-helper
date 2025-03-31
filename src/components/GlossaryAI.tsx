
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface GlossaryAIProps {
  glossaryTerms?: string[];
}

export const GlossaryAI: React.FC<GlossaryAIProps> = ({ glossaryTerms = [] }) => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    
    // Simulate AI response - in a real app, this would call an AI API
    setTimeout(() => {
      const responses = [
        `Based on your question about "${userQuery}", here's what I can tell you:\n\nThis term refers to a key financial concept that affects how individuals manage their money and make investment decisions. The principle behind it involves understanding risk, return, and how markets function over time.\n\nWould you like me to explain specific strategies related to this concept or provide some practical examples?`,
        `"${userQuery}" is an important concept in personal finance. It describes the relationship between income, expenses, and how financial decisions impact long-term wealth building.\n\nMany people misunderstand this concept, which can lead to suboptimal financial choices. Understanding it properly can help you make more informed decisions about savings, investments, and debt management.`,
        `Great question about "${userQuery}"!\n\nThis is a fundamental concept that relates to how money grows over time and how financial markets operate. The key principles include:\n\n1. Risk and reward tradeoffs\n2. Time value of money\n3. Diversification benefits\n\nUnderstanding these elements can significantly improve your financial outcomes.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-finance-green" />
          <h3 className="font-semibold text-lg">Ask FinAI</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Need help understanding a financial concept? Our AI assistant can provide simple explanations.
        </p>
        
        <div className="space-y-4">
          <Input
            placeholder="What financial term can I explain?"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiQuery()}
          />
          
          <Button 
            onClick={handleAiQuery} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⊚</span>
                Thinking...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Get Explanation
              </>
            )}
          </Button>
          
          {aiResponse && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <ScrollArea className="h-[200px]">
                <div className="prose prose-sm max-w-none">
                  {aiResponse.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "font-medium" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Suggested Questions:</h4>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => {
                  setUserQuery("What's the difference between a Roth IRA and Traditional IRA?");
                  handleAiQuery();
                }}
              >
                What's the difference between a Roth IRA and Traditional IRA?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => {
                  setUserQuery("Explain compound interest in simple terms");
                  handleAiQuery();
                }}
              >
                Explain compound interest in simple terms
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => {
                  setUserQuery("What's a good debt-to-income ratio?");
                  handleAiQuery();
                }}
              >
                What's a good debt-to-income ratio?
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
