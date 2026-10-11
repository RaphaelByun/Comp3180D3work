# Verified additions — round 14 (20 Sep 2026, 08:05)

Sources: the round-11 and round-13 SAFE lists; `verify/reserve.md` (Washburn); `verify/maddila2023.md` and the round-11 fact-finder (Maddila §6.1); a delta fact-finder over the round-13 changes (appended below when it reports).

## SAFE TO WRITE

- **Maddila et al. (2023), §6.1:** "86 out of 119 Nudge comments that are resolved negatively were due to the fact that Nudge did not honor the recent pull request activity" (round-11 fact-finder). "86 of the 119 alerts developers dismissed had fired on pull requests active in the previous day" is a fair gloss: "resolved negatively" = dismissed by developers; the activity window Nudge then adopted is 24 hours.
- **Washburn et al. (2016):** the 155 postmortems are Gamasutra postmortems written by the developers of the games (`verify/reserve.md`, full text read), so "developer-written game postmortems" is safe; "retrospectives record what a team will admit in public" is the student's appraisal, written as such.
- **Stray et al. (2016):** "12 non-game teams" compresses "twelve software teams in three companies" (consulting, telecoms, software; round-11 list); the audience mechanism read as *accepted, not removed* by a producer-addressed report is the student's own correction of the round-13 sentence (Malcolm 14 change 5).
- **Session budget:** 5 + 12 × 2 + 6 + 10 = 45 (round-13 list); consent now sits inside the 5-minute brief.
- **Proxy bias direction:** readers unfamiliar with SS3D lack a real producer's project context, which should favour the version that names scenes and prefabs; reporting the difference as an upper bound is a design statement, no source needed.
- **Fidelity check "against each commit's diff, read by hand":** the SS3D clone holds every diff; pull-request text is not in the clone and is not claimed.
- **Committed tier "turns the working extractor (Figure 2) into the producer-facing page":** Figure 2 shows the prototype running; the producer page and both report versions are unbuilt (REPORT.md defence notes).
- **Body alignment:** `build-docx-v2.js` line 200 set body paragraphs to justified; changed to left-aligned this round because Word does not hyphenate and justified lines were stretching (Malcolm 14 evidence item). A formatting change only.

## DO NOT WRITE

- "pull-request text" as something the fidelity check reads (not in the clone).
- Any new denominator for the 60% naming target (Mitchell 14 change 4 proposes "60% of the changed prefabs and scenes that carry a name"); the target is locked, so the choice is Raphael's.
- Dropping Cohen's kappa (Malcolm 14 change 2): reverses Mitchell's round-12 request; churn.
- The COMP3151 team or producer count: only Raphael knows.


---

# Delta fact-finder, round 14 (Sonnet; diff of as-marked-round-13 vs as-marked-round-14, i.e. the round-13 edits)

34 claims: 32 SUPPORTED, 0 UNSUPPORTED, 0 CONTRADICTED, 2 NOT CHECKABLE (planned work: the G2 reviews and the video measure). Independently re-verified: Ko's types are phrased as questions with sources catalogued separately; Figure 3's image carries the m_Name and guid annotations the new caption describes; the per-commit split for "Fix restart bug (#588)" recounts exactly; the 3 November release date; the 45-minute arithmetic. Two marker-facing notes: readers who do not think aloud finish at 35 minutes; the fidelity paragraph uses "contradicted" and "supported" without restating the three-way scheme. Raw report: `audit/factfinder-round-14-raw.md`. Its lists follow verbatim.

## SAFE TO WRITE

