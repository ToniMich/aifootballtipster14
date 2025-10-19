import React from 'react';
import { HistoryItem } from '../types';
import { FTLogoIcon, XMarkIcon, ChartPieIcon } from './icons';
import SocialShare from './SocialShare';
import TeamLogo from './TeamLogo';

interface TicketModalProps {
    ticket: HistoryItem | null;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
    if (!ticket) {
        return null;
    }

    const topBet = ticket.bestBets?.find(b => b.category === "Match Winner") || ticket.bestBets?.[0];

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-title"
        >
            <div 
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md m-auto overflow-hidden border border-gray-200 dark:border-gray-700"
                onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                {/* Header */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FTLogoIcon className="h-8 w-8" />
                        <h2 id="ticket-title" className="text-lg font-bold text-gray-800 dark:text-gray-200">Prediction Ticket</h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Close prediction ticket"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Teams */}
                    <div className="flex justify-around items-center mb-4 text-center">
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <TeamLogo logoUrl={ticket.teamA_logo} teamName={ticket.teamA} sizeClass="h-14 w-14" />
                            <span className="font-bold text-lg leading-tight break-words">{ticket.teamA}</span>
                        </div>
                        <span className="text-3xl font-light text-gray-400 dark:text-gray-500 mx-2">vs</span>
                        <div className="flex-1 flex flex-col items-center gap-2">
                             <TeamLogo logoUrl={ticket.teamB_logo} teamName={ticket.teamB} sizeClass="h-14 w-14" />
                            <span className="font-bold text-lg leading-tight break-words">{ticket.teamB}</span>
                        </div>
                    </div>

                    {/* Prediction */}
                    <div className="text-center my-6">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">AI PREDICTION</p>
                        <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 tracking-wide mt-1">{ticket.prediction}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Confidence: <span className="font-bold">{ticket.confidence}</span>
                        </p>
                    </div>

                    {/* Top Bet */}
                    {topBet && (
                         <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                               <ChartPieIcon className="h-6 w-6 text-green-600 dark:text-green-300 flex-shrink-0" />
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Top Bet</h4>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{topBet.category}: <span className="text-green-700 dark:text-green-300 font-bold">{topBet.value}</span></span>
                                <span className="text-sm font-bold bg-green-200 text-green-800 dark:bg-green-800/60 dark:text-green-200 px-2 py-0.5 rounded-full">{topBet.confidence}</span>
                            </div>
                         </div>
                    )}

                    {/* Share section */}
                    <SocialShare result={ticket} teamA={ticket.teamA} teamB={ticket.teamB} />
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
