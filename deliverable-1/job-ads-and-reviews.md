# Job ads and reviews — coded scan (draft)

Deliverable 1, 1 hour in A2. Desk research by Claude Code on 12 October 2026, from public sources only. Replaces the September 2026 convenience sample in A2 Appendix A.

## Read this first: what is verified and what is not

- **Found: 10 real job ads (10 distinct employers) and 5 real reviews.** Each one was located through a web search on 12 October 2026 and has a real URL.
- **None of the quoted wording is yet verified against the live page.** This session's network policy blocked direct access to gamejobs.co, workwithindies.com, hitmarker.net, LinkedIn, Teamtailor, G2 and Capterra (egress 403 or DNS failure, 12 October 2026). The wording below is what the search index returned from each page. Where the index returned a sentence as a quotation, it is in quotation marks and marked **[index quote]**; where it returned a summary, it is in square brackets and marked **[index paraphrase]**. A paraphrase must not be cited as a quotation.
- **Raphael's check (about 30 minutes):** open each URL, confirm the ad is real and dated 2026, copy the verbatim sentence into the "Verbatim (Raphael)" column, and fix any code that changes. If an ad has been taken down, write "page gone on <date>" and keep the row, or replace it from the reserves.
- Hitmarker returned no usable producer ad through the search index; Seek was not tried because A2 records that it blocks automated retrieval.
- Several ads are closed. A2's September sample also counted closed listings; an ad's wording is still evidence of what the employer asks for, but report how many were closed.

## 1. Codebook

Defined before coding. A phrase can take more than one code.

| Code | Name | Apply when the phrase… |
|---|---|---|
| SR | Status reporting upward | asks for progress or status updates to leadership, management or internal stakeholders |
| EXT | Reporting to external parties | asks for progress reporting to publishers, partners, clients or platform holders |
| RK | Risk tracking | asks to identify, track, surface or mitigate risks |
| DP | Dependencies and blockers | asks to track dependencies, blockers or what work is waiting on |
| XD | Cross-discipline visibility | asks to coordinate or keep visible the work of several disciplines (art, design, code, audio, QA, narrative) |
| MS | Milestone and schedule tracking | asks to track milestones, schedules, sprints, burndown or delivery |
| CH | Change and scope control | asks to manage scope changes, change requests or re-planning |
| DOC | Tracker and documentation upkeep | asks to keep the tracker, backlog or production documents current |
| BLD | Builds and QA readiness | asks to track builds, test readiness or what QA should test |
| TN | Tool named | names a production tool (record which in the Tools column) |
| KC | Knowing what changed | explicitly asks to know or report what changed in the project (the ChangeLens need itself) |

## 2. The ten ads

Retrieved = date the search index returned the page to this session. Posted = date the index reported for the listing; "to verify" where none was given.

