# Round 12 delta fact-check — A2 "ChangeLens" (20 Sep 2026)

Diff: `audit/as-marked-round-11.md` (pre) → `audit/as-marked-round-12.md` (post), via Python `difflib.SequenceMatcher` on lines (21 non-equal opcodes, all `replace`; no `insert`/`delete`-only hunks). Full line-level diff was generated and reviewed in full; every hunk is accounted for below. Body word count unaffected in a way that changes any prior audit (no re-count attempted — not asked).

## 1. Every changed sentence (line-diff hunks D1–D21)

| # | Location | Before (round 11) → After (round 12) |
|---|---|---|
| D1 | Introduction, tool sentence | "...The project delivers that tool **and an evaluation in which eight student producers read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not.**" → "...delivers that tool **and a study of it.**" |
| D2 | Introduction, after research question | Inserted: "**Two arms answer it: eight student producers classify the ten needs producers raise most often by the artefact that could supply each, and read two versions of the report, one naming the changed scenes and prefabs (the Unity asset layer) and one not.**" Removed trailing "That is the gap this project fills." |
| D3 | Lit. Review opening | "Four further studies **supply where the record fails, what a reader needs, why a game week differs, and the bar an absence-detector must clear.**" → "Four further studies **fill that picture in: Bertram et al. on where the record fails, Ko et al. on what a reader needs, Pascarella et al. on why a game week differs, and Maddila et al. on the bar an absence-detector must clear.**" |
| D4 | Ko paragraph | Removed "The taxonomy is a developer's, so only part of it transfers." "Deliverable 1 tests **that transfer by classifying the needs producers actually raise**" → "tests **how far the taxonomy transfers by classifying the needs producers raise**" |
| D5 | Pascarella paragraph | Removed parenthetical "(ownership means above a 75% contribution share)" |
| D6 | Dourish & Bellotti paragraph | Sentence split, no content change: "...by-product of the work itself, which is the tool I propose: it reads..." → "...by-product of the work itself. That is the tool I propose: it reads..."; "narrow: four groups, one session, in 1992, but the mechanism is about incentives, not technology" → "narrow, four groups in one 1992 session, but the mechanism is incentives, not technology" |
| D7 | Stray paragraph | "from 12 teams." → "from 12 teams **in consulting, telecoms and software companies, none of them game teams**."; "tuned out." → "tuned out **(§4.3)**."; appended new sentence: "**Washburn et al. (2016) sorted 155 game postmortems into 22 categories, none of them communication; postmortems cannot settle the question, so I look in artefacts.**" |
| D8 | Maddila paragraph | "built and trialled Nudge... What I learnt from it is how it avoids false alarms." → "built Nudge... **and trialled it on 147 Microsoft repositories, their own company's, so I take its design lesson, not its effect size.** That lesson is how it avoids false alarms."; limits list dropped "dependencies between items go unhandled," |
| D9 | Synthesis paragraph | "The seven do three jobs." → "**These studies** do three jobs."; removed the Washburn aside (moved to D7); "The project bets on the structural mechanism and fixes audience by design, every report being addressed to the producer; if readers can say what changed but not why, opacity wins." → split into 3 sentences (same content); dropped ", then building the tool that tests it" |
| D10 | Understand goal, Measure | "unaided, state each mechanism..." → "I can state each mechanism unaided..." (style only) |
| D11 | Apply/Analyse goal heading | "**Apply → Analyse:**" → "**Apply and Analyse:**" (glyph removed, text otherwise identical) |
| D12 | Career paragraph | "roles. There, writing..." → "roles, where writing..."; "**leadership or partners**" → "**leadership, publishers or partners**" |
| D13 | Scoping Evidence opening | Inserted: "**The study is a within-subjects comparison: eight student producers each read two ChangeLens reports for different SS3D weeks, one naming the changed scenes and prefabs (the treatment) and one not (the baseline), counterbalanced by week and order; six of them then think aloud on a stand-up task. Two sub-questions follow.**"; "which surfaced needs" → "which of the needs surfaced by the tool study (Deliverable 1, below)"; "Deliverable 1's specification" → "Its design specification"; dropped "at the end of their session"; "agreement with one another and with my marking" → "agreement with my marking" |
| D14 | Prototype paragraph | Added run-in label "**Prototype and corpus.**"; dropped "whose public history supplies real team-weeks"; reordered "the committed tier (the version I commit to delivering) adds object naming (Figure 3), with the AssetDatabase..." → "the version I commit to delivering (the committed tier, below) adds object naming, with Unity's AssetDatabase resolving identifiers to asset and script names (Figure 3)"; "Two weeks fall below 60%, so where no name resolves the report shows the file path." → "Two fall below 60%, so the study weeks are drawn from those that clear it and each week's rate is reported with its results; where no name resolves, the report shows the file path." |
| D15 | (moved block) | The whole "No public Unity repository... serves/supplies Sub-question 1" sentence-pair moved from after the recruitment paragraph (old position, D17) to immediately after Figure 3; "serves Sub-question 1" → "supplies the tracker-plus-repository case for Sub-question 1"; dropped "its sprint pages were written up after the fact for a semester and" (relocated, see D20) |
| D16 | Study-design/recruitment paragraphs | Added run-in label "**Study design.**"; dropped "Eight student producers each read a baseline report for one team-week and a treatment report for another, counterbalanced by week and order" (now redundant with D13) and "six of them then think aloud on a stand-up task" (ditto); recruitment: dropped "every COMP3151 team has a student producer, and"; "target is eight readers, six of whom also think aloud; the floor is five" → "floor is five"; "below five confirmed readers... reported descriptively" → "below five readers... descriptive" |
| D17 | Fidelity-check paragraph | "re-scored in Week 11." → "re-scored." (date dropped, still stated on the calendar line) |
| D18 | Deliverables row 1 | "(5 h); 10 job ads and 15 reviews coded (2 h); ... (3 h) \| 12 \| 2" → "(4 h); 10 job ads and 10 reviews coded (1 h); ... **and checked against the Unity Experiment Framework** (3 h) \| 10 \| 2" |
| D19 | Deliverables rows 5–6 | Row 5: "including the pilot, plus scheduling and setup (8 h); ... (7 h) \| 15 \| 4" → "including the pilot (7 h); recruiting, booking and briefing (4 h); ... (7 h) \| **18** \| 4". Row 6: hours "7" → "6" |
| D20 | Appendix A, corpus-screen paragraph | "...but none is linked to one." → "...but none is linked to one; **its sprint pages were written up after the fact for a semester.**" (relocated from D15) |
| D21 | Appendix C caption line | Appended: "**This is the prototype's full classification; the committed tier's producer-facing page groups Meta and DataConfig into supporting counts beneath code, art, audio and scenes.**" |

