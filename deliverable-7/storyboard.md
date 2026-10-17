# Portfolio video: storyboard (3 to 4 minutes)

Status: plan only. Nothing is recorded. The video is uploaded to **Echo 360** (student video submission instructions), not to the repo; the repo holds only this plan and the feedback form. Link the Echo 360 video in the A3 submission text box and in the report's Project Deliverables section.

A2 success measure: **"Three to four minutes showing both conditions; two outside viewers can state its purpose and reader."**

Audience for the video: a games-industry reader (producer hiring manager, or a marker with no time) who has never seen the project. Make it an industry-ready demonstration of the main deliverable, not a lecture. The wording of narration is yours; each beat below says what the viewer must understand, not what to say.

## Beats (target 3:30 total; hard limits 3:00 to 4:00)

The timings below add up to 3:30 (15 + 30 + 25 + 35 + 35 + 30 + 15 + 15 + 10 seconds).

| # | Time | Beat | What the viewer must get | On screen | Source in repo |
|---|---|---|---|---|---|
| 1 | 0:00 to 0:15 | **The reader** | A game producer plans and tracks the team's work without reading code, and knows the week only from tickets and stand-ups | A producer-style stand-up or ticket board still; your name and role (producer on the COMP3151 team); title card "ChangeLens" | A generic producer board you build yourself (default). Use the Inkform Jira board only if every teammate visible on it agrees in writing; hide names and emails |
| 2 | 0:15 to 0:45 | **The problem** | Most of a game's files are not code, so a code-only view misses most of the week; tickets and commit messages under-report the work | Figure 1 bar chart (code share 7 to 36% of changed-file entries across six Unity repositories, .meta counted as non-code); the "Fix restart bug (#588)" commit touching 35 files across five categories | `figures/fig4-code-file-percentage.png` (confirm it is the six-repository version; older 5repos and refline files sit beside it). The Inkform bar is an aggregate code share for the team repository only, with no names, commits or issues; keep it that way, A2 Appendix C |
| 3 | 0:45 to 1:10 | **What ChangeLens is** | A Unity Editor tool that reads the files a team already produces and writes a one-page report of what changed; nobody has to write anything extra | Screen recording in the Unity 6.4 Editor: **Window > ChangeLens Producer Page**; choose **Frozen study week** and browse to `study/week1-2021-02-08` (or **From repository**, week starts `2021-02-08`, Days `7`); press **Generate**; the page appears | A fresh capture of the Producer Page (not the A2 Figure 2 docked window, which is the older file-sorting prototype); `ChangeLens-proto/` package and `TRY-CHANGELENS.md` on the Deliverable 2 branch |
| 4 | 1:10 to 1:45 | **Condition A: baseline** | What the report says without names: commits, category counts | In the Producer Page, select **Version A (baseline)**, scroll slowly, highlight the "Where the work went" table | Producer Page, Version A; same text as `study/week1-2021-02-08/report-A-baseline.md` |
| 5 | 1:45 to 2:20 | **Condition B: treatment** | The same week, now naming the changed scenes and prefabs (the Unity asset layer); where no name resolves, the file path shows | Flip to **Version B (treatment)** in the same window; zoom on the airlock prefab names (nine airlock prefabs, two commits, one day) | Producer Page, Version B; same text as `study/week1-2021-02-08/report-B-treatment.md`; Figure 3 |
| 6 | 2:20 to 2:50 | **Does it help? (result slot)** | The one-sentence answer from the study, and how sure to be | One slide: one figure (paired differences per reader), counts shown as "x of n readers", the limits line | **Filled only after analysis, Week 13**: `deliverable-6/analysis` output. Until then a grey placeholder card "RESULT SLOT: write after analysis" |
| 7 | 2:50 to 3:05 | **What I did** | Which parts Raphael designed, decided, ran and hand-checked himself, and which parts the AI (Claude Code) drafted | One slide or split screen against repo evidence: commit history on the deliverable branches, the study sessions (reader codes only), the hand fidelity check | Git log of the deliverable branches; `deliverable-5` session records; `deliverable-4` hand fidelity check; the report's GenAI statement. Claim only what this evidence shows. Wording is yours |
| 8 | 3:05 to 3:20 | **What it cannot do and what is next** | Honest limits: says what changed, not why; one reader group; the stretch tier if done. Optional: the page reports changes to the project, not people (no per-person counts or rankings), so it is not a tool to monitor or blame developers. Wording is yours | One slide, three or four short bullets | A2 Study design limits; Deliverable 2 tier status; point 3 of `deliverable-3/ethics/report-ethics-points.md` (Deliverable 3 branch) |
| 9 | 3:20 to 3:30 | **End card** | Who made it, role you are aiming for, where the repo is | Name, repo URL, "Producer / production tools" line, and one AI-use line (for example "Built with Claude Code; see the GenAI statement in the report"; wording is yours) | A3 allows AI use but all use must be cited, explained and evidenced |

Cut order if over 4:00: beat 8 first, then trim beat 2, then beat 1. Never cut beats 4 or 5 (both conditions are the success measure), beat 6 (the evaluation) or beat 7 (your contribution; the HD anchors ask for a clear individual contribution, and unevidenced contribution claims are an F trigger).

## Rules

- Show both conditions on screen long enough to read one row from each (at least 6 seconds each).
- Real tool, real report. No mock-ups. Everything shown must be reproducible from the repo.
- Result slot: use real numbers only. If analysis is not finished by recording time, record everything else and re-record beat 6 alone.
- Participant privacy: no names, faces or voices of readers. Use reader codes if you show anything from sessions. Quotes only if the reader consented to quotes.
- Third-party material: SS3D is open source (name it and cite it); cite any music or images on the end card or in the report's References.
- Captions on; audio clean; screen at 1080p; large fonts (Unity at 125% or more) so text reads on a phone.
- Check Echo 360 upload guidance and the 1-hour technical grace period; upload at least a day before 8 Nov.

## Deck of still frames to capture first (reuse in the report)

1. Figure 1 (code share chart). 2. The ChangeLens Producer Page in the Editor. 3. Report A, "Where the work went" table. 4. Report B, a naming section. 5. The result figure (Week 13). 6. The contribution slide (beat 7).
