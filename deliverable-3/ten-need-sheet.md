# Ten-need sheet

**PROVISIONAL.** A2 says the sheet uses "the ten needs Deliverable 1 raises most often". D1's evidence counts (heuristic pass, interviews, job ads, reviews) are not done yet, so these ten are chosen from the draft catalogue (`d1-needs-catalogue.md`, 12 Oct 2026) by the rule in section C. Replace them with the ten highest-counted needs once D1's coding is finished, and before the first real session. The pilot may use this provisional set.

---

## A. Participant sheet (print this part only, one page)

Participant code: ______

**A game team keeps three kinds of records:**
- **Tracker (T):** the task board or tickets (for example Jira, Trello, HacknPlan).
- **Repository (R):** the version history. Every saved change, who made it, when, and which files it touched.
- **Unity files (U):** the scene and prefab files inside the Unity project, which a tool can read to name the objects that changed.

**Imagine a tool that can read these three records but cannot ask anyone anything.** For each question a producer might ask, tick **one** box: could the records answer it fully, partly, or not at all? Then circle the record(s) you think would help. There are no right or wrong answers; go with your first sense. About 6 minutes.

| # | A producer's question | Fully | Partly | No, a person must say | Which record? |
| ---: | --- | :---: | :---: | :---: | :---: |
| 1 | What did each part of the team (code, art, audio, levels) change this week? | ☐ | ☐ | ☐ | T  R  U |
| 2 | Which planned tasks were finished this week? | ☐ | ☐ | ☐ | T  R  U |
| 3 | Which work happened that nobody wrote a task for? | ☐ | ☐ | ☐ | T  R  U |
| 4 | Which levels or scenes changed? | ☐ | ☐ | ☐ | T  R  U |
| 5 | Which game objects (prefabs) changed, by name? | ☐ | ☐ | ☐ | T  R  U |
| 6 | What is blocked, and who is it waiting on? | ☐ | ☐ | ☐ | T  R  U |
| 7 | Why was each change made? | ☐ | ☐ | ☐ | T  R  U |
| 8 | What else does a change affect, and what should be retested? | ☐ | ☐ | ☐ | T  R  U |
| 9 | Did the latest build work, and if not, what broke? | ☐ | ☐ | ☐ | T  R  U |
| 10 | What can I tell the publisher about progress this week? | ☐ | ☐ | ☐ | T  R  U |

Anything unclear? ______________________________________________

---

## B. Researcher marking key (template; do not show participants)

Fill this in and date it **before** reading any participant's sheet, so the marking cannot drift toward the answers.

Marked by: Raphael Byun   Date: __________   Catalogue version used: __________

| # | Need ID | D1 draft: T / R / U | Best source (D1 draft) | Raphael's mark: D / P / N | Reason (one line) |
| ---: | --- | --- | --- | :---: | --- |
| 1 | N01 | P / D / D | R | | |
| 2 | N03 | D / P / N | T | | |
| 3 | N04 | P / P / N | T + R | | |
| 4 | N05 | P / P / D | U | | |
| 5 | N06 | N / P / D | U | | |
| 6 | N07 | P / N / N | Person | | |
| 7 | N10 | P / P / N | Person | | |
| 8 | N11 | N / P / P | U | | |
| 9 | N14 | P / N / P | U (BuildReport) | | |
| 10 | N25 | P / P / P | Person (composed) | | |

Mapping: participant "Fully" = D, "Partly" = P, "No, a person must say" = N. Percentage agreement and Cohen's kappa are computed on this three-way mark only, per reader, against Raphael's column (A2: indicative, not inferential). The circled records are descriptive and are compared with the "Best source" column in the write-up.

**Decide the overall-mark rule before marking (open decision).** The D1 draft marks each need per source; the sheet asks one overall question. Two rules give different keys from the same draft:
- Rule 1, best available source (D if any source is D, else P if any is P, else N): 4 D (N01, N03, N05, N06), 6 P, 0 N.
- Rule 2, as Rule 1, but a need whose best source is a person counts as N: 4 D, 3 P (N04, N11, N14), 3 N (N07, N10, N25).

Under Rule 1 no need on the sheet has N as its key, although the sheet's third column says "a person must say", so readers who tick it for N07, N10 or N25 will disagree by design. Pick the rule that matches what A2 means by "derivable", write it here, and do not choose it to improve the mix (D1's selection rule 4). Report the resulting mix.

Rule chosen: ______   Why: ______________________________

---

## C. How the provisional ten were chosen (13 Oct 2026)

D1's own counts do not exist yet, so the only evidence available is the "Seed source" column of the draft catalogue. Rule used, fixed before ranking:
1. Rank by the number of **kinds** of seed evidence (Ko et al. type; job-ad code; A2 itself; a literature source). "TBC" is not counted.
2. Break ties by the total number of seed codes.
3. Break remaining ties by catalogue order (N01 first). This last step is arbitrary; it is the weakest part of the provisional choice.

Result: N11 (3 kinds, 4 codes) and N01 (3 kinds, 3 codes); then N06 and N25 (2 kinds, 3 codes); then, in catalogue order, the 2-kind, 2-code needs N03, N04, N05, N07, N10, N14. The sheet lists them in catalogue order, not rank order.

**Five runners-up** (next in line under the same rule):

| Rank | Need ID | Plain-words version | Seed |
| ---: | --- | --- | --- |
| 11 | N17 | How much work is left, and how hard is it? | b2; MS |
| 12 | N19 | Which work has gone quiet (started, but nothing done lately)? | Lit; A2 |
| 13 | N21 | Was this a code-heavy or a content-heavy week? | A2; Lit |
| 14 | N23 | What is the team working on next week? | d2; A2 |
| 15 | N18 | What does a reported problem look like to the player? | r1; r2 (one kind, two codes) |

Caveats. N05 and N06 both concern the asset layer that ChangeLens names, and N21 overlaps comprehension item 3; if D1's counts keep them, keep them (rule 4), but say so in the report. The ten mix tracker-, repository-, asset-layer- and person-sourced needs, but that is a result of the rule, not a target.
