"""Round-1 proofreader corrections (numerals for 10 and above per APA 7, possessive, punctuation). Exact-match; nothing written if any match fails."""
import io, shutil

p = "A2 Draft v2 — 17 Sep 2026.md"
shutil.copy(p, "audit/as-marked-round-1.md")
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

rep("for developers (Perforce Software, n.d.), the log-mining McShaffry (2013) showed producers doing by hand.",
    "for developers (Perforce Software, n.d.); McShaffry (2013) showed producers doing that log-mining by hand.")
rep("interviewed and surveyed fifteen people across four small, collocated software teams",
    "interviewed and surveyed 15 people across four small, collocated software teams")
rep("watched seventeen developers at a large software company and surveyed forty-two more.",
    "watched 17 developers at a large software company and surveyed 42 more.")
rep("breaks into twenty-one information types across seven kinds of work.", "breaks into 21 information types across seven kinds of work.")
rep("Those twenty-one types let me answer", "Those 21 types let me answer")
rep("mined thirty open-source game projects and thirty non-game systems", "mined 30 open-source game projects and 30 non-game systems")
rep("ten weeks of ethnographic observation with ten intern developers", "10 weeks of ethnographic observation with 10 intern developers")
rep("then checks the last twenty-four hours for comments", "then checks the last 24 hours for comments")
rep("judge whether a team's artefacts can serve a producer information need, or whether a person must.",
    "judge whether a team's artefacts can serve a producer's information need, or whether a person must.")
rep("heuristic evaluations of four tools, ten producer job advertisements, 25 reviews and two interviews surface them",
    "heuristic evaluations of four tools, 10 producer job advertisements, 25 reviews and two interviews surface them")
rep("then answer a follow-up feeding sub-question 1.", "then answer a follow-up feeding Sub-question 1.")
rep("(one megabyte of versioned non-code assets; thirty genuine issue references per hundred commits)",
    "(one megabyte of versioned non-code assets; 30 genuine issue references per 100 commits)")
rep("both conditions come from RE-SS3D/SS3D's history and immersivecognition/unity-experiment-framework serves sub-question 1.",
    "both conditions come from RE-SS3D/SS3D's history, and immersivecognition/unity-experiment-framework serves Sub-question 1.")
rep("heuristics (6 h); ten job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's twenty-one types (3 h)",
    "heuristics (6 h); 10 job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's 21 types (3 h)")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("round-1 proofreader corrections applied")
