import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  ArtFrame,
  BEIGE,
  BROWN,
  CREAM,
  Dim,
  Enter,
  GOLD,
  OLIVE,
  Plate,
  SAFE_H,
  SANS,
  Safe,
  SERIF,
  useEnter,
} from "./ui";

/* 1 — her own opening line, set as the hook. */
export const PhotoStrip: React.FC = () => (
  <Safe>
    <Enter
      delay={0}
      distance={26}
      style={{ position: "absolute", top: 120, left: 70, width: 940 }}
    >
      <Plate style={{ width: "100%", padding: "30px 36px" }}>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 52,
            fontWeight: 600,
            fontStyle: "italic",
            color: BROWN,
            lineHeight: 1.24,
          }}
        >
          …як старанно вона це приховує
        </div>
        <div
          style={{
            height: 5,
            width: 160,
            background: GOLD,
            borderRadius: 3,
            marginTop: 22,
          }}
        />
      </Plate>
    </Enter>
  </Safe>
);

/* 2 — Rembrandt, hung on the frame, then slid away. */
export const RembrandtBeat: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const out = durationInFrames - 12;
  const shift = interpolate(frame, [out, durationInFrames], [0, -1150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  return (
    <Safe style={{ translate: `${shift}px 0px` }}>
      <ArtFrame
        file="art_01_rembrandt.jpg"
        style={{ left: 80, top: 40, width: 920, height: 1080 }}
      >
        <Dim to={0.12} />
      </ArtFrame>

      <Enter
        delay={6}
        style={{
          position: "absolute",
          top: 1168,
          left: 80,
          width: 920,
        }}
      >
        <Plate style={{ width: "100%" }}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            Аристотель, «Нікомахова етика», книга IV
          </div>
        </Plate>
      </Enter>
    </Safe>
  );
};

/* 3 — the rubric card. */
export const Rubric: React.FC = () => (
  <Safe style={{ justifyContent: "center", alignItems: "center" }}>
    <Enter delay={0} distance={28}>
      <div
        style={{
          background: OLIVE,
          borderRadius: 24,
          padding: 26,
          boxShadow: "0 30px 80px rgba(20,24,12,0.45)",
        }}
      >
        <div
          style={{
            border: `2px solid ${GOLD}`,
            borderRadius: 16,
            padding: "52px 44px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 62,
              fontWeight: 600,
              color: CREAM,
              lineHeight: 1.22,
              letterSpacing: 1,
            }}
          >
            ФІЛОСОФІЯ ДЛЯ ТИХ,
            <br />
            ХТО ЗАБАГАТО ДУМАЄ
          </div>
          <Enter delay={8} style={{ marginTop: 28 }}>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 30,
                fontWeight: 600,
                color: GOLD,
              }}
            >
              одна ідея — одне звичайне життя
            </div>
          </Enter>
        </div>
      </div>
    </Enter>
  </Safe>
);

/* 4 — the three things people say, stacking upward. */
const SAID = [
  { text: "Та я просто подалася на цю вакансію", delay: 4 },
  { text: "Та в мене майже нема шансів", delay: 91 },
  { text: "Та мені просто пощастило", delay: 146 },
];

export const MessageCards: React.FC = () => {
  const frame = useCurrentFrame();
  const t0 = useEnter(0);

  return (
    <Safe>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 40,
          width: 1000,
          height: 1060,
          borderRadius: 24,
          background: "rgba(48,56,31,0.72)",
          opacity: t0,
        }}
      />

      <AbsoluteFill
        style={{
          top: 200,
          height: 1060,
          left: 40,
          width: 1000,
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column-reverse",
          padding: "0 70px",
          gap: 20,
        }}
      >
        {SAID.map((s, i) => {
          const t = useEnter(s.delay);
          const next = SAID[i + 1];
          const active = !next || frame < next.delay;
          return (
            <div
              key={s.text}
              style={{
                opacity: t * (active ? 1 : 0.45),
                translate: `0px ${(1 - t) * 24}px`,
              }}
            >
              <Plate style={{ maxWidth: 820, borderRadius: 16 }}>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 38,
                    fontWeight: 700,
                    color: BROWN,
                    lineHeight: 1.22,
                    textAlign: "left",
                  }}
                >
                  {s.text}
                </div>
              </Plate>
            </div>
          );
        })}
      </AbsoluteFill>
    </Safe>
  );
};

