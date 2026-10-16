# Trying ChangeLens yourself

A 15-minute hands-on check of the committed tier (Deliverable 2). Everything below runs on this PC; nothing is uploaded.

## 1. Open the project

1. Make sure this folder is on the `deliverable-2-changelens` branch (`git switch deliverable-2-changelens`).
2. Unity Hub → **Add** → **Add project from disk** → pick `ChangeLens-proto`. It needs Unity **6000.4.10f1**. The first open imports for a minute or two.
3. In Unity: **Window → ChangeLens Producer Page**. (The older **Window → ChangeLens** is the A2 prototype that only sorts files.)

## 2. Look at what participants will read (frozen weeks)

1. Click **Frozen study week** at the top, then **Browse** to `study/week1-2021-02-08` (in this repository) and press **Generate**.
2. Flip between **Version A (baseline)** and **Version B (treatment)**. B adds the "Scenes and prefabs changed" section; everything above it is identical in both.
3. Do the same for `study/week2-2021-07-19`.

What you should see:

| Week | Header line | Largest area |
| --- | --- | --- |
| `week1-2021-02-08` | 10 February 2021 to 14 February 2021 · 8 changes by 3 people · 104 file changes | Scenes and prefabs (35 of 104) |
| `week2-2021-07-19` | 20 July 2021 to 24 July 2021 · 7 changes by 2 people · 39 file changes | Scenes and prefabs (26 of 39) |

Dates in the page are each author's own local date, so a change made late on Sunday in one place can show as Monday elsewhere. That is intended and logged in the fidelity notes.

## 3. Generate a week straight from a repository

1. Click **From repository**. **Browse** to `prototype-data/SS3D` (the SS3D clone; it is not in git, it lives only on this PC).
2. Week starts `2021-02-08`, Days `7`, **Generate**. You should get the same page as the frozen February week: 8 changes, 104 file changes.
3. Try any other week, e.g. `2021-09-27` or `2020-12-14` (the reserves), or point it at another Unity repository you have (the Inkform repo works too).
4. **Save study files...** writes the frozen export plus both reports, the two fidelity checklists and the naming measures into a folder you choose. Use a scratch folder, not `study/`, unless you mean to replace a study week.

Weeks are cut at midnight UTC, so the result is the same whatever time or time zone you run it in. A commit at exactly midnight belongs to the week it starts.

The export follows the main line only. Work done on a branch shows up in the week the branch was merged, as one merge commit listing every file it brought in.

## 4. Run the tests

- In Unity: **Window → General → Test Runner → EditMode → Run All**. Expect 56 passing.
- Without Unity: `dotnet test tools/changelens-dotnet/tests/tests.csproj` (also 56).

## 5. Things worth trying to break

- A week with no commits (e.g. `2030-01-01`): it should say no commits were found, not crash.
- A folder that is not a git repository, or a typo in the date.
- A week with a huge merge or rename; check the "What kind of files" column still adds up to the Files number.
- Read Version B as if you were a producer: is any line confusing, too long, or wrong? Those notes feed the Week 11 pilot.

Write anything odd in `TRY-CHANGELENS-notes.md` (or just tell Claude) with the week and the version you were on.
