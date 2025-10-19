import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HistoryItem, RawPrediction, AccuracyStats, PredictionResultData } from '../types';

// Singleton promise for fetching configuration to avoid multiple requests.
let configPromise: Promise<any> | null = null;
// Singleton promise to ensure we only initialize the Supabase client once.
let supabaseClientPromise: Promise<SupabaseClient> | null = null;

/**
 * Fetches the application configuration from a serverless function.
 * It uses a singleton promise to ensure the configuration is fetched only once.
 * @returns {Promise<any>} A promise that resolves to the configuration object.
 */
const getConfig = (): Promise<any> => {
    if (configPromise) {
        return configPromise;
    }

    // Create a new promise to fetch the configuration.
    configPromise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/api/get-config');
            if (!response.ok) {
                // Provide a specific, helpful error message for a 404 status.
                if (response.status === 404) {
                    throw new Error("Configuration endpoint not found at '/api/get-config'. Please ensure your Netlify serverless function is deployed correctly.");
                }
                // Handle other potential server errors.
                let errorMsg = `Server responded with status ${response.status}`;
                try {
                    const errorBody = await response.json();
                    errorMsg = errorBody.error || errorMsg;
                } catch {
                    // Ignore JSON parsing errors if the response body is not JSON.
                }
                throw new Error(errorMsg);
            }
            const config = await response.json();
            resolve(config);
        } catch (error) {
            // Reset the promise on failure to allow for a retry on the next call.
            configPromise = null;
            reject(error);
        }
    });
    return configPromise;
};


/**
 * Initializes the Supabase client using the fetched configuration.
 * It uses a singleton pattern to prevent multiple initializations.
 * @returns {Promise<SupabaseClient>} A promise that resolves to the initialized Supabase client.
 */
const getSupabaseClient = (): Promise<SupabaseClient> => {
    if (supabaseClientPromise) {
        return supabaseClientPromise;
    }

    // Create a new promise to initialize Supabase.
    supabaseClientPromise = new Promise(async (resolve, reject) => {
        try {
            // Use the shared getConfig function.
            const config = await getConfig();

            if (!config.supabaseUrl || !config.supabaseAnonKey) {
                throw new Error("Invalid Supabase configuration received from the server.");
            }

            const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
            resolve(supabase);
        } catch (error) {
            console.error("Supabase initialization failed:", error);
            // Reset the promise so that the next call can retry initialization.
            supabaseClientPromise = null;
            reject(error);
        }
    });

    return supabaseClientPromise;
};

/**
 * Maps the raw prediction data from the database to the HistoryItem type used by the frontend.
 * @param {RawPrediction} rawPrediction - The raw prediction object from Supabase.
 * @returns {HistoryItem} A formatted history item.
 */
const mapPredictionToHistoryItem = (rawPrediction: RawPrediction): HistoryItem => {
    return {
        // Spread the nested JSON data to the top level
        ...rawPrediction.prediction_data,
        // Map the main table columns
        id: rawPrediction.id,
        teamA: rawPrediction.team_a,
        teamB: rawPrediction.team_b,
        matchCategory: rawPrediction.match_category,
        timestamp: rawPrediction.created_at, // Use created_at as the timestamp
        status: rawPrediction.status,
    };
};

/**
 * Fetches the prediction history from the database.
 * @returns {Promise<HistoryItem[]>} A promise that resolves to an array of history items.
 */
export const getPredictionHistory = async (): Promise<HistoryItem[]> => {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50); // Limit to the last 50 predictions for performance

    if (error) {
        console.error("Error fetching history:", error);
        throw new Error("Could not fetch prediction history.");
    }

    // Ensure data is not null before mapping
    return (data || []).map(mapPredictionToHistoryItem);
};

/**
 * Calculates accuracy stats by fetching all prediction statuses.
 * This is more efficient than running multiple count queries.
 * @returns {Promise<AccuracyStats>} A promise that resolves to the accuracy stats.
 */
export const getAccuracyStats = async (): Promise<AccuracyStats> => {
    const supabase = await getSupabaseClient();
    // Fetch only the 'status' column for all predictions to calculate stats.
    const { data, error } = await supabase
        .from('predictions')
        .select('status');

    if (error) {
        console.error("Error fetching accuracy stats:", error);
        throw new Error("Could not calculate accuracy stats.");
    }

    const predictions = data || [];
    const total = predictions.length;
    // Filter for wins among non-pending predictions.
    const wins = predictions.filter(p => p.status === 'won').length;
    
    return {
        total,
        wins,
    };
};

/**
 * Updates the status of a specific prediction in the database.
 * @param {string} id - The UUID of the prediction to update.
 * @param {'won' | 'lost'} status - The new status.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export const updatePredictionStatus = async (id: string, status: 'won' | 'lost'): Promise<void> => {
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('predictions')
        .update({ status: status })
        .eq('id', id)
        // This prevents updating predictions that are already marked as 'won' or 'lost'.
        .eq('status', 'pending');

    if (error) {
        console.error("Error updating prediction status:", error);
        throw new Error("Could not update the prediction status.");
    }
};
