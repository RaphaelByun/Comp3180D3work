%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts
%SUBTITLE: COMP3180 RESEARCH PROPOSAL
%NAME: Raphael Byun
%ID: [STUDENT ID]
%CATEGORY: Developer / production tools
%HEADER: COMP3180 Research Proposal — Raphael Byun

<!--BODY-START-->

## Introduction

Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code, so what they know comes from tickets (the tracker's task records) and stand-ups. A two-day refactor can leave no ticket, while a three-line tweak can look like a day's work. Game projects are harder still: most of their files are not code (Pascarella et al., 2018), so a report that reads only code misses most of the week.

ChangeLens is a Unity Editor tool that reads the files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scenes. The project delivers that tool and an evaluation in which eight student producers read two versions of the report, one that names the changed scenes and prefabs (the Unity asset layer) and one that does not. The proposal asks:

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

Seven surveyed tools each cover one part (Appendix A): tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and Perforce's P4 MCP narrates asset history for developers, not producers (Perforce Software, n.d.). None of the seven reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.

## Literature Review

Why is a team's shared record thinner than the work it describes? Two explanations compete. Dourish and Bellotti (1992) blame the structure of reporting: it costs the reporter and pays everyone else. Whitson (2018) blames the tools: developers cannot always see why the software did what it did. Four further studies supply what the test needs: evidence that the record does fail, a way to break a producer's needs into pieces, the file mix that makes games different, and a bar for reporting what has stopped moving.

Bertram et al. (2010) interviewed and surveyed 15 people across four small, collocated software teams about their issue tracker. Bugs go unfiled because the record fails at the point of entry. One participant said, "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296). Team B, a product development team in a large gaming company (p. 293), had to build a simplified filing interface before non-experts would file anything at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report, so my evaluation scores each report against the team's history, not its tickets.

Ko et al. (2007) watched 17 developers at a large software company and surveyed 42 more. One finding fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work. The taxonomy is a developer's, so only part of it transfers: "What have my coworkers been doing?" (§5.7) is a producer's question too, the debugging kinds are not, and Deliverable 1 tests the transfer by classifying the needs producers actually raise. "What code caused this program state?" (p. 348) was the most often unsatisfied, failing in 61% of cases (p. 351). Developers looked for it in the debugger and logs, not a colleague, so the obstacle was the tool. Those 21 types let me answer the question need by need and give the think-alouds their coding frame.

Pascarella et al. (2018) analysed the repositories of 30 open-source game projects and 30 non-game systems, comparing which files each changed. The file mix is the contrast: non-game projects have, on average, 80% of files in the Development category, game projects only 30%. In games, sub-teams form around non-code categories such as multimedia (owned means above a 75% contribution share). In non-game projects, ownership groups form only around code, so a code-only report is blind to whole disciplines. No Unity or Unreal project appears in its sample, so I measured six Unity repositories myself, including my own team's (Figure 1), and the report categorises by file type rather than by code alone.

![Figure 1. Code share of changed-file entries in five open-source Unity repositories and my own team's, against Pascarella et al.'s 30% file-category share (a different denominator).](figures/fig4-code-file-percentage.png "w=14")

Dourish and Bellotti (1992) watched four groups of three designers solve a 90-minute design problem in a shared editor. Their answer is structural: asking people to report costs the reporter and pays the group, so it under-delivers by design, and recipients get only what the sender judges relevant, when the sender chooses. Their own example is the version-control edit log, today's commit message; in my corpus, "Fix restart bug (#588)" names an intention while touching 35 files across six categories. Against that they set shared feedback collected passively as a by-product of the work itself. That is the tool I propose: it reads artefacts instead of asking people. Their evidence is narrow (four groups, one session); extending it to week-long work is mine to defend.

Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio. Developers called the software "voodoo" when their input produced output whose cause they could not predict. Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise. Whitson's answer is therefore opacity: the tool hides causes, and blaming it keeps the team moving. If opacity is the mechanism, extraction names what changed but not why, so the think-aloud follow-up asks what the page leaves unexplained.

Maddila et al. (2023) built and trialled Nudge, which flags a pull request when it goes quiet too long. It is the closest work to absence detection; what I learnt is how it avoids false alarms. Nudge predicts when a pull request should have finished, then stays silent while comments, pushed commits or state changes continue within the last 24 hours. Before that check existed, 86 of 119 alerts that developers rejected had fired despite recent activity on the pull request. Three limits bound my claim: every signal comes from inside the pull request, dependencies between items go unhandled, and no verdict is composed across items. Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.

All six reviewed studies show the same seam: the record is thinner than the work. Dourish and Bellotti predict that passive extraction repairs it; Whitson predicts extraction says what changed but not why. Two further studies bound the claim. Stray et al. (2016), who studied 12 teams' daily stand-ups, add the audience answer: a stand-up-turned-status-report serves the manager, not the team. Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289): they record outcomes, not the reporting behind them, so the seam must be found in artefacts. The project bets on the structural mechanism; if readers can say what changed but not why, opacity wins. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it.

## Project Proposal

### Learning Goals

These capabilities span understand to create (Anderson & Krathwohl, 2001); after this unit I want to be able to:

**Understand:** diagnose why a team's production record under-reports its work, distinguishing three competing mechanisms. *Measure:* unaided, state each mechanism, its source and a breakdown it predicts.

**Apply → Analyse:** run heuristic evaluation, then reconcile its findings against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.

**Evaluate:** judge whether a team's artefacts can serve a producer's information need, or whether a person must. *Measure:* every need classified against a named artefact, with three needs where I name the artefact I rejected and why.

**Create:** build a Unity Editor tool over the serialised asset layer and design its report for a reader who never opens the codebase. *Measure:* given an unfamiliar Unity week, I produce a one-page report naming 60% of its changed prefabs and scenes, and can tie each layout decision to a named reader need, two of them defended against a rejected alternative.

I was the producer on my COMP3151 team and aim for producer or technical-producer roles. In those roles, writing the status that non-technical stakeholders act on is daily work; six of nine producer advertisements sampled in September 2026 ask for progress reporting to leadership or partners.

### Scoping Evidence

The research question is *Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?* Two sub-questions structure its evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer? Each need in Deliverable 1's specification is marked derivable, partly derivable or not against a named artefact, twice a week apart, with disagreements reported. Sub-question 2: does naming the changed scenes and prefabs improve a reader's comprehension of the week?

ChangeLens is a Unity Editor package (Unity 6.4): it reads a git log export for one week, classifies each changed path by extension and sibling .meta file, and shows counts per category (Figure 2; Appendix C). The prototype classifies files only; the committed tier adds object naming (Figure 3), where the AssetDatabase resolves identifiers to asset and script names without a parser. Across four SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). The 60% naming target is set against that range, and where no name resolves the report falls back to the file path.

