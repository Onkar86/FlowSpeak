import { useState, useCallback } from 'react';

const templates = [
    {
        id: 'meeting',
        name: 'Meeting Notes',
        icon: '📋',
        content: `# Meeting Notes\n\n**Date:** ${new Date().toLocaleDateString()}\n**Attendees:**\n- \n\n## Agenda\n1. \n\n## Discussion Points\n- \n\n## Action Items\n- [ ] \n\n## Next Steps\n- `
    },
    {
        id: 'journal',
        name: 'Daily Journal',
        icon: '📖',
        content: `# Daily Journal - ${new Date().toLocaleDateString()}\n\n## Morning Thoughts\n\n\n## Gratitude\n1. \n2. \n3. \n\n## Goals for Today\n- [ ] \n- [ ] \n- [ ] \n\n## Evening Reflection\n\n`
    },
    {
        id: 'blog',
        name: 'Blog Post',
        icon: '✍️',
        content: `# [Your Title Here]\n\n## Introduction\n\n\n## Main Content\n\n### Section 1\n\n\n### Section 2\n\n\n## Conclusion\n\n\n---\n*Tags: #*\n*Published: ${new Date().toLocaleDateString()}*`
    },
    {
        id: 'todo',
        name: 'To-Do List',
        icon: '✓',
        content: `# To-Do List - ${new Date().toLocaleDateString()}\n\n## High Priority\n- [ ] \n- [ ] \n\n## Medium Priority\n- [ ] \n- [ ] \n\n## Low Priority\n- [ ] \n- [ ] \n\n## Completed\n- [x] `
    },
    {
        id: 'email',
        name: 'Email Draft',
        icon: '✉️',
        content: `**To:** \n**Subject:** \n\n---\n\nDear [Name],\n\n\n\nBest regards,\n[Your Name]`
    }
];

const useTemplates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const getTemplateContent = useCallback((templateId) => {
        const template = templates.find(t => t.id === templateId);
        return template ? template.content : '';
    }, []);

    const getAllTemplates = useCallback(() => {
        return templates;
    }, []);

    return {
        templates: getAllTemplates(),
        selectedTemplate,
        setSelectedTemplate,
        getTemplateContent
    };
};

export default useTemplates;
