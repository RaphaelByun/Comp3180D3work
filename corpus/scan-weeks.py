"""Scan the SS3D clone's history week by week and rank weeks by how much of the change is
scene/prefab and art work (the asset layer), so the proposal can demonstrate ChangeLens on a
week where the asset layer matters. Usage: python corpus/scan-weeks.py [top_n]"""
import subprocess, sys, collections, datetime, os

repo = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "prototype-data", "SS3D")
raw = subprocess.run(["git", "-C", repo, "-c", "core.quotepath=false", "log", "--name-status", "--no-renames", "--no-merges", "--date=short", "--format=COMMIT %H %ad %s"],
                     capture_output=True, text=True, encoding="utf-8", errors="replace").stdout

CODE = {".cs", ".asmdef", ".shader", ".cginc", ".hlsl", ".compute"}
SCENE = {".unity", ".prefab"}
ART = {".png", ".jpg", ".jpeg", ".psd", ".tga", ".fbx", ".obj", ".blend", ".mat", ".anim", ".controller", ".tif", ".exr"}
AUDIO = {".wav", ".ogg", ".mp3", ".aiff"}
DATA = {".asset", ".json", ".xml", ".txt", ".csv", ".yaml", ".md"}

def cat(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".meta":
        return "Meta"
    if ext in CODE: return "Code"
    if ext in SCENE: return "ScenePrefab"
    if ext in ART: return "Art"
    if ext in AUDIO: return "Audio"
    if ext in DATA: return "DataConfig"
    return "Other"

weeks = collections.defaultdict(lambda: {"commits": 0, "entries": 0, "cats": collections.Counter(), "subjects": []})
cur = None
for line in raw.splitlines():
    if line.startswith("COMMIT "):
        parts = line.split(" ", 3)
        d = datetime.date.fromisoformat(parts[2])
        monday = d - datetime.timedelta(days=d.weekday())
        cur = weeks[monday]
        cur["commits"] += 1
        cur["subjects"].append(parts[3][:60] if len(parts) > 3 else "")
    elif line and cur is not None and line[0] in "AMDRC":
        cols = line.split("\t")
        path = cols[-1]
        cur["entries"] += 1
        cur["cats"][cat(path)] += 1

rows = []
for monday, w in weeks.items():
    c = w["cats"]
    asset = c["ScenePrefab"] + c["Art"] + c["Audio"]
    rows.append((asset, monday, w))
rows.sort(reverse=True)
top = int(sys.argv[1]) if len(sys.argv) > 1 else 15
print("monday      commits entries  code scene/prefab art audio data meta other | asset-share")
for asset, monday, w in rows[:top]:
    c = w["cats"]
    print("%s  %5d  %6d  %4d %5d %8d %5d %4d %5d %5d | %4.0f%%" % (
        monday, w["commits"], w["entries"], c["Code"], c["ScenePrefab"], c["Art"], c["Audio"], c["DataConfig"], c["Meta"], c["Other"],
        100.0 * asset / max(1, w["entries"])))
print()
print("Weeks with 30-150 entries, ranked by asset share:")
mid = [(100.0 * a / w["entries"], m, w) for a, m, w in rows if 30 <= w["entries"] <= 150]
mid.sort(reverse=True)
for share, m, w in mid[:12]:
    c = w["cats"]
    print("%s  commits %2d  entries %3d  code %3d  scene/prefab %3d  art %3d  audio %2d  meta %3d  asset-share %3.0f%%  | %s" % (
        m, w["commits"], w["entries"], c["Code"], c["ScenePrefab"], c["Art"], c["Audio"], c["Meta"], share, "; ".join(w["subjects"][:3])))
