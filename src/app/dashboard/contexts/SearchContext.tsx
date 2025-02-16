// First, let's modify the SearchContext to include the tab control
// app/dashboard/contexts/SearchContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setActiveTab?: (tab: 'courses' | 'internship' | 'settings' | 'explore') => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, setActiveTab }: { 
    children: React.ReactNode;
    setActiveTab?: (tab: 'courses' | 'internship' | 'settings' | 'explore') => void;
}) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, setActiveTab }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}