# Deliverable 1 — Production-tool UX study and design spec

COMP3180, Semester 2 2026. Raphael Byun. Folder prepared 12 October 2026 (Week 10) by Claude Code; nothing here is committed.

## What D1 is

From the approved proposal (A2 Draft v2, 17 Sep 2026), Deliverables table, row 1: **Production-tool UX study and design spec (Apply and Analyse; Evaluate)**, 10 hours, 2 of them in prac.

| Part | A2 success measure | A2 hours |
|---|---|---|
| Heuristic pass | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994) | 4 |
| Desk scan | 10 job ads and five G2 reviews coded | 1 |
| Interviews | Two 20-minute interviews outside the reader pool | 2 |
| Needs | 25 needs classified by artefact source, seeded from Ko et al.'s 21 types and checked against the Unity Experiment Framework | 3 |

It also has to supply the Learning Goal *Apply and Analyse* measure ("one reconciliation naming three places where inspection and interviews disagree") and part of the *Evaluate* measure ("three needs where I name the artefact I rejected and why"). Its output feeds the ten-need sheet in Deliverable 3: the ten needs D1 raises most often.

A2's plan had D1 running across the break and Week 9. It is now Week 10, and D3's instruments are due for the Week 11 pilot, so D1 needs to finish this week. As of 15 October 2026 every analysis step has a draft; what remains is Raphael's checking (below).

## Changes on 14 and 15 October 2026

Three departures from A2's plan, all to be stated in the spec and in the A3 reflection report:

1. **The heuristic pass was run by AI.** Raphael had no time to run it, so he authorised Claude (Claude Code) to run it through Chrome on his accounts on 14 October 2026. Claude seeded all four tools, ran tasks T1 to T7, wrote raw notes, and then coded the problems, rated severity and filled the summary matrix. The method note at the top of `heuristic-coding-sheet.md` sets out the limits: one evaluator, and an AI one; automated input (three HacknPlan findings are provisional); Trello seen on an automatic Premium trial and Jira on a Standard trial, not Free; no screenshots saved. **Raphael must hand-check at least the 16 severity 3–4 findings before citing them, and disclose the AI use in the A3 GenAI statement.**
2. **The interviews were dropped.** Raphael decided on 14 October 2026 to drop the two interviews, for time and because talking to participants needs ethics approval he could not get in time. Six published producer accounts were coded in their place (`published-sources.md`). The *Apply and Analyse* measure now reads "three places where inspection and the published sources disagree"; the reconciliation is in `published-sources.md` §6.1, and the substitution has to be stated wherever the measure is reported.

3. **The analysis was drafted by AI (15 October 2026).** Raphael had no time, so Claude Code did README steps 1, 3, 5, 6, 7, 8, 10 to 15 on 15 October 2026: it re-checked the free tiers and verified the ads, reviews V1–V4 and the published-source quotes on the live pages (one agent), and checked the Ko et al. adaptation against the PDF, recoded the sources, set the cap, tightened the reconciliation, edited and marked the 25 needs, picked the three rejected-artefact cases, ran the UXF week check, ranked the needs and wrote the spec and the D3 handoff (another agent). Every judgement is marked "AI-drafted, Raphael to accept or change". The A3 GenAI statement must say so.

Pass results in brief: 61 problems (Trello 16, HacknPlan 27, Jira 8, GitHub Projects 10); severity 1: 7, 2: 38, 3: 15, 4: 1 (provisional, HacknPlan). The counts reflect time spent and automation as well as the tools, so they are not a ranking (see §6 of the sheet).

Analysis results in brief (15 October 2026): the ten needs for the D3 sheet are N01, N03, N07, N08, N09, N12, N17, N19, N25, N26; runners-up N24, N11, N14, N02, N15. Only N01 and N12 are best answered by the repository; N05 (named scenes and prefabs) ranks 23rd of 25. Producers ask most for plan-side information ChangeLens does not read, and the spec says so.

## Files

| File | What it is | State |
|---|---|---|
| `README.md` | This file | — |
| `tool-selection.md` | The four tools, free-tier check (re-verified 15 Oct 2026 from pricing and support pages), plan reality vs what the pass saw | Verified by AI; Raphael glances at the pricing pages |
| `heuristic-coding-sheet.md` | Method note, heuristics, severity scale, seed and task script, 61 coded problems, task outcomes, strengths, summary matrix | Filled by AI on 14 Oct 2026; Raphael hand-checks severity 3–4 |
| `job-ads-and-reviews.md` | Codebook; 10 ads verified verbatim; reviews V1–V4 verified, V5 not; recounted codes and change log | Verified by AI 15 Oct 2026; Raphael spot-checks |
| `published-sources.md` | Six published producer accounts coded in place of the interviews; §3 recoded, §5 tally and cap, §6.1 reconciliation tightened, §7 live-page check | AI-drafted; Raphael accepts or changes |
| `interview-guide.md` | Recruiting message, consent script, 9 questions; now only the coding frame for the sources | Not used for interviews (dropped 14 Oct 2026) |
| `needs-catalogue.md` | Ko check log (§1); 25 needs marked T / R / U × D / P / N (§3); three rejected-artefact cases (§3.1); UXF week check (§4); ranking rule, cap and counts (§5); pass evidence (§6); change log (§7); judgements for Raphael (§8) | AI-drafted 15 Oct 2026; Raphael accepts or changes |
| `design-spec.md` | The design spec: reader, method and departures, tool findings, sources, reconciliation, the ten needs and headline finding, needs → report sections for Version A and B, layout, out of scope (about 1,700 words) | AI-drafted 15 Oct 2026; Raphael edits |
| `HANDOFF-TO-D3.md` | The ten needs in sheet wording, the researcher marking key (T / R / U × D / P / N, overall mark under both rules), five runners-up | AI-drafted; copy into `deliverable-3/ten-need-sheet.md` once accepted |
| `design-spec-outline.md` | The outline the spec was written from | Superseded by `design-spec.md` |

