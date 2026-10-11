"""Round 14 trims to the ceiling (20 Sep 2026). Run after apply-round14-edits.py: python audit/apply-round14-trim.py [path]
Each replacement must match exactly once. No fact is changed."""
import io, sys
P = sys.argv[1] if len(sys.argv) > 1 else "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
n = 0
def rep(old, new):
    global s, n
    c = s.count(old)
    if c != 1:
        print("FAIL (%d matches): %s" % (c, old[:90])); sys.exit(1)
    s = s.replace(old, new); n += 1

rep("The same readers compare two report versions, with and without the names.", "The same readers compare versions with and without the names.")
rep("they summarise tickets and commits for engineers, take manual entry from game teams, or show asset history to artists.", "tickets and commits summarised for engineers, manual entry from game teams, or asset history for artists.")
rep("so the absence says little about production, and I look in artefacts instead.", "so the absence says little, and I look in artefacts instead.")
rep("I take it as a constraint I cannot escape: the report is addressed", "I take it as a constraint: the report is addressed")
rep("which strips a real producer's context and should favour the treatment,", "which strips a real producer's context and favours the treatment,")
rep("and 10 min of think-aloud for the six readers who do it.", "and 10 min of think-aloud for six readers.")
rep("86 of the 119 alerts developers dismissed had fired", "86 of 119 dismissed alerts had fired")
rep("into the producer-facing page, builds both report versions", "into the producer page, builds both report versions")
rep("in the follow-up the six think-aloud readers explain three of their classifications.", "in the follow-up the six think-aloud readers explain three classifications.")
rep("Slots are booked by the end of Week 10.", "Slots are booked by Week 10.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("trimmed", n, "places in", P)
