# ChangeLens

A Unity Editor package that writes a one-page weekly change report for a game producer from a project's git history.

## What it does

- **Window → ChangeLens Producer Page.** Pick a git repository and a week, or reopen a frozen study week. ChangeLens runs git itself and builds the page.
- **Two versions of the page.** Version A (baseline) lists the week's changes and where the work went by file type. Version B (treatment) adds a "Scenes and prefabs changed" section. It names the objects and components changed inside each scene or prefab, and says when one was added, deleted, moved or renamed.
- **Save study files.** Writes the frozen export, both reports, a fidelity checklist for each and the naming measures to a folder.
- **Window → ChangeLens.** The A2 prototype. It loads a `git log --name-status` text file and sorts the files by type only.

Weeks are cut at midnight UTC. The export follows the main line, so a merged branch is reported in the week it was merged.

## Requirements

- Unity 6000.0 or later (built and tested on 6000.4.10f1).
- `git` on the PATH for **From repository**. Frozen study weeks need no git.

## Try it and test it

The hands-on guide is `TRY-CHANGELENS.md` at the root of the repository. It covers opening the project, the frozen study weeks, generating a week from a repository, and running the tests in Unity or with `dotnet test tools/changelens-dotnet/tests/tests.csproj`.

How the A2 prototype window works is in `prototype/HOW-IT-WORKS.md`.

## Folders

| Folder | What it holds |
| --- | --- |
| `Editor/` | The package code. The parsers and report builders are plain C# with no UnityEditor use, so the .NET harness can test them. |
| `Tests/Editor/` | EditMode tests (NUnit). |
| `Samples~/` | Sample SS3D week exports and reports from the A2 prototype. |

Changes are listed in `CHANGELOG.md`.
