import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const CARD_W = 820;

export const INK = "#1c1710";
export const INK_SOFT = "#6b6257";
export const HAIRLINE = "rgba(28,23,16,0.14)";
export const CREAM = "rgba(255,252,246,0.93)";

/**
 * Accents. Used as fills with ink text on top, never as thin marks — that
 * keeps the bright steps readable, which they are not as hairlines on cream.
 */
export const COFFEE = "#8a5a2b";
export const AMBER = "#eda100";
export const GREEN = "#1baf7a";
export const DATA_BLUE = "#2a78d6";
export const DATA_ORANGE = "#eb6834";
export const DATA_RED = "#e34948";
export const MONEY_IN = GREEN;

export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  collapse?: boolean;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 24, collapse = false, style }) => {
  const frame = useCurrentFrame();

  if (collapse && frame < delay) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [delay, delay + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
        }),
        translate: interpolate(
          frame,
          [delay, delay + 14],
          [`0px ${distance}px`, "0px 0px"],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
        ),
      }}
    >
      {children}
    </div>
  );
};

/** Cream card with a coloured spine that carries the beat's accent. */
export const Panel: React.FC<{
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
}> = ({ children, accent = COFFEE, style }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        fontFamily,
        color: INK,
        width: CARD_W,
        boxSizing: "border-box",
        background: CREAM,
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: 28,
        overflow: "hidden",
        display: "flex",
        boxShadow: "0 20px 52px rgba(40,25,10,0.24)",
        scale: interpolate(frame, [0, 12], [0.96, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
          output: "perceptual-scale",
        }),
        ...style,
      }}
    >
      <div style={{ width: 10, background: accent, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: "22px 26px", minWidth: 0 }}>{children}</div>
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COFFEE,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 19,
      fontWeight: 800,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      color,
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily,
      fontSize: 17,
      fontWeight: 600,
      color: INK_SOFT,
      marginTop: 14,
      lineHeight: 1.25,
    }}
  >
    {children}
  </div>
);

/** A filled chip. Ink on a bright fill reads far better than a bright hairline. */
export const Pill: React.FC<{
  children: React.ReactNode;
  bg: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, bg, size = 44, style }) => (
  <span
    style={{
      display: "inline-block",
      background: bg,
      color: INK,
      borderRadius: 16,
      padding: `${Math.round(size * 0.14)}px ${Math.round(size * 0.34)}px`,
      fontFamily,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.1,
      ...style,
    }}
  >
    {children}
  </span>
);

/** Marker swash behind a phrase. */
export const Highlight: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = AMBER }) => (
  <span
    style={{
      background: `linear-gradient(transparent 14%, ${color}aa 14%, ${color}aa 92%, transparent 92%)`,
      borderRadius: 3,
      padding: "0 4px",
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
    }}
  >
    {children}
  </span>
);

/** Money figure with the hryvnia sign kept tight to the number. */
export const Money: React.FC<{
  value: string;
  size?: number;
  color?: string;
}> = ({ value, size = 64, color = INK }) => (
  <span style={{ fontFamily, fontSize: size, fontWeight: 900, color, lineHeight: 1 }}>
    {value}
    <span style={{ fontSize: size * 0.56, fontWeight: 800, marginLeft: 4 }}>₴</span>
  </span>
);
