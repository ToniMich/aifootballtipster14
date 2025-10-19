// This is a Netlify serverless function.
// It acts as a secure backend to call the Gemini API.

// Use import for ES Modules
import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

// Get environment variables from Netlify settings
const { API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

// Initialize Supabase client with the service role key for admin privileges.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Define the JSON schema for the AI's response using the Gemini API's `responseSchema` format.
// This is more reliable than embedding a stringified JSON in the prompt.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prediction: { type: Type.STRING, description: "The match outcome prediction, e.g., 'Team A to Win', 'Draw'." },
        confidence: { type: Type.STRING, description: "The confidence level for the prediction: 'High', 'Medium', or 'Low'." },
        drawProbability: { type: Type.STRING, description: "The estimated probability of a draw, e.g., '25%'." },
        analysis: { type: Type.STRING, description: "A detailed, 2-3 paragraph analysis covering team form, tactics, and key matchups." },
        keyStats: {
            type: Type.OBJECT,
            properties: {
                teamA_form: { type: Type.STRING, description: "Recent form for Team A (last 5 games), e.g., 'WWLDW'." },
                teamB_form: { type: Type.STRING, description: "Recent form for Team B (last 5 games), e.g., 'DLLWW'." },
                head_to_head: { type: Type.STRING, description: "A brief summary of recent head-to-head results." },
            },
        },
        bestBets: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "Betting market category, e.g., 'Match Winner'." },
                    value: { type: Type.STRING, description: "The predicted value for the bet, e.g., 'Team A'." },
                    reasoning: { type: Type.STRING, description: "A brief justification for this bet." },
                    confidence: { type: Type.STRING, description: "Confidence in the bet as a percentage, e.g., '80%'." },
                    overValue: { type: Type.STRING, description: "The 'Over' value for goal-based bets, e.g., 'Over 2.5'." },
                    overConfidence: { type: Type.STRING, description: "Confidence for the 'Over' bet." },
                    underValue: { type: Type.STRING, description: "The 'Under' value for goal-based bets, e.g., 'Under 2.5'." },
                    underConfidence: { type: Type.STRING, description: "Confidence for the 'Under' bet." },
                },
            },
        },
        availabilityFactors: { type: Type.STRING, description: "Key injuries or suspensions, or 'No significant availability issues reported.'." },
        venue: { type: Type.STRING, description: "The match venue, e.g., 'Anfield, Liverpool'." },
        kickoffTime: { type: Type.STRING, description: "The match start time, e.g., '20:00 GMT, Saturday'." },
        referee: { type: Type.STRING, description: "The name of the match referee, e.g., 'Michael Oliver'." },
        leagueContext: {
            type: Type.OBJECT,
            properties: {
                leagueName: { type: Type.STRING },
                teamA_position: { type: Type.STRING },
                teamB_position: { type: Type.STRING },
                isRivalry: { type: Type.BOOLEAN },
                isDerby: { type: Type.BOOLEAN },
                contextualAnalysis: { type: Type.STRING, description: "Analysis related to league standings or rivalry context." },
            },
        },
        playerStats: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    playerName: { type: Type.STRING },
                    teamName: { type: Type.STRING },
                    position: { type: Type.STRING },
                    goals: { type: Type.INTEGER },
                    assists: { type: Type.INTEGER },
                    yellowCards: { type: Type.INTEGER },
                    redCards: { type: Type.INTEGER },
                },
            },
        },
        goalScorerPredictions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    playerName: { type: Type.STRING },
                    teamName: { type: Type.STRING },
                    probability: { type: Type.STRING, description: "'High', 'Medium', or 'Low'." },
                    reasoning: { type: Type.STRING },
                },
            },
        },
    },
};

