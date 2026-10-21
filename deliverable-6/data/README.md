# Evaluation data (solo evaluation)

Set up 21 Oct 2026 by Claude Code so SE2 needs no setup on the day. Nothing here is a result: every file is blank apart from its header and `#` comment lines, which the analysis tools skip.

| File | Filled during |
|---|---|
| `se2-answers-RX-A.md`, `se2-answers-RX-B.md`, `se2-answers-RY-B.md`, `se2-answers-RY-A.md` | SE2 reads, in the fixed order RX-A1, RX-B2, RY-B1, RY-A2 (`deliverable-5/solo/se2-run-sheet.md`) |
| `se2-reads.csv`, `se2-need-answers.csv`, `se2-item-scores.csv`, `se2-needs-log.csv` | SE2 reads, then scoring |
| `se2-second-scorer.csv` | Optional AI second scorer, after your scoring |
| `se1-fidelity-handcheck.csv` | SE1 |
| `se3-walkthrough.csv` (plus `se3-persona.md`, which you write first) | SE3 |
| `se4-heuristic-problems.csv`, `se4-task-outcomes.csv` | SE4 |

The headers match `deliverable-5/solo/logs/` and plan section 3. Run the analysis with the command in `../README.md` ("Run it").
