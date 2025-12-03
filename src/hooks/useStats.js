import { useState, useEffect, useCallback } from 'react';

const STATS_KEY = 'flowspeak-stats';

const useStats = () => {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem(STATS_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return getDefaultStats();
            }
        }
        return getDefaultStats();
    });

    function getDefaultStats() {
        return {
            totalWords: 0,
            totalCharacters: 0,
            totalRecordingTime: 0, // in seconds
            notesCreated: 0,
            aiToolUsage: {},
            lastUpdated: new Date().toISOString(),
            dailyActivity: {}, // { '2024-01-01': { words: 100, time: 60 } }
            streak: 0,
            longestStreak: 0
        };
    }

    // Save stats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }, [stats]);

    const trackWords = useCallback((wordCount) => {
        setStats(prev => ({
            ...prev,
            totalWords: prev.totalWords + wordCount,
            lastUpdated: new Date().toISOString()
        }));
    }, []);

    const trackCharacters = useCallback((charCount) => {
        setStats(prev => ({
            ...prev,
            totalCharacters: prev.totalCharacters + charCount,
            lastUpdated: new Date().toISOString()
        }));
    }, []);

    const trackRecordingTime = useCallback((seconds) => {
        setStats(prev => ({
            ...prev,
            totalRecordingTime: prev.totalRecordingTime + seconds,
            lastUpdated: new Date().toISOString()
        }));
    }, []);

    const trackNoteCreated = useCallback(() => {
        const today = new Date().toISOString().split('T')[0];

        setStats(prev => {
            const newDailyActivity = { ...prev.dailyActivity };
            if (!newDailyActivity[today]) {
                newDailyActivity[today] = { words: 0, time: 0, notes: 0 };
            }
            newDailyActivity[today].notes = (newDailyActivity[today].notes || 0) + 1;

            // Calculate streak
            const dates = Object.keys(newDailyActivity).sort().reverse();
            let streak = 0;
            let checkDate = new Date();

            for (let i = 0; i < dates.length; i++) {
                const dateStr = checkDate.toISOString().split('T')[0];
                if (dates.includes(dateStr)) {
                    streak++;
                    checkDate.setDate(checkDate.getDate() - 1);
                } else {
                    break;
                }
            }

            return {
                ...prev,
                notesCreated: prev.notesCreated + 1,
                dailyActivity: newDailyActivity,
                streak,
                longestStreak: Math.max(prev.longestStreak, streak),
                lastUpdated: new Date().toISOString()
            };
        });
    }, []);

    const trackAITool = useCallback((toolId) => {
        setStats(prev => ({
            ...prev,
            aiToolUsage: {
                ...prev.aiToolUsage,
                [toolId]: (prev.aiToolUsage[toolId] || 0) + 1
            },
            lastUpdated: new Date().toISOString()
        }));
    }, []);

    const trackDailyActivity = useCallback((words, time) => {
        const today = new Date().toISOString().split('T')[0];

        setStats(prev => {
            const newDailyActivity = { ...prev.dailyActivity };
            if (!newDailyActivity[today]) {
                newDailyActivity[today] = { words: 0, time: 0, notes: 0 };
            }
            newDailyActivity[today].words += words;
            newDailyActivity[today].time += time;

            return {
                ...prev,
                dailyActivity: newDailyActivity,
                lastUpdated: new Date().toISOString()
            };
        });
    }, []);

    const resetStats = useCallback(() => {
        setStats(getDefaultStats());
    }, []);

    return {
        stats,
        trackWords,
        trackCharacters,
        trackRecordingTime,
        trackNoteCreated,
        trackAITool,
        trackDailyActivity,
        resetStats
    };
};

export default useStats;
