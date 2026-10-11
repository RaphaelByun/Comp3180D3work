"""Second round of word-count cuts. Exact-match; nothing written if any match fails."""
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

rep("Today a technical lead translates the repository for the producer by hand, inconsistently and expensively.",
    "Today a technical lead does that translation by hand, inconsistently and expensively.")
rep(" The most urgent work leaves the least trace.", "")
rep("The contrast I took from it is the file mix:", "The contrast I took is the file mix:")
rep(" Underneath that sits an ownership mechanism.", "")
rep("Those twenty-one types let me answer my research question need by need, and give my think-aloud sessions (a participant says aloud what they are thinking while working) their coding frame.",
    "Those twenty-one types let me answer the research question need by need and give my think-aloud sessions (a participant says what they are thinking while working) their coding frame.")
rep(" The reporter supplies the information at a cost repaid to the group, not to them.", "")
rep("Their evidence is narrow: four groups, one 90-minute session, participants in separate locations linked by video and audio. Extending that to week-long work is mine to defend.",
    "Their evidence is narrow (four groups, one 90-minute session, participants in separate locations linked by video and audio), so extending it to week-long work is mine to defend.")
rep("each use and each understand differently.", "each use and understand differently.")
rep("Three limits bound my novelty claim. Every signal comes from the pull-request environment, and dependencies between items go unhandled. Each verdict reaches only that pull request — by design, one notification per pull request, never composed across items.",
    "Three limits bound my novelty claim: every signal comes from the pull-request environment, dependencies between items go unhandled, and each verdict reaches only its own pull request, never composed across items.")
rep("Participation is voluntary under the unit's general clearance for student studies, with verbal consent; anyone may stop at any time and their record is destroyed; only de-identified data is reported.",
    "Participation is voluntary under the unit's general clearance for student studies, with verbal consent and the right to stop at any time; only de-identified data is reported.")
rep("The cost is that fused tracker-plus-repository output is never tested; that needs a team's own linked history, out of scope for 65 hours.",
    "The cost: fused tracker-plus-repository output is never tested, which needs a team's own linked history and is out of scope for 65 hours.")
rep("![Figure 2. ChangeLens on one week of SS3D history, a code-heavy reorganisation week, grouped by category.]",
    "![Figure 2. ChangeLens on one week of SS3D history (a code-heavy reorganisation week).]")
rep("heuristics, two hours each; ten job ads and 25 reviews coded in four hours; two more interviews; a spec classifying 25 surfaced needs",
    "heuristics, two hours each; ten job ads and 25 reviews coded; two more interviews; a spec classifying 25 needs")
rep("Study and evaluation take 34 of the 65 hours: the study is held to 14 by fixing the tool sample at four and time-boxing review mining, and the evaluation's 20 split into instruments (4), the fidelity check (3) and sessions (13).",
    "The study is held to 14 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 20 split into instruments (4), fidelity check (3) and sessions (13).")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("cuts-2 applied")
