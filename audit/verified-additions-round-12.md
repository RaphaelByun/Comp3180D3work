# Verified additions — round 12 (20 Sep 2026, 02:00)

Sources: the main session re-read `reading/ko2007.pdf` (pypdf) and ran `corpus/scan-weeks.py` and `corpus/export-week.py` over the local SS3D clone for six further weeks; a delta fact-finder over the round-11 changes (its findings are appended below when it reports).

## SAFE TO WRITE

- **Ko et al. (2007), title page:** Andrew J. Ko, Human-Computer Interaction Institute, Carnegie Mellon University; Robert DeLine and Gina Venolia, Microsoft Research. Body: "we performed a two-month field study of software developers at Microsoft"; acknowledgements: "The first author was an intern at Microsoft Research over the summer". So "two of them Microsoft Research staff, watched 17 developers at Microsoft" is safe; "at a large software company" is the abstract's own wording and also safe. The bias appraisal ("I take the taxonomy, not the base rates") is the student's judgement, written as such.
- **SS3D naming presence, six further weeks (20 Sep 2026, `corpus/export-week.py`, distinct changed .prefab/.unity files with an `m_Name:` line in the changed text or its context):** 19–25 Jul 2021: 22 of 24 (92%), 7 commits, 39 entries · 14–20 Dec 2020: 30 of 33 (91%), 3 commits, 82 entries · 28 Mar–3 Apr 2022: 28 of 28 (100%), 1 commit, 78 entries · 27 Apr–3 May 2020: 2 of 3 (67%), 5 commits, 15 entries · 2–8 Feb 2026: 8 of 50 (16%), 3 commits, 52 entries (a bulk NetworkTransform edit) · 20–26 Dec 2021: no prefab or scene changed (excluded from the range). With the four weeks in `verified-additions-round-5.md` (88%, 59%, 46%, 100%) the measured set is **nine weeks, 16–100%, six of which clear 60%**; the weeks with several commits that clear it are 8–14 Feb 2021 (88%, 8 commits), 19–25 Jul 2021 (92%, 7 commits) and 14–20 Dec 2020 (91%, 3 commits), so two study weeks plus one reserve exist. Exports: `ss3d-week-<monday>.txt` in the job tmp folder (not kept). Do not write "46–100%" any more; write "16% to 100%" over nine weeks.
- **Unity Production Pipeline** (round-7 SAFE list): public availability November 2026, inside the A3 window; a comparison clause in Appendix A is a plan, not a fact.
- **Job-advertisement sample:** the third example employer's registered name is "GameName LLC" (round-8 proofreader); it reads as a placeholder, so the appendix keeps the two other examples and the counts, which are unchanged.
- **Nielsen & Molich (1990):** "one evaluator finds only a minority of a tool's problems" is safe without a percentage (`verified-additions-round-9.md`).
- **Synthesis concession:** none of the reviewed studies observed a game producer (Bertram: small software teams; Ko: developers at Microsoft; Pascarella: repositories; Dourish & Bellotti: designers; Whitson: intern developers; Stray: software teams; Maddila: pull requests). "None of these studies observed a game producer" is safe.
- **Deliverables:** hours unchanged this round (10, 16, 4, 3, 18, 6, 4, 2, 2 = 65; in-prac 2, 5, 1, 1, 4, 1, 1, 0, 0 = 15). Malcolm's request to move two hours from Deliverable 5 to Deliverable 2 reverses round 11 (both personas raised Deliverable 5 to 18 h) and is skipped as churn; Mitchell this round wants Deliverable 5 larger, not smaller.

## DO NOT WRITE

- "then at Microsoft Research" for all three Ko authors (Ko was at Carnegie Mellon, an intern at Microsoft Research).
- "as with Nudge" inside the Ko paragraph (Nudge is introduced later); the cross-reference runs the other way, in the Maddila paragraph.
- The 46–100% range as current; nine weeks are now measured.
- "Cohen's kappa" as a pooled statistic across eight raters; it is reported per reader against the student's marking.
- Any percentage attributed to Nielsen & Molich (1990) for the single-evaluator finding.


---

# Delta fact-finder, round 12 (Sonnet; diff of as-marked-round-11 vs as-marked-round-12, i.e. the round-11 edits)

24 claims: 23 SUPPORTED, 1 CONTRADICTED (the naming mechanism described as AssetDatabase resolution in Scoping Evidence and as text serialisation in Deliverables; fixed in `audit/apply-round12-fix.py` by stating both parts of the one mechanism in both places), 0 UNSUPPORTED, 0 NOT CHECKABLE. Raw report: `audit/factfinder-round-12-raw.md`. Its lists follow verbatim.

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
