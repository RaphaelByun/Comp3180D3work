"""Trims after the round-4 edits so body + cover stays under the 2,499 cap. Exact-match; nothing written if any match fails."""
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

# Introduction
rep("Existing tools each cover one part (sweep in Appendix A). Summarisers of trackers and repositories stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and the closest, Perforce's P4 MCP, narrates asset history for developers rather than producers (Perforce Software, n.d.). None reads the Unity asset layer to tell a producer what changed; that is the gap this project fills, with fusion of tracker, repository and engine signals left as future work.",
    "Existing tools each cover one part (sweep in Appendix A): tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and Perforce's P4 MCP narrates asset history for developers, not producers (Perforce Software, n.d.). None reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.")

# Literature Review
rep("Of the other sources, Bertram et al. (2010) show the failure, Ko et al. (2007) supply the unit of analysis, Pascarella et al. (2018) the games file mix, and Maddila et al. (2023) the bar for detecting absence.",
    "Bertram et al. (2010) show the failure; Ko et al. (2007), Pascarella et al. (2018) and Maddila et al. (2023) supply the unit of analysis, the games file mix and the bar for detecting absence.")
rep("Even with everyone in one room, the tracker was the central communication channel for stakeholders inside and beyond the team (p. 291).",
    "Even with everyone in one room, the tracker was the team's central communication channel (p. 291).")
rep("That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report. It is why my evaluation scores each report against what the team's history shows, not against its tickets.",
    "That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report, which is why my evaluation scores each report against the team's history, not its tickets.")
rep("The taxonomy is a developer's, so only part of it transfers. The Maintaining Awareness kind, with needs such as \"What have my coworkers been doing?\" (§5.7), is a producer's question too; the debugging kinds are not, and Deliverable 1 tests the transfer by classifying the needs producers actually raise rather than assuming it.",
    "The taxonomy is a developer's, so only part of it transfers: \"What have my coworkers been doing?\" (§5.7) is a producer's question too, the debugging kinds are not, and Deliverable 1 tests the transfer by classifying the needs producers actually raise.")
rep("Developers hunted for that answer in the debugger and logs rather than asking a colleague, so the obstacle was the tool.",
    "Developers looked for it in the debugger and logs, not a colleague, so the obstacle was the tool.")
rep("No Unity or Unreal project appears in its sample, so I measured the file mix on five Unity repositories myself (Figure 1). Their measure is a share of files and mine a share of changed-file entries, with .meta siblings counted as non-code, so the two are indicative rather than comparable; even with .meta excluded, code is under half of the entries in four of the five repositories, and the report categorises by file type rather than by code alone.",
    "No Unity or Unreal project appears in its sample, so I measured the file mix on five Unity repositories myself (Figure 1; a share of changed-file entries with .meta siblings counted as non-code, so indicative only), and the report categorises by file type rather than by code alone.")
rep("Dourish and Bellotti (1992) studied how people stay aware of each other's work in a shared workspace: four groups of three designers solved a 90-minute design problem in a shared editor while the authors watched. Their answer is structural: asking people to report costs the reporter and pays the group, so it under-delivers by design, and recipients get only what the sender judges relevant, when the sender chooses. Their own example of such reporting is the edit log a version-control system asks for at check-in, which today is the commit message; that is why my corpus's \"Fixed bugs\" commits are thin and why the report reads files, not messages. Against that they set",
    "Dourish and Bellotti (1992) watched four groups of three designers solve a 90-minute design problem in a shared editor, asking how people stay aware of each other's work. Their answer is structural: asking people to report costs the reporter and pays the group, so it under-delivers by design, and recipients get only what the sender judges relevant, when the sender chooses. Their own example is the version-control edit log, today's commit message, which is why my corpus's \"Fixed bugs\" commits are thin. Against that they set")
rep("Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise. Unity itself was a boundary object, read differently by art, design, code and production. Whitson's answer is therefore opacity plus blame that lands on the tool, not a general failure to articulate work.",
    "Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise, and Unity itself was a boundary object read differently by art, design, code and production. Whitson's answer is therefore opacity plus blame on the tool, not a general failure to articulate work.")
rep("Nudge predicts when a pull request should have finished, then checks the last 24 hours for comments, pushed commits and state changes, staying silent while those continue.",
    "Nudge predicts when a pull request should have finished, then stays silent while comments, pushed commits or state changes continue within the last 24 hours.")
