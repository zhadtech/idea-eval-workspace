# Feed log

One row per feed per scan. Stage 00_scout adds the rows. `scripts/pick-feeds.mjs` reads them to find which feeds are due and which ones pay off.

- `Signals`: signals found in this feed.
- `Ideas`: ideas that used at least one of those signals.
- `Kept`: those ideas that the user kept at the gate. `?` until the gate.

| Date | Feed | Signals | Ideas | Kept |
|---|---|---|---|---|
