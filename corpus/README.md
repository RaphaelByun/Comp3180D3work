# Corpus re-run — 17 Sep 2026

Reproduces DOSSIER.md §3 ("THE CORPUS DECISION" / "Commands and real output") on the
five Unity repositories, with real, re-run numbers.

## Re-run everything

```
python corpus.py
```

Requires Python 3.14 stdlib, `git` on PATH, and `matplotlib` (`pip install --user matplotlib`
if missing — the script does not install it for you). Clones all five repositories with
`git clone --filter=blob:none --single-branch <url> <dir>` into a temp directory, runs
`git -c core.quotepath=false log --name-status` over each repo's full current default-branch
history, classifies every changed-file entry, reads
`ProjectSettings/ProjectVersion.txt`, runs the naive-vs-genuine squash-merge test over the
last 100 non-merge commits, and (for SS3D) extracts one `.prefab`-diff hunk for Figure 4.
Deletes the clones when done (they are cheap to re-fetch, being blobless).

## Outputs

- `results.json`, `results.md` — per-repo commit counts, changed-file entries, code/.meta/other/misc
  percentages, Unity editor version, and the naive vs genuine issue-reference counts.
- `fig6.csv`, `fig6-code-file-percentage.png` — Figure 6, horizontal bar chart of code-file %
  across the five repos with a dashed 30% reference line (Pascarella et al. 2018).
- `fig4-hunk.txt`, `fig4-prefab-yaml-hunk.png` — Figure 4, one SS3D `.prefab` diff hunk with
  the commit hash and path, rendered as an annotated monospace image.
- `figA-mechanism-table.md` — Figure A, the three-mechanism table (structural / opacity /
  audience mismatch), built only from wording in the A2 draft's Literature Review and the
  `verify/*.md` SAFE lists.

See `results.md` for the comparison against the 30 Aug DOSSIER numbers and the draft's
Figure 6 placeholder, and why they differ (repository history has moved on since 30 Aug;
this run also uses full history rather than the dossier's fixed 200–356-commit windows).
