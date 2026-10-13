# Appendix plan for raw data (Deliverable 6)

The template wants raw results in an appendix, not counted in the 2500 words. Each appendix is referred to from the text, so every claim is traceable.

| Appendix | Contents | Source file in repo | Filled by | Status |
|---|---|---|---|---|
| A. Instruments | The six items per week with fixed answers (A2 Appendix B for the Feb 2021 week; the July 2021 set comes from Deliverable 3), the ten-need sheet, the think-aloud prompt, briefing script and consent wording | `deliverable-3/` (when it lands) | Deliverable 3 | Pending |
| B. Raw item scores | One row per reader, condition, week, order, item, score (the `item-scores.csv` format), plus the item 6 code (Pass, Hedged, Over-claim) and the optional specificity tick | `deliverable-6/data/item-scores.csv` | Raphael after each session | Empty template: `analysis/templates/item-scores.csv` |
| C. Ten-need sheet | Marking key, then every reader's classification, then the analysis output | `deliverable-6/data/marking-key.csv`, `need-classifications.csv` | Raphael | Empty templates |
| D. Think-aloud coding | Segment id, reader, timestamp, quote, pass 1 code, pass 2 code; coding agreement; the rule used for each disagreement | `deliverable-5/think-aloud-coding-sheet.csv`, `deliverable-6/data/think-aloud-codes.csv` | Raphael | Template in D5 |
| E. Analysis output | The unedited text printed by `node deliverable-6/analysis/analyse.js ... --out deliverable-6/data/analysis-output.md`, with the date it was run | `deliverable-6/data/analysis-output.md` | Raphael runs it | Not run |
| F. Fidelity check | Scored checklists for both study weeks (Deliverable 4) | `study/*/fidelity-*-scored.md` | Deliverable 4 | The `fidelity-A.md` / `fidelity-B.md` files are blank templates; scored files live on branch `deliverable-4-fidelity-check`. July scored PASS for A and B. February was scored by two scorers: Version B failed on contradicted claims, the tool was repaired and the changed rows are being re-scored. A2 requires scoring "read by hand", so Raphael must verify the AI-assisted scoring and disclose it |
| G. Recruitment and consent | Recruitment message, booking tracker with names removed, consent wording | `deliverable-5/` | Raphael | Drafts in D5 |

## Rules

1. Reader codes only (R01 to R08, P00 for the pilot). Names stay in a private file outside the repo.
2. Never edit a raw CSV after analysis. Corrections go in a new row with a note, or a dated change log.
3. Pilot data is kept, labelled, and excluded by the tool (any code like `P00`, or `pilot` = yes).
4. Quotes in the report come from timestamped notes; keep the timestamp in Appendix D.
5. If the readers recruited fall below the participant floor, say so in Method and keep the A2 fallback: think-alouds first, quantitative arm descriptive. What the floor is (five readers in total, or five per report version) is an open decision in `deliverable-3/README.md` (open decision 5).
6. Put the repo path of each appendix in the Project Deliverables links and check them in a private browser window.

## Folder layout to create when data exists

```
deliverable-6/
  data/
    item-scores.csv
    need-classifications.csv
    marking-key.csv
    think-aloud-codes.csv
    analysis-output.md
  analysis/   (this tool, unchanged)
```
