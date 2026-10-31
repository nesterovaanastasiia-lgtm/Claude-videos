import React from "react";
import { Img, staticFile } from "remotion";
import { ACCENT, fontFamily, SERIES_1, TEXT_SECONDARY } from "../theme";
import { Kicker, Panel, Rise, SourceLine } from "./ui";

/** Short label strip, used over the speaker's head. */
export const TopPill: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      fontFamily,
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      color: "#0c0c10",
      background: ACCENT,
      borderRadius: 999,
      padding: "14px 34px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
    }}
  >
    {text}
  </div>
);

/** The prestige ladder of the 2000s, ticked off as she names each one. */
const PRESTIGE = [
  { text: "Фінансист", delay: 0 },
  { text: "Економіст", delay: 24 },
  { text: "Юрист", delay: 48 },
  { text: "Перекладач", delay: 72 },
];

export const PrestigeList: React.FC = () => (
  <Panel>
    <Kicker>Нульові: куди йшли «престижні»</Kicker>
    {PRESTIGE.map((item) => (
      <Rise key={item.text} delay={item.delay} collapse>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ACCENT,
              flexShrink: 0,
            }}
          />
          <div
            style={{ fontFamily, fontSize: 42, fontWeight: 800, color: "white" }}
          >
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
  <Panel accent>
    <div
      style={{
        fontFamily,
        fontSize: 40,
        fontWeight: 800,
        lineHeight: 1.22,
        color: "white",
      }}
    >
      «{quote}»
    </div>
    <div
      style={{
        marginTop: 26,
        paddingTop: 22,
        borderTop: "2px solid rgba(255,255,255,0.16)",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 26,
          fontWeight: 700,
          color: TEXT_SECONDARY,
          lineHeight: 1.25,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 25,
          fontWeight: 800,
          color: ACCENT,
          marginTop: 10,
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
        borderRadius: 18,
        overflow: "hidden",
        background: "white",
        padding: 14,
      }}
    >
      <Img src={staticFile(`shots/${file}`)} style={{ width: "100%", display: "block" }} />
    </div>
    {caption ? (
      <Rise delay={18} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 32,
            fontWeight: 800,
            color: "white",
            marginTop: 22,
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
    <div style={{ display: "flex", gap: 40 }}>
      {[a, b].map((s, i) => (
        <Rise key={s.value} delay={i * 16} style={{ flex: 1 }}>
          <div
            style={{
              fontFamily,
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 0.95,
              color: ACCENT,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              marginTop: 12,
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
  <Panel accent>
    <Kicker>{kicker}</Kicker>
    <div
      style={{
        fontFamily,
        fontSize: 120,
        fontWeight: 900,
        lineHeight: 0.92,
        color: "white",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 32,
        fontWeight: 700,
        color: ACCENT,
        marginTop: 14,
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
      <div style={{ marginBottom: 24 }}>
        <div
          style={{ fontFamily, fontSize: 26, fontWeight: 700, color: TEXT_SECONDARY }}
        >
          Найбільше відгуків на одне оголошення
        </div>
        <div
          style={{ fontFamily, fontSize: 40, fontWeight: 900, color: "#e66767" }}
        >
          реклама, дизайн, PR
        </div>
      </div>
    </Rise>
    <Rise delay={22} collapse>
      <div>
        <div
          style={{ fontFamily, fontSize: 26, fontWeight: 700, color: TEXT_SECONDARY }}
        >
          Найбільше вакансій від роботодавців
        </div>
        <div style={{ fontFamily, fontSize: 40, fontWeight: 900, color: SERIES_1 }}>
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
    <div style={{ display: "flex", gap: 48 }}>
      {[
        { v: "+9%", l: "електрики" },
        { v: "+8%", l: "HVAC" },
      ].map((s, i) => (
        <Rise key={s.v} delay={i * 16} style={{ flex: 1 }}>
          <div
            style={{
              fontFamily,
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              color: SERIES_1,
            }}
          >
            {s.v}
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 800,
              color: "white",
              marginTop: 10,
            }}
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
          fontSize: 28,
          fontWeight: 700,
          color: "white",
          marginTop: 22,
          lineHeight: 1.22,
        }}
      >
        Зростання швидше за середнє по ринку. Тягнуть дата-центри та енергомережі.
      </div>
    </Rise>
    <SourceLine>Bureau of Labor Statistics, Occupational Outlook Handbook</SourceLine>
  </Panel>
);

/** The author's own caveat — kept visually distinct from the data cards. */
export const CaveatCard: React.FC = () => (
  <Panel style={{ background: "rgba(40,28,8,0.92)", borderColor: ACCENT }}>
    <Kicker>Чесно кажучи</Kicker>
    <div
      style={{
        fontFamily,
        fontSize: 34,
        fontWeight: 800,
        color: "white",
        lineHeight: 1.22,
      }}
    >
      Дефіцит робітників в Україні — це не лише ШІ. Передусім мобілізація й міграція.
    </div>
    <Rise delay={30} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 28,
          fontWeight: 700,
          color: ACCENT,
          marginTop: 18,
          lineHeight: 1.22,
        }}
      >
        По частині спеціальностей зарплати ростуть, а вакансій меншає.
      </div>
    </Rise>
  </Panel>
);

/** Closing advice. */
export const AdviceCard: React.FC = () => (
  <Panel accent>
    <div
      style={{
        fontFamily,
        fontSize: 32,
        fontWeight: 800,
        color: TEXT_SECONDARY,
        textDecoration: "line-through",
        textDecorationThickness: 4,
      }}
    >
      класичний IT-фронтенд
    </div>
    <Rise delay={20} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 54,
          fontWeight: 900,
          color: "white",
          marginTop: 16,
          lineHeight: 1.1,
        }}
      >
        інженерні напрямки
      </div>
    </Rise>
  </Panel>
);

const SOURCES = [
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
      <Rise key={s} delay={i * 7} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            marginBottom: 11,
            lineHeight: 1.2,
          }}
        >
          {s}
        </div>
      </Rise>
    ))}
  </Panel>
);
