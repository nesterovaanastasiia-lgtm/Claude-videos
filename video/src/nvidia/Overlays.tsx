import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BEIGE, BROWN, CREAM, GOLD, OLIVE, RADIUS, SANS, SERIF, SHADOW } from "./theme";
import { Card, Enter, groupDigits, Heading, Kicker, Scrim, useEnter } from "./ui";

/* ------------------------------------------------------------------ *
 * 1. Headline montage — the loud coverage, one cut after another.
 * ------------------------------------------------------------------ */

const MONTAGE = ["01", "02", "04", "05", "06", "07", "08"];
const SHOT_FRAMES = 20;
/** Fixed per index so the tilt is stable across renders. */
const TILT = [-1.6, 2.0, -2.0, 1.2, -1.1, 1.8, -1.9];

const Shot: React.FC<{ file: string; tilt: number; hold: number }> = ({
  file,
  tilt,
  hold,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "85%",
          maxHeight: 1180,
          rotate: `${tilt}deg`,
          scale: interpolate(frame, [0, hold], [1, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
          borderRadius: RADIUS,
          overflow: "hidden",
          boxShadow: SHADOW,
          background: CREAM,
        }}
      >
        <Img
          src={staticFile(`nv-shots/${file}.png`)}
          style={{ width: "100%", display: "block", maxHeight: 1180, objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const HeadlineMontage: React.FC = () => (
  <AbsoluteFill>
    <Scrim opacity={0.62} />
    {MONTAGE.map((file, i) => (
      <Sequence
        key={file}
        name={`Заголовок ${file}`}
        from={i * SHOT_FRAMES}
        durationInFrames={SHOT_FRAMES}
      >
        <Shot file={file} tilt={TILT[i]} hold={SHOT_FRAMES} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ *
 * 2. The number nobody led with.
 * ------------------------------------------------------------------ */

export const CounterPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [6, 42], [0, 4_800_000_000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.2, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: OLIVE,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 56px",
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 120,
          fontWeight: 800,
          color: GOLD,
          lineHeight: 1,
          letterSpacing: -2,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {groupDigits(value)}
      </div>
      <Enter delay={40} style={{ marginTop: 34, textAlign: "center" }}>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 46,
            fontWeight: 600,
            color: CREAM,
            lineHeight: 1.25,
          }}
        >
          доларів
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 30,
            fontWeight: 600,
            color: "rgba(249,246,240,0.74)",
            marginTop: 14,
            lineHeight: 1.3,
          }}
        >
          Стільки чипів Nvidia купила Megaspeed
        </div>
      </Enter>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 3. What happened, in three dates.
 * ------------------------------------------------------------------ */

const NODES = [
  { date: "8 листопада", text: "Рада директорів\nпочала розслідування", delay: 4 },
  { date: "12 листопада", text: "Дженсен Хуанг\nпішов у відставку", delay: 82 },
  { date: "3 і 10 грудня", text: "Міністр торгівлі США\nсвідчить у Сенаті", delay: 306, gold: true },
];

export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 505 }}>
      <Card tone="cream" style={{ width: 980 }}>
        <Kicker>Коротко, що сталося</Kicker>
        <div style={{ position: "relative", display: "flex", gap: 16 }}>
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              top: 13,
              height: 3,
              background: "rgba(68,47,33,0.16)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 13,
              height: 3,
              background: GOLD,
              width: `${interpolate(frame, [4, 306], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }) * 86}%`,
            }}
          />
          {NODES.map((n) => {
            const t = useEnter(n.delay);
            const pulse = n.gold
              ? 1 + 0.07 * Math.max(0, Math.sin((frame - n.delay) / 7)) *
                interpolate(frame, [n.delay, n.delay + 70], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 1;

            return (
              <div key={n.date} style={{ flex: 1, opacity: t, zIndex: 1 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: n.gold ? GOLD : CREAM,
                    border: `3px solid ${n.gold ? GOLD : BROWN}`,
                    boxSizing: "border-box",
                    marginBottom: 16,
                    scale: String(pulse),
                  }}
                />
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 26,
                    fontWeight: 800,
                    color: n.gold ? "#8A6A2C" : BROWN,
                  }}
                >
                  {n.date}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 22,
                    fontWeight: 500,
                    color: "rgba(68,47,33,0.74)",
                    marginTop: 7,
                    lineHeight: 1.26,
                    whiteSpace: "pre-line",
                  }}
                >
                  {n.text}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 4. The fall. No axes, no grid — just the line and her own wording.
 * ------------------------------------------------------------------ */

const W = 820;
const H = 230;
const POINTS = [
  [0, 28],
  [150, 52],
  [300, 44],
  [440, 120],
  [600, 176],
  [820, 214],
];

export const CrashChart: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [6, 36], [0, W + 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const path = POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 300 }}>
      <Card tone="cream" style={{ width: 940 }}>
        <Kicker>Капіталізація Nvidia</Kicker>
        <svg width={W} height={H} style={{ display: "block", overflow: "visible" }}>
          <defs>
            <clipPath id="nv-crash-reveal">
              <rect x={-20} y={-30} width={reveal} height={H + 70} />
            </clipPath>
          </defs>
          <g clipPath="url(#nv-crash-reveal)">
            <path
              d={path}
              fill="none"
              stroke={BROWN}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={POINTS[POINTS.length - 1][0]} cy={POINTS[POINTS.length - 1][1]} r={11} fill={GOLD} />
          </g>
        </svg>
        <Enter delay={34} style={{ marginTop: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: BROWN }}>
            сотні мільярдів за тиждень
          </div>
        </Enter>
      </Card>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 5. What the attention picks.
 * ------------------------------------------------------------------ */

export const TwoCards: React.FC = () => {
  const frame = useCurrentFrame();
  const pulseAt = 110;
  const pulse =
    1 +
    0.06 *
      Math.max(0, Math.sin(((frame - pulseAt) / 12) * Math.PI)) *
      (frame >= pulseAt && frame <= pulseAt + 12 ? 1 : 0);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "stretch", width: "100%" }}>
        <Enter delay={0} style={{ flex: 1, display: "flex" }}>
          <Card tone="cream" style={{ opacity: 0.35, width: "100%" }}>
            <Heading size={36}>Схема експортного контролю</Heading>
          </Card>
        </Enter>
        <Enter delay={10} style={{ flex: 1.1, display: "flex" }}>
          <Card
            tone="olive"
            style={{ width: "100%", scale: String(1.1 * pulse), boxShadow: "0 24px 60px rgba(48,56,31,0.5)" }}
          >
            <Heading size={36} color={CREAM}>
              Роман із підозрюваною в шпигунстві
            </Heading>
          </Card>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 6. Customer journey map.
 * ------------------------------------------------------------------ */