/* 5 — the two Greek words. */
export const GreekWords: React.FC = () => {
  const frame = useCurrentFrame();
  const t0 = useEnter(0);
  const underline = interpolate(frame, [34, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });

  return (
    <Safe style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 960,
          background: BEIGE,
          borderRadius: 24,
          padding: "70px 50px",
          textAlign: "center",
          boxShadow: "0 30px 80px rgba(20,24,12,0.4)",
          opacity: t0,
          translate: `0px ${(1 - t0) * 24}px`,
        }}
      >
        <Enter delay={2} style={{ opacity: 0.4 }}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 88,
              fontWeight: 600,
              color: BROWN,
              letterSpacing: 2,
            }}
          >
            ΜΕΓΑΛΟΨΥΧΙΑ
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 40,
              fontWeight: 600,
              color: BROWN,
              marginTop: 10,
            }}
          >
            велика душа
          </div>
        </Enter>

        <div style={{ height: 76 }} />

        <Enter delay={22}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 98,
              fontWeight: 700,
              color: BROWN,
              letterSpacing: 2,
              position: "relative",
              display: "inline-block",
            }}
          >
            ΜΙΚΡΟΨΥΧΙΑ
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: -12,
                height: 7,
                width: `${underline * 100}%`,
                background: GOLD,
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 46,
              fontWeight: 800,
              color: BROWN,
              marginTop: 28,
            }}
          >
            мала душа
          </div>
        </Enter>
      </div>
    </Safe>
  );
};

/* 6 — the bust beside the claim. */
export const BustPlate: React.FC = () => {
  const t0 = useEnter(0);

  return (
    <Safe style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 960,
          height: 880,
          display: "flex",
          alignItems: "stretch",
          background: BEIGE,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(20,24,12,0.4)",
          opacity: t0,
          translate: `0px ${(1 - t0) * 24}px`,
        }}
      >
        <div style={{ width: "46%", position: "relative" }}>
          <ArtFrame
            file="art_03_bust.jpg"
            seconds={7}
            style={{
              inset: 0,
              borderRadius: 0,
              boxShadow: "none",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "0 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Enter delay={6}>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 50,
                fontWeight: 600,
                color: BROWN,
                lineHeight: 1.26,
              }}
            >
              частіше і гірше,
              <br />
              ніж марнославство
            </div>
          </Enter>
          <Enter delay={20} style={{ marginTop: 28 }}>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 24,
                fontWeight: 600,
                color: "rgba(68,47,33,0.66)",
                lineHeight: 1.35,
              }}
            >
              Нікомахова етика, IV, 1125a
            </div>
          </Enter>
        </div>
      </div>
    </Safe>
  );
};

/* 7 — the main quote over the scanned page. */
const QUOTE_GROUPS = [
  { text: "такі люди", delay: 33 },
  { text: "не беруться", delay: 54 },
  { text: "навіть за добрі", delay: 75 },
  { text: "і гідні справи,", delay: 93 },
  { text: "бо наперед вирішили,", delay: 117 },
  { text: "що вони їх не варті", delay: 141 },
];

export const ScanQuote: React.FC = () => {
  const t0 = useEnter(0);

  return (
    <Safe>
      <ArtFrame
        file="text_01_ethics.jpg"
        seconds={8}
        style={{
          left: 0,
          top: 40,
          width: 1080,
          height: SAFE_H - 80,
          borderRadius: 24,
          opacity: t0,
        }}
      >
        <Dim to={0.78} />
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {QUOTE_GROUPS.map((g) => (
              <Enter key={g.text} delay={g.delay} distance={14}>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 60,
                    fontWeight: 600,
                    color: CREAM,
                    lineHeight: 1.3,
                  }}
                >
                  {g.text}
                </div>
              </Enter>
            ))}
          </div>
        </AbsoluteFill>
      </ArtFrame>
    </Safe>
  );
};

