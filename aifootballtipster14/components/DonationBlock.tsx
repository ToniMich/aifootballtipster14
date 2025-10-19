import React from 'react';
import { PayPalIcon, TwitterIcon, HeartIcon } from './icons';

const DonationBlock: React.FC = () => {
  const shareUrl = "https://aifootballtipster.app"; // Replace with your actual app URL
  const shareText = encodeURIComponent("Check out this AI-powered football prediction tool! ⚽️🔮 #AIFootballTipster #AI #Football");

  return (
    <div className="mt-8 w-full animate-fade-in">
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
            <HeartIcon className="h-7 w-7 text-red-500" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Support the Project</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-5">
          If you find this tool helpful, please consider supporting its development. Your contributions help keep the servers running and the predictions sharp!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
             <a
              href="https://paypal.me/gizahhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/40"
            >
              <PayPalIcon className="h-5 w-5" />
              <span>Tip with PayPal</span>
            </a>
             <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#0c85d0] text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-sky-500/40"
            >
              <TwitterIcon className="h-5 w-5" />
              <span>Share on X</span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default DonationBlock;