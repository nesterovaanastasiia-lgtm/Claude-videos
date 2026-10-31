import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ACCENT, fontFamily, TEXT_SECONDARY } from "../theme";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** The reel is 1080x1920 and keeps a 60 px side gutter. */
export const CARD_W = 960;

export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  /** Take up no space until it appears, so the panel grows with its content. */
  collapse?: boolean;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 40, collapse = false, style }) => {
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
  accent?: boolean;
  style?: React.CSSProperties;
}> = ({ children, accent = false, style }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        fontFamily,
        color: "white",
        width: CARD_W,
        boxSizing: "border-box",
        background: "rgba(12,12,16,0.88)",
        border: `3px solid ${accent ? ACCENT : "rgba(255,255,255,0.14)"}`,
        borderRadius: 40,
        padding: "32px 38px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        scale: interpolate(frame, [0, 13], [0.95, 1], {
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

export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = ACCENT,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: 3,
      textTransform: "uppercase",
      color,
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);

/** Where a figure came from. Always sits on the card that shows the figure. */
export const SourceLine: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 24,
      fontWeight: 600,
      color: TEXT_SECONDARY,
      marginTop: 22,
      letterSpacing: 0.3,
    }}
  >
    {children}
  </div>
);
