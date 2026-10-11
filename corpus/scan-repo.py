"""Classify a local Unity repository's full history the same way corpus.py does (changed-file entries by
category, .meta counted as non-code) and count commits whose message cites a tracker key such as INK-12.
Usage: python corpus/scan-repo.py <repo path> [key regex]"""
import subprocess, sys, collections, re, os

repo = sys.argv[1]
key_re = re.compile(sys.argv[2] if len(sys.argv) > 2 else r"\b[A-Z][A-Z0-9]+-\d+\b")
raw = subprocess.run(["git", "-C", repo, "-c", "core.quotepath=false", "log", "--name-status", "--no-renames",
                      "--date=short", "--format=COMMIT %H %ad %s"],
                     capture_output=True, text=True, encoding="utf-8", errors="replace").stdout

CODE = {".cs", ".asmdef", ".shader", ".cginc", ".hlsl", ".compute"}
SCENE = {".unity", ".prefab"}
ART = {".png", ".jpg", ".jpeg", ".psd", ".tga", ".fbx", ".obj", ".blend", ".mat", ".anim", ".controller", ".tif", ".exr", ".aseprite", ".svg"}
AUDIO = {".wav", ".ogg", ".mp3", ".aiff"}
DATA = {".asset", ".json", ".xml", ".txt", ".csv", ".yaml", ".md", ".inputactions", ".physicsmaterial2d"}

def cat(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".meta": return "Meta"
    if ext in CODE: return "Code"
    if ext in SCENE: return "ScenePrefab"
    if ext in ART: return "Art"
    if ext in AUDIO: return "Audio"
    if ext in DATA: return "DataConfig"
    return "Other"

cats = collections.Counter(); commits = 0; keyed = 0; merges = 0; subjects_with_key = []
authors = collections.Counter()
for line in raw.splitlines():
    if line.startswith("COMMIT "):
        commits += 1
        subj = line.split(" ", 3)[3] if len(line.split(" ", 3)) > 3 else ""
        if key_re.search(subj):
            keyed += 1; subjects_with_key.append(subj[:70])
    elif line and line[0] in "AMDRCT" and "\t" in line:
        cats[cat(line.split("\t")[-1])] += 1
total = sum(cats.values())
meta = cats["Meta"]; code = cats["Code"]
print("repo:", repo)
print("commits:", commits, "| commits whose subject cites a tracker key:", keyed, "(%.0f%%)" % (100.0 * keyed / max(1, commits)))
print("changed-file entries:", total, "|", dict(cats))
print("code share, .meta counted as non-code: %.1f%%" % (100.0 * code / max(1, total)))
print("code share, .meta excluded: %.1f%%" % (100.0 * code / max(1, total - meta)))
print("asset-layer share (scene/prefab + art + audio): %.1f%%" % (100.0 * (cats["ScenePrefab"] + cats["Art"] + cats["Audio"]) / max(1, total)))
for s_ in subjects_with_key[:8]:
    print("  keyed:", s_)
