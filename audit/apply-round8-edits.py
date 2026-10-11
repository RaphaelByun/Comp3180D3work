"""Round 8 edits (19 Sep 2026). Run from the sprint folder: python audit/apply-round8-edits.py
Each replacement must match exactly once. Sources: audit/FINDINGS-round-8.md, audit/verified-additions-round-8.md."""
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

# Introduction — novelty claim made conjunction-explicit (Malcolm 1); brings Anchorpoint and Unity into the body (Mitchell 10)
rep("so what they know comes from tickets (the tracker's task records) and stand-ups.", "so what they know comes from tickets and stand-ups.")
rep("Seven surveyed tools each cover one part (Appendix A): tracker and repository summarisers stop at engineers or product teams (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and Perforce's P4 MCP narrates asset history for developers, not producers (Perforce Software, n.d.). None of the seven reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.",
    "Seven surveyed tools each cover one part (Appendix A): summarisers of tickets and commits stop at engineers or product teams (ZeroStandup, n.d.; Linear, 2026); game-native trackers rely on manual entry (HacknPlan, n.d.); Perforce's P4 MCP and Anchorpoint read asset history for developers and artists (Perforce Software, n.d.; Anchorpoint, n.d.); Unity's own pipeline, in closed beta, reviews renders and builds (Unity Technologies, n.d.). None turns the asset layer into a week's account for a producer; that is the gap this project fills.")

# Literature Review — plain overview (Malcolm 2 / Mitchell 2 compromise: roles first, names in brackets)
rep("Bertram et al. (2010) show where the record fails. Ko et al. (2007) give me a way to cut a producer's needs into pieces. Pascarella et al. (2018) show why games differ: most changed files are not code. Maddila et al. (2023) set the bar for flagging work gone quiet.",
    "A third, the audience a report is written for, arrives with Stray et al. (2016) at the end. Four further studies fill in what the explanations leave out: where the record fails (Bertram et al., 2010), what a reader needs to know (Ko et al., 2007), why a game week differs from a software week (Pascarella et al., 2018), and the bar an absence-detector must clear (Maddila et al., 2023).")
# Bertram trim
rep("Team B, a product development team in a large gaming company (p. 293), had to build a simplified filing interface before non-experts would file anything at all (p. 297).",
    "Team B, in a large gaming company (p. 293), had to build a simplified filing interface before non-experts would file anything (p. 297).")
# Ko — split the 46-word sentence (Malcolm 7)
rep("The taxonomy is a developer's, so only part of it transfers: \"What have my coworkers been doing?\" (§5.7) is a producer's question too, the debugging kinds are not, and Deliverable 1 tests the transfer by classifying the needs producers actually raise.",
    "The taxonomy is a developer's, so only part of it transfers. \"What have my coworkers been doing?\" (§5.7) is a producer's question too; the debugging kinds are not. Deliverable 1 tests that transfer by classifying the needs producers actually raise.")
# Pascarella — 'owned' parenthetical (Malcolm second-read 3); caption states its basis (Mitchell 7)
rep("In games, sub-teams form around non-code categories such as multimedia (owned means above a 75% contribution share).",
    "In games, sub-teams own non-code categories such as multimedia (ownership means above a 75% contribution share).")
rep("![Figure 1. Code share of changed-file entries in six Unity repositories, five open-source and my own team's: code is a minority in every one (7–36%).](figures/fig4-code-file-percentage.png \"w=14\")",
    "![Figure 1. Code share of changed-file entries in six Unity repositories, five open-source and my own team's, .meta files counted as non-code: 7–36% (Appendix A gives the .meta-excluded shares).](figures/fig4-code-file-percentage.png \"w=14\")")
# Dourish trim
rep("Their answer is structural: asking people to report costs the reporter and pays the group,", "Their answer is structural: reporting costs the reporter and pays the group,")
# Whitson — evaluation of the source (Mitchell 3); 'therefore' softened (Malcolm second-read 4)
rep("Whitson's answer is therefore opacity: the tool hides causes, and blaming the tool rather than a teammate keeps the team moving. If opacity is the mechanism, extraction names what changed but not why, so the think-aloud follow-up asks what the page leaves unexplained.",
    "Whitson reads this as opacity: the tool hides causes, and blaming the tool rather than a teammate keeps the team moving. Ten interns at one studio is a narrow, interpretive base, so I treat opacity as a hypothesis: if it holds, extraction names what changed but not why, and the think-aloud follow-up asks what the page leaves unexplained.")
# Synthesis — fact-finder (Maddila sets the bar; Bertram shows the failure); Malcolm 9 conjunction; 'Two further studies' now redundant
rep("The six do three jobs: Bertram and Maddila show the record failing and the bar a fix must clear; Dourish and Bellotti and Whitson explain why; Pascarella and Ko describe what a game week and a reader's needs contain.",
    "The six do three jobs. Bertram shows the record failing and Maddila sets the bar a fix must clear. Dourish and Bellotti, with Whitson, explain why. Pascarella and Ko describe what a game week and a reader's needs contain.")
rep("Two further studies bound the claim. Stray et al. (2016), who studied 12 teams' daily stand-ups, add a third explanation, audience:",
    "Stray et al. (2016), who studied 12 teams' daily stand-ups, add the third explanation, audience:")

# Learning Goals — body matches Appendix A (Malcolm 10)
rep("six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners (Appendix A).",
    "six of the nine employers in a ten-advertisement sample from September 2026 ask for progress reporting to leadership or partners (Appendix A).")

