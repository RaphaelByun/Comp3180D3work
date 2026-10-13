# Fidelity checklist, scored: SS3D week of 2021-02-08 (Version A, baseline), second scorer

Scorer 2, working independently. Each claim was checked against the commits in the SS3D clone (`git show --name-status`, `git show --stat`, `git log`) and against `export/log.txt`. Counts were redone by hand from the `--name-status` lists, not taken from the report. Pass rule (A2): none contradicted and at least 90% supported.

Independent recount from `git show --name-status` (per commit, from `export/log.txt`, cross-checked with `git log --name-status` in the SS3D clone; renames count once):

- ea23f08: 9 airlock .prefab = 9 scenes/prefabs
- 61a96bf: Emergency Light Fixture, Light Bulb Fixture, Light Tube Fixture (3 prefab); EmergencyLightObject.cs, SimpleLight.cs (2 code); EmergencyLight.controller, EmergencyLightAnim.anim, LightBulb.controller (3 art, by the classifier); 5 .meta = 13
- a7aab33: Wet Floor Sign.prefab added at the new path, old path deleted (2 prefab); FloorSignOpener.cs (1 code); wet_floor_sign.fbx, Closed.anim, Open.anim, FloorSign.controller (4 art); 7 .meta (6 added + 1 R100 rename) = 14
- f68b6a3: 9 airlock .prefab = 9
- 3855af4: 3 *AdjacencyConnector.cs, AdjacencyEditor.cs, AdjacencyStateMaintainer.cs, TileManager.cs, TileMapEditorHelpers.cs, TileObject.cs (8 code); 2 .meta = 10
- a326ba1: Container Display, Item Grid Item, Item Grid Slot (3 prefab); slot_beep_overlay.png.meta (1 .meta) = 4
- 37e22a3: 3 scenes (Main Menu, EmptyMapScene, Server Lobby) + 5 prefabs (Cigarette Vendor, PauseMenu, LoadingScreenUI, Soul, Field of View Source) = 8; 13 .cs (incl. 2 renames); Overlay - Blue.mat (1 art); Roboto.asset, spessman.asset, MKI.asset, LiberationSans SDF - Fallback.asset (4 data); 9 .meta (incl. 2 renames) = 35
- 0059f5d: pepperspray.prefab (1); PepperSpray.cs (1 code); 2 .ogg (2 audio); 6 .meta = 10
- Totals: 104 file changes = code 25, scenes/prefabs 35, art 8, audio 2, data/settings 4, .meta 30, other 0 (25+35+8+2+4+30 = 104). 25/104 = 24.0%, 35/104 = 33.7%, 8/104 = 7.7%, 2/104 = 1.9%.
- Distinct .unity/.prefab paths over the 7 commits that touch them: 9 airlocks + 3 lights + 2 Wet Floor Sign paths + 3 inventory UI + 8 from 37e22a3 + 1 pepperspray = 26 (one asset moved folders, see note 3).
- Authors by `%an`: Rutger Hendriks 3, CrazyMalk 3, Joao Buratto 2 = 3 people. 8 commits; a wider window (`--since=2021-02-07 --until=2021-02-16`, no-merges) also gives only these 8.

