import React, { useState, useCallback, useEffect, useRef } from 'react';
import { predictMatch } from './services/geminiService';
import { HistoryItem } from './types';
import { getPredictionHistory, getAccuracyStats, updatePredictionStatus } from './services/supabaseService';
import { getTheme, setTheme as saveTheme } from './services/localStorageService';
import Loader from './components/Loader';
import PredictionResult from './components/PredictionResult';
import { FTLogoIcon, SunIcon, MoonIcon, WarningIcon } from './components/icons';
import TeamInput from './components/TeamInput';
import DonationBlock from './components/DonationBlock';
import CategoryToggle from './components/CategoryToggle';
import PredictionHistory from './components/PredictionHistory';
import LiveScores from './components/LiveScores';
import AccuracyTracker from './components/AccuracyTracker';
import TicketModal from './components/TicketModal';
import TrackRecord from './components/TrackRecord';
import PredictionFeed from './components/PredictionFeed';

interface AccuracyStats {
    total: number;
    wins: number;
}

const App: React.FC = () => {
    const [teamA, setTeamA] = useState<string>('');
    const [teamB, setTeamB] = useState<string>('');
    const [predictionResult, setPredictionResult] = useState<HistoryItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [accuracyStats, setAccuracyStats] = useState<AccuracyStats>({ total: 0, wins: 0 });
    const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());
    const [matchCategory, setMatchCategory] = useState<'men' | 'women'>('men');
    const isCancelledRef = useRef(false);
    const [selectedTicket, setSelectedTicket] = useState<HistoryItem | null>(null);

    const refreshData = useCallback(async () => {
        try {
            const [fetchedHistory, fetchedStats] = await Promise.all([
                getPredictionHistory(),
                getAccuracyStats()
            ]);
            setHistory(fetchedHistory);
            setAccuracyStats(fetchedStats);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from the server.';
            setError(errorMessage);
            console.error(err);
        }
    }, []);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        saveTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    const handleStopOrReset = () => {
        if (isLoading) {
            isCancelledRef.current = true;
        }
        setIsLoading(false);
        setError(null);
        setPredictionResult(null);
        setTeamA('');
        setTeamB('');
    };

    const handleUpdatePredictionStatus = async (id: string, status: 'won' | 'lost') => {
        try {
            await updatePredictionStatus(id, status);
            await refreshData();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating status.';
            setError(errorMessage);
        }
    };
    
    const handlePredict = useCallback(async () => {
        const trimmedA = teamA.trim();
        const trimmedB = teamB.trim();
        const validTeamNameRegex = /^[\p{L}0-9\s.'&()-]+$/u;

        if (!trimmedA || !trimmedB) { setError('Please enter names for both teams.'); return; }
        if (trimmedA.length < 2 || trimmedA.length > 50 || trimmedB.length < 2 || trimmedB.length > 50) { setError('Team names must be between 2 and 50 characters long.'); return; }
        if (!validTeamNameRegex.test(trimmedA) || !validTeamNameRegex.test(trimmedB)) { setError("Team names can only include letters, numbers, spaces, and .'-&()"); return; }
        if (trimmedA.toLowerCase() === trimmedB.toLowerCase()) { setError('Please enter two different team names.'); return; }
        
        isCancelledRef.current = false;
        setIsLoading(true);
        setError(null);
        setPredictionResult(null);

        try {
            const newPredictionRaw = await predictMatch(trimmedA, trimmedB, matchCategory);
            if (isCancelledRef.current) return;
            
            const newPrediction: HistoryItem = {
                ...newPredictionRaw.prediction_data,
                id: newPredictionRaw.id,
                teamA: newPredictionRaw.team_a,
                teamB: newPredictionRaw.team_b,
                matchCategory: newPredictionRaw.match_category,
                timestamp: newPredictionRaw.created_at,
                status: newPredictionRaw.status,
            };
            
            setPredictionResult(newPrediction);
            await refreshData();

        } catch (err) {
            if (isCancelledRef.current) return;
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            console.error(err);
        } finally {
            if (!isCancelledRef.current) {
                setIsLoading(false);
            }
        }
    }, [teamA, teamB, matchCategory, refreshData]);

    const handleShowTicketDetails = (ticket: HistoryItem) => {
        setSelectedTicket(ticket);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
    };
    
    const appBgStyle = theme === 'dark' 
        ? { background: 'radial-gradient(circle, #1a2a22 0%, #111827 100%)' } 
        : {};
        
    const inputClassName = "w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300 text-center sm:text-left disabled:cursor-not-allowed";
    
    return (
        <div className="min-h-screen bg-stone-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8 transition-colors duration-300" style={appBgStyle}>
            <TicketModal ticket={selectedTicket} onClose={handleCloseModal} />
            <div className="max-w-7xl mx-auto">
                <header className="w-full relative text-center my-8 animate-fade-in-down">
                    <div className="flex justify-center items-center gap-4">
                        <FTLogoIcon className="h-12 w-12" />
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-green-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-green-300 to-green-500">
                            AIFootballTipster
                        </h1>
                    </div>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Your expert AI-powered guide for football match tips and analysis.
                    </p>
                    <div className="absolute top-0 right-0 flex items-center gap-2">
                         <AccuracyTracker total={accuracyStats.total} wins={accuracyStats.wins} />
                        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-stone-100 dark:focus:ring-offset-gray-900 transition-colors" aria-label="Toggle theme">
                            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6 text-yellow-300" />}
                        </button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <section className="lg:col-span-2 flex flex-col items-center w-full space-y-8">
                        <div className="w-full max-w-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-6 sm:p-8">
                            <CategoryToggle
                                selectedCategory={matchCategory}
                                onSelectCategory={setMatchCategory}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center mt-6">
                                <div className="col-span-1 sm:col-span-2">
                                    <TeamInput
                                        value={teamA}
                                        onChange={setTeamA}
                                        placeholder="Home Team"
                                        disabled={isLoading}
                                        className={inputClassName}
                                    />
                                </div>
                                <span className="col-span-1 text-center text-2xl font-bold text-gray-500 dark:text-gray-400">VS</span>
                                <div className="col-span-1 sm:col-span-2">
                                    <TeamInput
                                        value={teamB}
                                        onChange={setTeamB}
                                        placeholder="Away Team"
                                        disabled={isLoading}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex w-full items-center gap-4">
                                <button
                                    onClick={handlePredict}
                                    disabled={isLoading}
                                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 dark:disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/30 text-lg"
                                >
                                    {isLoading ? 'Analyzing...' : 'Predict Match'}
                                </button>
                                {(isLoading || predictionResult || error) && (
                                    <button
                                        onClick={handleStopOrReset}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 text-lg"
                                        aria-label={isLoading ? 'Stop prediction' : 'Reset form'}
                                    >
                                        {isLoading ? 'Stop' : 'Reset'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div id="prediction-result-container" className="w-full max-w-2xl">
                            {isLoading ? <Loader /> : 
                                <PredictionResult result={predictionResult} error={error} teamA={teamA} teamB={teamB} />
                            }
                        </div>
                        
                        <PredictionHistory 
                            tickets={history} 
                            onUpdateStatus={handleUpdatePredictionStatus}
                            onSelectTicket={handleShowTicketDetails}
                        />

                        <div className="w-full max-w-2xl space-y-8">
                            <PredictionFeed tickets={history} />
                            <TrackRecord history={history} />
                        </div>
                    </section>

                    <aside className="lg:col-span-1 w-full space-y-8">
                        <LiveScores />
                        <DonationBlock />
                    </aside>
                </main>

                <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm py-6 border-t border-gray-200 dark:border-gray-700">
                    <p>&copy; {new Date().getFullYear()} AIFootballTipster. All rights reserved.</p>
                    <p className="mt-1">Built with Gemini AI. For entertainment purposes only. Please gamble responsibly.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;