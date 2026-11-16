import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, GOLD, OLIVE, RADIUS, SANS, SERIF, SHADOW } from "./theme";

/** Spring entrance, ~350ms, critically damped — no overshoot, no rotation. */
export const useEnter = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 120 },
    durationInFrames: 11,
  });
};

export const Enter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 22, style }) => {
  const t = useEnter(delay);

  return (
    <div
      style={{
        ...style,
        opacity: t,
        translate: `0px ${(1 - t) * distance}px`,
      }}
    >
      {children}
    </div>
  );
};

/** Dim the footage so a graphic can carry the frame. */
export const Scrim: React.FC<{ opacity?: number }> = ({ opacity = 0.45 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: OLIVE,
        opacity: interpolate(frame, [0, 8], [0, opacity], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  tone?: "beige" | "cream" | "olive";
  style?: React.CSSProperties;
}> = ({ children, tone = "cream", style }) => (
  <div
    style={{
      fontFamily: SANS,
      background: tone === "olive" ? OLIVE : tone === "beige" ? "#F2E9DA" : CREAM,
      color: tone === "olive" ? CREAM : BROWN,
      borderRadius: RADIUS,
      boxShadow: SHADOW,
      padding: "28px 34px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = GOLD,
}) => (
  <div
    style={{
      fontFamily: SANS,
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 2.6,
      textTransform: "uppercase",
      color,
      marginBottom: 16,
    }}
  >
    {children}
  </div>
);

export const Heading: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ children, size = 54, color = BROWN, align = "left" }) => (
  <div
    style={{
      fontFamily: SERIF,
      fontSize: size,
      fontWeight: 600,
      lineHeight: 1.22,
      color,
      textAlign: align,
    }}
  >
    {children}
  </div>
);

/** Thousands separated by thin spaces, as the plate shows them. */
export const groupDigits = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