const stroke = { stroke: BROWN, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const EyeIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24">
    <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6Z" {...stroke} />
    <circle cx="12" cy="12" r="3" {...stroke} />
  </svg>
);
const SparkIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24">
    <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5L10 13l-6.5-2L10 9l2-6.5Z" {...stroke} />
  </svg>
);
const BagIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24">
    <path d="M4.5 7.5h15l-1.3 13H5.8L4.5 7.5Z" {...stroke} />
    <path d="M8.8 10V6.4a3.2 3.2 0 0 1 6.4 0V10" {...stroke} />
  </svg>
);
const ReturnIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24">
    <path d="M3.6 12a8.4 8.4 0 1 0 2.6-6.1" {...stroke} />
    <path d="M3.2 4.2v4.6h4.6" {...stroke} />
  </svg>
);
const ShareIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24">
    <circle cx="6" cy="12" r="2.6" {...stroke} />
    <circle cx="18" cy="5.8" r="2.6" {...stroke} />
    <circle cx="18" cy="18.2" r="2.6" {...stroke} />
    <path d="m8.3 10.8 7.4-3.8M8.3 13.2l7.4 3.8" {...stroke} />
  </svg>
);

const STAGES = [
  { label: "Побачив", Icon: EyeIcon },
  { label: "Зацікавився", Icon: SparkIcon },
  { label: "Купив", Icon: BagIcon },
  { label: "Повернувся", Icon: ReturnIcon },
  { label: "Порекомендував", Icon: ShareIcon },
];

