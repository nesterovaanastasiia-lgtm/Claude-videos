import { Video } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  AssumptionCard,
  BigMoney,
  BreakEven,
  ClosingCard,
  CupBreakdown,
  CupGrid,
  FixedCosts,
  MarginRow,
  MythCard,
  QuoteCard,
  RiskList,
  SameLogic,
  YouAreNotAloneCard,
} from "./Cards";
import { COFFEE, DATA_RED, MONEY_IN } from "./ui";

export const COFFEE_DURATION = 6987;
const SRC = staticFile("coffee-source.mp4");

/**
 * Her head starts around y=530 in this cut and the burned-in subtitles run
 * from about y=1490, so graphics live above her head or in the narrow band
 * just above the subtitles. Alternating between the two keeps a long video
 * moving.
 */
const TopSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 66 }}
  >
    {children}
  </AbsoluteFill>
);

const LowSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 470 }}
  >
    {children}
  </AbsoluteFill>
);

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start" }}>
      <div style={{ height: 7, width: "100%", background: "rgba(0,0,0,0.22)" }}>
        <div
          style={{
            height: "100%",
            background: COFFEE,
            width: `${(frame / COFFEE_DURATION) * 100}%`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const CoffeeReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Video name="Вихідний рілс" src={SRC} />

      {/* 0:00 перші 50 чашок — задарма */}
      <Sequence name="50 чашок" from={20} durationInFrames={470}>
        <TopSlot>
          <CupGrid title="Перші 50 чашок за день" sub="не приносять нічого" />
        </TopSlot>
      </Sequence>

      {/* 0:17 кейс і юніт-економіка */}
      <Sequence name="Юніт-економіка" from={520} durationInFrames={360}>
        <TopSlot>
          <QuoteCard
            text="Юніт-економіка маленької кав'ярні"
            sub="Порахувала за один день. Справжні цифри озадачили."
          />
        </TopSlot>
      </Sequence>

      {/* 0:30 цифри умовні */}
      <Sequence name="Цифри умовні" from={905} durationInFrames={135}>
        <LowSlot>
          <AssumptionCard />
        </LowSlot>
      </Sequence>

      {/* 0:35 той самий розрахунок для будь-якого офлайн-бізнесу */}
      <Sequence name="Логіка та сама" from={1050} durationInFrames={370}>
        <TopSlot>
          <SameLogic />
        </TopSlot>
      </Sequence>

      {/* 0:49 ціна чашки */}
      <Sequence name="100 гривень" from={1478} durationInFrames={110}>
        <TopSlot>
          <BigMoney
            kicker="Чашка кави з молоком"
            value="100"
            label="середня ціна в кав'ярні"
            color={MONEY_IN}
          />
        </TopSlot>
      </Sequence>

      {/* 0:53 що з'їдає одна чашка */}
      <Sequence name="Собівартість чашки" from={1588} durationInFrames={226}>
        <TopSlot>
          <CupBreakdown />
        </TopSlot>
      </Sequence>

      {/* 1:03 закуплено наперед */}
      <Sequence name="Закуплено наперед" from={1850} durationInFrames={500}>
        <LowSlot>
          <QuoteCard
            text="Зерно, молоко і стакани купують наперед"
            sub="Не продали — псується в холодильнику."
          />
        </LowSlot>
      </Sequence>

      {/* 1:19 100 − 24 = 76 */}
      <Sequence name="Лишається 76" from={2380} durationInFrames={390}>
        <TopSlot>
          <MarginRow />
        </TopSlot>
      </Sequence>

      {/* 1:33 з цих 76 платиться все інше */}
      <Sequence name="З цих 76" from={2800} durationInFrames={170}>
        <TopSlot>
          <QuoteCard text="Із цих 76 ₴ треба заплатити все, що коштує однаково щодня" />
        </TopSlot>
      </Sequence>

      {/* 1:39 постійні витрати */}
      <Sequence name="Постійні витрати" from={2990} durationInFrames={345}>
        <TopSlot>
          <FixedCosts />
        </TopSlot>
      </Sequence>

      {/* 1:52 разом 120 тисяч */}
      <Sequence name="120 тисяч" from={3355} durationInFrames={140}>
        <LowSlot>
          <BigMoney
            kicker="Разом постійних витрат"
            value="120 000"
            label="на місяць"
            color={DATA_RED}
          />
        </LowSlot>
      </Sequence>

      {/* 1:56 точка беззбитковості */}
      <Sequence name="Точка нуля" from={3510} durationInFrames={340}>
        <TopSlot>
          <BreakEven />
        </TopSlot>
      </Sequence>

      {/* 2:08 50 чашок на день — це ще треба постаратись */}
      <Sequence name="50 на день" from={3862} durationInFrames={200}>
        <TopSlot>
          <CupGrid title="50 чашок на день" sub="це ще треба постаратись" />
        </TopSlot>
      </Sequence>

      {/* 2:15 ризики понад арифметику */}
      <Sequence name="Ризики" from={4072} durationInFrames={845}>
        <TopSlot>
          <RiskList />
        </TopSlot>
      </Sequence>

      {/* 2:44 «та там зерна на 20 гривень» */}
      <Sequence name="Міф" from={4925} durationInFrames={162}>
        <TopSlot>
          <MythCard />
        </TopSlot>
      </Sequence>

      {/* 2:50 за кожною чашкою — людина */}
      <Sequence name="За кожною чашкою" from={5100} durationInFrames={380}>
        <TopSlot>
          <QuoteCard
            text="За кожною чашкою — людина"
            sub="Відкрила о 7:00. Пам'ятає, хто яку каву любить. Закриває зміну, коли всі вже вдома."
          />
        </TopSlot>
      </Sequence>

      {/* 3:03 ми платимо не за каву */}
      <Sequence name="Платимо не за каву" from={5500} durationInFrames={310}>
        <TopSlot>
          <QuoteCard
            text="Ми платимо не за каву"
            sub="А за те, що хтось узяв на себе всю цю систему."
          />
        </TopSlot>
      </Sequence>

      {/* 3:20 біль наприкінці місяця */}
      <Sequence name="Біль власника" from={6010} durationInFrames={310}>
        <TopSlot>
          <QuoteCard
            text="«Собівартість же 24 ₴»"
            sub="А наприкінці місяця не ясно, чи вистачить на всі витрати."
          />
        </TopSlot>
      </Sequence>

      {/* 3:31 ви не одні */}
      <Sequence name="Ви не одні" from={6332} durationInFrames={280}>
        <TopSlot>
          <YouAreNotAloneCard />
        </TopSlot>
      </Sequence>

      {/* 3:41 заклик */}
      <Sequence name="Фінал" from={6640} durationInFrames={347}>
        <TopSlot>
          <ClosingCard />
        </TopSlot>
      </Sequence>

      <ProgressBar />
    </AbsoluteFill>
  );
};
