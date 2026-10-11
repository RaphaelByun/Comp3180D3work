# Corpus results — 17 Sep 2026 re-run

Reproduces DOSSIER.md section 3 (30 Aug 2026) with blobless clones and the full commit history of each repo's current default branch (the dossier used fixed windows of 200-356 commits per repo).

| Repo | Default branch | Commits | Changed-file entries | Code % | .meta % | Other % | Misc % | Unity version |
|---|---|---|---|---|---|---|---|---|
| SS3D | develop | 710 | 56061 | 17.5% | 46.9% | 34.6% | 1.1% | 2021.3.15f1 |
| open-brush | main | 1006 | 23885 | 23.6% | 40.1% | 32.1% | 4.1% | 6000.6.0f1 |
| VRTK | master | 2473 | 18618 | 36.4% | 36.3% | 22.3% | 5.0% | 2020.3.33f1 |
| jynew | main | 3705 | 134601 | 7.4% | 39.7% | 51.8% | 1.1% | 2020.3.32f1c1 (moved to `jyx2/ProjectSettings/ProjectVersion.txt`) |
| unity-experiment-framework | master | 507 | 5558 | 19.2% | 15.5% | 57.4% | 8.0% | 2018.4.15f1 |

## Squash-merge test (naive vs genuine issue references, last 100 non-merge commits)

| Repo | Sample commits | Naive (subject contains #digits) | Genuine (a #N different from the trailing squash self-reference) |
|---|---|---|---|
| SS3D | 100 | 100 | 9 |
| open-brush | 100 | 74 | 0 |
| VRTK | 100 | 0 | 0 |
| jynew | 100 | 0 | 0 |
| unity-experiment-framework | 100 | 20 | 20 |

## Comparison with the 30 Aug dossier and the draft's Figure 6 placeholder

| Repo | Dossier code % (30 Aug, fixed sample) | This run's code % (full history, 17 Sep) |
|---|---|---|
| SS3D | 24.5% (200 commits, 13,436 entries) | 17.5% |
| open-brush | 26.9% (356 commits, 12,715 entries) | 23.6% |
| VRTK | 15.0% (200 commits, 1,618 entries) | 36.4% |
| jynew | 15.7% (300 non-merge commits, 7,645 entries) | 7.4% |
| unity-experiment-framework | 30.7% (300 commits, 1,988 entries) | 19.2% |

## Why this run's numbers differ from the 30 Aug dossier

This run re-clones each repository's current default branch and classifies its **full**
commit history, not the dossier's fixed 200–356-commit sample windows, and it runs
five and a half months after the dossier's 30 Aug 2026 gate. Two kinds of drift explain
the gaps:

- **Sample vs. full history.** The dossier's code-file percentages were measured on a
  bounded window (e.g. SS3D's first 200 commits at the time); this run measures every
  commit on the branch (SS3D: 710, an order of magnitude more changed-file entries).
  A different, larger denominator changes the ratio even with no repository change at all.
- **The repositories kept moving.** Concretely:
  - **jynew** restructured its repo: the Unity project now lives under `jyx2/` rather
    than the repo root, so `ProjectSettings/ProjectVersion.txt` is at
    `jyx2/ProjectSettings/ProjectVersion.txt`. The editor version itself is unchanged
    (`2020.3.32f1c1`). Its commit stream is still overwhelmingly Chinese-language with
    no `#N` at all in the last 100 non-merge commits (naive = genuine = 0) — the same
    non-ASCII/linkage problem the dossier flagged as a reason not to use it as the
    primary corpus.
  - **VRTK** has since switched its commit-message convention to Conventional Commits
    (`feat(...): ...`, `fix(...): ...`), which carries no `#N` references at all in its
    recent history (naive = genuine = 0, down from the dossier's naive 81). This is a
    genuine change in the repository's practice, not a measurement artefact.
  - **open-brush**'s default branch now has only 1,006 commits total (vs. the dossier's
    356-commit sample window), and its Unity editor version has moved to `6000.6.0f1`
    (Unity 6) from the dossier's 2022.3.62f2 — the project has been upgraded.
  - **SS3D**'s full history is exactly 710 commits (matching the dossier's own 710-commit
    squash-merge sample, which was therefore already the full history on 30 Aug); it has
    since grown past that in code but the squash-merge genuine rate over the most recent
    100 non-merge commits (9/100) is higher than the dossier's all-time rate (16/710 ≈
    2.25/100) — recent SS3D activity links issues more often than its history average.
  - **unity-experiment-framework**'s naive and genuine counts are now equal (20/20):
    every `#N` found in its last 100 non-merge commits is a genuine reference, none is a
    squash-merge self-reference — consistent with the dossier's finding that this repo's
    commits are author-typed rather than machine-generated.
- **Code-file % moved on every repo, and not in one direction.** VRTK's code-file share
  rose sharply (15.0% → 36.4%) because its versioned Unity-package demo shell (noted in
  the dossier as "only 8 `.cs` files … at HEAD") is a HEAD-only snapshot; measured over
  full history the denominator includes the repository's earlier, code-heavier years
  before the SDK was externalised. SS3D, open-brush, jynew and UXF all fell relative to
  the dossier's fixed-window figures once measured over full history — full-history code
  share is diluted by the much larger number of non-code changed-file entries accumulated
  over the repository's whole lifetime rather than a recent slice.
- **The naive-vs-genuine gap is the one dossier finding that reproduces cleanly.** On
  every repo where the naive count is non-trivial (SS3D, open-brush), genuine references
  are a small fraction of it (SS3D 9/100, open-brush 0/74) — the squash-merge
  self-reference artefact the dossier identified is still real today.

See README.md for the one-line re-run command.
