# Fidelity checklist, scored: SS3D week of 2021-07-19 (Version B, treatment)

First scorer. Each claim was checked against the commits in `/home/user/Comp3180D3work/prototype-data/SS3D` (`git show --name-status`, `git show --stat`) and against `export/log.txt`. Rows 15 to 28 were checked against the YAML hunks in `export/assets.patch` (the same text as `git show <hash> -- <path>`), with script guids resolved through `export/guids.txt`. Counts were redone by hand from the `--name-status` lists, not taken from the report. Pass rule (A2): none contradicted and at least 90% supported.

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
| 15 | Scenes and prefabs changed | 24 scenes and prefabs changed | 6 commits (all) | S | Distinct .unity/.prefab paths across the 6 commits: ServerLobby, SpaceCleaner, ChatWindow (x2 commits), InventoryUIBeep (x2), Human, 19 item prefabs = 24 distinct (26 file changes) |
| 16 | Scenes and prefabs changed | ChatWindow — "Fix multiple chat buttons (#770)": removed objects, UI layout, Canvas Renderer, placed-prefab overrides and 2 more. | 65537cc | S | `git show 65537cc -- .../ChatWindow.prefab`: `---- !u!1` GameObject blocks `Text` and `ChatButton` removed, with their `RectTransform`, `CanvasRenderer`, and `--- !u!1001 PrefabInstance` (ItemDisplay) removed. The "2 more" are removed script components: ToggleChat (guid 2305dcef… = ToggleChat.cs.meta) and Unity UI Text/Image/Button (guids not in the repo). See note 3. |
| 17 | Scenes and prefabs changed | ChatWindow — objects named in the change: Text, ChatButton, ItemDisplay | 65537cc | S | Removed lines `-  m_Name: Text`, `-  m_Name: ChatButton`, `-      value: ItemDisplay` under `propertyPath: m_Name` |
| 18 | Scenes and prefabs changed | ChatWindow — "Add chat back (#745)": added new objects, UI layout, Canvas Renderer, Canvas Group and 3 more; edited Canvas. | c36c573 | S | `git show c36c573 -- .../ChatWindow.prefab`: `+--- !u!1` GameObjects Text and ChatButton, `+RectTransform`, `+CanvasRenderer`, `+--- !u!225 CanvasGroup`, `+PrefabInstance` (ItemDisplay), added ToggleChat script and Unity UI scripts = the 3 more; hunk `@@ -3917,7 +3968,7 @@ Canvas:` `-m_SortingOrder: 0` / `+m_SortingOrder: 1`. See note 3. |
| 19 | Scenes and prefabs changed | ChatWindow — objects named in the change: Text, ChatButton, Panel, Chat Window, ItemDisplay | c36c573 | S | `+  m_Name: Text`, `+  m_Name: ChatButton`, `  m_Name: Panel` (context in `@@ -2268,6 +2360,7 @@ GameObject:`), `-  m_Name: Chat Window`, `+      value: ItemDisplay` |
| 20 | Scenes and prefabs changed | InventoryUIBeep — "Fix multiple chat buttons (#770)": added new objects, UI layout, Canvas Renderer, placed-prefab overrides and 2 more. | 65537cc | S | `git show 65537cc -- .../InventoryUIBeep.prefab`: `+GameObject` ChatButton and Text, `+RectTransform`, `+CanvasRenderer`, `+PrefabInstance` (ItemDisplay); the 2 more are the added ToggleChat script (2305dcef…) and Unity UI Image/Button/Text scripts. The chat button moved here from ChatWindow (row 16). |
| 21 | Scenes and prefabs changed | InventoryUIBeep — objects named in the change: ChatButton, Text, ItemDisplay | 65537cc | S | `+  m_Name: ChatButton`, `+  m_Name: Text`, `+      value: ItemDisplay` |
| 22 | Scenes and prefabs changed | InventoryUIBeep — "Add targeting doll button (#744)": added new objects, UI layout, Canvas Renderer, Canvas Group and 3 more. | f1c0e55 | S | `git show f1c0e55 -- .../InventoryUIBeep.prefab`: `+GameObject` Text and ExpandBodyButton, `+RectTransform`, `+CanvasRenderer`, `+--- !u!225 CanvasGroup`, `+PrefabInstance` (ItemDisplay), added ToggleBodyTargetUI script (guid 8ceb4761… = ToggleBodyTargetUI.cs.meta) and Unity UI scripts = the 3 more |
| 23 | Scenes and prefabs changed | InventoryUIBeep — objects named in the change: Text, ExpandBodyButton, Body Parts, ItemDisplay | f1c0e55 | S | `+  m_Name: Text`, `+  m_Name: ExpandBodyButton`, `  m_Name: Body Parts` (context in `@@ -7114,6 +7326,7 @@ GameObject:`, where `+  - component:` adds the CanvasGroup to it), `+      value: ItemDisplay` |
| 24 | Scenes and prefabs changed | ServerLobby — "Show selected setting (#772)": edited script settings. | 8d38914 | S | `git show 8d38914 -- .../ServerLobby.unity`: four `@@ ... @@ MonoBehaviour:` hunks change button `m_HighlightedColor`/`m_PressedColor`/`m_SelectedColor`/`m_DisabledColor` to an orange tint; one adds `+  rt: {fileID: 0}`. True, but vague: "script settings" here means four buttons' hover/selected colours. |
| 25 | Scenes and prefabs changed | 19 prefabs (beaker, LargeBeaker, SmallBeaker, mug, HardHatRed, HardHatYellow, HighPowerCell, CrayonBlack, CrayonBlue, CrayonGreen, CrayonOrange, CrayonPurple, CrayonRed, CrayonWhite, CrayonYellow, BluespacePowerCell, HyperPowerCell, PowerCell, SuperPowerCell) — "Corrects issue where Items are not on the correct layer. (#739)": edited object setup. | edc747c | U | `git show edc747c -- <each prefab>`: every hunk is `@@ ... @@ GameObject:` with `-  m_Layer: 0` / `+  m_Layer: 16` (layer 16 = `Item` in TagManager.asset at edc747c); three root objects also renamed (`Beaker`→`beaker`, `Mug`→`mug`, `HighPower Cell`→`HighPowerCell`). The 19 names are right, but "edited object setup" tells a producer nothing they can check against this, and could be read as a structural change. The real change (objects moved to the Item layer, plus three renames) is not stated. See note 4. |
| 26 | Scenes and prefabs changed | 19 prefabs (beaker, LargeBeaker, SmallBeaker, mug, HardHatRed, HardHatYellow, HighPowerCell, CrayonBlack, CrayonBlue, CrayonGreen, CrayonOrange, CrayonPurple, CrayonRed, CrayonWhite, CrayonYellow, BluespacePowerCell, HyperPowerCell, PowerCell, SuperPowerCell) — objects named in the change: Beaker, Lid, Liquid, Attachment, Mug, GameObject and 1 more | edc747c | S | `m_Name:` lines in the hunks: `Beaker` (beaker.prefab), `Lid`, `Liquid`, `Attachment` (beakers, mug), `Mug` (mug.prefab), `GameObject` (HardHatRed/Yellow); the 1 more is `HighPower Cell` (`-  m_Name: HighPower Cell` in HighPowerCell.prefab). All 7 are in changed lines or hunk context. |
| 27 | Scenes and prefabs changed | Human — "Add chat back (#745)": edited ChatRegister script settings. | c36c573 | S | `git show c36c573 -- .../Human.prefab`: `-  m_Enabled: 0` / `+  m_Enabled: 1` on the component with `m_Script ... guid: fc0556901c8047ec9c6e4283a9f1f7c8` (= Assets/Engine/Chat/ChatRegister.cs.meta in guids.txt). Not mentioned: a second hunk removes `ObstacleMask` and `ViewRange` from the Examinator component (guid a5c7da5d…). See note 5. |
| 28 | Scenes and prefabs changed | SpaceCleaner — "Fix space cleaner looping (#771)": edited placed-prefab overrides. | 98fc1a8 | S | `git show 98fc1a8 -- .../SpaceCleaner.prefab`: one hunk `@@ -487,6 +487,11 @@ PrefabInstance:` adds an override `propertyPath: looping` / `value: 0` |

