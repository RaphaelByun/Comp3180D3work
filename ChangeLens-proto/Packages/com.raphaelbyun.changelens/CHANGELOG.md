# Changelog

Built from the repository's commit history. Hashes are on the `deliverable-2-changelens` branch.

## Unreleased (A3 committed tier)

### 17 October 2026
- A scene or prefab moved or renamed with no content change now says where it came from, not "changed (0 lines)" (`4d33ce7`).
- Paths are read from git's `rename to`, `+++ b/` and `--- a/` lines, so a folder whose name ends in " b" is no longer cut short (`4d33ce7`).
- Git's quoted paths (for example non-ASCII file names) are unquoted in both parsers (`4d33ce7`).
- The export walks the main line with `--first-parent --diff-merges=first-parent`, so a merged branch is reported in the week it was merged (`1976e8a`).
- A commit at exactly midnight UTC is no longer counted in two weeks (`1976e8a`).
- The Producer Page window writes the week's end date on the Gregorian calendar whatever the machine's culture (`1976e8a`).

### 14 October 2026
- Screenshot helpers write figures relative to the project, not a fixed folder (`2b6b5ab`).

### 13 October 2026
- Version B states the "and N more" counting rule in its footer (`ac9d39c`).
- Asset diff repair after the February fidelity check: stripped prefab stubs, blocks that only moved in the file, paired block headers, and a script guid shared by two `.meta` files (`bf09b4e`).
- **Window → ChangeLens Producer Page**: generate from a repository or reopen a frozen study week, flip Version A and B, save study files. Week bounds pinned to midnight UTC (`323eac1`).
- Date-only export bounds pinned to midnight (`e73f544`).

### 12 October 2026
- Study-week reports (Version A and B, fidelity checklists, naming measures) and a .NET harness for the engine-free code (`b96c1fa`).

## 0.1.0 (A2 prototype)

Built 17 September 2026 for the A2 proposal and committed on 11 October 2026 (`dbb6af4`).

- **Window → ChangeLens**: loads a `git log --name-status` export and shows a grouped change report with add, modify and delete counts and the code-file percentage.
