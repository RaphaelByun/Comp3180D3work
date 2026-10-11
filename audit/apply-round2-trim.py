"""Trims after the round-2 edits. Exact-match; nothing written if any match fails."""
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

rep(" Their overall conclusion is that the hardest questions concern causes and rationale, and tools serve those worst.", "")
rep(" Their conclusion is that games differ in artefact mix and team specialisation, not only in code.", "")
rep("Unity also worked as a boundary object: one shared tool that art, design, code and production each read differently.",
    "Unity also worked as a boundary object, one tool that art, design, code and production each read differently.")
rep("Nudge sets the bar for the hardest feature I have costed, flagging work gone quiet: it has to compose across items and read asset activity, or it adds nothing.",
    "Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.")
rep("The study is a single 45-minute session per participant, after one pilot session excluded from analysis: eight student producers each read two versions of the same week's report and answer six questions, and six of them then think aloud on a stand-up task.",
    "The study is one 45-minute session per participant, after an excluded pilot: eight student producers each read two versions of one week's report and answer six questions, and six of them then think aloud on a stand-up task.")
rep("Deliverable 1 runs first and surfaces the needs through heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews; its specification is what the Evaluate goal classifies.",
    "Deliverable 1 runs first and surfaces the needs (heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews); its specification is what the Evaluate goal classifies.")
rep("against the team's record read by hand: the full diffs, linked issue threads and release notes, which the generator never reads. It can falsify naming and activity claims, not file counts, which are mechanical. It passes",
    "against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not mechanical file counts. It passes")
rep("None links issues densely enough to test tracker fusion, so the project scopes to the asset layer and treats tracker fusion as future work: both report versions come from the history of SS3D, an open-source multiplayer station game, and the Unity Experiment Framework, the best-linked repository, serves Sub-question 1.",
    "None links issues densely enough to test tracker fusion, so the project scopes to the asset layer and treats tracker fusion as future work; both report versions come from SS3D, an open-source multiplayer station game, and the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.")
rep("A live tracker connection is out of scope because no public repository links issues densely enough and a team's own tracker is private; a language-model prose layer is out of scope because generated narration is the commoditised alternative and could not pass the fidelity check.",
    "A live tracker connection is out of scope (public repositories link issues too sparsely and a team's own tracker is private), as is a language-model prose layer (generated narration is the commoditised alternative and could not pass the fidelity check).")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-2 trims applied")
