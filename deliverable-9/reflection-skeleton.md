# A3 Learning Reflection: skeleton (about 500 words in the report)

Status: skeleton and prompts only. Nothing here is a reflection; every answer is yours, written from your diary, hours and deliverables. Delete the prompts and this note before using any of it in the report.

Template instruction (Learning Reflection, ~500 words): start with the list of learning goals from the proposal; for each, reflect on the extent to which you built new skills, extended your capabilities or understanding, or struggled to make tangible progress (and why). Include explicit reflection on self-directed learning through research and experimentation, with goals for improving it.

A2 success measure for Deliverable 9 (2 h, 0 in prac): **"All four goals evidenced; hour variances explained."**

Marker's notes to act on (A2 feedback, 100/100):
1. The Understand and Evaluate goals use project-specific terms (the three mechanisms) instead of transferable skills. In the A3 Learning Reflection and Industry Relevance sections, restate them as transferable skills (section 3 below).
2. For the A3 Evaluation, report raw counts and limits (that is Deliverable 6, but carry the habit into any number you quote here).
3. Staff will mark down hour variances that have no explanation (Lecture 4). The table in section 2 is where you explain them.

**17 Oct 2026 decision.** There is no study with other people: no recruitment, no sessions, no online form. You evaluate ChangeLens yourself (SE1 to SE4 in `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions`). Every prompt below that once pointed at readers now points at that solo evidence. In the reflection, the study has one reader, the developer. Do not describe it as having any other readers or participants.

## 1. The four learning goals, quoted exactly from A2

A2 lead-in: "These capabilities span understand to create (Anderson & Krathwohl, 2001); after this unit I want to be able to:"

**Understand:** explain why a team's production record under-reports its work, distinguishing the structural, opacity and audience explanations. Measure: a diary entry stating each mechanism unaided, with its source and a breakdown it predicts.

**Apply and Analyse:** inspect a production tool against usability heuristics, then test those findings against what its users say, since one evaluator finds only a minority of a tool's problems (Nielsen & Molich, 1990). Measure: four tools coded; one reconciliation naming three places where inspection and interviews disagree.

**Evaluate:** judge whether a team's artefacts can serve a producer's information need, or whether a person must. Measure: every need classified against a named artefact, with three needs where I name the artefact I rejected and why.

**Create:** design a change report that a reader who never opens the codebase can act on, and build it as a Unity Editor tool over the serialised asset layer. Measure: a diary entry, written against an unfamiliar Unity week, tying each layout decision to a named reader need.

### Evidence checklist: each goal's measure must be met by something you can link

| Goal | A2 measure needs | Where the evidence comes from | Status (fill in) |
|---|---|---|---|
| Understand | A diary entry stating each of the three mechanisms unaided, with its source and a breakdown it predicts | **A diary entry you still have to write** (see the note below). Mechanisms: structural (Dourish & Bellotti, 1992), opacity (Whitson, 2018), audience (Stray et al., 2016) | Not started |
| Apply and Analyse | Four tools coded; one reconciliation naming three places inspection and interviews disagree. **Changed in D1 (14 Oct 2026):** the interviews were dropped for time and six published producer accounts were coded instead, so the measure now reads "three places where inspection and the published sources disagree". State this substitution wherever you report the measure | Deliverable 1: `heuristic-coding-sheet.md` (61 problems across the four tools), `published-sources.md` (six sources; reconciliation in §6.1), `design-spec.md`. Added by the solo plan: SE4, your own hand heuristic pass of ChangeLens on the D1 scale (`deliverable-6/data/se4-*.csv`, Table F) | Heuristic pass run by AI (Claude Code, 14 Oct 2026): one evaluator, and an AI one. Reconciliation AI-drafted. Yours: hand spot-check the 16 severity 3–4 findings and accept or rewrite the reconciliation (D1 README steps 2 and 8). SE4 is the first pass you run by hand; it adds to the measure but does not replace it (four tools coded, one reconciliation). SE4: not started |
| Evaluate | Every need classified against a named artefact; three needs where you name the rejected artefact and why | Deliverable 1 `needs-catalogue.md` (25 needs, 75 marks; rejected-artefact cases N07, N10, N27 in §3.1). Solo evidence: SE2 Table B (ten needs by read) and Table C (the ten-need key against what the page gave, checked against the git log), one reader, the developer | All 25 needs marked and the three cases picked by AI (15 Oct 2026). Yours: accept or change each mark and case (D1 README steps 10 to 14, needs-catalogue.md §8). Ten-need key accepted on: ___ (plan §5). SE2: not started |
| Create | A diary entry written against an unfamiliar Unity week, tying each layout decision to a named reader need | Deliverable 2 (the report layout) plus **a diary entry you still have to write** against a week you have not worked on. Use a reserve week (14 Dec 2020 or 27 Sep 2021) **only after SE2**: write the entry the same day, straight after your SE2 first read of that week. Opening a reserve week earlier spoils SE2 | Not started |

