"""Round 13 proofreader fixes (20 Sep 2026). Run from the sprint folder: python audit/apply-round13-proof.py"""
import io, sys
P = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
n = 0
def rep(old, new):
    global s, n
    c = s.count(old)
    if c != 1:
        print("FAIL (%d matches): %s" % (c, old[:90])); sys.exit(1)
    s = s.replace(old, new); n += 1
rep("comments, commits or state changes continued in the last 24 hours", "comments, commits or state changes continue within the last 24 hours")
rep("A pilot runs first; its data is excluded.", "A pilot runs first; its data are excluded.")
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "proof fixes")
