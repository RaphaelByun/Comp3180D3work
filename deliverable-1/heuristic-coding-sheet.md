# Heuristic coding sheet — four production tools

**Method note: who ran this pass, and its limits. Read this before citing anything below.**

- **Evaluator.** The pass was run on 14 October 2026 by Claude (Claude Code, an AI agent), operating the four tools through Chrome on Raphael's own accounts. Raphael authorised this because he had no time to run it himself. He did not observe the sessions. Claude wrote raw notes during each pass; the tables below were compiled from those notes in one later sitting (coding and severity applied across all four tools together, as §2 asks). This use of AI must be disclosed in the A3 GenAI statement.
- **Single evaluator.** One evaluator finds only a minority of the usability problems in an interface (Nielsen & Molich, 1990, who recommend aggregating three to five). Treat the problem lists as a sample, not an inventory. An AI evaluator also misses what a human notices (hesitation, reading effort, what "feels" slow) and meets problems a human would not (see the next point).
- **Automated input.** Claude typed and clicked through browser automation. Some HacknPlan findings about focus, keyboard shortcuts and duplicate dialogs (HP-16, HP-17, HP-18) were seen under synthetic input at 150% browser zoom and may be partly caused by it. GitHub's drag-and-drop did not respond to automated drags at all, so it is not coded. Those findings are marked "provisional" and must not be cited until Raphael has repeated them by hand.
- **Plans seen.** HacknPlan: free plan, personal workspace. Trello: creating the first board started an automatic 14-day Premium trial, so some features were visible that a free account does not have; where the notes say a feature was Premium it is marked. Jira: the new site (rafaelqonus.atlassian.net) runs a **Standard trial, not Jira Free**, and was created with a service-style template (work type "Incident", columns To Do / In Progress / Waiting for Customer / Disregarded / Resolved). Jira findings, especially the Summary tab in T3, may not hold on Free. GitHub Projects: free personal account.
- **Seed differences per tool** (the seed in §3 could not be entered identically):
  - Assignees: none of the tools allows a fictional assignee without inviting a real account, so Dev A to Dev E are tags or labels everywhere.
  - HacknPlan: tags. Card #1 (C1, the airlock sound card) lost its tag when Enter submitted the form early (HP-09) and was left untagged in the Backlog, outside the sprint board, so board totals are out of 9, not 10. The blocked card has "(blocked - waiting on art)" in its title, because free HacknPlan has no blocked state. HacknPlan calls the discipline "Sound", not "Audio".
  - Trello: named colour labels; a custom "Blocked" list was added.
  - Jira: labels cannot contain spaces, so the tags are Dev_A to Dev_E (shown lower-case in the filter list). Blocked is a flag. Two work items already existed on the new site (1 To Do, 1 In Progress); they appear in Summary totals (12 created, 12 updated, not 10).
  - GitHub: a private throwaway repository (RaphaelByun/zz-he-test-ss3d-delete-after) with labels Art, Dev B and Dev D only, issues #1 to #10, and 8 commits with "Closes #n" touching placeholder files named like the SS3D originals. The Kanban import added 9 items, not 10: issue #1 was silently left out (GP-04), so project totals are out of 9.
- **Screenshots.** None were saved; every finding rests on the written notes only. If Raphael wants images for the spec, take them during the hand spot-check.
- **What Raphael must do before citing this sheet.** Repeat every severity 3 and 4 finding by hand (16 findings; about 45 minutes), change or delete any he cannot reproduce, and re-rate severity where he disagrees. Severity here is Claude's judgement, not his.

Budget (A2, Deliverable 1): 4 h for all four tools: 10 min confirming free tiers, 40 min accounts and seed data, 140 min running the tasks (35 per tool), 50 min coding, severity and summary (README steps 1–5).

## 1. The ten heuristics (Nielsen, 1994)

Nielsen (1994) derived this revised set of ten from a factor analysis of 249 usability problems; it extends the nine of Nielsen and Molich (1990). Definitions are one-line paraphrases for coding, not quotations. Check the wording against the CHI '94 paper before citing it.

| Code | Heuristic | One-line definition used for coding |
|---|---|---|
| H1 | Visibility of system status | The tool keeps the user told what is going on (state, progress, what changed) through timely feedback. |
| H2 | Match between system and the real world | It speaks the user's language (here, a producer's: milestones, disciplines, builds), not the system's internal terms. |
| H3 | User control and freedom | The user can leave an unwanted state easily (undo, back, cancel) without a long detour. |
| H4 | Consistency and standards | The same words, icons and actions mean the same thing everywhere, and follow platform conventions. |
| H5 | Error prevention | The design stops errors happening in the first place (confirmations, constraints, sensible defaults). |
| H6 | Recognition rather than recall | Options, objects and history are visible; the user does not have to remember information from one screen to another. |
| H7 | Flexibility and efficiency of use | Shortcuts, filters, saved views or automation let frequent users go faster without confusing new ones. |
| H8 | Aesthetic and minimalist design | Screens hold no irrelevant or rarely needed information that competes with what matters. |
| H9 | Help users recognise, diagnose and recover from errors | Error messages are plain, say what went wrong and suggest a fix. |
| H10 | Help and documentation | Help is easy to search, task-focused and lists concrete steps. |