Note: two of the four measures are diary entries (Understand and Create). They must be written in the diary (Deliverable 8) in your own words, with the date you really wrote them. The skeleton cannot do this for you.

## 2. Hour variance (planned from A2, actual from the Deliverable 8 hours log)

How to fill: log hours in `deliverable-8/hours-entries.csv`, total them into `deliverable-8/hours-log.csv`, then run `node deliverable-9/variance-table.js deliverable-8/hours-log.csv` and paste the table here. The "Why" column is only yours. A difference of 2 hours or 25% is flagged to explain; explain smaller ones if there is a lesson. A short, specific cause beats a long one ("fidelity scoring needed two scorers, which I had not counted"). Say what you would estimate next time.

| # | Deliverable | Planned (A2) | In-prac planned | Actual | In-prac actual | Variance (actual minus planned) | Why (write this yourself) |
|---|---|---:|---:|---:|---:|---:|---|
| 1 | Production-tool UX study and design spec | 10 | 2 | | | | |
| 2 | ChangeLens Unity Editor package (both conditions) | 16 | 5 | | | | |
| 3 | Evaluation protocol and instruments † | 4 | 1 | | | | |
| 4 | Fidelity check | 3 | 1 | | | | |
| 5 | Sessions run and coded † | 18 | 4 | | | | |
| 6 | Evaluation report, instruments, data † | 6 | 1 | | | | |
| 7 | Portfolio video | 4 | 1 | | | | |
| 8 | Development diary | 2 | 0 | | | | |
| 9 | Reflection report (all four goals) | 2 | 0 | | | | |
| | **Total** | **65** | **15** | | | | |

Things the planned figures already include, which can help explain differences: the committed tier is 11 h, the stretch tier 3 h, the challenge tier 2 h (A2); an overrun drops the challenge tier first, then the stretch tier. Say which tiers were built, cut or changed. A2 named recruitment as the biggest risk; on 17 Oct 2026 you decided not to recruit at all, so say how that moved the hours.

† **A2-plan change: the evaluation (17 Oct 2026).** `variance-table.js` marks rows 3, 5 and 6 and prints these sources under the table. They are facts to draw on, not the "why"; write that yourself.

| # | A2 plan | What changed (`deliverable-5/self-evaluation-plan.md`) | Planned after the change | Actual | Why (write this yourself) |
|---|---|---|---|---|---|
| 3 | Protocol and instruments for eight readers, tested in a pilot | No pilot and no sessions. The ten-need sheet, the Endsley item slot plan, the codebook and the fidelity check are kept for one reader (§1, §11) | – | | |
| 5 | 18 h: 7 sessions, 4 recruiting, 7 coding | Solo evaluation SE1 to SE4: fidelity hand-check, timed self-read of two unseen weeks, cognitive walkthrough, heuristic pass (§3) | about 6.5 h (§4, §10) | | |
| 6 | Report and analysis from the readers' data | Tables A to H built from the solo CSVs (§6) | – | | |

Source for the "why" cells: your reasons on 17 Oct 2026, in your words (plan §1): you don't want live testing, you have no time to arrange people, and testing it yourself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well." You accepted that this likely caps Evaluation near a Pass (plan §9). Plan §10 asks for the D5 difference to be reported as a change of method, not as time saved.