## 2. Claim-by-claim verdicts

**1. Stray "12 teams in consulting, telecoms and software companies, none of them game teams" (D7).**
SUPPORTED. `reading/stray2016.pdf` p.7 (§3.1): "We investigated a Norwegian consulting company, an International telecommunications company and an International software company, which we denote, respectively, Alpha, Beta and Gamma." Alpha = maintenance/extension of a client CMS for a Fortune 500 industrial company; Beta/Gamma = unspecified enterprise and oil-and-gas engineering software. None is a game studio. Table 2 confirms 2 (Alpha) + 7 (Beta) + 3 (Gamma) = 12 teams.

**2. Stray "(§4.3)" locator on "nine interviewees said others tuned out" (D7).**
SUPPORTED. `reading/stray2016.pdf` p.26: "4.3 Reporting Progress... Nine interviewees stated that when the meeting was about reporting progress, many team members tuned out." Locator is exact.

**3. Washburn "sorted 155 game postmortems into 22 categories, none of them communication" (D7, new sentence).**
SUPPORTED — already on the existing SAFE list. `verify/reserve.md` §(A): "7+6+4+4+1 = 22. There is no 'Communication' category anywhere in this list or in the paper's text" (full text read from the Microsoft-hosted PDF). Same source also confirms "155 postmortems" (the paper's own title).

**4. Washburn-derived inference "postmortems cannot settle the question, so I look in artefacts" (D7/D9).**
SUPPORTED as reasoning, not an external claim — it is Raphael's own inference from claim 3, correctly hedged (no longer overreads Washburn as positively "recording outcomes, not reporting", which `verify/reserve.md`'s companion file `audit/verified-additions-round-11.md` explicitly flagged as a DO-NOT-WRITE overreading). The round-12 wording avoids that flagged error.

