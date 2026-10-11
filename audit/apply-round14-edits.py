"""Round 14 edits (20 Sep 2026, 08:05). Run from the sprint folder: python audit/apply-round14-edits.py [path]
Each replacement must match exactly once. Sources: audit/FINDINGS-round-14.md, audit/verified-additions-round-14.md."""
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

# ---------- Introduction: the two sub-questions stated up front (Malcolm 1); "approaches" since Appendix A's seventh row is a talk (Mitchell 9)
rep("Two arms answer it. Eight readers sort ten common producer needs by which artefact could answer each. They also read two versions of the report: one names the changed scenes and prefabs (the Unity asset layer), one does not. Seven existing tools each cover one part of this (Appendix A): they summarise tickets and commits for engineers, take manual entry from game teams, or show asset history to developers and artists.",
    "Two sub-questions answer it. First, which artefact could supply each of ten common producer needs? Eight readers sort them. Second, does naming the changed scenes and prefabs (the Unity asset layer) help a reader understand the week? The same readers compare two report versions, with and without the names. Seven existing approaches each cover one part of this (Appendix A): they summarise tickets and commits for engineers, take manual entry from game teams, or show asset history to artists.")

# ---------- Literature Review
# Bertram: remedy sentence shortened to pay (Malcolm 9 payment)
rep("so I do not take it: my evaluation scores each report against the team's history, not its tickets.",
    "so I score reports against the team's history, not its tickets.")
# Stray: the audience mechanism is accepted, not removed (Malcolm 5); method preamble compressed to pay; Washburn appraised (Mitchell 1)
rep("Stray et al. (2016) built a grounded theory of the daily stand-up from 12 teams in consulting, telecoms and software companies, none of them game teams.",
    "Stray et al. (2016) built a grounded theory of the daily stand-up from 12 non-game teams.")
rep("I take it as a design constraint: every report is addressed to the producer, removing this mechanism. Washburn et al. (2016) sorted 155 game postmortems into 22 categories, none of them communication; postmortems cannot settle the question, so I look in artefacts.",
    "I take it as a constraint I cannot escape: the report is addressed to the producer, so this mechanism is accepted, not removed, which is why the tool must cost the team nothing. Washburn et al. (2016) sorted 155 developer-written game postmortems into 22 categories, none of them communication; retrospectives record what a team will admit in public, so the absence says little about production, and I look in artefacts instead.")
# Maddila: the 86-of-119 figure gets its referent (Mitchell 6); the lesson clause cut to pay
rep("so, as with Ko et al., I take its design lesson, not its effect size; the lesson is how it avoids false alarms.",
    "so, as with Ko et al., I take its design lesson, not its effect size.")
rep("Before that check, 86 of 119 rejected alerts had fired despite recent activity.",
    "Before that check, 86 of the 119 alerts developers dismissed had fired on pull requests active in the previous day.")

# ---------- Learning Goals: Understand verb at its rung; measures tied to the diary (Malcolm 7, Mitchell 7)
rep("**Understand:** diagnose why a team's production record under-reports its work, distinguishing the structural, opacity and audience explanations. *Measure:* I can state each mechanism unaided, with its source and a breakdown it predicts.",
    "**Understand:** explain why a team's production record under-reports its work, distinguishing the structural, opacity and audience explanations. *Measure:* a diary entry stating each mechanism unaided, with its source and a breakdown it predicts.")
rep("*Measure:* given an unfamiliar Unity week, I can tie each layout decision to a named reader need, two defended against a rejected alternative.",
    "*Measure:* a diary entry, written against an unfamiliar Unity week, tying each layout decision to a named reader need.")

# ---------- Scoping Evidence
# naming sentence compressed; rates live in Appendix A (Mitchell 1 payment)
rep("Across nine sampled SS3D weeks, 16% to 100% of changed prefabs and scenes carry an object name in their changed text. Six clear the 60% naming target (Deliverable 2), so the two study weeks and a reserve come from those (Appendix A).",
    "Six of nine sampled SS3D weeks clear the 60% naming target (Deliverable 2; rates in Appendix A), so the two study weeks and a reserve come from those.")
