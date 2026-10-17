# Generative AI use — evidence index for COMP3180 A2 and A3

This file has two parts: the A2 index (unchanged apart from paths) and an A3 index, below it.

## A2 (proposal, 20 Sep 2026)

Companion to Appendix A of the proposal. Items dated 28 Jul to 2 Sep are on disk in `School/Unit 3 Sem 2/COMP3180/Working folder/`. Items dated 17 Sep onward are in this repository; it was the folder `Working folder/a2-final-sprint-17-sep-2026/` until 14 Oct 2026, and their paths below are now relative to the repository root. Everything can be supplied on request. Tool throughout: Claude (Anthropic) via Claude Code, models Fable 5.1 (main session), Opus, Sonnet and Haiku (sub-agents).

| Date (2026) | Activity | Where the evidence is |
|---|---|---|
| 28 Jul | Topic exploration: council verdict, research brief, ranked topic options | `Topic Council Verdict — 28 Jul 2026.md`, `Research Brief — Options & Production Literature — 28 Jul 2026.md`, `Unit-Native Topic Options — 28 Jul 2026.md` |
| 3 Aug | Literature research base (20 agents, one per source) and competitor landscape scan | `production-reporting-literature/` (report, per-source JSON), `Competitive Landscape — Production Reporting Tools — 3 Aug 2026.md` |
| 8–10 Aug | Second literature base on production-tool UX | `production-tool-ux-literature/` |
| 22 Aug | Evaluation-design council and third literature base | `../.claude/council-cache/local-council-1787395111.md`, `a2-evaluation-and-build-literature/` |
| 28–30 Aug | A2 scouting, source verification, corpus screening, research dossier | `a2-recovered-29-aug-2026/` (BATTLE-PLAN, DOSSIER, verified-sources/, scout-run/) |
| 2 Sep | Draft v1, consistency and rubric audit, adversarial mock mark, per-source SAFE / DO-NOT-WRITE verification | `a2-draft-2-sep-2026/` (draft, audit/, verify/) |
| 17 Sep | Audit of Draft v1 by 14 agents (two rubric markers, cold reader, adversarial examiner, seven citation verifiers, mechanical and readability audits, prior-art web recheck) | `audit/FINDINGS-v1.md`, `audit-v1-raw.json` |
| 17 Sep | ChangeLens-lite prototype: C# written by AI from Raphael's specification, compiled and tested in Unity 6000.4.10f1, screenshots captured | `ChangeLens-proto/`, `prototype/HOW-IT-WORKS.md`, `prototype/CHANGELOG.md`, `prototype-logs/` (compile.log, tests.xml: 27 passed, 0 failed) |
| 17 Sep | Corpus measurement script and figures | `corpus/` (corpus.py, results.md, results.json), `figures/` |
| 17 Sep | Section rewrites against the audit findings, assembly, second marking round | `audit/EDIT-PLAN-v2.md`, `REPORT.md`, the draft files in the same folder |
| 17–18 Sep | Eight marking rounds (calibrated on the real A1 mark), proofreading, a cold non-programmer reader, PDF fact-finding over the downloaded papers, web checks of product pages, Endsley's definition, Anchorpoint, and Whitson (2018) via its open-access PubMed Central copy | `audit/FINDINGS-v2.md`, `FINDINGS-v3.md`, `FINDINGS-round-1.md` to `-round-5.md`, `verified-additions-round-1/4/5.md`, the `apply-*.py` edit scripts and the as-marked copies |
| 18 Sep | Docked Editor captures for Figure 2 (`DockedScreenshotBootstrap.cs`, three GUI-mode runs), SS3D week ranking and export scripts, naming-presence measurement over four weeks | `prototype/CHANGELOG.md` (fourth and fifth passes), `prototype-logs/screenshot3.log`, `screenshot4.log`, `figures/fig2-changelens-docked*.png`, `corpus/scan-weeks.py`, `corpus/export-week.py`, `audit/verified-additions-round-5.md` |
| 18 Sep (evening) | Own-team evidence: the Inkform repository classified (`corpus/scan-repo.py`, sixth bar of Figure 1 via `corpus/plot-fig1.py`), Jira issue counts and two Confluence sprint pages read through the Atlassian connection; batch export of the ChangeLens report for the sampled week and a Unity build-report probe (`BatchTools.cs`); a web-scout sample of ten producer job advertisements; draft comprehension items (Appendix B) written by AI from the week's data for Raphael to check | `audit/verified-additions-round-5.md`, `-round-6.md`, `prototype/CHANGELOG.md` (sixth pass), `prototype-logs/export-2021.log`, `build.log`, `buildreport.txt` |

