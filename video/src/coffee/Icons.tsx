import React from "react";

type P = { size?: number; color?: string; sw?: number };

const svg = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

const st = (color: string, sw: number) => ({
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const CupIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" {...st(color, sw)} />
    <path d="M16 10h2.4a2.6 2.6 0 0 1 0 5.2H16" {...st(color, sw)} />
    <path d="M7.5 2.5c-.7 1 .7 1.6 0 2.6M11 2.5c-.7 1 .7 1.6 0 2.6" {...st(color, sw)} />
  </svg>
);

export const BeanIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(35 12 12)" {...st(color, sw)} />
    <path d="M8.2 15.8c2.6-1.4 5-4.9 5.8-7.8" {...st(color, sw)} />
  </svg>
);

export const MilkIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M9 2h6v3l2.4 3.2V21a1 1 0 0 1-1 1H7.6a1 1 0 0 1-1-1V8.2L9 5V2Z" {...st(color, sw)} />
    <path d="M6.6 11h10.8" {...st(color, sw)} />
  </svg>
);

export const DropIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M12 3s6 6.4 6 10.3A6 6 0 0 1 6 13.3C6 9.4 12 3 12 3Z" {...st(color, sw)} />
  </svg>
);

export const GlassIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M6 4h12l-1.6 17H7.6L6 4Z" {...st(color, sw)} />
    <path d="M6.6 9h10.8" {...st(color, sw)} />
  </svg>
);

export const CardIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" {...st(color, sw)} />
    <path d="M2.5 10h19" {...st(color, sw)} />
    <path d="M6 14.6h3.5" {...st(color, sw)} />
  </svg>
);

export const KeyIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <circle cx="8" cy="8" r="4.5" {...st(color, sw)} />
    <path d="m11.2 11.2 9 9M17.4 16.6l-2 2M19.6 18.8l-1.6 1.6" {...st(color, sw)} />
  </svg>
);

export const PeopleIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <circle cx="9" cy="8" r="3.2" {...st(color, sw)} />
    <path d="M3.4 19.4c.7-3.3 3.1-5 5.6-5s4.9 1.7 5.6 5" {...st(color, sw)} />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 6M17.2 14.8c2 .5 3.3 2.2 3.8 4.6" {...st(color, sw)} />
  </svg>
);

export const TaxIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M5 2.8h14v18.4l-2.3-1.6-2.4 1.6-2.3-1.6-2.4 1.6L7.3 19.6 5 21.2V2.8Z" {...st(color, sw)} />
    <path d="M9 8h6M9 12h6" {...st(color, sw)} />
  </svg>
);

export const BulbIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M9 17.5a6 6 0 1 1 6 0v1.7H9v-1.7Z" {...st(color, sw)} />
    <path d="M9.8 21.6h4.4" {...st(color, sw)} />
  </svg>
);

export const WrenchIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path
      d="M15.5 3.5a5.5 5.5 0 0 0-5 7.7L3.9 17.8a2 2 0 0 0 2.8 2.8l6.6-6.6a5.5 5.5 0 0 0 6.9-7.2l-3 3-2.6-.6-.6-2.6 3-3a5.5 5.5 0 0 0-1.5-.1Z"
      {...st(color, sw)}
    />
  </svg>
);

export const CalcIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" {...st(color, sw)} />
    <path d="M8 6.5h8" {...st(color, sw)} />
    <circle cx="9" cy="12" r="1" fill={color} />
    <circle cx="12" cy="12" r="1" fill={color} />
    <circle cx="15" cy="12" r="1" fill={color} />
    <circle cx="9" cy="16.5" r="1" fill={color} />
    <circle cx="12" cy="16.5" r="1" fill={color} />
    <circle cx="15" cy="16.5" r="1" fill={color} />
  </svg>
);

export const BroomIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M14.5 2.5 9 8" {...st(color, sw)} />
    <path d="M6.2 10.8 13 4l4.6 4.6-6.8 6.8-4.6-4.6Z" {...st(color, sw)} />
    <path d="M6.2 15.4 2.6 21.4l6-3.6M9 18l1.4 3.4" {...st(color, sw)} />
  </svg>
);

export const FuelIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M4 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16" {...st(color, sw)} />
    <path d="M3 21h11" {...st(color, sw)} />
    <path d="M6.5 7.5h4" {...st(color, sw)} />
    <path d="M13 9h3.5a2 2 0 0 1 2 2v5a1.6 1.6 0 0 0 3.2 0V9.4L19 6.8" {...st(color, sw)} />
  </svg>
);

export const ClockIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <circle cx="12" cy="12" r="9" {...st(color, sw)} />
    <path d="M12 6.8V12l3.4 2" {...st(color, sw)} />
  </svg>
);

export const ExitIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M14 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H14" {...st(color, sw)} />
    <path d="M17.5 8.5 21 12l-3.5 3.5M20.4 12H10" {...st(color, sw)} />
  </svg>
);

export const TagIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M4 11.2V4.5h6.7l8.8 8.8a2 2 0 0 1 0 2.8l-3.4 3.4a2 2 0 0 1-2.8 0L4 11.2Z" {...st(color, sw)} />
    <circle cx="8.3" cy="8.3" r="1.3" fill={color} />
  </svg>
);

export const HeartIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M12 20.5S4.5 15.8 4.5 10.4A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.4-7.5 10.1-7.5 10.1Z" {...st(color, sw)} />
  </svg>
);

export const ScissorsIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <circle cx="6" cy="18" r="2.6" {...st(color, sw)} />
    <circle cx="18" cy="18" r="2.6" {...st(color, sw)} />
    <path d="M7.8 16.2 18.5 4M16.2 16.2 5.5 4" {...st(color, sw)} />
  </svg>
);

export const HandIcon: React.FC<P> = ({ size = 28, color = "#1c1710", sw = 1.8 }) => (
  <svg {...svg(size)}>
    <path d="M9 11V4.8a1.6 1.6 0 0 1 3.2 0V11" {...st(color, sw)} />
    <path d="M12.2 11V6.2a1.6 1.6 0 0 1 3.2 0V12" {...st(color, sw)} />
    <path d="M15.4 12V8.8a1.6 1.6 0 0 1 3.2 0v6.4c0 3.6-2.6 6.3-6.2 6.3-3.3 0-5.2-1.8-6.4-4.4L4.4 14a1.6 1.6 0 0 1 2.7-1.7L9 14.6V11" {...st(color, sw)} />
  </svg>
);