rep("supplies the tracker-plus-repository case for Sub-question 1.", "supplies an illustrative tracker-plus-repository case for Sub-question 1.")
# study-design opener split into three sentences (Malcolm 3); Sub-question 1 as a labelled question in its own paragraph (Mitchell 3)
rep("**Study design.** The study is a within-subjects comparison: eight readers (COMP3151 producers, or teammates briefed into the role) each read two ChangeLens reports for different SS3D weeks, one naming the changed scenes and prefabs (the treatment) and one not (the baseline), counterbalanced by week and order; six of them then think aloud while drafting a two-minute stand-up update from the report alone. Sub-question 1 operationalises the main question. For each need surfaced by the tool study (Deliverable 1), which artefact could supply it, fully or partly: the tracker, the repository or the Unity asset layer? Each need is marked derivable, partly derivable or not. All eight readers",
    "**Study design.** The study is a within-subjects comparison. Eight readers (COMP3151 producers, or teammates briefed into the role) each read two ChangeLens reports for different SS3D weeks: one names the changed scenes and prefabs (treatment), one does not (baseline). Week and order are counterbalanced, and six readers then think aloud while drafting a two-minute stand-up update from the report alone.\n\nSub-question 1: for each need the tool study surfaces (Deliverable 1), which artefact could supply it, fully or partly: the tracker, the repository or the Unity asset layer? I mark each need derivable, partly derivable or not. All eight readers")
# session budget with units and consent (Malcolm 10, Mitchell 10); pilot and week-difficulty sentences merged to pay
rep("A pilot runs first; its data are excluded. Each session runs 45 minutes: 5 to brief, 12 per report to read it and answer six items (Appendix B), 6 for the ten-need sheet and 10 for the think-aloud and follow-up (six readers). Week difficulty is a rival explanation, so per-week baseline scores are reported too.",
    "A pilot runs first, excluded from the data. Each session runs 45 minutes: 5 min of briefing and consent, 12 min per report for two reports (six items each, Appendix B), 6 min for the ten-need sheet, and 10 min of think-aloud for the six readers who do it. Week difficulty is a rival explanation, so per-week baseline scores are reported.")
# proxy bias direction stated (Malcolm 8, Mitchell 8); recruitment sentence compressed to pay
rep("I recruit at the Weeks 9 and 10 COMP3151 pracs and my COMP3180 prac; proxies get a one-page scenario and stand in for studio producers, a limit I report. The floor is five readers and five think-alouds. Slots are booked by the end of Week 10. Participation is voluntary, with verbal consent and de-identified reporting.",
    "I recruit at the Weeks 9–10 COMP3151 and COMP3180 pracs; proxies get a one-page scenario and stand in for studio producers on a week none has worked on, which strips a real producer's context and should favour the treatment, so I report the difference as an upper bound. The floor is five of each. Slots are booked by the end of Week 10. Participation is voluntary and reporting de-identified.")
# fidelity check names what it reads (Mitchell 5)
rep("a fidelity check scores every claim in both weeks' reports against the team's record.",
    "a fidelity check scores every claim in both weeks' reports against each commit's diff, read by hand.")

# ---------- Deliverables: the committed tier builds on the working extractor (Malcolm 6); trims to pay; risk sentence shortened (Mitchell 5 payment)
rep("The committed tier (11 hours) delivers the extractor, both report versions and object naming (Figure 3). The stretch tier (3 hours) parses Unity's build report (already readable; Appendix C) and names failed steps and the three largest asset-size changes.",
    "The committed tier (11 hours) turns the working extractor (Figure 2) into the producer-facing page, builds both report versions and adds object naming (Figure 3). The stretch tier (3 hours) parses Unity's build report (Appendix C) for failed steps and the three largest asset-size changes.")
rep("An overrun consumes the challenge tier first, then the stretch tier.", "An overrun drops the challenge tier first, then the stretch tier.")
rep("so an unscorable week is replaced and a contradicted claim repaired.", "so an unscorable week is replaced.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits to", P)
