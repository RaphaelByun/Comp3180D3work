# Fidelity checklist, scored: SS3D week of 2021-02-08 (Version A, baseline)

Scorer 1. Each claim was checked against the commits in `prototype-data/SS3D` (`git show --name-status`, `git show --stat`) and against `export/log.txt`. Counts were redone by hand from the `--name-status` lists, not taken from the report. Pass rule (A2): none contradicted and at least 90% supported.

Independent recount from `git show --name-status` (file changes per commit, by category):

- 0059f5d: PepperSpray.cs (1 code); pepperspray.prefab (1 prefab); spray_doubleburst.ogg, spray_singleburst.ogg (2 audio); Functional.meta, Containers.meta, Liquid.meta, 2 x .ogg.meta, PepperSpray.cs.meta (6 .meta) = 10
- 37e22a3: 13 .cs (MainMenuUI, PauseMenu, PauseMenuTimerUI, LoadingScreenManager, ServerLobbyUIHelper, LoginNetworkManager, SceneLoaderManager, RoundManager, TileManager, LoadingSceneUIHelper, LocalPlayerManager, MainLobbyButtonHelper, Soul; two of these are renames R098/R078); 8 scenes/prefabs (Main Menu, EmptyMapScene, Server Lobby, Cigarette Vendor, PauseMenu, LoadingScreenUI, Soul, Field of View Source); 1 art (Overlay - Blue.mat); 4 data/settings (Roboto.asset, spessman.asset, MKI.asset, LiberationSans SDF - Fallback.asset); 9 .meta (EmbarkSign.png, spessman.ttf, Rifles folder, Soul.prefab, 2 rename metas, 3 new .cs metas) = 35
- a326ba1: 3 prefabs (Container Display, Item Grid Item, Item Grid Slot); slot_beep_overlay.png.meta (1 .meta) = 4
- 3855af4: 8 .cs (3 connectors, AdjacencyEditor, AdjacencyStateMaintainer, TileManager, TileMapEditorHelpers, TileObject); 2 .meta = 10
- f68b6a3: 9 airlock prefabs = 9
- a7aab33: FloorSignOpener.cs (1 code); Wet Floor Sign.prefab added at new path + old path deleted (2 prefab); wet_floor_sign.fbx, Closed.anim, Open.anim, FloorSign.controller (4 art); 7 .meta (fbx, Floor Sign folder, Closed.anim, Open.anim, controller, .cs, and the renamed prefab .meta) = 14
- 61a96bf: EmergencyLightObject.cs, SimpleLight.cs (2 code); Emergency Light Fixture, Light Bulb Fixture, Light Tube Fixture (3 prefab); EmergencyLight.controller, EmergencyLightAnim.anim, LightBulb.controller (3 art); 5 .meta = 13
- ea23f08: 9 airlock prefabs = 9
- Totals: 104 file changes = code 25, scenes/prefabs 35, art 8, audio 2, data/settings 4, .meta 30, other 0. Per commit 10 + 35 + 4 + 10 + 9 + 14 + 13 + 9 = 104. `git show --stat` agrees per commit. `git log --all --no-merges` for 7 to 16 Feb 2021 returns exactly these 8 commits and no merges.

