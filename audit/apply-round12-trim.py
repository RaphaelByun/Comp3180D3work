"""Round 12 trims to the ceiling (20 Sep 2026). Run after apply-round12-edits.py: python audit/apply-round12-trim.py [path]
Each replacement must match exactly once. No fact is changed."""
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

rep("so the two study weeks and a reserve are drawn from those, listed in Appendix A;", "so the two study weeks and a reserve come from those (Appendix A);")
rep("Three studies then explain why the record thins:", "Three explain why the record thins:")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("trimmed", n, "places in", P)
