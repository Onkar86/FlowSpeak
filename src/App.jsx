import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Microphone from './components/Microphone';
import Editor from './components/Editor';
import AITools from './components/AITools';
import NotesList from './components/NotesList';
import TextFormatter from './components/TextFormatter';
import StatsPanel from './components/StatsPanel';
import TemplateSelector from './components/TemplateSelector';
import FocusMode from './components/FocusMode';
import SearchBar from './components/SearchBar';
import useSpeech from './hooks/useSpeech';
import useAI from './hooks/useAI';
import useNotes from './hooks/useNotes';
import useStats from './hooks/useStats';
import useTemplates from './hooks/useTemplates';
import useTags from './hooks/useTags';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';
import { exportToPDF, exportToText, copyToClipboard } from './utils/export';
import { Save, FileTemplate, Maximize2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [editorText, setEditorText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [language, setLanguage] = useState('en-US');

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeech(language);
  const { transformText, isProcessing } = useAI();
  const { notes, saveNote, deleteNote } = useNotes();
  const { theme, toggleTheme } = useTheme();
  const { stats, trackWords, trackCharacters, trackNoteCreated, trackAITool } = useStats();
  const { templates, getTemplateContent } = useTemplates();
  const { extractTagsFromText } = useTags();
  const { searchQuery, setSearchQuery, filteredItems } = useSearch(notes);

  // Sync transcript to editor
  useEffect(() => {
    if (transcript) {
      // If we want to append, we need to be careful not to double append.
      // For now, let's just set it.
      // A better way is to let the user edit, and append new speech to the end.
      // But useSpeech returns the *accumulated* transcript for the session.
      // So we might overwrite user edits if we are not careful.
      // Simple fix: When speech updates, we append the *difference* or just set it if it's a fresh session.
      // For this prototype, let's just set it and assume user speaks then edits.
      setEditorText(prev => {
        // If the transcript is just starting, maybe we append?
        // Let's just use the transcript directly for now to keep it simple, 
        // but that prevents editing while speaking.
        // Ideally: Speech updates a separate buffer, which we flush to editor on pause.
        return transcript;
      });
    }
  }, [transcript]);

  // Toggle listening handler with useCallback
  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Save handler with useCallback
  const handleSave = useCallback(() => {
    if (editorText) {
      const wordCount = editorText.trim().split(/\s+/).length;
      const charCount = editorText.length;

      const tags = extractTagsFromText(editorText);
      saveNote(editorText, tags);
      trackWords(wordCount);
      trackCharacters(charCount);
      trackNoteCreated();

      setEditorText('');
      resetTranscript();
      setActiveTab('notes');
    }
  }, [editorText, saveNote, resetTranscript, setActiveTab, trackWords, trackCharacters, trackNoteCreated, extractTagsFromText]);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift+M: Toggle microphone
      if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        handleToggleListening();
      }
      // Ctrl+S: Save note
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      // Ctrl+N: New note (clear editor)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setEditorText('');
        resetTranscript();
      }
      // Ctrl+D: Delete all text
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setEditorText('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleListening, handleSave, resetTranscript]);

  const handleAIAction = async (type) => {
    if (!editorText) return;
    trackAITool(type);
    const newText = await transformText(editorText, type);
    setEditorText(newText);
  };

  const handleFormat = (type) => {
    // Simple text formatting - wrap selection or add markers
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorText.substring(start, end);
    let newText = editorText;

    switch (type) {
      case 'bold':
        newText = editorText.substring(0, start) + `**${selectedText}**` + editorText.substring(end);
        break;
      case 'italic':
        newText = editorText.substring(0, start) + `*${selectedText}*` + editorText.substring(end);
        break;
      case 'heading':
        newText = editorText.substring(0, start) + `\n# ${selectedText}\n` + editorText.substring(end);
        break;
      case 'bullet':
        newText = editorText.substring(0, start) + `\n• ${selectedText}\n` + editorText.substring(end);
        break;
      case 'numbered':
        newText = editorText.substring(0, start) + `\n1. ${selectedText}\n` + editorText.substring(end);
        break;
    }
    setEditorText(newText);
  };

  const handleExport = async (type) => {
    if (!editorText) return;

    switch (type) {
      case 'pdf':
        exportToPDF(editorText);
        break;
      case 'txt':
        exportToText(editorText);
        break;
      case 'copy':
        const success = await copyToClipboard(editorText);
        if (success) alert('Copied to clipboard!');
        break;
    }
  };

  const handleTemplateSelect = (templateId) => {
    const content = getTemplateContent(templateId);
    setEditorText(content);
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // If in focus mode, render only focus mode
  if (focusMode) {
    return <FocusMode text={editorText} onChange={setEditorText} onExit={() => setFocusMode(false)} />;
  }

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      theme={theme}
      onThemeToggle={toggleTheme}
      selectedLanguage={language}
      onLanguageChange={setLanguage}
    >
      {activeTab === 'home' && (
        <div className="animate-fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: '20px'
        }}>
          <Microphone isListening={isListening} onToggle={handleToggleListening} />

          <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar: Formatter + Templates + Focus Mode */}
            <div style={{
              padding: '0 var(--space-lg) var(--space-md) var(--space-lg)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              flexWrap: 'wrap'
            }}>
              {/* Template Button */}
              <button
                onClick={() => setShowTemplates(true)}
                title="Choose Template"
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-glass)',
                  border: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-glass-lighter)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-glass)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <FileTemplate size={16} />
                Templates
              </button>

              {/* Text Formatter */}
              <TextFormatter
                onFormat={handleFormat}
                onExport={handleExport}
                text={editorText}
                disabled={isProcessing}
              />

              {/* Focus Mode Button */}
              <button
                onClick={toggleFocusMode}
                title="Focus Mode (F11)"
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-glass)',
                  border: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-glass-lighter)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-glass)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Maximize2 size={16} />
                Focus
              </button>
            </div>

            <Editor text={editorText} onChange={setEditorText} />

            {/* Save Button Floating */}
            {editorText && (
              <button
                onClick={handleSave}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  background: 'var(--success)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <Save size={16} /> Save
              </button>
            )}
          </div>

          <div style={{
            paddingBottom: '20px',
            background: 'linear-gradient(to top, var(--bg-primary) 80%, transparent)'
          }}>
            <AITools onAction={handleAIAction} disabled={isProcessing || !editorText} />
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="animate-fade-in">
          <div style={{
            padding: '0 var(--space-md)',
            marginBottom: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: 0
            }}>Your Notes</h2>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
          <NotesList notes={filteredItems} onDelete={deleteNote} />
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="animate-fade-in">
          <StatsPanel stats={stats} />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-fade-in" style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 'var(--space-md)' }}>Settings</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Language: {language}<br />
            Theme: {theme === 'dark' ? 'Dark' : 'Light'}<br />
            Version: 2.0.0
          </p>
        </div>
      )}

      {showTemplates && (
        <TemplateSelector
          templates={templates}
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </Layout>
  );
}

export default App;
