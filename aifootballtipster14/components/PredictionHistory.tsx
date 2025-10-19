import React from 'react';
import { HistoryItem } from '../types';
import { TrashIcon, TicketIcon, CheckCircleIcon, XMarkIcon } from './icons';
import TeamLogo from './TeamLogo';

interface TicketCardProps {
    item: HistoryItem;
    onUpdateStatus: (id: string, status: 'won' | 'lost') => void;
    onSelect: (item: HistoryItem) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ item, onUpdateStatus, onSelect }) => {
    const statusClasses = {
        won: 'border-l-4 border-green-500',
        lost: 'border-l-4 border-red-500',
        pending: 'border-l-4 border-transparent',
    };
    const status = item.status || 'pending';

    const handleButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Stop the click from propagating to the parent div, which would open the modal.
        e.stopPropagation();
    };

    return (
        <div 
            onClick={() => onSelect(item)}
            className={`bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md overflow-hidden transition-all duration-300 ${statusClasses[status]} cursor-pointer hover:shadow-xl hover:scale-[1.02]`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
            aria-label={`View details for prediction: ${item.teamA} vs ${item.teamB}`}
        >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <TeamLogo logoUrl={item.teamA_logo} teamName={item.teamA} sizeClass="h-6 w-6" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.teamA}</p>
                        </div>
                        <span className="text-gray-400 dark:text-gray-500">vs</span>
                        <div className="flex items-center gap-2">
                            <TeamLogo logoUrl={item.teamB_logo} teamName={item.teamB} sizeClass="h-6 w-6" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.teamB}</p>
                        </div>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">{item.prediction}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0 space-y-1">
                    <div className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                        item.matchCategory === 'women' 
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}>
                        {item.matchCategory === 'women' ? "Women's Match" : "Men's Match"}
                    </div>
                    <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'short', day: 'numeric'
                        })}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString(undefined, {
                            hour: '2-digit', minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
            
            {(!item.status || item.status === 'pending') && (
                <div 
                    className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3"
                    onClick={handleButtonClick}
                >
                    <button 
                        onClick={() => onUpdateStatus(item.id, 'won')}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900 rounded-md transition-colors"
                        aria-label={`Mark prediction for ${item.teamA} vs ${item.teamB} as a win`}
                    >
                        <CheckCircleIcon className="h-4 w-4" />
                        Mark as Win
                    </button>
                    <button
                        onClick={() => onUpdateStatus(item.id, 'lost')}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900 rounded-md transition-colors"
                        aria-label={`Mark prediction for ${item.teamA} vs ${item.teamB} as a loss`}
                    >
                        <XMarkIcon className="h-4 w-4" />
                        Mark as Loss
                    </button>
                </div>
            )}
        </div>
    );
};

interface PredictionHistoryProps {
    tickets: HistoryItem[];
    onUpdateStatus: (id: string, status: 'won' | 'lost') => void;
    onSelectTicket: (ticket: HistoryItem) => void;
}

const PredictionHistory: React.FC<PredictionHistoryProps> = ({ tickets, onUpdateStatus, onSelectTicket }) => {
    return (
        <div className="w-full max-w-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <TicketIcon className="h-7 w-7 text-green-600 dark:text-green-300" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prediction History</h2>
                </div>
            </div>
            {tickets.length > 0 ? (
                <div className="space-y-4">
                    {tickets.map((item) => (
                        <TicketCard key={item.id} item={item} onUpdateStatus={onUpdateStatus} onSelect={onSelectTicket} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 px-4 bg-white dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Your predictions will appear here once generated.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Make a prediction to get started!</p>
                </div>
            )}
        </div>
    );
};

export default PredictionHistory;