![Figure 2. ChangeLens docked in the Unity 6.4 Editor on the SS3D week of 8–14 February 2021 (commits on 10–14 February).](figures/fig2-changelens-docked-2021.png "w=13")

![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png "w=13")

Deliverable 1 runs first: its interviews, reviews and job-ad scan produce the needs list, and its heuristic evaluation records what existing tools already answer.

A pilot session runs first and is excluded; each session is then 45 minutes. Eight student producers each read a baseline report for one team-week and a treatment report for another, counterbalanced by week and order. Each answers six matched questions per report (draft items in Appendix B), and six of them then think aloud on a stand-up task.

I recruit at the Weeks 9 and 10 COMP3151 pracs and my COMP3180 prac; every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each. If fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation in interviews and sessions is voluntary, with verbal consent and de-identified reporting.

The quantitative arm scores the six items against fixed answers at Endsley's (1995) three levels of situation awareness: what changed, what it means, what happens next. One item per report is unanswerable, so its "the report doesn't tell me" option catches guessing. Scores are compared within each participant; at eight readers the arm shows direction and per-item failure points, not significance.

The qualitative arm asks what the page leaves a reader needing; the six think-aloud participants then answer a follow-up feeding Sub-question 1. Comments are coded against Ko et al.'s (2007) 21 information types; a quarter is re-coded after a week and agreement is reported.

Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record, read by hand. It can falsify naming and activity claims, not file counts. It passes when none is contradicted and 90% are supported. A failing week is repaired and re-scored in Week 11.

