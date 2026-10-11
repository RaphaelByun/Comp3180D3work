"""Round 11 edits (19-20 Sep 2026). Run from the sprint folder: python audit/apply-round11-edits.py [path]
Each replacement must match exactly once. Sources: audit/FINDINGS-round-11.md, audit/verified-additions-round-11.md."""
import io, sys
P = sys.argv[1] if len(sys.argv) > 1 else "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
n = 0
def rep(old, new):
    global s, n
    c = s.count(old)
    if c != 1:
        print("FAIL (%d matches): %s" % (c, old[:90])); sys.exit(1)
    s = s.replace(old, new); n += 1

# ---------- Introduction: plain overview of the two arms after the research question (Mitchell 5)
rep("The project delivers that tool and an evaluation in which eight student producers read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not. The proposal asks:",
    "The project delivers that tool and a study of it. The proposal asks:")
rep("and which can't?\n\nSeven existing tools each cover one part of this (Appendix A):",
    "and which can't?\n\nTwo arms answer it: eight student producers classify the ten needs producers raise most often against the artefact that could supply each, and read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not, to test whether naming helps. Seven existing tools each cover one part of this (Appendix A):")

# ---------- Literature Review
# names attached to the four further studies (Malcolm 3)
rep("Four further studies supply where the record fails, what a reader needs, why a game week differs, and the bar an absence-detector must clear.",
    "Four further studies fill that picture in: Bertram et al. on where the record fails, Ko et al. on what a reader needs, Pascarella et al. on why a game week differs, and Maddila et al. on the bar an absence-detector must clear.")
# Ko: trims to pay (Malcolm: Ko is nine sentences against Stray's three)
rep(" The taxonomy is a developer's, so only part of it transfers. \"What have my coworkers been doing?\" (§5.7) is a producer's question too; the debugging kinds are not. Deliverable 1 tests that transfer by classifying the needs producers actually raise.",
    " \"What have my coworkers been doing?\" (§5.7) is a producer's question too; the debugging kinds are not. Deliverable 1 tests how far the taxonomy transfers by classifying the needs producers actually raise.")
rep(" Developers looked for it in the debugger and logs, not a colleague, so the obstacle was the tool.", "")
# Pascarella: definitional parenthetical cut to pay
rep("In games, sub-teams own non-code categories such as multimedia (ownership means above a 75% contribution share).",
    "In games, sub-teams own non-code categories such as multimedia.")
# Dourish and Bellotti: split the two-idea sentence (Mitchell 9); compress the appraisal (Malcolm 3 payment)
rep("Against that they set feedback collected passively as a by-product of the work itself, which is the tool I propose: it reads artefacts instead of asking people. Their evidence is narrow: four groups, one session, in 1992, but the mechanism is about incentives, not technology.",
    "Against that they set feedback collected passively as a by-product of the work itself. That is the tool I propose: it reads artefacts instead of asking people. Their evidence is narrow, four groups in one 1992 session, but the mechanism is incentives, not technology.")
# Stray: transfer appraisal and locator (Mitchell 7); Washburn moved here as a reviewed negative source (Malcolm 4, Mitchell 7)
rep("Stray et al. (2016) built a grounded theory of the daily stand-up from 12 teams. The meeting degrades when its audience changes: addressed to the manager rather than the team, it becomes status reporting, and nine interviewees said others tuned out. That is the third explanation, audience: the record thins because of who it is written for.",
    "Stray et al. (2016) built a grounded theory of the daily stand-up from 12 teams in consulting, telecoms and software companies, none of them game teams. The meeting degrades when its audience changes: addressed to the manager rather than the team, it becomes status reporting, and nine interviewees said others tuned out (§4.3). That is the third explanation, audience: the record thins because of who it is written for. Washburn et al. (2016) sorted 155 game postmortems into 22 categories, none of them communication, so postmortems cannot settle the question and I look in artefacts instead.")
# Maddila: independence appraisal (Mitchell 6); limits list shortened to pay
rep("Maddila et al. (2023) built and trialled Nudge, which flags a pull request when it goes quiet too long. What I learnt from it is how it avoids false alarms.",
    "Maddila et al. (2023) built Nudge, which flags a pull request when it goes quiet too long, and trialled it on 147 Microsoft repositories, their own company's, so I take its design lesson rather than its effect size. That lesson is how it avoids false alarms.")
