# Development diary

**COMP3180 A3, ChangeLens. Raphael Byun (46987282).** Final form, compiled Wed 11 Nov 2026.

**How to read this.** The repository began on 11 Oct 2026 (Week 9), so this diary was not kept week by week from Week 1. Claude Code compiled the facts in each entry from the commit history and dated files, and each fact carries its commit or file. Lines headed **In my words** are Raphael's own and are unchanged: his answers of 17 Oct 2026, as recorded in the first draft (`adbbf58`), and his entry of 6 Nov 2026 (`71f2b70`). A week without such a line has no own-words entry.

The dated drafts this file was compiled from are kept beside it, unchanged: `diary-draft-weeks-9-10.md` (17 Oct), `diary-draft-v0.2.md` (21 Oct), `diary-draft-v0.3.md` (26 Oct) and `diary-draft-v0.4.md` (28 Oct). Their bracketed prompts were questions for Raphael that he did not answer, so they are left out here.

## Commit record

Commits on `main`, not counting merges, by Sydney date. These are commit counts, not hours worked.

| Day | Commits | What |
| --- | ---: | --- |
| Sun 11 Oct | 1 | Repository created |
| Mon 12 Oct | 3 | Study weeks frozen, first reports, D1 preparation |
| Tue 13 Oct | 12 | Date fixes, Producer Page window, parser repair, D3 to D9 scaffolds |
| Wed 14 Oct | 9 | D1 heuristic pass and analysis |
| Sat 17 Oct | 155 | Multi-agent Claude Code runs: parser repairs, tests 46 to 85, evaluation plan |
| Wed 21 Oct | 8 | Held-out-week question sheets, answer key accepted, run kit |
| Mon 26 Oct | 16 | Documents and scripts (no package code) |
| Wed 28 Oct | 5 | Licence, interview correction, diary draft |
| Fri 6 Nov | 4 | The two evaluation reads, diary entry, hours row |
| Sat 7 Nov | 4 | Fidelity check, scoring, walkthrough, heuristic pass |
| Sun 8 Nov | 2 | Evaluation fix, analysis |
| Tue 10 Nov | 2 | E-mail scrub, README and ledger (plus nine merges into `main`) |
| Wed 11 Nov | 1 | Unity test run, this diary, final tidy |

No commits on any other day. **Hours:** 4 of the 65 planned hours were logged (6 Nov, the two reads; `hours-entries.csv`). No log was kept for the rest.

---

## Up to Week 8 (27 Jul to 20 Sep 2026)

Written after the fact from dated files; the detail is in `fact-log-weeks-1-8.md`.

- 28 Jul (Week 1): the topic began as production tooling for game teams, from the Week 1 workshop.
- 3 Aug (Week 2): Malcolm and Mitchell redirected it toward friction between producers and developers and the user experience of existing production tools. 5 Aug: the VR candidate was cut.
- 23 Aug (Week 4): A1 presentation submitted.
- 20 Sep (Week 8): A2 proposal submitted, with a working ChangeLens prototype and 27 passing tests.

## Mid-session break (21 Sep to 4 Oct 2026)

**Roadblock:** no project work was done.

**What happened:** no commits (the repository did not exist yet), and no file in the project folder was modified in this window (`fact-log-weeks-9-10.md`, section 5). The proposal had Deliverable 1 starting in the break; it started on 12 Oct.

**In my words (17 Oct):** I did not do any project work over the break.

## Week 9 (5 to 11 Oct 2026)

**Breakthrough:** the proposal plan became a working repository.

**What happened:**
- 10 Oct: A2 feedback released. Two notes to carry into A3: report raw counts rather than percentages from small samples, and restate the Understand and Evaluate goals as transferable skills.
- 11 Oct: repository `Comp3180D3work` created with one commit holding the A2 materials and the prototype (`dbb6af4`). One branch per deliverable, each with a `-testing` twin.

**In my words (17 Oct):** One branch per deliverable lets me look at each one separately and focus on one at a time. I am using the A2 feedback as a baseline to build from. If I build off a proposal that is already good, I can learn from it and develop the skills to make it better.

## Week 10 (12 to 18 Oct 2026)

**Breakthrough and roadblock:** the fidelity check caught ChangeLens contradicting the commit history, and the parser was repaired.

**What happened:**
- 12 Oct: two study weeks frozen, Version A and Version B reports generated, and a .NET harness added so the tests run without Unity (`b96c1fa`). The July week was scored by two AI scorers (`5fd3044`). D1 desk research prepared (`4c4c87f`).
- 13 Oct: two date bugs fixed (`e73f544`, `323eac1`). On a Sydney PC the February week had shown 3 commits instead of 8.
- 13 Oct: Producer Page window added (`323eac1`). The February fidelity check found Version B rows 19, 21 and 33 contradicted by their commits. The asset-diff parser was repaired (`bf09b4e`) and Version B re-scored at 39 of 39 (`b1a2df6`). Tests went from 42 to 46. Scaffolds for D3 to D9 were committed the same evening.
- 14 Oct: the D1 heuristic pass was run by Claude in Raphael's browser at his request: 61 problems, 16 at severity 3 or 4 (`e078ebd`). The two D1 interviews planned in the proposal were dropped, and six published producer accounts were coded instead. Claude finished the rest of D1 (`92ff8b4`).
- 17 Oct: two decisions by Raphael. No ethics application (`f569f96`). No recruited readers: he evaluates ChangeLens himself (`deliverable-5/self-evaluation-plan.md`, section 1, `125a9bb`).
- 17 Oct: 155 commits from multi-agent Claude Code runs. Tests went from 46 to 85.

