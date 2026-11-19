import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ListCard } from "../bl/Cards";
import { Note, Title, useSnap } from "../bl/ui";
import { INK, MEME, SANS, SERIF, WARM } from "../bl/theme";
import { ChatCard, NotifCard, PostCard, SearchCard } from "./Memes";
import { MemeCard, StatCard } from "./MemeCard";
import captions from "../../cr-captions.json";

const F = 30;
const S = (sec: number) => Math.round(sec * F);

/** Where each carousel slide starts and ends in the source, in seconds. */
export const PARTS = [
  { n: 1, from: 0, to: 56.68, title: "Вакансії, яких не існує", next: "а скільки платять насправді" },
  { n: 2, from: 56.68, to: 104.02, title: "Менеджер над менеджерами", next: "три варіанти, і всі незручні" },
  { n: 3, from: 104.02, to: 152.0, title: "Три варіанти", next: "що роблять найбільші компанії світу" },
  { n: 4, from: 152.0, to: 200.42, title: "Що робить S&P 500", next: "які навички качати, щоб стати CEO" },
  { n: 5, from: 200.42, to: 254.0, title: "Якщо ви хочете стати CEO", next: null },
] as const;

const TOP = 112;

/** Beats are written in absolute source seconds and shifted per slide. */
type Beat = { from: number; to: number; name: string; el: React.ReactNode };

