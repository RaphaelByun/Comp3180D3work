# Facts for Raphael to write from, not diary entries

This file lists what the git history and the files on disk show for Weeks 9 and 10. It says nothing about what you thought, struggled with or decided, because only you know that. Write your own entries in `diary-template.md` using these facts as a prompt, and add what is missing. Nothing here is in your voice.

Built 13 Oct 2026 (about 19:00 Sydney time, Week 10), updated 17 Oct 2026 (Sydney time), and updated again late on 17 Oct for the solo evaluation decision, from:

```
git -C "<COMP3180>/Assignemnts/Assignment 3 Final Project/Comp3180D3work" log --all --format='%h %ad %an %s' --date=short
```

plus the branch contents, file modified-times on this machine, and two notes in `COMP3180/CLAUDE.md`. Re-run the command before you write: other sessions are still committing, and this log was true at the time above only. The 13 Oct build missed the commits made that evening between 18:41 and 19:08; they are in section 2 now.

## 1. Calendar

| Period | Dates (2026) |
|---|---|
| A2 due | Sun 20 Sep |
| Mid-session break | 21 Sep to 4 Oct |
| Week 9 | 5 to 11 Oct |
| Week 10 | 12 to 18 Oct (updated Sat 17 Oct) |
| Week 11 / 12 / 13 | 19 to 25 Oct / 26 Oct to 1 Nov / 2 to 8 Nov |
| A3 due | Sun 8 Nov, 11:55 pm |

## 2. Commit history (all branches), times converted to Sydney (AEDT, UTC+11)

Commits authored as "Claude" were made by a Claude Code cloud session; commits authored as "RaphaelByun" were made from your account, and all 35 of those carry a "Co-Authored-By: Claude Opus 5.5" line (the three Claude-authored commits carry it too), which is how the tool records its help. Every commit except `dbb6af4` and `802fbb8` also carries a Claude-Session line, and several messages say what Claude did "at Raphael's request". The author field does not say who did the thinking. Say in your own entries which parts you did.

