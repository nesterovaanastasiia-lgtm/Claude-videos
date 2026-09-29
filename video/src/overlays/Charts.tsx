import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  fontFamily,
  MUTED_LINE,
  SERIES_1,
  SERIES_2,
  TEXT_SECONDARY,
} from "../theme";
import { EASE_OUT, Kicker, Panel, Rise } from "../ui/Card";

const Footnote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily,
      fontSize: 19,
      fontWeight: 500,
      color: TEXT_SECONDARY,
      marginTop: 16,
      letterSpacing: 0.2,
    }}
  >
    {children}
  </div>
);

/**
 * Two horizontal bars contrasting where the effort went.
 * Deliberately unnumbered — it illustrates the claim, it does not quote figures.
 */
export const BarCompare: React.FC = () => {
  const frame = useCurrentFrame();

  const rows = [
    { label: "Реклама для\nкінцевих покупців", width: 24, color: SERIES_1, delay: 8 },
    { label: "Навчання\nпартнерів", width: 92, color: SERIES_2, delay: 108 },
  ];

  return (
    <Panel style={{ width: 616 }}>
      <Kicker>Куди вкладались роками</Kicker>

      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 25,
              fontWeight: 700,
              lineHeight: 1.16,
              width: 228,
              whiteSpace: "pre-line",
              color: "white",
            }}
          >
            {row.label}
          </div>
          <div
            style={{
              flex: 1,
              height: 34,
              borderRadius: 6,
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "0 6px 6px 0",
                background: row.color,
                width: `${interpolate(frame, [row.delay, row.delay + 22], [0, row.width], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                })}%`,
              }}
            />
          </div>
        </div>
      ))}

      <Rise delay={132} collapse>
        <Footnote>Умовна схема, не офіційні цифри компанії</Footnote>
      </Rise>
    </Panel>
  );
};

const CURVE = [
  { x: "Q1", y: 2 },
  { x: "Q2", y: 4 },
  { x: "Q3", y: 8 },
  { x: "Q4", y: 14 },
  { x: "2 рік", y: 36 },
  { x: "3 рік", y: 70 },
];

const W = 524;
const H = 146;
const MAX_Y = 74;

/** Compounding curve behind "партнерська мережа не будується за квартал". */
export const GrowthCurve: React.FC = () => {
  const frame = useCurrentFrame();

  const points = CURVE.map((p, i) => ({
    px: (i / (CURVE.length - 1)) * W,
    py: H - (p.y / MAX_Y) * H,
    label: p.x,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.px.toFixed(1)} ${p.py.toFixed(1)}`)
    .join(" ");

  const reveal = interpolate(frame, [12, 58], [0, W + 24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  return (
    <Panel style={{ width: 616 }}>
      <Kicker>Партнерська мережа · схема</Kicker>

      <svg width={W} height={H + 30} style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="curve-reveal">
            <rect x={-12} y={-30} width={reveal} height={H + 60} />
          </clipPath>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={0}
            x2={W}
            y1={H - g * H}
            y2={H - g * H}
            stroke={MUTED_LINE}
            strokeWidth={1}
          />
        ))}
        <line x1={0} x2={W} y1={H} y2={H} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />

        <g clipPath="url(#curve-reveal)">
          <path
            d={line}
            fill="none"
            stroke={SERIES_1}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p) => (
            <circle
              key={p.label}
              cx={p.px}
              cy={p.py}
              r={5.5}
              fill={SERIES_1}
              stroke="#15151a"
              strokeWidth={2}
            />
          ))}
        </g>

        {points.map((p) => (
          <text
            key={p.label}
            x={p.px}
            y={H + 23}
            textAnchor="middle"
            fill={TEXT_SECONDARY}
            style={{ fontFamily, fontSize: 17, fontWeight: 700 }}
          >
            {p.label}
          </text>
        ))}
      </svg>

      <Rise delay={120} collapse style={{ marginTop: 6 }}>
        <div
          style={{
            fontFamily,
            fontSize: 25,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.18,
          }}
        >
          Роки навчання, а не квартали
        </div>
      </Rise>
    </Panel>
  );
};
