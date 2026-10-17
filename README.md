# ChangeLens: COMP3180 A3 final project

> **Draft index for Raphael to edit (17 Oct 2026).** Facts and paths only. The A2 sprint record (17–20 Sep 2026) is kept unchanged under "A2 archive" below. The test count there is the A2 count; on 17 Oct 2026 the ChangeLens suite has 67 tests.

ChangeLens is a Unity Editor tool that writes a one-page weekly change report for game producers. It is evaluated by a reader study with classmates. The plan is the A2 proposal (`A2 — Raphael Byun (v2).pdf`, Deliverables table).

**Portfolio video:** on Echo 360, not in this repository. Link: *(add when uploaded)*.

## Deliverables

Each deliverable has its own branch. A folder named below exists on its own branch.

| # | Deliverable | Branch | Folder | A2 success measure | Status on 17 Oct 2026 | Start with |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | Production-tool UX study and design spec | `deliverable-1-ux-study` | `deliverable-1/` | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994); 10 job ads and five G2 reviews coded; two 20-minute interviews outside the reader pool; 25 needs classified by artefact source | Every step drafted. Heuristic pass run by AI; interviews replaced by six coded published sources. Raphael's spot-checks and acceptance open (`CHECK-PACK.md`) | `deliverable-1/README.md` |
| D2 | ChangeLens Unity Editor package, both conditions | `deliverable-2-changelens` | `ChangeLens-proto/Packages/com.raphaelbyun.changelens/`, `study/`, `tools/changelens-dotnet/` | Generated unedited for every sampled week; 90% of changed files categorised; 60% of changed prefabs and scenes named across the two study weeks | Built. Categorised 104 of 104 (Feb) and 39 of 39 (Jul). Named (strict) 21 of 26 (Feb) and 21 of 24 (Jul). 67 tests pass in the .NET harness | `TRY-CHANGELENS.md` |
| D3 | Evaluation protocol and instruments | `deliverable-3-instruments` | `deliverable-3/` | Six matched items per week, answerable from the report alone, plus the ten-need sheet; both piloted in Week 11 | Drafts; not piloted. Raphael is checking them | `deliverable-3/README.md` |
| D4 | Fidelity check | `deliverable-4-fidelity-check` | `study/*/fidelity-*-scored*.md`, `study/week1-2021-02-08/FIDELITY-RESULT.md` | Two team-weeks scored before any session; one hour reserved for repair | Both weeks scored by AI scorers. July: A 14 of 14, B 27 of 28 supported. February: A 15 of 15, B 39 of 39 after the repair. Raphael's hand check open | `study/week1-2021-02-08/FIDELITY-RESULT.md` |
| D5 | Sessions run and coded | `deliverable-5-sessions` | `deliverable-5/` | Nine 45-minute sessions including the pilot; recruiting and briefing; six think-alouds coded from timestamped notes | Kit ready. No session run, no data. Floor: five readers, pilot excluded | `deliverable-5/README.md` |
| D6 | Evaluation report, instruments, data | `deliverable-6-evaluation-report` | `deliverable-6/` | All six items and both coding arms reported with agreement; claims traceable to appendices | Skeleton, appendix plan and analysis tools tested. No data, no findings | `deliverable-6/README.md` |
| D7 | Portfolio video | `deliverable-7-portfolio-video` | `deliverable-7/` | Three to four minutes showing both conditions; two outside viewers can state its purpose and reader | Plan only. Nothing recorded | `deliverable-7/README.md` |
| D8 | Development diary | `deliverable-8-dev-diary` | `deliverable-8/` | A dated entry each week naming a roadblock or breakthrough | Template, fact log and hours log. No entries yet | `deliverable-8/README.md` |
| D9 | Reflection report | `deliverable-9-reflection` | `deliverable-9/` | All four goals evidenced; hour variances explained | Skeleton and variance-table helper. No reflection yet | `deliverable-9/README.md` |

## Running the checks

From the repository root:

```
dotnet test tools/changelens-dotnet/tests/tests.csproj
```

ChangeLens tests without Unity (branch `deliverable-2-changelens`; 67 pass on 17 Oct 2026). In Unity: Window → General → Test Runner → EditMode → Run All.

```
node deliverable-6/analysis/test.js
node deliverable-6/analysis/analyse.js
```

The analysis tool's checks, then a demo on its labelled fake sample data (branch `deliverable-6-evaluation-report`). `deliverable-6/README.md` gives the command for the real data.

## Sources, licences and AI use

- Study data: taken from SS3D (github.com/RE-SS3D/SS3D). Source commits and licences: `study/SOURCE-AND-LICENCE.md`.
- Generative AI use: `GENAI-EVIDENCE.md` (A2 and A3).

