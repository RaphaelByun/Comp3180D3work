%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts
%SUBTITLE: COMP3180 RESEARCH PROPOSAL
%NAME: Raphael Byun
%ID: [STUDENT ID]
%CATEGORY: Developer / production tools
%HEADER: COMP3180 Research Proposal — Raphael Byun

<!--BODY-START-->

## Introduction

Each week a game producer needs to know what changed and what it means. ChangeLens is a Unity Editor tool that reads files a team already produces and writes a one-page change report for someone who never opens the codebase.

Tickets and code changes do not match: a two-day refactor can leave no ticket; a three-line tweak looks like a day's work. A technical lead does that translation, inconsistently and expensively. Games are harder: open-source game projects have, on average, only 30% of files in the Development category against 80% for non-game software (Pascarella et al., 2018). Code alone misses most of what changed.

> Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?

No commercial or open-source tool fuses tracker, repository and engine signals for a non-technical producer. ZeroStandup (n.d.) and Linear's (n.d.) project-update agent turn tracker and repository activity into team-readable updates; HacknPlan (n.d.) needs manual entry. Perforce's P4 MCP narrates repository history, including binary assets, for developers (Perforce Software, n.d.), work McShaffry (2013) had producers do by hand. None reads the Unity asset layer (scenes, prefabs and .meta files Unity already versions) to name what changed.

## Literature Review

Six sources answer one question: why does the shared record a team produces under-report what is actually happening? Their answers fall into three camps, compared at the end.

Bertram et al. (2010) interviewed and surveyed fifteen people in four small software teams sharing one room, on how they used their issue tracker. What I learnt is where the record fails: at entry. One participant said "often bugs that are that critical don't even get filed because by the time that you would go to file it, the bug is already resolved" (P05, p. 296). The most urgent work leaves the least trace. Team B, described in the paper as a product development team within a large gaming company, wrote a simplified filing interface before non-experts would file at all (p. 297). That remedy makes reporting easier; I do not take it, because it still asks the under-reporting party to report. The entry sets my premise: the record is incomplete before any tool reads it.

Ko et al. (2007) watched seventeen developers at a large software company and surveyed forty-two more, cataloguing the information they went looking for. The finding that fixed my unit of analysis is this: what a developer needs to know breaks into twenty-one information types across seven kinds of work. "What code caused this program state?" was the most often unsatisfied, failing in 61% of cases. Its usual sources were the debugger and logs rather than a colleague, so the obstacle is the tool. Those twenty-one types let me answer my research question need by need, and give my think-aloud sessions (a participant says aloud what they are thinking while working) their coding frame.

Pascarella et al. (2018) mined thirty open-source game projects and thirty non-game systems, all in C, C++ or Objective-C, comparing which files each changed. The contrast I took from it is the file mix: non-game projects have, on average, 80% of files in the Development category, game projects only 30%. Underneath that sits an ownership mechanism. In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold, where one person made more than three-quarters of a file's changes. In non-games, specialised sub-teams form around code only. A report that follows code alone is therefore blind to whole ownership groups. Games are the hard case for my question. No Unity or Unreal project appears in its sample — my inference from its selection criteria — so I measure the same file mix on Unity repositories myself.

Dourish and Bellotti (1992) studied how people stay aware of each other's work in a shared workspace, watching four groups of three designers. Their point is that asking people to report costs the reporter and pays the group, so it under-delivers by design. The reporter supplies the information at a cost repaid to the group, not to them. Recipients receive only what the sender judges appropriate. And the sender controls delivery, yet cannot predict what is needed or when. Against that they set shared feedback, collected passively as a by-product of the work itself. That is the peer-reviewed ancestry of the aggregation layer I intend to build. Their evidence is narrow: four groups, one 90-minute session, participants in separate locations linked by video and audio. Extending that to week-long work is mine to defend.

Whitson's account of her fieldwork describes ten weeks of ethnographic observation with ten intern developers at a Montreal studio, on how game engines and art tools shape work across disciplines (Whitson, 2018). Developers called a tool's behaviour "voodoo" when their input produced output whose cause they could not predict, so the tool was opaque to its own users. That behaviour was blamed on the tool rather than on a teammate, which let the group move on without exposing anyone's lack of expertise. Underneath both, engines such as Unity worked as boundary objects: one shared tool that art, design, code and production each use and each understand differently. I first called this articulation failure; on Whitson's evidence it is narrower: opacity, plus blame that lands on the tool. It supplies the rival mechanism my synthesis has to adjudicate.

