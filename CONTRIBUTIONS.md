# Contribution ledger

**Final, Wed 11 Nov 2026.** Who did what on ChangeLens, per deliverable. Written by Claude Code at Raphael's request, from the commit record and his own statements of 6 to 8 Nov 2026. Earlier drafts of this file asked Raphael to confirm each row. He did not go through them, so every cell below states only what a commit, a file or his own statement records.

## Summary

**Raphael did:**
- Chose the topic, research question and audience (producer), and the evaluation design (testing it himself, 17 Oct).
- Made the project decisions recorded in the commit messages: dropping the interviews, no ethics application, keeping the marking rule, stopping the evaluation after one unseen week (6 Nov), and handing the fidelity check, scoring, walkthrough and heuristic pass to Claude (7 Nov).
- The two evaluation reads on 6 Nov 2026: every answer, confidence rating, stand-up draft and 1 to 5 rating (`d01e3b0`, `a03a261`).
- The Week 13 diary entry in his own words and the 6 Nov hours row (`71f2b70`).
- The own-words answers of 8 Nov 2026 quoted in the report's Method, Results and Learning Reflection.

**Raphael did not:** write or edit the code or tests; hand-check the D1 findings, the D3 instruments, the D4 or 7 Nov fidelity scores, the scoring of his reads, or the walkthrough and heuristic findings; record the portfolio video.

**Claude did everything else** in the table below, including on 7 and 8 Nov the fidelity check of all 96 claims, the scoring of the two reads, the walkthrough and heuristic pass, the analysis and the "Save page" fix (`3cf2727`); on 10 Nov the merge into `main`, the e-mail scrub and the report assembly; and on 11 Nov the Unity test run and the final tidy of the diary, this ledger and the folder READMEs.

## Commits

`main` holds 222 commits at submission, not counting merges: 219 under Raphael's GitHub account and 3 under Claude's. The author field does not show who did the thinking, so this ledger does.

212 of the 222 carry a `Co-Authored-By: Claude` line. The other ten are the commits of 6 to 8 Nov:
- four hold Raphael's own work of 6 Nov: his two reads, a start-time correction, and his diary entry and hours row (`d01e3b0`, `a03a261`, `4153123`, `71f2b70`);
- six hold work Claude did at his request on 7 and 8 Nov, without the line: the hand-check sample, the fidelity check, the scoring, the walkthrough and heuristic pass, the fix and the analysis (`9bd23c0`, `070d8a4`, `bbcb691`, `f9e8908`, `3cf2727`, `ee20ce3`).

## By deliverable

