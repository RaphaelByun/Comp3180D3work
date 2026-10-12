# What changed: SS3D week of 2021-02-08

**10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes**

*A "file change" is one file touched by one change; a file edited twice counts twice.*

## Where the work went

| Area | File changes | Share of all file changes |
| --- | ---: | ---: |
| Code | 25 | 24% |
| Scenes and prefabs | 35 | 34% |
| Art | 8 | 8% |
| Audio | 2 | 2% |

Supporting files: 4 data and settings, 30 Unity import settings (.meta), 0 other.

Largest area this week: **Scenes and prefabs** (35 of 104 file changes).

## Changes, newest first

| Date | Change (as its author described it) | Files | What kind of files |
| --- | --- | ---: | --- |
| Sun 14 Feb | Add sound fall off to airlocks (#611) | 9 | 9 scenes/prefabs |
| Sun 14 Feb | Add emergency light and light interactions (#610) | 13 | 2 code · 3 scenes/prefabs · 3 art · 5 .meta |
| Sun 14 Feb | Make floor sign openable/closeable  (#609) | 14 | 1 code · 2 scenes/prefabs · 4 art · 7 .meta |
| Sun 14 Feb | Add RigidBody to airlocks to fix their interaction (#608) | 9 | 9 scenes/prefabs |
| Sun 14 Feb | Optional connections for wires & pipes (#607) | 10 | 8 code · 2 .meta |
| Sun 14 Feb | Rework the container UI (#605) | 4 | 3 scenes/prefabs · 1 .meta |
| Fri 12 Feb | Fix restart bug (#588) | 35 | 13 code · 8 scenes/prefabs · 1 art · 4 data/settings · 9 .meta |
| Wed 10 Feb | Create PepperSpray class to handle interaction with the pepper spray (#604) | 10 | 1 code · 1 scene/prefab · 2 audio · 6 .meta |

## Scenes and prefabs changed

26 scenes and prefabs changed. Each is listed with what changed inside it.

**9 prefabs with the same changes:** Airlock Classic, Airlock Double Classic, Airlock Glass, Airlock, Airlock Civilian Glass, Airlock Civilian, Double Airlock, Airlock Maintenance Glass, Airlock Maintenance (in `Assets/Content/Structures/Doors`)
- "Add sound fall off to airlocks (#611)": edited Audio Source.
- "Add RigidBody to airlocks to fix their interaction (#608)": added physics body; edited object setup.

**Server Lobby** (scene, in `Assets/Content/Scenes`)
- "Fix restart bug (#588)": added new objects, UI layout, Animator, Canvas Renderer and 9 more; removed objects, position/rotation/scale, ServerLobbyUIHelper script, NetworkIdentity script and 1 more; edited Light.
  - objects named in the change: Loading, LocalPlayerManager, LoadingScreenManager, LoadingSceneUI, Placeholder, Buttons and 10 more

**EmptyMapScene** (scene, in `Assets/Content/Scenes/Maps`)
- "Fix restart bug (#588)": added new objects, placed-prefab overrides, position/rotation/scale, TileObject script; removed objects, placed-prefab overrides, position/rotation/scale, TileObject script.
  - objects named in the change: WallCap2, WallCap0, turf_floor_bar, '[101,106]', plenum_plenum

**Main Menu** (scene, in `Assets/Content/Scenes`)
- "Fix restart bug (#588)": removed objects, placed-prefab overrides, UI layout, Canvas Renderer and 1 more.
  - objects named in the change: LoadingScreenUI, Map Selection, Panel, Text (TMP), Image, Button

**Wet Floor Sign** (prefab, in `Assets/Content/Items/Functional/Tools/Custodial/Floor Sign`)
- "Make floor sign openable/closeable  (#609)": new prefab added.
  - objects named in the change: Wet Floor Sign 2, Attachment

**LoadingScreenUI** (prefab, in `Assets/Content/Graphics/UI/Loading Screen`)
- "Fix restart bug (#588)": added new objects, UI layout, Canvas Renderer, Animator and 1 more.
  - objects named in the change: Loading Text, Text (TMP), Loading Screen

**Container Display** (prefab, in `Assets/Content/Graphics/UI/Inventory/HumanoidInventory`)
- "Rework the container UI (#605)": added new objects, UI layout, Canvas Renderer, an unidentified script and 1 more; removed objects, UI layout, Canvas Renderer, DraggableWindow script and 1 more.
  - objects named in the change: Panel, Text, Container Section, Display

**Wet Floor Sign** (prefab, in `Assets/Content/Items/Functional/Tools/Custodial`)
- "Make floor sign openable/closeable  (#609)": prefab deleted.
  - objects named in the change: Attachment

**pepperspray** (prefab, in `Assets/Content/Items/Functional/Containers/Liquid`)
- "Create PepperSpray class to handle interaction with the pepper spray (#604)": added Audio Source, Particle System; removed ItemExaminable script; edited object setup, placed-prefab overrides.

**Soul** (prefab, in `Assets/Content/Systems/Player`)
- "Fix restart bug (#588)": new prefab added.

**Emergency Light Fixture** (prefab, in `Assets/Content/Structures/Wall Mounts/Lights`)
- "Add emergency light and light interactions (#610)": added EmergencyLightObject script, NetworkIdentity script; edited Light, Animator, object setup.

**2 prefabs with the same changes:** Light Bulb Fixture, Light Tube Fixture (in `Assets/Content/Structures/Wall Mounts/Lights`)
- "Add emergency light and light interactions (#610)": added NetworkIdentity script, SimpleLight script; edited object setup.

**2 prefabs with the same changes:** Item Grid Slot, Item Grid Item (in `Assets/Content/Graphics/UI/Inventory/HumanoidInventory`)
- "Rework the container UI (#605)": edited script settings.

**2 prefabs with the same changes:** Cigarette Vendor, Field of View Source (in `Assets`)
- "Fix restart bug (#588)": edited position/rotation/scale.

**PauseMenu** (prefab, in `Assets/Content/Graphics/UI/Game`)
- "Fix restart bug (#588)": edited script settings.

---
*Generated by ChangeLens from the project's version history. Version B.*