Notes for the second scorer:

1. The page uses each commit's author-local date. Ryan089's two commits are 20 July in his time zone (+1000) but 19 July in UTC and in James's zone (-0400); James's last commit is 24 July in his zone but 25 July in Sydney time. So "20 July to 24 July" is right by git's recorded author dates, but no single clock gives that range. I scored it S because every date matches the author date git stores; the page should say whose time zone it uses.
2. "Art" includes a material (SingleColorMaterial.mat) as well as the new icon. That is how the classifier is set up, and the claim is right under it.
3. Rows 16, 18, 20 and 22 are true as written but leave things out. When a component type appears in the added or removed list, the page drops all edits to existing components of that type. In ChatWindow (65537cc) it does not mention the tag change `-  m_TagString: Untagged` / `+  m_TagString: ChatWindow`, which goes with the new `ChatWindow` tag in TagManager.asset and is probably the actual fix. In ChatWindow (c36c573) it does not mention the root object being renamed from `Chat Window` to `ChatWindow`, or the many edits to existing script components (including `m_UiScaleMode: 0` → `1`). Also, "placed-prefab overrides" is used for a whole placed prefab (ItemDisplay) being added or removed, which a producer could read as only overrides changing. I did not score these as C because nothing stated is wrong.
4. Row 25 is the only U. I did not score it C: the hunks really are in GameObject blocks, so "object setup" is not false. But a producer cannot learn from it what the commit message says ("Items are not on the correct layer").
5. Row 27 is true but incomplete: only the ChatRegister edit has a script name in its hunk context, so the Examinator field removal disappears from the page.

