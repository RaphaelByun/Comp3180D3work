"""Round 12 edits (20 Sep 2026, 02:00). Run from the sprint folder: python audit/apply-round12-edits.py [path]
Each replacement must match exactly once. Sources: audit/FINDINGS-round-12.md, audit/verified-additions-round-12.md."""
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

# ---------- Introduction: the long two-arm sentence becomes three short ones (Malcolm 1); throat-clear cut (Mitchell 6)
rep("The project delivers that tool and a study of it. The proposal asks:", "The proposal asks:")
rep("Two arms answer it: eight student producers classify the ten needs producers raise most often by the artefact that could supply each, and read two versions of the report, one naming the changed scenes and prefabs (the Unity asset layer) and one not.",
    "Two arms answer it. Eight readers sort ten common producer needs by which artefact could answer each. They also read two versions of the report: one names the changed scenes and prefabs (the Unity asset layer), one does not.")

# ---------- Literature Review
# roadmap runs in the body's order (Mitchell 1); names kept (round-11 Malcolm 3, churn-protected)
rep("The literature offers three explanations: reporting is structured against the reporter (Dourish & Bellotti, 1992), the tools hide why it happened (Whitson, 2018), or the report is addressed to the wrong audience (Stray et al., 2016). Four further studies fill that picture in: Bertram et al. on where the record fails, Ko et al. on what a reader needs, Pascarella et al. on why a game week differs, and Maddila et al. on the bar an absence-detector must clear.",
    "Bertram et al. show where the record fails, Ko et al. what a reader needs, and Pascarella et al. why a game week differs. Three studies then explain why the record thins: reporting is structured against the reporter (Dourish & Bellotti, 1992), the tools hide why it happened (Whitson, 2018), or the report is addressed to the wrong audience (Stray et al., 2016). Maddila et al. set the bar a fix must clear.")
# Bertram: small trim to pay
rep("Their remedy, a simplified filing interface for non-experts (p. 297),", "Their remedy, a simplified filing interface (p. 297),")
# Ko: the same bias test Maddila gets (Mitchell 2); the coding-frame sentence, restated in Scoping Evidence, cut to pay
rep("Ko et al. (2007) watched 17 developers at a large software company and surveyed 42 more.",
    "Ko et al. (2007), two of them Microsoft Research staff, watched 17 developers at Microsoft and surveyed 42 more, so I take the taxonomy, not the base rates.")
rep(" Those 21 types give the think-alouds their coding frame.", "")
# Pascarella: one clear sentence instead of two (Mitchell 7 payment)
rep("In games, sub-teams own non-code categories such as multimedia. In non-game projects, ownership groups form only around code, so a code-only report is blind to whole disciplines.",
    "In games, sub-teams own non-code categories such as multimedia, so a code-only report is blind to whole disciplines.")
# Figure 1 caption states the second basis (Mitchell 7)
rep("7–36% (Appendix A gives the .meta-excluded shares).", "7–36%; with .meta files excluded, 12–57% (Appendix A).")
# Maddila: cross-reference to Ko's appraisal; Nudge sentence trimmed
rep("so I take its design lesson, not its effect size.", "so, as with Ko et al., I take its design lesson, not its effect size.")
rep("then stays silent while comments, pushed commits or state changes continue within the last 24 hours.",
    "then stays silent while comments, commits or state changes continued in the last 24 hours.")
# Synthesis: the roll-call now lives in the roadmap; concession that no study observed a producer (Malcolm 2)
rep("These studies do three jobs. Bertram shows the record failing and Maddila sets the bar a fix must clear. Dourish and Bellotti, Whitson and Stray each explain why. Pascarella and Ko describe what a game week and a reader's needs contain. Dourish and Bellotti predict",
    "These studies do three jobs: they show the record failing, explain why, and set the bar a fix must clear. Dourish and Bellotti predict")
