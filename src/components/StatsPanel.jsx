import React, { useMemo } from 'react';
import { TrendingUp, Clock, FileText, Zap, Target, Award } from 'lucide-react';

const StatsPanel = ({ stats }) => {
    const { totalWords, totalCharacters, totalRecordingTime, notesCreated, aiToolUsage, streak, longestStreak } = stats;

    // Calculate words per minute
    const wordsPerMinute = useMemo(() => {
        if (totalRecordingTime === 0) return 0;
        return Math.round((totalWords / totalRecordingTime) * 60);
    }, [totalWords, totalRecordingTime]);

    // Format recording time
    const formattedTime = useMemo(() => {
        const hours = Math.floor(totalRecordingTime / 3600);
        const minutes = Math.floor((totalRecordingTime % 3600) / 60);
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }, [totalRecordingTime]);

    // Top AI tools
    const topTools = useMemo(() => {
        const entries = Object.entries(aiToolUsage);
        return entries
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id, count }));
    }, [aiToolUsage]);

    const statCards = [
        { label: 'Total Words', value: totalWords.toLocaleString(), icon: TrendingUp, color: '#06b6d4' },
        { label: 'Recording Time', value: formattedTime, icon: Clock, color: '#8b5cf6' },
        { label: 'Notes Created', value: notesCreated, icon: FileText, color: '#10b981' },
        { label: 'Words/Min', value: wordsPerMinute, icon: Zap, color: '#f59e0b' },
        { label: 'Current Streak', value: `${streak} days`, icon: Target, color: '#ec4899' },
        { label: 'Best Streak', value: `${longestStreak} days`, icon: Award, color: '#6366f1' },
    ];

    return (
        <div style={{ padding: 'var(--space-lg)' }}>
            {/* Header */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: 'var(--space-xs)'
                }}>
                    📊 Your Statistics
                </h2>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                }}>
                    Track your writing progress and productivity
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-xl)'
            }}>
                {statCards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            style={{
                                background: 'var(--bg-glass)',
                                backdropFilter: 'var(--blur-md)',
                                WebkitBackdropFilter: 'var(--blur-md)',
                                border: 'var(--border-glass)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--space-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-sm)'
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: 'var(--radius-md)',
                                background: `${card.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Icon size={20} style={{ color: card.color }} />
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)'
                                }}>
                                    {card.value}
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginTop: '4px'
                                }}>
                                    {card.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Top AI Tools */}
            {topTools.length > 0 && (
                <div style={{
                    background: 'var(--bg-glass-lighter)',
                    backdropFilter: 'var(--blur-sm)',
                    WebkitBackdropFilter: 'var(--blur-sm)',
                    border: 'var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-md)'
                }}>
                    <h3 style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-md)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Most Used AI Tools
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {topTools.map(tool => (
                            <div
                                key={tool.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--space-sm)',
                                    background: 'var(--bg-glass)',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'var(--border-subtle)'
                                }}
                            >
                                <span style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-primary)',
                                    textTransform: 'capitalize'
                                }}>
                                    {tool.id.replace('-', ' ')}
                                </span>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'var(--accent-primary)'
                                }}>
                                    {tool.count} uses
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsPanel;
