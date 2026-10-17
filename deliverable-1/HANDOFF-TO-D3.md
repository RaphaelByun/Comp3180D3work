# Handoff to Deliverable 3: the ten needs

From D1, 15 October 2026. **AI-drafted by Claude Code; Raphael to accept or change** (needs-catalogue.md §8). These ten already replace the provisional ten (13 Oct 2026) on `deliverable-3/ten-need-sheet.md` (commit cf90ef9 on `deliverable-3-instruments`); the pilot may use either set. If Raphael changes a need when accepting, update both this file and the sheet.

How chosen: the rule in needs-catalogue.md §5, fixed before counting (ads, verified reviews V1–V4, published sources capped at 2, heuristic-pass points, Ko type). If any ad, review, source coding or pass outcome changes, re-run the count and update this file. Tenth place is the fragile one (N12 on 5 against N24 on 4).

## A. The ten, in the exact wording for the participant sheet

Catalogue order, as the D3 sheet uses.

| # | Need ID | Wording for the sheet |
|---:|---|---|
| 1 | N01 | What did each part of the team (code, art, audio, levels) change this week? |
| 2 | N03 | Which planned tasks were finished this week? |
| 3 | N07 | What is blocked, and who is it waiting on? |
| 4 | N08 | What risks are building up that could make us miss the next milestone? |
| 5 | N09 | Is the next milestone on track? |
| 6 | N12 | What new art, sound and other content was added or removed this week? |
| 7 | N17 | How much work is left, and how hard is it? |
| 8 | N19 | Which work has gone quiet (started, but nothing done on it lately)? |
| 9 | N25 | What can I tell the publisher about progress this week? |
| 10 | N26 | Is the task board up to date, or has it gone stale? |

## B. Researcher marking key (do not show participants)

T = tracker, R = repository, U = Unity files. D = derivable, P = partly, N = not (definitions in needs-catalogue.md §2). Overall mark under the two rules the D3 sheet asks Raphael to choose between: Rule 1 = best available source (D if any source is D, else P if any is P, else N); Rule 2 = as Rule 1, but a need whose best source is a person counts as N.

| # | Need ID | T | R | U | Best source | Overall, Rule 1 | Overall, Rule 2 | Reason (one line) |
|---:|---|:-:|:-:|:-:|---|:-:|:-:|---|
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

Mix: Rule 1 gives 3 D, 7 P, 0 N; Rule 2 gives 3 D, 4 P, 3 N. Best source: tracker 3, tracker + repository 2, repository 2, person 3. This mix is a result of the rule, not a target (selection rule 4).

Note for D3: under Rule 1 no need is N, although the sheet's third box says "a person must say"; readers who tick it for N07, N08 or N25 will disagree by design. N05 (scenes and prefabs by name), which Sub-question 2 tests, is not in the ten; it ranked 23rd. Say so in the report.

## C. Five runners-up (rank order)

| Rank | Need ID | Wording for the sheet | T | R | U | Best source |
|---:|---|---|:-:|:-:|:-:|---|
| 11 | N24 | What changed in the plan this week: features added, cut or pushed back? | P | N | N | Person |
| 12 | N11 | What else does a change affect, and what should be retested? | N | P | P | U |
| 13 | N14 | Is there a working build of this week's game, and if not, what broke? | P | N | P | U (BuildReport) |
| 14 | N02 | What has each person been working on? | P | D | N | R |
| 15 | N15 | Which bugs were fixed or reported this week? | D | P | N | T |

Use a runner-up, in this order, only if a need above turns out unusable in the pilot (for example, readers cannot understand it); record the swap and the reason.
