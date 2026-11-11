# Evaluation data (6 to 8 Nov 2026)

**Status at submission (Wed 11 Nov 2026).** This folder holds the data of the evaluation as it was run. Raphael read one unseen week (14 Dec 2020, coded `RX`) twice on 6 Nov 2026, Version A then Version B. The second unseen week (27 Sep 2021, coded `RY`) was not read, so its two answer sheets are blank. The fidelity check, the scoring, the walkthrough and the heuristic pass were run by Claude on 7 Nov at Raphael's request and were not repeated by hand.

| File | What it holds | Who |
|---|---|---|
| `se2-answers-RX-A.md`, `se2-answers-RX-B.md` | Raphael's answers to the ten needs and six question items for each version, with his confidence ratings, his stand-up draft (first read) and comments | Raphael, 6 Nov |
| `se2-reads.csv` | One row per read: times, his three 1 to 5 ratings and his reasons | Raphael, 6 Nov; stand-up counts added at scoring |
| `se2-answers-RY-A.md`, `se2-answers-RY-B.md` | Blank: the second unseen week was not read | |
| `key-reserve-2020-12-14.md` | The answer key for the unseen week. It was sealed outside the repository on 21 Oct and committed after the reads | AI-written, 21 Oct |
| `se2-need-answers.csv`, `se2-item-scores.csv` | The scores for his answers against the git record and the sealed key | Claude, 7 Nov (only scorer) |
| `se2-second-scorer.csv` | Header only: there was no second scorer | |
| `se2-needs-log.csv` | Header only: no needs were logged during the reads | |
| `se1-claude-check.csv` | The fidelity check: all 96 claims on the four study-week pages, each checked against its commit | Claude, 7 Nov |
| `se1-fidelity-handcheck.csv` | The 26-row sample drawn for a hand check. The verdict column is blank: the hand check was not done | Sample drawn 7 Nov |
| `se3-persona.md`, `se3-walkthrough.csv` | Cognitive walkthrough of five tasks in the Producer Page window (19 steps) | Claude, 7 Nov |
| `se4-heuristic-problems.csv`, `se4-task-outcomes.csv`, `se4-strengths.md` | Heuristic pass on ChangeLens: 24 problems, task outcomes and strengths | Claude, 7 Nov |
| `d1-problems.csv`, `d1-task-outcomes.csv` | Rows copied from Deliverable 1's heuristic pass on four tools (61 problems, 28 task outcomes), so ChangeLens can sit beside them in Table F. The `raphael_checked_yn` column is blank: he did not repeat the findings | Claude, 14 and 26 Oct |
| `analysis-output.md` | Tables B to H, generated from the files above | `../analysis/analyse.js`, 8 Nov |

The column headers match `deliverable-5/solo/logs/` and section 3 of the plan (`deliverable-5/self-evaluation-plan.md`). To rebuild the tables, use the command in `../README.md` ("Run it"); add `--d1` and `--d1tasks` for Table F.