## To do for Raphael, in order (revised 15 October 2026)

A2 planned 600 minutes for D1. After the AI work on 14 and 15 October, about 182 minutes of Raphael's own work remain, almost all of it checking and accepting.

| # | Step | File | Minutes | A2 part |
|---|---|---|---|---|
| 1 | Glance at the four pricing pages; overwrite the "checked" date. Jira Free's Summary tab is unverified, so cite the Jira T3 result as "on a Standard trial" | tool-selection.md | 5 | Heuristic (4 h) |
| 2 | **Hand spot-check the 16 severity 3–4 findings**, starting with the provisional HP-16, HP-17, HP-18 and then HP-25, TR-13, HP-27 (the reconciliation rests on them); change, re-rate or delete what you cannot reproduce; screenshot each one you keep | heuristic-coding-sheet.md §5 | 45 | Heuristic |
| 3 | Read the Jira T3 update Claude wrote on 15 Oct; recheck the §6 matrix if any row changes in step 2 | heuristic-coding-sheet.md §5.3, §6 | 5 | Heuristic |
| 4 | Check later that the Trello Premium and Jira Standard trials lapse with nothing to pay | — | 2 | Heuristic |
| 5 | Spot-check three verified ads and the four verified reviews; decide whether to drop V5 or verify it | job-ads-and-reviews.md | 15 | Scan (1 h) |
| 6 | Accept the live-page quote check and the P1, P4, P6 settlements | published-sources.md §7 | 10 | Sources (2 h) |
| 7 | Accept or change the seven recodes and the cap of 2 | published-sources.md §3, §5 | 10 | Sources |
| 8 | Accept or rewrite the three-point reconciliation | published-sources.md §6.1 | 10 | Sources |
| 9 | Confirm with the convenor that coding public sources needs no ethics approval (question 6 of the D3 ethics email) | — | 5 | Sources |
| 10 | Accept the seven Ko et al. fixes | needs-catalogue.md §1 | 5 | Needs (3 h) |
| 11 | Accept or change the merges, additions and rewordings | needs-catalogue.md §3, §7 | 10 | Needs |
| 12 | Accept or change the 75 marks and the three rejected-artefact cases (N07, N10, N27) | needs-catalogue.md §3, §3.1 | 20 | Needs |
| 13 | Accept the UXF week and six verdicts | needs-catalogue.md §4 | 5 | Needs |
| 14 | Accept the rule, map and ranks; if anything above changed, re-run the count | needs-catalogue.md §5 | 5 | Needs |
| 15 | Read and edit the spec; put it in your own words where you will quote it in A3 | design-spec.md | 20 | Needs (remaining) |
| 16 | GenAI statement lines (below) | A3 report | 10 | — |
| | **Total** | | **182** | |

Minutes check: 5 + 45 + 5 + 2 + 15 + 10 + 10 + 10 + 5 + 5 + 10 + 20 + 5 + 5 + 20 + 10 = 182. Against A2's 600: log the variance in the reflection report with the reason (time pressure) and the cost (an AI single evaluator, no interviews, AI-drafted analysis that Raphael checked rather than did).

**GenAI statement lines for A3 (draft; adjust to what you actually did):**
- "Claude (Claude Code) ran the heuristic pass through a browser on my accounts on 14 October 2026 and coded the problems and severities; I hand-checked the severity 3–4 findings on [date]."
- "Claude verified the job ads, reviews and published-source quotes against the live pages on 15 October 2026; I spot-checked [n] of them."
- "Claude drafted the needs analysis (Ko et al. check, needs edits and marking, rejected-artefact cases, UXF check, ranking) and the design spec on 15 October 2026; I accepted or changed each judgement listed in needs-catalogue.md §8 on [date]."

## Done vs to do

| Done by Claude Code | Raphael's to do |
|---|---|
| 12 Oct 2026: picked four tools; built the coding sheet, task script and seed; found 10 ads and 5 reviews; extracted Ko et al.'s 21 types; drafted 25 needs; outlined the spec | Glance at the pricing pages |
| 14 Oct 2026: ran and coded the heuristic pass (61 problems); coded six published sources in place of interviews; drafted the reconciliation; added pass evidence to the catalogue | Hand-check the severity 3–4 findings; confirm the trials lapse |
| 15 Oct 2026 (web agent): re-verified free tiers; verified 10 ads, reviews V1–V4 and every source quote on the live pages; recounted the ad codes; settled P1, P4, P6 | Spot-check the verified ads and reviews; decide on V5 |
| 15 Oct 2026 (analysis agent): checked Ko et al. against the PDF (7 fixes); recoded the sources and set the cap; tightened the reconciliation; edited and marked the 25 needs; picked N07, N10, N27 as rejected-artefact cases; UXF week check (9–15 Nov 2020); ranked the needs; wrote design-spec.md and HANDOFF-TO-D3.md | Accept or change every judgement in needs-catalogue.md §8; edit the spec; convenor line; GenAI statement |

## Network limits in this session (why some things are unverified)

On 12 October 2026 this session could not open trello.com, hacknplan.com, atlassian.com, codecks.io, notion.com, linear.app, gamejobs.co, workwithindies.com, hitmarker.net, LinkedIn, Teamtailor, G2 or Capterra directly. Facts from those sites came through web-search results and are marked as such. github.com and microsoft.com (the Ko et al. PDF) were readable.
