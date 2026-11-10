# SE4 heuristic evaluation of ChangeLens: strengths, none found, method note

Seed: SS3D week of 8–14 February 2021 (`study/week1-2021-02-08`), once as a frozen study week and once from the repository (`prototype-data/SS3D`, 2021-02-08, 7 days). The July study week was also read for the page sections. Problems are in `se4-heuristic-problems.csv` (CL-01 to CL-24; severity 3: 5, 2: 13, 1: 6, 4: 0).

## Method note

- **Evaluator.** One AI evaluator (Claude, Claude Code) ran this on 7 Nov 2026 at Raphael's request. That is the same kind of evaluator as the D1 pass. One evaluator finds only a minority of problems (Nielsen & Molich, 1990), so treat the list as a sample, not an inventory. Disclose it in the GenAI statement.
- **Inspection, not hands-on.** The Unity Editor was not operated. The window was judged from its source (`ProducerPageWindow.cs` and the export/report code), the docs (TRY-CHANGELENS.md, the package README), the four figures, and real output. For that output, the window's Generate and status logic was copied into a scratch .NET driver that runs the same package code. It built both pages for 2021-02-08 and 2021-07-19 and showed the actual messages for a bad date, a missing folder, a folder that is not a git repository, and an empty week. The figures come from an earlier build: their hint text differs slightly from the current source.
- **No timings.** All `seconds` are NA. Where the answer is first found is a judgement from the layout, not an observation.
- **Same scale as D1.** The scale is D1 §2, applied as written: 4 blocks the core weekly task or loses data, 3 makes a task fail or mislead or is met on most visits with no workaround, 2 costs time or causes a recoverable slip, 1 is cosmetic. All severities were rated in one pass at the end. Things ChangeLens does not do by design (per-person output, tracker status) are recorded as task outcomes, not coded as problems.

## Strengths

- **H1 Visibility of system status.** After Generate, a status box gives the title and counts ("SS3D week of 2021-07-19: 7 changes, 39 file changes."). It is blue for success and red for errors. The page header repeats the counts in a single line.
- **H2 Match with the real world (page).** The page is written in plain producer terms: "What changed", "Where the work went", "Change (as its author described it)", "Largest area this week". The areas are named Code, Scenes and prefabs, Art and Audio. ".meta" is pushed down to a "Supporting files" line. "File change" is defined on the page. Some Unity terms are translated ("UI layout", "physics body", "position/rotation/scale").
- **H4 Consistency.** Everything above the B section is identical in both versions. Weeks are cut at midnight UTC, so the same week gives the same page wherever and whenever it is run (July from the repository matched the saved pages exactly). The two Browse buttons behave the same way.
- **H5 Error prevention.** A hint line under the date gives the format and an example, and "Week starts" has a tooltip. Days defaults to 7. Save stays disabled until a page exists. Both modes check the folder before running anything.
- **H6 Recognition rather than recall.** The repository path, week start and saved-week folder are remembered between sessions (EditorPrefs). Browse dialogs remove the need to type paths. In Version B, prefabs with identical changes are grouped ("9 prefabs with the same changes: ..."), and each entry quotes the change title it came from.
- **H7 Flexibility and efficiency.** Any start date and 1–31 days can be chosen, not only the last week. A repository or a saved week can be opened from the same window. Switching A/B redraws at once without regenerating.
- **H8 Aesthetic and minimalist design.** Version A fits on about one screen: header, one four-row table, one changes table.
- **H9 Error recovery.** The bad-date message is short, plain and shows the right form ("Week start must look like 2021-07-19."), and fixing the field and pressing Generate recovers fully (CW5). A missing folder message names the path. An empty week says "No commits found for that week. Check the dates and the repository." and does not crash.
- **H10 Help and documentation.** Hint lines sit under the inputs. A hands-on guide exists (TRY-CHANGELENS.md), even though it is written for an evaluator.

## None found

- **H3 User control and freedom.** No problem is coded to H3 as the primary heuristic. The A/B toolbar and the source toolbar switch back and forth freely, and dialogs can be cancelled. H3 appears as a secondary heuristic in CL-05 (no undo after an overwrite) and CL-22 (no cancel during a git run).