export async function handler(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { teamA, teamB, matchCategory } = JSON.parse(event.body);

        // --- 1. Call Gemini API for Prediction with a Defined JSON Schema ---
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const prompt = `Analyze the upcoming ${matchCategory}'s soccer match between ${teamA} (Home) and ${teamB} (Away). Provide a detailed prediction including analysis, key stats, betting tips, and player information.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                // Enforce JSON output according to the defined schema.
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        // --- 2. Validate the API Response ---
        // A robust check to ensure the response is valid and not blocked.
        const candidate = response?.candidates?.[0];
        const blockReason = response?.promptFeedback?.blockReason;

        // Check for prompt blocks first.
        if (blockReason) {
            console.warn(`Gemini prompt was blocked for safety reasons: ${blockReason}`);
            throw new Error(`The request was blocked by the AI's safety filter (${blockReason}). Please try different team names.`);
        }
        
        // Check for response blocks or other issues like missing content.
        if (!candidate || !candidate.content?.parts?.[0]?.text) {
            const finishReason = candidate?.finishReason || 'NO_CANDIDATE';
            console.warn(`Gemini returned an invalid or empty response. Finish Reason: ${finishReason}`);

            let userMessage = "The AI did not return a valid prediction. This can happen with very obscure teams or due to network issues.";
            if (finishReason === 'SAFETY') {
                userMessage = 'The AI\'s response was blocked by its safety filter. Please try a different match-up.';
            } else if (finishReason === 'MAX_TOKENS') {
                userMessage = 'The AI\'s response was too long and was cut off before it could be completed.';
            }
            throw new Error(userMessage);
        }
        
        // Log if the model stopped for a reason other than 'STOP', but still proceed if content exists.
        if (candidate.finishReason !== 'STOP') {
            console.warn(`Gemini generation finished unexpectedly. Reason: ${candidate.finishReason}`);
        }

        const predictionText = candidate.content.parts[0].text;
        
        let predictionData;
        try {
            predictionData = JSON.parse(predictionText);
        } catch (e) {
            console.error("Failed to parse JSON from Gemini:", predictionText);
            throw new Error("The AI returned an invalid JSON response. Please try again.");
        }
        
        // --- 3. Save the Prediction to Supabase ---
        const { data: savedPrediction, error: dbError } = await supabase
            .from('predictions')
            .insert({
                team_a: teamA,
                team_b: teamB,
                match_category: matchCategory,
                prediction_data: predictionData, // The validated JSON from Gemini
                status: 'pending'
            })
            .select()
            .single();

        if (dbError) {
            console.error('Supabase DB Error:', dbError);
            throw new Error(`Failed to save prediction to the database: ${dbError.message}`);
        }

        // --- 4. Return the Saved Record to the Frontend ---
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(savedPrediction),
        };

    } catch (error) {
        console.error('Error in gemini-predict function:', error);
        
        let statusCode = 500;
        let errorMessage = error.message || 'An unknown error occurred.';

        // --- Enhanced Error Handling ---
        // Map specific error messages from the API/service to user-friendly feedback.
        if (errorMessage.toLowerCase().includes('api key not valid')) {
            statusCode = 401; // Unauthorized
            errorMessage = '[API Key Error] The Gemini API key is invalid or missing. Please check the server configuration.';
        } else if (errorMessage.toLowerCase().includes('quota')) {
            statusCode = 429; // Too Many Requests
            errorMessage = '[Quota Error] The application has exceeded its API usage limit. Please try again later.';
        } else if (errorMessage.includes("safety filter")) {
            statusCode = 400; // Bad Request
            errorMessage = `[Safety Block] ${errorMessage}`;
        } else if (errorMessage.includes("JSON")) {
            statusCode = 500;
            errorMessage = `[Invalid Response] ${errorMessage}`;
        } else if (errorMessage.includes("database")) {
            statusCode = 500;
            errorMessage = `[Database Error] A problem occurred while saving the prediction.`;
        } else {
            // Use the already constructed user-friendly message for other handled cases.
            // If it's a generic error, create a generic message.
            if (!errorMessage.startsWith('[')) {
                 errorMessage = `[Prediction Error] An unexpected issue occurred.`;
            }
        }
        
        return {
            statusCode: statusCode,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: errorMessage }),
        };
    }
};
