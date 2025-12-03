import React from 'react';
import { FileText, BookOpen, PenTool, CheckSquare, Mail } from 'lucide-react';

const TemplateSelector = ({ templates, onSelect, onClose }) => {
    const iconMap = {
        '📋': FileText,
        '📖': BookOpen,
        '✍️': PenTool,
        '✓': CheckSquare,
        '✉️': Mail
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-lg)'
        }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'var(--bg-glass-heavy)',
                    backdropFilter: 'var(--blur-lg)',
                    WebkitBackdropFilter: 'var(--blur-lg)',
                    borderRadius: 'var(--radius-xl)',
                    border: 'var(--border-glass)',
                    padding: 'var(--space-xl)',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: 'var(--shadow-xl)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: 'var(--space-md)',
                    color: 'var(--text-primary)'
                }}>
                    Choose a Template
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 'var(--space-md)'
                }}>
                    {templates.map(template => {
                        const Icon = iconMap[template.icon] || FileText;
                        return (
                            <button
                                key={template.id}
                                onClick={() => {
                                    onSelect(template.id);
                                    onClose();
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 'var(--space-sm)',
                                    padding: 'var(--space-md)',
                                    background: 'var(--bg-glass)',
                                    backdropFilter: 'var(--blur-md)',
                                    WebkitBackdropFilter: 'var(--blur-md)',
                                    border: 'var(--border-glass)',
                                    borderRadius: 'var(--radius-lg)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-normal)',
                                    color: 'var(--text-primary)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.background = 'var(--bg-glass-lighter)';
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = 'var(--bg-glass)';
                                    e.currentTarget.style.borderColor = 'transparent';
                                }}
                            >
                                <Icon size={32} style={{ color: 'var(--accent-primary)' }} />
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textAlign: 'center'
                                }}>
                                    {template.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: 'var(--space-lg)',
                        width: '100%',
                        padding: 'var(--space-sm)',
                        background: 'var(--bg-secondary)',
                        border: 'var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-secondary)';
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TemplateSelector;
