"""Third trim after the round-4 edits (Word body was 2,487; ceiling 2,472). Exact-match; nothing written if any match fails."""
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

rep("comes from tickets (the tracker's task records) and from stand-up meetings.", "comes from tickets (the tracker's task records) and stand-up meetings.")
rep("Team B, a product development team within a large gaming company (p. 293),", "Team B, a product development team in a large gaming company (p. 293),")
rep("because it still asks the under-reporting party to report, which is why my evaluation scores", "because it still asks the under-reporting party to report, so my evaluation scores")
rep("(Figure 1; a share of changed-file entries with .meta siblings counted as non-code, so indicative only)", "(Figure 1; changed-file entries with .meta siblings counted as non-code, so indicative only)")
rep("at a large Canadian game studio, on how game engines and art tools shape work across disciplines.", "at a large Canadian game studio, asking how engines and art tools shape work across disciplines.")
rep("Whitson's answer is therefore opacity plus blame on the tool,", "Whitson's answer is opacity plus blame on the tool,")
rep("Nudge sets the bar for my hardest costed feature, flagging work gone quiet. That feature must compose across items and read asset activity, or it adds nothing.",
    "Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.")
rep("Two sub-questions structure the evaluation of the research question.", "Two sub-questions structure the evaluation.")
rep("is marked derivable, partly derivable or not derivable against a named artefact,", "is marked derivable, partly derivable or not against a named artefact,")
rep("and answer six matched questions per report; six of them then think aloud on a stand-up task.", "and answer six matched questions per report; six then think aloud on a stand-up task.")
rep("both report weeks come from SS3D, an open-source multiplayer station game, and the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.",
    "both report weeks come from SS3D, an open-source multiplayer station game; the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-4 trim 3 applied")
