"""Round 7 edits (19 Sep 2026). Run from the sprint folder: python audit/apply-round7-edits.py
Each replacement must match exactly once. Sources: audit/FINDINGS-round-7.md, audit/verified-additions-round-7.md."""
import io, sys
P = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
n = 0
def rep(old, new):
    global s, n
    c = s.count(old)
    if c != 1:
        print("FAIL (%d matches): %s" % (c, old[:80])); sys.exit(1)
    s = s.replace(old, new); n += 1

# Introduction
rep("so a report that reads only code misses most of the week.", "so a code-only report misses most of the week.")
rep("tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026)",
    "tracker and repository summarisers stop at engineers or product teams (ZeroStandup, n.d.; Linear, 2026)")

# Literature Review — map (Mitchell 2: name the four)
rep("Four further studies supply what the test needs: evidence that the record does fail, a way to break a producer's needs into pieces, the file mix that makes games different, and a bar for reporting what has stopped moving.",
    "Bertram et al. (2010) show where the record fails. Ko et al. (2007) give me a way to cut a producer's needs into pieces. Pascarella et al. (2018) show why games differ: most changed files are not code. Maddila et al. (2023) set the bar for flagging work gone quiet.")
# Bertram (Malcolm: re-read sentence)
rep("That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report, so my evaluation scores each report against the team's history, not its tickets.",
    "That remedy still asks the under-reporting party to report, so I do not take it: my evaluation scores each report against the team's history, not its tickets.")
# Ko (trims)
rep("One finding fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work.",
    "One finding fixed my unit of analysis: a developer's needs break into 21 information types across seven kinds of work.")
rep("Those 21 types let me answer the question need by need and give the think-alouds their coding frame.",
    "Those 21 types give the think-alouds their coding frame.")
# Pascarella (trim) + Figure 1 caption (both markers: reference line withdrawn)
rep("so I measured six Unity repositories myself, including my own team's (Figure 1), and the report categorises by file type rather than by code alone.",
    "so I measured six Unity repositories myself, including my own team's (Figure 1); the report therefore categorises by file type.")
rep("![Figure 1. Code share of changed-file entries in five open-source Unity repositories and my own team's, against Pascarella et al.'s 30% file-category share (a different denominator).](figures/fig4-code-file-percentage.png \"w=14\")",
    "![Figure 1. Code share of changed-file entries in six Unity repositories, five open-source and my own team's: code is a minority in every one (7–36%).](figures/fig4-code-file-percentage.png \"w=14\")")
# Dourish & Bellotti (fact-finder: five categories; Malcolm 2 payment; trim)
rep("names an intention while touching 35 files across six categories.", "names an intention while touching 35 files across five categories.")
rep("Against that they set shared feedback collected passively as a by-product of the work itself. That is the tool I propose: it reads artefacts instead of asking people.",
    "Against that they set feedback collected passively as a by-product of the work itself, which is the tool I propose: it reads artefacts instead of asking people.")
rep("Their evidence is narrow (four groups, one session); extending it to week-long work is mine to defend.",
    "Their evidence is narrow: four groups, one session.")
# Whitson (scout: exact site wording; concrete instance; Mitchell 2 payment)
rep("at a large Canadian game studio.", "at a large international game studio in Canada.")
rep("Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise. Whitson's answer is therefore opacity: the tool hides causes, and blaming it keeps the team moving.",
    "One shark model imported into Unity simply would not animate. Whitson's answer is therefore opacity: the tool hides causes, and blaming the tool rather than a teammate keeps the team moving.")
# Maddila (trim)
rep("Nudge sets the bar for my hardest costed feature, flagging work gone quiet:", "Nudge sets the bar for my challenge tier, flagging work gone quiet:")
# Synthesis (Malcolm 4 / Mitchell 8; third explanation named for the goal)
rep("All six reviewed studies show the same seam: the record is thinner than the work.",
    "The six do three jobs: Bertram and Maddila show the record failing and the bar a fix must clear; Dourish and Bellotti and Whitson explain why; Pascarella and Ko describe what a game week and a reader's needs are made of.")
rep("add the audience answer: a stand-up-turned-status-report serves the manager, not the team.",
    "add a third explanation, audience: a stand-up that turns into status reporting to the manager stops serving the team.")
rep("they record outcomes, not the reporting behind them, so the seam must be found in artefacts.",
    "postmortems record outcomes, not reporting, which is one more reason to look in artefacts.")

