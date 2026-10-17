# ChangeLens producer page: design spec

Deliverable 1, COMP3180, Semester 2 2026. Raphael Byun. **Drafted 15 October 2026 by Claude Code (AI) from the D1 evidence files, at Raphael's request; Raphael to accept or change, and to disclose in the A3 GenAI statement.** Evidence is cited by file and ID: HE = `heuristic-coding-sheet.md`, PS = `published-sources.md`, JA = `job-ads-and-reviews.md`, NC = `needs-catalogue.md`.

## 1. Purpose and reader

The page is for a producer who never opens the codebase (A2, Learning Goal *Create*). It supports one job: the weekly update to a lead, publisher or partner. Six of ten 2026 producer ads ask for progress reporting to leadership or partners (JA §2.2, SR or EXT), and every heuristic-pass status update had to be written by hand (HE T3). No ad asks the producer to know *what changed* (JA §2.2, KC = 0): the need is implied by the reporting duty, not stated. The page therefore gives facts a producer can repeat, not a dashboard to explore.

## 2. Method in brief, and two departures from A2

- **Heuristic pass:** Trello, HacknPlan, Jira and GitHub Projects coded against Nielsen's (1994) ten heuristics with seven producer tasks on one seeded SS3D week (HE §3–§5). 61 problems; 16 at severity 3–4.
- **Desk scan:** 10 producer ads and 5 reviews, coded with a fixed codebook and verified on the live pages on 15 October 2026 (JA). Review V5 is unverified and not scored.
- **Needs:** Ko et al.'s (2007) 21 types checked against the paper; 14 kept fully or partly (NC §1). 25 needs, each marked T / R / U × D / P / N (NC §3), checked on one UXF week (NC §4) and ranked by a rule fixed before counting (NC §5).
- **Departure 1:** the pass was run and coded by an AI agent (Claude) on Raphael's accounts, as a single evaluator; Trello was on a Premium trial and Jira on a Standard trial. Nielsen and Molich (1990) show one evaluator finds a minority of problems, so the findings are a sample. Raphael hand-checks the severity 3–4 findings before citing them.
- **Departure 2:** the two interviews were replaced by six coded published producer accounts (PS §1), because there was not time to recruit and run them. The *Apply and Analyse* measure is reported as "three places where inspection and the published sources disagree".

## 3. What existing tools show a producer

Per task, on the plans seen (HE §5):
- **What art changed (T1)** was only partly done in all four tools: each returned art-tagged tasks, never the art files that changed. Discipline was visible only where someone had tagged it; Trello's colour-bar labels hide it (TR-07).
- **What a teammate finished this week (T2)** was found everywhere, but "this week" could not be checked on HacknPlan or Trello cards, which carry no completion date (HP-24, TR-14).
- **A five-line status update (T3)** was written by hand in every tool. Jira's Summary came closest, but on a trial; whether Jira Free has it is unverified (tool-selection.md).
- **Blocked work (T4)** took about 10 seconds where a convention existed (Trello list, Jira flag), and was found in HacknPlan free only because its title said "blocked" (HP-25).
- **Did the work land, and what files (T5)** worked only in GitHub, and only because each commit message cited its issue (GP-10).
- **What changed since Monday (T6)** gave lists of touched items, never what changed in them (GP-08, TR-15, JI-07); HacknPlan free has no feed (HP-26).
- **Sharing without an account (T7)** was partial or impossible (JI-08, HP-27); Trello Free exports JSON only.

Across tools, H1 (visibility of system status) holds 12 of 61 problems, concentrated on "when did this finish" and "what changed" (HE §6).

## 4. What the published sources say

Producers describe their week through estimates, burndowns, time logs and meetings (PS §5): N17 work left (5 of 6 sources), N09 milestone (4), N02 who did what (4), N26 whether the tracker is current (4). Needs the repository or asset layer answer best (N05, N12, N21, N22) get no support. That is partly the method (writers do not describe files), but it is also a finding: producer writing does not ask for what ChangeLens derives best.

## 5. Reconciliation: three disagreements

