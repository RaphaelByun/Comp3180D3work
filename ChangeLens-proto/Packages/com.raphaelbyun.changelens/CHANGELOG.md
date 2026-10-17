# Changelog

Built from the repository's commit history. Hashes are on the `deliverable-2-changelens` branch.

## Unreleased (A3 committed tier)

### 17 October 2026
- A scene or prefab is listed as moved or renamed only when its `.meta` moved at R100 in the same commit, so its guid stayed. Git pairs files on text alone, and prefab YAML is mostly boilerplate: in SS3D it paired `locker.prefab` with a new `officechair.prefab` at 59% (2 Sep 2019), and two different `.meta` files at R074, since they differ only in the guid line (BodyContainer "renamed from VisualObject and rebuilt", 28 Oct 2019). Such pairs are now one "prefab deleted" entry and one "new prefab added" entry, each with its own object names. The frozen study and reserve weeks have only R100 `.meta` renames, so their pages do not change (`58a5b5c`).
- The header counts people by name, so one person committing from two email addresses counts once (SS3D, 9 to 15 Jan 2020: "4 changes by 2 people" becomes "by 1 person"). Every git call also pins `log.mailmap=true`, so the main-line author and the merged rows use the same identity. No frozen week changes (`e03df41`).
- The Producer Page window keeps a bar written as `\|` in a commit subject inside its cell, so the table columns stay lined up. No SS3D main-line subject has a bar (`10e073b`).
- The .NET harness has 85 tests after these three fixes, all passing. They have not been run in Unity yet.
- Every git call also pins the diff algorithm (myers), context lines (3), hunk joining, the indent heuristic and `diff.relative`. The earlier pinning (`038551b`) missed these, so a user's `diff.algorithm=histogram` or `diff.context=1` could change Version B on a week generated from a repository. With the fix, both settings give the same July and 27 Sep 2021 pages as the defaults. Frozen exports are unaffected (`1114e5c`).
- Object names Unity writes in YAML quotes are unquoted: the page shows `[UI] Canvas`, not `'[UI] Canvas'`, and a quoted root name still matches its own asset in the naming measure. No frozen study or reserve page changes; the one quoted name in the exports sits in a block that only moved (`49bb706`).
- The Frozen study week field also finds a typed relative path such as `study/week2-2021-07-19` from the repository root. Unity runs in `ChangeLens-proto`, one level below `study/`, so the hinted path used to fail (`1d1911f`).
- Shares round a half up: 1 of 8 file changes shows 13%, as a reader checking by hand gets. .NET's default rounded it to 12%. No frozen week has a half share, so no page changes (`d86cff9`).
- The .NET harness has 81 tests after these fixes, all passing. They have not been re-run in Unity yet.
- The EditMode tests were run in Unity 6000.4.10f1: 76 of 76 pass (`prototype-logs/a3-tests-2026-10-17.xml`). Captures of Version A and Version B on the July study week are in `figures/a3-producer-page-*.png`, made with `Editor/ProducerPageScreenshotBootstrap.cs` (`f3f195f`).
- A test rebuilds every frozen study and reserve week from its `export/` folder and compares the result with the committed reports, checklists and naming measures (`035e55e`).
- Both reserve weeks were re-frozen with the current tool. The 27 Sep 2021 reserve now names the scripts deleted during the week (VisibleContainer, AttachedContainerGenerator), and its Version B has 34 claims, not 33. The 14 Dec 2020 reserve's pages did not change. `assets.patch` was kept in both: a new export differs only in the length of abbreviated hashes on `index` lines, which the parser skips. Nothing had been scored on either reserve (`d9fa4bf`).
- The week is picked by author date, the date the page shows. Git's `--since` and `--until` use the committer date, so a commit rebased into a later week was left out of its own week. The export now lists the whole main line and filters it in code, so one commit with a wrong clock no longer empties the week, and a main-line commit dated before its parent is reported as a warning. The four frozen weeks export the same commits as before (`1c67e53`).
- A scene or prefab moved and rewritten in one commit is listed once, as "moved from ... and rebuilt". Git pairs only its `.meta` as a rename, so the page used to list it as both "new prefab added" and "prefab deleted" (Wet Floor Sign, #609) (`2b6d843`).
- A script component whose id changes in one diff hunk and whose script changes in the next is now read as one block, so the swapped script is named (pepperspray, #604: "added PepperSpray script; removed Item script") (`89a8d5a`).
- `naming.md` has a third naming line: changed scenes and prefabs whose page entry names an object other than the asset itself. The strict A2 measure also counts the asset's own root name, which the page does not show. February 7 of 26, July 9 of 24, reserves 6 of 33 and 5 of 22. The reports did not change (`7cd355d`).
- On a tie for the largest area, every tied area is named ("Largest areas this week: ... (25 each of N file changes)"). No study or reserve week has a tie (`3f96cde`).
- The script guid lookup passes `--no-color -G`, so a user's `color.grep` or `grep.patternType` setting can no longer leave every script unidentified (`2d0da3e`).
- **The frozen February study week was not regenerated.** It stays as scored in D4. Rebuilt with the current code, its Version B differs in the two repair items above: checklist row 16 (26 scenes and prefabs becomes 25), row 25 (Wet Floor Sign "new prefab added" becomes "moved from `.../Custodial` and rebuilt"), rows 31 and 32 (the "prefab deleted" Wet Floor Sign entry) go, and row 33 (pepperspray) names the PepperSpray and Item scripts. Rows 34 to 39 become 32 to 37, so the checklist has 37 claims, not 39. `naming.md` would read 20 of 25 (strict), 25 of 25 and 6 of 25. Version A, the July week and both reserves are unchanged. Whether to regenerate February is Raphael's decision, since D3 and D4 cite its rows.
- A merge row now lists who wrote the work it brought in and up to five of their changes, and the header counts those people. Before, a week where main was merged into a branch and then fast-forwarded showed everyone else's work as one merge row credited to the person who merged (`038551b`).
- A script deleted during the week is named. The guid table is also read just before the week's oldest commit (`038551b`).
- Every git call pins the settings the parsers read (diff prefixes, grep line numbers, log layout, colour), so a user's own git config cannot change the page (`038551b`).
- An asset edited and then renamed or moved in the same week is listed and counted once, under its final path (`038551b`).
- The fidelity checklist tells the scorer to open a commit with `git show --diff-merges=first-parent`, which shows a merge's files. The frozen study checklists keep the old line; their weeks have no merges (`038551b`).
- A scene or prefab moved or renamed with no content change now says where it came from, not "changed (0 lines)" (`4d33ce7`).
- Paths are read from git's `rename to`, `+++ b/` and `--- a/` lines, so a folder whose name ends in " b" is no longer cut short (`4d33ce7`).
- Git's quoted paths (for example non-ASCII file names) are unquoted in both parsers (`4d33ce7`).
- The export walks the main line with `--first-parent --diff-merges=first-parent`, so a merged branch is reported in the week it was merged (`1976e8a`).
- A commit at exactly midnight UTC is no longer counted in two weeks (`1976e8a`).
- The Producer Page window writes the week's end date on the Gregorian calendar whatever the machine's culture (`1976e8a`).

### 14 October 2026
- Screenshot helpers write figures relative to the project, not a fixed folder (`2b6b5ab`).

### 13 October 2026
- Version B states the "and N more" counting rule in its footer (`ac9d39c`).
- Asset diff repair after the February fidelity check: stripped prefab stubs, blocks that only moved in the file, paired block headers, and a script guid shared by two `.meta` files (`bf09b4e`).
- **Window → ChangeLens Producer Page**: generate from a repository or reopen a frozen study week, flip Version A and B, save study files. Week bounds pinned to midnight UTC (`323eac1`).
- Date-only export bounds pinned to midnight (`e73f544`).

### 12 October 2026
- Study-week reports (Version A and B, fidelity checklists, naming measures) and a .NET harness for the engine-free code (`b96c1fa`).

## 0.1.0 (A2 prototype)

Built 17 September 2026 for the A2 proposal and committed on 11 October 2026 (`dbb6af4`).

- **Window → ChangeLens**: loads a `git log --name-status` export and shows a grouped change report with add, modify and delete counts and the code-file percentage.
