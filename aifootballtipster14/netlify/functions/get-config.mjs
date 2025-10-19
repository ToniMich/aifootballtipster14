// This function securely provides the public Supabase URL and anon key to the frontend.
// It reads them from server-side environment variables, ensuring they are never hardcoded in the client application.

export async function handler(event, context) {
    // We only accept GET requests
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Configuration error: SUPABASE_URL or SUPABASE_ANON_KEY is not set in the server environment.");
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Server configuration is incomplete. Cannot initialize database connection.' }),
        };
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            supabaseUrl: supabaseUrl,
            supabaseAnonKey: supabaseAnonKey,
        }),
    };
};
