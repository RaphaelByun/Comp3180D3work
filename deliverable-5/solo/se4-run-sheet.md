# SE4 run sheet: heuristic evaluation on the D1 scale

Plan section 3, SE4. ChangeLens gets the same heuristics, severity scale, tasks and seed week as the four tools in D1, so the report can set it beside Trello, HacknPlan, Jira and GitHub Projects. This is your own hand pass; D1's pass was an AI evaluator. Say that when you compare.

Logs: `deliverable-6/data/se4-heuristic-problems.csv` and `se4-task-outcomes.csv` (headers in `logs/`). About 50 minutes, Wed 28 Oct, after SE3.

## Materials (branch `deliverable-1-ux-study`)

- `deliverable-1/heuristic-coding-sheet.md`: section 1 (Nielsen, 1994, H1 to H10), section 2 (severity scale and "how the scale was applied"), section 4 (tasks T1 to T7 and their time caps).
- ChangeLens on the February study week, `study/week1-2021-02-08`: once in frozen study week mode, once from repository on the same week. This is the week D1 seeded every tool with.
- Use D1 ratings in the comparison only for the severity 3 and 4 findings you have checked in `deliverable-1/CHECK-PACK.md`. Say which.

## Severity scale (D1 section 2, unchanged)

| Rating | Meaning |
| --- | --- |
| 0 | Not a usability problem at all |
| 1 | Cosmetic only; fix if time allows |
| 2 | Minor; low priority |
| 3 | Major; important to fix, high priority |
| 4 | Usability catastrophe; must fix before release |

Apply it as D1 section 2 says. Read that paragraph again before you rate.

## Steps

1. Run T1 to T7 from D1 section 4 on ChangeLens, with D1's time caps. Read each task aloud to yourself, start the timer, and note where you looked first. Log each in `se4-task-outcomes.csv`: `completed` is `Y`, `partly` or `N`.
2. Where a task asks for something ChangeLens does not do by design (for example per-person output in T2, ethics point 3), record the outcome and write "by design" in `note`. Code it as a problem only if the window or page misleads the user about it.
3. After the tasks, go through the window and both page versions once more, heuristic by heuristic. Log each problem with one primary heuristic; put the secondary in the description. Ids run CL-01 upward.
4. Rate severity in one sitting, after all problems are listed.
5. List strengths and "none found" heuristics, as D1 does. Put them in a short note beside the log.
6. If SE3 found the same problem, put the CW task and step in `se3_link`.
