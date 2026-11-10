# Contribution ledger (draft)

## Status at submission (Tue 10 Nov 2026)

This block replaces every "[to confirm]" cell in the table below. Written by Claude Code (Opus 5.5) at Raphael's request, from the commits and his own statements of 6–8 Nov 2026.

**Raphael did:**
- Chose the topic, research question and audience (producer), and the evaluation design (testing it himself, 17 Oct).
- Made the project decisions recorded in the commit messages: dropping the interviews, no ethics application, keep Rule 2, stopping the evaluation after one unseen week (6 Nov), and handing the fidelity check, scoring, walkthrough and heuristic pass to Claude (7 Nov).
- The two evaluation reads on 6 Nov 2026: every answer, confidence rating, stand-up draft and 1–5 rating (`d01e3b0`, `a03a261`).
- The Week 13 diary entry in his own words and the 6 Nov hours row (`71f2b70`).
- The own-words answers of 8 Nov 2026 used in the report's Results and Learning Reflection.

**Raphael did not:** write or edit the code or tests; hand-check the D1 findings, the D3 instruments, the D4 or SE1 fidelity scores, or the SE3/SE4 findings; record the portfolio video.

**Claude did everything else** listed in the table below, plus on 7–8 Nov: the fidelity check of all 96 claims, scoring of the two reads, the walkthrough and heuristic pass, the analysis, the "Save page" fix (`3cf2727`), and on 10 Nov the merge into `main` and the e-mail scrub.

> **Draft by Claude (Claude Code, Opus 5.5), 26 Oct 2026, for Raphael to confirm.** Every one of the 203 commits on GitHub up to 26 Oct 2026 19:29 Sydney time (`0bcdcfc`, `7213a22`; re-counted that day) carries a `Co-Authored-By: Claude` trailer (200 authored as RaphaelByun, 3 as Claude), so the author field does not show who did the thinking. The "Raphael did" column holds only what a file or commit message records as his decision or answer; everything else is `[to confirm]`. Raphael confirms or edits every row before submission. Link this file from the root README when the branches are merged to `main`.
>
> Revised by Claude Code (Opus 5.5), 26 Oct 2026, Raphael away: counts re-checked; 21 and 26 Oct commits added; his 26 Oct answers recorded; `ff65ae7` marked superseded.
>
> **Revised again by Claude Code (Opus 5.5), Wed 28 Oct 2026. Still DRAFT.** Re-counted after `git fetch --all`: **207 unique commits** to `1d8e545` (26 Oct 23:08), 204 authored as RaphaelByun and 3 as Claude, all made with Claude Code; none on 27 or 28 Oct. The four 26 Oct 23:08 commits are added below (`fe6fb5c`, `45d901c`, `861d895`, `1d8e545`), and his 26 Oct requests (keep Rule 2; fewer Claude commits) are recorded. The counts in the first paragraph above are the 26 Oct figures, kept as history.

| D | Claude did (evidence) | Raphael did (evidence) |
|---|---|---|
| 1 UX study and design spec | Desk-research prep (`4c4c87f`); heuristic pass on four tools in Raphael's browser, 61 problems (`e078ebd`); verification, needs, marks, top ten, design spec (`92ff8b4`); check pack (`ce147cd`) | Asked Claude to run the pass and finish D1 for lack of time; dropped the two interviews (`e078ebd`, `92ff8b4` messages). Spot-checks in the check pack: [to confirm] |
| 2 ChangeLens package | Report generator, .NET harness (`b96c1fa`); date fixes, Producer Page window, parser repair (`e73f544`, `323eac1`, `bf09b4e`); 17 Oct repairs, tests 46 → 85 (`4d33ce7` .. `af23dab`); `count-a3.js` Markdown parsing, README start-here, GenAI evidence index (`861d895`, 26 Oct) | A2 prototype and initial commit (`dbb6af4`): [to confirm what he wrote]. Testing in Unity, choices on the page design: [to confirm] |
| 3 Instruments | Items, keys, ten-need sheet, protocol, ethics research (`4ae7653`, `4804778`, `cf90ef9`) | Decided the participant floor (14 Oct, `ff65ae7`; superseded on 17 Oct); decided no ethics application (17 Oct, `e603c8f`). Hand-check of D3: [to confirm] |
| 4 Fidelity check | AI scoring of July and February weeks, re-score after repair (`5fd3044`, `b1a2df6`) | Hand-check of the AI scores ("read by hand" in A2): [to confirm] |
| 5 Evaluation runs | Plan and run kit (`125a9bb`, `8bb1800`, `cdf61f5`); reserve-week items by AI agents (`0d3f811`); plan section 5 filled, Rule 2 chosen as Claude's reversible call (`8fb989c`); run-kit and run-sheet date moves (`3d0f66d`, `f598b99`); 26 Oct plan wording edit (`d882927`) and the record of his 26 Oct answers (`9a12294`); run kit to the 26 Oct schedule, plan s11 list for his approval (`fe6fb5c`, 26 Oct 23:08) | 17 Oct evaluation decision and his reasons in his words (`deliverable-5/self-evaluation-plan.md` section 1, `125a9bb`); go-ahead for the items and request to fill section 5 (21 Oct, `0d3f811`, `8fb989c`). 26 Oct answers, recorded in the plan (`9a12294`): no thresholds set in advance; no AI second scorer. Rule 2 confirmed by him on 26 Oct ("keep Rule 2"; not yet in a commit message). Asked Claude for fewer commits on 26 Oct, so the late 26 Oct work went in as one commit per branch. [Raphael: confirm, or record it in the plan.] The SE runs themselves: [to confirm] |
| 6 Evaluation report and data | Analysis and figure tools, skeleton, appendix plan (`6c1faba`, `01688cb`, `10fca4f`); blank data files (`e9ec1de`, 21 Oct); skeleton and README edits (`c355b43`, `1403820`, `403576c`, 26 Oct); analysis copes with no second scorer, D1 Table F inputs (`45d901c`, 26 Oct 23:08) | Data, results and discussion text: [to confirm] |
| 7 Portfolio video | Storyboard, shot list (`91536d3`, `8be10b3`); storyboard, shot list and README edits (`1855d39`, `db1d401`, `7213a22`, 26 Oct); scripts v0.1/v0.2 outside the repo | Recording, voice-over, edit: [to confirm] |
| 8 Development diary | Fact logs, template, hours script, drafts v0.1–v0.3 (`3b75f12`, `84a83e5`, `8d22fac`, `adbbf58`, `bc5cde2`); v0.2 fixes (`45a9005`, `d906704`, 21 Oct); v0.3, hours prefill and this ledger (`c1df9d2`, `cc37123`, 26 Oct); tidy (`1d8e545`, 26 Oct 23:08); draft v0.4, commit windows, hours prefill v0.2 and this revision (28 Oct) | Answers carried into the drafts as "Raphael, 17 Oct draft" (`adbbf58`). Completed entries and hours: [to confirm] |
| 9 Reflection | Skeleton, goal prompts, variance table, GenAI list (`6cb114e`, `5f2345b`); skeleton, README and variance-table edits (`8dabc2e`, `0bcdcfc`, 26 Oct) | Reflection text in his own words: [to confirm] |
