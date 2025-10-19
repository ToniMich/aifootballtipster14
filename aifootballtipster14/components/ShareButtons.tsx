import React from 'react';
import { TwitterIcon, FacebookIcon, ClipboardIcon, CheckCircleIcon } from './icons';

interface ShareButtonsProps {
  twitterUrl: string;
  facebookUrl: string;
  isCopied: boolean;
  onCopy: () => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ twitterUrl, facebookUrl, isCopied, onCopy }) => {
  const buttonClass = "flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm";
  const iconClass = "h-5 w-5";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#1DA1F2] hover:bg-[#0c85d0] text-white`}
        aria-label="Share on Twitter"
      >
        <TwitterIcon className={iconClass} />
        <span>Twitter</span>
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-[#1877F2] hover:bg-[#166fe5] text-white`}
        aria-label="Share on Facebook"
      >
        <FacebookIcon className={iconClass} />
        <span>Facebook</span>
      </a>
      <button
        onClick={onCopy}
        className={`${buttonClass} ${isCopied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white relative`}
        aria-live="polite"
      >
        {isCopied ? (
          <>
            <CheckCircleIcon className={iconClass} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ClipboardIcon className={iconClass} />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
