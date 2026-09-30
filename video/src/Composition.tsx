import { Composition } from "remotion";
import { Reel } from "./Reel";

export const MyComposition = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={4087}
      fps={30}
      width={720}
      height={1280}
    />
  );
};
