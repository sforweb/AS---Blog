import React from 'react';

interface NewsletterIllustrationProps {
  className?: string;
}

const NewsletterIllustration: React.FC<NewsletterIllustrationProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        {/* Envelope */}
        <path 
          d="M50 50H350C372.092 50 390 67.9084 390 90V270C390 292.092 372.092 310 350 310H50C27.9084 310 10 292.092 10 270V90C10 67.9084 27.9084 50 50 50Z" 
          fill="#F8FAFC"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Linha do envelope */}
        <path 
          d="M50 90L200 180L350 90" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Ícone de carta */}
        <path 
          d="M300 150C300 141.716 306.716 135 315 135C323.284 135 330 141.716 330 150C330 158.284 323.284 165 315 165C306.716 165 300 158.284 300 150Z" 
          fill="currentColor"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

export default NewsletterIllustration;
