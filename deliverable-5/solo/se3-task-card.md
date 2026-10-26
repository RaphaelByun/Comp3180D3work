# SE3 task card: cognitive walkthrough of the Producer Page window

Plan section 3, SE3. Method: the cognitive walkthrough (Wharton et al., 1994). It needs no participants. It asks four set questions about each correct step. It is usually a group method, and here the one evaluator built the tool; this is recorded in plan section 7, not stated in the report.

Log: `deliverable-6/data/se3-walkthrough.csv` (header in `logs/`). About 40 minutes, Thu 29 Oct (after SE1 July B).

## Persona (write it before judging anything)

Based on `deliverable-3/proxy-scenario.md`: a producer who has just joined a small Unity team. They plan and track the work, do not write code, and have the team's Unity project installed only to run tools.

The CSV has no persona column, so write the persona in `deliverable-6/data/se3-persona.md` and commit it before the walkthrough.

Note the tension in the report: the proxy scenario says a producer does not open Unity, but the window lives in the Unity Editor.

## Setup

- Unity project `ChangeLens-proto` on `deliverable-2-changelens` (Unity 6000.4.10f1), opened as in `TRY-CHANGELENS.md`.
- `prototype-data/SS3D` cloned.
- `Window > ChangeLens Producer Page`.
- **Do not use a reserve week here.**

## Tasks

Write each task's correct action sequence first, one row per step, from the window. Judge nothing until all five sequences are written.

| Task | Goal for the persona | Week used |
| --- | --- | --- |
| CW1 | Make last week's page for the team's repository | From repository, `prototype-data/SS3D`, week starting 2021-07-19, 7 days |
| CW2 | Find which scenes and prefabs changed this week | Same page |
| CW3 | Reopen a week that was saved earlier | Frozen study week, `study/week2-2021-07-19` |
| CW4 | Save this week's page to share with the team | Same page |
| CW5 | Recover after typing the date in the wrong form | From repository, date typed as 19/07/2021 |

## Four questions per step (answer `Y` or `N`)

- Q1: Will the user try to achieve the right effect?
- Q2: Will the user notice that the correct action is available?
- Q3: Will the user associate the correct action with the effect they are trying to achieve?
- Q4: If the correct action is performed, will the user see that progress is being made?

## For every `N`

1. Write a failure story: one or two plain sentences on why this user would fail here.
2. Rate it on the D1 severity scale (0 to 4, see `se4-run-sheet.md`).
3. Add a fix idea. Do not fix anything during the walkthrough.
4. If SE4 later finds the same problem, put its CL id in `heuristic_link`.
