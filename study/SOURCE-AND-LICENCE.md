# Source and licence of the study data

The study weeks in this folder are taken from **SS3D (Space Station 3D)**, an open-source Unity game by the SS3D contributors.

- Repository: https://github.com/RE-SS3D/SS3D
- Local copy used: a blobless clone in `prototype-data/SS3D/` (not committed; it is in `.gitignore`). Its newest commit is `2fcc16b6` "Port Vision System (#1491)", 2 August 2026.

## What was taken

Each week's `export/` folder holds three texts that `WeekExport.FromGit` produced from the SS3D history:

- `log.txt`: the week's commits with author, date, message and the changed file names (`git log --name-status`).
- `assets.patch`: the week's scene and prefab diffs (`git log -p -- "*.prefab" "*.unity"`).
- `guids.txt`: the script guid lines from the `.cs.meta` files at the week's newest commit.

The reports, fidelity checklists and naming files next to each export are generated from those three texts by ChangeLens.

| Folder | Commits | Oldest commit | Newest commit | Author dates |
| --- | ---: | --- | --- | --- |
| `week1-2021-02-08` | 8 | `0059f5dacbdb569f1d4563ee1ec5eea09e36cf73` | `ea23f08c38c39ccc4ff9abf6ae496cedc53a8c50` | 10 to 14 Feb 2021 |
| `week2-2021-07-19` | 7 | `edc747c762e3d88cef9c6d4df998421c91a62c19` | `8d38914ac3a73fcb8fb0964f545f8cff9c291489` | 20 to 24 Jul 2021 |
| `reserve/2020-12-14` | 3 | `c12b593441908cc208aaa62500c7987f0252c183` | `c9a2e9c027d3d60de1515e01340abc9777faa695` | 14 to 15 Dec 2020 |
| `reserve/2021-09-27` | 2 | `0b98c2725368023c27e8f29066a7f9322f4630af` | `7e5a33d7074aff89a8a2850219c9bed563531c18` | 2 Oct 2021 |

Other SS3D-derived files in the repository: `prototype-data/ss3d-week.txt` and its report, the samples in `ChangeLens-proto/Packages/com.raphaelbyun.changelens/Samples~/`, the SS3D hunk and figures in `corpus/` and `figures/`.

## SS3D's licences

SS3D's README states two licences. At the December 2020 and February 2021 commits it reads:

> **This project and it's code** fall under the **[MIT](LICENSE-CODE.md)** license.
>
> **All asset contributions** fall under the **[CC BY-NC-SA 4.0](LICENSE-ASSETS.md)** license.

At the July and September 2021 commits the files sit in `Documents/` and the README reads:

> This project's **code** falls under the **[MIT](Documents/LICENSE-CODE.md)** license.
>
> All **art assets** fall under the **[CC BY-NC-SA 4.0](Documents/LICENSE-ASSETS.md)** license.

- `LICENSE-CODE.md`: MIT License, "Copyright (c) 2020 RE:SS3D" at the study commits ("Copyright (c) 2023 Space Station 3D" in the current clone).
- `LICENSE-ASSETS.md`: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International, https://creativecommons.org/licenses/by-nc-sa/4.0/

## How this repository uses it

- The scene and prefab diffs and the file lists are adapted from SS3D's assets and history. They are credited here to the SS3D contributors and shared for non-commercial study use under CC BY-NC-SA 4.0, the licence of the assets they come from.
- ChangeLens's own code is not derived from SS3D.
- `log.txt` keeps the contributors' names, email addresses and commit messages as git recorded them in SS3D's public history.

## Reference (APA 7, for the A3 reference list)

Space Station 3D. (2026). *SS3D* [Computer software]. GitHub. https://github.com/RE-SS3D/SS3D

There is no A3 reference list in the repository yet. Add this entry when the report's list is built, and check the format against the unit's referencing guide.
