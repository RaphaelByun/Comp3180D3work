"""Round 5: present-tense industry-relevance evidence from the job-ad sample (audit/verified-additions-round-5.md). Exact-match."""
import io
p = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(p, encoding="utf-8").read()
old = "In those roles, writing the weekly status that non-technical stakeholders act on is daily work; Deliverable 1's job-ad scan will show how often advertisements list it."
new = "In those roles, writing the status that non-technical stakeholders act on is daily work; six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners."
assert s.count(old) == 1, s.count(old)
s = s.replace(old, new)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("job-ad sentence applied")
