# Solo evaluation plan: ChangeLens

Status: **plan for Raphael to approve** (drafted 17 Oct 2026, Saturday of Week 10, with Claude Code). Nothing here has been run. No result, time, score or finding is written in this file. Every blank and every `[bracket]` is for Raphael.

This plan replaces the people study in `deliverable-3/session-protocol.md` and the session kit in this folder. It keeps as much of the A2 method as one reader can keep.

Revised 17 Oct 2026 after an adversarial review against the A3 spec and rubric, the A2 method, and the repo files named here (every path was checked on its branch).

## 1. Decision

**17 Oct 2026, decided by Raphael.** There is no study with other people: no recruitment, no live sessions, no online form. Raphael evaluates ChangeLens himself.

His reasons, in his words (17 Oct 2026): he doesn't want live testing, he has no time to arrange people, and testing it himself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well."

He was told this likely caps the Evaluation criterion near a Pass and accepted it (section 9).

What this changes in A2:
- The eight readers, the pilot, the six think-alouds and the counterbalanced sequences S1 to S4 are dropped.
- The A2 instruments stay where one reader can use them: the ten-need sheet, the Endsley item slot plan, the stand-up draft, the Ko et al. (2007) codebook, the re-code after a week, the fidelity check and the D1 heuristic method.
- The ten-need sheet is used as a different task. A2 had readers tick whether the records could answer each question. Here Raphael answers each question from the page (SE2).
- The stand-up task and the needs log lose their think-aloud: he writes them, alone, after reading.
- The fidelity hand-check starts with the Version B rows and the rows an AI scorer marked C, not every claim in both versions (SE1).
- The A3 report states every change as an A2 variance (Method, Deviations row).

## 2. Research question as now answerable

The A2 research question, verbatim:

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

A solo study cannot say what producers can do with the page. It can say what the page holds, checked against the record, for one careful reader. The two sub-questions become:

- **SQ1 (as now answerable).** For each of the ten needs on the ten-need sheet, does a ChangeLens page answer it fully, partly or not at all, when one reader answers from the page alone on two weeks he has not seen, and each answer is checked against the git log? This is compared with the derivability key in `deliverable-3/ten-need-sheet.md` section B, read for the repository (R) and Unity files (U) columns only, because ChangeLens reads no tracker. The key says what the records could answer. The page may show less than the records hold. So SE2 also records what the git log could answer by hand (`record_could_answer`). That separates a gap in the page from a gap in the key.
- **SQ2 (as now answerable).** On those two weeks, which answers did the scene and prefab names (Version B) add or change for that reader, and what did they cost in reading time?

What the design **can** support:
- Which of the ten needs a ChangeLens page can answer, checked against the git log (utility, in the sense of what the output can do).
- Whether the page is accurate (fidelity, SE1).
- Where the Producer Page window and the page break down against named methods (usability, SE3 and SE4).
- One reader's time, confidence and over-claims on unseen weeks (efficiency and a limited view of UX).
- One reader's satisfaction ratings after each read (ISO 9241-11 satisfaction, "for this reader" only).

