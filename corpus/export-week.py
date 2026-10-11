"""Export one SS3D team-week as a git log --name-status file for ChangeLens (same command shape as
the first sample), and measure how many changed prefab/scene files carry an object name (m_Name)
in their changed text. Usage: python corpus/export-week.py 2021-02-08 2021-02-15 <out.txt>"""
import subprocess, sys, os, re, io

since, until, out = sys.argv[1], sys.argv[2], sys.argv[3]
repo = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "prototype-data", "SS3D")

def git(*args):
    return subprocess.run(["git", "-C", repo, "-c", "core.quotepath=false"] + list(args),
                          capture_output=True, text=True, encoding="utf-8", errors="replace").stdout

log = git("log", "--name-status", "--date=iso", "--no-merges", "--since=" + since, "--until=" + until)
io.open(out, "w", encoding="utf-8", newline="\n").write(log)
commits = log.count("\ncommit ") + (1 if log.startswith("commit ") else 0)
entries = sum(1 for l in log.splitlines() if l[:1] in "AMDRCT" and "\t" in l)
print("exported", out, "| commits", commits, "| changed-file entries", entries)

# Naming-presence measurement over changed prefab and scene files in the same window.
patch = git("log", "-p", "--no-merges", "--date=iso", "--since=" + since, "--until=" + until, "--", "*.prefab", "*.unity")
files = {}
cur = None
for line in patch.splitlines():
    if line.startswith("diff --git "):
        m = re.search(r" b/(.+)$", line)
        cur = m.group(1) if m else line
        files.setdefault(cur, {"changed_lines": 0, "name_lines": 0, "names": set()})
    elif cur and (line.startswith("+") or line.startswith("-")) and not line.startswith(("+++", "---")):
        files[cur]["changed_lines"] += 1
        if "m_Name:" in line:
            files[cur]["name_lines"] += 1
            files[cur]["names"].add(line.split("m_Name:", 1)[1].strip())
    elif cur and line.startswith(" ") and "m_Name:" in line:
        files[cur]["names"].add(line.split("m_Name:", 1)[1].strip())
total = len(files)
with_name = sum(1 for f in files.values() if f["names"])
print("prefab/scene files changed:", total, "| with an object name (m_Name) in the changed text or its context:", with_name)
for path, f in sorted(files.items()):
    names = sorted(n for n in f["names"] if n)[:3]
    print("  %-70s changed lines %4d  names: %s" % (path[-70:], f["changed_lines"], ", ".join(names)))
