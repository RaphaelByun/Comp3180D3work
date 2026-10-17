# Deliverable 8: Development diary

Status (17 Oct 2026, Week 10): format, fact log and hours log ready and committed on this branch. **No diary entry exists and none has been written for you.** Week 9 and Week 10 drafts with brackets for you are in `diary-draft-weeks-9-10.md`.

Evaluation decision (17 Oct 2026, Raphael): no study with other people. You evaluate ChangeLens yourself (SE1 to SE4 in `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions`). The diary items below follow that plan.

A2 success measure (Deliverables table, row 8, 2 h, 0 in prac): **"A dated entry each week naming a roadblock or breakthrough."** The diary also carries most of the evidence for the R&D Engagement criterion (15% of A3), together with commit cadence and prac attendance.

## What is here

| File | What it is |
|---|---|
| `diary-template.md` | Rules, entry template (roadblock or breakthrough, hours by deliverable, prac, plan changes, tools, evidence links, next week), headed slots for the break and Weeks 9 to 13, a 10-minute weekly routine, and how to cut it to about 500 words for the report |
| `fact-log-weeks-1-8.md` | **Facts for Raphael to write from, not diary entries.** Weeks 1 to 8 (to A2): dated artefacts and paths, decisions with their source file, A1 and A2 dates and marks, prac attendance on record, and nine gaps the files cannot fill. Feeds the "Up to Week 8" summary |
| `fact-log-weeks-9-10.md` | **Facts for Raphael to write from, not diary entries.** Commit table (Sydney times), what each branch holds, file facts for Weeks 9 and 10 (including the 17 Oct evaluation decision and the reserve re-freeze at `d9fa4bf`), and seven gaps the files cannot fill |
| `diary-draft-weeks-9-10.md` | Week 9, Week 10 and break drafts from the fact log, with your answers so far. Everything in [brackets] is still yours to write |
| `hours-log.csv` | A2 budget per deliverable (hours and in-prac, totals 65 and 15), with empty actual, variance and why columns. Feeds the Deliverable 9 variance table |
| `hours-entries.csv` | Header-only running log: date, week, deliverable, hours, in-prac, what, evidence. Add up into `hours-log.csv` weekly with `sum-hours.js` |
| `sum-hours.js` | `node deliverable-8/sum-hours.js` prints actual hours and in-prac hours per deliverable from `hours-entries.csv`. Add `--write` to put them into `hours-log.csv`; it fills only the two actual columns and never the A2 or why columns. In `in_prac`, give hours, or yes (all of them) or no. Tests: `node deliverable-8/test.js` |

## What Raphael must do

1. Write the Week 9 and Week 10 entries this week in your own words, using the fact log as a prompt, and date them the day you write them. Say if an entry is written late.
2. Cover the mid-session break honestly. The files show no work between 21 Sep and 4 Oct. If you did some, add evidence; if not, say so.
3. Fill the gaps in section 5 of the fact log: prac attendance and who you spoke to, who did what with the AI tools, and the iLearn text of the A2 AI-disclosure comment. Do the same for section 5 of `fact-log-weeks-1-8.md` before you write the "up to Week 8" summary.
4. Log hours as you work (`hours-entries.csv`) and total them weekly into `hours-log.csv` (`node deliverable-8/sum-hours.js --write`). Do not tidy the numbers afterwards. Staff mark down variance with no explanation, not variance itself. Log SE1 to SE4 time against Deliverable 5. Its A2 name in `hours-log.csv` stays "Sessions run and coded"; explain the change in `variance_why` (the 17 Oct decision).
5. Write a dated entry for 17 Oct on the evaluation decision, in your own words. Your reasons as recorded that day are in section 4 of the fact log.
6. Commit the diary every week so the history shows the cadence.
7. In Week 13, cut the diary to about 500 words for the report (guide in the template); do not paste raw entries.

## Link to the A2 success measure

One dated entry per week with a named roadblock or breakthrough: six slots are waiting (break, Weeks 9 to 13), plus the single "up to Week 8" summary the report needs.

## Two entries the learning-goal measures need

The A2 measures for two goals are diary entries (see `deliverable-9/README.md`): an entry stating the structural, opacity and audience mechanisms unaided, each with its source and a breakdown it predicts (Understand); and an entry written against an unfamiliar Unity week that ties each report layout decision to a named reader need (Create). Write both in your own words, on the day, and tag them `[goal evidence]` in the heading so they are easy to link from the reflection.

The unfamiliar week for the Create entry is a reserve week. Write that entry on the same day as your SE2 first read of that week, straight after the read, and never before SE2: opening a reserve week early spoils it for SE2. The plan's target dates are Tue 20 Oct (14 Dec 2020 week) and Wed 21 Oct (27 Sep 2021 week).

## GenAI disclosure to carry into A3

Things the A3 Statement on Generative AI use must cover, noted here so they are not forgotten (write the statement in your own words):

- Commits in the repository are co-authored by Claude Code (the `Co-Authored-By` trailer).
- The February fidelity scoring and its re-score were done by AI scorers. A2 requires scoring "read by hand", so Raphael must verify those scores by hand and say so; the July scoring (PASS for A and B) needs the same check.
- The Deliverable 3 to 9 starters (instruments, session kits, analysis tool, diary and reflection scaffolds) were drafted with Claude Code; Raphael must review them, and the data, diary entries, results and reflection text must be his own.
- The solo evaluation plan (`deliverable-5/self-evaluation-plan.md`) was drafted with Claude Code. If used, also disclose the AI-drafted ten-need key, the AI-written reserve-week items and keys, and the optional AI second scorer for SE2.
- The Week 9 and Week 10 diary drafts were drafted with Claude Code from the commit record; say which parts you wrote.
