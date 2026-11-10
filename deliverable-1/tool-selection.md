# Tool selection — four free-tier production tools

Deliverable 1, heuristic arm. Prepared 12 October 2026 (Week 10) by Claude Code as desk research for Raphael; re-verified 15 October 2026 (see below).

## How the free tiers were checked

Re-checked on **15 October 2026** (Week 10) by Claude Code through a page-fetch tool, replacing the 12 October search-index check. Pages that loaded are marked "read". atlassian.com/software/jira/pricing returned only its title (no body), so Jira rests on Atlassian's support pages. **Raphael should still glance at each pricing page and overwrite the "checked" date with his own.**

## The four picked

| # | Tool | Official pricing page | Free tier as found | Source and status | Checked | Why it is in the four |
|---|---|---|---|---|---|---|
| 1 | **Trello** (Atlassian) | https://trello.com/pricing | "Up to 10 boards per Workspace"; "Free for up to 10 collaborators per Workspace"; "Unlimited Power-Ups per board"; "250 Workspace command runs per month" (automation). Calendar, Timeline, Table, Dashboard and Map views are Premium only; "Simple data export" is listed under Premium. The page does not mention CSV or dependencies | trello.com/pricing **read**; CSV from support.atlassian.com/trello/docs/exporting-data-from-trello **read** | 15 Oct 2026 | Named in A2. The default kanban board for student and small indie teams. Baseline for "manual entry". |
| 2 | **HacknPlan** | https://hacknplan.com/pricing | Personal is free (EUR 0): "Users per project: Unlimited", "Unlimited projects", "Progress and estimation metrics". Paid only: GitHub integration (Personal Plus or Studio), customising kanban columns and card fields (Personal Plus), "Data export for metrics" (Studio), "Sprint tracking with Burndown charts" (Studio). The page does not mention dependencies | hacknplan.com/pricing **read**; dependencies from hacknplan.com/blog/hacknplan-pricing-changes-2024 **read** | 15 Oct 2026 | Named in A2. The only game-specific tracker in the set. |
| 3 | **Jira (Free)** (Atlassian) | https://www.atlassian.com/software/jira/pricing | "Up to 10 users", "2 GB of file storage", Community support only; limits on permissions, audit logs, email notifications, apps and advanced roadmaps; automation "150 steps per subscription". Whether Free has the project Summary tab: not confirmed (see below) | Pricing page **did not load** (title only). Figures from support.atlassian.com/jira-cloud-administration/docs/explore-jira-cloud-plans/ **read** | 15 Oct 2026 | The tool most 2026 producer ads name. Raphael's COMP3150 team used it. Built-in reports, so the strongest test of "the tracker already reports". |
| 4 | **GitHub Projects** (with Issues) | https://github.com/pricing | Free plan includes "Issues" and "Projects": "Visualize and manage issues and pull requests across tables, boards, and roadmaps"; unlimited public and private repositories | github.com/pricing **read** | 15 Oct 2026 | The only tracker that sits on the repository. Closest to ChangeLens's data source. |

### Answers to the four plan questions

1. **Does Jira Free have the project Summary tab (the "completed in the last 7 days" widget)?** **Unverified.** The pricing page did not load. Atlassian's Free-plan support page does not mention Summary, and the two pages found that describe the widget ("completed, updated, or created in the last 7 days", uwaterloo.ca/atlassian blog on the Project Summary page) state no plan restriction, but they also describe it as rolling out through Feature Lab. So: no source says it is paid-only; no source confirms it is on Free. The pass saw it on a Standard trial, so it proves nothing about Free. Raphael can settle it in 1 minute by opening a Free Jira site.
2. **Does Trello Free have CSV export?** **No.** Atlassian's export page says "Boards in Premium Workspaces can be exported to CSV format, which can be opened in any spreadsheet program." Free boards export JSON only (search result summary of the same page; the JSON statement is not quoted from the page itself).
3. **Is HacknPlan's GitHub integration Premium?** **Yes**, paid (Personal Plus or Studio; pricing page: "Integrations: Google, Slack, GitHub, GitLab and Bitbucket" under Personal Plus). **Dependencies:** managing them is paid; the 2024 pricing post says free accounts "won’t be able to create, modify or remove dependencies from tasks" (they can still view them). **Custom stages:** paid (Personal Plus: "categories, kanban columns, card fields"). **Metrics export:** paid, Studio tier only ("Data export for metrics"). Burndown is also Studio only, not Personal Plus. Note "Premium" is a loose label: HacknPlan's tiers are Personal Plus and Studio.
4. **GitHub Insights charts on Free?** GitHub docs describe a default "Burn up" chart for Projects but state no plan restriction; the pricing page comparison is ambiguous. Treat as consistent with the pass (burn-up chart seen on a free plan) but not independently confirmed from documentation.

### Plan reality vs what the pass saw

- **Trello:** the pass ran on an automatic **Premium trial**, so any view, dashboard, calendar or export it used is not on Free (views and Dashboard are Premium; CSV is Premium). On Free the pass's results would be worse, not better.
- **Jira:** the pass ran on a **Standard trial**, not Free. Free is limited to 10 users, 2 GB and 150 automation steps; the Summary figure ("8 completed in the last 7 days") cannot be assigned to Free.
- **HacknPlan:** the pass ran on the free Personal plan, which matches the pricing page: dependencies, GitHub integration, custom columns, burndown and metrics export were all out of reach, as seen.
- **GitHub:** free plan as seen.

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
| Linked to the repository | Power-Up only | Paid (Personal Plus or Studio) | Integration (dev panel) | Native |
| Built-in reports or charts on free tier | None on Free (Dashboard view and CSV export are Premium) | Metrics on Personal; burndown and metrics export paid (Studio) | Not confirmed (Summary tab unverified on Free) | Burn up chart documented; plan not stated |
| Named in A2 | Yes | Yes | Indirectly (Inkform) | Indirectly (UXF) |

Updated 15 October 2026 from the pricing and support pages cited above; "unverified" means no page confirmed it.
