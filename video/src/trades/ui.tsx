import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * Clean light cards. They live in a narrow safe band: below the speaker's
 * chin and above the subtitles burned into the supplied cut, so they stay
 * small and never exceed CARD_MAX_H.
 */
export const CARD_W = 790;

export const INK = "#14141a";
export const INK_SOFT = "#5c5c66";
export const HAIRLINE = "rgba(20,20,26,0.14)";

// Light-surface data colours from the documented palette, validated on white.
export const DATA_BLUE = "#2a78d6";
export const DATA_ORANGE = "#eb6834";
export const DATA_RED = "#e34948";

export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  collapse?: boolean;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 26, collapse = false, style }) => {
  const frame = useCurrentFrame();

  if (collapse && frame < delay) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [delay, delay + 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
        }),
        translate: interpolate(
          frame,
          [delay, delay + 15],
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
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.65)",
        borderRadius: 26,
        padding: "22px 26px",
        boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
        scale: interpolate(frame, [0, 13], [0.96, 1], {
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
      color: INK_SOFT,
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

export const SourceLine: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 16,
      fontWeight: 600,
      color: INK_SOFT,
      marginTop: 14,
    }}
  >
    {children}
  </div>
);
