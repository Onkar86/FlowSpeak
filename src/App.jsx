import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Microphone from './components/Microphone';
import Editor from './components/Editor';
import AITools from './components/AITools';
import NotesList from './components/NotesList';
import TextFormatter from './components/TextFormatter';
import useSpeech from './hooks/useSpeech';
import useAI from './hooks/useAI';
import useNotes from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import { exportToPDF, exportToText, copyToClipboard } from './utils/export';
import { Save } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [editorText, setEditorText] = useState('');

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeech();
  const { transformText, isProcessing } = useAI();
  const { notes, saveNote, deleteNote } = useNotes();
  const { theme, toggleTheme } = useTheme();

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
      saveNote(editorText);
      setEditorText('');
      resetTranscript();
      setActiveTab('notes');
    }
  }, [editorText, saveNote, resetTranscript, setActiveTab]);

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

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} theme={theme} onThemeToggle={toggleTheme}>
      {activeTab === 'home' && (
        <div className="animate-fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: '20px'
        }}>
          <Microphone isListening={isListening} onToggle={handleToggleListening} />

          <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Text Formatter Toolbar */}
            <div style={{
              padding: '0 var(--space-lg) var(--space-md) var(--space-lg)',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TextFormatter
                onFormat={handleFormat}
                onExport={handleExport}
                text={editorText}
                disabled={isProcessing}
              />
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
          <h2 style={{
            padding: '0 var(--space-md)',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 'var(--space-md)'
          }}>Your Notes</h2>
          <NotesList notes={notes} onDelete={deleteNote} />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-fade-in" style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 'var(--space-md)' }}>Settings</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Language: English (US)<br />
            Theme: Dark (Default)<br />
            Version: 1.0.0
          </p>
        </div>
      )}
    </Layout>
  );
}

export default App;
