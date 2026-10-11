"""Round-three word-count cuts (after apply-v3-edits.py). Exact-match; nothing written if any match fails."""
import io, re

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
rep("A producer plans and tracks the team's work without writing code, so the report has to say it in plain terms.",
    "A producer plans and tracks the team's work without writing code.")
rep("Tickets and code changes do not match: a two-day refactor can leave no ticket; a three-line tweak looks like a day's work.",
    "A two-day refactor can leave no ticket while a three-line tweak looks like a day's work.")
rep("ZeroStandup (n.d.) turns tracker and repository activity into team-readable updates, and Linear's (n.d.) project-update agent does the same from projects, issues, docs and code; HacknPlan (n.d.) needs manual entry.",
    "ZeroStandup (n.d.) and Linear's (n.d.) project-update agent turn tracker, repository and document activity into team-readable updates; HacknPlan (n.d.) needs manual entry.")

# Literature Review
rep("Their answers fall into three camps, compared at the end.", "They fall into three camps, compared at the end.")
rep("No Unity or Unreal project appears in its sample — my inference from its selection criteria — so I measure the same file mix on Unity repositories myself.",
    "No Unity or Unreal project appears in its sample, so I measure the same file mix on Unity repositories myself (Figure 1).")
rep("Against that they set shared feedback, collected passively as a by-product of the work itself. That is the peer-reviewed ancestry of the aggregation layer I intend to build.",
    "Against that they set shared feedback collected passively as a by-product of the work itself, the ancestry of the aggregation layer I intend to build.")
rep(" A trial across 147 Microsoft repositories cut mean pull-request lifetime from 197.2 hours to 77.7.", "")
rep("That is the counter-evidence: postmortems record outcomes rather than the reporting that produced them, so the seam may be real but unnamed, and the study must find it in artefacts rather than in what teams say.",
    "Postmortems record outcomes rather than the reporting that produced them, so the seam may be real but unnamed; the study must find it in artefacts, not in what teams say.")
# Table 1 -> three columns
rep("| Mechanism | As its source states it | What it predicts an automated report can repair | What that implies for the method |\n|---|---|---|---|\n| Structural (Dourish and Bellotti) | Costs the reporter, pays the group | Passive extraction repairs it | Read artefacts, do not ask |\n| Opacity and blame on the tool (Whitson) | Output whose cause users cannot predict | What changed, not why | Asking practitioners under-reports |\n| Audience mismatch (Stray) | Status reporting serves the manager | Nothing, unless it fits its reader | Measure the reader's understanding |",
    "| Mechanism | What the source says | What an automated report could repair |\n|---|---|---|\n| Structural (Dourish and Bellotti) | Reporting costs the reporter and pays the group | The whole gap, by reading artefacts instead of asking |\n| Opacity and blame on the tool (Whitson) | Output whose cause users cannot predict | What changed, not why |\n| Audience mismatch (Stray) | Status reporting serves the manager | Nothing, unless the page fits its reader |")

# Learning goals
rep("I held the producer role on my COMP3151 team and aim for producer or technical-producer roles, where judging what a team's artefacts can tell you, and telling people who never open the repository, is daily work; the job-ad scan in Deliverable 1 tests whether advertisements ask for it.",
    "I was the producer on my COMP3151 team and aim for producer or technical-producer roles, where judging what a team's artefacts can tell you, and telling people who never open the repository, is daily work; Deliverable 1's job-ad scan tests whether advertisements ask for it.")

# Scoping evidence
rep("Sub-question 1: which surfaced needs are derivable, partly derivable or not derivable from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? It keeps a result even if the experiment finds no effect. Sub-question 2: does adding the asset layer improve a reader's comprehension of the week, and does confidence track accuracy?",
    "Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? It keeps a result even if the experiment finds no effect. Sub-question 2: does the asset layer improve a reader's comprehension, and does confidence track accuracy?")
rep("I will ask at the first COMP3151 prac of Week 9 and in the team channels, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight, with a floor of five for both arms; below that,",
    "I will ask at the first COMP3151 prac of Week 9, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight with a floor of five; below that,")
rep("Each participant reads both versions in alternating order, five minutes each. Six items are scored against answers fixed in advance, at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next.",
    "Each participant reads both versions in alternating order and answers six items scored against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next.")