What it **cannot** support:
- Any claim about producers or any other target reader. Raphael built the tool and is not its target audience.
- Any comparison of A and B that holds beyond one reader, and any test of significance.
- Reader-to-reader agreement on the ten-need sheet (A2's percentage agreement and kappa across readers). Only key-against-observed agreement for one reader is possible.
- Any satisfaction or attitude finding beyond one person's notes.

## 3. Activities

All paths are repository paths in `Comp3180D3work`. The branch is named where it matters. Data files go in `deliverable-6/data/` on `deliverable-6-evaluation-report`, as D6 already plans. The CSV columns below are exact; templates are a D6 change (section 12).

General rules for every activity:
- **Write before you check.** Answers, verdicts and walkthrough notes are written and committed before any key, AI verdict or git log is opened. The commit time is a record of order, not proof: one person controls the clock and the history. Say so in the report.
- **Do not open the reserve weeks before SE2.** That means `study/reserve/*/report-*.md`, `study/reserve/*/export/`, `study/reserve/*/fidelity-*.md`, `study/reserve/*/naming.md`, and the reserve weeks in the Producer Page window, **on every branch**. D2, D3 and D4 each hold a copy. D3 and D4 hold older Version B pages and the reserve fidelity checklists, whose claim rows describe the pages. While you check D3 and D4 today, skip `study/reserve/` in both. If you have opened any of them before, say so in `seen_before` (SE2), do not hide it.
- **"Unseen" means the page and the diffs.** A2 already gives commit counts and naming shares for both reserve weeks (3 changes on 14 Dec 2020, 2 on 27 Sep 2021). Say that in the report.
- **Log time** for each activity in `deliverable-8/hours-entries.csv` (on `deliverable-8-dev-diary`) against Deliverable 5.

### SE1. Fidelity check, hand-checked (utility: accuracy)

**Purpose.** Show that every page the evaluation uses tells the truth about the commits. A2: "every claim in both weeks' reports against each commit's diff, read by hand. It passes when none is contradicted and 90% are supported." This also covers ethics point 4 (real SS3D contributors' work reported accurately).

**Materials** (branch `deliverable-4-fidelity-check`):
- February: `study/week1-2021-02-08/FIDELITY-RESULT.md`, `fidelity-A-scored-scorer1.md`, `fidelity-A-scored-scorer2.md`, `fidelity-B-scored-scorer1.md`, `fidelity-B-scored-scorer2.md`, `fidelity-B-rescore-repaired-rows.md`, blank `fidelity-A.md`, `fidelity-B.md`.
- July: `study/week2-2021-07-19/fidelity-A-scored.md`, `fidelity-B-scored.md` (one scorer), blank `fidelity-A.md`, `fidelity-B.md`.
- Ground truth: `study/<week>/export/log.txt`, `export/assets.patch`, `export/guids.txt`, and `git show <hash>` in `prototype-data/SS3D` (clone command in `TRY-CHANGELENS.md` section 3).
- Reserve weeks, **only after SE2 is scored**: `study/reserve/2020-12-14/` and `study/reserve/2021-09-27/` checklists, regenerated from the pages frozen at `d9fa4bf` (D4 change, section 11).

**Steps.**
1. Print or open the blank checklist for the week and version. Do not open the scored files yet.
2. For each row, open the diff and mark S (supported), C (contradicted) or U (unclear) in `raphael_verdict`.
3. Minimum, as D4 asks: every Version B row in both study weeks (39 in February, 28 in July) and every row any AI scorer marked C. A2 promised every claim in both versions, so this minimum is a variance. Add the Version A rows (15 and 14) if time allows; record which rows you did, and say in the report if you stopped at the minimum.
4. Then open the scored files and copy each AI verdict into its column. Where you and an AI scorer differ, re-read the diff once and write the reason in `note`. Do not change `raphael_verdict` after step 4; a changed mind goes in `note`.
5. Reserve weeks (after SE2): an AI scorer scores the regenerated checklists; you hand-check every C verdict and every row that bears on an SE2 answer you got wrong.

**Logged in** `deliverable-6/data/se1-fidelity-handcheck.csv`:

`week,version,row,raphael_verdict,ai_scorer1_verdict,ai_scorer2_verdict,ai_rescore_verdict,agree_with_ai,minutes,note`

- `week`: `W1-2021-02-08`, `W2-2021-07-19`, `RX-2020-12-14`, `RY-2021-09-27`. `version`: `A` or `B`. `row`: the checklist row number.
- Verdicts: `S`, `C` or `U`; blank where that scorer did not score the row. `ai_rescore_verdict` is the third scorer on February B rows 19, 21, 22, 23, 27, 33 only.
- `agree_with_ai`: `y` if your verdict matches every AI verdict on the row, `n` otherwise.

**Time.** About 90 minutes (study weeks 80, reserve C verdicts 10). That is about a minute a row for 67 Version B rows. The 29 Version A rows add about 20 minutes.

### SE2. Timed self-read on the two unseen reserve weeks (utility, usability, UX)

**Purpose.** The core of the evaluation, and the closest one reader can get to A2's design. Raphael reads each reserve week in both versions, answers the ten producer needs and the six items from the page alone, then scores every answer against the git log. It answers SQ1 and SQ2 as restated in section 2.

**Design.** Two unseen weeks, both versions each, order switched between weeks. Fixed now, before either week is read:

| Week | Code | First read | Second read |
| --- | --- | --- | --- |
| 14 Dec 2020 | RX | A (baseline) | B (treatment) |
| 27 Sep 2021 | RY | B (treatment) | A (baseline) |

- The first read of each week is the clean read. The second read measures change only: what B adds after A (RX), and what is lost when only A is left (RY).
- **Order effect.** The second read of a week is never clean: you already know the week. So the A-against-B comparison is the two first reads (RX-A against RY-B), and that mixes version with week. Report both, and never add first and second reads together.
- **Familiarity bias.** You built ChangeLens, accepted the AI-drafted ten-need key, and know what the page can say.
- **Anchoring.** You will know the key's R and U classes before SE2, so they can pull your answers toward the key. Commit the key first, answer from the page, and take `record_could_answer` from the git log, not from the key.
- **Thin weeks.** The page headers say 14 Dec 2020 has 3 changes by 2 people and 27 Sep 2021 has 2 changes by 1 person. Needs about who did what, or about work that went quiet, have little to find in them. Say so. You will read it faster and more carefully than a producer would. The unseen weeks remove memory of the content, not knowledge of the tool.

**Materials.**
- Pages (branch `deliverable-2-changelens`, frozen by commit `d9fa4bf`, unchanged at `20eff9a`): `study/reserve/2020-12-14/report-A-baseline.md`, `study/reserve/2020-12-14/report-B-treatment.md`, `study/reserve/2021-09-27/report-A-baseline.md`, `study/reserve/2021-09-27/report-B-treatment.md`. Read the page only, in a Markdown preview or on paper, same font and size for A and B.
- Ten needs: `deliverable-3/ten-need-sheet.md` section A, the ten questions only (branch `deliverable-3-instruments`). The questions do not name a week, so the same ten serve both weeks. Ignore the sheet's tick boxes and "Which record?" column. Answer each question about the week, not about records in general. This is a different task from A2's, which asked whether the records could answer each question. Report it as a variance.
- Six items per reserve week: **only if the D3 change in section 11 is approved by Mon 19 Oct.** They follow the D3 slot plan (L1, L1, L2, L2, L3, unanswerable; Endsley, 1995) and the rules in `deliverable-3/answer-key-and-scoring.md`. An AI agent writes them from the pages; the question sheets go to you, the keys are sealed (below). Without them, SE2 runs on the ten needs alone.
- **Sealed keys.** The item keys are kept outside the repository until you have committed your answers. Their SHA-256 hash is written in this file's section 5 before SE2 starts. After scoring, the keys are committed and the hash is checked, which shows the key did not move.
- Ground truth for scoring: `study/reserve/<week>/export/log.txt`, `export/assets.patch`, `export/guids.txt`, and `git show <hash>` in `prototype-data/SS3D`.
- A phone stopwatch with laps. A confidence scale: 1 = a guess, 2 = unsure, 3 = fairly sure, 4 = sure, 5 = certain.

**Steps, per week (one sitting, about 45 minutes; A2 allowed 12 minutes a report for six items plus 6 for the sheet).**
1. Write the start time in `se2-reads.csv`. Open the first page only.
2. **Items** (if they exist): answer all six in `deliverable-6/data/se2-answers-<week>-<version>.md`, lap the stopwatch per item, and give a confidence per item. "The report doesn't say" is a valid answer.
3. **Ten needs**: for each need, write your answer from the page, tick what the page gave (`F` fully, `P` partly, `N` not), confidence, lap time. Same file.
4. **Stand-up draft** (first read only, 3 minutes): A2 had readers think aloud while drafting a stand-up update. Alone, there is no think-aloud. Write a two-minute stand-up update from the page in the same file, and report it as a variance.
5. **Needs log**: write each thing the page left you needing as its own line in `se2-needs-log.csv` (one line per need, with the clock time). These are coded later. They are typed notes, not spoken comments, so say that in the report.
6. **Ratings.** Before the git log, write three ratings from 1 (low) to 5 (high) for this read: `ease` (how easy the page was to read), `useful` (how useful it was for the ten needs), `would_send` (would you send this page to a team as it is). Add one line on why. These are one person's opinions.
7. Commit the answers file, the ratings and the log. **Do not open the git log yet.**
8. Five-minute break. Open the second version. For each item and need, mark only what changes: a new answer, a changed answer, or (RY) an answer the A page no longer supports. Lap times and confidence as before. Give the ratings again. Commit.

**Scoring (Thu 22 Oct, after both weeks, about 60 minutes: 64 answers to check against the git log).**
1. Open the sealed keys (if items exist) and check the hash. Score items 1 to 5 as 0, 1 or 2 and code item 6 Pass, Hedged or Over-claim, with `deliverable-3/answer-key-and-scoring.md`.
2. Score every need answer against the git log: `C` correct, `PC` partly correct, `W` wrong, `NA` left blank. Several needs (tasks finished, blocked work, risk, milestone, work left, what to tell a publisher) have no answer in a git log. For a need where the log holds nothing, "the page does not say" is a valid answer: score it `C` after you check the log has nothing, and score a specific answer `W` with cause `overclaim`. Also fill `record_could_answer` (`D`, `P` or `N`) from the git log by hand, not from the key. For each `W`, name the cause: `misread` (the page was right, you read it wrong), `overclaim` (the page did not say it), `page-wrong` (the page itself is wrong; carry it into SE1).
3. Mark `only_in_b` = `y` where the correct answer depends on a line only Version B has.
3a. Split the stand-up draft into separate claims and check each against the git log: `S` supported, `C` contradicted, `U` unclear. Write the counts in `se2-reads.csv`.
4. **Second scorer (optional, disclosed).** An AI agent scores the same answers blind to your scores, from the keys and the git log, into `se2-second-scorer.csv`. Report agreement as answers in agreement out of answers scored. Disclose it in the GenAI statement.

**Logged in** (`deliverable-6/data/`):

`se2-reads.csv`, one row per read:

`read_id,date,week,version,read_order,seen_before,start_time,end_time,minutes_items,minutes_needs,minutes_standup,ease_1to5,useful_1to5,would_send_1to5,rating_why,standup_S,standup_C,standup_U,interruptions,note`

- `read_id`: `RX-A1`, `RX-B2`, `RY-B1`, `RY-A2` (week, version, read order). `seen_before`: `y`, `n` or `unsure`.
- The three ratings are written before scoring. `minutes_standup` and the `standup_*` counts are filled on first reads only (blank on second reads).

`se2-item-scores.csv`, one row per item per read (only if items exist):

`read_id,week,version,read_order,item,level,confidence_1to5,seconds,changed_on_second_read,score,specific,scored_date`

- `item` 1 to 6. `level`: `L1`, `L2`, `L3` or `U`. `score`: 0, 1 or 2 for items 1 to 5; `Pass`, `Hedged` or `Over-claim` for item 6. `specific`: `y`/`n` for items 4 and 5, as in D3. `changed_on_second_read`: `new`, `changed`, `lost`, `same`, blank on a first read.

`se2-need-answers.csv`, one row per need per read:

`read_id,week,version,read_order,need_id,page_gave_fpn,confidence_1to5,seconds,changed_on_second_read,gitlog_result,error_cause,only_in_b,key_ru_class,record_could_answer,scored_date,note`

- `need_id`: N01, N03, N07, N08, N09, N12, N17, N19, N25, N26 (section B order). `page_gave_fpn`: `F`, `P`, `N`. `gitlog_result`: `C`, `PC`, `W`, `NA` (blank). `record_could_answer`: `D`, `P` or `N`, what the git log could answer by hand. `error_cause`: `misread`, `overclaim`, `page-wrong` or blank. `only_in_b`: `y`/`n`.
- `key_ru_class`: the best of the R and U columns in section B of the ten-need sheet, filled from the key you accept before SE2 (section 5), not after.

`se2-needs-log.csv`, the D5 coding layout unchanged (`deliverable-5/think-aloud-coding-sheet.csv`), so `deliverable-5/recode-sample.js` works on it:

`segment_id,participant,timestamp,report_condition,quote_note,pass1_code,pass1_date,pass2_code,pass2_date,final_code,resolution_rule`

- `participant`: `SELF`. `report_condition`: the `read_id`. Codes from `deliverable-5/think-aloud-coding-sheet.md` (Ko et al.'s 21 types, `none`, `other`, `unclear`). Pass 1 on Thu 22 Oct; pass 2 on the blind quarter on Thu 29 Oct. `recode-sample.js` skips only participant codes like `P01`, so `SELF` is kept. Expect only a few dozen lines; a quarter is a handful.

`se2-second-scorer.csv` (optional):

`read_id,kind,id,score,scorer,scored_date`

- `kind`: `item` or `need`. `id`: item number or need_id. `score`: same values as your column. `scorer`: the model name.

**Time.** About 150 minutes: two sittings of 45, scoring 60.

### SE3. Cognitive walkthrough of the Producer Page window (usability: learnability)

**Purpose.** Check whether a first-time user can do the producer tasks in `Window > ChangeLens Producer Page` without help. Method: the cognitive walkthrough (Wharton et al., 1994). It can be run with no participants, because it asks set questions about each correct step instead of watching users. It is usually run by a small group, and here the one evaluator designed the tool, so state both as limits. Read the Wharton et al. chapter for what it says about who should run it before you cite that point.

**Persona** (written before the walkthrough). Based on `deliverable-3/proxy-scenario.md`: a producer who has just joined a small Unity team, plans and tracks the work, does not write code, and has the team's Unity project installed only to run tools. State this persona in the report. Note the tension: the proxy scenario says a producer does not open Unity, but the window lives in the Unity Editor.

**Materials.** The Unity project `ChangeLens-proto` on `deliverable-2-changelens` (Unity 6000.4.10f1), `TRY-CHANGELENS.md`, `prototype-data/SS3D`, and the frozen study week `study/week2-2021-07-19`. **Do not use a reserve week here.**

**Tasks** (each with its correct action sequence written first, from the window, before any step is judged):

| Task | Goal for the persona | Week used |
| --- | --- | --- |
| CW1 | Make last week's page for the team's repository. | From repository, `prototype-data/SS3D`, week starting 2021-07-19, 7 days |
| CW2 | Find which scenes and prefabs changed this week. | Same page |
| CW3 | Reopen a week that was saved earlier. | Frozen study week, `study/week2-2021-07-19` |
| CW4 | Save this week's page to share with the team. | Same page |
| CW5 | Recover after typing the date in the wrong form. | From repository, date typed as 19/07/2021 |

**Steps.**
1. Write the persona in `deliverable-6/data/se3-persona.md` (the CSV has no persona column) and each task's correct action sequence in `se3-walkthrough.csv` (one row per step) before judging anything.
2. For each step, answer the four questions (Wharton et al., 1994) with `Y` or `N`:
   - Q1: Will the user try to achieve the right effect?
   - Q2: Will the user notice that the correct action is available?
   - Q3: Will the user associate the correct action with the effect they are trying to achieve?
   - Q4: If the correct action is performed, will the user see that progress is being made?
3. For every `N`, write a failure story: one or two plain sentences on why this user would fail here.
4. Rate each failure on the D1 severity scale (section SE4) and add a fix idea. Do not fix anything during the walkthrough.

**Logged in** `deliverable-6/data/se3-walkthrough.csv`:

`task_id,step_no,correct_action,q1_right_effect,q2_notice_action,q3_associate_action,q4_see_progress,failure_story,severity_0to4,heuristic_link,fix_idea`

- `task_id`: CW1 to CW5. `q1` to `q4`: `Y` or `N`. `heuristic_link`: an SE4 problem id (CL-nn) if the same problem is found there, else blank.

**Time.** About 40 minutes.

### SE4. Heuristic evaluation of ChangeLens on the D1 scale (usability)

**Purpose.** Put ChangeLens on the same heuristics, severity scale, tasks and seed week as the four tools in D1, so the report can set it beside Trello, HacknPlan, Jira and GitHub Projects. It is also the first heuristic pass Raphael runs by hand. That supports the Apply and Analyse goal only in part: the A2 measure for that goal is four tools coded plus one reconciliation of inspection against interviews, and the interviews were replaced by coded published sources (D1).

**Materials** (branch `deliverable-1-ux-study`): `deliverable-1/heuristic-coding-sheet.md` section 1 (Nielsen, 1994, H1 to H10), section 2 (the severity scale and "how the scale was applied"), section 4 (tasks T1 to T7). ChangeLens is run on the February study week, `study/week1-2021-02-08` (frozen study week mode), which is the week D1 seeded every tool with (section 3), and from repository on the same week. D1's severities are Claude's judgement, not yet all Raphael's. He is repeating the 16 severity 3 and 4 findings from `deliverable-1/CHECK-PACK.md`. Use D1 ratings in Table F only for the findings he has checked, and say which.

**Steps.**
1. Run T1 to T7 from D1 section 4 on ChangeLens, with the D1 time caps. Read each task aloud, start the timer, note where you looked first.
2. Where a task asks for something ChangeLens does not do by design (for example per-person output in T2, ethics point 3), record the task outcome and say "by design" in `note`. Do not code it as a problem unless the window or page misleads the user about it.
3. After the tasks, go through the window and both page versions once more, heuristic by heuristic, and code each problem: one primary heuristic, the secondary in the description.
4. Rate severity in one sitting, after all problems are listed, with the D1 rules unchanged.
5. List strengths and "none found" heuristics, as D1 does.

**Logged in** (`deliverable-6/data/`):

`se4-heuristic-problems.csv`: `id,heuristic,task_location,problem,severity_0to4,screenshot_file,cross_check_yn,se3_link`

- `id`: CL-01 upward. `heuristic`: H1 to H10. `se3_link`: the CW task and step if SE3 found the same problem.

`se4-task-outcomes.csv`: `task,completed,seconds,looked_first,note`

- `task`: T1 to T7. `completed`: `Y`, `partly` or `N` (D1's values).

**Time.** About 50 minutes.

## 4. Schedule

Today's own checks of D3 and D4 come first. Dates are targets for Raphael.

| Date | What | Minutes |
| --- | --- | ---: |
| Sat 17 Oct | Raphael's D3 and D4 checks (already planned); skip `study/reserve/` in both. Read and approve this plan and the change lists in sections 11 and 12 | – |
| Sun 18 Oct | Accept or change the ten-need key; choose Rule 1 or Rule 2; fill `key_ru_class` (section 5). Commit before SE2 | 15 |
| Mon 19 Oct | If approved: AI agent drafts the reserve-week items and sealed keys; the key hash goes in section 5. D4 reserve checklists regenerated from `d9fa4bf` (agent, not opened by Raphael) | – |
| Tue 20 Oct | SE2, week RX (A then B) | 45 |
| Wed 21 Oct | SE2, week RY (B then A) | 45 |
| Thu 22 Oct | SE2 scoring against the git log; needs-log pass 1 coding; AI second scorer runs | 75 |
| Fri 23 Oct | SE1, February B rows (39) and C verdicts | 45 |
| Sat 24 Oct | SE1, July B rows (28); reserve-week C verdicts | 45 |
| Mon 26 Oct | SE3 cognitive walkthrough | 40 |
| Tue 27 Oct | SE4 heuristic evaluation | 50 |
| Wed 28 Oct | Spare slot for anything that slipped. **All activities finished** | – |
| Thu 29 Oct | Needs-log pass 2 on the blind quarter (`recode-sample.js`), merge, agreement | 15 |
| Fri 30 Oct | **Scoring and analysis finished**: run the analysis, check tables against the CSVs | 20 |

Total about 6 hours 35 minutes, inside the A2 Deliverable 5 budget of 18 hours. The Version A fidelity rows would add about 20.

A3 is due Sun 8 Nov (the spec also gives 9 Nov for part of it; plan for 8 Nov). Everything after Fri 30 Oct is left for the work this table does not cover: fixes you choose after SE3 and SE4, the Evaluation section, the video, the diary and the reflection. That is 9 days. If SE2 slips by a day, drop the Version A fidelity rows and the optional AI second scorer first.

Why this order: SE2 comes before the reserve-week fidelity check and before any walkthrough, so nothing spoils the reserve weeks. SE3 comes before SE4 so the task-based pass is not shaped by a heuristic list.

## 5. Fixed before SE2 (fill and commit before Tue 20 Oct)

- Ten-need key accepted or changed by Raphael on: __________
- Rule chosen (Rule 1 or Rule 2), and why: __________ (the rule only changes the "Overall" columns, which include the tracker and a person; it does not change `key_ru_class`, so SE2 does not depend on it)
- `key_ru_class` per need (best of the R and U columns of the accepted key): N01 ___ N03 ___ N07 ___ N08 ___ N09 ___ N12 ___ N17 ___ N19 ___ N25 ___ N26 ___
- Reserve item keys, SHA-256: RX __________ RY __________ (or "no items")
- Reserve weeks opened before today? __________

## 6. Scoring and analysis

Raw counts first, every time. No percentage without its count beside it. No p-values. (A2 marker's note: percentages from 5 to 10 items are more precise than the sample supports.)

| Output | From | What it shows |
| --- | --- | --- |
| Table A. Fidelity | `se1-fidelity-handcheck.csv` | Per week and version: rows S / C / U by Raphael's hand; rows where he agrees with each AI scorer, as x of n |
| Table B. Ten needs by read | `se2-need-answers.csv` | A 10 × 4 grid (needs × reads RX-A1, RX-B2, RY-B1, RY-A2) of C / PC / W / NA, beside `key_ru_class` and `record_could_answer`. Under it: needs answered correctly per read (x of 10), answers that needed B (`only_in_b`), wrong answers by cause |
| Table C. Key against observed (SQ1) | Table B, first reads | For each need, the key's R/U class against what the page actually gave, checked against the git log. Observed class, fixed now: D = page gave `F` and the answer is `C`. P = the page gave `F` or `P` and the answer is `C` or `PC` (any other mix of these). N = the page gave `N`, or the answer is `W` or `NA`. A `W` after an `F` is also listed as an over-claim. Agreement as x of 10 per week, for key against observed, key against `record_could_answer`, and `record_could_answer` against observed. The last pair shows what the page lost from the records. Cohen's (1960) kappa only as indicative, beside the count; with 10 needs it is unstable |
| Table D. Items (SQ2), if items exist | `se2-item-scores.csv` | Item scores per read; item 6 code per read; specificity ticks |
| Figure. Time and confidence | `se2-reads.csv`, `se2-need-answers.csv` | Minutes per read (four bars), and confidence against `gitlog_result`, so high-confidence wrong answers show. Replaces the A2 paired-differences plot |
| Table E. Walkthrough | `se3-walkthrough.csv` | Steps per task; `N` answers by question (Q1 to Q4); failure stories by severity |
| Table F. Heuristic problems | `se4-heuristic-problems.csv`, `se4-task-outcomes.csv`, D1 tables | Problems by severity for ChangeLens beside the four D1 tools; T1 to T7 outcomes across five tools |
| Table G. What the page left unmet | `se2-needs-log.csv` | Entries by Ko et al. information type; pass 1 against pass 2 agreement as x of n only. With a handful of re-coded lines and 24 code options, kappa would mean nothing |
| Table H. Stand-up and ratings | `se2-reads.csv` | Per read: ease, useful and would_send ratings (one reader's opinion). First reads: stand-up claims S / C / U as counts |
| Scoring check | `se2-second-scorer.csv` | AI second scorer: answers in agreement out of answers scored |

How the outputs map to the rubric and the RQ:

| Activity | Utility | Usability | UX | RQ |
| --- | --- | --- | --- | --- |
| SE1 Fidelity | Is the page true? | – | – | Precondition: an answer from a wrong page is no answer |
| SE2 Self-read | Needs answered and correct (ISO 9241-11 effectiveness) | Time per read (efficiency); ratings (satisfaction, this reader only) | Confidence, over-claims, needs log, stand-up draft and its checked claims | SQ1 (Tables B, C) and SQ2 (Tables B, D) |
| SE3 Walkthrough | – | Learnability of the window | Where a first-time user would get lost | How the answers are reached, not which |
| SE4 Heuristics | Tasks T1 to T7 a producer tool is asked to do | Problems by heuristic and severity | Aesthetic and match-with-the-world findings | Places ChangeLens beside the tools D1 found wanting |

Usability here follows ISO 9241-11 (2018): effectiveness, efficiency and satisfaction for specified users. The study has one user who is not the specified user, so say "for this reader".

**Fit to the report.** The Evaluation section is about 1000 words: opening and target audience about 120, Method up to 200, Results and Discussion about 700. The template guide treats the Evaluation as a study with real participants, so say early and plainly that this is a one-reader evaluation. Suggested split, for Raphael to change: Method, one sentence for each of SE1 to SE4. Results, about 350 words on SE2 (Tables B and C, the time and confidence figure), 80 on SE1, 150 on SE3 and SE4 together, and 120 on limits. Everything else goes to the appendices as the CSVs. No result is written in this plan.

## 7. Limitations and how the report states them

| Limitation | Mitigation in this plan | How the report says it |
| --- | --- | --- |
| n = 1 | Two weeks, both versions, fixed order switch; raw counts only | "One reader; the results show what the page can hold and where it fails, not how producers would do." |
| The reader is the developer, not the target audience | Tasks framed by the producer persona and the D1 needs; SE4 sets ChangeLens beside tools on the same scale | State it in Method and in the opening of Results; this is why the Pass band is expected |
| Familiarity with the tool | Unseen reserve weeks; answers written and committed before checking; `seen_before` recorded | "I knew the tool, not the weeks." Name it as a bias that favours the tool |
| Order effect | Order switched between weeks; second reads record change only; first reads compared only with each other | Report first and second reads apart; say the A-against-B comparison mixes version with week |
| Self-scoring | Scoring against the git log, not memory; sealed item keys with a hash; optional AI second scorer, disclosed | Give the second-scorer agreement as x of n, or say there was none |
| Single evaluator for SE3 and SE4 | Fixed methods, D1 rules unchanged | One evaluator finds a minority of problems (Nielsen & Molich, 1990), and evaluators differ (Hertzum & Jacobsen, 2001). The evaluator also built the tool, and the walkthrough is usually a group method. D1's pass was an AI evaluator, so the ChangeLens-against-D1 comparison also changes evaluator, and D1's severity 3 and 4 findings are only as checked as Raphael's CHECK-PACK pass |
| Key known in advance (anchoring) | Key committed before SE2; `record_could_answer` taken from the git log | "I knew which needs the key called derivable." Name it as a bias that favours agreement |
| Thin reserve weeks | None possible now | The pages show 3 changes by 2 people and 2 changes by 1 person. Say what the weeks could and could not test |
| Pages in Markdown, not the window | Read the page only, same font for A and B | SE2 tests the page's content and layout in a preview, not the Producer Page window; SE3 tests the window |
| Reserve weeks are reserves, not matched to the study weeks | None possible now | Say so; per-week results are not compared with the D3 study weeks |
| The ten-need key was AI-drafted | Raphael accepts or changes it before SE2 and dates it | Call it his key only after that date; disclose in the GenAI statement |

Neustaedter and Sengers (2012) describe autobiographical design: the designer is also the user and learns through use. It fits Raphael's stated reason (learning by using the tool himself). It does not fit fully, because he built ChangeLens and is not a producer, so he is not its user. If you cite it, cite it only for learning through use, say that limit, and say plainly that this is a variance from the A2 plan. Do not call the study autobiographical design without that limit.

## 8. Ethics

There are no participants, so `deliverable-3/ethics/report-ethics-points.md` points 1 (testing with classmates) and 2 (participant data) no longer apply. Say that in one sentence. Points 3 to 5 still apply:

- **Point 3, what the tool could be used for.** ChangeLens could be used to monitor or blame developers. The page reports changes to the project, not each person's output. SE4 task T2 (per-person work) records this as a design choice, not a gap.
- **Point 4, accurate reporting of real people's work.** SS3D is real contributors' work. SE1 checks every page used, including both reserve weeks. Check SS3D's licence (`study/SOURCE-AND-LICENCE.md` on `deliverable-2-changelens`) and state it. The export logs (`study/*/export/log.txt`) hold contributor email addresses; decide whether the repository should keep them before it is shared with markers.
- **Point 5, AI use.** Declare in the GenAI statement: the AI fidelity scorers, the AI-drafted ten-need key, the AI-written reserve items and keys, the optional AI second scorer, and this plan.

## 9. Expected rubric band and why

**Expected: Pass (about 60), as Raphael accepted on 17 Oct 2026.**

- The spec asks for "a study conducted to answer your primary research question and evaluate the utility, usability or UX ... for its target audience". The Pass band is "may lack in selection of appropriate methods and/or sample". A one-reader, developer-as-reader study is that case.
- What can lift it within or just above Pass: named methods (Endsley items, Wharton et al. walkthrough, Nielsen heuristics on the D1 scale), checks against the git log, sealed keys, every limit stated, and evidence on all three of utility, usability and UX. The CR band asks for "largely appropriate methods and sample"; the methods may read that way, the sample will not. Do not count on CR.
- What would drop it below Pass: results written without the CSVs behind them, the limits left out, or calling this a user study.
- **The risk is real.** The F descriptor is "largely incomplete or uses inappropriate methods and/or sample", and the template guide reads the Evaluation as a study with real participants, not self-assessment. A marker could read a one-reader study as an inappropriate sample. Pass is the expectation, not a guarantee. The Pass descriptor covers "utility, usability and/or UX", so evidence on all three, with the limits stated, is the best protection.

## 10. Hours

A2 budgeted Deliverable 5 at 18 hours (7 sessions, 4 recruiting, 7 coding). This plan uses about 6.5. Report the variance in the D9 table with the reason (the 17 Oct decision), not as time saved.

## 11. Changes needed in D3 and D4 (list only; Raphael approves after his check)

Both branches are read-only today. Nothing below has been done.

**D3 (`deliverable-3-instruments`)**
1. `README.md`: new status line (17 Oct decision: no sessions, no pilot); "What Raphael must do" items 5 to 7 (consent brackets, pilot, second human scorer) marked not needed; point to this plan.
2. New files `items-reserve-2020-12-14.md` and `items-reserve-2021-09-27.md`: question sheets only, same slot plan. Keys in separate files, kept out of the repository until SE2 answers are committed, then added with their hash checked. If you prefer D3 untouched, these can live in `deliverable-5/solo/` instead.
3. `ten-need-sheet.md`: add a short section D, "Solo use": the R/U reading of the key, the rule choice, and the date accepted.
4. `answer-key-and-scoring.md`: the second-scorer check becomes the optional AI scorer for SE2, disclosed.
5. `session-protocol.md`, `participant-info-and-consent.md`, `proxy-scenario.md`, `pilot-plan.md`: status line "Not used (17 Oct 2026 decision); kept as the A2 plan record". The proxy scenario stays the source of the SE3 persona.
6. `ethics/report-ethics-points.md`: mark points 1 and 2 as not applicable (no participants); add the contributor-email question to point 4.
7. The reserve-week `study/reserve/*/report-*.md` on this branch are the older pages; the pages SE2 reads are on `deliverable-2-changelens` at `d9fa4bf`. Either update or add a line saying so.

**D4 (`deliverable-4-fidelity-check`)**
1. Regenerate `study/reserve/2020-12-14/fidelity-A.md`, `fidelity-B.md`, `study/reserve/2021-09-27/fidelity-A.md`, `fidelity-B.md` from the pages frozen at `d9fa4bf`. All four templates on this branch differ from the D2 versions (both reserve B pages were re-frozen on 17 Oct).
2. Score the reserve weeks only after SE2 is scored (AI scorer, Raphael hand-checks C verdicts), and add a `FIDELITY-RESULT.md` per reserve week.
3. `study/week1-2021-02-08/FIDELITY-RESULT.md`, section "Before this counts": once the hand-check is done, record its result and point to `deliverable-6/data/se1-fidelity-handcheck.csv`.
4. July has one AI scorer only. Say so in a July result note, since February had two.
5. Say which tool commit each scored page came from (the current tool regenerates February B differently: 25 not 26 scenes and prefabs).

## 12. Per-branch change list

**D2 (`deliverable-2-changelens`)**
1. Do not regenerate or edit any `study/reserve/` page from now until SE2 is scored. Tag `d9fa4bf` (for example `reserve-frozen-2026-10-17`) so the report can name the commit.
2. `TRY-CHANGELENS.md` section 3 step 3 suggests generating the reserve weeks: add a warning not to open them before SE2.
3. After SE3 and SE4: fix what you choose to fix, list each fix with its CW or CL id in `prototype/CHANGELOG.md`, and say in the report which commit was evaluated and which was fixed after.
4. `README.md` and the package README: say the evaluation is a solo evaluation (17 Oct), with a link to this plan.

**D5 (`deliverable-5-sessions`, this branch)**: done 17 Oct 2026, local commits only.
1. Add this plan. Done (`125a9bb`, revised `8bb1800`).
2. `README.md`: new status and purpose (solo evaluation kit); the catch-up plan, checkpoints and open questions replaced by section 4 of this plan. Done.
3. `recruitment-message.md`, `booking-tracker.csv`, `session-checklist.md`: status line "Not used (17 Oct 2026 decision)", kept as the A2 plan record. Done: moved to `deliverable-5/retired/` with the status line and a one-line reason each in `retired/README.md`. Not deleted.
4. `think-aloud-coding-sheet.md`: add a note that the codebook now codes the SE2 needs log; `participant` = `SELF`. Done; its procedure now points at `deliverable-6/data/se2-needs-log.csv`.
5. `recode-sample.js`: check it runs on `se2-needs-log.csv` with one participant; add a test case if not. Done: it already kept `SELF` rows; a test now proves it, and an `agree` command prints pass 1 against pass 2 as x of n.
6. `deliverable-5/solo/` for the SE2 answer-sheet template and the SE3 task card. Done, with run sheets for SE1 to SE4, `how-to-score.md`, the dated schedule and the nine header-only logs (`solo/logs/`, checked against section 3 by `solo/logs.test.js`). The D6 templates in item 1 below should copy these headers.

**D6 (`deliverable-6-evaluation-report`)**
1. `analysis/templates/`: add header-only `se1-fidelity-handcheck.csv`, `se2-reads.csv`, `se2-item-scores.csv`, `se2-need-answers.csv`, `se2-needs-log.csv`, `se2-second-scorer.csv`, `se3-walkthrough.csv`, `se4-heuristic-problems.csv`, `se4-task-outcomes.csv` with the columns in section 3.
2. `analysis/`: a solo analysis script (for example `solo-analyse.js`) that prints Tables A to H from those CSVs, with tests on FAKE data, as `analyse.js` does. `analyse.js` cannot be reused for SE2: its design checks need two readers' weeks to differ, and its week and role values reject the reserve weeks and `SELF`.
3. `analysis/figures.js`: a time-and-confidence figure instead of the paired-differences plot; keep the Figure 5 number.
4. `evaluation-section-skeleton.md`: rewrite Method rows (Design, Participant = the developer, Instruments, Procedure, Ethics points 3 to 5, Fidelity, Scoring check, Analysis, Deviations) and the five Results blocks around Tables B, C, F and G. Replace the trap "say plainly it had human readers" with "say plainly it had one reader, the developer".
5. `appendix-plan.md`: B becomes the SE2 raw data, C the key against observed, D the needs-log coding, G becomes the SE3 and SE4 sheets (recruitment removed).
6. `README.md`: "What Raphael must do" rewritten for the solo study.

**D7 (`deliverable-7-portfolio-video`)**
1. `storyboard.md` beat 6: the result slot shows an SE2 table or the time-and-confidence figure, with "one reader, the developer" on screen.
2. `README.md` figure list: Figure 5 is the new figure; Tables 1 to 3 renamed to the solo tables.
3. `feedback-form.md`: the A2 measure names two outside viewers for the video. That is a check of the video, not of ChangeLens, but it does involve other people. Under the 17 Oct decision the default is to drop it and report it as a variance, unless Raphael says otherwise. Nothing in this plan depends on it.

**D8 (`deliverable-8-dev-diary`)**
1. A dated diary entry for 17 Oct on the evaluation decision, in Raphael's own words.
2. The Create goal entry ("written against an unfamiliar Unity week, tying each layout decision to a named reader need") is written right after the SE2 first read of a reserve week, the same day, not before SE2.
3. `hours-entries.csv`: log SE1 to SE4 time against Deliverable 5.
4. `fact-log-weeks-9-10.md`: add the 17 Oct decision and the reserve re-freeze at `d9fa4bf`.

**D9 (`deliverable-9-reflection`)**
1. `README.md` item 1: the reserve week for the Create entry must be used only after SE2 (it currently suggests a reserve week with no timing).
2. `reflection-skeleton.md`: Evaluate goal evidence points to Tables B and C; Apply and Analyse goal evidence may add SE4 as Raphael's own hand pass (D1's pass was an AI evaluator), but it does not replace the A2 measure (four tools coded, one inspection-against-interview reconciliation).
3. `variance-table.js` and its input: D3 (no pilot), D5 (18 h planned, about 6.5 h, sessions replaced by the solo evaluation) and D6 rows with the reason.

## References

Cohen, J. (1960). A coefficient of agreement for nominal scales. *Educational and Psychological Measurement, 20*(1), 37–46. https://doi.org/10.1177/001316446002000104

Endsley, M. R. (1995). Toward a theory of situation awareness in dynamic systems. *Human Factors, 37*(1), 32–64. https://doi.org/10.1518/001872095779049543

Hertzum, M., & Jacobsen, N. E. (2001). The evaluator effect: A chilling fact about usability evaluation methods. *International Journal of Human-Computer Interaction, 13*(4), 421–443. https://doi.org/10.1207/S15327590IJHC1304_05

International Organization for Standardization. (2018). *Ergonomics of human-system interaction — Part 11: Usability: Definitions and concepts* (ISO 9241-11:2018).

Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. In *Proceedings of the 29th International Conference on Software Engineering* (pp. 344–353). IEEE. https://doi.org/10.1109/ICSE.2007.45

Neustaedter, C., & Sengers, P. (2012). Autobiographical design in HCI research: Designing and learning through use-it-yourself. In *Proceedings of the Designing Interactive Systems Conference* (DIS '12) (pp. 514–523). ACM. https://doi.org/10.1145/2317956.2318034

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '94) (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '90) (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281

Wharton, C., Rieman, J., Lewis, C., & Polson, P. (1994). The cognitive walkthrough method: A practitioner's guide. In J. Nielsen & R. L. Mack (Eds.), *Usability inspection methods* (pp. 105–140). Wiley.

Check every reference against the source before citing it in the report (the Hertzum and Jacobsen and the Neustaedter and Sengers DOIs especially).
