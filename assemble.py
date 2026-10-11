"""Assemble the A2 draft from the section editors' JSON output.

Usage:  python assemble.py <workflow-output.json> <out.md> [student_id]

Reads the editor workflow result (keys intro, lr, proposal), writes a single
Markdown file with a %-cover block, BODY markers for count-words.py, the three
sections, the References list and the GenAI appendix. Prints per-section word
counts using the same rule as count-words.py.
"""
import io, json, re, sys

src, out = sys.argv[1], sys.argv[2]
student_id = sys.argv[3] if len(sys.argv) > 3 else "[STUDENT ID]"
data = json.load(io.open(src, encoding="utf-8"))
res = data["result"] if "result" in data else data
intro, lr, prop = res["intro"], res["lr"], res["proposal"]

def split_intro(md):
    """Return (introduction, references, genai) from the intro editor's output."""
    parts = {"intro": "", "refs": "", "genai": ""}
    cur = None
    for line in md.split("\n"):
        h = line.strip()
        if h.startswith("## Introduction"):
            cur = "intro"; parts[cur] += line + "\n"; continue
        if h.startswith("## References"):
            cur = "refs"; parts[cur] += line + "\n"; continue
        if h.startswith("## Appendix A"):
            cur = "genai"; parts[cur] += line + "\n"; continue
        if cur:
            parts[cur] += line + "\n"
    return parts["intro"].strip(), parts["refs"].strip(), parts["genai"].strip()

intro_md, refs_md, genai_md = split_intro(intro["section_markdown"])
lr_md = lr["section_markdown"].strip()
prop_md = prop["section_markdown"].strip()

cover = "\n".join([
    "%TITLE: ChangeLens: Automated Change Reports for Game Producers from Unity Project Artefacts",
    "%SUBTITLE: COMP3180 RESEARCH PROPOSAL",
    "%NAME: Raphael Byun",
    f"%ID: {student_id}",
    "%CATEGORY: Developer / production tools",
    "%HEADER: COMP3180 Research Proposal — Raphael Byun",
])

doc = "\n\n".join([cover, "<!--BODY-START-->", intro_md, lr_md, prop_md, "<!--BODY-END-->", refs_md, genai_md]) + "\n"
io.open(out, "w", encoding="utf-8", newline="\n").write(doc)

def count(md):
    n = 0
    for line in md.split("\n"):
        s = line.strip()
        if not s or s.startswith("#") or s.startswith("<!--") or s.startswith("%"):
            continue
        if re.match(r"^\[(FIGURE|NOTE|FALLBACK|DRAFT NOTE|RB-)", s):
            continue
        if re.match(r"^\|[\s:|-]+\|$", s):
            continue
        m = re.match(r"^!\[(.*)\]\(.*\)$", s)
        if m:
            s = m.group(1)
        s = s.replace("|", " ")
        s = re.sub(r"[*_`>]", "", s)
        n += len([w for w in s.split() if re.search(r"[A-Za-z0-9]", w)])
    return n

for name, md in (("Introduction", intro_md), ("Literature Review", lr_md), ("Project Proposal", prop_md)):
    print(f"{count(md):5d}  {name}")
print(f"{count(intro_md) + count(lr_md) + count(prop_md):5d}  TOTAL body (captions and table text included)")
print(f"{count(genai_md):5d}  GenAI appendix (outside the count)")
print("editor-reported:", intro.get("word_count"), lr.get("word_count"), prop.get("word_count"))
print("could_not_do:", intro.get("could_not_do"), lr.get("could_not_do"), prop.get("could_not_do"))
print("wrote", out)