## 2. Severity scale (Nielsen)

| Rating | Meaning |
|---|---|
| 0 | Not a usability problem at all |
| 1 | Cosmetic only; fix if time allows |
| 2 | Minor; low priority |
| 3 | Major; important to fix, high priority |
| 4 | Usability catastrophe; must fix before release |

Rate each problem on frequency, impact and persistence together. Rate after finishing all four tools, in one sitting, so the scale is applied the same way across tools.

**How the scale was applied in this pass.** A 4 is kept for a problem that blocks a producer's core weekly-reporting task or loses the user's data. A 3 is a problem that makes a weekly-reporting task (T1 to T7) fail or mislead, or that a user meets on most visits with no easy workaround. A 2 costs time or causes a recoverable slip. A 1 is cosmetic. Where a workaround exists in the same tool (for example Trello's activity feed for dates), the same kind of problem is rated one step lower than in a tool with no workaround, and the row says so. Problems caused by a missing feature on the plan seen are coded only where they stop a task; they are rated the same way as interface problems, and marked "plan limit".

## 3. Shared set-up (about 40 minutes across all four tools)

Seed every tool with the **same** small project so the tasks are comparable. Suggested seed: the SS3D week of 8–14 February 2021 (A2, Appendix C), entered as eight cards or issues, one per commit:

| Card | Title (from the commit subject) | Discipline tag | Status at end of week | Assignee (fictional label) |
|---|---|---|---|---|
| C1 | Add sound fall off to airlocks (#611) | Audio | Done | Dev A |
| C2 | Add emergency light and light interactions (#610) | Art / Code | Done | Dev B |
| C3 | Make floor sign openable/closeable (#609) | Art / Code | Done | Dev C |
| C4 | Add RigidBody to airlocks to fix their interaction (#608) | Code | Done | Dev A |
| C5 | Optional connections for wires & pipes (#607) | Code | Done | Dev D |
| C6 | Rework the container UI (#605) | UI | Done | Dev B |
| C7 | Fix restart bug (#588) | Code | Done | Dev E |
| C8 | Create PepperSpray class (#604) | Code | Done | Dev C |

Add two cards that are **not** done (one "In progress", one "Blocked — waiting on art") so tasks T4 and T6 have something to find. Record the seed in `screenshots/seed-<tool>.png`. For GitHub Projects, use a throwaway repository on Raphael's own account and push a few dummy commits that reference the issues, so T5 can be tried; for the other three, try T5 with whatever free integration exists and code the absence if there is none.

As entered on 14 October 2026: C9 "airlock door animation" (In progress, Art) and C10 "security console icons" (Blocked, waiting on art, Dev D). See the method note for how each tool's seed differs.

## 4. Task script (same for every tool)

Read each task aloud to yourself, start a timer, and stop at the time cap. Note where you looked first; that is often where the H6 and H1 problems are.

| Task | Instruction to the evaluator | Time cap | Producer need it probes (needs-catalogue.md) |
|---|---|---|---|
| T1 | "Find out what art changed this week." | 5 min | N01, N12 |
| T2 | "See what Dev B finished this week." | 4 min | N02, N03 |
| T3 | "Write a five-line weekly status update for a publisher, using only this tool." Paste the result in the notes column. | 8 min | N25, N09 |
| T4 | "Find what is blocked or at risk, and on whom." | 4 min | N07, N08 |
| T5 | "Check whether the work on card C7 (Fix restart bug) actually landed in the repository, and what files it touched." | 6 min | N04, N10 |
| T6 | "Find what changed since last Monday that you did not already know about." (Use the activity feed, notifications or history.) | 5 min | N01, N19 |
| T7 | "Export or share this week's progress with someone who has no account." | 3 min | N25 |

Total about 35 minutes per tool.

## 5. Coding tables (one per tool)

One row per distinct problem. A problem can be coded to more than one heuristic; it has one primary code and the second is noted in the description. Positives are not problems and are listed under each table as "strengths". Heuristics with no problem found are listed under each table as "none found". Severity uses the one-pass rule in §2. "Cross-check" is Y for every severity 3 or 4 problem and for any problem that bears on a candidate disagreement in published-sources.md §6 (D1 to D5).

Screenshot column: no screenshots were saved in this pass (see method note).

### 5.1 Trello — date of pass: 14 October 2026 / version or plan seen: web app, personal account; 14-day Premium trial started automatically on creating the first board (Premium features marked)

| ID | Heuristic | Task / location in UI | Problem description (what was seen, what was expected) | Severity 0–4 | Screenshot file | Cross-check with published sources (Y/N) |
|---|---|---|---|---|---|---|
| TR-01 | H3 User control and freedom | First visit, onboarding tour | The tour's close X disappeared after one click and the tour kept going; the only way out was changing the URL. Expected a close or skip that works. | 2 | none saved (notes only) | N |
| TR-02 | H9 Recover from errors | trello.com/boards, signed in | Returned "Page not found" for a signed-in user, with no route to the user's boards. Expected a redirect to the boards page or a link to it. | 2 | none saved (notes only) | N |
| TR-03 | H9 Recover from errors | Create board form | "Board title is required" shows before anything is typed: an error state before any error. | 2 | none saved (notes only) | N |
| TR-04 | H5 Error prevention | Create board, Visibility | Visibility defaults to Workspace, not Private, so a producer's draft board is visible to the workspace unless changed. | 2 | none saved (notes only) | N |
| TR-05 | H4 Consistency and standards | Create board, Visibility option | Option text reads "Trello Workspace Workspace". | 1 | none saved (notes only) | N |
| TR-06 | H2 Match with the real world | New board, default lists | Default lists are generic To Do / Doing / Done, not production terms (milestone, discipline, blocked). Custom lists are free and quick, so the cost is small. | 1 | none saved (notes only) | N |
| TR-07 | H6 Recognition rather than recall | Board cards, labels (T1, T3, T4) | The default labels are unnamed colours, and on the board labels render as thin colour bars with no text. Who owns a card and which discipline it is are invisible at a glance; the meaning of each colour must be remembered (in T4 the purple bar had to be read as Dev D, or clicked to expand the label text). Expected readable label text on the card. | 3 | none saved (notes only) | Y |
| TR-08 | H7 Flexibility and efficiency | Label editing | Naming a label takes an edit pencil and a Save for each label; there is no quick way to name the set. | 2 | none saved (notes only) | N |
| TR-09 | H4 Consistency and standards | Label popover (L shortcut) | The label popover opens at different heights depending on the card. | 1 | none saved (notes only) | N |
| TR-10 | H6 Recognition rather than recall | Board header | Header icons (Power-Ups, Automation, Filter, Star, Visibility) have no text labels; one click landed on empty space. | 2 | none saved (notes only) | N |
| TR-11 | H4 Consistency and standards | Card status vs Done list | Two notions of done: a card in the Done list, and "Marked as complete" in Card status. A producer counting finished work cannot tell which one is the truth; they can disagree. | 2 | none saved (notes only) | Y |
| TR-12 | H9 Recover from errors (also H2) | Filter, keyword (T2) | Keyword "Dev B" returned only "Fix restart bug (#588)", which has no Dev B label, and missed both Dev B cards. Nothing explained why; the result looks like an answer and is wrong. Ticking the Dev B label lower in the panel worked. | 3 | none saved (notes only) | Y |
| TR-13 | H7 Flexibility and efficiency (plan limit) | View switcher (T3) | Table, Calendar, Dashboard and Timeline views are Premium ("Views are only available to Premium Workspaces"). On the free features the weekly update needs counting by eye from list headers, and discipline counts need each card's labels opened one by one. | 3 | none saved (notes only) | Y |
| TR-14 | H1 Visibility of system status | Cards (T2) | Cards show no completion date, so "finished this week" cannot be checked on the card. Rated 2, not 3, because the board Activity feed gives relative times (TR-15). | 2 | none saved (notes only) | Y |
| TR-15 | H6 Recognition rather than recall (also H7) | Board menu > Activity (T6) | The activity feed is two menu levels deep and has no date filter, so "since Monday" means scrolling and reading relative times. | 2 | none saved (notes only) | N |
| TR-16 | H1 Visibility of system status | Activity feed (T6) | Label edits are not shown in the feed, so a change of owner or discipline (both held in labels here) is invisible in history. | 2 | none saved (notes only) | Y |

None found: H8, H10.

Strengths (Trello): onboarding demo of a card (H10); Enter adds a card and keeps the composer open, 8 cards in about 30 s, whole seed about 5 minutes against 30+ minutes in HacknPlan (H7); a custom "Blocked" list in 5 s, free (H2, H7); composer tip for natural-language due dates (H7, H10); L shortcut and label search (H7); filter shows "N cards match filters", a filter count and Clear all (H1, H3); plain-language, newest-first activity feed with relative times (H1, H2); Print, JSON/CSV export and QR code for sharing (H7).

Task outcomes (Trello):

| Task | Completed? (Y / partly / N) | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | Partly | ~20 s | Filter panel > Labels > Art | Shows Art-labelled cards (#610, #609 done; door animation in Doing), not changed art files. Filter count and Clear all visible. |
| T2 | Y | ~45 s | Filter keyword "Dev B" | Keyword search misled (TR-12); ticking the Dev B label gave #610 and #605 in Done. No completion dates, so "this week" unverifiable on the cards. |
| T3 | Partly | ~2 min | View switcher | Views Premium; counted by eye from list headers (Done 8, Doing 1, Blocked 1); discipline counts needed opening labels card by card. Status update, written by hand: "This week: 8 changes done (2 art, 1 audio, 4 code, 1 UI). Airlock door animation in progress. Security console icons blocked, waiting on art (Dev D)." |
| T4 | Y | ~10 s | Board | The custom Blocked list shows it at once; "on whom" needs the purple bar read as Dev D (TR-07). |
| T5 | N (not tested) | ~1 min | Power-Ups | Needs the GitHub Power-Up and an OAuth grant to GitHub, outside the throwaway-board permission, so not connected. Even connected, Power-Ups attach commits and PRs to cards, not file contents. Not coded as a usability problem. |
| T6 | Y / partly | ~30 s | Board menu > Activity | Newest-first feed with relative times; no date filter, label edits not shown (TR-15, TR-16). |
| T7 | Partly | ~40 s | Menu > Print, export, and share | A private board link needs membership. Print (PDF) and Export JSON/CSV work for someone without an account (CSV possibly Premium; not checked on free). QR code too. |

### 5.2 HacknPlan — date of pass: 14 October 2026 / version or plan seen: web app, free plan, personal workspace

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Cross-check with published sources (Y/N) |
|---|---|---|---|---|---|---|
| HP-01 | H3 User control and freedom | Cookie banner | Only "Accept" is offered and the text says continuing means consent; there is no way to decline. (Left unanswered during the pass.) | 1 | none saved (notes only) | N |
| HP-02 | H8 Aesthetic and minimalist design | Create project, step 1 modal | The modal overlay is translucent; dashboard text ("Personal Workspace", "My Metrics", "Create your first project") shows through and overlaps the option text. | 1 | none saved (notes only) | N |
| HP-03 | H2 Match with the real world | Create project, "Select project type" | Custom / Lite / Documentation / Agile / Full Suite describe what the tool does, not producer terms; nothing says which suits weekly reporting. | 2 | none saved (notes only) | N |
| HP-04 | H8 Aesthetic and minimalist design (also H2) | Left navigation | Premium-only items (Team dashboard, Board dashboard, Calendar) stay in the navigation with a purple rocket badge, unexplained until clicked. | 2 | none saved (notes only) | N |
| HP-05 | H6 Recognition rather than recall | Backlog, category column | The category column is unlabelled colour icons with no tooltip on hover; the user must memorise 9 icons. Rated 2, not 3 as for Trello's labels (TR-07), because category names do show in the task form and the left rail filters by them. | 2 | none saved (notes only) | Y |
| HP-06 | H4 Consistency and standards (accessibility) | Sidebar and icon buttons | In the accessibility tree nearly every sidebar or icon button and link has no accessible name. For a screen-reader user most of the navigation is unusable. | 3 | none saved (notes only) | Y |
| HP-07 | H9 Recover from errors | New task, Title field | The Title field shows a red error outline before anything is typed: an error state before any error. | 2 | none saved (notes only) | N |
| HP-08 | H9 Recover from errors (also H2) | New task, Category combobox | Typing "Aud" shows no list and no "no match" message; the field just turns red. The category is called "Sound", not "Audio". | 2 | none saved (notes only) | N |
| HP-09 | H5 Error prevention | New task, Tag field | Pressing Enter to confirm a new tag submitted the whole form and created the task before Board was chosen, and the tag was lost (this is why C1 is untagged and in the Backlog). Enter in a sub-field commits the dialog. | 3 | none saved (notes only) | Y |
| HP-10 | H7 Flexibility and efficiency | New task, creating a tag | A tag that does not exist opens a second modal (name, icon, colour picker) for what is one word; slow for a label. | 2 | none saved (notes only) | N |
| HP-11 | H8 Aesthetic and minimalist design | New-tag modal | The modal slides in over about 2 s, its position varies, and the previous tag list shows through it. | 1 | none saved (notes only) | N |
| HP-12 | H1 Visibility of system status (also H4) | Tag suggestion list | Existing and new tags look identical (same orange row); the user cannot tell whether choosing it adds an existing tag or creates a new one. | 2 | none saved (notes only) | N |
| HP-13 | H4 Consistency and standards | New task, "Remember fields" | "Remember fields" kept Category but not Board or Tags between cards, which does not match its label. | 2 | none saved (notes only) | N |
| HP-14 | H6 Recognition rather than recall (also H7) | Category combobox with remembered value | With a remembered category in the box, the dropdown arrow shows no options until the text is deleted. | 2 | none saved (notes only) | N |
| HP-15 | H1 Visibility of system status | New task, Board field | Choosing a category or tag sometimes reset the Board field to "No board (backlog)" with no notice, so a card can land outside the sprint board without the user knowing. | 3 | none saved (notes only) | Y |
| HP-16 | H5 Error prevention (also H3) | Global single-letter shortcuts, New task form | **Provisional (automated input at 150% zoom; Raphael to confirm by hand before citing).** Single-letter shortcuts (D = New design element, etc.) fire whenever focus leaves an input. Several times the tag input lost focus after a click, typed text opened stacked "New design element" dialogs, and cancelling them wiped the half-filled New task form (title, category, board) with no warning or undo. Data loss, hence 4. | 4 | none saved (notes only) | Y |
| HP-17 | H5 Error prevention | New task, after "Create & continue" | **Provisional (same caveat).** The dialog re-opens with an animation and a hidden second copy stays in the page (two "Add tag" inputs, one off-screen); typed input sometimes went into the wrong one. | 3 | none saved (notes only) | Y |
| HP-18 | H3 User control and freedom | New task, Cancel on a filled form | **Provisional; to be confirmed.** Cancel on a dirty form froze the browser tab (probably a native confirm dialog). Repeated Cancel and close behaviour was not confirmed. | 3 | none saved (notes only) | Y |
| HP-19 | H7 Flexibility and efficiency | Moving a task to Completed | A "Log work" time prompt opens on each move to Completed. It can be switched off, and it helps keep time data fresh, but it interrupts a quick status change. | 1 | none saved (notes only) | Y |
| HP-20 | H8 Aesthetic and minimalist design | Board card hover | Action icons are drawn over the title text, hiding it while pointing at the card. | 2 | none saved (notes only) | N |
| HP-21 | H4 Consistency and standards | Left rail, top icon | The top icon toggles the rail between categories and people instead of clearing the filter: same spot, two meanings. | 2 | none saved (notes only) | N |
| HP-22 | H1 Visibility of system status | Left rail filter | The active filter is shown only by an icon highlight and the URL. | 2 | none saved (notes only) | N |
| HP-23 | H7 Flexibility and efficiency | Filter funnel (T2) | The filter funnel is a dead end for a quick question: it requires building a saved filter. Search was the workaround. | 2 | none saved (notes only) | N |
| HP-24 | H1 Visibility of system status | Cards (T2, T6) | No completion date on cards, and no activity feed to fall back on (HP-26), so "finished this week" cannot be checked anywhere on the free plan. | 3 | none saved (notes only) | Y |
| HP-25 | H1 Visibility of system status (plan limit) | Card detail, + Add (T4) | No blocked state on the free plan; Dependencies and custom Stages are Premium. The blocked card was found only because "blocked" had been typed into its title. | 3 | none saved (notes only) | Y |
| HP-26 | H1 Visibility of system status (plan limit) | Notifications bell, project (T6) | Notifications were empty for a sole user and no project activity feed was found on the free plan, so "what changed since Monday" could not be answered. | 3 | none saved (notes only) | Y |
| HP-27 | H7 Flexibility and efficiency (plan limit) | Premium walls (T3, T5, T7) | Most producer-reporting features sit behind Premium: Burndown, Metrics Export, Team and Board dashboards, Dependencies, Timetable, Calendar, Worksheet and the GitHub/GitLab/Bitbucket integrations. The badges make the walls visible (a strength), but on free a weekly report cannot be exported or shared and no repository link exists. | 3 | none saved (notes only) | Y |

None found: H10.

Strengths (HacknPlan): clear empty dashboard with a "Create your first project" call to action (H1, H10); "You can change this later" on project type (H3); success toasts on create (H1); default milestones are game stages (Pre-production, Pre-alpha, Alpha, Beta, Release candidate, Gold candidate, Post-launch) (H2, strong); category list is discipline vocabulary (Programming, Art, Design, Writing, Marketing, Sound, Ideas, Bug) (H2); New task form shows only Title and Category, with "Edit fields", visible ALT+S / ALT+D shortcuts, "Create & continue" and "Remember fields" (H7); Premium features are visibly badged (H1); Metrics gives per-discipline counts on free (Programming 4/4, Art 2/3, Design 1/2).

Task outcomes (HacknPlan):

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | Partly | ~15 s | Category icon rail (Art) | One click shows Art-category tasks (#2, #3 done, #9 in progress); no link to the art files that changed. |
| T2 | Y | ~40 s | Filter funnel (dead end, HP-23), then search | Search "Dev B" shows #2 and #6 completed; no completion date on cards, so "this week" unverifiable (HP-24). |
| T3 | Partly | ~3 min | Reports > Metrics | Metrics: 7 of 9 board tasks closed (78%), Programming 4/4, Art 2/3, Design 1/2, 0 h logged. Export is Premium. Status update, written by hand: "Sprint 1: 7 of 9 tasks closed (78%). Programming 4 of 4 done; Art 2 of 3, airlock door animation in progress; Design 1 of 2, security console icons not started (waiting on art). No hours logged. One sound task (#1) sits outside the sprint board." |
| T4 | Partly | ~1.5 min | Card detail, + Add | No blocked state; Dependency and custom stages Premium; found only because "blocked" was in the title; on whom = tag Dev D. |
| T5 | N | ~1 min | Administration > Integrations | GitHub/GitLab/Bitbucket integrations are Premium; even then they link commits to tasks, not file contents. |
| T6 | N | ~2 min | Notifications bell (N) | Empty for a sole user; no project activity feed found on the free plan. |
| T7 | N | ~1 min | Board "..." menu, Metrics Export | No public link; Export is Premium. |

### 5.3 Jira — date of pass: 14 October 2026 / version or plan seen: Jira Cloud, new site on a **Standard trial (not Free)**, service-style project template ("RaphaelQonus - Project", key SCRUM)

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Cross-check with published sources (Y/N) |
|---|---|---|---|---|---|---|
| JI-01 | H8 Aesthetic and minimalist design | Work item "..." menu | A long menu with a promotional "Add a cover" tooltip drawn over it. | 2 | none saved (notes only) | N |
| JI-02 | H5 Error prevention | Labels picker | The picker offered "Dev D (New label)" and let it be selected, then on save failed with "The label 'Dev D' can't contain spaces". The picker should not offer a label it will reject. (The message itself is plain and says why: an H9 strength.) | 2 | none saved (notes only) | N |
| JI-03 | H1 Visibility of system status | Labels field, editing | Saving needs a click outside or the tick, and the red outline shown while editing looks like an error. | 2 | none saved (notes only) | N |
| JI-04 | H4 Consistency and standards | Board filter vs cards | Labels appear lower-case in the filter list ("art", "dev_b") but as typed on cards ("Art", "Dev_B"). | 2 | none saved (notes only) | N |
| JI-05 | H2 Match with the real world | Project template, board columns, item buttons | Help-desk words on game work: work type "Incident", columns Waiting for Customer / Disregarded / Resolved, and an "Improve Incident" button on every item. A different template would fix it, but nothing at creation said the template choice mattered. | 3 | none saved (notes only) | Y |
| JI-06 | H2 Match with the real world (also H8) | Development tab | Key metrics are developer and DevOps measures (pull-request cycle time, lead time for changes, deployment frequency, vulnerabilities), shown next to the one producer-useful figure ("Work items 8, completed this week"). | 2 | none saved (notes only) | N |
| JI-07 | H7 Flexibility and efficiency | Summary > Recent activity (T6) | The feed is grouped by day but has no explicit date filter, so "since Monday" means scrolling. Same rating as Trello's TR-15. | 2 | none saved (notes only) | N |
| JI-08 | H7 Flexibility and efficiency | Item "..." menu, board (T7) | Sharing without an account works only item by item (Print, Export Excel/Word/XML); the board needs a login and no week-level export was found. | 2 | none saved (notes only) | Y |

None found: H3, H6, H9 (one H9 strength, see JI-02), H10.

Strengths (Jira): the "+" at the top of each column creates straight into that status and Enter keeps the box open; 10 items with labels and a flag in about 8 minutes (H7, strong); canned comment prompts "Who is working on this...?", "Status update..." (H7); labels render as text chips on cards (H6, unlike Trello); Add flag gives a red flag and a yellow card on the board, with a "Flag Added" toast (H1, strong); filter count, Clear filters, filter kept in the URL (H1, H3); the Summary tab ("8 completed in the last 7 days", "12 updated", "12 created", status donut, recent activity) is the closest of the four tools to a weekly report out of the box (H1, H2), but it was seen on the Standard trial.

Task outcomes (Jira):

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | Partly | ~25 s | Board Filter > Labels > art | Art-labelled items (SCRUM-13 in progress, -6 and -7 resolved), not art files. |
| T2 | Y | ~25 s | Filter > Labels > dev_b | SCRUM-6 and -10 in Resolved; resolution dates exist on the items. |
| T3 | Y / partly | ~30 s | Summary tab | "8 completed in the last 7 days", "12 updated", "12 created", status donut, recent activity. Totals include the 2 pre-existing items. Text still written by hand, from the Summary and the filtered board: "8 items completed in the last 7 days (2 art, 1 audio, 4 code, 1 UI). Airlock door animation in progress. Security console icons flagged as blocked, waiting on art (Dev_D). Totals on the Summary also count 2 older items not part of this week." (Written by Claude on 15 Oct 2026 from the recorded figures, after the pass.) |
| T4 | Y | ~10 s | Board | Flagged item highlighted yellow with a red flag; Dev_D label visible on the card. |
| T5 | N (not tested) | ~1 min | Development tab | Source control "Not set up": needs "Request GitHub for Atlassian" (app request and OAuth), outside the throwaway permission. Even connected it lists commits and PRs per item, not scene or prefab contents. Not coded as a usability problem. |
| T6 | Y / partly | ~20 s | Summary > Recent activity | Feed grouped by day ("Today"), shows field changes (labels) and status; no explicit date filter (JI-07). |
| T7 | Partly | ~30 s | Item "..." menu | Print, Export Excel/Word/XML per item; boards need a login (JI-08). |

### 5.4 GitHub Projects — date of pass: 14 October 2026 / version or plan seen: github.com, free personal account; user project "ZZ HE test - SS3D week (delete after)" (projects/2) from the Kanban template, on private repo RaphaelByun/zz-he-test-ss3d-delete-after

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Cross-check with published sources (Y/N) |
|---|---|---|---|---|---|---|
| GP-01 | H5 Error prevention | New repository form | Visibility defaults to Public, so a draft repository is public unless changed. Same rating as Trello's TR-04. | 2 | none saved (notes only) | N |
| GP-02 | H3 User control and freedom (also H5) | New project | The project is created (as "@RaphaelByun's untitled project") the moment New project is pressed, before a template or name is chosen; cancelling leaves an empty project behind. | 2 | none saved (notes only) | N |
| GP-03 | H2 Match with the real world (also H7) | Kanban template, import step | Import offers only Open issues / Open PRs / both. The week's finished work (closed issues) is left out unless the user switches to "Add from a search query" and deletes "state:open" by hand. For weekly reporting the default import drops exactly what a producer wants to report. | 3 | none saved (notes only) | Y |
| GP-04 | H1 Visibility of system status | Project after import | The confirmation said "10 items will be added" but the project held 9: issue #1 was silently left out, with no warning. Missing work with no error. Cause not investigated (possibly the oldest closed item fell outside the import). Rated 3, not 4, because the issue still exists in the repository and Insights showed the count of 9, so the gap can be noticed; it would be a 4 if it recurs on re-import. | 3 | none saved (notes only) | Y |
| GP-05 | H6 Recognition rather than recall | Board cards | Board cards show no labels by default; developer and discipline are invisible until the card is opened or fields are configured. | 2 | none saved (notes only) | Y |
| GP-06 | H5 Error prevention | Card "..." menu | Del removes an item from the project with one key. (A risk seen in the menu; no item was removed by accident.) | 2 | none saved (notes only) | N |
| GP-07 | H2 Match with the real world | Project filter (T1, T6) | Filtering needs query syntax (`label:Art`, `updated:>=@today-7d`). Label names autocomplete, which helps, but a producer has to know the syntax exists. | 2 | none saved (notes only) | N |
| GP-08 | H1 Visibility of system status | Filter `updated:` (T6) | The filter lists which items changed, not what changed in them, and there is no project activity feed. Rated 2, not 3 as for HacknPlan's HP-26, because the filter and each issue's timeline are a workaround. | 2 | none saved (notes only) | Y |
| GP-09 | H1 Visibility of system status | Board (T4) | "Blocked by" is free and shows a red badge on the issue, but on the board only a tiny red dot on the status icon marks it, and assignee and labels are not on the card. Low salience for the first thing a producer checks. | 2 | none saved (notes only) | Y |
| GP-10 | H5 Error prevention | Issue timeline (T5) | The task-to-code link works only because each commit message said "Closes #n". Nothing prompts a developer to reference an issue, so any commit without it is invisible from the issue. | 2 | none saved (notes only) | Y |

None found: H4, H7, H8, H9, H10.

Not coded: drag-and-drop on the board did not respond to automated drags (probably an automation artefact; the "Move to column" menu worked). The notes also say a real .unity or .prefab diff would be unreadable to a producer (the ChangeLens gap); that was not observed, because the pushed files held placeholder contents, so it is not rated.

Strengths (GitHub Projects): live "name is available" check (H1); labels form with live preview and Ctrl+Enter on the button (H1, H7); issue title and labels can be prefilled from the URL (H7, for power users only); commits with "Closes #n" closed the issues and recorded "closed this as completed in <commit>" (H1, strong: the task-to-code link is automatic); "10 items will be added" confirmation (H1); closed issues move to Done through the built-in workflow (H7); "Move to column" and shortcuts in the card menu (H7); Created / Closed / Updated timestamp fields (H1, for "this week"); unsaved filter offers Save or Discard (H3); free burn-up chart in Insights; free "Mark as blocked by" with a red badge on the issue (H1); free "Export view data" (CSV).

Task outcomes (GitHub Projects):

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | Partly | ~15 s | Project filter `label:Art` | Art-labelled issues (#9 in progress, #2, #3 done), not art files. Needs query syntax (GP-07). |
| T2 | Y | ~25 s | Filter `label:"Dev B"` | #2 and #6 in Done; closed dates exist (Closed field, issue timeline), so "this week" is checkable. |
| T3 | Partly | ~2 min | Insights | Free burn-up chart (2 weeks / 1 month / 3 months); item count 9 (the missing #1 shows here). No text summary; "Add status update" exists for a written update inside the project. Status update, written by hand from Done / In progress: "7 issues closed this week; door animation in progress; security console icons blocked by the door animation (Dev D)." |
| T4 | Partly | ~1 min | Board card, then issue sidebar | "Blocked by" badge on the issue; only a tiny red dot on the board (GP-09). |
| T5 | Y | ~30 s | Issue #7 timeline | "closed this as completed in 899bdee"; the commit shows 3 files changed (Main Menu.unity, Server Lobby.unity, RoundManager.cs). Works only because the commit message referenced the issue (GP-10). |
| T6 | Partly | ~1.5 min | Filter `updated:>=@today-7d` | Lists 9 touched items; says which items changed, not what changed; no project activity feed (GP-08). |
| T7 | Partly | ~30 s | View options menu | "Export view data" (CSV) is free; a private project or repo cannot be viewed without an account; status updates are visible to project members only. |

## 6. Summary matrix

Count of problems, and in brackets the highest severity, per cell. A dash means none found. Jira was seen on a Standard trial, not Free.

| Heuristic | Trello | HacknPlan | Jira (Standard trial) | GitHub Projects | Total |
|---|---|---|---|---|---|
| H1 | 2 (2) | 6 (3) | 1 (2) | 3 (3) | 12 (3) |
| H2 | 1 (1) | 1 (2) | 2 (3) | 2 (3) | 6 (3) |
| H3 | 1 (2) | 2 (3) | – | 1 (2) | 4 (3) |
| H4 | 3 (2) | 3 (3) | 1 (2) | – | 7 (3) |
| H5 | 1 (2) | 3 (4) | 1 (2) | 3 (2) | 8 (4) |
| H6 | 3 (3) | 2 (2) | – | 1 (2) | 6 (3) |
| H7 | 2 (3) | 4 (3) | 2 (2) | – | 8 (3) |
| H8 | – | 4 (2) | 1 (2) | – | 5 (2) |
| H9 | 3 (3) | 2 (2) | – | – | 5 (3) |
| H10 | – | – | – | – | 0 |
| **Total** | **16 (3)** | **27 (4)** | **8 (3)** | **10 (3)** | **61 (4)** |

Severity distribution:

| Severity | Trello | HacknPlan | Jira | GitHub Projects | Total |
|---|---|---|---|---|---|
| 1 | 3 | 4 | 0 | 0 | 7 |
| 2 | 10 | 13 | 7 | 8 | 38 |
| 3 | 3 | 9 | 1 | 2 | 15 |
| 4 | 0 | 1 (provisional) | 0 | 0 | 1 |
| **Total** | **16** | **27** | **8** | **10** | **61** |

Arithmetic check: column sums 16 + 27 + 8 + 10 = 61; row sums 12 + 6 + 4 + 7 + 8 + 6 + 8 + 5 + 5 + 0 = 61; severity sums 7 + 38 + 15 + 1 = 61.

**Reading the matrix with care.** The counts are not a ranking of the tools. HacknPlan's 27 problems partly reflect how long Claude spent in it (seeding took 30+ minutes against about 5 in Trello) and the automated input (HP-16 to HP-18 are provisional). Jira's low count was on a paid trial. Two patterns hold across tools and are safer to use: H1 (12 problems) concentrates on "when did this finish" and "what changed", the information a weekly report needs; and H10 found nothing in any tool, which reflects tasks that never needed help pages, not good help.

Every problem rated 3 or 4 is marked "Y" in the cross-check column. Since the interviews were replaced by published sources (README), those findings go into the reconciliation in published-sources.md §6 instead of the interview guide's Q8 probe.

## References

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. *CHI '94* (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *CHI '90* (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281
