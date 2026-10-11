#!/usr/bin/env python3
"""
corpus.py — reproduce the 30 Aug 2026 DOSSIER.md "THE CORPUS DECISION" corpus
gate on five Unity repositories, using blobless clones and git log --name-status.

Re-run with:  python corpus.py

Writes results.json and results.md into this directory, plus:
  fig6.csv, fig6-code-file-percentage.png
  fig4-hunk.txt, fig4-prefab-yaml-hunk.png

Requires: Python 3.14 stdlib + git on PATH. matplotlib for the figures
(pip install --user matplotlib).

Basis (DOSSIER.md section 3, "Commands and real output", 30 Aug 2026):
  - blobless clone: git clone --filter=blob:none --single-branch <url> <dir>
  - changed-file entries: git -c core.quotepath=false log --name-status
    over the whole default-branch history (the dossier's 30 Aug figures used
    fixed commit windows of 200-356 commits each; this script reproduces the
    method on the full history available today, which is why counts differ
    — see README.md / differences section in results.md).
  - code extensions: .cs .shader .compute .cginc .hlsl .asmdef
  - .meta sidecars counted as non-code, tallied separately
  - "other" = remaining non-code, non-.meta, non-misc extensions
    (textures, audio, models, prefabs/scenes/assets, etc.)
  - "misc" = .txt .json .yml .yaml .dll .md .gitignore-type housekeeping
  - Unity editor version: git show <default-branch>:ProjectSettings/ProjectVersion.txt
  - squash-merge test:
      naive   = count of non-merge commit subjects (last 100) containing
                a literal '#' followed by one or more digits anywhere
      genuine = of those, only counts where the #N differs from the PR
                number GitHub auto-appends to a squash-merged subject
                (a trailing "(#N)"); i.e. a #N that is NOT the commit's
                own trailing self-reference.
"""

import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent

REPOS = [
    {
        "name": "SS3D",
        "url": "https://github.com/RE-SS3D/SS3D.git",
    },
    {
        "name": "open-brush",
        "url": "https://github.com/icosa-foundation/open-brush.git",
    },
    {
        "name": "VRTK",
        "url": "https://github.com/ExtendRealityLtd/VRTK.git",
    },
    {
        "name": "jynew",
        "url": "https://github.com/jynew/jynew.git",
    },
    {
        "name": "unity-experiment-framework",
        "url": "https://github.com/immersivecognition/unity-experiment-framework.git",
    },
]

CODE_EXTS = {".cs", ".shader", ".compute", ".cginc", ".hlsl", ".asmdef"}
MISC_EXTS = {".txt", ".json", ".yml", ".yaml", ".dll", ".md", ".gitignore"}
# everything else non-.meta falls into "other" (assets: textures/audio/models/
# prefabs/scenes/materials/etc.)

DOSSIER_FIGURES = {
    # repo -> dict of dossier's 30 Aug numbers, for the comparison table
    "SS3D": {"code_pct": 24.5, "sample": "200 commits, 13,436 entries"},
    "VRTK": {"code_pct": 15.0, "sample": "200 commits, 1,618 entries"},
    "jynew": {"code_pct": 15.7, "sample": "300 non-merge commits, 7,645 entries"},
    "open-brush": {"code_pct": 26.9, "sample": "356 commits, 12,715 entries"},
    "unity-experiment-framework": {"code_pct": 30.7, "sample": "300 commits, 1,988 entries"},
}

DOSSIER_NAIVE_GENUINE = {
    # repo -> (naive, genuine) over last 100 commits, from the dossier
    "open-brush": (112, 0),
    "VRTK": (81, 0),
    "jynew": (40, 0),
    "SS3D": (None, None),  # dossier used a 710-commit sample for SS3D, not 100
    "unity-experiment-framework": (30, 11),
}


def run(cmd, cwd=None, check=True, **kw):
    return subprocess.run(
        cmd, cwd=cwd, check=check, capture_output=True, text=True,
        encoding="utf-8", errors="replace", **kw,
    )


def clone(url, dest):
    # --no-checkout avoids checking out a working tree, which on a blobless
    # clone would lazily fetch every blob in HEAD's tree one at a time over
    # smart-HTTP and stall on a repo with a large asset-heavy HEAD (this is
    # the same failure mode DOSSIER.md warns about for `git ls-tree -r -l`
    # on a blobless clone). git log --name-status only needs commits/trees,
    # never blob content, so no checkout is needed at all.
    print(f"  cloning (blobless, no checkout) {url} ...", file=sys.stderr)
    run([
        "git", "clone", "--filter=blob:none", "--no-checkout",
        "--single-branch", url, str(dest),
    ])


