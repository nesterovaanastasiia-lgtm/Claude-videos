import { Composition } from "remotion";
import { Reel } from "./Reel";
import { TRADES_DURATION, TradesReel } from "./trades/TradesReel";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={4087}
        fps={30}
        width={720}
        height={1280}
      />
      <Composition
        id="TradesReel"
        component={TradesReel}
        durationInFrames={TRADES_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
