import React from 'react';

interface CollegeLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  variant?: 'monochrome' | 'gold' | 'white';
}

export default function CollegeLogo({
  className = '',
  size = 48,
  variant = 'monochrome',
  ...props
}: CollegeLogoProps) {
  const fillColor = variant === 'white' ? '#ffffff' : variant === 'gold' ? '#F2A900' : '#000000';
  const strokeColor = variant === 'white' ? '#ffffff' : variant === 'gold' ? '#F2A900' : '#000000';
  const cutoutColor = variant === 'white' ? '#111827' : '#ffffff';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 560"
      width={size}
      height={size}
      className={className}
      aria-label="H.M. College of Science and Technology, Manjeri Official Logo"
      {...props}
    >
      <defs>
        <path id="cmpLeftArc" d="M 40,240 C 35,360 85,470 250,545" fill="none" />
        <path id="cmpRightArc" d="M 250,545 C 415,470 465,360 460,240" fill="none" />
        <path id="cmpBannerArc" d="M 60,186 Q 250,116 440,186" fill="none" />
      </defs>
      <g fillRule="evenodd">
        {/* Top Chevron Roof */}
        <polygon points="250,4 456,58 456,80 250,42 44,80 44,58" fill={fillColor} />
        {/* Shield Body */}
        <path
          d="M 44,94 L 245,94 L 245,528 C 140,505 44,435 44,320 Z"
          fill={fillColor}
        />
        <path
          d="M 255,94 L 456,94 L 456,320 C 456,435 360,505 255,528 Z"
          fill={fillColor}
        />

        {/* Bold Letters HM */}
        <path
          d="M 194,402 L 214,402 L 214,434 L 234,434 L 234,402 L 246,402 L 246,478 L 234,478 L 234,448 L 214,448 L 214,478 L 194,478 Z"
          fill={cutoutColor}
        />
        <path
          d="M 254,402 L 272,402 L 285,444 L 298,402 L 316,402 L 316,478 L 302,478 L 302,434 L 291,468 L 279,468 L 268,434 L 268,478 L 254,478 Z"
          fill={cutoutColor}
        />

        {/* Cogwheel & Rising Sun */}
        <g transform="translate(250, 310)">
          <path
            d="M 0,-72 L 7,-72 L 11,-65 L 19,-65 L 24,-70 L 32,-68 L 34,-61 L 43,-59 L 47,-63 L 55,-59 L 55,-51 L 62,-47 L 68,-49 L 73,-43 L 70,-35 L 75,-30 L 80,-30 L 83,-22 L 78,-16 L 81,-9 L 85,-7 L 85,1 L 80,5 L 81,13 L 85,17 L 82,24 L 75,27 L 74,35 L 77,40 L 72,46 L 65,47 L 62,54 L 63,60 L 56,64 L 49,63 L 44,70 L 43,75 L 35,78 L 28,75 L 23,80 L 19,85 L 11,86 L 7,81 L 0,84 L -7,81 L -11,86 L -19,85 L -23,80 L -28,75 L -35,78 L -43,75 L -44,70 L -49,63 L -56,64 L -63,60 L -62,54 L -65,47 L -72,46 L -77,40 L -74,35 L -75,27 L -82,24 L -85,17 L -81,13 L -80,5 L -85,1 L -85,-7 L -81,-9 L -78,-16 L -83,-22 L -80,-30 L -75,-30 L -70,-35 L -73,-43 L -68,-49 L -62,-47 L -55,-51 L -55,-59 L -47,-63 L -43,-59 L -34,-61 L -32,-68 L -24,-70 L -19,-65 L -11,-65 L -7,-72 Z"
            fill={cutoutColor}
            stroke={strokeColor}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="0" r="50" fill={cutoutColor} stroke={strokeColor} strokeWidth="3" />
          <g stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <line x1="0" y1="-8" x2="0" y2="-40" />
            <line x1="-12" y1="-7" x2="-23" y2="-37" />
            <line x1="12" y1="-7" x2="23" y2="-37" />
            <line x1="-22" y1="-4" x2="-37" y2="-28" />
            <line x1="22" y1="-4" x2="37" y2="-28" />
            <line x1="-28" y1="3" x2="-44" y2="-15" />
            <line x1="28" y1="3" x2="44" y2="-15" />
          </g>
          <path d="M -42,3 Q 0,-24 42,3" fill="none" stroke={strokeColor} strokeWidth="2" />
          {/* Open Book */}
          <path
            d="M -34,12 Q -17,4 0,9 Q 17,4 34,12 L 34,22 Q 17,14 0,19 Q -17,14 -34,22 Z"
            fill={cutoutColor}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="0" y1="9" x2="0" y2="19" stroke={strokeColor} strokeWidth="2" />
          <line x1="-34" y1="26" x2="34" y2="26" stroke={strokeColor} strokeWidth="2.5" />
        </g>

        {/* Ribbon Tails */}
        <path d="M 38,168 L 2,185 L 18,218 L 4,242 L 40,224 Z" fill={cutoutColor} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 32,216 L 50,194 L 50,234 Z" fill={fillColor} />
        <path d="M 462,168 L 498,185 L 482,218 L 496,242 L 460,224 Z" fill={cutoutColor} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 468,216 L 450,194 L 450,234 Z" fill={fillColor} />

        {/* Ribbon Body */}
        <path
          d="M 34,174 Q 250,98 466,174 L 458,236 Q 250,166 42,236 Z"
          fill={cutoutColor}
          stroke={strokeColor}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Arabic Inscription */}
        <text
          fontFamily="'Traditional Arabic', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Geeza Pro', serif"
          fontSize="36"
          fontWeight="bold"
          fill={fillColor}
          textAnchor="middle"
        >
          <textPath href="#cmpBannerArc" startOffset="50%">
            رَبِّ زِدْنِي عِلْمًا
          </textPath>
        </text>

        {/* Left Contour Text */}
        <text
          fontFamily="'Figtree', 'Bricolage Grotesque', -apple-system, sans-serif"
          fontSize="20"
          fontWeight="900"
          letterSpacing="2.5"
          fill={fillColor}
        >
          <textPath href="#cmpLeftArc" startOffset="6%">
            COLLEGE OF SCIENCE &amp; TECHNOLOGY
          </textPath>
        </text>

        {/* Right Contour Text */}
        <text
          fontFamily="'Figtree', 'Bricolage Grotesque', -apple-system, sans-serif"
          fontSize="20"
          fontWeight="900"
          letterSpacing="3.5"
          fill={fillColor}
        >
          <textPath href="#cmpRightArc" startOffset="34%">
            MANJERI
          </textPath>
        </text>
      </g>
    </svg>
  );
}
