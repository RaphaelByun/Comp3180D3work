%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts
%SUBTITLE: COMP3180 RESEARCH PROPOSAL
%NAME: Raphael Byun
%ID: [STUDENT ID]
%CATEGORY: Developer / production tools
%HEADER: COMP3180 Research Proposal — Raphael Byun

<!--BODY-START-->

## Introduction

Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code, so what they know comes from tickets (the tracker's task records) and stand-up meetings. A two-day refactor can leave no ticket, while a three-line tweak can look like a day's work. Today a technical lead translates by hand. Game projects are harder still: most of their files are not code (Pascarella et al., 2018), so a report that reads only code misses most of the week.

ChangeLens is a Unity Editor tool that reads the files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scenes, for someone who never opens the codebase. The project delivers that tool and an evaluation in which eight student producers read two versions of the report, one with and one without the Unity asset layer (the scenes, prefabs and .meta files Unity already versions). The proposal asks:

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

Existing tools each cover one part (Appendix A): tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and Perforce's P4 MCP narrates asset history for developers, not producers (Perforce Software, n.d.). None reads the Unity asset layer to tell a producer what changed; that is the gap this project fills.

## Literature Review

Why is a team's shared record thinner than the work it describes? Three answers compete. Dourish and Bellotti (1992) make it structural: reporting costs the reporter. Whitson (2018) makes it opacity: the tool hides causes and takes the blame. Stray et al. (2016) make it audience: the report serves the wrong reader. Bertram et al. (2010) show the failure; Ko et al. (2007), Pascarella et al. (2018) and Maddila et al. (2023) supply the unit of analysis, the games file mix and the bar for detecting absence.

Bertram et al. (2010) interviewed and surveyed 15 people across four small, collocated software teams about their issue tracker. Bugs go unfiled because the record fails at the point of entry. One participant said, "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296). Team B, a product development team in a large gaming company (p. 293), wrote a simplified filing interface before non-experts would file at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report, so my evaluation scores each report against the team's history, not its tickets.

Ko et al. (2007) watched 17 developers at a large software company and surveyed 42 more. One finding fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work. The taxonomy is a developer's, so only part of it transfers: "What have my coworkers been doing?" (§5.7) is a producer's question too, the debugging kinds are not, and Deliverable 1 tests the transfer by classifying the needs producers actually raise. "What code caused this program state?" (p. 348) was the most often unsatisfied, failing in 61% of cases (p. 351). Developers looked for it in the debugger and logs, not a colleague, so the obstacle was the tool. Those 21 types let me answer the research question need by need and give my think-aloud sessions (a participant says what they are thinking while working) their coding frame.

Pascarella et al. (2018) analysed the repositories of 30 open-source game projects and 30 non-game systems, comparing which files each changed. The file mix is the contrast: non-game projects have, on average, 80% of files in the Development category, game projects only 30%. In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games only around code, so a code-only report is blind to whole ownership groups. No Unity or Unreal project appears in its sample, so I measured the file mix on five Unity repositories myself (Figure 1; changed-file entries with .meta siblings counted as non-code, so indicative only), and the report categorises by file type rather than by code alone.

![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png "w=14")

Dourish and Bellotti (1992) watched four groups of three designers solve a 90-minute design problem in a shared editor, asking how people stay aware of each other's work. Their answer is structural: asking people to report costs the reporter and pays the group, so it under-delivers by design, and recipients get only what the sender judges relevant, when the sender chooses. Their own example is the version-control edit log, today's commit message; my corpus's "Fixed bugs" commits show the cost. Against that they set shared feedback collected passively as a by-product of the work itself. That is the tool I propose: it reads artefacts instead of asking people. Their evidence is narrow (four groups, one session); extending it to week-long work is mine to defend.

Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio, asking how engines and art tools shape work across disciplines. Developers called the software "voodoo" when their input produced output whose cause they could not predict. Blaming the software rather than a teammate let the group move on without exposing anyone's lack of expertise, and Unity itself was a boundary object that each discipline read differently. Whitson's answer is opacity plus blame on the tool, not a general failure to articulate work. If opacity is the mechanism, extraction names what changed but not why, so the think-aloud follow-up asks what the page leaves unexplained.

Maddila et al. (2023) built and trialled Nudge, which flags a pull request (one batch of proposed code changes awaiting review) when it goes quiet too long. It is the closest work to absence detection (reporting what has stopped moving); what I learnt is how it avoids false alarms. Nudge predicts when a pull request should have finished, then stays silent while comments, pushed commits or state changes continue within the last 24 hours. Before that check existed, 86 of 119 alerts that developers rejected had fired despite recent activity on the pull request. Three limits bound my claim: every signal comes from the pull-request environment, dependencies between items go unhandled, and each verdict stays inside its own pull request. Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.

All six show the same seam: the record is thinner than the work. Dourish and Bellotti predict that passive extraction repairs it; Whitson predicts extraction says what changed but not why; Stray et al. (2016), who studied 12 teams' daily stand-ups, warn that a stand-up-turned-status-report serves the manager, not the team. Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289); postmortems record outcomes, not the reporting behind them, so the seam must be found in artefacts, not in what teams say. The project bets on the structural mechanism; if readers can say what changed but not why, opacity wins. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it.

## Project Proposal

### Learning Goals

These capabilities span understand to create (Anderson & Krathwohl, 2001). After completing this unit, I want to be able to:

**Understand:** explain three competing mechanisms for why a shared production artefact under-reports. *Measure:* unaided, state each mechanism, its source and a breakdown it predicts.

**Apply → Analyse:** run heuristic evaluation, where an expert checks a tool against a published list of usability rules and records each violation, then reconcile them against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.

**Evaluate:** judge whether a team's artefacts can serve a producer's information need, or whether a person must. *Measure:* every need classified against a named artefact, with three rejected alternatives.

**Create:** build a Unity Editor tool over the serialised asset layer and design its report for a reader who never opens the codebase. *Measure:* the committed (minimum) tier ships, naming 60% of changed prefabs and scenes, and each layout decision in the report is tied to a named reader need, with two defended against a rejected alternative.

I was the producer on my COMP3151 team and aim for producer or technical-producer roles. In those roles, writing the weekly status that non-technical stakeholders act on is daily work; Deliverable 1's job-ad scan will show how often advertisements list it.

### Scoping Evidence

Two sub-questions structure the evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer? It is answered by desk classification: each need in the Deliverable 1 specification is marked derivable, partly derivable or not against a named artefact, with the think-aloud follow-up supplying disagreements. Sub-question 2: does the asset layer improve a reader's comprehension of the week?

ChangeLens is a Unity Editor package (Unity 6.4) that turns a week of git history into a grouped change report: it reads a git log export, classifies each changed path by extension and sibling .meta file, and shows the counts per category (Figure 2). The prototype classifies files only; the committed tier adds object naming (Figure 3), where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a parser. In the week shown, 23 of 26 changed prefabs and scenes carry an object name in their changed text, so the tier's 60% naming target is conservative.

![Figure 2. ChangeLens docked in the Unity 6.4 Editor on one SS3D week (8–14 February 2021) in which airlocks, lights and a floor sign changed.](figures/fig2-changelens-docked-2021.png "w=14")

![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png "w=14")

Deliverable 1 runs first and produces the list of producer needs the question is asked about: its interviews, reviews and job-ad scan surface and test them, and its heuristic evaluation records what existing tools already answer.

The study is one 45-minute session per participant, after an excluded pilot. Eight student producers each read a baseline report for one team-week and a treatment report for another, with week and order counterbalanced, and answer six matched questions per report; six then think aloud on a stand-up task. Both reports list the week's commits and changed files by category; the treatment adds named scenes and prefabs.

I recruit at the COMP3151 pracs of Weeks 9 and 10, then in my COMP3180 prac; every COMP3151 team has a student producer, and teammates are briefed with a one-page scenario. The target is eight readers, six of whom also think aloud, with a floor of five for each; if fewer are recruited, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance, with verbal consent, the right to stop and de-identified reporting.

The quantitative arm scores the six items against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next. One item per report is unanswerable, so its "the report doesn't tell me" option catches guessing.

The qualitative arm asks what the page leaves a reader needing; the six think-aloud participants then answer a follow-up feeding Sub-question 1. Comments are coded against Ko et al.'s (2007) 21 information types; a quarter is re-coded after a week and agreement is reported.

Before any session, a fidelity check scores every claim in both weeks' reports as supported, unsupported or contradicted against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not file counts. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.

I screened five public Unity repositories on asset volume and issue-linking rate (Appendix A). None links issues densely enough to test tracker fusion, so the study reads the asset layer only; both report weeks come from SS3D, an open-source multiplayer station game; the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.

### Deliverables

The 65 hours (50 outside class, 15 in prac) cover Weeks 9–13 plus the break.

| # | Deliverable | Success measure | h | In-prac |
|---|---|---|---|---|
| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics (5 h); 10 job ads and 25 reviews coded (3 h); two 20-minute interviews outside the reader pool (2 h); a spec classifying 25 needs by artefact source (Sub-question 1) (3 h) | 13 | 2 |
| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 16 | 5 |
| 3 | Evaluation protocol and instruments | Six matched ground-truth items per week, rubric, think-aloud script and pilot, before Week 12 | 4 | 1 |
| 4 | Fidelity check | Two team-weeks scored; threshold met before any session; one hour reserved for repair | 3 | 1 |
| 5 | Sessions run and coded | Eight 45-minute sessions plus scheduling and setup (7 h); six think-alouds coded from timestamped notes (7 h) | 14 | 4 |
| 6 | Evaluation report, instruments, data | All six items and both coding arms reported with agreement; claims traceable to appendices | 7 | 1 |
| 7 | Portfolio video | Three to four minutes showing the tool and both conditions; two viewers from outside the unit can each state its purpose and intended reader after one viewing | 4 | 1 |
| 8 | Development diary | A dated entry each week naming a roadblock or breakthrough | 2 | 0 |
| 9 | Reflection report | All four goals evidenced; hour variances explained | 2 | 0 |
| | | **Total** | **65** | **15** |

The build is tiered so the minimum lands first. The committed tier (11 hours) delivers the extractor, the one-page report and baseline, and object naming of prefabs and scenes from the text Unity versions (Figure 3). The stretch tier (3 hours) parses Unity's build report and names failed steps and the three largest asset-size changes. The challenge tier (2 hours) flags work gone quiet on two weeks and stays gated because Maddila et al. (2023) show ungated alerting misfires. An overrun consumes the stretch and challenge hours first.

A live tracker connection is out of scope, since public repositories link issues too sparsely and a team's own tracker is private; so is a language-model prose layer, which could not pass the fidelity check. The biggest risk is hand-authoring ground truth, because the corpus's commits say only "Fixed bugs"; an unscorable week is replaced and a contradicted claim repaired. Instruments land in Week 10, check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.

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

Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and verified every source; five AI-introduced errors were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission as GENAI-EVIDENCE.md, which names the five errors.

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

**Corpus screen (17 September 2026, corpus.py).** Thresholds: at least one megabyte of versioned non-code assets, and at least 30 genuine issue references per 100 commits, where a genuine reference cites an issue other than the squash-merged pull request's own number. Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0. Code share of changed-file entries with .meta files excluded from both numerator and denominator: SS3D 33%, open-brush 40%, VRTK 57%, jynew 12%, Unity Experiment Framework 23% (against 17.5%, 23.6%, 36.4%, 7.4% and 19.2% with .meta counted as non-code).
