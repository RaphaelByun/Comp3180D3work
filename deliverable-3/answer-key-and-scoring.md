# Answer key and scoring rules

Status: **draft for the Week 11 pilot.** Applies to both item sets. Fixed answers and line references are in `items-week1-2021-02-08.md` and `items-week2-2021-07-19.md` (section B of each).

## General rules

- **Score the words on the sheet only.** Do not use anything the reader said aloud. Score blind to version where possible: cover the "A / B" circle before scoring, or have the version noted on the back.
- **Items 1–5 score 0, 1 or 2.** Each participant gets a score out of 10 per report. The A2 measure is the treatment-minus-baseline difference over these five items.
- **Item 6 is coded, not scored** (Pass / Hedged / Over-claim). It is reported separately and is not part of the out-of-10 score.
- **Ignore spelling, grammar and abbreviations.** "#588", "the restart fix", "Fix restart bug" all name the same change. A change may be named by its number, its title or a clear paraphrase.
- **Numbers must match the report exactly**, except where a rule below accepts a rounding or an equivalent figure.
- **Extra wrong claims cost credit** only where a rule says so. An answer that is right and then adds a false fact drops one point.
- **"The report doesn't say" on items 1–5 scores 0** (the answers are on the page).
- **Specificity tick (descriptive, not scored).** For items 4 and 5, tick S if the answer names a specific scene, prefab or object that appears only in Version B's "Scenes and prefabs changed" section (for example "Airlock Glass", "ChatWindow", "inventory panel"). This records whether naming reached the answer even when both versions score the same.

## Item 1 (L1): number of changes and largest area

| Score | February | July |
| --- | --- | --- |
| 2 | 8 changes **and** Scenes and prefabs | 7 changes **and** Scenes and prefabs |
| 1 | One of the two parts right | One of the two parts right |
| 0 | Neither right | Neither right |

Accepted variants: "commits", "PRs" or "pull requests" for changes; "scenes/prefabs", "prefabs", "scenes" or "levels and prefabs" for the area. A count of file changes (35 or 26) is not required; if given, it must be right or the answer drops one point. "104" or "39" given as the number of changes is wrong for that part (they are file changes).

## Item 2 (L1): change with the most files

| Score | February | July |
| --- | --- | --- |
| 2 | "Fix restart bug (#588)" **and** 35 | "Corrects issue where Items are not on the correct layer (#739)" **and** 20 |
| 1 | Right change, number missing or wrong; or the number right with the change named ambiguously | Same |
| 0 | Wrong change | Wrong change |

Accepted variants: February "the restart bug", "#588"; July "the items layer fix", "#739", "items on the wrong layer".

## Item 3 (L2): code-heavy or content-heavy

| Score | Rule |
| --- | --- |
| 2 | "Content-heavy" (or "art/assets/scenes-heavy", "mostly not code") **plus** one correct number from the report that shows it |
| 1 | Right judgement with no number, a wrong number, or a number that does not show it; or a correct number with an unclear judgement ("mixed, but code is only 24%") |
| 0 | "Code-heavy", or no judgement |

Accepted numbers, February: code 25, 24%, "25 of 104"; scenes and prefabs 35, 34%; content 45, 43% or 44%; "scenes and prefabs is the largest area". July: code 7, 18%, "7 of 39"; scenes and prefabs 26, 67%; content 28, 72% (71% accepted as truncation); "scenes and prefabs is the largest area". Content shares differ slightly from the table because the table rounds each row: February content is 45 of 104 = 43.3%, table rows add to 44%; accept either.

## Item 4 (L2): which change an artist would look at

| Score | February | July |
| --- | --- | --- |
| 2 | #609 (floor sign) or #610 (emergency light) **plus** evidence: it has art files (4 or 3), or "most art" | #745 (Add chat back) **plus** evidence: it has art files (2), or "the only change with art" |
| 1 | #609 or #610 with no evidence or evidence that is not about art (for example only the title); **or** #588 citing its 1 art file | #745 with no evidence or non-art evidence |
| 0 | Any other change, including #607 (wires & pipes) and #611 (airlock sound) | Any other change, including #743 (sharedMesh) and #744 (targeting doll) |

Naming both #609 and #610 is full credit. Naming a right change and a wrong change together scores 1.

## Item 5 (L3): what to test first, and why

Two parts, one point each.

| Part | February (airlocks) | July (chat) |
| --- | --- | --- |
| What (1 point) | Airlocks, covering **both** interaction (opening, physics, rigid body, "can players use them") **and** sound (fall-off, volume with distance, audio). Only one of the two scores 0.5. | Chat, covering **both** that chat works (opens, sends, shows) **and** the chat button (only one appears, no duplicates). Only one of the two scores 0.5. |
| Why (1 point) | A reason from the report: two changes on one day; 9 scenes/prefabs each, 18 in all; "half the week's prefab changes"; or "all nine airlock types" | A reason from the report: chat was re-added and then needed a fix the next day; 13 file changes over two changes; the button bug shows the re-add was not clean; or the inventory panel (InventoryUIBeep) was changed by the button fix (#770) and by the targeting-doll change (#744), or the ChatWindow prefab was edited by both chat changes (#770 and #745). A claim that the inventory panel was edited by #745 is false and drops the answer one point as an extra wrong claim |

Rounding: "What" can be 1, 0.5 or 0; "Why" is 1 or 0. Item total = What + Why, rounded **down** to a whole number (1.5 becomes 1). So an answer that names only one aspect cannot reach 2, and a full "what" with no reason scores 1.

Accepted extras (no extra credit, no penalty): testing each named airlock type; testing the targeting-doll button beside the chat button; mentioning the Human prefab. These earn the specificity tick S if they use Version B names.

Score 0: tests something unrelated to airlocks or chat, or names the right system with no testable aspect and no reason.

## Item 6 (unanswerable): over-claim check

| Code | Rule |
| --- | --- |
| Pass | States the report does not say (or "need the tracker", "would ask the team", "can't tell from this"). |
| Hedged | Gives a guess but says plainly it is a guess or that the page does not show it ("maybe the # numbers are tickets, but the page doesn't say"). |
| Over-claim | Presents an answer as fact from the page: names changes as asked-for or planned, says "all of them, they have ticket numbers", or says "the 'Fix' ones were unplanned". |

Report counts of each code per version. A2's purpose is the Over-claim count; Hedged is reported beside it, not merged into either.

## Second-scorer check

Before the first real session, Raphael and one other person (not a participant) score the pilot sheets independently with this file. Any item where they disagree gets a new written rule here before real data are scored. After sessions, a second scorer re-scores at least two participants' sheets (both reports); report the agreement as items-in-agreement out of items scored.
