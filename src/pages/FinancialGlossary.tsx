
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { toast } from '@/hooks/use-toast';
import { GlossaryAI } from '@/components/GlossaryAI';
import { GlossaryFilters } from '@/components/glossary/GlossaryFilters';
import { GlossaryTermList } from '@/components/glossary/GlossaryTermList';
import { glossaryData } from '@/components/glossary/GlossaryData';

const FinancialGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
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
            <GlossaryFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
            />
            
            <div className="mt-6">
              <GlossaryTermList 
                terms={sortedTerms} 
                bookmarkedTerms={bookmarkedTerms}
                onToggleBookmark={toggleBookmark}
              />
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
