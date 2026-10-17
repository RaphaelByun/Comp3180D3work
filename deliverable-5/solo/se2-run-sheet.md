# SE2 run sheet: timed self-read of the two reserve weeks

Plan section 3, SE2. This is the core of the evaluation. You read each reserve week in both versions and answer from the page alone. Scoring against the git log comes later, on Thu 22 Oct (`how-to-score.md`).

## Fixed before you start

The order is fixed now. Do not change it after you have seen a page.

| Day | Week | Code | First read | Second read |
| --- | --- | --- | --- | --- |
| Tue 20 Oct | 14 Dec 2020 | RX | A (baseline), `RX-A1` | B (treatment), `RX-B2` |
| Wed 21 Oct | 27 Sep 2021 | RY | B (treatment), `RY-B1` | A (baseline), `RY-A2` |

Before Tue 20 Oct, check these are done and committed:

- [ ] Plan section 5 filled: key accepted, rule chosen, `key_ru_class` for all ten needs, reserve weeks opened before (yes or no).
- [ ] Item key hashes in plan section 5, or "no items" written there.
- [ ] The item question sheets for both weeks are in hand (only if items were approved). The keys are **not** in the repo.
- [ ] The CSVs from `logs/` are copied into `deliverable-6/data/`.

## Materials

- The four pages on `deliverable-2-changelens` at `d9fa4bf`:
  - `study/reserve/2020-12-14/report-A-baseline.md` and `report-B-treatment.md`
  - `study/reserve/2021-09-27/report-A-baseline.md` and `report-B-treatment.md`
- Open only the page you are reading. Use a Markdown preview or paper, with the same font and size for A and B.
- One copy of `se2-answer-sheet-template.md` per read, saved as `deliverable-6/data/se2-answers-<week>-<version>.md`.
- A phone stopwatch with laps.
- Confidence scale: 1 = a guess, 2 = unsure, 3 = fairly sure, 4 = sure, 5 = certain.

## Steps, per week (one sitting, about 45 minutes)

### First read

1. Write the date, `read_id`, `seen_before` and start time in `se2-reads.csv`. Open the first page only.
2. **Items** (only if they exist). Answer all six on the answer sheet. Lap the stopwatch per item. Give a confidence for each. "The report doesn't say" is a valid answer.
3. **Ten needs.** For each need, write your answer about this week from the page. Tick what the page gave: `F` fully, `P` partly, `N` not. Add a confidence and lap the time.
4. **Stand-up draft** (3 minutes). Write a two-minute stand-up update from the page. There is no think-aloud; you write it alone.
5. **Needs log.** Each time the page leaves you needing something, write one line in `se2-needs-log.csv`: a new `segment_id`, `SELF`, the clock time, the `read_id`, and the note. One need per line. Do not code it yet.
6. **Ratings.** Before any git log, rate this read from 1 (low) to 5 (high): `ease`, `useful`, `would_send`. Add one line on why in `rating_why`.
7. Write the end time and minutes in `se2-reads.csv`. **Commit** the answer sheet, `se2-reads.csv` and `se2-needs-log.csv`. **Do not open the git log yet.**

### Break

8. Five minutes away from the screen.

### Second read

9. Open the second version. For each item and need, mark only what changes: a new answer, a changed answer, or (on RY) an answer the A page no longer supports. Use `new`, `changed`, `lost` or `same`.
10. Lap times and confidence as before. Write the ratings again. Add any new needs-log lines with the second `read_id`. No stand-up draft on second reads.
11. **Commit.**

## After both weeks

- The diary entry for the Create goal (an unfamiliar week) is written the same day as a first read, straight after it. Not before SE2.
- Log the minutes for each sitting in `deliverable-8/hours-entries.csv`.
- Score on Thu 22 Oct with `how-to-score.md`.

## If something goes wrong

| Problem | Do |
| --- | --- |
| You opened a page or export early | Write it in `seen_before` and `note`. Keep going. Do not hide it |
| You were interrupted | Count it in `interruptions`, stop the clock, and say what happened in `note` |
| You opened the git log before committing | Stop. Write it in `note`, and report it in Method |
| You ran out of time | Stop. Leave the rest blank. Blank is `NA`, not wrong |
