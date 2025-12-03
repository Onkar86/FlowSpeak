import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import '../styles/animations.css';

const Microphone = ({ isListening, onToggle }) => {
    return (
        <div className="microphone-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 'var(--space-xl) var(--space-lg)',
            marginBottom: 'var(--space-md)'
        }}>
            {/* Subtle Animated Ring - Single Professional Layer */}
            {isListening && (
                <div className="animate-pulse-ring" style={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)',
                    zIndex: 0
                }} />
            )}

            {/* Professional Button Container */}
            <div style={{
                position: 'relative',
                marginBottom: 'var(--space-lg)'
            }}>
                {/* Main Button */}
                <button
                    onClick={onToggle}
                    style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '50%',
                        background: isListening
                            ? 'linear-gradient(135deg, var(--danger) 0%, #dc2626 100%)'
                            : 'var(--bg-glass-heavy)',
                        backdropFilter: 'var(--blur-lg)',
                        WebkitBackdropFilter: 'var(--blur-lg)',
                        color: isListening ? '#fff' : 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isListening
                            ? '0 8px 24px var(--danger-glow), 0 0 0 1px rgba(239, 68, 68, 0.2)'
                            : '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--border-glass)',
                        transition: 'all var(--transition-normal)',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 1
                    }}
                    aria-label={isListening ? "Stop Recording" : "Start Recording"}
                >
                    {isListening ? <MicOff size={32} strokeWidth={2} /> : <Mic size={32} strokeWidth={2} />}
                </button>
            </div>

            {/* Status Text - Clean & Professional */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>
                <p style={{
                    color: isListening ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.938rem',
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    transition: 'color var(--transition-normal)'
                }}>
                    {isListening ? 'Recording' : 'Ready to Record'}
                </p>
                {isListening && (
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.813rem',
                        margin: '4px 0 0 0',
                        fontWeight: 400
                    }}>
                        Tap again to stop
                    </p>
                )}
            </div>

            {/* Keyboard Shortcut Hint - Minimal & Professional */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'var(--bg-glass-lighter)',
                backdropFilter: 'var(--blur-sm)',
                WebkitBackdropFilter: 'var(--blur-sm)',
                borderRadius: 'var(--radius-full)',
                border: 'var(--border-subtle)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 500
            }}>
                <span>Press</span>
                <kbd style={{
                    background: 'var(--bg-secondary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.688rem',
                    border: 'var(--border-glass)',
                    color: 'var(--text-accent)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                }}>Shift M</kbd>
                <span>to toggle</span>
            </div>
        </div>
    );
};

export default Microphone;
