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

A2's plan had D1 running across the break and Week 9. It is now Week 10, and D3's instruments are due for the Week 11 pilot, so D1 needs to finish this week.

## Changes on 14 October 2026

Two departures from A2's plan, both to be stated in the spec and in the A3 reflection report:

1. **The heuristic pass was run by AI.** Raphael had no time to run it, so he authorised Claude (Claude Code) to run it through Chrome on his accounts on 14 October 2026. Claude seeded all four tools, ran tasks T1 to T7, wrote raw notes, and then coded the problems, rated severity and filled the summary matrix. The method note at the top of `heuristic-coding-sheet.md` sets out the limits: one evaluator, and an AI one; automated input (three HacknPlan findings are provisional); Trello seen on an automatic Premium trial and Jira on a Standard trial, not Free; no screenshots saved. **Raphael must hand-check at least the 16 severity 3–4 findings before citing them, and disclose the AI use in the A3 GenAI statement.**
2. **The interviews were dropped.** Raphael decided on 14 October 2026 to drop the two interviews, for time and because talking to participants needs ethics approval he could not get in time. Six published producer accounts were coded in their place (`published-sources.md`). The *Apply and Analyse* measure now reads "three places where inspection and the published sources disagree"; the reconciliation is in `published-sources.md` §6.1, and the substitution has to be stated wherever the measure is reported.

Pass results in brief: 61 problems (Trello 16, HacknPlan 27, Jira 8, GitHub Projects 10); severity 1: 7, 2: 38, 3: 15, 4: 1 (provisional, HacknPlan). The counts reflect time spent and automation as well as the tools, so they are not a ranking (see §6 of the sheet).

## Files

| File | What it is | State |
|---|---|---|
| `README.md` | This file | — |
| `tool-selection.md` | The four tools (Trello, HacknPlan, Jira Free, GitHub Projects), why, free-tier check with URLs and dates; three considered and not picked | Done; Raphael confirms free tiers. Note: Jira was in fact seen on a Standard trial |
| `heuristic-coding-sheet.md` | Method note, ten heuristics, severity scale and how it was applied, seed and task script, coded problems and task outcomes per tool (with the hand-written T3 updates), strengths per tool, summary matrix and severity distribution | Filled by AI on 14 Oct 2026; Raphael spot-checks severity 3–4 by hand |
| `published-sources.md` | Six published producer accounts coded in place of the interviews; NEW needs; needs tally; five candidate disagreements with the pass findings; the three-point reconciliation | Draft; Raphael checks quotes on the live pages and accepts or rewrites the reconciliation |
| `job-ads-and-reviews.md` | Codebook; 10 real ads and 5 real reviews found by search, coded provisionally; wording not yet verified on the live pages | Draft; Raphael verifies |
| `interview-guide.md` | Recruiting message, consent script, 9 questions; now used only as the coding frame for the published sources | Not used for interviews (dropped 14 Oct 2026) |
| `needs-catalogue.md` | Ko et al.'s 21 types adapted; 25 candidate needs with provisional T / R / U × D / P / N marking; UXF facts; top-ten rule; §6 evidence from the heuristic pass with pass points per need | DRAFT; no mark changed by the pass |
| `design-spec-outline.md` | Headings of the spec, evidence for each, needs → ChangeLens report sections, reconciliation placeholder | Outline; reconciliation can now be copied from `published-sources.md` §6.1 |

## To do for Raphael, in order (revised 14 October 2026)