Maddila et al. (2023) built and trialled Nudge, which flags a pull request (one batch of proposed code changes awaiting review) when it goes quiet too long. It is the closest work to absence detection: reporting what has stopped moving. What I learnt is how it avoids false alarms. Nudge predicts when a pull request should have finished, then checks the last twenty-four hours for comments, pushed commits and state changes, staying silent while those continue. Without it, 86 of 119 unwanted notifications ignored recent activity. A trial across 147 Microsoft repositories cut mean pull-request lifetime from 197.2 hours to 77.7. Three limits bound my novelty claim. Every signal comes from the pull-request environment, and dependencies between items go unhandled. Each verdict reaches only that pull request — by design, one notification per pull request, never composed across items.

All six show the same seam: the record is thinner than the work. Why it fails is contested (Table 1). Dourish and Bellotti make it structural, predicting passive extraction repairs it. Whitson makes it opacity plus blame on the tool, predicting extraction says what changed but not why; Stray et al. (2016) add audience mismatch. Washburn et al. (2016), five authors at RIT and Microsoft Research, coded 155 game postmortems into 22 categories, none of them communication (pp. 280–289), evidence the seam may not be where I look. My gap is judging what a team's artefacts can and cannot tell a producer, then building the tool that tests it. The problem is live: 2026 tools summarise tickets and code; none reads the asset layer.

Table 1. The three mechanisms the review compares.

| Mechanism | As its source states it | What it predicts an automated report can repair | What that implies for the method |
|---|---|---|---|
| Structural (Dourish and Bellotti) | Costs the reporter, pays the group | Passive extraction repairs it | Read artefacts, do not ask |
| Opacity and blame on the tool (Whitson) | Output whose cause users cannot predict | What changed, not why | Asking practitioners under-reports |
| Audience mismatch (Stray) | Status reporting serves the manager | Nothing, unless it fits its reader | Measure the reader's understanding |

## Project Proposal

### Learning Goals

These capabilities span understand to create (Anderson & Krathwohl, 2001). After completing this unit, I want to be able to:

**Understand:** explain three competing mechanisms for why a shared production artefact under-reports. *Measure:* unaided, state each mechanism, its source and a breakdown it predicts, and assign five held-out breakdowns from my notes.

**Apply → Analyse:** run heuristic evaluation, where an expert checks a tool against a published list of usability rules and records each violation, then reconcile them against interviews and reviews. *Measure:* four tools coded, one reconciliation naming three disagreements.

**Evaluate:** judge whether a team's artefacts can serve a given producer information need, or whether a person must. *Measure:* every need classified against a named artefact, with three rejected alternatives.

**Create:** design a technical artefact for a reader who never opens the codebase. *Measure:* four of six think-aloud participants answer the assigned status question from the report alone. That is two in three; A1 set three of four on a smaller sample.

Each is a CV line, not a thing I made: judging what a team's artefacts can and cannot tell you, and telling people who never open the repository, is production work. I held that role on my COMP3151 team and aim at producer jobs.

### Scoping Evidence

My primary research question: "Which of a producer's information needs can be answered automatically from the artefacts a team already produces — and which can't?"

Sub-question 1 insures against a null result. Each surfaced need is marked derivable, partly derivable or not derivable from the tracker export, repository history and Unity asset layer: scenes, prefabs, art, audio and .meta files beside every asset. Sub-question 2 asks whether that layer improves comprehension and whether confidence tracks accuracy.

Both conditions share one page template and differ only in the asset layer, measuring that layer alone. A developer runs one Editor command and authors nothing; the producer only reads the page.

Every COMP3151 team has a student producer, and classmates can be briefed into the role in five minutes. I recruit in Weeks 9–10 through the COMP3151 prac; one 45-minute session covers both reads and the think-aloud, after an excluded pilot. I target eight, with a floor of five readers and four think-alouds; below that, think-alouds run first and the quantitative arm is descriptive. Participation is voluntary and de-identified; anyone may stop at any time and their record is destroyed.

The quantitative arm asks whether the asset layer changes what a reader can say about the week. Each participant reads both versions in alternating order, five minutes each. Six items are scored against answers fixed in advance, at Endsley's (1995) three levels: what changed, what it means, what happens next. One item is unanswerable, so its "the report doesn't tell me" option catches guessing. At eight readers, a Wilcoxon signed-rank test detects large effects only.