def default_branch(dest):
    r = run(["git", "symbolic-ref", "--short", "HEAD"], cwd=dest)
    return r.stdout.strip()


def commit_count(dest, branch):
    r = run(["git", "rev-list", "--count", branch], cwd=dest)
    return int(r.stdout.strip())


def classify_ext(path):
    ext = Path(path).suffix.lower()
    if ext == ".meta":
        return "meta"
    if ext in CODE_EXTS:
        return "code"
    if ext in MISC_EXTS:
        return "misc"
    if ext == "":
        return "misc"  # extensionless files (LICENSE, etc.)
    return "other"


def changed_file_entries(dest, branch):
    """Full-history git log --name-status, classified per changed-file entry."""
    counts = {"code": 0, "meta": 0, "other": 0, "misc": 0}
    total = 0
    cmd = [
        "git", "-c", "core.quotepath=false", "log",
        "--name-status", "--no-renames", "--pretty=format:COMMIT", branch,
    ]
    proc = subprocess.Popen(
        cmd, cwd=dest, stdout=subprocess.PIPE, text=True,
        encoding="utf-8", errors="replace",
    )
    for line in proc.stdout:
        line = line.rstrip("\n")
        if not line or line == "COMMIT":
            continue
        # name-status lines: "M\tpath" or "R100\told\tnew" (renames disabled above)
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        status = parts[0]
        path = parts[-1]
        bucket = classify_ext(path)
        counts[bucket] += 1
        total += 1
    proc.wait()
    return total, counts


def unity_version(dest, branch):
    r = run(
        ["git", "show", f"{branch}:ProjectSettings/ProjectVersion.txt"],
        cwd=dest, check=False,
    )
    if r.returncode != 0:
        # Unity project may not be at repo root (e.g. jynew moved its project
        # into jyx2/ at some point after 30 Aug) — search the tree for it.
        ls = run(["git", "ls-tree", "-r", "--name-only", branch], cwd=dest, check=False)
        candidates = [
            p for p in ls.stdout.splitlines()
            if p.endswith("ProjectSettings/ProjectVersion.txt")
        ]
        if not candidates:
            return "not found in tree"
        path = sorted(candidates, key=len)[0]  # shallowest match
        r = run(["git", "show", f"{branch}:{path}"], cwd=dest, check=False)
        if r.returncode != 0:
            return "not found in tree"
        m = re.search(r"m_EditorVersion:\s*(\S+)", r.stdout)
        found = m.group(1) if m else "unparsable"
        return f"{found} (at {path})"
    m = re.search(r"m_EditorVersion:\s*(\S+)", r.stdout)
    return m.group(1) if m else r.stdout.strip().splitlines()[0] if r.stdout.strip() else "unparsable"


def squash_merge_test(dest, branch, n=100):
    """Naive vs genuine issue-reference count over the last n non-merge commits."""
    r = run(
        ["git", "log", "--no-merges", f"-n{n}", "--pretty=%s", branch],
        cwd=dest,
    )
    subjects = [s for s in r.stdout.splitlines() if s.strip()]
    naive = 0
    genuine = 0
    hash_re = re.compile(r"#(\d+)")
    trailing_re = re.compile(r"\(#(\d+)\)\s*$")
    for subj in subjects:
        matches = hash_re.findall(subj)
        if not matches:
            continue
        naive += 1
        trailing = trailing_re.search(subj)
        trailing_num = trailing.group(1) if trailing else None
        # genuine if there exists a #N in the subject that is NOT the
        # trailing self-reference GitHub appends on squash-merge
        other_refs = [m for m in matches if m != trailing_num]
        if other_refs:
            genuine += 1
    return len(subjects), naive, genuine


