import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";
import {
  BeanIcon,
  BroomIcon,
  BulbIcon,
  CalcIcon,
  CardIcon,
  ClockIcon,
  CupIcon,
  DropIcon,
  ExitIcon,
  FuelIcon,
  GlassIcon,
  HandIcon,
  HeartIcon,
  KeyIcon,
  MilkIcon,
  PeopleIcon,
  ScissorsIcon,
  TagIcon,
  TaxIcon,
  WrenchIcon,
} from "./Icons";
import {
  AMBER,
  COFFEE,
  CREAM,
  DATA_BLUE,
  DATA_RED,
  GREEN,
  Highlight,
  Pill,
  EASE,
  HAIRLINE,
  INK,
  INK_SOFT,
  Kicker,
  Money,
  MONEY_IN,
  Note,
  Panel,
  Rise,
} from "./ui";

/** Fifty cups filling in — the hook, and the break-even number later on. */
export const CupGrid: React.FC<{
  title: string;
  sub: string;
  accent?: string;
}> = ({ title, sub, accent = AMBER }) => {
  const frame = useCurrentFrame();
  const shown = Math.round(
    interpolate(frame, [6, 54], [0, 50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    }),
  );

  return (
    <Panel accent={accent}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} style={{ opacity: i < shown ? 1 : 0.16 }}>
            <CupIcon size={26} color={i < shown ? accent : INK_SOFT} sw={1.9} />
          </div>
        ))}
      </div>
      <div style={{ fontFamily, fontSize: 38, fontWeight: 900, color: INK, lineHeight: 1.1 }}>
        <Highlight color={accent}>{title}</Highlight>
      </div>
      <div
        style={{ fontFamily, fontSize: 21, fontWeight: 700, color: INK_SOFT, marginTop: 10 }}
      >
        {sub}
      </div>
    </Panel>
  );
};

/** A single hero figure. */
export const BigMoney: React.FC<{
  kicker: string;
  value: string;
  label: string;
  color?: string;
  note?: string;
}> = ({ kicker, value, label, color = AMBER, note }) => (
  <Panel accent={color}>
    <Kicker>{kicker}</Kicker>
    <Pill bg={color} size={64}>
      {value} ₴
    </Pill>
    <div
      style={{
        fontFamily,
        fontSize: 23,
        fontWeight: 800,
        color: INK,
        marginTop: 10,
        lineHeight: 1.2,
      }}
    >
      {label}
    </div>
    {note ? <Note>{note}</Note> : null}
  </Panel>
);

const VARIABLE = [
  { label: "зерно", icon: BeanIcon, delay: 0 },
  { label: "молоко", icon: MilkIcon, delay: 14 },
  { label: "вода", icon: DropIcon, delay: 26 },
  { label: "стакан", icon: GlassIcon, delay: 38 },
  { label: "еквайринг", icon: CardIcon, delay: 52 },
];

/** What actually leaves the till when one cup is sold. */
export const CupBreakdown: React.FC = () => (
  <Panel accent={DATA_RED}>
    <Kicker>Що з'їдає одна продана чашка</Kicker>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
      {VARIABLE.map((v) => {
        const Icon = v.icon;
        return (
          <Rise key={v.label} delay={v.delay} collapse>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(237,161,0,0.22)",
                borderRadius: 999,
                padding: "8px 16px",
              }}
            >
              <Icon size={22} color={COFFEE} />
              <span style={{ fontFamily, fontSize: 20, fontWeight: 800, color: INK }}>
                {v.label}
              </span>
            </div>
          </Rise>
        );
      })}
    </div>
    <Rise delay={168} collapse>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Pill bg={DATA_RED} size={52}>
          24 ₴
        </Pill>
        <span style={{ fontFamily, fontSize: 22, fontWeight: 700, color: INK_SOFT }}>
          зі 100 ₴
        </span>
      </div>
    </Rise>
  </Panel>
);

