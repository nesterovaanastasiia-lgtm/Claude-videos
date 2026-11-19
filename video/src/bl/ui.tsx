import React from "react";
import {
  Img,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { INK, PAPER, SANS, SERIF, WARM } from "./theme";

/** A quick snap in, the way the reference drops its cards on the frame. */
export const useSnap = (delay = 0, outAt?: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.5, stiffness: 180 },
    durationInFrames: 8,
  });
  const o =
    outAt === undefined
      ? 1
      : interpolate(frame, [outAt, outAt + 6], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  return { t, o, v: t * o };
};

type Box = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  height: number;
};

/**
 * The reference's signature element: a white-bordered card dropped in a corner
 * of the frame, holding a picture or a clip, tilted a degree or two.
 */
export const Card: React.FC<
  Box & {
    delay?: number;
    outAt?: number;
    tilt?: number;
    children: React.ReactNode;
    caption?: string;
  }
> = ({ delay = 0, outAt, tilt = 0, children, caption, ...box }) => {
  const { t, o } = useSnap(delay, outAt);

  return (
    <div
      style={{
        position: "absolute",
        ...box,
        opacity: o * t,
        rotate: `${tilt}deg`,
        scale: String(0.94 + t * 0.06),
        background: "#FFFFFF",
        padding: 10,
        paddingBottom: caption ? 0 : 10,
        borderRadius: 18,
        boxShadow: "0 22px 54px rgba(20,18,15,0.42)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, overflow: "hidden", borderRadius: 10, position: "relative" }}>
        {children}
      </div>
      {caption ? (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: 1.2,
            color: INK,
            textAlign: "center",
            padding: "13px 0 15px",
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

/** A still inside a card, drifting very slightly so it never looks pasted on. */
export const CardImg: React.FC<{ file: string; seconds?: number }> = ({
  file,
  seconds = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Img
      src={staticFile(`bl/${file}`)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        scale: interpolate(frame, [0, seconds * fps], [1, 1.07], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        }),
      }}
    />
  );
};

/** A muted clip inside a card. */
export const CardClip: React.FC<{ file: string }> = ({ file }) => (
  <OffthreadVideo
    src={staticFile(`bl/${file}`)}
    muted
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
);

/** The display title: heavy, uppercase, set over the top of the frame. */
export const Title: React.FC<{
  lines: string[];
  delay?: number;
  outAt?: number;
  top?: number;
}> = ({ lines, delay = 0, outAt, top = 150 }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: 1080,
        textAlign: "center",
        opacity: o * t,
        translate: `0px ${(1 - t) * -16}px`,
      }}
    >
      {lines.map((l, i) => (
        <div
          key={l}
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: i === 0 ? 54 : 72,
            letterSpacing: 2,
            color: "#FFFFFF",
            lineHeight: 1.16,
            textShadow: "0 4px 26px rgba(20,18,15,0.75)",
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
};

/** A paper card carrying a quotation and its source. */
export const QuoteCard: React.FC<
  Box & { delay?: number; outAt?: number; tilt?: number; quote: string; who: string }
> = ({ delay = 0, outAt, tilt = 0, quote, who, ...box }) => {
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
        padding: "26px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 31,
          lineHeight: 1.32,
          color: INK,
        }}
      >
        «{quote}»
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 2.4,
          color: "rgba(28,26,23,0.62)",
          marginTop: 16,
          textTransform: "uppercase",
        }}
      >
        {who}
      </div>
    </div>
  );
};

/** Small hand-written-feeling notes with a coloured arrow, as in the reference. */
export const Note: React.FC<{
  lines: string[];
  delay?: number;
  outAt?: number;
  left?: number;
  right?: number;
  top: number;
}> = ({ lines, delay = 0, outAt, left, right, top }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        position: "absolute",
        left,
        right,
        top,
        opacity: o * t,
        translate: `0px ${(1 - t) * 10}px`,
      }}
    >
      {lines.map((l, i) => (
        <div
          key={l}
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 34,
            lineHeight: 1.42,
            color: i === 0 ? "#FFFFFF" : WARM,
            textShadow: "0 3px 16px rgba(20,18,15,0.65)",
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
};
