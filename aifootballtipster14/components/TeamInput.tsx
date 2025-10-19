import React, { useState } from 'react';
import { teamNames } from '../data/teams';

interface TeamInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    disabled: boolean;
    className?: string;
}

const TeamInput: React.FC<TeamInputProps> = ({ value, onChange, placeholder, disabled, className }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        onChange(query);
        if (query.length > 1) {
            const filtered = teamNames
                .filter(team => team.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 7);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (teamName: string) => {
        onChange(teamName);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleFocus = () => {
         if (value.length > 1) {
            const filtered = teamNames
                .filter(team => team.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 7);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        }
    }

    const handleBlur = () => {
        // Delay hiding to allow click event on suggestion to process
        setTimeout(() => {
            setShowSuggestions(false);
        }, 150);
    };

    const getHighlightedText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <strong key={i} className="font-bold">{part}</strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((team, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleSuggestionClick(team)}
                            className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            {getHighlightedText(team, value)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamInput;