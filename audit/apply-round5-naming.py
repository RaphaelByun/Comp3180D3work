"""Round 5: replace the single-week naming claim with the four-week range. Exact-match."""
import io
p = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(p, encoding="utf-8").read()
old = "In the week shown, 23 of 26 changed prefabs and scenes carry an object name in their changed text, so the tier's 60% naming target is conservative."
new = "Across four sampled SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown), so the tier's 60% naming target sits inside the measured range, with a file-level fallback for the rest."
assert s.count(old) == 1, s.count(old)
s = s.replace(old, new)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("naming range applied")
