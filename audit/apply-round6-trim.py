"""Margin trim after the round-6 edits (Word body was 2,471; ceiling 2,472). Exact-match."""
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
rep("comes from tickets (the tracker's task records) and stand-up meetings.", "comes from tickets (the tracker's task records) and stand-ups.")
rep("(commits on 10–14 February); 24% code against 17.5% over the repository's history.", "(commits on 10–14 February); 24% code against 17.5% over its history.")
rep("The study therefore reads the asset layer only;", "The study reads the asset layer only;")
rep("so the needs list exists before the instruments;", "so the needs list precedes the instruments;")
if fails:
    print("FAILED MATCHES:", fails); raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-6 trim applied")
