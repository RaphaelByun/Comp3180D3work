# ChangeLens-lite prototype — build log

Everything created on **17 September 2026**, for the COMP3180 A2 *Scoping Evidence* section.

---

## Unity version

**6000.4.10f1** — `C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe`

It created the project, compiled, ran the tests and took the screenshots on the first attempt.
The 6000.1.17f1 fallback was **not** needed.

---

## What was created

### The Unity project

```
Working folder/a2-final-sprint-17-sep-2026/ChangeLens-proto/
```

An otherwise empty Unity 6 project. Its only change outside the package is one line added to
`Packages/manifest.json`:

```json
"com.unity.test-framework": "1.5.1",
```

### The embedded package

```
ChangeLens-proto/Packages/com.raphaelbyun.changelens/
├─ package.json                              name com.raphaelbyun.changelens, ChangeLens 0.1.0, unity 6000.0
├─ Editor/
│  ├─ ChangeLens.Editor.asmdef               Editor platform only
│  ├─ GitLogParser.cs                        pure C#; parses git log --name-status (A/M/D/T, R###/C### with two paths)
│  ├─ PathClassifier.cs                      pure C#; Code / ScenePrefab / Art / Audio / DataConfig / Meta / Other
│  ├─ ChangeReport.cs                        pure C#; per-category A/M/D/R totals, code-file %, folders, markdown render
│  ├─ ChangeLensWindow.cs                    the EditorWindow, Window > ChangeLens, IMGUI
│  └─ ScreenshotBootstrap.cs                 one-off helper that produced Figures 1 and 2
├─ Samples~/
│  ├─ ss3d-week.txt                          the sample export (copy of prototype-data/ss3d-week.txt)
│  └─ ss3d-week-changelens-report.md         written by the window's "Export report (.md)" button
└─ Tests/Editor/
   ├─ ChangeLens.Editor.Tests.asmdef         Editor only; references ChangeLens.Editor, nunit.framework,
   │                                         UnityEditor.TestRunner, UnityEngine.TestRunner; UNITY_INCLUDE_TESTS
   ├─ GitLogParserTests.cs                   10 tests (also holds the shared SampleLog)
   ├─ PathClassifierTests.cs                 9 tests
   └─ ChangeReportTests.cs                   8 tests
```

**27 tests, 27 passed, 0 failed.**

### Sample data

- Cloned `https://github.com/RE-SS3D/SS3D.git` (a real open-source Unity game) to
  `prototype-data/SS3D`, blobless and single-branch.
- Chose the calendar week **Mon 2024-02-19 to Sun 2024-02-25** — the busiest full week on the
  default branch in 2024–2025 (5 non-merge commits, 86 changed-file entries; the alternatives had
  3–16 entries).
- Exported to `prototype-data/ss3d-week.txt` and copied it into `Samples~/`.

What the tool reports for that week: 5 commits, dates 2024-02-21 to 2024-02-25, 86 changed-file
entries, 36 code-file entries, **41.9% code files**. Categories: Code 3 M + 33 R, Meta 46 R,
DataConfig 3 M, ScenePrefab 1 M. Folders: Assets 83, Packages 2, Builds 1.

### Documents and figures

- `prototype/HOW-IT-WORKS.md` — the plain-language walkthrough.
- `prototype/CHANGELOG.md` — this file.
- `prototype-data/ss3d-week-changelens-report.md` — the one-page report the tool itself exported from the sample (also written into `Samples~/` by the export button).
- `figures/fig1-changelens-window.png` — the ChangeLens window with the sample loaded (900×700).
- `figures/fig2-package-in-project.png` — the package inside the Unity Project window (1707×1024).

---

## Exact commands run, in order

**1. Create the project** (log: `prototype-logs/create.log`)

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" -batchmode -nographics -quit \
  -createProject "...\a2-final-sprint-17-sep-2026\ChangeLens-proto" \
  -logFile "...\a2-final-sprint-17-sep-2026\prototype-logs\create.log"
```

**2. Clone the sample repository**

```
git clone --filter=blob:none --single-branch https://github.com/RE-SS3D/SS3D.git \
  "...\a2-final-sprint-17-sep-2026\prototype-data\SS3D"
```

**3. Find a busy week** (run inside `prototype-data/SS3D`)

```
git log --date=short --pretty=format:%ad --no-merges
```

**4. Export the week**

```
git log --name-status --date=iso --no-merges --since=2024-02-19 --until=2024-02-26 \
  > "...\a2-final-sprint-17-sep-2026\prototype-data\ss3d-week.txt"
```

(`--until=2024-02-26` because git's `--until` with a bare date stops at midnight, so the 26th is
named in order to include all of the 25th.)

**5. Compile** (log: `prototype-logs/compile.log`)

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" -batchmode -nographics -quit \
  -projectPath "...\ChangeLens-proto" \
  -logFile "...\prototype-logs\compile.log"
```

