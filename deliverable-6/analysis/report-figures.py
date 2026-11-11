# Results figures for the A3 Final Project Report (Figures 4 and 5), drawn 11 Nov 2026 by Claude Code.
# The numbers are typed from deliverable-6/data/analysis-output.md (Tables B, D, F and H, and "Minutes per read")
# and are asserted below; the same counts are in the report's Appendix L.
# Run from the repository root:  python deliverable-6/analysis/report-figures.py figures
# Needs Python 3 with matplotlib. Writes figures/a3-results-reads.png and figures/a3-results-severity.png.
import sys
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

OUT = sys.argv[1]
plt.rcParams['font.family'] = ['Segoe UI', 'Arial', 'DejaVu Sans']
INK, INK2, MUTED, GRID, BASE = '#0b0b0b', '#52514e', '#898781', '#e1e0d9', '#c3c2b7'
BLUE, GRAY, RED = '#2a78d6', '#c3c2b7', '#e34948'          # correct / partly correct / wrong (validated)
SEV = ['#86b6ef', '#3987e5', '#1c5cab', '#0d366b']          # ordinal ramp, severity 1..4 (validated)
BAR, TRACK = '#52514e', '#ecebe6'                            # neutral measure bar and its track
W_IN = 15.5 / 2.54

# ------------------------------------------------------------------ Figure: the two reads
needs = {'A': (4, 5, 1), 'B': (2, 5, 3)}
items = {'A': 6, 'B': 4}
mins = {'A': 10, 'B': 23}
ratings = {'Ease': (5, 3), 'Useful': (3, 4), 'Would send': (3, 2)}
assert sum(needs['A']) == 10 and sum(needs['B']) == 10

fig = plt.figure(figsize=(W_IN, 2.05), dpi=300)
gs = fig.add_gridspec(1, 6, width_ratios=[3.3, 1.45, 1.35, 1.05, 1.05, 1.3], left=0.135, right=0.985, top=0.70, bottom=0.20, wspace=0.42)
ypos = {'A': 1, 'B': 0}
H = 0.46


def frame(ax, title, xmax):
    ax.set_xlim(0, xmax); ax.set_ylim(-0.55, 1.55)
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_visible(False)
    ax.set_title(title, fontsize=7.2, color=INK, loc='left', pad=5, fontweight='semibold')


ax = fig.add_subplot(gs[0])
frame(ax, 'Ten producer needs answered', 10)
for v in 'AB':
    left = 0
    for n, col, tc in zip(needs[v], (BLUE, GRAY, RED), ('#ffffff', INK, '#ffffff')):
        ax.barh(ypos[v], n, left=left, height=H, color=col, edgecolor='#ffffff', linewidth=1.6)
        ax.text(left + n / 2, ypos[v], str(n), ha='center', va='center', fontsize=7.2, color=tc, fontweight='semibold')
        left += n
ax.set_yticks([1, 0]); ax.set_yticklabels(['Version A\n(read first)', 'Version B\n(read second)'], fontsize=7, color=INK)
ax.tick_params(axis='y', length=0, pad=4)
ax.legend(handles=[Patch(color=BLUE, label='correct'), Patch(color=GRAY, label='partly correct'), Patch(color=RED, label='wrong')],
          loc='upper left', bbox_to_anchor=(-0.01, -0.02), ncol=3, frameon=False, fontsize=6.6, handlelength=1.0, handleheight=0.9,
          columnspacing=1.1, handletextpad=0.45, labelcolor=INK2)


def meter(ax, title, vals, limit, unit=''):
    frame(ax, title, limit * 1.42)
    for v in 'AB':
        if unit == '':
            ax.barh(ypos[v], limit, height=H, color=TRACK, linewidth=0)
        ax.barh(ypos[v], vals[v], height=H, color=BAR, linewidth=0)
        end = limit if unit == '' else vals[v]
        ax.text(end + limit * 0.06, ypos[v], f'{vals[v]}{unit}', ha='left', va='center', fontsize=7.2, color=INK, fontweight='semibold')
    ax.plot([0, 0], [-0.42, 1.42], color=BASE, linewidth=0.8)


