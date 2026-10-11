"""Remove Table 1 and shorten the GenAI statement. Exact-match; nothing written if any match fails."""
import io, re

p = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

rep("Why it fails is contested (Table 1).", "Why it fails is contested.")
start = s.index("Table 1. The three mechanisms the review compares.")
end = s.index("## Project Proposal")
block = s[start:end]
assert block.count("|") >= 12, "table block not found where expected"
s = s[:start] + s[end:]
rep("""Generative AI (Claude, Anthropic, via Claude Code) was used from July to September 2026 for topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and checked every source against the verification record, which caught and corrected three AI-introduced errors. Evidence (session records, verification files and scripts) accompanies this submission.""",
    """Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and checked every source against the verification record, which caught and corrected three AI-introduced errors. Evidence (session records, verification files and scripts) accompanies this submission.""")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("Table 1 removed; statement kept at", len(re.findall(r"\S+", s.split("## Statement on Generative AI use")[1])), "tokens")
