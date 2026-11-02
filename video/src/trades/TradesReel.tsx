import { Video } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  AdviceCard,
  BigStat,
  BlsCard,
  CaveatCard,
  MismatchCard,
  PrestigeList,
  QuoteCard,
  RatioCard,
  ShotCard,
  SourcesCard,
  StatPair,
  TopPill,
} from "./Cards";
import { CopywriterDrop, DivergenceChart, SalaryBars } from "./Charts";

export const TRADES_DURATION = 4057;
const SRC = staticFile("trades-source.mov");

/**
 * The supplied cut has subtitles burned in across roughly 78–85% of frame
 * height, so every graphic sits above that band.
 */
const GraphicSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 480 }}
  >
    {children}
  </AbsoluteFill>
);

const TopSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 96 }}
  >
    {children}
  </AbsoluteFill>
);

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start" }}>
      <div style={{ height: 8, width: "100%", background: "rgba(0,0,0,0.3)" }}>
        <div
          style={{
            height: "100%",
            background: "#eb6834",
            width: `${(frame / TRADES_DURATION) * 100}%`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const TradesReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Video name="Вихідний рілс" src={SRC} />

      {/* 0:00 "нас всіх жорстко обдурили" */}
      <Sequence name="Тема" from={14} durationInFrames={92}>
        <TopSlot>
          <TopPill text="Ринок праці 2026" />
        </TopSlot>
      </Sequence>

      {/* 0:09 "на фінансистів, економістів, юристів і перекладачів" */}
      <Sequence name="Престиж нульових" from={272} durationInFrames={132}>
        <GraphicSlot>
          <PrestigeList />
        </GraphicSlot>
      </Sequence>

      {/* 0:14 "кого не брали — йшли на зварювальників" */}
      <Sequence name="Синдром чистих штанів" from={424} durationInFrames={180}>
        <GraphicSlot>
          <QuoteCard
            quote="Нікуди не взяли — піду в зварювальники"
            headline="Як «синдром чистих штанів» позбавляє Україну будівельників"
            outlet="The Page"
            domain="thepage.ua"
          />
        </GraphicSlot>
      </Sequence>

      {/* 0:23 "медіанна зарплата найвища серед робітничих" */}
      <Sequence name="Зарплати OLX" from={690} durationInFrames={255}>
        <GraphicSlot>
          <SalaryBars />
        </GraphicSlot>
      </Sequence>

      {/* 0:28 "найнижча зарплата у копірайтери, піарники, СММники" */}
      <Sequence name="Копірайтери 125 → 50" from={960} durationInFrames={155}>
        <GraphicSlot>
          <CopywriterDrop />
        </GraphicSlot>
      </Sequence>

      {/* 0:42 "як з'явився штучний інтелект" */}
      <Sequence name="МОП: кожен четвертий" from={1283} durationInFrames={118}>
        <GraphicSlot>
          <BigStat
            kicker="Оцінка МОП"
            value="1 з 4"
            label="працівників — у сфері, де мовні моделі вже виконують частину щоденних завдань"
            source="Міжнародна організація праці · dengi.ua"
          />
        </GraphicSlot>
      </Sequence>

      {/* 0:45 "я не бачу, щоб ми на це реагували" */}
      <Sequence name="Розбіжність ринку" from={1420} durationInFrames={300}>
        <GraphicSlot>
          <DivergenceChart />
        </GraphicSlot>
      </Sequence>

      {/* 1:16 "конкурси шалені все одно лишаються" */}
      <Sequence name="Відгуки vs вакансії" from={2260} durationInFrames={165}>
        <GraphicSlot>
          <MismatchCard />
        </GraphicSlot>
      </Sequence>

      {/* 1:21 "в Штатах це вже є" */}
      <Sequence name="Майк Роу" from={2440} durationInFrames={215}>
        <GraphicSlot>
          <ShotCard
            file="mike_rowe.png"
            caption="«Сантехніків, електриків і монтажників труб не віддадуть на аутсорс»"
            domain="foxnews.com, квітень 2024"
          />
        </GraphicSlot>
      </Sequence>

      {/* 1:35 "те, що вимагається від джуніора, легко закриває AI" */}
      <Sequence name="Зумери в трейдах" from={2680} durationInFrames={295}>
        <GraphicSlot>
          <StatPair
            kicker="Покоління з професією в руках"
            a={{ value: "42%", label: "зумерів уже йдуть у робітничі професії" }}
            b={{ value: "80%", label: "із них називають причиною захист від ШІ" }}
            source="NY Post · Resume Builder, листопад 2025"
          />
        </GraphicSlot>
      </Sequence>

      {/* 1:40 "рук, які будують дата-центри, шалено не вистачає" */}
      <Sequence name="Прогноз BLS" from={3020} durationInFrames={185}>
        <GraphicSlot>
          <BlsCard />
        </GraphicSlot>
      </Sequence>

      {/* 1:47 "електриків не вистачає в Україні" */}
      <Sequence name="Дефіцит в Україні" from={3222} durationInFrames={120}>
        <GraphicSlot>
          <BigStat
            kicker="Прогноз Мінекономіки на 2026"
            value="606,8 тис."
            label="фахівців і робітників бракуватиме. На відновлення країни потрібно 4,5 млн працівників"
            source="Мінекономіки · epravda.com.ua"
          />
        </GraphicSlot>
      </Sequence>

      <Sequence name="Застереження" from={3348} durationInFrames={185}>
        <GraphicSlot>
          <CaveatCard />
        </GraphicSlot>
      </Sequence>

      {/* 1:58 "не в класичний IT-фронтенд, а в інженерні напрямки" */}
      <Sequence name="Порада" from={3560} durationInFrames={140}>
        <GraphicSlot>
          <AdviceCard />
        </GraphicSlot>
      </Sequence>

      {/* 2:04 два ринки всередині одного */}
      <Sequence name="Фронтенд vs embedded" from={3706} durationInFrames={225}>
        <GraphicSlot>
          <RatioCard />
        </GraphicSlot>
      </Sequence>

      {/* 2:05 фінал */}
      <Sequence name="Джерела" from={3940} durationInFrames={117}>
        <GraphicSlot>
          <SourcesCard />
        </GraphicSlot>
      </Sequence>

      <ProgressBar />
    </AbsoluteFill>
  );
};
