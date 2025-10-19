import React from 'react';

export const FTLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={className}
        aria-label="AIFootballTipster Logo"
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
        </defs>
        <style>
          {`
            .logo-fill { fill: url(#logo-gradient); }
            .dark .logo-fill { fill: url(#logo-gradient-dark); }
            .ball-fill { fill: url(#logo-gradient); }
            .dark .ball-fill { fill: url(#logo-gradient-dark); }
            .ball-lines { stroke: #fff; opacity: 0.5; }
            .dark .ball-lines { stroke: #1f2937; opacity: 0.6; }
          `}
        </style>
        <g className="logo-fill">
            {/* Main FT Shape */}
            <path d="M66.4,24.1c-4.1,2.1-8.6,3.6-13.4,4.4V23.3h22.8c-1.3-3.6-3.2-6.9-5.7-9.8C68.9,13.3,67.6,18.5,66.4,24.1z" />
            <path d="M52.9,40.8V23.3H31.1v40.1h15.9v-7.6h-9.9V40.8H52.9z M37,34.9v-5.7h10.1v5.7H37z" />
            <path d="M29.1,13.5c-2.5,2.9-4.4,6.2-5.7,9.8h20.8V13.5H29.1z" />
            <path d="M14.6,30.3c-0.5,3.2-0.8,6.5-0.8,9.8c0,11.4,4.2,21.8,11.2,29.9c1.6-1.5,3.1-3.1,4.5-4.8c-5.4-6.6-8.8-15-8.8-24.1 c0-2.3,0.2-4.6,0.5-6.8H14.6z" />
            <path d="M86.1,30.3h-7.6c1.1,4.2,1.7,8.7,1.7,13.3c0,9-3.2,17.3-8.4,23.7c1.4,1.6,2.8,3.2,4.3,4.6 C81.9,62,86.1,51.5,86.1,40.1c0-3.3-0.3-6.6-0.8-9.8H86.1z" />
        </g>
        {/* Soccer Ball */}
        <g>
            <circle cx="70" cy="68" r="14" className="ball-fill" />
            <g transform="translate(70, 68) scale(0.6)" className="ball-lines" strokeWidth="2.5">
                <path d="M0 -22.5 l10.7 0 l3.3 -20.4 h-28 z" fill="none" />
                <path d="M14 -2.1 l21.4 0 l-3.3 20.4 h-28 z" fill="none" />
                <path d="M-14 -2.1 l-21.4 0 l3.3 20.4 h28 z" fill="none" />
                <path d="M-22.5 0 l0 10.7 l-20.4 3.3 v-28 z" fill="none" />
                <path d="M22.5 0 l0 -10.7 l20.4 -3.3 v28 z" fill="none" />
            </g>
        </g>
    </svg>
);


export const FootballIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,6a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,6Zm0,9a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,15Zm5.94-7.5-2.29,4,2.29,4H15.06l-2.29-4,2.29-4ZM8.94,7.5,6.65,11.5l2.29,4H11.2l-2.29-4,2.29-4Z"/>
  </svg>
);

export const ChartPieIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M10.5 4.5a7.5 7.5 0 00-7.5 7.5h7.5V4.5z" />
        <path d="M13.5 4.5v7.5h7.5a7.5 7.5 0 00-7.5-7.5z" />
        <path d="M13.5 13.5v7.5a7.5 7.5 0 007.5-7.5h-7.5z" />
        <path d="M10.5 13.5H3a7.5 7.5 0 007.5 7.5v-7.5z" />
    </svg>
);