const beats: Beat[] = [
  // ——— part 1
  { from: 2.0, to: 9.6, name: "пошук", el: (
    <SearchCard left={70} top={TOP} width={620} tilt={-1.5}
      query="вакансія CEO"
      hints={["вакансія CEO і COO одночасно", "операційний директор 50 000 грн", "CEO в малий бізнес"]} />
  )},
  { from: 11.8, to: 20.6, name: "this is fine", el: (
    <MemeCard file="this_is_fine.jpg" right={70} topPx={TOP} width={620} height={330} tilt={1.6}
      top="власник бізнесу" bottom="третій рік поспіль" />
  )},
  { from: 23.6, to: 29.8, name: "номінальні", el: (
    <Note left={76} top={190} lines={["вакансія є", "посади — немає"]} />
  )},
  { from: 31.0, to: 38.2, name: "мозок", el: (
    <MemeCard file="expanding_brain.jpg" left={70} topPx={TOP} width={520} height={700} tilt={-1.3}
      marks={[
        { text: "шукаю операційного директора", x: 25, y: 12.5, w: 44, size: 20, dark: true },
        { text: "+ маркетинг", x: 25, y: 37.5, w: 44, size: 22, dark: true },
        { text: "+ продажі", x: 25, y: 62.5, w: 44, size: 22, dark: true },
        { text: "+ бухгалтерія", x: 25, y: 87.5, w: 44, size: 22, dark: true },
      ]} />
  )},
  { from: 39.4, to: 43.4, name: "pawn stars", el: (
    <MemeCard file="pawn_stars.jpg" right={70} topPx={TOP} width={620} height={350} tilt={1.4}
      top="візьму на себе весь бізнес" bottom="best i can do is 50 тисяч" />
  )},
  { from: 44.4, to: 50.2, name: "сповіщення", el: (
    <NotifCard left={70} top={TOP + 20} width={640} tilt={-1.2}
      app="Пошта" title="Велика освітня мережа" body="Запрошуємо вас стати нашим CEO" />
  )},
  { from: 51.4, to: 56.4, name: "harold", el: (
    <MemeCard file="harold.jpg" right={70} topPx={TOP} width={440} height={550} tilt={1.5}
      top="50 тисяч гривень" bottom="flat price, без бонусів" />
  )},

  // ——— part 2
  { from: 57.6, to: 63.5, name: "переписка", el: (
    <ChatCard left={70} top={TOP} width={640} tilt={-1.4}
      msgs={[
        { text: "Шукаємо CEO", delay: 2 },
        { text: "А які обов'язки?", mine: true, delay: 26 },
        { text: "Всі", delay: 58 },
      ]} />
  )},
  { from: 64.6, to: 70.4, name: "пост", el: (
    <PostCard right={70} top={TOP} width={640} tilt={1.3}
      who="Власник" handle="@requirements"
      text="Скопіював вимоги з ChatGPT. Там же best practices." likes="1.2K" />
  )},
  { from: 71.2, to: 80.0, name: "та сама картинка", el: (
    <MemeCard file="same_picture.jpg" left={70} topPx={TOP} width={540} height={620} tilt={-1.5}
      marks={[
        { text: "вакансія CEO", x: 50, y: 6, w: 92, size: 29 },
        { text: "вакансія менеджера", x: 50, y: 39, w: 92, size: 29 },
      ]} />
  )},
  { from: 81.6, to: 84.4, name: "над менеджерами", el: (
    <Title lines={["МЕНЕДЖЕР", "НАД МЕНЕДЖЕРАМИ"]} top={200} />
  )},
  { from: 85.6, to: 90.6, name: "always has been", el: (
    <MemeCard file="always_has_been.jpg" right={70} topPx={TOP} width={640} height={370} tilt={1.4}
      top="справжні CEO коштують $12–15 тисяч?" bottom="always has been" />
  )},
  { from: 91.6, to: 98.0, name: "вони не знають", el: (
    <MemeCard file="they_dont_know.jpg" left={70} topPx={TOP} width={560} height={560} tilt={-1.3}
      top="вони не знають, що такі вакансії" bottom="взагалі не публікують" />
  )},

  // ——— part 3
  { from: 104.4, to: 107.6, name: "три варіанти", el: <Title lines={["ОТЖЕ,", "ТРИ ВАРІАНТИ"]} top={200} /> },
  { from: 108.0, to: 114.0, name: "варіант 1", el: (
    <ListCard left={70} top={TOP + 50} width={620} height={190} tilt={-1.2}
      title="варіант перший" items={[{ text: "Переманити чужого CEO", delay: 4 }]} />
  )},
  { from: 114.6, to: 120.8, name: "trade offer", el: (
    <MemeCard file="trade_offer.jpg" right={70} topPx={TOP} width={480} height={620} tilt={1.5}
      marks={[
        { text: "я отримую вашу компанію", x: 50, y: 46, w: 92, size: 27 },
        { text: "ви отримуєте рахунок на $15 000", x: 50, y: 74, w: 92, size: 27 },
      ]} />
  )},
  { from: 121.4, to: 126.2, name: "варіант 2", el: (
    <ListCard left={70} top={TOP + 50} width={620} height={190} tilt={-1.3}
      title="варіант другий" items={[{ text: "Взяти на виріст", delay: 4 }]} />
  )},
  { from: 127.0, to: 138.4, name: "drake", el: (
    <MemeCard file="drake.jpg" right={70} topPx={TOP} width={560} height={560} tilt={1.4}
      marks={[
        { text: "шукати готового CEO", x: 73, y: 25, w: 46, size: 30, dark: true },
        { text: "виростити свого за рік", x: 73, y: 75, w: 46, size: 30, dark: true },
      ]} />
  )},
  { from: 140.0, to: 150.0, name: "як саме", el: (
    <ListCard left={70} top={TOP + 20} width={620} height={330} tilt={-1.1}
      title="як це виглядає"
      items={[
        { text: "шукаєте по софт-скілах", delay: 4 },
        { text: "вкладаєте рік і навчання", delay: 60 },
        { text: "через рік вас замінюють", delay: 140 },
      ]} />
  )},

  // ——— part 4
  { from: 154.0, to: 159.0, name: "варіант 3", el: (
    <ListCard right={70} top={TOP + 50} width={620} height={190} tilt={1.3}
      title="варіант третій" items={[{ text: "Виростити зсередини", delay: 4 }]} />
  )},
  { from: 161.4, to: 171.0, name: "статистика", el: (
    <StatCard left={120} top={TOP} width={560} tilt={-1.4}
      value="50%" label="керівників компаній зі списку S&P 500 — це внутрішній найм" />
  )},
  { from: 172.6, to: 181.0, name: "roll safe", el: (
    <MemeCard file="roll_safe.jpg" right={70} topPx={TOP} width={640} height={380} tilt={1.4}
      top="не треба платити $15 тисяч за CEO" bottom="якщо виростити його самому" />
  )},
  { from: 183.0, to: 190.0, name: "buff doge", el: (
    <MemeCard file="buff_doge.jpg" left={70} topPx={TOP} width={640} height={500} tilt={-1.3}
      marks={[
        { text: "свій, вирощений за роки", x: 26, y: 91, w: 48, size: 27 },
        { text: "найнятий ззовні", x: 75, y: 91, w: 48, size: 27 },
      ]} />
  )},
  { from: 192.2, to: 199.6, name: "асистенти", el: (
    <ListCard right={70} top={TOP + 30} width={620} height={250} tilt={1.2} accentLast
      title="якщо просто втомились"
      items={[
        { text: "візьміть асистента чи двох", delay: 4 },
        { text: "→ і ростіть із них заміну", delay: 70 },
      ]} />
  )},

  // ——— part 5
  { from: 204.6, to: 209.0, name: "щоб стати", el: <Title lines={["ЩОБ СТАТИ", "CEO АБО COO"]} top={200} /> },
  { from: 209.6, to: 215.8, name: "навички", el: (
    <ListCard left={70} top={TOP + 20} width={620} height={330} tilt={-1.2}
      title="качати треба це"
      items={[
        { text: "стратегічне планування", delay: 4 },
        { text: "робота з метриками", delay: 40 },
        { text: "вміння їх будувати", delay: 80 },
      ]} />
  )},
  { from: 216.6, to: 222.0, name: "change my mind", el: (
    <MemeCard file="change_my_mind.jpg" right={70} topPx={TOP} width={640} height={420} tilt={1.4}
      top="метрика важливіша за відчуття власника" />
  )},
  { from: 222.6, to: 231.4, name: "люди", el: (
    <ListCard left={70} top={TOP + 30} width={620} height={250} tilt={-1.3} accentLast
      title="і це"
      items={[
        { text: "наймати правильних людей", delay: 4 },
        { text: "→ навіть усупереч симпатіям", delay: 80 },
      ]} />
  )},
  { from: 233.4, to: 244.0, name: "декомпозиція", el: (
    <ListCard right={70} top={TOP + 20} width={620} height={330} tilt={1.2}
      title="і головне"
      items={[
        { text: "велика ціль", delay: 4 },
        { text: "→ розкласти на менші", delay: 50 },
        { text: "→ віддати підрозділам", delay: 100 },
      ]} />
  )},
];

