# A3 Evaluation section: skeleton (about 1000 words)

Status: skeleton only. No findings are written here, and none should be until the sessions are run and `analyse.js` has been run on the real CSVs. Every `[PLACEHOLDER]` says what evidence goes there. Delete this note and all placeholder text before submitting.

Word budget (template guide): RQ and opening about 60, Target Audience about 60, Method up to 200, Results and Discussion about 700. Only the 2500-word total for the whole report is penalised.

---

## 3 Evaluation

**Opening: primary research question** (about 60 words; quote it verbatim from A2)

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

[PLACEHOLDER: one sentence saying the study tests it two ways, as in A2: Sub-question 1 (which artefact could supply each of ten needs; eight readers sort them) and Sub-question 2 (does naming the changed scenes and prefabs help a reader understand the week?). Add one sentence naming which of utility, usability or UX the study assesses; the template wants one named. Likely: utility of the report for the producer, with usability notes from the think-alouds.]

### 3.1 Target Audience (about 60 words)

[PLACEHOLDER: who the reader is (a game producer who plans and tracks work without opening the codebase) and why, in industry terms. Evidence: the job-advertisement result. A2 Appendix A had six of nine employers asking for progress reporting; replace it with the Deliverable 1 coded scan (ten ads, five reviews) if D1 finished. One clause on proxies: COMP3151 teammates briefed into the role, and what that gives up.]

### 3.2 Method (200 words or fewer)

| Part | What to say | Evidence source |
|---|---|---|
| Design | Within-subjects. Each reader reads two ChangeLens reports for different SS3D weeks, one with names (treatment, Version B) and one without (baseline, Version A). Week and order counterbalanced across four cells. | `deliverable-5/booking-tracker.csv` (cells), `study/*/report-A-baseline.md`, `report-B-treatment.md` |
| Participants | [PLACEHOLDER: N readers analysed, how many producers and how many proxies, which classes recruited from, pilot excluded. Real numbers only, from the tracker.] | tracker, consent log |
| Instruments | Six items per week scored against fixed answers (Endsley's three levels; item 6 is unanswerable); ten-need sheet; think-aloud prompt. Link to the appendices. | Appendix A |
| Procedure | 45 minutes: 5 briefing and consent, 12 per report, 6 on the ten-need sheet, 10 think-aloud for six readers. [PLACEHOLDER: when and where the sessions ran, in prac or not, remote or on campus.] | session checklist |
| Fidelity check | One sentence: both weeks' reports were checked claim by claim against the diffs before any session; state the Deliverable 4 result. | `fidelity-*` files |
| Analysis | Item means with raw counts, treatment-minus-baseline difference per reader, per-week baseline scores, percentage agreement and per-reader Cohen's kappa against my key, and think-aloud codes against Ko et al.'s (2007) 21 types with a quarter re-coded after a week. | `analysis/analyse.js` output |
| Deviations | [PLACEHOLDER: anything that changed from A2: fewer than eight readers, a reserve week used, a session shortened. Say it here; honesty is marked.] | diary, tracker notes |

### 3.3 Results and Discussion (about 700 words)

Plan the 700 words as five short blocks, each with one piece of integrated evidence. Lead with the answer to the research question, then the evidence.

1. **Answer first** (about 80 words). [PLACEHOLDER: one or two sentences answering the RQ in plain words: which needs the artefacts could supply, which they could not, and whether the names helped. Write it last, from the numbers.]

2. **Sub-question 1: ten-need sheet** (about 180 words). Evidence: Table 1, my key (D / P / N) beside the count of readers who matched it for each need. [PLACEHOLDER: agreement as a raw count per reader (for example "7 of 10"), the per-reader kappa range, and the needs where readers departed from the key. Each departure is a finding about what the artefacts cannot say; name two or three.] Limit to state: over ten items these are indicative, not inferential, and kappa swings widely.

3. **Sub-question 2: comprehension items** (about 220 words). Evidence: Figure 1, each reader's treatment-minus-baseline difference over the five scored items (a dot plot, one dot per reader, producers and proxies marked differently), and Table 2, full-mark counts per item by condition. [PLACEHOLDER: how many readers scored higher, the same and lower with names; which items moved (watch the Level 3 item about what to test next); item 6, how many over-claimed from the page.] Limits to state: eight readers show direction and failure points, not significance; proxies strip a real producer's context, so the difference is an upper bound.

4. **Rival explanation: week difficulty** (about 60 words). Evidence: per-week baseline scores from `analyse.js`. [PLACEHOLDER: baseline means for each week and the gap; say whether the gap is smaller or larger than the treatment difference.]

5. **Think-aloud: what the page leaves a reader needing** (about 160 words). Evidence: Table 3, counts of coded segments by Ko et al. information type, and two or three short quotes. [PLACEHOLDER: the types coded most often; whether the unmet needs point to "why" and rationale (Whitson's opacity prediction) or to who and when; coding agreement between passes as a raw count and kappa, with the size of the re-coded sample.] Limit to state: a quarter re-coded is a small sample.

Close (about 40 words). [PLACEHOLDER: one sentence on what this means for the tool (utility) and one on the biggest limit of the study.]

### Figures and tables to prepare (integrate them in the text, not only in appendices)

- Figure 1: paired differences per reader.
- Table 1: ten needs, key, readers matching.
- Table 2: item full-mark counts by condition (and week).
- Table 3: think-aloud segment counts by information type.
- Optional: the two report versions side by side (reuse the video still).

### Traps to check before submitting

- Raw counts before percentages; no percentage from small n without the count beside it (the A2 marker's note).
- RQ stated first, in the exact A2 words.
- Each claim traceable to an appendix (A to G in `appendix-plan.md`).
- Participants de-identified (codes R01 to R08 only).
- The Evaluation must be a conducted study, not self-assessment: say plainly it had human readers.
