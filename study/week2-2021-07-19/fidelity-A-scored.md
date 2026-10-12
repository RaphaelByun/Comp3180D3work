# Fidelity checklist, scored: SS3D week of 2021-07-19 (Version A, baseline)

First scorer. Each claim was checked against the commits in `/home/user/Comp3180D3work/prototype-data/SS3D` (`git show --name-status`, `git show --stat`) and against `export/log.txt`. Counts were redone by hand from the `--name-status` lists, not taken from the report. Pass rule (A2): none contradicted and at least 90% supported.

Independent recount from `git show --name-status` (file changes per commit, by category):

- 8d38914: ServerLobby.unity = 1 scene
- 98fc1a8: SpaceCleaner.prefab = 1 prefab
- 65537cc: ChatWindow.prefab, InventoryUIBeep.prefab (2 prefab); ChatWindow.cs, ToggleChat.cs (2 code); ProjectSettings/TagManager.asset (1 data/settings) = 5
- c36c573: Human.prefab, ChatWindow.prefab (2 prefab); ChatWindow.cs, ToggleChat.cs (2 code); Chat.png, SingleColorMaterial.mat (2 art); Chat.png.meta, ToggleChat.cs.meta (2 .meta) = 8
- f1c0e55: InventoryUIBeep.prefab (1 prefab); ToggleBodyTargetUI.cs (1 code); ToggleBodyTargetUI.cs.meta (1 .meta) = 3
- 27cd991: CompositeItemSelector.cs (1 code) = 1
- edc747c: 19 item prefabs; Item.cs (1 code) = 20
- Totals: 39 file changes = code 7, scenes/prefabs 26, art 2, audio 0, data/settings 1, .meta 3, other 0. `git show --stat` agrees per commit (1, 1, 5, 8, 3, 1, 20 files changed).

| # | Section | Claim | Commits | S / C / U | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Header | 20 July 2021 to 24 July 2021 · 7 changes by 2 people · 39 file changes | 7 commits (all) | S | `log.txt` has 7 `commit` lines; authors James (5) and Ryan089 (2); 39 from the recount above. Dates are each author's own local date: earliest edc747c `2021-07-20 04:18 +1000`, latest 8d38914 `2021-07-24 21:12 -0400`. See note 1. |
| 2 | Where the work went | Code: 7 (18%) | 5 commits (all) | S | .cs files: 2 (65537cc) + 2 (c36c573) + 1 (f1c0e55) + 1 (27cd991) + 1 (edc747c) = 7, in 5 commits; 7/39 = 17.9% |
| 3 | Where the work went | Scenes and prefabs: 26 (67%) | 6 commits (all) | S | .unity/.prefab: 1 + 1 + 2 + 2 + 1 + 19 = 26, in 6 commits (all but 27cd991); 26/39 = 66.7% |
| 4 | Where the work went | Art: 2 (5%) | c36c573 | S | c36c573 `A Assets/Art/Graphics/UI/Inventory/Chat.png`, `M Assets/Engine/Examine/SingleColorMaterial.mat`; 2/39 = 5.1% |
| 5 | Where the work went | Audio: 0 (0%) | 7 commits (all) | S | No audio extensions in any of the 7 `--name-status` lists |
| 6 | Where the work went | Supporting files: 1 data and settings, 3 Unity import settings (.meta), 0 other. | 7 commits (all) | S | 65537cc `M ProjectSettings/TagManager.asset`; .meta: Chat.png.meta, ToggleChat.cs.meta (c36c573), ToggleBodyTargetUI.cs.meta (f1c0e55); nothing left over (7+26+2+0+1+3 = 39) |
| 7 | Where the work went | Largest area this week: Scenes and prefabs (26 of 39 file changes). | 6 commits (all) | S | 26 is the largest of 7 / 26 / 2 / 0 |
| 8 | Changes | 2021-07-24 "Show selected setting (#772)": 1 files (1 scene/prefab) | 8d38914 | S | `git show --name-status 8d38914`: `M Assets/Content/Scenes/ServerLobby.unity`; author date 2021-07-24 |
| 9 | Changes | 2021-07-24 "Fix space cleaner looping (#771)": 1 files (1 scene/prefab) | 98fc1a8 | S | `M .../Liquid/SpaceCleaner.prefab`; author date 2021-07-24 |
| 10 | Changes | 2021-07-23 "Fix multiple chat buttons (#770)": 5 files (2 code · 2 scenes/prefabs · 1 data/settings) | 65537cc | S | 2 .prefab, ChatWindow.cs + ToggleChat.cs, TagManager.asset; `--stat`: 5 files changed; author date 2021-07-23 |
| 11 | Changes | 2021-07-22 "Add chat back (#745)": 8 files (2 code · 2 scenes/prefabs · 2 art · 2 .meta) | c36c573 | S | Human.prefab + ChatWindow.prefab; ChatWindow.cs + ToggleChat.cs; Chat.png + SingleColorMaterial.mat; 2 .meta; `--stat`: 8 files changed |
| 12 | Changes | 2021-07-21 "Add targeting doll button (#744)": 3 files (1 code · 1 scene/prefab · 1 .meta) | f1c0e55 | S | InventoryUIBeep.prefab, ToggleBodyTargetUI.cs, ToggleBodyTargetUI.cs.meta; `--stat`: 3 files changed |
| 13 | Changes | 2021-07-20 "Amended CompositeItemSelector to render sharedMesh rather than mesh. (#743)": 1 files (1 code) | 27cd991 | S | `M Assets/Engine/Examine/CompositeItemSelector.cs`; author date 2021-07-20 04:34 +1000 |
| 14 | Changes | 2021-07-20 "Corrects issue where Items are not on the correct layer. (#739)": 20 files (1 code · 19 scenes/prefabs) | edc747c | S | 19 `M ...prefab` + `M Assets/Engine/Inventory/Item.cs`; `--stat`: 20 files changed |

