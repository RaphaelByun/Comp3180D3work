# ChangeLens solo evaluation analysis

Inputs: reads=se2-reads.csv, needs=se2-need-answers.csv, items=se2-item-scores.csv, log=se2-needs-log.csv, walk=se3-walkthrough.csv, heur=se4-heuristic-problems.csv, tasks=se4-task-outcomes.csv, d1=d1-problems.csv, d1tasks=d1-task-outcomes.csv

### Table B. Ten needs by read (SE2): git-log result per need (C correct, PC partly correct, W wrong, NA left blank; ? not scored yet; – no row)

| Need | Key (R/U) | RX-A1 | RX-B2 | RX log could answer | RY-B1 | RY-A2 | RY log could answer |
| ---- | --------- | ----- | ----- | ------------------- | ----- | ----- | ------------------- |
| N01  | D         | PC    | PC    | D                   | –     | –     |                     |
| N03  | P         | C     | PC    | N                   | –     | –     |                     |
| N07  | N         | PC    | W     | N                   | –     | –     |                     |
| N08  | N         | C     | W     | N                   | –     | –     |                     |
| N09  | N         | PC    | PC    | N                   | –     | –     |                     |
| N12  | D         | PC    | PC    | D                   | –     | –     |                     |
| N17  | N         | C     | C     | N                   | –     | –     |                     |
| N19  | P         | W     | W     | N                   | –     | –     |                     |
| N25  | P         | PC    | PC    | P                   | –     | –     |                     |
| N26  | P         | C     | C     | N                   | –     | –     |                     |

**Table B (continued). Per read: correct answers out of the needs answered, answers that needed Version B, wrong answers by cause**

| Read  | Correct (C) | PC | W | NA | Not scored | Needed B (only_in_b) | W: misread | W: overclaim | W: page-wrong | W: no cause |
| ----- | ----------- | -- | - | -- | ---------- | -------------------- | ---------- | ------------ | ------------- | ----------- |
| RX-A1 | 4 of 10     | 5  | 1 | 0  | 0          | 1                    | 0          | 1            | 0             | 0           |
| RX-B2 | 2 of 10     | 5  | 3 | 0  | 0          | 1                    | 0          | 3            | 0             | 0           |
| RY-B1 | 0 of 0      | 0  | 0 | 0  | 0          | 0                    | 0          | 0            | 0             | 0           |
| RY-A2 | 0 of 0      | 0  | 0 | 0  | 0          | 0                    | 0          | 0            | 0             | 0           |

Second reads (RX-B2, RY-A2) record change only and are never clean. Compare RX-A1 with RY-B1 only, and say that this mixes version with week. Never add first and second reads together.
A page-wrong cause goes to the SE1 hand-check.

### Table C. Key against observed (SQ1, first reads only): the key's R/U class, what the git log could answer, and the observed class (page gave / git-log result)

| Need | Key (R/U) | RX log | RX observed | RY log | RY observed |
| ---- | --------- | ------ | ----------- | ------ | ----------- |
| N01  | D         | D      | P (F/PC)    |        | –           |
| N03  | P         | N      | N (N/C)     |        | –           |
| N07  | N         | N      | P (P/PC)    |        | –           |
| N08  | N         | N      | N (N/C)     |        | –           |
| N09  | N         | N      | N (N/PC)    |        | –           |
| N12  | D         | D      | P (P/PC)    |        | –           |
| N17  | N         | N      | N (N/C)     |        | –           |
| N19  | P         | N      | N (P/W)     |        | –           |
| N25  | P         | P      | P (P/PC)    |        | –           |
| N26  | P         | N      | N (N/C)     |        | –           |

**Table C (continued). Agreement per week, needs in agreement out of needs with both labels. Kappa (Cohen, 1960) is indicative only: with ten needs it is unstable**

| Week       | Key against observed                              | Key against log                                   | Log against observed (what the page lost from the records) |
| ---------- | ------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| RX (RX-A1) | 4 of 10 (kappa 0.00)                              | 7 of 10 (kappa 0.53)                              | 7 of 10 (kappa 0.44)                                       |
| RY (RY-B1) | 0 of 0 (kappa undefined (no variation in labels)) | 0 of 0 (kappa undefined (no variation in labels)) | 0 of 0 (kappa undefined (no variation in labels))          |

Observed class, fixed before SE2: N = page gave N, or the answer is W or NA; D = page gave F and the answer is C; P = any other mix of F or P with C or PC.
Over-claims (page gave F, answer W): none.