| Hash | Sydney time | Author | Message | Where it is |
|---|---|---|---|---|
| `dbb6af4` | Sun 11 Oct 19:37 | RaphaelByun | Initial commit: ChangeLens prototype, A2 sprint materials and study data | `main` and every branch root |
| `b96c1fa` | Mon 12 Oct 17:41 | Claude | Generate study-week reports and add a .NET harness for the engine-free code | `deliverable-2-changelens`, D3 and D4 branches |
| `5fd3044` | Mon 12 Oct 17:51 | Claude | WIP: first-scorer fidelity checklists for the July 2021 study week | `ccr-134663a0-bnvrx8`, `deliverable-4-fidelity-check-testing` |
| `4c4c87f` | Mon 12 Oct 18:02 | Claude | Deliverable 1: tool selection, heuristic coding sheet, job-ad and review scan, interview guide, draft needs catalogue, design-spec outline | `deliverable-1-ux-study` |
| `802fbb8` | Tue 13 Oct 06:12 | RaphaelByun | Add .NET harness project files and scope csproj/sln ignores to Unity | `ccr-296826aa-zfmd36`, `deliverable-2-changelens` |
| `e73f544` | Tue 13 Oct 06:28 | RaphaelByun | Pin date-only export bounds to midnight | `deliverable-2-changelens` |
| `cd6228c` | Tue 13 Oct 18:41 | RaphaelByun | Merge deliverable-2-changelens (harness project files, date-bound fix) into D4 | `deliverable-4-fidelity-check` (was local only on 13 Oct) |
| `323eac1` | Tue 13 Oct 18:48 | RaphaelByun | Add the Producer Page window and pin week bounds to UTC midnight | `deliverable-2-changelens` |
| `bf09b4e` | Tue 13 Oct 18:58 | RaphaelByun | Repair the asset diff reading found by the February fidelity check | `deliverable-2-changelens` and branches that merged it (tests 42 to 46) |
| `db3bc47` | Tue 13 Oct 18:58 | RaphaelByun | Merge deliverable-2-changelens (parser repair, Producer Page window, UTC weeks) | `deliverable-4-fidelity-check` |
| `ac9d39c` | Tue 13 Oct 19:07 | RaphaelByun | State the "and N more" counting rule on the treatment page | `deliverable-2-changelens` |
| `da7d737` | Tue 13 Oct 19:08 | RaphaelByun | Merge deliverable-2-changelens (counting rule on the treatment page) | `deliverable-4-fidelity-check` |
| `b1a2df6` | Tue 13 Oct 19:08 | RaphaelByun | Score the February study week; Version B passes after the tool repair | `deliverable-4-fidelity-check` |
| `4ae7653` | Tue 13 Oct 19:08 | RaphaelByun | Draft the evaluation instruments for the Week 11 pilot | `deliverable-3-instruments` |
| `3864dc5` | Tue 13 Oct 19:08 | RaphaelByun | Start the session kit: recruitment, booking tracker, run sheet, think-aloud coding | `deliverable-5-sessions` |
| `6c1faba` | Tue 13 Oct 19:08 | RaphaelByun | Start the evaluation report: section skeleton, appendix plan, analysis tool | `deliverable-6-evaluation-report` |
| `91536d3` | Tue 13 Oct 19:08 | RaphaelByun | Start the portfolio video: storyboard, shot list, two-viewer feedback form | `deliverable-7-portfolio-video` |
| `3b75f12` | Tue 13 Oct 19:08 | RaphaelByun | Start the development diary: template, fact log for Weeks 9-10, hours log | `deliverable-8-dev-diary` |
| `6cb114e` | Tue 13 Oct 19:08 | RaphaelByun | Start the reflection report: skeleton, goal prompts, hour-variance table | `deliverable-9-reflection` |
| `2b6b5ab` | Wed 14 Oct 17:05 | RaphaelByun | Write screenshot figures relative to the project, not a fixed folder (repo had moved; tests 46/46 from the new location) | `deliverable-2-changelens` |
| `ff65ae7`, `46857b4`, `e69ec9c` | Wed 14 Oct 17:06 | RaphaelByun | Set the participant floor: five readers in total (same message, three branches) | D3, D5 and D6 branches |
| `4804778` | Wed 14 Oct 17:08 | RaphaelByun | Add the ethics tab: requirement, convenor email, risk, application, data plan | `deliverable-3-instruments` |
| `e078ebd` | Wed 14 Oct 18:51 | RaphaelByun | Run the heuristic pass and replace the interviews with published sources | `deliverable-1-ux-study` |
| `3407fea` | Wed 14 Oct 19:20 | RaphaelByun | Ask the convenor about published sources in the same ethics email | `deliverable-3-instruments` |
| `92ff8b4` | Wed 14 Oct 19:35 | RaphaelByun | Finish D1: verified scan, needs and marks, UXF check, top ten, design spec | `deliverable-1-ux-study` |
| `cf90ef9` | Wed 14 Oct 19:37 | RaphaelByun | Put D1's final ten needs on the ten-need sheet | `deliverable-3-instruments` |
| `f569f96` | Sat 17 Oct 09:53 | RaphaelByun | Drop the convenor ethics check from D1; interviews stay dropped for time | `deliverable-1-ux-study` |
| `e603c8f` | Sat 17 Oct 09:53 | RaphaelByun | Record the no-ethics-application decision and add report ethics points | `deliverable-3-instruments` |
| `4fe6e0f` | Sat 17 Oct 09:53 | RaphaelByun | Recruit without an ethics step, per the 17 Oct decision | `deliverable-5-sessions` |
| `716f053` | Sat 17 Oct 09:53 | RaphaelByun | Add an ethics row to the Evaluation Method skeleton | `deliverable-6-evaluation-report` |
| `1e60899` | Sat 17 Oct 09:53 | RaphaelByun | Log the Week 10 ethics research and decision in the fact log | `deliverable-8-dev-diary` |
| `e2f491c` | Sat 17 Oct 09:53 | RaphaelByun | Point Industry Relevance at the tool-misuse ethics point | `deliverable-9-reflection` |
| `ce147cd` | Sat 17 Oct 10:12 | RaphaelByun | Add the D1 check pack: 16 spot-check cards and the accept list | `deliverable-1-ux-study` |
| `ea35352` | Sat 17 Oct 10:12 | RaphaelByun | Clear the convenor ethics gate from the pilot plan | `deliverable-3-instruments` |
| `50d63be` | Sat 17 Oct 10:12 | RaphaelByun | Make the recruiting kit current and add the catch-up plan from 17 Oct | `deliverable-5-sessions` |
| `84a83e5` | Sat 17 Oct 10:12 | RaphaelByun | Bring the fact log up to 17 Oct and correct authorship facts | `deliverable-8-dev-diary` |

