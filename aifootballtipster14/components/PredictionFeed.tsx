import React from 'react';
import { HistoryItem } from '../types';
import TeamLogo from './TeamLogo';
import { FTLogoIcon } from './icons';

const FeedItem: React.FC<{ item: HistoryItem }> = ({ item }) => (
  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg flex items-center gap-4">
    <div className="flex-shrink-0">
        <TeamLogo logoUrl={item.teamA_logo} teamName={item.teamA} sizeClass="h-8 w-8" />
        <TeamLogo logoUrl={item.teamB_logo} teamName={item.teamB} sizeClass="h-8 w-8 -mt-2" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {item.teamA} vs {item.teamB}
      </p>
      <p className="text-md font-bold text-green-600 dark:text-green-400">
        {item.prediction}
      </p>
    </div>
    <div className="text-right">
       <p className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);


interface PredictionFeedProps {
    tickets: HistoryItem[];
}

const PredictionFeed: React.FC<PredictionFeedProps> = ({ tickets }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <FTLogoIcon className="h-7 w-7 text-green-500" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Live Prediction Feed</h3>
      </div>
      {tickets.length > 0 ? (
        <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
          {tickets.slice(0, 10).map(item => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          <p>The latest predictions will appear here in real-time.</p>
        </div>
      )}
    </div>
  );
};

export default PredictionFeed;
