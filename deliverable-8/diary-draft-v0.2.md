# Development diary: draft v0.2 (break to Week 11 so far, slots for Weeks 12 and 13)

> **Superseded by `diary-draft-v0.3.md` (26 Oct 2026).** Kept unchanged below as the 21 Oct record; write in v0.3.

> **Drafted with Claude (Claude Code, Opus 5.5) on Wed 21 Oct 2026, from the commit history and the fact logs, while Raphael was away.** Only facts are filled in, each with its commit or file. Everything in [brackets] is for Raphael alone: what he thought, decided, felt, attended and said. Lines marked *(Raphael, 17 Oct draft)* are his own answers, carried over word for word from `diary-draft-weeks-9-10.md`. Rewrite anything that is not true, delete brackets you cannot answer, and change each "completed by me on [date]" line when you finish that entry. The A3 GenAI statement must say that the diary was drafted from the commit record with Claude and completed by you.
>
> Completed by me on [date]: [Raphael]

| Version | Date | Change |
|---|---|---|
| v0.1 | 17 Oct 2026 | `diary-draft-weeks-9-10.md`: break, Week 9 and Week 10 drafts |
| v0.2 | 21 Oct 2026 | This file. Commit counts re-checked on 21 Oct; Week 11 facts to 21 Oct added; empty Week 12 and 13 slots added; v0.1 kept unchanged |

**How the counts were made (21 Oct 2026):** `git log --remotes` after `git fetch --all`, unique commits, author date in Sydney time. Before this file was committed there were 187 unique commits (184 authored by RaphaelByun, 3 by Claude), and all 187 carry a `Co-Authored-By: Claude` trailer. By day: 11 Oct 1, 12 Oct 3, 13 Oct 15 (3 of them merges), 14 Oct 9, 17 Oct 155, 21 Oct 4. There are no commits on 15, 16, 18, 19 or 20 Oct.

---

## Mid-session break (21 Sep to 4 Oct 2026)   |   completed by me on [date]

**What happened (facts):** No commits; the repository was created on 11 Oct. The 17 Oct fact log found no file in the COMP3180 folder modified in this window (`fact-log-weeks-9-10.md` section 5, gap 1).

I did not do any project work over the break. *(Raphael, 17 Oct draft)*

[Optional, one line: why, and whether it mattered for the plan. A2 had D1 starting in this window, so this is a variance.]

## Week 9 (5 to 11 Oct 2026)   |   completed by me on [date]

**Roadblock or breakthrough:** [name it; the v0.1 draft suggests "turning the A2 plan into a working repo"]

**What happened (facts):**
- 10 Oct: A2 feedback released: 100 overall (`Assignemnts/Assignment 2 Proposal/Feedback.txt`, modified 10 Oct 23:00). Two notes: raw counts rather than small-sample percentages, and restating the Understand and Evaluate goals as transferable skills.
- 10 Oct: the first A3 build attempt sits outside the repo in `a3-build-10-oct-2026/`.
- 11 Oct: private repo `Comp3180D3work` created; `main` is one commit (`dbb6af4`) holding the A2 materials and the prototype. One branch per A2 deliverable, each with a `-testing` twin.

**What I made of it** *(Raphael, 17 Oct draft)*: One branch per deliverable lets me look at each one separately and focus on one at a time. I am using the A2 feedback as a baseline to build from.

**Prac:** [attended Y/N; who you spoke to]

**Tools:** Claude Code set up the repo and branches. [what you directed and checked]

## Week 10 (12 to 18 Oct 2026)   |   completed by me on [date]

**Roadblock or breakthrough:** [name it; the v0.1 draft suggests "the fidelity check caught ChangeLens contradicting the commit history, and it was repaired"]

**What happened (facts):**
- 12–13 Oct: two date bugs fixed (`e73f544`, `323eac1`). On a Sydney PC the February week showed 3 commits instead of 8.
- 13 Oct: Producer Page window added (`323eac1`). The February fidelity check (AI scorers) found contradicted Version B rows 19, 21 and 33. Parser repaired (`bf09b4e`); B re-scored 39 of 39 (`b1a2df6`). Tests 42 → 46. D3–D9 scaffolds committed the same evening.
- 14 Oct: D1 heuristic pass run by Claude in your browser at your request (61 problems, 16 at severity 3–4; `e078ebd`). The two interviews dropped for six coded published sources. D1 finished by AI (`92ff8b4`).
- 17 Oct: no ethics application (your decision; `f569f96` and five sibling commits). Reserve weeks re-frozen at `d9fa4bf`. 155 commits that day from multi-agent Claude Code runs; .NET tests 46 → 85.

**What I made of it** *(Raphael, 17 Oct draft)*: I passed the heuristic pass to Claude because it is a testing task. I know it is meant to be a human test: which tool is easy or hard to use, and whether it is harder for programmers or producers. I found I got a better list of questions from Claude and could answer them.

[What the fidelity failure taught you about trusting the tool's output.]
[155 commits in one day reads as a binge. Say honestly how the work was spread and who did it.]

**Prac:** [attended Y/N; who you spoke to]

**Plan changes (facts):** D1 interviews dropped (14 Oct); D1 pass by AI (14 Oct); D7 two-viewer test dropped (17 Oct). [Any other change, in your words.] [Why, in your words.]

## Week 11 (19 to 25 Oct 2026), so far to Wed 21 Oct   |   completed by me on [date]

**Roadblock or breakthrough:** [name it]

**What happened (facts):**
- 19 Oct: report scaffold, video script, submission checklist and rubric check prepared by Claude outside the repo (`_prep-19oct/`). No commits.
- 20 Oct: SE2 was planned for today and did not run. No commits.
- 21 Oct 15:19: reserve-week items written by an AI agent and checked by a second agent; question sheets committed, keys sealed outside the repo with SHA-256 hashes in plan section 5 (`0d3f811`). You confirmed that you had not seen the agents' reports about the reserve week.
- 21 Oct 16:40: plan section 5 filled at your request: the ten-need key accepted as drafted, Rule 2 chosen (Claude's call, reversible), and `key_ru_class` filled (`8fb989c`).
- 21 Oct 17:14: SE2 moved to Sun 25 Oct, with both weeks in one day (`3d0f66d`). Blank logs and four answer sheets set up in `deliverable-6/data/` (`e9ec1de`).
- COMP3850 D4 (due Sat 24 Oct) took priority this week (`Unit 3 Sem 2/CLAUDE.md`, calendar).

[SE2 on Sun 25 Oct: how it went. The **Create-goal entry** `[goal evidence]` goes in on the same day, straight after a first read.]
[Do you accept Rule 2 as yours? Say so, or change it, with a date.]

**Prac:** [attended Y/N; who you spoke to]

## Week 12 (26 Oct to 1 Nov 2026)   |   completed by me on [date]

[Planned (run kit, revised 21 Oct): SE2 scoring and SE1 on Mon 26, SE1 and SE3 on Tue 27, SE4 on Wed 28, needs-log pass 2 on Thu 29, analysis on Fri 30. Write what actually happened, and any fix you made after SE3 or SE4, with its commit.]
[The **Understand-goal entry** `[goal evidence]`: the three mechanisms stated unaided, before Fri 30 Oct.]

## Week 13 (2 to 8 Nov 2026)   |   completed by me on [date]

[Video, report, merge to `main`, opening the repo, submission.]

---

**GenAI disclosure reminder:** this file and v0.1 were drafted by Claude from commits. In the A3 GenAI statement, say which parts you wrote, and that the facts were drafted with Claude and checked by you.
