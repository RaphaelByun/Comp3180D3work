# Deliverable 6: Evaluation report, instruments, data

Status (13 Oct 2026, Week 10): scaffold and analysis tool done and tested. No data exists yet, and no findings are written. Nothing here is committed.

A2 success measure (Deliverables table, row 6, 6 h, 1 in prac): **"All six items and both coding arms reported with agreement; claims traceable to appendices."** Learning goals: Understand; Evaluate.

## What is here

| File | What it is |
|---|---|
| `evaluation-section-skeleton.md` | The A3 Evaluation section (about 1000 words): RQ, Target Audience, Method (200 or fewer), Results and Discussion (about 700), with placeholders saying what evidence goes where |
| `appendix-plan.md` | Appendices A to G for raw data, with source files and rules |
| `analysis/analyse.js` | Node tool (no dependencies). Reads CSVs, prints a Markdown report |
| `analysis/test.js` | 53 checks against hand-computed values. Run `node deliverable-6/analysis/test.js` from the repo root. Result today: 53 passed, 0 failed |
| `analysis/sample-*.csv` | **FAKE** data (4 invented readers and a pilot row) so you can see the output. Labelled FAKE inside each file and in the tool's banner |
| `analysis/templates/*.csv` | Header-only files to copy into `deliverable-6/data/` and fill |

## What the tool reports

1. Item means by condition and by week, with raw full-mark counts (items 1 to 5 scored 0, 1 or 2, a full mark is 2; item 6 is the unanswerable item, reported as Pass / Hedged / Over-claim counts per version, never as a number). Optional specificity tick counts for items 4 and 5.
2. Each reader's treatment-minus-baseline difference over the five scored items (each report is out of 10, so the difference runs from -10 to +10), counts up/same/down, mean, median, range, and a split by role.
3. Per-week baseline scores (the week-difficulty rival explanation), plus the gap between weeks.
4. Ten-need sheet: agreement with your key as a raw count and whole percentage, and Cohen's kappa per reader, plus a list of needs where readers departed from the key. Optional counts of the T / R / U sources readers circled (counts only, no agreement statistic).
5. Think-aloud codes: agreement and kappa between pass 1 and pass 2 on the segments coded twice, and which segments differ.

It prints no p-values on purpose. Eight readers show direction and failure points, not significance.

## CSV formats

| File | Columns | Notes |
|---|---|---|
| item-scores | `participant, role, condition, week, order, item, score[, specific]` | condition: `baseline`/`treatment` (or `A`/`B`; A is baseline, B is treatment). week: `W1`/`W2`. order: 1 or 2 (which report was read first). item 1 to 6. Items 1 to 5: score 0, 1 or 2 (any other value is flagged; no half marks). Item 6: the code `Pass`, `Hedged` or `Over-claim` in the score column (a number is flagged). `specific` is optional and only for items 4 and 5: `y` if the answer used a name only Version B shows, `n` otherwise, blank if not recorded. One row per item per condition per reader |
| need-classifications | `participant, need_id, class[, records]` | class: `D` derivable, `P` partly, `N` not. `records` is optional: the source(s) circled on the sheet, from `T` tracker, `R` repository, `U` Unity files (e.g. `R U`); reported as counts only |
| marking-key | `need_id, class` | your own marking, made before the readers' sheets are looked at |
| think-aloud-codes | long: `segment_id, participant, timestamp, pass, code`; or wide: `segment_id, ..., pass1_code, pass2_code` | wide is the layout of `deliverable-5/think-aloud-coding-sheet.csv`. One code per segment: split an utterance that carries two needs |

Lines starting with `#` are ignored. Any participant code like `P00`, or a `pilot` column set to `yes`, is excluded.

## Run it

```
node deliverable-6/analysis/test.js                       # check the tool
node deliverable-6/analysis/analyse.js                    # demo on FAKE sample data
node deliverable-6/analysis/analyse.js --scores deliverable-6/data/item-scores.csv --needs deliverable-6/data/need-classifications.csv --key deliverable-6/data/marking-key.csv --codes deliverable-5/think-aloud-coding-sheet.csv --out deliverable-6/data/analysis-output.md
```

## What Raphael must do

1. Write the marking key for the ten needs yourself, from Deliverable 1, before you look at any reader's sheet.
2. After each session, enter the scores from the paper sheets the same day (templates in `analysis/templates/`). Score against the fixed answers with `deliverable-3/answer-key-and-scoring.md` (items 1 to 5 as 0, 1 or 2; item 6 coded Pass, Hedged or Over-claim; optional specificity tick on items 4 and 5).
3. Run the tool on the real files in Week 13, paste its output into Appendix E, and write the Results and Discussion in your own words from it. Write the opening answer last.
4. Make Figure 1 and Tables 1 to 3 from the output.
5. Keep the claims modest: raw counts first, limits stated (proxy upper bound, eight readers, ten items, a quarter re-coded).
6. If the readers recruited fall below the participant floor, use the A2 fallback and say so in Method. What counts as the floor (five readers in total, or five per report version) is Raphael's open decision, stated in `deliverable-3/README.md` (open decision 5) and `deliverable-5/README.md`; do not apply either reading until it is made.

## Not done on purpose

No results, no discussion prose, no fake participants outside the files marked FAKE. The Evaluation text is yours.