---

## A2 archive (17–20 Sep 2026)

Created Thu 17 Sep 2026 by Claude Code (Fable 5.1 main loop; Opus, Sonnet and Haiku sub-agents); loop rounds ran on Fri 18 Sep and Sat 19 Sep. A2 due **Sun 20 Sep 11:55 pm** (Wed 23 Sep if the short extension is granted). Draft v1 (2 Sep) and its audits live in `School/Unit 3 Sem 2/COMP3180/Working folder/a2-draft-2-sep-2026/` (outside this repository); this repository holds the sprint outputs. **Read `REPORT.md` first.**

| File / folder | What it is |
|---|---|
| `A2 — Raphael Byun (v2).docx` / `.pdf` | The submission candidate (13 pages: 9 of proposal and references, then the GenAI statement and Appendices A–D, uncounted; Appendix D carries the AI-use evidence the spec asks for), built from `A2 Draft v2 — 17 Sep 2026.md`. No placeholders left (Student ID filled 19 Sep; the GenAI statement rewritten plainly and the CONFIRM line removed 20 Sep at Raphael's instruction). Body text is left-aligned since round 14 (20 Sep). |
| `REPORT.md` | Predicted marks per round, what changed, what was built, Raphael's to-do list with minutes, defence notes, remaining risks. |
| `ANSWERS.md` | Raphael's answers to the launch questions (17 Sep). |
| `PROMPT — A2 final sprint (paste into a fresh session).md` | Resumable mission prompt for a fresh Claude Code session. |
| `audit/` | `FINDINGS-v1/v2/v3.md` (the three sprint marking rounds), `FINDINGS-round-1` to `-14.md` (the loop rounds; 7-10 ran on 19 Sep, 11-14 overnight 19-20 Sep), `verified-additions-round-1/4/5/6/7/8/9/10/11/12/13/14.md` (facts and measurements checked on 18-20 Sep; the round 11-14 files carry the delta fact-finders' lists, with `factfinder-round-11..14-raw.md` their full reports), `parse-round.py`, `count-and-pdf.ps1` (Word COM body/cover count plus PDF export), `EDIT-PLAN-v2.md`, raw JSON, every `apply-*.py` edit script, and the as-marked copy of each round's text. |
| `ChangeLens-proto/` | Unity 6000.4.10f1 project; the package is `Packages/com.raphaelbyun.changelens`. 27/27 EditMode tests passed at A2 (67 on `deliverable-2-changelens` on 17 Oct 2026). Two one-off screenshot helpers sit in the Editor folder and can be deleted. |
| `prototype/` | `HOW-IT-WORKS.md` (plain-language walkthrough), `CHANGELOG.md` (commands, logs, the five screenshot passes and the batch export / build-report probe). |
| `prototype-logs/` | Unity create, compile, test and screenshot logs; `tests.xml`. |
| `prototype-data/` | Blobless SS3D clone and the sample week export used by the prototype. |
| `corpus/` | `corpus.py` (one-command re-run), `scan-weeks.py` (ranks SS3D weeks by asset share), `export-week.py` (exports a week for ChangeLens and measures naming presence), `scan-repo.py` (classifies a local repository; used on the Inkform team repo), `plot-fig1.py` (redraws Figure 1 with six repositories), `results.md` / `results.json`, raw figure data. |
| `figures/` | The three figures in the proposal: `fig4-code-file-percentage.png` (Figure 1, six repositories; the earlier five-repository chart is `-5repos.png`), `fig2-changelens-docked-2021.png` (Figure 2, ChangeLens docked in the Unity 6 Editor on the 8–14 February 2021 SS3D week), `fig3-prefab-yaml-hunk.png` (Figure 3); plus the raw captures and the earlier floating-window and package-panel images, unused. |
| `reading/` | `READING-KIT.md` and the downloaded PDFs (Bertram, Ko, Pascarella, Dourish & Bellotti, Maddila, Stray, Whitson 2013 draft). Whitson (2018) is open access at PubMed Central, PMC6256721; the kit says how to read it in 20 minutes. |
| `GENAI-EVIDENCE.md` | Evidence index for the Statement on Generative AI use. |
| `build-docx-v2.js`, `package.json`, `assemble.py` | Markdown → Word builder (figures with width hints, cover, blockquotes, repeated table headers) and the section assembler. Run `npm install` once, then `node build-docx-v2.js <in.md> <out.docx>`. |

Heavily AI-assisted — declared in the proposal's Statement on Generative AI use and itemised in `GENAI-EVIDENCE.md`.
