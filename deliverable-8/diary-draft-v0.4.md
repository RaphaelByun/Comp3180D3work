# Development diary: draft v0.4 (break to Week 11 closed, Week 12 facts to 28 Oct, Week 13 slot)

> **Drafted with Claude (Claude Code, Opus 5.5) on Mon 26 Oct 2026, from the commit history and the fact logs.** Only facts are filled in, each with its commit or file. Everything in [brackets] is for Raphael alone: what he thought, decided, felt, did and said, and how long it took. Lines marked *(Raphael, 17 Oct draft)* are his own answers, carried over word for word from `diary-draft-weeks-9-10.md`. Rewrite anything that is not true, delete brackets you cannot answer, and change each "completed by me on [date]" line when you finish that entry. The A3 GenAI statement must say that the diary was drafted from the commit record with Claude and completed by you.
>
> Completed by me on [date]: [Raphael]

| Version | Date | Change |
|---|---|---|
| v0.1 | 17 Oct 2026 | `diary-draft-weeks-9-10.md`: break, Week 9 and Week 10 drafts |
| v0.2 | 21 Oct 2026 | `diary-draft-v0.2.md`: commit counts re-checked; Week 11 facts to 21 Oct; empty Week 12 and 13 slots |
| v0.3 | 26 Oct 2026 | This file. Counts re-checked (191); Week 11 closed with facts to 25 Oct; Week 12 plan; sharper prompts per week; a neutral conversations line replaces the prac line; v0.1 and v0.2 kept unchanged |
| v0.3, revised | 26 Oct 2026 | Claude Code (Opus 5.5), Raphael away. Counts re-checked after the 26 Oct commits (203); Week 12 facts line added; 13 Oct date for the two date fixes; one clause of your 17 Oct answer restored from v0.1 in brackets; superseded notes added to v0.1 and v0.2 |
| v0.4 | 28 Oct 2026 | This file (`diary-draft-v0.4.md`). Claude Code (Opus 5.5). Counts re-checked on 28 Oct (207); Week 12 facts to Wed 28 Oct: the four 23:08 commits, no commits 27–28 Oct, the held-out-week read not run on 27 Oct, the extension trigger, the 28 Oct preparation outside the repo; Week 12 plan replaced by the extension-based dates. Facts only; every thought is still a bracket. v0.3 kept unchanged |
| v0.4, revised | 28 Oct 2026 | Week 10 interview line made specific (interview-fix patch, confirmed by Raphael 28 Oct) |

**How the counts were made (re-checked Wed 28 Oct 2026):** `git fetch --all`, then `git rev-list --remotes`, unique commits, author date in Sydney time. Up to and including `1d8e545` (26 Oct 23:08) there are **207 unique commits** (204 authored by RaphaelByun, 3 by Claude), all made with Claude Code. By day: 11 Oct 1, 12 Oct 3, 13 Oct 15 (3 of them merges), 14 Oct 9, 17 Oct 155, 21 Oct 8, 26 Oct 16. No commits on 15, 16, 18–20 or 22–25 Oct, and none on 27 or 28 Oct (checked 28 Oct). First-to-last commit times per day are in `commit-windows-v0.1.md`; they are not hours worked.

---

## Mid-session break (21 Sep to 4 Oct 2026)   |   completed by me on [date]

**What happened (facts):** No commits; the repository was created on 11 Oct. The 17 Oct fact log found no file in the COMP3180 folder modified in this window (`fact-log-weeks-9-10.md` section 5, gap 1).

I did not do any project work over the break. *(Raphael, 17 Oct draft)*

[Optional, one line: why, and whether it mattered for the plan. A2 had D1 starting in this window, so this is a variance.]
[Roadblock: what, if anything, stopped you starting D1 in the break? One line is enough.]
[What you learnt: did starting late change how you planned Weeks 9 to 13? This feeds the self-directed-learning part of the Learning Reflection.]

## Week 9 (5 to 11 Oct 2026)   |   completed by me on [date]

**Roadblock or breakthrough:** [name it; the v0.1 draft suggests "turning the A2 plan into a working repo"]

