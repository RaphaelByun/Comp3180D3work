# Development diary: draft v0.3 (break to Week 11 closed, Week 12 plan, Week 13 slot)

> **Drafted with Claude (Claude Code, Opus 5.5) on Mon 26 Oct 2026, from the commit history and the fact logs.** Only facts are filled in, each with its commit or file. Everything in [brackets] is for Raphael alone: what he thought, decided, felt, did and said, and how long it took. Lines marked *(Raphael, 17 Oct draft)* are his own answers, carried over word for word from `diary-draft-weeks-9-10.md`. Rewrite anything that is not true, delete brackets you cannot answer, and change each "completed by me on [date]" line when you finish that entry. The A3 GenAI statement must say that the diary was drafted from the commit record with Claude and completed by you.
>
> Completed by me on [date]: [Raphael]

| Version | Date | Change |
|---|---|---|
| v0.1 | 17 Oct 2026 | `diary-draft-weeks-9-10.md`: break, Week 9 and Week 10 drafts |
| v0.2 | 21 Oct 2026 | `diary-draft-v0.2.md`: commit counts re-checked; Week 11 facts to 21 Oct; empty Week 12 and 13 slots |
| v0.3 | 26 Oct 2026 | This file. Counts re-checked (191); Week 11 closed with facts to 25 Oct; Week 12 plan; sharper prompts per week; a neutral conversations line replaces the prac line; v0.1 and v0.2 kept unchanged |

**How the counts were made (26 Oct 2026):** `git rev-list --remotes`, unique commits, author date in Sydney time. Before this file was committed there were 191 unique commits (188 authored by RaphaelByun, 3 by Claude), and all 191 carry a `Co-Authored-By: Claude` trailer. By day: 11 Oct 1, 12 Oct 3, 13 Oct 15 (3 of them merges), 14 Oct 9, 17 Oct 155, 21 Oct 8. There are no commits on 15, 16, 18, 19 or 20 Oct, and none after 21 Oct 19:41 (`f598b99`).

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
- 12–13 Oct: two date bugs fixed (`e73f544`, `323eac1`). On a Sydney PC the February week showed 3 commits instead of 8.
- 13 Oct: Producer Page window added (`323eac1`). The February fidelity check (AI scorers) found contradicted Version B rows 19, 21 and 33. Parser repaired (`bf09b4e`); B re-scored 39 of 39 (`b1a2df6`). Tests 42 → 46. D3–D9 scaffolds committed the same evening.
- 14 Oct: D1 heuristic pass run by Claude in your browser at your request (61 problems, 16 at severity 3–4; `e078ebd`). The two interviews dropped for six coded published sources. D1 finished by AI (`92ff8b4`).
- 17 Oct: no ethics application (your decision; `f569f96` and five sibling commits). Reserve weeks re-frozen at `d9fa4bf`. 155 commits that day from multi-agent Claude Code runs; .NET tests 46 → 85.

**What I made of it** *(Raphael, 17 Oct draft)*: I passed the heuristic pass to Claude because it is a testing task. I know it is meant to be a human test: which tool is easy or hard to use, and whether it is harder for programmers or producers. I found I got a better list of questions from Claude and could answer them.

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

[Planned (revised 26 Oct): Tue 27 SE2; Wed 28 scoring; Thu 29 SE1 and SE3; Fri 30 SE4 and one evaluation-driven fix; Sat 31 analysis and the Understand-goal entry; video shots that do not need results on Fri 30, then S8/S11 and a rough cut on Sun 1 Nov. Write what actually happened.]
[The **Create-goal entry** `[goal evidence]` goes in on Tue 27, straight after your first SE2 read.]
[The **Understand-goal entry** `[goal evidence]` on Sat 31: the three mechanisms stated unaided.]
[Roadblock or breakthrough from SE2 to SE4: one thing ChangeLens got wrong or made hard, and one thing it got right.]
[The evaluation-driven fix on Fri 30: what you found, what you asked Claude to change, how you checked it, and its commit.]
[What you learnt from reading the producer page on weeks you had not seen.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

## Week 13 (2 to 8 Nov 2026)   |   completed by me on [date]

[Video, report, merge to `main`, opening the repo, submission.]

**Conversations:** [Conversations about the project this week (staff, peers), if any]

---

**GenAI disclosure reminder:** this file, v0.2 and v0.1 were drafted by Claude from commits. In the A3 GenAI statement, say which parts you wrote, and that the facts were drafted with Claude and checked by you.
