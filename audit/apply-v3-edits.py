"""Round-three edits to A2 Draft v2 (17 Sep 2026), from audit/FINDINGS-v2.md.
Exact-match replacements; nothing is written if any match fails."""
import io, shutil

p = "A2 Draft v2 — 17 Sep 2026.md"
shutil.copy(p, "audit/A2 Draft v2 — as marked in round 2.md")
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

# ---------- Introduction ----------
rep("Each week a game producer needs to know what changed and what it means. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase.",
    "Each week a game producer needs to know what changed and what it means. A producer plans and tracks the team's work without writing code, so the report has to say it in plain terms. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase.")
rep("A technical lead does that translation, inconsistently and expensively.",
    "Today a technical lead translates the repository for the producer by hand, inconsistently and expensively.")
rep("Code alone misses most of what changed.\n\n> Which",
    "Code alone misses most of what changed. The proposal therefore asks:\n\n> Which")
rep("ZeroStandup (n.d.) and Linear's (n.d.) project-update agent turn tracker and repository activity into team-readable updates; HacknPlan (n.d.) needs manual entry. Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.), work McShaffry (2013) had producers do by hand.",
    "ZeroStandup (n.d.) turns tracker and repository activity into team-readable updates, and Linear's (n.d.) project-update agent does the same from projects, issues, docs and code; HacknPlan (n.d.) needs manual entry. Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.); McShaffry (2013) showed producers doing that by hand.")

# ---------- Literature Review ----------
rep("interviewed and surveyed fifteen people in four small software teams sharing one room, on how they used their issue tracker.",
    "interviewed and surveyed fifteen people across four small, collocated software teams about their issue tracker.")
rep("watched seventeen developers at a large software company and surveyed forty-two more, cataloguing the information they went looking for.",
    "watched seventeen developers at a large software company and surveyed forty-two more.")
rep("\"What code caused this program state?\" was the most often unsatisfied, failing in 61% of cases.",
    "The question of what code caused a given program state was the most often unsatisfied, failing in 61% of cases.")
rep("at the authors' >75% ownership threshold, where one person made more than three-quarters of a file's changes.",
    "at the authors' >75% ownership threshold.")
rep("Recipients receive only what the sender judges appropriate. And the sender controls delivery, yet cannot predict what is needed or when.",
    "Recipients get only what the sender judges relevant, delivered when the sender chooses.")
rep("Whitson's account of her fieldwork describes ten weeks of ethnographic observation with ten intern developers at a Montreal studio, on how game engines and art tools shape work across disciplines (Whitson, 2018). Developers called a tool's behaviour \"voodoo\" when their input produced output whose cause they could not predict, so the tool was opaque to its own users.",
    "Whitson (2018) describes her fieldwork: ten weeks of ethnographic observation with ten intern developers at a Montreal studio, on how game engines and art tools shape work across disciplines. Developers called tool behaviour voodoo, the word in the paper's title, when their input produced output whose cause they could not predict, so the tool was opaque to its own users.")
rep("Without it, 86 of 119 unwanted notifications ignored recent activity.",
    "Without it, 86 of 119 negatively-resolved notifications ignored recent activity.")
rep("Each verdict reaches only that pull request — by design, one notification per pull request, never composed across items.\n",
    "Each verdict reaches only that pull request — by design, one notification per pull request, never composed across items. Nudge sets the bar for my challenge tier: absence detection has to compose across items and read asset activity, or it adds nothing.\n")
rep("Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why; Stray et al. (2016) add audience mismatch. Washburn et al. (2016), five authors at RIT and Microsoft Research, coded 155 game postmortems into 22 categories, none of them communication (pp. 280–289), evidence the seam may not be where I look.",
    "Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why. Stray et al. (2016), from a grounded-theory study of daily stand-ups, add audience mismatch: a stand-up turned status report serves the manager, not the team. Washburn et al. (2016), five authors at RIT and Microsoft Research, coded 155 game postmortems into 22 categories with no communication category (pp. 280–289). That is the counter-evidence: postmortems record outcomes rather than the reporting that produced them, so the seam may be real but unnamed, and the study must find it in artefacts rather than in what teams say.")

