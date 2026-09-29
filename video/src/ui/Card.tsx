import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ACCENT, fontFamily, MUTED_LINE, TEXT_PRIMARY } from "../theme";

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * Rises into place, holds, then drops away. `delay` staggers items inside a card.
 */
export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  exitAt?: number;
  distance?: number;
  /** Take up no space until the item appears, so the panel grows with it. */
  collapse?: boolean;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, exitAt, distance = 34, collapse = false, style }) => {
  const frame = useCurrentFrame();

  if (collapse && frame < delay) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
        opacity: interpolate(
          frame,
          exitAt === undefined
            ? [delay, delay + 9]
            : [delay, delay + 9, exitAt, exitAt + 8],
          exitAt === undefined ? [0, 1] : [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing:
              exitAt === undefined
                ? EASE_OUT
                : [EASE_OUT, Easing.linear, EASE_OUT],
          },
        ),
        translate: interpolate(
          frame,
          [delay, delay + 14],
          [`0px ${distance}px`, "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          },
        ),
      }}
    >
      {children}
    </div>
  );
};

/** Dark glass panel that every graphic sits on. */
export const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: boolean;
}> = ({ children, style, accent = false }) => (
  <div
    style={{
      fontFamily,
      color: TEXT_PRIMARY,
      background: "rgba(13,13,17,0.86)",
      border: `2px solid ${accent ? ACCENT : MUTED_LINE}`,
      borderRadius: 28,
      padding: "26px 30px",
      boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
      backdropFilter: "blur(6px)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Small uppercase label that titles a card. */
export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = ACCENT,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color,
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);
