"""Trim after the round-5 edits (Word body was 2,527; ceiling 2,472). Exact-match; nothing written if any match fails."""
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
rep("grouped as code, art, audio or scenes, for someone who never opens the codebase.", "grouped as code, art, audio or scenes.")

# Literature Review
rep("Two explanations compete, and they predict different things about my tool.", "Two explanations compete.")
rep("A third answer, audience, comes from outside the six and is weighed at the end. The other four sources supply pieces rather than mechanisms:",
    "A third answer, audience, is weighed at the end. The other four supply pieces, not mechanisms:")
rep("at a large Canadian game studio, asking how engines and art tools shape work across disciplines.", "at a large Canadian game studio, asking how engines and art tools shape work.")
rep("Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289); postmortems record outcomes, not the reporting behind them, so the seam must be found in artefacts, not in what teams say.",
    "Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289): they record outcomes, not the reporting behind them, so the seam must be found in artefacts.")

# Scoping Evidence
rep("ChangeLens is a Unity Editor package (Unity 6.4) that turns a week of git history into a grouped change report: it reads a git log export, classifies each changed path by extension and sibling .meta file, and shows the counts per category (Figure 2).",
    "ChangeLens is a Unity Editor package (Unity 6.4): it reads a git log export for one week, classifies each changed path by extension and sibling .meta file, and shows counts per category (Figure 2).")
rep("where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a parser.",
    "where the AssetDatabase resolves identifiers to asset and script names without a parser.")
rep("so the tier's 60% naming target sits inside the measured range, with a file-level fallback for the rest.",
    "so the tier's 60% naming target sits inside the measured range, with a file-level fallback.")
rep("The study is one 45-minute session per participant, after an excluded pilot.", "Each session is 45 minutes, after an excluded pilot.")
rep("I screened five public Unity repositories on asset volume and issue-linking rate (Appendix A). None links issues densely enough to test tracker fusion, so the study reads the asset layer only; both report weeks come from SS3D; the Unity Experiment Framework, the best-linked, serves Sub-question 1.",
    "No public Unity repository I screened links issues densely enough to test tracker fusion (Appendix A), so the study reads the asset layer only; both report weeks come from SS3D, and the Unity Experiment Framework, the best-linked, serves Sub-question 1.")

# Deliverables
rep("two viewers from outside the unit can each state its purpose and intended reader after one viewing",
    "two outside viewers can each state its purpose and intended reader after one viewing")
rep("the committed tier lands in Week 10 with them; the fidelity check and tier freeze in Week 11,",
    "the committed tier and instruments land in Week 10, the fidelity check and tier freeze in Week 11,")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-5 trim applied")
