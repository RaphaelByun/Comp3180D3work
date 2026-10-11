# Round 11 fact-check — round-10 → round-11 diff audit (19 Sep 2026)

Scope: every sentence that changed between `ROOT\audit\as-marked-round-10.md` (text before the round-10 edits) and `ROOT\audit\as-marked-round-11.md` (text after them), fact-checked read-only against primary sources. Nothing under the sprint folder was written to. ROOT = `C:\Users\rapha\Documents\School\Unit 3 Sem 2\COMP3180\Working folder\a2-final-sprint-17-sep-2026\`.

Diff method: `git diff --no-index --word-diff` and `--word-diff=porcelain` (paths quoted; the folder name contains an em dash). Raw diffs saved alongside this file as `diff-word.txt`, `diff-lines.txt`, `diff-porcelain.txt`. The Introduction and Appendices A–C are **completely unchanged** between the two snapshots — every change falls inside the Literature Review, Project Proposal (Scoping Evidence + Deliverables), the References list, and one heading. Cross-checked against `audit/apply-round10-edits.py` and `audit/apply-round10-trim.py` (the scripts that produced round 11 from round 10) and `audit/FINDINGS-round-10.md` (why each edit was made) to confirm intent, then verified independently against primary sources.

---

## 1. The diff — every changed sentence

**Cover block**
1. `%ID: [STUDENT ID]` → `%ID: 46987282`

**Literature Review — opening paragraph**
2. "...the tools hide **what** happened (Whitson, 2018)..." → "...the tools hide **why it** happened (Whitson, 2018)..."

**Bertram et al. (2010) paragraph**
3. "...(P05, p. 296). **That remedy** still asks the under-reporting party to report..." → "...(P05, p. 296). **Their remedy, a simplified filing interface for non-experts (p. 297),** still asks the under-reporting party to report..."

**Pascarella et al. (2018) paragraph**
4. "...including my own team's (Figure 1)**;** the report **therefore** categorises by file type." → "...including my own team's (Figure 1)**), and** the report categorises by file type."

**Whitson (2018) paragraph**
5. "...so I treat opacity as a hypothesis: **if it holds,** extraction names what changed but not why..." → "...so I treat opacity as a hypothesis: extraction names what changed but not why..." (conditional clause dropped)

**Stray et al. (2016) paragraph**
6. "...daily stand-up from 12 teams **in three companies.**" → "...daily stand-up from 12 teams." (qualifier dropped)
7. "...the record thins because of who it is written for. **Both report versions are therefore addressed to the producer.**" → "...the record thins because of who it is written for." (final sentence deleted, concept relocated — see #10)

**Maddila et al. (2023) paragraph**
8. "Before that check **existed**, 86 of 119 **alerts that developers** rejected had fired despite recent activity **on the pull request**." → "Before that check, 86 of 119 **rejected alerts** had fired despite recent activity."

**Literature Review — closing/synthesis paragraph**
9. "The **six** do three jobs." → "The **seven** do three jobs."
10. "Dourish and Bellotti, **with Whitson,** explain why." → "Dourish and Bellotti, **Whitson and Stray each** explain why."
11. "The project bets on the structural mechanism**;** if readers can say what changed but not why, opacity wins." → "The project bets on the structural mechanism **and fixes audience by design, every report being addressed to the producer;** if readers can say what changed but not why, opacity wins."

**Scoping Evidence — opening**
12. "**Two sub-questions structure the evaluation.** Sub-question 1: which surfaced needs..." → "Sub-question 1: which surfaced needs..." (lead-in sentence deleted)
13. "All eight readers then classify the same ten needs **at the end** of their session..." → "All eight readers then classify the same ten needs **(the ten most often raised) on a one-page sheet** at the end of their session..."

**Scoping Evidence — naming-presence paragraph**
14. "...(23 of 26 in the week shown). **The 60% target sits above the worst week.**" → "...(23 of 26 in the week shown). **Two weeks fall below 60%, so where no name resolves the report shows the file path.**"

**Scoping Evidence — session-design paragraph**
15. "Week difficulty is **then** a rival explanation, so per-week baseline scores are reported **beside the differences**." → "Week difficulty is a rival explanation, so per-week baseline scores are reported **too**."
16. "Each answers six matched questions per report (draft items in Appendix B)**, and** six of them then think aloud on a stand-up task." → "Each answers six matched questions per report (draft items in Appendix B) **before any think-aloud;** six of them then think aloud on a stand-up task."
17. "Slots are booked by the end of Week 10; **if fewer than** five **readers are confirmed,** the think-alouds run first..." → "Slots are booked by the end of Week 10; **below** five **confirmed readers,** the think-alouds run first..."

**Scoping Evidence — fidelity-check paragraph**
18. "...against the team's record. **It can falsify naming and activity claims, not file counts.** It passes when none is contradicted and 90% are supported." → "...against the team's record. It passes when none is contradicted and 90% are supported." (middle sentence deleted)

**Deliverables table, row 3**
19. "Six matched items per week, answerable from the report alone**;** rubric..." → "Six matched items per week, answerable from the report alone**, plus the ten-need sheet;** rubric..."

**Deliverables — risk paragraph**
20. "...because commit messages name the ticket, not the **week's** work..." → "...because commit messages name the ticket, not the work..."

**References**
21. Bertram et al. citation: "*Proceedings of the 2010 ACM Conference on **Computer-Supported** Cooperative Work*" → "*...Computer **Supported** Cooperative Work*" (hyphen removed)

**Heading**
22. "## Statement on Generative AI **use**" → "## Statement on Generative AI **Use**" (capitalisation only)

---

## 2. Verdicts on every changed/added claim

Numbered C1–C18 (pure word-count/grammar trims with no factual content — #4's "therefore"/semicolon, #15, #17, #20, #22, and the deletions #12/#18 — are noted as "no claim" rather than given a full verdict row, per `audit/apply-round10-trim.py`'s own accounting of "seven cuts, 12 words" plus the two outright sentence deletions).

**C1. Student ID `46987282`** (item 1)
Verdict: **NOT CHECKABLE.** No file in ROOT, `reading/`, `corpus/`, or `prototype-data/` states Raphael's official Macquarie student ID; this is a personal administrative fact outside the literature/corpus sources this task specifies. Safe handling: Raphael should confirm it himself against his enrolment record/student card before submission — do not treat its presence in the draft as independently verified.

**C2. "the tools hide why it happened (Whitson, 2018)"** (item 2 = task §3a)
Verdict: **SUPPORTED.** Fetched the published article directly (PMC6256721, via WebFetch, 19 Sep 2026). Definition: "'Voodoo' is generally applied when a developer's input results in unanticipated output, and the cause-and-effect result of interacting with the software boundary object is not predictable"; and "The cause of the voodoo is unknown, but is believed to be operating under rules that are hidden, unknowable, undiscoverable or unfathomable at the current time." The *output* (what happened — e.g. the shark not animating) is directly observed; what's opaque is the *cause* (why). "Hide why it happened" is the more accurate gloss than the round-10 "hide what happened." No safe-wording change needed — the edit is a correction, not a new risk.

**C3. "Their remedy, a simplified filing interface for non-experts (p. 297)"** (item 3 = task §3b)
Verdict: **SUPPORTED.** Read `reading/bertram2010.pdf` via `pdftotext -layout`, confirmed against page-boundary markers: PDF page 6 = printed p. 296 (carries the P05 "already resolved" quote), PDF page 7 = printed p. 297 (carries the Team B passage). Exact text, p. 297: "Because you kind of have to be an expert with the bug tracking system to file good bugs with this system, we wrote a very simple interface to encourage non-experts to file bugs. ... We found that when we put this in, people in other departments who have never filed a bug before ever, were filing bugs. —P05." Both the page number and the paraphrase are correct, and "Their" now has a clear referent (the sentence itself names the remedy, fixing the dangling "That remedy" the round-10 audit flagged as having no antecedent after the Team B sentence was cut in round 9).

**C4. Pascarella paragraph rewording — "(Figure 1), and the report categorises by file type"** (item 4)
Verdict: **SUPPORTED.** Pure grammar/word-count trim (semicolon+"therefore" → comma+"and"); the underlying claim ("six Unity repositories myself, including my own team's") is unchanged and independently confirmed: `corpus/fig1-six-repos.csv` lists exactly six rows (jynew, Inkform (own team), SS3D, unity-experiment-framework, open-brush, VRTK) = five public + Raphael's own team, matching Figure 1's caption. Also confirmed `reading/pascarella2018.pdf` contains no occurrence of "Unity" or "Unreal" (checked via `pdftotext` + search), supporting the adjacent unchanged claim "No Unity or Unreal project appears in its sample."

**C5. Whitson paragraph — "if it holds," removed** (item 5)
Verdict: **NOT CHECKABLE / no external claim.** This is Raphael's own reasoning connective (framing opacity as a testable hypothesis), not a sourced claim. Dropping the conditional doesn't introduce an inaccuracy; the sentence still functions as "hypothesis, plus how it will be tested" in the surrounding paragraph.

**C6. Stray paragraph — "12 teams" (dropped "in three companies")** (item 6 = task §3c, part 1)
Verdict: **SUPPORTED**, but flagged. Read `reading/stray2016.pdf`: abstract states "A grounded theory study of the daily stand-up meeting was conducted with **twelve software teams in three companies** in Malaysia, Norway, Poland and the United Kingdom" (line 18 of the extracted text). "12 teams" remains true — it's a subset of a verified fact, not a wrong one. Note: `audit/apply-round10-edits.py` labels this cut explicitly as a word-count "payment," not a correction (`audit/FINDINGS-round-10.md` line 142: "Stray's 'in three companies' cut"), and both round 9's and round 10's own `verified-additions` files list "twelve software teams in three companies" as the SAFE form. Safe wording if word budget allows: restore "12 teams in three companies" — costs 3 words, adds precision already verified twice, at zero accuracy risk.

**C7. Stray — "nine interviewees said others tuned out"** (unchanged text this round, but explicitly required by task §3c, part 2)
Verdict: **SUPPORTED.** `reading/stray2016.pdf`, §4.3 "Reporting Progress" (printed p. 26, immediately preceded by a page-break marker "26" in the extracted text): "The interviewees reported that they became disengaged or uncomfortable when responses to the question 'What have you done since last meeting?' tended to become progress information to the manager. **Nine interviewees stated that when the meeting was about reporting progress, many team members tuned out.**" Exact match to the round-11 paraphrase.

**C8. Stray sentence deleted + folded into synthesis: "...fixes audience by design, every report being addressed to the producer"** (items 7 + 11)
Verdict: **SUPPORTED (design-intent claim), with an unresolved textual tension flagged.** Both report versions (baseline and treatment) are indeed designed for and read by producer-role participants — confirmed by the Introduction ("eight student producers read two versions of the report") and Method section. **However:** Figure 2 and Appendix C — both unchanged this round — still list raw category rows "Meta" and "DataConfig," which are engine-internal vocabulary, not producer-facing language. This exact tension was named as a contradiction in `audit/FINDINGS-round-10.md` ("Figure 2 shows a producer-facing artefact containing engine-internal categories ('Meta', 'DataConfig'), which sits against the Stray-derived claim that both reports are addressed to the producer" — item (e) in that round's contradiction list). The round-10 edit script did **not** apply the fix that finding proposed; instead `audit/FINDINGS-round-10.md` (line 147) and `REPORT.md` ("Things to be able to defend if asked," line 97) record it as a **deliberately deferred prototype change**, to be defended verbally rather than fixed in text: "the prototype classifies every changed path and shows all categories; the committed tier's producer-facing page groups code, art, audio and scenes and treats .meta and configuration as supporting counts." A marker reading only the submitted text (not hearing the defence) will still see the same tension the round-10 audit flagged. Safe wording, if closing it in text: add one sentence after the Figure 2 paragraph, e.g. "The committed tier's producer-facing page groups .meta and configuration into supporting counts rather than top-level rows; Figure 2 shows the full classification the prototype computes." This is not yet in the draft.

**C9. Maddila — "86 of 119 rejected alerts had fired despite recent activity"** (item 8 = task §3d)
Verdict: **SUPPORTED.** Read `reading/maddila2023.pdf` (§6.1 "Activity detection"): "We found, through manual inspection, that 86 out of 119 Nudge comments that are resolved negatively were due to the fact that Nudge did not honor the recent pull request activity." The 86/119 figure counts **Nudge comments (notifications) that were resolved negatively** — i.e., developers responded unfavourably to them — where the cause was that Nudge fired despite recent activity on the PR. "Rejected alerts" is an accurate, slightly generalised gloss of "comments resolved negatively" (the paper's next sentence confirms developers "did not like the Nudge notifications because they recently interacted with the pull request," supporting the "rejected" framing). Both the round-10 and round-11 wording are accurate; round 11 keeps the precise 86/119 figure rather than the vaguer "most" alternative one marking persona had suggested, which is the stronger (more falsifiable) choice.

**C10. "The seven do three jobs"** (item 9 = task §3f, part 1)
Verdict: **SUPPORTED.** Counted the Literature Review in `as-marked-round-11.md` directly: seven studies each get their own dedicated paragraph — Bertram et al. (2010), Ko et al. (2007), Pascarella et al. (2018), Dourish and Bellotti (1992), Whitson (2018), Stray et al. (2016), Maddila et al. (2023) = exactly seven. Washburn et al. (2016) appears only inside the closing synthesis paragraph, with no dedicated paragraph of its own — correctly excluded from "the seven" (task §3f, part 2, confirmed).

**C11. "Dourish and Bellotti, Whitson and Stray each explain why"** (item 10)
Verdict: **SUPPORTED** via internal consistency. The Literature Review's opening sentence names exactly three explanations and their sources: structural (Dourish & Bellotti, 1992), opacity (Whitson, 2018), audience (Stray et al., 2016). The synthesis paragraph now credits all three with "explain why," closing the contradiction the round-10 audit flagged (three mechanisms promised, only two adjudicated at the close).

**C12. Ten-need sheet — "(the ten most often raised) on a one-page sheet"** (item 13, echoed in item 19's table row)
Verdict: **SUPPORTED** via internal consistency, and resolves a named round-10 contradiction. Deliverable 1 (table row 1) has Raphael classify "25 needs...by artefact source" before the sessions; "the ten most often raised" of those 25 is a coherent, stated selection rule for the subset of ten given to the eight readers on the one-page sheet. This directly answers `audit/FINDINGS-round-10.md`'s flagged contradiction (c): "ten needs classified by readers vs 25 classified in Deliverable 1, with no selection rule." No source outside the document itself defines "most often raised" (it would come from Deliverable 1's own interview/review coding), so there's nothing further to check externally, but nothing here is inconsistent.

**C13. "Two weeks fall below 60%, so where no name resolves the report shows the file path"** (item 14 = task §3e)
Verdict — numeric claim: **SUPPORTED.** `audit/verified-additions-round-5.md` gives the four sampled SS3D weeks: 8–14 Feb 2021 = 88%, 3–9 Apr 2023 = 59%, 13–19 Dec 2021 = 46%, 27 Sep–3 Oct 2021 = 100%. Two of the four (59% and 46%) fall below 60%; two (88%, 100%) do not. "Two weeks fall below 60%" is exactly right, and corrects the round-10 wording ("The 60% target sits above the worst week," which was flagged in `verified-additions-round-10.md`'s own DO NOT WRITE list as wrong for the same reason).
Verdict — fallback-behaviour claim ("...the report shows the file path"): **NOT CHECKABLE as a built/tested result**, but consistent with stated design intent. The naming tier is explicitly not yet built — the draft itself says "The prototype classifies files only; the committed tier...adds object naming" — and a search of the student's own package code (`ChangeLens-proto/Packages/com.raphaelbyun.changelens/Editor/`: `BatchTools.cs`, `ChangeLensWindow.cs`, `ChangeReport.cs`, `GitLogParser.cs`, `PathClassifier.cs`) found no name-resolution logic yet. This is forward-looking scope language, not a measured result — but it is consistent with `REPORT.md`'s defence notes ("where no name resolves the report falls back to the file path") and was reinstated deliberately this round (`FINDINGS-round-10.md`: "the file-path fallback is restored"), so it is not a new or risky claim.

**C14. Appendix B sequencing — "before any think-aloud; six of them then think aloud"** (item 16)
Verdict: **SUPPORTED** via internal consistency. Appendix B lists exactly six comprehension items (numbered 1–6); the Method paragraph's "six matched questions per report" and "six of them then think aloud" both match. No contradiction with the appendix.

**C15. Bertram citation — hyphen removed from "Computer Supported Cooperative Work"** (item 21)
Verdict: **SUPPORTED.** Queried the Crossref API directly for DOI 10.1145/1718918.1718972: `container-title` = "Proceedings of the 2010 ACM conference on Computer supported cooperative work" — no hyphen. Matches the round-11 reference exactly (APA title-case capitalisation is a normal, expected departure from Crossref's sentence case). For contrast, Crossref for Dourish & Bellotti's 1992 proceedings (DOI 10.1145/143457.143468) returns "...Computer-supported cooperative work..." **with** a hyphen — so the two references correctly differ from each other, each matching its own source.

**C16. Whitson — "10 weeks of fieldwork with 10 intern developers at a large international game studio in Canada"** (unchanged text this round, but required by task §3g)
Verdict: **SUPPORTED**, near-verbatim. Direct WebFetch of PMC6256721 returned: "This article details an ethnographic study of **10 intern developers at a large international game studio in Canada**..." (confirmed "international" is Whitson's own word, not an embellishment) and "At the end of the **10 weeks**, the final game was presented to PlayHouse employees..." The word "Montreal" does not appear anywhere in the published text (only in Whitson's 2013 unpublished draft, per earlier rounds — correctly not used here).

**C17. "Ten interns at one studio make a narrow, interpretive base"** (unchanged text this round, task §3g continued)
Verdict: **SUPPORTED.** Directly follows from C16 (10 interns, one studio/PlayHouse) — a fair characterisation of an ethnographic study's evidentiary weight (one site, one cohort, interpretive method: "ethnographic observation, formal and informal interviews," confirmed by WebFetch).

**C18. "One item per report is unanswerable" vs. Appendix B** (unchanged text this round, task §3h)
Verdict: **SUPPORTED**, internally consistent. Appendix B item 6 is explicitly labelled "(Unanswerable)": "Which of these changes were asked for in the tracker? *Fixed answer:* 'the report doesn't tell me'; the report reads the repository only." That's 1 of 6 items unanswerable, matching "One item per report is unanswerable," and the Method section's "five scored items" (6 − 1 = 5) is arithmetically consistent.

**Items with no factual content (word-count/grammar trims only, no verdict needed):**
- #15 "Week difficulty is [then] a rival explanation...reported [too/beside the differences]" — phrasing only.
- #17 "[if fewer than / below]" — phrasing only.
- #20 "not the [week's] work" — phrasing only; still consistent with the Dourish & Bellotti paragraph's "Fix restart bug (#588)" example three paragraphs earlier.
- #22 "Generative AI [u/U]se" — capitalisation only.
- #12, #18 (deletions) — removing a sentence creates nothing new to verify; checked that neither deletion leaves a dangling reference or a contradiction elsewhere (confirmed clean in both cases).

---

## 3. The eight flagged re-checks (task §3) — direct answers

**a. "the tools hide why it happened (Whitson, 2018)"** — Yes, the published text supports opacity about **why**, not **what**: the defining sentences are about unpredictable cause-and-effect and hidden/unknowable rules, not about the outcome being unobserved. See C2. **SUPPORTED.**

**b. "Their remedy, a simplified filing interface for non-experts (p. 297)"** — Yes, confirmed at PDF page 7 = printed p. 297 of `bertram2010.pdf`, Team B/P05's "very simple interface to encourage non-experts to file bugs." See C3. **SUPPORTED.**

**c. Stray "12 teams" / "nine interviewees...tuned out"** — Abstract confirms twelve teams in three companies (12 teams alone remains accurate, just less complete — a deliberate word-count trim, not an error). §4.3 (printed p. 26) confirms "Nine interviewees stated that...many team members tuned out" verbatim. See C6, C7. **SUPPORTED** (with a completeness note on "in three companies").

**d. "Before that check, 86 of 119 rejected alerts had fired despite recent activity"** — Maddila et al. (2023) §6.1: the 86/119 figure counts Nudge comments (notifications) resolved negatively due to Nudge not honouring recent PR activity; "rejected alerts" is an accurate gloss, corroborated by the paper's next sentence about developers disliking the notifications. See C9. **SUPPORTED.**

**e. "Two weeks fall below 60%"** — Confirmed against `verified-additions-round-5.md`'s four-week table (46%, 59%, 88%, 100%): 46% and 59% are below 60%. See C13. **SUPPORTED.**

**f. "The seven do three jobs"** — Exactly seven studies (Bertram, Ko, Pascarella, Dourish & Bellotti, Whitson, Stray, Maddila) have their own paragraph; Washburn is correctly not among them (synthesis-only mention). See C10. **SUPPORTED.**

**g. "Ten interns at one studio..." / "10 weeks of fieldwork with 10 intern developers at a large international game studio in Canada"** — Both phrases match the published Whitson (2018) text closely; "a large international game studio in Canada" is close to verbatim ("a large international game studio in Canada," from the article's own framing sentence), and 10 weeks/10 interns is exact. See C16, C17. **SUPPORTED.**

**h. "One item per report is unanswerable" vs. Appendix B** — Appendix B has six items, item 6 explicitly "(Unanswerable)." Internally consistent, and consistent with "five scored items" elsewhere in the Method section. See C18. **SUPPORTED.**

---

## SAFE TO WRITE

- **Whitson (2018), published text (PMC6256721, fetched directly 19 Sep 2026):** "'Voodoo' is generally applied when a developer's input results in unanticipated output, and the cause-and-effect result of interacting with the software boundary object is not predictable"; "The cause of the voodoo is unknown, but is believed to be operating under rules that are hidden, unknowable, undiscoverable or unfathomable." Grounds "the tools hide why it happened" over "hide what happened."
- **Whitson (2018), published text:** "This article details an ethnographic study of 10 intern developers at a large international game studio in Canada" — near-verbatim; "international" is Whitson's own word. "At the end of the 10 weeks, the final game was presented..." confirms 10 weeks. "Montreal" does not appear anywhere in the published text.
- **Bertram et al. (2010):** PDF page 6 = printed p. 296 carries the P05 "already resolved" quote; PDF page 7 = printed p. 297 carries Team B/P05's "we wrote a very simple interface to encourage non-experts to file bugs" — both page numbers in the round-11 text are correct.
- **Stray et al. (2016):** abstract (line 18 of the extracted text), "twelve software teams in three companies in Malaysia, Norway, Poland and the United Kingdom"; §4.3 "Reporting Progress" (printed p. 26), "Nine interviewees stated that when the meeting was about reporting progress, many team members tuned out." "12 teams" alone remains accurate.
- **Maddila et al. (2023), §6.1 "Activity detection":** "We found, through manual inspection, that 86 out of 119 Nudge comments that are resolved negatively were due to the fact that Nudge did not honor the recent pull request activity." "86 of 119 rejected alerts had fired despite recent activity" is a safe gloss.
- **Literature Review paragraph count (as-marked-round-11.md, direct count):** exactly seven studies have their own paragraph (Bertram, Ko, Pascarella, Dourish & Bellotti, Whitson, Stray, Maddila); Washburn appears only in the synthesis paragraph. "The seven do three jobs" is accurate.
- **Appendix B (as-marked-round-11.md):** six comprehension items, item 6 labelled "(Unanswerable)." "One item per report is unanswerable" and "five scored items" are both consistent with this.
- **`corpus/fig1-six-repos.csv`:** exactly six repositories (jynew, Inkform (own team), SS3D, unity-experiment-framework, open-brush, VRTK) = five public + Raphael's own team. "Six Unity repositories myself, including my own team's" is correct.
- **Local SS3D clone (`prototype-data/SS3D`, branch `develop`):** `git rev-list --count HEAD` = 710; distinct commit authors = 68. Confirms "710 commits from 68 contributors."
- **Crossref API, DOI 10.1145/1718918.1718972 (Bertram et al. 2010):** container-title "Proceedings of the 2010 ACM conference on Computer supported cooperative work" — no hyphen. The round-11 reference-list edit is correct. (Contrast: Dourish & Bellotti's 1992 proceedings, DOI 10.1145/143457.143468, keeps its hyphen — "Computer-supported cooperative work" — so both references are now each individually correct.)
- **`reading/pascarella2018.pdf`:** no occurrence of "Unity" or "Unreal" anywhere in the text (checked via `pdftotext` + search) — supports "No Unity or Unreal project appears in its sample."
- **Ten-need sheet selection rule:** Deliverable 1 classifies 25 needs by artefact source; "the ten most often raised" is a coherent, stated subset rule, resolving the round-10 audit's flagged contradiction that the ten-needs figure had no stated selection rule against the 25.
- **Naming-tier fallback ("...the report shows the file path"):** stated design intent for the not-yet-built naming tier, consistent with `REPORT.md`'s own defence notes; not yet implemented in `ChangeLens-proto/Packages/com.raphaelbyun.changelens/` (no name-resolution code found there as of 19 Sep 2026).

## DO NOT WRITE

- "12 teams in three companies" was cut to "12 teams" purely as a round-10 word-count payment (`audit/apply-round10-edits.py`, `audit/FINDINGS-round-10.md`), not a correction. Both are accurate; if word budget allows, restoring "in three companies" costs 3 words for verified precision that two prior rounds' own SAFE lists already endorsed.
- Do not present Figure 2 / Appendix C as literally what the producer-facing report shows without a qualifying sentence. Both still list "Meta" and "DataConfig" as top-level rows — engine vocabulary — which sits in visible tension with the round-11 synthesis claim "every report being addressed to the producer." This exact tension was flagged as a contradiction in `audit/FINDINGS-round-10.md` (item e) and was deliberately left as a **verbal** defence note in `REPORT.md` rather than fixed in the submitted text ("Removing 'Meta' and 'DataConfig' rows from the producer-facing report...: a prototype change, not a text change; recorded as a defence note"). A marker who does not hear the defence will still see the tension. Safe addition if closing it in text: "The committed tier's producer-facing page groups .meta and configuration into supporting counts rather than top-level rows; Figure 2 shows the full classification the prototype computes."
- Do not describe the naming-tier file-path fallback as tested or measured — it is unbuilt scope language (see SAFE list above), not an empirical result.
- Do not treat "46987282" as an independently verified student ID — no source available to this check confirms it; Raphael should check it against his own enrolment record.
- Do not drop "international" from the Whitson studio description, or add "Montreal" — the published text says "a large international game studio in Canada" and never names Montreal (only Whitson's 2013 unpublished draft does).
- Do not cite the "84/119" or "119/84" transposition, or describe the Maddila figure as counting "alerts sent" generally — it specifically counts "Nudge comments that are resolved negatively," a narrower category than all notifications.