**What happened (facts):**
- 10 Oct: A2 feedback released: 100 overall (`Assignemnts/Assignment 2 Proposal/Feedback.txt`, modified 10 Oct 23:00). Two notes: raw counts rather than small-sample percentages, and restating the Understand and Evaluate goals as transferable skills.
- 10 Oct: the first A3 build attempt sits outside the repo in `a3-build-10-oct-2026/`.
- 11 Oct: private repo `Comp3180D3work` created; `main` is one commit (`dbb6af4`) holding the A2 materials and the prototype. One branch per A2 deliverable, each with a `-testing` twin.

**What I made of it** *(Raphael, 17 Oct draft)*: One branch per deliverable lets me look at each one separately and focus on one at a time. I am using the A2 feedback as a baseline to build from.

[Directed vs checked: did you choose the one-branch-per-deliverable layout, or accept it from Claude? Did you look over what went into `dbb6af4` before it became `main`?]
[What you learnt: which A2 feedback note (raw counts, transferable goals) will change what you write in the A3 report, and how?]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

**Tools:** Claude Code set up the repo and branches. [what you directed and checked]

## Week 10 (12 to 18 Oct 2026)   |   completed by me on [date]

**Roadblock or breakthrough:** [name it; the v0.1 draft suggests "the fidelity check caught ChangeLens contradicting the commit history, and it was repaired"]

**What happened (facts):**
- 13 Oct: two date bugs fixed (`e73f544`, `323eac1`). On a Sydney PC the February week showed 3 commits instead of 8.
- 13 Oct: Producer Page window added (`323eac1`). The February fidelity check (AI scorers) found contradicted Version B rows 19, 21 and 33. Parser repaired (`bf09b4e`); B re-scored 39 of 39 (`b1a2df6`). Tests 42 → 46. D3–D9 scaffolds committed the same evening.
- 14 Oct: D1 heuristic pass run by Claude in your browser at your request (61 problems, 16 at severity 3–4; `e078ebd`). The two D1 interviews planned in A2 dropped for six coded published sources (not the two scoping conversations before A1). D1 finished by AI (`92ff8b4`).
- 17 Oct: no ethics application (your decision; `f569f96` and five sibling commits). Reserve weeks re-frozen at `d9fa4bf`. 155 commits that day from multi-agent Claude Code runs; .NET tests 46 → 85.

**What I made of it** *(Raphael, 17 Oct draft)*: I passed the heuristic pass to Claude because it is a testing task. I know it is meant to be a human test: which tool is easy or hard to use, and whether it is harder for programmers or producers. [Those are the questions to ask, and] I found I got a better list of questions from Claude and could answer them.

[The bracketed clause is restored from your 17 Oct answer in v0.1 (`adbbf58`); v0.2 and v0.3 had left it out. Keep it and remove the brackets if it is yours; delete it if not.]

