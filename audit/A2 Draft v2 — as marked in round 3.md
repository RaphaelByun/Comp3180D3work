%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts
%SUBTITLE: COMP3180 RESEARCH PROPOSAL
%NAME: Raphael Byun
%ID: [STUDENT ID]
%CATEGORY: Developer / production tools
%HEADER: COMP3180 Research Proposal — Raphael Byun

<!--BODY-START-->

## Introduction

Each week a game producer needs to know what changed and what it means. A producer plans and tracks the team's work without writing code. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase.

A two-day refactor can leave no ticket while a three-line tweak looks like a day's work. Today a technical lead does that translation by hand, inconsistently and expensively. Games are harder: open-source game projects have, on average, only 30% of files in the Development category against 80% for non-game software (Pascarella et al., 2018). Code alone misses most of what changed. The proposal therefore asks:

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

No commercial or open-source tool fuses tracker, repository and engine signals for a non-technical producer. ZeroStandup (n.d.) and Linear's (n.d.) project-update agent turn tracker, repository and document activity into team-readable updates; HacknPlan (n.d.) needs manual entry. Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.); McShaffry (2013) showed producers doing that by hand. None reads the Unity asset layer (scenes, prefabs and .meta files Unity already versions) to name what changed.

## Literature Review

Six sources answer one question: why does the shared record a team produces under-report what is actually happening? They fall into three camps, compared at the end.

Bertram et al. (2010) interviewed and surveyed fifteen people across four small, collocated software teams about their issue tracker. What I learnt is where the record fails: at entry. One participant said "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296). Team B, described in the paper as a product development team within a large gaming company, wrote a simplified filing interface before non-experts would file at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report. The entry sets my premise: the record is incomplete before any tool reads it.

Ko et al. (2007) watched seventeen developers at a large software company and surveyed forty-two more. The finding that fixed my unit of analysis is this: what a developer needs to know breaks into twenty-one information types across seven kinds of work. The question of what code caused a given program state was the most often unsatisfied, failing in 61% of cases. Its usual sources were the debugger and logs rather than a colleague, so the obstacle is the tool. Those twenty-one types let me answer the research question need by need and give my think-aloud sessions (a participant says what they are thinking while working) their coding frame.

Pascarella et al. (2018) mined thirty open-source game projects and thirty non-game systems, all in C, C++ or Objective-C, comparing which files each changed. The contrast I took is the file mix: non-game projects have, on average, 80% of files in the Development category, game projects only 30%. In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold. In non-games, specialised sub-teams form around code only. A report that follows code alone is therefore blind to whole ownership groups. Games are the hard case for my question. No Unity or Unreal project appears in its sample, so I measure the same file mix on Unity repositories myself (Figure 1).

Dourish and Bellotti (1992) studied how people stay aware of each other's work in a shared workspace, watching four groups of three designers. Their point is that asking people to report costs the reporter and pays the group, so it under-delivers by design. Recipients get only what the sender judges relevant, delivered when the sender chooses. Against that they set shared feedback collected passively as a by-product of the work itself, the ancestry of the aggregation layer I intend to build. Their evidence is narrow (four groups, one 90-minute session, participants in separate locations linked by video and audio), so extending it to week-long work is mine to defend.

Whitson (2018) describes her fieldwork: ten weeks of ethnographic observation with ten intern developers at a Montreal studio, on how game engines and art tools shape work across disciplines. Developers called tool behaviour voodoo, the word in the paper's title, when their input produced output whose cause they could not predict, so the tool was opaque to its own users. That behaviour was blamed on the tool rather than on a teammate, which let the group move on without exposing anyone's lack of expertise. Underneath both, engines such as Unity worked as boundary objects: one shared tool that art, design, code and production each use and understand differently. I first called this articulation failure; on Whitson's evidence it is narrower: opacity, plus blame that lands on the tool. It supplies the rival mechanism my synthesis has to adjudicate.

Maddila et al. (2023) built and trialled Nudge, which flags a pull request (one batch of proposed code changes awaiting review) when it goes quiet too long. It is the closest work to absence detection: reporting what has stopped moving. What I learnt is how it avoids false alarms. Nudge predicts when a pull request should have finished, then checks the last twenty-four hours for comments, pushed commits and state changes, staying silent while those continue. Without it, 86 of 119 negatively-resolved notifications ignored recent activity. Three limits bound my novelty claim: every signal comes from the pull-request environment, dependencies between items go unhandled, and each verdict reaches only its own pull request, never composed across items. Nudge sets the bar for my challenge tier: absence detection has to compose across items and read asset activity, or it adds nothing.

All six show the same seam: the record is thinner than the work. Why it fails is contested. Dourish and Bellotti make it structural, predicting passive extraction repairs it. Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why. Stray et al. (2016), from a grounded-theory study of daily stand-ups, add audience mismatch: a stand-up turned status report serves the manager, not the team. Washburn et al. (2016), five authors at RIT and Microsoft Research, coded 155 game postmortems into 22 categories with no communication category (pp. 280–289). Postmortems record outcomes rather than the reporting that produced them, so the seam may be real but unnamed; the study must find it in artefacts, not in what teams say. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it. The problem is live: 2026 tools summarise tickets and code; none reads the asset layer.

