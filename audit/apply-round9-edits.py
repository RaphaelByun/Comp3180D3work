"""Round 9 edits (19 Sep 2026). Run from the sprint folder: python audit/apply-round9-edits.py
Each replacement must match exactly once. Sources: audit/FINDINGS-round-9.md, audit/verified-additions-round-9.md."""
import io, sys
P = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(P, encoding="utf-8").read()
n = 0
def rep(old, new):
    global s, n
    c = s.count(old)
    if c != 1:
        print("FAIL (%d matches): %s" % (c, old[:80])); sys.exit(1)
    s = s.replace(old, new); n += 1

# Introduction — the 73-word seven-tool sentence becomes plain (Mitchell 2); detail stays in Appendix A
rep("Seven surveyed tools each cover one part (Appendix A): summarisers of tickets and commits stop at engineers or product teams (ZeroStandup, n.d.; Linear, 2026); game-native trackers rely on manual entry (HacknPlan, n.d.); Perforce's P4 MCP and Anchorpoint read asset history for developers and artists (Perforce Software, n.d.; Anchorpoint, n.d.); Unity's own pipeline, in closed beta, reviews renders and builds (Unity Technologies, n.d.). None turns the asset layer into a week's account for a producer; that is the gap this project fills.",
    "Seven existing tools each cover one part of this (Appendix A): they summarise tickets and commits for engineers, take manual entry from game teams, or show asset history to developers and artists. None turns the Unity asset layer into a week's account for a producer. That is the gap this project fills.")

# Literature Review — plain orientation before any author (Malcolm 2); Stray no longer deferred
rep("Why is a team's shared record thinner than the work it describes? Two explanations compete. Dourish and Bellotti (1992) blame the structure of reporting: it costs the reporter and pays everyone else. Whitson (2018) blames the tools: developers cannot always see why the software did what it did. A third, audience, arrives with Stray et al. (2016) at the end. Four further studies fill in what the explanations leave out: where the record fails (Bertram et al., 2010), what a reader needs to know (Ko et al., 2007), why a game week differs from a software week (Pascarella et al., 2018), and the bar an absence-detector must clear (Maddila et al., 2023).",
    "A producer's picture of the week comes from tickets and stand-ups, both written by the people doing the work. Why is that record thinner than the work it describes? The literature offers three explanations: reporting is structured against the reporter (Dourish & Bellotti, 1992), the tools hide what happened (Whitson, 2018), or the report is addressed to the wrong audience (Stray et al., 2016). Four further studies supply where the record fails, what a reader needs to know, why a game week differs from a software week, and the bar an absence-detector must clear.")
# Bertram — Team B sentence is the payment (Mitchell 5)
rep(" Team B, in a large gaming company (p. 293), had to build a simplified filing interface before non-experts would file anything (p. 297).", "")
# Dourish & Bellotti — currency appraised (Mitchell 5)
rep("Their evidence is narrow: four groups, one session.",
    "Their evidence is narrow: four groups, one session, in 1992; but the mechanism is about incentives, not technology, so it survives git.")
# Maddila trim
rep("Three limits bound my claim: every signal comes from inside the pull request,", "Its limits: every signal comes from inside the pull request,")
# Stray — a real entry after Whitson (both markers' first change)
rep("and the think-aloud follow-up asks what the page leaves unexplained.\n\nMaddila et al. (2023)",
    "and the think-aloud follow-up asks what the page leaves unexplained.\n\nStray et al. (2016) built a grounded theory of the daily stand-up from 12 teams in three companies. The meeting degrades when its audience changes: addressed to the manager rather than the team, it becomes status reporting, and nine interviewees said others tuned out. That is the third explanation, audience: the record thins because of who it is written for. It fixes my design audience: both report versions are addressed to the producer.\n\nMaddila et al. (2023)")
# Synthesis — Stray clause and Washburn shortened now that Stray has an entry
rep("Stray et al. (2016), who studied 12 teams' daily stand-ups, add the third explanation, audience: a stand-up that becomes status reporting to the manager stops serving the team. Washburn et al. (2016) found no communication category among 155 game postmortems: postmortems record outcomes, not reporting, which is one more reason to look in artefacts.",
    "Washburn et al. (2016) found no communication category among 155 game postmortems: postmortems record outcomes, not reporting, one more reason to look in artefacts.")

# Scoping Evidence — Sub-question 1 evidenced by the readers (Mitchell 3); SS3D sized (fact-finder); 60% target explained (Malcolm 5 / Mitchell 4)
rep("I repeat the marking a week later and report where the two passes disagree.",
    "All eight readers then classify the same ten needs at the end of their session; I report their agreement with one another and with my marking, and treat each disagreement as a finding about what the artefacts cannot say.")
rep("in a follow-up the six think-aloud participants also classify a ten-need sample for Sub-question 1, and their agreement with my classification is reported.",
    "in a follow-up the six think-aloud participants explain three of their classifications aloud.")
rep("The study's material is SS3D (Space Station 3D), a large open-source Unity game whose public history supplies real team-weeks.",
    "The study's material is SS3D (Space Station 3D), an open-source Unity game with 710 commits from 68 contributors, whose public history supplies real team-weeks.")
rep("Across four SS3D weeks, 46–100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown), which sets the 60% naming target.",
    "Across four SS3D weeks, between 46% and 100% of changed prefabs and scenes carry an object name in their changed text (23 of 26 in the week shown). The 60% target sits above the worst week.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits")
