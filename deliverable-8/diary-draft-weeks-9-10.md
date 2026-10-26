# Diary drafts: Week 9 and Week 10

> **Superseded by `diary-draft-v0.3.md` (26 Oct 2026).** This is draft v0.1, kept unchanged below as the 17 Oct record and the source of your 17 Oct answers; write in v0.3.

> **Drafted by Claude Code on 17 Oct 2026 from `fact-log-weeks-9-10.md` and the commit history, at Raphael's request.** The facts are filled in. Everything in [brackets] is something only Raphael knows: what he thought, decided, felt and did away from the computer. Fill or rewrite those parts in your own words, delete anything that is not true, then change the "Entry written" line to the date you finish it. Say in the GenAI statement that the diary was drafted from the commit record with Claude and completed by you.

## Week 9 (5 to 11 Oct 2026)   |   Entry written: 17 Oct 2026 (late; drafted with Claude, completed by me on [date])

**Roadblock or breakthrough:** Turning the A2 plan into a working repo: one branch per deliverable.

**What happened:**
- 10 Oct: read the A2 feedback. 100 overall. Two notes: report raw counts rather than percentages for small samples, and restate the Understand and Evaluate goals as transferable skills.
- 10 Oct: worked on the report generator (`ProducerReport.cs`, last modified 23:18).
- 11 Oct: created the private A3 repo `Comp3180D3work` with one clean commit (`dbb6af4`), then set up one branch per A2 deliverable, each with a `-testing` twin.

**What I made of it / what I decided:**
- One branch per deliverable lets me look at each one separately and focus on one at a time.
- I am using the A2 feedback as a baseline to build from. If I build off a proposal that is already good, I can learn from it and develop the skills to make it better.

**Prac:** [attended Y/N; who you spoke to and what they said]

**Plan changes:** None to the deliverables yet. [Add anything you changed.]

**Tools used:** Claude Code helped set up the repo and branches. [Say what you directed and what you checked.]

**Evidence links:** `dbb6af4`; `Assignemnts/Assignment 2 Proposal/Feedback.txt`.

**Next week:** [What did you plan to do first?]

## Week 10 (12 to 18 Oct 2026)   |   Entry written: 17 Oct 2026 (drafted with Claude, completed by me on [date])

**Roadblock or breakthrough:** The fidelity check caught ChangeLens contradicting the commit history, and I repaired it.

**What happened:**
- 12–13 Oct: froze the two study weeks and fixed two date bugs. Bare dates took the current time of day (`e73f544`), and they were read in the machine's time zone, so the February week showed 3 commits instead of 8 on a Sydney PC (`323eac1`).
- 13 Oct: added the Producer Page window. The February fidelity check found Version B contradicting the diffs in rows 19, 21 and 33. I repaired the asset-diff parsing (`bf09b4e`), and Version B then scored 39 of 39. Tests went from 42 to 46. All scoring so far was done by AI scorers; my hand-check is still to do.
- 13 Oct: drafted the instruments, session kit, analysis tool, video plan, diary and reflection scaffolds with Claude.
- 14 Oct: set the participant floor at five readers. Asked Claude to run the D1 heuristic pass (61 problems), and dropped the two interviews for six coded published sources.
- 17 Oct: decided on no ethics application, because the unit guide sets no ethics requirement. I'll cover ethics in the report instead.

**What I made of it / what I decided:**
- [What did the fidelity failure teach you about trusting the tool's output?]
- I passed the heuristic pass to Claude because it is a testing task. I know it is meant to be a human test: which tool is easy or hard to use, and whether it is harder for programmers or producers. Those are the questions to ask, and I found I got a better list of questions from Claude and could answer them. [Optional: what did it cost? For example, one AI evaluator instead of me, and the 16 severity 3–4 findings still need my hand-check.]
- [14 Oct: why five readers? (The floor was dropped on 17 Oct, see the next line.) Why the ethics decision?]
- [Not for the diary: the evaluation design goes once in the report's Evaluation Method.]

**Prac:** [attended Y/N; who you spoke to]

**Plan changes:** Interviews dropped for published sources (time). Heuristic pass done by AI rather than by me. [Anything else.]

**Tools used:** Claude Code ran the heuristic pass, drafted D1's analysis and the D3–D9 scaffolds, and did the fidelity scoring. I decided the floor, the dropped interviews and the ethics position. [Correct this to what you actually did and checked.]

**Evidence links:** `bf09b4e`, `b1a2df6` (`FIDELITY-RESULT.md`), `e078ebd`, `92ff8b4`, `ff65ae7`.

**Next week:** [Evaluation runs SE1 to SE4; the D1/D3/D4 hand-checks. Write your own plan.]

## Mid-session break (21 Sep to 4 Oct 2026)

I did not do any project work over the break.
