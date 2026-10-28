# ChangeLens: COMP3180 A3 final project

> **Draft index for Raphael to edit (updated 26 Oct 2026; first drafted 17 Oct).** Facts and paths only. The A2 sprint record (17–20 Sep 2026) is kept unchanged under "A2 archive" below. The test count there is the A2 count; at the tip of `deliverable-2-changelens` (`af23dab`, 17 Oct 2026) the ChangeLens suite has 85 tests.

ChangeLens is a Unity Editor tool that writes a one-page weekly change report for game producers. The plan is the A2 proposal (`A2 — Raphael Byun (v2).pdf`, Deliverables table).

**Embargo:** don't open anything under `study/reserve/` until SE2 is scored (plan: [`deliverable-5/self-evaluation-plan.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-5-sessions/deliverable-5/self-evaluation-plan.md) on branch `deliverable-5-sessions`).

## Start here

- **Portfolio video** (Echo 360, not in this repository): *[link to add when uploaded]*
- **Final Project Report:** *[link or file name to add at submission]*
- **Try the tool:** [`TRY-CHANGELENS.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-2-changelens/TRY-CHANGELENS.md), about 15 minutes in Unity.
- **Run the tests without Unity:** `dotnet test tools/changelens-dotnet/tests/tests.csproj` (more under "Running the checks").
- **What the page looks like:** `figures/a3-producer-page-A.png`, `figures/a3-producer-page-B.png` and `figures/a3-producer-page-B-scenes.png`.
- **Who did what:** [`CONTRIBUTIONS.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-8-dev-diary/CONTRIBUTIONS.md) on branch `deliverable-8-dev-diary` (Raphael's ledger to confirm).

## Deliverables

Each deliverable has its own branch. A folder named below exists on its own branch. The Branch and Start with links open that branch on GitHub, so they work whether or not the branch is merged into `main`. The repository is private: the links work only for accounts given access.

Before submitting: grant the markers access, then open every link in this table in a private browser window.

| # | Deliverable | Branch | Folder | A2 success measure | Status on 26 Oct 2026 | Start with |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | Production-tool UX study and design spec | [`deliverable-1-ux-study`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-1-ux-study) | `deliverable-1/` | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994); 10 job ads and five G2 reviews coded; two 20-minute interviews outside the reader pool; 25 needs classified by artefact source | Every step drafted. Heuristic pass run by AI; interviews replaced by six coded published sources. Raphael's spot-checks and acceptance open (`CHECK-PACK.md`) | [`deliverable-1/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-1-ux-study/deliverable-1/README.md) |
| D2 | ChangeLens Unity Editor package, both conditions | [`deliverable-2-changelens`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-2-changelens) | `ChangeLens-proto/Packages/com.raphaelbyun.changelens/`, `study/`, `tools/changelens-dotnet/` | Generated unedited for every sampled week; 90% of changed files categorised; 60% of changed prefabs and scenes named across the two study weeks | Built. Categorised 104 of 104 (Feb) and 39 of 39 (Jul). Named (strict) 21 of 26 (Feb) and 21 of 24 (Jul). The page itself names an object other than the asset in 7 of 26 (Feb) and 9 of 24 (Jul); see each `naming.md`. These are the frozen February figures that D3 and D4 cite; the current code gives 20 of 25 (strict) and 6 of 25 for that week (package `CHANGELOG.md`, 17 Oct). 76 tests passed in the .NET harness and in Unity on 17 Oct 2026 (`prototype-logs/a3-tests-2026-10-17.xml`); after the later 17 Oct fixes the .NET harness has 85, all passing, not yet re-run in Unity. Screenshots of both versions: `figures/a3-producer-page-*.png`. Committed tier only: the stretch tier (BuildReport) and challenge tier (gone quiet) were not started by 26 Oct 2026 (no commits on this branch after `af23dab`, 17 Oct) | [`TRY-CHANGELENS.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-2-changelens/TRY-CHANGELENS.md) |
| D3 | Evaluation protocol and instruments | [`deliverable-3-instruments`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-3-instruments) | `deliverable-3/` | Six matched items per week, answerable from the report alone, plus the ten-need sheet; both piloted in Week 11 | Drafts. Raphael is checking them. No pilot (see the report, Evaluation > Method). The D3 changes are listed in section 11 of `deliverable-5/self-evaluation-plan.md` for his approval | [`deliverable-3/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-3-instruments/deliverable-3/README.md) |
| D4 | Fidelity check | [`deliverable-4-fidelity-check`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-4-fidelity-check) | `study/*/fidelity-*-scored*.md`, `study/week1-2021-02-08/FIDELITY-RESULT.md` | Two team-weeks scored before any session; one hour reserved for repair | Both weeks scored by AI scorers. July: A 14 of 14, B 27 of 28 supported. February: A 15 of 15, B 39 of 39 after the repair. Raphael's hand check open (SE1, scheduled Thu 29 Oct) | [`study/week1-2021-02-08/FIDELITY-RESULT.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-4-fidelity-check/study/week1-2021-02-08/FIDELITY-RESULT.md) |
| D5 | Sessions run and coded | [`deliverable-5-sessions`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-5-sessions) | `deliverable-5/` | Nine 45-minute sessions including the pilot; recruiting and briefing; six think-alouds coded from timestamped notes | No reader sessions (see the report, Evaluation > Method; plan `deliverable-5/self-evaluation-plan.md`). Items committed at `0d3f811`. Pre-SE2 answers recorded on 26 Oct (`9a12294`): no thresholds set in advance, no AI second scorer. SE2 scheduled Tue 27 Oct; nothing run yet, no data. The recruitment, booking and session files are kept as the A2 record | [`deliverable-5/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-5-sessions/deliverable-5/README.md) |
| D6 | Evaluation report, instruments, data | [`deliverable-6-evaluation-report`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-6-evaluation-report) | `deliverable-6/` | All six items and both coding arms reported with agreement; claims traceable to appendices | Skeleton, appendix plan and analysis tools tested; blank data logs and answer sheets (`e9ec1de`); skeleton wording revised 26 Oct (`c355b43`, `1403820`, `403576c`). No data, no findings | [`deliverable-6/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-6-evaluation-report/deliverable-6/README.md) |
| D7 | Portfolio video | [`deliverable-7-portfolio-video`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-7-portfolio-video) | `deliverable-7/` | Three to four minutes showing both conditions; two outside viewers can state its purpose and reader | Plan, script and shot list (revised 26 Oct: `1855d39`, `db1d401`, `7213a22`). Nothing recorded. The two-viewer test is retired | [`deliverable-7/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-7-portfolio-video/deliverable-7/README.md) |
| D8 | Development diary | [`deliverable-8-dev-diary`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-8-dev-diary) | `deliverable-8/` | A dated entry each week naming a roadblock or breakthrough | Diary draft v0.3 built from commit facts (`deliverable-8/diary-draft-v0.3.md`), hours prefill with the minutes left blank, and a draft contribution ledger (`CONTRIBUTIONS.md`), all in `c1df9d2`; wording fixes in `cc37123`. No entries in Raphael's own words yet | [`deliverable-8/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-8-dev-diary/deliverable-8/README.md) |
| D9 | Reflection report | [`deliverable-9-reflection`](https://github.com/RaphaelByun/Comp3180D3work/tree/deliverable-9-reflection) | `deliverable-9/` | All four goals evidenced; hour variances explained | Skeleton and variance-table helper; variance notes revised 26 Oct (`8dabc2e`, `0bcdcfc`). No reflection yet | [`deliverable-9/README.md`](https://github.com/RaphaelByun/Comp3180D3work/blob/deliverable-9-reflection/deliverable-9/README.md) |

### Changes from the A2 plan

Facts only, for the report's Project Deliverables section. "A2 said" quotes the A2 Deliverables table and Evaluation Method. The "Reason recorded" column repeats what the source file says. The last column is for Raphael to write in his own words. Hour variances are left to `deliverable-9/variance-table.js`, which reads the hours log.

| Deliverable | A2 said | What changed | Date | Source (branch: file) | Reason recorded | Why, in Raphael's words |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | "two 20-minute interviews outside the reader pool (2 h)" | Interviews not run. Replaced by six coded published first-hand accounts by production staff. The two scoping conversations held before A1 (3 Aug 2026, and a second whose date was not recorded), which A2's GenAI statement calls "the two producer interviews", are separate and came before this plan | 14 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/interview-guide.md` (top note), `deliverable-1/published-sources.md` | 14 Oct: no time to get ethics approval. 17 Oct update: no ethics application is needed, and the interviews stay dropped for time | |
| D1 | "Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994)" (planned as Raphael's own pass) | The heuristic pass was run by Claude, an AI agent, in Chrome on Raphael's accounts. Raphael did not watch it. A spot-check of the 16 severity 3–4 findings is his to do | 14 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/heuristic-coding-sheet.md` (Evaluator note), `deliverable-1/CHECK-PACK.md` | "Raphael authorised this because he had no time to run it himself" | |
| D1 | 10 h of Raphael's own work for D1 | The verification, needs marks, ranking and design spec were drafted by Claude Code. Each judgement is for Raphael to accept or change | 15 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/README.md` (status item 3), `deliverable-1/needs-catalogue.md` | "Raphael had no time" | |
| D1 | "Four free-tier tools coded" | Trello was seen on an automatic Premium trial and Jira on a Standard trial, not on their free tiers. HacknPlan and GitHub Projects were on free plans | 14 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/heuristic-coding-sheet.md` (method note, "Plans seen") | Trello started the trial on the first board; the new Jira site ran a Standard trial | |
| D1 | "five G2 reviews coded" | Three reviews are from G2 (V1, V2, V5) and two from Capterra (V3 and V4, both HacknPlan). V5 is unverified | 15 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/job-ads-and-reviews.md` (section 3) | HacknPlan has only about ten G2 reviews | |
| D1 | "five G2 reviews coded" | Four of the five reviews verified on the live pages. V5 could not be verified | 15 Oct 2026 | `deliverable-1-ux-study`: `deliverable-1/job-ads-and-reviews.md` | G2 rotates the reviews it shows, and the quoted one did not reappear | |
| D2 | ChangeLens "reads a git log export for one week" | Added Window > ChangeLens Producer Page. It runs git itself for a chosen week, reopens a frozen week, flips Version A and B and saves the study files | 13 Oct 2026 | `deliverable-2-changelens`: commit `323eac1`, `TRY-CHANGELENS.md` | None recorded | |
| D2 | "The stretch tier (3 hours) parses Unity's build report ... The challenge tier (2 hours) flags work gone quiet" (RS6 and RS7 in the D1 spec outline) | Not started by 26 Oct 2026 (no commits on `deliverable-2-changelens` after `af23dab`, 17 Oct). The A2 tier freeze was due in Week 11 (19–25 Oct) | 17 Oct 2026 | A2 Draft v2 (Deliverables text); `deliverable-2-changelens`: `ChangeLens-proto/Packages/com.raphaelbyun.changelens/CHANGELOG.md` (Unreleased, committed tier only); `deliverable-1-ux-study`: `deliverable-1/design-spec-outline.md` (RS6, RS7) | None recorded yet | |
| D4 | Every claim scored against each commit's diff, "read by hand" | Both weeks scored by two independent AI scorers. Raphael's own hand check is open. In SE1 it starts with every Version B row and every row an AI scorer marked C | 12–13 Oct 2026 | `deliverable-4-fidelity-check`: `study/week1-2021-02-08/FIDELITY-RESULT.md`; `deliverable-2-changelens`: `GENAI-EVIDENCE.md` (D4 row) | None recorded | |
| D5 | "Nine 45-minute sessions including the pilot" | No reader sessions. The eight readers, the pilot, the six think-alouds and the counterbalanced sequences are dropped. The evaluation that replaces them (SE1 to SE4) is described in the report, Evaluation > Method | 17 Oct 2026 | `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (section 1) | Raphael's decision, 17 Oct; see the report, Evaluation > Method | |
| D5 | "six think-alouds coded from timestamped notes" | No think-alouds. A needs log is written during the SE2 reads and coded with the same Ko et al. (2007) codebook and blind re-code | 17 Oct 2026 | `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (SE2) | The 17 Oct decision; see the report, Evaluation > Method | |
| D3 | The ten-need sheet: readers tick whether the records could answer each question | Each question is answered from the page for a held-out week, and each answer is checked against the git log | 17 Oct 2026 | `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (sections 1 and 3) | The 17 Oct decision; see the report, Evaluation > Method | |
| D3, D5 | Sessions with "briefing and consent"; no ethics step in the plan | An ethics application was researched and drafted (14 Oct), then not pursued. Since 17 Oct the consent form and session safeguards are not used (see the report, Evaluation > Method). The report discusses the ethics points that still apply: tool misuse, accurate reporting of SS3D contributors' work, and AI use | 14 and 17 Oct 2026 | `deliverable-3-instruments`: `deliverable-3/ethics/README.md` (top note), `deliverable-3/ethics/report-ethics-points.md`; `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (section 8) | 17 Oct: the unit guide sets no ethics requirement; see the report, Evaluation > Method | |
| D3 | "both piloted in Week 11" | No pilot (see the report, Evaluation > Method) | 17 Oct 2026 | `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (section 1) | The 17 Oct decision | |
| D6 | "All six items and both coding arms reported with agreement; claims traceable to appendices" | The analysis tool and the Evaluation skeleton were rebuilt (see the report, Evaluation > Method). The coding arms become the needs-log coding, pass 1 against a blind pass 2. No AI second scorer (Raphael, 26 Oct, `9a12294`). The items are committed at `0d3f811` | 17 and 26 Oct 2026 | `deliverable-6-evaluation-report`: `deliverable-6/README.md`, `deliverable-5-sessions`: `deliverable-5/self-evaluation-plan.md` (sections 3 and 6), commit `9a12294` | The 17 Oct decision; 26 Oct: Raphael's answer recorded in `9a12294` | |
| D7 | "two outside viewers can state its purpose and reader" | Dropped. The two-viewer test is retired and an optional self-check on the rough cut replaces it | 17 Oct 2026 | `deliverable-7-portfolio-video`: `deliverable-7/README.md`, `deliverable-7/retired/feedback-form.md` | The 17 Oct decision; see the report, Evaluation > Method | |
| D8 | "A dated entry each week" | No entries in Raphael's own words yet. A template, a fact log, an hours log, diary draft v0.3 built from commit facts and a draft contribution ledger exist | 17 and 26 Oct 2026 | `deliverable-8-dev-diary`: `deliverable-8/README.md`, `deliverable-8/diary-draft-v0.3.md`, `CONTRIBUTIONS.md` (commits `c1df9d2`, `cc37123`) | None recorded | |

## Running the checks

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
