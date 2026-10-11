"""Loop round 2 edits (audit/FINDINGS-round-2.md). Exact-match; nothing written if any match fails."""
import io, shutil

p = "A2 Draft v2 — 17 Sep 2026.md"
shutil.copy(p, "audit/as-marked-round-2.md")
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

# ---------- Introduction ----------
rep("The project delivers that tool plus an evaluation in which eight student producers read two versions of the report. The evaluation isolates the Unity asset layer, because connecting a team's own tracker would need their private history.",
    "The project delivers that tool plus an evaluation in which eight student producers read two versions of the report; the evaluation isolates the Unity asset layer.")
rep("ZeroStandup (n.d.) and Linear (2026) turn tracker and repository activity into team-readable updates, HacknPlan (n.d.) tracks non-code work by manual entry, and Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.); McShaffry (2013) showed producers doing that log-mining by hand. None reads",
    "Existing tools each cover one part: tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and repository narrators address developers (Perforce Software, n.d.); Appendix A compares them. None reads")

# ---------- Literature Review ----------
rep("It is why the fidelity check scores each report against the team's record, not its tickets.",
    "It is why my evaluation scores each report against what the team's history shows, not against its tickets.")
rep("Its sources were the debugger and logs, not a colleague, so the obstacle is the tool.",
    "Its sources were the debugger and logs, not a colleague, so the obstacle is the tool. Their overall conclusion is that the hardest questions concern causes and rationale, and tools serve those worst.")
rep("in non-games they form around code only, so a report that follows code alone is blind to whole ownership groups.",
    "in non-games they form around code only, so a report that follows code alone is blind to whole ownership groups. Their conclusion is that games differ in artefact mix and team specialisation, not only in code.")
rep("That is the case for Deliverable 2's aggregation layer, which reads artefacts instead of asking.",
    "That is the case for the tool I propose, which reads artefacts instead of asking people.")
rep("Nudge sets the bar for my challenge tier: absence detection has to compose across items and read asset activity, or it adds nothing.",
    "Nudge sets the bar for the hardest feature I have costed, flagging work gone quiet: it has to compose across items and read asset activity, or it adds nothing.")
rep("a stand-up turned status report serves the manager, not the team.", "a stand-up-turned-status-report serves the manager, not the team.")

# ---------- Learning goals ----------
rep("*Measure:* at least two-thirds of think-aloud participants answer the assigned status question from the report alone.",
    "*Measure:* for each layout decision in the report, I can name the reader need it serves and defend two of them against a named alternative I rejected.")
rep("Each is a CV line, not a thing I made. I was the producer", "I was the producer")

# ---------- Scoping Evidence: rebuild tool-first ----------
a = s.index("### Scoping Evidence")
b = s.index("### Deliverables")
scoping = """### Scoping Evidence

The primary research question is the one quoted in the Introduction; two sub-questions structure its evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? Sub-question 2: does the asset layer improve a reader's comprehension, and does confidence track accuracy?

ChangeLens is a Unity Editor package (Unity 6.4) turning a week of git history into a grouped change report: one window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2). The prototype classifies files only; the committed tier adds object naming (Figure 3), where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a hand-written parser. Over full histories, code is 7–36% of changed-file entries (Figure 1); one week can run higher, as the reorganisation week in Figure 2 shows at 41.9%, so the report is built per week.

![Figure 2. ChangeLens running inside Unity 6.4 on one week of SS3D history (a code-heavy reorganisation week).](figures/fig1-changelens-window.png "w=14")

![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png "w=15")

Deliverable 1 runs first and surfaces the needs through heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews; its specification is what the Evaluate goal classifies.

The study is a single 45-minute session per participant, after one pilot session excluded from analysis: eight student producers each read two versions of the same week's report and answer six questions, and six of them then think aloud on a stand-up task. Both versions list the week's commits and changed files grouped by category; the treatment adds named scenes and prefabs.

I recruit at the first COMP3151 prac of Week 9, again in Week 10, then in my COMP3180 prac. Every COMP3151 team has a student producer, and teammates are briefed into the role with a one-page scenario. I target eight readers, six of whom also think aloud; the floor is five for each. Below the floor, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance for student studies, with verbal consent and the right to stop at any time; only de-identified data is reported.

The quantitative arm asks whether the asset layer changes what a reader can say about the week. Each participant reads both versions in alternating order and answers six items scored against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next. One item is unanswerable, so its "the report doesn't tell me" option catches guessing. At eight readers, a Wilcoxon signed-rank test detects large effects only.

The qualitative arm asks what the page leaves a reader needing. Six of them think aloud on a stand-up task, then answer a follow-up feeding Sub-question 1. Comments are coded against Ko et al.'s (2007) 21 information types; a second coder codes a quarter and agreement is reported.

Before any session, a fidelity check over two team-weeks scores every claim in a report as supported, unsupported or contradicted against the team's record read by hand: the full diffs, linked issue threads and release notes, which the generator never reads. It can falsify naming and activity claims, not file counts, which are mechanical. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.

I screened public Unity repositories on asset volume and issue-linking rate (thresholds in Appendix A). None links issues densely enough to test tracker fusion, so the project scopes to the asset layer and treats tracker fusion as future work: both report versions come from the history of SS3D, an open-source multiplayer station game, and the Unity Experiment Framework, the best-linked repository, serves Sub-question 1.

"""
s = s[:a] + scoping + s[b:]

# ---------- Deliverables ----------
rep("The build is tiered so the minimum lands first. The committed tier (11 of row 2's 16 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3). At least 60% of changed prefabs and scenes must be named, with a file-level fallback.",
    "The build is tiered so the minimum lands first. The committed tier (11 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3), naming at least 60% of changed prefabs and scenes with a file-level fallback.")
rep("A live tracker connection and a language-model prose layer are out of scope; an AI summary over the repository is the baseline, not the build. The biggest risk is hand-authoring ground truth, because the corpus's commits say only \"Fixed bugs\"; the fidelity check is the control: an unscorable week is replaced, a contradicted claim repaired.",
    "A live tracker connection is out of scope because no public repository links issues densely enough and a team's own tracker is private; a language-model prose layer is out of scope because generated narration is the commoditised alternative and could not pass the fidelity check. The biggest risk is hand-authoring ground truth, because the corpus's commits say only \"Fixed bugs\"; an unscorable week is replaced, a contradicted claim repaired.")
rep("All four goals evidenced; each hour variance explained", "All four goals evidenced; each hour's variance explained")

# ---------- Appendix A ----------
rep("| Stand-up style AI summaries |", "| Stand-up-style AI summaries |")
rep("| Atlassian Rovo, GitHub Copilot | Tickets; pull requests and diffs | AI sprint summaries; pull-request summaries | Engineering teams | Game-blind; no asset layer |",
    "| Atlassian Rovo, GitHub Copilot | Tickets; pull requests and diffs | AI sprint summaries; pull-request summaries | Engineering teams | Game-blind; no asset layer |\n| McShaffry (2013), GDC talk | Perforce logs, mined by hand | Charts for scheduling | Producers | Manual; never productised |")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-2 edits applied")