/* 8 — three short lines, caryatids drifting up behind them. */
const LINES = [
  { text: "Перестаєш братися", delay: 3 },
  { text: "Не просиш", delay: 85 },
  { text: "Не подаєшся", delay: 114 },
];

export const ThreeLines: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Safe>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 60,
          width: 430,
          height: SAFE_H - 120,
          overflow: "hidden",
          borderRadius: 20,
          opacity: 0.9,
          boxShadow: "0 24px 60px rgba(20,24,12,0.4)",
        }}
      >
        <Img
          src={staticFile("ar/art_04_caryatids.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            translate: `0px ${interpolate(frame, [0, 200], [50, -50], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px`,
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 70px",
          gap: 22,
          flexDirection: "column",
        }}
      >
        {LINES.map((l) => (
          <Enter key={l.text} delay={l.delay} distance={36}>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 62,
                fontWeight: 600,
                color: BROWN,
                lineHeight: 1.2,
                background: CREAM,
                borderRadius: 16,
                padding: "14px 28px",
                boxShadow: "0 14px 36px rgba(48,56,31,0.26)",
              }}
            >
              {l.text}
            </div>
          </Enter>
        ))}
      </AbsoluteFill>
    </Safe>
  );
};

/* 9 — nothing but a vignette, so her face carries it. The mask keeps the
   subtitle band at full brightness. */
export const Vignette: React.FC = () => {
  const frame = useCurrentFrame();
  const fade =
    "linear-gradient(to bottom, #000 0px, #000 1380px, transparent 1480px)";

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 72% 58% at 50% 42%, rgba(48,56,31,0) 55%, rgba(48,56,31,0.42) 100%)",
        maskImage: fade,
        WebkitMaskImage: fade,
        opacity: interpolate(frame, [0, 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

/* 10 — too much, too little. The first line is gone before the second moves. */
export const TooMuchTooLittle: React.FC = () => {
  const frame = useCurrentFrame();
  const SOLO = 178; // "ЗАМАЛО" stands alone from here
  const fadeOthers = interpolate(frame, [SOLO, SOLO + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [SOLO + 8, SOLO + 26], [0, -190], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Safe style={{ justifyContent: "center", alignItems: "center" }}>
      <Enter delay={62} style={{ opacity: fadeOthers }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(68,47,33,0.5)",
            letterSpacing: 5,
            background: "rgba(249,246,240,0.78)",
            borderRadius: 12,
            padding: "12px 26px",
          }}
        >
          ЗАБАГАТО
        </div>
      </Enter>

      <div
        style={{
          width: 320,
          height: 2,
          background: GOLD,
          margin: "44px 0",
          opacity:
            fadeOthers *
            interpolate(frame, [70, 82], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
        }}
      />

      <Enter delay={178} distance={30} style={{ translate: `0px ${rise}px` }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 118,
            fontWeight: 800,
            color: BROWN,
            letterSpacing: 4,
            background: "rgba(249,246,240,0.86)",
            borderRadius: 16,
            padding: "14px 34px",
            boxShadow: "0 18px 50px rgba(48,56,31,0.28)",
          }}
        >
          ЗАМАЛО
        </div>
      </Enter>
    </Safe>
  );
};

/* 11 — Nike, then the plate alone for the call to action. */
export const FinalBeat: React.FC = () => {
  const frame = useCurrentFrame();
  // The artwork steps back at 113.5s so her face carries the closing ask.
  const artOut = interpolate(frame, [126, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  return (
    <Safe>
      <ArtFrame
        file="art_05_nike.jpg"
        seconds={11}
        style={{
          left: 80,
          top: 20,
          width: 920,
          height: 1020,
          opacity: artOut,
        }}
      >
        <Dim to={0.3} />
      </ArtFrame>

      <Enter
        delay={6}
        style={{ position: "absolute", top: 1098, left: 90, width: 900 }}
      >
        <Plate
          tone="olive"
          style={{ width: "100%", textAlign: "center", padding: "30px 40px" }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 68,
              fontWeight: 600,
              color: CREAM,
              lineHeight: 1.22,
            }}
          >
            Я цього хочу.
            <br />
            Не колись. Оцього.
          </div>
        </Plate>
      </Enter>
    </Safe>
  );
};
