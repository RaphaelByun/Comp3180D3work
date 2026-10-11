%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts
%SUBTITLE: COMP3180 RESEARCH PROPOSAL
%NAME: Raphael Byun
%ID: [STUDENT ID]
%CATEGORY: Developer / production tools
%HEADER: COMP3180 Research Proposal — Raphael Byun

<!--BODY-START-->

## Introduction

Each week a game producer needs to know what changed. A producer plans and tracks the team's work without writing code. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page report of what changed, grouped as code, art, audio or scene content, for someone who never opens the codebase. The project delivers that tool plus an evaluation in which eight student producers read two versions of the report; the evaluation isolates the Unity asset layer.

A two-day refactor can leave no ticket while a three-line tweak looks like a day's work, and today a technical lead translates by hand. Games are harder, because most of what changes in a game project is not code (Pascarella et al., 2018), so code alone misses most of what changed. The proposal therefore asks:

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

No publicly documented tool fuses tracker, repository and engine signals for a non-technical producer (sweep in Appendix A; studio-internal tools are not observable). Existing tools each cover one part: tracker-and-repository summarisers stop at engineers (ZeroStandup, n.d.; Linear, 2026), game-native trackers rely on manual entry (HacknPlan, n.d.), and repository narrators address developers (Perforce Software, n.d.); Appendix A compares them. None reads the Unity asset layer (scenes, prefabs and .meta files Unity already versions) to name what changed.

## Literature Review

Why is a team's shared record thinner than the work it describes? These six sources give three competing answers, compared at the end.

Bertram et al. (2010) interviewed and surveyed 15 people across four small, collocated software teams about their issue tracker. Bugs go unfiled because the record fails at the point of entry. One participant said, "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296). Team B, a product development team within a large gaming company (p. 293), wrote a simplified filing interface before non-experts would file at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report. It is why my evaluation scores each report against what the team's history shows, not against its tickets.

Ko et al. (2007) watched 17 developers at a large software company and surveyed 42 more. One finding fixed my unit of analysis: what a developer needs to know breaks into 21 information types across seven kinds of work. "What code caused this program state?" (p. 348) was the most often unsatisfied, failing in 61% of cases (p. 351). Its sources were the debugger and logs, not a colleague, so the obstacle is the tool. Those 21 types let me answer the research question need by need and give my think-aloud sessions (a participant says what they are thinking while working) their coding frame.

Pascarella et al. (2018) mined 30 open-source game projects and 30 non-game systems, comparing which files each changed. The file mix is the contrast: non-game projects have, on average, 80% of files in the Development category, game projects only 30%. In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games they form around code only, so a report that follows code alone is blind to whole ownership groups. No Unity or Unreal project appears in its sample, so I measure the same file mix on Unity repositories myself (Figure 1), and the report categorises by file type rather than by code alone.

![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png "w=14")

Dourish and Bellotti (1992) studied how people stay aware of each other's work in a shared workspace, watching four groups of three designers. Their point is that asking people to report costs the reporter and pays the group, so it under-delivers by design. Recipients get only what the sender judges relevant, delivered when the sender chooses. Against that they set shared feedback collected passively as a by-product of the work itself. That is the case for the tool I propose, which reads artefacts instead of asking people. Their evidence is narrow (four groups, one 90-minute session), so extending it to week-long work is mine to defend.

Whitson (2018) describes 10 weeks of fieldwork with 10 intern developers at a large Canadian game studio, on how game engines and art tools shape work across disciplines. Developers called software voodoo when their input produced unanticipated output whose cause they could not predict. That behaviour was attributed to the software rather than to a teammate, which let the group move on without exposing anyone's lack of expertise. Unity also worked as a boundary object, one tool that art, design, code and production each read differently. The mechanism is narrower than a general failure to articulate work: opacity, plus blame that lands on the tool. If opacity rather than structure is the mechanism, extraction names what changed but not why, so the think-aloud follow-up asks what the page leaves unexplained.

