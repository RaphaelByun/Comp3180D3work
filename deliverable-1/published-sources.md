# Published sources — coded in place of the two interviews (DRAFT)

Deliverable 1, "Interviews" part (2 hours in A2). Prepared 14 October 2026 by Claude Code for Raphael to check. Nothing here is committed.

**Status.** Six published accounts were opened and read on 14 October 2026. The coding is a first pass for Raphael to accept, change or reject. One check is still his job: the pages were read through a fetch tool that returns extracts, not the raw page, so every quote below must be matched against the live page before it goes into the spec (see section 7). Section 6 was completed later on 14 October 2026 from the heuristic pass, including the three-point reconciliation in §6.1.

## 1. Method

**Why published sources replaced interviews.** A2 planned two 20-minute interviews. Talking to participants for a university project needs ethics approval under Macquarie's policy before any participant is approached, and Raphael has no time left to get it. On 14 October 2026 he decided to replace the interviews with coded published sources. This is a documented change from the A2 plan. Using public, already-published material about a person's work avoids recruiting participants, so no participant approval is needed. Raphael should still confirm that with the unit convenor in a line, because he has not asked.

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
| P1 | 7 Thoughts on Agile Project Management with Hansoft | Coray Seifert | Director of Production (closing bio) | Experiment 7 (bio); the "About the Author" box gives Large Animal Games, so the two bios conflict | 7 April 2017 | https://www.gamedeveloper.com/production/7-thoughts-on-agile-project-management-with-hansoft | Full article, seven numbered sections |
| P2 | Smoothing out production in a multi-project indie studio | Lidia Machuca (HacknPlan blog) with Ewan McKenzie | McKenzie: Producer | Ant Workshop (small indie studio; location not stated) | 5 March 2024 | https://hacknplan.com/blog/smoothing-out-production | Full article, 13 paragraphs. Published on the vendor's own blog, so it is promotion as well as a producer account |
| P3 | Learning the production secrets of Return to Monkey Island | Written by Danielle Riendeau (Game Developer); speaker Jenn Sandercock | Lead Producer | Terrible Toybox | 30 March 2023 (GDC 2023 talk) | https://www.gamedeveloper.com/marketing/learning-the-production-secrets-of-i-return-to-monkey-island | Full article; a journalist's account of the talk. No video or transcript found |
| P4 | How Tiny Tina's Wonderlands' development embraced interdisciplinary cooperation | Article author not named in the extract; speakers Matt Cox and Kayla Belmore | Cox: creative director; Belmore: senior producer | Gearbox | 21 March 2023 (GDC 2023 talk) | https://www.gamedeveloper.com/production/how-i-tiny-tina-s-wonderlands-i-development-fully-embraced-cooperation | Full article; a journalist's account of the talk. No video or transcript found. Names no tools |
| P5 | Octodad: Dadliest Catch Post-Mortem Pt. 2: Production | Kevin Geisler | Programmer who also did production work (his own description) | Young Horses | 5 February 2015 (11 years old, outside the 10-year preference) | https://www.gamedeveloper.com/business/octodad-dadliest-catch-post-mortem-pt-2-production | Full article, by section heading |
| P6 | Producer Devlog 3 (KickBack) | Angeleen Arellano | Producer, student game team | CAGD (KickBack); the page does not name a school | No absolute date; page said "362 days ago" on 14 Oct 2026, so about October 2025 | https://cagd.itch.io/kickback/devlog/1086319/producer-devlog-3 | Full post. Student project, not a professional studio; included because it is a producer using Jira and is close to Raphael's own COMP3151 setting |

