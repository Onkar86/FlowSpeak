import React from 'react';
import { Trash2, Share, Copy } from 'lucide-react';

const NotesList = ({ notes, onDelete }) => {
    if (notes.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                marginTop: 'var(--space-2xl)',
                color: 'var(--text-secondary)'
            }}>
                <p>No notes yet. Start speaking!</p>
            </div>
        );
    }

    return (
        <div className="notes-list" style={{
            padding: 'var(--space-md)',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)'
        }}>
            {notes.map(note => (
                <div key={note.id} style={{
                    background: 'var(--bg-secondary)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    animation: 'slide-up 0.3s ease-out'
                }}>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-sm)',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {note.content}
                    </p>
                    {note.tags && note.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                            {note.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.75rem',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    opacity: 0.8
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'var(--space-sm)',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: 'var(--space-sm)'
                    }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {new Date(note.date).toLocaleDateString()}
                        </span>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            <button onClick={() => onDelete(note.id)} style={{ color: 'var(--text-muted)' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotesList;
