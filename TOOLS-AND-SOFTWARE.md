# Tools and software

Every tool, library and data source the project used, with its version and licence. Built on 17 October 2026 from the project files named in each row. The study data source (SS3D) has its own page: `study/SOURCE-AND-LICENCE.md`. AI use is listed in `GENAI-EVIDENCE.md`.

Versions come from the project files where one exists. Where a version is marked "installed on 17 Oct 2026", it was read from this PC on that day, and an earlier session may have run an older one. Release dates were checked on 17 October 2026 against the publisher's release list.

## Software the deliverables are built with

| Tool | Version | Publisher | Licence | Where it is used | Version source |
| --- | --- | --- | --- | --- | --- |
| Unity Editor | 6000.4.10f1 (released 3 Jun 2026) | Unity Technologies | Proprietary (Unity Editor Software Terms). Plan tier: for Raphael to fill in | D2: the `ChangeLens-proto` project and the ChangeLens package | `ChangeLens-proto/ProjectSettings/ProjectVersion.txt` |
| Unity Test Framework | 1.6.0 (released 11 Aug 2025) | Unity Technologies | Unity Companion License | D2: EditMode tests in Unity. `manifest.json` asks for 1.5.1, but Unity 6000.4 resolves its built-in 1.6.0 | `ChangeLens-proto/Packages/packages-lock.json` |
| Unity custom NUnit (`com.unity.ext.nunit`) | 2.0.5 (released 28 Jun 2023) | Unity Technologies, based on NUnit 3.5 | Unity Package Distribution License | D2: the NUnit used by the Unity Test Framework | `ChangeLens-proto/Packages/packages-lock.json` |
| .NET SDK | 9.0.303 (released 17 Jul 2025), target `net9.0` | Microsoft | MIT | D2: the .NET test harness `tools/changelens-dotnet` | `dotnet --version`, installed on 17 Oct 2026; `tests.csproj` |
| NUnit | 3.14.0 (released 3 Nov 2023) | NUnit Project | MIT | D2: tests in the .NET harness | `tools/changelens-dotnet/tests/tests.csproj` |
| NUnit3TestAdapter | 4.6.0 (released 25 Jul 2024) | NUnit Project | MIT | D2: runs the NUnit tests under `dotnet test` | `tests.csproj` |
| Microsoft.NET.Test.Sdk | 17.11.1 (released 5 Sep 2024) | Microsoft | MIT | D2: test host for `dotnet test` | `tests.csproj` |
| Git | 2.48.1 (released 13 Jan 2025), Git for Windows build 2.48.1.windows.1 | The Git Project; Git for Windows | GPL-2.0 | D2: ChangeLens runs git to read a week's history. Corpus scripts. Version control for the whole repository | `git --version`, installed on 17 Oct 2026 |
| GitHub | Web service, no version | GitHub, Inc. | Proprietary (GitHub Terms of Service) | Hosts the private repository `RaphaelByun/Comp3180D3work`. D1: GitHub Projects was one of the four tools inspected (below) | Not applicable |
| Node.js | 22.14.0 (released 11 Feb 2025) | OpenJS Foundation | MIT | `build-docx-v2.js` (Word builder). D5 `recode-sample.js`, D6 `analyse.js`, `figures.js` and `test.js`, D9 `variance-table.js`. These use only Node's own modules | `node -v`, installed on 17 Oct 2026 |
| docx (npm package) | 9.6.1 (released 10 Mar 2026) | Dolan Miu | MIT | `build-docx-v2.js`: builds the A2 Word file, and the A3 report if reused | `package.json`; `School/node_modules/docx/package.json` |
| Python | 3.14.6 (build of 10 Jun 2026) | Python Software Foundation | PSF License Version 2 | `corpus/` scripts (`corpus.py`, `scan-weeks.py`, `export-week.py`, `scan-repo.py`, `plot-fig1.py`), `assemble.py`, `audit/*.py` | `py --version`, installed on 17 Oct 2026; `corpus/README.md` says Python 3.14 |
| Matplotlib | 3.11.2 (released 11 Sep 2026) | The Matplotlib Development Team | Matplotlib License (PSF-based) | `corpus/plot-fig1.py` and `corpus/corpus.py`: the A2 code-file share charts | Installed on 17 Oct 2026 |
| Microsoft Word | Microsoft 365, 16.0.20430.20146 | Microsoft | Proprietary | `audit/count-and-pdf.ps1`: word counts and the A2 PDF, through Word's COM interface | Installed on 17 Oct 2026 |
| PowerShell | Not recorded | Microsoft | Windows PowerShell: part of Windows. PowerShell 7: MIT | `audit/count-and-pdf.ps1` | Not recorded |
| Claude Code | 2.1.302 on 17 Oct 2026; earlier sessions ran earlier versions | Anthropic | Proprietary (Anthropic terms) | AI coding agent for every deliverable. Details in `GENAI-EVIDENCE.md` | `claude --version` on 17 Oct 2026 |
| Claude (model) | Claude Opus 5.5 | Anthropic | Proprietary (Anthropic terms) | The model behind Claude Code in the A3 sessions | `GENAI-EVIDENCE.md` |
| Google Chrome with the Claude in Chrome extension | Chrome 155.0.8059.82 installed on 17 Oct 2026. The version on 14 Oct was not recorded | Google; Anthropic | Proprietary | D1: Claude ran heuristic tasks T1 to T7 in Chrome on 14 Oct 2026 | Installed version only |

