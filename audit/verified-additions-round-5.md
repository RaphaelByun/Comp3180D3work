# Verified additions — loop round 5 (18 Sep 2026)

Own measurements, reproducible with `corpus/export-week.py <since> <until> <out>` over the blobless SS3D clone in `prototype-data/SS3D`. The measure is the presence of an `m_Name:` line in the changed text (or its diff context) of each changed .prefab/.unity file; it is a lower bound on what a naming tier that resolves identifiers through the AssetDatabase could achieve, and it is not a measurement of the (unbuilt) tier itself.

## SAFE TO WRITE

| SS3D week (Mon–Sun) | Commits | Entries | Changed prefabs/scenes | With an object name in the changed text | Share |
|---|---|---|---|---|---|
| 8–14 Feb 2021 (Figure 2) | 8 | 104 | 26 | 23 | 88% |
| 3–9 Apr 2023 | 4 | 72 | 17 | 10 | 59% |
| 13–19 Dec 2021 | 9 | 64 | 13 | 6 | 46% |
| 27 Sep–3 Oct 2021 | 2 | 82 | 22 | 22 | 100% |

- Range across the four weeks: 46–100%; the proposal now says "Across four sampled SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown), so the tier's 60% naming target sits inside the measured range, with a file-level fallback for the rest."
- Figure 2's window shows 35 ScenePrefab *entries* for the February 2021 week (one entry per file per commit); the 26 in the text are *distinct files*. Both are correct; the caption and text now use "changed prefabs and scenes" for files.
- Figure 2 caption date: the sampled window is the calendar week 8–14 February 2021; the eight commits fall on 10–14 February (Date range field in the window: 2021-02-10 to 2021-02-14). The caption says both.
- SS3D code share, three bases now stated in Appendix A: 17.5% of all changed-file entries over the full history (Figure 1 series, .meta counted as non-code); 33% with .meta excluded; 24.0% for the single February 2021 week on the first basis (Figure 2).

## DO NOT WRITE

- "The 60% target is conservative" — two of four sampled weeks fall below 60% on this measure.
- Any naming rate for the Unity Experiment Framework or another repository — not measured (only SS3D is cloned locally).
- That the measurement counts what the naming tier resolves — it counts names present in versioned text.

## Job-advertisement sample (web scout, 18 Sep 2026) — SAFE with the caveats below

Ten producer-family advertisements fetched (Seek blocked automated fetches with HTTP 403, so none of its ads could be quoted). Nine distinct employers once the two Aristocrat requisitions, which share a byte-identical sentence, are counted once.

| # | Employer | Role | Country | Source | Posted | Reporting duty quoted |
|---|---|---|---|---|---|---|
| 1 | Aristocrat | Project Coordinator | Australia | gamejobs.co/Project-Coordinator-at-Aristocrat-3197 | ~5 Sep 2026 | "Track and report project progress, keeping all collaborators informed." |
| 2 | Aristocrat Interactive | Project Coordinator | Australia | au.linkedin.com/jobs/view/project-coordinator-at-aristocrat-interactive-4462359378 | ~11 Sep 2026 | identical sentence to #1 (same template; counted once) |
| 3 | Light & Wonder | Game Producer | Australia | au.linkedin.com/jobs/view/game-producer-at-light-wonder-4451382402 | ~4 Sep 2026 | "…change logs, meeting notes, decision logs, and status reports for leadership." |
| 4 | Portable | Senior Producer | Australia | au.linkedin.com/jobs/view/senior-producer-at-portable-4459678597 | ~28 Aug 2026 | none written (stand-ups and partner check-ins only) |
| 5 | Coal Car Studio | Producer | Canada (remote) | workwithindies.com/careers/coal-car-studio-producer | 17 Jul 2026 | "Prepare project updates, milestone submissions, grant applications, and funding reports." |
| 6 | Sunfox Studios | Producer | remote (CET) | workwithindies.com/careers/sunfox-studios-producer | 20 Apr 2026 | none |
| 7 | Thekla, Inc. | Producer | remote | workwithindies.com/careers/thekla-producer | 11 Sep 2025 (closed) | "…keep them informed on the advancement of the work" |
| 8 | Devolver Digital | Producer | remote (US publisher) | workwithindies.com/careers/devolver-digital-producer | 22 May 2026 (closed) | "Maintain clear, consistent communication with partners on progress, risks, and changes" |
| 9 | Millions of Monsters | Producer | USA | workwithindies.com/careers/millions-of-monsters-producer | 8 Jan 2025 (closed) | none |
| 10 | GameName LLC | Game Producer | remote (US hours) | workwithindies.com/careers/gamename-game-producer | 23 Jul 2025 | "Support high-level scheduling, timelines, and reporting for studio leadership" |

- Count: 7 of 10 advertisements, 6 of 9 distinct employers, list progress or status reporting to leadership, publishers or partners. The proposal says: "six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners."
- Caveats to state if asked: convenience sample from three boards; only four Australian ads and none from New Zealand; three of the four Australian employers are gambling-technology companies with in-house game teams; three listings were already closed when sampled; a strict reading requiring the words "status report" gives 3–4 of 10. Deliverable 1's own scan (10 ads coded) replaces this sample.

## DO NOT WRITE (job ads)
- "Seven of ten" without noting the duplicated template, or any claim about Australian studios specifically.
