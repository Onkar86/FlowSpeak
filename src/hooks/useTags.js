import { useState, useCallback, useEffect } from 'react';

const useTags = () => {
    const [allTags, setAllTags] = useState(() => {
        const saved = localStorage.getItem('flowspeak-tags');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('flowspeak-tags', JSON.stringify(allTags));
    }, [allTags]);

    const addTag = useCallback((tag) => {
        const normalizedTag = tag.toLowerCase().trim();
        if (normalizedTag && !allTags.includes(normalizedTag)) {
            setAllTags(prev => [...prev, normalizedTag]);
        }
    }, [allTags]);

    const removeTag = useCallback((tag) => {
        setAllTags(prev => prev.filter(t => t !== tag));
    }, []);

    const getTagSuggestions = useCallback((input) => {
        if (!input) return allTags;
        const lowerInput = input.toLowerCase();
        return allTags.filter(tag => tag.includes(lowerInput));
    }, [allTags]);

    const extractTagsFromText = useCallback((text) => {
        const tagRegex = /#(\w+)/g;
        const matches = text.match(tagRegex);
        if (matches) {
            const tags = matches.map(m => m.slice(1).toLowerCase());
            tags.forEach(tag => addTag(tag));
            return tags;
        }
        return [];
    }, [addTag]);

    return {
        allTags,
        addTag,
        removeTag,
        getTagSuggestions,
        extractTagsFromText
    };
};

export default useTags;
