# NoName podcast 2026-08-01, повна 4K-версія (30 частин)

Це один файл `NoName_podcast_4K.mp4` (2,9 ГБ), порізаний на 30 шматків по 95 МБ,
бо GitHub не приймає файли понад 100 МБ.

## Як зібрати на Mac

1. Скачай усі 30 файлів `NoName_podcast_4K_00.part` … `NoName_podcast_4K_29.part`
   в одну папку (наприклад, «Завантаження»).
2. Відкрий **Термінал** (Spotlight → «Терминал»/«Terminal»).
3. Встав і натисни Enter:

```
cd ~/Downloads && cat NoName_podcast_4K_*.part > NoName_podcast_4K.mp4
```

4. Готово: у «Завантаженнях» з'явиться `NoName_podcast_4K.mp4` розміром 2 913 115 602 байт.
   Частини `.part` після цього можна видалити.

Перевірка (необов'язково): `shasum -a 256 ~/Downloads/NoName_podcast_4K.mp4`
має показати `0841e82143b06cbc5bdac585eba3582374625b9f36dabd9953c19bca6dec60c7`.
