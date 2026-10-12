# Heuristic coding sheet — four production tools

**Blank. Raphael fills this in.** He is the single evaluator (A2 notes one evaluator finds only a minority of problems; Nielsen & Molich, 1990). Nothing below is an observation; the only filled cells are heuristic names, definitions and task wording.

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

Screenshot naming: `screenshots/<tool>-<task>-<nn>.png`, for example `trello-T3-01.png`. Keep screenshots in `deliverable-1/screenshots/` (create it when you start).

Add as many rows as needed: one row per distinct problem. A problem can be coded to more than one heuristic; give it one primary code and note the second in the description. The pre-filled H1–H10 rows are prompts so that no heuristic is skipped; delete a row's dash only if you checked that heuristic and found nothing (write "none found").

### 5.1 Trello — date of pass: ____ / version or plan seen: ____

| ID | Heuristic | Task / location in UI | Problem description (what you saw, what you expected) | Severity 0–4 | Screenshot file | Ask interviewees? (Y/N) |
|---|---|---|---|---|---|---|
| TR-01 | H1 Visibility of system status | | | | | |
| TR-02 | H2 Match with the real world | | | | | |
| TR-03 | H3 User control and freedom | | | | | |
| TR-04 | H4 Consistency and standards | | | | | |
| TR-05 | H5 Error prevention | | | | | |
| TR-06 | H6 Recognition rather than recall | | | | | |
| TR-07 | H7 Flexibility and efficiency | | | | | |
| TR-08 | H8 Aesthetic and minimalist design | | | | | |
| TR-09 | H9 Recognise, diagnose, recover from errors | | | | | |
| TR-10 | H10 Help and documentation | | | | | |
| TR-11 | | | | | | |
| TR-12 | | | | | | |

Task outcomes (Trello):

| Task | Completed? (Y / partly / N) | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | Paste status update: |
| T4 | | | | |
| T5 | | | | |
| T6 | | | | |
| T7 | | | | |

### 5.2 HacknPlan — date of pass: ____ / version or plan seen: ____

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Ask interviewees? |
|---|---|---|---|---|---|---|
| HP-01 | H1 Visibility of system status | | | | | |
| HP-02 | H2 Match with the real world | | | | | |
| HP-03 | H3 User control and freedom | | | | | |
| HP-04 | H4 Consistency and standards | | | | | |
| HP-05 | H5 Error prevention | | | | | |
| HP-06 | H6 Recognition rather than recall | | | | | |
| HP-07 | H7 Flexibility and efficiency | | | | | |
| HP-08 | H8 Aesthetic and minimalist design | | | | | |
| HP-09 | H9 Recognise, diagnose, recover from errors | | | | | |
| HP-10 | H10 Help and documentation | | | | | |
| HP-11 | | | | | | |
| HP-12 | | | | | | |

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | Paste status update: |
| T4 | | | | |
| T5 | | | | |
| T6 | | | | |
| T7 | | | | |

### 5.3 Jira Free — date of pass: ____ / version or plan seen: ____

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Ask interviewees? |
|---|---|---|---|---|---|---|
| JI-01 | H1 Visibility of system status | | | | | |
| JI-02 | H2 Match with the real world | | | | | |
| JI-03 | H3 User control and freedom | | | | | |
| JI-04 | H4 Consistency and standards | | | | | |
| JI-05 | H5 Error prevention | | | | | |
| JI-06 | H6 Recognition rather than recall | | | | | |
| JI-07 | H7 Flexibility and efficiency | | | | | |
| JI-08 | H8 Aesthetic and minimalist design | | | | | |
| JI-09 | H9 Recognise, diagnose, recover from errors | | | | | |
| JI-10 | H10 Help and documentation | | | | | |
| JI-11 | | | | | | |
| JI-12 | | | | | | |

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | Paste status update: |
| T4 | | | | |
| T5 | | | | |
| T6 | | | | |
| T7 | | | | |

### 5.4 GitHub Projects — date of pass: ____ / version or plan seen: ____

| ID | Heuristic | Task / location in UI | Problem description | Severity 0–4 | Screenshot file | Ask interviewees? |
|---|---|---|---|---|---|---|
| GP-01 | H1 Visibility of system status | | | | | |
| GP-02 | H2 Match with the real world | | | | | |
| GP-03 | H3 User control and freedom | | | | | |
| GP-04 | H4 Consistency and standards | | | | | |
| GP-05 | H5 Error prevention | | | | | |
| GP-06 | H6 Recognition rather than recall | | | | | |
| GP-07 | H7 Flexibility and efficiency | | | | | |
| GP-08 | H8 Aesthetic and minimalist design | | | | | |
| GP-09 | H9 Recognise, diagnose, recover from errors | | | | | |
| GP-10 | H10 Help and documentation | | | | | |
| GP-11 | | | | | | |
| GP-12 | | | | | | |

| Task | Completed? | Time taken | Where you looked first | Note |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | Paste status update: |
| T4 | | | | |
| T5 | | | | |
| T6 | | | | |
| T7 | | | | |

## 6. Summary matrix (fill after all four)

Count of problems, and in brackets the highest severity, per cell.

| Heuristic | Trello | HacknPlan | Jira Free | GitHub Projects | Total |
|---|---|---|---|---|---|
| H1 | | | | | |
| H2 | | | | | |
| H3 | | | | | |
| H4 | | | | | |
| H5 | | | | | |
| H6 | | | | | |
| H7 | | | | | |
| H8 | | | | | |
| H9 | | | | | |
| H10 | | | | | |
| **Total** | | | | | |

Mark every problem rated 3 or 4 with "Y" in "Ask interviewees?". Those go into the interview guide's triangulation probe (interview-guide.md, Q8) and are the raw material for the three-disagreements reconciliation.

## References

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. *CHI '94* (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *CHI '90* (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281