meter(fig.add_subplot(gs[1]), 'Question items\n(score out of 10)', items, 10)
axm = fig.add_subplot(gs[2])
frame(axm, 'Minutes\ntaken', 23 * 1.45)
for v in 'AB':
    axm.barh(ypos[v], mins[v], height=H, color=BAR, linewidth=0)
    axm.text(mins[v] + 1.6, ypos[v], str(mins[v]), ha='left', va='center', fontsize=7.2, color=INK, fontweight='semibold')
axm.plot([0, 0], [-0.42, 1.42], color=BASE, linewidth=0.8)
rax = []
for k, (name, (a, b)) in enumerate(ratings.items()):
    axr = fig.add_subplot(gs[3 + k]); rax.append(axr)
    meter(axr, name, {'A': a, 'B': b}, 5)
    axr.title.set_fontweight('normal'); axr.title.set_color(INK2)
fig.text(rax[0].get_position().x0, 0.845, 'My ratings (1 to 5)', ha='left', va='bottom', fontsize=7.2, color=INK, fontweight='semibold')
fig.savefig(OUT + '/a3-results-reads.png', facecolor='#ffffff')
plt.close(fig)

# ------------------------------------------------------------------ Figure: heuristic problems by severity
tools = [('ChangeLens', (6, 13, 5, 0)), ('HacknPlan', (4, 13, 9, 1)), ('Trello', (3, 10, 3, 0)),
         ('GitHub Projects', (0, 8, 2, 0)), ('Jira', (0, 7, 1, 0))]
assert [sum(c) for _, c in tools] == [24, 27, 16, 10, 8]
fig = plt.figure(figsize=(W_IN, 2.25), dpi=300)
ax = fig.add_axes([0.17, 0.20, 0.80, 0.76])
ax.set_xlim(0, 30); ax.set_ylim(-0.6, len(tools) - 0.4)
for s in ax.spines.values():
    s.set_visible(False)
ax.set_xticks([])
HB = 0.50
for i, (name, counts) in enumerate(tools):
    y = len(tools) - 1 - i
    left = 0
    for sev, n in enumerate(counts):
        if n == 0:
            continue
        ax.barh(y, n, left=left, height=HB, color=SEV[sev], edgecolor='#ffffff', linewidth=1.6)
        if n >= 2:
            ax.text(left + n / 2, y, str(n), ha='center', va='center', fontsize=7.2, fontweight='semibold',
                    color=INK if sev == 0 else '#ffffff')
        left += n
    ax.text(left + 0.5, y, f'{left} problems' if i == 0 else str(left), ha='left', va='center', fontsize=7.4, color=INK, fontweight='semibold')
ax.set_yticks(range(len(tools)))
ax.set_yticklabels([t for t, _ in tools][::-1], fontsize=7.6, color=INK)
ax.get_yticklabels()[-1].set_fontweight('bold')
ax.tick_params(axis='y', length=0, pad=5)
ax.plot([0, 0], [-0.45, len(tools) - 0.55], color=BASE, linewidth=0.8)
ax.legend(handles=[Patch(color=SEV[0], label='Severity 1 (cosmetic)'), Patch(color=SEV[1], label='2 (minor)'),
                   Patch(color=SEV[2], label='3 (major)'), Patch(color=SEV[3], label='4 (catastrophe)')],
          loc='upper left', bbox_to_anchor=(-0.005, -0.01), ncol=4, frameon=False, fontsize=6.8, handlelength=1.0, handleheight=0.9,
          columnspacing=1.3, handletextpad=0.45, labelcolor=INK2)
fig.savefig(OUT + '/a3-results-severity.png', facecolor='#ffffff')
plt.close(fig)
print('figures written')