[Pick the week's roadblock or breakthrough: the February week showing 3 commits instead of 8 on your PC (`323eac1`), or the fidelity check finding rows that contradicted the git log (`b1a2df6`). Say what it taught you about trusting the tool's output.]
[Directed vs checked: on 14 Oct you asked Claude to run the heuristic pass (`e078ebd`) and finish D1 (`92ff8b4`). Which of the 61 findings or the final ten needs have you checked yourself, and when?]
[155 commits on 17 Oct reads as a binge. Say honestly what you set the runs to do, what you looked at afterwards, and how the week's work was really spread.]
[What you learnt that reading alone would not have given you: for example, how git reads dates and time zones, or how a Unity scene or prefab diff hides what changed.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

**Plan changes (facts):** D1 interviews dropped (14 Oct); D1 pass by AI (14 Oct); D7 two-viewer test dropped (17 Oct). [Any other change, in your words.] [Why, in your words.]

## Week 11 (19 to 25 Oct 2026)   |   completed by me on [date]

**Roadblock or breakthrough:** [name it]

**What happened (facts):**
- 19 Oct: report scaffold, video script, submission checklist and rubric check prepared by Claude outside the repo (`_prep-19oct/`). No commits.
- 20 Oct: SE2 was planned for today and did not run. No commits.
- 21 Oct 15:19: reserve-week items written by an AI agent and checked by a second agent; question sheets committed, keys sealed outside the repo with SHA-256 hashes in plan section 5 (`0d3f811`). You confirmed that you had not seen the agents' reports about the reserve week.
- 21 Oct 16:40: plan section 5 filled at your request: the ten-need key accepted as drafted, Rule 2 chosen (Claude's call, reversible), and `key_ru_class` filled (`8fb989c`).
- 21 Oct 17:14: SE2 moved to Sun 25 Oct, with both weeks in one day (`3d0f66d`). Blank logs and four answer sheets set up in `deliverable-6/data/` (`e9ec1de`).
- 21 Oct 17:20–17:38: diary draft v0.2 committed (`bc5cde2`, `45a9005`, `d906704`). 19:41: SE1–SE4 run-sheet dates moved to the revised schedule (`f598b99`).
- 22–25 Oct: no commits. SE2, planned for Sun 25 Oct, did not run (no answer sheets committed).
- COMP3850 D4 was due Sat 24 Oct. [Whether it took priority, and how, in your words.]

[Roadblock: another unit's deadline took the week. What did that cost ChangeLens, and would you plan it differently?]
[Directed vs checked: on 21 Oct you said go ahead for the reserve-week items (`0d3f811`) and asked for plan section 5 to be filled (`8fb989c`). Do you accept Rule 2 as yours? Say so, or change it, with a date.]
[What you learnt about planning your own project around fixed deadlines in other units.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

## Week 12 (26 Oct to 1 Nov 2026)   |   completed by me on [date]

**What happened (facts, to Wed 28 Oct):**
- 26 Oct 18:49–19:29: 12 commits drafted by Claude while you were away, to documents, the hours prefill and the D9 variance-table script (no ChangeLens package code), on D5 (`d882927`, `9a12294`), D6 (`c355b43`, `1403820`, `403576c`), D7 (`1855d39`, `db1d401`, `7213a22`), D8 (`c1df9d2`, `cc37123`) and D9 (`8dabc2e`, `0bcdcfc`).
- 26 Oct 19:12: your pre-read answers recorded in the plan: no thresholds set in advance, no AI second scorer (`9a12294`). Rule 2 confirmed by you the same evening ("keep Rule 2"); not yet in a commit message.
- 26 Oct, evening: you asked Claude to make fewer commits. The remaining work was done locally and committed once per branch at 23:08: D5 run kit to the 26 Oct schedule (`fe6fb5c`), D6 analysis copes with no second scorer, 230 checks pass (`45d901c`), D2 `count-a3.js` parses Markdown drafts (`861d895`), D8 diary, ledger and hours tidy (`1d8e545`).
- 27 Oct: no commits. The held-out-week read, planned for Tue 27 Oct, did not run (the answer sheets on `deliverable-6-evaluation-report` are still blank).
- 28 Oct: no commits by 28 Oct evening. The plan's trigger for the short extension (held-out-week read not scored by Wed 28) fired. Prepared by Claude outside the repo: a one-page run sheet for the read, a draft short-extension request for you to send, and report draft v0.5. Your checkout was brought up to date and a second folder holding only `deliverable-6/data/` was set up for the read.
- Same week, other units: COMP3151 itch.io page went public Tue 27 Oct; COMP3151 A3 due Tue 3 Nov.

[Planned from 28 Oct (assumes the extension): held-out-week read Wed 28 night or Thu 29; scoring Thu 29/Fri 30; fidelity hand check and walkthrough Sat 31; heuristic pass and one fix Sun 1 Nov. Write what actually happened, with dates from your commits.]
[Whether you applied for the extension, when, and the new due date.]
[The **Create-goal entry** `[goal evidence]`: straight after your first read of an unseen week.]
[Roadblock: the read slipped twice (25 and 27 Oct). Why, in your words, and what you changed.]
[Roadblock or breakthrough from the evaluation: one thing ChangeLens got wrong or made hard, and one thing it got right.]
[The evaluation-driven fix: what you found, what you asked Claude to change, how you checked it, and its commit.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

## Week 13 (2 to 8 Nov 2026)   |   completed by me on [date]

**Fri 6 Nov, SE2 (Create goal).** Facts: two reads of the reserve week 14 Dec 2020, Version A then Version B (D6 `d01e3b0`, `a03a261`); the second reserve week was not run. In my words: running the Se2 taught me that me testing over and over again might affect the score/ testing for this, I need to make sure that next time i do get people to test.

[Video, report, merge to `main`, opening the repo, submission.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

---

**GenAI disclosure reminder:** this file, v0.2 and v0.1 were drafted by Claude from commits. In the A3 GenAI statement, say which parts you wrote, and that the facts were drafted with Claude and checked by you.