From PS §6.1, where the full table is:
1. **Blocked work.** P6 treats a Blocked column as the first thing checked; inspection found that two of four free set-ups do not show it at a glance (HP-25, GP-09). *Consequence:* the page cannot see blocked work and must say so.
2. **Keeping the tracker current.** Four sources rely on human chasing; inspection found GitHub closes issues from commits, but only when commits cite them (GP-10), which real teams rarely do (UXF 20 of 100; Inkform 0 of 126). *Consequence:* the repository is an independent record to check a board against (N26).
3. **The tracker as the report.** P1 and P2 describe dashboards and time logs that report for them; on free plans every update was hand-written (T3, T7). *Consequence:* the page should give pasteable sentences and an exportable file.

Agreement, not counted: sources want every discipline to see the milestone's problems (P3, P4), and the pass found discipline only where someone tagged it (T1).

## 6. Needs: the ten, and the headline finding

The ten that D1 raises most often (NC §5): N01, N03, N07, N08, N09, N12, N17, N19, N25, N26. Runners-up: N24, N11, N14, N02, N15. Among the ten, the best source is the tracker for 3, tracker plus repository for 2, the repository for 2 (N01, N12) and a person for 3. **What producers and their job ads ask for most is plan-side information that ChangeLens does not read.** N05, the scenes-and-prefabs need that Sub-question 2 tests, ranks 23rd of 25. The spec does not hide this: ChangeLens answers the "what changed" half of the producer's week, and the page must say where the other half lives.

**Three needs where an artefact was rejected (Evaluate measure; NC §3.1):**
- **N07 blocked work: repository rejected.** A gap in commits looks the same whether someone is blocked, ill or working outside the repository.
- **N10 why a change was made: asset layer rejected.** Prefab text records values, not intent; in the UXF week the reason behind "fix #46" lives in the issue thread, not in any file (Ko et al.: rationale is "only in coworkers' minds").
- **N27 capacity: repository rejected.** Commit timestamps record when work was saved, not hours available or holidays (P2, P5).

**UXF check** (one week, 9–15 November 2020; NC §4): tracker plus history answer N02, N04 and N22 (Y), N03 and N15 partly, N09 not at all (0 milestones).

## 7. Needs → report sections

Version A (baseline) and Version B (treatment) share every section except RS5, which only B shows (A2 Study design; TRY-CHANGELENS.md on the D2 branch).

**Status note (17 October 2026).** This table is the design. The frozen study pages built less of it. They have no RS1 summary sentence (only a "Largest area this week" line), no ticket-citation share, no RS7 and no RS8. RS8 is left off the study pages on purpose: a line saying the page shows no tracker would give away comprehension item 6, which is unanswerable by design (`deliverable-3` items files, slot 6). What is built is listed row by row in §10.

| Need | Section | Version | Design requirement | Evidence |
|---|---|---|---|---|
| N01 Each discipline's changes | RS2 regrouped; RS1 | A and B | Name disciplines in a producer's words (code, art, audio, scenes), not "ScenePrefab" or "DataConfig" (H2); show them as text, never colour alone | T1 partly ×4; TR-07; GP-05; P4 |
| N12 Content added or removed | RS2 Added and Deleted columns | A and B | "Added" and "Removed" visible per discipline without opening commits (H6) | T1 partly ×4 |
| N03 Tasks finished this week (partly) | RS4; RS8 | A and B | List commits with dates and authors; say that "planned" and "done" live in the tracker | T2; HP-24, TR-14 |
| N26 Is the tracker current (partly) | RS4; RS8 | A and B | Show the week's commits so a producer can check the board against them; print the share of commits citing a ticket | PS §6.1 point 2; GP-10 |
| N19 Gone quiet | RS7 | A and B, challenge tier only | Gated, composed across items (Maddila et al., 2023) | T6; P2, P6 |
| N25 What to tell the publisher (partly) | RS1 summary sentence; export | A and B | One plain summary sentence a producer can paste; export as a file readable without an account | T3, T7; P1; V1, V4 |
| N05 Scenes and prefabs by name | RS5 | B only | Names first, paths second; unresolved names shown as path and flagged | A2 Sub-question 2 |
| N14 Working build (runner-up) | RS6 | A and B, stretch tier only | Result and failed steps only | A2 stretch tier |
| N07, N08, N09, N17, N10, N24, N27 | RS8 "What this page cannot tell you" | A and B | Name each as "ask the team or check the tracker", so the page does not over-claim | NC §3; §3.1 cases |

Rows dropped for want of evidence beyond A2: none. N20, N21 and N22 stay on the page because the prototype already computes them at no cost, but they carry no D1 evidence (NC §5: 0–1 points) and are placed last.