Maddila et al. (2023) built and trialled Nudge, which flags a pull request (one batch of proposed code changes awaiting review) when it goes quiet too long. It is the closest work to absence detection (reporting what has stopped moving); what I learnt is how it avoids false alarms. Nudge predicts when a pull request should have finished, then checks the last 24 hours for comments, pushed commits and state changes, staying silent while those continue. Without it, 86 of 119 negatively resolved notifications ignored recent activity. Three limits bound my novelty claim: every signal comes from the pull-request environment, dependencies between items go unhandled, and each verdict reaches only its own pull request, never composed across items. Nudge sets the bar for my hardest costed feature, flagging work gone quiet: it must compose across items and read asset activity, or it adds nothing.

All six show the same seam: the record is thinner than the work. Why it fails is contested. Dourish and Bellotti make it structural, predicting passive extraction repairs it. Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why. Stray et al. (2016), studying daily stand-ups, add audience mismatch: a stand-up-turned-status-report serves the manager, not the team. Washburn et al. (2016) found no communication category among 155 game postmortems (pp. 280–289); postmortems record outcomes rather than the reporting behind them, so the seam may be real but unnamed, and the study must find it in artefacts, not in what teams say. The project bets on the structural mechanism; if readers can say what changed but not why, opacity wins. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it.

## Project Proposal

### Learning Goals

These capabilities span understand to create (Anderson & Krathwohl, 2001). After completing this unit, I want to be able to:

**Understand:** explain three competing mechanisms for why a shared production artefact under-reports. *Measure:* unaided, state each mechanism, its source and a breakdown it predicts, and assign five held-out breakdowns from my notes.

**Apply → Analyse:** run heuristic evaluation, where an expert checks a tool against a published list of usability rules and records each violation, then reconcile them against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.

**Evaluate:** judge whether a team's artefacts can serve a producer's information need, or whether a person must. *Measure:* every need classified against a named artefact, with three rejected alternatives.

**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* for each layout decision in the report, I can name the reader need it serves and defend two of them against a named alternative I rejected.

I was the producer on my COMP3151 team and aim for producer or technical-producer roles. In those roles, telling people who never open the repository what its artefacts show is daily work; Deliverable 1's job-ad scan tests whether advertisements ask for it.

### Scoping Evidence

The primary research question is the one quoted in the Introduction; two sub-questions structure its evaluation. Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? Sub-question 2: does the asset layer improve a reader's comprehension, and does confidence track accuracy?

ChangeLens is a Unity Editor package (Unity 6.4) turning a week of git history into a grouped change report: one window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2). The prototype classifies files only; the committed tier adds object naming (Figure 3), where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a hand-written parser. Over full histories, code is 7–36% of changed-file entries (Figure 1); one week can run higher, as the reorganisation week in Figure 2 shows at 41.9%, so the report is built per week.

![Figure 2. ChangeLens running inside Unity 6.4 on one week of SS3D history (a code-heavy reorganisation week).](figures/fig1-changelens-window.png "w=14")

![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png "w=15")

Deliverable 1 runs first and surfaces the needs (heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews); its specification is what the Evaluate goal classifies.

The study is one 45-minute session per participant, after an excluded pilot: eight student producers each read two versions of one week's report and answer six questions, and six of them then think aloud on a stand-up task. Both versions list the week's commits and changed files grouped by category; the treatment adds named scenes and prefabs.

I recruit at the first COMP3151 prac of Week 9, again in Week 10, then in my COMP3180 prac. Every COMP3151 team has a student producer, and teammates are briefed into the role with a one-page scenario. I target eight readers, six of whom also think aloud; the floor is five for each. Below the floor, the think-alouds run first and the quantitative arm is reported descriptively. Participation is voluntary under the unit's general clearance for student studies, with verbal consent and the right to stop at any time; only de-identified data is reported.

The quantitative arm asks whether the asset layer changes what a reader can say about the week. Versions are read in alternating order, and the six items are scored against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next. One item is unanswerable, so its "the report doesn't tell me" option catches guessing. At eight readers, a Wilcoxon signed-rank test detects large effects only.

