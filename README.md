# ChangeLens: COMP3180 A3 final project (Raphael Byun, 46987282)

ChangeLens is a Unity Editor tool that turns one week of a game project's version history into a one-page summary for a producer, someone who tracks the team's work without reading code. Version A groups the week's changes by kind of file; Version B also names each scene and prefab that changed. It was built and tested on weeks from SS3D, an open-source Unity game. The plan it follows is my A2 proposal (`A2 — Raphael Byun (v2).pdf`).

**State at submission (Tue 10 Nov 2026).** Every deliverable was developed on its own branch (`deliverable-1-ux-study` … `deliverable-9-reflection`) and all nine were merged into `main` on 10 Nov 2026 for submission. The branches are kept as the development history. The Final Project Report is submitted on iLearn.

## Start here

- **Portfolio video:** not produced. The script and shot list are in [`deliverable-7/`](deliverable-7/).
- **Try the tool:** [`TRY-CHANGELENS.md`](TRY-CHANGELENS.md), about 15 minutes in Unity 6000.4.
- **Run the tests without Unity:** `dotnet test tools/changelens-dotnet/tests/tests.csproj` (88 of 88 pass on the submitted `main`).
- **What the page looks like:** [`figures/a3-producer-page-A.png`](figures/a3-producer-page-A.png), [`figures/a3-producer-page-B.png`](figures/a3-producer-page-B.png).
- **Evaluation data and analysis:** [`deliverable-6/data/`](deliverable-6/data/), with the computed tables in [`deliverable-6/data/analysis-output.md`](deliverable-6/data/analysis-output.md).
- **Who did what:** [`CONTRIBUTIONS.md`](CONTRIBUTIONS.md) and [`GENAI-EVIDENCE.md`](GENAI-EVIDENCE.md). Every commit was made with Claude Code.

## Deliverables

| # | Deliverable | Where | What is there |
| --- | --- | --- | --- |
| D1 | Production-tool UX study and design spec | [`deliverable-1/`](deliverable-1/) | Four tools inspected against Nielsen's heuristics (61 problems; AI evaluator), 10 job ads, 5 reviews and 6 published producer accounts coded, 25 producer needs ranked to a top ten, design spec |
| D2 | ChangeLens Unity Editor package | [`ChangeLens-proto/Packages/com.raphaelbyun.changelens/`](ChangeLens-proto/Packages/com.raphaelbyun.changelens/), [`study/`](study/), [`tools/changelens-dotnet/`](tools/changelens-dotnet/) | Producer Page window (Window > ChangeLens Producer Page), Versions A and B, frozen study-week pages, 88 automated tests, MIT licence for the code. Evaluation fix "Save page" in `3cf2727` |
| D3 | Evaluation instruments | [`deliverable-3/`](deliverable-3/) | Ten-need sheet, question items, answer key, protocol |
| D4 | Fidelity check | [`study/week1-2021-02-08/FIDELITY-RESULT.md`](study/week1-2021-02-08/FIDELITY-RESULT.md) | Every page claim checked against its commit by AI scorers |
| D5 | Evaluation run kit | [`deliverable-5/`](deliverable-5/) | Self-evaluation plan, run sheets, sealed-key records |
| D6 | Evaluation data and analysis | [`deliverable-6/`](deliverable-6/) | Read records, scores, walkthrough and heuristic findings, analysis script and output |
| D7 | Portfolio video | [`deliverable-7/`](deliverable-7/) | Storyboard and shot list only; no video was recorded |
| D8 | Development diary | [`deliverable-8/`](deliverable-8/) | Diary draft v0.4 (facts from commits, with my own words where marked), hours log, commit windows |
| D9 | Reflection | [`deliverable-9/`](deliverable-9/) | Skeleton and hour-variance helper; the reflection itself is section 4 of the report |

## Data notice

SS3D contributors' e-mail addresses in the committed exports were replaced with pseudonyms (`contributor-<hash>@users.invalid`) on 10 Nov 2026; names are kept because the pages count people by name. Earlier commits on the deliverable branches still hold the original addresses, which are also public in SS3D's own history.

## Running the checks

> The counts and branch names below were recorded while each deliverable lived on its own branch; on the submitted `main` (10 Nov 2026) every file is in one tree, the .NET harness passes 88 of 88 and the analysis self-test passes 230 checks.

From the repository root:

```
dotnet test tools/changelens-dotnet/tests/tests.csproj
```

ChangeLens tests without Unity (branch `deliverable-2-changelens`; 85 pass on 17 Oct 2026). In Unity: Window → General → Test Runner → EditMode → Run All (76 passed earlier on 17 Oct 2026, before nine tests were added; `prototype-logs/a3-tests-2026-10-17.xml`). One of them rebuilds every frozen study and reserve week and compares it with the committed pages.

```
node deliverable-6/analysis/test.js
node deliverable-6/analysis/analyse.js
```

The analysis tool's checks, then a demo on its labelled fake sample data (branch `deliverable-6-evaluation-report`; 220 checks pass on 17 Oct 2026, after the tool was rebuilt). `deliverable-6/README.md` gives the command for the real data.

```
node deliverable-9/test.js
```

