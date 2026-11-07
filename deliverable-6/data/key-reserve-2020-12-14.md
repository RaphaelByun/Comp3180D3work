# Sealed key: SS3D reserve week of 14 December 2020 (RX)

Status: **AI-drafted on 21 Oct 2026** by an agent, from the frozen pages at `d9fa4bf` (branch `deliverable-2-changelens`; unchanged at `af23dab`) and the git ground truth. Follows the D3 pattern (`deliverable-3/items-week1-2021-02-08.md` and `items-week2-2021-07-19.md`, section B) and the rules in `deliverable-3/answer-key-and-scoring.md` (branch `deliverable-3-instruments`). Kept outside the repository until the SE2 answers for RX are committed; its SHA-256 is in `deliverable-5/self-evaluation-plan.md` section 5. This file is LF, UTF-8 without BOM: hash it as it is.

Question sheet: `deliverable-5/solo/items-reserve-2020-12-14.md` (branch `deliverable-5-sessions`).

Pages:
- Version A (baseline): `study/reserve/2020-12-14/report-A-baseline.md`
- Version B (treatment): `study/reserve/2020-12-14/report-B-treatment.md`

Line references: lines 1–27 are identical in A and B, so "L18" means line 18 of either version. "B L51" means line 51 of Version B only.

Ground truth (all at `d9fa4bf`): `study/reserve/2020-12-14/export/log.txt` ("log L…"), `export/assets.patch` ("patch L…"), and `git show <hash>` in `prototype-data/SS3D`. Commits: `c9a2e9c` (#579), `3da514e` (#577), `c12b593` (#578). Dates are author-local, as on the page.

---

## B. Researcher key

Slot plan matches the study weeks: 1 = L1 count, 2 = L1 lookup, 3 = L2 meaning of the mix, 4 = L2 which discipline, 5 = L3 what to test next, 6 = unanswerable. L1–L3 are Endsley (1995). Items 1–4 use the same wording as the study weeks. Item 6 asks a third, different out-of-page question, so it is not simply recognised.

| # | Level | Naming role | Fixed answer | Page lines | Ground-truth evidence | What A and B each let a reader answer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L1 | Control | **3 changes; Scenes and prefabs** (33 of 82 file changes). | L3 "3 changes by 2 people · 82 file changes"; L12 "Scenes and prefabs \| 33 \| 40%"; L18 "Largest area this week: **Scenes and prefabs** (33 of 82 file changes)." | log.txt holds 3 commits (log L1, L11, L115) and 82 file lines (1 at L9, 77 at L37–L113, 4 at L123–L126). `git log --since=2020-12-10 --until=2020-12-24` in SS3D shows no other commit between 14 and 21 Dec (next is #581 on 22 Dec). Scene/prefab files: 32 in #577 (log L63, L64, L66, L68, L70, L72–L90, L94, L96, L98, L100, L102, L104, L108, L112) + 1 in #578 (log L126). Matches A2's public "3 changes". | Both: full answer from shared lines L3, L12, L18. |
| 2 | L1 | Control | **"Model fixing (Once again) (#577)", 77 files.** | L25 "Tue 15 Dec \| Model fixing (Once again) (#577) \| 77 \| …". No other row exceeds 4 (L24–L26). | `3da514e` (log L11, title L15), file lines log L37–L113 = 77. #579 has 1 (log L9), #578 has 4 (log L123–L126). | Both: full answer from L25. |
| 3 | L2 | Control | **Content-heavy.** Code is 3 of 82 file changes (4%); scenes and prefabs 33 (40%) and art 29 (35%), so content (scenes and prefabs, art, audio) is 62 of 82 (table shares add to 75%; 62/82 = 75.6%). | L11 Code 3, 4%; L12 Scenes and prefabs 33, 40%; L13 Art 29, 35%; L14 Audio 0, 0%; L18. | Code = 3: `SSRTLib.cginc` (log L9), `DeferredShadingWrap.shader` (log L62), `Welder.cs` moved (log L92). Art = 29: 24 `.fbx` models (log L37–L60) + `CrateSwing.anim` (L65) + `LockerSwing.anim` (L71) + #578's controller and two `.anim` (L123–L125). | Both: full answer from shared lines L11–L18. |
| 4 | L2 | Control | **"Model fixing (Once again) (#577)"** with art evidence: 26 art files or "most art" (the title alone is not evidence). Second-best: "Retime move cycle (#578)" (3 art files, all animation). Distractor: "Fix SSRT (#579)" (1 code file, no art). | L25 "#577 \| 77 \| 2 code · 32 scenes/prefabs · 26 art · …"; L26 "#578 \| 4 \| 1 scene/prefab · 3 art"; L24 "#579 \| 1 \| 1 code". | #577 changes 24 models (`.fbx`, log L37–L60, one new: `wood panels.fbx`, L60) and 2 animations (L65, L71). #578 changes the animator controller and two movement animations (log L123–L125). #579 changes one shader library file (log L9; body L7: "Flips SSRT when using OpenGL drivers"). | Both: full answer from shared lines L24–L26. B adds which objects #577 touched (B L32–L61: welders, wood panels, lockers, crate, vendors, desk lamp, 19 posters), which earns the specificity tick only. |
| 5 | L3 | **Naming-sensitive** (target item) | **Test the player character's walk and run: that the walk and run animations play right and that how fast the character moves matches them**, because the change edited the movement animations (3 art files) and a prefab together, so the two must still match. Version B adds that the prefab is **Human** and that its script settings were edited. | L26 "Mon 14 Dec \| Retime move cycle (#578) \| 4 \| 1 scene/prefab · 3 art". B L51–L52 "**Human** (prefab, in `Assets/Content/Creatures/Player Races/Human`) / - "Retime move cycle (#578)": edited script settings." | `c12b593` (log L115, title L119, body L121: "Fix run/walk animation asymmetry. Adjust movement speed and animation timing to better match animations."). Files: `HumanCharacterAnimator.controller`, `RunAnim.anim`, `WalkAnim.anim`, `Human.prefab` (log L123–L126). The script settings are the speeds: `runSpeed: 5` → `5.5`, `walkSpeed: 2` → `1.5` (patch L4228–L4231). The body (L121) is on neither page. | A: full-credit route through the title "Retime move cycle" (timing of the movement) plus "1 scene/prefab · 3 art" (animations and a prefab changed together). A does not say which prefab or that settings changed. B: names the Human prefab and "edited script settings", so a B reader can tie the speed to the player character. Neither page gives the speed values. |
| 6 | Unanswerable | Control (neither version can answer) | **"The report doesn't say."** Who reported a problem lives in the issue tracker or with the team; the page reads the version history only. "Fix" in "Fix SSRT" and "Model fixing" does not say the problem was reported, or by players. | L22 column heading "Change (as its author described it)"; A L29 / B L64 "Generated by ChangeLens from the project's version history." No line mentions players, reports, issues or a tracker. | The full commit messages (log L5–L7, L15–L35, L119–L121) name no issue, report or player, and carry no "Fixes #…" or "Closes #…" reference. The committer of all three is GitHub (`git show -s --format=fuller c9a2e9c 3da514e c12b593` in SS3D), so the history records the merge, not why it was asked for. The "(#579)"-style numbers are pull request numbers in the title; the history does not say what, if anything, they were linked to. | Neither: both pages and the git history lack the answer. Pass / Hedged / Over-claim as in `answer-key-and-scoring.md` item 6. |

## Scoring rules for this week

Apply `answer-key-and-scoring.md` general rules (score words only; items 1–5 score 0, 1 or 2; "The report doesn't say" on items 1–5 scores 0; extra wrong claims cost one point only where a rule says so; specificity tick on items 4 and 5). Week-specific tables:

### Item 1 (L1)

| Score | Rule |
| --- | --- |
| 2 | 3 changes **and** Scenes and prefabs |
| 1 | One of the two parts right |
| 0 | Neither right |

Accepted variants as in D3 ("commits", "PRs", "pull requests"; "scenes/prefabs", "prefabs", "scenes"). "82" given as the number of changes is wrong for that part (it is file changes). A count of file changes is not required; if given, it must be 82 (or 33 for the area) or the answer drops one point. "Art" as the largest area is wrong for that part.

### Item 2 (L1)

| Score | Rule |
| --- | --- |
| 2 | "Model fixing (Once again) (#577)" **and** 77 |
| 1 | Right change, number missing or wrong; or 77 with the change named ambiguously |
| 0 | Wrong change |

Accepted variants: "#577", "model fixing", "the model fix". 82 is the week's total, not #577's, and scores as a wrong number.

### Item 3 (L2)

| Score | Rule |
| --- | --- |
| 2 | "Content-heavy" (or "art/assets/scenes-heavy", "mostly not code") **plus** one correct number that shows it |
| 1 | Right judgement with no number, a wrong number, or a number that does not show it; or a correct number with an unclear judgement |
| 0 | "Code-heavy", or no judgement |

Accepted numbers: code 3, 4%, "3 of 82"; scenes and prefabs 33, 40%; art 29, 35%; content 62, 75% or 76%; "scenes and prefabs is the largest area".

### Item 4 (L2)

| Score | Rule |
| --- | --- |
| 2 | #577 **plus** art evidence: it has 26 art files or "most art". Also 2: #577 and #578 together with art evidence |
| 1 | #577 with no evidence or evidence that is not about art (for example only the file count 77, or only the title); **or** #578 alone citing its 3 art files or animations; **or** #577 and #578 named together with no evidence; **or** a right change named together with #579 |
| 0 | #579 alone, #578 with no art evidence, or no change named |

### Item 5 (L3)

Two parts, one point each, as in D3.

| Part | Rule |
| --- | --- |
| What (1 point) | The walk/run (move cycle), covering **both** the animation (walk and run animations play right, smoothly, in time) **and** the movement speed or its match to the animation (how fast the character walks or runs, feet not sliding, speed fits the animation). Only one of the two scores 0.5. |
| Why (1 point) | A reason from the report: the change edited animation (art) files and a prefab together, so they may no longer match; "retimed" means the timing of movement changed; (B) the Human prefab, the player character, had its script settings edited; (B) it is the only change to the Human prefab. |

Rounding as in D3: What 1, 0.5 or 0; Why 1 or 0; total rounded down. Extra wrong claims that drop the answer one point: that #578 changed code (it has none), or that the Human prefab was edited by #577 (it was not, B L51–L52). Exact speed values are not on either page; giving them as fact from the page counts as an extra wrong claim. Accepted extras (no credit, no penalty): testing in multiplayer, testing other creatures. Specificity tick S: names Human (B only).

Score 0: tests something other than the player's movement, or names movement with no testable aspect and no reason.

### Item 6 (unanswerable)

| Code | Rule |
| --- | --- |
| Pass | States the report does not say (or "need the tracker / issues", "would ask the team", "can't tell from this"). |
| Hedged | Gives a guess but says plainly it is a guess or that the page does not show it ("the 'Fix' ones might be, but the page doesn't say"). |
| Over-claim | Presents an answer as fact: names "Fix SSRT" and/or "Model fixing" as player-reported, says "all of them, they have # numbers", or says "none of them were reported". |

## Why item 5 is the naming target

As in the study weeks, Version A gives a full-credit route: the title says the move cycle was retimed, and the row shows animation files and one prefab changed together. Version B names the Human prefab and says its script settings changed, which is where the speeds live. The A2 hypothesis predicts more specific answers in B (naming the player character and the speed). Items 1–4 and 6 rest only on lines 1–27, which A and B share, so they are controls.

Matching notes. This week is small (3 changes, 82 file changes, one change carrying 77 of them). Item 5 rests on a 4-file change, smaller than the study weeks' 18 and 13 file changes, so a B advantage here would come from one naming line (B L51–L52).

## Verification (21 Oct 2026)

- Both pages read at `d9fa4bf`; `git diff d9fa4bf af23dab -- study/reserve` is empty, and each page compares byte-equal at both commits. `diff` of A against B: only B L28–L62 added (lines 1–27 shared; A L28–L29 = B L63–L64 footer).
- Per-commit counts from log.txt: #579 1 (1 code), #577 77 (2 code, 32 scenes/prefabs, 26 art, 3 data/settings: `.asset` at log L67, L106, L110; 14 `.meta`), #578 4 (3 art, 1 scene/prefab). Totals 3 / 33 / 29 / 3 / 14 = 82. Authors: Seteron (#579, #578) and João Buratto (#577) = 2 people. All match L3, L11–L16, L24–L26.
- Version B lists 33 scenes and prefabs (5 + 1 + 1 + 1 + 2 + 1 + 1 + 19 + 2), matching L12.
- Date: `c12b593` is 2020-12-14 18:54 −0600 (author-local Mon 14 Dec, as on the page; 15 Dec in UTC).
- Item 6 checked against the full commit bodies in SS3D (`git log -1 --format=%B` for each hash): no issue, report or reviewer line.
