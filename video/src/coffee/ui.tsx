import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const CARD_W = 820;

export const INK = "#1c1710";
export const INK_SOFT = "#6b6257";
export const HAIRLINE = "rgba(28,23,16,0.14)";
export const CREAM = "rgba(255,252,246,0.93)";

/** Warm accent for the coffee story; data colours stay from the palette. */
export const COFFEE = "#8a5a2b";
export const DATA_BLUE = "#2a78d6";
export const DATA_ORANGE = "#eb6834";
export const DATA_RED = "#e34948";
export const MONEY_IN = "#1baf7a";

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

export const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
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
        padding: "22px 28px",
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
      {children}
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily,
      fontSize: 19,
      fontWeight: 800,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      color: COFFEE,
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