**In my words (17 Oct):** I passed the heuristic pass to Claude because it is a testing task. I know it is meant to be a human test: which tool is easy or hard to use, and whether it is harder for programmers or producers. Those are the questions to ask, and I found I got a better list of questions from Claude and could answer them.

**Plan changes:** D1 interviews dropped (14 Oct). D1 inspection run by AI (14 Oct). Evaluation by Raphael alone, with no recruited readers (17 Oct). The video's two-viewer check dropped (17 Oct).

## Week 11 (19 to 25 Oct 2026)

**Roadblock:** the first read of an unseen week did not run. It was planned for 20 Oct, moved to 25 Oct, and missed both times.

**What happened:**
- 19 Oct: report scaffold and video script prepared by Claude outside the repository. No commits.
- 20 Oct: the read was planned for today and did not run. No commits.
- 21 Oct: question sheets for the two held-out weeks written by an AI agent and checked by a second agent. The answer keys were sealed outside the repository, with their SHA-256 hashes recorded in the plan (`0d3f811`). Raphael confirmed he had not seen them.
- 21 Oct: at Raphael's request Claude filled plan section 5: the ten-need answer key was accepted as drafted and a marking rule was chosen (`8fb989c`).
- 21 Oct: the read was moved to Sun 25 Oct (`3d0f66d`), and blank logs and answer sheets were set up (`e9ec1de`).
- 22 to 25 Oct: no commits. The read did not run on 25 Oct. An assignment in another unit was due on Sat 24 Oct.

## Week 12 (26 Oct to 1 Nov 2026)

**Roadblock:** the read slipped again, on 27 and 28 Oct.

**What happened:**
- 26 Oct: 16 commits by Claude to documents and scripts, none to the ChangeLens package. Raphael's answers before the read were recorded in the plan: no pass thresholds set in advance and no AI second scorer (`9a12294`). He kept the marking rule chosen on 21 Oct (noted in `d01e3b0`). He also asked Claude to make fewer commits, so the later work went in as one commit per branch.
- 27 Oct: no commits. The read did not run.
- 28 Oct: the read did not run. Five commits: the MIT licence for the code and the SS3D notices (`e391c9b`), a correction about the interviews (`5d61272`, `f9b4144`), the part of the fidelity check that covered the held-out weeks dropped (`7784f55`), and diary draft v0.4 (`9c572e0`).
- 29 Oct to 1 Nov: no commits.

## Week 13 (2 to 8 Nov 2026)

**Breakthrough:** the evaluation ran. **Roadblock:** only one of the two unseen weeks was read.

**What happened:**
- 3 Nov: Raphael applied for a short extension, which was approved the same day. The deadline moved from 8 Nov to 11 Nov.
- 6 Nov: Raphael read the unseen week of 14 Dec 2020 twice: Version A from 14:25 to 14:35 (`d01e3b0`), then Version B from 17:55 to 18:18 (`a03a261`; the start time was corrected in `4153123`). For each version he answered the ten needs and six question items and gave three ratings; after the first read he also drafted a stand-up update. He decided to stop there, so the second unseen week (27 Sep 2021) was not read. He logged 4 hours (`71f2b70`).
- 7 Nov: a 26-row sample was drawn for a hand check of the fidelity scores (`9bd23c0`). Raphael then asked Claude to run the checks instead. Claude checked all 96 claims on the four study-week pages against their commits (`070d8a4`), scored the two reads against the sealed key (`bbcb691`), and ran the cognitive walkthrough and the heuristic pass (`f9e8908`). None of this was checked by hand.
- 8 Nov: one fix made from the findings: a "Save page" button, and a warning before a saved week is replaced (`3cf2727`). The analysis was run (`ee20ce3`; tables in `deliverable-6/data/analysis-output.md`).
- 8 Nov: Raphael answered thirteen questions about the project in his own words. Those answers are quoted in the report's Method, Results and Learning Reflection.

**In my words (6 Nov):** running the Se2 taught me that me testing over and over again might affect the score/ testing for this, I need to make sure that next time i do get people to test.

## Extension days (9 to 11 Nov 2026)

- 10 Nov: the nine deliverable branches were merged into `main`. SS3D contributors' e-mail addresses in the committed exports were replaced with pseudonyms (`541437b`). README and contribution ledger updated (`addcbc3`). The repository was made public. Claude assembled the Final Project Report from repository facts and Raphael's answers of 8 Nov.
- 11 Nov: the tests were re-run in Unity 6000.4.10f1 on `main`: 88 of 88 pass (`prototype-logs/a3-tests-2026-11-11.xml`). This was the first Unity run since 17 Oct, and the first to compile the "Save page" fix. This diary, the ledger and the folder READMEs were brought to their final form. The report is submitted on iLearn (due 11 Nov, 23:55).
- No portfolio video was recorded.

## Entries the proposal asked for that were not written

The proposal's measures for two learning goals were diary entries: one explaining, unaided, why a team's official record misses what is happening (Understand), and one tying each layout decision to a reader need after reading an unfamiliar week (Create). Neither was written. The report's Learning Reflection says so.