Counts at 17 Oct, for the commits on GitHub (`origin`): 38 commits (3 authored by Claude, 35 by RaphaelByun; all 38 carry a Co-Authored-By Claude Opus 5.5 line). 19 of them are dated 14 Oct or later, from 17:05 on 14 Oct. There are no commits dated 15 or 16 Oct, and none between 14 Oct 19:37 and 17 Oct 09:53. The six commits at 17 Oct 09:53:27 to 09:53:38 are the ethics decision applied across six branches. The four commits at 17 Oct 10:12:34 to 10:12:41 say in their messages that a multi-agent Claude Code run prepared them. Commits after 10:12 on 17 Oct are not in this table or these counts. Many of them were pushed later that day, so re-run the command to see them. Two that matter for the evaluation are in section 4: `d9fa4bf` (11:38, both reserve weeks re-frozen) and the solo evaluation plan on `deliverable-5-sessions` (`125a9bb` at 22:45 and `8bb1800` at 22:52, with later commits to 23:00, local and not pushed when this was written). The 13 Oct evening commits (18:41 to 19:08) were missing from the 13 Oct version of this table. There are no commits on any branch before 11 Oct and none in Week 9 other than the initial commit.

Date caution: the `92ff8b4` message and `deliverable-1/README.md` say Claude did the rest of D1 "on 15 October 2026", but the commit is stamped 14 Oct 19:35 Sydney time. The commit stamp is the only independent clock; the 15 Oct date is the text's own claim.

## 3. What each branch holds (remote tips on 17 Oct)

Every `-testing` twin is at the same tip as its parent branch (checked 17 Oct). These tips are as of 10:12 on 17 Oct. Several branches moved later that day: for example `deliverable-2-changelens` is at `20eff9a` on GitHub, and `deliverable-5-sessions` holds the solo plan and its run kit in local commits (until 23:00 on 17 Oct), not pushed when this was written.

