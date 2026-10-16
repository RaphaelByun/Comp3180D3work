# ChangeLens-lite — how it works

A plain-language walkthrough, written for someone who has not written C# in a while.
Read this once and you will be able to open the tool, run it, and explain every number on the screen.

---

## 1. What the thing actually is

ChangeLens-lite is a **Unity Editor package**. It adds one extra window to the Unity Editor, under
**Window > ChangeLens**. It does not run in the game, it does not touch your scenes, and it does not
talk to git directly.

You hand it **a text file**. That text file is what you get when you run this in any git repository:

```
git -c core.quotepath=false log --first-parent --diff-merges=first-parent --name-status --date=iso --since=2024-02-19 --until=2024-02-26 > week.txt
```

`--name-status` is the important part: it makes git print, under each commit, one line per file that
the commit touched, with a letter saying what happened to it (`A` added, `M` modified, `D` deleted,
`R094` renamed). `-c core.quotepath=false` makes git print file names with non-English letters as
they are, not as escape codes. ChangeLens can read the escape codes too, but the plain names are
easier to check by eye.

ChangeLens reads that text, sorts every path into a category (code / scenes / art / audio / data /
`.meta` / other), adds it all up, and shows you the result as a one-page report. There is also an
**Export report (.md)** button that writes the same report to a markdown file.

That is the whole tool. It is deliberately small — it exists to show that the *scoping method* in the
proposal works on a real repository, not to be a finished product.

---

## 2. The files, and what each one does

The package lives at:

```
ChangeLens-proto/Packages/com.raphaelbyun.changelens/
```

| File | What it does |
|---|---|
| `package.json` | The package's ID card. Name (`com.raphaelbyun.changelens`), display name (ChangeLens), version, minimum Unity version, author. Unity reads this to know the folder is a package. |
| `Editor/ChangeLens.Editor.asmdef` | An "assembly definition". It tells Unity: compile everything in this folder into its own little library, and only for the **Editor** — never into a game build. |
| `Editor/GitLogParser.cs` | **Reading.** Turns the git log text into C# objects. |
| `Editor/PathClassifier.cs` | **Sorting.** Decides what kind of file a path is, from its extension. |
| `Editor/ChangeReport.cs` | **Counting.** Adds everything up and can render the markdown report. |
| `Editor/ChangeLensWindow.cs` | **Showing.** The actual window, its buttons and its tables. |
| `Editor/ScreenshotBootstrap.cs` | A one-off helper that opened the window and took the two figures for the proposal. Not needed to use the tool; safe to delete. |
| `Samples~/ss3d-week.txt` | The sample export — one week of real history from the open-source Unity game SS3D. The `~` on the folder name is a Unity convention meaning "don't import this, just leave it on disk". |
| `Tests/Editor/*.cs` | The automated tests (see §6). |

### How they connect

```
week.txt  ──►  GitLogParser  ──►  list of CommitRecord
                                   (hash, author, date, subject, + list of FileChange)
                                          │
                                          ▼
                              ChangeReport.Build(...)
                                          │   (asks PathClassifier about every path)
                                          ▼
                                    ChangeReport
                                 (all the totals)
                                          │
                       ┌──────────────────┴──────────────────┐
                       ▼                                     ▼
              ChangeLensWindow                      ChangeReport.ToMarkdown()
             (draws it on screen)                   (writes the .md file)
```

The important design point, and the one worth saying out loud if you get asked about it:
**only `ChangeLensWindow.cs` knows about Unity.** The three files that do the real thinking
(`GitLogParser`, `PathClassifier`, `ChangeReport`) are plain C# with no `using UnityEditor` in them.
That is why they can be unit-tested, and why the logic would work outside Unity unchanged.

### `GitLogParser.cs` in a bit more detail

It walks the text one line at a time and asks, for each line:

- Does it start with `commit `? → start a new commit, remember the hash.
- Does it start with `Author:` or `Date:`? → store that.
- Is it indented by four spaces? → the **first** such line is the commit subject; the rest is the
  commit body and is ignored.
- Otherwise, does it look like `M<tab>some/path`? → record one file change.

Renames are the fiddly case: git writes them as `R094<tab>old/path<tab>new/path` — one letter, a
similarity score, and **two** paths. The parser stores the new path as the path and keeps the old
one alongside it.

### `PathClassifier.cs` in a bit more detail

At the top there are six plain lists of file extensions — `CodeExtensions`, `ScenePrefabExtensions`,
`ArtExtensions`, `AudioExtensions`, `DataConfigExtensions`. **If you want to change how files are
grouped, edit those lists — nothing else.**

The one clever bit is `.meta`. Unity writes a `.meta` sidecar next to nearly every asset, so a
Unity repo's history is full of them. ChangeLens puts every `.meta` in its own **Meta** category, and
*also* records what the sidecar belongs to: `Player.cs.meta` is Meta, but its *sibling category* is
Code. That way you can see `.meta` churn without it pretending to be real code.

### `ChangeReport.cs` in a bit more detail

It loops over every commit and every file in it, asks `PathClassifier` what the path is, and
increments counters. It produces:

- commit count, and the earliest/latest date seen
- total changed-file entries
- per category: added / modified / deleted / renamed / total
- `.meta` count broken down by what each sidecar belonged to
- which top-level folders were touched, busiest first
- the **code-file percentage**

