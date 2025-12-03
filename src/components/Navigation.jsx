import React from 'react';
import { Mic, FileText, BarChart3, Settings } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'home', icon: Mic, label: 'Speak' },
        { id: 'notes', icon: FileText, label: 'Notes' },
        { id: 'stats', icon: BarChart3, label: 'Stats' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'var(--bg-glass-heavy)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: '20px', // Safe area for iOS
            zIndex: 100
        }}>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            transition: 'color 0.3s',
                            width: '60px'
                        }}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default Navigation;
