"""Second trim after the round-4 edits (Word body was 2,552; ceiling 2,472). Exact-match; nothing written if any match fails."""
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
rep("Today a technical lead translates for the producer by hand.", "Today a technical lead translates by hand.")
rep("Existing tools each cover one part (sweep in Appendix A):", "Existing tools each cover one part (Appendix A):")
rep("ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scene content, for someone who never opens the codebase.",
    "ChangeLens is a Unity Editor tool that reads the files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scenes, for someone who never opens the codebase.")

# Literature Review
rep(" Even with everyone in one room, the tracker was the team's central communication channel (p. 291).", "")
rep("In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games they form around code only, so a report that follows code alone is blind to whole ownership groups.",
    "In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games only around code, so a code-only report is blind to whole ownership groups.")
rep("Their own example is the version-control edit log, today's commit message, which is why my corpus's \"Fixed bugs\" commits are thin.",
    "Their own example is the version-control edit log, today's commit message; my corpus's \"Fixed bugs\" commits show the cost.")
rep("That is the case for the tool I propose, which reads artefacts instead of asking people. Their evidence is narrow (four groups, one session), so extending it to week-long work is mine to defend.",
    "That is the tool I propose: it reads artefacts instead of asking people. Their evidence is narrow (four groups, one session); extending it to week-long work is mine to defend.")
rep("and Unity itself was a boundary object read differently by art, design, code and production.",
    "and Unity itself was a boundary object that each discipline read differently.")
rep("If opacity rather than structure is the mechanism, extraction names what changed but not why,",
    "If opacity is the mechanism, extraction names what changed but not why,")
rep("and each verdict stays inside its own pull request, never composed across items.", "and each verdict stays inside its own pull request.")

# Scoping Evidence
rep("The prototype classifies files only. The committed tier adds object naming (Figure 3), where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a hand-written parser.",
    "The prototype classifies files only; the committed tier adds object naming (Figure 3), where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a parser.")
rep("ChangeLens is a Unity Editor package (Unity 6.4) that turns a week of git history into a grouped change report: one window reads a git log export,",
    "ChangeLens is a Unity Editor package (Unity 6.4) that turns a week of git history into a grouped change report: it reads a git log export,")
rep("Deliverable 1 runs first and produces the list of producer needs the research question is asked about: interviews and reviews surface them, the job-ad scan tests whether industry asks for them, and heuristic evaluation records what existing tools already answer.",
    "Deliverable 1 runs first and produces the list of producer needs the question is asked about: its interviews, reviews and job-ad scan surface and test them, and its heuristic evaluation records what existing tools already answer.")
rep("The qualitative arm asks what the page leaves a reader needing. The six think-aloud participants then answer",
    "The qualitative arm asks what the page leaves a reader needing; the six think-aloud participants then answer")
rep("One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing; at eight readers, a Wilcoxon signed-rank test detects large effects only.",
    "One item per report is unanswerable, so its \"the report doesn't tell me\" option catches guessing.")
rep("Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted. The judge is the team's record read by hand (diffs, issue threads and release notes the generator never reads), so the check can falsify naming and activity claims, not file counts.",
    "Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not file counts.")

# Deliverables
rep("two 20-minute interviews with producers outside the reader pool (2 h)", "two 20-minute interviews outside the reader pool (2 h)")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-4 trim 2 applied")