# Scoping Evidence — RQ referenced, not restated (pays for the changes below)
rep("The research question is *Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?* Two sub-questions structure its evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer? Each need in Deliverable 1's specification is marked derivable, partly derivable or not against a named artefact, twice a week apart, with disagreements reported.",
    "Two sub-questions structure the evaluation of the research question. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker, the repository and the Unity asset layer? Deliverable 1's specification marks each need derivable, partly derivable or not derivable against a named artefact. I repeat the marking a week later and report where the two passes disagree.")
# SS3D introduced; tier glossed (Mitchell 1); fallback clause cut
rep("ChangeLens is a Unity Editor package (Unity 6.4): it reads a git log export for one week,",
    "The study's material is SS3D (Space Station 3D), a large open-source Unity game whose public history supplies real team-weeks. ChangeLens is a Unity Editor package (Unity 6.4): it reads a git log export for one week,")
rep("The prototype classifies files only; the committed tier adds object naming (Figure 3), where the AssetDatabase resolves identifiers to asset and script names without a parser.",
    "The prototype classifies files only; the committed tier (the version I commit to delivering) adds object naming (Figure 3), with the AssetDatabase resolving prefab identifiers to asset and script names.")
rep("Across four SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). The 60% naming target is set against that range, and where no name resolves the report falls back to the file path.",
    "Across four SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown), which sets the 60% naming target.")
# Duplicated Deliverable 1 sentence cut (both markers' payment)
rep("Deliverable 1 runs first and produces the needs list; its heuristic evaluation records what existing tools already answer.\n\n", "")
# Week/condition confound named (Malcolm 3)
rep("counterbalanced by week and order. Each answers six matched questions per report",
    "counterbalanced by week and order. Week difficulty is then a rival explanation, so per-week baseline scores are reported beside the differences. Each answers six matched questions per report")
# Recruitment deadline (Mitchell 6); proxies shortened; floor sentence disambiguated; consent shortened
rep("Student producers and briefed proxies stand in for studio producers, a limit I report. The target is eight readers, six of whom also think aloud, with a floor of five for each. If fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation in interviews and sessions is voluntary, with verbal consent and de-identified reporting.",
    "Briefed proxies stand in for studio producers, a limit I report. The target is eight readers, six of whom also think aloud; the floor is five readers and five think-alouds. Slots are booked by the end of Week 10; if fewer than five readers are confirmed, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary, with verbal consent and de-identified reporting.")
rep("One item per report is unanswerable, to catch guessing.", "One item per report is unanswerable.")
# Sub-question 1 gets participant grounding (Mitchell 4)
rep("The qualitative arm asks what the page leaves a reader needing; the six think-aloud participants then answer a follow-up feeding Sub-question 1.",
    "The qualitative arm asks what the page leaves a reader needing; in a follow-up the six think-aloud participants also classify a ten-need sample for Sub-question 1, and their agreement with my classification is reported.")
# Corpus paragraph (Malcolm second-read 10)
rep("No public Unity repository I screened links issues densely enough to test tracker fusion, and my own team's would not either: its sprint pages were backfilled for a semester and none of its 126 commits cites a Jira issue (Appendix A). The study reads the asset layer only; both report weeks come from SS3D, and the Unity Experiment Framework, the best-linked, serves Sub-question 1.",
    "No public Unity repository I screened links issues densely enough to test tracker fusion, nor does my own team's: its sprint pages were written up after the fact for a semester and none of its 126 commits cites a Jira issue (Appendix A). The study therefore reads the asset layer only; the Unity Experiment Framework, the best-linked repository, serves Sub-question 1.")

# Deliverables — pilot costed (Mitchell 5, one hour moved from row 1 reviews to row 5; totals unchanged); row 1 cell shortened (Malcolm 6)
rep("| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics (5 h); 10 job ads and 25 reviews coded (3 h); two 20-minute interviews outside the reader pool (2 h); a spec classifying 25 needs (seeded from Ko et al.'s 21 types) by artefact source (Sub-question 1) (3 h) | 13 | 2 |",
    "| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994) (5 h); 10 job ads and 15 reviews coded (2 h); two 20-minute interviews outside the reader pool (2 h); 25 needs classified by artefact source, seeded from Ko et al.'s 21 types (3 h) | 12 | 2 |")
rep("| 5 | Sessions run and coded | Eight 45-minute sessions plus scheduling and setup (7 h); six think-alouds coded from timestamped notes (7 h) | 14 | 4 |",
    "| 5 | Sessions run and coded | Nine 45-minute sessions including the pilot, plus scheduling and setup (8 h); six think-alouds coded from timestamped notes (7 h) | 15 | 4 |")
rep("90% of changed files categorised and 60% of changed prefabs and scenes named |", "90% of changed files categorised; 60% of changed prefabs and scenes named across the two study weeks |")
# Tier paragraph (Malcolm 5)
rep("The stretch tier (3 hours) parses Unity's build report, which the prototype already reads (Appendix C), and names failed steps",
    "The stretch tier (3 hours) parses Unity's build report (already readable; Appendix C) and names failed steps")
rep("show ungated alerting misfires; an overrun consumes these two tiers first.",
    "show ungated alerting misfires. An overrun consumes the challenge tier first, then the stretch tier; the committed tier is not negotiable.")
# Calendar: pilot in Week 11
rep("the fidelity check and tier freeze in Week 11, sessions in Week 12,", "the fidelity check, tier freeze and pilot in Week 11, sessions in Week 12,")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits")
