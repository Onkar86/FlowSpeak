import React from 'react';
import { Bold, Italic, Underline, Type, List, ListOrdered, Download, Copy } from 'lucide-react';

const TextFormatter = ({ onFormat, onExport, text, disabled }) => {
    const tools = [
        { id: 'bold', icon: Bold, label: 'Bold', action: () => onFormat('bold') },
        { id: 'italic', icon: Italic, label: 'Italic', action: () => onFormat('italic') },
        { id: 'underline', icon: Underline, label: 'Underline', action: () => onFormat('underline') },
        { id: 'heading', icon: Type, label: 'Heading', action: () => onFormat('heading') },
        { id: 'bullet', icon: List, label: 'Bullet List', action: () => onFormat('bullet') },
        { id: 'numbered', icon: ListOrdered, label: 'Numbered List', action: () => onFormat('numbered') },
    ];

    const exportTools = [
        { id: 'pdf', icon: Download, label: 'PDF', action: () => onExport('pdf') },
        { id: 'copy', icon: Copy, label: 'Copy', action: () => onExport('copy') },
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            padding: 'var(--space-sm)',
            background: 'var(--bg-glass-lighter)',
            backdropFilter: 'var(--blur-sm)',
            WebkitBackdropFilter: 'var(--blur-sm)',
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-subtle)',
            flexWrap: 'wrap'
        }}>
            {/* Format Tools */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {tools.map(tool => {
                    const Icon = tool.icon;
                    return (
                        <button
                            key={tool.id}
                            onClick={tool.action}
                            disabled={disabled}
                            title={tool.label}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: 'var(--radius-sm)',
                                background: 'transparent',
                                border: 'var(--border-subtle)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                color: 'var(--text-secondary)',
                                transition: 'all var(--transition-fast)',
                                opacity: disabled ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!disabled) {
                                    e.currentTarget.style.background = 'var(--bg-glass)';
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                    e.currentTarget.style.border = 'var(--border-glass)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.border = 'var(--border-subtle)';
                            }}
                        >
                            <Icon size={16} />
                        </button>
                    );
                })}
            </div>

            {/* Separator */}
            <div style={{
                width: '1px',
                height: '24px',
                background: 'var(--border-subtle)'
            }} />

            {/* Export Tools */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {exportTools.map(tool => {
                    const Icon = tool.icon;
                    return (
                        <button
                            key={tool.id}
                            onClick={tool.action}
                            disabled={disabled || !text}
                            title={tool.label}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: 'var(--radius-sm)',
                                background: 'transparent',
                                border: 'var(--border-subtle)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: (disabled || !text) ? 'not-allowed' : 'pointer',
                                color: 'var(--text-secondary)',
                                transition: 'all var(--transition-fast)',
                                opacity: (disabled || !text) ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!disabled && text) {
                                    e.currentTarget.style.background = 'var(--bg-glass)';
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                    e.currentTarget.style.border = 'var(--border-glass)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.border = 'var(--border-subtle)';
                            }}
                        >
                            <Icon size={16} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TextFormatter;
