# ChangeLens: COMP3180 A3 final project (Raphael Byun, 46987282)

ChangeLens is a Unity Editor tool that turns one week of a game project's version history into a one-page summary for a producer, someone who tracks the team's work without reading code. Version A groups the week's changes by kind of file; Version B also names each scene and prefab that changed. It was built and tested on weeks from SS3D, an open-source Unity game. The plan it follows is my A2 proposal (`A2 — Raphael Byun (v2).pdf`).

**State at submission (Wed 11 Nov 2026).** Every deliverable was developed on its own branch (`deliverable-1-ux-study` … `deliverable-9-reflection`) and all nine were merged into `main` on 10 Nov 2026 for submission. The branches are kept as the development history. On 11 Nov the tests were re-run on `main` and the diary, contribution ledger and folder READMEs were brought to their final form. The Final Project Report is submitted on iLearn.

## Start here

- **Portfolio video:** not produced. The script and shot list are in [`deliverable-7/`](deliverable-7/).
- **Try the tool:** [`TRY-CHANGELENS.md`](TRY-CHANGELENS.md), about 15 minutes in Unity 6000.4.
- **Tests:** 88 of 88 pass on `main` (11 Nov 2026), both in Unity 6000.4.10f1 EditMode ([`prototype-logs/a3-tests-2026-11-11.xml`](prototype-logs/a3-tests-2026-11-11.xml)) and without Unity: `dotnet test tools/changelens-dotnet/tests/tests.csproj`.
- **What the page looks like:** [`figures/a3-producer-page-A.png`](figures/a3-producer-page-A.png), [`figures/a3-producer-page-B.png`](figures/a3-producer-page-B.png).
- **Evaluation data and analysis:** [`deliverable-6/data/`](deliverable-6/data/), with the computed tables in [`deliverable-6/data/analysis-output.md`](deliverable-6/data/analysis-output.md).
- **Evaluation at a glance:** [`figures/a3-results-reads.png`](figures/a3-results-reads.png) (the two reads of the unseen week) and [`figures/a3-results-severity.png`](figures/a3-results-severity.png) (heuristic problems beside the four D1 tools). They are Figures 4 and 5 of the report, drawn by `deliverable-6/analysis/report-figures.py`.
- **Development diary:** [`deliverable-8/DIARY.md`](deliverable-8/DIARY.md).
- **Who did what:** [`CONTRIBUTIONS.md`](CONTRIBUTIONS.md) and [`GENAI-EVIDENCE.md`](GENAI-EVIDENCE.md). The code, tests and most documents were written by Claude Code to Raphael's direction; the ledger says exactly what he did and did not do.

Each deliverable folder's README opens with its status at submission. The text below that block is the working record from October and is kept as history.

## Deliverables

| # | Deliverable | Where | What is there |
| --- | --- | --- | --- |
| D1 | Production-tool UX study and design spec | [`deliverable-1/`](deliverable-1/) | Four tools inspected against Nielsen's heuristics (61 problems; AI evaluator), 10 job ads, 5 reviews and 6 published producer accounts coded, 25 producer needs ranked to a top ten, design spec |
| D2 | ChangeLens Unity Editor package | [`ChangeLens-proto/Packages/com.raphaelbyun.changelens/`](ChangeLens-proto/Packages/com.raphaelbyun.changelens/), [`study/`](study/), [`tools/changelens-dotnet/`](tools/changelens-dotnet/) | Producer Page window (Window > ChangeLens Producer Page), Versions A and B, frozen study-week pages, 88 automated tests, MIT licence for the code. Evaluation fix "Save page" in `3cf2727` |
| D3 | Evaluation instruments | [`deliverable-3/`](deliverable-3/) | Ten-need sheet, question items, answer key, protocol |
| D4 | Fidelity check | [`study/week1-2021-02-08/FIDELITY-RESULT.md`](study/week1-2021-02-08/FIDELITY-RESULT.md), [`deliverable-6/data/se1-claude-check.csv`](deliverable-6/data/se1-claude-check.csv) | Every page claim checked against its commit by AI scorers (12 and 13 Oct), then all 96 claims checked again by a third AI pass (7 Nov). No hand check was done |
| D5 | Evaluation run kit | [`deliverable-5/`](deliverable-5/) | Self-evaluation plan, run sheets, sealed-key records |
| D6 | Evaluation data and analysis | [`deliverable-6/`](deliverable-6/) | Read records, scores, walkthrough and heuristic findings, analysis script and output |
| D7 | Portfolio video | [`deliverable-7/`](deliverable-7/) | Storyboard and shot list only; no video was recorded |
| D8 | Development diary | [`deliverable-8/DIARY.md`](deliverable-8/DIARY.md) | Diary compiled from the commit record, with my own words where marked; hours log (4 h logged); the dated drafts it was compiled from |
| D9 | Reflection | [`deliverable-9/`](deliverable-9/) | Skeleton and hour-variance helper; the reflection itself is section 4 of the report |