## 8. Layout decisions

1. **Summary sentence first** (N25): the reader's job is the weekly update, and T3 failed for want of one.
2. **Disciplines next, in words** (N01, N12): the most-raised need ChangeLens can answer, and the one every tool hid behind tags or colour.
3. **RS5 named scenes and prefabs** (B only), then **RS4 commits** for checking against the board (N03, N26).
4. **RS8 last but always shown:** the needs the page cannot answer, so silence is not read as "nothing blocked" (reconciliation point 1). This feeds the *Create* diary entry.

*Status, 17 October 2026:* the study pages follow decision 2 fully and decision 3 partly. Decision 1 is partly built and decision 4 is not built (§10).

## 9. Out of scope, and why

- **A live tracker connection** (A2). Eight of the ten need the tracker or a person, so this is the largest gap; it is named in RS8, not hidden.
- **A language-model prose layer** (A2): it could not pass the fidelity check.
- **Needs no artefact fully answers:** none of the 25 is N for all three sources, but nine are P in the tracker and N elsewhere (N07, N08, N09, N16, N17, N18, N23, N24, N27); the page cannot help with them beyond naming them in RS8.

## 10. Status in ChangeLens on 17 October 2026

Added 17 October 2026 by Claude Code (AI), as facts for Raphael to check. Evidence is the four frozen study pages on branch `deliverable-2-changelens` (`study/week1-2021-02-08/` and `study/week2-2021-07-19/`, files `report-A-baseline.md` and `report-B-treatment.md`) and `ProducerReport.cs` on the same branch.

The study pages were frozen and fidelity-checked on 12 and 13 October. This spec was drafted on 15 October. So the pages were not built from the spec. Any new section on the study pages would mean redoing the D3 items and answer key and the D4 fidelity check.

| Requirement (§7, §8) | On the study pages | Evidence |
|---|---|---|
| N01 disciplines in words, as text not colour | Yes | "Where the work went" table: Code, Scenes and prefabs, Art, Audio |
| N12 Added and Removed per discipline | No | The area table gives file changes and share only |
| N03 commits with dates | Yes | "Changes, newest first", Date column |
| N03 commits with authors | No | No author per change. The header gives only a count ("7 changes by 2 people") |
| N26 share of commits citing a ticket | No | Not computed |
| N25 summary sentence (RS1) | Partly | "Largest area this week: ..." line under the area table |
| N25 export as a file readable without an account | Yes | Pages are written as Markdown files (`StudyExport.WriteStudyFiles`) |
| N05 names first, paths second (RS5, B only) | Yes | "Scenes and prefabs changed": name in bold, folder in brackets. Not on Version A |
| N05 unresolved names shown as path and flagged | Not seen | No flagged path on the study pages |
| N14 build result (RS6, stretch) | No | Not on the page. A BuildReport probe exists from A2 scoping (`BatchTools.cs`) |
| N19 gone quiet (RS7, challenge) | No | Not built |
| N07 to N27 "What this page cannot tell you" (RS8) | No | Left off on purpose; see the §7 status note |
| §8.1 summary sentence first | No | The header and area table come first; the "Largest area" line follows the table |
| §8.2 disciplines next, in words | Yes | Second block on every page |
| §8.3 RS5 (B only), then RS4 commits | Partly | Both are there, but RS4 comes before RS5 |
| §8.4 RS8 last, always shown | No | Not built |
| A and B share every section except RS5 | Yes | A and B differ only in "Scenes and prefabs changed" and the footer line |

**For Raphael to decide.** Whether to build RS8 (and the other "No" rows) into ChangeLens for the report and video, keeping the study pages as they are, or to report them as future work. Record the choice in the *Create* diary entry.

**Conflict to settle.** The N03 row asks for authors per change. The ethics points for the report (`deliverable-3/ethics/report-ethics-points.md`, point 3) say the page describes changes to the project, not each person's output, with no per-person counts. These pull against each other. Raphael to choose one and change the other.

## References

Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. *ICSE '07*, 344–353. https://doi.org/10.1109/ICSE.2007.45

Maddila, C., et al. (2023). Nudge: Accelerating overdue pull requests toward completion. *ACM TOSEM*, 32(2), Article 35. https://doi.org/10.1145/3544791

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. *CHI '94*, 152–158. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *CHI '90*, 249–256. https://doi.org/10.1145/97243.97281
