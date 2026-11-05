# Setup questionnaire (one time)

**For Claude:** Ask one group at a time. Write each answer into its target file. Remove the `TODO(setup)` line. Show the finished file. When all groups are done, tell the user the workspace is ready.

## Group A → `_config/owner-profile.md`
1. **Goal:** How much money per month, by when? (Example: "$2,000 a month within 12 months.")
2. **Goal:** When quality and speed clash, which wins? (Example: "Quality, but the first version must ship in 30 days.")
3. **Strengths:** Which skills should the list add or remove? (Example: "Add SQL Server reporting. Remove Polars, I only tried it.")
4. **Limits:** How many hours a week can you give the chosen idea? (Example: 10.)
5. **Limits:** What is the most money you will put in before the idea earns? (Example: $500.) This is also the cap for deal-breaker `D04`.
6. **Limits:** Which country and city do you live in? Which markets do you want to sell to? (Example: "Live in Ho Chi Minh City. Sell to the US and Vietnam.")
7. **Audience:** Is "upper middle class" your default buyer? Describe them in one line. (Example: "Professionals aged 28–45 who pay to save time.")
8. **Hard noes:** Anything to add? (Example: "No crypto. No dropshipping.")

## Group B → `_config/criteria.md`
9. **Weights:** Look at the 8 criteria and weights. Change any of them? They must add up to 100. (Example: "Raise C03 to 20, lower C08 to 0.")
10. **Deal-breakers:** Add, remove, or soften any of them? (Example: "Allow a voice, but no face, for D01.")
11. **Bands:** Pursue at 3.8 and Park at 3.0. Stricter or looser? (Example: "Pursue at 4.0. I want very few.")

## Group C → `_config/idea-types.md`
12. Which idea types will you judge most? Any types to add? (Example: "Add T8 Data product: sell datasets and charts to media.")
13. Which paid tools or accounts can research use? (Example: "vidIQ free, a Google account for Trends, nothing else.")

## Group D → `_config/sources.md`, `_config/scout-feeds.md`, and `_config/domains.md`
14. **Markets:** The source library has a Global section and an example market, Vietnam. Which markets do you sell to? Claude drafts a section for each new one, and marks each source `not yet` until it is checked. Remove the Vietnam section if you do not need it. (Example: "Add the US.")
15. **Scout lens:** Which markets and feed categories should the scout watch by default? How should it pick domains: `auto` (2 hot + 1 wild), `hot`, `random`, or fixed names? (Example: "VN and Global. All categories. Auto.")
16. **Scout feeds:** Which feeds should be on or off? (Example: "Turn on Amazon Movers & Shakers. Turn off the Vietnamese forums.")
17. **Domains:** Which domains do you already follow closely? They get `Familiar: yes`, so the wild pick skips them. Which domains do you never want? They get `On: no`. (Example: "I know software, AI, and education. Never mining.")
18. **Schedule:** Run the scout by hand, weekly, or monthly? (Example: "Every Monday at 7:00.")

## After setup
There are two ways to start:
- You have ideas: put them in `stages/00_screen/input/ideas-batch.md`, for example copied from `../Ideas.md`. Then say "Screen these ideas".
- You want ideas: say "Scout the market".

If the user chose a schedule in question 18, offer to set it up now. A schedule is a standing task, so ask before you create it.