def find_prefab_hunk(dest, branch, max_lines=25):
    """Find one SS3D commit touching a .prefab file, return (hash, path, hunk lines)."""
    r = run(
        ["git", "log", "--no-merges", "--pretty=%H", "--name-only", branch,
         "--", "*.prefab"],
        cwd=dest,
    )
    lines = r.stdout.splitlines()
    commit = None
    path = None
    cur_commit = None
    for line in lines:
        if not line.strip():
            continue
        if len(line) == 40 and re.fullmatch(r"[0-9a-f]{40}", line):
            cur_commit = line
            continue
        if line.endswith(".prefab"):
            # try this commit/path combination
            diff = run(
                ["git", "show", cur_commit, "--", line], cwd=dest, check=False,
            )
            if diff.returncode != 0 or not diff.stdout.strip():
                continue
            body = diff.stdout.splitlines()
            # Only look inside the actual diff body (from the first hunk
            # header onward), never the commit-message text above it, so a
            # match can't be satisfied by prose mentioning "component" etc.
            hdr_end = next((i for i, l in enumerate(body) if l.startswith("@@")), None)
            if hdr_end is None:
                continue
            diff_body = body[hdr_end:]
            # Prefer the window starting at the hunk header itself, so the
            # figure shows the change (+/- lines), not just trailing context.
            window = diff_body[:max_lines]
            text = "\n".join(window)
            if "m_Name" in text and ("guid" in text.lower() or "m_Script" in text or "Component" in text):
                return cur_commit, line, window
            # otherwise scan for the earliest window that satisfies both
            for start in range(len(diff_body)):
                window = diff_body[start:start + max_lines]
                text = "\n".join(window)
                if "m_Name" in text and ("guid" in text.lower() or "m_Script" in text or "Component" in text):
                    return cur_commit, line, window
            # fallback: just take the first max_lines of the diff body
            if diff_body:
                return cur_commit, line, diff_body[:max_lines]
    return None, None, None


def process_repo(repo, workdir):
    name = repo["name"]
    url = repo["url"]
    dest = workdir / name
    print(f"[{name}] cloning...", file=sys.stderr)
    clone(url, dest)
    branch = default_branch(dest)
    n_commits = commit_count(dest, branch)
    print(f"[{name}] default branch={branch} commits={n_commits}", file=sys.stderr)

    print(f"[{name}] classifying changed-file entries (full history)...", file=sys.stderr)
    total_entries, counts = changed_file_entries(dest, branch)

    code_pct = 100.0 * counts["code"] / total_entries if total_entries else 0.0
    meta_pct = 100.0 * counts["meta"] / total_entries if total_entries else 0.0
    other_pct = 100.0 * counts["other"] / total_entries if total_entries else 0.0
    misc_pct = 100.0 * counts["misc"] / total_entries if total_entries else 0.0

    uv = unity_version(dest, branch)

    sample_n, naive, genuine = squash_merge_test(dest, branch, n=100)

    result = {
        "repo": name,
        "url": url,
        "default_branch": branch,
        "commit_count": n_commits,
        "changed_file_entries": total_entries,
        "code_count": counts["code"],
        "meta_count": counts["meta"],
        "other_count": counts["other"],
        "misc_count": counts["misc"],
        "code_pct": round(code_pct, 1),
        "meta_pct": round(meta_pct, 1),
        "other_pct": round(other_pct, 1),
        "misc_pct": round(misc_pct, 1),
        "unity_version": uv,
        "squash_test_sample_commits": sample_n,
        "naive_hash_digit_count": naive,
        "genuine_issue_refs": genuine,
    }

    if name == "SS3D":
        print(f"[{name}] locating a .prefab-modifying commit for Figure 4...", file=sys.stderr)
        commit, path, hunk = find_prefab_hunk(dest, branch)
        result["_fig4"] = {"commit": commit, "path": path, "hunk": hunk}

    return result


