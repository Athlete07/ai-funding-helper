
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';
import { GlossaryTermCard, GlossaryTerm } from './GlossaryTermCard';

interface GlossaryTermListProps {
  terms: GlossaryTerm[];
  bookmarkedTerms: string[];
  onToggleBookmark: (termId: string) => void;
}

export const GlossaryTermList: React.FC<GlossaryTermListProps> = ({
  terms,
  bookmarkedTerms,
  onToggleBookmark,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            {terms.length > 0 ? (
              terms.map(term => (
                <GlossaryTermCard 
                  key={term.id} 
                  term={term} 
                  isBookmarked={bookmarkedTerms.includes(term.id)}
                  onToggleBookmark={onToggleBookmark}
                />
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
  );
};