## Data notice

SS3D contributors' e-mail addresses in the committed exports were replaced with pseudonyms (`contributor-<hash>@users.invalid`) on 10 Nov 2026; names are kept because the pages count people by name. Earlier commits on the deliverable branches still hold the original addresses, which are also public in SS3D's own history.

## Running the checks

All of these were run on the submitted `main` on Wed 11 Nov 2026, from the repository root, and all passed.

| Command | What it checks | Result on 11 Nov 2026 |
| --- | --- | --- |
| Unity: Window → General → Test Runner → EditMode → Run All | The ChangeLens package in Unity 6000.4.10f1. One test rebuilds every frozen study and reserve week and compares it with the committed pages | 88 of 88 ([`prototype-logs/a3-tests-2026-11-11.xml`](prototype-logs/a3-tests-2026-11-11.xml)) |
| `dotnet test tools/changelens-dotnet/tests/tests.csproj` | The same tests without Unity | 88 of 88 |
| `node deliverable-6/analysis/test.js` | The analysis tool. `deliverable-6/README.md` gives the command that rebuilds `analysis-output.md` from the real data | 230 checks |
| `node deliverable-9/test.js` | The hour-variance table | passed |
| `node deliverable-8/test.js` | The hours-log totaller (`node deliverable-8/sum-hours.js` prints the totals) | passed |
| `node deliverable-5/recode-sample.test.js` | The blind re-code helper. It was not used: no needs-log entries were made | 8 tests |
| `node deliverable-5/solo/logs.test.js` | The run kit's blank log headers | 11 tests |
| `node tools/export-transcript.test.js` | The session-transcript exporter for the GenAI evidence (usage in `GENAI-EVIDENCE.md`) | 5 tests |
| `node audit/count-a3.test.js` | The report word counter | 11 tests |

The word counter for the report is `powershell -File audit\count-a3.ps1 -Docx "<full path to report.docx>"`. It uses Word, counts the five template sections from Project Deliverables up to Appendices, and compares the total with 2500. Cover, contents, Appendices, the GenAI statement and References are shown but not counted.

## Sources, licences and AI use

- Study data: taken from SS3D (github.com/RE-SS3D/SS3D). Source commits and licences: `study/SOURCE-AND-LICENCE.md`.
- Generative AI use: `GENAI-EVIDENCE.md` (A2 and A3).
- Tools and software: `TOOLS-AND-SOFTWARE.md` (versions, licences, where each is used, and APA 7 references).

---

## A2 archive (17–20 Sep 2026)

Created Thu 17 Sep 2026 by Claude Code (Fable 5.1 main loop; Opus, Sonnet and Haiku sub-agents); loop rounds ran on Fri 18 Sep and Sat 19 Sep. A2 due **Sun 20 Sep 11:55 pm** (Wed 23 Sep if the short extension is granted). Draft v1 (2 Sep) and its audits live in `School/Unit 3 Sem 2/COMP3180/Working folder/a2-draft-2-sep-2026/` (outside this repository); this repository holds the sprint outputs. **Read `REPORT.md` first.**

Two folders in the table below are only partly in git. The downloaded PDFs in `reading/` are not committed (copyright); `reading/READING-KIT.md` gives the citation for each. The SS3D clone in `prototype-data/SS3D/` is not committed (third-party, about 350 MB); `TRY-CHANGELENS.md` gives the command to clone it.