# ---------- Learning goals ----------
rep("**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* four of six think-aloud participants answer the assigned status question from the report alone. That is two in three; A1 set three of four on a smaller sample.",
    "**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* at least four think-aloud participants (target six, floor five) answer the assigned status question from the report alone.")
rep("Each is a CV line, not a thing I made: judging what a team's artefacts can and cannot tell you, and telling people who never open the repository, is production work. I held that role on my COMP3151 team and aim at producer jobs.",
    "Each is a CV line, not a thing I made. I held the producer role on my COMP3151 team and aim for producer or technical-producer roles, where judging what a team's artefacts can tell you, and telling people who never open the repository, is daily work; the job-ad scan in Deliverable 1 tests whether advertisements ask for it.")

# ---------- Scoping evidence ----------
rep("Sub-question 1 insures against a null result. Each surfaced need is marked derivable, partly derivable or not derivable from the tracker export, repository history and Unity asset layer: scenes, prefabs, art, audio and .meta files beside every asset. Sub-question 2 asks whether that layer improves comprehension and whether confidence tracks accuracy.",
    "Sub-question 1: which surfaced needs are derivable, partly derivable or not derivable from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? It keeps a result even if the experiment finds no effect. Sub-question 2: does adding the asset layer improve a reader's comprehension of the week, and does confidence track accuracy?")
rep("Both conditions share one page template and differ only in the asset layer, measuring that layer alone. A developer runs one Editor command and authors nothing; the producer only reads the page.",
    "Both conditions share a one-page template and differ only in the asset layer, so the experiment measures that layer alone. A developer runs one Editor command and authors nothing; the producer only reads the page.")
rep("Every COMP3151 team has a student producer, and classmates can be briefed into the role in five minutes. I recruit in Weeks 9–10 through the COMP3151 prac; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight, with a floor of five readers and four think-alouds; below that, think-alouds run first and the quantitative arm is descriptive. Participation is voluntary and de-identified; anyone may stop at any time and their record is destroyed.",
    "Every COMP3151 team has a student producer, and teammates can be briefed into the role with a one-page scenario. I will ask at the first COMP3151 prac of Week 9 and in the team channels, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight, with a floor of five for both arms; below that, think-alouds run first and the quantitative arm is descriptive. Participation is voluntary under the unit's general clearance for student studies, with verbal consent; anyone may stop at any time and their record is destroyed; only de-identified data is reported.")
rep("Six items are scored against answers fixed in advance, at Endsley's (1995) three levels: what changed, what it means, what happens next.",
    "Six items are scored against answers fixed in advance, at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next.")
rep("Comments are coded against Ko et al.'s (2007) seven categories; a second coder codes a quarter.",
    "Comments are coded against Ko et al.'s (2007) seven categories; a second coder, a COMP3151 classmate briefed with the codebook, codes a quarter and agreement is reported.")
rep("Nothing untruthful reaches a participant: over two team-weeks the fidelity check scores each claim supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% supported; a failing week is repaired and re-scored in Week 11, before sessions. A multi-cutoff backtest was rejected: a weekly report makes no forecast.",
    "Before any session, a fidelity check over two team-weeks (one calendar week of one team's history each) scores every claim in a report supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.")
rep("The split corpus costs something: no screened Unity project met both my thresholds for versioned assets and issue linkage. Both conditions come from RE-SS3D/SS3D's history, so the asset-layer contrast is tested on one repository; immersivecognition/unity-experiment-framework serves sub-question 1. Across the five screened repositories code is at most 36% of changed files (Figure 1). Fusing a team's own tracker and repository is out of scope.",
    "No screened Unity project met both my thresholds (one megabyte of versioned non-code assets; thirty genuine issue references per hundred commits), so the corpus is split. Both conditions come from RE-SS3D/SS3D's history, so the asset-layer contrast is tested on one repository; immersivecognition/unity-experiment-framework serves sub-question 1. The cost is that fused tracker-plus-repository output is never tested; that needs a team's own linked history, out of scope for 65 hours. Over each repository's full history, code is 7–36% of changed-file entries (Figure 1); a single week can run higher, as the code-heavy reorganisation week in Figure 2 shows at 41.9%, which is why the report is built per week.")
