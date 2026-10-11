"""Final pass after the round-three marks (audit/FINDINGS-v3.md). Exact-match; nothing written if any match fails."""
import io, re, shutil

p = "A2 Draft v2 — 17 Sep 2026.md"
shutil.copy(p, "audit/A2 Draft v2 — as marked in round 3.md")
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

# ---------- Introduction ----------
rep("ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase.",
    "ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase. The final project delivers that package and an evaluation in which eight student producers read two versions of the report; it tests the engine leg, since fusing a team's own tracker needs their linked history.")
rep("Today a technical lead does that translation by hand, inconsistently and expensively.", "Today a technical lead does that translation by hand.")
rep("Games are harder: open-source game projects have, on average, only 30% of files in the Development category against 80% for non-game software (Pascarella et al., 2018). Code alone misses most of what changed.",
    "Games are harder, because most of what changes in a game project is not code (Pascarella et al., 2018), so code alone misses most of what changed.")
rep("No commercial or open-source tool fuses tracker, repository and engine signals for a non-technical producer. ZeroStandup (n.d.) and Linear's (n.d.) project-update agent turn tracker, repository and document activity into team-readable updates; HacknPlan (n.d.) needs manual entry. Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.); McShaffry (2013) showed producers doing that by hand.",
    "On a September 2026 sweep of vendor documentation (studio-internal tools are not observable), no publicly available tool fuses tracker, repository and engine signals for a non-technical producer. ZeroStandup (n.d.) and Linear (n.d.) turn tracker and repository activity into team-readable updates, HacknPlan (n.d.) tracks non-code work by manual entry, and Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.), the log-mining McShaffry (2013) showed producers doing by hand.")

# ---------- Literature Review ----------
rep("Six sources answer one question: why does the shared record a team produces under-report what is actually happening? They fall into three camps, compared at the end.",
    "Which producer needs a team's artefacts can answer depends on why the shared record under-reports the work; that is the question these six sources answer, in three camps compared at the end.")
rep("One participant said \"often bugs", "One participant said, \"often bugs")
rep("The entry sets my premise: the record is incomplete before any tool reads it.",
    "It is why the fidelity check scores each report against the team's record, not its tickets: the record is incomplete before any tool reads it.")
rep("Its usual sources were the debugger and logs rather than a colleague, so the obstacle is the tool.",
    "Its sources were the debugger and logs, not a colleague, so the obstacle is the tool.")
rep(" Games are the hard case for my question.", "")
rep("so I measure the same file mix on Unity repositories myself (Figure 1).\n",
    "so I measure the same file mix on Unity repositories myself (Figure 1).\n\n![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png \"w=14\")\n")
rep("Against that they set shared feedback collected passively as a by-product of the work itself, the ancestry of the aggregation layer I intend to build.",
    "Against that they set shared feedback collected passively as a by-product of the work itself. That is the case for Deliverable 2's passive aggregation layer, which reads artefacts instead of asking.")
rep("when their input produced output whose cause they could not predict, so the tool was opaque to its own users.",
    "when their input produced output whose cause they could not predict.")
rep("I first called this articulation failure; on Whitson's evidence it is narrower: opacity, plus blame that lands on the tool.",
    "The mechanism is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool.")
rep("It is the closest work to absence detection: reporting what has stopped moving. What I learnt is how it avoids false alarms.",
    "It is the closest work to absence detection (reporting what has stopped moving), and what I learnt is how it avoids false alarms.")
rep("negatively-resolved notifications", "negatively resolved notifications")
rep("Stray et al. (2016), from a grounded-theory study of daily stand-ups, add audience mismatch:", "Stray et al. (2016), studying daily stand-ups, add audience mismatch:")
rep("Washburn et al. (2016), five authors at RIT and Microsoft Research, coded 155 game postmortems", "Washburn et al. (2016) coded 155 game postmortems")
rep(" The problem is live: 2026 tools summarise tickets and code; none reads the asset layer.", "")

# ---------- Learning goals ----------
rep("*Measure:* at least four think-aloud participants (target six, floor five) answer the assigned status question from the report alone.",
    "*Measure:* at least four of the six think-aloud participants (floor five) answer the assigned status question from the report alone.")
rep("Each is a CV line, not a thing I made. I was the producer on my COMP3151 team and aim for producer or technical-producer roles, where judging what a team's artefacts can tell you, and telling people who never open the repository, is daily work; Deliverable 1's job-ad scan tests whether advertisements ask for it.",
    "Each is a CV line, not a thing I made. I was the producer on my COMP3151 team and aim for producer or technical-producer roles. In those roles, telling people who never open the repository what its artefacts show is daily work, and Deliverable 1's job-ad scan tests whether advertisements ask for it.")