| # | Employer | Title | Location | URL | Posted | Retrieved | Status (index) |
|---|---|---|---|---|---|---|---|
| A01 | Torpor Games | Producer (m/f/d), *Suzerain: Project Vanguard* | Berlin, Germany | https://www.workwithindies.com/careers/torpor-games-producer-m-f-d | 20 Mar 2026 | 12 Oct 2026 | Closed |
| A02 | Telescope Games | Technical Producer | Remote | https://www.workwithindies.com/careers/telescope-games-technical-producer | 24 Jul 2026 | 12 Oct 2026 | Closed |
| A03 | Devolver Digital | Producer | to verify | https://www.workwithindies.com/careers/devolver-digital-producer | 22 May 2026 | 12 Oct 2026 | Closed |
| A04 | Scape | Senior Producer | Remote | https://www.workwithindies.com/careers/scape-senior-producer | 7 Sep 2026 | 12 Oct 2026 | Open (recruiting ongoing) |
| A05 | CM Immersive | Associate Producer | Remote, Europe | https://www.workwithindies.com/careers/cm-immersive-associate-producer | 9 Oct 2026 | 12 Oct 2026 | Closed |
| A06 | Keywords Studios (Tantalus South) | Producer / Associate Producer | Adelaide, Australia (hybrid) | https://gamejobs.co/Producer-at-Keywords-Studios-2315 | Sep 2026 | 12 Oct 2026 | to verify |
| A07 | Gameloft Brisbane | Producer (*Bluey's Happy Snaps*) | Brisbane, Australia | https://gamejobs.co/Producer-at-Gameloft-7174 | May 2026 (about 146 days old) | 12 Oct 2026 | to verify |
| A08 | Activision | Associate Producer (mobile) | Santa Monica, USA | https://gamejobs.co/Associate-Producer-at-Activision-9737 | to verify | 12 Oct 2026 | to verify |
| A09 | CI Games | Senior Producer | London, UK / Poland | https://cigames.teamtailor.com/jobs/8330183-senior-producer | 7 Sep 2026 | 12 Oct 2026 | Possibly closed (a startup.jobs copy says no longer available) |
| A10 | King | Associate Producer, *Minecraft Blast* (New Games) | Barcelona, Spain | https://gamejobs.co/Associate-Producer-Minecraft-Blast-New-Games-at-King | to verify (a London copy expired 22 Jan 2026) | 12 Oct 2026 | to verify |

Two of the ten are Australian (A06, A07). A03 (Devolver) also appeared in A2's September sample; keep it or swap for a reserve, but say which.

### 2.1 Phrases and codes

| # | Wording returned by the search index | Kind | Codes | Tools named | Verbatim (Raphael) |
|---|---|---|---|---|---|
| A01 | "The Producer is responsible for the full production lifecycle of Suzerain: Project Vanguard. This role owns planning, execution, coordination, and delivery across all disciplines" | index quote | XD, MS | | |
| A01 | [build the schedule and milestones; track tasks, dependencies and risks in Codecks and related tools] | index paraphrase | MS, DP, RK, TN | Codecks | |
| A01 | [run stand-ups, planning sessions, reviews and milestone readiness checks; manage scope and change control; coordinate narrative, design, art, tech, QA and localisation] | index paraphrase | MS, CH, XD | | |
| A01 | [keep production documents current in Notion and Miro; must have familiarity with Codecks or similar and skill in surfacing risks] | index paraphrase | DOC, TN, RK | Notion, Miro, Codecks | |
| A02 | "Identify and mitigate risks early through active coordination and transparent reporting." | index quote | RK, SR | | |
| A02 | "Communicate status updates clearly and effectively across disciplines and to leadership." | index quote | SR, XD | | |
| A02 | [maintain roadmaps and sprint plans in Jira and Confluence (plus Miro)] | index paraphrase | MS, DOC, TN | Jira, Confluence, Miro | |
| A03 | [a line on communication with partners about progress, risks and changes; A2 Appendix A recorded it in September 2026 as "communication with partners on progress, risks, and changes"] | index paraphrase (A2 quote from Sept) | EXT, RK, CH | | |
| A03 | [review milestone submissions; supervise outsourced QA; manage budget and schedule adjustments] | index paraphrase | MS, BLD, CH | | |
| A04 | [a forward view of what each feature in progress is still waiting on, with cross-department handoffs caught early] | index paraphrase | DP, XD, KC | | |
| A04 | [risks spotted early, named and given a mitigation before they become schedule problems] | index paraphrase | RK | | |
| A04 | [own the production plan, milestone baselines, and replanning on a cycle rather than after something breaks; QA gets advance notice and testable builds arrive on schedule] | index paraphrase | MS, CH, BLD | | |
| A05 | [keep production documentation and Jira up to date; manage partner milestones and bottlenecks] | index paraphrase | DOC, TN, EXT, MS, DP | Jira | |
| A06 | [main contact for clients and partners; track client requests and give regular status updates] | index paraphrase | EXT, SR | | |
| A06 | [define and document workflows in Jira and Confluence; scheduling, milestone tracking, removing roadblocks; coordinate dependencies across teams; track workload and capacity] | index paraphrase | DOC, TN, MS, DP | Jira, Confluence | |
| A07 | "communicating progress updates and sharing insights with stakeholders and teams" | index quote (check: may be partial) | SR | | |
| A07 | [support milestone execution from Vertical Slice through launch and live operations; collaborate with Legal, Localisation, Marketing, Customer Care and external stakeholders] | index paraphrase | MS, XD, EXT | | |
| A08 | [participate in writing progress reports; experience with JIRA, Confluence or other project management software] | index paraphrase | SR, TN | Jira, Confluence | |
| A09 | "Collaborate with stakeholders to define project scope, establish key milestones, and identify deliverables for assigned teams." | index quote | MS, CH, (SR?) | | |
| A10 | "Manage and maintain the JIRA backlog and boards" | index quote | DOC, TN | Jira | |
| A10 | "Experience with agile development and familiarity with JIRA or other task management tools." | index quote | TN | Jira | |

### 2.2 Provisional counts (recount after verification)

Counted per ad (an ad counts once per code however many phrases carry it).

| Code | Ads | Which |
|---|---|---|
| SR | 4 (5) | A02, A06, A07, A08; A09 only if accepted (see note) |
| EXT | 4 | A03, A05, A06, A07 |
| SR or EXT | 6 (7) | A02, A03, A05, A06, A07, A08; A09 if accepted |
| RK | 4 | A01, A02, A03, A04 |
| DP | 4 | A01, A04, A05, A06 |
| XD | 4 | A01, A02, A04, A07 |
| MS | 8 | A01–A07, A09 |
| CH | 4 | A01, A03, A04, A09 |
| DOC | 5 | A01, A02, A05, A06, A10 |
| BLD | 2 | A03, A04 |
| TN | 6 | A01 (Codecks, Notion, Miro), A02, A05, A06, A08, A10; Jira named in five (A02, A05, A06, A08, A10) |
| KC | 1 | A04 (borderline) |

Note on SR: A09's "Collaborate with stakeholders to define project scope, establish key milestones…" is about agreeing scope, not reporting progress, so it is held out of SR unless Raphael decides otherwise. Whatever rule he picks, apply it to all ten. Combining SR and EXT ("reports progress to anyone outside the immediate team") gives 6 of 10, or 7 with A09. For comparison, A2's September sample found 6 of 9 employers asking for progress reporting.

Observation for the needs catalogue: only one ad (A04) comes close to "know what changed" (KC); ads ask producers to report progress and risk, not to find out what changed. That is worth one sentence in the design spec: the need is implied by the reporting duty rather than stated.

### 2.3 Reserves (use if an ad above is gone or rejected)

| # | Employer | Title | URL | Wording from index | Kind |
|---|---|---|---|---|---|
| R-A1 | (employer named on page; Greenhouse board "bpcs") | Gaming Producer | https://job-boards.greenhouse.io/bpcs/jobs/7396346 | "Communicate proactively with leadership and partners, providing transparent updates on progress, risks, and dependencies." | index quote |
| R-A2 | Gameloft | Associate Producer | https://gamejobs.co/Associate-Producer-at-Gameloft-616 | "Regularly communicate progress to stakeholders and support any reporting needs." | index quote (location to verify; same employer as A07) |
| R-A3 | CI Games | Lead Producer | https://remotegamejobs.com/jobs/ci-games-lead-producer-remote-job | [expert-level Jira and Confluence; clear documentation and rapid project updates to keep stakeholders aligned] | index paraphrase (same employer as A09) |

## 3. Five reviews

G2 and Capterra were both blocked from this session (12 October 2026). HacknPlan has only about ten G2 reviews, so its two reviews come from **Capterra**, as A2 allows only if G2 fails; say so in the write-up. No G2 review specific to GitHub Projects' reporting was found. Reviewer names and review dates were not returned by the index; Raphael must record them from the page.

| # | Tool | Site | URL | Wording returned by the search index | Kind | Codes | Reviewer, role, date (Raphael) | Verbatim (Raphael) |
|---|---|---|---|---|---|---|---|---|
| V1 | Trello | G2 | https://www.g2.com/products/trello/reviews?qs=pros-and-cons | "native reporting and analytics are fairly basic out of the box; anything beyond simple card counts requires third-party Power-Ups or exporting data elsewhere" | index quote | SR, TN | | |
| V2 | Trello | G2 | https://www.g2.com/products/trello/reviews?qs=pros-and-cons | "for complex projects with dependencies between tasks, Trello falls short" | index quote | DP | | |
| V3 | HacknPlan | Capterra | https://www.capterra.com/p/170907/HacknPlan/reviews/ | "the project planning and metrics tools make it easy to keep track of progress" | index quote | MS | | |
| V4 | HacknPlan | Capterra | https://www.capterra.com/p/170907/HacknPlan/reviews/ | [the project reporting tools are insufficient for onboarding a whole studio] | index paraphrase | SR | | |
| V5 | Jira | G2 | https://www.g2.com/products/jira/reviews | "The UI can feel cluttered — Especially for non-technical users. Finding settings, filters, or even basic actions sometimes takes more clicks than it should." | index quote | XD (non-technical reader), H8/H6 link | | |

Reserve reviews: Jira on G2, [setting up reporting and dashboards often took extra customisation to produce meaningful insights for different departments] (index paraphrase, same URL as V5); HacknPlan on Capterra, [linking the design document to tasks gives a good overview of where we stand on each milestone] (index paraphrase, same URL as V3).

Reviews are self-selected and many HacknPlan reviews date from 2017–2019; record each review's date and drop any older than, say, 2022 if Raphael wants the set current.

## Sources

All retrieved through web search on 12 October 2026; URLs as listed in the tables above.