### Table D. Items per read (SE2, SQ2): items 1-5 scored 0, 1 or 2; item 6 coded Pass, Hedged or Over-claim

| Item | Level        | RX-A1      | RX-B2      | RY-B1         | RY-A2         |
| ---- | ------------ | ---------- | ---------- | ------------- | ------------- |
| 1    | L1           | 2          | 1          | –             | –             |
| 2    | L1           | 1          | 0          | –             | –             |
| 3    | L2           | 1          | 2          | –             | –             |
| 4    | L2           | 2          | 1          | –             | –             |
| 5    | L3           | 0          | 0          | –             | –             |
| 6    | U            | Over-claim | Over-claim | –             | –             |
| 1-5  | total        | 6 of 10    | 4 of 10    | 0 of 5 scored | 0 of 5 scored |
| 4-5  | specific (y) | 0 of 2     | 0 of 2     | –             | –             |

Second reads record change only. Never add first and second reads together.

### Figure data. Minutes per read, and need answers by confidence (1 a guess to 5 certain) and git-log result

| Result | Conf 1 | Conf 2 | Conf 3 | Conf 4 | Conf 5 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| C      | 1      | 0      | 4      | 1      | 0      |
| PC     | 0      | 1      | 4      | 3      | 2      |
| W      | 0      | 0      | 1      | 2      | 1      |
| NA     | 0      | 0      | 0      | 0      | 0      |

Minutes per read: RX-A1 10; RX-B2 23; RY-B1 n/a; RY-A2 n/a.
Answers with a confidence and a result: 20. Wrong at confidence 4 or 5: 3.

### Table E. Cognitive walkthrough of the Producer Page window (SE3; Wharton et al., 1994): N answers per question and failure stories by severity

| Task | Steps | Q1 N | Q2 N | Q3 N | Q4 N | Steps failing | Sev 0 | Sev 1 | Sev 2 | Sev 3 | Sev 4 |
| ---- | ----- | ---- | ---- | ---- | ---- | ------------- | ----- | ----- | ----- | ----- | ----- |
| CW1  | 7     | 1    | 1    | 1    | 0    | 2             | 0     | 0     | 1     | 1     | 0     |
| CW2  | 3     | 0    | 1    | 1    | 1    | 3             | 0     | 1     | 2     | 0     | 0     |
| CW3  | 3     | 0    | 0    | 1    | 0    | 1             | 0     | 0     | 1     | 0     | 0     |
| CW4  | 3     | 1    | 0    | 2    | 1    | 3             | 0     | 0     | 1     | 2     | 0     |
| CW5  | 3     | 0    | 0    | 0    | 1    | 1             | 0     | 0     | 1     | 0     | 0     |
| All  | 19    | 2    | 2    | 5    | 3    | 10            | 0     | 1     | 6     | 3     | 0     |

### Table F. Heuristic problems by severity (SE4; Nielsen, 1994, on the D1 scale): ChangeLens beside the D1 tools

| Severity   | ChangeLens | Trello         | HacknPlan      | Jira          | GitHub Projects |
| ---------- | ---------- | -------------- | -------------- | ------------- | --------------- |
| Severity 0 | 0          | 0 (0 checked)  | 0 (0 checked)  | 0 (0 checked) | 0 (0 checked)   |
| Severity 1 | 6          | 3 (0 checked)  | 4 (0 checked)  | 0 (0 checked) | 0 (0 checked)   |
| Severity 2 | 13         | 10 (0 checked) | 13 (0 checked) | 7 (0 checked) | 8 (0 checked)   |
| Severity 3 | 5          | 3 (0 checked)  | 9 (0 checked)  | 1 (0 checked) | 2 (0 checked)   |
| Severity 4 | 0          | 0 (0 checked)  | 1 (0 checked)  | 0 (0 checked) | 0 (0 checked)   |
| Total      | 24         | 16 (0 checked) | 27 (0 checked) | 8 (0 checked) | 10 (0 checked)  |

**Table F (continued). Problems by primary heuristic**

