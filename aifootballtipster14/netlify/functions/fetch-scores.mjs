// This is a Netlify serverless function that acts as a secure proxy.
// It fetches the THESPORTSDB_KEY from server-side environment variables,
// calls TheSportsDB API, and returns the data to the client.
// This prevents exposing the API key in the browser.

export async function handler(event, context) {
    // 1. Get the secret API key from the environment variables.
    const apiKey = process.env.THESPORTSDB_KEY;

    // 2. If the key is not set on Netlify, return a clear error.
    if (!apiKey) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'The application administrator has not configured the API key for live scores.' }),
        };
    }
    
    // 3. Get today's date in YYYY-MM-DD format for the free API endpoint.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // 4. Construct the API URL to fetch today's soccer matches using the free endpoint.
    const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsday.php?d=${formattedDate}&s=Soccer`;

    try {
        // 5. Fetch data from TheSportsDB API.
        const response = await fetch(url);
        
        // 6. Handle potential errors from TheSportsDB (e.g., invalid key).
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`TheSportsDB API Error: Status ${response.status}`, errorText);
            return {
                statusCode: response.status,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: `Failed to fetch from TheSportsDB. Status: ${response.status}` }),
            };
        }
        
        const data = await response.json();
        
        // 7. Handle cases where the API returns null or no events gracefully.
        // The API returns {events: null} when there are no games on a given day.
        if (!data || !data.events) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: [] }), // Return an empty array
            };
        }

        // 8. Return the successful response to the client application.
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: data.events }),
        };

    } catch (error) {
        // 9. Handle network errors or other unexpected issues.
        console.error("Fatal error in fetch-scores function:", error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: `An internal server error occurred: ${error.message}` }),
        };
    }
};
