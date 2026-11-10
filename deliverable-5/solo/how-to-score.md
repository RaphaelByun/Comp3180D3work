# How to score

Every scoring rule from plan sections 3, 5 and 6, in the order you use them. If this file and the plan ever differ, the plan wins; fix this file.

Raw counts first, every time. No percentage without its count beside it. No p-values.

## Step 0. Before SE2 (done 21 Oct; see plan section 5)

1. Accept or change the ten-need key in `deliverable-3/ten-need-sheet.md` section B. Write the date in plan section 5.
2. Choose Rule 1 or Rule 2 and say why. The rule only changes the "Overall" columns. It does not change `key_ru_class`.
3. Fill `key_ru_class` for each need: the best of the R and U columns (D beats P beats N). ChangeLens reads no tracker, so the T column is not used.
4. Commit. From here on, `key_ru_class` does not change.

## Step 1. SE2 items (Wed 28 Oct, only if items exist)

1. Open the sealed keys. Check each key's SHA-256 against plan section 5. Write in `note` whether it matched.
2. Score items 1 to 5 as 0, 1 or 2 with `deliverable-3/answer-key-and-scoring.md`.
3. Code item 6 as `Pass`, `Hedged` or `Over-claim`. It is not scored.
4. Tick `specific` (`y` or `n`) on items 4 and 5, as D3 does.
5. Log in `se2-item-scores.csv`, one row per item per read.

## Step 2. SE2 ten needs (Wed 28 Oct)

Open the git log now: `study/reserve/<week>/export/log.txt`, `export/assets.patch`, `export/guids.txt`, and `git show <hash>` in `prototype-data/SS3D`.

For each need on each read, fill `se2-need-answers.csv`:

| Column | Values | Rule |
| --- | --- | --- |
| `gitlog_result` | `C`, `PC`, `W`, `NA` | `C` correct, `PC` partly correct, `W` wrong, `NA` left blank |
| `record_could_answer` | `D`, `P`, `N` | What the git log could answer by hand. Take it from the log, not from the key |
| `error_cause` | `misread`, `overclaim`, `page-wrong`, blank | Only for `W`. `misread`: the page was right and you read it wrong. `overclaim`: the page did not say it. `page-wrong`: the page itself is wrong; carry the row into SE1 |
| `only_in_b` | `y`, `n` | `y` where the correct answer depends on a line only Version B has |
| `key_ru_class` | `D`, `P`, `N` | Copied from plan section 5. Never changed here |

**When the log holds nothing.** Several needs (tasks finished, blocked work, risk, milestone, work left, what to tell a publisher) have no answer in a git log. If you check the log and it holds nothing, then "the page does not say" scores `C`. A specific answer scores `W` with cause `overclaim`.

## Step 3. Stand-up drafts (Wed 28 Oct, first reads only)

Split each draft into separate claims. Check each against the git log: `S` supported, `C` contradicted, `U` unclear. Write the three counts in `se2-reads.csv` (`standup_S`, `standup_C`, `standup_U`).

## Step 4. Needs log pass 1 (Wed 28 Oct)

Code every line of `se2-needs-log.csv` with `../think-aloud-coding-sheet.md`. Pass 2 on the blind quarter is on [date per Raphael's decision] (same file, steps 4 to 8; its step 3 asks for at least 7 days between passes). Agreement is "x of n" only.

## Step 5. AI second scorer: not run

Not run: no AI second scorer (26 Oct, `9a12294`). Leave `se2-second-scorer.csv` blank, and omit `--scorer2` when you run the analysis.

## Step 6. Table C, key against observed (Sat 31 Oct)

Use first reads only (`RX-A1`, `RY-B1`). The observed class for each need is fixed now:

| Observed | When |
| --- | --- |
| D | The page gave `F` and the answer is `C` |
| P | The page gave `F` or `P`, and the answer is `C` or `PC` (any mix other than D) |
| N | The page gave `N`, or the answer is `W` or `NA` |

A `W` after an `F` is also listed as an over-claim.

Give agreement as x of 10 per week, for three pairs: key against observed, key against `record_could_answer`, and `record_could_answer` against observed. The last pair shows what the page lost from the records. Cohen's kappa only as indicative, beside the count; with 10 needs it is unstable.

## Order effect

The A-against-B comparison is the two first reads (`RX-A1` against `RY-B1`). That mixes version with week; say so. Report second reads apart, as change only. Never add first and second reads together.

## SE1, SE3 and SE4

- SE1: the A2 pass rule (none contradicted, at least 90% supported). See `se1-run-sheet.md`.
- SE3: count `N` answers by question (Q1 to Q4) and failure stories by severity.
- SE4: count problems by severity, and T1 to T7 outcomes, beside the D1 tools.

## Tables (plan section 6)

| Output | From |
| --- | --- |
| Table A. Fidelity | `se1-fidelity-handcheck.csv` |
| Table B. Ten needs by read | `se2-need-answers.csv` |
| Table C. Key against observed | Table B, first reads |
| Table D. Items (if they exist) | `se2-item-scores.csv` |
| Figure. Time and confidence | `se2-reads.csv`, `se2-need-answers.csv` |
| Table E. Walkthrough | `se3-walkthrough.csv` |
| Table F. Heuristic problems | `se4-heuristic-problems.csv`, `se4-task-outcomes.csv`, D1 tables |
| Table G. What the page left unmet | `se2-needs-log.csv` |
| Table H. Stand-up and ratings | `se2-reads.csv` |
| Scoring check | Not used (no AI second scorer, 26 Oct) |

`node deliverable-6/analysis/analyse.js` (D6 branch) prints Tables A to H and the scoring check from the CSVs, and `deliverable-6/analysis/figures.js` draws the figure. The commands are in `deliverable-6/README.md`. Check each table against the CSVs by hand.
