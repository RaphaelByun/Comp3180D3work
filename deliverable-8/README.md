# Deliverable 8: Development diary

> **Status at submission (Wed 11 Nov 2026).** The diary is [`DIARY.md`](DIARY.md). Claude Code compiled it on 11 Nov from the commit history and the dated drafts in this folder; the lines marked "In my words" are Raphael's own (17 Oct and 6 Nov) and are unchanged. The repository began on 11 Oct, so the diary was not kept week by week from Week 1. Hours: 4 of the 65 planned hours were logged (`hours-entries.csv`, totalled into `hours-log.csv`); no log was kept for the rest. The two goal-evidence entries described further down were not written. The rest of this file is the working record from October 2026 and is kept as history; where it disagrees with this block, this block is right.

Earlier status (28 Oct 2026, Week 12; current draft is now `diary-draft-v0.4.md`, hours rows in `hours-prefill-v0.2.csv`): format, fact logs, hours log and hours script committed on this branch. **No diary entry has been completed and none has been written for you.** The current draft, with brackets for you, is `diary-draft-v0.3.md`; v0.1 and v0.2 are kept as superseded records.

A2 success measure (Deliverables table, row 8, 2 h, 0 in prac): **"A dated entry each week naming a roadblock or breakthrough."** The diary also carries most of the evidence for the R&D Engagement criterion (15% of A3), together with commit cadence.

## What is here

| File | What it is |
|---|---|
| `DIARY.md` | **The development diary, final form (11 Nov 2026).** One entry per period from the mid-session break to the extension days, each naming a roadblock or breakthrough, with the commit for every fact, the commit record by day, and Raphael's own words where he wrote them |
| `diary-template.md` | Rules, entry template (roadblock or breakthrough, hours by deliverable, conversations, plan changes, tools, evidence links, next week), headed slots for the break and Weeks 9 to 13, a 10-minute weekly routine, and how to cut it to about 500 words for the report |
| `fact-log-weeks-1-8.md` | **Facts for Raphael to write from, not diary entries.** Weeks 1 to 8 (to A2): dated artefacts and paths, decisions with their source file, A1 and A2 dates and marks, and nine gaps the files cannot fill. Feeds the "Up to Week 8" summary |
| `fact-log-weeks-9-10.md` | **Facts for Raphael to write from, not diary entries.** Commit table (Sydney times), what each branch holds, file facts for Weeks 9 and 10 (including the decisions recorded that week), and seven gaps the files cannot fill |
| `diary-draft-weeks-9-10.md` | Week 9, Week 10 and break drafts from the fact log, with your answers so far. Everything in [brackets] is still yours to write |
| `diary-draft-v0.2.md` | Superseded by v0.3. 21 Oct update: break to Week 11 so far, facts only with commit hashes, your 17 Oct answers carried over word for word, empty Week 12 and 13 slots |
| `diary-draft-v0.4.md` | **Current draft (28 Oct).** v0.3 plus Week 12 facts to 28 Oct and the 207-commit recount. Facts only; brackets are yours |
| `commit-windows-v0.1.md` | First and last commit time per day (DRAFT). Not hours worked; a memory aid for the hours column |
| `hours-prefill-v0.2.csv` | v0.1 rows plus the 26 Oct 23:08 commits and 28 Oct work. Same columns and rules as `hours-prefill.csv` |
| `diary-draft-v0.3.md` | Superseded by v0.4 (26 Oct). Break to Week 11 closed with facts, Week 12 facts and plan, Week 13 slot; your 17 Oct answers carried over word for word. Drafted with Claude; completed by you |
| `hours-prefill.csv` | Draft rows (date, week, deliverable, what, evidence) from the commit record, with the hours and in-prac cells blank. Not read by `sum-hours.js`. To use a row: fill in its hours (and in-prac) yourself, edit the what text so it is true, then copy it into `hours-entries.csv`. Never copy a row with blank hours; `sum-hours.js` refuses it |
| `../CONTRIBUTIONS.md` | Draft contribution ledger at the repository root: per deliverable, what Claude did and what you did, with commits; `[to confirm]` cells are yours |
| `hours-log.csv` | A2 budget per deliverable (hours and in-prac, totals 65 and 15), with empty actual, variance and why columns. Feeds the Deliverable 9 variance table |
| `hours-entries.csv` | Header-only running log: date, week, deliverable, hours, in-prac, what, evidence. Add up into `hours-log.csv` weekly with `sum-hours.js` |
| `sum-hours.js` | `node deliverable-8/sum-hours.js` prints actual hours and in-prac hours per deliverable from `hours-entries.csv`. Add `--write` to put them into `hours-log.csv`; it fills the two actual columns and `variance_hours` (actual minus the A2 hours already in that file), blanks all three for a deliverable with no entries, and never touches the A2 columns, the why column or the total row. In `in_prac`, give hours, or yes (all of them) or no. Tests: `node deliverable-8/test.js` |

