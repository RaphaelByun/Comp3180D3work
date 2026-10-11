"""Round 6 (18 Sep 2026, evening): own-team evidence from the Inkform repository and Atlassian record, a sixth
repository in Figure 1, the build-report probe for the stretch tier, and two uncounted appendices (draft
comprehension items; the ChangeLens report for the sampled week). Exact-match; nothing written if any match fails."""
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

# ---------- Literature Review ----------
rep("No Unity or Unreal project appears in its sample, so I measured five Unity repositories myself (Figure 1), and the report categorises by file type rather than by code alone.",
    "No Unity or Unreal project appears in its sample, so I measured six Unity repositories myself, including my own team's (Figure 1), and the report categorises by file type rather than by code alone.")
rep("![Figure 1. Code share of changed-file entries in five open-source Unity repositories, against Pascarella et al.'s 30% file-category share (a different denominator).](figures/fig4-code-file-percentage.png \"w=14\")",
    "![Figure 1. Code share of changed-file entries in five open-source Unity repositories and my own team's, against Pascarella et al.'s 30% file-category share (a different denominator).](figures/fig4-code-file-percentage.png \"w=14\")")
rep("Dourish and Bellotti (1992) watched four groups of three designers solve a 90-minute design problem in a shared editor, asking how people stay aware of each other's work.",
    "Dourish and Bellotti (1992) watched four groups of three designers solve a 90-minute design problem in a shared editor.")
rep("Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio, asking how engines and art tools shape work.",
    "Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio.")
rep("Those 21 types let me answer the research question need by need and give my think-aloud sessions their coding frame.",
    "Those 21 types let me answer the question need by need and give the think-alouds their coding frame.")

# ---------- Learning goals ----------
rep("These capabilities span understand to create (Anderson & Krathwohl, 2001). After completing this unit, I want to be able to:",
    "These capabilities span understand to create (Anderson & Krathwohl, 2001); after this unit I want to be able to:")

# ---------- Scoping Evidence ----------
rep("It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not against a named artefact.",
    "It is answered by desk classification: each need in Deliverable 1's specification is marked derivable, partly derivable or not against a named artefact.")
rep("classifies each changed path by extension and sibling .meta file, and shows counts per category (Figure 2).",
    "classifies each changed path by extension and sibling .meta file, and shows counts per category (Figure 2; Appendix C).")
rep("Each session is 45 minutes, after an excluded pilot.", "Sessions are 45 minutes after an excluded pilot.")
rep("Each answers six matched questions per report, and six of them then think aloud on a stand-up task.",
    "Each answers six matched questions per report (draft items in Appendix B), and six of them then think aloud on a stand-up task.")
rep("Participation is voluntary, with verbal consent, the right to stop and de-identified reporting.",
    "Participation is voluntary, with verbal consent and de-identified reporting.")
rep("Scores are compared within participant across the two conditions; at eight readers the arm shows direction and per-item failure points, not significance.",
    "Scores are compared within participant; at eight readers the arm shows direction and per-item failure points, not significance.")
rep("No public Unity repository I screened links issues densely enough to test tracker fusion (Appendix A), so the study reads the asset layer only; both report weeks come from SS3D, and the Unity Experiment Framework, the best-linked, serves Sub-question 1.",
    "No public Unity repository I screened links issues densely enough to test tracker fusion, and my own team's would not either: its sprint pages were backfilled for a semester and none of its 126 commits cites a Jira issue (Appendix A). The study therefore reads the asset layer only; both report weeks come from SS3D, and the Unity Experiment Framework, the best-linked, serves Sub-question 1.")
rep("(commits on 10–14 February); this week runs at 24% code against 17.5% over the repository's history.",
    "(commits on 10–14 February); 24% code against 17.5% over the repository's history.")

# ---------- Deliverables ----------
rep("The stretch tier (3 hours) parses Unity's build report and names failed steps and the three largest asset-size changes.",
    "The stretch tier (3 hours) parses Unity's build report, which the prototype already reads (Appendix C), and names failed steps and the three largest asset-size changes.")
