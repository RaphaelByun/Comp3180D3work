"""Round 11 proofreader fix (19 Sep 2026). Run from the sprint folder: python audit/apply-round11-proof.py"""
import io, sys
P = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
old, new = "leadership or partners", "leadership, publishers or partners"
if s.count(old) != 1:
    print("FAIL", s.count(old)); sys.exit(1)
s = s.replace(old, new)
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied 1 proof fix")
