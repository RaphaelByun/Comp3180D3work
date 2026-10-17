# Needs catalogue

Deliverable 1, 3 hours in A2: "25 needs classified by artefact source, seeded from Ko et al.'s 21 types and checked against the Unity Experiment Framework". Learning Goal *Evaluate*: "every need classified against a named artefact, with three needs where I name the artefact I rejected and why."

**Status, 15 October 2026: AI-drafted, Raphael to accept or change.** Claude Code (Opus) did README steps 10 to 14 on 15 October 2026 at Raphael's request, because he had no time: it checked §1 against the PDF, edited the 25 needs, marked every need, picked the three rejected-artefact cases, ran the UXF week check and counted the evidence. Every judgement below is Claude's, not Raphael's. The ones he must accept or change are listed in §8. The AI use goes in the A3 GenAI statement.

History. 12 October 2026: first draft from Ko et al. (2007), the job-ad scan and A2. 14 October 2026: heuristic-pass evidence added (§6); the two interviews were replaced by six coded published sources (published-sources.md), so wherever A2 or the rule says "interviewee", read "published source". 15 October 2026: this version.

## 1. Ko et al. (2007): the 21 information types, adapted

Source: Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. *Proceedings of the 29th International Conference on Software Engineering* (ICSE '07), 344–353. IEEE. https://doi.org/10.1109/ICSE.2007.45. Checked on 15 October 2026 against the PDF in `reading/ko2007.pdf` (text extracted with pdftotext). Seventeen developers at Microsoft, observed in 90-minute sessions; 334 instances of information seeking, abstracted into 21 types in seven work categories (§5.1–5.7).

The question column is the paper's §5 wording, verbatim. The "producer's analogue" column is my rewording for a producer reading a week, not the paper's. The "What the paper means" column was added on 15 October 2026 so each adaptation can be judged against the original sense.

| ID | Category (§) | Ko et al. question (§5, verbatim) | What the paper means | Producer's weekly analogue | Keep? |
|---|---|---|---|---|---|
| c1 | Writing code (5.1) | What data structures or functions can be used to implement this behavior? | Finding reusable API code | — | No |
| c2 | Writing code (5.1) | How do I use this data structure of function? [sic] | Syntactic usage rules of an API | — | No |
| c3 | Writing code (5.1) | How can I coordinate this code with this other data structure or function? | Behavioural usage rules of an API ("is it legal to call this method after calling this other method?") | — (API protocol; see note 2) | No |
| s1 | Submitting a change (5.2) | Did I make any mistakes in my new code? | The author's own check before check-in | Did this week's changes break anything? (asked afterwards, by someone else) | Partly (→ N14) |
| s2 | Submitting a change (5.2) | Did I follow my team's conventions? | Code conventions before review | — | No |
| s3 | Submitting a change (5.2) | Which changes are part of this submission? | Which differences belong to this submission when submissions intersect or merge | What does each commit or pull request actually contain? | Yes (→ N04, N05, N12) |
| b1 | Triaging bugs (5.3) | Is this a legitimate problem? | Real failure, test set-up problem or duplicate | Which reported bugs are real? | Partly (→ N15) |
| b2 | Triaging bugs (5.3) | How difficult will this problem be to fix? | Cost of one repair: redesign, other teams, deadline | How big is the remaining work? (widened from one bug to the backlog) | Partly (→ N17) |
| b3 | Triaging bugs (5.3) | Is the problem worth fixing? | Benefit: users affected, user experience | Which bugs must be fixed before the milestone? | Yes (→ N16) |
| r1 | Reproducing a failure (5.4) | What does the failure look like? | Appearance, mostly from bug-report text and screenshots | What does the player see when it goes wrong? | Partly (→ N18) |
| r2 | Reproducing a failure (5.4) | In what situations does this failure occur? | Reproduction steps | — (QA detail) | Partly (→ N18) |
| u1 | Understanding execution behavior (5.5) | What code could have caused this behavior? | Debugging hypotheses | — | No |
| u2 | Understanding execution behavior (5.5) | What's statically related to this code? | Code structure: definitions, callers | What else does this change touch? | Partly (→ N11) |
| u3 | Understanding execution behavior (5.5) | What code caused this program state? | Debugging causality | — | No |
| d1 | Reasoning about design (5.6) | What is the purpose of this code? | Whether an API is public, internal, maintained or dead | What is this asset or system for? (a name says what, not what for) | Partly (→ N05) |
| d2 | Reasoning about design (5.6) | What is the program supposed to do? | Intended behaviour, from spec or common sense | What was this week's work meant to achieve? | Partly (→ N10) |
| d3 | Reasoning about design (5.6) | Why was this code implemented this way? | Historical rationale, from change history, bug reports or the author | Why was this change made? | Yes (→ N10) |
| d4 | Reasoning about design (5.6) | What are the implications of this change? | Consequences, discussed as hypothetical scenarios | What does this change mean for other disciplines and for testing? | Yes (→ N11) |
| a1 | Maintaining awareness (5.7) | How have resources I depend on changed? | Changes in what the developer's work depends on | Did shared packages, engine version or third-party assets change? | Yes (→ N22) |
| a2 | Maintaining awareness (5.7) | What have my coworkers been doing? | Awareness of teammates' work | What has each person and each discipline done this week? | Yes (→ N01, N02, N03) |
| a3 | Maintaining awareness (5.7) | What information was relevant to my task? | The developer recovering their own working state after interruptions; seen in one participant, V | — (see note 3) | No |

Kept fully or partly: 14 of 21 (s1, s3, b1, b2, b3, r1, r2, u2, d1, d2, d3, d4, a1, a2). Dropped: 7 (c1, c2, c3, s2, u1, u3, a3). A2 already states that "the debugging kinds are not" a producer's questions.

Two facts from the paper worth carrying into the spec: coworker awareness (a2) was the most common need across participants (15 of 17, Figure 4), and design rationale (d3) was among the most often unsatisfied (44% of searches, up to 21 minutes, §6.3). Design knowledge was mostly "only in coworkers' minds" (§7.1).

**Step 10 check log (15 October 2026).** What the 12 October draft said that misstated the paper, and what changed:

1. *c2 wording.* The draft table printed "data structure or function" while its note said the paper reads "of". The paper's §5.1 does read "of". The table now quotes it verbatim with [sic].
2. *c3 mapped to N07 (blocked).* Wrong. In §5.1, c3 is about an API's behavioural usage rules, not about pieces of work depending on each other. Ko et al. do observe blocking, but in §4 (task switches; developers "waited for email replies and for other teams to submit changes or fix bugs", blocked a median of 4 times per session), which is not one of the 21 types. c3 is now "No"; N07's seed reads "Ko §4 (blocking, not a type)" and N07 gets no Ko point.
3. *a3 mapped to N25 ("What do I need to tell whom?").* Wrong. In §5.7, a3 is a developer's awareness of their own work after interruptions ("Sometimes I have like 20 windows... I lose it!"), and §6.2 says it came from one participant (V). It has nothing to do with deciding what to report. a3 is now "No"; N25 gets no Ko point.
4. *d2 mapped to N23 (next week's work).* Wrong direction. d2 asks what the program is supposed to do, which is about intent, not the forward plan. d2 now feeds N10 (why a change was made); N23's seed is Endsley level 3 (A2) only, and it gets no Ko point.
5. *"Figure 3's list words s3, d4 and c3 slightly differently."* The worded list with participant initials is Figure 4 ("Information needs per participant"), not Figure 3 (a chart of search times and sources). Figure 4 words s3 as "What changes are part of this submission?", d4 as "What are the implications for this change?", c3 as "How can I coordinate this with the other code?" and r2 as "...does the failure occur?"; it also prints c2's question under the label c3 and b1's under b2. Cite the §5 wording, not Figure 4's.
6. *Softer readings, kept with a note.* s1 (an author's own pre-check, here asked afterwards by a producer), b2 (one bug's repair cost, here widened to the backlog) and d1 (purpose, not name) are kept as "Partly" rather than "Yes"; the "What the paper means" column says how far each one stretches.
7. Checked and correct: seventeen developers, Microsoft, 21 types, seven categories, the §5 question wording for the other 18 types.

## 2. Classification key

Three artefact sources, as in A2 Sub-question 1:
- **T** = tracker (tickets, cards, issues, boards)
- **R** = repository (git history: commits, paths, authors, dates)
- **U** = Unity asset layer (scene and prefab text, .meta GUIDs resolved through the AssetDatabase; also Unity's BuildReport for the stretch tier)

Each marked **D** derivable, **P** partly derivable, **N** not derivable. "Best source" is the single artefact that would supply most of it; where none does, the need goes to a person.

What D means here. **D** = the artefact answers the need whenever the team uses that artefact in the normal way (cards are moved to Done, commits are pushed). **P** = it answers only if somebody adds something the artefact does not require (a discipline tag, an issue number in the commit message, an estimate), or it gives a proxy that is not the thing asked (changed-file entries for effort). **N** = nothing in the artefact holds it.

Seed source codes: Ko type (a2 etc.), job-ad code (SR, EXT, RK, DP, XD, MS, CH, DOC, BLD, KC; job-ads-and-reviews.md), published source (P1–P6; published-sources.md), heuristic-pass finding (TR-, HP-, JI-, GP-; heuristic-coding-sheet.md), A2 (proposal or Appendix B item), or Lit (a source in A2's literature review).

## 3. The 25 needs (AI-drafted 15 October 2026; Raphael to accept or change)

IDs are kept stable so earlier files still point to the right row. N06 is merged into N05 and N13 into N12; the two NEW needs from the published sources are N26 and N27; NEW-3 is folded into N14. 25 needs remain. The edits are logged in §7.

| ID | Need, as a producer's question | Seed source | T | R | U | Best source | One-line reason | Evidence total (§5) |
|---|---|---|---|---|---|---|---|---|
| N01 | What did each discipline (code, art, audio, scenes) change this week? | a2; XD; P4; A2 Appendix B items 1, 3; T1 | P | D | D | R | File type classifies the change without anyone tagging it; the tracker has it only if cards are tagged by discipline (T1 partly in all four tools; TR-07). | 10 |
| N02 | What has each teammate been working on? | a2; P2, P3, P5, P6 | P | D | N | R | Commit authors and dates give who touched what; the tracker gives assignment, not activity (UXF: 2 of 124 issues have an assignee). | 3 |
| N03 | Which planned tasks were finished this week, and when? | a2; MS; V3; P3, P5, P6; T2 | D | P | N | T | "Done" is a tracker state; the repository shows it only where a commit cites the ticket. The date part holds only in trackers that record completion dates (GitHub, Jira), not on HacknPlan or Trello cards (HP-24, TR-14). | 12 |
| N04 | Which work happened with no ticket? | s3; Lit (Bertram et al., 2010); T5 | P | P | N | T + R | Needs both: commits that cite no ticket. Neither source alone answers it (UXF week: 5 of 9 commits). | 2 |
| N05 | Which scenes and prefabs changed, named as a designer would name them? | s3; d1; A2 Sub-question 2, Figure 3 | P | P | D | U | Scene and prefab files show in the paths, but the objects inside are named only in the prefab and scene text, and component GUIDs resolve only through the AssetDatabase. (Merged with N06.) | 1 |
| N07 | What is blocked, and on whom? | Ko §4 (blocking, not a type); DP; V2; P6; T4 | P | N | N | Person | A blocked state exists only where the team set up a convention (Trello list, Jira flag); HacknPlan free has none (HP-25) and GitHub shows a tiny dot (GP-09). Nothing in the files says "waiting". **Rejected-artefact case 1** (§3.1). | 8 |
| N08 | What risks are emerging for the milestone? | RK; P1, P4 | P | N | N | Person | Risk is a judgement; a tracker field holds it only if someone enters it. | 7 |
| N09 | Is the milestone on track? | MS; V3; P1, P2, P3, P6; T3 | P | N | N | T | Burndown, burn-up and due dates exist in some trackers (GitHub burn-up free; HacknPlan's burndown Premium, HP-27); the repository has no plan to compare against (UXF: 0 milestones). | 15 |
| N10 | Why was this change made? | d3; d2; Lit (Whitson, 2018); T5 | P | P | N | Person | Commit messages name intentions loosely; in the UXF week the rationale for "fix #46" sits in the issue thread (6 comments). **Rejected-artefact case 2** (§3.1). | 2 |
| N11 | What does this change affect, and what should we retest? | d4; u2; BLD; P4; A2 Appendix B item 5 | N | P | P | U | Prefab and scene references show what uses a changed asset; deciding what to test is still a judgement. | 3 |
| N12 | Which art, audio and other content files were added or removed this week? | s3; T1 | N | D | D | R | Git status A or D on the path; names from the asset layer; no-one has to report it. No tool in the pass showed files (T1 partly in all four). (Merged with N13.) | 5 |
| N14 | Is there a working build of this week's game, and if not, what broke? | s1; BLD; P3 (NEW-3) | P | N | P | U (BuildReport) | Unity's BuildReport holds result and failed steps (A2 stretch tier); git holds no build result; whether the build is playable and shows progress is a person's call. (NEW-3 folded in.) | 3 |
| N15 | Which bugs were fixed or opened this week? | b1; P5, P6 | D | P | N | T | Bug issues and close dates are tracker data; "fix #N" commits give partial coverage. In the UXF week only 1 of 6 closed issues carried a "bug" label, so in loosely labelled trackers this needs reading. | 3 |
| N16 | Which bugs must be fixed before the milestone? | b3; P5 | P | N | N | Person | Priority fields exist, but "worth fixing" is a call the producer or lead makes (P5: game-breaking bugs vs glitches speedrunners enjoyed). | 2 |
| N17 | How much work is left, and how hard is it? | b2; MS; V3; P1, P2, P3, P5, P6 | P | N | N | T | Estimates live in the tracker if entered (P1: "Burndowns require honest daily estimate updates"); history says nothing about remaining effort. | 12 |
| N18 | What does a reported problem look like to the player? | r1; r2; P5, P6 | P | N | N | T | Screenshots and repro steps sit in tickets (UXF #46 has a screenshot); nothing in the files shows the symptom. | 3 |
| N19 | Which work has gone quiet (started but no recent activity)? | Lit (Maddila et al., 2023); A2 challenge tier; P2, P6; T6 | P | P | P | T + R | Needs a started ticket plus no later commits or asset edits; no tool showed "untouched for N days" directly (T6). Composing across items is the point. | 6 |
| N20 | Where was this week's work concentrated? | P5; A2 prototype | N | P | P | R | Top-level folders and categories by changed-file entries (in the prototype). Entries are a proxy, not effort or time (P5 spoke of time on the tutorial), so P, not D. | 1 |
| N21 | Was this a code-heavy or content-heavy week? | A2 Appendix B item 3; Lit (Pascarella et al., 2018) | N | D | D | R | Code share of changed-file entries; the prototype already computes it. | 0 |
| N22 | Did shared dependencies change (packages, engine version, third-party SDKs)? | a1 | N | D | D | R | Packages/manifest.json and ProjectVersion.txt are in the repository (UXF: both changed in the Unity 6 migration, 26–27 Sep 2026). | 1 |
| N23 | What is the team working on next week? | Endsley L3 (A2); P5 | P | N | N | T / Person | The plan lives in the tracker or in people; history only shows the past. | 1 |
| N24 | What scope changed (features added, cut or deferred)? | CH; P4 | P | N | N | Person | Scope decisions are recorded, if at all, in tickets or meetings; a deleted file is not a cut feature. | 4 |
| N25 | What can I tell the publisher or partner about progress this week, and can I share it with someone who has no account? | SR; EXT; V1, V4; P1; T3, T7 | P | P | P | Person (composed) | A composite: facts come from T, R and U, but choosing what to say is the producer's. Every T3 update in the pass was written by hand; sharing without an account was partial or impossible (JI-08, HP-27). | 13 |
| N26 | Can I trust what the tracker says: is it up to date and complete, or has it gone stale? | DOC; P1, P2, P5, P6 (NEW-1); HP-24, TR-14, GP-04, HP-15 | P | P | N | T + R | A stale board looks like a current one unless it shows when cards last changed (HP-24, TR-14: no completion dates) or what fell out of it (GP-04, HP-15). Commits that cite cards give an independent record to check it against, but only where commits cite them (UXF 20 of 100; Inkform 0 of 126). | 7 |
| N27 | Who is available, and how many hours does the team really have? | P2, P5 (NEW-2) | P | N | N | Person | Hours and holidays live in time logs or calendars if kept (HacknPlan logs hours on completion, HP-19; Timetable is Premium); commit times record when work was saved, not time available. **Rejected-artefact case 3** (§3.1). | 2 |

Tally (best source): R 6 (N01, N02, N12, N20, N21, N22); U 3 (N05, N11, N14); T 5 (N03, N09, N15, N17, N18); T + R 3 (N04, N19, N26); Person 7 (N07, N08, N10, N16, N24, N25, N27); T or Person 1 (N23). Total 25.

Mark totals over 75 cells (25 needs × 3 sources): T: D 2, P 18, N 5. R: D 5, P 10, N 10. U: D 5, P 5, N 15.

### 3.1 Three needs where I name the artefact I rejected, and why (Evaluate measure)

Each case names the artefact that looks as if it could answer the need, and the evidence for rejecting it.

| Case | Need | Artefact rejected | Why it looks usable | Why it is rejected | Evidence |
|---|---|---|---|---|---|
| 1 | N07 What is blocked, and on whom? | Repository (R = N) | A branch with no commits for days looks like stalled work. | A gap in commits looks the same whether the person is blocked, ill, or working on something outside the repository, and nothing in git says "waiting on art". Even the tracker holds it only by team convention: 10 seconds where a list or flag existed (Trello, Jira), found only by its title in HacknPlan free (HP-25), a tiny dot in GitHub (GP-09). So the need goes to a person, with the tracker as a partial source. | heuristic-coding-sheet.md T4, HP-25, GP-09; published-sources.md P6 ("an immediate red flag") |
| 2 | N10 Why was this change made? | Unity asset layer (U = N) | ChangeLens can name every changed object and property, so the page seems to "explain" the change. | Scene and prefab text records which values changed, not the intent behind them. In the UXF week, commit a542376 says only "fix #46"; the reason (the Events tab breaking on Unity 2020.1.10f1) is in the issue thread, 6 comments and a screenshot, not in any file. Ko et al. found design rationale among the most often unsatisfied needs (d3: 44%) and mostly "only in coworkers' minds". The repository is P (a message may say why); the asset layer is N. | §4 below; Ko et al. §6.3, §7.1; A2 (Whitson, 2018: extraction names what changed but not why) |
| 3 | N27 Who is available, and how many hours does the team really have? | Repository (R = N) | Commit timestamps look like a time log: who worked, on which days. | Timestamps record when work was saved, not hours worked, hours available or holidays. In the UXF week, 7 of 9 commits by one person fall on three days; nothing says whether he worked three days or five, or part-time. The two sources that raise the need plan from time logs and booked holidays (P2) and from people averaging about 20 hours a week (P5), none of which is in git. | published-sources.md P2, P5; §4 below |

Considered and not picked: N23 (repository rejected: history only shows the past; true but obvious, so a weak test of judgement); N26 (tracker rejected as the only source for its own freshness, in favour of tracker plus repository; a good case, but the tracker is P, not N, so the rejection is partial). Raphael can swap either in.

## 4. Unity Experiment Framework check (run 15 October 2026)

Repository: https://github.com/immersivecognition/unity-experiment-framework. A2 calls this case "illustrative"; it is one week of one repository, not a measurement of all needs.

**Repository-wide facts** (GitHub API and a blobless clone of master, 15 October 2026): 124 issues (34 open) and 42 pull requests; 17 issues carry a label, 2 have an assignee (#2 and #9), 0 milestones exist; 471 non-merge commits; latest commit 27 September 2026; tags up to 3.0.0. A2's corpus screen (17 September 2026): 20 genuine issue references per 100 non-merge commits, the best-linked of five repositories; full-history code share 19.2%. The 12 October note that "no labels, assignees or milestones" were visible held only for the first issues page; labels exist on older issues.

**Week chosen: Monday 9 to Sunday 15 November 2020 (UTC).** Rule, fixed before looking at the needs: the most recent week with at least four non-merge commits on master, at least two human commit authors, and at least three issue or pull-request events (opened or closed) by people, not bots. Later weeks fail the rule: 21–27 September 2026 has one human author plus Dependabot; 2022 and 2021 weeks have one author each.

What happened that week:
- **History:** 9 non-merge commits (Jack Brookes 7, Matthew Warburton 2) and 2 merge commits. Commits: https://github.com/immersivecognition/unity-experiment-framework/commits/master?since=2020-11-09&until=2020-11-15
- **Tracker:** 4 issues opened (#45, #46, #48, #49), 1 pull request opened and merged (#47, "Improved trackers", body "Fixes #2 Fixes #9 Fixes #45"), 6 issues closed (#2, #9, #45, #46, #48, #49). Issue links: https://github.com/immersivecognition/unity-experiment-framework/issues/46 (and /2, /9, /45, /47, /48, /49).
- **Links between them:** 2 of 9 commit messages cite an issue (a542376 "fix #46"; 6200f5e "fix #49 #48"); 2 more commits (b9e72c5, 76ac6ec) reach issues through PR #47. 5 of 9 are linked to nothing: 4809664 and c7be149 (Multi Scene Example fixes), d1e0f8f ("err messages"), 54eb678 ("version"), 8251ee6 (README).
- **Releases:** 2.0.4 on 11 November ("Fix #46 and merge PR #47") and 2.0.5 on 13 November ("address #48 #49").

| Need | Could UXF's tracker plus history answer it for this week? | Counts and why |
|---|---|---|
| N02 What has each teammate been working on? | **Y** | History names both authors (7 and 2 commits) and their files. The tracker adds little: the only 2 assignees in the whole repository are on #2 (jackbrookes) and #9 (mwarb). Git names and GitHub logins differ ("Matthew Warburton" vs "mwarb"), so a tool must map them. |
| N03 Which planned tasks were finished this week? | **Partly** | 6 issues closed, all with dates. Nothing marks which were planned: there are no milestones, and 3 of the 6 (#45, #48, #49) were opened by the maintainer and closed within 0–2 days, so they log work as much as plan it. Only #2 and #9 (open since 2018) were clearly planned earlier. |
| N04 Which work happened with no ticket? | **Y** (by composing T and R) | 5 of 9 non-merge commits cite no issue and sit outside PR #47. All are small (example-scene fixes, error messages, version bump, README), which shows untracked is not the same as unplanned or important. |
| N09 Is the milestone on track? | **N** | 0 milestones and no due dates in the tracker; the releases record what shipped after the fact, not what was planned. |
| N15 Which bugs were fixed or opened this week? | **Partly** | By label: 1 bug fixed (#2) and 0 opened. By reading titles and bodies: 3 fixed (#2, #46, #48) and 2 opened (#46, #48). Only 2 of the 6 closed issues carry any label. |
| N22 Did shared dependencies change? | **Y** | Packages/manifest.json and ProjectSettings/ProjectVersion.txt are in the repository and neither changed this week (last change 0cde1e3, 12 October 2020), so "no" is answerable from history. But the week's main bug (#46) came from an outside user's Unity 2020.1.10f1, a dependency change that history cannot show because it was not the repository's. Contrast: in 21–27 September 2026 both files changed (3ed6ee7, 33cc869, the Unity 6 migration). |

Result: Y 3 (N02, N04, N22), Partly 2 (N03, N15), N 1 (N09). These agree with the §3 marks: N02 R = D, N04 T + R, N22 R = D, N09 R = N and T = P. Two notes on marks kept: N03 and N15 stay T = D, because in a tracker used in the normal way (sprints or milestones, a bug type) they are recorded; UXF shows what happens when a tracker is used loosely, which the "Partly" verdicts record. Raphael may prefer T = P for both; if so, change them here and in the handoff.

## 5. Choosing the ten for the Deliverable 3 sheet

A2 says the sheet uses "the ten needs Deliverable 1 raises most often". The rule below was fixed before counting. The cap in step 1 and the code-to-need map were set on 15 October 2026, before the totals were computed.

1. **Count evidence items per need.** One point each for:
   - a **published source** supporting it, **capped at 2 per need** (this replaces A2's "an interviewee raising it, max 1 per interviewee, 0–2"; see the cap paragraph below);
   - a **tool** in the heuristic pass where the task probing it failed or was only partly done (0–4, one per tool; pass points in §6);
   - a **job ad** coded to it (0–10; one per ad however many phrases);
   - a **review** coded to it (0–5), **but only once the review is verified on the live page** (V1–V4 verified on 15 October 2026; V5 not, so it scores 0);
   - a **Ko type** it adapts (1 if any, after the §1 check).

   Code-to-need map, one need per code wherever the code's definition restates a need: SR and EXT → N25; RK → N08; DP → N07; XD and KC → N01 (KC now has no ad); MS → N09, N03, N17 (its definition covers milestones, sprint delivery and burndown); CH → N24; DOC → N26; BLD → N14, N11; TN → none. Earlier drafts also linked XD to N05, N12 and N20; those links were removed because "keep visible the work of several disciplines" does not ask which scenes changed, which files were added or where work concentrated.
2. **Rank by total.** The ten highest go on the sheet.
3. **Ties at tenth place:** prefer the need raised by more distinct kinds of evidence (sources, inspection, ads, reviews, Ko), then the one raised in a published source. For ordering the runners-up only: then the higher uncapped source count, then the lower ID.
4. **Do not balance by classification.** The sheet tests whether readers agree with the marking; choosing needs for a neat mix of D, P and N would bias that. Report the mix that results.
5. **Record the counts** (table below) and keep this file's history, so the ranking can be traced.
6. **Write each of the ten in plain words** a reader with no repository access understands (HANDOFF-TO-D3.md), and keep the marking off the participant sheet.

**The cap (AI-drafted, Raphael to accept or change).** Cap the published-source stream at 2 points per need. A2 gave interviews at most 2 points per need because there were two interviewees; without a cap, six sources could give a need 6 points, more than the whole heuristic pass (0–4), which is the only stream here that observed tools directly. The sources are also weaker evidence than interviews would have been: they were written for other purposes, did not answer my questions, are self-selected accounts of projects that shipped, and two are journalists' reports of talks. Capping at 2 keeps the stream at the weight A2 planned for its replacement, so swapping interviews for sources does not quietly change the balance of the rule. It still separates a need raised by two or more sources (2) from one raised by a single source (1). Effect: with the cap and without it, the same nine needs make the top ten; only tenth place changes (N12 with the cap, N02 without, because N02 has 4 sources).

**Counts and ranks (15 October 2026, after the web verification of the ads and reviews).** Ad codes are the verified ones in job-ads-and-reviews.md §2.2 (15 October 2026, 13 code changes logged in its §2.3). Reviews V1 to V4 were verified on the live G2 and Capterra pages with codes unchanged, and are scored; V5 (Jira, XD → N01) is still unverified and scores 0. "Kinds" counts the streams that give at least one point.

| Rank | Need | Ads | Reviews (V1–V4 verified; V5 not scored) | Sources, capped (raw) | Pass | Ko | Total | Kinds |
|---|---|---|---|---|---|---|---|---|
| 1 | N09 Milestone on track | 8 | 1 | 2 (4) | 4 | 0 | 15 | 4 |
| 2 | N25 What to tell the publisher | 6 | 2 | 1 (1) | 4 | 0 | 13 | 4 |
| 3 | N17 Work left and how hard | 8 | 1 | 2 (5) | 0 | 1 | 12 | 4 |
| 4 | N03 Planned tasks finished | 8 | 1 | 2 (3) | 0 | 1 | 12 | 4 |
| 5 | N01 Each discipline's changes | 4 | 0 | 1 (1) | 4 | 1 | 10 | 4 |
| 6 | N07 Blocked, on whom | 4 | 1 | 1 (1) | 2 | 0 | 8 | 4 |
| 7 | N26 Tracker fresh and complete | 5 | 0 | 2 (4) | 0 | 0 | 7 | 2 |
| 8 | N08 Emerging risks | 5 | 0 | 2 (2) | 0 | 0 | 7 | 2 |
| 9 | N19 Gone quiet | 0 | 0 | 2 (2) | 4 | 0 | 6 | 2 |
| 10 | N12 Content added or removed | 0 | 0 | 0 (0) | 4 | 1 | 5 | 2 |
| 11 | N24 Scope changed | 3 | 0 | 1 (1) | 0 | 0 | 4 | 2 |
| 12 | N11 What to retest | 1 | 0 | 1 (1) | 0 | 1 | 3 | 3 |
| 13 | N14 Working build | 1 | 0 | 1 (1) | 0 | 1 | 3 | 3 |
| 14 | N02 What each teammate did | 0 | 0 | 2 (4) | 0 | 1 | 3 | 2 |
| 15 | N15 Bugs fixed or opened | 0 | 0 | 2 (2) | 0 | 1 | 3 | 2 |
| 16 | N18 What the player sees | 0 | 0 | 2 (2) | 0 | 1 | 3 | 2 |
| 17 | N16 Bugs that must be fixed | 0 | 0 | 1 (1) | 0 | 1 | 2 | 2 |
| 18 | N04 Work with no ticket | 0 | 0 | 0 (0) | 1 | 1 | 2 | 2 |
| 19 | N10 Why the change was made | 0 | 0 | 0 (0) | 1 | 1 | 2 | 2 |
| 20 | N27 Capacity and hours | 0 | 0 | 2 (2) | 0 | 0 | 2 | 1 |
| 21 | N20 Where work concentrated | 0 | 0 | 1 (1) | 0 | 0 | 1 | 1 |
| 22 | N23 Next week's work | 0 | 0 | 1 (1) | 0 | 0 | 1 | 1 |
| 23 | N05 Scenes and prefabs by name | 0 | 0 | 0 (0) | 0 | 1 | 1 | 1 |
| 24 | N22 Dependencies changed | 0 | 0 | 0 (0) | 0 | 1 | 1 | 1 |
| 25 | N21 Code-heavy or content-heavy | 0 | 0 | 0 (0) | 0 | 0 | 0 | 0 |

Ad counts per ad (job-ads-and-reviews.md §2.2): MS 8 (A01–A07, A09) → N09, N03, N17; SR or EXT 6 (A01, A02, A03, A06, A07, A08) → N25; RK 5 (A01–A04, A09) → N08; DOC 5 (A01, A02, A05, A06, A10) → N26; DP 4 (A01, A04, A05, A06) → N07; XD 4 (A01, A02, A04, A07) → N01; CH 3 (A01, A03, A04) → N24; BLD 1 (A04) → N11, N14; KC 0. Reviews: V1, V4 (SR) → N25; V2 (DP) → N07; V3 (MS) → N09, N03, N17; V5 (XD) → N01, not scored until verified. Sources after the 15 October recoding (published-sources.md §5).

Ties. At 3 points, N11 and N14 (3 kinds) rank ahead of N02, N15 and N18 (2 kinds); N02 is ahead of N15 and N18 on uncapped sources (4 against 2); N15 is ahead of N18 only by the lower-ID rule. No tie falls at tenth place.

**The ten for the sheet:** N01, N03, N07, N08, N09, N12, N17, N19, N25, N26 (in catalogue order). **Five runners-up:** N24, N11, N14, N02, N15 (in rank order).

**Checks on the choice.** With the reviews left out entirely, the same ten come out (N25 drops from second to fourth). Without the source cap, nine of the ten are the same and N02 (5 points from 4 sources) takes tenth place from N12 under the tie rule. Against the provisional codes used earlier on 15 October, verification moved N24 out (CH fell from 4 ads to 3 when A09's CH code was removed) and N12 in.

**Mix that results (step 4: reported, not balanced).** Best source among the ten: tracker 3 (N03, N09, N17), tracker + repository 2 (N19, N26), repository 2 (N01, N12), person 3 (N07, N08, N25). Only N01 and N12 are derivable from the repository or asset layer; N05 (scenes and prefabs by name, the need Sub-question 2 tests) ranks 23rd. That is the headline finding of D1: what producers and their job ads ask for most is plan-side information that ChangeLens does not read. It must be stated in the spec and the A3 report, not hidden.

**How fragile the ranking is.** The top five are robust (totals 10 to 15, four kinds each). Tenth place is not: N12 (5), N24 (4) and N02 (3, or 5 uncapped) are within two points. N12's 5 rests on 4 pass points from one AI evaluator (T1 partly done in all four tools) plus one Ko type; if Raphael's hand check of the pass changes T1, N12 can fall below N24.

**Re-run note.** Rerun the count, using this same rule, if any of these change: an ad code (Raphael's own check of the verified ads), a review once it is verified on G2 or Capterra (then score it), a source coding (published-sources.md §3), or a pass outcome after his hand check. Then update HANDOFF-TO-D3.md. The script that produced this table was run on 15 October 2026; the arithmetic is simple enough to redo by hand from the columns.

## 6. Evidence from the heuristic pass (added 14 October 2026)

Source: heuristic-coding-sheet.md §5, the pass Claude ran through the browser on Raphael's accounts on 14 October 2026 (single AI evaluator; Trello on an automatic Premium trial, Jira on a Standard trial, HacknPlan and GitHub on free plans; severity 3–4 findings still need Raphael's hand check). This section records what the pass shows for each need. It does not fill the "Evidence count" column in §3, because the other evidence kinds are not counted yet.

**Pass points under the §5 rule** ("a tool task in the heuristic pass that failed or was only partly completed because of it, 0–4, one per tool"). How they were counted: each task maps to the needs in the task script (heuristic-coding-sheet.md §4); "Partly", "N" and "Y / partly" each score 1; "N (not tested)" scores 0, because a task that was not tried did not fail; a need probed by two tasks still scores at most 1 per tool.

| Need | Task(s) | Trello | HacknPlan | Jira (trial) | GitHub | Pass points | What the pass shows |
|---|---|---|---|---|---|---|---|
| N01 Each discipline's changes | T1, T6 | Partly | Partly | Partly | Partly | 4 | Every tool answered "what art changed" with art-tagged tasks, never with changed files. Discipline shows only where someone tagged it; Trello's colour bars hide it (TR-07); HacknPlan has discipline categories built in and per-discipline counts in Metrics. |
| N12 New art and audio assets | T1 | Partly | Partly | Partly | Partly | 4 | No tool showed which art or audio files were added. Supports the provisional T = N. |
| N02 What each teammate has been working on | T2 | Y | Y | Y | Y | 0 | All four found Dev B's cards, but only through tags or labels, because none allows a fictional assignee. Trello's keyword search gave a wrong answer first (TR-12). |
| N03 Which planned tasks were finished this week | T2 | Y | Y | Y | Y | 0 | "Finished" was found everywhere; "this week" could be checked only in GitHub (Closed field, issue timeline) and Jira (resolution dates). HacknPlan and Trello cards carry no completion date (HP-24, TR-14). Only Jira's Summary gave a weekly completed count out of the box ("8 completed in the last 7 days", on a Standard trial). |
| N09 Is the milestone on track | T3 | Partly | Partly | Y / partly | Partly | 4 | GitHub free has a burn-up chart; HacknPlan's Burndown is Premium (HP-27) but Metrics gives "7 of 9 closed (78%)"; Trello free gives nothing beyond list counts (TR-13); Jira's Summary is the closest, on a trial. No estimates were seeded, so "on track" against a plan was not tested. |
| N25 What can I tell others | T3, T7 | Partly | Partly (T3), N (T7) | Y / partly (T3), Partly (T7) | Partly | 4 | Every T3 update had to be written by hand. Sharing without an account: Trello Print/CSV/JSON, GitHub CSV, Jira per item only (JI-08), HacknPlan nothing on free (HP-27). |
| N07 What is blocked, and on whom | T4 | Y | Partly | Y | Partly | 2 | Fast where a convention exists (Trello custom list, Jira flag, about 10 s each); HacknPlan free has no blocked state (HP-25); GitHub shows only a tiny red dot on the board (GP-09). Supports T = P and best source Person: the tracker holds it only if someone records it. |
| N08 Emerging risks | T4 | Y | Partly | Y | Partly | 0 | The partial results were about blocked status (N07), not risk. No "at risk" item was seeded, so risk was not tested. |
| N04 Work with no ticket | T5 | N (not tested) | N | N (not tested) | Y | 1 | On the plans seen, only GitHub links task to code natively (issue timeline shows the closing commit and its files). HacknPlan's integrations are Premium; Trello's Power-Up and Jira's GitHub app needed an OAuth grant and were not tried. Even in GitHub the link exists only when the commit message cites the issue (GP-10), which is exactly what N04 is about. |
| N10 Why was this change made | T5 | N (not tested) | N | N (not tested) | Y | 1 | Weak evidence: T5 tested whether the link exists, not the rationale. GitHub's link leads to the commit message, which is where rationale would sit; no other tool linked to code on the plans seen. |
| N19 Work that has gone quiet | T6 | Y / partly | N | Y / partly | Partly | 4 | Trello's and Jira's feeds give recent changes but no date filter (TR-15, JI-07); Trello hides label edits (TR-16); HacknPlan free has no activity feed (HP-26); GitHub's `updated:` filter lists which items changed, not what changed (GP-08). None shows "started but untouched for N days" directly. |

Needs not probed by any task (pass points 0): N05, N06, N11, N13, N14, N15, N16, N17, N18, N20, N21, N22, N23, N24. Side observations only: N20, HacknPlan's Metrics splits closed tasks by discipline category; N17, no estimates were seeded, so remaining effort was not tested; N15, no bug cards were seeded.

NEW needs from published-sources.md §4: NEW-1 (freshness) is touched by HacknPlan's "Log work" prompt on completion (HP-19) and by GitHub's commit-driven closing (GP-10, published-sources.md §6.1, point 2); NEW-2 (capacity) was not tested, and HacknPlan's Timetable and Calendar are Premium; NEW-3 (playable build) was not tested.

**Change log for the provisional marks.** 14 October 2026: no T / R / U or D / P / N mark changed. The pass agrees with the provisional tracker marks it touched: N01 T = P (discipline only through tags), N12 T = N (no tool showed files), N04 T = P (only GitHub, and only through commit messages), N07 T = P (only if a convention is used). N03 stays T = D, with a note that it holds only in a tracker that records completion dates (GitHub, Jira), not on HacknPlan's or Trello's cards. The pass gives no evidence about the R or U columns, because the repository side was tested only in GitHub with placeholder files.

## 7. Change log, 15 October 2026 (AI-drafted; Raphael to accept or change)

**Plan note for §6 (from tool-selection.md, re-verified 15 October 2026).** Some §6 observations were made on trials, not Free: Trello's CSV export is Premium (Free exports JSON only), and Jira Free's Summary tab is unverified (seen on a Standard trial). HacknPlan's GitHub integration, dependency editing, custom columns, burndown and metrics export are paid, as the pass found. None of this changes a pass point: each affected task was already scored "Partly" or "N", and on Free the result would be no better.

**Needs edited (step 11).** 25 needs before, 25 after.

| Change | Needs | Reason |
|---|---|---|
| Merged | N06 into N05 ("Which scenes and prefabs changed, named as a designer would name them?") | Same question at two levels of detail, same artefact (U), same evidence (A2 only). Two rows would let the asset layer count twice on the D3 sheet. |
| Merged | N13 into N12 ("Which art, audio and other content files were added or removed?") | Both are git status letters on content paths; N13 had no evidence of its own. |
| Added | N26 (was NEW-1): can I trust the tracker, is it up to date and complete? | Four of six sources (P1, P2, P5, P6); five ads code DOC (keep the tracker current); the pass found stale or incomplete boards it could not detect (HP-24, TR-14, GP-04, HP-15). "Complete" was added from the pass: GitHub silently left issue #1 out of the import (GP-04) and HacknPlan dropped a card out of the sprint board with no notice (HP-15). |
| Added | N27 (was NEW-2): who is available, how many hours does the team have? | P2 (time logs, holidays), P5 (about 20 hours a week; quarterly hours review). |
| Folded in | NEW-3 into N14 ("Is there a working build of this week's game, and if not, what broke?") | One source only (P3); close to N14. |
| Reworded | N03 adds "and when"; N25 adds sharing with someone who has no account | The pass showed "this week" could not be checked on HacknPlan or Trello cards (HP-24, TR-14), and that sharing without an account is a separate failure (T7, JI-08, HP-27). |
| Reworded | N20 "effort" → "work" | Changed-file entries are not effort. |

Considered and not added: a separate need for "discipline labels I can read at a glance" (TR-07, GP-05). It is a display problem of N01, not a new question.

**Marks changed (step 12).**

| Need | Was | Now | Reason |
|---|---|---|---|
| N20 | R = D | R = P | Changed-file entries are a proxy for where work went, not effort or time; the one source (P5) talks about time spent. Under §2's definition that is P. |
| N05 (merged) | N05 T P / R P / U D; N06 T N / R P / U D | T P / R P / U D | A scene name in a ticket is common enough to keep T = P. |
| N12 (merged) | N12 and N13 both T N / R D / U D | unchanged | — |
| N07 | seed c3 | seed Ko §4 | §1 check, note 2. Marks unchanged. |
| N23 | seed d2 | seed Endsley L3 (A2) | §1 check, note 4. Marks unchanged. |

Considered and kept: N03 and N15 at T = D (see §4); N01 at R = D, accepting that a file category stands in for a discipline (a programmer can edit a prefab); this is said on the page.

**Evidence rule (step 14).** Published-source stream capped at 2; code-to-need map written out and XD's links to N05, N12 and N20 removed; reviews score only once verified (V1–V4 yes, V5 no); ranks recounted with the verified ad codes and reviews. Earlier on 15 October, with the provisional codes, tenth place was N24; after verification it is N12 (§5).

**Rejected-artefact cases (step 12).** N07 (repository), N10 (asset layer), N27 (repository); the draft's N23 was replaced by N27 because "history only shows the past" is obvious and tests little judgement.

## 8. Judgements Raphael must accept or change

All AI-drafted on 15 October 2026. Mark each "accepted" or write the change.

1. §1: the six changes to the Ko et al. adaptation, items 1 to 6 of the step 10 check log (items 1 to 4 correct misstatements: c2, c3, a3, d2; item 5 the Figure 4 citation; item 6 a note on three softer readings).
2. §3: the two merges (N05 + N06, N12 + N13), the two additions (N26, N27), folding NEW-3 into N14, and the rewordings.
3. §3: every T / R / U × D / P / N mark (75 cells), and the definition of D and P in §2. In particular N20 R = P (changed), N03 and N15 T = D (kept), N01 R = D (kept).
4. §3.1: the three rejected-artefact cases N07, N10, N27.
5. §4: the UXF week-selection rule and the six verdicts.
6. §5: the cap of 2 on the source stream, the code-to-need map, scoring only verified reviews (V1–V4), and the resulting ten and five runners-up.
7. published-sources.md §3 recodes, §5 tally and §6.1 reconciliation (marked there).
