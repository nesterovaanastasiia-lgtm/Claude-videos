import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  ACCENT,
  fontFamily,
  NEGATIVE,
  POSITIVE,
  TEXT_SECONDARY,
} from "../theme";
import { EASE_OUT, Kicker, Panel, Rise } from "../ui/Card";
import {
  ArrowRightIcon,
  BirdIcon,
  BuildingIcon,
  ChatIcon,
  CheckIcon,
  CrossIcon,
  GlobeIcon,
  HeartIcon,
  PersonIcon,
  ShieldIcon,
  TagIcon,
  WrenchIcon,
} from "../ui/Icons";

/** Hook stat: the number she says out loud, counted up. */
export const CountriesStat: React.FC = () => {
  const frame = useCurrentFrame();
  const value = Math.round(
    interpolate(frame, [6, 79], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    }),
  );

  return (
    <Panel accent style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <GlobeIcon size={62} color={ACCENT} strokeWidth={1.8} />
      <div>
        <div
          style={{
            fontFamily,
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1,
            color: "white",
          }}
        >
          {value}+
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: ACCENT,
            marginTop: 6,
          }}
        >
          країн світу
        </div>
      </div>
    </Panel>
  );
};

/** One-line emphasis pill. */
export const Pill: React.FC<{
  text: string;
  icon?: React.ReactNode;
  accent?: boolean;
}> = ({ text, icon, accent = true }) => (
  <Panel
    accent={accent}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "22px 28px",
    }}
  >
    {icon}
    <div
      style={{
        fontFamily,
        fontSize: 32,
        fontWeight: 800,
        lineHeight: 1.2,
        color: "white",
        whiteSpace: "pre-line",
      }}
    >
      {text}
    </div>
  </Panel>
);

const CLUES = [
  { text: "Народилась у Києві", icon: <BuildingIcon size={34} color={ACCENT} />, delay: 9 },
  { text: "Одна з найбільших у Європі", icon: <TagIcon size={34} color={ACCENT} />, delay: 185 },
  { text: "Ставить не той, хто купує", icon: <WrenchIcon size={34} color={ACCENT} />, delay: 376 },
  { text: "Платить не лише покупець", icon: <HeartIcon size={34} color={ACCENT} />, delay: 502 },
];

/** Clue list that builds up across the guessing section. */
export const ClueList: React.FC = () => (
  <Panel style={{ width: 600 }}>
    <Kicker>Вгадай компанію</Kicker>
    {CLUES.map((clue) => (
      <Rise key={clue.text} delay={clue.delay} collapse>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 14,
          }}
        >
          {clue.icon}
          <div
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            {clue.text}
          </div>
        </div>
      </Rise>
    ))}
  </Panel>
);

/** The reveal beat. */
export const RevealCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Panel
      accent
      style={{
        width: 620,
        textAlign: "center",
        padding: "38px 30px",
        scale: interpolate(frame, [0, 16], [0.86, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <ShieldIcon size={72} color={ACCENT} strokeWidth={1.7} />
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: -1,
          color: "white",
          lineHeight: 1.03,
        }}
      >
        AJAX SYSTEMS
      </div>
      <Rise delay={16} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 27,
            fontWeight: 700,
            color: ACCENT,
            marginTop: 12,
            letterSpacing: 0.6,
          }}
        >
          українські системи безпеки
        </div>
      </Rise>
    </Panel>
  );
};

