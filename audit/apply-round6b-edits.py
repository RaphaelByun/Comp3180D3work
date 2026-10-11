"""Closing edits after round 6 (audit/FINDINGS-round-6.md): plain literature map without forward references,
the 'Fixed bugs' illustration replaced by the one Appendix C supports, the naming target stated as a floor with a
fallback, Sub-question 1 given a reliability check, consent covering interviews, the pilot sentence split,
the Create measure as a capability, table fixes, and the proofreader's corrections. Exact-match; nothing written on failure."""
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

# Introduction
rep("A two-day refactor can leave no ticket, while a three-line tweak can look like a day's work. Today a technical lead translates by hand. Game projects",
    "A two-day refactor can leave no ticket, while a three-line tweak can look like a day's work. Game projects")
rep("None reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.",
    "None of the seven reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.")

# Literature Review
rep("A third answer, audience, is weighed at the end. The other four supply pieces, not mechanisms: evidence of the failure (Bertram et al., 2010), the unit of analysis (Ko et al., 2007), the file mix in games (Pascarella et al., 2018) and a bar for reporting what has stopped moving (Maddila et al., 2023).",
    "Four further studies supply what the argument needs to test those two: evidence that the record really does fail, a way to break a producer's needs into pieces, the file mix that makes games different, and a working bar for reporting what has stopped moving.")
rep("In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold.",
    "In games, sub-teams form around non-code categories such as multimedia (the authors count a file as owned above a 75% contribution share).")
rep("Their own example is the version-control edit log, today's commit message; my corpus's \"Fixed bugs\" commits show how little it captures.",
    "Their own example is the version-control edit log, today's commit message; in my corpus, \"Fix restart bug (#588)\" names an intention while touching 35 files across six categories.")
rep("Whitson's answer is opacity plus blame on the tool, not a general failure to articulate work.",
    "Whitson's answer is therefore opacity: the tool hides causes, and blaming it keeps the team moving.")
rep("Three limits bound my claim: every signal comes from the pull-request environment, dependencies between items go unhandled, and each verdict stays inside its own pull request.",
    "Three limits bound my claim: every signal comes from inside the pull request, dependencies between items go unhandled, and no verdict is composed across items.")

# Learning goals
rep("*Measure:* the committed (minimum) tier ships, naming 60% of changed prefabs and scenes, and each layout decision in the report is tied to a named reader need, with two defended against a rejected alternative.",
    "*Measure:* given an unfamiliar Unity week, I produce a one-page report that names 60% of its changed prefabs and scenes, and can tie every layout decision in it to a named reader need, two of them defended against a rejected alternative.")

# Scoping Evidence
rep("It is answered by desk classification: each need in Deliverable 1's specification is marked derivable, partly derivable or not against a named artefact.",
    "Each need in Deliverable 1's specification is marked derivable, partly derivable or not against a named artefact, twice a week apart, with disagreements resolved against the artefact and reported.")
rep("Across four sampled SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown), so the tier's 60% naming target sits inside the measured range, with a file-level fallback.",
    "I measured four SS3D weeks: 46–100% of changed prefabs and scenes carry an object name in their changed text, 23 of 26 in the week shown. The 60% naming target is set against that range; where no name resolves, the report falls back to the file path, so a weak week degrades the report rather than breaking it.")
rep("(commits on 10–14 February); 24% code against 17.5% over its history.", "(commits on 10–14 February).")
rep("Deliverable 1 runs first and produces the list of producer needs the question is asked about: its interviews, reviews and job-ad scan surface and test them, and its heuristic evaluation records what existing tools already answer.",
    "Deliverable 1 runs first: its interviews, reviews and job-ad scan produce the needs list, and its heuristic evaluation records what existing tools already answer.")
rep("Sessions are 45 minutes after an excluded pilot. Eight student producers each read",
    "A pilot session runs first and is excluded from the results. Each of the eight sessions then runs 45 minutes. Eight student producers each read")
rep("I recruit at the Week 9 and 10 COMP3151 pracs", "I recruit at the Weeks 9 and 10 COMP3151 pracs")
rep("Participation is voluntary, with verbal consent and de-identified reporting.",
    "Participation in interviews and sessions is voluntary, with verbal consent and de-identified reporting.")
rep("Scores are compared within participant;", "Scores are compared within each participant;")
rep("as supported, unsupported or contradicted against the team's record read by hand.",
    "as supported, unsupported or contradicted against the team's record, read by hand.")

# Deliverables
rep("| # | Deliverable | Success measure | h | In-prac |", "| # | Deliverable | Success measure | Hours | In-prac |")
rep("| 3 | Evaluation protocol and instruments | Six matched ground-truth items per week, rubric, think-aloud script and pilot, before Week 12 | 4 | 1 |",
    "| 3 | Evaluation protocol and instruments | Six matched items per week, each answerable from the report alone, plus rubric and think-aloud script; piloted and revised before Week 12 | 4 | 1 |")
rep("| | | **Total** | **65** | **15** |", "| | **Total** | | **65** | **15** |")
rep("The biggest risk is hand-authoring ground truth, because the corpus's commits say only \"Fixed bugs\"; an unscorable week is replaced and a contradicted claim repaired.",
    "The biggest risk is hand-authoring ground truth, because commit messages name the ticket, not the week's work; an unscorable week is replaced and a contradicted claim repaired.")

# Appendices (proofreader)
rep("and of the team's 216 Jira issues 41 mention a commit, branch or pull request in free text but none is linked to one.",
    "and of the team's 216 Jira issues, 41 mention a commit, branch or pull request in free text but none is linked to one.")
rep("while scenes, prefabs, art and audio make 45.", "while scenes, prefabs, art and audio make up 45.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
assert "Fixed bugs" not in s, "a 'Fixed bugs' mention survived"
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-6b edits applied")
