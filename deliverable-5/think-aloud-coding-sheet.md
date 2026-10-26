# Think-aloud coding: codebook and procedure

**Solo use (17 Oct 2026 decision).** There are no think-aloud sessions with other people. Raphael evaluates ChangeLens himself (`self-evaluation-plan.md`). This codebook now codes the **SE2 needs log**: the typed notes Raphael writes during each reserve-week read, one line per thing the page left him needing (plan section 3, SE2 step 5). The log is `deliverable-6/data/se2-needs-log.csv` with this file's columns unchanged. `participant` = `SELF`, and `report_condition` = the SE2 `read_id` (`RX-A1`, `RX-B2`, `RY-B1`, `RY-A2`). The file name is kept because the plan and the A2 record name it. The notes are typed, not spoken; say so in the report.

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

Ko et al. studied developers. A producer's needs may fit none of the 21 types, and that gap is itself a finding.

| Code | Use for |
|---|---|
| `none` | The segment is not an information need (reading aloud, a comment on layout, a pause filler) |
| `other` | A genuine information need that fits none of the 21 types. Write what it is in `quote_note` |
| `unclear` | Cannot tell from the note. Counts against agreement honestly; do not guess |

## How to code

1. Unit of analysis: one needs-log line that states one thing you wanted to know and the page did not give. Split a line carrying two needs into two rows (the tool allows one code per row). Give the new row its own segment_id (for example S05 and S05b). Every segment_id must be unique across the whole sheet.
2. Code the question behind the words, not the words. "Who did the airlock work?" is a2 (what have my coworkers been doing?). "Why did they change the airlocks?" is d3.
3. When two types fit, pick the one nearer the purpose of the read (answering the ten needs and drafting a stand-up update) and write the other in `resolution_rule` only if it was a close call.
4. Keep a running memo of every rule you invent ("name of person asked for = a2") in the section below. Apply it to every line, in both weeks.
5. Code the line as written, not what you remember meaning. Note first, code second.
6. Use the type codes in lower case in the CSV (`a2`, `d3`).

## Procedure

| Step | When | Do | File |
|---|---|---|---|
| 1. Capture | During each SE2 read (Tue 27 Oct) | One row per need, clock time, `read_id` in `report_condition`, the note as typed. Commit with the answers, before the git log is opened | `deliverable-6/data/se2-needs-log.csv` |
| 2. Pass 1 | Wed 28 Oct, a separate sitting after both weeks are read | Fill `pass1_code` and `pass1_date` for every row | same |
| 3. Wait | At least 7 days | Do something else. Note the date in the diary | |
| 4. Draw | [date per Raphael's decision, at least 7 days after pass 1] | `node deliverable-5/recode-sample.js draw --in deliverable-6/data/se2-needs-log.csv --out deliverable-6/data/recode-blind.csv`. It picks a seeded random quarter (rounded up) of the pass-1 rows and writes them without the pass-1 codes. `SELF` rows are kept. Write the printed seed and count in your diary | `recode-blind.csv` |
| 5. Pass 2 | Same day as the draw | Code the blind file from the `quote_note` alone, without opening the main sheet | `recode-blind.csv` |
| 6. Merge | After pass 2 | `node deliverable-5/recode-sample.js merge --in deliverable-6/data/se2-needs-log.csv --blind deliverable-6/data/recode-blind.csv --out deliverable-6/data/se2-needs-log.csv`. Pass-1 codes are not changed. The old sheet is kept as `se2-needs-log.csv.bak`, and nothing is written if a row or pass-1 code would change | main sheet |
| 7. Agreement | After merge | `node deliverable-5/recode-sample.js agree --in deliverable-6/data/se2-needs-log.csv`. It prints "x of n re-coded segments matched" and the ids that differ. Raw count only, no kappa (plan section 6, Table G) | console output; copy it into the diary |
| 8. Resolve | After agreement is recorded | For each disagreement, re-read the quote, choose `final_code`, and write the rule in `resolution_rule`. Never overwrite pass 1 or pass 2 | main sheet |

Report: "x of n re-coded segments matched", one coder against himself a week later. With a handful of re-coded lines and 24 code options, a kappa would mean nothing, so do not give one. Do not add a limits sentence to the report; the design is stated once, in its Evaluation Method.

Run the commands from a checkout that has both `deliverable-5/` and `deliverable-6/data/` (the D5 and D6 branches side by side or merged).

## Rules memo (fill as you go)

| Date | Rule | Example segment |
|---|---|---|
| | | |

## Sheet columns

`segment_id, participant, timestamp, report_condition, quote_note, pass1_code, pass1_date, pass2_code, pass2_date, final_code, resolution_rule`. The file `think-aloud-coding-sheet.csv` has the header only; `solo/logs/se2-needs-log.csv` is the same header under the SE2 name.