/** Numbered chapter marker. */
export const ChapterBadge: React.FC<{ number: string; title: string }> = ({
  number,
  title,
}) => {
  const frame = useCurrentFrame();

  return (
    <Panel
      accent
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "22px 30px",
        scale: interpolate(frame, [0, 14], [0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 76,
          fontWeight: 900,
          lineHeight: 0.9,
          color: ACCENT,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 33,
          fontWeight: 800,
          lineHeight: 1.15,
          color: "white",
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </div>
    </Panel>
  );
};

/** "not this → but that" comparison. */
export const VersusCard: React.FC<{
  kicker: string;
  bad: string;
  good: string;
  note?: string;
}> = ({ kicker, bad, good, note }) => (
  <Panel style={{ width: 616 }}>
    <Kicker>{kicker}</Kicker>

    <Rise delay={6} collapse>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
        <CrossIcon size={38} color={NEGATIVE} />
        <div
          style={{
            fontFamily,
            fontSize: 38,
            fontWeight: 800,
            color: TEXT_SECONDARY,
            textDecoration: "line-through",
            textDecorationThickness: 3,
          }}
        >
          {bad}
        </div>
      </div>
    </Rise>

    <Rise delay={22} collapse>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <CheckIcon size={38} color={POSITIVE} />
        <div
          style={{ fontFamily, fontSize: 46, fontWeight: 900, color: "white" }}
        >
          {good}
        </div>
      </div>
    </Rise>

    {note ? (
      <Rise delay={40} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 600,
            color: TEXT_SECONDARY,
            marginTop: 16,
            lineHeight: 1.3,
          }}
        >
          {note}
        </div>
      </Rise>
    ) : null}
  </Panel>
);

const Node: React.FC<{
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}> = ({ icon, label, highlight = false }) => (
  <div
    style={{
      flex: 1,
      textAlign: "center",
      padding: "14px 6px",
      borderRadius: 18,
      border: `2px solid ${highlight ? ACCENT : "rgba(255,255,255,0.16)"}`,
      background: highlight ? "rgba(255,201,61,0.12)" : "transparent",
    }}
  >
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
      {icon}
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 21,
        fontWeight: 800,
        color: highlight ? ACCENT : "white",
        lineHeight: 1.15,
      }}
    >
      {label}
    </div>
  </div>
);

const Arrow: React.FC = () => (
  <div style={{ padding: "0 6px", display: "flex", alignItems: "center" }}>
    <ArrowRightIcon size={26} color="rgba(255,255,255,0.5)" />
  </div>
);

/** Компанія → інсталятор → клієнт. */
export const FlowChain: React.FC<{ subDelay?: number }> = ({ subDelay = 26 }) => (
  <Panel style={{ width: 616 }}>
    <Kicker>Хто насправді обирає бренд</Kicker>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Node icon={<BuildingIcon size={36} color="white" />} label="Компанія" />
      <Arrow />
      <Rise delay={10}>
        <Node
          icon={<WrenchIcon size={36} color={ACCENT} />}
          label={"Інсталятор\nмонтажник"}
          highlight
        />
      </Rise>
      <Arrow />
      <Node icon={<PersonIcon size={36} color="white" />} label="Клієнт" />
    </div>
    <Rise delay={subDelay} collapse>
      <div
        style={{
          fontFamily,
          fontSize: 27,
          fontWeight: 800,
          color: "white",
          marginTop: 18,
          lineHeight: 1.22,
        }}
      >
        Саме він радить, який бренд поставити
      </div>
    </Rise>
  </Panel>
);

/** Small chips for the list of what the brand invested in. */
export const ChipRow: React.FC<{ items: string[] }> = ({ items }) => (
  <Panel style={{ width: 616 }}>
    <Kicker>Вкладались у порадника</Kicker>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {items.map((item, i) => (
        <Rise key={item} delay={i * 9}>
          <div
            style={{
              fontFamily,
              fontSize: 27,
              fontWeight: 700,
              color: "#101014",
              background: ACCENT,
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            {item}
          </div>
        </Rise>
      ))}
    </div>
  </Panel>
);

/** Big question addressed to the viewer. */
export const QuestionCard: React.FC<{ title: string; sub?: string }> = ({
  title,
  sub,
}) => (
  <Panel accent style={{ width: 616 }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
      <ChatIcon size={46} color={ACCENT} strokeWidth={1.9} />
      <div>
        <div
          style={{
            fontFamily,
            fontSize: 42,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.14,
          }}
        >
          {title}
        </div>
        {sub ? (
          <Rise delay={14} collapse>
            <div
              style={{
                fontFamily,
                fontSize: 26,
                fontWeight: 600,
                color: TEXT_SECONDARY,
                marginTop: 10,
                lineHeight: 1.25,
              }}
            >
              {sub}
            </div>
          </Rise>
        ) : null}
      </div>
    </div>
  </Panel>
);

const PAIRS = [
  { from: "Майстриня манікюру", to: "косметологиня", delay: 2 },
  { from: "Фотографка", to: "візажистка, декораторка", delay: 84 },
  { from: "Педіатр", to: "логопед, масажист", delay: 152 },
  { from: "Бухгалтерка", to: "юристка", delay: 227 },
];

/** Who recommends whom — the everyday examples she lists. */
export const PairList: React.FC = () => (
  <Panel style={{ width: 636 }}>
    <Kicker>Суміжники, а не конкуренти</Kicker>
    {PAIRS.map((pair) => (
      <Rise key={pair.from} delay={pair.delay} collapse>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 12,
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{ fontFamily, fontSize: 24, fontWeight: 800, color: "white" }}
          >
            {pair.from}
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingTop: 4 }}>
            <ArrowRightIcon size={24} color={ACCENT} />
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 24,
              fontWeight: 600,
              color: TEXT_SECONDARY,
            }}
          >
            {pair.to}
          </div>
        </div>
      </Rise>
    ))}
  </Panel>
);

