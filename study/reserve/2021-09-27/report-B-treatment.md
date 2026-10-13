# What changed: SS3D week of 2021-09-27

**2 October 2021 · 2 changes by 1 person · 82 file changes**

*A "file change" is one file touched by one change; a file edited twice counts twice.*

## Where the work went

| Area | File changes | Share of all file changes |
| --- | ---: | ---: |
| Code | 25 | 30% |
| Scenes and prefabs | 24 | 29% |
| Art | 12 | 15% |
| Audio | 0 | 0% |

Supporting files: 1 data and settings, 20 Unity import settings (.meta), 0 other.

Largest area this week: **Code** (25 of 82 file changes).

## Changes, newest first

| Date | Change (as its author described it) | Files | What kind of files |
| --- | --- | ---: | --- |
| Sat 2 Oct | Completing container rework [ready for review] (#824) | 6 | 4 code · 2 scenes/prefabs |
| Sat 2 Oct | New Container Editor, multiple container on a single game object (#798) | 76 | 21 code · 22 scenes/prefabs · 12 art · 1 data/settings · 20 .meta |

## Scenes and prefabs changed

22 scenes and prefabs changed. Each is listed with what changed inside it.

**Human** (prefab, in `Assets/Content/Entities/Humanoids/Human`)
- "Completing container rework [ready for review] (#824)": added ContainerItemDisplay script; removed ContainerItemDisplay script; edited object setup.
  - objects named in the change: hand_r, hand_l
- "New Container Editor, multiple container on a single game object (#798)": added Animator, AttachedContainer script, ContainerDescriptor script; removed an unidentified script; edited object setup, placed-prefab overrides.
  - objects named in the change: hand_r, hand_l, DropShadowProjector

**CellCharger** (prefab, in `Assets/Content/Furniture/Machines/Science`)
- "Completing container rework [ready for review] (#824)": added ContainerItemDisplay script; removed ContainerItemDisplay script; edited object setup.
- "New Container Editor, multiple container on a single game object (#798)": removed an unidentified script; edited object setup.

**MiniStation** (scene, in `Assets/Content/Scenes/Maps`)
- "New Container Editor, multiple container on a single game object (#798)": added new objects, placed-prefab overrides, position/rotation/scale, TileMap script; removed placed-prefab overrides, PlacedTileObject script; edited Render Settings.
  - objects named in the change: Plenum, MetalDoorFrame, APC_0, LightTubeFixture_0, MetalWallReinforced, PipesLayer3 and 87 more

**Janitorial Cart** (prefab, in `Assets/Content/Furniture/Storage/Carts`)
- "New Container Editor, multiple container on a single game object (#798)": added Animator, ContainerDescriptor script, AttachedContainer script, ContainerInteractive script and 1 more; edited object setup, placed-prefab overrides.
  - objects named in the change: cardboard box

**MotorizedJanitorialCart** (prefab, in `Assets/Content/Furniture/Storage/Carts`)
- "New Container Editor, multiple container on a single game object (#798)": new prefab added.

**microwave** (prefab, in `Assets/Content/Furniture/Machines/Kitchen/Microwave`)
- "New Container Editor, multiple container on a single game object (#798)": added Light, Microwave script; removed ContainerInteractive script, Microwave script; edited object setup.

**2 prefabs with the same changes:** MopBucket, Enforcer (in `Assets/Content`)
- "New Container Editor, multiple container on a single game object (#798)": added Animator, ContainerDescriptor script, AttachedContainer script, ContainerInteractive script and 1 more; edited object setup.

**DisposalBin** (prefab, in `Assets/Content/Furniture/Machines/Supply/DisposalBin`)
- "New Container Editor, multiple container on a single game object (#798)": added ContainerDescriptor script, DisposalBin script; removed DisposalBin script; edited object setup.

**LockerSecure** (prefab, in `Assets/Content/Furniture/Storage/Lockers`)
- "New Container Editor, multiple container on a single game object (#798)": removed ContainerInteractive script; edited position/rotation/scale, object setup.

**CardboardBox** (prefab, in `Assets/Content/Items/Functional/Containers/Object`)
- "New Container Editor, multiple container on a single game object (#798)": added ContainerSync script; removed ContainerInteractive script; edited object setup.

**2 prefabs with the same changes:** CigarettePack, Toilet (in `Assets/Content`)
- "New Container Editor, multiple container on a single game object (#798)": added ContainerDescriptor script; removed ContainerInteractive script; edited object setup.

**2 prefabs with the same changes:** Locker, TankStorageUnit (in `Assets/Content/Furniture`)
- "New Container Editor, multiple container on a single game object (#798)": removed an unidentified script; edited object setup.

**5 prefabs with the same changes:** medkit, RedToolbox, Crate, CrateSecure, fridge (in `Assets/Content`)
- "New Container Editor, multiple container on a single game object (#798)": edited object setup.
  - objects named in the change: Medkit

**TableLamp** (prefab, in `Assets/Content/Items/Functional/Generic`)
- "New Container Editor, multiple container on a single game object (#798)": added Light; edited object setup, script settings.

**MainMenu** (scene, in `Assets/Content/Scenes`)
- "New Container Editor, multiple container on a single game object (#798)": edited Render Settings, placed-prefab overrides, an unidentified script settings.
  - objects named in the change: Network Manager

---
*Generated by ChangeLens from the project's version history. Version B. In "and N more", scripts the project does not contain (such as Unity's own UI scripts) count together as one.*