Prompts for these three rows:
- Which of your 17 Oct reasons drove the change most? Say it in one sentence; do not paste the quote above as your answer.
- What did the change cost the study (one reader who built the tool, no reader-to-reader agreement, no claim about producers), and what did it give you (learning the tool well enough to explain it)?
- Did the solo plan's hours hold? Count the SE1 to SE4 minutes in `deliverable-8/hours-entries.csv` before you write the cause.

Prompts for the "Why" column:
- Was it scope (more or less built), skill (slower or faster than expected), waiting (people, tools, fixes), or rework (a bug, a marker's note, a redo)?
- Did a surprise from your fact log or diary cause it? Link the diary week.
- What would you change in the next estimate?
- Staff said "everything always takes longer than you expect, even if you take that into account." Does your data agree?

Deliverable 1 is a variance in method as well as hours. A2 planned 600 minutes of your own work; after the AI work on 14 and 15 October about 177 minutes were budgeted for your own work (about 208 on the check pack's estimate), almost all checking (D1 README, revised 17 Oct 2026). Prompts for its "Why" cell and one sentence in the report:
- What was dropped or handed over: the two interviews (replaced by six coded published sources), the heuristic pass (run by AI), and the needs analysis (AI-drafted, you accepted or changed it). Say which, in your words.
- Why: the reason D1 records is time. The ethics reason given on 14 Oct no longer applies after the 17 Oct decision to run no study with other people, so do not give it.
- Effect on the Apply and Analyse measure: the reconciliation is now inspection against published sources, not interviews, and the inspection had one AI evaluator. What does that cost the finding?
- Effect on the Evaluate measure: were the marks your judgement or your check of someone else's? How much did you change?
- Count your real D1 minutes, including the checking, before you write the cause.

## 3. Restating the goals as transferable skills (the marker's note)

Do this before writing the reflection. The aim is the skill that would still be true if the project topic changed.

| Goal | A2 wording keeps project terms such as | Prompt: the transferable skill is... (write it) | Options to start from (accept, change or throw away) |
|---|---|---|---|
| Understand | "structural, opacity and audience explanations" | What general skill is it to compare competing explanations of a problem against evidence and say which predictions tell them apart? | Weighing competing explanations of a problem against evidence |
| Apply and Analyse | usability heuristics, "four tools" | What general skill is it to combine expert inspection with user evidence and reconcile disagreements? | Combining expert review with user evidence (here, published user accounts) |
| Evaluate | "team's artefacts", "producer's information need" | What general skill is it to judge whether automated data can meet a stakeholder's need or a person must? | Judging when automation can meet a stakeholder's need and when it cannot |
| Create | "Unity Editor tool", "serialised asset layer" | What general skill is it to design an output for a non-expert reader and build it? | Designing for a non-technical reader and building the tool that serves them |

Use the restated skill as the heading in the report and the A2 goal name in brackets, so a marker can match them.

## 4. Per-goal reflection prompts (about 80 words each in the report)

For each goal, answer in your own words, in this order. Keep the evidence link next to each claim.

**Understand**
- Which of the three explanations did you believe at the start, and has that changed? What in the study (your SE2 needs log coded to Ko et al. types, Table G; your ten-need answers, Table B; the pages themselves) pushed it?
- Where did the sources help and where did they fail to transfer from the settings they studied (one company, ten interns, non-game teams)?
- Did you actually produce the diary entry that states each mechanism unaided? If you could not, say why.
- Skill gained (restated as transferable): ___. Extent: new / extended / little progress, and why.

**Apply and Analyse**
- State the substitution first: the A2 measure named interviews; D1 coded six published producer sources instead, for time. One plain sentence.
- What did inspection find that the published sources did not, and the reverse? Name the three disagreements (`published-sources.md` §6.1), and say whether you accepted the AI draft or rewrote it.
- The pass was run by AI, with one evaluator. What limit does that put on the findings? What did your hand spot-check of the severity 3–4 findings confirm, change or delete?
- What can published accounts not tell you that an interview could have (follow-up questions, your own tools, a game team you chose)?
- Did you apply and analyse here, or check an analysis? Be honest about the extent; this goal may be only partly met.
- SE4 was your own heuristic pass of ChangeLens on the D1 scale, after D1's pass was run by AI. What did doing it by hand teach you that checking the AI pass did not? SE4 adds to the A2 measure; it does not replace it (four tools coded, one reconciliation). Say so.
- How did the heuristic findings (D1, and your SE3 walkthrough and SE4 pass) change what you built in Deliverable 2, if at all? Name the CW or CL ids you fixed.
- Skill gained: ___. Extent and why.

**Evaluate**
- The 75 marks and the three rejected-artefact cases (N07, N10, N27) were AI-drafted. Which did you change when you checked them, and why? If you changed none, say so.
- Table C sets the ten-need key against what the page gave you on the unseen weeks, checked against the git log. Which needs surprised you? Name three where you rejected an artefact and why.
- Where did the key and `record_could_answer` differ, and where did the page lose what the records held? What did that tell you that an agreement count could not?
- Where did your marking key prove wrong or unclear? Which of your wrong answers were `misread`, `overclaim` or `page-wrong`?
- You knew the key before SE2 (anchoring) and you built the tool. How far can one reader, the developer, judge whether artefacts serve a producer? Be plain about the limit.
- Skill gained: ___. Extent and why.

**Create**
- Which layout decisions held up in your SE2 reads of the unseen weeks, and which did your needs log, your stand-up drafts or the SE3 walkthrough show to fail?
- You read the pages as their builder, not as a producer. Which layout decisions can you not judge that way?
- What did building over the asset layer teach you about what a file can and cannot tell you (names yes, reasons no)?
- What did the fidelity check and the date bugs teach you about trusting your own tool?
- Skill gained: ___. Extent and why.

## 5. Self-directed learning (about 100 words in the report)

- What worked in how you learned this unit (reading plan, one branch per deliverable, prac conversations, mock marking)? What did not (timing, break)?
- On 17 Oct 2026 you chose to evaluate ChangeLens yourself, partly to learn it well enough to explain it to others (your words, plan §1). Did it work as a way to learn? What did it not teach you that watching other people would have?
- Where did you stall and what got you moving? Link diary weeks.
- AI tools: what did they speed up, and what did you have to check yourself? What would you do differently so the learning is yours?
- Two or three concrete changes for next time (for example: log hours daily, decide the evaluation method earlier, write diary entries on the day).

## 6. Industry Relevance and Future Work (about 200 words, a separate A3 section)

The template asks how the skills and the portfolio piece support being hired into a specific games-industry role; Future Work is optional. Prompts only; write every sentence yourself.

- Name one role (for example producer, associate producer or tools programmer). Which Deliverable 1 job ad backs it? Cite the ad by its code in `deliverable-1/job-ads-and-reviews.md`.
- Which one or two of the transferable skills from section 3 does that ad ask for? Quote the ad's words, not yours.
- Which repo artefacts show those skills to a hiring panel (the Producer Page tool, the design spec, the evaluation report, the portfolio video)? Link each.
- Ethics sentence slot: point 3 of `deliverable-3/ethics/report-ethics-points.md` (the tool reports changes to the project, not people's output, so it cannot be used to blame developers). Why does that judgement matter in the role you named?
- Future Work (optional): which stretch or challenge tier items were built, cut or left (Deliverable 2 status)? Name one next step and the evidence from the study that points to it. Do not promise results.

## 7. Word budget

Goals list (names only, restated) 40; four goals at about 80 each 320; self-directed learning about 100; hour variance sentence about 40 (the table itself can sit in an appendix and be referred to). Total about 500. Count with Word before submitting. Industry Relevance and Future Work (section 6) is a separate budget of about 200 words.

## 8. Before submitting

- [ ] Every goal has a link to its evidence and a plain statement of how far you got.
- [ ] Every flagged variance has a cause in your own words.
- [ ] Transferable-skill wording used; A2 goal names in brackets.
- [ ] Numbers quoted as counts with limits.
- [ ] The evaluation is described as one reader, the developer, with the 17 Oct 2026 change stated as an A2 variance. No claim about producers or other readers.
- [ ] No sentence here was written by an AI. If you used AI to proofread, say so in the Statement on Generative AI use.
