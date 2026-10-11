# A2 Reading Kit — six counted sources
Built 17 Sep 2026. Order: **Whitson → Maddila → Bertram → Ko → Pascarella → Dourish & Bellotti** (risk-per-hour order from `DOSSIER.md §1`, folded together with the reading order Raphael already committed to in `DOSSIER.md §1 "What Raphael must personally read before 15 Sep"`).

Every "20-minute fast track" gets you enough to defend the draft's entry and survive a Q&A follow-up. The "60-minute full read" is what to do if the evening has slack, or if the fast track raises a question you can't answer. All SAFE/DO-NOT-WRITE material below is taken verbatim from `Working folder/a2-draft-2-sep-2026/verify/*.md` — nothing here is invented; if you want the full detail, that's the file to open.

**Rule for every source below:** after reading, close this file and retype the draft's paragraph from memory, checking it against the paper open next to you. That's Malcolm's own prescribed antidote (Lecture 4) and the only way this reading actually counts.

---

## 1. Whitson (2018) — "Voodoo software and boundary objects in game development"

**Where to get it (updated 18 Sep 2026):** the published article is **open access at PubMed Central, PMC6256721** (https://pmc.ncbi.nlm.nih.gov/articles/PMC6256721/), so no library login is needed; the Sage page (DOI `10.1177/1461444817715020`, *New Media & Society* 20(7), 2315–2332) is the same text. Scripted downloads of the PMC PDF return an HTML page, so open it in your browser and read there or save the PDF by hand (the file `whitson2018-pmc.INVALID-html-not-pdf.txt` in this folder is that failed download, kept only so nobody mistakes it for the paper). An agent read the full PMC text on 18 Sep 2026 and the draft's entry was checked against it. Substitute A (Buse & Zimmermann 2012) is no longer needed.

Note on the site: the published text anonymises the studio as being in "a large Canadian city" and never says Montreal; Montreal appears only in the 2013 draft. The proposal says "a large Canadian game studio". Do not reintroduce Montreal.

The 2013 draft on disk (`whitson2013-draft01.pdf`) is a different, unpublished text — use it only to sanity-check content, never as the citation.

**20-minute fast track (on the PMC page):** read the Abstract, Introduction, the "Boundary Objects" section (draft's §2, ~2 pages), and the section titled something like "Voodoo software" (draft's core argument, ~2 pages) plus the Conclusion. Skip the literature-review throat-clearing and the full ethnographic scene-by-scene detail.

**60-minute full read:** the above, plus the two long "Scene" vignettes (draft pp. 16–18) that show the tacit-knowledge/articulation material, and the Methods section (confirm the "ten weeks / two ethnographers / ten interns" numbers against the *published* text, not just the draft).

**The draft's entry (retype-and-compare):**
> Whitson (2018) reports ten weeks of ethnographic fieldwork with ten intern developers at a large Canadian game studio, on how engines and art tools shape collaboration between disciplines. Three findings change how I read my interview data. First, developers called tool behaviour "voodoo" when their input produced output whose cause they could not predict: the tool was opaque to its own users. Second, that ambiguity was attributed to the tool rather than to a teammate, which let the group move on without assigning blame or exposing anyone's lack of expertise. Underpinning both, engines and art tools such as Unity operated as boundary objects that art, design, code and project management worked through without shared expertise. At A1 I labelled this mechanism articulation failure; on Whitson's evidence it is narrower — opacity, plus blame that lands on the tool. Two method consequences follow: asking practitioners what their tools fail to tell them under-reports by construction, and a report generator enters a negotiation, not a vacuum. It supplies the rival mechanism the synthesis adjudicates.

**Three comprehension questions (self-check against the SAFE list):**
1. *Q: What does "voodoo" mean in this paper, precisely?* **A:** The term developers applied when their input into a tool produced output whose cause-and-effect they could not predict or anticipate — the tool was opaque to its own users (verify §, claim 1).
2. *Q: Why does calling something "voodoo" help the team, rather than just being a complaint?* **A:** It lets team members move on as a group without needing to assign blame to a specific person's error or expose another member's lack of expertise — the ambiguity is attributed to the tool, not the teammate (verify §, claim 2).
3. *Q: What role do tools like Unity play across disciplines, in Whitson's framework?* **A:** They function as boundary objects — flexible enough that people from very different "social worlds" (art, design, code, project management) can all use them daily and each contribute, without needing shared expertise or consensus (verify §, claim 3).

**Two traps (never write these):**
1. **Never cite "Whitson 2020, *Games and Culture* 15(3)"** as if it were this paper — that's a different article ("What Can We Learn From Studio Studies Ethnographies?"), confirmed by DOI in the verify file. If you ever see 2020/*Games and Culture* attached to this claim, it's contamination — revert to the 2018 *New Media & Society* citation.
2. **Never write "developers have difficulty articulating their work to others" as a Whitson finding.** The verify file confirms this exact claim is absent as a general statement — the paper's actual (narrower) point is about specific individuals struggling to verbalise *tacit craft knowledge* while teaching a skill to a novice, and the paper's own conclusion argues the opposite: that under-recognised "articulation work," when it does happen, is valuable and needs more attention. Don't use this source to support any claim about producers not getting explanations.

---

## 2. Maddila et al. (2023) — "Nudge: Accelerating Overdue Pull Requests toward Completion"

**Where to get it:** Downloaded — `reading/maddila2023.pdf` (arXiv v5 via arxiv.org/pdf/2011.12468, 1.56 MB, confirmed `%PDF` header). Free, no login.

**20-minute fast track:** Abstract, §2 Related Work (frames why this isn't "just a Power Automate flow"), §4.1 (the "at most one notification per PR" design decision), §7.2–7.4 (the signal sources — pull-request APIs only), §9.5 (the inter-PR-dependency admission). Skip the ML methodology (§5) unless you need the "gradient boosting, not linear regression" correction for Q&A.

**60-minute full read:** add §6.1 (the 86/119 stat), §8.1–8.3 + Table 4 (the RCT numbers), §9.6.2 (the "coefficients or factors" sentence — read it in full, not truncated).

**The draft's entry (retype-and-compare):**
> Maddila et al. (2023) show that per-item absence detection works, and where it stops. Nudge predicts a pull request's completion time by gradient boosting over Table 1's features, then applies an activity-detection gate — a fixed 24-hour recency test over state changes, comments and pushed commits — that suppresses the alert while work is still moving; state changes are themselves inferred by matching the word "voted" in comment text. Without that gate, 86 of 119 negatively-resolved notifications had ignored recent activity. Across 147 Microsoft repositories, a three-arm randomised trial cut mean lifetime from 197.2 hours to 77.7 under the full configuration, which also adds actor identification. Three boundaries remain. Every signal is drawn from the pull-request environment; the paper describes no integration with work-item or build data, an absence I note rather than a claim it makes. Each verdict reaches only the blocked developer — by design, one notification per pull request, never composed across items. And the authors name dependencies between items as unhandled. It bounds my novelty claim and defines what is left to contribute.

**Three comprehension questions:**
1. *Q: What does the activity-detection gate actually do, and how does it detect a "state change"?* **A:** It's a fixed 24-hour recency test over three signal types (state changes, comments, pushed commits) that suppresses a stall alert if work is still moving; a "state change" specifically is detected by string-matching the word "voted" in a comment's content (§7.3, confirmed verbatim).
2. *Q: Is the 147-repository trial's result a statistically tested finding?* **A:** No — a full-text search found zero hits for p-value, confidence interval, effect size, or any named significance test anywhere in the paper. Table 4 reports three raw means with no inferential statistic attached. Never call it "proved" or "statistically significant."
3. *Q: Does Nudge aggregate or summarise across multiple pull requests for a producer/manager?* **A:** No — by design it sends at most one notification per pull request (§4.1, verbatim), and its own completion-time estimate is never shared outside the system (§9.1). There is no aggregation, summarisation, or team-level layer anywhere in it.

**Two traps (never write these):**
1. **Never write "Section 7.2 lists the Azure DevOps work-item/build APIs Nudge does not use"** as if the paper states this. Two independent checks found no such enumeration — it's an absence-of-mention inference, not a citable claim the paper makes. If you use it, phrase it exactly as the draft does: "the paper describes no integration with work-item or build data, an absence I note rather than a claim it makes."
2. **Never write "8,500 repositories," "18 months," "a linear regression model," or "the RCT across 8,000 repositories."** Correct facts: 8,000 repos in the scale-out (8,500 is the PR count, and that scale-out was explicitly NOT randomised — "we have no untreated data points to compare to"); nine months for the 147-repo RCT (the Conclusion's "18 months" is the paper's own internal error); gradient boosting, not linear regression (§4.1's mention of "linear regression" is the paper's own inconsistency — §5.2/Table 2 confirm gradient boosting, MAE 32.59, is the model actually used).

---

## 3. Bertram, Voida, Greenberg & Walker (2010) — "Communication, collaboration, and bugs"

**Where to get it:** Downloaded — `reading/bertram2010.pdf` (amy.voida.com, 106 KB, confirmed `%PDF` header). Free, no login, 10 pages.

**20-minute fast track:** Abstract, the "Full-fledged Bugs and Almost Bugs" section (author-PDF p.6 — the P05 critical-bugs quote), the "A 'Flurry of Fields' vs. Ease of Entry" section (author-PDF p.7 — the P02 quote and Team B's simplified interface), and the Conclusion.

**60-minute full read:** add the Method section (sample: 15 participants, 4 teams — note Team B is explicitly a gaming company) and skim the rest of the Findings for the general "tracker as communication hub" framing.

**The draft's entry (retype-and-compare):**
> Bertram et al. (2010) studied issue tracking in four small, collocated software teams (fifteen participants, interviews and questionnaires). Their central finding is that the tracker is a hub for communication and coordination rather than a bug database. What matters here is where the record fails: at entry. One participant said "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296), so the most urgent work leaves the least trace. Non-technical stakeholders "tend to skip over a lot of these fields" (P02, p. 297), and one team, described in the paper as a gaming company, wrote a simplified filing interface before non-experts would file at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report. It sets this proposal's premise: the record is incomplete before any tool reads it.

**Three comprehension questions:**
1. *Q: Why do the most critical bugs sometimes never get filed at all?* **A:** Per P05: because they get fixed faster than anyone would go through the process of filing them — by the time you'd file it, it's already resolved (verbatim quote, p. 296).
2. *Q: Which team built a simplified bug-filing interface, and what happened after they did?* **A:** Team B — described in the paper's own Table 1 as a product-development team within a large gaming company — built a simplified abstraction on top of their tracker; afterwards, people in other departments who had never filed a bug before started filing bugs (p. 297).
3. *Q: What's the paper's central thesis about issue trackers?* **A:** That an issue tracker isn't just a bug database — it's a focal point for communication and coordination across many stakeholders, and this held even for collocated teams that could talk face-to-face.

**Two traps (never write these):**
1. **Don't attribute both P05 quotes to the same page number.** P05 is quoted twice, on two different pages: the "already resolved" quote is p. 296; the Team B simplified-interface quote (also P05) is p. 297. If you can't spare the disambiguation, paraphrase without a page number rather than risk mis-citing one of them.
2. **Don't write "CSCW 10" as if it were a journal volume/issue.** It's a conference proceedings paper — format the reference as "*Proceedings of the 2010 ACM Conference on Computer Supported Cooperative Work*" or "CSCW '10" as a venue name, never as a journal citation.

---

## 4. Ko, DeLine & Venolia (2007) — "Information Needs in Collocated Software Development Teams"

**Where to get it:** Downloaded — `reading/ko2007.pdf` (Microsoft Research, 1.3 MB, confirmed `%PDF` header after a retry with a full browser User-Agent — the plain `curl -A "Mozilla/5.0"` attempt returned Microsoft's HTML "page not found" shell instead of the PDF, so if you ever re-fetch this one yourself, use a full desktop User-Agent string). Free, no login, 10 pages.

**Handling rule — critical:** this PDF's text layer silently deletes every digit in body text (a copy-paste of "42 developers" would come out as " developers", no error, no placeholder). **Never copy-paste a number from this PDF.** If you need to double-check any figure, render the page as an image and read it visually, or trust the numbers already confirmed in the verify file below.

**20-minute fast track:** §5 (all seven subsections, 5.1–5.7 — this is where the 21 information types are named; ~3 pages) and §6.3's "Unsatisfied Information Needs" table (the 61% figure). Skip the full Methods and the Discussion.

**60-minute full read:** add §7.1 (why design/rationale needs go unsatisfied — the "only source is a colleague's memory" mechanism) and Figure 3 (the quantified summary table — but treat its data as already confirmed rather than re-reading digits off the page yourself).

**The draft's entry (retype-and-compare):**
> Ko et al. (2007) observed seventeen developers and surveyed forty-two more, cataloguing the information developers seek. The finding that fixes my unit of analysis is that what a stakeholder needs to know decomposes into twenty-one information types in seven categories — writing code, submitting a change, triaging bugs, reproducing a failure, understanding execution behaviour, reasoning about design, and maintaining awareness (§5). The causal need "what code caused this program state?" was the most frequently unsatisfied, failing in 61% of cases with searches of up to 21 minutes (§6.3), and its sources were the debugger and logs rather than colleagues, so that bottleneck is tool inadequacy. Design-rationale needs have only one source, a colleague's memory, and colleagues were often unavailable (§7.1). The twenty-one types force the research question to be answered need by need, and give the think-aloud arm its coding frame.

**Three comprehension questions:**
1. *Q: How many information types are there, and how are they organised?* **A:** 21 types across 7 categories: Writing Code (3), Submitting a Change (3), Triaging Bugs (3), Reproducing a Failure (2), Understanding Execution Behaviour (3), Reasoning about Design (4), Maintaining Awareness (3) — 3+3+3+2+3+4+3 = 21, matching the paper's own stated count (§5).
2. *Q: Which single information need was hardest to satisfy, and why (per the paper's own explanation)?* **A:** "What code caused this program state?" — unsatisfied in 61% of cases, up to 21 minutes searching (§6.3). Its main sources were the debugger (16), logs, intuition and tools — barely ever a colleague (only 1) — so the paper's own explanation is that developers had to use primitive tools to search this explanation space, i.e. tool inadequacy, not colleague unavailability.
3. *Q: How many developers were surveyed, and how many contacted?* **A:** 42 developers responded, out of 550 contacted (§6.1) — never "250," which is a refuted figure.

**Two traps (never write these):**
1. **Never write "250 surveyed."** The correct figure, confirmed by rendering the actual page (the text layer drops digits), is 42 respondents out of 550 contacted.
2. **Never write "causal needs go unsatisfied because their only source is a colleague" as a blanket claim.** That mechanism is textually specific to design/rationale needs (the d-category) — the paper's own explanation for the causal "what code caused this program state?" need is tool inadequacy (its sources are overwhelmingly debugger/logs/intuition, almost never a colleague). Don't blur the two.

---

## 5. Pascarella, Palomba, Di Penta & Bacchelli (2018) — "How is video game development different from software development in open source?"

**Where to get it:** Downloaded — `reading/pascarella2018.pdf` (author preprint at fpalomba.github.io, 686 KB, confirmed `%PDF` header). Free, no login. Note: this is the preprint/technical-report version (TUD-SERG-2018-009), not the ACM version of record — its own printed page numbers are TR pagination, not the ACM 392–402 range (which is separately confirmed via Crossref).

**20-minute fast track:** §3.2 "Distribution of files across categories" (the 30%/80% figure and the OpenClonk multimedia caveat) and §3.1–3.2's ownership/specialisation passage (the >75%-ownership sub-team finding). Skip the Introduction/Related Work and the full Methodology.

**60-minute full read:** add §2.2 (sample selection — 30 games + 30 non-games, C/C++/Objective-C only) and §7 "Threats to Validity" (confirms the paper never itself names Unity/Unreal as a limitation).

**The draft's entry (retype-and-compare):**
> Pascarella et al. (2018) mined thirty open-source game projects and thirty non-game systems, all C, C++ or Objective-C. The headline contrast is the file mix: non-game projects have on average 80% of files in the Development category, game projects only 30% (§3.2). Beneath it sits an ownership mechanism. In games, sub-teams specialising in non-development categories such as multimedia appear at the authors' 75% ownership threshold, whereas in non-games specialised sub-teams form only around code (§3.1–3.2). A code-centric report is therefore blind to whole ownership groups. Two limits attach. The "up to 70%" multimedia figure is OpenClonk's single-project maximum, not a games-wide average, and the sample contains no Unity or Unreal project — my inference from the selection criteria, not a limitation the paper names. That gap is why I replicate the file-mix measure on Unity repositories myself (Figure 6).

**Three comprehension questions:**
1. *Q: What's the exact 30%/80% claim, word for word?* **A:** "Non-game projects have, on average, 80% of files in the Development category; game projects have only 30% of files, on average, in the Development category" (§3.2, exact paper wording) — always keep "on average" in.
2. *Q: Is "70% multimedia" a typical figure for a game repository?* **A:** No — the paper never gives a cross-project average multimedia percentage for games. "Up to 70%" is explicitly OpenClonk's own single-project maximum, stated in the paper as "(up to 70% for OpenClonk project)." Never present it as a general games claim.
3. *Q: Does the paper itself say it has no Unity/Unreal projects, and does it call that a limitation?* **A:** The sample really does contain no Unity/Unreal titles (it's restricted to C/C++/Objective-C desktop OSS games), but the paper's own "Threats to Validity" section never names Unity, Unreal or "game engine" — this is Raphael's own inference from the sample-selection criteria, not a stated limitation of the paper.

**Two traps (never write these):**
1. **Never write "70% of a game repo is multimedia" or imply it's an average.** It's OpenClonk's single-project maximum only — refuted as a general claim.
2. **Never write "the paper states no Unity/Unreal projects were used, as a limitation."** The absence is true; calling it a paper-stated limitation is not — the paper's own Threats to Validity section never says this. Frame it as your own inference, exactly as the draft entry already does.

---

## 6. Dourish and Bellotti (1992) — "Awareness and coordination in shared workspaces"

**Where to get it:** Downloaded — `reading/dourish1992.pdf` (author postprint at dourish.com, 99 KB, confirmed `%PDF` header, 9 pages). Free, no login.

**No page numbers exist for citing this paper** — the postprint is 9 pages, the ACM published version is 8 pages (107–114), and no 1:1 mapping exists between them. Cite by section name only, never by page number.

**20-minute fast track:** §3.1 "Problems with Informational and Role-Restrictive Approaches to Awareness" (the three-part structural diagnosis: cost/benefit, sender-determined relevance, sender-controlled timing) and §4 "Shared Feedback" (the passive/by-product mechanism). Skip §2 (the collaborative-writing-systems literature review) and §5.2.

**60-minute full read:** add §4.1–4.3 (the ShrEdit study design — four groups of three designers, one 90-minute session, participants in separate rooms) and §6 Conclusions.

**The draft's entry (retype-and-compare):**
> Dourish and Bellotti (1992) analyse awareness in shared workspaces via small design groups collaborating in ShrEdit. Their diagnosis of explicit reporting has three structural parts (§3.1): the individual supplies information at a cost repaid to the group rather than to the individual; recipients receive only what the sender deems appropriate; and delivery is controlled by the sender, who cannot predict what will be needed or when. Against that they set a taxonomy of informational, role-restrictive and shared-feedback mechanisms, the last collected passively as a by-product of the work itself (§3–4, §6). That is the peer-reviewed ancestry of the aggregation layer I intend to build: reading artefacts instead of asking becomes a mechanism claim, not a convenience. Their scope is narrow — four groups, one 90-minute session, participants in separate rooms (§4.1–4.3) — so extending it to asynchronous, week-long work is mine to defend.

**Three comprehension questions:**
1. *Q: What are the three structural problems with explicit reporting, per §3.1?* **A:** (1) the reporter bears a cost that's repaid to the group, not to them personally; (2) recipients only get what the sender judges appropriate, which may not match their actual needs; (3) the sender controls timing of delivery, but can't predict what the recipient will actually need or when.
2. *Q: What is "shared feedback" and how does it differ from the other two mechanisms?* **A:** It's the third mechanism in their taxonomy (alongside informational and role-restrictive) — it makes information about individual activities apparent to others by presenting feedback within the shared workspace itself, collected passively as a by-product of the work, without adding to the producer's workload.
3. *Q: How big was the ShrEdit study, and was it synchronous/co-present?* **A:** Four groups of three designers were analysed (not the total run — the paper never states a grand total), doing a 90-minute design problem after two 20-minute practice problems. It was remote, not co-present — participants were placed in separate locations, linked via video and/or audio.

**Two traps (never write these):**
1. **Never write "n = 12" as a figure the paper states.** It's an unstated arithmetic inference (3 designers × 4 analysed groups) — the paper never prints a total participant or group count.
2. **Never attribute a "reporting channel decays over time" claim to Dourish and Bellotti.** A full-text search for decay/abandon/disuse/stale/lapse returned zero hits. Their claim is a *static* cost/benefit asymmetry, not a longitudinal decay argument — that decay idea belongs to Grudin (1988), which nobody on this project has read yet, so don't substitute it either.

---

## Five-evening schedule (Fri 18 Sep – Tue 22 Sep 2026)

Whitson first, because it's the one access route that can fail and needs the most lead time to recover from if it does (Substitute A trigger). 2–2.5 h per evening.

| Evening | Date | Task | Est. time |
|---|---|---|---|
| **1** | Fri 18 Sep | Whitson full text at PubMed Central (no login; fast track, 20 min) → retype the draft entry from memory, compare, correct → Maddila fast track (20 min) → retype/compare. Buffer for the Whitson library-access fumbling that always eats more time than planned. | 2–2.5 h |
| **2** | Sat 19 Sep | Bertram fast track + retype/compare (20 min) → Ko fast track + retype/compare (20 min), remembering the digit-drop PDF-text-layer trap → if time remains, go back and do Whitson's 60-minute full read instead of the fast track, since it's highest-risk. | 2–2.5 h |
| **3** | Sun 20 Sep* | Pascarella fast track + retype/compare (20 min) → Dourish & Bellotti fast track + retype/compare (20 min) → start assembling all six potted summaries into one page for quick recall before Q&A. **Note: A2 is due 20 Sep 11:55pm** — if this schedule is being followed literally the submission deadline lands mid-schedule; treat Day 3 as the day the draft itself must be finalised and submitted, and use Days 4–5 for consolidation/over-learning rather than new reading. | 2–2.5 h |
| **4** | Mon 21 Sep | Full 60-minute reads for whichever two sources felt shakiest on the self-check questions above (pick the two you got a question wrong on). Rehearse the Nudge Q&A defence in DOSSIER.md §4 aloud once. | 2–2.5 h |
| **5** | Tue 22 Sep | Cold retest: cover the draft, write all six potted summaries from memory in one sitting, then compare against the drafts above and this kit's "comprehension questions" section. Fix any gaps. Confirm the GenAI-use log entry for this reading pass (Task list, DOSSIER.md is heavily AI-assisted — this kit counts as AI assistance to log). | 2 h |

*Caveat the orchestrator/Raphael should note: the submission deadline (Sun 20 Sep, 11:55pm) falls on Evening 3 of this five-evening span, so if A2 hasn't already been submitted by the time this schedule starts, Evening 3 needs to prioritise finishing and submitting the proposal over finishing the reading — the reading's value is comprehension for the live Q&A and future work, which survives past the submission deadline; a missed submission does not.
