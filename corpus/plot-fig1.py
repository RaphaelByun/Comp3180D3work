"""Redraw the proposal's Figure 1 (code share of changed-file entries) with the five public repositories
from corpus/results.json plus Inkform, the author's own team repository (corpus/scan-repo.py, 18 Sep 2026).
Writes figures/fig4-code-file-percentage.png (the file the proposal embeds) and corpus/fig1-six-repos.csv."""
import json, io, os, csv, sys
NO_REF = "--no-ref" in sys.argv  # round 7 (19 Sep 2026): draw without the Pascarella reference line
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
results = json.load(io.open(os.path.join(here, "results.json"), encoding="utf-8"))
rows = [(r["repo"], r["code_pct"]) for r in results]
rows.append(("Inkform (own team)", 17.4))
rows.sort(key=lambda x: x[1])

with io.open(os.path.join(here, "fig1-six-repos.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f); w.writerow(["repo", "code_pct"]); w.writerows(rows)

names = [r[0] for r in rows]; pcts = [r[1] for r in rows]
fig, ax = plt.subplots(figsize=(8.2, 4.6), dpi=200)
bar = "#1F3A5F"; ref = "#B33F3F"
ax.barh(names, pcts, color=bar, height=0.62, zorder=3)
for y, v in enumerate(pcts):
    ax.text(v + 0.7, y, "%.1f%%" % v, va="center", fontsize=9.5, color="#333")
if not NO_REF:
    ax.axvline(30, color=ref, linestyle="--", linewidth=1.6, zorder=2)
    ax.text(31.0, 1.35, "30% reference line:\nshare of Development-category files\nin open-source games, on average\n(Pascarella et al., 2018; a different denominator)",
            color=ref, fontsize=8, va="center")
ax.set_xlabel("Code files as a share of changed-file entries (%), .meta counted as non-code", fontsize=10)
ax.set_ylabel("Repository", fontsize=10)
ax.set_xlim(0, 45 if NO_REF else 60)
ax.set_ylim(-0.6, len(names) - 0.4)
ax.grid(axis="x", linestyle=":", alpha=0.45, zorder=0)
for s in ("top", "right"):
    ax.spines[s].set_visible(False)
fig.text(0.01, 0.01, "Computed 17–18 Sep 2026 from git log --name-status over each repository's full default-branch history (corpus.py; scan-repo.py for Inkform).",
         fontsize=7, color="#555")
fig.tight_layout(rect=(0, 0.04, 1, 1))
out = os.path.join(root, "figures", "fig4-code-file-percentage.png")
fig.savefig(out)
print("wrote", out, rows)
