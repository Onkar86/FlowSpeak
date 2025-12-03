import React from 'react';
import { Wand2, FileText, Type, Zap, GraduationCap } from 'lucide-react';

const tools = [
    { id: 'summarize', label: 'Summarize', icon: FileText, color: '#06b6d4' },
    { id: 'rewrite', label: 'Rewrite', icon: Wand2, color: '#8b5cf6' },
    { id: 'expand', label: 'Expand', icon: Type, color: '#10b981' },
    { id: 'gen-z', label: 'Gen-Z', icon: Zap, color: '#ec4899' },
    { id: 'professional', label: 'Professional', icon: GraduationCap, color: '#6366f1' },
];

const AITools = ({ onAction, disabled }) => {
    const [hoveredTool, setHoveredTool] = React.useState(null);

    return (
        <div style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'var(--space-lg) var(--space-lg) var(--space-xl)',
            borderTop: 'var(--border-subtle)'
        }}>
            {/* Section Header */}
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
                    AI Tools
                </h3>
            </div>

            {/* Tools Grid */}
            <div className="ai-tools-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 'var(--space-md)',
                width: '100%'
            }}>
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    const isHovered = hoveredTool === tool.id;

                    return (
                        <button
                            key={tool.id}
                            onClick={() => onAction(tool.id)}
                            disabled={disabled}
                            onMouseEnter={() => !disabled && setHoveredTool(tool.id)}
                            onMouseLeave={() => !disabled && setHoveredTool(null)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                padding: 'var(--space-lg)',
                                borderRadius: 'var(--radius-lg)',
                                background: isHovered
                                    ? 'var(--bg-glass-heavy)'
                                    : 'var(--bg-glass)',
                                backdropFilter: 'var(--blur-md)',
                                WebkitBackdropFilter: 'var(--blur-md)',
                                border: isHovered
                                    ? `1px solid ${tool.color}30`
                                    : 'var(--border-glass)',
                                color: 'var(--text-primary)',
                                fontSize: '0.813rem',
                                fontWeight: 500,
                                transition: 'all var(--transition-normal)',
                                opacity: disabled ? 0.5 : 1,
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isHovered && !disabled
                                    ? `0 8px 20px ${tool.color}20, 0 0 0 1px ${tool.color}15`
                                    : 'var(--shadow-sm)'
                            }}
                        >
                            {/* Icon Container */}
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: 'var(--radius-md)',
                                background: `${tool.color}10`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all var(--transition-normal)',
                                border: `1px solid ${tool.color}20`
                            }}>
                                <Icon
                                    size={22}
                                    strokeWidth={2}
                                    style={{
                                        color: tool.color,
                                        transition: 'all var(--transition-normal)'
                                    }}
                                />
                            </div>

                            {/* Label */}
                            <span style={{
                                color: isHovered ? tool.color : 'var(--text-secondary)',
                                transition: 'color var(--transition-normal)',
                                letterSpacing: '-0.01em'
                            }}>
                                {tool.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AITools;