## Tools inspected in the D1 heuristic pass

Used as objects of study, not to build anything. Plans and dates are from `deliverable-1/tool-selection.md` on branch `deliverable-1-ux-study`.

| Tool | Publisher | Plan used in the pass | Pass date | Pricing checked |
| --- | --- | --- | --- | --- |
| Trello | Atlassian | Automatic Premium trial | 14 Oct 2026 | 15 Oct 2026, https://trello.com/pricing |
| HacknPlan | HacknPlan | Free Personal plan | 14 Oct 2026 | 15 Oct 2026, https://hacknplan.com/pricing |
| Jira | Atlassian | Standard trial (not Free) | 14 Oct 2026 | 15 Oct 2026, Atlassian support pages (the pricing page did not load) |
| GitHub Projects (with Issues) | GitHub, Inc. | Free plan | 14 Oct 2026 | 15 Oct 2026, https://github.com/pricing |

## Data sources

| Source | What was used | Licence | Where |
| --- | --- | --- | --- |
| SS3D (Space Station 3D), https://github.com/RE-SS3D/SS3D | Git history of four weeks (two study weeks, two reserves) and A2 corpus figures | MIT for code; CC BY-NC-SA 4.0 for assets. Details in `study/SOURCE-AND-LICENCE.md` | `study/`, `corpus/`, `figures/`, `prototype-data/` |
| Unity Experiment Framework (UXF), https://github.com/immersivecognition/unity-experiment-framework | A2 corpus repository. D1: one week of history and issues (9 to 15 Nov 2020) for the needs check | MIT | `corpus/`; `deliverable-1/needs-catalogue.md` section 4 |
| Open Brush, VRTK and jynew (https://github.com/icosa-foundation/open-brush, https://github.com/ExtendRealityLtd/VRTK, https://github.com/jynew/jynew) | A2 corpus repositories: file-type counts only. No code or assets from them are copied into this repository | Open Brush: Apache-2.0. VRTK: MIT. jynew: its own licence, which reads "The use of any resources or code of this project is not permitted unless authorized by the public statement of this project. Any unauthorized commercial use of the code or resources of this project is strictly prohibited". Some of its folders carry a further community licence (`COMMUNITY_LICENSE_FOR_JYX2/README.md`). Each repository's `LICENSE` file, read on 17 Oct 2026 | `corpus/corpus.py`, `corpus/results.md` |

## APA 7 software references

For the A3 reference list. Each year is the release year of the version used. Web services with no version use "n.d." and a retrieval date.

Anthropic. (2026). *Claude* (Opus 5.5 version) [Large language model]. https://www.anthropic.com/claude

Anthropic. (2026). *Claude Code* (Version 2.1.302) [Computer software]. https://claude.com/claude-code

Atlassian. (n.d.). *Jira* [Web application]. Retrieved October 14, 2026, from https://www.atlassian.com/software/jira

Atlassian. (n.d.). *Trello* [Web application]. Retrieved October 14, 2026, from https://trello.com/

Extend Reality Ltd. (2022). *VRTK* [Computer software]. GitHub. https://github.com/ExtendRealityLtd/VRTK

Git for Windows. (2025). *Git for Windows* (Version 2.48.1.windows.1) [Computer software]. https://gitforwindows.org/

GitHub. (n.d.). *GitHub Projects* [Web application]. Retrieved October 14, 2026, from https://github.com/features/issues

Google. (2026). *Google Chrome* (Version 155.0.8059.82) [Computer software]. https://www.google.com/chrome/

HacknPlan. (n.d.). *HacknPlan* [Web application]. Retrieved October 14, 2026, from https://hacknplan.com/

Icosa Foundation. (2026). *Open Brush* [Computer software]. GitHub. https://github.com/icosa-foundation/open-brush

Immersive Cognition. (2026). *Unity Experiment Framework* [Computer software]. GitHub. https://github.com/immersivecognition/unity-experiment-framework

jynew. (2026). *jynew* [Computer software]. GitHub. https://github.com/jynew/jynew

Microsoft. (2024). *Microsoft.NET.Test.Sdk* (Version 17.11.1) [Computer software]. NuGet. https://www.nuget.org/packages/Microsoft.NET.Test.Sdk/17.11.1

Microsoft. (2025). *.NET SDK* (Version 9.0.303) [Computer software]. https://dotnet.microsoft.com/

Microsoft. (2026). *Microsoft Word* (Version 16.0.20430.20146) [Computer software]. https://www.microsoft.com/microsoft-365/word

Miu, D. (2026). *docx* (Version 9.6.1) [Computer software]. npm. https://www.npmjs.com/package/docx

NUnit Project. (2023). *NUnit* (Version 3.14.0) [Computer software]. https://nunit.org/

NUnit Project. (2024). *NUnit3TestAdapter* (Version 4.6.0) [Computer software]. NuGet. https://www.nuget.org/packages/NUnit3TestAdapter/4.6.0

OpenJS Foundation. (2025). *Node.js* (Version 22.14.0) [Computer software]. https://nodejs.org/

Python Software Foundation. (2026). *Python* (Version 3.14.6) [Computer software]. https://www.python.org/

Space Station 3D. (2026). *SS3D* [Computer software]. GitHub. https://github.com/RE-SS3D/SS3D

The Git Project. (2025). *Git* (Version 2.48.1) [Computer software]. https://git-scm.com/

The Matplotlib Development Team. (2026). *Matplotlib* (Version 3.11.2) [Computer software]. https://matplotlib.org/

Unity Technologies. (2023). *Custom NUnit for Unity* (Version 2.0.5) [Computer software]. https://docs.unity3d.com/Packages/com.unity.ext.nunit@2.0/manual/index.html

Unity Technologies. (2025). *Unity Test Framework* (Version 1.6.0) [Computer software]. https://docs.unity3d.com/Packages/com.unity.test-framework@1.6/manual/index.html

Unity Technologies. (2026). *Unity* (Version 6000.4.10f1) [Computer software]. https://unity.com/

## Still open

- The Unity plan tier (Personal or another).
- Video recording and editing tools for D7, once the video is made.
- The Microsoft Word, Chrome, Python and Matplotlib versions are what was installed on 17 Oct 2026. An older version may have been used in September.