Totals: Supported 27 of 28 · Contradicted 0 · Unsupported 1 (row 25) · 96.4% supported. **Pass** (no claim contradicted, 96.4% ≥ 90%).

## Second scorer

Independent re-check, done 12 October 2026 against `/home/user/Comp3180D3work/prototype-data/SS3D`. I tried to break every row rather than confirm it. The first scorer's column above is left as it was.

What I ran:

- Rows 1 to 14 are the same claims as Version A. `diff` of the two reports shows B is A plus the "Scenes and prefabs changed" section, and the footer is the only other difference. I re-derived the same numbers: 7 commits (`edc747c^..8d38914`, and no others in a 17 to 28 July window), 2 authors, and 39 `--name-status` entries (6 A, 33 M). By category that is 7 code, 26 scenes/prefabs, 2 art, 0 audio, 1 data/settings and 3 .meta, with shares of 18%, 67% and 5%. Rows 8 to 14 are right per commit, and so are the weekdays.
- `export/assets.patch` has 165 `@@` hunks. `git show` over the scene/prefab paths of the six commits also gives 165, so the frozen input matches git.
- Row 15: distinct .unity/.prefab paths come to ServerLobby, SpaceCleaner, ChatWindow, InventoryUIBeep, Human plus 19 item prefabs, which is 24.
- Rows 16, 18, 20 and 22, the block types added or removed (`^[-+]--- !u!` lines):
  - 65537cc ChatWindow removes GameObject x2, RectTransform x3, CanvasRenderer x2, PrefabInstance x1 and MonoBehaviour x4. The four MonoBehaviour guids are 2305dcef… (ToggleChat.cs.meta in guids.txt) plus 4e29b1a8…, 5f7201a1… and fe87c0e1…, none of which are in the repo. That is 6 described kinds, so "4 named and 2 more" is right.
  - c36c573 ChatWindow adds the same blocks plus one CanvasGroup (`!u!225`). That is 7 kinds, so "4 and 3 more" is right. The only Canvas hunk changes `m_SortingOrder: 0` to `1`, which supports "edited Canvas".
  - 65537cc InventoryUIBeep adds the same kinds as ChatWindow loses, so "4 and 2 more" is right.
  - f1c0e55 InventoryUIBeep adds those kinds plus a CanvasGroup, with ToggleBodyTargetUI (8ceb4761…) in place of ToggleChat. That is 7, so "4 and 3 more" is right.
