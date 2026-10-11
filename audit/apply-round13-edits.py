"""Round 13 edits (20 Sep 2026, 05:00). Run from the sprint folder: python audit/apply-round13-edits.py [path]
Each replacement must match exactly once. Sources: audit/FINDINGS-round-13.md, audit/verified-additions-round-13.md."""
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

# ---------- Literature Review
# roadmap keeps its names (churn rule) but regains the dropped verb (Malcolm 2, readability half)
rep("Bertram et al. show where the record fails, Ko et al. what a reader needs, and Pascarella et al. why a game week differs.",
    "Bertram et al. show where the record fails, Ko et al. show what a reader needs, and Pascarella et al. show why a game week differs.")
# Ko teaches a lesson and the bias clause says why (Mitchell 4)
rep("Ko et al. (2007), two of them Microsoft Research staff, watched 17 developers at Microsoft and surveyed 42 more, so I take the taxonomy, not the base rates. One finding fixed my unit of analysis: a developer's needs break into 21 information types across seven kinds of work. \"What have my coworkers been doing?\" (§5.7) is a producer's question too; the debugging kinds are not. Deliverable 1 tests how far the taxonomy transfers by classifying the needs producers raise.",
    "Ko et al. (2007), two of them Microsoft Research staff, watched 17 developers at Microsoft and surveyed 42 more. One company can skew how often a need arises but not what kinds exist, so I take the taxonomy, not the base rates. Their 21 information types are each a question, recorded apart from where developers looked, so I classify producers' needs by question first and only then ask which artefact answers each. \"What have my coworkers been doing?\" (§5.7) is a producer's question too; the debugging kinds are not.")
# Stray gets its use sentence (Malcolm 3); Washburn gets a transition
rep("That is the third explanation, audience: the record thins because of who it is written for. Washburn et al. (2016) sorted",
    "That is the third explanation, audience: the record thins because of who it is written for. I take it as a design constraint: every report is addressed to the producer, which removes this mechanism by construction. As a check, Washburn et al. (2016) sorted")
# Maddila: limits and bar in one sentence
rep("Its limits: every signal comes from inside one pull request, and no verdict is composed across items. Nudge sets the bar for my challenge tier, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.",
    "Its limits set the bar for my challenge tier, flagging work gone quiet: every signal comes from inside one pull request and no verdict is composed across items, so mine must compose across items and read asset activity, or it adds nothing.")
# Synthesis: the tricolon both personas dislike goes; the audience sentence has moved to Stray
rep("These studies do three jobs: they show the record failing, explain why, and set the bar a fix must clear. Dourish and Bellotti predict that passive extraction repairs it;",
    "Dourish and Bellotti predict that passive extraction repairs the record;")
rep(" Every report is addressed to the producer, which settles the audience question by design. If readers can say", " If readers can say")

# ---------- Learning Goals: capability leads in Create (Malcolm 6); career sentence split (Malcolm 10)
rep("**Create:** build a Unity Editor tool over the serialised asset layer and design its report for a reader who never opens the codebase.",
    "**Create:** design a change report that a reader who never opens the codebase can act on, and build it as a Unity Editor tool over the serialised asset layer.")
rep("aim for producer roles, where writing the status non-technical stakeholders act on is daily work; six of the nine employers",
    "aim for producer roles, where writing status for non-technical stakeholders is daily work. Six of the nine employers")

# ---------- Scoping Evidence
# prototype sentence unstacked (Malcolm 9); file-path fallback cut to pay (Malcolm 4)
rep("The prototype classifies files only; the version I commit to delivering (the committed tier, below) adds object naming, reading names from the prefab text and resolving component identifiers through Unity's AssetDatabase (Figure 3).",
    "The prototype classifies files only. The committed tier, the version I commit to delivering, adds object naming: it reads names from the prefab text and resolves component identifiers through Unity's AssetDatabase (Figure 3).")
rep("so the two study weeks and a reserve come from those (Appendix A); where no name resolves, the report shows the file path.",
    "so the two study weeks and a reserve come from those (Appendix A).")
rep("supplies the tracker-plus-repository case for Sub-question 1 (below).", "supplies the tracker-plus-repository case for Sub-question 1.")
# sub-question 1 unstacked (Malcolm 9); kappa caution (Mitchell 8); sub-question 2 bridged (Malcolm 7, Mitchell 7)
rep("Sub-question 1 operationalises the main question: for each need surfaced by the tool study (Deliverable 1, below), which artefact (tracker, repository or Unity asset layer) could supply it, fully or partly? The design specification marks each need derivable, partly derivable or not derivable.",
    "Sub-question 1 makes the main question operational. For each need surfaced by the tool study (Deliverable 1, below), which artefact could supply it, fully or partly: the tracker, the repository or the Unity asset layer? Each need is marked derivable, partly derivable or not derivable.")
