import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  Checklist,
  CjmScheme,
  CounterPlate,
  CrashChart,
  FinalPlate,
  HeadlineMontage,
  QuietShots,
  Timeline,
  TwoCards,
} from "./Overlays";
import { NVIDIA_DURATION } from "./theme";
import { Scrim } from "./ui";

/**
 * Frame numbers come from nvidia-overlays.json, which was built from the
 * word timestamps in nvidia-transcript.json — every beat starts on the word
 * that introduces it, not on a round second.
 *
 * The supplied cut already carries burned-in subtitles, so this composition
 * adds no caption layer of its own.
 */
export const NvidiaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile("nvidia-source.mov")} />

      {/* 0:00 «Що ви знаєте про скандал в NVIDIA» */}
      <Sequence name="1 · Заголовки" from={10} durationInFrames={140}>
        <HeadlineMontage />
      </Sequence>

      {/* 0:10 «На 4 мільярди 800 мільйонів доларів» */}
      <Sequence name="2 · Лічильник" from={318} durationInFrames={105}>
        <CounterPlate />
      </Sequence>

      {/* 0:15 «8 листопада… 12-го… 3-го і 10-го грудня» */}
      <Sequence name="3 · Таймлайн" from={456} durationInFrames={592}>
        <Scrim opacity={0.4} />
        <Timeline />
      </Sequence>

      {/* 0:20 «Акції обвалилися… сотні мільярдів» */}
      <Sequence name="4 · Обвал" from={608} durationInFrames={134}>
        <CrashChart />
      </Sequence>

      {/* 0:38 «Наша увага саме так працює» */}
      <Sequence name="5 · Увага" from={1135} durationInFrames={237}>
        <Scrim opacity={0.45} />
        <TwoCards />
      </Sequence>

      {/* 0:54 «Шлях клієнтів. Customer Journey Map» */}
      <Sequence name="6 · CJM" from={1612} durationInFrames={188}>
        <CjmScheme />
      </Sequence>

      {/* 1:12 «Якої саме поведінки ви хочете» */}
      <Sequence name="7 · Питання" from={2148} durationInFrames={711}>
        <Scrim opacity={0.45} />
        <Checklist />
      </Sequence>

      {/* 1:39 «Бо шлях вашого клієнта існує в будь-якому разі» */}
      <Sequence name="8a · Тихі публікації" from={2960} durationInFrames={135}>
        <QuietShots />
      </Sequence>

      {/* 1:43 фінал */}
      <Sequence name="8b · Фінал" from={3100} durationInFrames={NVIDIA_DURATION - 3100}>
        <FinalPlate />
      </Sequence>
    </AbsoluteFill>
  );
};