export const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.5 13c1.155 2-.289 4.5-2.598 4.5H4.5c-2.31 0-3.753-2.5-2.598-4.5l7.5-13zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.654H5.88a.75.75 0 01-.749-.654L4.125 6.67a.75.75 0 01.256-1.478A48.567 48.567 0 018.25 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.068c1.603 0 2.816 1.336 2.816 2.9zM5.25 6.75c.162 0 .324.013.487.037a49.057 49.057 0 0012.526 0c.163-.024.325-.037.487-.037H5.25z" clipRule="evenodd" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.591-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.836 17.894a.75.75 0 011.06 0l1.591 1.591a.75.75 0 11-1.06 1.06l-1.591-1.59a.75.75 0 010-1.061zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.106 17.894a.75.75 0 010-1.06l1.591-1.591a.75.75 0 011.06 1.06l-1.591 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.106a.75.75 0 011.06 0l1.591 1.591a.75.75 0 01-1.06 1.06l-1.591-1.59a.75.75 0 010-1.061z" />
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.948.75.75 0 01.981.632A11.25 11.25 0 0118 15.75a11.25 11.25 0 01-11.25-11.25 11.25 11.25 0 011.718-6.528z" clipRule="evenodd" />
    </svg>
);

export const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.212 15.8 15.8 0 002.108-5.516c0-4.42-3.582-8-8-8s-8 3.58-8 8c0 2.186.847 4.237 2.37 5.741.03.033.061.065.092.098l.042.042a16.975 16.975 0 005.159 4.212zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M5.75 3a.75.75 0 00-.75.75V4.5h.75A1.5 1.5 0 017.5 6v.75H4.5A2.25 2.25 0 002.25 9v10.5A2.25 2.25 0 004.5 21.75h15A2.25 2.25 0 0021.75 19.5V9A2.25 2.25 0 0019.5 6.75H16.5V6A1.5 1.5 0 0118 4.5h.75V3.75a.75.75 0 00-1.5 0V4.5h-3V3.75a.75.75 0 00-1.5 0V4.5h-3V3.75A.75.75 0 005.75 3zM4.5 9h15v10.5H4.5V9z" clipRule="evenodd" />
    </svg>
);

export const WhistleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M17.25 10.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
        <path fillRule="evenodd" d="M18.455 3.32a.75.75 0 01.378.378l2.25 4.5a.75.75 0 01-.676 1.052H19.5v1.442a.75.75 0 01-1.122.65L17.25 10.5v-3h-2.378a.75.75 0 01-.677-1.052l2.25-4.5a.75.75 0 01.955-.378zM5.545 3.32a.75.75 0 00-.955.378l-2.25 4.5a.75.75 0 00.676 1.052H3.75v3.428a.75.75 0 001.122.65l1.128-.752V12h1.5v-1.442a.75.75 0 00-1.122-.65L5.25 10.5v-3h2.378a.75.75 0 00.677-1.052l-2.25-4.5a.75.75 0 00-.51-.378z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12 12.75a4.5 4.5 0 014.5 4.5v.75a.75.75 0 01-1.5 0v-.75a3 3 0 00-6 0v.75a.75.75 0 01-1.5 0v-.75a4.5 4.5 0 014.5-4.5zM12.75 15a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z" clipRule="evenodd" />
    </svg>
);


export const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM10.328 4.22a.75.75 0 00-1.071 1.071l3.071 3.071a.75.75 0 001.071-1.071l-3.071-3.071zM4.904 9.348a.75.75 0 00-1.071 1.071l6.071 6.071a.75.75 0 001.071-1.071l-6.071-6.071zM9.022 13.49a.75.75 0 00-1.071 1.071l.77.77a.75.75 0 001.071-1.071l-.77-.77z" clipRule="evenodd" />
      <path d="M12 2.25a.75.75 0 01.75.75v.032c.889.044 1.73.18 2.533.41a.75.75 0 01.28.98l-7.258 9.677a.75.75 0 01-1.22.088l-2.25-3a.75.75 0 01.94-1.156l2.008 1.506 5.88-7.84c.12-.16.29-.286.483-.365A13.44 13.44 0 0012.75 3V2.25A.75.75 0 0112 2.25zM15 6.75a.75.75 0 01.75.75v.032a13.44 13.44 0 000 2.436V10.5a.75.75 0 01-1.5 0v-.532a11.94 11.94 0 010-1.436V7.5a.75.75 0 01.75-.75z" />
    </svg>
);
  
