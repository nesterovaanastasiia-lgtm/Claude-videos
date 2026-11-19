import { Composition } from "remotion";
import { Reel } from "./Reel";
import { COFFEE_DURATION, CoffeeReel } from "./coffee/CoffeeReel";
import { BL_DURATION, BlReel } from "./bl/BlReel";
import { AristotleReel } from "./aristotle/AristotleReel";
import { AR_DURATION } from "./aristotle/ui";
import { NvidiaReel } from "./nvidia/NvidiaReel";
import { NVIDIA_DURATION } from "./nvidia/theme";
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
      <Composition
        id="CoffeeReel"
        component={CoffeeReel}
        durationInFrames={COFFEE_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="NvidiaReel"
        component={NvidiaReel}
        durationInFrames={NVIDIA_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BlReel"
        component={BlReel}
        durationInFrames={BL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AristotleReel"
        component={AristotleReel}
        durationInFrames={AR_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
