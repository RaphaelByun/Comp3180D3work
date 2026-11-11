# Deliverable 6: Evaluation report, instruments, data

> **Status at submission (Wed 11 Nov 2026).** `data/` holds the evaluation data of 6 to 8 Nov 2026: the two reads and their scores, the fidelity check of 96 claims, the walkthrough and the heuristic findings. `data/analysis-output.md` holds Tables B to H, generated on 8 Nov by `analysis/analyse.js` (its self-test passes 230 checks). The written evaluation is section 3 of the Final Project Report, submitted on iLearn; `evaluation-section-skeleton.md` and `appendix-plan.md` are the scaffolds it started from. The rest of this file is the working record from October 2026 and is kept as history; where it disagrees with this block, this block is right.

Earlier status (26 Oct 2026, Week 12): scaffold, analysis tool and figure tool done and tested. No SE data exists yet, and no findings are written. The reserve-week items exist (commit `0d3f811`, 21 Oct). There is no AI second scorer (Raphael, 26 Oct; recorded in the plan, commit `9a12294`). The D1 rows for Table F are copied into `data/` (26 Oct), with Raphael's `raphael_checked_yn` column blank. The files are committed on branch `deliverable-6-evaluation-report` (not merged to main).

The evaluation design, Raphael's 17 Oct decision and his reasons are recorded in `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions`, section 1 (activities SE1 to SE4 in section 3). In the report the design is stated once, in the Evaluation Method's Participant row (Raphael's 21 Oct rule). SE1 fidelity hand-check, SE2 timed read of the two unseen reserve weeks, SE3 cognitive walkthrough, SE4 heuristic evaluation.

A2 success measure (Deliverables table, row 6, 6 h, 1 in prac): **"All six items and both coding arms reported with agreement; claims traceable to appendices."** Learning goals: Understand; Evaluate. The "coding arms" become the needs-log coding (pass 1 against pass 2); there is no second scorer. The six items per reserve week exist (`0d3f811`). Report this as a variance.

## What is here

| File | What it is |
|---|---|
| `evaluation-section-skeleton.md` | The A3 Evaluation section (about 1000 words): RQ, Target Audience, Method (200 or fewer), Results and Discussion (about 700), limits, with placeholders saying what evidence goes where |
| `appendix-plan.md` | The raw-data appendices, with source files and rules, and a proposed appendix lettering shared with the report |
| `analysis/analyse.js` | Node tool (no dependencies). Reads the SE CSVs, prints Tables A to H as Markdown (the scoring check only if a second-scorer file has data rows; none is used) |
| `analysis/figures.js` | Node tool (no dependencies). Same CSVs; writes the time-and-confidence figure (SVG, plus a PNG copy for Word) and Tables B, C, F and G as Markdown. The figure is Figure 5 in the report (numbering list in `deliverable-7/README.md`); give `--figure 5` so its title says so |
| `analysis/test.js` | 230 checks against hand-computed values, for both tools. Run `node deliverable-6/analysis/test.js` from the repo root. Result on 26 Oct: 230 passed, 0 failed. The PNG render check is skipped when no Chrome or Edge is found |
| `analysis/sample-*.csv` | **FAKE** data (invented reads, answers and tools) so you can see the output. Labelled FAKE inside each file and in the tool's banner |
| `analysis/templates/*.csv` | Header-only files to copy into `deliverable-6/data/` and fill: the nine SE files from plan section 3, plus two optional D1 files for Table F |
| `data/` | The blank SE files (set up 21 Oct) and the two D1 files for Table F (copied 26 Oct from `deliverable-1/heuristic-coding-sheet.md` section 5: 61 problems, 28 task outcomes) |

## What the tool reports

Raw counts first, every time. No percentage without its count. No p-values. It shows what the page holds and where it fails.

- **Table A. Fidelity (SE1).** Per week and version: rows hand-checked, S / C / U by Raphael's hand, whether the A2 rule is met (none contradicted and 90% supported), and agreement with each AI scorer as x of n rows both scored.
- **Table B. Ten needs by read (SE2).** A 10 x 4 grid (needs x reads RX-A1, RX-B2, RY-B1, RY-A2) of C / PC / W / NA, beside the key's R/U class and what the git log could answer per week. Under it, per read: correct answers out of the needs answered, answers that needed Version B, and wrong answers by cause (misread, overclaim, page-wrong).
- **Table C. Key against observed (SQ1).** First reads only. The observed class per need by the rule fixed in plan section 6 (N: page gave N, or the answer is W or NA; D: page gave F and the answer is C; P: any other mix). Agreement per week as x of n for key against observed, key against log, and log against observed, with Cohen's kappa beside each as indicative only. Over-claims (page F, answer W) are listed.
- **Table D. Items (SQ2), if items exist.** Item scores per read, item 6 code, the 1-5 total out of 10 on a full read, and specificity ticks on items 4 and 5.
- **Figure data.** Minutes per read and need answers counted by confidence (1 to 5) and git-log result, with the count of wrong answers at confidence 4 or 5. `figures.js` draws it.
- **Table E. Walkthrough (SE3).** Per task CW1 to CW5: steps, N answers per question Q1 to Q4, steps failing, failure stories by severity.
- **Table F. Heuristic problems (SE4).** ChangeLens problems by severity and by primary heuristic, beside the D1 tools when `--d1` is given (each D1 cell shows how many of its findings Raphael has checked); T1 to T7 outcomes for ChangeLens and the D1 tools.
- **Table G. Needs log.** Entries by Ko et al. (2007) type (final code, else pass 1), per read; pass 1 against pass 2 as x of n only. No kappa: with a handful of re-coded lines and 24 codes it would mean nothing.
- **Table H. Ratings and stand-up.** Per read: date, `seen_before`, minutes, the three ratings and why; stand-up claims S / C / U on first reads.
- **Scoring check (not used).** There is no second scorer (26 Oct). The check runs only if a second-scorer file with data rows is given; a header-only file prints nothing.

First reads (RX-A1, RY-B1) are compared only with each other. Second reads record change only. The tool never adds first and second reads together, and its notes say that the A-against-B comparison mixes version with week.

Data checks. Every row is checked and anything odd is named with its line: a read_id that is not one of the four (`rx a1` and `RXA1` read as RX-A1), a week, version or read order that does not match the read_id, a need_id not among the ten (`n1` reads as N01), a value outside its allowed set, a duplicate row (left out until fixed), a W with no cause or a cause on an answer that is not W, a key class that differs between rows of one need, a log class that differs between the two reads of one week, a change code or stand-up count on the wrong read, an `agree_with_ai` that does not match the verdicts, an N in the walkthrough with no failure story or severity, a needs-log participant that is not `SELF`, and a code not in the codebook. Rows of commas only (as Excel writes) are dropped.

Quotes in notes. A double quote starts a quoted cell only when it is the first character of the cell, so a stray quote inside a note is kept as written. A note that holds a comma must be quoted as a whole. The tool warns when a quote is never closed and when a row has more filled cells than the header.

## CSV formats

The columns are exact copies of plan section 3. Each template starts with `#` lines saying what goes in each column; lines starting with `#` are ignored.

| File | Columns | Notes |
|---|---|---|
| se1-fidelity-handcheck | `week, version, row, raphael_verdict, ai_scorer1_verdict, ai_scorer2_verdict, ai_rescore_verdict, agree_with_ai, minutes, note` | week `W1-2021-02-08`, `W2-2021-07-19`, `RX-2020-12-14`, `RY-2021-09-27`. Verdicts S, C or U; blank where that scorer did not score the row. `ai_rescore_verdict` is the third scorer on February B rows 19, 21, 22, 23, 27, 33 only |
| se2-reads | `read_id, date, week, version, read_order, seen_before, start_time, end_time, minutes_items, minutes_needs, minutes_standup, ease_1to5, useful_1to5, would_send_1to5, rating_why, standup_S, standup_C, standup_U, interruptions, note` | One row per read. Minutes are the sum of the three minute columns, or end minus start (HH:MM) when they are blank. Stand-up columns on first reads only |
| se2-need-answers | `read_id, week, version, read_order, need_id, page_gave_fpn, confidence_1to5, seconds, changed_on_second_read, gitlog_result, error_cause, only_in_b, key_ru_class, record_could_answer, scored_date, note` | need_id N01, N03, N07, N08, N09, N12, N17, N19, N25, N26. `key_ru_class` from the key accepted before SE2 (plan section 5), the same on every row of a need. `record_could_answer` from the git log by hand, the same on both reads of a week |
| se2-item-scores | `read_id, week, version, read_order, item, level, confidence_1to5, seconds, changed_on_second_read, score, specific, scored_date` | The reserve items exist (`0d3f811`). Items 1 to 5 score 0, 1 or 2; item 6 Pass, Hedged or Over-claim |
| se2-needs-log | `segment_id, participant, timestamp, report_condition, quote_note, pass1_code, pass1_date, pass2_code, pass2_date, final_code, resolution_rule` | The `deliverable-5/think-aloud-coding-sheet.csv` layout, so `deliverable-5/recode-sample.js` draws and merges the blind quarter on it unchanged (checked on the FAKE sample, 17 Oct). participant `SELF`; report_condition the read_id; one code per entry from the codebook (21 Ko et al. types, `none`, `other`, `unclear`) |
| se2-second-scorer | `read_id, kind, id, score, scorer, scored_date` | Not used (26 Oct): no second scorer. The blank file stays; leave it blank |
| se3-walkthrough | `task_id, step_no, correct_action, q1_right_effect, q2_notice_action, q3_associate_action, q4_see_progress, failure_story, severity_0to4, heuristic_link, fix_idea` | task CW1 to CW5; q1 to q4 Y or N |
| se4-heuristic-problems | `id, heuristic, task_location, problem, severity_0to4, screenshot_file, cross_check_yn, se3_link` | id CL-01 upward; heuristic H1 to H10 |
| se4-task-outcomes | `task, completed, seconds, looked_first, note` | task T1 to T7; completed Y, partly or N (D1's values) |
| d1-problems (optional) | `tool, id, heuristic, severity_0to4, raphael_checked_yn` | Copied from `deliverable-1/heuristic-coding-sheet.md` section 5 (26 Oct; 61 rows, matching its section 6 totals). Primary heuristic and severity as written, not recoded. `y` only for a finding Raphael has repeated by hand; the column is blank until he does |
| d1-task-outcomes (optional) | `tool, task, completed` | From the same file, section 5 (28 rows). Five values are not Y, partly or N (`N (not tested)`, `Y / partly`); they are kept as written and flagged in the file's header for Raphael |

## Run it

```
node deliverable-6/analysis/test.js                       # check the tool
node deliverable-6/analysis/analyse.js                    # demo on FAKE sample data
node deliverable-6/analysis/analyse.js --se1 deliverable-6/data/se1-fidelity-handcheck.csv --reads deliverable-6/data/se2-reads.csv --needs deliverable-6/data/se2-need-answers.csv --items deliverable-6/data/se2-item-scores.csv --log deliverable-6/data/se2-needs-log.csv --walk deliverable-6/data/se3-walkthrough.csv --heur deliverable-6/data/se4-heuristic-problems.csv --tasks deliverable-6/data/se4-task-outcomes.csv --out deliverable-6/data/analysis-output.md
node deliverable-6/analysis/figures.js                    # demo figure data and tables on FAKE sample data
node deliverable-6/analysis/figures.js --reads deliverable-6/data/se2-reads.csv --needs deliverable-6/data/se2-need-answers.csv --log deliverable-6/data/se2-needs-log.csv --heur deliverable-6/data/se4-heuristic-problems.csv --tasks deliverable-6/data/se4-task-outcomes.csv --outdir deliverable-6/data/figures --figure 5
```

Optional, only once the D1 files exist in `data/` (they do from 26 Oct): add `--d1 deliverable-6/data/d1-problems.csv --d1tasks deliverable-6/data/d1-task-outcomes.csv` to either `analyse.js` or `figures.js` above to put the D1 tools beside ChangeLens in Table F.

Any input may be left out; its table is skipped. A file that is named but not found is skipped with a `WARNING` line instead of stopping the run. `--scorer2` is not used: there is no second scorer (26 Oct).

`--figure N` sets the figure's number in its title and in `tables.md` (default 1). The report-wide list in `deliverable-7/README.md` makes it Figure 5, after the code-share chart (Figure 1) and the three video stills. If that list changes, change the number here too. `figures.js` writes `figure-time-confidence.svg`, `figure-time-confidence.png` and `tables.md` into `--outdir`. The PNG (twice the SVG size) is for the Word builder `build-docx-v2.js`, which embeds PNG or JPG only. It is made by an installed Chrome or Edge in headless mode, so the tool still needs no npm package. If no browser is found, the tool says so and writes the SVG only: set `CHROME_PATH` to `chrome.exe` or `msedge.exe`, or add `--png no` to skip the PNG. Output built from any `sample-*.csv` file is stamped FAKE in the image and the tables, and its file names start with `FAKE-`.

The reader-study version of these tools (paired differences across readers, the five-reader floor, counterbalanced sequences, kappa per reader) is in the git history before 17 Oct 2026. It is not used.

## What Raphael must do

Dates follow the 26 Oct schedule (targets; plan section 4 keeps the 17 Oct table as the record).

1. Read and approve the plan, including the D3 and D4 change lists in its section 11. While checking D3 and D4, skip `study/reserve/` on both branches.
2. Before SE2: the ten-need key, the marking rule and `key_ru_class` were filled in plan section 5 on 21 Oct (`8fb989c`), and the pre-SE2 answers were recorded there on 26 Oct (`9a12294`). Until you accept the key, do not call it your own.
3. SE2 (Tue 27 Oct): one sitting per reserve week, in the fixed order (RX: A then B; RY: B then A). Write answers, confidence, lap times, the stand-up draft, the needs log and the three ratings, and commit them before opening the git log. Copy the templates from `analysis/templates/` into `deliverable-6/data/` (the same headers as `deliverable-5/solo/logs/`; the run sheets are in `deliverable-5/solo/`).
4. Score SE2 against the git log (Wed 28 Oct): every need answer C, PC, W or NA, a cause for each W, `record_could_answer` from the git log by hand, `only_in_b`, and the stand-up claims. Code the needs log (pass 1). There is no second scorer; leave `se2-second-scorer.csv` blank.
5. SE1 (Thu 29 Oct): hand-check every Version B row in both study weeks and every row an AI scorer marked C, writing your verdict before opening any scored file. Reserve weeks only after SE2 is scored.
6. SE3 (Thu 29 Oct) and SE4 (Fri 30 Oct): walkthrough first, then heuristics. Write the persona in `deliverable-6/data/se3-persona.md` before judging any step. SE3 uses the July study week and SE4 the February one, which D1 seeded every tool with. Never use a reserve week. For Table F, the D1 rows are already in `d1-problems.csv` and `d1-task-outcomes.csv`: put `y` in `raphael_checked_yn` for each finding you have repeated by hand, and choose Y, partly or N for the five task values flagged in that file's header, or leave them as written.
7. Needs-log pass 2 on the blind quarter ([date: not in the 26 Oct schedule; before the Sat 31 analysis]) with `deliverable-5/recode-sample.js`; write the seed and sample size in the diary and Appendix D.
8. Run both tools on the real files (Sat 31 Oct), paste the `analyse.js` output into Appendix E, check the tables against the CSVs, and write the Results and Discussion in your own words from them. Write the opening answer last.
9. Keep the claims modest: raw counts first; the design stated once, in Method (Raphael's 21 Oct rule; the limits stay in plan section 7, not in the report). Never call it a user study.
10. Method, Ethics row: points 1 and 2 of `deliverable-3/ethics/report-ethics-points.md` no longer apply (no participants); say so in one sentence. Points 3 to 5 still apply. Point 4: check SS3D's licence in `study/SOURCE-AND-LICENCE.md` on `deliverable-2-changelens`, and decide whether the contributor email addresses in `study/*/export/log.txt` should stay in the repository before markers see it.
11. Disclose AI use in Method and the GenAI statement: the AI fidelity scorers, the AI-drafted ten-need key, the AI-written reserve items and keys, the plan, and both tools here, including the D1 rows copied for Table F. Say that you accepted or changed the keys, and give the date only once that is true.
12. Log SE1 to SE4 time in `deliverable-8/hours-entries.csv` against Deliverable 5.

## Not done on purpose

No results, no discussion prose, no reflections in your voice, and no invented values outside the files marked FAKE. The Evaluation text is yours.
