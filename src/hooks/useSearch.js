import { useState, useMemo } from 'react';

export const useSearch = (items = []) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;

        const query = searchQuery.toLowerCase();
        return items.filter(item => {
            const textMatch = (item.text || item.content || '').toLowerCase().includes(query);
            const titleMatch = item.title?.toLowerCase().includes(query);
            const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(query));

            return textMatch || titleMatch || tagsMatch;
        });
    }, [items, searchQuery]);

    const highlightText = (text, query) => {
        if (!query.trim()) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    return {
        searchQuery,
        setSearchQuery,
        filteredItems,
        highlightText
    };
};
