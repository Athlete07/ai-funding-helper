
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, ArrowRight } from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'investing' | 'banking' | 'insurance' | 'taxes' | 'retirement' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface GlossaryTermCardProps {
  term: GlossaryTerm;
  isBookmarked: boolean;
  onToggleBookmark: (termId: string) => void;
}

export const GlossaryTermCard: React.FC<GlossaryTermCardProps> = ({
  term,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className="pb-6 border-b last:border-0">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-finance-green">{term.term}</h3>
        <button 
          onClick={() => onToggleBookmark(term.id)}
          className="text-finance-green hover:text-finance-gold transition-colors"
        >
          <Bookmark 
            className={`h-5 w-5 ${isBookmarked ? 'fill-finance-gold' : ''}`} 
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
  );
};
