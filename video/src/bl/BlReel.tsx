import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { Captions } from "./Captions";
import { ListCard, PeriodicCard, ResumeCard } from "./Cards";
import { Card, CardImg, Note, Title } from "./ui";
import { INK } from "./theme";

export const BL_DURATION = 5400; // 3:00 at 30 fps

const S = (sec: number) => Math.round(sec * 30);

/** Cards sit in the top band, clear of her face and of the subtitle line. */
const TOP = 118;
const CARD_W = 620;
const CARD_H = 430;

type Beat = { from: number; to: number; el: React.ReactNode; name: string };

const beats: Beat[] = [
  {
    name: "1 · Школа",
    from: S(0.3),
    to: S(8.3),
    el: (
      <Card left={70} top={TOP} width={CARD_W} height={CARD_H} tilt={-1.6} caption="ВІНСЛОУ ГОМЕР, 1871">
        <CardImg file="art_school.jpg" seconds={9} />
      </Card>
    ),
  },
  {
    name: "2 · Таблиця",
    from: S(8.4),
    to: S(11.3),
    el: <PeriodicCard right={70} top={TOP} width={CARD_W} height={CARD_H} tilt={1.4} />,
  },
  {
    name: "3 · Заголовок",
    from: S(11.5),
    to: S(14.2),
    el: <Title lines={["ПІДТЯГУВАТИ ТРЕБА ТЕ,", "ЩО НЕ ВИХОДИТЬ"]} top={190} />,
  },
  {
    name: "4 · Сізіф",
    from: S(14.5),
    to: S(18.2),
    el: (
      <Card right={70} top={TOP} width={540} height={CARD_H} tilt={1.8} caption="ТІЦІАН, «СІЗІФ»">
        <CardImg file="art_sisyphus.jpg" seconds={6} />
      </Card>
    ),
  },
  {
    name: "5 · Нотатка",
    from: S(19.5),
    to: S(28.0),
    el: (
      <Note
        left={76}
        top={200}
        lines={["латати слабке → втома", "підсилювати сильне → енергія"]}
      />
    ),
  },
  {
    name: "6 · Gallup",
    from: S(29.0),
    to: S(39.5),
    el: (
      <ListCard
        left={70}
        top={TOP + 40}
        width={CARD_W}
        height={300}
        tilt={-1.2}
        title="тест, про який вона каже"
        items={[
          { text: "CliftonStrengths", delay: 6 },
          { text: "Gallup · 34 теми", delay: 22 },
        ]}
      />
    ),
  },
  {
    name: "7 · Резюме",
    from: S(39.9),
    to: S(46.8),
    el: <ResumeCard right={70} top={TOP} width={560} height={CARD_H} tilt={1.5} />,
  },
  {
    name: "8 · Нотатка рекрутера",
    from: S(47.4),
    to: S(52.0),
    el: <Note left={76} top={210} lines={["резюме → сильні сторони", "рекрутер бачить, куди тебе ставити"]} />,
  },
  {
    name: "9 · Три теми",
    from: S(52.4),
    to: S(57.2),
    el: (
      <ListCard
        left={70}
        top={TOP + 30}
        width={CARD_W}
        height={330}
        tilt={-1.4}
        title="наприклад"
        items={[
          { text: "Learner", delay: 3 },
          { text: "Strategic", delay: 20 },
          { text: "Empathy", delay: 40 },
        ]}
      />
    ),
  },
  {
    name: "10 · Меланхолія",
    from: S(57.6),
    to: S(66.9),
    el: (
      <Card right={70} top={TOP} width={CARD_W} height={400} tilt={1.6} caption="ЕДВАРД МУНК, «МЕЛАНХОЛІЯ»">
        <CardImg file="art_melancholy.jpg" seconds={10} />
      </Card>
    ),
  },
  {
    name: "11 · Три варіанти",
    from: S(68.3),
    to: S(69.1),
    el: <Title lines={["У ТЕБЕ Є", "ТРИ ВАРІАНТИ"]} top={200} />,
  },
  {
    name: "12 · Варіант 1",
    from: S(69.3),
    to: S(79.0),
    el: (
      <ListCard
        left={70}
        top={TOP + 60}
        width={CARD_W}
        height={190}
        tilt={-1.3}
        title="варіант перший"
        items={[{ text: "Іти у своє", delay: 4 }]}
      />
    ),
  },
  {
    name: "13 · Варіант 2",
    from: S(79.4),
    to: S(87.2),
    el: (
      <ListCard
        right={70}
        top={TOP + 60}
        width={CARD_W}
        height={190}
        tilt={1.3}
        title="варіант другий"
        items={[{ text: "Міняти сферу", delay: 4 }]}
      />
    ),
  },
  {
    name: "14 · Варіант 3",
    from: S(87.6),
    to: S(107.2),
    el: (
      <ListCard
        left={70}
        top={TOP + 30}
        width={CARD_W}
        height={270}
        tilt={-1.1}
        accentLast
        title="варіант третій"
        items={[
          { text: "Нічого не змінити", delay: 4 },
          { text: "→ фрустрація", delay: S(103.4 - 87.6) },
        ]}
      />
    ),
  },
  {
    name: "15 · Четвертий",
    from: S(107.6),
    to: S(112.8),
    el: <Title lines={["Я ПРОПОНУЮ", "ЧЕТВЕРТИЙ"]} top={200} />,
  },
  {
    name: "16 · Астроном",
    from: S(113.3),
    to: S(126.6),
    el: (
      <Card left={70} top={TOP} width={560} height={CARD_H} tilt={-1.7} caption="ЯН ВЕРМЕЄР, «АСТРОНОМ»">
        <CardImg file="art_astronomer.jpg" seconds={14} />
      </Card>
    ),
  },
  {
    name: "17 · Задоволення",
    from: S(127.2),
    to: S(139.8),
    el: (
      <ListCard
        right={70}
        top={TOP + 20}
        width={CARD_W}
        height={340}
        tilt={1.2}
        title="що ти отримуєш"
        items={[
          { text: "фінансове", delay: 6 },
          { text: "моральне", delay: 26 },
          { text: "або і те, і те", delay: 46 },
        ]}
      />
    ),
  },
  {
    name: "18 · Безкоштовно",
    from: S(140.6),
    to: S(147.5),
    el: (
      <Note
        left={76}
        top={210}
        lines={["не виходить за гроші —", "пробуй безкоштовно"]}
      />
    ),
  },
  {
    name: "19 · Урок",
    from: S(148.0),
    to: S(158.8),
    el: (
      <Card right={70} top={TOP} width={CARD_W} height={400} tilt={1.5} caption="РЕМБРАНДТ, «УРОК АНАТОМІЇ»">
        <CardImg file="art_lesson.jpg" seconds={12} />
      </Card>
    ),
  },
  {
    name: "20 · Сіяч",
    from: S(161.0),
    to: S(172.5),
    el: (
      <Card left={70} top={TOP} width={CARD_W} height={410} tilt={-1.5} caption="ВАН ГОГ, «СІЯЧ»">
        <CardImg file="art_sower.jpg" seconds={13} />
      </Card>
    ),
  },
  {
    name: "21 · Фінал",
    from: S(173.6),
    to: S(180.0),
    el: <Title lines={["НЕМАТЕРІАЛЬНА РЕАЛІЗАЦІЯ", "ДАЄ ЗАРОБИТИ БІЛЬШЕ"]} top={190} />,
  },
];

export const BlReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: INK }}>
    <OffthreadVideo src={staticFile("bl-source.mov")} />

    {beats.map((b) => (
      <Sequence key={b.name} name={b.name} from={b.from} durationInFrames={b.to - b.from}>
        {b.el}
      </Sequence>
    ))}

    <Captions />
  </AbsoluteFill>
);