/** Five empty slots to fill in — the homework. */
export const TaskCard: React.FC = () => (
  <Panel accent style={{ width: 616 }}>
    <Kicker>Завдання</Kicker>
    <div
      style={{
        fontFamily,
        fontSize: 38,
        fontWeight: 900,
        color: "white",
        marginBottom: 18,
        lineHeight: 1.14,
      }}
    >
      Випиши 5 таких людей у своєму місті
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      {[1, 2, 3, 4, 5].map((n, i) => (
        <Rise key={n} delay={10 + i * 8}>
          <div
            style={{
              width: 96,
              height: 66,
              borderRadius: 14,
              border: "2px dashed rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 30,
              fontWeight: 900,
              color: ACCENT,
            }}
          >
            {n}
          </div>
        </Rise>
      ))}
    </div>
  </Panel>
);

const CHECKS = [
  { text: "Готовий текст, який можна переслати", delay: 3 },
  { text: "Твій прайс під рукою", delay: 69 },
  { text: "Гарантія, що за тебе не соромно", delay: 117 },
];

/** Checklist of what makes you easy to recommend. */
export const ChecklistCard: React.FC = () => (
  <Panel style={{ width: 616 }}>
    <Kicker>Щоб тебе було зручно радити</Kicker>
    {CHECKS.map((check) => (
      <Rise key={check.text} delay={check.delay} collapse>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: POSITIVE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckIcon size={26} color="white" />
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 29,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.18,
            }}
          >
            {check.text}
          </div>
        </div>
      </Rise>
    ))}
  </Panel>
);

/** The closing line, as a hero number. */
export const PunchCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Panel accent style={{ width: 616 }}>
      <Kicker>Найдешевший канал продажів</Kicker>

      <Rise delay={4} collapse>
        <div
          style={{
            fontFamily,
            fontSize: 34,
            fontWeight: 800,
            color: TEXT_SECONDARY,
            textDecoration: "line-through",
            textDecorationThickness: 3,
            marginBottom: 12,
          }}
        >
          реклама
        </div>
      </Rise>

      <Rise delay={78} collapse>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontFamily,
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 0.9,
              color: ACCENT,
              scale: interpolate(frame, [78, 92], [0.7, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              }),
            }}
          >
            10
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 32,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.16,
            }}
          >
            людей, яким зручно{"\n"}вимовити твоє ім'я
          </div>
        </div>
      </Rise>
    </Panel>
  );
};

/** Next-episode teaser. */
export const TeaserCard: React.FC = () => (
  <Panel style={{ width: 616 }}>
    <Kicker>Далі в цій рубриці</Kicker>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <BirdIcon size={58} color={POSITIVE} strokeWidth={1.7} />
      <div
        style={{
          fontFamily,
          fontSize: 31,
          fontWeight: 800,
          color: "white",
          lineHeight: 1.18,
        }}
      >
        Компанія, яка змусила мільйони боятися зеленої пташки
      </div>
    </div>
  </Panel>
);
