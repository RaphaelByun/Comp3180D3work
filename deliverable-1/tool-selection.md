# Tool selection — four free-tier production tools

Deliverable 1, heuristic arm. Prepared 12 October 2026 (Week 10) by Claude Code as desk research for Raphael. **Raphael must confirm each free tier on the official pricing page before the pass and overwrite the "checked" column with his own date** (2 minutes per tool).

## How the free tiers were checked, and the limit on that check

This session's network policy blocked direct access to most vendor sites (trello.com, hacknplan.com, atlassian.com, codecks.io, notion.com and linear.app all returned an egress 403 on 12 October 2026). Only github.com/pricing could be read directly. For the other tools the check below rests on web-search results returned on 12 October 2026, which quote the vendor's own pages (HacknPlan's terms of service and blog) or 2026 third-party pricing guides. That is weaker than reading the pricing page, so the official URL is given for Raphael to open.

## The four picked

| # | Tool | Official pricing page | Free tier as found (12 Oct 2026) | How it was confirmed | Why it is in the four |
|---|---|---|---|---|---|
| 1 | **Trello** (Atlassian) | https://trello.com/pricing | Free plan: up to 10 collaborators per Workspace, up to 10 boards per Workspace, unlimited cards; paid Standard from US$5/user/month | Search results, 12 Oct 2026, citing third-party 2026 guides (activepieces.com/blog/trello-pricing-2026-plans-costs-and-hidden-fees, costbench.com/software/project-management/trello/free-plan/). Not read on trello.com | Named in A2. The default kanban board for student and small indie teams; a producer's weekly view here is whatever the team typed into cards. Baseline for "manual entry". |
| 2 | **HacknPlan** | https://hacknplan.com/pricing | "Personal" tier is free; HacknPlan's 2024 pricing post says it stays free with unlimited users per project, with some customisation moved to paid tiers; terms list 500 MB storage, 5 MB attachments, six months of activity-log retention on Personal | Search results, 12 Oct 2026, citing hacknplan.com/legal/terms-of-service-v4 and hacknplan.com/blog/hacknplan-pricing-changes-2024, plus capterra.com/p/170907/HacknPlan/pricing/ | Named in A2 (vendor sweep, Appendix A). The only game-specific tracker in the set: per-discipline boards, game design model, burndown. Tests whether "built for games" changes the weekly picture. |
| 3 | **Jira (Free)** (Atlassian) | https://www.atlassian.com/software/jira/pricing | Free for up to 10 users; third-party 2026 guides list 2 GB storage and a monthly automation cap on Free | Search results, 12 Oct 2026, citing resolution.de/post/jira-pricing-plans/, eesel.ai/blog/jira-pricing-guide, costbench.com/software/project-management/jira/free-plan/. Not read on atlassian.com | The tool most 2026 producer ads name (see job-ads-and-reviews.md: Jira appears in most coded ads). Raphael's own COMP3150 team (Inkform) used it, and A2 reports none of its 126 commits cites a Jira key. Has built-in reports and dashboards, so it is the strongest test of "the tracker already reports". |
| 4 | **GitHub Projects** (with Issues) | https://github.com/pricing | Free plan "$0 USD per month forever", feature list includes "Issues & Projects" | **Read directly** on github.com/pricing, 12 Oct 2026 | The only tracker that sits on the repository, so tickets and commits can link natively. Closest existing tool to ChangeLens's data source; the Unity Experiment Framework (A2's tracker-plus-repository case) uses GitHub Issues. |

## Considered and not picked

| Tool | Official page | Reason not picked |
|---|---|---|
| Codecks | https://www.codecks.io/pricing | Game-specific and named in a 2026 producer ad (Torpor Games), so it is a strong candidate, but the free tier could not be confirmed: on 12 Oct 2026 the search index returned the pricing page saying "No premium plan, no free plan, no VIP plan" at €5/user/month, while the help manual (manual.codecks.io/plans) still lists a free tier. **If Raphael finds a current free tier, Codecks could replace Trello or Jira** — it would sharpen the "built for games" comparison with HacknPlan. |
| Notion | https://www.notion.com/pricing | A general documents-and-databases tool; teams build their own tracker in it, so there is no standard interface to inspect. 2026 sources disagree on Free limits. |
| Linear | https://linear.app/pricing | Already in A2's vendor sweep (agent-drafted project updates, June 2026). Aimed at software product teams; a third-party page lists a 250-issue cap on Free. Rarely named in game producer ads. |

## What the four cover

| Axis | Trello | HacknPlan | Jira Free | GitHub Projects |
|---|---|---|---|---|
| Built for games | No | Yes | No | No |
| Linked to the repository | Power-Up only | Integrations (check on free tier) | Integration (dev panel) | Native |
| Built-in reports or charts on free tier | Limited (to check) | Metrics, burndown (to check on Personal) | Yes (to check which) | Insights charts (to check on Free) |
| Named in A2 | Yes | Yes | Indirectly (Inkform) | Indirectly (UXF) |

"To check" cells are Raphael's to fill during account set-up; they are features, not findings.