### What the AI did and what Raphael did (A2)

- AI: searched for and cross-checked sources; compiled verification records; drafted and rewrote prose against a locked set of verified facts; mock-marked drafts against the published rubric; wrote the prototype code, the corpus script and the figures; audited word counts, referencing and readability.
- Raphael: chose the topic and the research question; held the 1-on-1s with staff that set the direction; ran the two producer interviews; made every scope and design decision recorded in `ANSWERS.md` and the earlier decision files; reviewed and edited each section; ran the tool; is responsible for the final text.

### Errors introduced by AI and caught by verification (A2)

1. A fabricated quotation ("producers as risk-communication ambassadors") that exists in no source — removed 3 Aug.
2. Whitson's 2020 *Games and Culture* article substituted for the 2018 *New Media & Society* paper — caught and reverted 21–22 Aug.
3. Two paper counts (96 and 166) conflated between a 2021 testing survey and a 2022 workshop dataset — corrected 3 Aug.
4. An "articulation failure" mechanism attributed to Whitson (2018) that the paper does not support — corrected 2 Sep to opacity plus blame on the tool.
5. Nudge notifications described as reaching "the blocked developer", which no source states — corrected 17 Sep.

## A3 (final project, from 11 Oct 2026)

Facts for the A3 Statement on Generative AI use. The statement itself is Raphael's to write. Built on 17 Oct 2026 from `git log --all`; later commits are not listed. Tool throughout: Claude (Anthropic) via Claude Code, model Claude Opus 5.5, with Claude Sonnet 5.5 sub-agents (the model names in the local session logs a2281cff, fa1f5015 and 8aab22de).

Every commit in the repository up to 17 Oct 2026 carries a `Co-Authored-By: Claude` trailer. To refresh this list:

```
git log --all --no-merges --reverse --date=short --format="%h %ad %(trailers:key=Claude-Session,valueonly) %s"
```

### Sessions

| Dates | Session link (from the commit trailers) | Commits |
| --- | --- | --- |
| 11 Oct | none in the trailer | `dbb6af4` (initial commit on `main`: the A2 materials and the prototype) |
| 12 Oct | https://claude.ai/code/session_011G7cN5AvLXs3TiJfp38JQ9 (a claude.ai/code session run from Raphael's phone) | `b96c1fa`, `5fd3044`, `4c4c87f` |
| 13 Oct | none in the trailer | `802fbb8` |
| 13–14 Oct | https://claude.ai/code/session_01AUvZoZdotWrVLXNE3DghCf | `e73f544` to `cf90ef9` |
| 17 Oct | https://claude.ai/code/session_01KoudXgtp2BMgLNPU5gMipQ | `f569f96` onward |

Local Claude Code session logs (one `.jsonl` per session, with sub-agent logs in a folder of the same name) are on Raphael's PC in `C:\Users\rapha\.claude\projects\C--Users-rapha-Documents-School-Unit-3-Sem-2\`. Raphael chooses which to export as evidence.

A marker cannot open the session links above. To turn one local log into a readable transcript for an appendix:

```
node tools/export-transcript.js <session>.jsonl --out transcript.md [--no-tool-output] [--from 2026-10-17T00:00 --to 2026-10-17T23:59]
```

It writes the user prompts, Claude's replies and the names of the tools called, each with a timestamp, and masks e-mail addresses and the Windows user folder. Read the output before using it. Its tests: `node tools/export-transcript.test.js`. Which local log holds which session (checked 17 Oct 2026 by searching the logs for the session links): the 13–14 Oct session is in `a2281cff-….jsonl` (it ran on the PC over Remote Control); the 17 Oct session is `fa1f5015-….jsonl`. The 12 Oct phone session ran in the cloud and has no local log; it can only be shown from claude.ai.