- Ko et al. (2007): "Their 21 information types are each a question, recorded apart from where developers looked" — abstract, `reading\ko2007.pdf` p. 1 ("cataloged the outcome and source when each type... was sought") plus §5's numbered items, all literally phrased as questions (independently re-extracted this round).
- "One company can skew how often a need arises but not what kinds exist, so I take the taxonomy, not the base rates" — Raphael's own methodological reasoning, consistent with Ko et al. being a single-company (Microsoft) study; no citation needed, write as own argument.
- Figure 3 caption: "object names are plain text; component identifiers are GUIDs the AssetDatabase resolves to names" — confirmed against `figures\fig3-prefab-yaml-hunk.png` directly (m_Name row and m_Script/guid row, both annotated accordingly).
- Appendix C, commit `37e22a3` "Fix restart bug (#588)": "35 (13 code, 8 scenes and prefabs, 4 data, 1 art, 9 .meta)" — hand-recounted from `ChangeLens-proto/.../Samples~/ss3d-week-2021-02-08.txt` this round; exact match.
- "readers come from COMP3151 teams building toward their own 3 November release" — `School/CLAUDE.md`, COMP3151 Industry Release Portfolio, due 3 Nov 2026.
- Session budget "5 to brief, 12 per report ×2, 6 for the ten-need sheet, 10 for the think-aloud and follow-up" = 45 minutes — arithmetic verified; consistent with Deliverable 5's "Nine 45-minute sessions (7 h)."
- "I report percentage agreement and, per reader, Cohen's kappa against my marking; over ten items these are indicative, not inferential" — correctly resolves round-13's own flagged ambiguity about pooled vs per-reader kappa; the "indicative, not inferential" caveat is methodologically sound for n=10.
- "The 60% target was set after the first four weeks were measured" — consistent with `verified-additions-round-5.md` and `verified-additions-round-10.md`'s four-week (46/59/88/100%) data, a subset of the current nine-week table.
- The schedule's fidelity check moved to Week 10 — makes Deliverable 4's "scored before any session" unambiguous (sessions start Week 11); Deliverable 3's "both piloted in Week 11" still holds.
- Goal tags "(Evaluate)" on Deliverables rows 3 and 4, and "(Analyse; Evaluate)" on row 5 — each defensibly matches its row's content (instrument-piloting/fidelity-scoring = judging against a standard; think-aloud coding = analysis), following the same approach already validated for rows 1, 2 and 9.
- Sub-question 2 as "tests one artefact against one need" — consistent with the Introduction's explicit two-arm study framing (ten needs × three artefacts, vs. one naming feature × comprehension).

## DO NOT WRITE

- Do not describe "10 job ads and five G2 reviews coded (1 h)" as verified or completed — it is a plan for Deliverable 1's future work, not yet checkable against any source in ROOT. If a marker-facing version needs to look more feasible, consider moving 0.5–1 h from row 5's "recruiting and briefing (4 h)," per the original round-13 critique (`factfinder-round-13-raw.md` line 102), rather than leaving the 1-hour figure unexamined.
- Do not re-add "as supported, unsupported or contradicted" as a defined three-way scheme in the fidelity-check paragraph without also re-adding some pointer to what happens to a failing week — the remedy is currently only implicit, distributed into the risk paragraph's "a contradicted claim repaired." Not a factual error as written, but don't let a future edit delete the risk-paragraph clause without restoring an explicit remedy somewhere.
- Do not claim all nine reader sessions run the full 45-minute itinerary as literally described — only six of the eight main readers do the think-aloud-and-follow-up segment (10 of the 45 minutes), so two sessions' actual content sums to 35 minutes on the stated breakdown. Keep "each session runs 45 minutes" as a booking/slot-length statement, not a claim that all nine sessions use an identical itinerary, unless Raphael can say what fills the remaining 10 minutes for non-think-aloud readers.
- Do not claim the committed-tier naming/AssetDatabase mechanism is implemented or tested (carried over from round 13's own list — still true: `ChangeLens-proto`'s current C# source has no `AssetDatabase`, `m_Name` or GUID-resolution code; it is correctly described as future/committed-tier work, not built).
- Do not write "46–100%" or "four SS3D weeks" for the naming-presence range (carried over — superseded by the nine-week, 16–100% table now in Appendix A).
- Do not attribute a specific percentage to Nielsen & Molich (1990) for the single-evaluator finding (carried over from round 9 — the ~35% figure belongs to Nielsen 1992, not Nielsen & Molich 1990).
