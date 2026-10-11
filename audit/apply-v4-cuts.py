"""Final word-count trim after apply-v4-edits.py. Exact-match; nothing written if any match fails."""
import io

p = "A2 Draft v2 — 17 Sep 2026.md"
s = io.open(p, encoding="utf-8").read()
fails = []

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:70])); return
    s = s.replace(old, new)

rep("On a September 2026 sweep of vendor documentation (studio-internal tools are not observable), no publicly available tool fuses tracker, repository and engine signals for a non-technical producer.",
    "No publicly documented tool fuses tracker, repository and engine signals for a non-technical producer (September 2026 vendor sweep; studio-internal tools are not observable).")
rep("The final project delivers that package", "The project delivers that package")
rep("It is why the fidelity check scores each report against the team's record, not its tickets: the record is incomplete before any tool reads it.",
    "It is why the fidelity check scores each report against the team's record, not its tickets.")
rep("The finding that fixed my unit of analysis is this: what a developer", "The finding that fixed my unit of analysis: what a developer")
rep("In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold. In non-games, specialised sub-teams form around code only. A report that follows code alone is therefore blind to whole ownership groups.",
    "In games, sub-teams specialise in non-code categories such as multimedia at the authors' >75% ownership threshold; in non-games they form around code only, so a report that follows code alone is blind to whole ownership groups.")
rep("That is the case for Deliverable 2's passive aggregation layer, which reads artefacts instead of asking.",
    "That is the case for Deliverable 2's aggregation layer, which reads artefacts instead of asking.")
rep("It supplies the rival mechanism my synthesis has to adjudicate.", "It is the rival mechanism the synthesis adjudicates.")
rep("judge whether a team's artefacts can serve a given producer information need, or whether a person must.",
    "judge whether a team's artefacts can serve a producer information need, or whether a person must.")
rep("The primary research question is the one stated in the Introduction; two sub-questions structure the evaluation.",
    "Two sub-questions structure the evaluation of the research question stated in the Introduction.")
rep("The needs come from Deliverable 1, which runs first: heuristic evaluations of four production tools, ten producer job advertisements, 25 user reviews and two interviews surface them, and its specification is what the Evaluate goal classifies.",
    "The needs come from Deliverable 1, which runs first: heuristic evaluations of four tools, ten producer job advertisements, 25 reviews and two interviews surface them; its specification is what the Evaluate goal classifies.")
rep(" Fused tracker-plus-repository output is therefore never tested.", "")
rep("heuristics (6 h); ten job ads and 25 reviews coded (3 h); two more interviews (2 h); a spec classifying at least 25 needs against Ko's twenty-one types (3 h)",
    "heuristics (6 h); ten job ads and 25 reviews coded (3 h); two interviews (2 h); a spec classifying 25 needs against Ko's twenty-one types (3 h)")
rep("Covers all six items and both coding arms with agreement reported; every claim traceable to an appendix file",
    "All six items and both coding arms reported with agreement; claims traceable to appendix files")

if fails:
    print("FAILED MATCHES:", fails)
    raise SystemExit(1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("v4 cuts applied")