# Learning Goals (contradiction; Mitchell 4)
rep("distinguishing three competing mechanisms.", "distinguishing the structural, opacity and audience explanations.")
rep("*Measure:* given an unfamiliar Unity week, I produce a one-page report naming 60% of its changed prefabs and scenes, and can tie each layout decision to a named reader need, two of them defended against a rejected alternative.",
    "*Measure:* given an unfamiliar Unity week, I can tie each layout decision in its one-page report to a named reader need, two of them defended against a rejected alternative.")
rep("In those roles, writing the status that non-technical stakeholders act on is daily work; six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners.",
    "There, writing the status that non-technical stakeholders act on is daily work; six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners (Appendix A).")

# Scoping Evidence (Malcolm 9; Mitchell 6, 7)
rep("Deliverable 1 runs first: its interviews, reviews and job-ad scan produce the needs list, and its heuristic evaluation records what existing tools already answer.",
    "Deliverable 1 runs first and produces the needs list; its heuristic evaluation records what existing tools already answer.")
rep("A pilot session runs first and is excluded; each session is then 45 minutes.",
    "A pilot session runs first; its data is excluded. Each session then lasts 45 minutes.")
rep("and teammates are briefed with a one-page scenario. The target is eight readers,",
    "and teammates are briefed with a one-page scenario. Student producers and briefed proxies stand in for studio producers; that limit is reported, not hidden. The target is eight readers,")
rep("One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing. Scores are compared within each participant; at eight readers the arm shows direction and per-item failure points, not significance.",
    "One item per report is unanswerable, to catch guessing. I report each participant's treatment-minus-baseline difference over the five scored items, by item and level; at eight readers that shows direction and failure points, not significance.")

# Deliverables (naming target moved from the goal; Malcolm 7; tier trims; schedule as its own paragraph)
rep("Generated unedited for every sampled team-week; 90% of changed files categorised |",
    "Generated unedited for every sampled team-week; 90% of changed files categorised and 60% of changed prefabs and scenes named |")
rep("a spec classifying 25 needs by artefact source (Sub-question 1) (3 h)",
    "a spec classifying 25 needs (seeded from Ko et al.'s 21 types) by artefact source (Sub-question 1) (3 h)")
rep("two outside viewers can each state its purpose and intended reader after one viewing",
    "two outside viewers can each state its purpose and reader after one viewing")
rep("The committed tier (11 hours) delivers the extractor, the one-page report and baseline, and object naming of prefabs and scenes from the text Unity versions (Figure 3).",
    "The committed tier (11 hours) delivers the extractor, both report versions, and object naming of prefabs and scenes from Unity's text serialisation (Figure 3).")
rep("show ungated alerting misfires. An overrun consumes the stretch and challenge hours first.",
    "show ungated alerting misfires; an overrun consumes these two tiers first.")
rep("A live tracker connection is out of scope, since no repository I screened links issues densely enough; so is",
    "A live tracker connection is out of scope (no screened repository links issues densely enough); so is")
rep("an unscorable week is replaced and a contradicted claim repaired. Deliverable 1 runs across the break and Week 9;",
    "an unscorable week is replaced and a contradicted claim repaired.\n\nDeliverable 1 runs across the break and Week 9;")

# Appendix A (uncounted): Linear row; screen wording; job-ad note
rep("| Linear (2026) | Issues, documents, code changes, Slack | Agent-drafted project updates | Product teams | No engine or asset signals |",
    "| Linear (2026) | Linear issues and projects, linked Slack channel | Agent-drafted project updates | Product teams | No repository, engine or asset signals |")
rep("Five repositories screened; all exceed the asset threshold;", "Five public repositories screened (my own team's is reported below); all exceed the asset threshold;")
rep("but none is linked to one.\n",
    "but none is linked to one.\n\n**Job-advertisement sample (September 2026).** Ten producer-family advertisements from LinkedIn, gamejobs.co and workwithindies.com (Seek blocked automated retrieval), nine distinct employers once two identical Aristocrat requisitions are counted once; four Australian; three listings already closed when sampled. Six of the nine employers ask for progress or status reporting to leadership, publishers or partners, for example Light & Wonder (\"status reports for leadership\"), Devolver Digital (\"communication with partners on progress, risks, and changes\") and GameName (\"reporting for studio leadership\"). A convenience sample; Deliverable 1's coded scan replaces it.\n")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits")
