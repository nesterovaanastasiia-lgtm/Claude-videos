import React, { useCallback, useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { CREAM, GOLD, SANS } from "./theme";

type Token = { text: string; fromMs: number; toMs: number };
type Page = { startMs: number; endMs: number; tokens: Token[] };

/**
 * Frame ranges where a full-screen graphic owns the frame. Captions step
 * aside there rather than sitting on top of a plate that already carries
 * its own words.
 */
const MUTED: [number, number][] = [
  [10, 150], // 1 · заголовки
  [318, 423], // 2 · лічильник
  [1612, 1800], // 6 · CJM
  [2960, 3095], // 8a · тихі публікації
  [3100, 3361], // 8b · фінал
];

const isMuted = (frame: number) =>
  MUTED.some(([from, to]) => frame >= from - 6 && frame < to + 6);

const CaptionPage: React.FC<{ page: Page }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = page.startMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 420,
        paddingLeft: 90,
        paddingRight: 90,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.18,
          textAlign: "center",
          color: CREAM,
          textShadow:
            "0 4px 20px rgba(26,31,16,0.92), 0 0 4px rgba(26,31,16,0.95), 0 2px 0 rgba(26,31,16,0.7)",
          scale: interpolate(frame, [0, 4], [0.97, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {page.tokens.map((t, i) => {
          const active = t.fromMs <= nowMs && t.toMs > nowMs;
          return (
            <span key={`${t.fromMs}-${i}`} style={{ color: active ? GOLD : CREAM }}>
              {i > 0 ? " " : ""}
              {t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Captions: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const [pages, setPages] = useState<Page[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading captions"));

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch(staticFile("nvidia-captions.json"));
      setPages(await res.json());
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [continueRender, cancelRender, handle]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  if (!pages || isMuted(frame)) {
    return null;
  }

  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const from = Math.round((page.startMs / 1000) * fps);
        const next = pages[i + 1];
        const to = Math.min(
          next ? Math.round((next.startMs / 1000) * fps) : Infinity,
          Math.round((page.endMs / 1000) * fps) + 8,
        );
        const duration = to - from;
        if (duration <= 0) {
          return null;
        }
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
