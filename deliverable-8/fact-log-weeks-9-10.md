# Facts for Raphael to write from, not diary entries

This file lists what the git history and the files on disk show for Weeks 9 and 10. It says nothing about what you thought, struggled with or decided, because only you know that. Write your own entries in `diary-template.md` using these facts as a prompt, and add what is missing. Nothing here is in your voice.

Built 13 Oct 2026 (about 19:00 Sydney time, Week 10) from:

```
git -C "<COMP3180>/Working folder/a2-final-sprint-17-sep-2026" log --all --format='%h %ad %an %s' --date=short
```

plus the branch contents, file modified-times on this machine, and two notes in `COMP3180/CLAUDE.md`. Re-run the command before you write: other sessions are still committing, and this log was true at the time above only.

## 1. Calendar

| Period | Dates (2026) |
|---|---|
| A2 due | Sun 20 Sep |
| Mid-session break | 21 Sep to 4 Oct |
| Week 9 | 5 to 11 Oct |
| Week 10 | 12 to 18 Oct (today is Tue 13 Oct) |
| Week 11 / 12 / 13 | 19 to 25 Oct / 26 Oct to 1 Nov / 2 to 8 Nov |
| A3 due | Sun 8 Nov, 11:55 pm |

## 2. Commit history (all branches), times converted to Sydney (AEDT, UTC+11)

Commits authored as "Claude" were made by a Claude Code cloud session; commits authored as "RaphaelByun" were made from your account, and all five of those carry a "Co-Authored-By: Claude" line, which is how the tool records its help. The author field does not say who did the thinking. Say in your own entries which parts you did.

| Hash | Sydney time | Author | Message | Where it is |
|---|---|---|---|---|
| `dbb6af4` | Sun 11 Oct 19:37 | RaphaelByun | Initial commit: ChangeLens prototype, A2 sprint materials and study data | `main` and every branch root |
| `b96c1fa` | Mon 12 Oct 17:41 | Claude | Generate study-week reports and add a .NET harness for the engine-free code | `deliverable-2-changelens`, D3 and D4 branches |
| `5fd3044` | Mon 12 Oct 17:51 | Claude | WIP: first-scorer fidelity checklists for the July 2021 study week | `ccr-134663a0-bnvrx8`, `deliverable-4-fidelity-check-testing` |
| `4c4c87f` | Mon 12 Oct 18:02 | Claude | Deliverable 1: tool selection, heuristic coding sheet, job-ad and review scan, interview guide, draft needs catalogue, design-spec outline | `deliverable-1-ux-study` |
| `802fbb8` | Tue 13 Oct 06:12 | RaphaelByun | Add .NET harness project files and scope csproj/sln ignores to Unity | `ccr-296826aa-zfmd36`, `deliverable-2-changelens` |
| `e73f544` | Tue 13 Oct 06:28 | RaphaelByun | Pin date-only export bounds to midnight | `deliverable-2-changelens` |
| `cd6228c` | Tue 13 Oct 18:41 | RaphaelByun | Merge deliverable-2-changelens (harness project files, date-bound fix) into D4 | local only: not on any remote branch yet (local worktree wt-d4) |
| `323eac1` | Tue 13 Oct 18:48 | RaphaelByun | Add the Producer Page window and pin week bounds to UTC midnight | `deliverable-2-changelens` |

Counts: 8 commits in the repo, all dated 11 to 13 Oct (3 by Claude, 5 by RaphaelByun). There are no commits on any branch before 11 Oct and none in Week 9 other than the initial commit.

## 3. What each branch holds (remote tips on 13 Oct)

| Branch | Tip | Holds |
|---|---|---|
| `main` | `dbb6af4` | Everything from A2: Unity project `ChangeLens-proto` with the package, corpus scripts, figures, prototype logs, audit files, A2 docx and pdf. `.gitignore` excludes the SS3D clone, reading PDFs and loop prompts |
| `deliverable-1-ux-study` | `4c4c87f` | `deliverable-1/` with seven files (README, tool selection, heuristic coding sheet, job ads and reviews, interview guide, needs catalogue, design-spec outline), 745 lines. Desk research and blank instruments only |
| `deliverable-2-changelens` | `323eac1` | Frozen study weeks under `study/` (8 Feb 2021 and 19 Jul 2021, reserves 14 Dec 2020 and 27 Sep 2021): baseline and treatment reports, naming measures, fidelity checklists, exports. `tools/changelens-dotnet` harness. Producer Page window (`ProducerPageWindow.cs`, 388 lines) and `TRY-CHANGELENS.md` |
| `deliverable-3-instruments`, `deliverable-4-fidelity-check` | `b96c1fa` | Same study files as D2 at that moment. No instrument files of their own yet |
| `ccr-134663a0-bnvrx8` | `5fd3044` | `study/week2-2021-07-19/fidelity-A-scored.md` and `fidelity-B-scored.md` (157 lines) |
| `ccr-296826aa-zfmd36` | `802fbb8` | The harness project files fix |
| `deliverable-5` to `deliverable-9` branches | `dbb6af4` | Nothing beyond `main` at the time of writing (work in progress is in local worktrees only) |
| `*-testing` twins | same as their parent | Same tips as the parent branches on 13 Oct, except `deliverable-4-fidelity-check-testing` at `5fd3044` |

