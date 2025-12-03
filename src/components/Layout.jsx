import React from 'react';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children, activeTab, onTabChange, theme, onThemeToggle }) => {
    return (
        <div className="layout" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Subtle Gradient Mesh Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'var(--gradient-mesh)',
                opacity: 0.6,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Professional Header */}
            <header style={{
                padding: '20px var(--space-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '72px',
                position: 'relative',
                zIndex: 1,
                borderBottom: 'var(--border-subtle)',
                background: 'var(--bg-glass-lighter)',
                backdropFilter: 'var(--blur-sm)',
                WebkitBackdropFilter: 'var(--blur-sm)'
            }}>
                {/* Theme Toggle - Left */}
                <div style={{ width: '40px' }}>
                    {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
                </div>

                {/* Title - Center */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <h1 style={{
                        fontSize: '1.375rem',
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        FlowSpeak
                    </h1>
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        margin: '4px 0 0 0',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        Voice-Powered Editor
                    </p>
                </div>

                {/* Spacer - Right */}
                <div style={{ width: '40px' }} />
            </header>

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                overflowY: 'auto',
                paddingBottom: '100px',
                position: 'relative',
                zIndex: 1
            }}>
                {children}
            </main>

            <Navigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    );
};

export default Layout;
