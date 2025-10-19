import React from 'react';
import { HistoryItem } from '../types';
import { TicketIcon } from './icons';

interface TrackRecordProps {
  history: HistoryItem[];
}

const TrackRecord: React.FC<TrackRecordProps> = ({ history }) => {
  // Get the last 10 predictions that have a definitive status ('won' or 'lost').
  const recentOutcomes = history
    .filter(item => item.status === 'won' || item.status === 'lost')
    .slice(0, 10);

  const getStatusColor = (status: 'won' | 'lost' | 'pending' | null) => {
    if (status === 'won') return { bg: 'bg-green-500', title: 'Win' };
    if (status === 'lost') return { bg: 'bg-red-500', title: 'Loss' };
    return { bg: 'bg-gray-400', title: 'Pending' };
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <TicketIcon className="h-7 w-7 text-green-600 dark:text-green-300" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Track Record</h3>
      </div>
      {recentOutcomes.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Last {recentOutcomes.length} completed predictions (most recent on the right):
          </p>
          <div className="flex justify-end items-center gap-2 flex-wrap-reverse">
            {recentOutcomes.map(item => {
              const { bg, title } = getStatusColor(item.status);
              return (
                <div
                  key={item.id}
                  className={`h-6 w-6 rounded-full shadow-md transition-transform hover:scale-125 ${bg}`}
                  title={`${title}: ${item.teamA} vs ${item.teamB}`}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No completed predictions yet. Mark some predictions as 'won' or 'lost' to see the track record.
        </p>
      )}
    </div>
  );
};

export default TrackRecord;
