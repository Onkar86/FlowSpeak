import React from 'react';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
    { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
];

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'var(--bg-glass)',
                backdropFilter: 'var(--blur-md)',
                WebkitBackdropFilter: 'var(--blur-md)',
                border: 'var(--border-glass)',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
            }}
                className="group"
            >
                <Globe size={16} style={{ color: 'var(--accent-primary)' }} />
                <select
                    value={selectedLanguage}
                    onChange={(e) => onSelect(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none',
                        paddingRight: '16px',
                        minWidth: '120px'
                    }}
                >
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                            {lang.flag} {lang.name}
                        </option>
                    ))}
                </select>
                <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid var(--text-muted)',
                }} />
            </div>
        </div>
    );
};

export default LanguageSelector;
