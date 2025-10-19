




export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface BestBet {
  category: string;
  value: string;
  reasoning: string;
  confidence: string; // e.g. "75%"
  // New optional fields for Over/Under markets
  overValue?: string; // e.g. "Over 2.5"
  overConfidence?: string; // e.g. "80%"
  underValue?: string; // e.g. "Under 2.5"
  underConfidence?: string; // e.g. "20%"
}

export interface KeyStats {
  teamA_form: string;
  teamB_form: string;
  head_to_head: string;
}

export interface LeagueContext {
  leagueName: string | null;
  teamA_position: string | null;
  teamB_position: string | null;
  isRivalry: boolean;
  isDerby: boolean;
  contextualAnalysis: string | null;
}

export interface PlayerStat {
  playerName: string;
  teamName: string; // To help with filtering
  position: string; // e.g., 'Forward', 'Midfielder'
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface GoalScorerPrediction {
  playerName: string;
  teamName: string;
  probability: 'High' | 'Medium' | 'Low';
  reasoning: string;
}

export interface PredictionResultData {
  prediction: string;
  confidence: string;
  drawProbability: string;
  analysis: string;
  keyStats: KeyStats;
  bestBets: BestBet[];
  sources?: GroundingChunk[]; // Sources are optional from the main prediction
  availabilityFactors?: string;
  // New detailed match info
  venue?: string;
  kickoffTime?: string;
  referee?: string;
  teamA_logo?: string;
  teamB_logo?: string;
  leagueContext?: LeagueContext;
  playerStats?: PlayerStat[];
  goalScorerPredictions?: GoalScorerPrediction[];
  fromCache?: boolean; // Flag to indicate if the result is from cache
}

// This type represents a flattened prediction record, combining
// the prediction_data JSON with the main table columns.
export interface HistoryItem extends PredictionResultData {
    id: string; // UUID from the database
    teamA: string;
    teamB: string;
    timestamp: string; // Corresponds to the `created_at` field from the database
    matchCategory: 'men' | 'women';
    status?: 'pending' | 'won' | 'lost' | null;
}

// FIX: Add missing LiveMatch interface.
export interface LiveMatch {
    id: string;
    league: string;
    teamA: string;
    teamB: string;
    scoreA: number | null;
    scoreB: number | null;
    time: string;
    status: 'LIVE' | 'HT' | 'FT' | 'Not Started';
}

// FIX: Add missing SportsDBEvent interface.
export interface SportsDBEvent {
    idEvent: string;
    strLeague: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string | null;
    intAwayScore: string | null;
    strStatus: string | null;
}

// This type represents the raw data structure of a prediction
// as it is stored in the Supabase 'predictions' table.
export interface RawPrediction {
    id: string;
    created_at: string;
    team_a: string;
    team_b: string;
    match_category: 'men' | 'women';
    prediction_data: PredictionResultData;
    status: 'pending' | 'won' | 'lost' | null;
}

// This type defines the structure for the accuracy statistics object.
export interface AccuracyStats {
    total: number;
    wins: number;
}