Checked with `grep -E "error CS|Compilation failed|Scripts have compiler errors"` — **no matches on
the first cycle**, and `Library/ScriptAssemblies/` contained `ChangeLens.Editor.dll` and
`ChangeLens.Editor.Tests.dll`. No fix-and-recompile cycles were needed.

**6. Run the EditMode tests** (logs: `prototype-logs/tests.log`, `prototype-logs/tests.xml`)

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" -batchmode -nographics \
  -projectPath "...\ChangeLens-proto" -runTests -testPlatform EditMode \
  -testResults "...\prototype-logs\tests.xml" \
  -logFile "...\prototype-logs\tests.log"
```

(No `-quit` — it would kill the Editor before the tests finish.) Result line in the XML:
`testcasecount="27" result="Passed" total="27" passed="27" failed="0"`.

**7. Take the screenshots and export the report** (logs: `prototype-logs/screenshot.log`, `screenshot2.log`)

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" \
  -projectPath "...\ChangeLens-proto" \
  -executeMethod ChangeLens.Editor.ScreenshotBootstrap.Run \
  -logFile "...\prototype-logs\screenshot.log"
```

Note the missing `-batchmode`: a batch-mode Editor draws nothing, so there would be nothing to
photograph. `ScreenshotBootstrap` opened the window as a floating 900×700 window, loaded the sample,
waited about 40 editor ticks between each step, captured both figures with
`UnityEditorInternal.InternalEditorUtility.ReadScreenPixel`, and called `EditorApplication.Exit(0)`.
Each pass took about 20 seconds; no PowerShell fallback capture was needed, and Unity was never left
running.

This ran three times in all, and the improvements between runs are why the code looks the way it does:

1. First pass (`screenshot.log`, since overwritten) — both figures produced successfully.
2. Second pass (`screenshot2.log`) — `StepRevealPackage` was changed to also select
   `Editor/ChangeLensWindow.cs`, so Figure 2 shows the package's actual source files instead of just
   a highlighted folder icon.
3. Third pass (`screenshot.log`, the current one) — a `StepExportReport` step was added, which
   presses the window's **Export report (.md)** button. `ChangeLensWindow.ExportMarkdown` was changed
   from `private` to `public` for this. The project was recompiled (clean) before this pass.

---

## Fourth pass: docked capture for Figure 2 (18 Sep 2026)

A second one-off helper, `Editor/DockedScreenshotBootstrap.cs`, docks the ChangeLens window into the
Scene view's tab group, loads the sample week, maximises the tab and photographs the main Editor
window, so the Unity 6 toolbar and the tab strip are in the picture (a marker had noted that the
earlier floating-window crop could have been any desktop application). Two runs, both clean:

1. `screenshot3.log`, first run: the Editor opened maximised at the screen's logical size (1707 x 1024);
   kept as `figures/fig2-changelens-docked-raw-maximised.png`.
2. Second run: the helper restores and resizes the main window to 1000 x 760 through user32 before
   capturing, giving `figures/fig2-changelens-docked-raw.png`; the proposal's Figure 2 is the top
   648 rows of that capture, upscaled 2x (`figures/fig2-changelens-docked.png`).

Same command shape as the earlier passes, GUI mode (no `-batchmode`):

```
"C:\Program Files\Unity\Hub\Editor\6000.4.10f1\Editor\Unity.exe" -projectPath "<ChangeLens-proto>" -executeMethod ChangeLens.Editor.DockedScreenshotBootstrap.Run -logFile "<prototype-logs>\screenshot3.log"
```

Each run took about 35 seconds. Like `ScreenshotBootstrap.cs`, the helper is not part of the tool
and can be deleted; it carries the same hard-coded output path.

---

## Fifth pass: a second demonstration week for Figure 2 (18 Sep 2026)

Two markers pointed out that the first docked capture showed a week with no art or audio and one
scene/prefab entry, so the flagship image argued against the proposal's premise. `corpus/scan-weeks.py`
ranks every SS3D week by asset share (with `--no-renames`, so a blobless clone needs no blob fetches),
and `corpus/export-week.py 2021-02-08 2021-02-15 <out>` exports the chosen week in the same
`git log --name-status` shape as the first sample and measures how many changed prefab/scene files carry
an object name in their changed text (23 of 26 that week).

`DockedScreenshotBootstrap.cs` now reads two optional environment variables, `CHANGELENS_SAMPLE`
(full path of the export to load) and `CHANGELENS_OUTPUT` (PNG file name), so any week can be
photographed without a recompile. The run (`screenshot4.log`) produced
`figures/fig2-changelens-docked-2021-02-08-raw.png`; the proposal's Figure 2 is its top 738 rows,
upscaled 2x (`figures/fig2-changelens-docked-2021.png`). The new sample lives beside the first one as
`Samples~/ss3d-week-2021-02-08.txt`.

