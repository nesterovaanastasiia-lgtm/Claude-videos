import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BEIGE = "#F2E9DA";
export const CREAM = "#F9F6F0";
export const OLIVE = "#30381F";
export const BROWN = "#442F21";
export const GOLD = "#CAA463";

export const SERIF = "Lora";
export const SANS = "Manrope";

export const AR_DURATION = 3604;
export const CANVAS_W = 1080;
export const CANVAS_H = 1920;

/**
 * The source file is a 1080x1350 container with a 9:16 picture inside it and
 * black pillars baked in at x=160..920 (measured with cropdetect). Scaling that
 * picture to the full canvas restores the footage as shot: nothing is cropped
 * out of frame and nothing is stretched.
 */
export const SRC_SCALE = CANVAS_H / 1350; // 1.42222
export const SRC_W = 1080 * SRC_SCALE; // 1536
export const SRC_LEFT = -160 * SRC_SCALE; // -227.6

/**
 * Subtitles are burned into the footage in a band around y=1520..1700, so every
 * graphic stays inside this safe zone and never lands on them.
 */
export const SAFE_TOP = 96;
export const SAFE_BOTTOM = 1470;
export const SAFE_H = SAFE_BOTTOM - SAFE_TOP; // 1374

/** Spring entrance, ~350ms, no overshoot. */
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

/**
 * The entrance lives on an inner wrapper so that opacity and translate passed
 * in `style` compose with it instead of being overwritten.
 */
export const Enter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 20, style }) => {
  const t = useEnter(delay);
  return (
    <div style={style}>
      <div style={{ opacity: t, translate: `0px ${(1 - t) * distance}px` }}>
        {children}
      </div>
    </div>
  );
};

/** Everything a graphic may occupy: clear of the subtitles and of the Reels UI. */
export const Safe: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill style={{ top: SAFE_TOP, height: SAFE_H, ...style }}>
    {children}
  </AbsoluteFill>
);

/**
 * Slow Ken Burns, 1.0 -> 1.08 over four seconds, cover-fitted and centred so
 * nothing is stretched.
 */
export const KenBurns: React.FC<{
  file: string;
  seconds?: number;
  style?: React.CSSProperties;
}> = ({ file, seconds = 4, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <Img
        src={staticFile(`ar/${file}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          scale: interpolate(frame, [0, seconds * fps], [1, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

/** A painting hung on the frame: rounded, shadowed, never full-bleed. */
export const ArtFrame: React.FC<{
  file: string;
  seconds?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ file, seconds = 4, style, children }) => (
  <div
    style={{
      position: "absolute",
      overflow: "hidden",
      borderRadius: 20,
      boxShadow: "0 30px 80px rgba(20,24,12,0.45)",
      ...style,
    }}
  >
    <KenBurns file={file} seconds={seconds} />
    {children}
  </div>
);

/** Dim layer over an image. */
export const Dim: React.FC<{ to: number; color?: string }> = ({
  to,
  color = OLIVE,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: interpolate(frame, [0, 8], [0, to], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    />
  );
};

export const Plate: React.FC<{
  children: React.ReactNode;
  tone?: "cream" | "beige" | "olive";
  style?: React.CSSProperties;
}> = ({ children, tone = "cream", style }) => (
  <div
    style={{
      fontFamily: SANS,
      background: tone === "olive" ? OLIVE : tone === "beige" ? BEIGE : CREAM,
      color: tone === "olive" ? CREAM : BROWN,
      borderRadius: 16,
      padding: "22px 30px",
      boxShadow: "0 16px 44px rgba(48,56,31,0.3)",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);
