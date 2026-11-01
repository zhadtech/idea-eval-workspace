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

## After setup
Put the first ideas in `stages/00_screen/input/ideas-batch.md`, for example copied from `../Ideas.md`. Then say "Screen these ideas".