No public Unity repository I screened links issues densely enough to test tracker fusion, and my own team's would not either: its sprint pages were backfilled for a semester and none of its 126 commits cites a Jira issue (Appendix A). The study reads the asset layer only; both report weeks come from SS3D, and the Unity Experiment Framework, the best-linked, serves Sub-question 1.

### Deliverables

The 65 hours (50 outside class, 15 in prac) cover Weeks 9–13 plus the break.

| # | Deliverable | Success measure | Hours | In-prac |
|---|---|---|---|---|
| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics (5 h); 10 job ads and 25 reviews coded (3 h); two 20-minute interviews outside the reader pool (2 h); a spec classifying 25 needs by artefact source (Sub-question 1) (3 h) | 13 | 2 |
| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 16 | 5 |
| 3 | Evaluation protocol and instruments | Six matched items per week, answerable from the report alone; rubric and think-aloud script piloted and revised before Week 12 | 4 | 1 |
| 4 | Fidelity check | Two team-weeks scored; threshold met before any session; one hour reserved for repair | 3 | 1 |
| 5 | Sessions run and coded | Eight 45-minute sessions plus scheduling and setup (7 h); six think-alouds coded from timestamped notes (7 h) | 14 | 4 |
| 6 | Evaluation report, instruments, data | All six items and both coding arms reported with agreement; claims traceable to appendices | 7 | 1 |
| 7 | Portfolio video | Three to four minutes showing the tool and both conditions; two outside viewers can each state its purpose and intended reader after one viewing | 4 | 1 |
| 8 | Development diary | A dated entry each week naming a roadblock or breakthrough | 2 | 0 |
| 9 | Reflection report | All four goals evidenced; hour variances explained | 2 | 0 |
| | **Total** | | **65** | **15** |

The committed tier (11 hours) delivers the extractor, the one-page report and baseline, and object naming of prefabs and scenes from the text Unity versions (Figure 3). The stretch tier (3 hours) parses Unity's build report, which the prototype already reads (Appendix C), and names failed steps and the three largest asset-size changes. The challenge tier (2 hours) flags work gone quiet on two weeks and stays gated because Maddila et al. (2023) show ungated alerting misfires. An overrun consumes the stretch and challenge hours first.

A live tracker connection is out of scope, since no repository I screened links issues densely enough; so is a language-model prose layer, which could not pass the fidelity check. The biggest risk is hand-authoring ground truth, because commit messages name the ticket, not the week's work; an unscorable week is replaced and a contradicted claim repaired. Deliverable 1 runs across the break and Week 9; the committed tier and instruments land in Week 10, the fidelity check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.

<!--BODY-END-->

## References

Anchorpoint. (n.d.). *Anchorpoint: Version control software for 3D*. Retrieved September 18, 2026, from https://www.anchorpoint.app/

Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

Bertram, D., Voida, A., Greenberg, S., & Walker, R. (2010). Communication, collaboration, and bugs: The social nature of issue tracking in small, collocated teams. In *Proceedings of the 2010 ACM Conference on Computer Supported Cooperative Work* (pp. 291–300). ACM. https://doi.org/10.1145/1718918.1718972

