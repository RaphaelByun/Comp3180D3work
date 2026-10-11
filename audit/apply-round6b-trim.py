"""Trim after the round-6b edits (Word body was 2,504; ceiling 2,472). Exact-match; nothing written on failure."""
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

rep("Four further studies supply what the argument needs to test those two: evidence that the record really does fail, a way to break a producer's needs into pieces, the file mix that makes games different, and a working bar for reporting what has stopped moving.",
    "Four further studies supply what the test needs: evidence that the record does fail, a way to break a producer's needs into pieces, the file mix that makes games different, and a bar for reporting what has stopped moving.")
rep("(the authors count a file as owned above a 75% contribution share)", "(owned means above a 75% contribution share)")
rep("*Measure:* given an unfamiliar Unity week, I produce a one-page report that names 60% of its changed prefabs and scenes, and can tie every layout decision in it to a named reader need, two of them defended against a rejected alternative.",
    "*Measure:* given an unfamiliar Unity week, I produce a one-page report naming 60% of its changed prefabs and scenes, and can tie each layout decision to a named reader need, two of them defended against a rejected alternative.")
rep("twice a week apart, with disagreements resolved against the artefact and reported.", "twice a week apart, with disagreements reported.")
rep("I measured four SS3D weeks: 46–100% of changed prefabs and scenes carry an object name in their changed text, 23 of 26 in the week shown. The 60% naming target is set against that range; where no name resolves, the report falls back to the file path, so a weak week degrades the report rather than breaking it.",
    "Across four SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). The 60% naming target is set against that range, and where no name resolves the report falls back to the file path.")
rep("A pilot session runs first and is excluded from the results. Each of the eight sessions then runs 45 minutes.",
    "A pilot session runs first and is excluded; each session is then 45 minutes.")
rep("Six matched items per week, each answerable from the report alone, plus rubric and think-aloud script; piloted and revised before Week 12",
    "Six matched items per week, answerable from the report alone; rubric and think-aloud script piloted and revised before Week 12")
rep("Deliverable 1 runs across the break and Week 9, so the needs list precedes the instruments; the committed tier",
    "Deliverable 1 runs across the break and Week 9; the committed tier")
if fails:
    print("FAILED MATCHES:", fails); raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-6b trim applied")