---

## 3. Opening the window

1. Open the project `ChangeLens-proto` in Unity **6000.4.10f1** (Unity Hub → Open → pick the folder).
2. Wait for the spinner in the bottom-right to finish (Unity is compiling).
3. Menu bar → **Window → ChangeLens**.

If **ChangeLens** is not in the Window menu, there is a compile error. Open
**Window → General → Console** and look for a red line.

---

## 4. Loading the sample

The sample is already in the package:

```
ChangeLens-proto/Packages/com.raphaelbyun.changelens/Samples~/ss3d-week.txt
```

In the ChangeLens window:

1. Press **Browse** and navigate to that file (or paste the full path into the **Export file** box).
2. Press **Load**.

The blue box under the buttons tells you how many commits and how many file entries it found.

To make your own export from any repo — including Inkform — run:

```
git -c core.quotepath=false log --first-parent --diff-merges=first-parent --name-status --date=iso --since=2025-09-01 --until=2025-09-08 > week.txt
```

and load `week.txt` the same way.

---

## 5. What every number on the screen means

**Summary block**

| Row | Meaning |
|---|---|
| **Commits** | How many commits are in the export. The command walks the main line only (`--first-parent`), so a merged branch shows up as its one merge commit, listing every file the branch brought in, in the week it was merged. |
| **Date range** | The earliest and latest commit date in the file. A sanity check that you exported the week you meant to. |
| **Changed-file entries** | One entry = **one file touched by one commit**. If the same file is edited in three commits it counts three times. This is what a git log literally reports, and it is the denominator for the percentage below. |
| **Code-file entries** | How many of those entries were code files (`.cs`, `.shader`, `.hlsl`, `.uxml`, `.asmdef`, …). |
| **Code-file percentage** | Code-file entries ÷ changed-file entries, as a percentage. **`.meta` files count as non-code.** This is the headline figure quoted in the proposal. |

Why the `.meta` rule matters: a Unity repo produces a `.meta` next to almost every asset, so if you
counted `Player.cs.meta` as code the figure would drift upward for reasons that have nothing to do
with how much code was written. Excluding them makes the number mean "how much of this week's file
churn was actually source code".

**Category table** — one row per category, with four columns:

- **A** — added (new files)
- **M** — modified (existing files edited)
- **D** — deleted
- **R** — renamed or moved (git counts a move as a rename)
- **Total** — the four added together

A week with a big **R** number in almost every row is usually a reorganisation, not new work — that
is exactly what the SS3D sample week turns out to be, and it is a good example of why raw commit
counts are a bad proxy for effort.

**Top-level folders touched** — the first folder of each path (`Assets`, `Packages`, …) with how many
entries landed in it. Useful for spotting a week that was all tooling and no game.

**Commits** — one collapsible row per commit. Click the little triangle to see the author and every
file it touched, each with its status letter and the category ChangeLens assigned it. This is the
"show your working" view: if a number in the table looks wrong, open the commits and check.

**Export report (.md)** — writes the same report as a markdown file **next to the export you loaded**,
named `<export name>-changelens-report.md`. That file is what you paste into the proposal.

One has already been produced for you from the sample, so you can read it without opening Unity:
`Working folder/a2-final-sprint-17-sep-2026/prototype-data/ss3d-week-changelens-report.md`.

---

## 6. Running the tests

The package ships with 27 tests (about 60 individual assertions) across three test files, all checking a small hand-written
sample log that contains the three awkward cases: a rename, a `.meta` with a sibling asset, and a
deletion.

**In the Editor:**

1. **Window → General → Test Runner**
2. Choose the **EditMode** tab
3. Press **Run All**

Everything should go green.

**From a command line** (this is how they were run for the build log):

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" -batchmode -nographics ^
  -projectPath "...\ChangeLens-proto" -runTests -testPlatform EditMode ^
  -testResults "...\prototype-logs\tests.xml"
```

(Never add `-quit` to that command — Unity would exit before the tests finish.)

What the tests actually protect:

- `GitLogParserTests.cs` — that a commit header, an author, a date, a subject and each status letter
  are read correctly; that a commit *body* is not mistaken for a file; that `R094 old new` becomes a
  rename with both paths; that Windows line endings work; that empty input returns an empty list
  rather than crashing.
- `PathClassifierTests.cs` — that each extension lands in the right bucket; that `Player.cs.meta` is
  Meta with a Code sibling; that a dot in a *folder* name is not mistaken for an extension.
- `ChangeReportTests.cs` — the arithmetic. The sample has 7 file entries of which 2 are code, so the
  percentage must be 28.6%. If someone ever changes the `.meta` rule, this test fails loudly.

---

## 7. If you have to explain this in the Q&A

Three sentences that cover it:

1. "It reads a `git log --name-status` export — text — so it needs no git integration and works on
   any repository, including ones I can only read."
2. "Every path is classified by extension, with Unity's `.meta` sidecars pulled into their own
   category so they can't inflate the code figure; the rules are six editable lists in one file."
3. "The parsing, classifying and counting are pure C# with no Unity dependency, which is why they're
   unit-tested; only the window itself touches `UnityEditor`."

And the honest limitation, if asked: it counts *file entries*, not lines changed, and it has no idea
whether a change was large or small — it is a scoping lens, not a productivity measure.