| # | Section | Claim | Commits | S / C / U | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Header | 10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes | 8 commits (all) | S | `log.txt` has 8 `commit` lines; authors Rutger Hendriks (3: ea23f08, 61a96bf, 3855af4), CrazyMalk (3: a7aab33, f68b6a3, 0059f5d), Joao Buratto (2: a326ba1, 37e22a3); 104 from the recount. Earliest 0059f5d `2021-02-10 18:10 -0300`, latest ea23f08 `2021-02-14 21:42 +0100`. See note 1. |
| 2 | Where the work went | Code: 25 (24%) | 5 commits (all) | S | .cs: 0059f5d 1, 37e22a3 13, 3855af4 8, a7aab33 1, 61a96bf 2 = 25 in 5 commits; 25/104 = 24.0% |
| 3 | Where the work went | Scenes and prefabs: 35 (34%) | 7 commits (all) | S | .unity/.prefab: 1 + 8 + 3 + 9 + 2 + 3 + 9 = 35, in 7 commits (all but 3855af4); 35/104 = 33.7% |
| 4 | Where the work went | Art: 8 (8%) | 61a96bf, a7aab33, 37e22a3 | S | 3 + 4 + 1 = 8; 8/104 = 7.7%. True under the classifier, but see note 2: the 8 are animation clips, animator controllers, one model and one material, with no images. |
| 5 | Where the work went | Audio: 2 (2%) | 0059f5d | S | the two `.ogg` files; 2/104 = 1.9% |
| 6 | Where the work went | Supporting files: 4 data and settings, 30 Unity import settings (.meta), 0 other. | 8 commits (all) | S | 4 `.asset` files in 37e22a3; .meta 5 + 7 + 2 + 1 + 9 + 6 = 30; 25+35+8+2+4+30 = 104 so nothing is left over. See note 3. |
| 7 | Where the work went | Largest area this week: Scenes and prefabs (35 of 104 file changes). | 7 commits (all) | S | 35 is the largest of 25 / 35 / 8 / 2 (.meta 30 is a supporting count, not an area) |
| 8 | Changes | 2021-02-14 "Add sound fall off to airlocks (#611)": 9 files (9 scenes/prefabs) | ea23f08 | S | 9 `M ...Airlock*.prefab`; subject matches; author date 2021-02-14 |
| 9 | Changes | 2021-02-14 "Add emergency light and light interactions (#610)": 13 files (2 code · 3 scenes/prefabs · 3 art · 5 .meta) | 61a96bf | S | 2 .cs, 3 prefabs, 2 .controller + 1 .anim, 5 .meta; `--stat` 13 files. The "3 art" are animation assets (note 2). |
| 10 | Changes | 2021-02-14 "Make floor sign openable/closeable  (#609)": 14 files (1 code · 2 scenes/prefabs · 4 art · 7 .meta) | a7aab33 | S | subject has the double space as printed; 1 .cs; the 2 prefabs are one add and one delete of the same asset (note 4); 4 art = fbx, 2 .anim, 1 .controller; 7 .meta; `--stat` 12 files in Custodial + 2 fbx files = 14 |
| 11 | Changes | 2021-02-14 "Add RigidBody to airlocks to fix their interaction (#608)": 9 files (9 scenes/prefabs) | f68b6a3 | S | 9 `M ...Airlock*.prefab` |
| 12 | Changes | 2021-02-14 "Optional connections for wires & pipes (#607)": 10 files (8 code · 2 .meta) | 3855af4 | S | 8 .cs (3 M connectors, 2 A, 3 M tile files) + 2 `.cs.meta` |
| 13 | Changes | 2021-02-14 "Rework the container UI (#605)": 4 files (3 scenes/prefabs · 1 .meta) | a326ba1 | S | 3 prefabs + `slot_beep_overlay.png.meta`; author date 2021-02-14 01:52 -0300 |
| 14 | Changes | 2021-02-12 "Fix restart bug (#588)": 35 files (13 code · 8 scenes/prefabs · 1 art · 4 data/settings · 9 .meta) | 37e22a3 | S | category lists above; 2 renames are each counted once; 13+8+1+4+9 = 35; `--stat` 35 files |
| 15 | Changes | 2021-02-10 "Create PepperSpray class to handle interaction with the pepper spray (#604)": 10 files (1 code · 1 scene/prefab · 2 audio · 6 .meta) | 0059f5d | S | 1 .cs, 1 .prefab, 2 .ogg, 6 .meta (3 of them folder metas) |

Notes for the second scorer:

1. Dates are each author's own local date. Every date in the page matches the author date git stores. In UTC the week also runs 10 to 14 February (0059f5d is 21:10Z on the 10th, ea23f08 is 20:42Z on the 14th) and every per-row date is the same in UTC. In Sydney time (+1100) the week would read 11 to 15 February (0059f5d is 08:10 on the 11th, ea23f08 is 06:42 on the 15th, and the two CrazyMalk commits of the 14th fall on the 15th). So the range is right for the stored dates but a Sydney reader would be one day out; the page should say whose time zone it uses (same finding as the July week).
2. "Art" is not what a producer would think. The 8 art changes are: 2 animation clips + 1 animator controller + 1 model (fbx) in a7aab33, 1 clip + 2 controllers in 61a96bf, and 1 material in 37e22a3. There is no texture, sprite or image in the week. The count is right under the classifier, but "Art: 8 (8%)" reads as 8 pieces of art. Repair item.
3. "Unity import settings (.meta)" is also loose: 5 of the 30 .meta files are folder metas (Rifles, Floor Sign, Functional, Containers, Liquid) and 3 are renamed metas that moved with their asset (MainMenuUI.cs, PauseMenuTimerUI.cs, Wet Floor Sign.prefab). They are not all import settings. Minor.
4. In a7aab33 `Wet Floor Sign.prefab` is deleted at the old path and added at `Floor Sign/Wet Floor Sign.prefab`, but its `.meta` is a 100% rename (same guid). So the "2 scenes/prefabs" in row 10 is one prefab moved and reworked, counted as one add and one delete. The count is right as git lists it; the wording "2 scenes/prefabs" overstates the work.
5. The same 9 airlock prefabs appear in ea23f08 and f68b6a3, so the 104 includes 18 airlock file changes for 9 files. The page does explain "a file edited twice counts twice".

Totals: Supported 15 of 15 · Contradicted 0 · Unsupported 0 · 100% supported. **Pass** (no claim contradicted, 100% >= 90%).

Repair items (things the diffs show that Version A leaves out or says loosely):

- Name the time zone behind the dates (note 1).
- Split "Art" from animation/controller assets or rename the area (note 2).
- Say that the two prefab changes in #609 are one prefab moved and rebuilt (note 4).
