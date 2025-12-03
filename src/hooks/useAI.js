import { useState, useCallback } from 'react';

const useAI = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const transformText = useCallback(async (text, type) => {
        setIsProcessing(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let result = text;

        switch (type) {
            case 'summarize':
                result = "Summary: " + text.split(' ').slice(0, 10).join(' ') + "...";
                break;
            case 'rewrite':
                result = "Rewritten: " + text.split('. ').map(s => s.trim()).filter(s => s).join('. ') + ".";
                break;
            case 'expand':
                result = text + " [Expanded content: This is additional context added by the AI to make the text longer and more detailed.]";
                break;
            case 'gen-z':
                result = text + " no cap fr fr 💀";
                break;
            case 'professional':
                result = "Per your request: " + text + ". Best regards.";
                break;
            case 'translate':
                result = "🌍 Translated: " + text + " (Translation simulation - integrate real API for production)";
                break;
            case 'grammar':
                // Simple grammar fixes simulation
                result = text
                    .replace(/\bi\b/g, 'I')
                    .replace(/\s+/g, ' ')
                    .replace(/\s([.,!?])/g, '$1')
                    .trim();
                result = result.charAt(0).toUpperCase() + result.slice(1);
                if (!/[.!?]$/.test(result)) result += '.';
                break;
            case 'shorter':
                // Take first half of text
                const words = text.split(' ');
                const halfLength = Math.ceil(words.length / 2);
                result = words.slice(0, halfLength).join(' ') + '...';
                break;
            case 'emojis':
                // Add relevant emojis
                result = text
                    .replace(/\bhappy|joy|great|awesome\b/gi, match => match + ' 😊')
                    .replace(/\bidea|think\b/gi, match => match + ' 💡')
                    .replace(/\bwork|job\b/gi, match => match + ' 💼')
                    .replace(/\btime\b/gi, match => match + ' ⏰');
                if (result === text) result = '✨ ' + text + ' ✨';
                break;
            case 'email':
                result = `Subject: [Your Subject Here]\n\nDear [Recipient],\n\n${text}\n\nBest regards,\n[Your Name]`;
                break;
            case 'bullets':
                // Convert paragraphs to bullet points
                const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s);
                result = sentences.map(s => '• ' + s).join('\n');
                break;
            default:
                break;
        }

        setIsProcessing(false);
        return result;
    }, []);

    return {
        transformText,
        isProcessing
    };
};

export default useAI;
