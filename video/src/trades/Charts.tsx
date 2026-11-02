import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";
import {
  DATA_BLUE,
  DATA_ORANGE,
  DATA_RED,
  EASE,
  HAIRLINE,
  INK,
  INK_SOFT,
  Kicker,
  Panel,
  Rise,
  SourceLine,
} from "./ui";

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
            gap: 14,
            marginBottom: 9,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 19,
              fontWeight: 700,
              width: 230,
              lineHeight: 1.1,
              color: INK,
            }}
          >
            {row.label}
          </div>
          <div style={{ flex: 1, height: 26, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 5,
                background: "rgba(20,20,26,0.07)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                borderRadius: "0 5px 5px 0",
                background: DATA_BLUE,
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
                right: 10,
                top: 1,
                fontFamily,
                fontSize: 19,
                fontWeight: 900,
                color: INK,
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
            marginTop: 6,
            paddingTop: 12,
            borderTop: `1px solid ${HAIRLINE}`,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <div
            style={{ fontFamily, fontSize: 19, fontWeight: 700, color: INK_SOFT }}
          >
            Медіана по платформі
          </div>
          <div style={{ fontFamily, fontSize: 25, fontWeight: 900, color: INK }}>
            30,5 тис.
          </div>
        </div>
        <SourceLine>OLX Робота, липень 2026</SourceLine>
      </Rise>
    </Panel>
  );
};

/* ------------------------------------------------------------------ *
 * Copywriter vacancies: a before/after pair.
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
          fontSize: 36,
          fontWeight: 900,
          color: INK,
          marginBottom: 8,
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
          borderRadius: "5px 5px 0 0",
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: 17,
          fontWeight: 700,
          color: INK_SOFT,
          marginTop: 8,
        }}
      >
        {caption}
      </div>
    </div>
  );

  return (
    <Panel>
      <Kicker>Вакансії для копірайтерів</Kicker>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 168 }}>
        <Col value={125} caption="три роки тому" color={DATA_BLUE} height={124} delay={8} />
        <div
          style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 900,
            color: DATA_RED,
            paddingBottom: 42,
          }}
        >
          −60%
        </div>
        <Col value={50} caption="зараз" color={DATA_ORANGE} height={50} delay={26} />
      </div>
      <Rise delay={44} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: INK,
            marginTop: 12,
            lineHeight: 1.2,
          }}
        >
          На місяць. Так само впали вакансії для перекладачів англійської.
        </div>
        <SourceLine>Work.ua за методологією МОП · dengi.ua</SourceLine>
      </Rise>
    </Panel>
  );
};

/* ------------------------------------------------------------------ *
 * Divergence: who lost vacancies and who gained them.
 * Polarity, so the documented light diverging pair — blue up, red down,
 * validated on the white card surface.
 * ------------------------------------------------------------------ */

const DIVERGE = [
  { label: "Копірайтери", value: -60, delay: 8 },
  { label: "Монтажники, різнороби", value: 53, delay: 22 },
  { label: "Будівельники", value: 33, delay: 36 },
  { label: "Зварювальники", value: 28, delay: 50 },
];
const PX_PER_POINT = 1.9;
const LABEL_W = 230;
const HALF_W = 190;

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
              fontSize: 20,
              fontWeight: 900,
              color: INK,
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
              height: 24,
              background: positive ? DATA_BLUE : DATA_RED,
              borderRadius: positive ? "0 5px 5px 0" : "5px 0 0 5px",
            }}
          />
        );

        return (
          <div
            key={row.label}
            style={{ display: "flex", alignItems: "center", marginBottom: 9 }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 19,
                fontWeight: 700,
                width: LABEL_W,
                textAlign: "right",
                paddingRight: 14,
                boxSizing: "border-box",
                color: INK,
                lineHeight: 1.1,
              }}
            >
              {row.label}
            </div>

            <div
              style={{
                width: HALF_W,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 9,
              }}
            >
              {positive ? null : value}
              {positive ? null : bar}
            </div>

            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(20,20,26,0.3)",
              }}
            />

            <div
              style={{
                width: HALF_W,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 9,
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
