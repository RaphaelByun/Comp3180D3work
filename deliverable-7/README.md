# Deliverable 7: Portfolio video

Status (17 Oct 2026, Week 10): plan only, committed on this branch. Nothing is recorded or uploaded.

A2 success measure (Deliverables table, row 7, 4 h, 1 in prac): **"Three to four minutes showing both conditions; two outside viewers can state its purpose and reader."** A2 timeline: analysis and video in Week 13.

**17 Oct 2026 decision.** There is no study with other people: no recruitment, no live sessions, no online form. Raphael evaluates ChangeLens himself. The plan is `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions`. For this folder that means:
- The video never claims a reader study. Its result beat shows the solo evaluation, with "one reader, the developer" on screen.
- The two-viewer test is retired (`retired/feedback-form.md`). That half of the A2 measure is a variance.

**The video is uploaded to Echo 360, not to this repo** (LFS limits; the unit asks for Echo 360). The repo keeps the plan. Link the Echo 360 video in the submission text box and in the report's Project Deliverables section; check the link in a private window.

## What is here

| File | What it is |
|---|---|
| `storyboard.md` | Nine beats with timings, what the viewer must understand, what is on screen, repo sources, cut order, rules. Covers the reader, the problem, the tool, both report conditions, a result slot and your own contribution |
| `shot-list.md` | Eleven shots to capture, audio and edit checklist, export and upload steps, hour budget |
| `retired/feedback-form.md` | Not used (17 Oct 2026 decision). The A2 two-viewer test, kept as the plan record. Do not run it, and do not give it a report appendix |

## Success measure after the 17 Oct decision

The first half of the A2 measure still holds and you can check it alone: three to four minutes, both conditions on screen.

The second half ("two outside viewers can state its purpose and reader") needs other people, so it is dropped. Report it as a variance in the A3 report and in the Deliverable 9 variance table, with the 17 Oct decision as the reason. That is the plan's default (section 12, D7 item 3); keeping it is your call.

Optional self-check in its place. It is not the same measure, so do not report it as one:
1. Wait at least a day after the rough cut, then watch it once without pausing.
2. Write down where the video first states its purpose and where it first names its reader (time stamps).
3. Check both against the retired form's marking key, questions 1 and 2. The purpose must say why, not only "a Unity tool". The reader must be a producer or someone who does not code.
4. Check that both versions are on screen long enough to read one row each (at least 6 seconds).

## The result slot

Beat 6 is a placeholder until the solo analysis is done (plan section 4: scoring and analysis finished Fri 30 Oct). It must hold a real SE2 table or the time-and-confidence figure from the Deliverable 6 analysis, with raw counts ("x of 10 needs") and two lines on screen: "one reader, the developer" and the limits line. Never "x of n readers", "participants" or "users". No result is written anywhere in this folder.

## What Raphael must do

1. Capture the screens (shot list) in Week 12 so the rough cut exists before the results.
2. Write and record the narration yourself in your own words.
3. Re-record beat 6 once the solo analysis is done (after Fri 30 Oct).
4. Run the self-check above on the rough cut, if you want it, and fix what it finds.
5. Upload to Echo 360 at least a day before 8 Nov 2026 and put the link in both places.
6. Log hours in `deliverable-8/hours-entries.csv`; the weekly total goes into `deliverable-8/hours-log.csv` (A2 budget 4 h, 1 in prac).

## Check against the unit's calibration

Staff pointed to the Echo 360 folder of past portfolio videos, and two transcripts of past portfolio videos are in the A3 assignment folder on Raphael's PC, outside this repository. Watch one or two before cutting so the length and depth match what past students did.

## Where the sources sit

The study reports (`study/week1-2021-02-08/report-A-baseline.md` and `report-B-treatment.md`) and the Producer Page (`Window > ChangeLens Producer Page`, with its Version A / Version B flip; see `TRY-CHANGELENS.md`) are on the Deliverable 2 branch (`deliverable-2-changelens`), not on `main`. Record beats 3 to 5 from that branch. The A2 Figure 2 docked window is the older file-sorting prototype; do not use it for beat 3. Figures are in `figures/` on `main`: Figure 1 in A2 (code share) is `fig4-code-file-percentage.png`; the A2 Figure 2 (docked window) and Figure 3 (prefab hunk) are `fig2-changelens-docked-2021.png` and `fig3-prefab-yaml-hunk.png`. File numbers differ from the A2 figure numbers.

## Figure and table numbers in the A3 report

The video stills are reused in the report, and the D6 figure tool also calls its plot "Figure 1". To avoid two figures with one number, use one list for the whole report. This is a proposal in order of first mention. Change it if the report's order changes, and keep the storyboard stills list in step.

| Number | What | Source |
|---|---|---|
| Figure 1 | Code share of changed-file entries, six Unity repositories | `figures/fig4-code-file-percentage.png` on `main` (A2 Figure 1) |
| Figure 2 | The ChangeLens Producer Page in the Unity Editor | New capture, still 2 |
| Figure 3 | Version A (baseline), "Where the work went" table | New capture, still 3 |
| Figure 4 | Version B (treatment), a naming section | New capture, still 4 |
| Figure 5 | Paired differences per reader | `deliverable-6/analysis/figures.js` (Deliverable 6 branch). It titles the plot "Figure 1" and writes `figure-1-paired-differences.*`; renumber there or in the caption |
| Tables 1, 2, 2b, 3 | Ten needs; full marks by condition and week; item 6 codes; think-aloud segments | `figures.js` as now. No other tables are planned, so these numbers stand |

If a figure is dropped, renumber the rest in order and update this list.
