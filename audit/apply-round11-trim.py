"""Round 11 trims to the ceiling (19-20 Sep 2026). Run after apply-round11-edits.py: python audit/apply-round11-trim.py [path]
Each replacement must match exactly once. No fact is changed; every cut is recorded in audit/FINDINGS-round-11.md."""
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

# Introduction
rep("Two arms answer it: eight student producers classify the ten needs producers raise most often against the artefact that could supply each, and read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not, to test whether naming helps.",
    "Two arms answer it: eight student producers classify the ten needs producers raise most often by the artefact that could supply each, and read two versions of the report, one naming the changed scenes and prefabs (the Unity asset layer) and one not.")
rep("None turns the Unity asset layer into a week's account for a producer. That is the gap this project fills.",
    "None turns the Unity asset layer into a week's account for a producer.")
# Literature Review
rep(" \"What code caused this program state?\" (p. 348) was the most often unsatisfied, failing in 61% of cases (p. 351).", "")
rep("so I take its design lesson rather than its effect size", "so I take its design lesson, not its effect size")
rep("none of them communication, so postmortems cannot settle the question and I look in artefacts instead.",
    "none of them communication; postmortems cannot settle the question, so I look in artefacts.")
# Scoping Evidence
rep("The study is a within-subjects comparison: eight student producers each read two ChangeLens reports for different SS3D team-weeks, one that names the changed scenes and prefabs (the treatment) and one that does not (the baseline), counterbalanced by week and order, and six of them then think aloud on a stand-up task. Two sub-questions sit under the research question.",
    "The study is a within-subjects comparison: eight student producers each read two ChangeLens reports for different SS3D weeks, one naming the changed scenes and prefabs (the treatment) and one not (the baseline), counterbalanced by week and order; six of them then think aloud on a stand-up task. Two sub-questions follow.")
rep("on a one-page sheet at the end of their session;", "on a one-page sheet;")
rep("(the committed tier, costed under Deliverables)", "(the committed tier, below)")
rep("Two fall below 60%, so the study weeks are drawn from weeks that clear it, each week's rate is reported beside its results, and where no name resolves the report shows the file path.",
    "Two fall below 60%, so the study weeks are drawn from those that clear it and each week's rate is reported with its results; where no name resolves, the report shows the file path.")
rep("I recruit at the Weeks 9 and 10 COMP3151 pracs and my COMP3180 prac; every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario.",
    "I recruit at the Weeks 9 and 10 COMP3151 pracs and my COMP3180 prac; teammates are briefed with a one-page scenario.")
# Deliverables
rep("recruiting, booking, briefing and reset (4 h)", "recruiting, booking and briefing (4 h)")
rep("Deliverable 1, including the repository check, runs across the break and Week 9;", "Deliverable 1 runs across the break and Week 9;")
# two one-word cuts after Word counted the test build at 2,471
rep("Each session then lasts 45 minutes.", "Each session lasts 45 minutes.")
rep("by classifying the needs producers actually raise.", "by classifying the needs producers raise.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("trimmed", n, "places in", P)