## What Raphael was asked to do (October working notes; mostly not done)

1. Write the Week 9 and Week 10 entries this week in your own words, using the fact log as a prompt, and date them the day you write them. Say if an entry is written late.
2. Cover the mid-session break honestly. The files show no work between 21 Sep and 4 Oct. If you did some, add evidence; if not, say so.
3. Fill the gaps in section 5 of the fact log: who you spoke to about the project, who did what with the AI tools, and the iLearn text of the A2 AI-disclosure comment. Do the same for section 5 of `fact-log-weeks-1-8.md` before you write the "up to Week 8" summary.
4. Log hours as you work (`hours-entries.csv`) and total them weekly into `hours-log.csv` (`node deliverable-8/sum-hours.js --write`). Do not tidy the numbers afterwards. Staff mark down variance with no explanation, not variance itself. Log evaluation-run time against Deliverable 5. Its A2 name in `hours-log.csv` stays "Sessions run and coded"; explain any change in `variance_why`, in your own words.
5. Commit the diary every week so the history shows the cadence.
6. In Week 13, cut the diary to about 500 words for the report (guide in the template); do not paste raw entries.

## Link to the A2 success measure

One dated entry per week with a named roadblock or breakthrough: six slots are waiting (break, Weeks 9 to 13), plus the single "up to Week 8" summary the report needs.

## Two entries the learning-goal measures need

The A2 measures for two goals are diary entries (see `deliverable-9/README.md`): an entry stating the structural, opacity and audience mechanisms unaided, each with its source and a breakdown it predicts (Understand); and an entry written against an unfamiliar Unity week that ties each report layout decision to a named reader need (Create). Write both in your own words, on the day, and tag them `[goal evidence]` in the heading so they are easy to link from the reflection.

The unfamiliar week for the Create entry is a reserve week. Write that entry on the same day as your SE2 first read of that week, straight after the read, and never before SE2: opening a reserve week early spoils it for SE2. Target date: SE2 Tue 27 Oct.

## GenAI disclosure to carry into A3

Things the A3 Statement on Generative AI use must cover, noted here so they are not forgotten (write the statement in your own words):

- Commits in the repository are co-authored by Claude Code (the `Co-Authored-By` trailer).
- The February fidelity scoring and its re-score were done by AI scorers. A2 requires scoring "read by hand", so Raphael must verify those scores by hand and say so; the July scoring (PASS for A and B) needs the same check.
- The Deliverable 3 to 9 starters (instruments, session kits, analysis tool, diary and reflection scaffolds) were drafted with Claude Code; Raphael must review them, and the data, diary entries, results and reflection text must be his own.
- The evaluation plan (`deliverable-5/self-evaluation-plan.md`) was drafted with Claude Code. If used, also disclose the AI-drafted ten-need key and the AI-written reserve-week items and keys.
- The diary drafts were drafted with Claude Code from the commit record: v0.1 (`adbbf58`), v0.2 and v0.3 (`bc5cde2`, `c1df9d2`); say which parts you wrote.