| # | Section | Claim | Commits | S / C / U | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Header | 10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes | 8 commits (all) | S | 8 `commit` lines in `log.txt`; 3 authors; 104 from the recount. Author-local dates: earliest 0059f5d `2021-02-10 18:10 -0300`, latest ea23f08 `2021-02-14 21:42 +0100`. See notes 1 and 2. |
| 2 | Where the work went | Code: 25 (24%) | 5 commits (all) | S | .cs: 1 (0059f5d) + 13 (37e22a3) + 8 (3855af4) + 2 (61a96bf) + 1 (a7aab33) = 25, in 5 commits; 25/104 = 24.0% |
| 3 | Where the work went | Scenes and prefabs: 35 (34%) | 7 commits (all) | S | 1 + 8 + 9 + 3 + 2 + 9 + 3 = 35 across all commits except 3855af4 (7 commits); 35/104 = 33.7% |
| 4 | Where the work went | Art: 8 (8%) | 61a96bf, a7aab33, 37e22a3 | S | 3 + 4 + 1 = 8 under the classifier (includes .anim, .controller and a .mat); 8/104 = 7.7%. See note 4. |
| 5 | Where the work went | Audio: 2 (2%) | 0059f5d | S | spray_doubleburst.ogg, spray_singleburst.ogg only; 2/104 = 1.9% |
| 6 | Where the work went | Supporting files: 4 data and settings, 30 Unity import settings (.meta), 0 other. | 8 commits (all) | S | 4 .asset (all 37e22a3); .meta 6 + 9 + 2 + 5 + 7 + 1 = 30; no other extension. 25+35+8+2+4+30 = 104 |
| 7 | Where the work went | Largest area this week: Scenes and prefabs (35 of 104 file changes). | 7 commits (all) | S | 35 beats 25 / 8 / 2 (and the 30 .meta, which the table does not list as an area) |
| 8 | Changes | 2021-02-14 "Add sound fall off to airlocks (#611)": 9 files (9 scenes/prefabs) | ea23f08 | S | 9 `M ...Airlock*.prefab`; author date 2021-02-14 21:42 +0100; `--stat`: 9 files changed |
| 9 | Changes | 2021-02-14 "Add emergency light and light interactions (#610)": 13 files (2 code · 3 scenes/prefabs · 3 art · 5 .meta) | 61a96bf | S | 2 .cs, 3 .prefab, 2 .controller + 1 .anim, 5 .meta = 13 |
| 10 | Changes | 2021-02-14 "Make floor sign openable/closeable  (#609)": 14 files (1 code · 2 scenes/prefabs · 4 art · 7 .meta) | a7aab33 | S | FloorSignOpener.cs; 2 .prefab (A new path, D old path); fbx + 2 .anim + .controller; 7 .meta incl. one R100. Title keeps the double space. |
| 11 | Changes | 2021-02-14 "Add RigidBody to airlocks to fix their interaction (#608)": 9 files (9 scenes/prefabs) | f68b6a3 | S | 9 `M ...Airlock*.prefab`; author date 2021-02-14 16:01 -0300 |
| 12 | Changes | 2021-02-14 "Optional connections for wires & pipes (#607)": 10 files (8 code · 2 .meta) | 3855af4 | S | 8 .cs (3 connectors, 2 new, TileManager, TileMapEditorHelpers, TileObject) + 2 .meta |
| 13 | Changes | 2021-02-14 "Rework the container UI (#605)": 4 files (3 scenes/prefabs · 1 .meta) | a326ba1 | S | Container Display, Item Grid Item, Item Grid Slot .prefab + slot_beep_overlay.png.meta; author date 2021-02-14 01:52 -0300 |
| 14 | Changes | 2021-02-12 "Fix restart bug (#588)": 35 files (13 code · 8 scenes/prefabs · 1 art · 4 data/settings · 9 .meta) | 37e22a3 | S | `--stat`: 35 files changed; split 13 / 8 / 1 / 4 / 9 from the recount; author date 2021-02-12 18:08 -0300. See note 5. |
| 15 | Changes | 2021-02-10 "Create PepperSpray class to handle interaction with the pepper spray (#604)": 10 files (1 code · 1 scene/prefab · 2 audio · 6 .meta) | 0059f5d | S | PepperSpray.cs; pepperspray.prefab; 2 .ogg; 6 .meta; author date 2021-02-10 |

Notes:

1. Dates. The page uses each commit's author-local date. In Sydney time (AEDT, +1100 in February) the same 8 commits run 11 to 15 February; in UTC the first is 10 February and the last 14 February. "10 to 14 February" is what git stores as author dates (so S), but it only holds if you read each commit in its author's own zone (-0300 for the Brazil-based authors, +0100 for Rutger). The page should say whose time zone it uses.
2. "8 changes by 3 people" counts commit authors. a326ba1 ("Rework the container UI") also carries `Co-authored-by: CosmicCoincidence`, so four people are credited in the commit text. The count is right as authors, but "by 3 people" would read as complete to a producer. Wording item only.
3. Row 3 and row 10 count the Wet Floor Sign twice (a Deleted path and an Added path) in a7aab33. The `.prefab.meta` is a R100 rename, so Unity sees the same asset (same guid) moved into a new `Floor Sign` folder and rewritten. File-change counts follow git status and are correct; the "scenes and prefabs" number is one higher than the number of distinct assets.
4. "Art: 8" includes 3 .anim/.controller animation files and 1 .mat (Overlay - Blue.mat) beside the .fbx. That is how the classifier is set up, and the claim is right under it, but a producer reading "Art" may expect images and models only. Same point as note 2 in the July files.
5. Row 14 is a 35-file squash of dozens of commit-message bullets under the title "Fix restart bug". The title is the author's own and the counts are right, but the commit is mainly a loading screen, lobby UI, scene split and round-restart rework (new scripts LoadingSceneUIHelper, LocalPlayerManager, MainLobbyButtonHelper; RoundManagerUI and LobbyLoginUI renamed). Not a fidelity failure, since the page says "as its author described it".
6. Rows 8 to 15 per-commit splits were each recounted from the `--name-status` lists, not from the report; all agree exactly.

Repair items (Version A): none required for the pass rule. Optional wording fixes: say whose time zone the dates use (note 1); say "commit authors" for "3 people" (note 2); rename or footnote the "Art" bucket (note 4).

Totals: Supported 15 of 15 · Contradicted 0 · Unsupported 0 · 100% supported. **Pass** (no claim contradicted, 100% >= 90%).
