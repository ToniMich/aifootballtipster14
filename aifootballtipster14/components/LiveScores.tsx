
import React, { useState, useEffect, useCallback } from 'react';
import { LiveMatch } from '../types';
import { RefreshIcon } from './icons';
import { fetchLiveScores } from '../services/theSportsDBService';

const LiveIndicator: React.FC = () => (
    <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs font-bold text-red-500 uppercase">Live</span>
    </div>
);

const MatchScore: React.FC<{ match: LiveMatch }> = ({ match }) => {
    const scoreA = match.scoreA ?? '-';
    const scoreB = match.scoreB ?? '-';

    return (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>{match.league}</span>
                {match.status === 'LIVE' ? <LiveIndicator /> : <span className="text-xs font-bold text-gray-500">{match.status}</span>}
            </div>
            <div className="flex justify-between items-center">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{match.teamA}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{match.teamB}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-1 text-right">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{scoreA}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{scoreB}</p>
                    </div>
                     <div className="w-10 text-center text-sm font-semibold text-green-600 dark:text-green-400">
                        {match.time}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LiveScores: React.FC = () => {
    const [matches, setMatches] = useState<LiveMatch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchScores = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedMatches = await fetchLiveScores();
            setMatches(fetchedMatches);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Failed to fetch scores', err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching scores.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchScores();
        // Set up an interval to refetch scores every 60 seconds
        const interval = setInterval(fetchScores, 60000);
        // Clean up the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
    }, [fetchScores]);

    const handleRefresh = () => {
        fetchScores();
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Loading live scores...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 text-center">
                    <p className="font-semibold text-red-600 dark:text-red-400">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        if (matches.length === 0) {
            return (
                <div className="p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No major live soccer matches at the moment.</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Check back soon or try refreshing.</p>
                </div>
            );
        }

        return (
             <div className="p-3 space-y-3 max-h-[450px] lg:max-h-[50vh] overflow-y-auto">
                {matches.map((match) => (
                    <MatchScore key={match.id} match={match} />
                ))}
            </div>
        );
    };
    
    return (
        <div className="w-full lg:sticky lg:top-8 animate-fade-in">
             <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 relative">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Scores</h2>
                        {lastUpdated ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-500 dark:text-gray-400">Updates from around the globe</p>
                        )}
                    </div>
                    <div className="absolute top-3 right-3">
                         <button 
                            onClick={handleRefresh} 
                            disabled={isLoading} 
                            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                            aria-label="Refresh live scores"
                            title="Refresh live scores"
                        >
                            <RefreshIcon className={`h-5 w-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
                
                {renderContent()}

                <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Live score data provided by TheSportsDB.
                    </p>
                </div>
             </div>
        </div>
    );
};

export default LiveScores;