def write_fig6(results):
    import csv
    rows = []
    for r in results:
        rows.append({"repo": r["repo"], "code_pct": r["code_pct"]})
    rows.sort(key=lambda x: x["code_pct"])
    with open(HERE / "fig6.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["repo", "code_pct"])
        w.writeheader()
        w.writerows(rows)

    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ImportError:
        print("matplotlib not available — skipping fig6 PNG", file=sys.stderr)
        return

    repos_sorted = [r["repo"] for r in rows]
    pcts = [r["code_pct"] for r in rows]

    fig, ax = plt.subplots(figsize=(8, 4.5), dpi=150)
    bar_color = "#3B6FA0"
    ref_color = "#B33F3F"
    ax.barh(repos_sorted, pcts, color=bar_color, height=0.55, zorder=3)
    for y, v in enumerate(pcts):
        ax.text(v + 0.6, y, f"{v:.1f}%", va="center", fontsize=9, color="#222")

    ax.axvline(30, color=ref_color, linestyle="--", linewidth=1.5, zorder=2)
    ax.text(
        30.4, 1.5,
        "Pascarella et al. (2018): ~30% of files\nin the development category for\nopen-source games (indicative; units differ)",
        color=ref_color, fontsize=7.5, va="center",
        bbox=dict(facecolor="white", edgecolor="none", alpha=0.85, pad=2),
    )

    ax.set_xlabel("Code-file % of changed-file entries (.meta counted as non-code)")
    ax.set_ylabel("Repository")
    ax.set_title("Figure 6 — Code-file percentage across five Unity repositories")
    ax.set_xlim(0, max(pcts) + 20)
    ax.set_ylim(-0.6, len(repos_sorted) - 1 + 0.8)
    ax.grid(axis="x", linestyle=":", alpha=0.4, zorder=0)
    fig.text(
        0.01, 0.01,
        "Source: computed from git log --name-status, .meta counted as non-code, 17 Sep 2026",
        fontsize=7, color="#555",
    )
    fig.tight_layout(rect=(0, 0.04, 1, 1))
    fig.savefig(HERE / "fig6-code-file-percentage.png")
    plt.close(fig)


def write_fig4(ss3d_result):
    fig4 = ss3d_result.get("_fig4", {})
    commit = fig4.get("commit")
    path = fig4.get("path")
    hunk = fig4.get("hunk")

    hunk_txt_path = HERE / "fig4-hunk.txt"
    if not commit or not hunk:
        hunk_txt_path.write_text(
            "No .prefab-modifying commit with a usable m_Name+component/guid "
            "window was found in the sampled history.\n", encoding="utf-8",
        )
        print("fig4: no suitable hunk found", file=sys.stderr)
        return

    header = f"Commit: {commit}\nPath: {path}\n\n"
    hunk_txt_path.write_text(header + "\n".join(hunk) + "\n", encoding="utf-8")

    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ImportError:
        print("matplotlib not available — skipping fig4 PNG", file=sys.stderr)
        return

    lines = hunk
    name_re = re.compile(r"\bm_Name:\s*(\S.*)?$")
    name_candidates = [i for i, l in enumerate(lines) if name_re.search(l)]
    # prefer an m_Name line with an actual value over a blank one
    name_idx = None
    for i in name_candidates:
        m = name_re.search(lines[i])
        if m and m.group(1):
            name_idx = i
            break
    if name_idx is None and name_candidates:
        name_idx = name_candidates[0]
    # guid_idx: require a literal "guid:" key (not just the substring
    # "Component", which also matches "m_Component:")
    guid_idx = next(
        (i for i, l in enumerate(lines)
         if i != name_idx and re.search(r"\bguid:", l, re.IGNORECASE)),
        None,
    )
    if guid_idx is None:
        guid_idx = next(
            (i for i, l in enumerate(lines) if i != name_idx and "m_Script:" in l),
            None,
        )

    fig_h = 0.28 * (len(lines) + 4)
    fig, ax = plt.subplots(figsize=(10, max(4, fig_h)), dpi=150)
    ax.axis("off")
    ax.set_xlim(0, 1)
    ax.set_ylim(0, len(lines) + 1)

    ax.text(
        0.0, len(lines) + 0.6,
        f"SS3D commit {commit[:10]} — {path}",
        fontsize=10, fontweight="bold", family="monospace",
    )

    for i, line in enumerate(lines):
        y = len(lines) - i
        color = "#222"
        weight = "normal"
        bg = None
        if i == name_idx:
            bg = "#FFF3B0"
            weight = "bold"
        elif i == guid_idx:
            bg = "#C9E4FF"
            weight = "bold"
        if line.startswith("+"):
            color = "#1a7a1a"
        elif line.startswith("-"):
            color = "#a11"
        txt = line if len(line) <= 110 else line[:107] + "..."
        ax.text(
            0.0, y, txt, fontsize=8, family="monospace", color=color,
            fontweight=weight,
            bbox=dict(facecolor=bg, edgecolor="none", pad=1.5) if bg else None,
        )

    # Callouts: whichever highlighted row sits higher on the canvas gets its
    # label placed further up (arrow pointing down into it); the lower row
    # gets its label placed further down (arrow pointing up into it) — so
    # the two callouts fan away from each other instead of crossing.
    callouts = []
    if name_idx is not None:
        callouts.append((len(lines) - name_idx, "object name recoverable as text", "#7a5c00"))
    if guid_idx is not None:
        callouts.append((len(lines) - guid_idx, "component identity as GUID", "#1a4a7a"))
    callouts.sort(key=lambda c: c[0])  # lowest y first
    n = len(callouts)
    for rank, (y_target, label, color) in enumerate(callouts):
        # rank 0 = lowest row -> label pushed further down; last = highest row -> label pushed further up
        direction = -1 if rank < n / 2 else 1
        y_text = y_target + direction * (2.5 + rank)
        ax.annotate(
            label,
            xy=(0.62, y_target), xytext=(0.85, y_text),
            fontsize=8, color=color, ha="left",
            arrowprops=dict(arrowstyle="->", color=color, shrinkA=0, shrinkB=3),
        )

    fig.tight_layout()
    fig.savefig(HERE / "fig4-prefab-yaml-hunk.png")
    plt.close(fig)


def write_outputs(results):
    clean_results = []
    for r in results:
        r2 = {k: v for k, v in r.items() if not k.startswith("_")}
        clean_results.append(r2)

    with open(HERE / "results.json", "w", encoding="utf-8") as f:
        json.dump(clean_results, f, indent=2)

    lines = []
    lines.append("# Corpus results — 17 Sep 2026 re-run")
    lines.append("")
    lines.append("Reproduces DOSSIER.md section 3 (30 Aug 2026) with blobless clones "
                  "and the full commit history of each repo's current default branch "
                  "(the dossier used fixed windows of 200-356 commits per repo).")
    lines.append("")
    lines.append("| Repo | Default branch | Commits | Changed-file entries | Code % | .meta % | Other % | Misc % | Unity version |")
    lines.append("|---|---|---|---|---|---|---|---|---|")
    for r in clean_results:
        lines.append(
            f"| {r['repo']} | {r['default_branch']} | {r['commit_count']} | "
            f"{r['changed_file_entries']} | {r['code_pct']}% | {r['meta_pct']}% | "
            f"{r['other_pct']}% | {r['misc_pct']}% | {r['unity_version']} |"
        )
    lines.append("")
    lines.append("## Squash-merge test (naive vs genuine issue references, last 100 non-merge commits)")
    lines.append("")
    lines.append("| Repo | Sample commits | Naive (subject contains #digits) | Genuine (a #N different from the trailing squash self-reference) |")
    lines.append("|---|---|---|---|")
    for r in clean_results:
        lines.append(
            f"| {r['repo']} | {r['squash_test_sample_commits']} | "
            f"{r['naive_hash_digit_count']} | {r['genuine_issue_refs']} |"
        )
    lines.append("")
    lines.append("## Comparison with the 30 Aug dossier and the draft's Figure 6 placeholder")
    lines.append("")
    lines.append("| Repo | Dossier code % (30 Aug, fixed sample) | This run's code % (full history, 17 Sep) |")
    lines.append("|---|---|---|")
    for r in clean_results:
        dossier = DOSSIER_FIGURES.get(r["repo"], {})
        lines.append(f"| {r['repo']} | {dossier.get('code_pct', 'n/a')}% ({dossier.get('sample','')}) | {r['code_pct']}% |")
    lines.append("")
    lines.append("See README.md for the one-line re-run command.")
    (HERE / "results.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    workdir = Path(tempfile.mkdtemp(prefix="corpus_clones_"))
    print(f"Working directory for clones: {workdir}", file=sys.stderr)
    results = []
    try:
        for repo in REPOS:
            r = process_repo(repo, workdir)
            results.append(r)
    finally:
        write_outputs(results)
        write_fig6(results)
        ss3d = next((r for r in results if r["repo"] == "SS3D"), None)
        if ss3d:
            write_fig4(ss3d)
        # clean up clones (blobless, so cheap to redo, but tidy up temp)
        shutil.rmtree(workdir, ignore_errors=True)

    print("Done. Wrote results.json, results.md, fig6.csv, "
          "fig6-code-file-percentage.png, fig4-hunk.txt, "
          "fig4-prefab-yaml-hunk.png", file=sys.stderr)


if __name__ == "__main__":
    main()