**5. Maddila "trialled it on 147 Microsoft repositories, their own company's" (D8).**
SUPPORTED. `.../a2-draft-2-sep-2026/verify/maddila2023.md` claim (5): "147 Microsoft repos, three-arm RCT... CONFIRMED — matches the existing record's Table 4/§8.3 figures exactly." Same file's URL log: 4 of 6 authors (Maddila, Upadrasta, Bansal, Nagappan) are Microsoft Research; 2 (Gousios, van Deursen) are TU Delft — so "their own company's" is accurate for the majority-author employer whose repositories were used.

**6. Maddila independence framing "I take its design lesson, not its effect size" (D8).**
SUPPORTED as a reasonable CARS-style qualification following directly from claim 5's affiliation fact (author-built, evaluated in the authors' own organisation).

**7. Lit. Review synthesis attributions — Bertram/Ko/Pascarella/Maddila (D3).**
SUPPORTED, checked against each source's own paragraph in `as-marked-round-12.md`: Bertram's paragraph opens "Bugs go unfiled because the record fails at the point of entry" (matches "where the record fails"); Ko's paragraph is about information-need types (matches "what a reader needs"); Pascarella's paragraph explains the 80%/30% code-share gap and discipline ownership (matches "why a game week differs"); Maddila's paragraph closes "Nudge sets the bar for my challenge tier... or it adds nothing" (matches "the bar an absence-detector must clear"). All four attributions match.

