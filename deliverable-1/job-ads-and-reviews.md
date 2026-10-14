# Job ads and reviews — coded scan (verified 15 October 2026)

Deliverable 1, 1 hour in A2. Desk research by Claude Code, first drafted 12 October 2026 and **verified against the live pages on 15 October 2026** (retrieval date for every row below). Public sources only. Replaces the September 2026 convenience sample in A2 Appendix A.

## Read this first: what is verified and what is not

- **Ads: 10 of 10 verified.** Nine were read at their listed URL on 15 October 2026 (A01-A05 on workwithindies.com; A06, A07, A08, A10 on gamejobs.co). A09's listed URL (CI Games on Teamtailor) now returns HTTP 410 Gone; it is verified through two mirrors of the same CI Games "Senior Producer" ad (dynamitejobs.com and builtinlondon.uk) that carry the identical sentence, and is marked "mirror".
- **Wording:** every ad phrase in section 2.1 was matched against the page text by the fetch tool, which returns extracts rather than raw HTML. Quotes are short and under 25 words. The 12 October index paraphrases are replaced by verbatim phrases or dropped.
- **Reviews: 4 of 5 verified (V1-V4, in Chrome, later on 15 Oct; V5 unverified, see section 3).** Earlier note: G2 and Capterra returned HTTP 403 to the fetch tool on 15 October 2026, and web searches for the quoted sentences did not return them. The review wording is the 12 October search-index text and stays **unverified**; do not cite it as a quotation until Raphael opens the pages (about 10 minutes).
- **Closed ads:** A01-A05 say "This position has been closed" (workwithindies.com). A06, A07, A08 and A10 show "This job might no longer be available" with only a relative age; A09 is closed or removed on both mirrors. **Six are confirmed closed, one is probably closed and three are unclear; none is confirmed live.** An ad's wording is still evidence of what the employer asks for, but report this.
- Hitmarker returned no usable producer ad through the search index; Seek was not tried because A2 records that it blocks automated retrieval.

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

Retrieved = 15 October 2026 for every row. Posted = date shown on the page; gamejobs.co shows only a relative age.