| File / folder | What it is |
|---|---|
| `A2 — Raphael Byun (v2).docx` / `.pdf` | The submission candidate (13 pages: 9 of proposal and references, then the GenAI statement and Appendices A–D, uncounted; Appendix D carries the AI-use evidence the spec asks for), built from `A2 Draft v2 — 17 Sep 2026.md`. No placeholders left (Student ID filled 19 Sep; the GenAI statement rewritten plainly and the CONFIRM line removed 20 Sep at Raphael's instruction). Body text is left-aligned since round 14 (20 Sep). |
| `REPORT.md` | Predicted marks per round, what changed, what was built, Raphael's to-do list with minutes, defence notes, remaining risks. |
| `ANSWERS.md` | Raphael's answers to the launch questions (17 Sep). |
| `PROMPT — A2 final sprint (paste into a fresh session).md` | Resumable mission prompt for a fresh Claude Code session. |
| `audit/` | `FINDINGS-v1/v2/v3.md` (the three sprint marking rounds), `FINDINGS-round-1` to `-14.md` (the loop rounds; 7-10 ran on 19 Sep, 11-14 overnight 19-20 Sep), `verified-additions-round-1/4/5/6/7/8/9/10/11/12/13/14.md` (facts and measurements checked on 18-20 Sep; the round 11-14 files carry the delta fact-finders' lists, with `factfinder-round-11..14-raw.md` their full reports), `parse-round.py`, `count-and-pdf.ps1` (Word COM body/cover count plus PDF export), `EDIT-PLAN-v2.md`, raw JSON, every `apply-*.py` edit script, and the as-marked copy of each round's text. |
| `ChangeLens-proto/` | Unity 6000.4.10f1 project; the package is `Packages/com.raphaelbyun.changelens`. 27/27 EditMode tests passed at A2 (88 of 88 on `main` on 11 Nov 2026; `prototype-logs/a3-tests-2026-11-11.xml`). Three one-off screenshot helpers sit in the Editor folder and can be deleted. |
| `prototype/` | `HOW-IT-WORKS.md` (plain-language walkthrough), `CHANGELOG.md` (commands, logs, the five screenshot passes and the batch export / build-report probe). |
| `prototype-logs/` | Unity create, compile, test and screenshot logs; `tests.xml`. |
| `prototype-data/` | Blobless SS3D clone and the sample week export used by the prototype. |
| `corpus/` | `corpus.py` (one-command re-run), `scan-weeks.py` (ranks SS3D weeks by asset share), `export-week.py` (exports a week for ChangeLens and measures naming presence), `scan-repo.py` (classifies a local repository; used on the Inkform team repo), `plot-fig1.py` (redraws Figure 1 with six repositories), `results.md` / `results.json`, raw figure data. |
| `figures/` | The three figures in the proposal: `fig4-code-file-percentage.png` (Figure 1, six repositories; the earlier five-repository chart is `-5repos.png`), `fig2-changelens-docked-2021.png` (Figure 2, ChangeLens docked in the Unity 6 Editor on the 8–14 February 2021 SS3D week), `fig3-prefab-yaml-hunk.png` (Figure 3); plus the raw captures and the earlier floating-window and package-panel images, unused. |
| `reading/` | `READING-KIT.md` and the downloaded PDFs (Bertram, Ko, Pascarella, Dourish & Bellotti, Maddila, Stray, Whitson 2013 draft). Whitson (2018) is open access at PubMed Central, PMC6256721; the kit says how to read it in 20 minutes. |
| `GENAI-EVIDENCE.md` | Evidence index for the Statement on Generative AI use. |
| `build-docx-v2.js`, `package.json`, `assemble.py` | Markdown → Word builder (figures with width hints, cover, blockquotes, repeated table headers) and the section assembler. Run `npm install` once, then `node build-docx-v2.js <in.md> <out.docx>`. The builder makes the A2 layout only: its cover has Name, Student ID and Topic Category, with no GitHub Username line, it cannot make a table of contents, and its footer reads "COMP3180 Research Proposal". The A3 template needs a GitHub Username line and a contents field, so the A3 report is best written in `Final Project Report Template.docx` itself, unless the builder is extended first. |

Heavily AI-assisted — declared in the proposal's Statement on Generative AI use and itemised in `GENAI-EVIDENCE.md`.