# ---------- Scoping evidence ----------
rep("My primary research question: \"Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?\"",
    "The primary research question is the one stated in the Introduction; two sub-questions structure the evaluation.")
rep("It keeps a result even if the experiment finds no effect.",
    "Sub-question 1 is answered by mapping needs to artefacts, so a result exists whether or not the experiment finds an effect.")
rep("and does confidence track accuracy?\n",
    "and does confidence track accuracy?\n\nThe needs come from Deliverable 1, which runs first: heuristic evaluations of four production tools, ten producer job advertisements, 25 user reviews and two interviews surface them, and its specification is what the Evaluate goal classifies.\n")
rep("Both conditions share a one-page template and differ only in the asset layer, so the experiment measures that layer alone.",
    "Both report conditions use the same one-page template. They differ only in whether the asset layer is included, so the experiment measures that layer alone.")
rep("I will ask at the first COMP3151 prac of Week 9, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight with a floor of five; below that, think-alouds run first and the quantitative arm is descriptive.",
    "I will recruit at the first COMP3151 prac of Week 9 and again in Week 10, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight readers, six of whom also think aloud, with a floor of five for each; below the floor, think-alouds run first and the quantitative arm is descriptive.")
rep("scores every claim in a report as supported, unsupported or contradicted against the team's record; it passes when none is contradicted and 90% are supported, and a failing week is repaired and re-scored in Week 11.",
    "scores every claim in a report as supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.")
rep("No screened Unity project met both my thresholds (one megabyte of versioned non-code assets; thirty genuine issue references per hundred commits), so the corpus is split: both conditions come from RE-SS3D/SS3D's history and immersivecognition/unity-experiment-framework serves sub-question 1. The cost: fused tracker-plus-repository output is never tested, which needs a team's own linked history and is out of scope for 65 hours.",
    "I screened public Unity repositories on two thresholds (one megabyte of versioned non-code assets; thirty genuine issue references per hundred commits). None met both, so the corpus is split: both conditions come from RE-SS3D/SS3D's history and immersivecognition/unity-experiment-framework serves sub-question 1. Fused tracker-plus-repository output is therefore never tested.")
rep("\n![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png \"w=14\")\n\nChangeLens is a Unity Editor package turning",
    "\nChangeLens is a Unity Editor package (Unity 6000.4) turning")
rep("the committed tier adds object naming, where Unity earns its place",
    "the committed tier adds object naming (Figure 3), where Unity earns its place")
rep("![Figure 2. ChangeLens on one week of SS3D history (a code-heavy reorganisation week).](figures/fig1-changelens-window.png \"w=14\")\n",
    "![Figure 2. ChangeLens running inside Unity 6000.4 on one week of SS3D history (a code-heavy reorganisation week).](figures/fig1-changelens-window.png \"w=14\")\n\n![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png \"w=15\")\n")

# ---------- Deliverables ----------
rep("heuristics, two hours each; ten job ads and 25 reviews coded; two more interviews; a spec classifying 25 needs | 14 | 2 |",
    "heuristics (6 h); ten job ads and 25 reviews coded (3 h); two more interviews (2 h); a spec classifying at least 25 needs against Ko's twenty-one types (3 h) | 14 | 2 |")
rep("| 4 | Fidelity check | Two team-weeks scored; threshold met before any session | 3 | 1 |",
    "| 4 | Fidelity check | Two team-weeks scored; threshold met before any session; one hour reserved for repair | 3 | 1 |")
rep("| 6 | Evaluation report, instruments, data | Every claim traceable to a numbered data file | 7 | 1 |",
    "| 6 | Evaluation report, instruments, data | Covers all six items and both coding arms with agreement reported; every claim traceable to an appendix file | 7 | 1 |")
rep("the evaluation's 20 split into instruments (4), fidelity check (3) and sessions (13).",
    "the evaluation's 20 hours split into instruments (4), the fidelity check (3) and sessions (13).")
rep("The committed tier (11 of row 2's 16 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3), naming at least 60% of changed prefabs and scenes with a file-level fallback.\n\n![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png)\n",
    "The committed tier (11 of row 2's 16 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3). At least 60% of changed prefabs and scenes must be named, with a file-level fallback.\n")
rep("A committed-tier overrun consumes those hours first.", "If the committed tier overruns, it consumes the stretch and challenge hours first.")

# ---------- Statement ----------
rep("Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and checked every source against the verification record, which caught and corrected three AI-introduced errors. Evidence (session records, verification files and scripts) accompanies this submission.",
    "Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and verified every source; three AI-introduced errors were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
body = s.split("## References")[0]
print("v4 applied; figure mentions in order:", re.findall(r"Figure (\d)", body))
