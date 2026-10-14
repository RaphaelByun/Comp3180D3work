# Ten-need sheet

**Status: Final from D1 (15 Oct 2026), AI-drafted, Raphael to accept.** A2 says the sheet uses "the ten needs Deliverable 1 raises most often". These ten come from D1's counted evidence (`deliverable-1/HANDOFF-TO-D3.md` on the `deliverable-1-ux-study` branch), replacing the provisional ten of 13 Oct 2026. The pilot may still use either set. If D1's ads, reviews, source coding or pass outcomes change, D1 re-runs the count and this sheet is updated.

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
| 3 | What is blocked, and who is it waiting on? | ☐ | ☐ | ☐ | T  R  U |
| 4 | What risks are building up that could make us miss the next milestone? | ☐ | ☐ | ☐ | T  R  U |
| 5 | Is the next milestone on track? | ☐ | ☐ | ☐ | T  R  U |
| 6 | What new art, sound and other content was added or removed this week? | ☐ | ☐ | ☐ | T  R  U |
| 7 | How much work is left, and how hard is it? | ☐ | ☐ | ☐ | T  R  U |
| 8 | Which work has gone quiet (started, but nothing done on it lately)? | ☐ | ☐ | ☐ | T  R  U |
| 9 | What can I tell the publisher about progress this week? | ☐ | ☐ | ☐ | T  R  U |
| 10 | Is the task board up to date, or has it gone stale? | ☐ | ☐ | ☐ | T  R  U |

Anything unclear? ______________________________________________

---

## B. Researcher marking key (do not show participants)

Date this **before** reading any participant's sheet, so the marking cannot drift toward the answers.

Marked by: Raphael Byun   Date: __________   Catalogue version used: needs-catalogue.md (D1, 15 Oct 2026)

T = tracker, R = repository, U = Unity files. D = derivable, P = partly, N = not (definitions in `needs-catalogue.md` section 2). Rule 1 = best available source (D if any source is D, else P if any is P, else N). Rule 2 = as Rule 1, but a need whose best source is a person counts as N.

| # | Need ID | T | R | U | Best source | Overall, Rule 1 | Overall, Rule 2 | Reason (one line) |
| ---: | --- | :-: | :-: | :-: | --- | :-: | :-: | --- |
| 1 | N01 | P | D | D | R | D | D | File type gives the discipline without anyone tagging; the tracker has it only if cards are tagged. |
| 2 | N03 | D | P | N | T | D | D | "Done" is a tracker state; commits show it only where they cite the ticket. |
| 3 | N07 | P | N | N | Person | P | N | Only a team convention (list, flag) records it; nothing in the files says "waiting". |
| 4 | N08 | P | N | N | Person | P | N | Risk is a judgement; a tracker holds it only if someone writes it down. |
| 5 | N09 | P | N | N | T | P | P | Burndowns and due dates exist in some trackers if estimates are entered; history has no plan. |
| 6 | N12 | N | D | D | R | D | D | Added and deleted files are git status letters; the asset layer names them. |
| 7 | N17 | P | N | N | T | P | P | Estimates live in the tracker if entered; history says nothing about remaining effort. |
| 8 | N19 | P | P | P | T + R | P | P | Needs a started ticket plus no later commits or asset edits, composed across items. |
| 9 | N25 | P | P | P | Person (composed) | P | N | Facts come from all three, but choosing what to tell a publisher is the producer's. |
| 10 | N26 | P | P | N | T + R | P | P | A stale board looks current unless it shows dates; commits citing cards give a check, but only where they cite them. |

Mix: Rule 1 gives 3 D, 7 P, 0 N; Rule 2 gives 3 D, 4 P, 3 N. Best source: tracker 3, tracker + repository 2, repository 2, person 3. This mix is a result of the rule, not a target (D1 selection rule 4).

Mapping: participant "Fully" = D, "Partly" = P, "No, a person must say" = N. Percentage agreement and Cohen's kappa are computed on this three-way mark only, per reader, against Raphael's overall column under the chosen rule (A2: indicative, not inferential). The circled records are descriptive and are compared with the "Best source" column in the write-up.

**Note for the report.** Under Rule 1 no need is N, although the sheet's third box says "a person must say", so readers who tick it for N07, N08 or N25 will disagree by design (expected disagreements, not reader error). N05 (scenes and prefabs by name), which Sub-question 2 tests, is not in the ten; it ranked 23rd. Say so in the report.

**Open decision: Raphael to choose Rule 1 or Rule 2 before seeing any sheets** (the ten-need marking rule is still undecided). Pick the rule that matches what A2 means by "derivable", write it here, and do not choose it to improve the mix. Report the resulting mix.

Rule chosen: ______   Why: ______________________________

---

## C. How the ten were chosen (D1, 15 Oct 2026)

Chosen by the rule in `needs-catalogue.md` section 5, fixed before counting: ads, verified reviews V1-V4, published sources capped at 2, heuristic-pass points, Ko type. Full wording, key and ranking: `deliverable-1/HANDOFF-TO-D3.md` on the `deliverable-1-ux-study` branch (with `deliverable-1/needs-catalogue.md`). Tenth place is the fragile one (N12 on 5 against N24 on 4). If any ad, review, source coding or pass outcome changes, D1 re-runs the count and updates the handoff, and this sheet follows. The sheet lists the ten in catalogue order.

**Five runners-up** (rank order). Use one, in this order, only if a need above turns out unusable in the pilot (for example, readers cannot understand it); record the swap and the reason.

| Rank | Need ID | Wording for the sheet | T | R | U | Best source |
| ---: | --- | --- | :-: | :-: | :-: | --- |
| 11 | N24 | What changed in the plan this week: features added, cut or pushed back? | P | N | N | Person |
| 12 | N11 | What else does a change affect, and what should be retested? | N | P | P | U |
| 13 | N14 | Is there a working build of this week's game, and if not, what broke? | P | N | P | U (BuildReport) |
| 14 | N02 | What has each person been working on? | P | D | N | R |
| 15 | N15 | Which bugs were fixed or reported this week? | D | P | N | T |
