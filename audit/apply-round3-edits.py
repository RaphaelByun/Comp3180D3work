"""Loop round 3 edits (audit/FINDINGS-round-3.md). Exact-match; nothing written if any match fails."""
import io, shutil

p = "A2 Draft v2 — 17 Sep 2026.md"
shutil.copy(p, "audit/as-marked-round-3.md")
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

# ---------- Introduction: problem first, then the tool, then the question (Mitchell 1) ----------
rep("Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scene content, for someone who never opens the codebase. The project delivers that tool plus an evaluation in which eight student producers read two versions of the report; the evaluation isolates the Unity asset layer.\n\nA two-day refactor can leave no ticket while a three-line tweak looks like a day's work, and today a technical lead translates by hand. Games are harder, because most of what changes in a game project is not code (Pascarella et al., 2018), so code alone misses most of what changed. The proposal therefore asks:",
    "Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code, so what they know comes from tickets and stand-ups. A two-day refactor can leave no ticket while a three-line tweak looks like a day's work, and today a technical lead translates by hand. Games are harder, because most of what changes in a game project is not code (Pascarella et al., 2018), so code alone misses most of what changed.\n\nChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scene content, for someone who never opens the codebase. The project delivers that tool plus an evaluation in which eight student producers read two versions of the report; the evaluation isolates the Unity asset layer. The proposal asks:")

# ---------- Introduction: the gap claimed is the gap filled (Mitchell 2) ----------
rep("No publicly documented tool fuses tracker, repository and engine signals for a non-technical producer (sweep in Appendix A; studio-internal tools are not observable). Existing tools each cover one part: tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and repository narrators address developers (Perforce Software, n.d.); Appendix A compares them. None reads the Unity asset layer (scenes, prefabs and .meta files Unity already versions) to name what changed.",
    "Existing tools each cover one part: tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and repository narrators address developers (Perforce Software, n.d.); Appendix A compares them. None reads the Unity asset layer (the scenes, prefabs and .meta files Unity already versions) to name what changed; that is the gap this project fills. Fusing all three signals for a non-technical producer is the wider gap (no publicly documented tool does it; studio-internal tools are not observable) and is future work here.")

# ---------- Literature Review: name the camps where they appear (Mitchell 5); split the Nudge closer (Malcolm 5) ----------
rep("Their point is that asking people to report costs the reporter and pays the group, so it under-delivers by design.",
    "Their answer is structural: asking people to report costs the reporter and pays the group, so it under-delivers by design.")
rep("That behaviour was attributed to the software rather than to a teammate, which let the group move on without exposing anyone's lack of expertise. Unity also worked as a boundary object, one tool that art, design, code and production each read differently. The mechanism is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool.",
    "Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise. Unity also worked as a boundary object, one tool that art, design, code and production each read differently. Whitson's answer is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool.")
rep("Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.",
    "Nudge sets the bar for my hardest costed feature, flagging work gone quiet. That feature must compose across items and read asset activity, or it adds nothing.")

# ---------- Learning goals: Create carries the Unity technical skill (Malcolm 2); drop the opaque held-out clause (Mitchell 5) ----------
rep("*Measure:* unaided, state each mechanism, its source and a breakdown it predicts, and assign five held-out breakdowns from my notes.",
    "*Measure:* unaided, state each mechanism, its source and a breakdown it predicts.")
rep("**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* for each layout decision in the report, I can name the reader need it serves and defend two of them against a named alternative I rejected.",
    "**Create:** build a Unity Editor tool over the serialised asset layer and design its report for a reader who never opens the codebase. *Measure:* the committed tier ships with 60% of changed prefabs and scenes named, and for each layout decision I can name the reader need it serves and defend two against a named alternative I rejected.")

# ---------- Scoping Evidence: restate the question (Malcolm 4); Sub-question 2 names only what is measured (Malcolm 1) ----------
rep("The primary research question is the one quoted in the Introduction; two sub-questions structure its evaluation.",
    "The primary research question is *Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?* Two sub-questions structure its evaluation.")
rep("Sub-question 2: does the asset layer improve a reader's comprehension, and does confidence track accuracy?",
    "Sub-question 2: does the asset layer improve a reader's comprehension of the week?")
rep("Deliverable 1 runs first and surfaces the needs (heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews); its specification is what the Evaluate goal classifies.",
    "Deliverable 1 runs first and surfaces the needs; its specification is what the Evaluate goal classifies.")
rep("Versions are read in alternating order, and the six items are scored against fixed answers",
    "Versions are read in alternating order. The six items are scored against fixed answers")
rep("Before any session, a fidelity check over two team-weeks scores every claim in a report as supported, unsupported or contradicted against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not mechanical file counts. It passes",
    "Before any session, a fidelity check scores every claim in two weeks' reports as supported, unsupported or contradicted. The judge is the team's record read by hand: diffs, issue threads and release notes the generator never reads. The check can falsify naming and activity claims, not mechanical file counts. It passes")

# ---------- Deliverables: the hour-arithmetic sentence restates the table (both markers) ----------
rep("The study is held to 13 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 21 hours split into instruments (4), the fidelity check (3) and sessions (14).\n\n", "")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-3 edits applied")
