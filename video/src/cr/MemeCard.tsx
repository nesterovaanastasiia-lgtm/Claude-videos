import React from "react";
import { Img, staticFile } from "remotion";
import { useSnap } from "../bl/ui";
import { MEME, SANS, INK } from "../bl/theme";

/**
 * A meme template with the caption set over it, the way the format is normally
 * written: heavy condensed caps, white, outlined.
 */
export const MemeCard: React.FC<{
  file: string;
  top?: string;
  bottom?: string;
  /** Captions pinned to arbitrary spots, for templates with panels. */
  marks?: { text: string; x: number; y: number; w: number; size?: number; dark?: boolean }[];
  left?: number;
  right?: number;
  topPx: number;
  width: number;
  height: number;
  delay?: number;
  outAt?: number;
  tilt?: number;
}> = ({ file, top, bottom, marks, topPx, width, height, delay = 0, outAt, tilt = 0, left, right }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        position: "absolute",
        left,
        right,
        top: topPx,
        width,
        height,
        opacity: o * t,
        rotate: `${tilt}deg`,
        scale: String(0.94 + t * 0.06),
        background: "#FFFFFF",
        padding: 9,
        borderRadius: 16,
        boxShadow: "0 24px 60px rgba(20,18,15,0.45)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 8 }}>
        <Img
          src={staticFile(`cr/${file}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {top ? <Impact text={top} style={{ top: 10, left: 12, right: 12 }} /> : null}
        {bottom ? <Impact text={bottom} style={{ bottom: 10, left: 12, right: 12 }} /> : null}
        {(marks ?? []).map((m) => (
          <div
            key={m.text}
            style={{
              position: "absolute",
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: `${m.w}%`,
              transform: "translate(-50%, -50%)",
              fontFamily: m.dark ? SANS : MEME,
              fontSize: m.size ?? 26,
              fontWeight: 700,
              lineHeight: 1.12,
              textAlign: "center",
              color: m.dark ? INK : "#FFFFFF",
              textTransform: m.dark ? "none" : "uppercase",
              textShadow: m.dark
                ? "none"
                : "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 3px 10px rgba(0,0,0,0.5)",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const Impact: React.FC<{ text: string; style: React.CSSProperties }> = ({ text, style }) => (
  <div
    style={{
      position: "absolute",
      ...style,
      fontFamily: MEME,
      fontWeight: 700,
      fontSize: 38,
      lineHeight: 1.08,
      textAlign: "center",
      color: "#FFFFFF",
      textTransform: "uppercase",
      textShadow:
        "3px 3px 0 #000, -3px 3px 0 #000, 3px -3px 0 #000, -3px -3px 0 #000, 0 0 2px #000, 0 4px 14px rgba(0,0,0,0.6)",
    }}
  >
    {text}
  </div>
);

/** One number, big, for the S&P 500 line. */
export const StatCard: React.FC<{
  value: string;
  label: string;
  left?: number;
  right?: number;
  top: number;
  width: number;
  delay?: number;
  outAt?: number;
  tilt?: number;
}> = ({ value, label, delay = 0, outAt, tilt = 0, ...box }) => {
  const { t, o } = useSnap(delay, outAt);
  const { t: t2 } = useSnap(delay + 10);
  return (
    <div
      style={{
        position: "absolute",
        ...box,
        opacity: o * t,
        rotate: `${tilt}deg`,
        scale: String(0.94 + t * 0.06),
        background: "#F6F1E8",
        borderRadius: 22,
        boxShadow: "0 24px 60px rgba(20,18,15,0.45)",
        boxSizing: "border-box",
        padding: "26px 30px",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: MEME, fontSize: 132, fontWeight: 700, color: INK, lineHeight: 1 }}>
        {value}
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 28,
          fontWeight: 700,
          color: "rgba(28,26,23,0.74)",
          lineHeight: 1.28,
          marginTop: 14,
          opacity: t2,
        }}
      >
        {label}
      </div>
    </div>
  );
};
