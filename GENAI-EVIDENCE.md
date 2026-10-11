# Generative AI use — evidence index for the COMP3180 A2 submission

Companion to Appendix A of the proposal. Every item below exists on disk in `School/Unit 3 Sem 2/COMP3180/Working folder/` and can be supplied on request. Tool throughout: Claude (Anthropic) via Claude Code, models Fable 5.1 (main session), Opus, Sonnet and Haiku (sub-agents).

| Date (2026) | Activity | Where the evidence is |
|---|---|---|
| 28 Jul | Topic exploration: council verdict, research brief, ranked topic options | `Topic Council Verdict — 28 Jul 2026.md`, `Research Brief — Options & Production Literature — 28 Jul 2026.md`, `Unit-Native Topic Options — 28 Jul 2026.md` |
| 3 Aug | Literature research base (20 agents, one per source) and competitor landscape scan | `production-reporting-literature/` (report, per-source JSON), `Competitive Landscape — Production Reporting Tools — 3 Aug 2026.md` |
| 8–10 Aug | Second literature base on production-tool UX | `production-tool-ux-literature/` |
| 22 Aug | Evaluation-design council and third literature base | `../.claude/council-cache/local-council-1787395111.md`, `a2-evaluation-and-build-literature/` |
| 28–30 Aug | A2 scouting, source verification, corpus screening, research dossier | `a2-recovered-29-aug-2026/` (BATTLE-PLAN, DOSSIER, verified-sources/, scout-run/) |
| 2 Sep | Draft v1, consistency and rubric audit, adversarial mock mark, per-source SAFE / DO-NOT-WRITE verification | `a2-draft-2-sep-2026/` (draft, audit/, verify/) |
| 17 Sep | Audit of Draft v1 by 14 agents (two rubric markers, cold reader, adversarial examiner, seven citation verifiers, mechanical and readability audits, prior-art web recheck) | `a2-final-sprint-17-sep-2026/audit/FINDINGS-v1.md`, `audit-v1-raw.json` |
| 17 Sep | ChangeLens-lite prototype: C# written by AI from Raphael's specification, compiled and tested in Unity 6000.4.10f1, screenshots captured | `a2-final-sprint-17-sep-2026/ChangeLens-proto/`, `prototype/HOW-IT-WORKS.md`, `prototype/CHANGELOG.md`, `prototype-logs/` (compile.log, tests.xml: 27 passed, 0 failed) |
| 17 Sep | Corpus measurement script and figures | `a2-final-sprint-17-sep-2026/corpus/` (corpus.py, results.md, results.json), `figures/` |
| 17 Sep | Section rewrites against the audit findings, assembly, second marking round | `a2-final-sprint-17-sep-2026/audit/EDIT-PLAN-v2.md`, `REPORT.md`, the draft files in the same folder |
| 17–18 Sep | Eight marking rounds (calibrated on the real A1 mark), proofreading, a cold non-programmer reader, PDF fact-finding over the downloaded papers, web checks of product pages, Endsley's definition, Anchorpoint, and Whitson (2018) via its open-access PubMed Central copy | `audit/FINDINGS-v2.md`, `FINDINGS-v3.md`, `FINDINGS-round-1.md` to `-round-5.md`, `verified-additions-round-1/4/5.md`, the `apply-*.py` edit scripts and the as-marked copies |
| 18 Sep | Docked Editor captures for Figure 2 (`DockedScreenshotBootstrap.cs`, three GUI-mode runs), SS3D week ranking and export scripts, naming-presence measurement over four weeks | `prototype/CHANGELOG.md` (fourth and fifth passes), `prototype-logs/screenshot3.log`, `screenshot4.log`, `figures/fig2-changelens-docked*.png`, `corpus/scan-weeks.py`, `corpus/export-week.py`, `audit/verified-additions-round-5.md` |
| 18 Sep (evening) | Own-team evidence: the Inkform repository classified (`corpus/scan-repo.py`, sixth bar of Figure 1 via `corpus/plot-fig1.py`), Jira issue counts and two Confluence sprint pages read through the Atlassian connection; batch export of the ChangeLens report for the sampled week and a Unity build-report probe (`BatchTools.cs`); a web-scout sample of ten producer job advertisements; draft comprehension items (Appendix B) written by AI from the week's data for Raphael to check | `audit/verified-additions-round-5.md`, `-round-6.md`, `prototype/CHANGELOG.md` (sixth pass), `prototype-logs/export-2021.log`, `build.log`, `buildreport.txt` |

## What the AI did and what Raphael did

- AI: searched for and cross-checked sources; compiled verification records; drafted and rewrote prose against a locked set of verified facts; mock-marked drafts against the published rubric; wrote the prototype code, the corpus script and the figures; audited word counts, referencing and readability.
- Raphael: chose the topic and the research question; held the 1-on-1s with staff that set the direction; ran the two producer interviews; made every scope and design decision recorded in `ANSWERS.md` and the earlier decision files; reviewed and edited each section; ran the tool; is responsible for the final text.

## Errors introduced by AI and caught by verification

1. A fabricated quotation ("producers as risk-communication ambassadors") that exists in no source — removed 3 Aug.
2. Whitson's 2020 *Games and Culture* article substituted for the 2018 *New Media & Society* paper — caught and reverted 21–22 Aug.
3. Two paper counts (96 and 166) conflated between a 2021 testing survey and a 2022 workshop dataset — corrected 3 Aug.
4. An "articulation failure" mechanism attributed to Whitson (2018) that the paper does not support — corrected 2 Sep to opacity plus blame on the tool.
5. Nudge notifications described as reaching "the blocked developer", which no source states — corrected 17 Sep.
