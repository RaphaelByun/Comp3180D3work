# Interview guide — two 20-minute semi-structured interviews

> **Change from the A2 plan (14 October 2026).** The two interviews are not being run. Interviewing participants needs ethics approval under Macquarie policy before anyone is approached, and there is no time to get it. Raphael decided on 14 October 2026 to replace the interviews with coded published sources: first-hand accounts by game producers, read and coded in `published-sources.md`. This guide stays as the **coding frame**: the nine questions Q1–Q9 are the codes each source is coded against, and the note-taking template's code columns (needs IDs, job-ad codes, H1–H10, Ko types) are used as written. Everything below about recruiting, consent, timing and running an interview is now **not in use**; it is kept so the original plan stays on record. Q8 (the triangulation probe) cannot be asked of a published source, so its job is done by the "what producers say vs what tool inspection usually shows" section of `published-sources.md`. Consequences: "interview" evidence in `needs-catalogue.md` §5 and `design-spec-outline.md` now means published-source evidence, and the reconciliation should say so.

Deliverable 1, 2 hours in A2 (recruiting, two 20-minute interviews, write-up, coding). Raphael runs both interviews himself. Interviewees must be **outside the reader pool**: not anyone who might later be one of the eight Deliverable 5 readers. Good candidates: a working producer or production coordinator, a team lead or lead developer on a student or indie team, a COMP3151 tutor.

Purpose: (1) learn how people who report on a game team find out what changed in a week and what they must report; (2) check whether the problems found in the heuristic pass matter to real users. Part (2) is where the three disagreements for the reconciliation come from, so **run the heuristic pass before the interviews.**

Before the first interview, check with the unit convenor whether these two interviews are covered by the unit's ethics arrangements for low-risk student projects, and use whatever consent wording the unit requires in place of the script below if it differs.

## Recruiting message (edit to suit)

> Hi [name], I'm Raphael, a Macquarie COMP3180 student. My project is a Unity Editor tool that turns a week of a game team's history into a one-page report for a producer. Could I have 20 minutes of your time, online or in person, in the next week? I'd ask how you find out what changed on your team in a week and what you have to report to others. There's nothing to prepare. I'll take written notes only (no recording unless you're happy with it), and nothing I write up will name you or your studio. If you're happy to help, reply with a couple of times that suit. Thanks — Raphael

## Running sheet (20 minutes)

| Minutes | Section |
|---|---|
| 0–2 | Opening and consent |
| 2–4 | Background (Q1) |
| 4–14 | Core questions (Q2–Q6) |
| 14–18 | Triangulation probe (Q7–Q8) |
| 18–20 | Wrap-up (Q9) and thanks |

If time runs short, drop Q6 first, then Q4's probes. Never drop Q7–Q8: they feed the reconciliation.

## Opening and consent script (read aloud)

> Thanks for making time. This takes about 20 minutes. I'm studying how people who coordinate a game team find out what changed in a week, for a university project at Macquarie. There are no right answers; I'm interested in what you actually do. I'll take typed notes. [If asking to record: May I also record audio, just for my notes? It will be deleted once I've written them up.] Your name and your studio won't appear in anything I write; I'll call you P1 or P2. You can skip any question or stop at any time, and you can ask me to remove what you said afterwards. Is that all right with you?

Record: consent given (Y/N), recording consent (Y/N), time started.

## Questions and probes

**Q1. Background.** What's your role, and roughly what size and kind of team do you work with? Who do you report to, or who relies on your updates?
- Probe: how long have you done this kind of reporting?

**Q2. Last week, concretely.** Think about the most recent week you had to report on. Walk me through how you found out what had changed.
- Probe: what did you open first? Then what?
- Probe: what did you have to ask a person about?
- Probe: how long did it take, roughly?

**Q3. Sources and what they miss.** Of the places you look — tracker, repository, chat, stand-ups, builds, the editor itself — what does each tell you well, and what does it leave out?
- Probe: is there work that happens and never shows up in the tracker? Give me an example.
- Probe: how do you find out about art, audio or level changes, compared with code?

**Q4. What you report.** What do you have to tell others each week, and in what form (email, slides, a doc, a meeting)?
- Probe: what do the people you report to always ask for?
- Probe: what's the hardest thing to put in that update, and why?

**Q5. A surprise.** Tell me about a time something had changed and you only found out late. What happened, and what would have caught it earlier?
- Probe: where was the information, in the end?

**Q6. Trust.** When the tracker says one thing and the team says another, which do you go with?
- Probe: is there anything you'd only believe if a person told you?

**Q7. Tools you use.** In the tool you use most for tracking work, what's awkward about getting a picture of the week?
- Probe: is there a report, view or feature you expected to help and doesn't?
- Note which of the four inspected tools (Trello, HacknPlan, Jira, GitHub Projects) they use, if any.

**Q8. Triangulation probe.** Here are three problems I found when I inspected these tools myself. For each one: does this matter to you, and how do you get round it?
- Prepare: before the interview, pick the three highest-severity problems from heuristic-coding-sheet.md (one sentence each, no heuristic jargon). Show the screenshot if it helps.
- Probe, for each: how often does this get in your way? Would you rate it as a nuisance or a real problem?
- Probe: is there a problem with these tools that I've missed entirely?

**Q9. The page.** If a page appeared each Monday listing what changed in the project last week, what would it need for you to act on it — and what would you not trust it to tell you?
- Probe: what would make you stop reading it?

Close: "Is there anything I should have asked and didn't? Thanks — that's really helpful."

## Note-taking template (copy once per interview)

```
Interview: P_   Date: ____   Start time: ____   Mode: in person / online
Role (de-identified): ____________   Team size/kind: ____________
Consent: Y/N   Recording: Y/N   Tools they use: ____________

| Clock (mm:ss) | Q  | Note (their words in "quotes"; my paraphrase plain) | Code(s) |
|---------------|----|-----------------------------------------------------|---------|
| 00:00         | —  | consent                                             |         |
|               | Q1 |                                                     |         |
|               | Q2 |                                                     |         |
|               | Q3 |                                                     |         |
|               | Q4 |                                                     |         |
|               | Q5 |                                                     |         |
|               | Q6 |                                                     |         |
|               | Q7 |                                                     |         |
|               | Q8 | problem 1:                                          |         |
|               | Q8 | problem 2:                                          |         |
|               | Q8 | problem 3:                                          |         |
|               | Q9 |                                                     |         |

Q8 verdicts:   problem 1 matters? Y/N/partly   problem 2 ___   problem 3 ___
Needs raised (needs-catalogue.md IDs, or NEW + wording): ____________
Disagreements with my inspection (for the reconciliation): ____________
Written up within 24 h? date ____
```

Codes for the "Code(s)" column: a needs-catalogue ID (N01–N25 or NEW), a job-ad code from job-ads-and-reviews.md (SR, EXT, RK, DP, XD, MS, CH, DOC, BLD, KC), a heuristic (H1–H10), or a Ko et al. (2007) type (for example a2). Write up each interview within 24 hours, while the gaps in the notes are still recoverable.
