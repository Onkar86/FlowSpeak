import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear, placeholder = "Search notes..." }) => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px'
        }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Search
                    size={18}
                    style={{
                        position: 'absolute',
                        left: '12px',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none'
                    }}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 40px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-glass)',
                        backdropFilter: 'var(--blur-md)',
                        WebkitBackdropFilter: 'var(--blur-md)',
                        border: 'var(--border-glass)',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem',
                        outline: 'none',
                        transition: 'all var(--transition-normal)'
                    }}
                    onFocus={(e) => {
                        e.target.style.border = 'var(--border-accent)';
                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                    }}
                    onBlur={(e) => {
                        e.target.style.border = 'var(--border-glass)';
                        e.target.style.boxShadow = 'none';
                    }}
                />
                {value && (
                    <button
                        onClick={onClear}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--bg-secondary)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg-tertiary)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-secondary)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