/** 100 − 24 = 76, with the warning that 76 is not profit. */
export const MarginRow: React.FC = () => {
  const frame = useCurrentFrame();

  const Cell: React.FC<{ v: string; l: string; c: string; delay: number }> = ({
    v,
    l,
    c,
    delay,
  }) => (
    <Rise delay={delay} style={{ textAlign: "center" }}>
      <Pill bg={c} size={42}>
        {v} ₴
      </Pill>
      <div
        style={{ fontFamily, fontSize: 17, fontWeight: 700, color: INK_SOFT, marginTop: 4 }}
      >
        {l}
      </div>
    </Rise>
  );

  const op = (sym: string) => (
    <div style={{ fontFamily, fontSize: 36, fontWeight: 900, color: INK_SOFT, paddingTop: 6 }}>
      {sym}
    </div>
  );

  return (
    <Panel accent={DATA_BLUE}>
      <Kicker>Одна чашка</Kicker>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Cell v="100" l="ціна" c={MONEY_IN} delay={0} />
        {op("−")}
        <Cell v="24" l="собівартість" c={DATA_RED} delay={12} />
        {op("=")}
        <Cell v="76" l="лишається" c={AMBER} delay={28} />
      </div>
      <Rise delay={72} collapse>
        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: `1px solid ${HAIRLINE}`,
            fontFamily,
            fontSize: 22,
            fontWeight: 800,
            color: DATA_RED,
            opacity: interpolate(frame, [72, 82], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Це ще не прибуток
        </div>
      </Rise>
    </Panel>
  );
};

const FIXED = [
  { label: "Оренда 10–15 м²", value: "40–45 тис.", icon: KeyIcon, delay: 6 },
  { label: "Зарплати", value: "", icon: PeopleIcon, delay: 157 },
  { label: "Податки", value: "", icon: TaxIcon, delay: 187 },
  { label: "Світло", value: "", icon: BulbIcon, delay: 214 },
  { label: "Вода", value: "", icon: DropIcon, delay: 235 },
  { label: "Обслуговування кавомашин", value: "", icon: WrenchIcon, delay: 250 },
  { label: "Бухгалтерія", value: "", icon: CalcIcon, delay: 292 },
  { label: "Прибирання", value: "", icon: BroomIcon, delay: 310 },
];

/** Everything that costs the same whether anyone walks in or not. */
export const FixedCosts: React.FC = () => (
  <Panel accent={DATA_RED}>
    <Kicker>Платиться щодня, навіть без клієнтів</Kicker>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
      {FIXED.map((f) => {
        const Icon = f.icon;
        return (
          <Rise key={f.label} delay={f.delay} collapse>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(227,73,72,0.12)",
                border: "1px solid rgba(227,73,72,0.3)",
                borderRadius: 14,
                padding: "9px 14px",
              }}
            >
              <Icon size={21} color={INK} />
              <span style={{ fontFamily, fontSize: 19, fontWeight: 700, color: INK }}>
                {f.label}
              </span>
              {f.value ? (
                <span
                  style={{ fontFamily, fontSize: 19, fontWeight: 900, color: DATA_RED }}
                >
                  {f.value} ₴
                </span>
              ) : null}
            </div>
          </Rise>
        );
      })}
    </div>
  </Panel>
);

