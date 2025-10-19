import React, { useState } from 'react';
import { PredictionResultData } from '../types';
import ShareButtons from './ShareButtons';

interface SocialShareProps {
  result: PredictionResultData;
  teamA: string;
  teamB: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ result, teamA, teamB }) => {
  const [copied, setCopied] = useState(false);

  const appUrl = "https://aifootballtipster.app";
  const bestBets = result.bestBets || [];
  const topBet = bestBets.find(b => b.category === "Match Winner") || bestBets[0];

  let shareText;
  if (topBet) {
    shareText = `🔮 AI Prediction: ${teamA} vs ${teamB} ➡️ ${result.prediction}!\n\nTop Bet: '${topBet.value}' (${topBet.confidence} confidence).\n\nAnalysis by #AIFootballTipster.`;
  } else {
    shareText = `🔮 AI Prediction: ${teamA} vs ${teamB} ➡️ ${result.prediction}!\n\nAnalysis by #AIFootballTipster.`;
  }
  
  const textToCopy = `${shareText}\n\nGet your own predictions: ${appUrl}`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedAppUrl = encodeURIComponent(appUrl);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedAppUrl}&text=${encodedShareText}&hashtags=AIFootballTipster,FootballPrediction,AI`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedAppUrl}&quote=${encodedShareText}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
      <h4 className="text-center font-semibold text-gray-700 dark:text-gray-300 mb-4">Share this Prediction</h4>
      <ShareButtons
        twitterUrl={twitterUrl}
        facebookUrl={facebookUrl}
        isCopied={copied}
        onCopy={handleCopy}
      />
    </div>
  );
};

export default SocialShare;
