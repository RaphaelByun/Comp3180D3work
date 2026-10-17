# SE1 run sheet: fidelity hand-check

Plan section 3, SE1. The check shows every page used tells the truth about the commits. A2 asked for every claim "read by hand"; the AI scorers' verdicts are checked here, not trusted. Run it after SE2 is scored.

Log: `deliverable-6/data/se1-fidelity-handcheck.csv` (header in `logs/`).

## Materials (branch `deliverable-4-fidelity-check`)

| Week | Blank checklists | Scored files (open only at step 4) |
| --- | --- | --- |
| February, `W1-2021-02-08` | `study/week1-2021-02-08/fidelity-A.md`, `fidelity-B.md` | `fidelity-A-scored-scorer1.md`, `fidelity-A-scored-scorer2.md`, `fidelity-B-scored-scorer1.md`, `fidelity-B-scored-scorer2.md`, `fidelity-B-rescore-repaired-rows.md`, `FIDELITY-RESULT.md` |
| July, `W2-2021-07-19` | `study/week2-2021-07-19/fidelity-A.md`, `fidelity-B.md` | `fidelity-A-scored.md`, `fidelity-B-scored.md` (one scorer only) |
| Reserve, `RX-2020-12-14` and `RY-2021-09-27` | Only after SE2 is scored, and only once D4 has regenerated them from `d9fa4bf` | The AI scorer's file, when it exists |

Ground truth: `study/<week>/export/log.txt`, `export/assets.patch`, `export/guids.txt`, and `git show <hash>` in `prototype-data/SS3D`.

## Steps

1. Open the blank checklist for one week and version. Do not open the scored files yet.
2. For each row, open the diff. Write `S` (supported), `C` (contradicted) or `U` (unclear) in `raphael_verdict`, and the row's minutes.
3. Do at least: every Version B row (39 in February, 28 in July) and every row any AI scorer marked `C`. Add the Version A rows (15 and 14) if time allows. Write in `note` which rows you did.
4. Commit. Then open the scored files and copy each AI verdict into its column. `ai_rescore_verdict` is only for February B rows 19, 21, 22, 23, 27 and 33.
5. Fill `agree_with_ai`: `y` if your verdict matches every AI verdict on the row, `n` if not. Where you differ, re-read the diff once and write the reason in `note`.
6. Do not change `raphael_verdict` after step 4. A changed mind goes in `note`.
7. Reserve weeks (after SE2 scoring): an AI scorer scores the regenerated checklists. You hand-check every `C` verdict and every row that bears on an SE2 answer you scored `W`.

## Pass rule (A2)

A week and version passes when no claim is contradicted and at least 90% are supported. Give the count beside the percentage.

| Day | Rows | Minutes |
| --- | --- | ---: |
| Fri 23 Oct | February B (39) and every C verdict | 45 |
| Sat 24 Oct | July B (28); reserve-week C verdicts | 45 |
| If time | February A (15), July A (14) | 20 |
