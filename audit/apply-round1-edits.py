"""Loop round 1 edits (audit/FINDINGS-round-1.md): marker fixes, evidence-based corrections, Appendix A. Exact-match; nothing written if any match fails."""
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

# ---------- Introduction ----------
rep("Each week a game producer needs to know what changed and what it means. A producer plans and tracks the team's work without writing code. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase. The project delivers that package and an evaluation in which eight student producers read two versions of the report; it tests the engine leg, since fusing a team's own tracker needs their linked history.",
    "Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scene content, for someone who never opens the codebase. The project delivers that tool plus an evaluation in which eight student producers read two versions of the report. The evaluation isolates the Unity asset layer, because connecting a team's own tracker would need their private history.")
rep("A two-day refactor can leave no ticket while a three-line tweak looks like a day's work. Today a technical lead does that translation by hand.",
    "A two-day refactor can leave no ticket while a three-line tweak looks like a day's work, and today a technical lead translates by hand.")
rep("(September 2026 vendor sweep; studio-internal tools are not observable). ZeroStandup (n.d.) and Linear (n.d.) turn",
    "(the September 2026 sweep is in Appendix A; studio-internal tools are not observable). ZeroStandup (n.d.) and Linear (2026) turn")

# ---------- Literature Review ----------
rep("Which producer needs a team's artefacts can answer depends on why the shared record under-reports the work; that is the question these six sources answer, in three camps compared at the end.",
    "Why is a team's shared record thinner than the work it describes? These six sources give three competing answers, compared at the end.")
rep("What I learnt is where the record fails: at entry.", "Bugs go unfiled because the record fails at the point of entry.")
rep("Team B, described in the paper as a product development team within a large gaming company, wrote a simplified filing interface before non-experts would file at all (p. 297).",
    "Team B, a product development team within a large gaming company (p. 293), wrote a simplified filing interface before non-experts would file at all (p. 297).")
rep("The finding that fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work. The question of what code caused a given program state was the most often unsatisfied, failing in 61% of cases.",
    "One finding fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work. \"What code caused this program state?\" (p. 348) was the most often unsatisfied, failing in 61% of cases (p. 351).")
rep("mined 30 open-source game projects and 30 non-game systems, all in C, C++ or Objective-C, comparing which files each changed. The contrast I took is the file mix:",
    "mined 30 open-source game projects and 30 non-game systems, comparing which files each changed. The file mix is the contrast that matters:")
rep("so I measure the same file mix on Unity repositories myself (Figure 1).",
    "so I measure the same file mix on Unity repositories myself (Figure 1), and the report categorises by file type rather than by code alone.")
rep("Their evidence is narrow (four groups, one 90-minute session, participants in separate locations linked by video and audio), so extending it to week-long work is mine to defend.",
    "Their evidence is narrow (four groups, one 90-minute session), so extending it to week-long work is mine to defend.")
rep("Whitson (2018) describes her fieldwork: 10 weeks of ethnographic observation with 10 intern developers at a Montreal studio, on how game engines and art tools shape work across disciplines. Developers called tool behaviour voodoo, the word in the paper's title, when their input produced output whose cause they could not predict. That behaviour was blamed on the tool rather than on a teammate, which let the group move on without exposing anyone's lack of expertise. Underneath both, engines such as Unity worked as boundary objects: one shared tool that art, design, code and production each use and understand differently. The mechanism is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool. It is the rival mechanism the synthesis adjudicates.",
    "Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio, on how game engines and art tools shape work across disciplines. Developers called software voodoo when their input produced unanticipated output whose cause they could not predict. That behaviour was attributed to the software rather than to a teammate, which let the group move on without exposing anyone's lack of expertise. Unity also worked as a boundary object: one shared tool that art, design, code and production each read differently. The mechanism is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool. If opacity rather than structure is the mechanism, extraction names what changed but not why, so the think-aloud follow-up asks what the page leaves unexplained.")
rep("Washburn et al. (2016) coded 155 game postmortems into 22 categories with no communication category (pp. 280–289). Postmortems record outcomes rather than the reporting that produced them, so the seam may be real but unnamed; the study must find it in artefacts, not in what teams say. My gap is",
    "Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289); postmortems record outcomes rather than the reporting behind them, so the seam may be real but unnamed, and the study must find it in artefacts, not in what teams say. The project bets on the structural mechanism; if readers can say what changed but not why, Whitson's opacity wins instead. My gap is")

# ---------- Learning goals ----------
rep("*Measure:* at least four of the six think-aloud participants (floor five) answer the assigned status question from the report alone.",
    "*Measure:* at least two-thirds of think-aloud participants answer the assigned status question from the report alone.")

# ---------- Scoping evidence ----------
rep("Two sub-questions structure the evaluation of the research question stated in the Introduction.",
    "The primary research question is the one quoted in the Introduction; two sub-questions structure its evaluation.")
rep("Sub-question 1 is answered by mapping needs to artefacts, so a result exists whether or not the experiment finds an effect.",
    "Sub-question 1 yields a result whether or not the experiment finds an effect.")
rep("The needs come from Deliverable 1, which runs first: heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews surface them; its specification is what the Evaluate goal classifies.",
    "Deliverable 1 runs first and surfaces the needs through heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews; its specification is what the Evaluate goal classifies.")
rep("Both report conditions use the same one-page template. They differ only in whether the asset layer is included, so the experiment measures that layer alone. A developer runs one Editor command and authors nothing; the producer only reads the page.",
    "Both report conditions list the week's commits and changed files grouped by category; the treatment adds named scenes and prefabs, so the experiment measures the asset layer alone. The producer only reads the page; a developer runs one command.")