## Project Proposal

### Learning Goals

These capabilities span understand to create (Anderson & Krathwohl, 2001). After completing this unit, I want to be able to:

**Understand:** explain three competing mechanisms for why a shared production artefact under-reports. *Measure:* unaided, state each mechanism, its source and a breakdown it predicts, and assign five held-out breakdowns from my notes.

**Apply → Analyse:** run heuristic evaluation, where an expert checks a tool against a published list of usability rules and records each violation, then reconcile them against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.

**Evaluate:** judge whether a team's artefacts can serve a given producer information need, or whether a person must. *Measure:* every need classified against a named artefact, with three rejected alternatives.

**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* at least four think-aloud participants (target six, floor five) answer the assigned status question from the report alone.

Each is a CV line, not a thing I made. I was the producer on my COMP3151 team and aim for producer or technical-producer roles, where judging what a team's artefacts can tell you, and telling people who never open the repository, is daily work; Deliverable 1's job-ad scan tests whether advertisements ask for it.

### Scoping Evidence

My primary research question: "Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?"

Sub-question 1: which surfaced needs can be derived, fully or partly, from the tracker export, the repository history and the Unity asset layer (scenes, prefabs, art, audio and the .meta files beside every asset)? It keeps a result even if the experiment finds no effect. Sub-question 2: does the asset layer improve a reader's comprehension, and does confidence track accuracy?

Both conditions share a one-page template and differ only in the asset layer, so the experiment measures that layer alone. A developer runs one Editor command and authors nothing; the producer only reads the page.

Every COMP3151 team has a student producer, and teammates can be briefed into the role with a one-page scenario. I will ask at the first COMP3151 prac of Week 9, with my COMP3180 prac as a second pool; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight with a floor of five; below that, think-alouds run first and the quantitative arm is descriptive. Participation is voluntary under the unit's general clearance for student studies, with verbal consent and the right to stop at any time; only de-identified data is reported.

The quantitative arm asks whether the asset layer changes what a reader can say about the week. Each participant reads both versions in alternating order and answers six items scored against fixed answers at three levels after Endsley's (1995) model of situation awareness: what changed, what it means, what happens next. One item is unanswerable, so its "the report doesn't tell me" option catches guessing. At eight readers, a Wilcoxon signed-rank test detects large effects only.

The qualitative arm asks what the page leaves a reader needing. Six of them think aloud on a stand-up task, then answer a follow-up feeding sub-question 1. Comments are coded against Ko et al.'s (2007) seven categories; a second coder (a briefed COMP3151 classmate) codes a quarter and agreement is reported.

Before any session, a fidelity check over two team-weeks (one calendar week of one team's history each) scores every claim in a report as supported, unsupported or contradicted against the team's record; it passes when none is contradicted and 90% are supported, and a failing week is repaired and re-scored in Week 11.

No screened Unity project met both my thresholds (one megabyte of versioned non-code assets; thirty genuine issue references per hundred commits), so the corpus is split: both conditions come from RE-SS3D/SS3D's history and immersivecognition/unity-experiment-framework serves sub-question 1. The cost: fused tracker-plus-repository output is never tested, which needs a team's own linked history and is out of scope for 65 hours. Over full histories, code is 7–36% of changed-file entries (Figure 1); one week can run higher, as the reorganisation week in Figure 2 shows at 41.9%, so the report is built per week.

![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png "w=14")

ChangeLens is a Unity Editor package turning a week of git history into a grouped change report: one window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figure 2). The prototype classifies files only; the committed tier adds object naming, where Unity earns its place because the AssetDatabase resolves identifiers to asset and script names without a hand-written parser, and the build report exists nowhere else.

![Figure 2. ChangeLens on one week of SS3D history (a code-heavy reorganisation week).](figures/fig1-changelens-window.png "w=14")


### Deliverables

The 65 hours (50 outside class, 15 in prac) cover Weeks 9–13 plus the break.

| # | Deliverable | Success measure | h | In-prac |
|---|---|---|---|---|
| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics, two hours each; ten job ads and 25 reviews coded; two more interviews; a spec classifying 25 needs | 14 | 2 |
| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 16 | 5 |
| 3 | Evaluation protocol and instruments | Six ground-truth items, rubric, think-aloud script and pilot, before Week 12 | 4 | 1 |
| 4 | Fidelity check | Two team-weeks scored; threshold met before any session | 3 | 1 |
| 5 | Sessions run and coded | Eight 45-minute sessions, two conditions each (6 h); six think-alouds coded from timestamped notes (7 h) | 13 | 4 |
| 6 | Evaluation report, instruments, data | Every claim traceable to a numbered data file | 7 | 1 |
| 7 | Portfolio video | Three to four minutes showing the tool and both conditions; a newcomer can state its purpose after one viewing | 4 | 1 |
| 8 | Development diary | A dated entry each week naming a roadblock or breakthrough | 2 | 0 |
| 9 | Reflection report | All four goals evidenced; each hour variance explained | 2 | 0 |
| | | **Total** | **65** | **15** |

