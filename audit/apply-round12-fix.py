"""Round 12 fact-finder fix (20 Sep 2026): one naming mechanism described the same way in Scoping Evidence and Deliverables
(object names are plain text in the serialisation; component identifiers are resolved through the AssetDatabase). Run after the trim script."""
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

rep("adds object naming, with Unity's AssetDatabase resolving identifiers to asset and script names (Figure 3).",
    "adds object naming, reading names from the prefab text and resolving component identifiers through Unity's AssetDatabase (Figure 3).")
rep("both report versions and object naming from Unity's text serialisation (Figure 3).",
    "both report versions and object naming from Unity's text serialisation and AssetDatabase (Figure 3).")
rep("carry an object name in their changed text (23 of 26 in the week shown).", "carry an object name in their changed text.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("fixed", n, "places in", P)