rep("a second coder, a COMP3151 classmate briefed with the codebook, codes a quarter and agreement is reported.",
    "a second coder (a briefed COMP3151 classmate) codes a quarter and agreement is reported.")
rep("scores every claim in a report supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.",
    "scores every claim in a report as supported, unsupported or contradicted against the team's record; it passes when none is contradicted and 90% are supported, and a failing week is repaired and re-scored in Week 11.")
rep("so the corpus is split. Both conditions come from RE-SS3D/SS3D's history, so the asset-layer contrast is tested on one repository; immersivecognition/unity-experiment-framework serves sub-question 1. The cost is that fused tracker-plus-repository output is never tested; that needs a team's own linked history, out of scope for 65 hours. Over each repository's full history, code is 7–36% of changed-file entries (Figure 1); a single week can run higher, as the code-heavy reorganisation week in Figure 2 shows at 41.9%, which is why the report is built per week.",
    "so the corpus is split: both conditions come from RE-SS3D/SS3D's history and immersivecognition/unity-experiment-framework serves sub-question 1. The cost is that fused tracker-plus-repository output is never tested; that needs a team's own linked history, out of scope for 65 hours. Over full histories, code is 7–36% of changed-file entries (Figure 1); one week can run higher, as the reorganisation week in Figure 2 shows at 41.9%, so the report is built per week.")
rep("ChangeLens is a Unity Editor package turning a week of git history into a grouped change report. One Editor window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2); the package sits in the project like any other (Figure 3). The prototype classifies files only; the committed tier adds object naming, and Unity earns its place there because the AssetDatabase resolves the identifiers to asset and script names without a hand-written parser, and the build report exists nowhere else.",
    "ChangeLens is a Unity Editor package turning a week of git history into a grouped change report: one window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2). The prototype classifies files only; the committed tier adds object naming, where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a hand-written parser, and the build report exists nowhere else.")
rep("\n![Figure 3. The ChangeLens package inside the Unity Project window.](figures/fig2-package-in-project.png \"w=8\")\n", "\n")
rep("![Figure 4. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png)",
    "![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png)")
rep("from the names and identifiers Unity versions as text (Figure 4).", "from the names and identifiers Unity versions as text (Figure 3).")

# Deliverables
rep("The 65 hours cover Weeks 9–13 plus the break: 50 outside class, 15 in prac; earlier work is uncounted.",
    "The 65 hours (50 outside class, 15 in prac) cover Weeks 9–13 plus the break.")
rep("two hours each; ten job ads and 25 reviews coded in four hours; two further interviews; a spec classifying at least 25 surfaced needs",
    "two hours each; ten job ads and 25 reviews coded in four hours; two more interviews; a spec classifying 25 surfaced needs")
rep("Three to four minutes showing the tool and both report conditions; a viewer new to the project can state its purpose after one viewing",
    "Three to four minutes showing the tool and both conditions; a newcomer can state its purpose after one viewing")
rep("The committed tier takes 11 of row 2's 16 hours: the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3). At least 60% of changed prefabs and scenes must be named, with a file-level fallback.",
    "The committed tier (11 of row 2's 16 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3), naming at least 60% of changed prefabs and scenes with a file-level fallback.")
rep("The stretch tier (3 hours) parses Unity's build report for every sampled week and names failed steps and the three largest asset-size changes; if it is not reached, that section is dropped and the committed report ships alone. The challenge tier (2 hours), absence detection (flagging work gone quiet), flags quiet work on two weeks checked against the fidelity record, and stays gated because Maddila et al. (2023) show ungated alerting misfires. A committed-tier overrun consumes the upper tiers' hours first.",
    "The stretch tier (3 hours) parses Unity's build report for every sampled week and names failed steps and the three largest asset-size changes; if unreached, that section is dropped. The challenge tier (2 hours) flags work gone quiet on two weeks, checked against the fidelity record, and stays gated because Maddila et al. (2023) show ungated alerting misfires. A committed-tier overrun consumes those hours first.")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("v3 cuts applied; figures now:", re.findall(r"Figures? (\d)", s.split("## References")[0]))