| Heuristic | ChangeLens | Trello        | HacknPlan     | Jira          | GitHub Projects |
| --------- | ---------- | ------------- | ------------- | ------------- | --------------- |
| H1        | 4          | 2 (0 checked) | 6 (0 checked) | 1 (0 checked) | 3 (0 checked)   |
| H2        | 7          | 1 (0 checked) | 1 (0 checked) | 2 (0 checked) | 2 (0 checked)   |
| H3        | 0          | 1 (0 checked) | 2 (0 checked) | 0 (0 checked) | 1 (0 checked)   |
| H4        | 4          | 3 (0 checked) | 3 (0 checked) | 1 (0 checked) | 0 (0 checked)   |
| H5        | 3          | 1 (0 checked) | 3 (0 checked) | 1 (0 checked) | 3 (0 checked)   |
| H6        | 1          | 3 (0 checked) | 2 (0 checked) | 0 (0 checked) | 1 (0 checked)   |
| H7        | 1          | 2 (0 checked) | 4 (0 checked) | 2 (0 checked) | 0 (0 checked)   |
| H8        | 2          | 0 (0 checked) | 4 (0 checked) | 1 (0 checked) | 0 (0 checked)   |
| H9        | 1          | 3 (0 checked) | 2 (0 checked) | 0 (0 checked) | 0 (0 checked)   |
| H10       | 1          | 0 (0 checked) | 0 (0 checked) | 0 (0 checked) | 0 (0 checked)   |

**Table F (continued). Tasks T1 to T7: completed Y, partly or N**

| Task | ChangeLens | Trello         | HacknPlan | Jira           | GitHub Projects |
| ---- | ---------- | -------------- | --------- | -------------- | --------------- |
| T1   | partly     | partly         | partly    | partly         | partly          |
| T2   | N          | Y              | Y         | Y              | Y               |
| T3   | partly     | partly         | partly    | Y / partly     | partly          |
| T4   | N          | Y              | partly    | Y              | partly          |
| T5   | partly     | N (not tested) | N         | N (not tested) | Y               |
| T6   | partly     | Y / partly     | N         | Y / partly     | partly          |
| T7   | partly     | partly         | N         | partly         | partly          |

D1's pass was run by an AI evaluator. Use a D1 rating only where Raphael has checked it ("checked"), and say which.

WARNING: task outcome Trello T5: completed "N (not tested)" is not Y, partly or N (D1's values). Kept as typed.
WARNING: task outcome Trello T6: completed "Y / partly" is not Y, partly or N (D1's values). Kept as typed.
WARNING: task outcome Jira T3: completed "Y / partly" is not Y, partly or N (D1's values). Kept as typed.
WARNING: task outcome Jira T5: completed "N (not tested)" is not Y, partly or N (D1's values). Kept as typed.
WARNING: task outcome Jira T6: completed "Y / partly" is not Y, partly or N (D1's values). Kept as typed.

### Table G. What the page left unmet (SE2 needs log): entries by Ko et al. (2007) information type (final code after resolution, else pass 1; 0 with a final code; 0 entries)

No rows.

Types never coded: c1, c2, c3, s1, s2, s3, b1, b2, b3, r1, r2, u1, u2, u3, d1, d2, d3, d4, a1, a2, a3.
Entries with pass 1: 0. Re-coded blind in pass 2: 0. Pass 1 against pass 2: 0 of 0 in agreement. No kappa: with a handful of re-coded lines and 24 codes it would mean nothing.
Entries where the passes differ: none.
The log holds typed notes written alone after reading, not spoken think-aloud comments.

### Table H. Ratings and stand-up per read (SE2): ratings 1 (low) to 5 (high), written before scoring

| Read  | Date       | Seen before | Minutes | Ease | Useful | Would send | Why                                                                                                                                                                                                           | Stand-up S | Stand-up C | Stand-up U |
| ----- | ---------- | ----------- | ------- | ---- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- | ---------- |
| RX-A1 | 2026-11-06 | n           | 10      | 5    | 3      | 3          | ease: it was easy for me to read it / useful: it is useful but never told me the reason why these commit happend / would_send: i do think it is sendable to people who is like me who is a none tech person   | 6          | 0          | 1          |
| RX-B2 | 2026-11-06 | n           | 23      | 3    | 4      | 2          | If i was a producer then no I will highly likly not send it over, i would summerise it and send each of them a speicalised parts for their role. the coding team does not need to know what the art team did. |            |            |            |
| RY-B1 | –          |             |         |      |        |            |                                                                                                                                                                                                               |            |            |            |
| RY-A2 | –          |             |         |      |        |            |                                                                                                                                                                                                               |            |            |            |

Stand-up claims are checked against the git log on first reads only (S supported, C contradicted, U unclear).

---
Raw counts only, no p-values. These tables show what the page holds and where it fails.
