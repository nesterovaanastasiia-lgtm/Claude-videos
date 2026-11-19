import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Card, useSnap } from "./ui";
import { INK, PAPER, SANS, SERIF, WARM } from "./theme";

/**
 * A stylised periodic table — drawn here rather than taken from the web, so the
 * card carries no third-party image.
 */
export const PeriodicCard: React.FC<{
  left?: number;
  right?: number;
  top: number;
  width: number;
  height: number;
  delay?: number;
  outAt?: number;
  tilt?: number;
}> = (p) => {
  const frame = useCurrentFrame();
  const lit = interpolate(frame - (p.delay ?? 0), [8, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cells = Array.from({ length: 90 });

  return (
    <Card {...p} caption="ТАБЛИЦЯ МЕНДЕЛЄЄВА">
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          display: "grid",
          gridTemplateColumns: "repeat(18, 1fr)",
          gap: 3,
          padding: 16,
          boxSizing: "border-box",
          alignContent: "center",
        }}
      >
        {cells.map((_, i) => {
          const on = i / cells.length < lit;
          return (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 2,
                background: on ? "rgba(28,26,23,0.78)" : "rgba(28,26,23,0.12)",
              }}
            />
          );
        })}
      </div>
    </Card>
  );
};

/** A CV sheet with the strengths block picked out. */
export const ResumeCard: React.FC<{
  left?: number;
  right?: number;
  top: number;
  width: number;
  height: number;
  delay?: number;
  outAt?: number;
  tilt?: number;
}> = (p) => {
  const frame = useCurrentFrame();
  const mark = interpolate(frame - (p.delay ?? 0), [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Card {...p} caption="РЕЗЮМЕ">
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          padding: "22px 26px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "rgba(28,26,23,0.2)",
            }}
          />
          <div>
            <div style={{ width: 150, height: 11, borderRadius: 6, background: "rgba(28,26,23,0.55)" }} />
            <div style={{ width: 100, height: 8, borderRadius: 6, background: "rgba(28,26,23,0.22)", marginTop: 8 }} />
          </div>
        </div>
        {[0.95, 0.8, 0.88].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w * 100}%`,
              height: 8,
              borderRadius: 6,
              background: "rgba(28,26,23,0.16)",
              marginTop: i === 0 ? 24 : 11,
            }}
          />
        ))}
        <div
          style={{
            marginTop: 20,
            padding: "12px 14px",
            borderRadius: 8,
            background: `rgba(196,105,74,${0.14 * mark})`,
            border: `2px solid rgba(196,105,74,${0.85 * mark})`,
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 1.6,
              color: WARM,
              opacity: mark,
            }}
          >
            СИЛЬНІ СТОРОНИ
          </div>
          {[0.7, 0.55].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w * 100}%`,
                height: 8,
                borderRadius: 6,
                background: `rgba(196,105,74,${0.4 * mark})`,
                marginTop: 10,
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

/** A paper card of short lines, each landing on its own beat. */
export const ListCard: React.FC<{
  left?: number;
  right?: number;
  top: number;
  width: number;
  height: number;
  title?: string;
  items: { text: string; delay: number }[];
  delay?: number;
  outAt?: number;
  tilt?: number;
  accentLast?: boolean;
}> = ({ title, items, delay = 0, outAt, tilt = 0, accentLast, ...box }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        position: "absolute",
        ...box,
        opacity: o * t,
        rotate: `${tilt}deg`,
        scale: String(0.94 + t * 0.06),
        background: PAPER,
        borderRadius: 16,
        boxShadow: "0 22px 54px rgba(20,18,15,0.42)",
        boxSizing: "border-box",
        padding: "24px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {title ? (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2.4,
            color: "rgba(28,26,23,0.5)",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      ) : null}
      {items.map((it, i) => (
        <Line
          key={it.text}
          text={it.text}
          delay={it.delay}
          accent={!!accentLast && i === items.length - 1}
          last={i === items.length - 1}
        />
      ))}
    </div>
  );
};

const Line: React.FC<{ text: string; delay: number; accent: boolean; last: boolean }> = ({
  text,
  delay,
  accent,
  last,
}) => {
  const { t } = useSnap(delay);
  return (
    <div
      style={{
        fontFamily: SERIF,
        fontWeight: 600,
        fontSize: 36,
        lineHeight: 1.3,
        color: accent ? WARM : INK,
        marginBottom: last ? 0 : 10,
        opacity: t,
        translate: `${(1 - t) * -12}px 0px`,
      }}
    >
      {text}
    </div>
  );
};