Dourish, P., & Bellotti, V. (1992). Awareness and coordination in shared workspaces. In *Proceedings of the 1992 ACM Conference on Computer-Supported Cooperative Work* (CSCW '92) (pp. 107–114). ACM. https://doi.org/10.1145/143457.143468

Endsley, M. R. (1995). Toward a theory of situation awareness in dynamic systems. *Human Factors, 37*(1), 32–64. https://doi.org/10.1518/001872095779049543

HacknPlan. (n.d.). *HacknPlan: The project management tool for game developers*. Retrieved September 17, 2026, from https://hacknplan.com/

Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. In *Proceedings of the 29th International Conference on Software Engineering* (ICSE '07) (pp. 344–353). IEEE. https://doi.org/10.1109/ICSE.2007.45

Linear. (2026, June 18). *Agent assisted project updates* [Changelog]. https://linear.app/changelog/2026-06-18-agent-assisted-project-updates

Maddila, C., Upadrasta, S. S., Bansal, C., Nagappan, N., Gousios, G., & van Deursen, A. (2023). Nudge: Accelerating overdue pull requests toward completion. *ACM Transactions on Software Engineering and Methodology, 32*(2), Article 35. https://doi.org/10.1145/3544791

McShaffry, M. (2013, March). *Generating useful, meaningful (and beautiful) project data from Perforce* [Conference presentation]. Game Developers Conference 2013, San Francisco, CA, United States. https://www.gdcvault.com/play/1017697/Generating-Useful-Meaningful-(and-Beautiful)

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '94) (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '90) (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281

Pascarella, L., Palomba, F., Di Penta, M., & Bacchelli, A. (2018). How is video game development different from software development in open source? In *Proceedings of the 15th International Conference on Mining Software Repositories* (pp. 392–402). ACM. https://doi.org/10.1145/3196398.3196418

Perforce Software. (n.d.). *AI-driven workflows with P4 MCP*. Retrieved September 17, 2026, from https://www.perforce.com/products/p4/p4-mcp

Stray, V., Sjøberg, D. I. K., & Dybå, T. (2016). The daily stand-up meeting: A grounded theory study. *Journal of Systems and Software, 114*, 101–124. https://doi.org/10.1016/j.jss.2016.01.004

Unity Technologies. (n.d.). *Unity Production Pipeline*. Retrieved September 18, 2026, from https://unity.com/features/unity-production-pipeline

Washburn, M., Jr., Sathiyanarayanan, P., Nagappan, M., Zimmermann, T., & Bird, C. (2016). "What went right and what went wrong": An analysis of 155 postmortems from game development. In *Proceedings of the 38th International Conference on Software Engineering Companion* (ICSE '16 Companion) (pp. 280–289). ACM. https://doi.org/10.1145/2889160.2889253

Whitson, J. R. (2018). Voodoo software and boundary objects in game development: How developers collaborate and conflict with game engines and art tools. *New Media & Society, 20*(7), 2315–2332. https://doi.org/10.1177/1461444817715020

ZeroStandup. (n.d.). *ZeroStandup: AI-powered automated daily standups*. Retrieved September 17, 2026, from https://zerostandup.com/

## Statement on Generative AI use

Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and verified every source; five AI-introduced errors (a fabricated quotation, a wrong article substituted for the right one, two conflated counts, a misattributed mechanism and a misdescribed notification recipient) were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission as GENAI-EVIDENCE.md, which names them.

[CONFIRM BEFORE SUBMISSION: which of the six counted sources Raphael has read in full]

## Appendix A — Scoping data

**Vendor sweep (3 August 2026, rechecked 17–18 September 2026).** Public product documentation only; studio-internal tooling is not observable.

| Tool | Reads | Produces | For whom | Does not do |
|---|---|---|---|---|
| ZeroStandup (n.d.) | Git hosting and issue trackers | Stand-up-style AI summaries | Engineers, team leads, managers | No engine or asset signals; daily altitude only |
| Linear (2026) | Issues, documents, code changes, Slack | Agent-drafted project updates | Product teams | No engine or asset signals |
| HacknPlan (n.d.) | Manual entry per discipline | Kanban boards, burndown | Game teams | Nothing derived from the repository or engine |
| Perforce P4 MCP (Perforce Software, n.d.) | Helix Core history, including binary assets | Natural-language answers about history | Developers | No tracker fusion; no producer-facing report |
| Unity Production Pipeline (Unity Technologies, n.d.) | Builds, assets, version control (closed beta; public availability November 2026) | Web review of renders, build automation | Producers, artists, QA | No change report from tracker plus repository plus asset history |
| Anchorpoint (n.d.) | Git history of Unity, Unreal and Godot projects | Thumbnails, visual review, file locks | Artists, developers | No change report for producers |
| McShaffry (2013), GDC talk | Perforce logs, mined by hand | Charts for scheduling | Producers | Manual; never productised |

**Corpus screen (17 September 2026, corpus.py).** Thresholds: at least one megabyte of versioned non-code assets, and at least 30 genuine issue references per 100 commits, where a genuine reference cites an issue other than the squash-merged pull request's own number. Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0. Code share of changed-file entries, .meta counted as non-code (the Figure 1 series): SS3D 17.5%, open-brush 23.6%, VRTK 36.4%, jynew 7.4%, Unity Experiment Framework 19.2%; with .meta excluded from both numerator and denominator: 33%, 40%, 57%, 12% and 23%. Figure 2's 24% is one week of SS3D on the first basis. My own team's repository (Inkform, COMP3150 semester one, 126 commits, 2,366 entries) measures 17.4% on the first basis and 27.0% on the second; none of its 126 commit messages cites a Jira key, and of the team's 216 Jira issues, 41 mention a commit, branch or pull request in free text but none is linked to one.

## Appendix B — Draft comprehension items for the 8–14 February 2021 SS3D week

One set per study week (Deliverable 3), scored against fixed answers; L1–L3 are Endsley's levels. Both report versions list the commits and the category counts; the treatment version also names the changed scenes and prefabs.

1. (L1) How many commits landed this week, and which category had the most changed-file entries? *Fixed answer:* eight commits; scenes and prefabs, 35 entries.
2. (L1) Which commit touched the most files? *Fixed answer:* "Fix restart bug (#588)", 35 files.
3. (L2) Was this a code-heavy or a content-heavy week? Give one number from the report that shows it. *Fixed answer:* content-heavy; code is 25 of 104 entries (24%), while scenes, prefabs, art and audio make up 45.
4. (L2) Which commit most likely changed what a player sees or hears, rather than how the game computes? *Fixed answer:* the emergency-light commit (three prefabs, three art files) or the floor-sign commit (four art files, two prefabs); the wires-and-pipes commit (eight code files) is the distractor.
5. (L3) Two commits on 14 February touched airlocks. What would you test first in the next build, and why? *Fixed answer:* airlock interaction and sound, because 18 airlock prefab entries changed in two commits on one day; the treatment version names the nine prefabs.
6. (Unanswerable) Which of these changes were asked for in the tracker? *Fixed answer:* "the report doesn't tell me"; the report reads the repository only.

## Appendix C — The ChangeLens report for the sampled week, and the build-report probe

Generated by the prototype from the export behind Figure 2 (ss3d-week-2021-02-08-changelens-report.md, 18 September 2026).

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

**Build-report probe (stretch tier).** On 18 September 2026 the prototype built a one-object scene for Windows in batch mode and read Unity's BuildReport object: result Succeeded, 25 s, 86.8 MB, 0 errors, 28 timed steps (Postprocess built player 20.0 s), largest packed asset the built-in splash-screen texture at 2,730.7 KB (prototype-logs/buildreport.txt, BatchTools.cs). Failed steps and packed-asset sizes are therefore readable from the same object the stretch tier would parse.
