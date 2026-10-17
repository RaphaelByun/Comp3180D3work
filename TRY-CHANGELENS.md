# Trying ChangeLens yourself

A 15-minute hands-on check of the committed tier (Deliverable 2). Everything below runs on your own machine; nothing is uploaded.

## 1. Open the project

1. Clone this repository and switch to the `deliverable-2-changelens` branch (`git switch deliverable-2-changelens`).
2. Unity Hub → **Add** → **Add project from disk** → pick `ChangeLens-proto`. It needs Unity **6000.4.10f1**. The first open imports for a minute or two.
3. In Unity: **Window → ChangeLens Producer Page**. (The older **Window → ChangeLens** is the A2 prototype that only sorts files.)

> **Don't open the reserve weeks yet.** ChangeLens is evaluated by Raphael alone (decided 17 Oct 2026). The two reserve weeks, 14 Dec 2020 and 27 Sep 2021, are the unseen weeks for his timed self-read (SE2 in `deliverable-5/self-evaluation-plan.md` on branch `deliverable-5-sessions`). Until SE2 is scored, don't open anything under `study/reserve/`, don't generate those two weeks from the repository, and don't regenerate or edit the reserve pages. They were frozen at commit `d9fa4bf`. Use the two study weeks below.

## 2. Look at the frozen study weeks

1. Click **Frozen study week** at the top, then **Browse** to `study/week1-2021-02-08` (in this repository) and press **Generate**.
2. Flip between **Version A (baseline)** and **Version B (treatment)**. B adds the "Scenes and prefabs changed" section; everything above it is identical in both.
3. Do the same for `study/week2-2021-07-19`.
4. The window rebuilds the page from the week's `export/` folder with the current code. The evaluation uses the committed `report-A-baseline.md` and `report-B-treatment.md`. For July they are the same. For February, Version B in the window differs in two rows repaired on 17 Oct 2026 (pepperspray names the PepperSpray and Item scripts; Wet Floor Sign is listed once, as moved and rebuilt, so 25 scenes and prefabs, not 26). The package `CHANGELOG.md` lists both.

What you should see:

| Week | Header line | Largest area |
| --- | --- | --- |
| `week1-2021-02-08` | 10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes | Scenes and prefabs (35 of 104) |
| `week2-2021-07-19` | 20 July 2021 to 24 July 2021 · 7 changes by 2 people · 39 file changes | Scenes and prefabs (26 of 39) |

Dates in the page are each author's own local date, so a change made late on Sunday in one place can show as Monday elsewhere. That is intended and logged in the fidelity notes.

## 3. Generate a week straight from a repository

This needs a copy of SS3D, which is not in this repository (third-party, about 350 MB). From the repository root:

```
git clone --filter=blob:none https://github.com/RE-SS3D/SS3D prototype-data/SS3D
```

The study weeks are from 2020 and 2021. When they were frozen, the clone's newest commit was `2fcc16b6` (`study/SOURCE-AND-LICENCE.md`). A newer clone should hold the same weeks. The pages in `study/` are built from the frozen exports there, not from the clone.

1. Click **From repository**. **Browse** to `prototype-data/SS3D`.
2. Week starts `2021-02-08`, Days `7`, **Generate**. You should get the same counts as the frozen February week: 8 changes, 104 file changes.
3. Try any other week, or point it at another Unity repository you have (the Inkform repo works too). Don't pick `2020-12-14` or `2021-09-27`, the two reserve weeks, before SE2 is scored (see the note above section 2).
4. **Save study files...** writes the frozen export plus both reports, the two fidelity checklists and the naming measures into a folder you choose. Use a scratch folder, not `study/`, unless you mean to replace a study week.

Weeks are cut at midnight UTC, so the result is the same whatever time or time zone you run it in. A commit at exactly midnight belongs to the week it starts.

The export follows the main line only. Work done on a branch shows up in the week the branch was merged, as one merge commit listing every file it brought in. Under the merge row the page lists who wrote that work and up to five of their changes, and the header counts those people too. This matters when someone merges main into their branch and main then moves onto that branch: the main line then runs through their branch, and everyone else's work arrives inside the merge.

## 4. Run the tests

- In Unity: **Window → General → Test Runner → EditMode → Run All**. Expect 85 passing. The last Unity run, earlier on 17 Oct 2026, passed 76 (`prototype-logs/a3-tests-2026-10-17.xml`); nine tests were added after it and have run only in the .NET harness so far.
- Without Unity: `dotnet test tools/changelens-dotnet/tests/tests.csproj` (85 pass on 17 Oct 2026). One test rebuilds every frozen study and reserve week from its `export/` folder and compares the result with the committed pages, so it fails if a code change alters a frozen page. If it fails on a reserve week before SE2, don't read the diff it prints. The February week is checked against the two repaired rows listed above.

## 5. Things worth trying to break

- A week with no commits (e.g. `2030-01-01`): it should say no commits were found, not crash.
- A folder that is not a git repository, or a typo in the date.
- A week with a huge merge or rename; check the "What kind of files" column still adds up to the Files number.
- Read Version B as if you were a producer: is any line confusing, too long, or wrong? Use a study week, not a reserve week. There is no pilot: Raphael evaluates ChangeLens himself (17 Oct 2026 decision).

Write anything odd in `TRY-CHANGELENS-notes.md`, with the week and the version you were on.
