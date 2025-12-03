import { useState, useEffect } from 'react';

const STORAGE_KEY = 'flowspeak_notes';

const useNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse notes', e);
            }
        }
    }, []);

    const saveNote = (content, tags = []) => {
        if (!content.trim()) return;

        const newNote = {
            id: Date.now().toString(),
            content,
            date: new Date().toISOString(),
            tags
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    };

    return {
        notes,
        saveNote,
        deleteNote
    };
};

export default useNotes;
