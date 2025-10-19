import { HistoryItem } from '../types';

/**
 * Calls the secure backend Netlify function to get a match prediction.
 * The backend function will call the Gemini API and save the result to the database.
 *
 * @param {string} teamA - The name of the first team.
 * @param {string} teamB - The name of the second team.
 * @param {'men' | 'women'} matchCategory - The category of the match.
 * @returns {Promise<any>} A promise that resolves to the new prediction record from the database.
 */
export async function predictMatch(teamA: string, teamB: string, matchCategory: 'men' | 'women'): Promise<any> {
    const response = await fetch('/api/gemini-predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamA, teamB, matchCategory }),
    });

    if (!response.ok) {
        // Try to parse a specific error message from the backend, otherwise use a generic one.
        const errorBody = await response.json().catch(() => ({ error: 'An unexpected network error occurred.' }));
        const errorMessage = errorBody.error || `Request failed with status ${response.status}`;
        throw new Error(`[Network Error] ${errorMessage}`);
    }

    return response.json();
}

/**
 * The Gemini client is no longer initialized on the frontend.
 * This function is kept for compatibility but will always return undefined.
 * All Gemini calls are now handled by the secure backend function.
 * @returns {undefined}
 */
export function getInitializationError(): Error | undefined {
    return undefined;
}