rep("A live tracker connection is out of scope, since public repositories link issues too sparsely and a team's own tracker is private; so is a language-model prose layer, which could not pass the fidelity check.",
    "A live tracker connection is out of scope, since no repository I screened links issues densely enough; so is a language-model prose layer, which could not pass the fidelity check.")

# ---------- Appendix A (uncounted) ----------
rep("Figure 2's 24% is one week of SS3D on the first basis.",
    "Figure 2's 24% is one week of SS3D on the first basis. My own team's repository (Inkform, COMP3150 semester one, 126 commits, 2,366 entries) measures 17.4% on the first basis and 27.0% on the second; none of its 126 commit messages cites a Jira key, and of the team's 216 Jira issues 41 mention a commit, branch or pull request in free text but none is linked to one.")

# ---------- Appendices B and C (uncounted) ----------
s = s.rstrip("\n") + """

## Appendix B — Draft comprehension items for the 8–14 February 2021 SS3D week

One set per study week (Deliverable 3), scored against fixed answers; L1–L3 are Endsley's levels. Both report versions list the commits and the category counts; the treatment version also names the changed scenes and prefabs.

1. (L1) How many commits landed this week, and which category had the most changed-file entries? *Fixed answer:* eight commits; scenes and prefabs, 35 entries.
2. (L1) Which commit touched the most files? *Fixed answer:* "Fix restart bug (#588)", 35 files.
3. (L2) Was this a code-heavy or a content-heavy week? Give one number from the report that shows it. *Fixed answer:* content-heavy; code is 25 of 104 entries (24%), while scenes, prefabs, art and audio make 45.
4. (L2) Which commit most likely changed what a player sees or hears, rather than how the game computes? *Fixed answer:* the emergency-light commit (three prefabs, three art files) or the floor-sign commit (four art files, two prefabs); the wires-and-pipes commit (eight code files) is the distractor.
5. (L3) Two commits on 14 February touched airlocks. What would you test first in the next build, and why? *Fixed answer:* airlock interaction and sound, because 18 airlock prefab entries changed in two commits on one day; the treatment version names the nine prefabs.
6. (Unanswerable) Which of these changes were asked for in the tracker? *Fixed answer:* "the report doesn't tell me"; the report reads the repository only.

## Appendix C — The ChangeLens report for the sampled week, and the build-report probe

Generated by the prototype from the export behind Figure 2 (`Samples~/ss3d-week-2021-02-08-changelens-report.md`, 18 September 2026).

| Measure | Value |
|---|---|
| Commits | 8 (2021-02-10 to 2021-02-14) |
| Changed-file entries | 104 |
| Code-file entries | 25 (24.0%) |

| Category | Added | Modified | Deleted | Renamed | Total |
|---|---|---|---|---|---|
| Code | 9 | 14 | 0 | 2 | 25 |
| ScenePrefab | 2 | 32 | 1 | 0 | 35 |
| Art | 7 | 1 | 0 | 0 | 8 |
| Audio | 2 | 0 | 0 | 0 | 2 |
| DataConfig | 0 | 4 | 0 | 0 | 4 |
| Meta | 24 | 3 | 0 | 3 | 30 |

Commits, newest first: ea23f08 Add sound fall off to airlocks (#611), 9 files; 61a96bf Add emergency light and light interactions (#610), 13; a7aab33 Make floor sign openable/closeable (#609), 14; f68b6a3 Add RigidBody to airlocks to fix their interaction (#608), 9; 3855af4 Optional connections for wires & pipes (#607), 10; a326ba1 Rework the container UI (#605), 4; 37e22a3 Fix restart bug (#588), 35; 0059f5d Create PepperSpray class to handle interaction with the pepper spray (#604), 10.

**Build-report probe (stretch tier).** On 18 September 2026 the prototype built a one-object scene for Windows in batch mode and read Unity's BuildReport object: result Succeeded, 25 s, 86.8 MB, 0 errors, 28 timed steps (Postprocess built player 20.0 s), largest packed asset the built-in splash-screen texture at 2,730.7 KB (`prototype-logs/buildreport.txt`, `BatchTools.cs`). Failed steps and packed-asset sizes are therefore readable from the same object the stretch tier would parse.
"""

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-6 edits applied")
