# Solo evaluation run kit

Raphael decided on 17 Oct 2026 that there is no study with other people. He evaluates ChangeLens himself. The design, reasons and limits are in `../self-evaluation-plan.md`. This folder is the kit for running it: one run sheet per activity, blank logs, the dated schedule and how to score.

Nothing here has been run. Every blank is for Raphael. No result, time or score is filled in.

## What is here

| File | Use it for |
|---|---|
| `se1-run-sheet.md` | SE1, the fidelity hand-check |
| `se2-run-sheet.md` | SE2, the timed self-read of the two reserve weeks |
| `se2-answer-sheet-template.md` | One copy per SE2 read: items, ten needs, stand-up draft, ratings |
| `se3-task-card.md` | SE3, the cognitive walkthrough of the Producer Page window |
| `se4-run-sheet.md` | SE4, the heuristic evaluation on the D1 scale |
| `how-to-score.md` | Every scoring rule in one place, with the order to do it in |
| `logs/` | Header-only CSVs, one per log in plan section 3 |
| `logs.test.js` | Checks each CSV header matches the columns in the plan. Run: `node deliverable-5/solo/logs.test.js` |

## Where the data goes

The plan keeps the data in `deliverable-6/data/` on `deliverable-6-evaluation-report`. Copy each CSV from `logs/` there the first time, and fill it there. Do not fill the copies in this folder. The SE2 answer files go there too, as `se2-answers-<week>-<version>.md` (for example `se2-answers-RX-A.md`).

## Four rules for every activity

1. **Write before you check.** Commit your answers, verdicts and notes before you open a key, an AI verdict or the git log.
2. **Do not open the reserve weeks before SE2.** That is `study/reserve/` on every branch: the pages, the exports, the fidelity checklists and `naming.md`. It also means the reserve weeks in the Producer Page window. If you have opened any of them, write it in `seen_before`.
3. **Log your time** in `deliverable-8/hours-entries.csv` (on `deliverable-8-dev-diary`) against Deliverable 5.
4. **Never fill a cell you did not observe.** A blank stays blank.

## Revised schedule (21 Oct 2026)

SE2 did not run on 20 and 21 Oct. COMP3850 D4 (due Sat 24 Oct) comes first, so SE2 moved to **Sun 25 Oct, both weeks in one day** (two sittings with a break between). The order of reads and every rule are unchanged. These dates are targets, proposed by Claude on 21 Oct; the dated tables further down are the 17 Oct plan, kept as the record.

| Date | What | Minutes |
| --- | --- | ---: |
| Sun 25 Oct | SE2 sitting 1, week RX (A then B); break; sitting 2, week RY (B then A) | 100 |
| Mon 26 Oct | SE2 scoring against the git log, needs-log pass 1, optional AI second scorer; then SE1 February B rows and C verdicts | 75 + 45 |
| Tue 27 Oct | SE1 July B rows and reserve-week C verdicts; SE3 cognitive walkthrough | 45 + 40 |
| Wed 28 Oct | SE4 heuristic evaluation. **All activities finished** | 50 |
| Thu 29 Oct | Needs-log pass 2 on the blind quarter | 15 |
| Fri 30 Oct | **Scoring and analysis finished** | 20 |

`deliverable-6/data/` on `deliverable-6-evaluation-report` already holds the blank logs and the four answer sheets, so SE2 needs no setup beyond opening the pages.

## Schedule (plan section 4, 17 Oct)

Dates are targets. Move them if you need to, and keep the order.

| Date | What | Minutes | Run sheet |
| --- | --- | ---: | --- |
| Sat 17 Oct | Your D3 and D4 checks. Skip `study/reserve/` in both. Read and approve the plan and its change lists (sections 11 and 12) | – | – |
| Sun 18 Oct | Accept or change the ten-need key. Choose Rule 1 or Rule 2. Fill `key_ru_class` in plan section 5. Commit before SE2 | 15 | `how-to-score.md` step 0 |
| Mon 19 Oct | If approved: an AI agent drafts the reserve-week items and sealed keys, and the key hash goes in plan section 5. The D4 reserve checklists are regenerated from `d9fa4bf` (agent only; you do not open them) | – | – |
| Tue 20 Oct | SE2, week RX (A then B) | 45 | `se2-run-sheet.md` |
| Wed 21 Oct | SE2, week RY (B then A) | 45 | `se2-run-sheet.md` |
| Thu 22 Oct | SE2 scoring against the git log. Needs-log pass 1. The AI second scorer runs (optional) | 75 | `how-to-score.md` |
| Fri 23 Oct | SE1, February B rows (39) and C verdicts | 45 | `se1-run-sheet.md` |
| Sat 24 Oct | SE1, July B rows (28). Reserve-week C verdicts | 45 | `se1-run-sheet.md` |
| Mon 26 Oct | SE3 cognitive walkthrough | 40 | `se3-task-card.md` |
| Tue 27 Oct | SE4 heuristic evaluation | 50 | `se4-run-sheet.md` |
| Wed 28 Oct | Spare slot. **All activities finished** | – | – |
| Thu 29 Oct | Needs-log pass 2 on the blind quarter, merge, agreement | 15 | `../think-aloud-coding-sheet.md` |
| Fri 30 Oct | **Scoring and analysis finished.** Run the analysis and check each table against the CSVs | 20 | `how-to-score.md` |

About 6 hours 35 minutes in all. The Version A fidelity rows add about 20 minutes. If SE2 slips by a day, drop the Version A rows and the AI second scorer first. A3 is due Sun 8 Nov.

Why this order: SE2 comes first so nothing spoils the reserve weeks. SE3 comes before SE4 so the task-based pass is not shaped by a heuristic list.
