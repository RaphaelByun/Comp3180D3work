"""Round 13 trims to the ceiling (20 Sep 2026). Run after apply-round13-edits.py: python audit/apply-round13-trim.py [path]
Each replacement must match exactly once. No fact is changed."""
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

# Literature Review
rep("so I classify producers' needs by question first and only then ask which artefact answers each.", "so I classify producers' needs by question first, then ask which artefact answers each.")
rep("which removes this mechanism by construction. As a check, Washburn et al.", "which removes this mechanism. Washburn et al.")
rep("so, as with Ko et al., I take its design lesson, not its effect size. That lesson is how it avoids false alarms.", "so, as with Ko et al., I take its design lesson, not its effect size; the lesson is how it avoids false alarms.")
# Scoping Evidence
rep("and 10 for the think-aloud and follow-up with the six who do them.", "and 10 for the think-aloud and follow-up (six readers).")
rep("For each need surfaced by the tool study (Deliverable 1, below), which artefact", "For each need surfaced by the tool study (Deliverable 1), which artefact")
# Deliverables
rep("The biggest risk is recruitment, since readers come from COMP3151 teams building toward their own 3 November release; below five readers the think-alouds run first and the quantitative arm is descriptive. The second is hand-authoring ground truth: commit messages name the ticket, not the work, so an unscorable week is replaced and a contradicted claim repaired.",
    "The biggest risk is recruitment: readers come from COMP3151 teams building toward their own 3 November release; below five, the think-alouds run first and the quantitative arm is descriptive. The second is hand-authoring ground truth: commit messages name the ticket, not the work, so an unscorable week is replaced and a contradicted claim repaired.")
rep("recruiting, booking and briefing (4 h)", "recruiting and briefing (4 h)")
rep("rubric and think-aloud script piloted in Week 11", "rubric and script piloted in Week 11")
# second batch after Word counted the first test build at 2,477 (ceiling 2,470); Figure 3 caption reworded per the round-13 fact-finder
rep("| 5 | Sessions run and coded (Apply and Analyse; Evaluate) |", "| 5 | Sessions run and coded (Analyse; Evaluate) |")
rep("every report is addressed to the producer, which removes this mechanism.", "every report is addressed to the producer, removing this mechanism.")
rep("6 for the ten-need sheet, and 10 for the think-aloud", "6 for the ten-need sheet and 10 for the think-aloud")
rep("including my own team's (Figure 1), and the report categorises by file type.", "including my own team's (Figure 1); the report categorises by file type.")
rep("Generated unedited for every sampled team-week;", "Generated unedited for every sampled week;")
rep("in a follow-up the six think-aloud participants explain three of their classifications aloud.", "in the follow-up the six think-aloud readers explain three of their classifications.")
rep("plus the ten-need sheet; rubric and script piloted in Week 11", "plus the ten-need sheet; both piloted in Week 11")
rep("7–36%; with .meta files excluded, 12–57% (Appendix A).", "7–36%; .meta excluded, 12–57% (Appendix A).")
rep("Each need is marked derivable, partly derivable or not derivable.", "Each need is marked derivable, partly derivable or not.")
rep("Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.", "Figure 3. A versioned prefab hunk: object names are plain text; component identifiers are GUIDs the AssetDatabase resolves to names.")
# third batch: Word counted the second test build at 2,473
rep("Sub-question 1 makes the main question operational.", "Sub-question 1 operationalises the main question.")
rep("below five, the think-alouds run first and the quantitative arm is descriptive.", "below five, think-alouds run first and the quantitative arm is descriptive.")
rep("12 per report to read it and answer six matched items (Appendix B)", "12 per report to read it and answer six items (Appendix B)")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("trimmed", n, "places in", P)
