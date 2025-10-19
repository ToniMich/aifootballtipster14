import React from 'react';
import { ChartPieIcon, CheckCircleIcon, TicketIcon } from './icons';

interface AccuracyTrackerProps {
    total: number;
    wins: number;
}

const AccuracyTracker: React.FC<AccuracyTrackerProps> = ({ total, wins }) => {
    // Calculate accuracy, handling the case where total is 0 to avoid division by zero.
    const accuracy = total > 0 ? Math.round((wins / total) * 100) : 0;

    const StatItem: React.FC<{ icon: React.ReactNode, value: string | number, label: string }> = ({ icon, value, label }) => (
        <div className="flex items-center gap-2" title={label}>
            {icon}
            <span className="font-semibold">{value}</span>
        </div>
    );

    return (
        <div className="hidden sm:flex items-center gap-4 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 shadow-sm">
            <StatItem 
                icon={<TicketIcon className="h-5 w-5 text-blue-500" />}
                value={total}
                label="Total Predictions"
            />
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            <StatItem 
                icon={<CheckCircleIcon className="h-5 w-5 text-green-500" />}
                value={wins}
                label="Winning Predictions"
            />
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            <StatItem 
                icon={<ChartPieIcon className="h-5 w-5 text-yellow-500" />}
                value={`${accuracy}%`}
                label="Accuracy"
            />
        </div>
    );
};

export default AccuracyTracker;
