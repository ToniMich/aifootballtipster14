import React from 'react';
import { FootballIcon } from './icons';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center p-8 space-y-4">
            <FootballIcon className="animate-spin h-16 w-16 text-green-500 dark:text-green-400" />
            <span className="text-gray-800 dark:text-white text-lg font-medium">Analyzing Data...</span>
        </div>
    );
};

export default Loader;