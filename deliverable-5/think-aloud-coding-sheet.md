# Think-aloud coding: codebook and procedure

Source for the types: Ko, A. J., DeLine, R., & Venolia, G. (2007). Information needs in collocated software development teams. *Proceedings of the 29th International Conference on Software Engineering (ICSE '07)*, 344-353. https://doi.org/10.1109/ICSE.2007.45 (the 21 types are in Section 5, printed pp. 347-349, summarised in Figure 3 on p. 350).

## The 21 information types: confirmed

All 21 question texts below were checked against two sources on disk, 13 Oct 2026. They are quoted as the paper prints them. c2 keeps the paper's "of function" with [sic], as D1 does; the intended word is probably "or". The two sources:

1. `Working folder/a2-draft-2-sep-2026/verify/ko2007.md` (a 2 Sep 2026 verification that read the paper's page images and recorded all 7 categories and 21 types as verbatim);
2. the text layer of `reading/ko2007.pdf` in the A3 repo checkout (untracked, on disk only) (each question matched after removing spaces and case, because the text layer drops spaces; the apostrophe forms "team's" and "What's" matched too).

Raphael: before you cite wording in the report, glance at Section 5 of the paper once yourself. A2 says you read the sources.

| Code | Category (paper section) | Question |
|---|---|---|
| c1 | Writing Code (5.1) | What data structures or functions can be used to implement this behavior? |
| c2 | Writing Code (5.1) | How do I use this data structure of function? [sic] |
| c3 | Writing Code (5.1) | How can I coordinate this code with this other data structure or function? |
| s1 | Submitting a Change (5.2) | Did I make any mistakes in my new code? |
| s2 | Submitting a Change (5.2) | Did I follow my team's conventions? |
| s3 | Submitting a Change (5.2) | Which changes are part of this submission? |
| b1 | Triaging Bugs (5.3) | Is this a legitimate problem? |
| b2 | Triaging Bugs (5.3) | How difficult will this problem be to fix? |
| b3 | Triaging Bugs (5.3) | Is the problem worth fixing? |
| r1 | Reproducing a Failure (5.4) | What does the failure look like? |
| r2 | Reproducing a Failure (5.4) | In what situations does this failure occur? |
| u1 | Understanding Execution Behavior (5.5) | What code could have caused this behavior? |
| u2 | Understanding Execution Behavior (5.5) | What's statically related to this code? |
| u3 | Understanding Execution Behavior (5.5) | What code caused this program state? |
| d1 | Reasoning about Design (5.6) | What is the purpose of this code? |
| d2 | Reasoning about Design (5.6) | What is the program supposed to do? |
| d3 | Reasoning about Design (5.6) | Why was this code implemented this way? |
| d4 | Reasoning about Design (5.6) | What are the implications of this change? |
| a1 | Maintaining Awareness (5.7) | How have resources I depend on changed? |
| a2 | Maintaining Awareness (5.7) | What have my coworkers been doing? |
| a3 | Maintaining Awareness (5.7) | What information was relevant to my task? |

3 + 3 + 3 + 2 + 3 + 4 + 3 = 21.

Code-label warning: the paper's own Figure 4 repeats two labels (it shows c3 twice and b2 twice). Use the codes above, which follow Section 5 and Figure 3, and do not cite Figure 4's per-code counts.

## Extra codes (mine, not Ko et al.'s: say so in the report)

Ko et al. studied developers. Producers may ask things none of the 21 types cover, and that gap is itself a finding.

| Code | Use for |
|---|---|
| `none` | The segment is not an information need (reading aloud, a comment on layout, a pause filler) |
| `other` | A genuine information need that fits none of the 21 types. Write what it is in `quote_note` |
| `unclear` | Cannot tell from the note. Counts against agreement honestly; do not guess |

## How to code

1. Unit of analysis: one utterance that states or implies one thing the reader wants to know or says the page leaves out. Split an utterance carrying two needs into two rows (the tool allows one code per row). Give the new row its own segment_id (for example S05 and S05b). Every segment_id must be unique across the whole sheet.
2. Code the question behind the words, not the words. "Who did the airlock work?" is a2 (what have my coworkers been doing?). "Why did they change the airlocks?" is d3.
3. When two types fit, pick the one nearer the reader's purpose (drafting a stand-up update) and write the other in `resolution_rule` only if it was a close call.
4. Keep a running memo of every rule you invent ("name of person asked for = a2") in the section below. Apply it to all readers.
5. Never code a segment from a reader's tone. Verbatim note first, code second.
6. Use the type codes in lower case in the CSV (`a2`, `d3`).

## Procedure

| Step | When | Do | File |
|---|---|---|---|
| 1. Capture | During or right after each session | One row per utterance, timestamp from the notes, which report was open (A or B), quote as noted | `think-aloud-coding-sheet.csv` |
| 2. Pass 1 | Separate sitting, after sessions | Fill `pass1_code` and `pass1_date` for every row (pilot rows may be coded for practice but are excluded from analysis) | same |
| 3. Wait | At least 7 days | Do something else. Note the date in the diary. A3 is due 8 Nov, so finish pass 1 by Fri 30 Oct (catch-up plan in `README.md`) | |
| 4. Draw | After the wait | `node deliverable-5/recode-sample.js draw --in deliverable-5/think-aloud-coding-sheet.csv --out deliverable-5/recode-blind.csv`. It picks a seeded random quarter (rounded up) of the pass-1 rows, pilot excluded, and writes them without the pass-1 codes. Write the printed seed and count in your diary | `recode-blind.csv` |
| 5. Pass 2 | Same day as the draw | Code the blind file from the quote_note alone, without opening the main sheet | `recode-blind.csv` |
| 6. Merge | After pass 2 | `node deliverable-5/recode-sample.js merge --in deliverable-5/think-aloud-coding-sheet.csv --blind deliverable-5/recode-blind.csv --out deliverable-5/think-aloud-coding-sheet.csv`. Pass-1 codes are not changed. The old sheet is kept as `think-aloud-coding-sheet.csv.bak`, and nothing is written if a row or pass-1 code would change | main sheet |
| 7. Agreement | After merge | `node deliverable-6/analysis/analyse.js --codes deliverable-5/think-aloud-coding-sheet.csv` (the tool reads the wide layout). Report agreement as a raw count and kappa, with the sample size | analysis output |
| 8. Resolve | After agreement is recorded | For each disagreement, re-read the quote, choose `final_code`, and write the rule in `resolution_rule`. Never overwrite pass 1 or pass 2 | main sheet |

Report: "n of m re-coded segments matched (kappa x)". With a quarter of a few dozen segments the sample is small, so state that limit.

## Rules memo (fill as you go)

| Date | Rule | Example segment |
|---|---|---|
| | | |

## Sheet columns

`segment_id, participant, timestamp, report_condition, quote_note, pass1_code, pass1_date, pass2_code, pass2_date, final_code, resolution_rule`. The file `think-aloud-coding-sheet.csv` has the header only.
