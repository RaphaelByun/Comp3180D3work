# Needs catalogue — DRAFT

Deliverable 1, 3 hours in A2: "25 needs classified by artefact source, seeded from Ko et al.'s 21 types and checked against the Unity Experiment Framework". Learning Goal *Evaluate*: "every need classified against a named artefact, with three needs where I name the artefact I rejected and why."

**Status: DRAFT, 12 October 2026.** The 25 needs and the classifications are a starting draft prepared by Claude Code from Ko et al. (2007), the job-ad scan and A2. Every classification is a provisional suggestion for Raphael to accept, change or reject; the evidence counts that decide the final ranks come only after the heuristic pass and the two interviews.

**Update, 14 October 2026.** The heuristic pass is done (by Claude, through the browser; Raphael still hand-checks the severity 3–4 findings) and its evidence per need is in §6, with pass points under the §5 rule. The two interviews were dropped and replaced by six coded published sources (published-sources.md); wherever §5 says "interviewee", read "published source", and see published-sources.md §5 on whether to cap that stream at 2. No provisional mark was changed (change log at the end of §6).

## 1. Ko et al. (2007): the 21 information types, adapted

Source: Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. *Proceedings of the 29th International Conference on Software Engineering* (ICSE '07), 344–353. IEEE. https://doi.org/10.1109/ICSE.2007.45. Read from the Microsoft Research copy, https://www.microsoft.com/en-us/research/wp-content/uploads/2007/05/icse07_ko.pdf, retrieved 12 October 2026. Seventeen developers observed at Microsoft; 21 types in seven work categories (§5.1–5.7).

The question column is the paper's wording as extracted from the PDF text (check against the PDF; c2's "data structure of function" is the paper's own typo, and Figure 3's list words s3, d4 and c3 slightly differently). The adaptation column is my rewording for a producer reading a week, not the paper's.

| ID | Category (§) | Ko et al. question | Producer's weekly analogue | Keep? |
|---|---|---|---|---|
| c1 | Writing code (5.1) | What data structures or functions can be used to implement this behavior? | — (implementation choice) | No |
| c2 | Writing code (5.1) | How do I use this data structure or function? | — | No |
| c3 | Writing code (5.1) | How can I coordinate this code with this other data structure or function? | Which pieces of work depend on each other? | Partly (→ N07) |
| s1 | Submitting a change (5.2) | Did I make any mistakes in my new code? | Did this week's changes break anything? | Yes (→ N14) |
| s2 | Submitting a change (5.2) | Did I follow my team's conventions? | — (code review) | No |
| s3 | Submitting a change (5.2) | Which changes are part of this submission? | What does each commit or pull request actually contain? | Yes (→ N04, N06) |
| b1 | Triaging bugs (5.3) | Is this a legitimate problem? | Which reported bugs are real? | Partly (→ N15) |
| b2 | Triaging bugs (5.3) | How difficult will this problem be to fix? | How big is the remaining work? | Yes (→ N17) |
| b3 | Triaging bugs (5.3) | Is the problem worth fixing? | Which bugs must be fixed before the milestone? | Yes (→ N16) |
| r1 | Reproducing a failure (5.4) | What does the failure look like? | What does the player see when it goes wrong? | Partly (→ N18) |
| r2 | Reproducing a failure (5.4) | In what situations does this failure occur? | — (QA detail) | Partly (→ N18) |
| u1 | Understanding execution (5.5) | What code could have caused this behavior? | — (debugging) | No |
| u2 | Understanding execution (5.5) | What's statically related to this code? | What else does this change touch? | Partly (→ N11) |
| u3 | Understanding execution (5.5) | What code caused this program state? | — (debugging) | No |
| d1 | Reasoning about design (5.6) | What is the purpose of this code? | What is this asset or system for? | Partly (→ N06) |
| d2 | Reasoning about design (5.6) | What is the program supposed to do? | What was this week's work meant to achieve? | Yes (→ N23) |
| d3 | Reasoning about design (5.6) | Why was this code implemented this way? | Why was this change made? | Yes (→ N10) |
| d4 | Reasoning about design (5.6) | What are the implications of this change? | What does this change mean for other disciplines and for testing? | Yes (→ N11) |
| a1 | Maintaining awareness (5.7) | How have resources I depend on changed? | Did shared packages, engine version or third-party assets change? | Yes (→ N22) |
| a2 | Maintaining awareness (5.7) | What have my coworkers been doing? | What has each person and each discipline done this week? | Yes (→ N01, N02) |
| a3 | Maintaining awareness (5.7) | What information was relevant to my task? | What do I need to tell whom? | Yes (→ N25) |

Kept fully or partly: 16 of 21. Dropped: c1, c2, s2, u1, u3 (developer-only). A2 already states that "the debugging kinds are not" a producer's questions.