| D | Claude did (evidence) | Raphael did (evidence) |
|---|---|---|
| 1 UX study and design spec | Desk-research prep (`4c4c87f`); heuristic pass on four tools in Raphael's browser, 61 problems (`e078ebd`); verification, needs, marks, top ten, design spec (`92ff8b4`); check pack (`ce147cd`) | Asked Claude to run the pass and finish D1 for lack of time; dropped the two interviews (`e078ebd`, `92ff8b4` messages). He did not work through the check pack or repeat any finding by hand |
| 2 ChangeLens package | Report generator, .NET harness (`b96c1fa`); date fixes, Producer Page window, parser repair (`e73f544`, `323eac1`, `bf09b4e`); 17 Oct repairs, tests 46 to 85 (`4d33ce7` .. `af23dab`); word counter, README, GenAI evidence index (`861d895`, 26 Oct); licence and notices (`e391c9b`, 28 Oct); "Save page" fix, tests to 88 (`3cf2727`, 8 Nov); Unity test run, 88 of 88 (11 Nov) | Set the tool's purpose, audience and two versions in his proposal, and directed the work. He did not write or edit the code or tests. No hands-on testing in Unity by him is recorded |
| 3 Instruments | Items, keys, ten-need sheet, protocol, ethics research (`4ae7653`, `4804778`, `cf90ef9`) | Decided the participant floor (14 Oct, `ff65ae7`; superseded on 17 Oct); decided no ethics application (17 Oct, `e603c8f`); accepted the ten-need answer key as drafted (21 Oct, `8fb989c`). He did not hand-check the instruments |
| 4 Fidelity check | AI scoring of the July and February weeks, re-score after repair (`5fd3044`, `b1a2df6`); third AI check of all 96 claims (`070d8a4`, 7 Nov) | Chose to hand-check a 26-row sample (7 Nov, `9bd23c0`), then asked Claude to run the check instead. No hand check was done |
| 5 Evaluation runs | Plan and run kit (`125a9bb`, `8bb1800`, `cdf61f5`); held-out-week items by AI agents (`0d3f811`); plan section 5 filled (`8fb989c`); run-kit and run-sheet updates (`3d0f66d`, `f598b99`, `d882927`, `9a12294`, `fe6fb5c`, `7784f55`) | The 17 Oct evaluation decision and his reasons in his words (`deliverable-5/self-evaluation-plan.md` section 1, `125a9bb`); go-ahead for the items and request to fill section 5 (21 Oct); 26 Oct answers: no thresholds set in advance, no AI second scorer, marking rule kept. **The two reads of 6 Nov 2026** (`d01e3b0`, `a03a261`). Decided to stop after one unseen week |
| 6 Evaluation data and analysis | Analysis and figure tools, skeleton, appendix plan (`6c1faba`, `01688cb`, `10fca4f`); data files and README edits (`e9ec1de`, `c355b43`, `1403820`, `403576c`, `45d901c`); scoring of the two reads (`bbcb691`), walkthrough and heuristic pass (`f9e8908`), analysis (`ee20ce3`), 7 and 8 Nov | His answers are the read data. He asked Claude to score them and to run the walkthrough and heuristic pass, and did not check those by hand. Claude wrote the report's Results text; the quoted passages in it are his own words of 8 Nov |
| 7 Portfolio video | Storyboard, shot list (`91536d3`, `8be10b3`, `1855d39`, `db1d401`, `7213a22`); scripts outside the repository | Nothing: no video was recorded |
| 8 Development diary | Fact logs, template, hours script, drafts v0.1 to v0.4 (`3b75f12`, `84a83e5`, `8d22fac`, `adbbf58`, `bc5cde2`, `45a9005`, `d906704`, `c1df9d2`, `cc37123`, `1d8e545`, `9c572e0`); the final `deliverable-8/DIARY.md`, compiled from them (11 Nov) | His answers of 17 Oct, carried in the drafts (`adbbf58`); the Week 13 entry in his own words and the 6 Nov hours row (`71f2b70`). He wrote no other entries and logged no other hours |
| 9 Reflection | Skeleton, goal prompts, variance table (`6cb114e`, `5f2345b`, `8dabc2e`, `0bcdcfc`); arranging his answers under each goal in the report | His own-words answers of 8 Nov 2026, quoted in section 4 of the report |

## Earlier draft notes (history)

These notes headed the drafts of this file and are kept as the record. The counts in them are the figures of their dates.

> **Draft by Claude (Claude Code, Opus 5.5), 26 Oct 2026, for Raphael to confirm.** Every one of the 203 commits on GitHub up to 26 Oct 2026 19:29 Sydney time (`0bcdcfc`, `7213a22`; re-counted that day) carries a `Co-Authored-By: Claude` trailer (200 authored as RaphaelByun, 3 as Claude), so the author field does not show who did the thinking.
>
> **Revised by Claude Code (Opus 5.5), Wed 28 Oct 2026.** Re-counted after `git fetch --all`: 207 unique commits to `1d8e545` (26 Oct 23:08), 204 authored as RaphaelByun and 3 as Claude, all made with Claude Code; none on 27 or 28 Oct before that count.
>
> **Status block added by Claude Code (Opus 5.5), Tue 10 Nov 2026,** from the commits and Raphael's statements of 6 to 8 Nov. It is now the Summary above.