| Branch | Tip | Holds |
|---|---|---|
| `main` | `dbb6af4` | Everything from A2, unchanged since 11 Oct |
| `deliverable-1-ux-study` | `ce147cd` | `deliverable-1/` with eleven files: README, CHECK-PACK (16 spot-check cards and the accept list, `ce147cd`), HANDOFF-TO-D3, tool selection, heuristic coding sheet (61 problems), job ads and reviews, published sources (six, replacing the interviews), interview guide (now a coding frame), needs catalogue, design spec, design-spec outline. README: about 177 of Raphael's own minutes remain, almost all checking (600 planned in A2; 372 on 14 Oct) |
| `deliverable-2-changelens` | `2b6b5ab` | Frozen study weeks, harness, Producer Page window, parser repair (`bf09b4e`), counting rule (`ac9d39c`), screenshot helpers writing relative to the project (`2b6b5ab`). 46 tests |
| `deliverable-3-instruments` | `ea35352` | `deliverable-3/` with fourteen files: README, six items per week (two sets), answer key and scoring, ten-need sheet with D1's final ten, session protocol, consent, proxy scenario, pilot plan, and `ethics/` (README, risk assessment, application draft, data management plan, `report-ethics-points.md`). The pilot plan's convenor ethics gate is cleared (`ea35352`). Also carries the D2 changes |
| `deliverable-4-fidelity-check` | `b1a2df6` | February week scored (`FIDELITY-RESULT.md`, scorer files, `fidelity-B-rescore-repaired-rows.md`), merged D2 repair; July scored earlier (`5fd3044`) |
| `deliverable-5-sessions` | `50d63be` | `deliverable-5/`: README, booking tracker (no sessions booked), recode script, recruitment message, session checklist, think-aloud coding sheet. Plus participant-floor commit `46857b4`, and a catch-up plan from 17 Oct in the README (`50d63be`) |
| `deliverable-6-evaluation-report` | `716f053` | `deliverable-6/`: section skeleton, appendix plan, analysis tool (`analysis/analyse.js`; test script with sample data marked FAKE). Plus `e69ec9c` and the ethics row |
| `deliverable-7-portfolio-video` | `91536d3` | `deliverable-7/`: README, storyboard, shot list, feedback form. Video goes to Echo 360, not the repo |
| `deliverable-8-dev-diary` | `84a83e5` | `deliverable-8/`: README, diary template, this fact log, hours log |
| `deliverable-9-reflection` | `e2f491c` | `deliverable-9/`: README, reflection skeleton, variance table script |
| `ccr-134663a0-bnvrx8` | `5fd3044` | July week fidelity checklists, scored (unchanged) |
| `ccr-296826aa-zfmd36` | `802fbb8` | Harness project files fix (unchanged) |

## 4. Facts from files

### Week 9 (5 to 11 Oct)
- A2 mark: 100 overall (Literature Review 100, Project Proposal 100, Presentation 100). `Assignemnts/Assignment 2 Proposal/Feedback.txt` was last modified Sat 10 Oct 23:00. `CLAUDE.md` records it as read 10 Oct.
- The feedback has two notes: raw counts and caution for small-sample percentages (88%, 92%, 17.4%), and a suggestion to restate the Understand and Evaluate goals as transferable skills. A third comment mentions an "AI-disclosure point below" that is not in the file; `CLAUDE.md` says to check iLearn for the full text. Not yet checked as far as the files show.
- `ChangeLens-proto/.../Editor/ProducerReport.cs` last modified Sat 10 Oct 23:18.
- Sun 11 Oct: the A3 repo was created (`github.com/RaphaelByun/Comp3180D3work`, private) and `main` made as a single clean commit, with history rewritten to drop the loop prompts (per `CLAUDE.md`). Root `README.md` last modified 11 Oct 19:31.
- Branch plan: one branch per A2 deliverable, each with a `-testing` twin (per `CLAUDE.md`).