## 2. Classification key

Three artefact sources, as in A2 Sub-question 1:
- **T** = tracker (tickets, cards, issues, boards)
- **R** = repository (git history: commits, paths, authors, dates)
- **U** = Unity asset layer (scene and prefab text, .meta GUIDs resolved through the AssetDatabase; also Unity's BuildReport for the stretch tier)

Each marked **D** derivable, **P** partly derivable, **N** not derivable. "Best source" is the single artefact that would supply most of it; where none does, the need goes to a person.

Seed source codes: Ko type (a2 etc.), job-ad code (SR, EXT, RK, DP, XD, MS, CH, DOC, BLD, KC; job-ads-and-reviews.md), A2 (proposal or Appendix B item), Lit (a source in A2's literature review), or **TBC** (to be confirmed by heuristic pass or interviews).

## 3. Candidate needs (DRAFT)

| ID | Need, as a producer's question | Seed source | T | R | U | Best source | One-line reason (provisional) | UXF check | Evidence count (fill later) |
|---|---|---|---|---|---|---|---|---|---|
| N01 | What did each discipline (code, art, audio, scenes) change this week? | a2; XD; A2 Appendix B items 1, 3 | P | D | D | R | File type classifies the change without anyone tagging it; the tracker has it only if cards are tagged by discipline. | — | |
| N02 | What has each teammate been working on? | a2 | P | D | N | R | Commit authors and dates give who touched what; the tracker gives assignment, not activity. | Commit authors readable; no assignees visible on the first page of issues (12 Oct 2026). | |
| N03 | Which planned tasks were finished this week? | a2; MS | D | P | N | T | "Done" is a tracker state; the repository shows it only where a commit cites the ticket. | 20 of the last 100 non-merge commits cite an issue (A2 corpus screen, 17 Sep 2026), e.g. "fix #81" (4 Oct 2021). | |
| N04 | Which work happened with no ticket? | s3; Lit (Bertram et al., 2010) | P | P | N | T + R | Needs both: commits that cite no ticket. Neither source alone answers it. | About 80 of the last 100 non-merge commits cite no issue, so most UXF work would show as untracked. | |
| N05 | Which scenes or levels changed? | A2 (Sub-question 2); XD | P | P | D | U | .unity files changed are scenes; the asset layer names them; the tracker only if someone wrote it. | — | |
| N06 | Which prefabs or game objects changed, by name? | s3; d1; A2 Figure 3 | N | P | D | U | Object names are in the prefab text and GUIDs resolve through the AssetDatabase; the path alone gives the file, not the object. | — | |
| N07 | What is blocked, and on whom? | c3; DP; TBC | P | N | N | Person | Only a "Blocked" status or a comment says so; nothing in the files says "waiting". **Candidate rejected-artefact case** (repository rejected). | — | |
| N08 | What risks are emerging for the milestone? | RK | P | N | N | Person | Risk is a judgement; a tracker field holds it only if someone enters it. | — | |
| N09 | Is the milestone on track? | MS | P | N | N | T | Burndown and due dates exist in trackers; the repository has no plan to compare against. | Release tags (2.4.x, 3.0.0) mark what shipped, not what was planned. | |
| N10 | Why was this change made? | d3; Lit (Whitson, 2018) | P | P | N | Person | Commit messages name intentions loosely ("Fix restart bug (#588)" touched 35 files); rationale is in people. **Candidate rejected-artefact case** (asset layer rejected). | Commit messages are short ("fix #81"); issue threads hold some rationale. | |
| N11 | What does this change affect, and what should we retest? | d4; u2; BLD; A2 Appendix B item 5 | N | P | P | U | Prefab and scene references show what uses a changed asset; deciding what to test is still a judgement. | — | |
| N12 | What new art and audio assets were added? | XD | N | D | D | R | Added files with art or audio extensions; no-one has to report it. | — | |
| N13 | What was deleted or removed? | s3 | N | D | D | R | Git status D on the path; names from the asset layer. | — | |
| N14 | Did the build succeed, and what broke? | s1; BLD | P | N | P | U (BuildReport) | Unity's BuildReport holds result and failed steps (A2 stretch tier); git holds no build result. | No CI build reports checked; to confirm. | |
| N15 | Which bugs were fixed or opened this week? | b1; TBC | D | P | N | T | Bug issues and close dates are tracker data; "fix #N" commits give partial coverage. | 124 issues in total, about 34 open (issues page, 12 Oct 2026); no labels visible, so "bug" vs feature would need reading. | |
| N16 | Which bugs must be fixed before the milestone? | b3 | P | N | N | Person | Priority fields exist, but "worth fixing" is a call the producer or lead makes. | — | |
| N17 | How much work is left, and how hard is it? | b2; MS | P | N | N | T | Estimates live in the tracker if entered; history says nothing about remaining effort. | — | |
| N18 | What does a reported problem look like to the player? | r1; r2 | P | N | N | T | Screenshots and repro steps sit in tickets; nothing in the files shows the symptom. | Issue #190 (crash with VR after adding LSL4Unity) has a written description; to check for screenshots. | |
| N19 | Which work has gone quiet (started but no recent activity)? | Lit (Maddila et al., 2023); A2 challenge tier | P | P | P | T + R | Needs a started ticket plus no later commits or asset edits; composing across items is the point. | — | |
| N20 | Where was this week's effort concentrated? | XD; TBC | N | D | P | R | Top-level folders and categories by changed-file entries (already in the prototype). Entries are not effort; say so. | — | |
| N21 | Was this a code-heavy or content-heavy week? | A2 Appendix B item 3; Lit (Pascarella et al., 2018) | N | D | D | R | Code share of changed-file entries; the prototype already computes it. | UXF full-history code share 19.2% (A2 Appendix A). | |
| N22 | Did shared dependencies change (packages, engine version, third-party SDKs)? | a1 | N | D | D | R | Packages/manifest.json and ProjectVersion.txt are in the repository. | UXF 3.0.0 moved to a Unity 6 package (README, 12 Oct 2026); visible in history. | |
| N23 | What is the team working on next week? | d2; Endsley L3 (A2) | P | N | N | T / Person | The plan lives in the tracker or in people; history only shows the past. **Candidate rejected-artefact case** (repository rejected). | — | |
| N24 | What scope changed (features added, cut or deferred)? | CH | P | N | N | Person | Scope decisions are recorded, if at all, in tickets or meetings; a deleted file is not a cut feature. | — | |
| N25 | What can I tell the publisher or partner about progress this week? | a3; SR; EXT | P | P | P | Person (composed) | A composite: facts come from T, R and U, but choosing what to say is the producer's. | — | |

Provisional tally (best source): R 7 (N01, N02, N12, N13, N20, N21, N22); U 4 (N05, N06, N11, N14); T 5 (N03, N09, N15, N17, N18); T + R 2 (N04, N19); Person 6 (N07, N08, N10, N16, N24, N25); T or Person 1 (N23). Total 25. Recount after editing.

## 4. Unity Experiment Framework check

Repository: https://github.com/immersivecognition/unity-experiment-framework. Facts used above, all public:
- A2 corpus screen (17 September 2026, corpus/results.md): 20 genuine issue references per 100 non-merge commits, the best-linked of the five repositories screened; full-history code share 19.2%.
- Issues page, https://github.com/immersivecognition/unity-experiment-framework/issues?q=is%3Aissue, read 12 October 2026: 124 issues, badge showing 34 (likely open); no labels, assignees or milestones visible on the first page; newest is #190 (7 June 2026).
- Blobless clone, 12 October 2026: 471 non-merge commits on the default branch; latest commit 27 September 2026; tags up to 3.0.0; example commit subjects citing issues: "Add multithreading for saving tracker data (Fix #163)" (2 May 2025), "fix #81" (4 October 2021).

**Raphael's job (30 minutes):** for N02, N03, N04, N09, N15 and N22, pick one recent week of UXF, open the issues and commits for that week and write in the UXF column whether that repository's tracker plus history could actually answer the need (Y / partly / N, one line why). The column is "illustrative", as A2 says; it is not a measurement of all needs.

## 5. Choosing the ten for the Deliverable 3 sheet

A2 says the sheet uses "the ten needs Deliverable 1 raises most often". Fix the rule before counting, so the choice is not made after seeing which needs suit ChangeLens:

1. **Count evidence items per need.** One point each for: an interviewee raising it (max 1 per interviewee, so 0–2); a tool task in the heuristic pass that failed or was only partly completed because of it (0–4, one per tool); a job ad coded to it (via the code-to-need links in the seed column); a review coded to it; a Ko type it adapts (1 if any).
2. **Rank by total.** The ten highest go on the sheet.
3. **Ties at tenth place:** prefer the need raised by more distinct kinds of evidence (interviews, inspection, ads, reviews, Ko), then the one raised in interviews.
4. **Do not balance by classification.** The sheet tests whether readers agree with Raphael's marking; choosing needs to get a neat mix of D, P and N would bias that. Report the mix that results instead.
5. **Record the counts** in the "Evidence count" column and keep this file's version history, so the ranking can be traced.
6. **Write each of the ten in plain words** a reader with no repository access understands (the sheet is read by COMP3151 producers), and keep Raphael's own D/P/N marking for each off the sheet.

The three needs marked "candidate rejected-artefact case" (N07, N10, N23) are a starting point for the Evaluate measure; Raphael should keep or swap them after the interviews.


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
