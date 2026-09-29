import json

FPS = 30

# (source_start_frame, source_end_frame) — bad takes / restarts already removed
KEEP = [
    (0, 744),      # hook + "давайте вгадаємо"
    (789, 1037),   # її пристрої встановлює не той, хто купує
    (1088, 1260),  # reveal: Ajax Systems
    (1347, 1674),  # дві речі / перша: спокій
    (1796, 1904),  # той самий механізм, що і у нової пошти
    (2132, 2445),  # друга: інсталятор радить бренд
    (2649, 4064),  # навчання партнерів -> суміжники
    (4226, 5082),  # чесне питання -> фінал + тизер
]

# Manual transcription fixes (source word index is matched by text+time)
FIXES = {
    "зробляє": "заробляє",
    "далі": "",
    "заліза": "залізо",
    "клієнті?": "клієнтці?",
    "понад": "у",
    "у": "понад",
}

timeline = []
cursor = 0
for src_start, src_end in KEEP:
    dur = src_end - src_start
    timeline.append({"srcStart": src_start, "srcEnd": src_end, "tlStart": cursor, "dur": dur})
    cursor += dur
TOTAL = cursor


def map_time(sec):
    """Source seconds -> timeline ms, or None if the moment was cut out."""
    f = sec * FPS
    for r in timeline:
        if r["srcStart"] <= f < r["srcEnd"]:
            return (f - r["srcStart"] + r["tlStart"]) / FPS * 1000
    return None


segs = json.load(open("transcript.json"))

# Whisper mis-heard a handful of words — fix them, ignoring trailing punctuation.
WORD_FIX = {
    "зробляє": "заробляє",
    "заліза": "залізо",
    "клієнті": "клієнтці",
}
DROP_WORDS = {"далі"}

PUNCT = ".,?!:;\u2013\u2014"

captions = []
for s_ in segs:
    for w in s_["words"]:
        raw = w["w"].strip()
        if not raw or raw.strip(PUNCT) == "":
            continue
        core = raw.rstrip(PUNCT)
        tail = raw[len(core):]
        if core.lower() in DROP_WORDS:
            continue
        text = WORD_FIX.get(core.lower(), core) + tail
        start_ms = map_time(w["s"])
        end_ms = map_time(max(w["e"] - 0.001, w["s"]))
        if start_ms is None or end_ms is None:
            continue
        captions.append({
            "text": " " + text,
            "startMs": round(start_ms),
            "endMs": round(max(end_ms, start_ms + 60)),
            "timestampMs": round((start_ms + end_ms) / 2),
            "confidence": None,
        })

captions.sort(key=lambda c: c["startMs"])
json.dump(captions, open("/home/user/Claude-videos/video/public/captions.json", "w"),
          ensure_ascii=False, indent=0)

print("TOTAL FRAMES", TOTAL, "=", round(TOTAL / FPS, 2), "s")
print("\nCLIPS (hardcode these):")
for r in timeline:
    print("  from=%d durationInFrames=%d trimBefore=%d  (src %.2fs-%.2fs)" %
          (r["tlStart"], r["dur"], r["srcStart"], r["srcStart"] / FPS, r["srcEnd"] / FPS))

print("\nKEY MOMENTS (timeline frames):")
marks = [
    ("hook 100 країн", 0.18), ("як заробляє", 4.68), ("вгадай компанію", 10.09),
    ("народилась у Києві", 12.64), ("найбільший у Європі", 18.5),
    ("встановлює не покупець", 26.37), ("гроші не лише з покупця", 30.55),
    ("REVEAL Ajax", 36.55), ("система безпеки", 39.6),
    ("дві речі", 44.95), ("ПЕРША", 48.23), ("не сигналізацію а спокій", 49.31),
    ("залізо vs спокій", 51.89), ("нова пошта", 59.92),
    ("ДРУГА", 71.14), ("інсталятор", 73.44), ("саме він радить", 79.16),
    ("не в рекламу", 88.36), ("а для тих хто вирішує", 92.08),
    ("навчання сертифікація", 94.96), ("виграв бренд", 98.30),
    ("довга гра", 105.18), ("не за квартал", 106.96), ("роки навчання", 109.44),
    ("хто радить клієнтці", 115.60), ("манікюр", 121.14), ("фотографка", 123.86),
    ("педіатр", 126.12), ("бухгалтерка", 128.62),
    ("випиши 5", 130.18), ("не конкурентів", 133.08),
    ("чесне питання", 140.92), ("що ти зробила", 144.12),
    ("готовий текст", 147.34), ("прайс", 149.54), ("гарантія", 151.14),
    ("найдешевший канал", 155.48), ("10 людей", 158.06),
    ("тизер", 163.26), ("зелена пташка", 165.92),
]
for name, t in marks:
    ms = map_time(t)
    print("  %-26s src %7.2f -> %s" % (name, t, "CUT" if ms is None else "frame %d (%.2fs)" % (round(ms / 1000 * FPS), ms / 1000)))
