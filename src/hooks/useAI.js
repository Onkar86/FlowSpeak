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
                result = "Rewritten: " + text.split(' ').reverse().join(' '); // Silly mock
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
