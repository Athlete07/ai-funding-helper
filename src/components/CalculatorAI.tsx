
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface CalculatorAIProps {
  calculatorType: 'sip' | 'home-loan-emi' | 'retirement' | 'tax' | 'other';
  currentInputs?: Record<string, any>;
  onRecommendationApply?: (recommendation: any) => void;
}

export const CalculatorAI = ({ calculatorType, currentInputs, onRecommendationApply }: CalculatorAIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{sender: 'user' | 'ai', message: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // Get suggestions based on calculator type
  const getSuggestions = () => {
    switch (calculatorType) {
      case 'sip':
        return [
          "How do SIPs work?",
          "What's a good amount for monthly SIP?",
          "Explain power of compounding in SIP",
          "Is ₹5000 monthly SIP enough for retirement?",
        ];
      case 'home-loan-emi':
        return [
          "How is home loan EMI calculated?",
          "Should I opt for longer tenure to reduce EMI?",
          "How does prepayment affect home loan?",
          "Is 8% interest rate good for home loan?",
        ];
      case 'retirement':
        return [
          "How much corpus do I need for retirement?",
          "At what age should I start retirement planning?",
          "What's the 4% withdrawal rule?",
          "Are PPF and NPS good for retirement?",
        ];
      case 'tax':
        return [
          "What are the best tax-saving investments?",
          "How to optimize tax on capital gains?",
          "Explain the new tax regime benefits",
          "Tax implications of selling property",
        ];
      default:
        return [
          "Explain how this calculator works",
          "What factors impact the calculation?",
          "What's a good strategy for financial planning?",
          "Common mistakes to avoid in financial decisions",
        ];
    }
  };

  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      // Add initial AI message based on calculator type
      const welcomeMessages = {
        'sip': "Hi! I'm your SIP Calculator AI assistant. Ask me about systematic investment plans, expected returns, or how to maximize your investments.",
        'home-loan-emi': "Hello! I'm your Home Loan EMI assistant. Ask me about EMI calculations, loan tenures, interest rates, or prepayment strategies.",
        'retirement': "Welcome! I'm your Retirement Planning assistant. Ask me about retirement corpus calculation, investment strategies, or withdrawal plans.",
        'tax': "Hi there! I'm your Tax Calculator assistant. Ask me about tax saving investments, deductions, or optimizing your tax liability.",
        'other': "Hello! I'm your Finance AI assistant. Ask me about this calculator or any related financial questions."
      };
      
      setConversation([
        {
          sender: 'ai',
          message: welcomeMessages[calculatorType] || welcomeMessages.other
        }
      ]);
    }
  }, [isOpen, conversation.length, calculatorType]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setConversation([...conversation, { sender: 'user', message }]);
    setShowSuggestions(false);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      // Generate contextual responses based on calculator type and message content
      if (calculatorType === 'sip') {
        if (message.toLowerCase().includes('work')) {
          response = "SIP (Systematic Investment Plan) is a method to invest a fixed amount regularly (usually monthly) in mutual funds. It helps in rupee cost averaging and harnesses the power of compounding. Over time, even small amounts can grow significantly.";
        } else if (message.toLowerCase().includes('amount') || message.toLowerCase().includes('enough')) {
          response = "A good SIP amount depends on your financial goals and income. Financial advisors often recommend investing 20-30% of your income. For retirement specifically, start with at least ₹5,000 monthly and increase it by 10% annually to account for inflation.";
        } else if (message.toLowerCase().includes('compounding')) {
          response = "Compounding in SIPs works by reinvesting your returns to generate more returns. For example, if you invest ₹10,000 monthly for 20 years at 12% returns, you'd invest ₹24 lakhs but could get approximately ₹1 crore due to compounding. The longer your investment horizon, the more powerful compounding becomes.";
        } else {
          response = "SIPs are great for long-term wealth creation. The key advantages are disciplined investing, rupee cost averaging (buying more units when prices are low), and compounding benefits. Would you like me to recommend a SIP strategy based on your current inputs?";
        }
      } else if (calculatorType === 'home-loan-emi') {
        if (message.toLowerCase().includes('calculate')) {
          response = "Home loan EMI is calculated using the formula: EMI = P × r × (1 + r)^n ÷ [(1 + r)^n - 1], where P is principal, r is monthly interest rate, and n is number of months. This formula ensures equal payments throughout the loan tenure while gradually shifting from mostly interest to mostly principal repayment.";
        } else if (message.toLowerCase().includes('tenure') || message.toLowerCase().includes('longer')) {
          response = "Opting for a longer loan tenure reduces your EMI amount but increases the total interest paid over the loan period. For example, on a ₹50 lakh loan at 8%, a 20-year tenure has EMI of ₹41,822 with total interest of ₹50.37 lakhs, while a 30-year tenure has EMI of ₹36,656 but total interest of ₹81.96 lakhs.";
        } else if (message.toLowerCase().includes('prepayment')) {
          response = "Prepayment of home loans can significantly reduce your interest burden. For instance, prepaying 5% of the principal each year on a 20-year loan can help you close the loan 4-5 years earlier and save 20-25% on interest. It's especially beneficial to make prepayments in the early years of the loan when the interest component is higher.";
        } else {
          response = "When evaluating home loans, consider the total cost of borrowing, not just the EMI. Factors like processing fees, prepayment charges, and insurance premiums also matter. If you share your loan amount, tenure, and current interest rate offers, I can help analyze which option might be best for you.";
        }
      } else {
        response = "I understand you're asking about " + message + ". This is a complex topic that depends on your personal financial situation. I'd be happy to provide more specific guidance if you could share more details about your goals and current financial status.";
      }
      
      setConversation(prev => [...prev, { sender: 'ai', message: response }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-finance-blue text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-finance-blue/90 transition-all duration-300"
        aria-label="Open AI assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-80 sm:w-96'} rounded-xl overflow-hidden shadow-xl transition-all duration-300 bg-white border border-gray-200`}>
      {/* Header */}
      <div className="bg-finance-blue text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-semibold">{
            calculatorType === 'sip' ? 'SIP Calculator AI' :
            calculatorType === 'home-loan-emi' ? 'Home Loan EMI AI' :
            calculatorType === 'retirement' ? 'Retirement AI' :
            calculatorType === 'tax' ? 'Tax Calculator AI' :
            'Finance AI Assistant'
          }</h3>
        </div>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <button onClick={() => setIsMinimized(false)} className="text-white/80 hover:text-white transition-colors">
              <Maximize2 className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => setIsMinimized(true)} className="text-white/80 hover:text-white transition-colors">
              <Minimize2 className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Conversation */}
          <div className="bg-gray-50 p-4 h-80 overflow-y-auto flex flex-col gap-4">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-finance-blue text-white' 
                    : 'bg-white border border-gray-200 text-finance-charcoal'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggestions */}
          {showSuggestions && (
            <div className="p-3 border-t border-gray-200">
              <p className="text-xs text-finance-charcoal/60 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {getSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-finance-charcoal px-3 py-1.5 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me about this calculator..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-finance-blue"
              />
              <Button
                onClick={handleSend}
                className="bg-finance-blue text-white px-3 py-2 rounded-r-lg hover:bg-finance-blue/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-center text-finance-charcoal/50">
              For educational purposes only. Not financial advice.
            </p>
          </div>
        </>
      )}
      
      {isMinimized && (
        <div 
          className="p-4 cursor-pointer" 
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-finance-charcoal/70 truncate">Click to continue chatting</p>
            <ChevronDown className="h-4 w-4 text-finance-charcoal/50" />
          </div>
        </div>
      )}
    </div>
  );
};