---

## Sixth pass: batch report export and a build-report probe (18 Sep 2026, evening)

`Editor/BatchTools.cs` adds two `-batchmode` entry points that need no window:

1. `ChangeLens.Editor.BatchTools.ExportReport` parses the export named by `CHANGELENS_SAMPLE` with the
   engine-free classes (GitLogParser, ChangeReport) and writes `ChangeReport.ToMarkdown()` to
   `CHANGELENS_REPORT_OUT`. Run 18 Sep 20:07 (`export-2021.log`): 8 commits, 104 entries, code 24.0%,
   written to `Samples~/ss3d-week-2021-02-08-changelens-report.md` (Appendix C of the proposal).
2. `ChangeLens.Editor.BatchTools.BuildAndReport` creates a one-cube scene, builds it for Windows and reads
   Unity's `BuildReport` (summary, timed steps, packed assets by size) into `CHANGELENS_BUILDREPORT_OUT`.
   Run 18 Sep 20:09 (`build.log`): Succeeded, 25 s, 86.8 MB, 0 errors, written to
   `prototype-logs/buildreport.txt`. This is the object the proposal's stretch tier would parse; the run
   shows the prototype can already read it. The build output went to the user's temp folder
   (`%TEMP%\ChangeLensBuild`) and can be deleted; `Assets/Scenes/BuildReportProbe.unity` stays in the project.

## A3 test run and Producer Page captures (17 Oct 2026)

Run by Claude Code on the `deliverable-2-changelens` branch, after the 17 Oct repairs.

1. EditMode tests in batch mode (`a3-compile-2026-10-17.log`, `a3-tests-2026-10-17.xml`): the package compiled
   with no errors and 76 of 76 tests passed. The only Unity results committed before this were the A2 run (27/27) and the
   10 Oct run (`tests-committed.xml`, 39/39). This run also compiles the window code the .NET harness does not compile.
   ```
   Unity.exe -batchmode -nographics -projectPath ChangeLens-proto -runTests -testPlatform EditMode \
     -testResults prototype-logs/a3-tests-2026-10-17.xml -logFile prototype-logs/a3-compile-2026-10-17.log
   ```
2. Producer Page captures (`a3-screenshot-2026-10-17.log`), with `Editor/ProducerPageScreenshotBootstrap.cs`
   and no `-batchmode`. They show the July study week (`study/week2-2021-07-19`), which the current code
   rebuilds byte for byte. The February week was not used: the window rebuilds it with the 17 Oct repairs,
   so two rows would differ from the frozen page readers see.
   - `figures/a3-producer-page-A.png`: Version A.
   - `figures/a3-producer-page-B.png`: Version B, top of the page.
   - `figures/a3-producer-page-B-scenes.png`: Version B, scrolled to "Scenes and prefabs changed".

   The first attempt captured each image one step early (A twice, then B unscrolled), because the window had
   not repainted. The helper now repaints in a step of its own before each capture; the second attempt is
   the one kept.

---

## Log files

| Log | What it covers |
|---|---|
| `prototype-logs/create.log` | Project creation |
| `prototype-logs/compile.log` | The compile check — clean on every cycle (this file holds the last one) |
| `prototype-logs/tests.log` | The EditMode test run |
| `prototype-logs/tests.xml` | NUnit results: 27/27 passed |
| `prototype-logs/screenshot.log` | The final screenshot + export pass |
| `prototype-logs/screenshot2.log` | The middle screenshot pass (the one that improved Figure 2) |
| `prototype-logs/screenshot3.log` | The docked-capture pass of 18 Sep (first week) |
| `prototype-logs/screenshot4.log` | The docked-capture pass of 18 Sep on the February 2021 week |
| `prototype-logs/export-2021.log` | Batch export of the February 2021 report |
| `prototype-logs/build.log`, `buildreport.txt` | The build-report probe (last run) |
| `prototype-logs/a3-compile-2026-10-17.log`, `a3-tests-2026-10-17.xml` | A3 compile and EditMode run, 17 Oct 2026: 76/76 passed |
| `prototype-logs/a3-screenshot-2026-10-17.log` | The Producer Page captures of 17 Oct 2026 |

---

## Things worth knowing before you touch it

- **`Samples~` is deliberate.** The tilde stops Unity importing the folder, which is why
  `ss3d-week.txt` has no `.meta` file and does not appear in the Project window. The window reads it
  off disk by full path, not through `AssetDatabase`.
- **`ScreenshotBootstrap.cs` has hard-coded absolute paths** to this sprint folder. It is a one-off
  tool; if the folder moves, that file breaks and nothing else does. Delete it if you prefer.
- **No changes were made anywhere outside this sprint folder.** The Inkform Unity project was never
  opened.