The study is held to 14 hours by fixing the tool sample at four and time-boxing review mining; the evaluation's 20 split into instruments (4), fidelity check (3) and sessions (13).

The build is tiered so the minimum lands first. The committed tier (11 of row 2's 16 hours) delivers the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from the names and identifiers Unity versions as text (Figure 3), naming at least 60% of changed prefabs and scenes with a file-level fallback.

![Figure 3. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png)

The stretch tier (3 hours) parses Unity's build report for every sampled week and names failed steps and the three largest asset-size changes; if unreached, that section is dropped. The challenge tier (2 hours) flags work gone quiet on two weeks, checked against the fidelity record, and stays gated because Maddila et al. (2023) show ungated alerting misfires. A committed-tier overrun consumes those hours first.

Out of scope are a live tracker connection and a language-model prose layer: an AI summary over the repository is the baseline, not the build. The biggest risk is hand-authoring ground truth: the corpus's commits say only "Fixed bugs". Instruments land in Week 10, check and tier freeze in Week 11, sessions in Week 12, analysis and video in Week 13.

<!--BODY-END-->

## References

Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

Bertram, D., Voida, A., Greenberg, S., & Walker, R. (2010). Communication, collaboration, and bugs: The social nature of issue tracking in small, collocated teams. In *Proceedings of the 2010 ACM Conference on Computer Supported Cooperative Work* (pp. 291–300). ACM. https://doi.org/10.1145/1718918.1718972

Dourish, P., & Bellotti, V. (1992). Awareness and coordination in shared workspaces. In *Proceedings of the 1992 ACM Conference on Computer-Supported Cooperative Work* (CSCW '92) (pp. 107–114). ACM. https://doi.org/10.1145/143457.143468

Endsley, M. R. (1995). Toward a theory of situation awareness in dynamic systems. *Human Factors, 37*(1), 32–64. https://doi.org/10.1518/001872095779049543

HacknPlan. (n.d.). *HacknPlan: The project management tool for game developers*. Retrieved September 17, 2026, from https://hacknplan.com/

Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. In *Proceedings of the 29th International Conference on Software Engineering* (ICSE '07) (pp. 344–353). IEEE. https://doi.org/10.1109/ICSE.2007.45

Linear. (n.d.). *Linear AI*. Retrieved September 17, 2026, from https://linear.app/ai

Maddila, C., Upadrasta, S. S., Bansal, C., Nagappan, N., Gousios, G., & van Deursen, A. (2023). Nudge: Accelerating overdue pull requests toward completion. *ACM Transactions on Software Engineering and Methodology, 32*(2), Article 35. https://doi.org/10.1145/3544791

McShaffry, M. (2013, March). *Generating useful, meaningful (and beautiful) project data from Perforce* [Conference presentation]. Game Developers Conference 2013, San Francisco, CA, United States. https://www.gdcvault.com/play/1017697/Generating-Useful-Meaningful-(and-Beautiful)

Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '94) (pp. 152–158). ACM. https://doi.org/10.1145/191666.191729

Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '90) (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281

Pascarella, L., Palomba, F., Di Penta, M., & Bacchelli, A. (2018). How is video game development different from software development in open source? In *Proceedings of the 15th International Conference on Mining Software Repositories* (pp. 392–402). ACM. https://doi.org/10.1145/3196398.3196418

Perforce Software. (n.d.). *AI-driven workflows with P4 MCP*. Retrieved September 17, 2026, from https://www.perforce.com/products/p4/p4-mcp

Stray, V., Sjøberg, D. I. K., & Dybå, T. (2016). The daily stand-up meeting: A grounded theory study. *Journal of Systems and Software, 114*, 101–124. https://doi.org/10.1016/j.jss.2016.01.004

Washburn, M., Jr., Sathiyanarayanan, P., Nagappan, M., Zimmermann, T., & Bird, C. (2016). "What went right and what went wrong": An analysis of 155 postmortems from game development. In *Proceedings of the 38th International Conference on Software Engineering Companion* (ICSE '16 Companion) (pp. 280–289). ACM. https://doi.org/10.1145/2889160.2889253

Whitson, J. R. (2018). Voodoo software and boundary objects in game development: How developers collaborate and conflict with game engines and art tools. *New Media & Society, 20*(7), 2315–2332. https://doi.org/10.1177/1461444817715020

ZeroStandup. (n.d.). *ZeroStandup: AI-powered automated daily standups*. Retrieved September 17, 2026, from https://zerostandup.com/

## Statement on Generative AI use

Generative AI (Claude, Anthropic, via Claude Code) assisted from July to September 2026 with topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and checked every source against the verification record, which caught and corrected three AI-introduced errors. Evidence (session records, verification files and scripts) accompanies this submission.

[CONFIRM BEFORE SUBMISSION: which of the six counted sources Raphael has read in full]