- Rows 17, 19, 21 and 23: the named objects match the `m_Name:` and `value:` lines in the hunks. Names equal to the asset's own file name (`ChatWindow`) are left out by design (`ProducerReport.DescribeInside`, `a.ObjectNames.Where(n => n != a.AssetName)`).
- Row 24: four `MonoBehaviour:` hunks in ServerLobby.unity change Highlighted/Pressed/Selected/Disabled colours to `{r: 0.835, g: 0.627, b: 0.294}`, and a fifth adds `rt: {fileID: 0}`. Nothing outside script blocks changes.
- Row 25: every one of the 19 prefabs has only `GameObject:` hunks, each changing `m_Layer: 0` to `m_Layer: 16`. In `git show edc747c:ProjectSettings/TagManager.asset`, layer 16 is `Item`. Three root objects were also renamed: `Beaker`→`beaker`, `Mug`→`mug` and `HighPower Cell`→`HighPowerCell`.
- Row 26: `m_Name:` lines across the 19 hunks give Attachment, Beaker, Lid, Liquid, Mug, GameObject and HighPower Cell. They also give each item's own root name, which is dropped because it equals the file name; the comparison is case-sensitive, so `Beaker` is kept in beaker.prefab and `beaker` is dropped. That leaves 7 names, which is "6 and 1 more" as printed.
- Row 27: the Human.prefab hunk at line 290 sets `m_Enabled: 0`→`1` on the ChatRegister component (`fc055690…`). The second hunk removes `ObstacleMask`/`ViewRange` from the component whose `m_Script` guid is a5c7da5d… (Examinator.cs.meta). I confirmed this at `c36c573^`, lines 389–406.
- Row 28: the single hunk in SpaceCleaner.prefab is `PrefabInstance:` and adds an override `propertyPath: looping`, `value: 0`.

Disagreements: **none.** I found no row where the verdict should change.

Rows I pushed hardest on, verdicts kept:

- Row 1 (S, kept S). Same point as in the Version A file. The range matches git's author-local dates, but in Sydney time the last change is 25 July and in UTC the first is 19 July. This is a wording fix, not a contradiction.
- Row 25 (U, kept U). I tested it both ways.
  - The case for S: GameObject blocks really are the only thing edited, so "edited object setup" is literally true.
  - The case for C: the heading "19 prefabs with the same changes" is not strictly true. Three of the 19 also had a root rename the others did not, and the number of objects edited ranges from 1 (each crayon and power cell) to 5 (each beaker). At the parser's level of detail, which is block types touched, the 19 are identical, though.
  - So neither S nor C holds cleanly. U is the honest call: a producer cannot check "object setup" against the commit's purpose (moving items to the Item layer). This matches the first scorer's cause analysis: `FriendlyType("GameObject")` gives a generic label, and grouping by identical `DescribeInside` text hides the renames.
- Rows 16, 18 and 27 (S, kept S). Each is true as written but leaves out a real change:
  - row 16 leaves out the root `m_TagString: Untagged`→`ChatWindow` edit, which goes with the new `ChatWindow` tag in TagManager.asset;
  - row 18 leaves out the `Chat Window`→`ChatWindow` root rename and the edits in 96 `MonoBehaviour:` hunks;
  - row 27 leaves out the Examinator field removal.

  Omission is not contradiction under the A2 rule, but the first two are the likely real fix in #770 and #745. They should be logged as Deliverable 2 repair items for the one hour of repair reserved for Deliverable 4.

Reconciled totals (Version B): Supported 27 · Contradicted 0 · Unsupported 1 (row 25) · Total 28 (96.4% supported).

**Final (second scorer): PASS against the A2 rule. None contradicted, and 96.4% is at least 90%.**