**Read but not coded** (not first-hand producer accounts, or too far from the questions):
- PixelTail Games, "How To Track Development of Tower Unite!" (https://forums.pixeltailgames.com/t/how-to-track-development-of-tower-unite/12894, 17 August 2016): a developer explaining a public Trello roadmap and Monday developer logs. Not a producer, and about public communication.
- Katie Chironis, "Motivating Your Indie Team - Pt. 1" (https://www.gamedeveloper.com/production/motivating-your-indie-team-pt-1, 17 November 2014): Trello board for Elsinore; written by a designer, over 10 years old.
- Ryan Darcey, "Designing a Production Process: An Addendum" (https://www.gamedeveloper.com/production/designing-a-production-process-an-addendum, 11 January 2019): a solo developer's view of Jira.
- GDC Vault, "Production Traps: How Producers and Leaders Get Stuck", Benjamin Carcich, GDC 2025 (https://gdcvault.com/play/1035520/Production-Traps-How-Producers-and): only the overview was visible behind a login-limit notice; no transcript.

## 3. Coding table, per source

Ko types are those the catalogue links to the need (needs-catalogue.md §1). "none" means the catalogue links no Ko type.

### P1. Seifert (Hansoft, 2017)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q3 / Q6 | "Burndowns require honest daily estimate updates to create accurate velocity reports." (section 1) | N17, N09 | b2 | NEW-1 |
| Q2 | "task estimates were incrementally updated every day with 100% consistency" (section 2) | N17 | b2 | NEW-1 |
| Q4 / Q9 | "Hansoft Dashboards become a great place to communicate project status, risk and opportunity" (section 3); audience "both to key stakeholders and to the team itself" | N09, N08, N25 | a3 | |
| Q7 | "The more you can pull data out of Hansoft and bring it into your staff and status meetings, the better." (section 4). Paraphrase of the same section: not everyone will dig through the menus | N25 | a3 | |

Not covered: Q1, Q5.

### P2. McKenzie, Ant Workshop (HacknPlan blog, 2024)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q3 / Q6 | "making sure the team provides accurate time logs" (¶2); "Time logs are vital to our production process" (¶3) | N17 | b2 | NEW-1 |
| Q4 | "It means we can start any work-for-hire with a schedule and work plan we have confidence in." (¶5) | N09, N17 | b2 | |
| Q4 | producers can "figure out if a project or task is slipping behind schedule for whatever reason" (¶8) | N09, N19 | none (N19: Lit) | |
| Q5 | "no two projects are the same so even something as common as an achievement handler can throw up the occasional surprise" (¶5) | N17 | b2 | |
| Q3 | contingency covers "time that is on the company clock but is not likely to be spent directly doing development work" (¶12); "Booked holidays are easy to put into a schedule" (¶9) | N04 (partly: time with no task) | s3 | NEW-2 |
| Q7 | HacknPlan is "the communication tool between the developer and production in some respects" (¶4) | N02 | a2 | |
| Q2 | "An automated Slack application posts reminders every day at 09:30" (¶2) | N02 | a2 | |
| Q4 | Internal projects use "one-month-long milestones" of "roughly a solid week's worth of work for each developer" (¶6) | N09 | none (job-ad MS) | |

Not covered: Q1, Q8, Q9.

### P3. Sandercock, Terrible Toybox (Game Developer, 2023)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q4 | "every three stages would equal a milestone" (¶6) | N09 | none | |
| Q4 | team estimated "task person-hours" using t-shirt sizes (¶18, paraphrase; the extract gave no direct quote) | N17 | b2 | |
| Q2 | a "check out" system for people to list finished tasks at the end of the day (¶14, quoted term only; rest paraphrase) | N03, N02 | a2 | |
| Q4 / Q9 | "We started with a gray box or thumbnail version of the entire game that was fully playable just three months" (¶7, cut off in the extract) | N09 | none | NEW-3 |
| Q9 | "We had links to information in notion about like, the overall vision of the project." (¶10) | N23 | d2 | |
| Q3 | meetings of "six or less people" (¶17) | N01 (discipline-focused sprint meetings, paraphrase) | a2 | |

Not covered: Q1, Q5, Q6, Q8. The article names Notion only; no Jira, Trello or spreadsheet.

### P4. Cox and Belmore, Gearbox (Game Developer, 2023)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q4 / Q9 | "We want all the teams to be very aware of the challenges every moment of every milestone." (¶4, Cox) | N01, N08 | a2 | |
| Q3 | Belmore described a designer who "understood the pipelines that would be impacted by those changes" (¶8) | N11 | d4 | |
| Q5 | "No plan survives first contact" (¶6, Belmore) | N24 | none (job-ad CH) | |
| Q4 | "For any leader: you have to say the words, you have to say that the limitations are there." (¶7) | N24, N08 | none | |

Not covered: Q1, Q2, Q6, Q7. The article names no tools. Useful only for the point that a producer wants every discipline to see the milestone's problems.

### P5. Geisler, Young Horses (Octodad postmortem, 2015)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q2 / Q3 | team began with "individual PowerPoints and task cards on a corkboard", then moved to "a free service called Trello" (Weekly Task Management) | N03 | a2 | |
| Q3 | Trello lists: "Bugs", "Playtest Feedback", "Ideas/Water Cooler", "To Do", "Doing", "Done/Committed" (Weekly Task Management) | N15, N18, N03 | b1, r1, a2 | |
| Q6 / Q7 | avoided Bugzilla-style tools because "team members would often not keep up with using software like Bugzilla" (Weekly Task Management) | | | NEW-1 |
| Q4 | A Sunday review meeting "to keep everyone informed" (Weekly Task Management, paraphrase of the heading's purpose) | N03, N23 | a2, d2 | |
| Q4 | Each quarter the team reviewed "the hours and work for each team member" (Quarterly Reviews) | N02, N20 | a2 | NEW-2 |
| Q3 | team averaged about 20 hours a week because most had other jobs (Living With No Money) | | | NEW-2 |
| Q5 | "probably spent a bit too much time on the tutorial before moving on to other levels" (Production Timeline) | N20 | none | |
| Q5 | Some levels "required too many iterations from scratch" (Production Timeline) | N20, N17 | b2 | |
| Q5 | Deciding "when to fix game-breaking bugs vs bugs and glitches that speedrunners enjoyed using" (Involvement with Community) | N16 | b3 | |

Not covered: Q1, Q8, Q9.

### P6. Arellano, KickBack (student producer, c. 2025)

| Q | Quote and locator | Needs | Ko type | NEW |
|---|---|---|---|---|
| Q2 | "I pop into Jira and check my team's work." (daily routine paragraph) | N03, N02 | a2 | |
| Q6 | work marked "to be verified" is reviewed first, and anything that does not meet the goal is sent back (paraphrase, daily routine) | N03 | a2 | NEW-1 |
| Q3 / Q5 | The Blocked column is "an immediate red flag" | N07 | c3 | |
| Q4 | "updating burndown charts at the end of every sprint to track our sprint progress and overall goal" | N17, N09 | b2 | |
| Q2 / Q4 | A mandatory team meeting "every Saturday at 1:30 PM" where everyone gives a progress check-in | N02, N03 | a2 | |
| Q3 | follows up with anyone falling behind (paraphrase) | N19 | none (Lit) | |
| Q5 | Playtesting was too thin in Sprints 1 to 3; problems were found by the team and by outside playtesters (paraphrase) | N15, N18 | b1, r1 | |

Not covered: Q1, Q8, Q9. Paragraph numbers are not usable on this page; locators are the section in the post.

## 4. NEW needs (not in the catalogue)

| Label | Need, as a producer's question | Sources | Closest existing need | Comment |
|---|---|---|---|---|
| NEW-1 | How fresh and honest is what the tracker says? (Has anyone updated these estimates and statuses, or is the board stale?) | P1, P2, P5, P6 | N19 (gone quiet), N03 | Four sources say the tracker is only as good as people's daily updating, and describe workarounds: daily stand-up updating (P1), time-log reminders (P2), dropping a tool nobody kept up (P5), a "to be verified" step (P6). It is a trust and staleness need, not a gone-quiet need. Candidate for the catalogue |
| NEW-2 | Who is available, and how many hours does the team really have? (Capacity, absences, hours logged against estimate) | P2, P5 | N17 (work left), N20 (effort) | Producers plan from hours and holidays, not only task counts. Not derivable from repository history, which shows output, not time on the clock |
| NEW-3 | Is there a playable build that shows where the game is now? | P3 | N14 (build succeeded) | One source only; N14 is about build success, this is about showing progress by playing. Weak on its own; keep as a note unless the heuristic pass or tool inspection supports it |

## 5. Needs-evidence tally (sources supporting each need, of 6)

A source counts once per need, whether it appears in one or several rows. This is the "published source" evidence for step 1 of the top-ten rule in needs-catalogue.md §5 (one point per source, in place of one per interviewee, max 6 not 2). If the rule is kept, the interview line becomes "a published source supporting it (max 1 per source)", and the weight of this stream is larger than interviews would have been; Raphael should decide whether to cap it at 2 so the other evidence kinds keep their weight.

| Need | Count | Sources |
|---|---|---|
| N17 How much work is left, and how hard | 5 | P1, P2, P3, P5, P6 |
| N09 Is the milestone on track | 4 | P1, P2, P3, P6 |
| NEW-1 Freshness and honesty of tracker data | 4 | P1, P2, P5, P6 |
| N02 What each teammate has been working on | 4 | P2, P3, P5, P6 |
| N03 Which planned tasks were finished | 3 | P3, P5, P6 |
| N01 Each discipline's changes | 2 | P3, P4 |
| N08 Emerging risks | 2 | P1, P4 |
| N15 Bugs fixed or opened | 2 | P5, P6 |
| N18 What a problem looks like to the player | 2 | P5, P6 |
| N19 Gone quiet | 2 | P2, P6 |
| N23 Next week's work | 2 | P3, P5 |
| NEW-2 Capacity and hours | 2 | P2, P5 |
| N04 Work with no ticket | 1 | P2 (partly) |
| N07 Blocked, on whom | 1 | P6 |
| N11 What does a change affect | 1 | P4 |
| N16 Bugs that must be fixed | 1 | P5 |
| N20 Where effort was concentrated | 1 | P5 |
| N24 Scope changed | 1 | P4 |
| N25 What can I tell others | 1 | P1 |
| NEW-3 Playable current state | 1 | P3 |
| N05, N06, N10, N12, N13, N14, N21, N22 | 0 | none |

**Reading the tally.**
- Most support: N17 (5 of 6), then N09, N02 and NEW-1 (4 each), then N03 (3). Producers describe their week through estimates, burndowns, time logs and meetings.
- Needs that are tracker- or person-sourced (N17, N09, N03, N02, N23, N07, N16, N19) dominate. Needs the repository or the Unity asset layer would answer best (N05, N06, N12, N13, N14, N21, N22) get no support at all. That is partly a limit of the method (writers do not describe files), but it should be said plainly in the spec and not hidden: producer writing does not ask for what ChangeLens derives best.
- N01 (changes by discipline) has indirect support only from P3 and P4, both about discipline-level awareness, with no tool.

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

A2's Apply and Analyse measure asks for "one reconciliation naming three places where inspection and interviews disagree". The interviews were dropped on 14 October 2026 (section 1), so this reconciliation sets the heuristic pass against the six coded published sources instead. That substitution must be stated wherever the measure is reported. The pass had one evaluator, an AI agent, and its severity 3–4 findings still need Raphael's hand check; the points below rest only on findings that are not marked provisional.

D4 is left out because the pass did not test it, and D5 because the pass agrees with the sources rather than disagreeing with them. That leaves three real disagreements: D3, D2 and D1.

1. **Blocked work (D3).** The source treats a Blocked column as "an immediate red flag" and the first thing checked (P6, using Jira). Inspection shows that how quickly a producer sees it depends on the plan and on a team convention, not on whether the tool is built for games. The game-specific tool, HacknPlan, had no blocked state at all on its free plan, and the blocked card was found only because its title said so (HP-25, T4 partly). GitHub records "Blocked by" for free but shows it on the board as a tiny red dot (GP-09). The generic tool, Trello, did it in about 10 seconds with a list made in 5 seconds. So the producer's habit assumes a signal that two of the four free set-ups do not give at a glance; the board shows a blocked card only if the team chose a convention for it.

2. **Keeping the tracker current (D2).** Four sources say the tracker is only as good as people's daily updating, and describe human workarounds: daily stand-up updates (P1), time-log reminders (P2), dropping a tool nobody kept up (P5), a "to be verified" step (P6). Inspection partly disagrees. In GitHub, eight commits with "Closes #n" closed their issues and moved them to Done with nobody touching the board, and each issue recorded the commit that closed it (T5 done in about 30 seconds). Where the tracker sits on the repository, part of the freshness problem is handled by the developers' own commits, not by the producer chasing updates. The limit is that this worked only because every test commit cited its issue (GP-10); in A2's UXF screen only 20 of 100 non-merge commits did (needs-catalogue.md §4). At the other end, HacknPlan and Trello showed no completion date on cards (HP-24, TR-14), so a stale board cannot even be spotted there. The sources describe the human cost of freshness; inspection shows that cost is lower where commits and tasks are linked.

3. **The tracker as the source of the weekly report (D1, with N25).** P1 says dashboards "become a great place to communicate project status, risk and opportunity", and P1 and P6 rely on burndowns. Inspection of the plans seen found that in none of the four tools could a status update be produced without writing it by hand (T3: partly in Trello, HacknPlan and GitHub; Jira's Summary came closest, on a paid trial). Sharing with someone who has no account (T7) was partly possible in three tools and not at all in HacknPlan, whose export and burndown are Premium (HP-27). The expectation in this table was also wrong in its details: GitHub's free plan has a burn-up chart, while the game-specific HacknPlan keeps its burndown behind Premium. The sources describe studios with paid or configured trackers (Hansoft, HacknPlan with time logs, Jira); a small team on free plans gets counts and charts at best, and the producer still composes the report.

Agreement worth stating in the spec, not counted as a disagreement: D5. The sources want discipline-level awareness, and the pass found it only where someone had tagged the work; no tool linked a task to the files it changed except GitHub, through commit messages.

## 7. What could not be verified, and what is missing

- **Quotes need a live-page check.** The fetch tool summarised each page and returned the quotes above. I did not see the raw HTML. Paragraph numbers are the tool's count from the first body paragraph and may be off by one. Match each quote to the page before using it.
- **P1 bio conflict.** The closing bio says Experiment 7; the "About the Author" box says Large Animal Games. Cite the author and role only, or check which is right.
- **P4 author** not shown in the extract; check the page byline.
- **P6 date** is relative only ("362 days ago"). Use "c. October 2025" or check the itch.io page source for a timestamp.
- **No Australian source found.** Searches for Australian studio producers returned only job ads (Riot Games Sydney, Keywords/Tantalus, SMG Studio) which ask for Jira. Ant Workshop's location is not stated on its page; do not call it Australian. A fair next step if time allows: GDAA or Game Connect Asia Pacific session notes, or a Games Industry Australia interview.
- **No GitHub Projects, Codecks or spreadsheet account** found from a producer. Codecks and spreadsheet material found was vendor marketing or hobbyist templates and was not coded. Tools in the sources: Hansoft (P1), HacknPlan (P2), Notion (P3), Trello (P5), Jira (P6), none named (P4).
- **No transcripts or video.** P3 and P4 are journalists' accounts of GDC talks, so quotes may be the journalist's paraphrase. Treat them as second-hand.
- **Not opened:** the Building Better Games podcast "Why Jira Hurts Game Studios" (E106, returned HTTP 403, no transcript found); a Medium overview of project tools (HTTP 403); an Atlassian interview with a SEGA producer (2010; the link redirected to a different page, and it is outside the 10-year window anyway); the GDC Vault "Producer Bootcamp" talks (login wall).
- **Ethics line.** Whether use of public sources needs any mention to the convenor is Raphael's call; I have not checked Macquarie's policy text, only taken his stated reason.
