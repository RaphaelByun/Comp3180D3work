# Deliverable 9: Reflection report (all four goals)

Status (17 Oct 2026, Week 10): skeleton, prompts and a variance-table helper ready and committed on `deliverable-9-reflection`. **No reflection has been written.** Updated 17 Oct for the solo evaluation: there is no study with other people, and the evidence for the goals that needed reader data now comes from SE1 to SE4 in `deliverable-5/self-evaluation-plan.md` (on `deliverable-5-sessions`).

A2 success measure (Deliverables table, row 9, 2 h, 0 in prac): **"All four goals evidenced; hour variances explained."** This feeds the A3 Learning Reflection (about 500 words, 15% of A3 is Reflection).

## What is here

| File | What it is |
|---|---|
| `reflection-skeleton.md` | The four A2 learning goals quoted exactly, an evidence checklist per goal, the hour-variance table (planned from A2, actual blank, "why" column), the transferable-skills worksheet for the marker's note, per-goal and self-directed-learning prompts, a word budget and a submit checklist |
| `variance-table.js` | `node deliverable-9/variance-table.js deliverable-8/hours-log.csv` builds the variance table from your hours log (planned, actual, difference, an "explain" flag at 2 hours or 25%). It never writes the "why". Rows 3, 5 and 6 are marked † as A2-plan changes (17 Oct 2026), with the sources to draw on printed under the table |

## Two things to know now

1. **Two goal measures are diary entries.** Understand needs "a diary entry stating each mechanism unaided, with its source and a breakdown it predicts", and Create needs "a diary entry, written against an unfamiliar Unity week, tying each layout decision to a named reader need". Without those entries the goals are not evidenced, so they have to be written in the diary (Deliverable 8), in your own words, on the day. A reserve study week (14 Dec 2020 or 27 Sep 2021) is a good unfamiliar week for the Create entry, but **only after SE2**: the reserve weeks are SE2's unseen weeks, so write the entry the same day, straight after your SE2 first read of that week. Do not open a reserve page before then.
2. **The A2 marker's note:** restate the Understand and Evaluate goals as transferable skills in the A3 Learning Reflection and Industry Relevance sections. The worksheet in section 3 of the skeleton does this; the "options" column is only a starting point.

## What Raphael must do

1. Keep `deliverable-8/hours-log.csv` current from now on. The variance table is only as honest as the log.
2. Write the two evidence diary entries above (suggested: the Understand one when you next re-read Dourish and Bellotti, Whitson and Stray; the Create one on a reserve week, the same day as your SE2 first read of it, not before).
3. In Week 13: run `variance-table.js`, paste the table, write each "why" yourself, then write the reflection from the prompts. Stay near 500 words.
4. For Deliverable 1, state two A2-plan variances in the reflection: the interviews were replaced by six coded published sources (so the Apply and Analyse measure reads "inspection and the published sources"), and A2's 600 minutes for D1 became AI work plus your checking (about 177 minutes budgeted for your own checking on 17 Oct, about 208 on the check pack's estimate; log the minutes you really spend). Give time as the reason. The skeleton's section 2 and the Apply and Analyse prompts cover this.
5. State the 17 Oct 2026 evaluation change as an A2-plan variance in the reflection: no study with other people, a solo evaluation instead (D3 had no pilot; D5's 18 h of sessions became about 6.5 h of SE1 to SE4; D6's tables come from the solo CSVs). The "why" is yours. Your reasons that day are recorded in plan §1 as a source to draw on. The skeleton's section 2 sets this out. Describe the study as one reader, the developer.
6. Say plainly where a goal was only partly met and why. Staff mark the honest version higher than a tidy one.
7. Mention any AI help with the wording in the Statement on Generative AI use.
8. In Industry Relevance and Future Work, use point 3 of `deliverable-3/ethics/report-ethics-points.md`: a producer tool like ChangeLens could be used to monitor or blame developers, so it reports changes to the project, not people's output. That is a professional judgement worth naming for a producer or tools role.

## Link to the A2 success measure

"All four goals evidenced": the evidence checklist (section 1) lists, for each goal, the A2 measure, the deliverable that supplies it and a status cell. "Hour variances explained": the variance table with a why column (section 2).

## GenAI disclosure to carry into A3

Things the A3 Statement on Generative AI use must cover, noted here so they are not forgotten (write the statement in your own words):

- Commits in the repository are co-authored by Claude Code (the `Co-Authored-By` trailer).
- The February fidelity scoring and its re-score were done by AI scorers. A2 requires scoring "read by hand", so Raphael must verify those scores by hand and say so; the July scoring (PASS for A and B) needs the same check.
- Deliverable 1: Claude (Claude Code) ran the heuristic pass through Chrome on Raphael's accounts on 14 October 2026 and coded the 61 problems and their severities, as a single AI evaluator. It also coded the six published sources that replaced the interviews and drafted the reconciliation.
- Deliverable 1: on 15 October 2026 Claude verified the job ads, reviews and source quotes on the live pages, marked the 25 needs (75 marks), picked the three rejected-artefact cases and the top ten, and drafted the design spec. Every judgement is AI-drafted, pending Raphael's accept-or-change step; the statement must say which he checked and when.
- The Deliverable 1 starters (tool selection, coding sheet, scan, draft needs, spec outline, 12 October 2026) were drafted with Claude Code.
- Deliverable 2: the ChangeLens code and tests were written with Claude Code under Raphael's direction (see the commit trailers). Say how much of it you wrote or changed yourself.
- The Deliverable 3 to 9 starters (instruments, the A2 session kit, analysis tool, diary and reflection scaffolds) were drafted with Claude Code; Raphael must review them, and the data, diary entries, results and reflection text must be his own.
- The solo evaluation (17 Oct 2026, `deliverable-5/self-evaluation-plan.md` §8 point 5): the plan itself was drafted with Claude Code; the ten-need key is AI-drafted until you accept it; the reserve-week items and their sealed keys are AI-written (if you approve them); the optional SE2 second scorer and the reserve-week fidelity scorer are AI. The answers, scores, walkthrough and heuristic judgements are yours.
