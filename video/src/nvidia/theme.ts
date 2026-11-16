import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Brand faces are vendored under public/nv-fonts, one variable file per
 * subset, so a render never depends on the network.
 */
const handle = delayRender("Loading Lora and Manrope");

const CYRILLIC = "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116";
const LATIN =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

Promise.all(
  (
    [
      ["Lora", "cyrillic", CYRILLIC],
      ["Lora", "latin", LATIN],
      ["Manrope", "cyrillic", CYRILLIC],
      ["Manrope", "latin", LATIN],
    ] as const
  ).map(([family, subset, unicodeRange]) =>
    loadFont({
      family,
      url: staticFile(`nv-fonts/${family}-${subset}.woff2`),
      weight: "100 900",
      format: "woff2",
      unicodeRange,
    }),
  ),
)
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));

export const SERIF = "Lora";
export const SANS = "Manrope";

export const BEIGE = "#F2E9DA";
export const CREAM = "#F9F6F0";
export const OLIVE = "#30381F";
export const BROWN = "#442F21";
export const GOLD = "#CAA463";

export const RADIUS = 16;
export const SHADOW = "0 18px 48px rgba(48,56,31,0.26)";

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const NVIDIA_DURATION = 3361;