The hour-variance table's tests (branch `deliverable-9-reflection`; "variance-table tests passed" on 17 Oct 2026).

```
node deliverable-8/test.js
node deliverable-8/sum-hours.js
```

The hours log totaller's tests, then the totals (branch `deliverable-8-dev-diary`; "sum-hours tests passed" on 17 Oct 2026). `deliverable-8/README.md` explains the log.

```
node deliverable-5/recode-sample.test.js
node deliverable-5/solo/logs.test.js
node deliverable-5/recode-sample.js draw  --in deliverable-5/think-aloud-coding-sheet.csv --out recode-blind.csv
node deliverable-5/recode-sample.js merge --in deliverable-5/think-aloud-coding-sheet.csv --blind recode-blind.csv --out deliverable-5/think-aloud-coding-sheet.csv
```

The blind re-code helper (branch `deliverable-5-sessions`): its tests, then drawing a quarter of the pass-1 coded segments and merging the pass-2 codes back. On 17 Oct 2026 the re-code tests passed (8), the run kit's log-header tests passed (11) and a draw found 0 coded segments, since nothing has been coded yet. The coded file is now the SE2 needs log (`se2-needs-log.csv`), not session notes.

```
node tools/export-transcript.test.js
```

The session-transcript exporter for the GenAI evidence (branch `deliverable-2-changelens`; 5 tests pass on 17 Oct 2026). Usage is in `GENAI-EVIDENCE.md`.

```
node audit/count-a3.test.js
node audit/count-a3.js <draft.md>
powershell -File audit\count-a3.ps1 -Docx "<full path to report.docx>" [-Pdf "<full path to report.pdf>"]
```

The A3 report word counter (branch `deliverable-2-changelens`; 11 tests pass on 26 Oct 2026). It counts the five template sections from Project Deliverables up to Appendices, each against its template guide (300, 500, 1000, 500, 200), and the total against 2500. Cover, contents, Appendices, the GenAI statement and References are shown but not counted. The `.ps1` uses Word and gives the count that matters; the `.js` is a rough count for Markdown drafts. Since 26 Oct the `.js` also recognises headings with a budget note, such as `## 1 Project Deliverables (300)` or `## 2 Development Diary Summary (480): outline`, and `Appendix A:` headings; if any of the five counted sections is not found it prints NOT COUNTED and exits with code 1, so it can no longer report a total of 0 as within the limit. `audit/count-and-pdf.ps1` is the A2 counter and does not fit the A3 layout.

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
| `ChangeLens-proto/` | Unity 6000.4.10f1 project; the package is `Packages/com.raphaelbyun.changelens`. 27/27 EditMode tests passed at A2 (85 at the tip of `deliverable-2-changelens` on 17 Oct 2026; 76 in the last Unity run, `prototype-logs/a3-tests-2026-10-17.xml`). Three one-off screenshot helpers sit in the Editor folder and can be deleted. |
| `prototype/` | `HOW-IT-WORKS.md` (plain-language walkthrough), `CHANGELOG.md` (commands, logs, the five screenshot passes and the batch export / build-report probe). |
| `prototype-logs/` | Unity create, compile, test and screenshot logs; `tests.xml`. |
| `prototype-data/` | Blobless SS3D clone and the sample week export used by the prototype. |
| `corpus/` | `corpus.py` (one-command re-run), `scan-weeks.py` (ranks SS3D weeks by asset share), `export-week.py` (exports a week for ChangeLens and measures naming presence), `scan-repo.py` (classifies a local repository; used on the Inkform team repo), `plot-fig1.py` (redraws Figure 1 with six repositories), `results.md` / `results.json`, raw figure data. |
| `figures/` | The three figures in the proposal: `fig4-code-file-percentage.png` (Figure 1, six repositories; the earlier five-repository chart is `-5repos.png`), `fig2-changelens-docked-2021.png` (Figure 2, ChangeLens docked in the Unity 6 Editor on the 8–14 February 2021 SS3D week), `fig3-prefab-yaml-hunk.png` (Figure 3); plus the raw captures and the earlier floating-window and package-panel images, unused. |
| `reading/` | `READING-KIT.md` and the downloaded PDFs (Bertram, Ko, Pascarella, Dourish & Bellotti, Maddila, Stray, Whitson 2013 draft). Whitson (2018) is open access at PubMed Central, PMC6256721; the kit says how to read it in 20 minutes. |
| `GENAI-EVIDENCE.md` | Evidence index for the Statement on Generative AI use. |
| `build-docx-v2.js`, `package.json`, `assemble.py` | Markdown → Word builder (figures with width hints, cover, blockquotes, repeated table headers) and the section assembler. Run `npm install` once, then `node build-docx-v2.js <in.md> <out.docx>`. The builder makes the A2 layout only: its cover has Name, Student ID and Topic Category, with no GitHub Username line, it cannot make a table of contents, and its footer reads "COMP3180 Research Proposal". The A3 template needs a GitHub Username line and a contents field, so the A3 report is best written in `Final Project Report Template.docx` itself, unless the builder is extended first. |

Heavily AI-assisted — declared in the proposal's Statement on Generative AI use and itemised in `GENAI-EVIDENCE.md`.
