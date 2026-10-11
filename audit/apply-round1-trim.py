"""Small trims after the round-1 edits to restore word-count headroom. Exact-match; nothing written if any match fails."""
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

rep("(the September 2026 sweep is in Appendix A; studio-internal tools are not observable)", "(sweep in Appendix A; studio-internal tools are not observable)")
rep("The file mix is the contrast that matters:", "The file mix is the contrast:")
rep("It is the closest work to absence detection (reporting what has stopped moving), and what I learnt is how it avoids false alarms.",
    "It is the closest work to absence detection (reporting what has stopped moving); what I learnt is how it avoids false alarms.")
rep("if readers can say what changed but not why, Whitson's opacity wins instead.", "if readers can say what changed but not why, opacity wins.")
rep("is daily work, and Deliverable 1's job-ad scan tests whether advertisements ask for it.", "is daily work; Deliverable 1's job-ad scan tests whether advertisements ask for it.")
rep("the fidelity check is the control, since an unscorable week is replaced and a contradicted claim repaired.", "the fidelity check is the control: an unscorable week is replaced, a contradicted claim repaired.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-1 trims applied")
