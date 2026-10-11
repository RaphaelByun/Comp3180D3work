"""Parse a loop round's workflow output into audit/FINDINGS-round-N.md and audit/audit-roundN-raw.json.
Usage (from the sprint folder): python audit/parse-round.py <output.json> <N> <runId>"""
import io, json, sys

src, n, run = sys.argv[1], sys.argv[2], sys.argv[3]
res = json.load(io.open(src, encoding="utf-8"))["result"]
json.dump(res, io.open("audit/audit-round%s-raw.json" % n, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
out = []
w = out.append
w("# Loop round %s — 18 Sep 2026 (run %s)\n" % (n, run))
for key in ("marker_malcolm", "marker_mitchell"):
    m = res.get(key)
    if not m:
        w("\n## %s — MISSING\n" % key); continue
    w("\n## %s — predicted %s\n" % (key, m["predicted_task_mark"]))
    for c in m["criteria"]:
        w("\n### %s — %s %s\n**Why not higher:** %s\n**Single change:** %s\n" % (c["criterion"], c["band"], c["mark"], c["why_not_higher"], c["single_change_to_next_band"]))
    w("\n### Top changes")
    for t in sorted(m["top_changes"], key=lambda t: t["priority"]):
        w("%s. **%s** — %s\n   - Fix: %s\n   - Impact: %s" % (t["priority"], t["location"], t["problem"], t["fix"], t["mark_impact"]))
    w("\n### Evidence needed")
    for e in m["evidence_needed"]:
        w("- %s → %s" % (e["item"], e["what_would_settle_it"]))
    w("\n**Notes:** %s\n" % m["notes"])
pr = res.get("proof")
if pr:
    w("\n## Proofreader (clean=%s)\n" % pr["clean"])
    for x in pr["corrections"]:
        w('- "%s" → "%s" (%s)' % (x["original"], x["corrected"], x["reason"]))
cr = res.get("cold_reader")
if cr:
    w("\n## Cold reader (Haiku, non-programmer)\n")
    for k in ("what_is_it", "who_is_it_for", "what_will_be_built", "what_will_be_measured", "first_sentence_understood", "overview_verdict"):
        w("- **%s:** %s" % (k, cr.get(k, "")))
    w("- **where_lost:**")
    for x in cr.get("where_lost", []):
        w("  - \"%s\" — %s" % (x["first_words"], x["why"]))
sc = res.get("scout")
if sc:
    w("\n## Web scout\n")
    for f in sc.get("findings", []):
        w("- **Q:** %s\n  - **A:** %s\n  - URL: %s\n  - Quote: \"%s\"\n  - Confidence: %s\n  - Safe to write: %s" % (f["question"], f["answer"], f["url"], f["quote"], f["confidence"], f["safe_to_write"]))
io.open("audit/FINDINGS-round-%s.md" % n, "w", encoding="utf-8", newline="\n").write("\n".join(out))
mm, mi = res.get("marker_malcolm"), res.get("marker_mitchell")
print("MALCOLM", mm and mm["predicted_task_mark"], mm and [(c["criterion"][:12], c["band"], c["mark"]) for c in mm["criteria"]])
print("MITCHELL", mi and mi["predicted_task_mark"], mi and [(c["criterion"][:12], c["band"], c["mark"]) for c in mi["criteria"]])
print("PROOF clean:", pr and pr["clean"], "| corrections:", pr and len(pr["corrections"]))
print("written audit/FINDINGS-round-%s.md" % n)