rep("Every COMP3151 team has a student producer, and teammates can be briefed into the role with a one-page scenario. I will recruit at the first COMP3151 prac of Week 9 and again in Week 10, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight readers, six of whom also think aloud, with a floor of five for each; below the floor, think-alouds run first and the quantitative arm is descriptive.",
    "I recruit at the first COMP3151 prac of Week 9, again in Week 10, then in my COMP3180 prac. Every COMP3151 team has a student producer, and teammates are briefed into the role with a one-page scenario. I target eight readers, six of whom also think aloud; the floor is five for each. Below the floor, the think-alouds run first and the quantitative arm is reported descriptively. One 45-minute session covers both arms, after one excluded pilot.")
rep("Comments are coded against Ko et al.'s (2007) seven categories; a second coder (a briefed COMP3151 classmate) codes a quarter and agreement is reported.",
    "Comments are coded against Ko et al.'s (2007) 21 information types; a second coder codes a quarter and agreement is reported.")
rep("I screened public Unity repositories on two thresholds (one megabyte of versioned non-code assets; 30 genuine issue references per 100 commits). None met both, so the corpus is split: both conditions come from RE-SS3D/SS3D's history, and immersivecognition/unity-experiment-framework serves Sub-question 1.",
    "I screened public Unity repositories on asset volume and issue-linking rate (thresholds in Appendix A). None met both, so the corpus is split: both conditions come from the history of SS3D, an open-source multiplayer station game, and the Unity Experiment Framework serves Sub-question 1.")
rep("ChangeLens is a Unity Editor package (Unity 6000.4) turning", "ChangeLens is a Unity Editor package (Unity 6.4) turning")
rep("resolves identifiers to asset and script names without a hand-written parser, and the build report exists nowhere else.",
    "resolves identifiers to asset and script names without a hand-written parser.")
rep("![Figure 2. ChangeLens running inside Unity 6000.4 on one week", "![Figure 2. ChangeLens running inside Unity 6.4 on one week")

# ---------- Deliverables ----------
rep("heuristics (6 h); 10 job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's 21 types (3 h) | 14 | 2 |",
    "heuristics (5 h); 10 job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's 21 types (3 h) | 13 | 2 |")
rep("| 5 | Sessions run and coded | Eight 45-minute sessions, two conditions each (6 h); six think-alouds coded from timestamped notes (7 h) | 13 | 4 |",
    "| 5 | Sessions run and coded | Eight 45-minute sessions plus scheduling and setup (7 h); six think-alouds coded from timestamped notes (7 h) | 14 | 4 |")
rep("The study is held to 14 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 20 hours split into instruments (4), the fidelity check (3) and sessions (13).",
    "The study is held to 13 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 21 hours split into instruments (4), the fidelity check (3) and sessions (14).")
rep("Out of scope are a live tracker connection and a language-model prose layer: an AI summary over the repository is the baseline, not the build. The biggest risk is hand-authoring ground truth: the corpus's commits say only \"Fixed bugs\".",
    "A live tracker connection and a language-model prose layer are out of scope; an AI summary over the repository is the baseline, not the build. The biggest risk is hand-authoring ground truth, because the corpus's commits say only \"Fixed bugs\"; the fidelity check is the control, since an unscorable week is replaced and a contradicted claim repaired.")

# ---------- References ----------
rep("Linear. (n.d.). *Linear AI*. Retrieved September 17, 2026, from https://linear.app/ai",
    "Linear. (2026, June 18). *Agent assisted project updates* [Changelog]. https://linear.app/changelog/2026-06-18-agent-assisted-project-updates")
rep("Stray, V., Sjøberg, D. I. K., & Dybå, T. (2016).",
    "Stray, V., Sjøberg, D. I. K., & Dybå, T. (2016).")
rep("Washburn, M., Jr., Sathiyanarayanan, P.,",
    "Unity Technologies. (n.d.). *Unity Production Pipeline*. Retrieved September 18, 2026, from https://unity.com/features/unity-production-pipeline\n\nWashburn, M., Jr., Sathiyanarayanan, P.,")

# ---------- Appendix A ----------
s = s.rstrip("\n") + """

## Appendix A — Scoping data

**Vendor sweep (3 August 2026, rechecked 17–18 September 2026).** Public product documentation only; studio-internal tooling is not observable.

| Tool | Reads | Produces | For whom | Does not do |
|---|---|---|---|---|
| ZeroStandup (n.d.) | Git hosting and issue trackers | Stand-up style AI summaries | Engineers, team leads, managers | No engine or asset signals; daily altitude only |
| Linear (2026) | Issues, documents, code changes, Slack | Agent-drafted project updates | Product teams | No engine or asset signals |
| HacknPlan (n.d.) | Manual entry per discipline | Kanban boards, burndown | Game teams | Nothing derived from the repository or engine |
| Perforce P4 MCP (Perforce Software, n.d.) | Helix Core history, including binary assets | Natural-language answers about history | Developers | No tracker fusion; no producer-facing report |
| Unity Production Pipeline (Unity Technologies, n.d.) | Builds, assets, version control (closed beta; public availability November 2026) | Web review of renders, build automation | Producers, artists, QA | No change report from tracker plus repository plus asset history |
| Atlassian Rovo, GitHub Copilot | Tickets; pull requests and diffs | AI sprint summaries; pull-request summaries | Engineering teams | Game-blind; no asset layer |

**Corpus screen (17 September 2026, `corpus.py`).** Thresholds: at least one megabyte of versioned non-code assets, and at least 30 genuine issue references per 100 commits, where a genuine reference cites an issue other than the squash-merged pull request's own number. Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0.
"""

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-1 edits applied")
