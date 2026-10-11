"""Loop round 5 edits (audit/FINDINGS-round-5.md): make the question and the experiment agree, restate the
research question in Scoping Evidence, a plain Literature Review map, the full schedule, the analysis clause,
caption/date reconciliation, and the readability splits both markers named. Exact-match; nothing written if any match fails."""
import io

p = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

# ---------- Introduction ----------
rep("The project delivers that tool and an evaluation in which eight student producers read two versions of the report, one with and one without the Unity asset layer (the scenes, prefabs and .meta files Unity already versions). The proposal asks:",
    "The project delivers that tool and an evaluation in which eight student producers read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not. The proposal asks:")
rep("Existing tools each cover one part (Appendix A):", "Seven surveyed tools each cover one part (Appendix A):")

# ---------- Literature Review ----------
rep("Why is a team's shared record thinner than the work it describes? Three answers compete. Dourish and Bellotti (1992) make it structural: reporting costs the reporter. Whitson (2018) makes it opacity: the tool hides causes and takes the blame. Stray et al. (2016) make it audience: the report serves the wrong reader. Bertram et al. (2010) show the failure; Ko et al. (2007), Pascarella et al. (2018) and Maddila et al. (2023) supply the unit of analysis, the games file mix and the bar for detecting absence.",
    "Why is a team's shared record thinner than the work it describes? Two explanations compete, and they predict different things about my tool. Dourish and Bellotti (1992) blame the structure of reporting: it costs the reporter and pays everyone else. Whitson (2018) blames the tools: developers cannot always see why the software did what it did. A third answer, audience, comes from outside the six and is weighed at the end. The other four sources supply pieces rather than mechanisms: evidence of the failure (Bertram et al., 2010), the unit of analysis (Ko et al., 2007), the file mix in games (Pascarella et al., 2018) and a bar for reporting what has stopped moving (Maddila et al., 2023).")
rep("Team B, a product development team in a large gaming company (p. 293), wrote a simplified filing interface before non-experts would file at all (p. 297).",
    "Team B, a product development team in a large gaming company (p. 293), had to build a simplified filing interface before non-experts would file anything at all (p. 297).")
rep("Those 21 types let me answer the research question need by need and give my think-aloud sessions (a participant says what they are thinking while working) their coding frame.",
    "Those 21 types let me answer the research question need by need and give my think-aloud sessions their coding frame.")
rep("In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games only around code, so a code-only report is blind to whole ownership groups. No Unity or Unreal project appears in its sample, so I measured the file mix on five Unity repositories myself (Figure 1; changed-file entries with .meta siblings counted as non-code, so indicative only), and the report categorises by file type rather than by code alone.",
    "In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold. In non-game projects, ownership groups form only around code, so a code-only report is blind to whole disciplines. No Unity or Unreal project appears in its sample, so I measured five Unity repositories myself (Figure 1), and the report categorises by file type rather than by code alone.")
rep("![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png \"w=14\")",
    "![Figure 1. Code share of changed-file entries in five open-source Unity repositories, against Pascarella et al.'s 30% file-category share (a different denominator).](figures/fig4-code-file-percentage.png \"w=14\")")
rep("Their own example is the version-control edit log, today's commit message; my corpus's \"Fixed bugs\" commits show the cost.",
    "Their own example is the version-control edit log, today's commit message; my corpus's \"Fixed bugs\" commits show how little it captures.")
rep("Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise, and Unity itself was a boundary object that each discipline read differently. Whitson's answer",
    "Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise. Whitson's answer")
rep("Maddila et al. (2023) built and trialled Nudge, which flags a pull request (one batch of proposed code changes awaiting review) when it goes quiet too long. It is the closest work to absence detection (reporting what has stopped moving); what I learnt is how it avoids false alarms.",
    "Maddila et al. (2023) built and trialled Nudge, which flags a pull request when it goes quiet too long. It is the closest work to absence detection; what I learnt is how it avoids false alarms.")
rep("All six show the same seam: the record is thinner than the work. Dourish and Bellotti predict that passive extraction repairs it; Whitson predicts extraction says what changed but not why; Stray et al. (2016), who studied 12 teams' daily stand-ups, warn that a stand-up-turned-status-report serves the manager, not the team. Washburn et al. (2016) found",
    "All six reviewed studies show the same seam: the record is thinner than the work. Dourish and Bellotti predict that passive extraction repairs it; Whitson predicts extraction says what changed but not why. Two further studies bound the claim. Stray et al. (2016), who studied 12 teams' daily stand-ups, add the audience answer: a stand-up-turned-status-report serves the manager, not the team. Washburn et al. (2016) found")

