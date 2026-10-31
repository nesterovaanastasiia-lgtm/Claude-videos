import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  ACCENT,
  fontFamily,
  SERIES_1,
  SERIES_2,
  TEXT_SECONDARY,
} from "../theme";
import { EASE, Kicker, Panel, Rise, SourceLine } from "./ui";

/* ------------------------------------------------------------------ *
 * OLX median salaries — magnitude across five roles, one hue.
 * Figures as supplied by the author from the OLX Робота report.
 * ------------------------------------------------------------------ */

const SALARY_ROWS = [
  { label: "Керівник відділу продажів", value: 110, delay: 10 },
  { label: "Штукатур", value: 80, delay: 22 },
  { label: "Фасадник", value: 70, delay: 34 },
  { label: "Плиточник", value: 70, delay: 46 },
  { label: "Муляр", value: 65, delay: 58 },
];
const SALARY_MAX = 120;

export const SalaryBars: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Panel>
      <Kicker>Медіанні зарплати, OLX</Kicker>

      {SALARY_ROWS.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 25,
              fontWeight: 700,
              width: 300,
              lineHeight: 1.12,
              color: "white",
            }}
          >
            {row.label}
          </div>
          <div style={{ flex: 1, height: 36, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                borderRadius: "0 8px 8px 0",
                background: SERIES_1,
                width: `${interpolate(
                  frame,
                  [row.delay, row.delay + 20],
                  [0, (row.value / SALARY_MAX) * 100],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
                )}%`,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 12,
                top: 2,
                fontFamily,
                fontSize: 25,
                fontWeight: 900,
                color: "white",
              }}
            >
              {row.value} тис.
            </div>
          </div>
        </div>
      ))}

      <Rise delay={74} collapse>
        <div
          style={{
            marginTop: 10,
            paddingTop: 20,
            borderTop: "2px solid rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 27,
              fontWeight: 700,
              color: TEXT_SECONDARY,
            }}
          >
            Медіана по платформі
          </div>
          <div
            style={{ fontFamily, fontSize: 36, fontWeight: 900, color: ACCENT }}
          >
            30,5 тис.
          </div>
        </div>
        <SourceLine>OLX Робота, липень 2026</SourceLine>
      </Rise>
    </Panel>
  );
};

/* ------------------------------------------------------------------ *
 * Copywriter vacancies: a before/after pair, not a trend line.
 * ------------------------------------------------------------------ */

export const CopywriterDrop: React.FC = () => {
  const frame = useCurrentFrame();

  const Col: React.FC<{
    value: number;
    caption: string;
    color: string;
    height: number;
    delay: number;
  }> = ({ value, caption, color, height, delay }) => (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div
        style={{
          fontFamily,
          fontSize: 54,
          fontWeight: 900,
          color: "white",
          marginBottom: 12,
        }}
      >
        {value}
      </div>
      <div
        style={{
          height: interpolate(frame, [delay, delay + 20], [0, height], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
          background: color,
          borderRadius: "8px 8px 0 0",
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: 25,
          fontWeight: 700,
          color: TEXT_SECONDARY,
          marginTop: 12,
        }}
      >
        {caption}
      </div>
    </div>
  );

  return (
    <Panel>
      <Kicker>Вакансії для копірайтерів</Kicker>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 56, height: 250 }}>
        <Col value={125} caption="три роки тому" color={SERIES_1} height={190} delay={8} />
        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 900,
            color: ACCENT,
            paddingBottom: 60,
          }}
        >
          −60%
        </div>
        <Col value={50} caption="зараз" color={SERIES_2} height={76} delay={26} />
      </div>
      <Rise delay={44} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            marginTop: 18,
            lineHeight: 1.2,
          }}
        >
          На місяць. Так само впали перекладачі англійської.
        </div>
        <SourceLine>Work.ua за методологією МОП · dengi.ua</SourceLine>
      </Rise>
    </Panel>
  );
};

/* ------------------------------------------------------------------ *
 * Divergence: who lost vacancies and who gained them.
 * Polarity, so the documented diverging pair — blue up, red down,
 * validated against this card's surface.
 * ------------------------------------------------------------------ */

const DIVERGE = [
  { label: "Копірайтери", value: -60, delay: 8 },
  { label: "Монтажники, різнороби", value: 53, delay: 22 },
  { label: "Будівельники", value: 33, delay: 36 },
  { label: "Зварювальники", value: 28, delay: 50 },
];
const DOWN = "#e66767";
const UP = "#3987e5";
const PX_PER_POINT = 2.5;
const LABEL_W = 300;
const HALF_W = 240;

export const DivergenceChart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Panel>
      <Kicker>Вакансії за три роки</Kicker>

      {DIVERGE.map((row) => {
        const grown = interpolate(frame, [row.delay, row.delay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
        });
        const w = Math.abs(row.value) * PX_PER_POINT * grown;
        const positive = row.value > 0;

        const value = (
          <div
            style={{
              fontFamily,
              fontSize: 27,
              fontWeight: 900,
              color: "white",
              opacity: grown,
              whiteSpace: "nowrap",
            }}
          >
            {positive ? "+" : "−"}
            {Math.abs(row.value)}%
          </div>
        );
        const bar = (
          <div
            style={{
              width: w,
              height: 32,
              background: positive ? UP : DOWN,
              borderRadius: positive ? "0 6px 6px 0" : "6px 0 0 6px",
            }}
          />
        );

        return (
          <div
            key={row.label}
            style={{ display: "flex", alignItems: "center", marginBottom: 13 }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 25,
                fontWeight: 700,
                width: LABEL_W,
                textAlign: "right",
                paddingRight: 18,
                boxSizing: "border-box",
                color: "white",
                lineHeight: 1.12,
              }}
            >
              {row.label}
            </div>

            {/* left arm: bar grows away from the zero line */}
            <div
              style={{
                width: HALF_W,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 12,
              }}
            >
              {positive ? null : value}
              {positive ? null : bar}
            </div>

            <div style={{ width: 2, alignSelf: "stretch", background: "rgba(255,255,255,0.3)" }} />

            {/* right arm */}
            <div
              style={{
                width: HALF_W,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
              }}
            >
              {positive ? bar : null}
              {positive ? value : null}
            </div>
          </div>
        );
      })}

      <Rise delay={66} collapse>
        <SourceLine>Work.ua за методологією МОП · dengi.ua</SourceLine>
      </Rise>
    </Panel>
  );
};
