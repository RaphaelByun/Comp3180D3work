# A3 Evaluation section: skeleton (about 1000 words)

Status: skeleton only, rewritten 17 Oct 2026 for the solo evaluation. No findings are written here, and none should be until SE1 to SE4 are run and `analyse.js` has been run on the real CSVs. Every `[PLACEHOLDER]` says what evidence goes there. Delete this note and all placeholder text before submitting.

The decision (17 Oct 2026, Raphael's): there is no study with other people. No recruitment, no live sessions, no online form. Raphael evaluates ChangeLens himself. His reasons, in his words: he doesn't want live testing, he has no time to arrange people, and testing it himself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well." He accepted that this likely caps the Evaluation criterion near a Pass. The plan is `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions` (SE1 to SE4).

Word budget (plan section 6): opening and Target Audience about 120, Method up to 200, Results and Discussion about 700. Only the 2500-word total for the whole report is penalised.

---

## 3 Evaluation

**Opening: primary research question** (about 60 words; quote it verbatim from A2)

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

[PLACEHOLDER: the two sub-questions as now answerable (plan section 2): SQ1, which of the ten needs a page answers fully, partly or not at all on two unseen weeks; SQ2, which answers the scene and prefab names (Version B) added or changed, and at what cost in reading time. One clause naming what is assessed: utility (is the page true, which needs it answers), usability (the window, by walkthrough and heuristics) and UX (time, confidence and ratings). The design itself is stated once only, in the Method Participant row (21 Oct rule).]

### 3.1 Target Audience (about 60 words)

[PLACEHOLDER: who the reader is (a game producer who plans and tracks work without opening the codebase) and why, in industry terms. Evidence: the Deliverable 1 coded scan (ten ads, four verified reviews; review V5 was not verified and is not scored). The tasks are framed by a producer persona (SE3) and the D1 needs, not by producers themselves.]

### 3.2 Method (200 words or fewer)

Word cap: the nine rows below share 200 words, about 22 each. Cut each row to one sentence and push the detail to the appendices.

| Part | What to say | Evidence source |
|---|---|---|
| Design | A solo evaluation in four parts (SE1 to SE4). SE2 is the core: two unseen reserve weeks (14 Dec 2020, RX; 27 Sep 2021, RY), both versions each, order switched between weeks and fixed before reading (RX: A then B; RY: B then A). First reads are compared only with each other. | Plan section 3; `study/reserve/*/report-A-baseline.md`, `report-B-treatment.md` on `deliverable-2-changelens` (frozen at `d9fa4bf`) |
| Participant | One reader, the developer (Raphael). He built ChangeLens and is not its target reader. This is the report's one sentence on the design (Raphael's 21 Oct rule): put it first in Method, with n = 1. Do not repeat it in Results. [PLACEHOLDER: whether any reserve page was opened before SE2, from `seen_before`.] | `se2-reads.csv` (`seen_before`) |
| Instruments | The ten-need sheet, answered from the page (a different task from A2's, where readers ticked whether the records could answer each need); [PLACEHOLDER: the six Endsley items per reserve week, only if they were written and sealed; else "the ten needs alone"]; a stand-up draft; a needs log coded to Ko et al.'s (2007) 21 types; the Wharton et al. (1994) walkthrough; Nielsen's (1994) heuristics on the D1 scale. One line on AI: the ten-need key [and the reserve items and their keys] were AI-drafted; Raphael accepted or changed the key on [PLACEHOLDER: date, only once true]. | Appendix A; `deliverable-3/ten-need-sheet.md` section B; plan section 5 |
| Procedure | Per reserve week, one sitting of about 45 minutes: answers, confidence and lap times written and committed before the git log was opened, then scored against the git log. Commit times record order, not proof: one person controls the clock and the history. [PLACEHOLDER: dates of the sittings and of scoring.] | `se2-reads.csv`; git log of `deliverable-6/data/` |
| Ethics | No participants, so points 1 and 2 of the ethics notes no longer apply; say that in one sentence. Point 3: ChangeLens reports changes to the project, not each person's output (SE4 task T2 records this as a design choice). Point 4: SS3D is real contributors' work, so every page used was checked against the diffs (Fidelity row); state SS3D's licence once checked. Point 5: AI use is declared in the GenAI statement. | `deliverable-3/ethics/report-ethics-points.md` points 3 to 5; `study/SOURCE-AND-LICENCE.md` on `deliverable-2-changelens` |
| Fidelity check | One sentence: every page used was checked claim by claim against the diffs. AI scorers did the first pass (Deliverable 4); Raphael hand-checked [PLACEHOLDER: which rows, from Table A: at least every Version B row and every row an AI scorer marked C], and the reserve weeks only after SE2 was scored. State the result from Table A as counts. | Table A; `se1-fidelity-handcheck.csv`; scored files on `deliverable-4-fidelity-check` (Appendix F) |
| Scoring check | [PLACEHOLDER: either "an AI second scorer, blind to Raphael's scores, re-scored the SE2 answers: x of n need answers and x of n item answers agreed" (from the scoring check), or "there was no second scorer". Real numbers only. Item keys sealed by SHA-256 hash before SE2, only if that was done.] | `analyse.js` scoring check; `se2-second-scorer.csv`; plan section 5 (hash) |
| Analysis | Raw counts only, no p-values. Needs answered correctly per read; the key's R/U class against what the page gave, checked against the git log (Table C), with Cohen's (1960) kappa as indicative only; needs-log types with pass 1 against pass 2 as x of n. One line on AI: the analysis tools were drafted with Claude Code; point to the GenAI statement. | `analysis/analyse.js` output (Appendix E); GenAI statement |
| Deviations | Every change from A2 goes in the variance table (Appendix A), whose row only points to the Participant sentence. Instrument changes: the ten needs answered rather than classified; the stand-up and needs log written alone, not spoken; the fidelity hand-check limited to [PLACEHOLDER: the rows done]. [PLACEHOLDER: anything else that slipped, such as no reserve items or no second scorer.] | Plan sections 1 and 3; diary |

### 3.3 Results and Discussion (about 700 words)

Plan the 700 words as five short blocks and a close (plan section 6: about 350 on SE2, 80 on SE1, 150 on SE3 and SE4 together, about 120 on what was left unmet and the close). Lead with the answer to the research question, then the evidence. Raw counts first; no percentage without its count beside it.

1. **Answer first, and is the page true?** (about 120 words). [PLACEHOLDER: one or two sentences answering the RQ: which of the ten needs the page answered and which it could not, and whether the names (Version B) changed any answer. Write it last, from Tables B and C. Then the SE1 result as a precondition, from Table A: rows hand-checked, supported and contradicted per week and version, and agreement with the AI scorers as x of n. An answer from a wrong page is no answer.]

2. **SQ1: which needs the page answers** (about 160 words). Evidence: Table B (ten needs by read, C / PC / W / NA, beside the key's R/U class and what the git log could answer) and Table C (key against observed, first reads only). [PLACEHOLDER: what each reserve week contained, from the scored tables, after SE2.]

3. **SQ2: what the names added, and what they cost** (about 110 words). Evidence: the time-and-confidence figure (Figure 5) and the `only_in_b` count in Table B [and Table D, if items exist]. [PLACEHOLDER: answers that needed a line only Version B has; minutes per read (first reads compared only with each other); how many wrong answers came at confidence 4 or 5.]

4. **Usability of the window and the page** (about 130 words). Evidence: Table F (ChangeLens problems by severity beside the four D1 tools, and T1 to T7 outcomes), with one line from Table E (walkthrough failures by question). [PLACEHOLDER: the severity 3 and 4 problems, if any, by heuristic; where a first-time producer would get lost (CW task and question); how ChangeLens sits beside the D1 tools on the tasks a producer tool is asked to do. Use D1 ratings only for findings Raphael has checked, and say which.]

5. **What the page left unmet** (about 80 words). Evidence: Table G (needs-log entries by Ko et al. type), and the stand-up claims and ratings from Table H in one line. [PLACEHOLDER: the types logged most often; whether the unmet needs point to "why" and rationale (Whitson's opacity prediction) or to who and when; pass 1 against pass 2 as x of n.]

Close (about 100 words). [PLACEHOLDER: one sentence on what this means for the tool (utility), and one on the fix or next step it points to. No limitations paragraph (21 Oct rule).]

### Limitations

Removed 26 Oct 2026 (Claude Code, Raphael away) to match Raphael's 21 Oct rule: the design is stated once, in Method, and no limitations go in the report. The record of the limits stays in plan section 7 on `deliverable-5-sessions`.

### Figures and tables to prepare (integrate them in the text, not only in appendices; `analysis/figures.js` builds the figure and Tables B, C, F and G)

- Figure 5: time and confidence (minutes per read; need answers by confidence and git-log result). It replaces the A2 paired-differences plot. The number follows the report-wide list in `deliverable-7/README.md`, where Figure 1 is the code-share chart and Figures 2 to 4 are the video stills. Run `figures.js` with `--figure 5` so the title matches.
- Table B: ten needs by read, with the per-read counts under it.
- Table C: key against observed, first reads only, with agreement per week.
- Table F: heuristic problems by severity, ChangeLens beside the D1 tools; T1 to T7 outcomes.
- Table G: needs-log entries by Ko et al. information type.
- Tables A, D, E and H go to the appendices unless a block needs one line from them.
- Optional: the two report versions side by side (reuse the video still).

### Traps to check before submitting

- Raw counts before percentages; no percentage from small n without the count beside it (the A2 marker's note).
- RQ stated first, in the exact A2 words.
- Each claim traceable to an appendix (A to G in `appendix-plan.md`).
- No result written in Raphael's voice by anyone else; every number from the CSVs.
- The design is stated once, in Method (one sentence, first, with n = 1). No limitations paragraph; no plural "readers" or "participants" in Results. Never call it a user study.
