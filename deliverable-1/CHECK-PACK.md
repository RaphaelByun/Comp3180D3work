# D1 check pack: what Raphael checks by hand

Prepared 17 Oct 2026 by Claude Code (one drafting agent and one verifying agent per card; 13 of 16 cards were corrected by the verifier against `heuristic-coding-sheet.md`). Nothing here is a result: it tells you what to reproduce and what to accept. Your ticks, dates and changes are the evidence.

Part A is README step 2 (45 min budgeted; cards estimate 76 min, because the original workspaces were deleted and each check needs a little setup on a fresh free account). Part B is every other step except 9 (132 min). Do the seven "first" cards before anything else: the reconciliation in `published-sources.md` §6.1 cites HP-25, HP-24 and HP-27, the README names HP-16 to HP-18 as provisional, and TR-13 carries the §6 Trello row.

When a finding does not reproduce: change, re-rate or delete it in `heuristic-coding-sheet.md`, then recount §6. Save each screenshot you keep under `deliverable-1/screenshots/`.

## Part A: severity 3-4 spot-checks

| # | ID | Tool | Sev | Provisional | Min | Done (date) | Result |
|---|---|---|---|---|---|---|---|
| 1 | HP-16 **(first)** | HacknPlan | 4 | yes | 4 | | kept / re-rated / deleted |
| 2 | HP-17 **(first)** | HacknPlan | 3 | yes | 4 | | kept / re-rated / deleted |
| 3 | HP-18 **(first)** | HacknPlan | 3 | yes | 4 | | kept / re-rated / deleted |
| 4 | HP-25 **(first)** | HacknPlan | 3 | no | 6 | | kept / re-rated / deleted |
| 5 | HP-24 **(first)** | HacknPlan | 3 | no | 4 | | kept / re-rated / deleted |
| 6 | HP-27 **(first)** | HacknPlan | 3 | no | 5 | | kept / re-rated / deleted |
| 7 | TR-13 **(first)** | Trello | 3 | no | 4 | | kept / re-rated / deleted |
| 8 | GP-03 | GitHub Projects | 3 | no | 4 | | kept / re-rated / deleted |
| 9 | GP-04 | GitHub Projects | 3 | no | 10 | | kept / re-rated / deleted |
| 10 | HP-06 | HacknPlan | 3 | no | 4 | | kept / re-rated / deleted |
| 11 | HP-09 | HacknPlan | 3 | no | 4 | | kept / re-rated / deleted |
| 12 | HP-15 | HacknPlan | 3 | no | 5 | | kept / re-rated / deleted |
| 13 | HP-26 | HacknPlan | 3 | no | 4 | | kept / re-rated / deleted |
| 14 | JI-05 | Jira | 3 | no | 5 | | kept / re-rated / deleted |
| 15 | TR-07 | Trello | 3 | no | 4 | | kept / re-rated / deleted |
| 16 | TR-12 | Trello | 3 | no | 5 | | kept / re-rated / deleted |

### HP-16 (HacknPlan, H5 Error prevention (also H3), severity 4, provisional, check first)

Sheet: `heuristic-coding-sheet.md` line 148. About 4 min.

**Claim.** Single-letter global shortcuts (D = New design element, etc.) fire whenever focus leaves an input. During the pass the tag input lost focus after a click several times, so typed text opened stacked "New design element" dialogs. Cancelling those dialogs wiped the half-filled New task form (title, category, board) with no warning or undo. This is data loss, so it was rated 4. The finding is provisional because it was seen under automated input at 150% browser zoom.

**Setup.** Use a fresh free HacknPlan account (free Personal plan, which is the plan the pass used, so no trial difference applies). Set browser zoom to 100%. Create one project, with any project type, as in the §3 seed. You do not need the full seed: one existing tag (for example "Dev A") and the default categories are enough. Use a real mouse and keyboard, not automation.

