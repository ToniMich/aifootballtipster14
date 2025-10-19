import React, { useState, useEffect } from 'react';
import { FootballIcon } from './icons';

interface TeamLogoProps {
    logoUrl?: string;
    teamName: string;
    sizeClass?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ logoUrl, teamName, sizeClass = "h-12 w-12" }) => {
    // State to track if the image has failed to load.
    const [hasError, setHasError] = useState(false);

    // Effect to reset the error state whenever the logoUrl prop changes.
    // This allows the component to correctly retry loading if a new URL is provided.
    useEffect(() => {
        setHasError(false);
    }, [logoUrl]);

    // If no logo URL is provided, or if the URL has previously failed to load,
    // render the default fallback icon.
    if (!logoUrl || hasError) {
        return <FootballIcon className={`${sizeClass} text-gray-400 dark:text-gray-500`} />;
    }

    // Render the team logo image.
    return (
        <img
            src={logoUrl}
            alt={`${teamName} logo`}
            className={`${sizeClass} object-contain`}
            // The onError handler is crucial for graceful fallback. If the image
            // fails to load, it sets the error state to true, triggering a re-render
            // with the fallback icon.
            onError={() => setHasError(true)}
        />
    );
};

export default TeamLogo;