rep("ChangeLens-lite is a Unity add-on turning a week of git history into a grouped change report. One Editor window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figures 2 and 3). Unity earns its place because the identifiers in that text resolve to asset and script names only through its AssetDatabase, and the build report exists nowhere else.",
    "ChangeLens is a Unity Editor package turning a week of git history into a grouped change report. One Editor window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2); the package sits in the project like any other (Figure 3). The prototype classifies files only; the committed tier adds object naming, and Unity earns its place there because the AssetDatabase resolves the identifiers to asset and script names without a hand-written parser, and the build report exists nowhere else.")
rep("![Figure 2. ChangeLens-lite showing one week of SS3D history grouped by category.]",
    "![Figure 2. ChangeLens on one week of SS3D history, a code-heavy reorganisation week, grouped by category.]")

# ---------- Deliverables ----------
rep("| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics, two hours each; ten job ads and reviews mined in four hours; interviews continued; needs classified; mining cut first | 16 | 3 |",
    "| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics, two hours each; ten job ads and 25 reviews coded in four hours; two further interviews; a spec classifying at least 25 surfaced needs | 14 | 2 |")
rep("| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 14 | 4 |",
    "| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 16 | 5 |")
rep("| 4 | Fidelity check | Two team-weeks scored; threshold met before any session | 4 | 1 |",
    "| 4 | Fidelity check | Two team-weeks scored; threshold met before any session | 3 | 1 |")
rep("| 5 | Sessions run and coded | Eight participants, two conditions each; six think-alouds coded | 12 | 4 |",
    "| 5 | Sessions run and coded | Eight 45-minute sessions, two conditions each (6 h); six think-alouds coded from timestamped notes (7 h) | 13 | 4 |")
rep("| 7 | Portfolio video | Three to four minutes; my contribution named early | 4 | 1 |",
    "| 7 | Portfolio video | Three to four minutes showing the tool and both report conditions; a viewer new to the project can state its purpose after one viewing | 4 | 1 |")
rep("A1 priced study and evaluation at 18 hours each. The study falls to 16, with the tool sample fixed at four and review mining time-boxed. The evaluation's 20 hours split into instruments, check and sessions (4, 4, 12); the 36-hour anchor holds.",
    "Study and evaluation take 34 of the 65 hours: the study is held to 14 by fixing the tool sample at four and time-boxing review mining, and the evaluation's 20 split into instruments (4), the fidelity check (3) and sessions (13).")
rep("The committed tier takes 11 of row 2's 14 hours: the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from YAML names and identifiers. At least 60% must be named, with a file-level fallback (Figure 4).",
    "The build is tiered so the minimum lands first. The committed tier takes 11 of row 2's 16 hours: the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 4). At least 60% of changed prefabs and scenes must be named, with a file-level fallback.")
rep("The stretch tier adds in-engine depth through Unity's build report.\n\nThe challenge tier, absence detection (flagging work gone quiet) stays gated, since Maddila et al. (2023) show ungated alerting misfires. The upper tiers share the remaining three hours, consumed first by an over-run.",
    "The stretch tier (3 hours) parses Unity's build report for every sampled week and names failed steps and the three largest asset-size changes; if it is not reached, that section is dropped and the committed report ships alone. The challenge tier (2 hours), absence detection (flagging work gone quiet), flags quiet work on two weeks checked against the fidelity record, and stays gated because Maddila et al. (2023) show ungated alerting misfires. A committed-tier overrun consumes the upper tiers' hours first.")

# ---------- Statement ----------
rep("## Appendix A — Statement on Generative AI use", "## Statement on Generative AI use")
rep("the ChangeLens-lite prototype code (from my specification)", "the ChangeLens prototype code (from my specification)")
rep("Evidence accompanies this submission.", "Evidence (session records, verification files and scripts) accompanies this submission.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("v3 edits applied")