**8. "These studies do three jobs" replacing "The seven do three jobs" (D9).**
SUPPORTED. Resolves the collision Malcolm's persona flagged against the Introduction's "Seven existing tools" (a different set of seven). Direct count in `as-marked-round-12.md`: exactly 7 studies get their own paragraph or embedded appraisal (Bertram, Ko, Pascarella, Dourish & Bellotti, Whitson, Stray, Maddila; Washburn is now inside Stray's paragraph, not separately) — "these studies" is unambiguous and the count still holds.

**9. Introduction "Two arms answer it: eight student producers classify the ten needs producers raise most often by the artefact that could supply each, and read two versions of the report..." (D2).**
SUPPORTED / internally consistent. Matches Scoping Evidence's Sub-question 1 paragraph ("All eight readers then classify the same ten needs (the ten most often raised) on a one-page sheet... marks each need... against a named artefact") and Deliverable 1's row ("25 needs classified by artefact source"). The Introduction is an accurate compressed preview of both.

**10. Scoping Evidence new opening — "The study is a within-subjects comparison... six of them then think aloud..." (D13).**
SUPPORTED / internally consistent with the Study-design and recruitment paragraphs (counterbalancing, six think-aloud participants, pilot excluded) and with Deliverable 5's row (nine sessions, six think-alouds coded).

**11. Back-references "which of the needs surfaced by the tool study (Deliverable 1, below)" / "Its design specification" (D13).**
SUPPORTED / internally consistent — Deliverable 1 is indeed below Scoping Evidence in reading order, and it is the deliverable that produces the needs classification referenced.

**12. "the version I commit to delivering (the committed tier, below) adds object naming, with Unity's AssetDatabase resolving identifiers to asset and script names (Figure 3)" (D14) — Task item (h).**
**CONTRADICTED** (internal inconsistency, pre-existing since round 11 but unresolved by round 12's reorder, and directly in scope per item (h)). This sentence attributes naming to **Unity's AssetDatabase** (a live API/GUID-resolution mechanism). But the Deliverables tier paragraph, describing the *same* committed-tier feature and citing the *same* figure, says naming comes "**from Unity's text serialisation** (Figure 3)" (`as-marked-round-12.md` line 97) — i.e., direct text parsing, no API. Figure 3's own caption backs the text-serialisation reading, not the AssetDatabase one: "A versioned prefab hunk: **object names and component identifiers are plain text**" (line 66) — if names and component identifiers are already plain text, there is nothing for AssetDatabase to resolve. Two different mechanisms are given for one feature, both citing Figure 3, and the figure supports only one of them.
*Safe wording:* replace the Scoping Evidence clause with something that matches the Deliverables paragraph and the figure, e.g. "...adds object naming, reading names directly from Unity's text serialisation, where object and component identifiers already appear as plain text (Figure 3)." If AssetDatabase resolution is in fact used for a sub-case not shown in Figure 3 (e.g. resolving a script GUID to a class name), that should be stated as a distinct, additional mechanism rather than folded into the same clause as the plain-text claim — I cannot confirm which is actually implemented from the text and figures alone; the prototype source (`ChangeLens-proto/`) was out of scope for this pass.

**13. "Two fall below 60%, so the study weeks are drawn from those that clear it and each week's rate is reported with its results" (D14) — Task item (e).**
SUPPORTED. `audit/verified-additions-round-5.md` table: 8–14 Feb 2021 = 88%, 3–9 Apr 2023 = 59%, 13–19 Dec 2021 = 46%, 27 Sep–3 Oct 2021 = 100%. Exactly two of four (46%, 59%) fall below 60%; exactly two (88%, 100%) clear it — the sentence's arithmetic is exact, and it avoids the previously-flagged false claim "the two study weeks are fixed before the naming measure is run" (round 11's fact-finder DO-NOT-WRITE list; the Fig. 2 week's 88% is already measured).

**14. Unity Experiment Framework "the best-linked repository, supplies the tracker-plus-repository case for Sub-question 1" (D15).**
SUPPORTED. `as-marked-round-12.md` Appendix A corpus screen: "genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0." Cross-checked against `corpus/results.md`'s squash-merge table: unity-experiment-framework naive=20/genuine=20 (highest of the five), SS3D naive=100/genuine=9, open-brush naive=74/genuine=0, VRTK and jynew both 0/0. UEF is unambiguously the best-linked repository in the screened set.

**15. Deliverables row 1 hour reallocation 12→10 h (4/1/2/3 h) + "checked against the Unity Experiment Framework" (D18) — part of task item (f).**
SUPPORTED. Arithmetic: 4+1+2+3 = 10, matches the row's stated total. The added UEF clause is consistent with claim 14 and closes the gap Mitchell's persona flagged (UEF previously had "no row in the deliverables table, no hours").

**16–17. Deliverables row 5 (7/4/7 h = 18) and row 6 (7→6 h) (D19) — task item (f).**
SUPPORTED. 7+4+7 = 18, matches. Row 1 (−2) and row 6 (−1) exactly fund row 5's +3, so the table's fixed 65-hour/15-in-prac totals are preserved (see claim 18).

**18. Deliverables table Hours column sums to 65; In-prac column sums to 15 — task item (f).**
SUPPORTED. Hours: 10+16+4+3+18+6+4+2+2 = 65. In-prac: 2+5+1+1+4+1+1+0+0 = 15. Both match the table's own printed "Total" row.

**19. Deliverable 2's 16 h = tier paragraph's 11+3+2 — task item (f).**
SUPPORTED. Committed tier 11 h + stretch tier 3 h + challenge tier 2 h = 16 h, matching Deliverable 2's Hours cell exactly.

**20. Learning Goals "leadership, publishers or partners" (D12) — task item (i).**
SUPPORTED — this round's edit is itself the fix for a defect the round-11 Proofreader flagged (`audit/FINDINGS-round-11.md`: "the body drops 'publishers' from the list it attributes to the appendix"). Appendix A now reads verbatim: "Six of the nine employers ask for progress or status reporting to leadership, publishers or partners" — the Learning Goals sentence now matches it exactly, word for word.

**21. Appendix A corpus-screen: "its sprint pages were written up after the fact for a semester" relocated from Scoping Evidence (D15/D20).**
SUPPORTED. This is a pre-existing claim (present unchanged in `as-marked-round-10.md` and `-11.md`'s Scoping Evidence) that was cut from Scoping Evidence and re-added to Appendix A in the same edit pass, so no information is lost — it is simply now stated once, in Appendix A, where the Scoping Evidence sentence's "(Appendix A)" pointer sends the reader. Not a newly-introduced claim; not re-verified against the Inkform repo itself in this pass (out of the specified source list), but its relocation introduces no inconsistency.

**22. Appendix C: "This is the prototype's full classification; the committed tier's producer-facing page groups Meta and DataConfig into supporting counts beneath code, art, audio and scenes" (D21) — task item (j).**
SUPPORTED, and a direct, well-targeted fix: `audit/verified-additions-round-11.md`'s own DO-NOT-WRITE section flagged exactly this gap ("Figure 2/Appendix C... still list 'Meta' and 'DataConfig' as top-level rows... in visible tension with... 'every report being addressed to the producer'") and supplied almost this exact sentence as the "safe addition if closing it in text." Round 12's new sentence matches the Introduction's own four-category description ("grouped as code, art, audio or scenes") exactly in wording and order.

**23. Recruitment paragraph: removal of "every COMP3151 team has a student producer, and" (D16).**
SUPPORTED / no defect introduced. The paragraph's logic no longer depends on that premise: recruits are "teammates... briefed with a one-page scenario," and "briefed proxies stand in for studio producers" — participants need not already be producers themselves, so the deleted clause was not load-bearing.

**24. Fidelity check: "A failing week is repaired and re-scored" (dropped "in Week 11") (D17).**
SUPPORTED. The Deliverables section's calendar sentence still states "the fidelity check, tier freeze and pilot in Week 11" — the date is preserved elsewhere, so nothing is lost.

**Stylistic-only hunks with no checkable claim** (D1, D4's trim, D5, D6, D9's sentence-splits, D10, D11, D13's minor cuts, D16's redundant-sentence cuts): reworded or trimmed for readability/word-budget; content unchanged or strictly redundant with text elsewhere; no new assertion introduced, nothing lost. Not counted as separate claims below.

## 3. Task items (a)–(j), direct answers

- **(a)** Stray "12 teams in consulting, telecoms and software companies, none of them game teams" + "(§4.3)" locator → **SUPPORTED**, both parts (claims 1–2).
- **(b)** Maddila "trialled it on 147 Microsoft repositories, their own company's" → **SUPPORTED** (claim 5).
- **(c)** Washburn "sorted 155 game postmortems into 22 categories, none of them communication" → **SUPPORTED** (claim 3).
- **(d)** "Four further studies fill that picture in: Bertram..., Ko..., Pascarella..., Maddila..." attributions → **SUPPORTED**, all four match (claim 7).
- **(e)** "Two fall below 60%... each week's rate is reported with its results" → **SUPPORTED** (claim 13; 46/59/88/100%).
- **(f)** Deliverables table arithmetic (65 total, 15 in-prac, Deliverable 2 = 11+3+2, row 5 = 18, row 1 = 10) → **SUPPORTED throughout** (claims 15–19).
- **(g)** Introduction's "Two arms answer it..." vs Scoping Evidence Sub-question 1 vs Deliverable 1 → **SUPPORTED / consistent** (claim 9).
- **(h)** "...the committed tier... adds object naming, with Unity's AssetDatabase resolving identifiers to asset and script names (Figure 3)" vs the Deliverables tier paragraph vs Figure 3's caption → **CONTRADICTED** (claim 12) — the one real finding of this pass. Tier paragraph and figure caption both describe plain-text/serialisation naming; Scoping Evidence alone claims AssetDatabase resolution.
- **(i)** Learning Goals "six of the nine employers... leadership, publishers or partners (Appendix A)" vs Appendix A → **SUPPORTED**, now an exact match (claim 20; this is the fix for the round-11 Proofreader's flagged drop of "publishers").
- **(j)** Appendix C "...groups Meta and DataConfig into supporting counts beneath code, art, audio and scenes" vs Introduction's "grouped as code, art, audio or scenes" and the Deliverables tier paragraph → **SUPPORTED** (claim 22).

## SAFE TO WRITE

- Stray et al. (2016): "12 teams in consulting, telecoms and software companies, none of them game teams" — `reading/stray2016.pdf` p.7, §3.1 (Alpha = Norwegian consulting, Beta = international telecom, Gamma = international software; none is a game studio).
- Stray et al. (2016): locator "(§4.3)" on "nine interviewees said others tuned out" — p.26, §4.3 "Reporting Progress," verbatim: "Nine interviewees stated that... many team members tuned out."
- Washburn et al. (2016): "sorted 155 game postmortems into 22 categories, none of them communication" — `verify/reserve.md` §(A), full 22-category scheme quoted, no Communication category.
- Maddila et al. (2023): "built Nudge... and trialled it on 147 Microsoft repositories, their own company's" — `.../a2-draft-2-sep-2026/verify/maddila2023.md` claims (5) and affiliations (4 of 6 authors Microsoft Research).
- Literature Review's four-way attribution (Bertram/record fails, Ko/reader needs, Pascarella/game week differs, Maddila/absence-detector bar) — each matches that source's own paragraph in the current draft.
- "Two fall below 60%, so the study weeks are drawn from those that clear it" — `audit/verified-additions-round-5.md` naming table (46%, 59%, 88%, 100% across four SS3D weeks).
- Unity Experiment Framework as "the best-linked repository" — Appendix A corpus screen (20 genuine references/100 commits, highest of five screened) and `corpus/results.md`'s squash-merge table (UXF 20/20 naive/genuine, all others lower or zero).
- Deliverables table: Hours column totals 65, In-prac totals 15, Deliverable 2's 16 h = committed 11 + stretch 3 + challenge 2, row 5 = 7+4+7 = 18, row 1 = 4+1+2+3 = 10 — all internally exact.
- Learning Goals' "leadership, publishers or partners" now matches Appendix A's job-advertisement paragraph verbatim (fixes the round-11 Proofreader's flagged omission of "publishers").
- Appendix C's new sentence on Meta/DataConfig grouping — matches the Introduction's "grouped as code, art, audio or scenes" and closes the gap `audit/verified-additions-round-11.md` explicitly flagged as still open (Figure 2/Appendix C showing engine-vocabulary rows in tension with "every report being addressed to the producer").
- The "its sprint pages were written up after the fact for a semester" clause is preserved (relocated from Scoping Evidence to Appendix A, not deleted) — safe to treat as still asserted once, in Appendix A, exactly as before.

## DO NOT WRITE

- Do not describe the committed tier's object-naming mechanism as **both** "Unity's AssetDatabase resolving identifiers" (Scoping Evidence) **and** "from Unity's text serialisation... plain text" (Deliverables tier paragraph / Figure 3 caption) without reconciling them — as currently written these are two different, uncoordinated technical descriptions of the same feature pointing at the same figure. Safe fix: align Scoping Evidence with the Deliverables/Figure-3 wording ("adds object naming, reading names directly from Unity's text serialisation, where object and component identifiers already appear as plain text (Figure 3)") unless the AssetDatabase step is real and distinct, in which case name it as a separate sub-mechanism rather than merging it into the plain-text claim.
- Do not attribute "postmortems record outcomes, not reporting" to Washburn et al. as the paper's own finding — the round-12 text has already corrected this to "sorted 155 game postmortems into 22 categories, none of them communication," which is the safe form; do not regress to the earlier overread phrasing.
- Do not drop "in consulting, telecoms and software companies" or "none of them game teams" from the Stray citation if the sentence is edited again — both are now directly evidenced and load-bearing for the transfer-limitation appraisal Mitchell's persona asked for.
- Do not re-attribute the Maddila trial to "147 Microsoft repositories" without also keeping "their own company's" (or equivalent) — the bare repository count without the independence caveat re-opens the CARS gap Mitchell's persona identified in round 11.
- Do not re-introduce "every COMP3151 team has a student producer" into the recruitment paragraph without also checking it is still true and still needed — as currently written the paragraph's logic (briefed proxies standing in for producers) no longer depends on it, so restoring it would be an unnecessary and currently-unverified addition.
