import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

// Montserrat is bundled in public/fonts so the render never depends on the network.
// One variable file per subset, registered under a single family.
const fontHandle = delayRender("Loading Montserrat");

Promise.all([
  loadFont({
    family: "Montserrat",
    url: staticFile("fonts/Montserrat-cyrillic.woff2"),
    weight: "100 900",
    format: "woff2",
    unicodeRange:
      "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
  }),
  loadFont({
    family: "Montserrat",
    url: staticFile("fonts/Montserrat-latin.woff2"),
    weight: "100 900",
    format: "woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  }),
])
  .then(() => continueRender(fontHandle))
  .catch(() => continueRender(fontHandle));

export const fontFamily = "Montserrat";

// UI accent — never used to encode data, only for emphasis.
export const ACCENT = "#FFC93D";
export const INK = "#101014";
export const SURFACE = "#15151a";
export const TEXT_PRIMARY = "#ffffff";
export const TEXT_SECONDARY = "#c3c2b7";
export const MUTED_LINE = "rgba(255,255,255,0.14)";

// Data colors — documented categorical palette, dark steps, slots 1 and 2.
// Validated against surface #15151a: all six checks pass.
export const SERIES_1 = "#3987e5";
export const SERIES_2 = "#d95926";

export const NEGATIVE = "#e66767";
export const POSITIVE = "#199e70";
