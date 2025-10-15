import React from 'react';

export const BookCoverBackground: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradients for consciousness/awareness theme */}
        <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
        </linearGradient>
        
        <linearGradient id="light-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
        </linearGradient>

        <radialGradient id="glow-gradient">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>

        {/* Filter for glowing effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background with subtle gradient */}
      <rect width="1000" height="1000" fill="url(#brain-gradient)" />

      {/* Abstract neural network / consciousness connections */}
      {/* Central node - representing awareness/consciousness */}
      <circle cx="500" cy="500" r="80" fill="url(#glow-gradient)" opacity="0.6">
        <animate
          attributeName="r"
          values="80;90;80"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Radiating circles - expanding awareness */}
      <circle cx="500" cy="500" r="100" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.3">
        <animate
          attributeName="r"
          values="100;300"
          dur="6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="500" cy="500" r="150" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.3">
        <animate
          attributeName="r"
          values="150;350"
          dur="7s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0"
          dur="7s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Neural connections - representing thought and learning */}
      <g opacity="0.4" filter="url(#glow)">
        {/* Connections from center to various points */}
        <path d="M 500 500 Q 350 350 250 200" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 500 500 Q 650 350 750 200" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M 500 500 Q 350 650 250 800" stroke="#ec4899" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M 500 500 Q 650 650 750 800" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.8s" repeatCount="indefinite" />
        </path>
        <path d="M 500 500 Q 200 500 100 500" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.3s" repeatCount="indefinite" />
        </path>
        <path d="M 500 500 Q 800 500 900 500" stroke="#ec4899" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.7s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Nodes at connection points - representing ideas and knowledge */}
      <g opacity="0.6">
        <circle cx="250" cy="200" r="15" fill="#60a5fa">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="750" cy="200" r="12" fill="#8b5cf6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="800" r="18" fill="#ec4899">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="750" cy="800" r="14" fill="#60a5fa">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="500" r="16" fill="#8b5cf6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="500" r="13" fill="#ec4899">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Light rays - representing enlightenment and awareness */}
      <g opacity="0.2">
        <path d="M 500 0 L 520 500 L 480 500 Z" fill="url(#light-gradient)" />
        <path d="M 1000 500 L 500 520 L 500 480 Z" fill="url(#light-gradient)" />
        <path d="M 0 500 L 500 480 L 500 520 Z" fill="url(#light-gradient)" />
      </g>

      {/* Floating particles - representing thoughts and ideas */}
      <g opacity="0.5">
        <circle cx="200" cy="300" r="3" fill="#fbbf24">
          <animate attributeName="cy" values="300;280;300" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="800" cy="300" r="4" fill="#60a5fa">
          <animate attributeName="cy" values="300;320;300" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="700" r="3" fill="#8b5cf6">
          <animate attributeName="cy" values="700;680;700" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="700" r="4" fill="#ec4899">
          <animate attributeName="cy" values="700;720;700" dur="5.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="400" r="2" fill="#fbbf24">
          <animate attributeName="cx" values="400;420;400" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="600" r="3" fill="#60a5fa">
          <animate attributeName="cx" values="600;580;600" dur="5.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Brain-like organic shapes - subtle representation */}
      <g opacity="0.15">
        <path
          d="M 300 350 Q 250 300 300 250 Q 350 200 400 250 Q 450 300 400 350 Q 350 400 300 350"
          fill="#60a5fa"
        />
        <path
          d="M 700 650 Q 650 600 700 550 Q 750 500 800 550 Q 850 600 800 650 Q 750 700 700 650"
          fill="#8b5cf6"
        />
      </g>
    </svg>
  );
};