rep("Its limits: every signal comes from inside the pull request, dependencies between items go unhandled, and no verdict is composed across items.",
    "Its limits: every signal comes from inside one pull request, and no verdict is composed across items.")
# Synthesis: no collision with the Introduction's seven tools (Malcolm 6); Washburn out; hinge sentence split (Mitchell 9); tail cut to pay
rep("The seven do three jobs.", "These studies do three jobs.")
rep(" Washburn et al. (2016) found no communication category among 155 game postmortems: postmortems record outcomes, not reporting, one more reason to look in artefacts.", "")
rep("The project bets on the structural mechanism and fixes audience by design, every report being addressed to the producer; if readers can say what changed but not why, opacity wins. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it.",
    "The project bets on the structural mechanism. Every report is addressed to the producer, which settles the audience question by design. If readers can say what changed but not why, opacity wins. My gap is judging what a team's artefacts can and cannot tell a producer.")

# ---------- Learning Goals
rep("*Measure:* unaided, state each mechanism, its source and a breakdown it predicts.",
    "*Measure:* I can state each mechanism unaided, with its source and a breakdown it predicts.")
rep("**Apply → Analyse:**", "**Apply and Analyse:**")
rep("I was the producer on my COMP3151 team and aim for producer or technical-producer roles. There, writing the status that non-technical stakeholders act on is daily work;",
    "I was the producer on my COMP3151 team and aim for producer or technical-producer roles, where writing the status that non-technical stakeholders act on is daily work;")

# ---------- Scoping Evidence: plain overview first, back-references (Malcolm 1 and 5, Mitchell 2)
rep("Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker, the repository and the Unity asset layer? Deliverable 1's specification marks each need derivable, partly derivable or not derivable against a named artefact. All eight readers then classify the same ten needs (the ten most often raised) on a one-page sheet at the end of their session; I report their agreement with one another and with my marking, and treat each disagreement as a finding about what the artefacts cannot say. Sub-question 2:",
    "The study is a within-subjects comparison: eight student producers each read two ChangeLens reports for different SS3D team-weeks, one that names the changed scenes and prefabs (the treatment) and one that does not (the baseline), counterbalanced by week and order, and six of them then think aloud on a stand-up task. Two sub-questions sit under the research question. Sub-question 1: which of the needs surfaced by the tool study (Deliverable 1, below) can be derived, fully or partly, from the tracker, the repository and the Unity asset layer? Its design specification marks each need derivable, partly derivable or not derivable against a named artefact. All eight readers then classify the same ten needs (the ten most often raised) on a one-page sheet at the end of their session; I report their agreement with my marking and treat each disagreement as a finding about what the artefacts cannot say. Sub-question 2:")
# run-in label; SS3D clause trimmed to pay (Malcolm 9)
rep("The study's material is SS3D (Space Station 3D), an open-source Unity game with 710 commits from 68 contributors, whose public history supplies real team-weeks. ChangeLens is a Unity Editor package (Unity 6.4):",
    "**Prototype and corpus.** The study's material is SS3D (Space Station 3D), an open-source Unity game with 710 commits from 68 contributors. ChangeLens is a Unity Editor package (Unity 6.4):")
# committed tier as a back-reference; 60% target reconciled with the four-week measurement (Malcolm 2, Mitchell 4)
rep("The prototype classifies files only; the committed tier (the version I commit to delivering) adds object naming (Figure 3), with the AssetDatabase resolving identifiers to asset and script names. Across four SS3D weeks, between 46% and 100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). Two weeks fall below 60%, so where no name resolves the report shows the file path.",
    "The prototype classifies files only; the version I commit to delivering (the committed tier, costed under Deliverables) adds object naming, with Unity's AssetDatabase resolving identifiers to asset and script names (Figure 3). Across four SS3D weeks, between 46% and 100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). Two fall below 60%, so the study weeks are drawn from weeks that clear it, each week's rate is reported beside its results, and where no name resolves the report shows the file path.")
# corpus paragraph moves up under the prototype label; the Unity Experiment Framework gets its role (Mitchell 3); study-design label; duplicated design sentence removed (paid by the overview)
rep("\n\nNo public Unity repository I screened links issues densely enough, nor does my own team's: its sprint pages were written up after the fact for a semester and none of its 126 commits cites a Jira issue (Appendix A). The study therefore reads the asset layer only; the Unity Experiment Framework, the best-linked repository, serves Sub-question 1.\n\n### Deliverables",
    "\n\n### Deliverables")
