# Deliverable 6: Evaluation report, instruments, data

Status (17 Oct 2026, Week 10): scaffold, analysis tool and figure tool done and tested. No data exists yet, and no findings are written. The files are committed on branch `deliverable-6-evaluation-report` (not merged to main).

A2 success measure (Deliverables table, row 6, 6 h, 1 in prac): **"All six items and both coding arms reported with agreement; claims traceable to appendices."** Learning goals: Understand; Evaluate.

## What is here

| File | What it is |
|---|---|
| `evaluation-section-skeleton.md` | The A3 Evaluation section (about 1000 words): RQ, Target Audience, Method (200 or fewer), Results and Discussion (about 700), with placeholders saying what evidence goes where |
| `appendix-plan.md` | Appendices A to G for raw data, with source files and rules |
| `analysis/analyse.js` | Node tool (no dependencies). Reads CSVs, prints a Markdown report |
| `analysis/figures.js` | Node tool (no dependencies). Same CSVs; writes Figure 1 (SVG dot plot, plus a PNG copy for Word, of each reader's difference, producers as filled circles, proxies as hollow squares) and Tables 1, 2, 2b and 3 as Markdown |
| `analysis/test.js` | 203 checks against hand-computed values, for both tools. Run `node deliverable-6/analysis/test.js` from the repo root. Result on 17 Oct: 203 passed, 0 failed. The PNG render check is skipped when no Chrome or Edge is found |
| `analysis/sample-*.csv` | **FAKE** data (4 invented readers and a pilot row) so you can see the output. Labelled FAKE inside each file and in the tool's banner |
| `analysis/templates/*.csv` | Header-only files to copy into `deliverable-6/data/` and fill |

## What the tool reports

1. Item means by condition and by week, with raw full-mark counts (items 1 to 5 scored 0, 1 or 2, a full mark is 2; item 6 is the unanswerable item, reported as Pass / Hedged / Over-claim counts per version, never as a number). Optional specificity tick counts for items 4 and 5.
2. Each reader's treatment-minus-baseline difference over the five scored items (each report is out of 10, so the difference runs from -10 to +10), counts up/same/down, mean, median, range, and a split by role. Beside the mean: the mean for readers whose treatment report was W1, the mean for those whose treatment was W2, and their average as a week-balanced figure. At five readers the tracker repeats S2, so the groups are 3 and 2 and the plain mean leans toward one week; the tool says so.
3. Per-week baseline scores (the week-difficulty rival explanation), plus the gap between weeks. Reading order is compared inside each condition (baseline order 1 vs order 2, treatment order 1 vs order 2), never pooled, because uneven sequences would make a pooled order line show the condition gap.
4. Ten-need sheet: agreement with your key as a raw count and whole percentage, and Cohen's kappa per reader, plus a list of needs where readers departed from the key. Optional counts of the T / R / U sources readers circled (counts only, no agreement statistic).
5. Think-aloud codes: agreement and kappa between pass 1 and pass 2 on the segments coded twice, and which segments differ.
6. Second scorer (optional `--scores2`): items in agreement out of items scored, items 1 to 5 and item 6 apart, and the items where the two scorers differ. This is the check in `deliverable-3/answer-key-and-scoring.md` (at least two readers, both reports).

It prints no p-values on purpose. The readers recruited (floor five, up to eight) show direction and failure points, not significance.

Data checks. Sections 1 to 3 use complete readers only: both reports, items 1 to 5 each scored once with 0, 1 or 2. A reader with a blank, missing, duplicated or out-of-range score, or with one report only, is named with the reason and left out of every table, so baseline and treatment always cover the same people. Under five complete readers, the output starts with the A2 fallback notice. The footer gives the real number of complete readers. Rows of commas only (as Excel writes) are dropped.

Design checks. Every row of one report must give one week and one order, and a reader's two reports must differ in both week and order. A reader who fails this (for example an `order error` from the session checklist, or one row typed with the wrong week) is named and left out. The output lists how many complete readers sit in each sequence (week and order of the treatment report). Weeks are read in upper case and roles in lower case, so `w1` and `Proxy` are fine; any week other than W1 or W2 and any role other than producer or proxy is warned about. Order `01`, `1st` and `first` read as 1 (and the same for 2); any other order is warned about and that reader is left out. In the ten-need sheet, a reader with a need_id not in the key (such as a printed row number) is named and left out, and a duplicate (reader, need) row and any class other than D, P or N (such as `D/P` for two circles) is named and left out.

Quotes in notes. A double quote starts a quoted cell only when it is the first character of the cell, so a stray quote inside a note is kept as written. A note that holds a comma must be quoted as a whole. The tool warns when a quote is never closed and when a row has more filled cells than the header.

## CSV formats

| File | Columns | Notes |
|---|---|---|
| item-scores | `participant, role, condition, week, order, item, score[, specific]` | condition: `baseline`/`treatment` (or `A`/`B`; A is baseline, B is treatment). week: `W1`/`W2`. order: 1 or 2 (which report was read first). item 1 to 6 (any other item, such as `Q1`, is warned about with its raw value). Items 1 to 5: score 0, 1 or 2 (any other value is flagged; no half marks). Item 6: the code `Pass`, `Hedged` or `Over-claim` in the score column (a number is flagged). `specific` is optional and only for items 4 and 5: `y` if the answer used a name only Version B shows, `n` otherwise, blank if not recorded. One row per item per condition per reader. Fill participant on every row: a row with a blank participant is named and left out, because it may sit under a pilot row |
| need-classifications | `participant, need_id, class[, records]` | need_id: the key's N-number from `deliverable-3/ten-need-sheet.md` section B (N01, N03, N07, N08, N09, N12, N17, N19, N25, N26 on printed rows 1 to 10), not the printed row number. Case and zero-padding do not matter (`n1` reads as N01). A reader with any need_id not in the key is named and left out of every need table until fixed. class: `D` derivable, `P` partly, `N` not. `records` is optional: the source(s) circled on the sheet, from `T` tracker, `R` repository, `U` Unity files (e.g. `R U`); reported as counts only. Fill participant on every row: a row with a blank participant is named and left out, because it may sit under a pilot row |
| marking-key | `[row, ]need_id, class` | `row` is optional: the printed row number (1 to 10). With it, a reader sheet typed by row number is mapped to the N-number. The ten-need key from `deliverable-3/ten-need-sheet.md` section B, accepted or changed by you before the readers' sheets are looked at |
| second-scorer-scores | same columns as item-scores | optional. Only the readers the second scorer re-scored, both reports, scored blind to your scores. Template: `analysis/templates/second-scorer-scores.csv` |
| think-aloud-codes | long: `segment_id, participant, timestamp, pass, code`; or wide: `segment_id, ..., pass1_code, pass2_code[, final_code]` | wide is the layout of `deliverable-5/think-aloud-coding-sheet.csv`. Table 3 counts a segment under its `final_code` when the D5 resolve step set one, else under its pass 1 code (long layout: a row with `pass` = `final`). Long layout `pass` is 1, 2 or final; `pass 2` and `p2` read as 2, and any other pass is warned about and the row left out. Agreement uses pass 1 and pass 2 only. Every code must be in the codebook (the 21 Ko et al. types, `none`, `other`, `unclear`): any other code, such as `dl` or `a2/d3`, is named with reader, segment and pass, and that pair is left out of agreement until fixed. One code per segment: split an utterance that carries two needs. Segments are matched by participant + segment_id, and a segment_id used for two readers is flagged, because `deliverable-5/recode-sample.js` merge keys by segment_id alone. Keep segment_ids unique across the sheet. Fill participant on every row: a row with a blank participant is named and left out, because it may sit under a pilot row |

Lines starting with `#` are ignored. The pilot code `P0` (the tool accepts any P followed by digits), or a `pilot` column set to `yes`, is excluded from every section, think-aloud codes included. So reader codes must start with R (R01, R02 ...), never P.

## Run it

```
node deliverable-6/analysis/test.js                       # check the tool
node deliverable-6/analysis/analyse.js                    # demo on FAKE sample data
node deliverable-6/analysis/analyse.js --scores deliverable-6/data/item-scores.csv --needs deliverable-6/data/need-classifications.csv --key deliverable-6/data/marking-key.csv --codes deliverable-5/think-aloud-coding-sheet.csv --scores2 deliverable-6/data/second-scorer-scores.csv --out deliverable-6/data/analysis-output.md
node deliverable-6/analysis/figures.js                    # demo tables on FAKE sample data
node deliverable-6/analysis/figures.js --scores deliverable-6/data/item-scores.csv --needs deliverable-6/data/need-classifications.csv --key deliverable-6/data/marking-key.csv --codes deliverable-5/think-aloud-coding-sheet.csv --outdir deliverable-6/data/figures
```

`figures.js` writes `figure-1-paired-differences.svg`, `figure-1-paired-differences.png` and `tables.md` into `--outdir`. The PNG (twice the SVG size) is for the Word builder `build-docx-v2.js`, which embeds PNG or JPG only. It is made by an installed Chrome or Edge in headless mode, so the tool still needs no npm package. If no browser is found, the tool says so and writes the SVG only: set `CHROME_PATH` to `chrome.exe` or `msedge.exe`, or add `--png no` to skip the PNG. Output built from any `sample-*.csv` file is stamped FAKE in the image and the tables, and its file names start with `FAKE-`.

## What Raphael must do

1. Accept or change the marking key for the ten needs before you look at any reader's sheet. The key in `deliverable-3/ten-need-sheet.md` section B is AI-drafted from Deliverable 1, and the Rule 1 or Rule 2 choice there is still open.
2. After each session, enter the scores from the paper sheets the same day (templates in `analysis/templates/`). Score against the fixed answers with `deliverable-3/answer-key-and-scoring.md` (items 1 to 5 as 0, 1 or 2; item 6 coded Pass, Hedged or Over-claim; optional specificity tick on items 4 and 5).
3. Run the tool on the real files in Week 13, paste its output into Appendix E, and write the Results and Discussion in your own words from it. Write the opening answer last.
4. After the sessions, have the second scorer re-score at least two readers' sheets (both reports) into `second-scorer-scores.csv`, and run the tool with `--scores2`.
5. Make Figure 1 and Tables 1, 2, 2b and 3 with `figures.js` (command above), check them against the `analyse.js` output, and integrate them in the text.
6. Keep the claims modest: raw counts first, limits stated (proxy upper bound, N readers from the tracker, ten items, a quarter re-coded).
7. If the readers recruited fall below the participant floor, use the A2 fallback and say so in Method. The floor is five readers in total (decided 14 Oct 2026; `deliverable-3/README.md` decision 5).
8. Add the ethics row to Method (one or two sentences) from `deliverable-3/ethics/report-ethics-points.md` points 1 and 2. No ethics application was made (decided 17 Oct 2026, `deliverable-3/README.md`). Cite the basis: Lecture 1 (27 Jul 2026) said students have general clearance to run user studies under the student code of conduct, and should design around potential harms. This is a stronger basis than "the unit sets no requirement". Check the wording against the Week 1 lecture material (`COMP3180/Week 1/Lecture.md`, transcript at 51:42) before quoting it. Point 4 (real SS3D contributors' work reported accurately) has no placement in that file: the skeleton puts it in the Fidelity row, with SS3D's licence stated once you have checked `study/SOURCE-AND-LICENCE.md` on `deliverable-2-changelens`.
9. Disclose AI use in Method and the GenAI statement. The six items, the item answer key, the ten-need key and both tools here were drafted with Claude Code. Say that you accepted or changed the keys, and give the date only once that is true. Until then, do not call the ten-need key your own.

## Not done on purpose

No results, no discussion prose, no fake participants outside the files marked FAKE. The Evaluation text is yours.
