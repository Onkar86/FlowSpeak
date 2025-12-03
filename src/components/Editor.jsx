import React, { useEffect, useRef } from 'react';

const Editor = ({ text, onChange, placeholder = "Start speaking or typing..." }) => {
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [text]);

    return (
        <div className="editor-container" style={{
            flex: 1,
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'var(--space-lg)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Editor Header */}
            <div style={{
                marginBottom: 'var(--space-md)',
                paddingLeft: '4px'
            }}>
                <h3 style={{
                    fontSize: '0.813rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    margin: 0,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    Editor
                </h3>
            </div>

            {/* Text Area Container */}
            <div style={{
                position: 'relative',
                width: '100%',
                background: 'var(--bg-glass)',
                backdropFilter: 'var(--blur-lg)',
                WebkitBackdropFilter: 'var(--blur-lg)',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--border-glass)',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-normal)',
                minHeight: '280px'
            }}>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        minHeight: '240px',
                        fontSize: '1rem',
                        lineHeight: '1.65',
                        resize: 'none',
                        padding: 0,
                        borderRadius: 0,
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        border: 'none',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all var(--transition-normal)'
                    }}
                    onFocus={(e) => {
                        e.target.parentElement.style.border = 'var(--border-accent)';
                        e.target.parentElement.style.boxShadow = '0 0 0 3px var(--accent-glow), var(--shadow-md)';
                    }}
                    onBlur={(e) => {
                        e.target.parentElement.style.border = 'var(--border-glass)';
                        e.target.parentElement.style.boxShadow = 'var(--shadow-sm)';
                    }}
                />
            </div>

            {/* Helper Text */}
            <div style={{
                marginTop: 'var(--space-md)',
                paddingLeft: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontWeight: 400
                }}>
                    {text ? `${text.length} characters` : 'Start speaking or type to begin'}
                </span>
            </div>
        </div>
    );
};

export default Editor;
