import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

const stroke = (color: string, w: number) => ({
  stroke: color,
  strokeWidth: w,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const GlobeIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" {...stroke(color, strokeWidth)} />
    <path d="M3 12h18" {...stroke(color, strokeWidth)} />
    <path
      d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21C9.5 18.4 8.2 15.3 8.2 12S9.5 5.6 12 3Z"
      {...stroke(color, strokeWidth)}
    />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"
      {...stroke(color, strokeWidth)}
    />
    <circle cx="12" cy="10" r="2.6" {...stroke(color, strokeWidth)} />
  </svg>
);

export const TrendIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path d="M3 17.5 9 11l4 4 7.5-7.5" {...stroke(color, strokeWidth)} />
    <path d="M15 7h6v6" {...stroke(color, strokeWidth)} />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M15.5 3.5a5.5 5.5 0 0 0-5 7.7L3.9 17.8a2 2 0 0 0 2.8 2.8l6.6-6.6a5.5 5.5 0 0 0 6.9-7.2l-3 3-2.6-.6-.6-2.6 3-3a5.5 5.5 0 0 0-1.5-.1Z"
      {...stroke(color, strokeWidth)}
    />
  </svg>
);

export const WalletIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <rect x="3" y="6" width="18" height="13" rx="3" {...stroke(color, strokeWidth)} />
    <path d="M3 10h18" {...stroke(color, strokeWidth)} />
    <circle cx="16.5" cy="14.5" r="1.3" fill={color} />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M12 2.8 20 6v6c0 4.6-3.3 8.1-8 9.2C7.3 20.1 4 16.6 4 12V6l8-3.2Z"
      {...stroke(color, strokeWidth)}
    />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" {...stroke(color, strokeWidth)} />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2.6,
}) => (
  <svg {...base(size)}>
    <path d="m4.5 12.5 5 5 10-11" {...stroke(color, strokeWidth)} />
  </svg>
);

export const CrossIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2.6,
}) => (
  <svg {...base(size)}>
    <path d="M6 6 18 18M18 6 6 18" {...stroke(color, strokeWidth)} />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z"
      {...stroke(color, strokeWidth)}
    />
  </svg>
);

export const BoxIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" {...stroke(color, strokeWidth)} />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" {...stroke(color, strokeWidth)} />
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <rect x="4" y="3" width="12" height="18" rx="2" {...stroke(color, strokeWidth)} />
    <path d="M16 9h4v12h-4" {...stroke(color, strokeWidth)} />
    <path d="M8 7.5h4M8 11.5h4M8 15.5h4" {...stroke(color, strokeWidth)} />
  </svg>
);

export const PersonIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <circle cx="12" cy="8" r="3.6" {...stroke(color, strokeWidth)} />
    <path d="M4.8 20c.8-3.8 3.7-5.8 7.2-5.8s6.4 2 7.2 5.8" {...stroke(color, strokeWidth)} />
  </svg>
);

export const MegaphoneIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path d="M4 10v4a2 2 0 0 0 2 2h1l9 4V4l-9 4H6a2 2 0 0 0-2 2Z" {...stroke(color, strokeWidth)} />
    <path d="M19.5 9.5a3.6 3.6 0 0 1 0 5" {...stroke(color, strokeWidth)} />
  </svg>
);

export const GraduationIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" {...stroke(color, strokeWidth)} />
    <path d="M6.5 11v5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-5" {...stroke(color, strokeWidth)} />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M4 5.5h16v11H9.5L5 20.5v-4H4v-11Z"
      {...stroke(color, strokeWidth)}
    />
    <path d="M8.5 10.5h7M8.5 13h4.5" {...stroke(color, strokeWidth)} />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" {...stroke(color, strokeWidth)} />
    <path d="M12 7v5.4l3.4 2" {...stroke(color, strokeWidth)} />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M4 11.2V4.5h6.7l8.8 8.8a2 2 0 0 1 0 2.8l-3.4 3.4a2 2 0 0 1-2.8 0L4 11.2Z"
      {...stroke(color, strokeWidth)}
    />
    <circle cx="8.3" cy="8.3" r="1.4" fill={color} />
  </svg>
);

export const BirdIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2,
}) => (
  <svg {...base(size)}>
    <path
      d="M21 6.2c-.8.4-1.6.6-2.5.7a4.3 4.3 0 0 0-7.3 3.9C7.7 10.6 4.9 9 3 6.4c-1 1.8-.5 4 1.2 5.1-.7 0-1.3-.2-1.9-.5 0 1.9 1.3 3.5 3.1 3.9-.6.2-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.7A8.6 8.6 0 0 1 2 19.5 12.2 12.2 0 0 0 8.6 21c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.4-1.3 1.9-2.1-.7.3-1.5.5-2.3.6Z"
      {...stroke(color, strokeWidth)}
    />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 40,
  color = "#fff",
  strokeWidth = 2.4,
}) => (
  <svg {...base(size)}>
    <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" {...stroke(color, strokeWidth)} />
  </svg>
);
