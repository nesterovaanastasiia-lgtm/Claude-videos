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
      {/* ---------- Footage: only the good takes, in script order ---------- */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Video
          name="Гачок: 100 країн"
          src={SRC}
          from={0}
          durationInFrames={293}
          trimBefore={0}
          style={{
            scale: interpolate(frame, [0, 293], [1, 1.05], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        />
        <Video
          name="Підказка 1: Київ, Європа"
          src={SRC}
          from={293}
          durationInFrames={367}
          trimBefore={375}
          style={{ scale: "1.08" }}
        />
        <Video
          name="Підказки 2-3"
          src={SRC}
          from={660}
          durationInFrames={250}
          trimBefore={788}
          style={{ scale: "1" }}
        />
        <Video
          name="Розкриття: Ajax"
          src={SRC}
          from={910}
          durationInFrames={168}
          trimBefore={1089}
          style={{ scale: "1.06" }}
        />
        <Video
          name="Перша річ: спокій"
          src={SRC}
          from={1078}
          durationInFrames={335}
          trimBefore={1338}
          style={{ scale: "1" }}
        />
        <Video
          name="Нова пошта"
          src={SRC}
          from={1413}
          durationInFrames={118}
          trimBefore={1790}
          style={{ scale: "1.1" }}
        />
        <Video
          name="Друга річ: інсталятор"
          src={SRC}
          from={1531}
          durationInFrames={313}
          trimBefore={2132}
          style={{ scale: "1" }}
        />
        <Video
          name="Вкладались у порадника"
          src={SRC}
          from={1844}
          durationInFrames={471}
          trimBefore={2642}
          style={{ scale: "1.06" }}
        />
        <Video
          name="Довга гра + суміжники"
          src={SRC}
          from={2315}
          durationInFrames={911}
          trimBefore={3152}
          style={{
            scale: interpolate(frame, [2315, 3226], [1, 1.06], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        />
        <Video
          name="Чесне питання + фінал"
          src={SRC}
          from={3226}
          durationInFrames={861}
          trimBefore={4219}
          style={{ scale: "1" }}
        />
      </AbsoluteFill>

      {/* ---------- Graphics ---------- */}
      <Sequence name="100+ країн" from={16} durationInFrames={126}>
        <TopSlot>
          <CountriesStat />
        </TopSlot>
      </Sequence>

      <Sequence name="Не що, а як" from={146} durationInFrames={140}>
        <BottomSlot>
          <Pill
            text={"Не ЩО робить,\nа ЯК заробляє"}
            icon={<MegaphoneIcon size={42} color={ACCENT} />}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Підказки" from={288} durationInFrames={618}>
        <BottomSlot>
          <ClueList />
        </BottomSlot>
      </Sequence>

      <Sequence name="Розкриття" from={914} durationInFrames={162}>
        <Scrim />
        <MidSlot>
          <RevealCard />
        </MidSlot>
      </Sequence>

      <Sequence name="Дві речі" from={1086} durationInFrames={96}>
        <BottomSlot>
          <ChapterBadge number="2" title={"речі, які варто\nзабрати собі"} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Розділ 1" from={1185} durationInFrames={78}>
        <TopSlot>
          <ChapterBadge number="1" title={"Продають\nне залізо"} />
        </TopSlot>
      </Sequence>

      <Sequence name="Сигналізація vs спокій" from={1213} durationInFrames={198}>
        <BottomSlot>
          <VersusCard
            kicker="Перша річ"
            bad="сигналізацію"
            good="СПОКІЙ"
            note="Пристрій — це залізо. Спокій — це те, за що насправді платять."
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Нова пошта" from={1423} durationInFrames={106}>
        <BottomSlot>
          <Pill
            text={"Той самий механізм,\nщо й у Нової пошти"}
            icon={<BoxIcon size={42} color={ACCENT} />}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Розділ 2" from={1535} durationInFrames={57}>
        <TopSlot>
          <ChapterBadge number="2" title={"Суто\nопераційна"} />
        </TopSlot>
      </Sequence>

      <Sequence name="Ланцюг рішення" from={1594} durationInFrames={246}>
        <BottomSlot>
          <FlowChain subDelay={180} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Куди вкладались" from={1851} durationInFrames={190}>
        <BottomSlot>
          <BarCompare />
        </BottomSlot>
      </Sequence>

      <Sequence name="Інструменти для партнерів" from={2045} durationInFrames={100}>
        <BottomSlot>
          <ChipRow
            items={["навчання", "сертифікація", "зручні інструменти", "підтримка"]}
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Зручно пораднику" from={2149} durationInFrames={162}>
        <BottomSlot>
          <Pill text={"Зручно не покупцю,\nа ПОРАДНИКУ"} />
        </BottomSlot>
      </Sequence>

      <Sequence name="Довга гра" from={2320} durationInFrames={296}>
        <BottomSlot>
          <GrowthCurve />
        </BottomSlot>
      </Sequence>

      <Sequence name="Хто радить" from={2629} durationInFrames={158}>
        <BottomSlot>
          <QuestionCard
            title="Хто радить твоїй клієнтці?"
            sub="До кого вона йде по пораду?"
          />
        </BottomSlot>
      </Sequence>

      <Sequence name="Суміжники" from={2795} durationInFrames={270}>
        <BottomSlot>
          <PairList />
        </BottomSlot>
      </Sequence>

      <Sequence name="Завдання" from={3066} durationInFrames={160}>
        <BottomSlot>
          <TaskCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Чесне питання" from={3237} durationInFrames={88}>
        <TopSlot>
          <Pill
            text="Одне чесне питання"
            icon={<ClockIcon size={38} color={ACCENT} />}
          />
        </TopSlot>
      </Sequence>

      <Sequence name="Що ти зробила" from={3329} durationInFrames={94}>
        <BottomSlot>
          <QuestionCard title="Що ти зробила, щоб їм було зручно радити тебе?" />
        </BottomSlot>
      </Sequence>

      <Sequence name="Чекліст" from={3424} durationInFrames={240}>
        <BottomSlot>
          <ChecklistCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Фінал" from={3669} durationInFrames={230}>
        <BottomSlot>
          <PunchCard />
        </BottomSlot>
      </Sequence>

      <Sequence name="Тизер" from={3903} durationInFrames={184}>
        <BottomSlot>
          <TeaserCard />
        </BottomSlot>
      </Sequence>

      {/* ---------- Captions on top of everything ---------- */}
      <Captions />
      <ProgressBar total={4087} />
    </AbsoluteFill>
  );
};