### By deliverable

| Deliverable (branch) | Dates | Commits | What the AI produced |
| --- | --- | --- | --- |
| D1 UX study (`deliverable-1-ux-study`) | 12, 14, 17 Oct | `4c4c87f`, `e078ebd`, `92ff8b4`, `f569f96`, `ce147cd`, `b0b931d` | Tool selection, heuristic coding sheet, job-ad and review scan, interview guide, needs catalogue and spec outline (12 Oct). The heuristic pass itself: Claude ran tasks T1 to T7 in Chrome on Raphael's accounts and coded and rated the problems (14 Oct). Six published producer sources coded in place of the interviews. Verified scan, need marks, UXF check, top ten and design spec, all for Raphael to accept. The check pack of 16 spot-check cards (17 Oct). |
| D2 ChangeLens (`deliverable-2-changelens`) | 12–14, 17 Oct | `b96c1fa`, `802fbb8`, `e73f544`, `323eac1`, `bf09b4e`, `ac9d39c`, `2b6b5ab`, `4d33ce7`, `1976e8a`, `8fb518f`, `b1c39af`, `4cb2f8c`, `09cac30`, `c7a8f24` | All the C# code and tests, the .NET harness, the Producer Page window, the study-week exports and reports, the parser repairs, and the guides (`TRY-CHANGELENS.md`, the package README and CHANGELOG). The SS3D credit page with its licences (`4cb2f8c`). This A3 section of the GenAI index (`09cac30`). The draft A3 index in the README (`c7a8f24`). |
| D3 Instruments (`deliverable-3-instruments`) | 13, 14, 17 Oct | `4ae7653`, `ff65ae7`, `4804778`, `3407fea`, `cf90ef9`, `e603c8f`, `ea35352` | Draft items, answer key, ten-need sheet, session protocol, consent form, proxy scenario, pilot plan, the ethics research and the report ethics points. |
| D4 Fidelity check (`deliverable-4-fidelity-check`) | 12–13 Oct | `5fd3044`, `b1a2df6` | AI scorers: first-scorer checklists for the July week; the February week scored by two independent AI scorers, then re-scored after the tool repair (`study/week1-2021-02-08/FIDELITY-RESULT.md`). The A2 plan says the check is read by hand, so Raphael's own check is separate. |
| D5 Sessions (`deliverable-5-sessions`) | 13, 14, 17 Oct | `3864dc5`, `46857b4`, `4fe6e0f`, `50d63be`, `cc9d44e` | Recruitment text drafts, booking tracker, session checklist, think-aloud codebook and `recode-sample.js`. No session data. |
| D6 Evaluation report (`deliverable-6-evaluation-report`) | 13, 14, 17 Oct | `6c1faba`, `e69ec9c`, `716f053`, `7ab114f`, `67d2f0c`, `a253f5c`, `89ed906` | Section skeleton, appendix plan, the analysis tool `analyse.js` with `test.js`, `figures.js`, and the D6 README updates. Sample CSVs are fake and labelled so. No findings. |
| D7 Portfolio video (`deliverable-7-portfolio-video`) | 13, 17 Oct | `91536d3`, `2bc8e14`, `6d9f7ba`, `5b82e14`, `ecc230c`, `7c5167b` | Storyboard, shot list and the two-viewer feedback form. No narration and no recording. |
| D8 Development diary (`deliverable-8-dev-diary`) | 13, 17 Oct | `3b75f12`, `1e60899`, `84a83e5`, `2a1d446`, `72a9d1d`, `7706776` | Diary template, fact log of commits and files, hours log files. No diary entries. |
| D9 Reflection (`deliverable-9-reflection`) | 13, 17 Oct | `6cb114e`, `e2f491c`, `124bd4b`, `e19aa0e`, `5f2345b`, `48e163c` | Reflection skeleton, prompts and `variance-table.js`. No reflection text. |
