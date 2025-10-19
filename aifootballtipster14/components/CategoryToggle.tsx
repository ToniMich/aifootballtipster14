import React from 'react';
import { MaleIcon, FemaleIcon } from './icons';

interface CategoryToggleProps {
    selectedCategory: 'men' | 'women';
    onSelectCategory: (category: 'men' | 'women') => void;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ selectedCategory, onSelectCategory }) => {
    const getButtonClass = (category: 'men' | 'women') => {
        const isActive = selectedCategory === category;
        let baseClass = 'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800';
        
        if (category === 'men') {
            return `${baseClass} ${isActive 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'} focus:ring-blue-500`;
        } else { // women
            return `${baseClass} ${isActive 
                ? 'bg-pink-600 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'} focus:ring-pink-500`;
        }
    };

    return (
        <div className="flex w-full max-w-xs mx-auto bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg shadow-inner" role="radiogroup" aria-label="Match Category">
            <button 
                onClick={() => onSelectCategory('men')}
                className={getButtonClass('men')}
                role="radio"
                aria-checked={selectedCategory === 'men'}
            >
                <MaleIcon className="h-5 w-5" />
                <span>Men</span>
            </button>
            <button 
                onClick={() => onSelectCategory('women')}
                className={getButtonClass('women')}
                role="radio"
                aria-checked={selectedCategory === 'women'}
            >
                <FemaleIcon className="h-5 w-5" />
                <span>Women</span>
            </button>
        </div>
    );
};

export default CategoryToggle;
