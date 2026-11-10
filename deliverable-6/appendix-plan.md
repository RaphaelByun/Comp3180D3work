# Appendix plan for raw data (Deliverable 6)

The template wants raw results in an appendix, not counted in the 2500 words. Each appendix is referred to from the text, so every claim is traceable.

Updated 26 Oct 2026. The activities SE1 to SE4 and every CSV column are in `deliverable-5/self-evaluation-plan.md` on `deliverable-5-sessions`, sections 3 and 6.

**Proposed lettering, shared with the report (26 Oct; needs the report scaffold changed to match, and Raphael's OK).** A. Variance table (A2 plan against what was done). B. Contribution ledger. C. Test evidence. D. Licence and attribution. Then the raw-data appendices below, shifted by four: E (instruments), F (SE2 raw data), G (key against observed), H (needs-log coding), I (analysis output), J (fidelity check), K (SE3 and SE4 sheets). The table below keeps the current letters A to G in its first column, with the proposed letter in brackets, until the report adopts one scheme.

| Appendix | Contents | Source file in repo | Filled by | Status |
|---|---|---|---|---|
| A [E]. Instruments | The ten-need sheet (questions, and the key [with the date Raphael accepts it, only once true]), the reserve-week items and their sealed keys (hashes cited by plan-section path: plan section 5), the SE2 answer-sheet layout, the SE3 persona and task list, the SE4 tasks T1 to T7 | `deliverable-3/ten-need-sheet.md`, `deliverable-3/answer-key-and-scoring.md`, plan section 5 (hashes); `deliverable-1/heuristic-coding-sheet.md` sections 1, 2 and 4; reserve items wherever the D3 change puts them | Deliverable 3; Raphael | Items exist (`0d3f811`, 21 Oct); key and Rule 2 filled in plan section 5 as drafted by Claude Code at Raphael's request, 21 Oct (`8fb989c`); Rule 2 confirmed by Raphael 26 Oct [not yet recorded in plan section 5]. The key stays AI-drafted until Raphael accepts it as his |
| B [F]. SE2 raw data | Every read (time, ratings, stand-up counts, `seen_before`), every need answer with its git-log score and cause, the item scores, and the answer files as committed | `deliverable-6/data/se2-reads.csv`, `se2-need-answers.csv`, `se2-item-scores.csv`, `se2-answers-<week>-<version>.md` | Raphael | Empty templates: `analysis/templates/se2-*.csv` |
| C [G]. Key against observed | The ten-need key's R/U class, what the git log could answer (`record_could_answer`), and the observed class per need on each first read, with agreement as x of n (Table C) | `deliverable-6/data/se2-need-answers.csv`; the `analyse.js` output (Table C) | Raphael; the tool computes the observed class by the rule fixed in plan section 6 | Not run |
| D [H]. Needs-log coding | Segment id, read, time, note, pass 1 code, pass 2 code on the blind quarter, final code and the rule used for each disagreement; the `recode-sample.js` seed and sample size | `deliverable-6/data/se2-needs-log.csv` (the `deliverable-5/think-aloud-coding-sheet.csv` layout, participant `SELF`) | Raphael | Empty template: `analysis/templates/se2-needs-log.csv` |
| E [I]. Analysis output | The unedited text printed by `node deliverable-6/analysis/analyse.js ... --out deliverable-6/data/analysis-output.md` (full command in `README.md`), with the date it was run: Tables A to H | `deliverable-6/data/analysis-output.md` | Raphael runs it | Not run |
| F [J]. Fidelity check | SE1: Raphael's hand verdicts beside each AI scorer's, per row (Table A), and the scored checklists from Deliverable 4 | `deliverable-6/data/se1-fidelity-handcheck.csv`; on branch `deliverable-4-fidelity-check`: February, `study/week1-2021-02-08/` (`FIDELITY-RESULT.md`, `fidelity-A-scored-scorer1.md`, `fidelity-A-scored-scorer2.md`, `fidelity-B-scored-scorer1.md`, `fidelity-B-scored-scorer2.md`, `fidelity-B-rescore-repaired-rows.md`); July, `study/week2-2021-07-19/` (`fidelity-A-scored.md`, `fidelity-B-scored.md`, one scorer); the reserve-week checklists once regenerated from `d9fa4bf` and scored after SE2 | Raphael (hand-check); Deliverable 4 (AI scorers) | AI scoring done for both study weeks: July PASS for A and B; February A 15 of 15, B 39 of 39 after the repair and re-score of rows 19, 21, 22, 23, 27, 33 (`FIDELITY-RESULT.md`). A2 requires scoring "read by hand": the hand-check is pending, and the AI-assisted scoring must be disclosed. The reserve-week checklists on D4 are out of date (plan section 11) |
| G [K]. SE3 and SE4 sheets | The walkthrough (persona, written before the walkthrough; correct actions, Q1 to Q4 per step, failure stories, severities) and the heuristic evaluation (problems, severities, T1 to T7 outcomes); the D1 rows used beside them in Table F, marked checked or not | `deliverable-6/data/se3-persona.md`, `se3-walkthrough.csv`, `se4-heuristic-problems.csv`, `se4-task-outcomes.csv`, `d1-problems.csv`, `d1-task-outcomes.csv`; screenshots named in `screenshot_file` | Raphael; the D1 rows copied by Claude Code (26 Oct) | SE files blank in `data/`; D1 rows copied (61 problems, 28 task outcomes), `raphael_checked_yn` blank |

## Rules

1. One participant code only: `SELF`, in the needs log. There are no reader codes and no pilot.
2. Write before you check. Answers, verdicts and walkthrough steps are committed before any key, AI verdict or git log is opened. Commit times record order; they are not proof, and the report says so.
3. Never edit a raw CSV after analysis. Corrections go in a new row with a note, or a dated change log.
4. Do not open the reserve weeks (`study/reserve/` on any branch) before SE2 is scored. If any was opened before, say so in `seen_before`.
5. Notes in the needs log are typed, timestamped and written alone after reading; keep the timestamp in Appendix D.
6. Put the repo path of each appendix in the Project Deliverables links and check them in a private browser window.

## Folder layout in `data/` (blank files created 21 Oct; the D1 rows 26 Oct)

```
deliverable-6/
  data/
    se1-fidelity-handcheck.csv
    se2-reads.csv
    se2-need-answers.csv
    se2-item-scores.csv        (reserve items exist, `0d3f811`)
    se2-needs-log.csv
    se2-second-scorer.csv      (not used: no second scorer; leave blank)
    se2-answers-<week>-<version>.md
    se3-persona.md
    se3-walkthrough.csv
    se4-heuristic-problems.csv
    se4-task-outcomes.csv
    d1-problems.csv            (for Table F; copied 26 Oct)
    d1-task-outcomes.csv       (for Table F; copied 26 Oct)
    analysis-output.md
    figures/        (figures.js output: figure-time-confidence.svg and .png, tables.md)
  analysis/   (analyse.js, figures.js, test.js, sample-*.csv and templates/: already in the repo, not created later)
```
