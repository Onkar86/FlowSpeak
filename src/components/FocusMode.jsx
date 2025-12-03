import React, { useEffect } from 'react';
import { X, Minimize2 } from 'lucide-react';

const FocusMode = ({ text, onChange, onExit }) => {
    // Prevent scroll on body when in focus mode
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // ESC to exit
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onExit();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onExit]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Minimal Header */}
            <div style={{
                padding: 'var(--space-md) var(--space-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 'var(--border-subtle)'
            }}>
                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Focus Mode
                </div>
                <button
                    onClick={onExit}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--bg-glass)',
                        border: 'var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-glass)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                    title="Exit Focus Mode (ESC)"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Centered Editor */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-xl)'
            }}>
                <textarea
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Start writing..."
                    autoFocus
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        height: '80%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        fontFamily: 'var(--font-sans)',
                        resize: 'none',
                        padding: 'var(--space-lg)'
                    }}
                />
            </div>

            {/* Word Count Footer */}
            <div style={{
                padding: 'var(--space-md)',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                borderTop: 'var(--border-subtle)'
            }}>
                {text.trim() ? text.trim().split(/\s+/).length : 0} words • Press ESC to exit
            </div>
        </div>
    );
};

export default FocusMode;