The original plan was 600 minutes (A2's 10 hours). With the pass done by AI and the interviews replaced, about 372 minutes of Raphael's own work remain.

| # | Step | File | Minutes | A2 part |
|---|---|---|---|---|
| 1 | Open the four official pricing pages; confirm each free tier; write your date in the table. Note that Jira was evaluated on a Standard trial and say whether Jira Free has the Summary tab used in T3 | tool-selection.md | 10 | Heuristic (4 h) |
| 2 | Hand spot-check: repeat the 16 severity 3–4 findings by hand, starting with the provisional HP-16, HP-17, HP-18; change, re-rate or delete what you cannot reproduce; save a screenshot for each one you keep | heuristic-coding-sheet.md §5 | 45 | Heuristic |
| 3 | Write the Jira T3 five-line update from the Summary figures (the notes have the figures but no text); recheck the §6 matrix if any row changed | heuristic-coding-sheet.md §5.3, §6 | 10 | Heuristic |
| 4 | Done 14 Oct 2026: GitHub repo and project, Trello board, Jira items and HacknPlan project deleted by Raphael. Only check later that the Trello Premium and Jira Standard trials lapse with nothing to pay | — | 2 | Heuristic |
| 5 | Open the 10 ad URLs and 5 review URLs; confirm and copy verbatim wording; fix codes; decide the SR rule for A09; recount §2.2 | job-ads-and-reviews.md | 60 | Scan (1 h) |
| 6 | Match every published-source quote to the live page; settle the P1 bio, P4 author and P6 date | published-sources.md §7 | 30 | Interviews (2 h, now sources) |
| 7 | Accept or change the source coding; decide whether to cap the source stream at 2 points in the top-ten rule | published-sources.md §3, §5 | 15 | Sources |
| 8 | Accept or rewrite the three-point reconciliation | published-sources.md §6.1 | 15 | Sources |
| 9 | One line to the convenor confirming that coding public sources needs no ethics approval | — | 5 | Sources |
| 10 | Check the Ko et al. adaptation against the PDF (§5.1–5.7) | needs-catalogue.md §1 | 20 | Needs (3 h) |
| 11 | Edit the 25 needs: add NEW needs from the sources (NEW-1 to NEW-3) and the pass, merge or drop weak ones, keep 25 | needs-catalogue.md §3 | 40 | Needs |
| 12 | Accept or change every T / R / U × D / P / N mark using §6's pass evidence; pick the three rejected-artefact cases | needs-catalogue.md §3, §6 | 40 | Needs |
| 13 | UXF check: one week of issues and commits, six needs | needs-catalogue.md §4 | 30 | Needs |
| 14 | Fill evidence counts (pass points are in §6), rank, choose the ten, hand them to D3 | needs-catalogue.md §5 | 25 | Needs |
| 15 | Write the design spec from the outline | design-spec-outline.md | 25 | Needs (remaining) |
| | **Total** | | **372** | |

Minutes check: 10 + 45 + 10 + 2 + 60 + 30 + 15 + 15 + 5 + 20 + 40 + 40 + 30 + 25 + 25 = 372. Against the plan: the heuristic block falls from 240 to 67 of Raphael's minutes, and the interview block from 120 to 65; the scan and needs blocks are unchanged (60 and 180). Log both changes and the time saved as a variance in the reflection report, with the reason (time pressure) and the cost (an AI single evaluator, no interviews).

Also for A3: add one line to the GenAI statement saying Claude ran and coded the heuristic pass on 14 October 2026, and that Raphael hand-checked the severity 3–4 findings (once he has).

## Done vs to do

| Done by Claude Code | Raphael's to do |
|---|---|
| 12 Oct 2026: read A2 and the prototype walkthrough; picked four tools; built the coding sheet, task script and seed; found 10 ads and 5 reviews with provisional coding; extracted Ko et al.'s 21 types and drafted 25 needs; collected UXF facts; outlined the spec | Confirm free tiers on official pages |
| 14 Oct 2026: ran the heuristic pass in Chrome on Raphael's accounts (all four tools seeded, T1 to T7 run, notes written) | Hand-check the severity 3–4 findings; confirm the trials lapse (test accounts already deleted; Jira T3 text written 15 Oct) |
| 14 Oct 2026: coded 61 problems, rated severity in one pass, filled task outcomes, strengths and the summary matrix | Verify every quoted phrase in ads, reviews and published sources on the live page |
| 14 Oct 2026: coded six published producer sources in place of interviews; filled the pass column of the disagreements table; drafted the three-point reconciliation | Accept or rewrite the reconciliation; confirm the ethics position with the convenor |
| 14 Oct 2026: added the pass evidence and pass points per need to the needs catalogue (no marks changed) | Accept or change every need and mark; UXF week check; evidence counts and final ranks; the spec text; the GenAI disclosure |

## Network limits in this session (why some things are unverified)

On 12 October 2026 this session could not open trello.com, hacknplan.com, atlassian.com, codecks.io, notion.com, linear.app, gamejobs.co, workwithindies.com, hitmarker.net, LinkedIn, Teamtailor, G2 or Capterra directly. Facts from those sites came through web-search results and are marked as such. github.com and microsoft.com (the Ko et al. PDF) were readable.