**Steps.**
1. Open the project and open the New task form. The sheet does not say exactly how it was opened (flagged); use the + / New task button you used to enter the seed, as in §3.
2. Type a title (for example "Fix restart bug (#588)"), choose a category (Programming), and set Board to the sprint board. Do not submit.
3. Click into the Tag field and type a few letters.
4. Click once somewhere neutral inside the dialog that is not an input (for example the dialog's blank background), so that focus leaves the tag input. The sheet only says "after a click" and does not name the spot (flagged).
5. Without clicking back into a field, type a word containing the letter d (for example "dev").
6. Watch for one or more "New design element" dialogs opening, possibly stacked.
7. Cancel or close every "New design element" dialog. Note any warning, and note if the tab freezes (HP-18 saw Cancel on a filled form freeze the tab, probably a native confirm dialog).
8. Check the New task form: are the title, category and board still filled? Look for any warning or undo.
9. Repeat steps 3 to 8 two or three times, also trying a click outside the dialog (not named in the sheet; flagged). Then repeat once at 150% zoom to test the automation/zoom caveat.

**Holds if.** Typing with focus outside an input fires single-letter shortcuts: the d opens a "New design element" dialog, and several letters may stack several dialogs. After you cancel them, the New task form's title, category and board are gone, with no confirmation or undo. If this happens by hand at 100% zoom, keep severity 4 (data loss) and remove the "provisional" tag.

**If it does not.** Use one of these four outcomes:
(a) If shortcuts fire but cancelling them leaves the New task form intact, re-rate to 2 (a recoverable slip; H5 only) and rewrite the row without the data-loss claim.
(b) If no shortcut fires while the New task form is open, however you click, delete HP-16.
(c) If it reproduces only at 150% zoom, record it as an artefact of zoom or automation: keep it out of the citable findings and leave a note in the method note.
(d) Plan or trial differences are not a factor here, because both the pass and the re-test use HacknPlan free.
Also check HP-09 (Enter submitting the form) while you are in this form, because the two problems interact.

**Screenshot.** `screenshots/HP-16-shortcut-wipes-new-task.png`

Result: ______  Date: ______

### HP-17 (HacknPlan, H5 Error prevention, severity 3, provisional, check first)

Sheet: `heuristic-coding-sheet.md` line 149. About 4 min.

**Claim.** After "Create & continue" in the New task form, the dialog re-opens with an animation and a hidden second copy stays in the page (two "Add tag" inputs, one off-screen), and typed input sometimes went into the wrong one. Provisional: seen under synthetic (automated) input at 150% browser zoom and may be partly caused by that, so it must not be cited until repeated by hand.

**Setup.** Fresh free HacknPlan account (free plan, personal workspace, as recorded in the sheet). Create one project (any project type; the sheet does not record which type was picked, so flag that). From the seed you need only two cards: C2 "Add emergency light and light interactions (#610)" with tag Dev B and C3 "Make floor sign openable/closeable (#609)" with tag Dev C. You do not need the full seed. Do the first pass at 100% browser zoom with normal mouse and keyboard. Only repeat at 150% zoom if it does not reproduce.

**Steps.**
1. Set browser zoom to 100% (Ctrl+0; generic browser step, not from the sheet). Open the new project and open the New task form. The sheet does not say where the button is: open it the same way as when the seed cards were entered in section 3 set-up (flag).
2. Type the title for C2 and pick a Category and Board. Watch out for HP-15: picking a category or tag can reset Board.
3. In the tag field, type Dev B and choose it with the mouse. Do not press Enter, because Enter submits the form (HP-09).
4. Click "Create & continue" (not plain Create).
5. Watch the dialog as it re-opens: note whether it animates in and whether it looks like one dialog or two layered dialogs.
6. Click into the Title field and type the C3 title, then click into the "Add tag" input and slowly type Dev C. Check that every character lands in the visible field.
7. Optional check for the hidden copy (verification method, not recorded in the sheet): right-click the page > Inspect, then Ctrl+F in the Elements panel for "Add tag". Note whether two inputs exist while only one dialog is visible.
8. Click "Create & continue" two or three more times (dummy titles are fine) and repeat step 6 each time, because the sheet says this happened only "sometimes".
9. If nothing goes wrong at 100%, repeat steps 1-8 once at 150% zoom (Ctrl + several times) to match the pass conditions.
10. Take a screenshot of anything you see: two dialogs, text in the wrong field, or a duplicate input in DevTools.

**Holds if.** After "Create & continue" the form re-opens with an animation and a second (hidden or off-screen) copy of the dialog stays in the page. DevTools shows two "Add tag" inputs. At least once, typed text (title or tag) goes into the hidden copy or the wrong field instead of the visible one, so the tag or title is missing or wrong on the card that gets created.

**If it does not.** If it does not happen at 100% or at 150% zoom with hand input: delete HP-17 from the sheet. Then fix the totals: HacknPlan 27 -> 26, overall 61 -> 60, severity-3 count (HacknPlan 9 -> 8, overall 15 -> 14), the H5 matrix row (HacknPlan 3 -> 2, total 8 -> 7), the arithmetic-check line, '16 findings' in the method note (-> 15), and drop HP-17 from the provisional list in the method note. If it shows up only at 150% zoom: keep it, re-rate it to 2 (a recoverable slip, since you can retype) and say "seen only at 150% zoom" in the row, then fix the severity table. If a duplicate input shows in DevTools but typing never goes astray: re-rate to 1 or 0, because nothing user-facing goes wrong, then fix the severity table. HacknPlan was on the free plan in the sheet's pass, so this is not a plan or trial difference. Do not record it as one.

**Screenshot.** `hp17-create-continue-duplicate-dialog.png`

Result: ______  Date: ______

### HP-18 (HacknPlan, H3 User control and freedom, severity 3, provisional, check first)

Sheet: `heuristic-coding-sheet.md` line 150. About 4 min.

**Claim.** Pressing Cancel on a New task form that already has content in it froze the browser tab, probably because of a native confirm dialog. The sheet marks it "Provisional; to be confirmed". What repeated Cancel and close attempts do was never checked. The method note says it was seen under automated input at 150% browser zoom and may be partly caused by that.

**Setup.** Use a fresh free HacknPlan account (free plan, personal workspace). This is the same plan as the pass, with no trial involved, so a plan difference is not a possible explanation. Create one project (any project type) so the New task form is available. No seed cards are needed. Put browser zoom at 100% and use real mouse and keyboard input.

**Steps.**
1. Open the project and open the New task form. The sheet does not say which button opens it; use the same route as when seeding cards.
2. Type a title, e.g. "Fix restart bug (#588)", and choose a Category (e.g. Programming) so the form is filled in.
3. Click Cancel on the form.
4. Note exactly what happens: (a) a browser-native confirm box such as "Leave/discard changes?"; (b) an in-page HacknPlan confirm; (c) the form closes silently and the content is lost; or (d) the tab stops responding.
5. If a confirm box appears, try both its buttons in turn (redo steps 1-3 for the second one). Check that each does what it says and that the tab still responds afterwards.
6. Repeat steps 1-3 but close the form by any other close control it offers (e.g. an X or the Esc key, if present) instead of Cancel. The sheet says close behaviour was not confirmed in the pass.
7. Optional: set browser zoom to 150% and repeat steps 1-3 once, to see whether zoom matters.
8. Take a screenshot of whatever appears after the Cancel click.

**Holds if.** The finding holds only if, with real input at 100% zoom, Cancel on a filled form leaves the tab frozen or unresponsive, or leaves you stuck with no clean way to either discard or keep the draft. Keep it at severity 3 only if that happens. If Cancel discards the content silently with no warning, recode it as H5 Error prevention (data loss) and rate it again yourself.

**If it does not.** If a native or in-page confirm appears and both buttons work, delete HP-18. That is H3/H5 working correctly; at most add it as a strength. The freeze was most likely caused by the browser-automation layer blocking on a native dialog, so note it in the method note as an automation artefact. If it only goes wrong at 150% zoom, rate it 1-2 and mark it as zoom-dependent. A plan or trial difference cannot explain a mismatch, because the pass was also on the free plan. Also update the HacknPlan counts in the §6 matrix and severity distribution, and the count of severity 3-4 findings in the method note, if you delete or re-rate it.

**Screenshot.** `hp-18-cancel-dirty-form.png`

Result: ______  Date: ______

### HP-25 (HacknPlan, H1 Visibility of system status (plan limit), severity 3, check first)

Sheet: `heuristic-coding-sheet.md` line 157. About 6 min.

**Claim.** On the HacknPlan free plan there is no blocked state: Dependencies and custom Stages are Premium. In T4 the blocked card was found only because "blocked" had been typed into its title (owner from the Dev D tag).

**Setup.** Fresh free HacknPlan account (Personal plan, EUR 0; the pass also ran on free, so no trial was involved). Create one project and one sprint/board. Add only two tasks from the seed: C9 "airlock door animation" (category Art, moved to In progress) and C10 "security console icons" (category Design, tag "Dev D"). Do NOT put "blocked" in C10's title this time; the point is to see whether anything other than the title can mark it blocked. About 5 minutes of setup.

**Steps.**
1. Log in to the free HacknPlan account and open the project board containing C9 and C10.
2. Open C10 "security console icons" (card detail).
3. Look for any blocked / on-hold / flag status in the card detail's status or stage control. Note every option offered.
4. In the card detail, click "+ Add" (as in task T4; the sheet does not record which panel the "+ Add" sits in, so use the one in the card detail that offers extra fields/links) and look for Dependency. Note whether it carries a Premium badge or can actually be added.
5. Try to add a custom board column/stage named "Blocked" (the sheet does not record where this was attempted; look in the board's column/stage settings). Note whether it is badged Premium.
6. Go back to the board and ask T4: "what is blocked, and on whom?" Check whether C10 is distinguishable from an ordinary not-started card by anything visible on the board.
7. Screenshot the card detail showing the Premium badge(s) and the board view.

**Holds if.** No blocked state or flag in C10's status options; Dependency under \"+ Add\" is badged Premium (or viewable but not creatable); custom stages/columns are badged Premium. On the board C10 looks like any other open task, so without "blocked" in the title T4 cannot be answered from the tool; "on whom" is only the Dev D tag. Tier note from tool-selection.md: HacknPlan's "Premium" is really Personal Plus (custom kanban columns/card fields) and the 2024 pricing post says free users can view but not create, modify or remove dependencies.

**If it does not.** If free offers any blocked state, flag or creatable dependency: delete HP-25 (and the T4 row note in 5.2 "No blocked state..."), and remove it from the summary matrix counts. If a workaround exists but is clumsy (e.g. a tag or a column you can rename on free), keep it but re-rate to 2 per the sheet's one-step-lower rule for same-tool workarounds and say so in the row. If the account shows a trial banner (Personal Plus/Studio trial) so Dependencies or stages become available, record it as a plan/trial difference rather than deleting, since the pass was on the plain free plan. Either way, also correct "Premium" to the actual tier name (Personal Plus) in the row.

**Screenshot.** `screenshots/HP-25-hacknplan-no-blocked-state.png`

Result: ______  Date: ______

### HP-24 (HacknPlan, H1 Visibility of system status, severity 3, check first)

Sheet: `heuristic-coding-sheet.md` line 156. About 4 min.

**Claim.** On the HacknPlan free plan, cards show no completion date. Because there is also no activity feed to fall back on (HP-26), "finished this week" cannot be checked anywhere (T2, T6). Rated 3, one step above Trello's TR-14 (rated 2), because Trello has an activity feed as a workaround and HacknPlan does not.

**Setup.** Use a fresh free HacknPlan account and a personal workspace, on the free Personal plan the pass used. Start no trial. Create one project with its sprint board, then add at least two tasks tagged "Dev B" (from the seed: C2 "Add emergency light and light interactions (#610)" and C6 "Rework the container UI (#605)") and move both to the completed/done column. One extra open task is optional. The rest of the seed (C1-C10, other tags) is not needed for this finding. Dev tags are tags, not assignees, as in the seed-differences note. Note: the sheet does not record how a task was marked complete in HacknPlan, so do it whatever way the board offers and flag that in your notes.

**Steps.**
1. Log in to the fresh free HacknPlan account and open the seeded project's board.
2. Run T2 the way the pass did. Try the filter funnel first (it is a dead end that asks you to build a saved filter, HP-23), then use search and type "Dev B".
3. Confirm the two Dev B tasks show as completed (in the pass these were #2 and #6).
4. Look at each completed card on the board for any completion or closed date. Note what date fields, if any, it shows.
5. Open each completed task's detail view and look again for a completion, closed or last-moved date. The sheet does not describe the detail panel, so record exactly what fields you see.
6. Run T6. Click the Notifications bell, then look through the project menus for any activity, history or changelog view that would show when the tasks were completed (the same search as HP-26).
7. Note whether any Premium badge sits on a feature that would show completion dates. HP-27 lists Metrics Export, Timetable and Calendar as Premium, but does not say whether any of them would show dates. Reports > Metrics itself opened on free in T3 (only its Export is Premium), so also check whether it shows any completion dates.
8. Take a screenshot of a completed card's detail view with no date showing.

**Holds if.** The completed Dev B tasks have no completion date on the card or (to be checked) in the detail view. The Notifications bell is empty for a sole user and you find no project activity feed. So with only the free plan, you cannot tell whether the tasks were finished this week.

**If it does not.** 1. If the detail view or anywhere else on free shows a completion or closed date, delete HP-24, or rate it down to 2 if the date is buried. Also re-check TR-14's comparison, since the severity rests on there being no workaround. 2. If a usable activity feed exists on free, rate it down to 2 to match TR-14, and re-check HP-26 too, because the two rest on each other. 3. If dates appear only behind a Premium badge, keep the rating but add "plan limit" to the heuristic column. 4. If the account was put on a trial or a different plan, record that as a plan difference rather than changing the finding.

**Screenshot.** `screenshots/hp-24-no-completion-date.png`

Result: ______  Date: ______

### HP-27 (HacknPlan, H7 Flexibility and efficiency of use (plan limit), severity 3, check first)

Sheet: `heuristic-coding-sheet.md` line 159. About 5 min.

**Claim.** Most producer-reporting features in HacknPlan sit behind Premium: Burndown, Metrics Export, Team and Board dashboards, Dependencies, Timetable, Calendar, Worksheet and the GitHub/GitLab/Bitbucket integrations. The Premium badges make these limits visible (a strength), but on the free plan a weekly report cannot be exported or shared, and no repository link exists (T3, T5, T7).

**Setup.** New HacknPlan account on the free (Personal) plan, with one project in a personal workspace. Add about 4 tasks from the §3 seed that are Art or Programming (for example C2, C4, C5 and C9 "airlock door animation"), each with a category. Put them on the sprint board and close 3, so Reports > Metrics shows numbers. Leave out tags, the blocked card and the rest of the seed, because this finding doesn't need them. The pass also ran on free, so there is no trial difference here.

**Steps.**
1. Log in on a free account and open the seeded project. Confirm the plan is free/Personal and not a trial; if any trial banner appears, write down its name.
2. T3: open Reports > Metrics. Check that the closed/total counts appear, then find the Metrics Export option. Note whether it is badged or blocked as Premium.
3. Look for Burndown under Reports (the sheet does not say where its badge appears, so look where you would expect it for T3). Then check the Team dashboard and Board dashboard in the left navigation, where HP-04 says they sit with a purple rocket badge. Note whether each one carries a Premium badge.
4. T5: open Administration > Integrations. Check whether GitHub, GitLab and Bitbucket are each marked Premium.
5. T7: open the board's '...' menu and look for any public or share link and for Export. Note whether Export is Premium and whether a no-account link exists.
6. Open a card's detail and click + Add. Check whether Dependencies is marked Premium (this overlaps with HP-25).
7. Check the left navigation for Calendar (HP-04 says it carries the rocket badge). Then look for Timetable and Worksheet; the sheet does not say where these are, so record where you found them, or that you didn't find them. Note which are badged Premium.
8. Screenshot the Metrics Export wall (step 2) and the Integrations page (step 4).

**Holds if.** The Premium badges are visible on Metrics Export, Burndown/dashboards, Integrations (GitHub/GitLab/Bitbucket), Dependencies and Timetable/Calendar/Worksheet. The free plan gives no export and no public/share link for a week's progress, and no way to link a repository. Together this means T3 can only be done as a hand-written update, and T5 and T7 fail.

**If it does not.** If export, a share link or a GitHub integration now works on free: HacknPlan has probably changed its plan limits since 14 Oct 2026. Re-rate (drop to 2 if only some features are walled and the weekly report can still be exported or shared), or delete the row if nothing in T3/T5/T7 is blocked. Also update tool-selection.md (line 29, which lists dependencies, GitHub integration, custom columns, burndown and metrics export as out of reach, and lines 22 and 46, which record the same plan limits). Correct the feature list to exactly what you saw. If a trial banner appeared, record the result as a plan/trial difference rather than a finding.

**Screenshot.** `hp-27-premium-walls.png`

Result: ______  Date: ______

### TR-13 (Trello, H7 Flexibility and efficiency (plan limit), severity 3, check first)

Sheet: `heuristic-coding-sheet.md` line 108. About 4 min.

**Claim.** Table, Calendar, Dashboard and Timeline views are Premium ("Views are only available to Premium Workspaces"). On the free features the weekly status update (T3) has to be counted by eye from list headers, and discipline counts need each card's labels opened one by one.

**Setup.** Fresh free Trello account, one board. Lists: Done, Doing, and a custom "Blocked" list. Cards: C1-C8 in Done (titles from the seed in section 3, e.g. "Add sound fall off to airlocks (#611)"), C9 "airlock door animation" in Doing, C10 "security console icons" in Blocked. Use named colour labels for discipline (Art, Audio, Code, UI) and owner (Dev A to Dev E). Apply the discipline labels as in the seed (C2 and C3 are Art and Code; C6 is UI; C1 is Audio; the rest are Code; C9 is Art) and the Dev labels the same way. Owner labels are optional for this finding. Plan note: in the pass, creating the first board automatically started a 14-day Premium trial. The sheet still records the Premium-wall message, even though it says the account was on that trial. It does not say how the wall appeared during a trial (flag this). A fresh account may start the trial again, so record whether the board header shows a trial before you start.

**Steps.**
1. Create the board and seed above (about 10 min; only list placement and discipline labels matter for this finding).
2. Note whether Trello says a Premium trial has started. Write down Free or Trial.
3. Open the board's view switcher, as in task T3. The sheet does not describe where it is or what it looks like, so check this.
4. Try each of Table, Calendar, Dashboard and Timeline. Write down which ones open and which show a Premium message, and copy the exact wording. The sheet's wording was "Views are only available to Premium Workspaces".
5. Using only the board view, do T3: write a five-line weekly status update for a publisher with this week's done count and the count for each discipline.
6. Write down how you got the counts: card totals by eye from the list headers or by counting, and discipline counts by reading the label bars or opening cards one by one. Time it. The pass took about 2 minutes.

**Holds if.** Table, Calendar, Dashboard and Timeline are each locked behind a Premium message. The sheet records T3 as 'Partly' completed in about 2 minutes: Done 8, Doing 1 and Blocked 1 counted by eye from the list headers (check whether the headers show counts or you have to count cards), and the discipline breakdown (2 art, 1 audio, 4 code, 1 UI) needing labels opened card by card. Note whether any other free feature gives counts by list or label; the sheet does not say. If the task is slow and needs that much manual effort, a 3 holds.

**If it does not.** If the views open because a Premium trial is active, do not delete the finding. Record it as a trial difference: the pricing page (trello.com/pricing, read 15 Oct 2026) lists Table, Calendar, Timeline and Dashboard as Premium only. Keep the finding as "plan limit, confirmed from pricing" and screenshot the trial banner. If he can reach a true Free state (trial declined or expired) and the views are still free, delete TR-13. If the views are walled but counting takes him much less effort than described (for example, label text shows on cards and the counts are quick), re-rate it to 2. If the exact wall message differs, update the quote in the sheet.

**Screenshot.** `trello-TR-13-views-premium-wall.png`

Result: ______  Date: ______

### GP-03 (GitHub Projects, H2 Match with the real world (also H7), severity 3)

Sheet: `heuristic-coding-sheet.md` line 212. About 4 min.

**Claim.** When you create a project from the Kanban template, the import step offers only Open issues, Open PRs, or both. Closed issues, which are the week's finished work, are left out unless the user switches to "Add from a search query" and deletes "state:open" by hand. For weekly reporting, the default import drops exactly what a producer wants to report.

**Setup.** Free personal GitHub account (the sheet says free personal account; plan differences should not apply, but note the plan you see). Create a private throwaway repository, for example zz-he-test-gp03 (set it to Private, because it defaults to Public, see GP-01). The sheet's seed had 10 issues, but this finding needs only 3. Create issues with any SS3D seed titles, e.g. "Fix restart bug (#588)", "Rework the container UI (#605)" and "airlock door animation". Close two of them (the original closed them with "Closes #n" commits; how they are closed should not matter for this finding) and leave one open. No labels, commits or other seed data needed.

**Steps.**
1. Signed in to the free account, press New project. Note: the project is created the moment you press New project (GP-02). FLAG: the sheet does not give the menu path to New project, so use whatever route GitHub shows.
2. Choose the Kanban template and give it a name, e.g. "ZZ GP-03 test".
3. Go to the step where the template offers to import items from a repository. FLAG: the sheet does not say exactly where this step appears or what it is called. It says only "Kanban template, import step", so follow whatever the template shows once it is created.
4. Pick the throwaway repository and read the import choices. Write down every option exactly as shown, and whether any of them includes closed issues.
5. Choose the default open-issues option and read the confirmation count (the sheet's pass saw "10 items will be added" for its 10 issues, so expect "N items will be added"). Then check which issues end up on the board.
6. Delete the project, or start again, and this time switch to "Add from a search query". Note whether the query is prefilled with "state:open" (the sheet implies it is, because it says the user deletes it by hand). Delete it by hand (or change it to include closed issues) and confirm the closed issues can now be added.
7. Take a screenshot of the import options and of the query.

**Holds if.** The import choices are only Open issues / Open PRs / both, with no closed or all-issues option. The default import adds only the 1 open issue and leaves out the 2 closed ones. Closed issues can be added only through "Add from a search query" after deleting "state:open" from the query.

**If it does not.** If there is a closed-issues or all-issues option, or closed issues come in by default, delete GP-03 (GitHub may have changed the UI since 14 Oct 2026, so note the date). If closed issues can be added but the option is easy to miss, re-rate to 2 (a workaround exists in the same tool). If the import step cannot be found at all from the Kanban template, write down the path you took and re-word the finding to say how closed items have to be added (e.g. "+ Add item" with a search) before deciding the severity. This is not a plan or trial difference, because the pass was on a free account. Also look at the total after import: if the count says one number but fewer items land on the board, that is GP-04, not this finding.

**Screenshot.** `gp-03-kanban-import-open-only.png`

Result: ______  Date: ______

### GP-04 (GitHub Projects, H1 Visibility of system status, severity 3)

Sheet: `heuristic-coding-sheet.md` line 213. About 10 min.

**Claim.** After a Kanban-template import the confirmation said "10 items will be added", but the project held 9. Issue #1 was silently left out with no warning: work went missing and no error was shown. The cause was not investigated (the sheet guesses the oldest closed item fell outside the import). It is rated 3 rather than 4 because the issue still exists in the repo and Insights showed a count of 9. It would be a 4 if it happens again on re-import.

**Setup.** Free personal GitHub account (the pass also used a free plan, so there is no trial difference). Make a new PRIVATE throwaway repo, e.g. zz-he-recheck-delete-after. Create issues #1 to #10 using seed titles C1 to C8 (#1 = "Add sound fall off to airlocks (#611)" ... #8 = "Create PepperSpray class (#604)"), then #9 "airlock door animation" (leave open) and #10 "security console icons" (leave open). Close #1 to #8. In the original pass they were closed by 8 commits with "Closes #n" in the message. The quick option is to close them by hand. If the gap does not appear, redo it with commits (FLAG: the sheet does not say whether the closing method matters). Labels (Art, Dev B, Dev D) are probably not needed for this finding (assumption, not stated in the sheet).

**Steps.**
1. Start a New project from your GitHub account (FLAG: the sheet gives no menu path, so find New project yourself). Note that the project is created straight away as "@<you>'s untitled project" (GP-02).
2. Pick the Kanban template.
3. At the import step, do not use the default Open issues / Open PRs / both options, because closed issues would be left out (GP-03). Switch to "Add from a search query", choose the throwaway repo and delete "state:open" from the query by hand so closed issues are included. FLAG: the sheet does not record the exact final query text, so use the repo's default query with only state:open removed.
4. Write down the number in the confirmation (the pass saw "10 items will be added") and take a screenshot of it.
5. Confirm or create the project.
6. Count the items across all board columns. Check whether issue #1 is there.
7. Open Insights and read the item count (the pass saw 9).
8. Re-import (FLAG: the sheet gives no re-import method; try adding items again from the same search query) to see whether #1 is dropped again. This decides whether it is a 3 or a 4.
9. Take a screenshot of the board and the Insights count. Delete the repo and project afterwards.

**Holds if.** The confirmation says 10 items, but the project shows 9, and issue #1 (the oldest, closed) is missing. No warning or error appears. Insights shows 9. If #1 is dropped again on re-import, raise the severity to 4, as the sheet says.

**If it does not.** If all 10 items arrive, first redo the setup with #1 to #8 closed by "Closes #n" commits instead of by hand. If all 10 still arrive, delete GP-04. Also remove it from the method-note seed line (heuristic-coding-sheet.md line 14: "added 9 items, not 10... project totals are out of 9") and from needs-catalogue.md N26 (lines 95 and 239), where it is cited next to HP-15. Then note that the GitHub total of 9 in T3 (Insights count) came from a one-off anomaly. If the confirmation itself says 9, or a warning appears, re-rate to 1-2, because the gap is visible. This is not a plan or trial difference: free plan in both cases.

**Screenshot.** `gp04-import-confirm-vs-board-count.png`

Result: ______  Date: ______

### HP-06 (HacknPlan, H4 Consistency and standards (accessibility), severity 3)

Sheet: `heuristic-coding-sheet.md` line 138. About 4 min.

**Claim.** In the accessibility tree, nearly every button and link in the sidebar, and every icon button, has no accessible name. A screen-reader user cannot use most of the navigation. Location: sidebar and icon buttons. Not tied to a task. No screenshot was saved.

**Setup.** A fresh free HacknPlan account with a personal workspace (the free plan, as in the pass) and one project created. Any project type will do. No seed cards are needed, because this finding is about the navigation, not the data. Use desktop Chrome at 100% zoom; the sheet says some other HacknPlan findings (HP-16, HP-17, HP-18) were seen at 150% zoom, and zoom should not affect accessible names. No trial was involved: HacknPlan was on the free plan.

**Steps.**
1. Sign in to HacknPlan on the free account and open the project, so the left sidebar and the left rail of icons are visible.
2. Open Chrome DevTools (F12) and open the Lighthouse tab. Choose Mode: Navigation, Category: Accessibility only, Device: Desktop, then click 'Analyze page load'. Note: the sheet does not say how the accessibility tree was read; Claude read it through browser automation. Lighthouse and the DevTools Accessibility pane are this card's suggestion for doing the check by hand.
3. Under Failed audits, look for 'Buttons do not have an accessible name' and 'Links do not have a discernible name'. Expand each one and count how many of the elements it lists are in the sidebar or left rail.
4. Spot-check two or three sidebar icons by hand: right-click the icon > Inspect, open the Accessibility pane in the Elements panel, and read 'Name' under Computed Properties. Blank or empty means no accessible name.
5. Optional, and the most convincing check: turn on Windows Narrator (Ctrl+Win+Enter) and Tab through the sidebar. Listen for items announced only as 'button' or 'link' with no name. Turn Narrator off again with Ctrl+Win+Enter.
6. Save a screenshot of the Lighthouse failed-audit list, or of the Accessibility pane showing an empty Name.

**Holds if.** Lighthouse flags most of the sidebar and icon buttons and links as having no accessible name or no discernible name. Inspected sidebar icons show an empty Name in the Accessibility pane, and Narrator reads them as bare 'button' or 'link'. If that is what you see, keep HP-06 at severity 3.

**If it does not.** If most sidebar and icon controls do have names, HacknPlan may have fixed this since 14 Oct 2026, or the automated read was wrong. Delete HP-06 and take it out of the HacknPlan severity-3 count and the summary matrix. If only some lack names (say a few icons, not most of the navigation), re-rate it to 2 and change the wording from 'nearly every' to the count you found. It cannot be a plan or trial difference, because the pass was already on the free plan. Note whether you also judge the severity on H4 or on accessibility grounds, because a screen-reader impact is your call to rate.

**Screenshot.** `hp06-hacknplan-sidebar-accessible-names.png`

Result: ______  Date: ______

### HP-09 (HacknPlan, H5 Error prevention, severity 3)

Sheet: `heuristic-coding-sheet.md` line 141. About 4 min.

**Claim.** In the New task dialog, pressing Enter to confirm a new tag submitted the whole form. The task was created before a Board was chosen and the tag was lost, which is why seed card C1 ended up untagged in the Backlog. Enter in a sub-field commits the whole dialog.

**Setup.** Fresh free HacknPlan account (free Personal plan, personal workspace, the same plan as the pass, so no trial is involved). Create one project. The sheet does not record which project type was chosen (Custom / Lite / Documentation / Agile / Full Suite), so pick one that gives you a sprint board, and FLAG this as unrecorded. You need only seed card C1, "Add sound fall off to airlocks (#611)", category Sound (HacknPlan's name for Audio), tag Dev A. Dev A must NOT already exist as a tag, because the finding happened while creating a new tag. No other seed cards are needed.

**Steps.**
1. Use the browser at 100% zoom and real keyboard and mouse input. The pass used automated input at 150% zoom.
2. In the project, open New task.
3. Type the title: Add sound fall off to airlocks (#611).
4. In Category, choose Sound.
5. Leave Board unset for now. Do not choose it yet; the finding is that the form submits before you get to it.
6. Click into the Tag field and type Dev A (a tag that does not exist yet).
7. Press Enter to confirm the tag. FLAG: the sheet does not say whether Enter was pressed in the tag input itself or inside the second 'new tag' modal (name, icon, colour; see HP-10). Try it in the tag input first; if that only opens the new-tag modal, press Enter inside that modal too, and note which one did it.
8. Watch whether the dialog closes and a task is created.
9. Open the Backlog and the sprint board, find the new task, and check its tags and its board.

**Holds if.** After Enter, the New task dialog submits without you clicking Create. A task 'Add sound fall off to airlocks (#611)' now exists in the Backlog (No board), outside the sprint board, and it has no Dev A tag. Note whether anything warned you before it submitted; the sheet does not say either way.

**If it does not.** If Enter only adds the tag, or only opens the new-tag modal, and the form stays open in both places you tried: delete HP-09. Also take out the C1 explanation in method note line 11, or reword it as 'C1 was left untagged in the Backlog for reasons not reproduced'. The sheet's seed tables reference this finding, so fix them too: rework the board totals that say 'out of 9', because they rest on it. If the form submits but the tag is kept, or the board is kept, re-rate it to 2: a recoverable slip, not a misleading result. If the task lands in the Backlog because the Board field reset after you picked Category or Tag, that is HP-15, not HP-09; record it under HP-15. Either way this is not a plan or trial difference, because the pass was on HacknPlan's free plan too.

**Screenshot.** `hp-09-enter-submits-new-task.png`

Result: ______  Date: ______

### HP-15 (HacknPlan, H1 Visibility of system status, severity 3)

Sheet: `heuristic-coding-sheet.md` line 147. About 5 min.

**Claim.** In the New task form, choosing a category or tag sometimes reset the Board field to "No board (backlog)" with no notice, so a card can land outside the sprint board without the user knowing.

**Setup.** Fresh free HacknPlan account, Personal (free) plan, personal workspace (same plan as the pass, so no trial difference applies). Create one project. The sheet does not record which project type was chosen (Custom / Lite / Documentation / Agile / Full Suite); pick one that gives you a sprint board (the pass's board was "Sprint 1", per the T3 note). FLAG: project type is not in the sheet. You need only 2 to 3 seed cards from §3, e.g. C2 "Add emergency light and light interactions (#610)" (category Art, tag Dev B) and C4 "Add RigidBody to airlocks to fix their interaction (#608)" (category Programming, tag Dev A); C1 (category "Sound", tag Dev A) is the card that ended up in the Backlog during the pass. Tags must exist or be created via the new-tag modal.

**Steps.**
1. Open the project and open the New task form (as in the seeding for task T1-T7; the sheet does not name the button).
2. Type the title of C2 in Title.
3. Set the Board field to the sprint board (e.g. "Sprint 1") FIRST, and check that the field shows it.
4. Choose the category (Art) from the Category combobox. Look at the Board field again: note whether it now reads "No board (backlog)".
5. Add a tag (Dev B). Use the mouse to confirm the tag, not Enter, because Enter submits the whole form early (HP-09). Do not type while focus is outside an input, because single-letter shortcuts open dialogs (HP-16). Look at the Board field again.
6. Create the task, then open the sprint board and the Backlog and see where the card actually is.
7. Because the sheet says "sometimes", repeat steps 1-6 for 2 more cards (C4, C1), also trying the order tag-then-category, and with "Remember fields" on (it keeps Category but not Board, HP-13). Note which order triggered the reset.
8. If it happens, take a screenshot of the Board field showing "No board (backlog)" after you had chosen the sprint board.

**Holds if.** At least once in about 3 cards, after a sprint board was chosen, picking a category or tag silently switches the Board field back to "No board (backlog)": no message, toast or highlight; the created card then appears in the Backlog and not on the sprint board.

**If it does not.** If the Board field never resets in 3 to 5 cards across both orders, delete HP-15 (it may have come from the automated input at 150% zoom, like HP-16 to HP-18), and edit the N26 rows in needs-catalogue.md (lines 95 and 239), which cite HP-15 as evidence of a card dropping out of the board. If it resets only when Board was set before a sub-modal (new-tag modal) or after Create & continue, keep the finding but reword it to that trigger; consider re-rating to 2 if a careful user would notice it. Plan difference does not apply (the pass was also on the free Personal plan).

**Screenshot.** `hp-15-board-reset-to-backlog.png`

Result: ______  Date: ______

### HP-26 (HacknPlan, H1 Visibility of system status (plan limit), severity 3)

Sheet: `heuristic-coding-sheet.md` line 158. About 4 min.

**Claim.** On the free plan, the Notifications bell was empty for a sole user and no project activity feed was found, so T6 ("what changed since last Monday") could not be answered in HacknPlan. Combined with HP-24 (no completion dates on cards), "finished this week" cannot be checked anywhere on free.

**Setup.** Fresh free HacknPlan account, personal workspace, free plan. Do not start a trial; the original pass was also on free. Create one project and add only 3 or 4 seed cards, for example C2 "Add emergency light and light interactions (#610)" tagged Dev B, C6 "Rework the container UI (#605)" tagged Dev B, C9 "airlock door animation" (Art, in progress) and C10 "security console icons (blocked - waiting on art)" tagged Dev D. Then make a few changes for a feed to record: move C2 and C6 to done, edit a tag on C9 and rename C10. You do not need the full 10-card seed, because this finding is about whether any change history is visible, not about counts.

**Steps.**
1. Sign in as the only member of the workspace. Open the project and its board.
2. After making the setup changes, run T6: "Find what changed since last Monday that you did not already know about", using the activity feed, notifications or history.
3. Click the Notifications bell (shortcut N, per the sheet). Note whether it lists your own moves, edits and renames, or is empty.
4. Look for a project-level activity or history feed in the project's own menus and navigation, the way you would on a first visit. FLAG: the sheet says only "no project activity feed was found" and does not record which menus were checked, so note each place you look.
5. Also open one of the cards you changed (for example C2) and check whether the card detail shows any history of changes. The original notes do not mention this. If it exists, it is a workaround that bears on the rating (see if_not).
6. Spend about 2 minutes in total, as in the original pass (T6 took ~2 min and ended with N), then stop and record the result.

**Holds if.** The Notifications bell is empty, or shows nothing of your own changes, because you are the only user. No project activity feed exists or can be found on the free plan. You cannot tell what changed since Monday, or when, so T6 fails (N).

**If it does not.** If you find a free project activity feed that lists changes with times, delete HP-26, re-rate HP-24 (which relies on "no activity feed to fall back on") down to 2 and change T6 from N. If the only workaround is per-card history or a filter that lists changed items but not what changed, keep the finding and re-rate it to 2 so it matches GitHub's GP-08 under the one-step-lower rule for workarounds, then update the row's wording. If the feed exists but sits behind a Premium badge, keep the finding at 3 as a plan limit and name the paid tier in the row. If the bell does show your own changes, rewrite the first half of the description and re-judge severity. In every case, update the summary and severity counts. There is no trial difference here, since HacknPlan was on free in the original pass too.

**Screenshot.** `hp-26-notifications-empty-no-activity-feed.png`

Result: ______  Date: ______

### JI-05 (Jira, H2 Match with the real world, severity 3)

Sheet: `heuristic-coding-sheet.md` line 185. About 5 min.

**Claim.** The new Jira project used help-desk wording for game work: work type "Incident", board columns Waiting for Customer / Disregarded / Resolved, and an "Improve Incident" button on every item. A different template would fix this, but nothing during project creation said the template choice mattered.

**Setup.** Fresh Jira Cloud site on a free Atlassian account. During the pass the site was on a Standard trial, not Free; write down which plan or trial your new site shows. The finding needs only one or two work items from the §3 seed, for example C1 "Add sound fall off to airlocks (#611)" and C7 "Fix restart bug (#588)". Labels, flags and the other cards are not needed. The sheet does not say which onboarding screen chose the template. It records only the result: a service-style template, project "RaphaelQonus - Project", key SCRUM, columns To Do / In Progress / Waiting for Customer / Disregarded / Resolved.

**Steps.**
1. Sign up for Jira on a free account and create a new site. Write down the plan shown (Free, or a Standard trial as in the pass).
2. Go through the project-creation or onboarding flow, accepting the defaults the way a first-time producer would. FLAG: the sheet does not record these screens. At each one, note whether a template or project type is offered, what the default is, and whether anything explains that the choice sets the work types and columns. This half of the finding rests on that.
3. Open the new project's board and read the column names. In the pass they were To Do / In Progress / Waiting for Customer / Disregarded / Resolved.
4. Create one work item in the first column with the + at the top of the column (C1, as in the seed). Check which work type it gets. In the pass it was 'Incident'.
5. Open the item and look for an 'Improve Incident' button. Create a second item (C7) to confirm the button appears on every item.
6. Screenshot the board columns and the open item with its work type and button visible.

**Holds if.** The default flow, with no clear signal that the template matters, ends in a service or help-desk style project. The board shows Waiting for Customer / Disregarded / Resolved columns, new items are typed "Incident", and each item shows an "Improve Incident" button. These are customer-support terms where a producer expects game-production terms.

**If it does not.** The finding can fail in two ways. (1) The default flow gives a software template (Scrum or Kanban, with stories, tasks and bugs, and To Do / In Progress / Done), or it clearly asks you to choose a template type. The service template in the pass was then probably picked by accident or came with the Standard-trial onboarding. Record it as a plan or onboarding difference. Either delete JI-05 or drop it to 1-2, re-worded as "the wrong template is easy to pick". (2) The help-desk words appear, but creation clearly warned that the template sets the vocabulary. Keep the H2 wording problem, remove the "nothing at creation said" clause and re-rate it to 2. In every case update the §6 summary matrix and severity counts.

**Screenshot.** `ji-05-helpdesk-template.png`

Result: ______  Date: ______

### TR-07 (Trello, H6 Recognition rather than recall, severity 3)

Sheet: `heuristic-coding-sheet.md` line 102. About 4 min.

**Claim.** The default Trello labels are unnamed colours, and on the board they show as thin colour bars with no text. You can't tell at a glance who owns a card or which discipline it belongs to: you have to remember what each colour means. In T4 the purple bar had to be read as Dev D, or clicked to expand the label text. Readable label text on the card was expected.

**Setup.** Use a fresh free Trello account. Creating the first board starts the automatic 14-day Premium trial; this was also the state during the pass, and nothing in this finding depends on Premium. Make one board with lists "Doing", "Blocked" (the custom list the pass added) and "Done". Create named labels for Dev B, Dev D, Art and Code, giving Dev D the purple colour as in the pass. Add 3 cards from the seed: C2 "Add emergency light and light interactions (#610)" in Done with Art, Code and Dev B. C9 "airlock door animation" in Doing with Art. C10 "security console icons" in Blocked with Dev D. Flag: the method note says the labels were "named colour labels", but the row says "default labels are unnamed colours". Name the labels, which is the harder test: the claim is that names still don't show on the board.

**Steps.**
1. Create the board, the three lists, the named labels and the three cards as in Setup. Assign labels from the card back (the card detail view); the sheet does not record the exact menu path.
2. Close every card and go back to the board view.
3. Look at the C10 card in the Blocked list without clicking anything. Note whether the Dev D label shows as text or only as a purple bar.
4. Look at C2 and C9 the same way. Can you tell the discipline (Art/Code) and the owner (Dev B) from the board alone?
5. Do T4 ('Find what is blocked or at risk, and on whom') using only the board view. Record whether you can answer 'on whom' without remembering that purple = Dev D.
6. Click one label bar on a card. The sheet says this expands the label text; note whether it does and whether it stays expanded across cards.
7. Take the screenshot of the board with the labels collapsed.

**Holds if.** On the board, labels show as thin colour bars with no text. Finding the owner in T4 means remembering that purple is Dev D, or clicking to expand the labels. The label names appear only inside the card or after expanding.

**If it does not.** If label text shows on the board by default (including on a non-trial free board), delete TR-07, or cut it to severity 1-2 if the text appears only after a single persistent click-to-expand. Also update the HP-05 row, which is rated against TR-07. If the result differs between the Premium trial and the free board, record it as a plan or trial difference, not a usability problem.

**Screenshot.** `TR-07-trello-label-bars.png`

Result: ______  Date: ______

### TR-12 (Trello, H9 Recover from errors (also H2), severity 3)

Sheet: `heuristic-coding-sheet.md` line 107. About 5 min.

**Claim.** In task T2 ("See what Dev B finished this week"), typing the keyword "Dev B" in the board filter returned only "Fix restart bug (#588)", a card with no Dev B label, and missed both Dev B cards (#610 and #605). Nothing explained why, so the result looked like an answer and was wrong. Ticking the Dev B label lower in the same filter panel did work.

**Setup.** Use a fresh free Trello account and create one board. Note: creating the first board started an automatic 14-day Premium trial during the pass, and it will probably do the same for you. That is fine here because the keyword filter is not a Premium feature, but write down which plan the board shows. Lists: Done, Doing, and a custom "Blocked" list. Add the ten seed cards with the titles exactly as in §3 of the sheet: C1 "Add sound fall off to airlocks (#611)", C2 "Add emergency light and light interactions (#610)", C3 "Make floor sign openable/closeable (#609)", C4 "Add RigidBody to airlocks to fix their interaction (#608)", C5 "Optional connections for wires & pipes (#607)", C6 "Rework the container UI (#605)", C7 "Fix restart bug (#588)" and C8 "Create PepperSpray class (#604)" in Done, C9 "airlock door animation" in Doing, and C10 "security console icons" in Blocked. Create named colour labels Dev A to Dev E (the seed used labels because no tool allows a fictional assignee). As a minimum, put Dev B on C2 and C6 and Dev E on C7. Adding the other Dev and discipline labels from the seed table makes the board more faithful, but this finding does not depend on them. The sheet does not record which colour went with which Dev label (TR-07 only says Dev D was purple).

**Steps.**
1. Open the seeded board in the web app.
2. Open the board's Filter panel. The sheet gives this only as 'Filter panel' / 'Filter keyword' (as in task T2), and the button's exact place is not recorded.
3. Type Dev B into the filter panel's keyword field (the sheet does not record where in the panel it sits). Do not tick anything else.
4. Write down which cards stay visible, and whether any message or hint explains how the keyword matched.
5. Clear the keyword, then scroll down to Labels in the same panel and tick the Dev B label.
6. Write down which cards stay visible now. Take a screenshot of each state (keyword result and label result) for the spec.

**Holds if.** The keyword "Dev B" leaves "Fix restart bug (#588)" visible (or another card without the Dev B label) and hides both Dev B cards, "Add emergency light and light interactions (#610)" and "Rework the container UI (#605)". No message explains the match. Ticking the Dev B label under Labels shows #610 and #605 in Done.

**If it does not.** If the keyword "Dev B" correctly returns #610 and #605, or returns nothing at all with a clear "no results" state, delete TR-12. Then edit the T2 row of the Trello task log ("Keyword search misled (TR-12)") and recount the summary matrix and severity table (Trello H9, severity 3). If the keyword does return wrong or partial results but Trello shows some hint about how it matched, re-rate to 2. If the result depends on the plan (for example it differs once the Premium trial has ended, or on a board that never had the trial), keep the finding but record it as a plan or trial difference, because the pass ran on an automatic Premium trial. Severity is Claude's judgement, so re-rate it if you disagree.

**Screenshot.** `TR-12-keyword-dev-b.png (plus TR-12-label-dev-b.png for the working label filter)`

Result: ______  Date: ______

## Part B: accept or change

Write "accepted" or the change next to each line, with the date.

### Step 1: Glance at the four pricing pages and overwrite the checked date (5 min)

Where: tool-selection.md, 'The four picked' table and 'Answers to the four plan questions'

How to check: Open trello.com/pricing, hacknplan.com/pricing, atlassian.com/software/jira/pricing and github.com/pricing. Compare each with its row and change the date. If you have a Free Jira site, look for the Summary tab.

- [ ] Trello Free as found: 10 boards and 10 collaborators per Workspace, unlimited Power-Ups, 250 command runs a month; Calendar/Timeline/Table/Dashboard/Map views and 'Simple data export' are Premium (trello.com/pricing)
- [ ] Trello Free has no CSV export: CSV is Premium, Free exports JSON only (the JSON statement comes from a search-result summary, not a quote from the page)
- [ ] HacknPlan Personal (free): unlimited users and projects, progress metrics. Paid: GitHub integration (Personal Plus or Studio), custom kanban columns and card fields (Personal Plus), metrics export and burndown (Studio only). Editing dependencies is paid; free accounts can view them
- [ ] Jira Free: 10 users, 2 GB, 150 automation steps. These figures come from Atlassian's support page because the pricing page loaded only its title
- [ ] Jira Free Summary tab is unverified. The file says one minute on a Free Jira site settles it; until then, cite the Jira T3 result as 'on a Standard trial'
- [ ] GitHub Free: Issues and Projects are included; the burn-up chart is documented but no plan is stated, so treat it as consistent with the pass, not confirmed
- [ ] Overwrite each 'Checked 15 Oct 2026' with your own date
- [ ] Optional, from 'Considered and not picked': if Codecks has a current free tier, the file says it could replace Trello or Jira

### Step 3: Read the Jira T3 update and recheck the summary matrix (5 min)

Where: heuristic-coding-sheet.md §5.3 (Task outcomes, T3 row) and §6

How to check: Read the T3 row in §5.3. If step 2 deleted or re-rated anything, fix that tool's cell in both §6 tables and redo the three arithmetic checks under them (column, row and severity sums = 61).

- [ ] Accept the T3 text Claude wrote on 15 Oct from the recorded figures: '8 items completed in the last 7 days (2 art, 1 audio, 4 code, 1 UI). Airlock door animation in progress. Security console icons flagged as blocked, waiting on art (Dev_D). Totals on the Summary also count 2 older items not part of this week.'
- [ ] Accept T3 as 'Y / partly'. Summary totals (12 updated, 12 created) include the 2 items that were already on the site, and the result was seen on a Standard trial, not Free
- [ ] Matrix totals stay as they are unless step 2 changed a row: Trello 16 (3), HacknPlan 27 (4), Jira 8 (3), GitHub 10 (3), 61 in all; severities 1: 7, 2: 38, 3: 15, 4: 1
- [ ] Accept the caveat that the counts are not a ranking of the tools. The two cross-tool patterns kept are H1 = 12 problems and H10 = 0
- [ ] Note: JI-05 (help-desk template words, severity 3) is Jira's only severity 3 finding

### Step 4: Confirm the trials lapse with nothing to pay (2 min)

Where: No file; trial details are in heuristic-coding-sheet.md, method note 'Plans seen'

How to check: Later on, open Trello's Workspace billing page and the Atlassian site's billing page. Check that no payment method is attached and that each plan reverts to Free or ends.

- [ ] Trello: a 14-day Premium trial started automatically on 14 Oct 2026 when the first board was created. By arithmetic it ends about 28 Oct 2026 (the files give no end date). Confirm it ends without a charge
- [ ] Jira: the rafaelqonus.atlassian.net site is on a Standard trial. Confirm it ends without a charge (the file does not give the trial length)

### Step 5: Spot-check the ads and reviews; decide on V5 (15 min)

Where: job-ads-and-reviews.md §2.1–2.3 (ads), §3 (reviews)

How to check: Open three ad URLs from §2 and search the page for the §2.1 phrase. Open the G2 Trello pros-and-cons page and the Capterra HacknPlan reviews page and find V1–V4 by reviewer name and date. Record V5's fate in §3, and in needs-catalogue §5 if you score a replacement.

- [ ] Spot-check three of the ten verified ads (A01–A10). A09 is verified only through two mirrors because the Teamtailor URL returns 410 Gone
- [ ] Accept the SR rule: SR only for progress or status reporting to leadership or internal stakeholders. So A09 is not SR, A06 is EXT only (clients are external) and A07 is SR ('stakeholders and teams')
- [ ] Accept the code changes in §2.3. The log has 13 rows, of which 7 change a code (A01 +SR, A03 −BLD, A04 −KC, A05 −EXT, A06 −SR, A07 −EXT, A09 −CH −SR? +RK +TN); the other rows fix locations, status, quotes and sources. needs-catalogue.md §5 calls them '13 code changes', which overstates it. The resulting counts are SR 4, EXT 2, SR or EXT 6, RK 5, DP 4, XD 4, MS 8, CH 3, DOC 5, BLD 1, TN 7, KC 0
- [ ] Accept that KC = 0: no ad asks to know what changed. Also accept reporting that no ad is confirmed live (6 closed, 1 probably closed, 3 unclear)
- [ ] Spot-check V1 (Trello, Muhammed A., 1 Aug 2026), V2 (Trello, Nitin V., 9 Jun 2026, marked Incentivized), V3 (HacknPlan Capterra, Ole J., 26 Oct 2023) and V4 (HacknPlan Capterra, Senior Producer, 16 Jul 2018)
- [ ] V4 is dated 2018. The file says to keep it only if dated sources are acceptable; it is the only review by someone in a producer role
- [ ] State that the HacknPlan reviews come from Capterra, not G2
- [ ] V5 (Jira, G2) was not found on the live page. Decide: replace it with a verified Jira review or drop it and say so. It scores 0 now. If dropped it stays 0; a verified replacement would score a point for whatever need you code it to (V5's own code, XD, feeds N01 only). That cannot change the top ten, because N01 is already 5th on 10 points
- [ ] Stale text to fix: the 'Read this first' bullet and the closing 'Sources' paragraph still say the reviews are unverified or unretrievable, but §3 now says V1–V4 are verified

### Step 6: Accept the live-page quote check and the P1, P4, P6 settlements (10 min)

Where: published-sources.md §7 (and §2 source table)

How to check: Open the P1, P4 and P6 URLs and confirm the bio line, the missing byline and the date. Optionally open P5 and search for 'clued into'.

- [ ] Accept the result: all six URLs were opened and every quote matched verbatim except two P5 wordings and one P3 quote that was cut short
- [ ] The P5 Q4 quote is now 'keeping everyone clued into what was going on with the project'. P5 Q3 now reads 'closer to 20 hours' (a paraphrase). The P3 gray-box quote is now completed with 'after we started pre-production'
- [ ] Paragraph numbers are dropped (the fetch tool's counts differed between passes); cite section headings instead
- [ ] P1 is settled as 'Coray Seifert, Director of Production at Experiment 7 (per the article's closing bio, 2017)'. The About-the-Author box (Large Animal Games) is treated as an older profile
- [ ] P4 is settled as having no byline: cite 'Game Developer staff / no byline' and name the speakers, Matt Cox and Kayla Belmore. Its canonical URL is under /gdc-2023-updates/
- [ ] P6 is settled as dated 16 Oct 2025 (UTC, from the raw HTML; 17 Oct in Australia). The byline is Angeleen Arellano; CAGD; no school is named
- [ ] Accept the stated limits: no Australian source; P3 and P4 are journalists' accounts of GDC talks (second-hand); P2 and P1 sit on tool-vendor or tool-fan sites
- [ ] Stale text: §7 says 'I have not edited them' about the corrections, but §3 shows they were applied. The 'Status' paragraph at the top still says every quote must be matched against the live page and that this check is still Raphael's job. §1 still opens with the ethics rationale; per README, give time as the reason

### Step 7: Accept or change the seven recodes and the cap of 2 (10 min)

Where: published-sources.md §3 (recode table after P6) and §5

How to check: Read the recode table at the end of §3 against each source's rows, then recount §5 by hand: one point per source per need, capped at 2.

- [ ] Recode 1: P2 Q3 contingency, from N04 (partly), s3 and NEW-2 to N27 only. Non-development time on the clock is capacity, not untracked work
- [ ] Recode 2: P2 Q2 Slack reminders, from N02 a2 to N26. Reminders to log time serve tracker freshness (P2 still supports N02 through its Q7 row)
- [ ] Recode 3: P3 Q9 Notion vision, from N23 d2 to none. The game's vision is not next week's work
- [ ] Recode 4: P3 Q3 meeting size, from N01 a2 to none. The link rested on an unverified paraphrase; the page says only 'six or less people'
- [ ] Recode 5: P3 Q4/Q9 gray box, from N09 NEW-3 to N09 N14. NEW-3 is folded into N14; the quote is completed
- [ ] Recode 6: P1 Q4/Q9 and Q7, from Ko a3 to none. The catalogue no longer links a3 to N25
- [ ] Recode 7: P6 Blocked, from Ko c3 to 'none (Ko §4)'. The catalogue no longer links c3 to N07
- [ ] Resulting tally changes: N04 1→0, N01 2→1, N23 2→1; NEW-3 is counted under N14. Top counts: N17 5, N09/N26/N02 4, N03 3
- [ ] Cap of 2 points per need for the source stream. Rationale: it matches A2's two interviewees, and sources are weaker than interviews. Effect: only tenth place changes (N12 with the cap, N02 without)
- [ ] Minor: the §3 header says 'recoded five rows' but the recode table lists seven

### Step 8: Accept or rewrite the three-point reconciliation (10 min)

Where: published-sources.md §6.1 (table and 'In words')

How to check: Once step 2 is done, confirm that HP-25, HP-27, HP-24, GP-09, GP-10 and TR-14 survived (TR-13 only matters for the §6 D1 row). If any was deleted or re-rated, edit the point that cites it, and the matching line in design-spec.md §5.

- [ ] Accept leaving out D4 (capacity: the pass did not test it) and D5 (discipline visibility: the pass agrees with the sources, so it is stated as an agreement, not counted)
- [ ] Point 1, blocked work. P6 treats Blocked as 'an immediate red flag'. Inspection: about 10 s in Jira (flag) and Trello (custom list); no blocked state in HacknPlan free (HP-25); a tiny red dot in GitHub (GP-09). The disagreement is with the general habit, not with P6's own tool (Jira). Consequence: ChangeLens cannot see blocked work (N07) and must say so in RS8
- [ ] Point 2, keeping the tracker current. P1, P2, P5 and P6 describe human workarounds. Inspection: GitHub 'Closes #n' commits closed issues and moved them to Done with nobody touching the board, but only because the evaluator wrote every commit to cite an issue (GP-10; UXF 20 of 100, Inkform 0 of 126). HacknPlan and Trello cards show no completion date (HP-24, TR-14). Consequence: the repository is an independent check on a stale board (N26)
- [ ] Point 3, the tracker as the weekly report. P1 (Hansoft dashboards) and P2 (time logs) describe a report the tracker gives. Inspection: every T3 update was written by hand; sharing without an account was partial in three tools and impossible in HacknPlan free (HP-27); Trello Free has no CSV; Jira Free's Summary is unverified. P6 agrees with inspection. Consequence: pasteable facts plus an exportable file (N25)
- [ ] Accept that the substitution ('inspection and the published sources' in place of 'inspection and interviews') is stated wherever the measure is reported
- [ ] The severity 3 findings the points rest on are HP-25, HP-27 and HP-24 (the file's own sentence named TR-13 in place of HP-24 until 17 Oct 2026; TR-13 is not cited in §6.1). TR-14, GP-09 and GP-10 are severity 2. HP-24, HP-25 and HP-27 are part of step 2. No point rests on a provisional finding

### Step 10: Accept the seven Ko et al. fixes (5 min)

Where: needs-catalogue.md §1 (Step 10 check log)

How to check: Open the Ko PDF at §4, §5.1, §5.6, §5.7 and Figure 4 and compare with fixes 1–5. The PDF is not in the D1 worktree (its reading/ folder holds only READING-KIT.md); it is in the main checkout at Comp3180D3work/reading/ko2007.pdf. READING-KIT.md warns the PDF's text layer can drop digits, so read any number off the page image, not from copied text.

- [ ] Fix 1, c2 wording: the paper reads 'data structure of function', now quoted verbatim with [sic]
- [ ] Fix 2, c3 to N07 was wrong. c3 is about an API's usage rules; blocking appears only in Ko §4, which is not one of the 21 types. c3 is now 'No', and N07 gets no Ko point
- [ ] Fix 3, a3 to N25 was wrong. a3 is a developer recovering their own working state (one participant, V). a3 is now 'No', and N25 gets no Ko point
- [ ] Fix 4, d2 to N23 was wrong in direction. d2 is about intent; it now feeds N10. N23 is seeded by Endsley L3 only and gets no Ko point
- [ ] Fix 5, the worded list is Figure 4, not Figure 3. Cite the §5 wording, not Figure 4's (Figure 4 words s3/d4/c3/r2 differently and mislabels c2 and b1)
- [ ] Fix 6, softer readings kept as 'Partly': s1 (author's pre-check, here asked afterwards), b2 (one bug's cost widened to the backlog), d1 (purpose, not name)
- [ ] Fix 7, confirmed correct: 17 developers, Microsoft, 21 types, 7 categories, §5 wording for the other 18 types
- [ ] Result: 14 of 21 types kept fully or partly; 7 dropped (c1, c2, c3, s2, u1, u3, a3)

### Step 11: Accept or change the merges, additions and rewordings (10 min)

Where: needs-catalogue.md §3 and §7 ('Needs edited')

How to check: Read the §7 'Needs edited' table against the §3 rows for N05, N12, N14, N03, N20, N25, N26 and N27.

- [ ] Merge N06 into N05 ('Which scenes and prefabs changed, named as a designer would name them?'). Same question, same artefact (U); two rows would let the asset layer count twice on the D3 sheet
- [ ] Merge N13 into N12 ('Which art, audio and other content files were added or removed this week?'). Both are git status letters on content paths; N13 had no evidence of its own
- [ ] Add N26 (was NEW-1), 'Can I trust what the tracker says: is it up to date and complete?'. Evidence: P1, P2, P5, P6; DOC in 5 ads; HP-24, TR-14, GP-04, HP-15 ('complete' comes from GP-04 and HP-15)
- [ ] Add N27 (was NEW-2), 'Who is available, and how many hours does the team really have?' (P2, P5)
- [ ] Fold NEW-3 (playable build, P3 only) into N14, now 'Is there a working build of this week's game, and if not, what broke?'
- [ ] Reword N03 to add 'and when' (HP-24, TR-14)
- [ ] Reword N25 to add sharing with someone who has no account (T7, JI-08, HP-27)
- [ ] Reword N20 from 'effort' to 'work' (changed-file entries are not effort)
- [ ] Considered and not added: a separate 'discipline labels readable at a glance' need (TR-07, GP-05), treated as a display problem of N01
- [ ] Count stays at 25

### Step 12: Accept or change the 75 marks and the three rejected-artefact cases (20 min)

Where: needs-catalogue.md §2 (D/P/N definitions), §3 (marks), §3.1 (cases), §7 'Marks changed'

How to check: For the other marks, check §2's D/P/N definitions against each row's 'One-line reason' column, one source (T, then R, then U) at a time. Then confirm the totals: T D2 P18 N5; R D5 P10 N10; U D5 P5 N15 (75 cells). Also confirm the best-source tally: R 6, U 3, T 5, T+R 3, Person 7, T or Person 1. If you change a mark, update the totals, §7 and HANDOFF-TO-D3.md.

- [ ] The §2 definitions: D = the artefact answers the need under normal use; P = only if someone adds something (a tag, an issue number, an estimate) or it gives a proxy; N = nothing in the artefact holds it
- [ ] Changed: N20 R = D became R = P. Changed-file entries are a proxy for where work went, not effort or time (P5 talks about time)
- [ ] Changed by merge: N05 is T P / R P / U D (N06's T = N dropped; the file says a scene name in a ticket is common enough for T = P). N12's merged marks are unchanged at T N / R D / U D
- [ ] Seeds changed, marks unchanged: N07 seed c3 became Ko §4; N23 seed d2 became Endsley L3
- [ ] Contested and kept: N03 T = D and N15 T = D. UXF gave both 'Partly', and the file says you may prefer T = P (if so, change it in §3, §4 and HANDOFF-TO-D3.md)
- [ ] Contested and kept: N01 R = D, accepting that a file category stands in for a discipline (a programmer can edit a prefab); the page says so
- [ ] Case 1, N07 'What is blocked, and on whom?': repository rejected (R = N). A commit gap looks the same whether someone is blocked, ill or working outside the repo; even the tracker holds it only by convention (HP-25, GP-09, P6)
- [ ] Case 2, N10 'Why was this change made?': asset layer rejected (U = N). Scene and prefab text records values, not intent; UXF a542376 'fix #46' has its reason in the issue thread (6 comments), and Ko d3 was unsatisfied in 44% of searches. R stays P
- [ ] Case 3, N27 'Who is available, how many hours?': repository rejected (R = N). Timestamps record when work was saved, not hours or holidays; UXF has 7 of 9 commits by one person on three days; P2 and P5 plan from time logs and holidays
- [ ] Alternatives you can swap in: N23 (repository rejected, but obvious) or N26 (tracker rejected as sole source, but T is P, so the rejection is only partial). The draft's N23 case was replaced by N27

### Step 13: Accept the UXF week and the six verdicts (5 min)

Where: needs-catalogue.md §4

How to check: Open the commits link in §4 (master, since 2020-11-09 until 2020-11-15) and issues #2, #9, #45–#49, and confirm the counts. This is also where you decide whether N03 and N15 move to T = P.

- [ ] Week-selection rule, fixed before looking at the needs: the most recent week with 4 or more non-merge commits on master, 2 or more human authors and 3 or more human issue or PR events. That gives Monday 9 to Sunday 15 Nov 2020 (UTC); later weeks fail the rule (Sep 2026 is one human plus Dependabot; 2021 and 2022 weeks have one author each)
- [ ] Week facts: 9 non-merge commits (Jack Brookes 7, Matthew Warburton 2), 4 issues opened, PR #47 merged, 6 issues closed, 2 of 9 commits cite an issue, 2 reach issues through PR #47, 5 linked to nothing
- [ ] N02 = Y: history names both authors. Git names and GitHub logins differ (Matthew Warburton vs mwarb), so a tool has to map them
- [ ] N03 = Partly: 6 closed with dates, but no milestones; 3 of the 6 (#45, #48, #49) were opened and closed within 0–2 days
- [ ] N04 = Y by composing T and R: 5 of 9 commits cite no issue, and all of them are small
- [ ] N09 = N: 0 milestones and no due dates
- [ ] N15 = Partly: by label, 1 fixed and 0 opened; by reading, 3 fixed (#2, #46, #48) and 2 opened
- [ ] N22 = Y: manifest.json and ProjectVersion.txt did not change that week. But bug #46 came from an outside user's Unity version, which history cannot show

### Step 14: Accept the rule, the map and the ranks; re-run the count if anything changed (5 min)

Where: needs-catalogue.md §5 (and §6 pass points)

How to check: If steps 2, 5, 7, 12 or 13 changed anything (an ad code, a review, a source code, a pass outcome or a mark), redo the §5 table by hand from its columns and update HANDOFF-TO-D3.md. Otherwise, add up two or three rows to confirm the totals.

- [ ] Rule: one point per published source (capped at 2), per tool whose task failed or was partly done (0–4), per ad (0–10), per verified review (0–5) and per Ko type (0 or 1)
- [ ] Pass-point counting: 'Partly', 'N' and 'Y / partly' each score 1; 'N (not tested)' scores 0; at most 1 per tool
- [ ] Code-to-need map: SR and EXT → N25; RK → N08; DP → N07; XD and KC → N01; MS → N09, N03, N17; CH → N24; DOC → N26; BLD → N14 and N11; TN → none. XD's earlier links to N05, N12 and N20 are removed
- [ ] Reviews score only once verified: V1–V4 score, V5 scores 0
- [ ] Tie rule: more kinds of evidence first, then a published source; for runners-up only, then the higher uncapped source count, then the lower ID
- [ ] Ten for the D3 sheet: N01, N03, N07, N08, N09, N12, N17, N19, N25, N26 (ranked N09 15, N25 13, N17 12, N03 12, N01 10, N07 8, N26 7, N08 7, N19 6, N12 5)
- [ ] Runners-up: N24 (4), N11, N14, N02, N15 (3 each)
- [ ] Robustness checks: without reviews, the same ten come out; without the cap, N02 replaces N12; with the provisional codes, tenth place was N24
- [ ] Fragile point: tenth place. N12's 5 rests on 4 T1 pass points from one AI evaluator; if the step 2 hand check changes T1, N12 can drop below N24
- [ ] Headline finding to accept: among the ten, only N01 and N12 are best answered by the repository (across all 25 the repository is best source for 6); N05 ranks 23rd of 25; producers ask most for plan-side information ChangeLens does not read
- [ ] Stale text: needs-catalogue.md §6 intro says it 'does not fill the Evidence count column in §3', but that column is now filled

### Step 15: Read and edit the spec; put it in your own words where you will quote it in A3 (20 min)

Where: design-spec.md (about 1,700 words)

How to check: Read it through once and fix any number or ID that steps 1–14 changed. Rewrite in your own voice any sentence you plan to quote in the A3 report.

- [ ] §1 Purpose: the page supports the weekly update; this rests on 6 of 10 ads asking for SR or EXT, KC = 0, and every T3 update being written by hand
- [ ] §2 Departure 1 (AI single evaluator; Trello Premium trial, Jira Standard trial) and Departure 2 (interviews replaced 'because there was not time', which matches the 17 Oct ethics update)
- [ ] §3 Per-task tool findings T1–T7. Check them against what survives step 2
- [ ] §4–§5 Source summary and the three reconciliation points, which must match whatever you settled in steps 7–8
- [ ] §6 The ten, the runners-up, the headline finding, the three rejected-artefact cases and the UXF result. These must match steps 12–14
- [ ] §7 Needs → report sections: N01 → RS2/RS1; N12 → RS2; N03 and N26 → RS4/RS8; N19 → RS7 (challenge tier); N25 → RS1 summary plus export; N05 → RS5 (B only); N14 → RS6 (stretch); N07, N08, N09, N17, N10, N24, N27 → RS8 'What this page cannot tell you'. N20, N21 and N22 are kept, placed last
- [ ] RS1–RS8 are not defined in the spec itself; the key is in design-spec-outline.md (marked superseded). Add a one-line key before quoting any RS code in A3
- [ ] §8 Layout order: summary sentence first, then disciplines in words, then RS5 (B only) and RS4 commits, then RS8 last but always shown
- [ ] §9 Out of scope: live tracker connection; language-model prose layer; nine needs are P in T and N elsewhere (N07, N08, N09, N16, N17, N18, N23, N24, N27)

### Step 16: Write the GenAI statement lines for A3 (10 min)

Where: A3 report (draft lines in README.md, 'GenAI statement lines for A3')

How to check: Adjust each line to what you actually did, and fill in every [date] and [n] before submitting.

- [ ] Line 1: Claude ran the heuristic pass through a browser on your accounts on 14 Oct 2026 and coded problems and severities. Fill in the date of your severity 3–4 hand check
- [ ] Line 2: Claude verified ads, reviews and source quotes on the live pages on 15 Oct 2026. Fill in [n], the number you spot-checked in steps 5–6
- [ ] Line 3: Claude drafted the needs analysis (Ko check, needs edits and marks, rejected-artefact cases, UXF check, ranking) and the design spec on 15 Oct 2026. Fill in the date you accepted or changed each judgement in needs-catalogue.md §8
- [ ] Also state, where the measure is reported, that the interviews were replaced by published sources, giving time as the reason. Log in the reflection report the variance against A2's 600 minutes and its cost

## When done

- Fill the "[date]" and "[n]" brackets in the GenAI statement lines in `README.md`.
- Log the minutes you actually spent in `deliverable-8/hours-entries.csv`.
- Commit the re-rated sheet, the screenshots and this file with your ticks.