## 4. Facts from files

### Week 9 (5 to 11 Oct)
- A2 mark: 100 overall (Literature Review 100, Project Proposal 100, Presentation 100). `Assignemnts/Assignment 2 Proposal/Feedback.txt` was last modified Sat 10 Oct 23:00. `CLAUDE.md` records it as read 10 Oct.
- The feedback has two notes: raw counts and caution for small-sample percentages (88%, 92%, 17.4%), and a suggestion to restate the Understand and Evaluate goals as transferable skills. A third comment mentions an "AI-disclosure point below" that is not in the file; `CLAUDE.md` says to check iLearn for the full text. Not yet checked as far as the files show.
- `ChangeLens-proto/.../Editor/ProducerReport.cs` last modified Sat 10 Oct 23:18.
- Sun 11 Oct: the A3 repo was created (`github.com/RaphaelByun/Comp3180D3work`, private) and `main` made as a single clean commit, with history rewritten to drop the loop prompts (per `CLAUDE.md`). Root `README.md` last modified 11 Oct 19:31.
- Branch plan: one branch per A2 deliverable, each with a `-testing` twin (per `CLAUDE.md`).

### Week 10 so far (12 to 13 Oct)
- Deliverable 1: desk-research prep only. Four tools chosen (Trello, HacknPlan, Jira Free, GitHub Projects); 10 job ads and 5 reviews coded provisionally with wording from search results that still needs checking on the live pages; interview guide; 25-need draft catalogue. The heuristic pass, interviews and all marks are yours to do. Its README gives a 600-minute to-do list.
- Deliverable 2: study weeks frozen. Naming measures (strict A2 measure): Feb 2021 week 21 of 26 scenes and prefabs named; Jul 2021 week 21 of 24; both 100% of changed-file entries categorised. Target 60% named, 90% categorised.
- Test counts: 39 EditMode tests before 12 Oct; 42 after the date-bound fix (`e73f544`, `323eac1` messages), passing in Unity 6000.4.10f1 and in the .NET harness.
- Two date bugs found and fixed: git filling a bare `--since`/`--until` date with the current time of day (`e73f544`), and git reading a bare date in the machine's own time zone, so the February study week gave 3 commits instead of 8 on a Sydney PC (`323eac1`). The fix was checked under UTC, Sydney and Los Angeles time zones: all four study weeks regenerate identically.
- Deliverable 4: July 2021 week scored by two scorers. Version A 14 of 14 claims supported; Version B 27 supported, 0 contradicted, 1 unsupported (row 25) of 28 (96.4%). Both pass the A2 rule (none contradicted, at least 90% supported). Two omissions logged as Deliverable 2 repair items. The February week is not yet scored. Dates in the reports are author-local.
- `TRY-CHANGELENS.md`: a 15-minute hands-on guide, added 13 Oct.
- Deliverables 5 to 9: scaffolds prepared in local worktrees on 13 Oct (nothing committed): recruitment and session kit, analysis tool and evaluation skeleton, video plan, diary and hours log, reflection skeleton.
- Not on disk: any recruitment message sent, any booking, any session, any instrument for Deliverable 3, or any Week 10 prac attendance record.

## 5. Gaps the files cannot fill (you must supply these)

1. **Mid-session break (21 Sep to 4 Oct).** No commits exist in this period (the repo history starts 11 Oct) and no file in the COMP3180 tree has a modified-time between 21 Sep and 4 Oct. If you did any work or reading in the break, it is not evidenced. Add evidence if you have it (notes, photos, browser history of sources, messages). If you did none, say that plainly in the diary; the A3 template asks for the break to be covered.
2. **Commit cadence.** The history was rewritten on 11 Oct, so the cadence before then is not in git. A2's working record is in `audit/`, `GENAI-EVIDENCE.md` and file dates. The R&D Engagement criterion reads commits and diary together, so commit small and often from now.
3. **Prac attendance.** No attendance record is on disk for Weeks 5 to 10. `COMP3180/CLAUDE.md` notes no Week 4 prac attendance. Staff record who talks to them each week; write down which pracs you attended and whom you spoke to.
4. **Who did what.** Three of eight commits are authored by Claude, and all five of yours carry Claude co-author lines. State in your entries and in the GenAI statement what you directed, what you tested, what you decided and what the tool wrote.
5. **Hours.** No hours have been logged anywhere. Reconstruct what you can honestly and log the rest as you go; mark reconstructed hours as estimates.
6. **A2 feedback on AI disclosure.** Check iLearn for the full Presentation comment.

## 6. Prompts to answer in your own entries (not answers)

- Week 9: what did you do with the A2 feedback? What was the first thing you decided about A3 and why did you split the repo into one branch per deliverable?
- Week 10: what blocked or unblocked you with the study weeks, the date bugs or the fidelity check? What changed from the A2 plan so far (tiers, order, hours)?
- Both weeks: what did you learn that you could not have got from reading?