Notes for the second scorer:

1. The page uses each commit's author-local date. Ryan089's two commits are 20 July in his time zone (+1000) but 19 July in UTC and in James's zone (-0400); James's last commit is 24 July in his zone but 25 July in Sydney time. So "20 July to 24 July" is right by git's recorded author dates, but no single clock gives that range. I scored it S because every date matches the author date git stores; the page should say whose time zone it uses.
2. "Art" includes a material (SingleColorMaterial.mat) as well as the new icon. That is how the classifier is set up, and the claim is right under it.

Totals: Supported 14 of 14 · Contradicted 0 · Unsupported 0 · 100% supported. **Pass** (no claim contradicted, 100% ≥ 90%).

## Second scorer

Independent re-check, done 12 October 2026 against `/home/user/Comp3180D3work/prototype-data/SS3D`. I tried to break every row rather than confirm it. The first scorer's column above is left as it was.

What I ran:

- `git log --no-merges --format=... edc747c^..8d38914` gives 7 commits. A wider window (`--all --since=2021-07-17 --until=2021-07-28`) also gives only these 7, so no commit from the week is missing. `export/log.txt` has 7 `commit` lines.
- Authors: James (5 commits: 8d38914, 98fc1a8, 65537cc, c36c573, f1c0e55) and Ryan089 (2 commits: 27cd991, edc747c). That is 2 people, with 2 distinct emails.
- `git log --no-merges --name-status edc747c^..8d38914` gives 39 entries (6 A, 33 M, no D or R). Per commit: 1, 1, 5, 8, 3, 1, 20.
- By category I get 7 code (.cs), 26 scenes/prefabs (1 .unity, 25 .prefab), 2 art (Chat.png, SingleColorMaterial.mat), 0 audio, 1 data/settings (TagManager.asset) and 3 .meta, which sums to 39. The shares are 7/39 = 17.9%, 26/39 = 66.7% and 2/39 = 5.1%, so 18%, 67% and 5% as printed.
- Weekdays: 20 to 24 July 2021 were Tuesday to Saturday, which matches the "Tue 20 Jul" to "Sat 24 Jul" labels in the table.
- Per-commit file splits in rows 10 to 14 match the `--name-status` lists exactly.

Disagreements: **none.** I found no row where the verdict should change.

Row I pushed hardest on, verdict kept:

- Row 1 (S, kept S). The range "20 July 2021 to 24 July 2021" matches git's stored author dates (edc747c `2021-07-20 04:18:49 +1000`, 8d38914 `2021-07-24 21:12:15 -0400`), so it is not contradicted. But the range only holds if you read each commit in its author's own zone. In UTC the week runs 19 to 25 July. In Sydney time (AEST, +1000 in July) it runs 20 to 25 July, because 8d38914 is 11:12 on 25 July AEST. A Sydney-based reader could be one day out on the last change. This is a wording fix ("dates are each author's local date"), not a fidelity failure.

Reconciled totals (Version A): Supported 14 · Contradicted 0 · Unsupported 0 · Total 14 (100% supported).

**Final (second scorer): PASS against the A2 rule. None contradicted, and 100% is at least 90%.**
