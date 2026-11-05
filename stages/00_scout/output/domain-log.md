# Domain log

One row per domain per scan. Stage 00_scout adds the rows. `scripts/pick-domains.mjs` reads them to find the hot domains and the ones studied lately.

- `Domain`: a `DM` ID from `_config/domains.md`, or the name of a new domain.
- `Mode`: `sweep` (seen only in the opening sweep), or `chosen`, `hot`, or `wild` (studied in depth).
- `Policy`, `Money`, `Market`: the number of signals of each kind that the sweep found for this domain. Signals from the deep study do not count here, so a domain cannot heat itself up.
- `Ideas`: ideas from this domain. `Kept`: those that the user kept at the gate (`?` until the gate).

| Date | Domain | Mode | Policy | Money | Market | Ideas | Kept |
|---|---|---|---|---|---|---|---|