The qualitative arm asks what the page leaves a reader needing. Six of them think aloud on a stand-up task, then answer a follow-up feeding sub-question 1. Comments are coded against Ko et al.'s (2007) seven categories; a second coder codes a quarter.

Nothing untruthful reaches a participant: over two team-weeks the fidelity check scores each claim supported, unsupported or contradicted against the team's record. It passes when none is contradicted and 90% supported; a failing week is repaired and re-scored in Week 11, before sessions. A multi-cutoff backtest was rejected: a weekly report makes no forecast.

The split corpus costs something: no screened Unity project met both my thresholds for versioned assets and issue linkage. Both conditions come from RE-SS3D/SS3D's history, so the asset-layer contrast is tested on one repository; immersivecognition/unity-experiment-framework serves sub-question 1. Across the five screened repositories code is at most 36% of changed files (Figure 1). Fusing a team's own tracker and repository is out of scope.

![Figure 1. Code-file share of changed files in five open-source Unity repositories.](figures/fig4-code-file-percentage.png "w=14")

ChangeLens-lite is a Unity add-on turning a week of git history into a grouped change report. One Editor window reads a git log export, classifies each changed path by extension and sibling .meta file, and shows per-category counts (Figures 2 and 3). Unity earns its place because the identifiers in that text resolve to asset and script names only through its AssetDatabase, and the build report exists nowhere else.

![Figure 2. ChangeLens-lite showing one week of SS3D history grouped by category.](figures/fig1-changelens-window.png "w=14")

![Figure 3. The ChangeLens package inside the Unity Project window.](figures/fig2-package-in-project.png "w=8")

### Deliverables

The 65 hours cover Weeks 9–13 plus the break: 50 outside class, 15 in prac; earlier work is uncounted.

| # | Deliverable | Success measure | h | In-prac |
|---|---|---|---|---|
| 1 | Production-tool UX study and design spec | Four free-tier tools coded against Nielsen and Molich's (1990) and Nielsen's (1994) heuristics, two hours each; ten job ads and reviews mined in four hours; interviews continued; needs classified; mining cut first | 16 | 3 |
| 2 | ChangeLens Unity Editor package, both conditions | Generated unedited for every sampled team-week; 90% of changed files categorised | 14 | 4 |
| 3 | Evaluation protocol and instruments | Six ground-truth items, rubric, think-aloud script and pilot, before Week 12 | 4 | 1 |
| 4 | Fidelity check | Two team-weeks scored; threshold met before any session | 4 | 1 |
| 5 | Sessions run and coded | Eight participants, two conditions each; six think-alouds coded | 12 | 4 |
| 6 | Evaluation report, instruments, data | Every claim traceable to a numbered data file | 7 | 1 |
| 7 | Portfolio video | Three to four minutes; my contribution named early | 4 | 1 |
| 8 | Development diary | A dated entry each week naming a roadblock or breakthrough | 2 | 0 |
| 9 | Reflection report | All four goals evidenced; each hour variance explained | 2 | 0 |
| | | **Total** | **65** | **15** |

A1 priced study and evaluation at 18 hours each. The study falls to 16, with the tool sample fixed at four and review mining time-boxed. The evaluation's 20 hours split into instruments, check and sessions (4, 4, 12); the 36-hour anchor holds.

The committed tier takes 11 of row 2's 14 hours: the asset-layer extractor, the one-page report and baseline, and object-level naming of prefabs and scenes from YAML names and identifiers. At least 60% must be named, with a file-level fallback (Figure 4).

![Figure 4. A versioned prefab hunk: object names and component identifiers are plain text.](figures/fig3-prefab-yaml-hunk.png)

The stretch tier adds in-engine depth through Unity's build report.

The challenge tier, absence detection (flagging work gone quiet) stays gated, since Maddila et al. (2023) show ungated alerting misfires. The upper tiers share the remaining three hours, consumed first by an over-run.

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

## Appendix A — Statement on Generative AI use

Generative AI (Claude, Anthropic, via Claude Code) was used from July to September 2026 for topic exploration, literature search and citation checking, drafting, mock-marking, the ChangeLens-lite prototype code (from my specification), the corpus script and the figures. I made the design decisions, reviewed and edited every section, ran the tool and checked every source against the verification record, which caught and corrected three AI-introduced errors. Evidence accompanies this submission.

[CONFIRM BEFORE SUBMISSION: which of the six counted sources Raphael has read in full]
