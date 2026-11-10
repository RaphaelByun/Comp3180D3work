# Evaluation data (SE1 to SE4, and the D1 rows for Table F)

Set up 21 Oct 2026 by Claude Code so SE2 needs no setup on the day; updated 26 Oct 2026. Nothing here is a result: every SE file is blank apart from its header and `#` comment lines, which the analysis tools skip. The two D1 files hold rows copied from Deliverable 1, not SE results.

| File | Filled during |
|---|---|
| `se2-answers-RX-A.md`, `se2-answers-RX-B.md`, `se2-answers-RY-B.md`, `se2-answers-RY-A.md` | SE2 reads, in the fixed order RX-A1, RX-B2, RY-B1, RY-A2 (`deliverable-5/solo/se2-run-sheet.md`) |
| `se2-reads.csv`, `se2-need-answers.csv`, `se2-item-scores.csv`, `se2-needs-log.csv` | SE2 reads, then scoring |
| `se2-second-scorer.csv` | Not used (26 Oct): there is no second scorer. Leave it blank; a header-only file prints nothing |
| `se1-fidelity-handcheck.csv` | SE1 |
| `se3-walkthrough.csv` (plus `se3-persona.md`, which you write first) | SE3 |
| `se4-heuristic-problems.csv`, `se4-task-outcomes.csv` | SE4 |
| `d1-problems.csv`, `d1-task-outcomes.csv` | Copied 26 Oct from `deliverable-1/heuristic-coding-sheet.md` section 5 on `deliverable-1-ux-study` (61 problems, 28 task outcomes). AI-evaluator drafts, not recoded. You fill `raphael_checked_yn` (y for a finding you repeated by hand) and decide the five task values flagged in the header |

The headers match `deliverable-5/solo/logs/` and plan section 3. Run the analysis with the command in `../README.md` ("Run it"); add `--d1` and `--d1tasks` for Table F.
