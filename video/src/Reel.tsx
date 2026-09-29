import { Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Captions } from "./Captions";
import {
  ChapterBadge,
  ChecklistCard,
  ChipRow,
  ClueList,
  CountriesStat,
  FlowChain,
  PairList,
  Pill,
  PunchCard,
  QuestionCard,
  RevealCard,
  TaskCard,
  TeaserCard,
  VersusCard,
} from "./overlays/Cards";
import { BarCompare, GrowthCurve } from "./overlays/Charts";
import { ACCENT } from "./theme";
import { BoxIcon, ClockIcon, MegaphoneIcon } from "./ui/Icons";

const SRC = staticFile("source.mp4");

/** Graphics sit over the sweater, clear of the caption band. */
const BottomSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 262,
    }}
  >
    {children}
  </AbsoluteFill>
);

const TopSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 64 }}
  >
    {children}
  </AbsoluteFill>
);

/** Centred horizontally but dropped below the eyeline, so her face stays visible. */
const MidSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", paddingTop: 340 }}
  >
    {children}
  </AbsoluteFill>
);

/** Darkens the footage so a full-screen beat can take over. */
const Scrim: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity: interpolate(frame, [0, 10], [0, 0.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    />
  );
};

const ProgressBar: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start" }}>
      <div style={{ height: 6, width: "100%", background: "rgba(0,0,0,0.35)" }}>
        <div
          style={{
            height: "100%",
            background: ACCENT,
            width: `${(frame / total) * 100}%`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Reel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* ---------- Footage, with the flubbed takes cut out ---------- */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Video
          name="Гачок + загадка"
          src={SRC}
          from={0}
          durationInFrames={744}
          trimBefore={0}
          style={{
            scale: interpolate(frame, [0, 744], [1, 1.05], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        />
        <Video
          name="Підказки 3-4"
          src={SRC}
          from={744}
          durationInFrames={248}
          trimBefore={789}
          style={{ scale: "1.09" }}
        />
        <Video
          name="Реванч: Ajax"
          src={SRC}
          from={992}
          durationInFrames={172}
          trimBefore={1088}
          style={{ scale: "1" }}
        />
        <Video
          name="Річ перша: спокій"
          src={SRC}
          from={1164}
          durationInFrames={327}
          trimBefore={1347}
          style={{ scale: "1.06" }}
        />
        <Video
          name="Нова пошта"
          src={SRC}
          from={1491}
          durationInFrames={108}
          trimBefore={1796}
          style={{ scale: "1.11" }}
        />
        <Video
          name="Річ друга: інсталятор"
          src={SRC}
          from={1599}
          durationInFrames={313}
          trimBefore={2132}
          style={{ scale: "1" }}
        />
        <Video
          name="Партнери + суміжники"
          src={SRC}
          from={1912}
          durationInFrames={1415}
          trimBefore={2649}
          style={{
            scale: interpolate(frame, [1912, 3327], [1.06, 1.11], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        />
        <Video
          name="Фінал + тизер"
          src={SRC}
          from={3327}
          durationInFrames={856}
          trimBefore={4226}
          style={{ scale: "1" }}
        />
      </AbsoluteFill>

      {/* ---------- Graphics ---------- */}
      <Sequence name="100+ країн" from={18} durationInFrames={130}>
        <TopSlot>
          <CountriesStat />
        </TopSlot>
      </Sequence>

      <Sequence name="Не що, а як" from={150} durationInFrames={140}>
        <BottomSlot>
          <Pill
            text={"Не ЩО робить,\nа ЯК заробляє"}
            icon={<MegaphoneIcon size={42} color={ACCENT} />}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Підказки" from={370} durationInFrames={620}>
        <BottomSlot>
          <ClueList />
        </BottomSlot>
      </Sequence>

      <Sequence name="Реванч" from={996} durationInFrames={165}>
        <Scrim />
        <MidSlot>
          <RevealCard />
        </MidSlot>
      </Sequence>

      <Sequence name="Дві речі" from={1166} durationInFrames={92}>
        <BottomSlot>
          <ChapterBadge number="2" title={"речі, які варто\nзабрати собі"} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Розділ 1" from={1262} durationInFrames={78}>
        <TopSlot>
          <ChapterBadge number="1" title={"Продають\nне залізо"} />
        </TopSlot>
      </Sequence>

      <Sequence name="Сигналізація vs спокій" from={1288} durationInFrames={198}>
        <BottomSlot>
          <VersusCard
            kicker="Перша річ"
            bad="сигналізацію"
            good="СПОКІЙ"
            note="Пристрій — це залізо. Спокій — це те, за що насправді платять."
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Нова пошта" from={1495} durationInFrames={100}>
        <BottomSlot>
          <Pill
            text={"Той самий механізм,\nщо й у Нової пошти"}
            icon={<BoxIcon size={42} color={ACCENT} />}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Розділ 2" from={1603} durationInFrames={57}>
        <TopSlot>
          <ChapterBadge number="2" title={"Суто\nопераційна"} />
        </TopSlot>
      </Sequence>

      <Sequence name="Ланцюг рішення" from={1662} durationInFrames={246}>
        <BottomSlot>
          <FlowChain subDelay={180} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Куди вкладались" from={1916} durationInFrames={190}>
        <BottomSlot>
          <BarCompare />
        </BottomSlot>
      </Sequence>

      <Sequence name="Інструменти для партнерів" from={2108} durationInFrames={105}>
        <BottomSlot>
          <ChipRow
            items={["навчання", "сертифікація", "зручні інструменти", "підтримка"]}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Зручно пораднику" from={2216} durationInFrames={170}>
        <BottomSlot>
          <Pill text={"Зручно не покупцю,\nа ПОРАДНИКУ"} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Довга гра" from={2420} durationInFrames={300}>
        <BottomSlot>
          <GrowthCurve />
        </BottomSlot>
      </Sequence>

      <Sequence name="Хто радить" from={2733} durationInFrames={155}>
        <BottomSlot>
          <QuestionCard
            title="Хто радить твоїй клієнтці?"
            sub="До кого вона йде по пораду?"
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Суміжники" from={2895} durationInFrames={270}>
        <BottomSlot>
          <PairList />
        </BottomSlot>
      </Sequence>

      <Sequence name="Завдання" from={3168} durationInFrames={155}>
        <BottomSlot>
          <TaskCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Чесне питання" from={3333} durationInFrames={85}>
        <TopSlot>
          <Pill
            text="Одне чесне питання"
            icon={<ClockIcon size={38} color={ACCENT} />}
          />
        </TopSlot>
      </Sequence>

      <Sequence name="Що ти зробила" from={3420} durationInFrames={95}>
        <BottomSlot>
          <QuestionCard title="Що ти зробила, щоб їм було зручно радити тебе?" />
        </BottomSlot>
      </Sequence>

      <Sequence name="Чекліст" from={3518} durationInFrames={240}>
        <BottomSlot>
          <ChecklistCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Фінал" from={3763} durationInFrames={230}>
        <BottomSlot>
          <PunchCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Тизер" from={3997} durationInFrames={186}>
        <BottomSlot>
          <TeaserCard />
        </BottomSlot>
      </Sequence>

      {/* ---------- Captions on top of everything ---------- */}
      <Captions />
      <ProgressBar total={4183} />
    </AbsoluteFill>
  );
};