rep("The project bets on the structural mechanism. Every report is addressed to the producer,",
    "The project bets on the structural mechanism. None of these studies observed a game producer; I take their mechanisms and test the transfer. Every report is addressed to the producer,")

# ---------- Learning Goals: a capability, not a task, with the single-evaluator caveat (Malcolm 5, Mitchell 9); trims to pay
rep("**Apply and Analyse:** run heuristic evaluation, then reconcile its findings against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.",
    "**Apply and Analyse:** inspect a production tool against usability heuristics, then test those findings against what its users say, since one evaluator finds only a minority of a tool's problems (Nielsen & Molich, 1990). *Measure:* four tools coded; one reconciliation naming three places where inspection and interviews disagree.")
rep("I can tie each layout decision in its one-page report to a named reader need, two of them defended against a rejected alternative.",
    "I can tie each layout decision to a named reader need, two defended against a rejected alternative.")
rep("aim for producer or technical-producer roles, where writing the status that non-technical stakeholders act on is daily work;",
    "aim for producer roles, where writing the status non-technical stakeholders act on is daily work;")

# ---------- Scoping Evidence: prototype first, then the study (Malcolm 4); honest sample and defined task (Mitchell 3, 6); sub-question 1 operationalised (Malcolm 7); provenance and statistic (Mitchell 8)
OLD_DESIGN = """The study is a within-subjects comparison: eight student producers each read two ChangeLens reports for different SS3D weeks, one naming the changed scenes and prefabs (the treatment) and one not (the baseline), counterbalanced by week and order; six of them then think aloud on a stand-up task. Two sub-questions follow. Sub-question 1: which of the needs surfaced by the tool study (Deliverable 1, below) can be derived, fully or partly, from the tracker, the repository and the Unity asset layer? Its design specification marks each need derivable, partly derivable or not derivable against a named artefact. All eight readers then classify the same ten needs (the ten most often raised) on a one-page sheet; I report their agreement with my marking and treat each disagreement as a finding about what the artefacts cannot say. Sub-question 2: does naming the changed scenes and prefabs improve a reader's comprehension of the week?

"""
NEW_DESIGN = """**Study design.** The study is a within-subjects comparison: eight readers (COMP3151 producers, or teammates briefed into the role) each read two ChangeLens reports for different SS3D weeks, one naming the changed scenes and prefabs (the treatment) and one not (the baseline), counterbalanced by week and order; six of them then think aloud while drafting a two-minute stand-up update from the report alone. Sub-question 1 operationalises the main question: for each need surfaced by the tool study (Deliverable 1, below), which artefact (tracker, repository or Unity asset layer) could supply it, fully or partly? The design specification marks each need derivable, partly derivable or not derivable. All eight readers then classify the same ten needs (the ten Deliverable 1 raises most often) on a one-page sheet; I report percentage agreement and Cohen's kappa against my marking, and each disagreement is a finding about what the artefacts cannot say. Sub-question 2: does naming the changed scenes and prefabs improve a reader's comprehension of the week?

"""
rep(OLD_DESIGN, "")
rep("supplies the tracker-plus-repository case for Sub-question 1.\n\n**Study design.** A pilot session runs first;",
    "supplies the tracker-plus-repository case for Sub-question 1 (below).\n\n" + NEW_DESIGN + "A pilot session runs first;")
# prototype paragraph: trims (Mitchell 4) and the nine-week naming measurement with a reserve (Malcolm 8, Mitchell 4)
rep("an open-source Unity game with 710 commits from 68 contributors.", "an open-source Unity game with 710 commits.")
rep("it reads a git log export for one week, classifies each changed path by extension and sibling .meta file, and shows counts per category (Figure 2; Appendix C).",
    "it reads a git log export for one week and classifies each changed path by extension and sibling .meta file (Figure 2; Appendix C).")