rep("I report percentage agreement and Cohen's kappa against my marking, and each disagreement is a finding about what the artefacts cannot say.",
    "I report percentage agreement and, per reader, Cohen's kappa against my marking; over ten items these are indicative, not inferential. Each disagreement is a finding about what the artefacts cannot say.")
rep("Sub-question 2: does naming the changed scenes and prefabs improve a reader's comprehension of the week?",
    "Sub-question 2 tests one artefact against one need: does naming the changed scenes and prefabs improve a reader's comprehension of the week?")
# the session has a minute budget that sums to 45 (Mitchell 3); the redundant items sentence goes
rep("A pilot session runs first; its data is excluded. Each session lasts 45 minutes. Week difficulty is a rival explanation, so per-week baseline scores are reported too. Each reader answers six matched questions per report (draft items in Appendix B) before any think-aloud.",
    "A pilot runs first; its data is excluded. Each session runs 45 minutes: 5 to brief, 12 per report to read it and answer six matched items (Appendix B), 6 for the ten-need sheet, and 10 for the think-aloud and follow-up with the six who do them. Week difficulty is a rival explanation, so per-week baseline scores are reported too.")
# recruitment: the fallback now lives in the risk paragraph
rep("each proxy is briefed with a one-page scenario and stands in for a studio producer, a limit I report. The floor is five readers and five think-alouds. Slots are booked by the end of Week 10; below five readers, the think-alouds run first and the quantitative arm is descriptive.",
    "proxies get a one-page scenario and stand in for studio producers, a limit I report. The floor is five readers and five think-alouds. Slots are booked by the end of Week 10.")
# fidelity paragraph trimmed to pay (Mitchell 3)
rep("a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% are supported. A failing week is repaired and re-scored.",
    "a fidelity check scores every claim in both weeks' reports against the team's record. It passes when none is contradicted and 90% are supported.")

# ---------- Deliverables
rep("10 job ads and 10 reviews coded (1 h)", "10 job ads and five G2 reviews coded (1 h)")
rep("| 3 | Evaluation protocol and instruments |", "| 3 | Evaluation protocol and instruments (Evaluate) |")
rep("| 4 | Fidelity check | Two team-weeks scored; threshold met before any session; one hour reserved for repair |",
    "| 4 | Fidelity check (Evaluate) | Two team-weeks scored before any session; one hour reserved for repair |")
rep("| 5 | Sessions run and coded |", "| 5 | Sessions run and coded (Apply and Analyse; Evaluate) |")
rep("two outside viewers can each state its purpose and reader after one viewing", "two outside viewers can state its purpose and reader")
rep("The committed tier (11 hours) delivers the extractor, both report versions and object naming from Unity's text serialisation and AssetDatabase (Figure 3).",
    "The committed tier (11 hours) delivers the extractor, both report versions and object naming (Figure 3).")
rep("The biggest risk is hand-authoring ground truth, because commit messages name the ticket, not the work; an unscorable week is replaced and a contradicted claim repaired.",
    "The biggest risk is recruitment, since readers come from COMP3151 teams building toward their own 3 November release; below five readers the think-alouds run first and the quantitative arm is descriptive. The second is hand-authoring ground truth: commit messages name the ticket, not the work, so an unscorable week is replaced and a contradicted claim repaired.")
rep("the committed tier and instruments land in Week 10; the fidelity check, tier freeze, pilot and first sessions in Week 11;",
    "the committed tier, instruments and fidelity check land in Week 10; the tier freeze, pilot and first sessions in Week 11;")

# ---------- Appendices (uncounted)
rep("37e22a3 Fix restart bug (#588), 35;", "37e22a3 Fix restart bug (#588), 35 (13 code, 8 scenes and prefabs, 4 data, 1 art, 9 .meta);")
rep("| Tool | Reads | Produces | For whom | Does not do |", "| Tool or source | Reads | Produces | For whom | Does not do |")
rep("the study weeks and the reserve are chosen from the three multi-commit weeks above 85%.",
    "the study weeks and the reserve are chosen from the three multi-commit weeks above 85%. The 60% target was set after the first four weeks were measured.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits to", P)
