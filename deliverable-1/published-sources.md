# Published sources — coded in place of the two interviews (DRAFT)

Deliverable 1, "Interviews" part (2 hours in A2). Prepared 14 October 2026 by Claude Code for Raphael to check. Nothing here is committed.

**Status.** Six published accounts were opened and read on 14 October 2026. The coding is a first pass for Raphael to accept, change or reject. One check is still his job: the pages were read through a fetch tool that returns extracts, not the raw page, so every quote below must be matched against the live page before it goes into the spec (see section 7). Section 6 was completed later on 14 October 2026 from the heuristic pass, including the three-point reconciliation in §6.1.

## 1. Method

**Why published sources replaced interviews.** A2 planned two 20-minute interviews. Talking to participants for a university project needs ethics approval under Macquarie's policy before any participant is approached, and Raphael has no time left to get it. On 14 October 2026 he decided to replace the interviews with coded published sources. This is a documented change from the A2 plan. Using public, already-published material about a person's work avoids recruiting participants, so no participant approval is needed. (Update, 17 October 2026: Raphael decided the project needs no ethics application or convenor check, because the unit guide sets no ethics requirement; the interviews stay dropped for time, which is the reason to give in the report.)

**Selection criteria.** First-hand accounts by a producer, production lead or project manager in games (not a vendor's description of a tool); about how progress is tracked or reported, or what the writer needs to know; openable at a URL I actually fetched on 14 October 2026; preferably within the last 10 years; a mix of indie and larger studios; Australian if findable. Searches used the web search tool, Game Developer, GDC Vault listings and tool vendors' blogs.

**Coding.** Each source is coded against the nine questions in `interview-guide.md`, used as the coding frame: Q1 background, Q2 last week, Q3 sources and what they miss, Q4 what you report, Q5 a surprise, Q6 trust, Q7 tools, Q8 triangulation (here replaced by section 6 of this file), Q9 the page. Each code gives a short verbatim quote with a locator, the needs it supports (N01–N25 in `needs-catalogue.md`), the Ko et al. (2007) type where the catalogue links one, and any NEW need.

**Limits.**
- Secondary data. The writers did not answer my questions; I can only code what they happened to write.
- Not tailored. Most sources do not mention the repository or the Unity asset layer, so silence on those needs is not evidence they do not matter.
- Survivorship and self-presentation bias. Postmortems, conference talks and vendor blogs are written by people whose projects shipped, and they show how the writer wants the process to look. Two sources (P2, P1) sit on tool-vendor or tool-fan sites.
- Small and uneven sample. Six sources; two are conference-talk write-ups by journalists; one is a student team. Counts in section 5 show breadth of support, not how common a need is among producers.
- No Australian source was found (see section 7).
- Quotes are as returned by the fetch tool. Ellipses mark cuts.

## 2. Source table

Retrieval date for every row: 14 October 2026.

| ID | Title | Author / speaker | Role | Studio | Date | URL | What I could read |
|---|---|---|---|---|---|---|---|
| P1 | 7 Thoughts on Agile Project Management with Hansoft | Coray Seifert | Director of Production (the article's closing bio) | Experiment 7 (per the closing bio; settled 15 Oct 2026, §7) | 7 April 2017 | https://www.gamedeveloper.com/production/7-thoughts-on-agile-project-management-with-hansoft | Full article, seven numbered sections |
| P2 | Smoothing out production in a multi-project indie studio | Lidia Machuca (HacknPlan blog) with Ewan McKenzie | McKenzie: Producer | Ant Workshop (small indie studio; location not stated) | 5 March 2024 | https://hacknplan.com/blog/smoothing-out-production | Full article, 13 paragraphs. Published on the vendor's own blog, so it is promotion as well as a producer account |
| P3 | Learning the production secrets of Return to Monkey Island | Written by Danielle Riendeau (Game Developer); speaker Jenn Sandercock | Lead Producer | Terrible Toybox | 30 March 2023 (GDC 2023 talk) | https://www.gamedeveloper.com/marketing/learning-the-production-secrets-of-i-return-to-monkey-island | Full article; a journalist's account of the talk. No video or transcript found |
| P4 | How Tiny Tina's Wonderlands' development embraced interdisciplinary cooperation | No byline (Game Developer); speakers Matt Cox and Kayla Belmore | Cox: creative director; Belmore: senior producer | Gearbox | 21 March 2023 (GDC 2023 talk) | https://www.gamedeveloper.com/production/how-i-tiny-tina-s-wonderlands-i-development-fully-embraced-cooperation | Full article; a journalist's account of the talk. No video or transcript found. Names no tools |
| P5 | Octodad: Dadliest Catch Post-Mortem Pt. 2: Production | Kevin Geisler | Programmer who also did production work (his own description) | Young Horses | 5 February 2015 (11 years old, outside the 10-year preference) | https://www.gamedeveloper.com/business/octodad-dadliest-catch-post-mortem-pt-2-production | Full article, by section heading |
| P6 | Producer Devlog 3 (KickBack) | Angeleen Arellano | Producer, student game team | CAGD (KickBack); the page does not name a school | 16 October 2025 (UTC; from the page's published timestamp, §7) | https://cagd.itch.io/kickback/devlog/1086319/producer-devlog-3 | Full post. Student project, not a professional studio; included because it is a producer using Jira and is close to Raphael's own COMP3151 setting |

**Read but not coded** (not first-hand producer accounts, or too far from the questions):
- PixelTail Games, "How To Track Development of Tower Unite!" (https://forums.pixeltailgames.com/t/how-to-track-development-of-tower-unite/12894, 17 August 2016): a developer explaining a public Trello roadmap and Monday developer logs. Not a producer, and about public communication.
- Katie Chironis, "Motivating Your Indie Team - Pt. 1" (https://www.gamedeveloper.com/production/motivating-your-indie-team-pt-1, 17 November 2014): Trello board for Elsinore; written by a designer, over 10 years old.
- Ryan Darcey, "Designing a Production Process: An Addendum" (https://www.gamedeveloper.com/production/designing-a-production-process-an-addendum, 11 January 2019): a solo developer's view of Jira.
- GDC Vault, "Production Traps: How Producers and Leaders Get Stuck", Benjamin Carcich, GDC 2025 (https://gdcvault.com/play/1035520/Production-Traps-How-Producers-and): only the overview was visible behind a login-limit notice; no transcript.

## 3. Coding table, per source

**Reviewed 15 October 2026 (README step 7): AI-drafted, Raphael to accept or change.** Claude Code reviewed every row against the need definitions in needs-catalogue.md §3, recoded five rows (listed after the tables) and applied the live-page corrections from §7. Locators are section headings where the article has them; paragraph numbers were dropped because the fetch tool's counts differed between passes (§7). Need IDs follow the 15 October catalogue: NEW-1 is now N26, NEW-2 is N27, NEW-3 is folded into N14.

Ko types are those the catalogue links to the need (needs-catalogue.md §1, after its 15 October check). "none" means the catalogue links no Ko type.

### P1. Seifert, Experiment 7 (Game Developer blog, 2017)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q3 / Q6 | "Burndowns require honest daily estimate updates to create accurate velocity reports." (section 1) | N17, N09 | b2 | NEW-1 (N26) |
| Q2 | "task estimates were incrementally updated every day with 100% consistency" (section 2) | N17 | b2 | NEW-1 (N26) |
| Q4 / Q9 | "Hansoft Dashboards become a great place to communicate project status, risk and opportunity" (section 3); audience "both to key stakeholders and to the team itself" | N09, N08, N25 | none | |
| Q7 | "The more you can pull data out of Hansoft and bring it into your staff and status meetings, the better." (section 4). Paraphrase of the same section: not everyone will dig through the menus | N25 | none | |

Not covered: Q1, Q5.

### P2. McKenzie, Ant Workshop (HacknPlan blog, 2024)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q3 / Q6 | "making sure the team provides accurate time logs"; "Time logs are vital to our production process" | N17 | b2 | NEW-1 (N26) |
| Q4 | "It means we can start any work-for-hire with a schedule and work plan we have confidence in." | N09, N17 | b2 | |
| Q4 | producers can "figure out if a project or task is slipping behind schedule for whatever reason" | N09, N19 | none | |
| Q5 | "no two projects are the same so even something as common as an achievement handler can throw up the occasional surprise" | N17 | b2 | |
| Q3 | contingency covers "time that is on the company clock but is not likely to be spent directly doing development work"; "Booked holidays are easy to put into a schedule" | N27 | none | NEW-2 (N27) |
| Q7 | HacknPlan is "the communication tool between the developer and production in some respects" | N02 | a2 | |
| Q2 | "An automated Slack application posts reminders every day at 09:30" (reminders to log time) | N26 | none | NEW-1 (N26) |
| Q4 | Internal projects use "one-month-long milestones" of "roughly a solid week’s worth of work for each developer" | N09 | none | |

Not covered: Q1, Q8, Q9.

### P3. Sandercock, Terrible Toybox (Game Developer, 2023)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q4 | "every three stages would equal a milestone" | N09 | none | |
| Q4 | team estimated "task person-hours" using t-shirt sizes (paraphrase; the extract gave no direct quote) | N17 | b2 | |
| Q2 | a "check out" system for people to list finished tasks at the end of the day (quoted term only; rest paraphrase) | N03, N02 | a2 | |
| Q4 / Q9 | "We started with a gray box or thumbnail version of the entire game that was fully playable just three months after we started pre-production" | N09, N14 | s1 | NEW-3 (N14) |
| Q9 | "We had links to information in notion about like, the overall vision of the project." | none (the game's vision, not a weekly need; nearest is Ko d2 in its original sense) | — | |
| Q3 | meetings of "six or less people" | none (meeting size only) | — | |

Not covered: Q1, Q5, Q6, Q8. The article names Notion only; no Jira, Trello or spreadsheet.

### P4. Cox and Belmore, Gearbox (Game Developer, no byline, 21 March 2023)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q4 / Q9 | "We want all the teams to be very aware of the challenges every moment of every milestone." (Cox) | N01, N08 | a2 | |
| Q3 | Belmore described a designer who "understood the pipelines that would be impacted by those changes" | N11 | d4 | |
| Q5 | "No plan survives first contact" (Belmore) | N24 | none | |
| Q4 | "For any leader: you have to say the words, you have to say that the limitations are there." | N24, N08 | none | |

Not covered: Q1, Q2, Q6, Q7. The article names no tools. Useful only for the point that a producer wants every discipline to see the milestone's problems.

### P5. Geisler, Young Horses (Octodad postmortem, 2015)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q2 / Q3 | team began with "individual PowerPoints and task cards on a corkboard", then moved to "a free service called Trello" (Weekly Task Management) | N03 | a2 | |
| Q3 | Trello lists: "Bugs", "Playtest Feedback", "Ideas/Water Cooler", "To Do", "Doing", "Done/Committed" (Weekly Task Management) | N15, N18, N03 | b1, r1, a2 | |
| Q6 / Q7 | avoided Bugzilla-style tools because "team members would often not keep up with using software like Bugzilla" (Weekly Task Management) | N26 | none | NEW-1 (N26) |
| Q4 | A Sunday review meeting, "keeping everyone clued into what was going on with the project" (Weekly Task Management) | N03, N23 | a2 | |
| Q4 | Each quarter the team reviewed "the hours and work for each team member" (Quarterly Reviews) | N02, N20, N27 | a2 | NEW-2 (N27) |
| Q3 | the team worked closer to 20 hours a week because most had other jobs (Living With No Money; paraphrase) | N27 | none | NEW-2 (N27) |
| Q5 | "probably spent a bit too much time on the tutorial before moving on to other levels" (Production Timeline) | N20 | none | |
| Q5 | Some levels "required too many iterations from scratch" (Production Timeline) | N20, N17 | b2 | |
| Q5 | Deciding "when to fix game-breaking bugs vs bugs and glitches that speedrunners enjoyed using" (Involvement with Community) | N16 | b3 | |

Not covered: Q1, Q8, Q9.

### P6. Arellano, KickBack (student producer, 16 October 2025)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q2 | "I pop into Jira and check my team's work." (daily routine section; full sentence begins "at the start of every day") | N03, N02 | a2 | |
| Q6 | work marked "to be verified" is reviewed first, and anything that does not meet the goal is sent back (paraphrase, daily routine) | N03, N26 | a2 | NEW-1 (N26) |
| Q3 / Q5 | The Blocked column is "an immediate red flag" | N07 | none (Ko §4) | |
| Q4 | "updating burndown charts at the end of every sprint to track our sprint progress and overall goal" | N17, N09 | b2 | |
| Q2 / Q4 | A mandatory team meeting "every Saturday at 1:30 PM" where everyone gives a progress check-in | N02, N03 | a2 | |
| Q3 | follows up with anyone falling behind (paraphrase) | N19 | none | |
| Q5 | Playtesting was too thin in Sprints 1 to 3; problems were found by the team and by outside playtesters (paraphrase) | N15, N18 | b1, r1 | |

Not covered: Q1, Q8, Q9.

**Recodes on 15 October 2026 (AI-drafted, Raphael to accept or change).**

| Row | Was | Now | Reason |
|---|---|---|---|
| P2 Q3 contingency | N04 (partly), s3, NEW-2 | N27 only | N04 is commits with no ticket. Time on the clock that is not development work is capacity, not untracked work. |
| P2 Q2 Slack reminders | N02, a2 | N26 | The reminders are to log time, so they serve the tracker's freshness, not awareness of what teammates did. P2 still supports N02 through its Q7 row. |
| P3 Q9 Notion vision | N23, d2 | none | The overall vision of the game is not next week's work. It matches Ko d2 in its original sense, which no weekly need adapts. |
| P3 Q3 meeting size | N01 (paraphrase), a2 | none | The verifiable text says only "six or less people"; the link to disciplines rested on an unverified paraphrase. |
| P3 Q4/Q9 gray box | N09, NEW-3 | N09, N14 | NEW-3 is folded into N14. Quote completed from the live page (§7, item 3). |
| P1 Q4/Q9, Q7 | a3 | none | The catalogue no longer links a3 to N25 (needs-catalogue.md §1, note 3). |
| P6 Blocked | c3 | none (Ko §4) | The catalogue no longer links c3 to N07 (needs-catalogue.md §1, note 2). |

Also applied from §7: P5 Sunday-meeting quote replaced with the page wording; P5 "about 20 hours" changed to "closer to 20 hours" (paraphrase); P1 placed at Experiment 7 per the article's closing bio; P4 cited by its speakers (no byline); P6 dated 16 October 2025 (UTC).

## 4. NEW needs (not in the catalogue)

| Label | Need, as a producer's question | Sources | Closest existing need | Comment |
|---|---|---|---|---|
| NEW-1 | How fresh and honest is what the tracker says? (Has anyone updated these estimates and statuses, or is the board stale?) | P1, P2, P5, P6 | N19 (gone quiet), N03 | Four sources say the tracker is only as good as people's daily updating, and describe workarounds: daily stand-up updating (P1), time-log reminders (P2), dropping a tool nobody kept up (P5), a "to be verified" step (P6). It is a trust and staleness need, not a gone-quiet need. Candidate for the catalogue |
| NEW-2 | Who is available, and how many hours does the team really have? (Capacity, absences, hours logged against estimate) | P2, P5 | N17 (work left), N20 (effort) | Producers plan from hours and holidays, not only task counts. Not derivable from repository history, which shows output, not time on the clock |
| NEW-3 | Is there a playable build that shows where the game is now? | P3 | N14 (build succeeded) | One source only; N14 is about build success, this is about showing progress by playing. Weak on its own; keep as a note unless the heuristic pass or tool inspection supports it |

## 5. Needs-evidence tally (sources supporting each need, of 6)

**Recounted 15 October 2026 after the §3 recodes. AI-drafted, Raphael to accept or change.** A source counts once per need, whether it appears in one or several rows. Need IDs as in the 15 October catalogue.

| Need | Count | Sources | Points under the cap |
|---|---|---|---|
| N17 How much work is left, and how hard | 5 | P1, P2, P3, P5, P6 | 2 |
| N09 Is the milestone on track | 4 | P1, P2, P3, P6 | 2 |
| N26 Can I trust the tracker (was NEW-1) | 4 | P1, P2, P5, P6 | 2 |
| N02 What each teammate has been working on | 4 | P2, P3, P5, P6 | 2 |
| N03 Which planned tasks were finished | 3 | P3, P5, P6 | 2 |
| N08 Emerging risks | 2 | P1, P4 | 2 |
| N15 Bugs fixed or opened | 2 | P5, P6 | 2 |
| N18 What a problem looks like to the player | 2 | P5, P6 | 2 |
| N19 Gone quiet | 2 | P2, P6 | 2 |
| N27 Capacity and hours (was NEW-2) | 2 | P2, P5 | 2 |
| N01 Each discipline's changes | 1 | P4 | 1 |
| N07 Blocked, on whom | 1 | P6 | 1 |
| N11 What does a change affect | 1 | P4 | 1 |
| N14 Working build (NEW-3 folded in) | 1 | P3 | 1 |
| N16 Bugs that must be fixed | 1 | P5 | 1 |
| N20 Where work concentrated | 1 | P5 | 1 |
| N23 Next week's work | 1 | P5 | 1 |
| N24 Scope changed | 1 | P4 | 1 |
| N25 What can I tell others | 1 | P1 | 1 |
| N04, N05, N10, N12, N21, N22 | 0 | none | 0 |

Changes from the 14 October tally: N04 1 → 0 and N01 2 → 1 and N23 2 → 1 (recodes in §3); NEW-3 is counted under N14.

**Weighting rule for this stream (README step 7; AI-drafted, Raphael to accept or change).** In the top-ten rule (needs-catalogue.md §5), a published source counts in place of an interviewee, **capped at 2 points per need**. A2 gave the interviews at most 2 points per need, one per interviewee. Six secondary sources uncapped could give a need up to 6 points, more than the heuristic pass can give (0–4), and the pass is the only stream that observed the tools directly. The sources are also weaker than interviews would have been: written for other purposes, not answering my questions, self-selected accounts of shipped projects, two of them journalists' reports of talks. A cap of 2 keeps the stream at the weight A2 planned for the interviews it replaces, while still separating a need raised by two or more sources from one raised by a single source. Checked after counting: the cap changes only tenth place in the ranking (N12 with the cap, N02 without).

**Reading the tally.**
- Most support: N17 (5 of 6), then N09, N02 and N26 (4 each), then N03 (3). Producers describe their week through estimates, burndowns, time logs and meetings.
- Needs that are tracker- or person-sourced dominate. Needs the repository or the Unity asset layer would answer best (N05, N12, N21, N22) get no support at all. That is partly a limit of the method (writers do not describe files), but it should be said plainly in the spec and not hidden: producer writing does not ask for what ChangeLens derives best.
- N01 (changes by discipline) has one indirect source (P4), about every team seeing the milestone's challenges, with no tool.

## 6. What producers say vs what tool inspection usually shows

Up to five candidate disagreements for the reconciliation. The first two columns were written before the heuristic pass, as hypotheses: "Tool inspection usually shows" is general knowledge of these tools and the review quotes in job-ads-and-reviews.md, not something observed. The right-hand column was filled on 14 October 2026 from the heuristic pass (heuristic-coding-sheet.md §5), which Claude ran through the browser on Raphael's accounts; its IDs (TR-, HP-, JI-, GP-) point to rows in that sheet. Jira was seen on a Standard trial, not Free, and Trello on an automatic Premium trial.

| # | Producers say (source) | Tool inspection usually shows (to check) | Heuristic-pass finding |
|---|---|---|---|
| D1 | They plan from estimates and burndowns and want a "velocity" figure (P1, P6, P2 for time logs) | Free tiers of Trello and GitHub Projects have no native burndown or time logging; review V1 in job-ads-and-reviews.md says Trello "native reporting and analytics are fairly basic out of the box". HacknPlan and Jira Free have more | Partly the reverse of the expectation. GitHub's free plan has a burn-up chart in Insights (T3). HacknPlan's free plan gives per-discipline counts in Metrics and a "Log work" prompt on completion, but Burndown and Metrics Export are Premium (HP-27). Trello's free features give no summary; views are Premium (TR-13). Jira's Summary gave "8 completed in the last 7 days", but on a Standard trial. In all four the T3 update was written by hand. Estimates were not entered in the seed, so velocity itself was not tested. |
| D2 | The board is only useful if people keep it current, and producers add checks (daily stand-up updating, "to be verified", dropping tools nobody updates) (P1, P5, P6) | Boards show state but rarely show how old a status is or who has not touched a card in days (visibility of system status, H1) | Supported for HacknPlan and Trello: no completion date on cards (HP-24, TR-14); HacknPlan has no activity feed on free (HP-26); Trello's feed hides label edits (TR-16). GitHub and Jira show dates (Closed field, resolution dates, "12 updated"). New point: in GitHub, commits with "Closes #n" closed the issues and moved them to Done with no one touching the board, but only because each commit message cited the issue (GP-10). |
| D3 | "Blocked" is an immediate red flag and the first thing checked (P6) | Trello has no built-in Blocked status (a label or list by convention); Jira and HacknPlan have flags or statuses. Whether a producer can see all blocked items on one screen needs checking | Contradicts the expectation. Trello: a custom Blocked list took 5 s and T4 took about 10 s. Jira: the flag turns the card yellow with a red flag, T4 about 10 s. HacknPlan free: no blocked state; Dependencies and custom stages are Premium; the blocked card was found only because "blocked" was typed into its title (HP-25). GitHub: "Blocked by" is free but shows as a tiny red dot on the board (GP-09). |
| D4 | Capacity is hours and holidays, not card counts (P2, P5) | Few of the four tools show who is away or hours logged against estimate in the main view | Not tested. No task in T1 to T7 asked about capacity, and no hours or absences were seeded. Only side observations: HacknPlan logs hours on completion (0 h logged in Metrics) and puts Timetable and Calendar behind Premium; Trello's Calendar view is Premium. |
| D5 | Every discipline should see the milestone's problems (P4, P3) | Boards are organised by status and person, not by discipline; a weekly view by discipline needs tags somebody must apply (links to N01) | Supported, with one exception. T1 ("what art changed") was only partly done in all four tools: each returned art-tagged tasks, never the art files that changed. Discipline was visible only where someone had tagged it, and Trello's colour-bar labels hide it (TR-07). HacknPlan is the exception: discipline categories are built in and its Metrics gave per-discipline counts on free. |

### 6.1 Reconciliation: three places where inspection and the published sources disagree

**Reviewed and tightened 15 October 2026 (README step 8). AI-drafted, Raphael to accept or change.** A2's Apply and Analyse measure asks for "one reconciliation naming three places where inspection and interviews disagree". The interviews were dropped on 14 October 2026 (section 1), so this reconciliation sets the heuristic pass against the six coded published sources instead. That substitution must be stated wherever the measure is reported. The pass had one evaluator, an AI agent, on the plans described in heuristic-coding-sheet.md (Trello on an automatic Premium trial, Jira on a Standard trial; tool-selection.md lists what each Free plan lacks). HP-25, HP-24 and HP-27 are severity 3 and still need Raphael's hand check; no point below rests on a finding marked provisional.

D4 is left out because the pass did not test it, and D5 because the pass agrees with the sources. That leaves three real disagreements: D3, D2 and D1.

| # | What the sources say | What inspection found | Kind of disagreement | Likely explanation | Consequence for the ChangeLens page |
|---|---|---|---|---|---|
| 1 | Blocked work is "an immediate red flag" and the first thing checked (P6, Jira) | Seen in about 10 s in Jira (flag) and Trello (custom list); not at all as a state in HacknPlan free (HP-25, T4 partly); a tiny red dot in GitHub (GP-09, T4 partly) | The source treats as routine a signal that two of four free set-ups do not give at a glance | P6's habit is true of the tool P6 uses; it depends on the tool and a team convention, not on being "built for games" | ChangeLens cannot see blocked work (N07, R = N); it must say so (RS8), not imply silence means nothing is blocked |
| 2 | The tracker is only as good as people's daily updating; producers add human checks (P1, P2, P5, P6) | In GitHub, eight "Closes #n" commits closed their issues and moved them to Done with nobody touching the board (T5, about 30 s); but HacknPlan and Trello cards show no completion date, so a stale board cannot even be spotted (HP-24, TR-14) | Inspection found a mechanism the sources do not mention, and a gap they do not name | Commit-linked closing lowers the cost of freshness, but only when commits cite issues. The evaluator wrote every test commit to cite one (GP-10); real teams rarely do (UXF 20 of 100 commits; Inkform 0 of 126, A2 Appendix A) | The repository is an independent record a stale board can be checked against (N26); the page should report activity the tracker cannot vouch for, not trust the board |
| 3 | Dashboards "become a great place to communicate project status, risk and opportunity" (P1, Hansoft); a schedule "we have confidence in" from time logs (P2) | On the plans seen, no tool produced a status update without hand-writing (T3: partly in Trello, HacknPlan and GitHub; Jira's Summary closest, on a paid trial). Sharing with someone who has no account was partial in three tools and impossible in HacknPlan free (T7, HP-27). GitHub free has a burn-up chart; HacknPlan keeps burndown behind a paid tier. Plan check (tool-selection.md, 15 Oct 2026): Trello's CSV export is Premium, so Free exports JSON only; Jira Free's Summary tab is unverified | The sources describe a report the tracker gives; inspection found the producer still writes it | The sources' studios had paid or configured tools (Hansoft, HacknPlan with time logs); a small team on free plans gets counts and charts at best. P6, on a student team, agrees with inspection: she updates burndowns herself | The page should give facts a producer can paste, in words a publisher reads (N25), and be shareable as a file (the prototype's markdown export) |

In words:

1. **Blocked work.** P6 treats a Blocked column as the first thing checked. Inspection shows that how quickly a producer sees it depends on the plan and on a team convention, not on whether the tool is built for games: the game-specific HacknPlan had no blocked state on its free plan, and the card was found only because its title said so (HP-25); GitHub records "Blocked by" for free but shows it on the board as a tiny red dot (GP-09); generic Trello did it in about 10 seconds with a list made in 5. P6 is right about Jira, where the flag took 10 seconds. The disagreement is with the general habit, not with P6's tool.

2. **Keeping the tracker current.** Four sources describe human workarounds for a stale tracker: daily estimate updates (P1), time-log reminders (P2), dropping a tool nobody kept up (P5), a "to be verified" step (P6). Inspection partly disagrees: in GitHub, commits that cite an issue close it and move the card without anyone touching the board, and each issue records the closing commit. The limit is strong: the evaluator wrote all eight test commits to cite their issues, and real teams rarely do (20 of 100 commits in UXF, 0 of 126 in Raphael's own COMP3150 team). And on HacknPlan and Trello cards there is no completion date, so a stale board cannot be spotted at all. The sources describe the human cost of freshness; inspection shows that cost falls only where commits and tasks are linked.

3. **The tracker as the source of the weekly report.** P1 says dashboards communicate status, risk and opportunity; P2 plans with confidence from time logs. On the free plans seen, every T3 update had to be written by hand, and sharing outside the tool was partial or impossible. The expectation written before the pass was also wrong in its details: GitHub's free plan has a burn-up chart, while the game-specific HacknPlan keeps its burndown behind Premium. The plan check of 15 October makes the point stronger, not weaker: Trello Free has no CSV export (the pass saw one on a Premium trial), HacknPlan's GitHub integration, dependency editing, custom columns, burndown and metrics export are all paid, and Jira Free's Summary tab is unverified (the pass saw it on a Standard trial). The sources describe paid or configured trackers; a small team on free plans still composes the report. P6, the student producer, agrees with inspection rather than with P1.

Agreement worth stating in the spec, not counted as a disagreement: D5. The sources want discipline-level awareness, and the pass found it only where someone had tagged the work; no tool linked a task to the files it changed except GitHub, through commit messages.

**What changed from the 14 October draft.** Each point now names the kind of disagreement and its consequence for the page (as design-spec-outline.md §5 asks). Point 1 now says P6's own tool (Jira) agrees with P6, so the disagreement is with the habit, not the source. Point 2 adds that the GitHub result came from commits the evaluator wrote to cite issues, and adds Inkform's 0 of 126 from A2. Point 3 drops P6 as support for the sources' side, because P6 updates burndowns by hand, which agrees with inspection; P2 replaces it. The severity 3 findings the points rest on are named, so Raphael knows which to hand-check first.

## 7. What could not be verified, and what is missing

- **Live-page check done, 15 October 2026.** All six URLs were opened. The fetch tool returns extracts, not raw HTML (I also pulled the raw HTML for P1, P4 and P6 with curl), so the check is a match against page text. Result: every quoted item matches the live page verbatim except two P5 wordings (items 1 and 2 below) and one P3 quote that is cut short (item 3). Paragraph numbers are unreliable: the fetch tool's own counts differed between two passes on P2 (for example the "accurate time logs" quote came back as ¶2 and then ¶3), so cite sections where the article has headings and drop ¶ numbers elsewhere.
- **Corrections to apply in the coding tables (for the agent editing them; I have not edited them):**
  1. **P5, Q4 row** (Sunday review meeting): the table quotes "to keep everyone informed" but the page says "keeping everyone clued into what was going on with the project". Quote the page wording, or leave it unquoted as a paraphrase.
  2. **P5, Q3 row** (hours): the row says "about 20 hours a week"; the page says "closer to 20 hours a week". The row is not in quotation marks, so only the wording needs aligning.
  3. **P3, Q4 / Q9 row** (gray box): the quote is cut off at "just three months"; the page sentence continues "after we started pre-production". Complete it, or keep the ellipsis and mark the cut.
  4. **P2, Q2 and Q3 rows**: the page uses curly apostrophes ("week’s"); the table uses straight ones. Cosmetic.
  5. **P2 ¶ numbers** and **P3 ¶ numbers** disagree between passes; see above.
  6. **P6**: all five quoted items are verbatim, but the page sentences are longer: "at the start of every day I pop into Jira and check my team's work" and "it's an immediate red flag because that means someone is stopped from doing their work". The shortened quotes are accurate fragments.
  Matched verbatim with no change: P1 (4 of 4 items; sections 1, 2, 3, 4 confirmed), P2 (11 of 11), P3 (all 6 except the cut-off noted), P4 (4 of 4), P5 (all other items), P6 (5 of 5).
- **P1 bio conflict: settled.** The article body itself places the author at Experiment 7 several times ("Experiment 7, we hosted our Hansoft server on my machine at the office"), and the closing bio says Director of Production at Experiment 7, a VR strategy game developer in New York City and San Diego. The "About the Author" box (Large Animal Games, RocketBowl, IGDA New Jersey chapter) is an older profile box that Game Developer attaches to the author. A web search found no independent source for the Experiment 7 title (MobyGames and the Game Developer author page still show Large Animal Games), so cite him as "Coray Seifert, Director of Production at Experiment 7 (per the article's closing bio, 2017)". Byline shown: "Coray Seifert, Blogger".
- **P4 author: settled. The article has no named author.** The page's structured data has an empty author list and no byline is shown on the page (names in the sidebar belong to other articles). Date shown: 21 March 2023. The canonical URL is https://www.gamedeveloper.com/gdc-2023-updates/how-i-tiny-tina-s-wonderlands-i-development-fully-embraced-cooperation (the /production/ URL in the table also loaded). Cite as "Game Developer staff / no byline" and name the speakers, Matt Cox and Kayla Belmore.
- **P6 date: settled.** The raw HTML of the post gives "Published":"2025-10-16T23:10:03Z", and the time element's title attribute reads "2025-10-16 23:10:03" (UTC, so 17 October in Australia). Use **16 October 2025 (UTC)**. The byline is Angeleen Arellano, linked to vyenda.itch.io; the game page lists CAGD as author; no school is named. This is consistent with the sidebar (Producer Devlog 2 on 2 Oct 2025, Producer Devlog 4 on 27 Oct 2025).
- **No Australian source found.** Searches for Australian studio producers returned only job ads (Riot Games Sydney, Keywords/Tantalus, SMG Studio) which ask for Jira. Ant Workshop's location is not stated on its page; do not call it Australian. A fair next step if time allows: GDAA or Game Connect Asia Pacific session notes, or a Games Industry Australia interview.
- **No GitHub Projects, Codecks or spreadsheet account** found from a producer. Codecks and spreadsheet material found was vendor marketing or hobbyist templates and was not coded. Tools in the sources: Hansoft (P1), HacknPlan (P2), Notion (P3), Trello (P5), Jira (P6), none named (P4).
- **No transcripts or video.** P3 and P4 are journalists' accounts of GDC talks, so quotes may be the journalist's paraphrase. Treat them as second-hand.
- **Not opened:** the Building Better Games podcast "Why Jira Hurts Game Studios" (E106, returned HTTP 403, no transcript found); a Medium overview of project tools (HTTP 403); an Atlassian interview with a SEGA producer (2010; the link redirected to a different page, and it is outside the 10-year window anyway); the GDC Vault "Producer Bootcamp" talks (login wall).
- **Ethics line.** Settled 17 October 2026: no convenor check; coding published sources needs no ethics step (`deliverable-3/README.md`).
