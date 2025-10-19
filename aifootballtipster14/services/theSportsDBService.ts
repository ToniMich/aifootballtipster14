import { LiveMatch, SportsDBEvent } from '../types';

/**
 * Maps a raw event from TheSportsDB API to the LiveMatch format used by the frontend.
 * @param {SportsDBEvent} event - The raw event object.
 * @returns {LiveMatch} A formatted LiveMatch object.
 */
function mapEventToLiveMatch(event: SportsDBEvent): LiveMatch {
    const time = event.strStatus?.match(/^\d+'/) ? event.strStatus : (event.strStatus || 'NS');
    let status: LiveMatch['status'] = 'Not Started';

    if (time.includes("'")) {
        status = 'LIVE';
    } else if (time.toLowerCase().includes('half time') || time === 'HT') {
        status = 'HT';
    } else if (time.toLowerCase().includes('finished') || time === 'FT') {
        status = 'FT';
    }

    return {
        id: event.idEvent,
        league: event.strLeague,
        teamA: event.strHomeTeam,
        teamB: event.strAwayTeam,
        scoreA: event.intHomeScore ? parseInt(event.intHomeScore, 10) : null,
        scoreB: event.intAwayScore ? parseInt(event.intAwayScore, 10) : null,
        time: time,
        status: status,
    };
}


/**
 * Fetches live soccer scores from the secure backend Netlify function.
 * @returns {Promise<LiveMatch[]>} A promise that resolves to an array of live matches.
 */
export async function fetchLiveScores(): Promise<LiveMatch[]> {
    const response = await fetch('/api/fetch-scores');

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: 'Could not retrieve live scores.' }));
        throw new Error(errorBody.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.events) {
        // This handles cases where the API returns null (e.g., no matches, invalid key)
        return [];
    }

    // Filter for events that are in progress, half-time, or recently finished.
    const relevantEvents = data.events.filter((event: SportsDBEvent) => 
        event.strStatus && (event.strStatus.match(/^\d+'$/) || /half time|finished/i.test(event.strStatus))
    );

    return relevantEvents.map(mapEventToLiveMatch);
}