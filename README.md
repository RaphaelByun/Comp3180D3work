# A2 final sprint — 17–20 Sep 2026

Created Thu 17 Sep 2026 by Claude Code (Fable 5.1 main loop; Opus, Sonnet and Haiku sub-agents); loop rounds ran on Fri 18 Sep and Sat 19 Sep. A2 due **Sun 20 Sep 11:55 pm** (Wed 23 Sep if the short extension is granted). Draft v1 (2 Sep) and its audits live in `../a2-draft-2-sep-2026/`; this folder holds the sprint outputs. **Read `REPORT.md` first.**

| File / folder | What it is |
|---|---|
| `A2 — Raphael Byun (v2).docx` / `.pdf` | The submission candidate (13 pages: 9 of proposal and references, then the GenAI statement and Appendices A–D, uncounted; Appendix D carries the AI-use evidence the spec asks for), built from `A2 Draft v2 — 17 Sep 2026.md`. No placeholders left (Student ID filled 19 Sep; the GenAI statement rewritten plainly and the CONFIRM line removed 20 Sep at Raphael's instruction). Body text is left-aligned since round 14 (20 Sep). |
| `REPORT.md` | Predicted marks per round, what changed, what was built, Raphael's to-do list with minutes, defence notes, remaining risks. |
| `ANSWERS.md` | Raphael's answers to the launch questions (17 Sep). |
| `PROMPT — A2 final sprint (paste into a fresh session).md` | Resumable mission prompt for a fresh Claude Code session. |
| `audit/` | `FINDINGS-v1/v2/v3.md` (the three sprint marking rounds), `FINDINGS-round-1` to `-14.md` (the loop rounds; 7-10 ran on 19 Sep, 11-14 overnight 19-20 Sep), `verified-additions-round-1/4/5/6/7/8/9/10/11/12/13/14.md` (facts and measurements checked on 18-20 Sep; the round 11-14 files carry the delta fact-finders' lists, with `factfinder-round-11..14-raw.md` their full reports), `parse-round.py`, `count-and-pdf.ps1` (Word COM body/cover count plus PDF export), `EDIT-PLAN-v2.md`, raw JSON, every `apply-*.py` edit script, and the as-marked copy of each round's text. |
| `ChangeLens-proto/` | Unity 6000.4.10f1 project; the package is `Packages/com.raphaelbyun.changelens`. 27/27 EditMode tests pass. Two one-off screenshot helpers sit in the Editor folder and can be deleted. |
| `prototype/` | `HOW-IT-WORKS.md` (plain-language walkthrough), `CHANGELOG.md` (commands, logs, the five screenshot passes and the batch export / build-report probe). |
| `prototype-logs/` | Unity create, compile, test and screenshot logs; `tests.xml`. |
| `prototype-data/` | Blobless SS3D clone and the sample week export used by the prototype. |
| `corpus/` | `corpus.py` (one-command re-run), `scan-weeks.py` (ranks SS3D weeks by asset share), `export-week.py` (exports a week for ChangeLens and measures naming presence), `scan-repo.py` (classifies a local repository; used on the Inkform team repo), `plot-fig1.py` (redraws Figure 1 with six repositories), `results.md` / `results.json`, raw figure data. |
| `figures/` | The three figures in the proposal: `fig4-code-file-percentage.png` (Figure 1, six repositories; the earlier five-repository chart is `-5repos.png`), `fig2-changelens-docked-2021.png` (Figure 2, ChangeLens docked in the Unity 6 Editor on the 8–14 February 2021 SS3D week), `fig3-prefab-yaml-hunk.png` (Figure 3); plus the raw captures and the earlier floating-window and package-panel images, unused. |
| `reading/` | `READING-KIT.md` and the downloaded PDFs (Bertram, Ko, Pascarella, Dourish & Bellotti, Maddila, Stray, Whitson 2013 draft). Whitson (2018) is open access at PubMed Central, PMC6256721; the kit says how to read it in 20 minutes. |
| `GENAI-EVIDENCE.md` | Evidence index for the Statement on Generative AI use. |
| `build-docx-v2.js`, `assemble.py` | Markdown → Word builder (figures with width hints, cover, blockquotes, repeated table headers) and the section assembler. |

Heavily AI-assisted — declared in the proposal's Statement on Generative AI use and itemised in `GENAI-EVIDENCE.md`.