| # | Employer | Title | Location (as on page) | URL | Posted | Status on 15 Oct 2026 |
|---|---|---|---|---|---|---|
| A01 | Torpor Games | Producer (m/f/d), *Suzerain: Project Vanguard* | Berlin, Germany (from draft; not re-read) | https://www.workwithindies.com/careers/torpor-games-producer-m-f-d | 20 Mar 2026 | Closed ("This position has been closed.") |
| A02 | Telescope Games | Technical Producer | Remote | https://www.workwithindies.com/careers/telescope-games-technical-producer | 24 Jul 2026 | Closed |
| A03 | Devolver Digital | Producer | Anywhere (Remote), full time | https://www.workwithindies.com/careers/devolver-digital-producer | 22 May 2026 | Closed |
| A04 | Scape | Senior Producer | Remote (from draft) | https://www.workwithindies.com/careers/scape-senior-producer | 7 Sep 2026 | Closed (the 12 October draft said open; the page now says closed) |
| A05 | CM Immersive | Associate Producer | Remote, Europe (from draft) | https://www.workwithindies.com/careers/cm-immersive-associate-producer | 9 Oct 2026 | Closed |
| A06 | Keywords Studios (Tantalus South) | Producer / Associate Producer | Adelaide, Australia | https://gamejobs.co/Producer-at-Keywords-Studios-2315 | "about 1 month ago" (about mid-Sep 2026) | Unclear: "This job might no longer be available", Apply link still shown |
| A07 | Gameloft Brisbane | Producer (*Bluey's Happy Snaps*) | Brisbane, Australia | https://gamejobs.co/Producer-at-Gameloft-7174 | "4 months ago" (about June 2026) | Probably closed: "This job might no longer be available" |
| A08 | Activision | Associate Producer (mobile) | Santa Monica, CA, onsite 4 days a week | https://gamejobs.co/Associate-Producer-at-Activision-9737 | "1 month ago" (about mid-Sep 2026) | Unclear: "This job might no longer be available" |
| A09 | CI Games | Senior Producer | Europe, fully remote (mirrors; the draft said London / Poland) | https://cigames.teamtailor.com/jobs/8330183-senior-producer (HTTP 410 Gone). Mirrors read: https://dynamitejobs.com/company/cigames/remote-job/senior-producer and https://builtinlondon.uk/job/senior-producer/11037062 | "Updated September 10, 2026" (dynamitejobs; no original date) | Closed: dynamitejobs "This job is closed"; builtinlondon "Sorry, this job was removed" (25 Sep 2026) |
| A10 | King | Associate Producer, *Minecraft Blast* (New Games) | Barcelona, Spain | https://gamejobs.co/Associate-Producer-Minecraft-Blast-New-Games-at-King | "about 9 months ago" (about Jan 2026) | Unclear: "This job might no longer be available", Apply link still shown |

Two of the ten are Australian (A06, A07). A03 (Devolver) also appeared in A2's September sample; keep it and say so. Locations marked "from draft" were not re-read on 15 October. "Closed or probably closed": A01-A05 and A09 closed, A07 probably, A06, A08 and A10 unclear; so 6 confirmed closed, 1 probably, 3 unclear.

### 2.1 Phrases and codes

Verbatim = copied from the page text returned by the fetch tool on 15 October 2026. A phrase marked "no code" is shown because the draft coded it and the verbatim text does not support a code.

| # | Verbatim wording | Codes | Tools named |
|---|---|---|---|
| A01 | "The Producer is responsible for the full production lifecycle of Suzerain: Project Vanguard." / "This role owns planning, execution, coordination, and delivery across all disciplines." | XD, MS | |
| A01 | "Demonstrated ability to build and maintain production schedules, milestones, and dependency tracking." | MS, DP | |
| A01 | "Strong organizational and communication skills, with the ability to surface risks and drive resolution." | RK | |
| A01 | "Ability to manage scope, priorities, and change control in a structured and transparent manner." | CH | |
| A01 | "Maintain clear and up-to-date production documentation in Notion and Miro, including roadmaps and key decisions." | DOC, TN | Notion, Miro |
| A01 | "Hands-on experience using production and tracking tools such as Codecks, or comparable systems." | TN | Codecks |
| A01 | "Coordinate closely with the Lead Producer, providing regular status updates and aligning on priorities, resourcing, and timelines." | SR | |
| A01 | "Coordinate cross-discipline collaboration between Content (Lead Writer and Narrative Designer), Design, Art, Tech, QA..." | XD | |
| A02 | "Identify and mitigate risks early through active coordination and transparent reporting." | RK | |
| A02 | "Communicate status updates clearly and effectively across disciplines and to leadership." | SR, XD | |
| A02 | "Maintain project roadmaps, sprint plans, and task tracking using tools such as Jira, Confluence, and Miro." | MS, DOC, TN | Jira, Confluence, Miro |
| A03 | "Maintain clear, consistent communication with partners on progress, risks, and changes" | EXT, RK, CH | |
| A03 | "Collaborate with partners to define and maintain budgets, schedules, and milestones" | MS | |
| A03 | "Review milestone submissions, providing detailed notes and feedback against agreed criteria" (context only) | no code | |
| A03 | "Supervise outsourced Quality Assurance efforts" (oversight of QA, not build or test-readiness tracking) | no code | |
| A04 | "every feature in flight, what each one is still waiting on" | DP | |
| A04 | "the handoffs between departments caught early" | XD | |
| A04 | "risk seen while it is still cheap, named, and carrying a mitigation" | RK | |
| A04 | "a milestone schedule with a baseline" / "replanning on a cycle rather than after something breaks" | MS, CH | |
| A04 | "QA knows what is coming and when" | BLD | |
| A05 | "Keep the production documentation and Jira up to date" | DOC, TN | Jira |
| A05 | "figuring out milestones, bottlenecks, communication loops" | MS, DP | |
| A05 | "Prepare and share deliverables by milestone, and push them through acceptance" (delivery to partners, not progress reporting) | MS | |
| A06 | "Serve as the primary point of contact for clients, external partners, and publishing teams" / "Provide regular status updates to clients" | EXT | |
| A06 | "Define, document, and refine production workflows in Jira and Confluence" | DOC, TN | Jira, Confluence |
| A06 | "Assist with scheduling, milestone tracking, and reporting" | MS | |
| A06 | "coordinate project dependencies and priorities" / "Proactively identify and remove roadblocks" | DP | |
| A07 | "Communicate progress updates and share insights with stakeholders and teams." | SR | |
| A07 | "support milestone execution from Vertical Slice through to launch" | MS | |
| A07 | "Legal, Localization, Marketing, Customer Care and external stakeholders" | XD | |
| A08 | "Participate in writing the project plans, supporting/proposal documents, and progress reports" | SR | |
| A08 | "Experience with JIRA, Confluence, or other project management software" | TN | Jira, Confluence |
| A09 (mirror) | "Collaborate with stakeholders to define project scope, establish key milestones, and identify deliverables" | MS | |
| A09 (mirror) | "proactively identify project risks, adapt strategies as the landscape shifts..." | RK | |
| A09 (mirror) | "Working knowledge of project management tools like Jira and Confluence." (listed as desirable) | TN | Jira, Confluence |
| A09 (mirror) | "Ensure seamless and transparent communication across all departments, external partners, and studio leadership." (not progress reporting) | no code | |
| A10 | "Manage and maintain the JIRA backlog and boards, ensuring work is clearly articulated" | DOC, TN | Jira |
| A10 | "Experience with agile development and familiarity with JIRA or other task management tools." | TN | Jira |

**SR rule (decided for A09 and applied to all ten).** Code SR only where the phrase asks for progress, status, or progress-report communication to leadership, management, internal stakeholders or "stakeholders and teams". Phrases about agreeing scope, collaborating, or general "communication" do not count. Under this rule A09 is **not** SR: its only stakeholder sentence is about defining scope and milestones, and its communication sentence names audiences ("all departments, external partners, and studio leadership") without asking for progress or status. A06's "status updates to clients" is EXT only, not SR, because clients are external. A07's "stakeholders and teams" is SR because the page does not limit it to outsiders.

### 2.2 Counts after verification

Counted per ad (an ad counts once per code however many phrases carry it). Arithmetic checked against the table in 2.1.

| Code | Ads | Which |
|---|---|---|
| SR | 4 | A01, A02, A07, A08 |
| EXT | 2 | A03, A06 |
| SR or EXT | 6 | A01, A02, A03, A06, A07, A08 |
| RK | 5 | A01, A02, A03, A04, A09 |
| DP | 4 | A01, A04, A05, A06 |
| XD | 4 | A01, A02, A04, A07 |
| MS | 8 | A01, A02, A03, A04, A05, A06, A07, A09 |
| CH | 3 | A01, A03, A04 |
| DOC | 5 | A01, A02, A05, A06, A10 |
| BLD | 1 | A04 |
| TN | 7 | A01 (Notion, Miro, Codecks), A02, A05, A06, A08, A09, A10; Jira named in six (A02, A05, A06, A08, A09, A10) |
| KC | 0 | none |

Check: the SR set and the EXT set share no ad, so SR 4 + EXT 2 = 6 of 10 for "SR or EXT". Draft counts were SR 4 (5), EXT 4, SR or EXT 6 (7), RK 4, CH 4, BLD 2, TN 6, KC 1 (borderline); the changes are in the change log. For comparison, A2's September sample found 6 of 9 employers asking for progress reporting.

Observation for the needs catalogue: no ad asks the producer to know or report *what changed* (KC = 0). The nearest, A04 ("every feature in flight, what each one is still waiting on"), is a status view, not a change view. Ads ask producers to report progress and risk; the need is implied by the reporting duty rather than stated.

### 2.3 Change log (12 October draft to 15 October verification)

| # | Change | Reason |
|---|---|---|
| A01 | Added SR | Page: "providing regular status updates" to the Lead Producer |
| A01 | Index paraphrases replaced by verbatim lines | Page wording |
| A03 | Removed BLD | "Supervise outsourced Quality Assurance efforts" is oversight, not build or test-readiness tracking |
| A03 | Location set to "Anywhere (Remote)" | Page shows it |
| A04 | Removed KC | Verbatim text is a waiting-on status view, not "what changed" |
| A04 | Status Open to Closed | Page says closed |
| A05 | Removed EXT | "share deliverables by milestone" is delivery, not progress reporting to partners; DP kept via "bottlenecks" |
| A06 | Removed SR (EXT only) | "status updates to clients" are external |
| A07 | Removed EXT | "external stakeholders" appears in a collaboration list, not a reporting duty |
| A07 | Quote corrected | Page: "support milestone execution from Vertical Slice through to launch"; the full progress-updates sentence replaces the draft's partial quote |
| A09 | Removed CH and (SR?); added RK, TN | SR rule above; "define project scope" is not change control; mirror pages carry a risks sentence and desirable Jira/Confluence |
| A09 | Source moved to mirrors | Teamtailor URL returns 410 Gone |
| A10 | Quote extended | Page: "Manage and maintain the JIRA backlog and boards, ensuring work is clearly articulated" |

Not changed: A02 and A08 codes.

### 2.4 Reserves (checked 15 October 2026)

| # | Employer | Title | URL | Status and wording | Verified |
|---|---|---|---|---|---|
| R-A1 | Blueprint Technologies (Greenhouse board "bpcs") | Gaming Producer | https://job-boards.greenhouse.io/bpcs/jobs/7396346 | The URL now shows a job board listing several roles, not this ad; the quoted sentence "Communicate proactively with leadership and partners..." does not appear | **No, unusable** |
| R-A2 | Gameloft | Associate Producer | https://gamejobs.co/Associate-Producer-at-Gameloft-616 | Brisbane, Australia; "1 year ago"; "This job might no longer be available". "Regularly communicate progress to stakeholders and support any reporting needs." Same employer as A07 | Yes |
| R-A3 | CI Games | Lead Producer | https://remotegamejobs.com/jobs/ci-games-lead-producer-remote-job | Closed ("This listing has ended"), about 5 months old. "expert-level proficiency with Jira and Confluence"; "Ensure all stakeholders remain aligned on shifting priorities through clear documentation and rapid project updates." Same employer as A09 | Yes |

No reserve was swapped in; all ten ads are retained.

## 3. Five reviews

**Update, later on 15 October 2026: four of the five are now verified** by Claude in a normal Chrome window, where G2 and Capterra loaded (they block the fetch tool). Wording, reviewer and date below are copied from the live pages. V5 could not be found: G2 rotates the Jira reviews it shows, and neither the indexed sentence nor a similar one reappeared on reload, so V5 stays unverified. The paragraph that follows is the earlier status, kept for the record.

**Earlier status on 15 October 2026: none of the five is verified.** g2.com (Trello, Jira) and capterra.com (HacknPlan) each returned HTTP 403 to the fetch tool. Web searches for each quoted sentence returned the review pages and other reviews making similar complaints, but not the exact wording, so every sentence below is the 12 October search-index text and **must not be cited as a verbatim quotation** until Raphael opens the page and copies it. The URLs and the existence of the review pages are confirmed by search results (Capterra lists 28 HacknPlan reviews, 4.5 overall; G2 Jira reviews page exists). HacknPlan has only about ten G2 reviews, so its two reviews come from **Capterra**, as A2 allows only if G2 fails; say so in the write-up. No G2 review specific to GitHub Projects' reporting was found. Reviewer names and review dates were not returned; Raphael must record them from the page.

Reviews V1-V5: verified 4, unverified 1 (V5), codes changed 0. G2 shows dates as month/day/year; they are written out below.

| # | Tool | Site | URL | Wording returned by the search index | Kind | Codes | Reviewer, role, date (Raphael) | Verbatim (Raphael) |
|---|---|---|---|---|---|---|---|---|
| V1 | Trello | G2 | https://www.g2.com/products/trello/reviews?qs=pros-and-cons | "native reporting and analytics are fairly basic out of the box; anything beyond simple card counts requires third-party Power-Ups or exporting data elsewhere" | index quote | SR, TN | Muhammed A., Technical Project Manager, Logistics and Supply Chain, small business; G2 validated reviewer (G2 invite); 1 August 2026 | **Verified:** "Native reporting and analytics are fairly basic out of the box; anything beyond simple card counts requires third-party Power-Ups or exporting data elsewhere, which adds friction." |
| V2 | Trello | G2 | https://www.g2.com/products/trello/reviews?qs=pros-and-cons | "for complex projects with dependencies between tasks, Trello falls short" | index quote | DP | Nitin V., Full Stack Engineer, Computer Software, small business; G2 validated reviewer, marked **Incentivized**; 9 June 2026 | **Verified:** "And for complex projects with dependencies between tasks, Trello falls short—it's just not built for that kind of complicated project management." |
| V3 | HacknPlan | Capterra | https://www.capterra.com/p/170907/HacknPlan/reviews/ | "the project planning and metrics tools make it easy to keep track of progress" | index quote | MS | Ole J., Director, Computer Games, used 2+ years; "Great tool, sometimes overwhelming", 5.0; 26 October 2023 | **Verified:** "The project planning and metrics tools make it easy to keep track of progress." |
| V4 | HacknPlan | Capterra | https://www.capterra.com/p/170907/HacknPlan/reviews/ | [the project reporting tools are insufficient for onboarding a whole studio] | index paraphrase | SR | Verified Reviewer, **Senior Producer**, Computer Games, used 6-12 months; "So nearly great", 3.0; 16 July 2018 (older than 2022: keep only if dated sources are acceptable; it is the one producer-role review) | **Verified:** "It's project reporting tools are also, not good enough for the amount of effort that is required to on-board the entire studio onto the platform" (reviewer's spelling) |
| V5 | Jira | G2 | https://www.g2.com/products/jira/reviews | "The UI can feel cluttered — Especially for non-technical users. Finding settings, filters, or even basic actions sometimes takes more clicks than it should." | index quote | XD (non-technical reader), H8/H6 link | not found on the live page 15 Oct 2026 | **Unverified**: do not quote; replace with a verified Jira review or drop V5 and say so |

Reserve reviews: Jira on G2, [setting up reporting and dashboards often took extra customisation to produce meaningful insights for different departments] (index paraphrase, same URL as V5); HacknPlan on Capterra, [linking the design document to tasks gives a good overview of where we stand on each milestone] (index paraphrase, same URL as V3).

Reviews are self-selected and many HacknPlan reviews date from 2017–2019; record each review's date and drop any older than, say, 2022 if Raphael wants the set current.

## Sources

Ads: fetched 15 October 2026 at the URLs in section 2 (A09 via the two mirrors named there) and 2.4. Reviews: URLs as listed in section 3, not retrievable (HTTP 403) on 15 October 2026; first located by web search on 12 October 2026.
