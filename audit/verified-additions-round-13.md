# Verified additions — round 13 (20 Sep 2026, 05:00)

Sources: the main session re-derived per-commit categories for the Figure 2 week from the package's sample export; `School/CLAUDE.md` for the COMP3151 release date; the round-12 SAFE list; a delta fact-finder over the round-12 changes (its findings are appended below when it reports).

## SAFE TO WRITE

- **"Fix restart bug (#588)", commit 37e22a3, 35 files across five categories:** recomputed from `ChangeLens-proto/Packages/com.raphaelbyun.changelens/Samples~/ss3d-week-2021-02-08.txt` with the scan-weeks extension map: Code 13, ScenePrefab 8, Meta 9, DataConfig 4, Art 1 (= 35). Written into Appendix C's commit list.
- **COMP3151 Industry Release Portfolio due 3 November 2026** (`School/CLAUDE.md`): "readers come from COMP3151 teams building toward their own 3 November release" is safe.
- **Session minute budget (a plan, not a measurement):** 5 min brief + 12 min per report × 2 + 6 min ten-need sheet + 10 min think-aloud and follow-up = 45; readers who do not think aloud finish at 35. Consistent with REPORT.md's defence note ("two reports and twelve items take about 25 minutes, the sheet about five, and the think-aloud the rest"); the Week 11 pilot checks it.
- **Ko et al. (2007), abstract:** "We identified twenty-one information types and cataloged the outcome and source when each type was sought"; the types are phrased as questions (e.g. "What have my coworkers been doing?"). "Their 21 information types are each a question, recorded apart from where developers looked" is a fair gloss. "One company can skew how often a need arises but not what kinds exist" is the student's reasoning, written as such.
- **Cohen's kappa per reader against the student's marking, over ten items, is indicative, not inferential** — a methodological caveat, no source needed.
- **The 60% naming target was set after the first four weeks were measured** (rounds 5 and 10 of the audit trail): stating this in Appendix A is honest and free.
- **Audience as a design constraint** (Stray entry): "every report is addressed to the producer, which removes this mechanism by construction" moves from the synthesis into Stray's paragraph; no new fact.
- **Fidelity check in Week 10** (schedule): a plan change; Deliverable 4's measure ("scored before any session") still holds.

## DO NOT WRITE

- The COMP3151 producer pool size or the number of slots agreed — only Raphael knows (Mitchell 13, change 2; left as a question for him).
- "Fleiss' kappa" — the design compares each reader with one reference marking, so per-reader Cohen's kappa is the right statement.
- "release build" or "crunch" for COMP3151 teams — write "building toward their own 3 November release".
- Author names removed from the Literature Review roadmap — both personas now ask for it, but it reverses round 11 within the churn window; recorded for Raphael to decide.


---

# Delta fact-finder, round 13 (Sonnet; diff of as-marked-round-12 vs as-marked-round-13, i.e. the round-12 edits)

20 claims: 16 SUPPORTED, 1 UNSUPPORTED (the kappa sentence was ambiguous about pooling; round 13's edit makes it per reader), 0 CONTRADICTED, 3 NOT CHECKABLE (a career-aspiration change; the unanswerable item's rationale; the naming mechanism, unbuilt, now consistent between Scoping Evidence and Deliverables but in tension with Figure 3's caption, which round 13 reworded). Two new weeks re-measured live (92%, 16%) match Appendix A. Raw report: `audit/factfinder-round-13-raw.md`. Its lists follow verbatim.

## SAFE TO WRITE

- Ko et al. (2007): "two of them Microsoft Research staff, watched 17 developers at Microsoft and surveyed 42 more" — title page (DeLine, Venolia = Microsoft Research; Ko = Carnegie Mellon) and acknowledgements ("Visual Studio User Experience teams at Microsoft," "intern at Microsoft Research"), `reading/ko2007.pdf` pp. 1, 10, independently re-extracted this round.
- "Across nine sampled SS3D weeks, 16% to 100% of changed prefabs and scenes carry an object name... Six clear the 60% naming target" — re-measured live this round for 2021-07-19–26 (22/24, 92%, 7 commits) and 2026-02-02–09 (8/50, 16%, 3 commits), both exact matches; full nine-week table also in `verified-additions-round-12.md`.
- Figure 1's "7–36%; with .meta files excluded, 12–57%" — exact arithmetic result of Appendix A's own six-repository corpus-screen numbers.
- "None of these studies observed a game producer" — confirmed for all seven reviewed studies; Whitson specifically reconfirmed against the **published** PMC text (10 intern developers, not producers), stronger evidence than the earlier draft-only verification.
- Goal-tags in Deliverables rows 1, 2, 9 — direct, defensible matches to Apply-and-Analyse/Evaluate, Create, and "all four goals" respectively.
- "710 commits" / "68 authors (or contributors)" for the local SS3D clone, branch `develop` — reconfirmed this round via `git rev-list --count HEAD` (710) and `git shortlog -sn HEAD | wc -l` (68).
- Bertram et al.'s "a simplified filing interface" remedy, with or without "for non-experts" — both forms are supported; the source quote (P05, PDF p. 7 / paper p. 297) explicitly says the interface was built "to encourage non-experts to file bugs."
- Maddila et al.'s "comments, commits or state changes" activity list and the 24-hour window — matches `reading/maddila2023.pdf` pp. 8 and 13.
- Dropping "GameName LLC" as a cited example while keeping "six of the nine employers" — matches `verified-additions-round-12.md`'s explicit recommendation and does not change the underlying count in `verified-additions-round-5.md`'s job-ad table.
- Unity Production Pipeline's new comparison-contingency clause — a stated future plan, consistent with the already-vetted "public availability November 2026" fact (round 7) and with the Introduction's present-tense novelty claim.
- Nielsen & Molich (1990): "one evaluator finds only a minority of a tool's problems," no percentage — verbatim match to `verified-additions-round-9.md`'s prescribed safe wording.

## DO NOT WRITE

- "I report ... Cohen's kappa against my marking" without "per reader" (or equivalent) — as worded it is ambiguous against the drafter's own round-12 DO-NOT-WRITE rule that kappa must be reported per reader, not pooled across all eight. Safe fix: "I report each reader's percentage agreement and Cohen's kappa against my marking."
- Figure 3's caption ("object names and component identifiers are plain text") left unreconciled with "resolving component identifiers through Unity's AssetDatabase" elsewhere — not yet checkable against a build (the feature is future/A3 work, confirmed absent from `ChangeLens-proto`'s current C# source), but the two should not be left saying, respectively, "no resolution needed" and "resolution needed" about the same data. Safe fix: caption clause distinguishing the raw GUID/fileID text from the resolved name, e.g. "...component identifiers are GUIDs that AssetDatabase resolves to names."
- Any percentage figure attributed to Nielsen & Molich (1990) for the single-evaluator finding (still correct to avoid, per round 9 — the ~35% figure belongs to Nielsen 1992).
- "46–100%" or "four SS3D weeks" for the naming-presence range — superseded this round by the nine-week, 16–100% measurement; do not regress to the smaller sample now that it is in the draft.
- "GameName LLC" reintroduced as a named example quote — not fabricated, but flagged as placeholder-sounding by an earlier proofreading round and already correctly dropped; restoring it as an illustrative quote would undo a deliberate edit without new justification.
- Any claim that the committed-tier naming/AssetDatabase mechanism is implemented or tested — `ChangeLens-proto`'s current source (`ChangeReport.cs`, `GitLogParser.cs`, `PathClassifier.cs`) has no `AssetDatabase`, `m_Name` or GUID-resolution code yet; it is correctly described in the draft as future work, not as built.
