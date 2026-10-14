# Design spec — outline

The written output Deliverable 1 ends in ("Production-tool UX study and design spec"). This is the outline the spec was written from: headings, what evidence fills each, and where it comes from. **Superseded 15 October 2026 by `design-spec.md`**, which Claude Code drafted from this outline (Raphael to accept or change). Two departures from the outline: §4 covers the six published sources instead of the dropped interviews, and §5's reconciliation is taken from `published-sources.md` §6.1. The "to fill" cells below are filled in `design-spec.md` §7; RS8 is kept.

ChangeLens report sections referred to below are those the prototype produces now (prototype/HOW-IT-WORKS.md §5) and those A2 commits to adding:

| Report section | Tier | What it shows |
|---|---|---|
| RS1 Summary block | Prototype | Commits, date range, changed-file entries, code-file entries and percentage |
| RS2 Category table | Prototype; committed tier regroups it | Added / modified / deleted / renamed per category; producer page shows code, art, audio, scenes, with Meta and DataConfig as supporting counts |
| RS3 Top-level folders | Prototype | Folders touched, busiest first |
| RS4 Commit list | Prototype | One row per commit: subject, author, files with status and category |
| RS5 Named scenes and prefabs | Committed tier (treatment condition only) | Object names from prefab and scene text; component GUIDs resolved through the AssetDatabase; file path where no name resolves |
| RS6 Build result | Stretch tier | Unity BuildReport: result, failed steps, three largest asset-size changes |
| RS7 Gone quiet | Challenge tier | Work flagged as gone quiet, gated (Maddila et al., 2023) |
| RS8 "What this page cannot tell you" | Proposed here | A fixed line or list naming needs the report does not answer (compare A2 Appendix B item 6) |

## 1. Purpose and reader (½ page)

- Who the page is for: a producer who never opens the codebase (A2 Learning Goal *Create*).
- What decision or report it supports: the weekly update upward and to partners.
- Evidence: job-ad counts for SR/EXT, MS, RK (job-ads-and-reviews.md §2.2); interview Q4 answers.

## 2. Method in brief (½ page)

- Four tools, why these four (tool-selection.md), one evaluator, ten heuristics, severity scale, seeded week, task script.
- Ten ads and five reviews: codebook, verification step, closed listings counted.
- Two interviews: who (de-identified), 20 minutes, guide in appendix.
- Needs: seeded from Ko et al.'s 21 types, 25 candidates, classified T / R / U × D / P / N, UXF check.
- Limits: one evaluator finds a minority of problems (Nielsen & Molich, 1990); two interviews; review and ad text are self-selected.

## 3. What existing tools do and do not show a producer (1 page)

- Evidence: heuristic-coding-sheet.md summary matrix; the task-outcome tables (which of T1–T7 failed in which tool).
- Write per task, not per tool: "Finding what art changed (T1) failed in N of 4 tools because…".
- Highest-severity problems (3–4) in a short table: tool, heuristic, problem, severity, screenshot.
- Link each to a need ID.

## 4. What the interviewees said (½–1 page)

- Evidence: the two note sheets (interview-guide.md template), coded to needs, job-ad codes, heuristics, Ko types.
- How they learn what changed (Q2–Q3), what they report (Q4), what surprised them (Q5), what they trust (Q6).
- Quotes only from notes marked as their words.

## 5. Reconciliation: three places inspection and interviews disagree (placeholder)

Required by Learning Goal *Apply and Analyse*. To be written after both interviews.

| # | What the inspection found (problem ID, severity) | What interviewees said (P1/P2, note time) | Kind of disagreement | Likely explanation | Consequence for the ChangeLens page |
|---|---|---|---|---|---|
| D1 | | | | | |
| D2 | | | | | |
| D3 | | | | | |

Kinds to look for: (a) a problem rated 3–4 that interviewees work round and don't mind; (b) a problem interviewees care about that the inspection rated low or missed; (c) a task the evaluator completed that interviewees say they never do, or the reverse. If fewer than three real disagreements turn up, say so and report the agreements instead; do not manufacture a third.

## 6. Needs: final catalogue and the ten for the Deliverable 3 sheet (1 page)

- Evidence: needs-catalogue.md with evidence counts filled in.
- The ranking rule (needs-catalogue.md §5) stated before the table.
- Final T / R / U × D / P / N marking for all 25.
- **Evaluate measure:** three needs where a named artefact was rejected, and why (draft candidates N07, N10, N23).
- UXF check results for the six needs checked.

## 7. Needs → report sections (the design spec proper, 1 page)

One row per need that the page will answer at least partly. Draft mapping from the needs catalogue:

| Need | Report section(s) | Design requirement it implies | Backed by (heuristic, interview, ad) |
|---|---|---|---|
| N01 What each discipline changed | RS2 (regrouped), RS1 | Disciplines named in a producer's words (H2), not "ScenePrefab" or "DataConfig" | to fill |
| N02 What each teammate did | RS4 | Group or filter commits by author | to fill |
| N04 Work with no ticket | RS4 (+ tracker link, out of scope) | Out of scope while there is no tracker connection; list under RS8 | to fill |
| N05 Which scenes changed | RS5, RS2 | Scene names first, paths second | to fill |
| N06 Which prefabs changed, by name | RS5 | Names resolved; unresolved shown as path, flagged | to fill |
| N11 What to retest | RS5 (partly) | Show which changed prefabs appear in which changed scenes, if feasible; otherwise RS8 | to fill |
| N12 New art and audio | RS2 (Added column) | "Added" visible per category without opening commits (H6) | to fill |
| N13 What was removed | RS2 (Deleted column), RS4 | Deletions shown, not buried | to fill |
| N14 Build result | RS6 | Only if stretch tier ships | to fill |
| N19 Gone quiet | RS7 | Only if challenge tier ships; gated | to fill |
| N20 Where effort went | RS3 | Label as "changed-file entries", not effort | to fill |
| N21 Code-heavy or content-heavy | RS1 | One sentence with the number | to fill |
| N22 Dependencies changed | RS2 or a new line | Flag Packages/manifest.json and ProjectVersion.txt changes | to fill |
| N07, N08, N10, N16, N23, N24 | RS8 | Named as "ask the team" so the page does not over-claim (A2 Appendix B unanswerable item) | to fill |

Replace "to fill" with evidence IDs (for example TR-06, P1 07:40, A02). A row with no evidence after the pass should be dropped or marked as A2-only.

## 8. Layout decisions (½ page)

- Each layout choice tied to a named need and a heuristic finding (this feeds the Learning Goal *Create* diary entry).
- Order of sections on the page, and why.

## 9. Out of scope and open questions (¼ page)

- Live tracker connection (A2: out of scope).
- Language-model prose layer (A2: out of scope).
- Needs marked N for all three sources.

## Appendices

- A: Heuristic coding sheets (all four tools) and screenshots.
- B: Job-ad and review table with verification dates.
- C: Interview guide and de-identified notes.
- D: Needs catalogue with evidence counts.