### Week 10 so far (12 to 17 Oct)
- Deliverable 1, state at 12 Oct (`4c4c87f`; superseded by the 14 Oct bullets below): desk-research prep only. Four tools chosen (Trello, HacknPlan, Jira Free, GitHub Projects); 10 job ads and 5 reviews coded provisionally with wording from search results that still needs checking on the live pages; interview guide; 25-need draft catalogue. At that commit the heuristic pass, interviews and marks were not done, and its README gave a 600-minute to-do list.
- Deliverable 2: study weeks frozen. Naming measures (strict A2 measure): Feb 2021 week 21 of 26 scenes and prefabs named; Jul 2021 week 21 of 24; both 100% of changed-file entries categorised. Target 60% named, 90% categorised.
- Test counts: 39 EditMode tests before 12 Oct; 42 after the date-bound fix (`e73f544`, `323eac1` messages), passing in Unity 6000.4.10f1 and in the .NET harness.
- Two date bugs found and fixed: git filling a bare `--since`/`--until` date with the current time of day (`e73f544`), and git reading a bare date in the machine's own time zone, so the February study week gave 3 commits instead of 8 on a Sydney PC (`323eac1`). The fix was checked under UTC, Sydney and Los Angeles time zones: all four study weeks regenerate identically.
- Deliverable 4 (13 Oct, before the February scoring): July 2021 week scored by two scorers. Version A 14 of 14 claims supported; Version B 27 supported, 0 contradicted, 1 unsupported (row 25) of 28 (96.4%). Both pass the A2 rule (none contradicted, at least 90% supported). Two omissions logged as Deliverable 2 repair items. Dates in the reports are author-local. The February week was scored later on 13 Oct (see the bullets below).
- `TRY-CHANGELENS.md`: a 15-minute hands-on guide, added 13 Oct.
- Deliverables 5 to 9: scaffolds committed on 13 Oct at 19:08 (`3864dc5`, `6c1faba`, `91536d3`, `3b75f12`, `6cb114e`): recruitment and session kit, analysis tool and evaluation skeleton, video plan, diary and hours log, reflection skeleton. Source: commit messages.
- 13 Oct evening, D4 February scoring (`b1a2df6`, `FIDELITY-RESULT.md`): two independent scorers; Version A 15 of 15 supported for both. Version B 37 of 39 for each, two contradicted rows each (row 33 shared; rows 19 and 21 the others), traced to how ChangeLens read git's asset diffs. After the repair a third scorer re-scored rows 19, 21, 22, 23, 27, 33: all supported, so Version B is 39 of 39. All scoring was by AI scorers; the file says A2's "read by hand" still needs Raphael's own check. Open repair items (omissions, not contradictions) are listed in the file.
- 13 Oct evening, D2 tool repair (`bf09b4e`, `ac9d39c`): four parser faults fixed (stripped reference blocks, moved blocks, paired headers, a guid shared by two scripts); the "and N more" counting rule stated on the treatment page. July regenerated byte-identical; February rows 19, 21, 22, 23, 27, 33 of Version B changed. Tests 42 to 46, Unity and .NET (message of `bf09b4e`; 46/46 re-run from the new location in `2b6b5ab`).
- 13 Oct evening, D3 instruments drafted (`4ae7653`): six matched items per study week, scoring rules, provisional ten-need sheet, 45-minute session script (sequences S1 to S4), consent text, proxy scenario, pilot plan. Nothing piloted.
- 14 Oct 17:05, repository moved: `2b6b5ab` says it moved from "COMP3180/Working folder/a2-final-sprint-17-sep-2026" to "COMP3180/Assignemnts/Assignment 3 Final Project/Comp3180D3work", and fixes two figure helpers that had the old path baked in.
- 14 Oct 17:06, participant floor decided (`ff65ae7`, `46857b4`, `e69ec9c`; `deliverable-3/README.md` open decision 5): five readers in total, met once R05 has finished (R01 to R04 cover all four sequences, R05 repeats S2). Below five, A2's fallback applies: think-alouds first, quantitative arm descriptive. The commit message says Raphael decided it. Superseded on 17 Oct: there are now no readers other than Raphael (see the last bullets of this section).
- 14 Oct 17:08, ethics research (`4804778`): research on what Macquarie requires, a convenor email, risk assessment, draft low-risk application and data management plan; nothing submitted.
- 14 Oct 18:51, D1 heuristic pass and dropped interviews (`e078ebd`): per the message, Claude ran the seven-task script in Raphael's browser on throwaway workspaces in Trello, HacknPlan, Jira and GitHub Projects "at his request because he has no time". 61 distinct problems coded to Nielsen's heuristics with severity (16 at severity 3 to 4; README split: Trello 16, HacknPlan 27, Jira 8, GitHub Projects 10; severity 1: 7, 2: 38, 3: 15, 4: 1). The method note records a single AI evaluator, Trello Premium and Jira Standard trials, and that Raphael must hand-check the severity 3 to 4 findings and disclose the AI use. Test workspaces deleted. The two interviews were "dropped by Raphael (time, and they would need ethics approval)" and replaced by six coded published producer accounts, with three inspection-versus-sources disagreements. README minutes then: 372 (was 600).
- 14 Oct 19:20, `3407fea` added a question 6 to the draft convenor email about published sources. That check was dropped on 17 Oct (`f569f96`).
- 14 Oct 19:35, D1 finished by AI (`92ff8b4`; the message and README say 15 Oct, the commit stamp says 14 Oct): free tiers of the four tools re-checked (Trello Free has no CSV export; HacknPlan's GitHub link, dependencies, custom columns and metrics export are paid; Jira Free's Summary tab unconfirmed), all 10 ads verified (A09 via mirrors), 13 code fixes, reviews V1 to V4 verified, V5 not found and marked do-not-quote, three published-source quotes corrected, Ko et al. adaptation checked (four misstatements fixed), needs edited to 25, 75 marks, three rejected-artefact cases (N07, N10, N27), UXF week check (9 to 15 Nov 2020), design spec and `HANDOFF-TO-D3.md`. Every judgement is marked AI-drafted for Raphael to accept or change. Remaining for Raphael: about 182 minutes in the commit message, 177 in the README as revised 17 Oct.
- 14 Oct 19:37, D3 ten-need sheet (`cf90ef9`): D1's final ten (N01, N03, N07, N08, N09, N12, N17, N19, N25, N26) replace the provisional ten, with the researcher key under both marking rules (Rule 1: 3 derivable, 7 partly, 0 not; Rule 2: 3, 4, 3) and five runners-up (N24, N11, N14, N02, N15). Raphael still chooses the rule before seeing any sheets. AI-drafted; Raphael to accept before R01. Under the 17 Oct solo plan he accepts it before SE2 instead (plan target: Sun 18 Oct).
- D1 headline finding (`deliverable-1/README.md`): only N01 and N12 are best answered by the repository; N05 (named scenes and prefabs) ranks 23rd of 25; producers ask most for plan-side information ChangeLens does not read.
- 17 Oct 09:53, ethics decision applied across branches (`f569f96`, `e603c8f`, `4fe6e0f`, `716f053`, `1e60899`, `e2f491c`): D1 drops the convenor check and says the interviews stay dropped for time; D3 records the decision and adds `ethics/report-ethics-points.md`; D5 recruits without an ethics step; D6 gets an ethics row in the Evaluation Method skeleton; this fact log gets the ethics bullets; D9 points Industry Relevance at the tool-misuse ethics point. The consent form brackets (email, dates, storage) and the proposed 1 Nov withdrawal date remain open (`deliverable-3/README.md`). With no participants after the later 17 Oct decision, the plan lists them as not needed (a D3 change waiting for Raphael's approval).
- 17 Oct 10:12, four commits prepared by a multi-agent Claude Code run (per their messages): `deliverable-1/CHECK-PACK.md` with 16 spot-check cards and the accept list for Raphael's D1 checks (`ce147cd`); the convenor ethics gate cleared from the D3 pilot plan (`ea35352`); the D5 recruiting kit updated with a catch-up plan, because the A2 booking date of Sun 18 Oct cannot be met as planned (`50d63be`); and this fact log brought up to 17 Oct (`84a83e5`). None of the checks in the pack has been done as far as the files show. The recruiting kit and catch-up plan were overtaken the same day by the solo evaluation decision below.
- No commits are dated 15 or 16 Oct. Any work on those days outside git (including the D3 and D4 checks Raphael said he would do himself) is not evidenced here.
- Ethics decision (17 Oct, Raphael): no ethics application and no convenor email, because the COMP3180 unit guide sets no ethics requirement and the Final Project expects testing with the target audience. The study keeps its own safeguards (voluntary, codes not names, notes only), and the A3 report will discuss the project's ethics instead (`deliverable-3/ethics/report-ethics-points.md`).
- Not on disk (checked 17 Oct): any recruitment message sent, any booking (the D5 tracker lists R01 to R08 and P0, every row "to recruit"; its README says no session has been run and the tracker shows no bookings), any session, any piloted instrument (the D3 instruments exist as drafts from `4ae7653`; the 13 Oct note that they did not exist is out of date), any hand-check of the AI scoring or of the severity 3 to 4 findings, or any Week 10 prac attendance record. After the 17 Oct evaluation decision, no recruitment, booking, session or pilot is planned.
- 17 Oct 11:38, reserve weeks re-frozen (`d9fa4bf`, `deliverable-2-changelens`): both reserve weeks (14 Dec 2020 and 27 Sep 2021) were regenerated with the current tool, so the 27 Sep 2021 Version B page now names scripts deleted during that week. Six files changed under `study/reserve/`: the 27 Sep 2021 Version B page, its `guids.txt`, and the four reserve fidelity templates. The D3 and D4 branches still hold the older reserve pages and templates. The solo plan uses the pages at `d9fa4bf` for SE2 and says not to open any reserve page before SE2.
- 17 Oct, evaluation decision (Raphael): there is no study with other people. No recruitment, no live sessions and no online form. Raphael evaluates ChangeLens himself. His reasons, in his words as recorded on 17 Oct: he doesn't want live testing, he has no time to arrange people, and testing it himself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well." He was told this likely caps the Evaluation criterion near a Pass and accepted it (`deliverable-5/self-evaluation-plan.md` section 9).
- 17 Oct 22:45 and 22:52, solo evaluation plan (`125a9bb`, `8bb1800`, `deliverable-5-sessions`, local, not pushed): `deliverable-5/self-evaluation-plan.md`, drafted with Claude Code and marked "plan for Raphael to approve". Four activities: SE1 hand-check of the fidelity scoring, SE2 timed self-read of the two unseen reserve weeks with answers scored against the git log, SE3 cognitive walkthrough of the Producer Page window, SE4 heuristic evaluation of ChangeLens on the D1 scale. Target dates run from Sun 18 Oct to Fri 30 Oct; about 6.5 hours against the A2 Deliverable 5 budget of 18. Nothing in it has been run. It also lists changes for D3 and D4 that wait for Raphael's approval.

## 5. Gaps the files cannot fill (you must supply these)

1. **Mid-session break (21 Sep to 4 Oct).** No commits exist in this period (the repo history starts 11 Oct) and no file in the COMP3180 tree has a modified-time between 21 Sep and 4 Oct. If you did any work or reading in the break, it is not evidenced. Add evidence if you have it (notes, photos, browser history of sources, messages). If you did none, say that plainly in the diary; the A3 template asks for the break to be covered.
2. **Commit cadence.** The history was rewritten on 11 Oct, so the cadence before then is not in git. A2's working record is in `audit/`, `GENAI-EVIDENCE.md` and file dates. The R&D Engagement criterion reads commits and diary together, so commit small and often from now.
3. **Conversations about the project.** Optional; add any you want in the diary.
4. **Who did what.** Three of 38 commits are authored by Claude, and all 35 of yours carry Claude co-author lines. Several of those 35 record that Claude did the work at your request (heuristic pass, D1 analysis, ethics research) and that you decided the participant floor, the dropped interviews and the 17 Oct ethics position. State in your entries and in the GenAI statement what you directed, what you tested, what you decided and what the tool wrote.
5. **Hours.** No hours have been logged anywhere. Reconstruct what you can honestly and log the rest as you go; mark reconstructed hours as estimates.
6. **A2 feedback on AI disclosure.** Check iLearn for the full Presentation comment.
7. **Evaluation plan.** Not for the diary: the evaluation design is stated once, in the report's Evaluation Method. Record only dated facts (plan approved, D3/D4 changes accepted) as they happen.

## 6. Prompts to answer in your own entries (not answers)

- Week 9: what did you do with the A2 feedback? What was the first thing you decided about A3 and why did you split the repo into one branch per deliverable?
- Week 10: what blocked or unblocked you with the study weeks, the date bugs or the fidelity check? What changed from the A2 plan so far (tiers, order, hours)?
- Week 10: why did you look into ethics, and why did you decide on 17 Oct to handle it in the report rather than through an application? What ethical issues did you see in your own project?
- Both weeks: what did you learn that you could not have got from reading?