rep("![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png \"w=13\")\n\nA pilot session runs first; its data is excluded. Each session then lasts 45 minutes. Eight student producers each read a baseline report for one team-week and a treatment report for another, counterbalanced by week and order. Week difficulty is a rival explanation, so per-week baseline scores are reported too. Each answers six matched questions per report (draft items in Appendix B) before any think-aloud; six of them then think aloud on a stand-up task.",
    "![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png \"w=13\")\n\nNo public Unity repository I screened links issues densely enough, nor does my own team's, where none of 126 commits cites a Jira issue (Appendix A). The study therefore reads the asset layer only; the Unity Experiment Framework, the best-linked repository, supplies the tracker-plus-repository case for Sub-question 1.\n\n**Study design.** A pilot session runs first; its data is excluded. Each session then lasts 45 minutes. Week difficulty is a rival explanation, so per-week baseline scores are reported too. Each reader answers six matched questions per report (draft items in Appendix B) before any think-aloud.")
# recruitment: target sentence now lives in the overview; floor sentence shortened
rep("Briefed proxies stand in for studio producers, a limit I report. The target is eight readers, six of whom also think aloud; the floor is five readers and five think-alouds. Slots are booked by the end of Week 10; below five confirmed readers, the think-alouds run first and the quantitative arm is reported descriptively.",
    "Briefed proxies stand in for studio producers, a limit I report. The floor is five readers and five think-alouds. Slots are booked by the end of Week 10; below five readers, the think-alouds run first and the quantitative arm is descriptive.")
rep("A failing week is repaired and re-scored in Week 11.", "A failing week is repaired and re-scored.")

# ---------- Deliverables: hours moved into the sessions row (Mitchell 1, Malcolm 10); Unity Experiment Framework funded in row 1 (Mitchell 3)
rep("| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994) (5 h); 10 job ads and 15 reviews coded (2 h); two 20-minute interviews outside the reader pool (2 h); 25 needs classified by artefact source, seeded from Ko et al.'s 21 types (3 h) | 12 | 2 |",
    "| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich (1990) and Nielsen (1994) (4 h); 10 job ads and 10 reviews coded (1 h); two 20-minute interviews outside the reader pool (2 h); 25 needs classified by artefact source, seeded from Ko et al.'s 21 types and checked against the Unity Experiment Framework (3 h) | 10 | 2 |")
rep("| 5 | Sessions run and coded | Nine 45-minute sessions including the pilot, plus scheduling and setup (8 h); six think-alouds coded from timestamped notes (7 h) | 15 | 4 |",
    "| 5 | Sessions run and coded | Nine 45-minute sessions including the pilot (7 h); recruiting, booking, briefing and reset (4 h); six think-alouds coded from timestamped notes (7 h) | 18 | 4 |")
rep("| 6 | Evaluation report, instruments, data | All six items and both coding arms reported with agreement; claims traceable to appendices | 7 | 1 |",
    "| 6 | Evaluation report, instruments, data | All six items and both coding arms reported with agreement; claims traceable to appendices | 6 | 1 |")
rep("Deliverable 1 runs across the break and Week 9;", "Deliverable 1, including the repository check, runs across the break and Week 9;")

# ---------- Appendix C (uncounted): the Meta and DataConfig rows are the prototype's full classification, not the producer page (fact-finder round 11; round-10 item e)
rep("Generated by the prototype from the export behind Figure 2 (ss3d-week-2021-02-08-changelens-report.md, 18 September 2026).",
    "Generated by the prototype from the export behind Figure 2 (ss3d-week-2021-02-08-changelens-report.md, 18 September 2026). This is the prototype's full classification; the committed tier's producer-facing page groups Meta and DataConfig into supporting counts beneath code, art, audio and scenes.")

# ---------- Appendix A keeps the sprint-pages fact that left the body
rep("41 mention a commit, branch or pull request in free text but none is linked to one.",
    "41 mention a commit, branch or pull request in free text but none is linked to one; its sprint pages were written up after the fact for a semester.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits to", P)
