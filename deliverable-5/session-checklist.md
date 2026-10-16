# Day-of session checklist (45 minutes)

One copy per session. Print it. The timings are the A2 plan: 5 + 12 + 12 + 6 + 10 = 45.

**Master document:** how a session runs (every word you say, the prods, the term replies, the three-follow-up selection rule, the counterbalancing sequences) is `deliverable-3/session-protocol.md`. This checklist only tells you where you are in that script and what to record. If the two ever differ, D3 wins; fix this file.

Readers R07 and R08 in the tracker skip the think-aloud and finish at 35 minutes (sequence S1 to S4 and think-aloud yes/no are in `booking-tracker.csv`, from D3 section 3).

## Before the day (once)

- [ ] Fidelity check passed for both study weeks (Deliverable 4: none contradicted, 90% of claims supported). No session before this. The scored files and `study/week1-2021-02-08/FIDELITY-RESULT.md` are on the `deliverable-4-fidelity-check` branch (July PASS for A and B; February A 15/15, B 39/39 after the repair and re-score); Raphael checks the AI-assisted scoring by hand himself (17 Oct).
- [ ] Instruments final and piloted (Deliverable 3): six items per week, fixed-answer sheet, ten-need sheet, think-aloud prompt, proxy scenario.
- [ ] Consent form brackets filled (contact, withdrawal date, storage; `deliverable-3/participant-info-and-consent.md`), then the information sheet, consent form and briefing script printed.
- [ ] Marking key for the ten needs written and dated (before any reader sheet is seen).
- [ ] Booking tracker updated with slots; each reader's sequence (S1 to S4, `deliverable-3/session-protocol.md` section 3) tells you which report goes first.
- [ ] Floor is five readers in total (decided 14 Oct): keep recruiting until R05 has finished, then fill R06 to R08 if you can. Target dates and the fallback date are in the catch-up plan in `README.md` (think-aloud readers R01 to R06 by Thu 29 Oct).
- [ ] The pilot participant (P0) is someone who will not be a reader later.

## Per session: before the reader arrives (10 min)

- [ ] Look up the reader's code and sequence S1 to S4 in `booking-tracker.csv` (sequences are `deliverable-3/session-protocol.md` section 3). Reader code: ______ Sequence: ______
- [ ] Print the right reports in the right order (A = baseline, B = treatment; W1 = 8 to 14 Feb 2021, W2 = 19 to 25 Jul 2021). First: ______  Second: ______
- [ ] Item sheets for each week; ten-need sheet; blank note sheet with time column; blank stand-up draft sheet (think-aloud readers).
- [ ] Scenario: **proxies read `deliverable-3/proxy-scenario.md`; producers are briefed verbally with the same one-line context** (D3 script 2.1). Print the scenario for every session in case the reader turns out to be a proxy; the role is recorded on arrival, not pre-assigned.
- [ ] Pens, timer (visible to you, not to the reader), water.
- [ ] If remote: screen-share set, reports in separate files named only 1 and 2 (no "treatment" or "baseline" in file names).

## Run of show

| Min | Block | Say / do | Record |
|---|---|---|---|
| 0 to 5 | Briefing and consent | D3 script 2.1 word for word. Get consent (signed sheet or spoken yes, noted). Proxy: hand over the scenario. Producer: say the one-line context | Consent yes/no, role (producer or proxy) written in the note-sheet header on arrival, time started |
| 5 to 17 | Report 1 (12 min) | D3 script 2.2 word for word. Do not explain the report or the tool | Time they finished; answers verbatim on the sheet; items skipped |
| 17 to 29 | Report 2 (12 min) | D3 script 2.3 | Same |
| 29 to 35 | Ten-need sheet (6 min) | D3 script 2.4. During the last minutes pick the three follow-up needs with D3's rule in 2.4 (items where the tick differs from the key, in sheet order; if fewer than three differ, add the lowest-numbered items not yet chosen). Never show the key | The sheet itself (keep the original); the three numbers on the note sheet |
| 35 to 41 | Think-aloud stand-up draft (6 min), think-aloud readers only | D3 script 2.5 | Timestamped notes (tags in D3 section 5), each prod with its clock time |
| 41 to 45 | Follow-up on three classifications (4 min), think-aloud readers only | D3 script 2.6 | Timestamped notes, FU-n tag |
| 35 or 45 | Close | D3 script 2.7 | Time ended; anything unusual |

Prods, term replies and what not to say are all in D3 (2.2 for content and term questions, 2.5 and 2.6 for the neutral prods). Do not use your own wording.

## Right after the reader leaves (5 min, same day)

- [ ] Score items 1 to 5 as 0, 1 or 2 with `deliverable-3/answer-key-and-scoring.md`; code item 6 as Pass, Hedged or Over-claim (it is not scored); tick S on items 4 and 5 if the answer used a name only Version B shows. Blind to version where you can.
- [ ] Enter scores in `deliverable-6/data/item-scores.csv` (participant, role, condition, week, order, item, score, specific). Item 6 goes in as the category word. First time only: copy the header-only templates from `deliverable-6/analysis/templates/` into `deliverable-6/data/`.
- [ ] Enter the ten-need sheet in `deliverable-6/data/need-classifications.csv` (participant, need_id, class, and the T, R or U source the reader circled in the `records` column).
- [ ] Copy the think-aloud notes into `deliverable-5/think-aloud-coding-sheet.csv` (one row per utterance, verbatim as noted). Do not code yet; pass-1 coding happens in a separate sitting.
- [ ] Update the tracker: role, status `done`, date, anything odd.
- [ ] Put original paper sheets in a folder labelled with the code only. Names are never on them.
- [ ] Two lines in your diary notes: what happened, what surprised you (for you to write in your own words). Log the session hours in `deliverable-8/hours-entries.csv`.

## If something goes wrong

| Problem | Do |
|---|---|
| Reader runs out of time | Stop at the minute mark (D3 script warnings); record where they stopped; do not extend |
| Reader asks what a term means | Use the reply in D3 script 2.2 (term list only). Note which term (it is a finding about the page) |
| Reader recognises the game | Note it; keep the data and say so in Method |
| Wrong report order given | Note it, finish the session, mark the reader `order error`, and decide with the sequence counts in mind whether to recruit a replacement |
| Reader withdraws | Delete their sheets; update the tracker; the next person takes the next unused row (D3 section 3) |
| Fewer than five readers | Think-alouds run first and the quantitative arm is reported as descriptive only (floor: five readers in total, `deliverable-3/README.md` decision 5). Decide on Mon 26 Oct (fallback date in `README.md`, catch-up plan); the pilot never counts |
