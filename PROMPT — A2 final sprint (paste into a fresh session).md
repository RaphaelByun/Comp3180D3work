# A2 final-sprint mission prompt

Written Thu 17 Sep 2026, ~74 h before the A2 deadline, by the Claude Code session that read the whole COMP3180 tree. Paste the block below into a fresh Claude Code session (Fable 5.1, max effort) if this session dies or when resuming. Fill the "My answers" line first.

---

ultracode. COMP3180 Assignment 2 — Research Proposal, 30%, due Sun 20 Sep 2026 11:55 pm Sydney time. Run the whole A2 mission below and act as the unit convenor described in COMP3180/CLAUDE.md. Root for every path: C:\Users\rapha\Documents\School\Unit 3 Sem 2\COMP3180\

## Objective
Turn `Working folder/a2-draft-2-sep-2026/A2 Draft v1 — 2 Sep 2026.md` (predicted 73/100 on 2 Sep) into a submission-ready .docx that a strict marker scores HD on all three rubric criteria, and hand me one report of everything only I can do, in order, with minutes.

## Context (carry forward)
- Verbatim rubric: `Assignemnts/Assignments.md`, A2 block. Literature Review 45% · Project Proposal 40% · Communication 15%. HD = six distinct high-quality sources including academic articles, expert synthesis, ambitious plan, insightful RQ, mixed methodology, advanced scoping with a technical prototype and images, measurable deliverables, zero errors.
- A1 came back 68/100 (Content 65 · Presentation 55 · Q&A 80 · Question 100). Marker: "So much information in each slide. Need to give a general overview first. You jumped straight into very technical details without providing context. It was hard to know what the presentation was about. Good learning goals." The 22 Aug mock-mark had predicted the D band, so earlier mock marks flattered. Consequences for A2: overview and context before detail, plain sentences in my voice, lower density, keep the learning-goal structure; every marker agent must calibrate against this actual mark.
- Template text: `Working folder/a2-draft-2-sep-2026/Template — extracted text (2 Sep 2026).md`. The real `Assignemnts/Assignment 2 Proposal/Research Proposal Template.docx` is IRM-locked: Word COM only, never edit it.
- Body limit ≤2,499 words excluding references (`count-words.py` in the draft folder; Draft v1 = 2,419). Hours must sum to 65 (15 in-prac).
- Locked facts: RQ verbatim from A1; the six = Bertram 2010, Ko 2007, Pascarella 2018, Dourish & Bellotti 1992, Whitson 2018, Maddila 2023; hour table 16/14/20/7/4/2/2; n=8 quant, n=6 think-aloud. Change none without asking me.
- Truth sources: `Working folder/a2-draft-2-sep-2026/verify/*.md` (SAFE / DO-NOT-WRITE per source); `Working folder/a2-recovered-29-aug-2026/DOSSIER.md` §1, §4, §5, §6 (standing corrections); both files in `Working folder/a2-draft-2-sep-2026/audit/`.
- Gaps at 2 Sep: no prototype, no repo, no figures, the six not yet read by me, "who runs the Editor window vs who reads the page" never stated. A2 is AI-open, so the GenAI statement only has to be accurate and complete, not a focus.
- Toolchain: Unity 6000.4.10f1 (used for the ChangeLens prototype; also 6000.1.17f1 and 2022.3.58f1) installed; git 2.48; node 22 with `docx` in `School/node_modules`; `build-docx.js` in the draft folder; Python 3.14; no `gh`.
- My answers from the last session: read `Working folder/a2-final-sprint-17-sep-2026/ANSWERS.md` (17 Sep) — nothing done since 2 Sep, no sources read, extension being lodged for +3 days, prototype to be agent-written on Unity 6000.4.10f1, participants unlikely, 2–3 h per evening available. Ask only what those answers do not cover.

