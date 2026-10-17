# Appendix plan for raw data (Deliverable 6)

The template wants raw results in an appendix, not counted in the 2500 words. Each appendix is referred to from the text, so every claim is traceable.

| Appendix | Contents | Source file in repo | Filled by | Status |
|---|---|---|---|---|
| A. Instruments | The six items per week with fixed answers (both weeks are in Deliverable 3; the February file logs its changes from A2 Appendix B), the ten-need sheet, the think-aloud prompt, briefing script and consent wording | `deliverable-3/items-week1-2021-02-08.md`, `items-week2-2021-07-19.md`, `answer-key-and-scoring.md`, `ten-need-sheet.md`, `session-protocol.md`, `participant-info-and-consent.md` | Deliverable 3 | Landed on `deliverable-3-instruments`, both weeks' items there. Drafts until Raphael approves them and the pilot runs |
| B. Raw item scores | One row per reader, condition, week, order, item, score (the `item-scores.csv` format), plus the item 6 code (Pass, Hedged, Over-claim) and the optional specificity tick | `deliverable-6/data/item-scores.csv`; `deliverable-6/data/second-scorer-scores.csv` (same columns; the readers the second scorer re-scored, both reports) | Raphael after each session; the second-scorer file by the second scorer, blind to the first | Empty templates: `analysis/templates/item-scores.csv`, `analysis/templates/second-scorer-scores.csv` |
| C. Ten-need sheet | Marking key, then every reader's classification, then the analysis output | `deliverable-6/data/marking-key.csv`, `need-classifications.csv` | Raphael | Empty templates |
| D. Think-aloud coding | Segment id, reader, timestamp, quote, pass 1 code, pass 2 code; coding agreement; the rule used for each disagreement | `deliverable-5/think-aloud-coding-sheet.csv`, `deliverable-6/data/think-aloud-codes.csv` | Raphael | Template in D5 |
| E. Analysis output | The unedited text printed by `node deliverable-6/analysis/analyse.js ... --scores2 deliverable-6/data/second-scorer-scores.csv --out deliverable-6/data/analysis-output.md` (full command in `README.md`), with the date it was run. Section 1b of it reports the second-scorer agreement | `deliverable-6/data/analysis-output.md` | Raphael runs it | Not run |
| F. Fidelity check | Scored checklists for both study weeks (Deliverable 4) | On branch `deliverable-4-fidelity-check`. February, `study/week1-2021-02-08/`: `FIDELITY-RESULT.md`, `fidelity-A-scored-scorer1.md`, `fidelity-A-scored-scorer2.md`, `fidelity-B-scored-scorer1.md`, `fidelity-B-scored-scorer2.md`, `fidelity-B-rescore-repaired-rows.md`. July, `study/week2-2021-07-19/`: `fidelity-A-scored.md`, `fidelity-B-scored.md` | Deliverable 4 | The `fidelity-A.md` / `fidelity-B.md` files are blank templates. July scored PASS for A and B. February: A 15 of 15 supported (Pass). B failed first (two contradicted rows per scorer), the tool was repaired, and a third scorer re-scored the six changed rows (19, 21, 22, 23, 27, 33): all supported, so B is 39 of 39 (Pass after repair, `FIDELITY-RESULT.md`). All scoring was done by AI scorers. A2 requires scoring "read by hand", so Raphael must check it by hand (hand-check pending) and disclose the AI-assisted scoring |
| G. Recruitment | Recruitment message and booking tracker with names removed. The consent wording is in Appendix A | `deliverable-5/recruitment-message.md`, `deliverable-5/booking-tracker.csv` | Raphael | Drafts on `deliverable-5-sessions` |

## Rules

1. Reader codes only (R01 onward, as many as were recruited; P0 for the pilot). Names stay in a private file outside the repo. Never give a reader a P code: the tool drops every P code as pilot.
2. Never edit a raw CSV after analysis. Corrections go in a new row with a note, or a dated change log.
3. Pilot data is kept, labelled, and excluded by the tool (`P0`, or any P followed by digits, or `pilot` = yes).
4. Quotes in the report come from timestamped notes; keep the timestamp in Appendix D.
5. If the readers recruited fall below the participant floor, say so in Method and keep the A2 fallback: think-alouds first, quantitative arm descriptive. The floor is five readers in total (decided 14 Oct 2026; `deliverable-3/README.md` decision 5).
6. Put the repo path of each appendix in the Project Deliverables links and check them in a private browser window.

## Folder layout to create when data exists

```
deliverable-6/
  data/
    item-scores.csv
    second-scorer-scores.csv
    need-classifications.csv
    marking-key.csv
    think-aloud-codes.csv
    analysis-output.md
    figures/        (figures.js output: figure-1-paired-differences.svg and .png, tables.md)
  analysis/   (this tool, unchanged)
```
