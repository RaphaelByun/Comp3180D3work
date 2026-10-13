# Fidelity checklist: SS3D week of 2021-02-08 (Version B, treatment)

Open each commit's diff (`git show <hash>`) and mark every claim. Pass rule (A2): none contradicted and at least 90% supported.

| # | Section | Claim | Commits | S / C / U |
| ---: | --- | --- | --- | --- |
| 1 | Header | 10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes | 8 commits (all) |  |
| 2 | Where the work went | Code: 25 (24%) | 5 commits (all) |  |
| 3 | Where the work went | Scenes and prefabs: 35 (34%) | 7 commits (all) |  |
| 4 | Where the work went | Art: 8 (8%) | 61a96bf, a7aab33, 37e22a3 |  |
| 5 | Where the work went | Audio: 2 (2%) | 0059f5d |  |
| 6 | Where the work went | Supporting files: 4 data and settings, 30 Unity import settings (.meta), 0 other. | 8 commits (all) |  |
| 7 | Where the work went | Largest area this week: Scenes and prefabs (35 of 104 file changes). | 7 commits (all) |  |
| 8 | Changes | 2021-02-14 "Add sound fall off to airlocks (#611)": 9 files (9 scenes/prefabs) | ea23f08 |  |
| 9 | Changes | 2021-02-14 "Add emergency light and light interactions (#610)": 13 files (2 code · 3 scenes/prefabs · 3 art · 5 .meta) | 61a96bf |  |
| 10 | Changes | 2021-02-14 "Make floor sign openable/closeable  (#609)": 14 files (1 code · 2 scenes/prefabs · 4 art · 7 .meta) | a7aab33 |  |
| 11 | Changes | 2021-02-14 "Add RigidBody to airlocks to fix their interaction (#608)": 9 files (9 scenes/prefabs) | f68b6a3 |  |
| 12 | Changes | 2021-02-14 "Optional connections for wires & pipes (#607)": 10 files (8 code · 2 .meta) | 3855af4 |  |
| 13 | Changes | 2021-02-14 "Rework the container UI (#605)": 4 files (3 scenes/prefabs · 1 .meta) | a326ba1 |  |
| 14 | Changes | 2021-02-12 "Fix restart bug (#588)": 35 files (13 code · 8 scenes/prefabs · 1 art · 4 data/settings · 9 .meta) | 37e22a3 |  |
| 15 | Changes | 2021-02-10 "Create PepperSpray class to handle interaction with the pepper spray (#604)": 10 files (1 code · 1 scene/prefab · 2 audio · 6 .meta) | 0059f5d |  |
| 16 | Scenes and prefabs changed | 26 scenes and prefabs changed | 7 commits (all) |  |
| 17 | Scenes and prefabs changed | 9 prefabs (Airlock Classic, Airlock Double Classic, Airlock Glass, Airlock, Airlock Civilian Glass, Airlock Civilian, Double Airlock, Airlock Maintenance Glass, Airlock Maintenance) — "Add sound fall off to airlocks (#611)": edited Audio Source. | ea23f08 |  |
| 18 | Scenes and prefabs changed | 9 prefabs (Airlock Classic, Airlock Double Classic, Airlock Glass, Airlock, Airlock Civilian Glass, Airlock Civilian, Double Airlock, Airlock Maintenance Glass, Airlock Maintenance) — "Add RigidBody to airlocks to fix their interaction (#608)": added physics body; edited object setup. | f68b6a3 |  |
| 19 | Scenes and prefabs changed | Server Lobby — "Fix restart bug (#588)": added new objects, UI layout, Animator, Canvas Renderer and 9 more; removed objects, placed-prefab overrides, position/rotation/scale, ServerLobbyUIHelper script and 2 more; edited Light. | 37e22a3 |  |
| 20 | Scenes and prefabs changed | Server Lobby — objects named in the change: Loading, LocalPlayerManager, LoadingScreenManager, LoadingSceneUI, Placeholder, Buttons and 10 more | 37e22a3 |  |
| 21 | Scenes and prefabs changed | EmptyMapScene — "Fix restart bug (#588)": added placed-prefab overrides; removed placed-prefab overrides. | 37e22a3 |  |
| 22 | Scenes and prefabs changed | EmptyMapScene — objects named in the change: WallCap2, WallCap0 | 37e22a3 |  |
| 23 | Scenes and prefabs changed | Main Menu — "Fix restart bug (#588)": removed objects, placed-prefab overrides, Canvas Renderer, UI layout and 1 more. | 37e22a3 |  |
| 24 | Scenes and prefabs changed | Main Menu — objects named in the change: LoadingScreenUI, Map Selection, Panel, Text (TMP), Image, Button | 37e22a3 |  |
| 25 | Scenes and prefabs changed | Wet Floor Sign — "Make floor sign openable/closeable  (#609)": new prefab added. | a7aab33 |  |
| 26 | Scenes and prefabs changed | Wet Floor Sign — objects named in the change: Wet Floor Sign 2, Attachment | a7aab33 |  |
| 27 | Scenes and prefabs changed | LoadingScreenUI — "Fix restart bug (#588)": added new objects, UI layout, Canvas Renderer, Animator and 1 more; removed LoadingScreenManager or TileBase script. | 37e22a3 |  |
| 28 | Scenes and prefabs changed | LoadingScreenUI — objects named in the change: Loading Text, Text (TMP), Loading Screen | 37e22a3 |  |
| 29 | Scenes and prefabs changed | Container Display — "Rework the container UI (#605)": added new objects, UI layout, Canvas Renderer, an unidentified script and 1 more; removed objects, UI layout, Canvas Renderer, DraggableWindow script and 1 more. | a326ba1 |  |
| 30 | Scenes and prefabs changed | Container Display — objects named in the change: Panel, Text, Container Section, Display | a326ba1 |  |
| 31 | Scenes and prefabs changed | Wet Floor Sign — "Make floor sign openable/closeable  (#609)": prefab deleted. | a7aab33 |  |
| 32 | Scenes and prefabs changed | Wet Floor Sign — objects named in the change: Attachment | a7aab33 |  |
| 33 | Scenes and prefabs changed | pepperspray — "Create PepperSpray class to handle interaction with the pepper spray (#604)": added Audio Source; removed ItemExaminable script; edited object setup, placed-prefab overrides. | 0059f5d |  |
| 34 | Scenes and prefabs changed | Soul — "Fix restart bug (#588)": new prefab added. | 37e22a3 |  |
| 35 | Scenes and prefabs changed | Emergency Light Fixture — "Add emergency light and light interactions (#610)": added EmergencyLightObject script, NetworkIdentity script; edited Light, Animator, object setup. | 61a96bf |  |
| 36 | Scenes and prefabs changed | 2 prefabs (Light Bulb Fixture, Light Tube Fixture) — "Add emergency light and light interactions (#610)": added NetworkIdentity script, SimpleLight script; edited object setup. | 61a96bf |  |
| 37 | Scenes and prefabs changed | 2 prefabs (Item Grid Slot, Item Grid Item) — "Rework the container UI (#605)": edited script settings. | a326ba1 |  |
| 38 | Scenes and prefabs changed | 2 prefabs (Cigarette Vendor, Field of View Source) — "Fix restart bug (#588)": edited position/rotation/scale. | 37e22a3 |  |
| 39 | Scenes and prefabs changed | PauseMenu — "Fix restart bug (#588)": edited script settings. | 37e22a3 |  |

Supported: ___ of 39 · Contradicted: ___ · Unclear: ___
