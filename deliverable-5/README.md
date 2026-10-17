# Deliverable 5: Solo evaluation kit

Status (17 Oct 2026, Saturday of Week 10): **solo evaluation kit, ready to run.** On 17 Oct 2026 Raphael decided there is no study with other people: no recruitment, no live sessions, no online form. He evaluates ChangeLens himself. Nothing has been run and no data exists.

His reasons, in his words (17 Oct 2026): he doesn't want live testing, he has no time to arrange people, and testing it himself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well." He accepts that this likely caps the Evaluation criterion near a Pass (plan section 9).

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

## Schedule (plan section 4)

Dates are targets for Raphael. The full table with run sheets is in `solo/README.md`.

| Date | What | Minutes |
| --- | --- | ---: |
| Sat 17 Oct | Your D3 and D4 checks; skip `study/reserve/` in both. Approve the plan | – |
| Sun 18 Oct | Accept the ten-need key, choose the rule, fill `key_ru_class` (plan section 5). Commit | 15 |
| Mon 19 Oct | If approved: AI agent drafts the reserve items and sealed keys; D4 reserve checklists regenerated | – |
| Tue 20 Oct | SE2, week RX (A then B) | 45 |
| Wed 21 Oct | SE2, week RY (B then A) | 45 |
| Thu 22 Oct | SE2 scoring; needs-log pass 1; optional AI second scorer | 75 |
| Fri 23 Oct | SE1, February B rows and C verdicts | 45 |
| Sat 24 Oct | SE1, July B rows; reserve C verdicts | 45 |
| Mon 26 Oct | SE3 | 40 |
| Tue 27 Oct | SE4 | 50 |
| Wed 28 Oct | Spare. **All activities finished** | – |
| Thu 29 Oct | Needs-log pass 2, merge, agreement | 15 |
| Fri 30 Oct | **Scoring and analysis finished** | 20 |

About 6 hours 35 minutes. A3 is due Sun 8 Nov.

## What Raphael must do

1. Finish your D3 and D4 checks today. Skip `study/reserve/` on both branches.
2. Read and approve the plan, including the D3 and D4 change lists (plan section 11) and the per-branch list (section 12). Say by Mon 19 Oct whether the sealed reserve items go ahead; without them, SE2 runs on the ten needs alone.
3. Fill plan section 5 and commit it before Tue 20 Oct.
4. Run SE2, SE1, SE3 and SE4 in that order with the run sheets in `solo/`. Copy the logs from `solo/logs/` into `deliverable-6/data/` first, and fill them there.
5. Score with `solo/how-to-score.md`. Code the needs log yourself in two passes a week apart. The coding is your analysis; I have not coded anything.
6. Log your hours against Deliverable 5 in `deliverable-8/hours-entries.csv`, and total them weekly in `deliverable-8/hours-log.csv` (both on `deliverable-8-dev-diary`).

## Link to the A2 success measure

A2 planned nine sessions (pilot plus eight readers), 4 hours of recruiting and six coded think-alouds, 18 hours in all. None of these happen. The solo evaluation keeps the A2 instruments one reader can use: the ten-need sheet, the Endsley item slot plan, the stand-up draft, the Ko et al. codebook with its re-code after a week, the fidelity check and the D1 heuristic method. It uses about 6.5 of the 18 hours. Report this in the D9 variance table with the reason (the 17 Oct decision), not as time saved. The Method section states every change in its Deviations row.
