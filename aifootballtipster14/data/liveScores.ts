import { LiveMatch } from '../types';

// This file provides mock data for the LiveScores component.
// It's useful for development, testing, or as a fallback
// when the live API is unavailable.

export const mockLiveScores: LiveMatch[] = [
  {
    id: '1001',
    league: 'Premier League',
    teamA: 'Manchester United',
    teamB: 'Liverpool',
    scoreA: 1,
    scoreB: 1,
    time: "68'",
    status: 'LIVE',
  },
  {
    id: '1002',
    league: 'La Liga',
    teamA: 'Real Madrid',
    teamB: 'FC Barcelona',
    scoreA: 2,
    scoreB: 0,
    time: "HT",
    status: 'HT',
  },
  {
    id: '1003',
    league: 'Serie A',
    teamA: 'Juventus',
    teamB: 'AC Milan',
    scoreA: 0,
    scoreB: 0,
    time: "21'",
    status: 'LIVE',
  },
  {
    id: '1004',
    league: 'Bundesliga',
    teamA: 'Bayern Munich',
    teamB: 'Borussia Dortmund',
    scoreA: 3,
    scoreB: 2,
    time: 'FT',
    status: 'FT',
  }
];