The qualitative arm asks what the page leaves a reader needing. Six of them think aloud on a stand-up task, then answer a follow-up feeding Sub-question 1. Comments are coded against Ko et al.'s (2007) 21 information types; a second coder codes a quarter and agreement is reported.

Before any session, a fidelity check over two team-weeks scores every claim in a report as supported, unsupported or contradicted against the team's record read by hand (diffs, issue threads and release notes the generator never reads); it can falsify naming and activity claims, not mechanical file counts. It passes when none is contradicted and 90% are supported; a failing week is repaired and re-scored in Week 11.

I screened public Unity repositories on asset volume and issue-linking rate (thresholds in Appendix A). None links issues densely enough to test tracker fusion, so the project scopes to the asset layer and treats tracker fusion as future work; both report versions come from SS3D, an open-source multiplayer station game, and the best-linked repository, the Unity Experiment Framework, serves Sub-question 1.

### Deliverables

The 65 hours (50 outside class, 15 in prac) cover Weeks 9–13 plus the break.

| # | Deliverable | Success measure | h | In-prac |
|---|---|---|---|---|
| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics (5 h); 10 job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's 21 types (3 h) | 13 | 2 |
| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 16 | 5 |
| 3 | Evaluation protocol and instruments | Six ground-truth items, rubric, think-aloud script and pilot, before Week 12 | 4 | 1 |
| 4 | Fidelity check | Two team-weeks scored; threshold met before any session; one hour reserved for repair | 3 | 1 |
| 5 | Sessions run and coded | Eight 45-minute sessions plus scheduling and setup (7 h); six think-alouds coded from timestamped notes (7 h) | 14 | 4 |
| 6 | Evaluation report, instruments, data | All six items and both coding arms reported with agreement; claims traceable to appendix files | 7 | 1 |
| 7 | Portfolio video | Three to four minutes showing the tool and both conditions; a newcomer can state its purpose after one viewing | 4 | 1 |
| 8 | Development diary | A dated entry each week naming a roadblock or breakthrough | 2 | 0 |
| 9 | Reflection report | All four goals evidenced; each hour's variance explained | 2 | 0 |
| | | **Total** | **65** | **15** |

The study is held to 13 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 21 hours split into instruments (4), the fidelity check (3) and sessions (14).

The build is tiered so the minimum lands first. The committed tier (11 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3), naming at least 60% of changed prefabs and scenes with a file-level fallback.

The stretch tier (3 hours) parses Unity's build report for every sampled week and names failed steps and the three largest asset-size changes; if unreached, that section is dropped. The challenge tier (2 hours) flags work gone quiet on two weeks, checked against the fidelity record, and stays gated because Maddila et al. (2023) show ungated alerting misfires. If the committed tier overruns, it consumes the stretch and challenge hours first.

A live tracker connection is out of scope (public repositories link issues too sparsely and a team's own tracker is private), as is a language-model prose layer (generated narration is the commoditised alternative and could not pass the fidelity check). The biggest risk is hand-authoring ground truth, because the corpus's commits say only "Fixed bugs"; an unscorable week is replaced, a contradicted claim repaired. Instruments land in Week 10, check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.

<!--BODY-END-->

## References

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

Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and verified every source; three AI-introduced errors were caught and corrected. Evidence (session records, verification files and scripts) accompanies this submission.

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
| Atlassian Rovo, GitHub Copilot | Tickets; pull requests and diffs | AI sprint summaries; pull-request summaries | Engineering teams | Game-blind; no asset layer |
| McShaffry (2013), GDC talk | Perforce logs, mined by hand | Charts for scheduling | Producers | Manual; never productised |

**Corpus screen (17 September 2026, `corpus.py`).** Thresholds: at least one megabyte of versioned non-code assets, and at least 30 genuine issue references per 100 commits, where a genuine reference cites an issue other than the squash-merged pull request's own number. Five repositories screened; all exceed the asset threshold; genuine linkage peaked at 20 per 100 commits (Unity Experiment Framework), with SS3D at 9 and open-brush, VRTK and jynew at 0.