/** The slide badge, and the hook that pulls the viewer to the next slide. */
const Badge: React.FC<{ n: number; title: string }> = ({ n, title }) => {
  const { t, o } = useSnap(4, S(3.4));
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 1370,
        opacity: o * t,
        translate: `${(1 - t) * -20}px 0px`,
      }}
    >
      <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 800, letterSpacing: 5, color: WARM,
        textShadow: "0 0 12px rgba(246,241,232,0.95)" }}>
        ЧАСТИНА {n} / 5
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 700, color: INK, marginTop: 6,
        textShadow: "0 0 16px rgba(246,241,232,0.95), 0 0 5px rgba(246,241,232,0.95)" }}>
        {title}
      </div>
    </div>
  );
};

const Teaser: React.FC<{ next: string; at: number }> = ({ next, at }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        width: 960,
        top: 1330,
        background: "rgba(20,18,15,0.9)",
        borderRadius: 20,
        padding: "22px 28px",
        opacity: t,
        translate: `0px ${(1 - t) * 40}px`,
      }}
    >
      <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 800, letterSpacing: 4, color: WARM }}>
        ДАЛІ, У НАСТУПНІЙ ЧАСТИНІ
      </div>
      <div style={{ fontFamily: MEME, fontSize: 48, fontWeight: 700, color: "#FFFFFF", marginTop: 8, lineHeight: 1.14 }}>
        {next}
      </div>
    </div>
  );
};

const Caps: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <>
    {(captions as { text: string; from: number; dur: number }[])
      .filter((c) => c.from >= from - 2 && c.from < to)
      .map((c, i) => (
        <Sequence key={i} from={Math.max(0, c.from - from)} durationInFrames={c.dur} name={c.text.slice(0, 20)}>
          <CapPage text={c.text} />
        </Sequence>
      ))}
  </>
);

const CapPage: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 90, width: 900, top: 1180, textAlign: "center", opacity: o }}>
      <div
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 54,
          lineHeight: 1.26,
          color: "#FFFFFF",
          WebkitTextStroke: "1.2px rgba(20,18,15,0.55)",
          textShadow: "0 0 3px rgba(20,18,15,0.95), 0 3px 10px rgba(20,18,15,0.9), 0 8px 40px rgba(20,18,15,0.65)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const CrPart: React.FC<{ part: number }> = ({ part }) => {
  const p = PARTS[part - 1];
  const fromF = S(p.from);
  const toF = S(p.to);
  const len = toF - fromF;

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <OffthreadVideo src={staticFile("cr-source.mov")} trimBefore={fromF} trimAfter={toF} />

      {beats
        .filter((b) => S(b.from) >= fromF && S(b.from) < toF)
        .map((b) => (
          <Sequence
            key={b.name}
            name={b.name}
            from={S(b.from) - fromF}
            durationInFrames={Math.min(S(b.to), toF) - S(b.from)}
          >
            {b.el}
          </Sequence>
        ))}

      <Caps from={fromF} to={toF} />
      <Badge n={p.n} title={p.title} />
      {p.next ? <Teaser next={p.next} at={len - S(2.6)} /> : null}
    </AbsoluteFill>
  );
};

export const partDuration = (n: number) => S(PARTS[n - 1].to) - S(PARTS[n - 1].from);
