import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { useSnap } from "../bl/ui";
import { INK, SANS, SERIF, WARM } from "../bl/theme";

type Box = {
  left?: number;
  right?: number;
  top: number;
  width: number;
  delay?: number;
  outAt?: number;
  tilt?: number;
};

const shell = (t: number, o: number, tilt: number): React.CSSProperties => ({
  position: "absolute",
  opacity: o * t,
  rotate: `${tilt}deg`,
  scale: String(0.94 + t * 0.06),
  boxSizing: "border-box",
  boxShadow: "0 24px 60px rgba(20,18,15,0.45)",
});

/** A phone conversation: the quickest way to put someone else's words on screen. */
export const ChatCard: React.FC<
  Box & { msgs: { text: string; mine?: boolean; delay: number }[] }
> = ({ msgs, delay = 0, outAt, tilt = 0, ...box }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        ...shell(t, o, tilt),
        ...box,
        background: "#FFFFFF",
        borderRadius: 26,
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {msgs.map((m) => (
        <Bubble key={m.text} {...m} />
      ))}
    </div>
  );
};

const Bubble: React.FC<{ text: string; mine?: boolean; delay: number }> = ({
  text,
  mine,
  delay,
}) => {
  const { t } = useSnap(delay);
  return (
    <div
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "86%",
        background: mine ? "#2F7CF6" : "#EDEBE6",
        color: mine ? "#FFFFFF" : INK,
        borderRadius: 22,
        borderBottomRightRadius: mine ? 6 : 22,
        borderBottomLeftRadius: mine ? 22 : 6,
        padding: "14px 20px",
        fontFamily: SANS,
        fontSize: 31,
        fontWeight: 600,
        lineHeight: 1.26,
        opacity: t,
        translate: `0px ${(1 - t) * 14}px`,
      }}
    >
      {text}
    </div>
  );
};

/** A search box with the suggestions dropping in underneath. */
export const SearchCard: React.FC<Box & { query: string; hints: string[] }> = ({
  query,
  hints,
  delay = 0,
  outAt,
  tilt = 0,
  ...box
}) => {
  const { t, o } = useSnap(delay, outAt);
  const frame = useCurrentFrame();
  const typed = Math.round(
    interpolate(frame - delay, [4, 4 + query.length * 1.6], [0, query.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div
      style={{
        ...shell(t, o, tilt),
        ...box,
        background: "#FFFFFF",
        borderRadius: 28,
        padding: "20px 0 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 26px 16px",
          borderBottom: "1px solid rgba(28,26,23,0.12)",
        }}
      >
        <Lens />
        <div
          style={{
            fontFamily: SANS,
            fontSize: 32,
            fontWeight: 600,
            color: INK,
          }}
        >
          {query.slice(0, typed)}
          <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>|</span>
        </div>
      </div>
      {hints.map((h, i) => (
        <Hint key={h} text={h} delay={delay + 10 + i * 9} />
      ))}
    </div>
  );
};

const Hint: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const { t } = useSnap(delay);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 26px",
        opacity: t,
      }}
    >
      <Lens dim />
      <div
        style={{
          fontFamily: SANS,
          fontSize: 27,
          fontWeight: 500,
          color: "rgba(28,26,23,0.76)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Lens: React.FC<{ dim?: boolean }> = ({ dim }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle
      cx="10.5"
      cy="10.5"
      r="6.5"
      stroke={dim ? "rgba(28,26,23,0.4)" : "rgba(28,26,23,0.72)"}
      strokeWidth="2.2"
    />
    <path
      d="M15.5 15.5 L21 21"
      stroke={dim ? "rgba(28,26,23,0.4)" : "rgba(28,26,23,0.72)"}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/** A social post, for a line that lands better as someone's hot take. */
export const PostCard: React.FC<
  Box & { who: string; handle: string; text: string; likes?: string }
> = ({ who, handle, text, likes, delay = 0, outAt, tilt = 0, ...box }) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        ...shell(t, o, tilt),
        ...box,
        background: "#FFFFFF",
        borderRadius: 24,
        padding: "24px 26px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: "linear-gradient(135deg,#C9BFAE,#8E8375)",
          }}
        />
        <div>
          <div style={{ fontFamily: SANS, fontSize: 27, fontWeight: 800, color: INK }}>
            {who}
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 23,
              fontWeight: 500,
              color: "rgba(28,26,23,0.5)",
            }}
          >
            {handle}
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 32,
          fontWeight: 600,
          color: INK,
          lineHeight: 1.3,
          marginTop: 18,
        }}
      >
        {text}
      </div>
      {likes ? (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(28,26,23,0.45)",
            marginTop: 16,
          }}
        >
          ♡ {likes}
        </div>
      ) : null}
    </div>
  );
};

/** A phone banner, for an interruption. */
export const NotifCard: React.FC<Box & { app: string; title: string; body: string }> = ({
  app,
  title,
  body,
  delay = 0,
  outAt,
  tilt = 0,
  ...box
}) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        ...shell(t, o, tilt),
        ...box,
        background: "rgba(250,249,247,0.96)",
        borderRadius: 26,
        padding: "18px 22px",
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: WARM,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: SANS,
          fontSize: 28,
          fontWeight: 800,
          color: "#FFF",
        }}
      >
        {app.slice(0, 1)}
      </div>
      <div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: 1.4,
            color: "rgba(28,26,23,0.45)",
            textTransform: "uppercase",
          }}
        >
          {app}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 29, fontWeight: 800, color: INK, marginTop: 4 }}>
          {title}
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            fontWeight: 500,
            color: "rgba(28,26,23,0.72)",
            marginTop: 3,
            lineHeight: 1.25,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

/** The part card that opens each carousel slide, and the hook that closes it. */
export const PartCard: React.FC<{ part: string; title: string; delay?: number; outAt?: number }> = ({
  part,
  title,
  delay = 0,
  outAt,
}) => {
  const { t, o } = useSnap(delay, outAt);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1920,
        background: "rgba(20,18,15,0.82)",
        opacity: o * t,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: 7,
          color: WARM,
        }}
      >
        {part}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 76,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.18,
          padding: "0 80px",
        }}
      >
        {title}
      </div>
    </div>
  );
};
