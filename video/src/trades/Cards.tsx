import React from "react";
import { Img, staticFile } from "remotion";
import { fontFamily } from "../theme";
import {
  DATA_BLUE,
  DATA_RED,
  HAIRLINE,
  INK,
  INK_SOFT,
  Kicker,
  Panel,
  Rise,
  SourceLine,
} from "./ui";

/** Short label strip, used over the speaker's head. */
export const TopPill: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      fontFamily,
      fontSize: 21,
      fontWeight: 800,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      color: INK,
      background: "rgba(255,255,255,0.90)",
      backdropFilter: "blur(16px)",
      borderRadius: 999,
      padding: "10px 24px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    }}
  >
    {text}
  </div>
);

const PRESTIGE = [
  { text: "Фінансист", delay: 0 },
  { text: "Економіст", delay: 24 },
  { text: "Юрист", delay: 48 },
  { text: "Перекладач", delay: 72 },
];

export const PrestigeList: React.FC = () => (
  <Panel>
    <Kicker>Двохтисячні · напрямки, які вважалися престижними</Kicker>
    {PRESTIGE.map((item) => (
      <Rise key={item.text} delay={item.delay} collapse>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 9,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: DATA_BLUE,
              flexShrink: 0,
            }}
          />
          <div style={{ fontFamily, fontSize: 29, fontWeight: 800, color: INK }}>
            {item.text}
          </div>
        </div>
      </Rise>
    ))}
  </Panel>
);

/** A pull-quote from a named article. Used where no screenshot is possible. */
export const QuoteCard: React.FC<{
  quote: string;
  headline: string;
  outlet: string;
  domain: string;
}> = ({ quote, headline, outlet, domain }) => (
  <Panel>
    <div
      style={{
        fontFamily,
        fontSize: 29,
        fontWeight: 800,
        lineHeight: 1.22,
        color: INK,
      }}
    >
      «{quote}»
    </div>
    <div
      style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${HAIRLINE}` }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 18,
          fontWeight: 700,
          color: INK_SOFT,
          lineHeight: 1.25,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 17,
          fontWeight: 800,
          color: DATA_BLUE,
          marginTop: 7,
        }}
      >
        {outlet} · {domain}
      </div>
    </div>
  </Panel>
);

/** A real headline, cropped from the published page. */
export const ShotCard: React.FC<{
  file: string;
  caption?: string;
  domain: string;
}> = ({ file, caption, domain }) => (
  <Panel>
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${HAIRLINE}`,
        background: "white",
      }}
    >
      <Img
        src={staticFile(`shots/${file}`)}
        style={{ width: "100%", display: "block" }}
      />
    </div>
    {caption ? (
      <Rise delay={18} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 23,
            fontWeight: 800,
            color: INK,
            marginTop: 14,
            lineHeight: 1.2,
          }}
        >
          {caption}
        </div>
      </Rise>
    ) : null}
    <SourceLine>{domain}</SourceLine>
  </Panel>
);

/** Two headline figures side by side. */
export const StatPair: React.FC<{
  kicker: string;
  a: { value: string; label: string };
  b: { value: string; label: string };
  source: string;
}> = ({ kicker, a, b, source }) => (
  <Panel>
    <Kicker>{kicker}</Kicker>
    <div style={{ display: "flex", gap: 28 }}>
      {[a, b].map((s, i) => (
        <Rise key={s.value} delay={i * 16} style={{ flex: 1 }}>
          <div
            style={{
              fontFamily,
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 0.95,
              color: DATA_BLUE,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 19,
              fontWeight: 700,
              color: INK,
              marginTop: 8,
              lineHeight: 1.18,
            }}
          >
            {s.label}
          </div>
        </Rise>
      ))}
    </div>
    <SourceLine>{source}</SourceLine>
  </Panel>
);

/** One very large number with a caption. */
export const BigStat: React.FC<{
  kicker: string;
  value: string;
  label: string;
  source: string;
}> = ({ kicker, value, label, source }) => (
  <Panel>
    <Kicker>{kicker}</Kicker>
    <div
      style={{
        fontFamily,
        fontSize: 76,
        fontWeight: 900,
        lineHeight: 0.95,
        color: INK,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 21,
        fontWeight: 700,
        color: INK_SOFT,
        marginTop: 10,
        lineHeight: 1.2,
      }}
    >
      {label}
    </div>
    <SourceLine>{source}</SourceLine>
  </Panel>
);

/** Who applies vs where the jobs actually are. */
export const MismatchCard: React.FC = () => (
  <Panel>
    <Kicker>Липень 2026</Kicker>
    <Rise delay={0} collapse>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily, fontSize: 18, fontWeight: 700, color: INK_SOFT }}>
          Найбільше відгуків на одне оголошення
        </div>
        <div style={{ fontFamily, fontSize: 28, fontWeight: 900, color: DATA_RED }}>
          реклама, дизайн, PR
        </div>
      </div>
    </Rise>
    <Rise delay={22} collapse>
      <div>
        <div style={{ fontFamily, fontSize: 18, fontWeight: 700, color: INK_SOFT }}>
          Найбільше вакансій від роботодавців
        </div>
        <div style={{ fontFamily, fontSize: 28, fontWeight: 900, color: DATA_BLUE }}>
          виробництво, робітничі
        </div>
      </div>
    </Rise>
    <SourceLine>thepage.ua</SourceLine>
  </Panel>
);

