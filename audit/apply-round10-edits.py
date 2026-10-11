"""Round 10 edits (19 Sep 2026). Run from the sprint folder: python audit/apply-round10-edits.py
Each replacement must match exactly once. Sources: audit/FINDINGS-round-10.md, audit/verified-additions-round-10.md."""
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

# Bertram — "That remedy" lost its antecedent when Team B was cut in round 9 (Malcolm)
rep("That remedy still asks the under-reporting party to report, so I do not take it:",
    "The remedy they report, a simplified filing interface for non-experts (p. 297), still asks the under-reporting party to report, so I do not take it:")
# Stray — closing sentence moves into the synthesis
rep(" Both report versions are therefore addressed to the producer.\n", "\n")
# Maddila — payment (Mitchell 1)
rep("Before that check existed, 86 of 119 alerts that developers rejected had fired despite recent activity on the pull request.",
    "Before that check, 86 of 119 rejected alerts had fired despite recent activity.")
# Synthesis — seven sources, three mechanisms adjudicated (both markers' first change)
rep("The six do three jobs. Bertram shows the record failing and Maddila sets the bar a fix must clear. Dourish and Bellotti, with Whitson, explain why.",
    "The seven do three jobs. Bertram shows the record failing and Maddila sets the bar a fix must clear. Dourish and Bellotti, Whitson and Stray each explain why.")
rep("The project bets on the structural mechanism; if readers can say what changed but not why, opacity wins.",
    "The project bets on the structural mechanism and fixes audience by design, since every report is addressed to the producer; if readers can say what changed but not why, opacity wins.")

# Scoping Evidence — scored items before any think-aloud (Mitchell 3); selection rule for the ten needs (Malcolm 2); trims to pay
rep("Each answers six matched questions per report (draft items in Appendix B), and six of them then think aloud on a stand-up task.",
    "Each answers six matched questions per report (draft items in Appendix B) before any think-aloud; six of them then think aloud on a stand-up task.")
rep("All eight readers then classify the same ten needs at the end of their session;",
    "All eight readers then classify the same ten needs (the ten most often raised) at the end of their session;")
rep("Week difficulty is then a rival explanation, so per-week baseline scores are reported beside the differences.",
    "Week difficulty is a rival explanation, so per-week baseline scores are reported too.")
rep(" It can falsify naming and activity claims, not file counts.", "")

# Fact-finder round 10: Whitson gloss; 60% sentence honest about two weeks below target (fallback restored); ten-need sheet budgeted; CSCW hyphen reverted (Crossref)
rep("the tools hide what happened (Whitson, 2018)", "the tools hide why it happened (Whitson, 2018)")
rep("The 60% target sits above the worst week.", "Two of those weeks fall below 60%, so where no name resolves the report shows the file path.")
rep("All eight readers then classify the same ten needs (the ten most often raised) at the end of their session;", "All eight readers then classify the same ten needs (the ten most often raised) on a one-page sheet at the end of their session;")
rep("| 3 | Evaluation protocol and instruments | Six matched items per week, answerable from the report alone;", "| 3 | Evaluation protocol and instruments | Six matched items per week, answerable from the report alone, plus the ten-need sheet;")
rep("Proceedings of the 2010 ACM Conference on Computer-Supported Cooperative Work", "Proceedings of the 2010 ACM Conference on Computer Supported Cooperative Work")
# payments
rep("Two sub-questions structure the evaluation. Sub-question 1:", "Sub-question 1:")
rep("Stray et al. (2016) built a grounded theory of the daily stand-up from 12 teams in three companies.", "Stray et al. (2016) built a grounded theory of the daily stand-up from 12 teams.")

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("applied", n, "edits")