# ---------- Learning goals ----------
rep("**Understand:** explain three competing mechanisms for why a shared production artefact under-reports.",
    "**Understand:** diagnose why a team's production record under-reports its work, distinguishing three competing mechanisms.")
rep("**Apply → Analyse:** run heuristic evaluation, where an expert checks a tool against a published list of usability rules and records each violation, then reconcile them against interviews and reviews.",
    "**Apply → Analyse:** run heuristic evaluation, then reconcile its findings against interviews and reviews.")
rep("*Measure:* every need classified against a named artefact, with three rejected alternatives.",
    "*Measure:* every need classified against a named artefact, with three needs where I name the artefact I rejected and why.")

# ---------- Scoping Evidence ----------
rep("Two sub-questions structure the evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer? It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not against a named artefact, with the think-aloud follow-up supplying disagreements. Sub-question 2: does the asset layer improve a reader's comprehension of the week?",
    "The research question is *Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?* Two sub-questions structure its evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer? It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not against a named artefact. Sub-question 2: does naming the changed scenes and prefabs improve a reader's comprehension of the week?")
rep("![Figure 2. ChangeLens docked in the Unity 6.4 Editor on one SS3D week (8–14 February 2021) in which airlocks, lights and a floor sign changed.](figures/fig2-changelens-docked-2021.png \"w=14\")",
    "![Figure 2. ChangeLens docked in the Unity 6.4 Editor on the SS3D week of 8–14 February 2021 (commits on 10–14 February); this week runs at 24% code against 17.5% over the repository's history.](figures/fig2-changelens-docked-2021.png \"w=14\")")
rep("Eight student producers each read a baseline report for one team-week and a treatment report for another, with week and order counterbalanced, and answer six matched questions per report; six then think aloud on a stand-up task. Both reports list the week's commits and changed files by category; the treatment adds named scenes and prefabs.",
    "Eight student producers each read a baseline report for one team-week and a treatment report for another, counterbalanced by week and order. Each answers six matched questions per report, and six of them then think aloud on a stand-up task.")
rep("I recruit at the COMP3151 pracs of Weeks 9 and 10, then in my COMP3180 prac; every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each; if fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance, with verbal consent, the right to stop and de-identified reporting.",
    "I recruit at the Week 9 and 10 COMP3151 pracs and my COMP3180 prac; every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each. If fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary, with verbal consent, the right to stop and de-identified reporting.")
rep("The quantitative arm scores the six items against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next. One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing.",
    "The quantitative arm scores the six items against fixed answers at Endsley's (1995) three levels of situation awareness: what changed, what it means, what happens next. One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing. Scores are compared within participant across the two conditions; at eight readers the arm shows direction and per-item failure points, not significance.")
rep("Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not file counts. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.",
    "Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record read by hand. It can falsify naming and activity claims, not file counts. It passes when none is contradicted and 90% are supported. A failing week is repaired and re-scored in Week 11.")
rep("both report weeks come from SS3D, an open-source multiplayer station game; the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.",
    "both report weeks come from SS3D; the Unity Experiment Framework, the best-linked, serves Sub-question 1.")

# ---------- Deliverables ----------
rep("Instruments land in Week 10, check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.",
    "Deliverable 1 runs across the break and Week 9, so the needs list exists before the instruments; the committed tier lands in Week 10 with them; the fidelity check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.")

# ---------- Statement on Generative AI use and Appendix A (uncounted) ----------
rep("five AI-introduced errors were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission as GENAI-EVIDENCE.md, which names the five errors.",
    "five AI-introduced errors (a fabricated quotation, a wrong article substituted for the right one, two conflated counts, a misattributed mechanism and a misdescribed notification recipient) were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission as GENAI-EVIDENCE.md, which names them.")
rep("Code share of changed-file entries with .meta files excluded from both numerator and denominator: SS3D 33%, open-brush 40%, VRTK 57%, jynew 12%, Unity Experiment Framework 23% (against 17.5%, 23.6%, 36.4%, 7.4% and 19.2% with .meta counted as non-code).",
    "Code share of changed-file entries, .meta counted as non-code (the Figure 1 series): SS3D 17.5%, open-brush 23.6%, VRTK 36.4%, jynew 7.4%, Unity Experiment Framework 19.2%; with .meta excluded from both numerator and denominator: 33%, 40%, 57%, 12% and 23%. Figure 2's 24% is one week of SS3D on the first basis.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-5 edits applied")
