import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  BustPlate,
  FinalBeat,
  GreekWords,
  MessageCards,
  PhotoStrip,
  RembrandtBeat,
  Rubric,
  ScanQuote,
  ThreeLines,
  TooMuchTooLittle,
  Vignette,
} from "./Overlays";
import { AR_DURATION, OLIVE, SRC_LEFT, SRC_W } from "./ui";

/**
 * The source is a 1080x1350 container with a 9:16 picture inside it and black
 * pillars baked in (cropdetect: 760x1350 at x=160). Those pillars are padding,
 * not footage, so they are scaled out: the picture as shot fills 1080x1920
 * exactly, with nothing cropped and nothing stretched.
 *
 * Her burned-in subtitles sit around y=1520..1700, and every overlay below is
 * laid out inside the safe zone (y 96..1470) so none of them lands on the text.
 *
 * Frame numbers come from ar-overlays.json, built from the word timestamps
 * in ar-transcript.json.
 */
export const AristotleReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: OLIVE }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: SRC_LEFT,
            top: 0,
            width: SRC_W,
            height: 1920,
          }}
        >
          <OffthreadVideo
            src={staticFile("ar-source.mov")}
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
          />
        </div>
      </AbsoluteFill>

      {/* 0:00 «як старанно вона це приховує» */}
      <Sequence name="1 · Смуга з фото" from={12} durationInFrames={90}>
        <PhotoStrip />
      </Sequence>

      {/* 0:03 «Аристотель про це казав» */}
      <Sequence name="2 · Рембрандт" from={104} durationInFrames={124}>
        <RembrandtBeat durationInFrames={124} />
      </Sequence>

      {/* 0:19 «хвилинка філософії» */}
      <Sequence name="3 · Заставка рубрики" from={572} durationInFrames={86}>
        <Rubric />
      </Sequence>

      {/* 0:26 «Та я просто подалася…» */}
      <Sequence name="4 · Картки-повідомлення" from={782} durationInFrames={256}>
        <MessageCards />
      </Sequence>

      {/* 0:46 «малодушністю, буквально з грецької» */}
      <Sequence name="5 · Грецькі слова" from={1378} durationInFrames={128}>
        <GreekWords />
      </Sequence>

      {/* 0:53 «частіше за марнославство» */}
      <Sequence name="6 · Бюст" from={1578} durationInFrames={189}>
        <BustPlate />
      </Sequence>

      {/* 1:11 «такі люди не беруться навіть за добрі і гідні справи» */}
      <Sequence name="7 · Цитата на скані" from={2136} durationInFrames={198}>
        <ScanQuote />
      </Sequence>

      {/* 1:22 «перестаєш братися. Не просиш. Не подаєшся.» */}
      <Sequence name="8 · Три рядки" from={2466} durationInFrames={201}>
        <ThreeLines />
      </Sequence>

      {/* 1:29 особистий блок — обличчя відкрите */}
      <Sequence name="9 · Віньєтка" from={2676} durationInFrames={176}>
        <Vignette />
      </Sequence>

      {/* 1:35 «боїмося бути забагато / ми є значно замало» */}
      <Sequence name="10 · Забагато / замало" from={2852} durationInFrames={202}>
        <TooMuchTooLittle />
      </Sequence>

      {/* 1:49 «Я цього хочу. Не колись, а зараз.» */}
      <Sequence name="11 · Ніке + фінал" from={3279} durationInFrames={AR_DURATION - 3279}>
        <FinalBeat />
      </Sequence>
    </AbsoluteFill>
  );
};