export const LightningBoltIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.055 7.06c-1.25-.714-2.553-1.428-3.868-2.142a.75.75 0 01.524-1.364 6.686 6.686 0 0010.636 4.88.75.75 0 01.524 1.364 6.686 6.686 0 00-10.636-4.88z" />
      <path d="M5.055 7.06v1.5c0 .828.672 1.5 1.5 1.5h1.5a.75.75 0 010 1.5H6.555a3 3 0 01-3-3v-1.5a.75.75 0 011.5 0z" />
    </svg>
);

export const TableCellsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.75 3.375a3.375 3.375 0 00-3.375-3.375H3.375A3.375 3.375 0 000 3.375v5.25a3.375 3.375 0 003.375 3.375h5.25a3.375 3.375 0 003.375-3.375v-5.25zM10.875 9a1.875 1.875 0 01-1.875 1.875h-5.25A1.875 1.875 0 011.5 9v-5.25A1.875 1.875 0 013.375 1.5h5.25A1.875 1.875 0 0110.875 3.75v5.25zM20.625 1.5a1.875 1.875 0 011.875 1.875v5.25a1.875 1.875 0 01-1.875 1.875h-5.25A1.875 1.875 0 0113.5 9V3.75A1.875 1.875 0 0115.375 1.5h5.25zM15.375 0A3.375 3.375 0 0012 3.375v5.25a3.375 3.375 0 003.375 3.375h5.25A3.375 3.375 0 0024 8.625v-5.25A3.375 3.375 0 0020.625 0h-5.25zM1.5 15.375a1.875 1.875 0 011.875-1.875h5.25A1.875 1.875 0 0110.5 15.375v5.25a1.875 1.875 0 01-1.875 1.875h-5.25A1.875 1.875 0 011.5 20.625v-5.25zM3.375 12A3.375 3.375 0 000 15.375v5.25A3.375 3.375 0 003.375 24h5.25A3.375 3.375 0 0012 20.625v-5.25A3.375 3.375 0 008.625 12h-5.25zM13.5 15.375a1.875 1.875 0 011.875-1.875h5.25a1.875 1.875 0 011.875 1.875v5.25a1.875 1.875 0 01-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-5.25zM15.375 12A3.375 3.375 0 0012 15.375v5.25a3.375 3.375 0 003.375 3.375h5.25A3.375 3.375 0 0024 20.625v-5.25A3.375 3.375 0 0020.625 12h-5.25z" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M15.97 3.57a.75.75 0 011.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l1.72 1.72V3a.75.75 0 011.5 0v2.29l1.72-1.72z" clipRule="evenodd" />
      <path d="M6 15a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 15zM4.125 6.375A2.625 2.625 0 001.5 9v6a2.625 2.625 0 002.625 2.625h15A2.625 2.625 0 0022.5 15V9a2.625 2.625 0 00-2.625-2.625h-15zM3 9a1.125 1.125 0 011.125-1.125h15A1.125 1.125 0 0121 9v6a1.125 1.125 0 01-1.125-1.125h-15A1.125 1.125 0 013 15V9z" />
    </svg>
);

export const AssistIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V6z" clipRule="evenodd" />
    </svg>
);

export const CardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18h9.75c1.035 0 1.875-.84 1.875-1.875V4.875C15 3.839 14.16 3 13.125 3H3.375z" />
      <path d="M16.5 6.375a1.875 1.875 0 00-1.875-1.875h-.375a.75.75 0 010-1.5h.375a3.375 3.375 0 013.375 3.375v9.75a3.375 3.375 0 01-3.375 3.375h-.375a.75.75 0 010-1.5h.375a1.875 1.875 0 001.875-1.875V6.375z" />
    </svg>
);

