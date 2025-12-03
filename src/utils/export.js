import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const exportToPDF = (text, filename = null) => {
    if (!text || !text.trim()) {
        alert('No text to export');
        return;
    }

    try {
        const doc = new jsPDF();

        // Set font
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Add title
        const title = filename || 'FlowSpeak Document';
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, 20);

        // Add date
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const dateStr = format(new Date(), 'PPP');
        doc.text(dateStr, 20, 30);

        // Add content
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(text, 170); // 170mm width for A4
        doc.text(lines, 20, 45);

        // Generate filename
        const pdfFilename = filename
            ? `${filename}.pdf`
            : `flowspeak-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.pdf`;

        // Download
        doc.save(pdfFilename);

        return true;
    } catch (error) {
        console.error('PDF export failed:', error);
        alert('Failed to export PDF. Please try again.');
        return false;
    }
};

export const exportToText = (text, filename = null) => {
    if (!text || !text.trim()) {
        alert('No text to export');
        return;
    }

    try {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename
            ? `${filename}.txt`
            : `flowspeak-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('Text export failed:', error);
        alert('Failed to export text. Please try again.');
        return false;
    }
};

export const copyToClipboard = async (text) => {
    if (!text || !text.trim()) {
        alert('No text to copy');
        return false;
    }

    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Copy failed:', error);
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            alert('Failed to copy to clipboard');
            return false;
        }
    }
};