/** BLS outlook for the two trades she names. */
export const BlsCard: React.FC = () => (
  <Panel>
    <Kicker>Прогноз BLS, 2024–2034</Kicker>
    <div style={{ display: "flex", gap: 34 }}>
      {[
        { v: "+9%", l: "електрики" },
        { v: "+8%", l: "HVAC" },
      ].map((s, i) => (
        <Rise key={s.v} delay={i * 16} style={{ flex: 1 }}>
          <div
            style={{
              fontFamily,
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 0.95,
              color: DATA_BLUE,
            }}
          >
            {s.v}
          </div>
          <div
            style={{ fontFamily, fontSize: 21, fontWeight: 800, color: INK, marginTop: 6 }}
          >
            {s.l}
          </div>
        </Rise>
      ))}
    </div>
    <Rise delay={36} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: 700,
          color: INK,
          marginTop: 14,
          lineHeight: 1.22,
        }}
      >
        Швидше за середнє по ринку. Тягнуть дата-центри та енергомережі.
      </div>
    </Rise>
    <SourceLine>Bureau of Labor Statistics, Occupational Outlook Handbook</SourceLine>
  </Panel>
);

/** The author's own caveat — a tinted card so it reads as a remark, not data. */
export const CaveatCard: React.FC = () => (
  <Panel style={{ background: "rgba(255,249,235,0.93)" }}>
    <Kicker>Чесно кажучи</Kicker>
    <div
      style={{ fontFamily, fontSize: 25, fontWeight: 800, color: INK, lineHeight: 1.22 }}
    >
      Дефіцит робітників в Україні — це не лише ШІ. Передусім мобілізація й міграція.
    </div>
    <Rise delay={30} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: 700,
          color: INK_SOFT,
          marginTop: 12,
          lineHeight: 1.22,
        }}
      >
        По частині спеціальностей зарплати ростуть, а вакансій меншає.
      </div>
    </Rise>
  </Panel>
);

/**
 * Two labour markets inside one, from the author's own benchmark.
 * The company names on her slide are internal, so only the roles appear.
 */
export const RatioCard: React.FC = () => {
  const Side: React.FC<{
    role: string;
    value: string;
    note: string;
    color: string;
    delay: number;
  }> = ({ role, value, note, color, delay }) => (
    <Rise delay={delay} style={{ flex: 1 }}>
      <div
        style={{
          fontFamily,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: INK_SOFT,
        }}
      >
        {role}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 58,
          fontWeight: 900,
          lineHeight: 1,
          color,
          marginTop: 4,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 17,
          fontWeight: 700,
          color: INK,
          marginTop: 8,
          lineHeight: 1.25,
          whiteSpace: "pre-line",
        }}
      >
        {note}
      </div>
    </Rise>
  );

  return (
    <Panel>
      <Kicker>Вересень 2026 · відгуків на одну вакансію</Kicker>
      <div style={{ display: "flex", gap: 26 }}>
        <Side
          role="embedded"
          value="6,0"
          note={"За рік не піднімалось вище 6.\n146 вакансій у вересні."}
          color={DATA_BLUE}
          delay={0}
        />
        <div style={{ width: 1, background: HAIRLINE }} />
        <Side
          role="frontend"
          value="274,6"
          note={"Конкуренція втричі зросла.\nВакансій: 306 → 91."}
          color={DATA_RED}
          delay={18}
        />
      </div>
      <SourceLine>Власне дослідження ринку</SourceLine>
    </Panel>
  );
};

/** Closing advice. */
export const AdviceCard: React.FC = () => (
  <Panel>
    <div
      style={{
        fontFamily,
        fontSize: 24,
        fontWeight: 800,
        color: INK_SOFT,
        textDecoration: "line-through",
        textDecorationThickness: 3,
      }}
    >
      класичний IT-фронтенд
    </div>
    <Rise delay={20} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 40,
          fontWeight: 900,
          color: INK,
          marginTop: 10,
          lineHeight: 1.1,
        }}
      >
        інженерні напрямки
      </div>
    </Rise>
  </Panel>
);

const SOURCES = [
  "Власне дослідження ринку праці",
  "OLX Робота · thepage.ua",
  "Мінекономіки · epravda.com.ua",
  "Work.ua / МОП · dengi.ua",
  "«Синдром чистих штанів» · thepage.ua",
  "Mike Rowe · foxnews.com",
  "Resume Builder, NY Post · Substack, tradesmenup",
  "Occupational Outlook Handbook · bls.gov",
];

export const SourcesCard: React.FC = () => (
  <Panel>
    <Kicker>Джерела</Kicker>
    {SOURCES.map((s, i) => (
      <Rise key={s} delay={i * 5} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 19,
            fontWeight: 700,
            color: INK,
            marginBottom: 7,
            lineHeight: 1.2,
          }}
        >
          {s}
        </div>
      </Rise>
    ))}
  </Panel>
);