/** The break-even equation — the centrepiece. */
export const BreakEven: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Panel accent={AMBER}>
      <Kicker>Скільки треба продати, щоб вийти в нуль</Kicker>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
      >
        <Rise delay={20} style={{ textAlign: "center" }}>
          <Money value="120 000" size={44} color={DATA_RED} />
          <div style={{ fontFamily, fontSize: 16, fontWeight: 700, color: INK_SOFT }}>
            на місяць
          </div>
        </Rise>
        <div style={{ fontFamily, fontSize: 34, fontWeight: 900, color: INK_SOFT }}>÷</div>
        <Rise delay={50} style={{ textAlign: "center" }}>
          <Money value="76" size={44} color={INK} />
          <div style={{ fontFamily, fontSize: 16, fontWeight: 700, color: INK_SOFT }}>
            з чашки
          </div>
        </Rise>
      </div>

      <Rise delay={115} collapse>
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: `1px solid ${HAIRLINE}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily, fontSize: 42, fontWeight: 900, color: INK }}>
            <Highlight color={GREEN}>≈ 1 500 чашок / місяць</Highlight>
          </div>
        </div>
      </Rise>

      <Rise delay={280} collapse>
        <div
          style={{
            marginTop: 12,
            textAlign: "center",
            fontFamily,
            fontSize: 54,
            fontWeight: 900,
            color: INK,
            scale: interpolate(frame, [280, 294], [0.82, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
              output: "perceptual-scale",
            }),
          }}
        >
          <Pill bg={AMBER} size={54}>
            50 чашок на день
          </Pill>
        </div>
      </Rise>
    </Panel>
  );
};

const RISKS = [
  { label: "Сірі години, порожні вечори", icon: ClockIcon, delay: 0 },
  { label: "Генератор і пальне", icon: FuelIcon, delay: 146 },
  { label: "Звільнення день у день", icon: ExitIcon, delay: 242 },
  { label: "Пошук нової людини", icon: PeopleIcon, delay: 383 },
  { label: "Молоко +8 ₴ за пачку за ніч", icon: MilkIcon, delay: 443 },
  { label: "Акції та сезонні пропозиції", icon: TagIcon, delay: 554 },
];

/** Everything that can go wrong on top of the arithmetic. */
export const RiskList: React.FC = () => (
  <Panel accent={DATA_RED}>
    <Kicker>І це ще без сюрпризів</Kicker>
    {RISKS.map((r) => {
      const Icon = r.icon;
      return (
        <Rise key={r.label} delay={r.delay} collapse>
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}
          >
            <Icon size={23} color={DATA_RED} />
            <span style={{ fontFamily, fontSize: 21, fontWeight: 700, color: INK }}>
              {r.label}
            </span>
          </div>
        </Rise>
      );
    })}
  </Panel>
);

/** The same arithmetic applies to any small offline business. */
const TRADES = [
  { label: "кав'ярня", icon: CupIcon },
  { label: "масаж", icon: HandIcon },
  { label: "салон краси", icon: HeartIcon },
  { label: "манікюр", icon: ScissorsIcon },
];

export const SameLogic: React.FC = () => (
  <Panel accent={DATA_BLUE}>
    <Kicker>Логіка та сама</Kicker>
    <div style={{ display: "flex", gap: 10 }}>
      {TRADES.map((t, i) => {
        const Icon = t.icon;
        return (
          <Rise key={t.label} delay={i * 12} style={{ flex: 1 }}>
            <div
              style={{
                background: "rgba(42,120,214,0.13)",
                borderRadius: 18,
                padding: "16px 8px",
                textAlign: "center",
              }}
            >
              <Icon size={34} color={DATA_BLUE} />
              <div
                style={{
                  fontFamily,
                  fontSize: 17,
                  fontWeight: 800,
                  color: INK,
                  marginTop: 8,
                  lineHeight: 1.15,
                }}
              >
                {t.label}
              </div>
            </div>
          </Rise>
        );
      })}
    </div>
  </Panel>
);

/** The comment she quotes, struck through. */
export const MythCard: React.FC = () => (
  <Panel accent={DATA_RED}>
    <div
      style={{
        fontFamily,
        fontSize: 32,
        fontWeight: 800,
        color: INK_SOFT,
        textDecoration: "line-through",
        textDecorationThickness: 3,
        lineHeight: 1.2,
      }}
    >
      «Та там зерна на 20 гривень»
    </div>
    <Rise delay={22} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 24,
          fontWeight: 800,
          color: INK,
          marginTop: 14,
          lineHeight: 1.22,
        }}
      >
        За кожною чашкою — оренда, зарплати, податки, світло і людина, яка відкрила о 7:00.
      </div>
    </Rise>
  </Panel>
);

/** A quiet pull-quote for the emotional turn. */
export const QuoteCard: React.FC<{
  text: string;
  sub?: string;
  accent?: string;
}> = ({ text, sub, accent = DATA_BLUE }) => (
  <Panel accent={accent} style={{ background: CREAM }}>
    <div
      style={{ fontFamily, fontSize: 34, fontWeight: 800, color: INK, lineHeight: 1.22 }}
    >
      {text}
    </div>
    {sub ? (
      <Rise delay={20} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 21,
            fontWeight: 700,
            color: INK_SOFT,
            marginTop: 12,
            lineHeight: 1.22,
          }}
        >
          {sub}
        </div>
      </Rise>
    ) : null}
  </Panel>
);

/** Her own disclaimer, shown where she says it. */
export const AssumptionCard: React.FC = () => (
  <Panel accent={AMBER} style={{ background: "rgba(255,248,232,0.95)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <CalcIcon size={34} color={COFFEE} />
      <div style={{ fontFamily, fontSize: 26, fontWeight: 800, color: INK, lineHeight: 1.2 }}>
        Цифри умовні — це модель, не звіт конкретної кав'ярні
      </div>
    </div>
  </Panel>
);

/** Reassurance before the closing call. */
export const YouAreNotAloneCard: React.FC = () => (
  <Panel accent={GREEN}>
    <div style={{ fontFamily, fontSize: 40, fontWeight: 900, color: INK, lineHeight: 1.12 }}>
      <Highlight color={GREEN}>Ви не одні.</Highlight>
    </div>
    <Rise delay={16} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 24,
          fontWeight: 700,
          color: INK,
          marginTop: 10,
          lineHeight: 1.25,
        }}
      >
        Ви непогано рахуєте. Просто модель такого бізнесу складна, і кожна дрібниця важить
        забагато.
      </div>
    </Rise>
  </Panel>
);

/** Closing call to action. */
export const ClosingCard: React.FC = () => (
  <Panel accent={AMBER} style={{ background: "rgba(255,248,232,0.96)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <CupIcon size={46} color={COFFEE} sw={1.6} />
      <div style={{ fontFamily, fontSize: 32, fontWeight: 900, color: INK, lineHeight: 1.15 }}>
        Пийте каву не вдома
      </div>
    </div>
    <Rise delay={18} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 22,
          fontWeight: 700,
          color: INK_SOFT,
          marginTop: 12,
          lineHeight: 1.25,
        }}
      >
        Хоча б раз на якийсь час — і поважайте малий бізнес, який зараз виживає.
      </div>
    </Rise>
  </Panel>
);