rep("Across four SS3D weeks, between 46% and 100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). Two fall below 60%, so the study weeks are drawn from those that clear it and each week's rate is reported with its results; where no name resolves, the report shows the file path.",
    "Across nine sampled SS3D weeks, 16% to 100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). Six clear the 60% naming target (Deliverable 2), so the two study weeks and a reserve are drawn from those, listed in Appendix A; where no name resolves, the report shows the file path.")
# recruitment: one sentence for the proxy limit
rep("teammates are briefed with a one-page scenario. Briefed proxies stand in for studio producers, a limit I report.",
    "each proxy is briefed with a one-page scenario and stands in for a studio producer, a limit I report.")
# quantitative arm: purpose of the unanswerable item (Mitchell evidence); "by item and level" cut (Mitchell 8)
rep("One item per report is unanswerable. I report each participant's treatment-minus-baseline difference over five scored items, by item and level;",
    "One item per report is unanswerable, to catch readers who over-claim from the page. I report each participant's treatment-minus-baseline difference over five scored items;")

# ---------- Deliverables: goal tags (Malcolm 6); sessions spread over Weeks 11–12 (Mitchell 5); trims to pay
rep("| 1 | Production-tool UX study and design spec |", "| 1 | Production-tool UX study and design spec (Apply and Analyse; Evaluate) |")
rep("| 2 | ChangeLens Unity Editor package, both conditions |", "| 2 | ChangeLens Unity Editor package, both conditions (Create) |")
rep("| 6 | Evaluation report, instruments, data |", "| 6 | Evaluation report, instruments, data (Understand; Evaluate) |")
rep("| 9 | Reflection report |", "| 9 | Reflection report (all four goals) |")
rep("rubric and think-aloud script piloted and revised in Week 11", "rubric and think-aloud script piloted in Week 11")
rep("both report versions and object naming of prefabs and scenes from Unity's text serialisation (Figure 3).",
    "both report versions and object naming from Unity's text serialisation (Figure 3).")
rep("flags work gone quiet on two weeks and stays gated because", "flags work gone quiet on two weeks, gated because")
rep("the fidelity check, tier freeze and pilot in Week 11; sessions in Week 12; analysis and video in Week 13.",
    "the fidelity check, tier freeze, pilot and first sessions in Week 11; the remaining sessions in Week 12; analysis and video in Week 13.")

# ---------- Appendix A (uncounted): the nine measured weeks; SS3D provenance; the third job-ad example dropped; Unity pipeline comparison clause
rep("Figure 2's 24% is one week of SS3D on the first basis.",
    "Figure 2's 24% is one week of SS3D on the first basis. The SS3D clone (branch develop, 17 September 2026) has 710 commits from 68 authors.\n\n**Naming presence in SS3D weeks (export-week.py, 18–20 September 2026).** Share of changed prefab and scene files whose changed text carries an object name: 8–14 Feb 2021, 23 of 26 (88%, 8 commits, the Figure 2 week); 19–25 Jul 2021, 22 of 24 (92%, 7 commits); 14–20 Dec 2020, 30 of 33 (91%, 3 commits); 28 Mar–3 Apr 2022, 28 of 28 (100%, 1 commit); 27 Sep–3 Oct 2021, 22 of 22 (100%, 2 commits); 27 Apr–3 May 2020, 2 of 3 (67%, 5 commits); 3–9 Apr 2023, 10 of 17 (59%, 4 commits); 13–19 Dec 2021, 6 of 13 (46%, 9 commits); 2–8 Feb 2026, 8 of 50 (16%, 3 commits, a bulk NetworkTransform edit). Six of nine clear 60%; the study weeks and the reserve are chosen from the three multi-commit weeks above 85%.")
rep(", Devolver Digital (\"communication with partners on progress, risks, and changes\") and GameName LLC (\"reporting for studio leadership\").",
    " and Devolver Digital (\"communication with partners on progress, risks, and changes\").")
rep("| No change report from tracker plus repository plus asset history |",
    "| No change report from tracker plus repository plus asset history; if a report ships before A3, ChangeLens is compared against it |")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits to", P)
