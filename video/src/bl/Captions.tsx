import React from "react";
import { interpolate, Sequence, useCurrentFrame } from "remotion";
import { SERIF } from "./theme";
import pages from "../../bl-captions.json";

/** One phrase at a time, italic serif, the way the reference sets its subtitles. */
const Page: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        width: 900,
        top: 1150,
        textAlign: "center",
        opacity: o,
      }}
    >
      <div
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.26,
          color: "#FFFFFF",
          textShadow:
            "0 2px 10px rgba(20,18,15,0.85), 0 6px 34px rgba(20,18,15,0.6)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Captions: React.FC = () => (
  <>
    {(pages as { text: string; from: number; dur: number }[]).map((p, i) => (
      <Sequence key={i} from={p.from} durationInFrames={p.dur} name={p.text.slice(0, 24)}>
        <Page text={p.text} />
      </Sequence>
    ))}
  </>
);