export const TicketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.193c.338.457.562.98.625 1.536v.001c.002.008.003.015.004.022a3.75 3.75 0 01-1.468 4.295v.001l-.001.001-.001.001a3.75 3.75 0 01-4.294 1.468 3.75 3.75 0 01-1.536-.625H3.375A1.875 1.875 0 011.5 16.125v-9.75zM2.25 6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v3.193c-.338-.457-.562-.98-.625-1.536V9.52a.75.75 0 00-.004-.022 3.75 3.75 0 011.468-4.295V5.25a3.75 3.75 0 00-4.294-1.468 3.75 3.75 0 00-1.536.625H3.375A1.875 1.875 0 001.5 4.5v1.875z" clipRule="evenodd" />
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const PayPalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.342 3.566h6.413c2.956 0 4.606.828 4.372 3.684-.135 1.666-1.12 2.508-2.618 2.873-.135.035-.27.06-.414.075.135.015.242.035.333.06 1.603.359 2.763 1.348 2.947 3.23.234 2.28-.962 3.65-3.64 3.65H8.058l-.48-3.033h-.06c-.466 1.86-1.847 2.988-3.95 2.988H1.32L3.342 3.566zm2.748 4.5c0-.496-.348-.755-.838-.755h-1.37l-.873 5.46h1.408c1.558 0 2.24-.958 2.544-2.312.22-1.018.06-1.638-.87-2.393z" />
        <path d="M11.082 3.566h4.594c2.81 0 4.298.536 4.965 2.584.666 2.048-.12 3.53-1.663 4.21-.29.135-.58.24-.86.329.15.045.286.09.414.15 1.712.78 2.628 2.22 2.24 4.515-.388 2.28-2.18 3.42-4.93 3.42h-2.16l2.13-13.22zm2.015 5.564c1.134 0 1.767-.71 2.015-1.782.247-1.073-.089-1.874-1.28-1.874h-1.81l-.666 4.152h1.72z" />
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

export const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.5 3A2.5 2.5 0 008 5.5V6h8v-.5A2.5 2.5 0 0013.5 3h-3zm-2.5 3V5.5a4 4 0 014-4h3a4 4 0 014 4V6h-1V5.5a2.5 2.5 0 00-2.5-2.5h-3A2.5 2.5 0 009.5 5.5V6H8z" clipRule="evenodd" />
      <path d="M3 8.5A2.5 2.5 0 015.5 6h13A2.5 2.5 0 0121 8.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 17.5v-9zM5.5 7.5a1 1 0 00-1 1v9a1 1 0 001 1h13a1 1 0 001-1v-9a1 1 0 00-1-1h-13z" />
    </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="GitHub Logo">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.5a.75.75 0 00-.75.75v4.5l1.903-1.903a5.997 5.997 0 00-9.581 2.836.75.75 0 01-1.44-.336A7.5 7.5 0 014.755 10.06zM12 21a7.5 7.5 0 01-7.5-7.5.75.75 0 011.5 0 5.997 5.997 0 005.997 5.997.75.75 0 010 1.5z" clipRule="evenodd" />
    </svg>
);

export const MaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.5 4.75a.75.75 0 011.5 0V8h3.25a.75.75 0 010 1.5H14v3.25a.75.75 0 01-1.5 0V9.5H9.25a.75.75 0 010-1.5H12V4.75a.75.75 0 01.5-.75z" clipRule="evenodd" />
      <path d="M3.75 12a8.25 8.25 0 1016.5 0 8.25 8.25 0 00-16.5 0zM12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z" />
    </svg>
);

export const FemaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 9.75a.75.75 0 00-1.5 0V12H8.25a.75.75 0 000 1.5H10.5v2.25a.75.75 0 001.5 0V13.5h2.25a.75.75 0 000-1.5H12V9.75z" clipRule="evenodd" />
      <path d="M3.75 12a8.25 8.25 0 1016.5 0 8.25 8.25 0 00-16.5 0zM12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z" />
    </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 11.855 11.855 0 01-2.158-1.658 8.27 8.27 0 01-1.757-2.123 6.337 6.337 0 01-.86-2.318c0-1.554.45-3.041 1.255-4.229a4.897 4.897 0 012.62-1.957 4.897 4.897 0 012.62-1.957 4.897 4.897 0 012.62 1.957 4.897 4.897 0 011.255 4.229c0 .81-.29 1.558-.86 2.318a6.337 6.337 0 01-1.757 2.123 11.855 11.855 0 01-2.158 1.658 15.247 15.247 0 01-1.344.688l-.022.012-.007.003z" />
    </svg>
);