## Procedure, in this order
1. Read the rubric, template text, Draft v1, both audits, every verify file and the DOSSIER sections above before proposing anything. State hours remaining to the deadline.
2. Ask me everything whose answer changes the plan: work done since the last session, staff feedback, extension status, decisions only I can make. Stop and wait for the answers.
3. Orchestrate with the Workflow tool. Roles and models (Fable is the main loop only; never put every agent on Fable/max):
   - Rubric comparer ×2, MANDATORY, independent, different marker personas — Opus, high. Criterion by criterion: current band, quoted descriptor, the single change to reach the next band, predicted mark, calibrated against the A1 actual. Re-marks every version; final gate.
   - Cold reader — Haiku, low. Reads the draft once, no other context, then answers: what is this project, who is it for, what will be built, what will be measured. Any wrong or missing answer is a finding.
   - Citation verifier, one per counted source plus one for the Introduction's prior art — Sonnet, high. Every number, quote, page, section and attribution checked against verify/*.md; anything outside a SAFE list is flagged with its sentence.
   - Adversarial marker — Opus, high. Hostile Q&A questions the text fails to pre-empt.
   - Mechanical auditor — Sonnet, low. Word count, section order, cover fields, template text, captions, APA consistency, Australian spelling.
   - Section editors for Literature Review, Project Proposal, Introduction — Opus, high. Edit only against findings; overview before detail; add no claim outside a SAFE list and no first-person reading claim.
   - Prototype builder — Opus, high. ChangeLens-lite as a UPM package with one EditorWindow that reads a `git log --name-status` export, classifies paths by extension and sibling .meta, renders grouped counts; compile in Unity batchmode and cite the log. Screenshots are mine.
   - Corpus and figure maker — Sonnet, medium. One-command script reproducing DOSSIER §3 counts; Figures A, 4 and 6 as files.
   - Prior-art recheck — web-search agent on Sonnet. ZeroStandup, HacknPlan, P4 MCP as of today.
   - Assembler and two proofreaders on Sonnet; completeness critic on Opus.
   Pipeline by default; one barrier before the edit plan. Loop mark → fix → re-mark until both comparers report HD on every criterion and the cold reader answers all four questions correctly, or two rounds add nothing. Cap three rounds.
4. Re-check the assembled .docx yourself: word count, Word COM render to PDF, every figure present, no template text. Then give me a review loop prompt via /anthropic-skills:prompt-master.

## Target State
- `Working folder/a2-final-sprint-17-sep-2026/A2 — Raphael Byun.docx` plus its `.md` source: ≤2,499 body words, figures placed, cover fields filled from my answers, template instructions gone, GenAI statement updated with this session.
- `Working folder/a2-final-sprint-17-sep-2026/REPORT.md`: predicted marks per criterion from both comparers; my to-do list in order with minutes; every remaining unverified claim with the sentence to delete.

## Scope
- Write only inside `Working folder/a2-final-sprint-17-sep-2026/` and the Unity project inside it. `CLAUDE.md` may be edited only in its marks ledger.
- Everything else under COMP3180 is read-only. Never edit `Assignemnts/`, A1 files, or anything outside COMP3180. Never open `Documents/IMPORTANT/`.

## Constraints
- UNVERIFIED beats a plausible citation. Six sources stay six; never trade a source for words. APA 7; reference list outside the count. Australian spelling.
- No email, iLearn, GitHub or library access — those are mine. No new sections or appendices beyond the template.
- Only make the changes the findings require.

## Acceptance Criteria
- [ ] Both comparers report HD on all three criteria for the final .docx, or name the exact blocking sentence.
- [ ] The cold reader answers all four questions correctly from the Introduction alone.
- [ ] `count-words.py` ≤ 2,499 on the final source, per-section counts in REPORT.md.
- [ ] Zero unverified claims remain, or each is listed with its sentence.
- [ ] Prototype compiles in Unity batchmode with zero errors, log path cited, or REPORT.md states the error.
- [ ] REPORT.md to-do list exists with minutes per item.

## Action Boundaries
Proceed with reading, drafting, building, compiling, counting and rendering. Stop and ask before deleting or overwriting any existing file, changing a locked fact, spending past three comparer rounds, or anything that would reach iLearn, email, GitHub or the library.

## Progress Evidence
One line per phase: what finished, the output path, the comparer's score. Every mark or count claimed cites an agent result or tool output. If a workflow dies at a usage limit, write everything produced so far to the sprint folder first — the 29 Aug run lost its output by not doing this.

## Session Strategy
New session — read the files above; do not rely on memory of earlier sessions.

---

This prompt is for an agentic tool with real system access. Review the scope locks, forbidden actions and stop conditions before pasting. Confirm the paths match the project.
