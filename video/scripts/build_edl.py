"""Rebuild the edit list and the caption file from the raw Whisper transcript.

The source take is one continuous recording in which several lines were
restarted. KEEP holds the good takes only; every cut point sits inside the
pause between two words so nothing is clipped and no fragment leaks through.

Run from the repository root:
    python3 video/scripts/build_edl.py
"""

import json
import os

FPS = 30
HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)

# (source start, source end) in seconds — the takes that survive, in order.
KEEP_SECONDS = [
    (0.00, 9.76),     # hook: 100 countries + "як він заробляє далі"
    (12.50, 24.74),   # clue 1: born in Kyiv, one of the biggest in Europe
    (26.26, 34.60),   # clue 2 + 3: installed by someone else, paid by someone else
    (36.30, 41.90),   # reveal: Ajax Systems
    (44.60, 55.76),   # two things + first: they sell calm, not hardware
    (59.67, 63.60),   # the Nova Poshta parallel
    (71.08, 81.49),   # second: the installer recommends the brand
    (88.06, 103.78),  # investing in the adviser, not the buyer
    (105.06, 135.44),  # the long game -> five adjacent trades
    (140.62, 169.34),  # the honest question -> closing line + teaser
]

# Whisper mis-heard these. Compared against the script the speaker wrote.
WORD_FIX = {
    "зробляє": "заробляє",
    "заліза": "залізо",
    "клієнті": "клієнтці",
}
# She inverted two words; the script has "у понад ста країнах".
SWAP_PAIRS = [("понад", "у")]

PUNCT = ".,?!:;–—"

KEEP = [(round(a * FPS), round(b * FPS)) for a, b in KEEP_SECONDS]

timeline = []
cursor = 0
for src_start, src_end in KEEP:
    dur = src_end - src_start
    timeline.append(
        {"srcStart": src_start, "srcEnd": src_end, "tlStart": cursor, "dur": dur}
    )
    cursor += dur
TOTAL = cursor


def map_time(sec):
    """Source seconds -> timeline milliseconds, or None if the moment was cut."""
    f = sec * FPS
    for r in timeline:
        if r["srcStart"] <= f < r["srcEnd"]:
            return (f - r["srcStart"] + r["tlStart"]) / FPS * 1000
    return None


segs = json.load(open(os.path.join(PROJECT, "transcript.source.json")))

captions = []
for seg in segs:
    for w in seg["words"]:
        raw = w["w"].strip()
        if not raw or raw.strip(PUNCT) == "":
            continue
        core = raw.rstrip(PUNCT)
        tail = raw[len(core):]
        start_ms = map_time(w["s"])
        end_ms = map_time(max(w["e"] - 0.001, w["s"]))
        if start_ms is None or end_ms is None:
            continue
        captions.append(
            {
                "text": " " + WORD_FIX.get(core.lower(), core) + tail,
                "startMs": round(start_ms),
                "endMs": round(max(end_ms, start_ms + 60)),
                "timestampMs": round((start_ms + end_ms) / 2),
                "confidence": None,
            }
        )

captions.sort(key=lambda c: c["startMs"])

for first, second in SWAP_PAIRS:
    for i in range(len(captions) - 1):
        if (
            captions[i]["text"].strip().rstrip(PUNCT).lower() == first
            and captions[i + 1]["text"].strip().rstrip(PUNCT).lower() == second
        ):
            captions[i]["text"], captions[i + 1]["text"] = (
                captions[i + 1]["text"],
                captions[i]["text"],
            )

with open(os.path.join(PROJECT, "public", "captions.json"), "w") as f:
    json.dump(captions, f, ensure_ascii=False, indent=0)

print("TOTAL FRAMES %d = %.2f s (%d:%02d)"
      % (TOTAL, TOTAL / FPS, TOTAL // FPS // 60, TOTAL // FPS % 60))
print("\nCLIPS — hardcode these into Reel.tsx:")
for r in timeline:
    print(
        "  from={%d} durationInFrames={%d} trimBefore={%d}   // src %.2f-%.2f s"
        % (r["tlStart"], r["dur"], r["srcStart"],
           r["srcStart"] / FPS, r["srcEnd"] / FPS)
    )

MARKS = [
    ("hook / 100 країн", 0.18),
    ("як заробляє далі", 4.68),
    ("народилась у Києві", 12.64),
    ("найбільших у Європі", 18.50),
    ("встановлює не покупець", 26.37),
    ("гроші не лише з покупця", 30.55),
    ("REVEAL Ajax", 36.55),
    ("системи безпеки", 39.60),
    ("дві речі", 44.95),
    ("ПЕРША", 48.23),
    ("не сигналізацію, а спокій", 49.31),
    ("залізо vs спокій", 51.89),
    ("нова пошта", 59.92),
    ("ДРУГА", 71.14),
    ("інсталятор", 73.44),
    ("саме він радить", 79.16),
    ("не в рекламу", 88.36),
    ("а для тих, хто вирішує", 92.08),
    ("навчання, сертифікація", 94.96),
    ("виграв бренд", 98.30),
    ("довга гра", 105.18),
    ("не за квартал", 106.96),
    ("роки навчання", 109.44),
    ("хто радить клієнтці", 115.60),
    ("манікюр", 121.14),
    ("фотографка", 123.86),
    ("педіатр", 126.12),
    ("бухгалтерка", 128.62),
    ("випиши 5", 130.18),
    ("не конкурентів", 133.08),
    ("чесне питання", 140.92),
    ("що ти зробила", 144.12),
    ("готовий текст", 147.34),
    ("прайс", 149.54),
    ("гарантія", 151.14),
    ("найдешевший канал", 155.48),
    ("10 людей", 158.06),
    ("тизер", 163.26),
    ("зелена пташка", 165.92),
]

print("\nKEY MOMENTS (timeline frames):")
for name, t in MARKS:
    ms = map_time(t)
    where = "CUT" if ms is None else "frame %4d  (%6.2f s)" % (
        round(ms / 1000 * FPS), ms / 1000)
    print("  %-26s src %7.2f -> %s" % (name, t, where))
