# Deliverable 5: Solo evaluation kit

Status (26 Oct 2026): run kit for the evaluation in plan section 3; nothing run yet, no data exists. Decision record: plan section 1.

A2 success measure (Deliverables table, row 5, 18 h, 4 in prac): **"Nine 45-minute sessions including the pilot (7 h); recruiting and briefing (4 h); six think-alouds coded from timestamped notes (7 h)."** Learning goals: Analyse; Evaluate. The solo evaluation replaces it. Report the change as an A2 variance (below).

## What is here

| File | What it is |
|---|---|
| `self-evaluation-plan.md` | The plan: decision, research question as now answerable, SE1 to SE4, schedule, scoring, limits, ethics, expected band, and the change lists for the other branches |
| `solo/` | The run kit: one run sheet per activity, the SE2 answer sheet, `how-to-score.md`, the dated schedule, and nine header-only logs in `solo/logs/` |
| `think-aloud-coding-sheet.md` | Ko et al.'s 21 information types, extra codes and the re-code procedure. Now codes the SE2 needs log (`participant` = `SELF`) |
| `think-aloud-coding-sheet.csv` | Header-only coding layout. The SE2 needs log uses the same columns |
| `recode-sample.js` | Draws a seeded blind quarter for the re-code after a week, merges pass 2 back in, and prints agreement as x of n. Tested by `recode-sample.test.js` on made-up sheets in a temp folder; no data kept |
| `retired/` | The A2 people-study kit (recruitment message, booking tracker, session checklist), kept as the A2 record. Not used |

## The four activities

| Id | Activity | What it gives | Run sheet |
|---|---|---|---|
| SE1 | Fidelity hand-check | Is the page true? (utility: accuracy) | `solo/se1-run-sheet.md` |
| SE2 | Timed self-read of the two unseen reserve weeks, A and B | Which needs a page answers, checked against the git log (SQ1, SQ2); time, confidence and ratings | `solo/se2-run-sheet.md` |
| SE3 | Cognitive walkthrough of the Producer Page window | Where a first-time user would get lost (usability) | `solo/se3-task-card.md` |
| SE4 | Heuristic evaluation on the D1 scale | ChangeLens beside the four D1 tools (usability) | `solo/se4-run-sheet.md` |

## Schedule

The live schedule is in `solo/README.md`, "Revised schedule (26 Oct 2026)": SE2 Tue 27 Oct; SE2 scoring and needs-log pass 1 Wed 28; SE1 and SE3 Thu 29; SE4 Fri 30; scoring and analysis finished Sat 31; needs-log pass 2 [date per Raphael's decision]. The 17 Oct table (plan section 4) and the 21 Oct table stay in `solo/README.md` as the record. A3 is due Sun 8 Nov.

## What Raphael must do

1. Finish your D3 and D4 checks today. Skip `study/reserve/` on both branches. *(26 Oct: no commit records these checks. [Raphael to confirm: done or not].)*
2. Read and approve the plan, including the D3 and D4 change lists (plan section 11) and the per-branch list (section 12). Say by Mon 19 Oct whether the sealed reserve items go ahead; without them, SE2 runs on the ten needs alone. *(26 Oct: the sealed reserve items went ahead (`0d3f811`, 21 Oct). Approval of plan sections 11 and 12 is still open; section 11 is requested by Wed 28 Oct.)*
3. Fill plan section 5 and commit it before Tue 20 Oct. *(Done: filled and committed 21 Oct, `8fb989c`. Rule 2, confirmed by Raphael 26 Oct.)*
4. Run SE2, SE1, SE3 and SE4 in that order with the run sheets in `solo/`. Copy the logs from `solo/logs/` into `deliverable-6/data/` first, and fill them there.
5. Score with `solo/how-to-score.md`. Code the needs log yourself in two passes a week apart. The coding is your analysis; I have not coded anything.
6. Log your hours against Deliverable 5 in `deliverable-8/hours-entries.csv`, and total them weekly in `deliverable-8/hours-log.csv` (both on `deliverable-8-dev-diary`).

## Link to the A2 success measure

A2 planned nine sessions (pilot plus eight other people), 4 hours of arranging and briefing them and six coded think-alouds, 18 hours in all. None of these happen. The solo evaluation keeps the A2 instruments one person can use: the ten-need sheet, the Endsley item slot plan, the stand-up draft, the Ko et al. codebook with its re-code after a week, the fidelity check and the D1 heuristic method. It uses about 6.5 of the 18 hours. Report this in the D9 variance table with a pointer to the one Method sentence, not as time saved. The Method section states every change in its Deviations row.