export const CjmScheme: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BEIGE,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 44px",
      }}
    >
      <Enter delay={0} style={{ marginBottom: 54, textAlign: "center" }}>
        <Kicker color={"#8A6A2C"}>Шлях клієнта</Kicker>
        <Heading size={58} align="center">
          Customer Journey Map
        </Heading>
      </Enter>

      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {STAGES.map((s, i) => {
          const delay = 8 + i * 9;
          const t = useEnter(delay);
          const arrow = interpolate(frame, [delay + 5, delay + 13], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <React.Fragment key={s.label}>
              {i > 0 ? (
                <div style={{ width: 34, display: "flex", alignItems: "center" }}>
                  <svg width="34" height="16" viewBox="0 0 34 16">
                    <g
                      style={{
                        clipPath: `inset(0 ${(1 - arrow) * 100}% 0 0)`,
                      }}
                    >
                      <path d="M2 8h28M24 3l6 5-6 5" {...stroke} />
                    </g>
                  </svg>
                </div>
              ) : null}
              <div
                style={{
                  flex: 1,
                  opacity: t,
                  translate: `0px ${(1 - t) * 16}px`,
                  background: CREAM,
                  border: `2px solid rgba(68,47,33,0.45)`,
                  borderRadius: RADIUS,
                  padding: "26px 8px",
                  minHeight: 168,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <s.Icon />
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 19,
                    fontWeight: 700,
                    color: BROWN,
                    marginTop: 12,
                    lineHeight: 1.15,
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 7. The questions most people skip.
 * ------------------------------------------------------------------ */

const QUESTIONS = [
  { text: "Купити раз — чи повертатися?", delay: 93 },
  { text: "Якщо повертатися, то як часто?", delay: 168 },
  { text: "Брати щось додаткове?", delay: 210 },
  { text: "Рекомендувати — і що за це?", delay: 289 },
  { text: "Перший, про кого згадають?", delay: 381 },
  { text: "Порадити колегу, коли не твоє?", delay: 551 },
];

export const Checklist: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 56px",
        paddingBottom: 410,
      }}
    >
      <Card tone="cream" style={{ width: "100%", padding: "20px 28px" }}>
        <Kicker>Якої поведінки ви хочете від клієнта</Kicker>
        {QUESTIONS.map((q, i) => {
          const t = useEnter(q.delay);
          const next = QUESTIONS[i + 1];
          const active = !next || frame < next.delay;

          return (
            <div
              key={q.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 9,
                opacity: t * (active ? 1 : 0.5),
                translate: `0px ${(1 - t) * 18}px`,
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  background: active ? GOLD : "rgba(68,47,33,0.3)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 28,
                  fontWeight: active ? 800 : 600,
                  color: BROWN,
                  lineHeight: 1.16,
                }}
              >
                {q.text}
              </div>
            </div>
          );
        })}
      </Card>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 8a. The reporting that stayed quiet.
 * ------------------------------------------------------------------ */

const QUIET = [
  { file: "09", hold: 30 },
  { file: "10", hold: 30 },
  { file: "11", hold: 30 },
  { file: "12", hold: 45 },
];

const QuietShot: React.FC<{ file: string; hold: number }> = ({ file, hold }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "88%",
          scale: interpolate(frame, [0, hold], [1, 1.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
          borderRadius: RADIUS,
          overflow: "hidden",
          boxShadow: SHADOW,
          background: CREAM,
        }}
      >
        <Img
          src={staticFile(`nv-shots/${file}.png`)}
          style={{ width: "100%", display: "block", maxHeight: 1150, objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const QuietShots: React.FC = () => {
  let cursor = 0;

  return (
    <AbsoluteFill>
      <Scrim opacity={0.62} />
      {QUIET.map((q) => {
        const from = cursor;
        cursor += q.hold;
        return (
          <Sequence key={q.file} name={`Тихо ${q.file}`} from={from} durationInFrames={q.hold}>
            <QuietShot file={q.file} hold={q.hold} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 8b. Closing plate.
 * ------------------------------------------------------------------ */

export const FinalPlate: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: BEIGE,
      justifyContent: "center",
      alignItems: "center",
      padding: "0 86px",
    }}
  >
    <Enter delay={0}>
      <Heading size={66} align="center">
        Шлях вашого клієнта існує завжди.
      </Heading>
    </Enter>
    <Enter delay={14} style={{ marginTop: 34 }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 44,
          fontWeight: 800,
          color: "#8A6A2C",
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        Питання — хто його будує
      </div>
    </Enter>
  </AbsoluteFill>
);
