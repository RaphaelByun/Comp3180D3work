# Deliverable 5: Sessions run and coded

Status (13 Oct 2026, Week 10): kit ready; no session has been run, nobody is recruited, no data exists. Nothing here is committed.

A2 success measure (Deliverables table, row 5, 18 h, 4 in prac): **"Nine 45-minute sessions including the pilot (7 h); recruiting and briefing (4 h); six think-alouds coded from timestamped notes (7 h)."** Learning goals: Analyse; Evaluate.

## What is here

| File | What it is |
|---|---|
| `recruitment-message.md` | Spoken and written recruitment text (short, voluntary, 45 minutes), plus checks before sending |
| `booking-tracker.csv` | Nine sessions (pilot P0 and readers R01 to R08) with a blank role column (record on arrival), sequence S1 to S4 (`deliverable-3/session-protocol.md` section 3), report order, think-aloud yes/no, planned week, empty slot and status |
| `session-checklist.md` | Day-of checklist, run of show pointing at the D3 scripts (which are the master for every spoken line, prod, term reply and the three-follow-up rule), after-session steps, what to do when things go wrong |
| `think-aloud-coding-sheet.md` | Codebook with Ko et al.'s 21 information types (confirmed), extra codes, coding rules, and the pass 1 to pass 2 agreement procedure |
| `think-aloud-coding-sheet.csv` | Header-only coding sheet (one row per utterance) |
| `recode-sample.js` | Draws a seeded blind quarter for the re-code after a week, and merges pass 2 back in. Tested on a temporary fake sheet; no data kept |

## Counterbalancing

The counterbalancing is defined once, in `deliverable-3/session-protocol.md` section 3, and this folder uses it unchanged: **sequence S1 to S4 (`deliverable-3/session-protocol.md` section 3)**. W1 = 8 to 14 Feb 2021, W2 = 19 to 25 Jul 2021; A = baseline, B = treatment. Each reader reads both weeks, one in each version.

| Sequence | First report | Second report | Think-aloud draft uses | Tracker rows |
|---|---|---|---|---|
| S1 | W1-B | W2-A | W2-A (baseline) | P0, R01, R06 |
| S2 | W2-A | W1-B | W1-B (treatment) | R02, R05 |
| S3 | W1-A | W2-B | W2-B (treatment) | R03, R08 |
| S4 | W2-B | W1-A | W1-A (baseline) | R04, R07 |

Sequences go out in order of arrival, not by name. The pilot P0 (S1) is excluded from the data. Think-alouds: six readers (R01 to R06; R07 and R08 finish at 35 minutes), which gives 3 baseline and 3 treatment drafts and 3 from each week. Check, R01 to R08: treatment is read first by 4 readers and second by 4; each week is read as treatment by 4 and as baseline by 4.

Role (producer or proxy) is **not pre-assigned**. The tracker's role column is blank; write the role when the reader arrives ("record on arrival"). Proxies read `deliverable-3/proxy-scenario.md`; producers are briefed verbally with the same one-line context (`deliverable-3/session-protocol.md` 2.1).

## Timing (from the A2 timeline)

Recruit at the Weeks 9 and 10 pracs; slots booked by the end of Week 10 (Sun 18 Oct). Pilot and first sessions in Week 11 (19 to 25 Oct), remaining sessions in Week 12 (26 Oct to 1 Nov), analysis in Week 13.

## What Raphael must do

1. Edit the recruitment message into your own voice and send it. Ask Malcolm or Mitchell at the Week 10 prac whether any ethics step is needed (A2 says voluntary and de-identified), and note the answer.
2. Recruit and fill the tracker (codes only; keep names in a private file outside the repo). Book slots by the end of Week 10.
3. Make sure Deliverable 3 (instruments) and Deliverable 4 (fidelity check) are finished before the pilot. The `fidelity-A.md` / `fidelity-B.md` files are blank templates; scored files live on the `deliverable-4-fidelity-check` branch. July scored PASS for A and B. February was scored by two scorers: Version B failed on contradicted claims, the tool was repaired and the changed rows are being re-scored. A2 requires scoring "read by hand", so you must verify the AI-assisted scoring and disclose it.
4. Run the pilot first and fix the instruments before reader 1. The pilot is excluded.
5. Run each session with the checklist; enter scores the same day.
6. Capture think-aloud notes with timestamps, then code them yourself in a separate sitting (pass 1), wait a week, draw the blind quarter, code it (pass 2), merge, and run the agreement check. The coding is your analysis; I have not coded anything.
7. Log your hours against Deliverable 5 (A2 budget 18 h) in `deliverable-8/hours-log.csv`.

## Open questions for Raphael

- **Participant floor (open decision, not yet made; same text as `deliverable-3/README.md` open decision 5).** A2 says both "The floor is five of each" and "below five, think-alouds run first and the quantitative arm is descriptive". **Raphael to decide: five readers in total, or five per report version.** If *five readers in total*: the floor is met after R05 (R01 to R04 cover all four sequences, R05 repeats S2), the quantitative arm runs on those five or more, and the pilot never counts. If *five per report version*, counted as readers whose first report is that version: that needs ten readers (five starting with A, five with B), and R01 to R08 give only four of each, so two more readers must be recruited. Until decided, fewer readers than the floor means think-alouds run first and the quantitative arm is reported as descriptive only. The fallback rule in `session-checklist.md` points here and hard-codes no number.
- Recording: the recruitment text says notes only, no audio. Change it if you want audio, and add consent wording.

## Link to the A2 success measure

Nine sessions (P0 plus R01 to R08): tracker. Recruiting and briefing: recruitment message and checklist. Six think-alouds coded from timestamped notes: coding sheet, codebook and re-code procedure. Agreement is reported by `deliverable-6/analysis/analyse.js`.
