

import React from 'react';
import { PredictionResultData, BestBet, PlayerStat, GoalScorerPrediction } from '../types';
import { ChartPieIcon, WarningIcon, LocationMarkerIcon, CalendarIcon, WhistleIcon, FireIcon, LightningBoltIcon, TableCellsIcon, TrophyIcon, AssistIcon, CardIcon } from './icons';
import TeamLogo from './TeamLogo';
import SocialShare from './SocialShare';

interface PredictionResultProps {
  result: PredictionResultData | null;
  error: string | null;
  teamA: string;
  teamB: string;
}

const TeamForm: React.FC<{ form: string }> = ({ form = '' }) => {
    const getFormColor = (result: string) => {
        switch (result.toUpperCase()) {
            case 'W': return 'bg-green-500';
            case 'D': return 'bg-yellow-500';
            case 'L': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    
    return (
        <div className="flex gap-1.5">
            {(form || '?????').slice(0, 5).split('').map((result, index) => (
                <div key={index} className={`h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${getFormColor(result)}`} title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : result === 'L' ? 'Loss' : 'Unknown'}>
                    {result.toUpperCase()}
                </div>
            ))}
        </div>
    );
};

const ConfidenceBar: React.FC<{ confidence: string }> = ({ confidence }) => {
    const level = confidence?.toLowerCase() || '';
    
    const levels = [
        { name: 'Low', color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' },
        { name: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' },
        { name: 'High', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' },
    ];

    const currentLevelIndex = levels.findIndex(l => l.name.toLowerCase() === level);
    const activeLevel = levels[currentLevelIndex] || { name: 'N/A', color: 'bg-gray-400', textColor: 'text-gray-500' };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence</span>
                <span className={`text-sm font-bold ${activeLevel.textColor}`}>{activeLevel.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
                {levels.map((l, index) => (
                    <div
                        key={l.name}
                        className={`h-2.5 rounded-full transition-colors ${
                            index <= currentLevelIndex ? activeLevel.color : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const ConfidenceRing: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 30;
    const stroke = 5;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative h-20 w-20">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 70 70"
                className="transform -rotate-90"
            >
                <circle
                    className="text-gray-200 dark:text-gray-600"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-200">
                {`${percentage}%`}
            </span>
        </div>
    );
};


const BetCard: React.FC<{ bet: BestBet }> = ({ bet }) => {
    const confidenceValue = parseInt(bet.confidence, 10) || 0;
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex flex-col justify-between h-full">
            <div className="text-center">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">{bet.category}</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 my-2">{bet.value}</p>
                <div className="flex justify-center my-3">
                     <ConfidenceRing percentage={confidenceValue} />
                </div>
            </div>

            {bet.overConfidence && bet.underConfidence && bet.overValue && bet.underValue && (
                <div className="my-3 text-sm">
                    {/* Visual progress bar with clearer colors */}
                    <div className="flex w-full h-2.5 bg-red-500 dark:bg-red-900/60 rounded-full overflow-hidden" aria-label="Over/Under Probability Bar">
                        <div
                            className="bg-green-500 transition-all duration-500"
                            style={{ width: bet.overConfidence }}
                            role="progressbar"
                            aria-valuenow={parseInt(bet.overConfidence, 10)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            title={`${bet.overValue}: ${bet.overConfidence}`}
                        ></div>
                    </div>
                    {/* Labels for the bar */}
                    <div className="flex justify-between mt-1.5 px-1">
                        <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">{bet.overValue}: <strong>{bet.overConfidence}</strong></span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">{bet.underValue}: <strong>{bet.underConfidence}</strong></span>
                            <div className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            )}
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">{bet.reasoning}</p>
        </div>
    );
};

const StatDisplay: React.FC<{ icon: React.ReactNode, value: number, label: string }> = ({ icon, value, label }) => (
    <div className="flex flex-col items-center" title={label}>
        <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            {icon}
            <span className="font-bold text-lg">{value}</span>
        </div>
    </div>
);

const PlayerStatItem: React.FC<{ player: PlayerStat }> = ({ player }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-2 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-800 dark:text-gray-200">{player.playerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{player.position}</p>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
                <StatDisplay icon={<TrophyIcon className="h-4 w-4 text-yellow-500"/>} value={player.goals} label="Goals" />
                <StatDisplay icon={<AssistIcon className="h-4 w-4 text-blue-500"/>} value={player.assists} label="Assists" />
                <StatDisplay icon={<CardIcon className="h-4 w-4 text-yellow-400"/>} value={player.yellowCards} label="Yellow Cards" />
                <StatDisplay icon={<CardIcon className="h-4 w-4 text-red-600"/>} value={player.redCards} label="Red Cards" />
            </div>
        </div>
    );
};

const PlayerStatsSection: React.FC<{ playerStats: PlayerStat[], teamA: string, teamB: string }> = ({ playerStats, teamA, teamB }) => {
    const teamAPlayers = playerStats.filter(p => p.teamName.toLowerCase().includes(teamA.toLowerCase()));
    const teamBPlayers = playerStats.filter(p => p.teamName.toLowerCase().includes(teamB.toLowerCase()));

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-green-500/20 dark:border-green-500/50 pb-2">Key Player Spotlight</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">{teamA}</h4>
                    {teamAPlayers.length > 0 ? (
                        teamAPlayers.map(player => <PlayerStatItem key={player.playerName} player={player} />)
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No key player data available.</p>
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">{teamB}</h4>
                    {teamBPlayers.length > 0 ? (
                        teamBPlayers.map(player => <PlayerStatItem key={player.playerName} player={player} />)
                    ) : (
                         <p className="text-sm text-gray-500 dark:text-gray-400">No key player data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const GoalScorerCard: React.FC<{ scorer: GoalScorerPrediction }> = ({ scorer }) => {
    const probabilityColors = {
        high: 'text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700',
        medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
        low: 'text-orange-600 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-700',
    };
    const probability = scorer.probability.toLowerCase() as keyof typeof probabilityColors;
    
    return (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-sm">
            <div className="flex justify-between items-start gap-2">
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{scorer.playerName}</p>
                </div>
                <div className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${probabilityColors[probability] || 'text-gray-500 bg-gray-200'}`}>
                    {scorer.probability}
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 italic">"{scorer.reasoning}"</p>
        </div>
    );
};

const GoalScorersSection: React.FC<{ scorers: GoalScorerPrediction[], teamA: string, teamB: string }> = ({ scorers, teamA, teamB }) => {
    const teamAScorers = scorers.filter(s => s.teamName.toLowerCase().includes(teamA.toLowerCase()));
    const teamBScorers = scorers.filter(s => s.teamName.toLowerCase().includes(teamB.toLowerCase()));

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-green-500/20 dark:border-green-500/50 pb-2">Anytime Goal Scorer Picks</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                 <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">{teamA}</h4>
                    <div className="space-y-3">
                    {teamAScorers.length > 0 ? (
                        teamAScorers.map(scorer => <GoalScorerCard key={scorer.playerName} scorer={scorer} />)
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No likely scorers identified.</p>
                    )}
                    </div>
                </div>
                 <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">{teamB}</h4>
                    <div className="space-y-3">
                    {teamBScorers.length > 0 ? (
                        teamBScorers.map(scorer => <GoalScorerCard key={scorer.playerName} scorer={scorer} />)
                    ) : (
                         <p className="text-sm text-gray-500 dark:text-gray-400">No likely scorers identified.</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PredictionResult: React.FC<PredictionResultProps> = ({ result, error, teamA, teamB }) => {
  if (error) {
    let errorTitle = "An Error Occurred";
    let errorMessage = error; // Default to showing the full error message

    if (error.startsWith("[API Key Error]")) {
        errorTitle = "API Configuration Error";
        errorMessage = error.replace("[API Key Error] ", "");
    } else if (error.startsWith("[Parsing Error]") || error.startsWith("[Invalid Response]")) {
        errorTitle = "Invalid AI Response";
        errorMessage = error.replace(/\[(Parsing Error|Invalid Response)\] /, "");
    } else if (error.startsWith("[Network Error]")) {
        errorTitle = "Connection Error";
        errorMessage = error.replace("[Network Error] ", "");
    }

    return (
      <div className="mt-8 p-6 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-500 rounded-lg text-red-800 dark:text-red-300 text-center animate-fade-in">
        <div className="flex justify-center items-center gap-3 mb-3">
            <WarningIcon className="h-7 w-7" />
            <h3 className="text-xl font-bold">{errorTitle}</h3>
        </div>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { prediction, confidence, drawProbability, analysis, bestBets, keyStats, sources, availabilityFactors, venue, kickoffTime, referee, teamA_logo, teamB_logo, leagueContext, playerStats, goalScorerPredictions } = result;
  
  const hasSignificantAvailabilityNews = availabilityFactors && !availabilityFactors.toLowerCase().includes('no significant');
  const hasMatchDetails = venue || kickoffTime || referee;
  const hasLeagueContext = leagueContext && (leagueContext.leagueName || leagueContext.isDerby || leagueContext.isRivalry);
  const hasPlayerStats = playerStats && playerStats.length > 0;
  const hasGoalScorers = goalScorerPredictions && goalScorerPredictions.length > 0;

  return (
    <div className="mt-8 w-full animate-fade-in space-y-8">
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 sm:p-8 text-center">
        <div className="flex justify-around items-center mb-4">
            <div className="flex-1 flex items-center justify-start gap-3">
                <TeamLogo logoUrl={teamA_logo} teamName={teamA} sizeClass="h-12 w-12" />
                <span className="font-bold text-lg leading-tight text-left break-words">{teamA}</span>
            </div>
            <span className="text-4xl font-light text-gray-400 dark:text-gray-500 mx-4">vs</span>
            <div className="flex-1 flex items-center justify-end gap-3 text-right">
                <span className="font-bold text-lg leading-tight text-right break-words">{teamB}</span>
                <TeamLogo logoUrl={teamB_logo} teamName={teamB} sizeClass="h-12 w-12" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 tracking-wide">{prediction}</h2>
        {drawProbability && (
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">
                Draw Probability: <span className="font-bold text-gray-800 dark:text-gray-200">{drawProbability}</span>
            </p>
        )}
        <div className="mt-4 w-full max-w-xs mx-auto">
            <ConfidenceBar confidence={confidence} />
        </div>
        <SocialShare result={result} teamA={teamA} teamB={teamB} />
      </div>
      
      {hasMatchDetails && (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-5">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Match Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                    <LocationMarkerIcon className="h-7 w-7 text-green-500 dark:text-green-400 mb-2"/>
                    <span className="font-semibold">Venue</span>
                    {venue ? (
                        <>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {venue.split(',')[0].trim()}
                            </span>
                            {venue.includes(',') && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {venue.split(',').slice(1).join(',').trim()}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-gray-600 dark:text-gray-400">N/A</span>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <CalendarIcon className="h-7 w-7 text-green-500 dark:text-green-400 mb-2"/>
                    <span className="font-semibold">Kick-off</span>
                    <span className="text-gray-600 dark:text-gray-400">{kickoffTime || 'N/A'}</span>
                </div>
                <div className="flex flex-col items-center">
                    <WhistleIcon className="h-7 w-7 text-green-500 dark:text-green-400 mb-2"/>
                    <span className="font-semibold">Referee</span>
                    <span className="text-gray-600 dark:text-gray-400">{referee || 'N/A'}</span>
                </div>
            </div>
        </div>
      )}

      {hasLeagueContext && (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">League Showdown</h3>
            <div className="space-y-4">
                 {(leagueContext.isDerby || leagueContext.isRivalry) && (
                    <div className="flex justify-center items-center gap-4">
                        {leagueContext.isDerby && (
                            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 px-4 py-2 rounded-full font-semibold">
                                <FireIcon className="h-5 w-5" />
                                <span>Derby Match</span>
                            </div>
                        )}
                         {leagueContext.isRivalry && !leagueContext.isDerby && (
                            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full font-semibold">
                                <LightningBoltIcon className="h-5 w-5" />
                                <span>Rivalry Match</span>
                            </div>
                        )}
                    </div>
                 )}
                 {leagueContext.leagueName && (
                    <div className="text-center">
                        <div className="flex justify-center items-center gap-2 mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                             <TableCellsIcon className="h-5 w-5" />
                             <h4>{leagueContext.leagueName} Standings</h4>
                        </div>
                        <div className="flex justify-around items-center text-center">
                             <div className="flex-1">
                                 <p className="font-bold text-gray-800 dark:text-gray-200">{teamA}</p>
                                 <p className="text-2xl font-bold text-green-600 dark:text-green-400">{leagueContext.teamA_position || 'N/A'}</p>
                             </div>
                             <div className="text-gray-300 dark:text-gray-600 text-2xl font-light">|</div>
                             <div className="flex-1">
                                 <p className="font-bold text-gray-800 dark:text-gray-200">{teamB}</p>
                                 <p className="text-2xl font-bold text-green-600 dark:text-green-400">{leagueContext.teamB_position || 'N/A'}</p>
                             </div>
                        </div>
                    </div>
                 )}
                 {leagueContext.contextualAnalysis && (
                     <p className="text-center text-gray-600 dark:text-gray-400 italic pt-2 border-t border-gray-200 dark:border-gray-700">{leagueContext.contextualAnalysis}</p>
                 )}
            </div>
        </div>
      )}

      {hasSignificantAvailabilityNews && (
        <div className="bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400 dark:border-yellow-500 rounded-lg shadow-lg p-5">
            <div className="flex items-center gap-3 mb-3">
                <WarningIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Player Availability Alert</h3>
            </div>
            <p className="text-yellow-700 dark:text-yellow-200 leading-relaxed">{availabilityFactors}</p>

        </div>
      )}

      {bestBets && bestBets.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-800/60 dark:to-gray-800/50 backdrop-blur-sm border border-green-200 dark:border-green-600 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <ChartPieIcon className="h-7 w-7 text-green-600 dark:text-green-300" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Analyst's Picks</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bestBets.map((bet, index) => (
                <BetCard key={index} bet={bet} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
                {hasPlayerStats && <PlayerStatsSection playerStats={playerStats} teamA={teamA} teamB={teamB} />}
                
                {hasGoalScorers && <GoalScorersSection scorers={goalScorerPredictions} teamA={teamA} teamB={teamB} />}
                
                {/* Key Stats section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 border-b-2 border-green-500/20 dark:border-green-500/50 pb-2">Key Stats</h3>
                    {keyStats && (
                    <div className="space-y-5 text-gray-700 dark:text-gray-300">
                        <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Recent Form (Last 5)</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between"><span>{teamA}</span> <TeamForm form={keyStats.teamA_form} /></div>
                            <div className="flex items-center justify-between"><span>{teamB}</span> <TeamForm form={keyStats.teamB_form} /></div>
                        </div>
                        </div>
                        <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Head to Head</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">{keyStats.head_to_head}</p>
                        </div>
                    </div>
                    )}
                </div>

                {/* Data Sources section */}
                {sources && sources.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Data Sources</h3>
                        <ul className="list-disc list-inside space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0">
                        {sources.map((source, index) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">
                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors break-words" title={source.web.title}>
                                {source.web.title || source.web.uri}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Analysis "Glider" Column */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="lg:sticky lg:top-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 border-b-2 border-green-500/20 dark:border-green-500/50 pb-2">Full Analysis</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{analysis}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
