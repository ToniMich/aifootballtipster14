

# AI Football Tipster ⚽️🔮

**AI Football Tipster** is a sophisticated, AI-powered web application that provides detailed predictions and analyses for football matches. It leverages the power of Google's Gemini Pro model to deliver insights far beyond simple win/loss predictions, including key stats, tactical breakdowns, and data-driven betting tips.

![AI Football Tipster Screenshot](https://storage.googleapis.com/aistudio-hosting/readme-assets/ai-football-tipster/screenshot.png)

## ✨ Core Features

-   **🤖 AI-Powered Predictions**: Utilizes Google's Gemini Pro model to generate nuanced match predictions.
-   **📊 Detailed Breakdowns**: Each prediction includes a full analysis, confidence levels, recent form (W/D/L), and head-to-head statistics.
-   **📈 Analyst's Picks**: Suggests "Best Bets" for various markets like Match Winner and Over/Under Goals, complete with confidence percentages.
-   **⚡️ Live Scores**: Features a real-time sidebar with live scores from major matches around the world, powered by TheSportsDB API.
-   **🗂️ Prediction History**: All predictions are saved to a Supabase database, allowing users to track a history of the AI's performance.
-   **🎯 Accuracy Tracking**: Automatically calculates and displays the historical accuracy of winning predictions.
-   ** toggler Dark & Light Mode**: A sleek, user-friendly theme toggle for comfortable viewing in any lighting.
-   ** autocomplete Team Autocomplete**: An intuitive search that suggests team names as you type.
-   **🔒 Secure & Scalable**: Built with a serverless architecture using Netlify Functions, ensuring API keys and sensitive logic are never exposed on the frontend.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **Backend**: Netlify Functions (Serverless Node.js)
-   **AI Model**: Google Gemini Pro
-   **Database**: Supabase (PostgreSQL)
-   **Live Scores API**: TheSportsDB
-   **Hosting**: Netlify

## ⚙️ How It Works

The application follows a secure, serverless workflow:

1.  **User Input**: The user enters two team names and selects a match category (Men's/Women's) on the React frontend.
2.  **Secure API Call**: The request is sent to a secure Netlify Function (`/api/gemini-predict`).
3.  **AI Analysis**: The function calls the Gemini Pro API with a detailed prompt and a required JSON schema.
4.  **Structured Response**: Gemini analyzes the match and returns a structured JSON object containing the full prediction, stats, and analysis.
5.  **Database Storage**: The Netlify Function then saves this complete prediction to the Supabase database.
6.  **Display Results**: The newly saved record from the database is returned to the frontend and displayed to the user in a rich, interactive format.

## 🚀 Getting Started (For Developers)

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-football-tipster.git
cd ai-football-tipster
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

This project uses Netlify Functions, which rely on environment variables. You will need API keys from Google, Supabase, and TheSportsDB.

Create a `.env` file in the root of the project and add the following variables:

```
# .env

# Google Gemini API Key
# Get it from Google AI Studio: https://aistudio.google.com/app/apikey
API_KEY="your_google_gemini_api_key"

# Supabase Project Credentials
# Get them from your Supabase project settings -> API
SUPABASE_URL="your_supabase_project_url"
SUPABASE_ANON_KEY="your_supabase_public_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# TheSportsDB API Key for Live Scores
# Get it from: https://www.thesportsdb.com/user_reg.php
THESPORTSDB_KEY="your_thesportsdb_api_key"
```

### 4. Set Up Supabase Database

1.  Create a new project on [Supabase](https://supabase.com/).
2.  Go to the "SQL Editor" section.
3.  Run the following SQL script to create the `predictions` table:

```sql
-- Create the 'predictions' table
CREATE TABLE public.predictions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    team_a character varying NOT NULL,
    team_b character varying NOT NULL,
    match_category character varying NOT NULL DEFAULT 'men'::character varying,
    prediction_data jsonb,
    status character varying DEFAULT 'pending'::character varying,
    CONSTRAINT predictions_pkey PRIMARY KEY (id),
    CONSTRAINT predictions_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'won'::character varying, 'lost'::character varying])::text[])))
);

-- Enable Row Level Security (RLS) for the table
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access (using the anon key)
CREATE POLICY "Enable read access for all users"
ON public.predictions
FOR SELECT
USING (true);

-- Note: Inserts and updates are handled by the backend functions
-- using the SERVICE_ROLE_KEY, which bypasses RLS. This setup
-- ensures that the public can read data, but only the secure
-- backend can write or modify it.
```

### 5. Run the Project Locally

The project is configured to run with the Netlify CLI, which serves the frontend and the serverless functions together.

```bash
npm run dev
```

This will start the Vite development server and the Netlify Functions server. Your application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 📜 Disclaimer

This application is for entertainment purposes only. The predictions provided are generated by an AI model and should not be considered financial advice. Please gamble responsibly and only wager what you can afford to lose.