rep("All six show the same seam: the record is thinner than the work. Dourish and Bellotti make it structural, predicting passive extraction repairs it. Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why. Stray et al. (2016), who interviewed 60 people and observed 79 daily stand-ups across 12 teams, add audience mismatch: a stand-up-turned-status-report serves the manager, not the team.",
    "All six show the same seam: the record is thinner than the work. Dourish and Bellotti predict that passive extraction repairs it; Whitson predicts extraction says what changed but not why; Stray et al. (2016), who studied 12 teams' daily stand-ups, warn that a stand-up-turned-status-report serves the manager, not the team.")

# Scoping Evidence
rep("It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not derivable against a named artefact in the best-linked corpus repository, and the think-aloud follow-up supplies the disagreements.",
    "It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not derivable against a named artefact, with the think-aloud follow-up supplying disagreements.")
rep("In the week shown, 23 of 26 changed prefabs and scenes carry an object name in their changed text, which is why the tier's naming target is set at 60%. Over full histories, code is 7–36% of changed-file entries (Figure 1), so the report is built per week and categorised by file type.",
    "In the week shown, 23 of 26 changed prefabs and scenes carry an object name in their changed text, so the tier's 60% naming target is conservative.")
rep("Deliverable 1 runs first and produces the list of producer needs the research question is asked about: interviews and reviews surface them, the job-ad scan tests whether industry asks for them, and heuristic evaluation records what existing tools already answer. The Evaluate goal then classifies those needs against named artefacts.",
    "Deliverable 1 runs first and produces the list of producer needs the research question is asked about: interviews and reviews surface them, the job-ad scan tests whether industry asks for them, and heuristic evaluation records what existing tools already answer.")
rep("Both versions list the week's commits and changed files grouped by category; the treatment adds named scenes and prefabs.",
    "Both reports list the week's commits and changed files by category; the treatment adds named scenes and prefabs.")
rep("every COMP3151 team has a student producer, and teammates are briefed into the role with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each. If fewer than five are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance for student studies, with verbal consent, the right to stop at any time and de-identified reporting.",
    "every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each; if fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance, with verbal consent, the right to stop and de-identified reporting.")
rep("One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing. At eight readers, a Wilcoxon signed-rank test detects large effects only.",
    "One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing; at eight readers, a Wilcoxon signed-rank test detects large effects only.")
rep("The judge is the team's record read by hand: diffs, issue threads and release notes the generator never reads. The check can falsify naming and activity claims, not mechanical file counts.",
    "The judge is the team's record read by hand (diffs, issue threads and release notes the generator never reads), so the check can falsify naming and activity claims, not file counts.")
rep("I screened five public Unity repositories on asset volume and issue-linking rate (thresholds in Appendix A).",
    "I screened five public Unity repositories on asset volume and issue-linking rate (Appendix A).")

# Deliverables
rep("and object naming of prefabs and scenes from the text Unity versions (Figure 3), with a file-level fallback.",
    "and object naming of prefabs and scenes from the text Unity versions (Figure 3).")
rep("so is a language-model prose layer, the commoditised alternative, which could not pass the fidelity check.",
    "so is a language-model prose layer, which could not pass the fidelity check.")

# Appendix A (uncounted): the .meta-excluded shares and the Anchorpoint row
rep("Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0.",
    "Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0. Code share of changed-file entries with .meta files excluded from both numerator and denominator: SS3D 33%, open-brush 40%, VRTK 57%, jynew 12%, Unity Experiment Framework 23% (against 17.5%, 23.6%, 36.4%, 7.4% and 19.2% with .meta counted as non-code).")
rep("| McShaffry (2013), GDC talk | Perforce logs, mined by hand | Charts for scheduling | Producers | Manual; never productised |",
    "| Anchorpoint (n.d.) | Git history of Unity, Unreal and Godot projects | Thumbnails, visual review, file locks | Artists, developers | No change report for producers |\n| McShaffry (2013), GDC talk | Perforce logs, mined by hand | Charts for scheduling | Producers | Manual; never productised |")
rep("Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001).",
    "Anchorpoint. (n.d.). *Anchorpoint: Version control software for 3D*. Retrieved September 18, 2026, from https://www.anchorpoint.app/\n\nAnderson, L. W., & Krathwohl, D. R. (Eds.). (2001).")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-4 trims applied")
