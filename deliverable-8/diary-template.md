# Development diary: format and template

**Purpose.** A2 success measure for Deliverable 8: "A dated entry each week naming a roadblock or breakthrough." The A3 report then summarises it in about 500 words (one paragraph up to Week 8, then a few lines for the mid-session break and each of Weeks 9 to 13, noting deliverables added, dropped or changed). The diary also carries the R&D Engagement criterion (15% of A3): staff read it with the commit history and prac attendance. Lecture 4: the diary may be in any format.

**Rules that keep it honest and marked well**

1. Write each entry in your own words, on the week it describes. Date it with the day you actually wrote it. If you write late, say so ("written 20 Oct about Week 9"); never back-date.
2. One roadblock or breakthrough per week, named in the heading, with what you did about it. A week with neither is rare; if so, name the nearest thing (a decision, a surprise).
3. Facts first (what happened, with a link), then what you made of it, then what you will do next. Keep each entry to about 150 to 250 words.
4. Hours by deliverable come from `hours-log.csv`, not memory.
5. Evidence links point to things in the repo or to a dated screenshot: commit hashes, files, tracker rows, photos of paper sheets (codes only).
6. Say what the AI tools did and what you did. Staff want clear individual contribution; the GenAI statement has to match.
7. Note prac attendance and who you talked to. That is engagement evidence staff can check.
8. Do not paste raw entries into the report. The report summary is edited down to concrete achievements and roadblocks.

## Entry template (copy for each week)

```
## Week N (dd Mon to dd Mon 2026)   |   Entry written: dd Mon 2026

**Roadblock or breakthrough:** [name it in one line]

**What happened** (facts, with dates):
-

**What I made of it / what I decided:**
-

**Hours this week by deliverable** (from hours-log.csv; in-prac in brackets):
| D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | Total |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |       |

**Prac:** attended Y/N. Who I spoke to and what they said:

**Plan changes** (added, dropped or changed a deliverable, tier or scope, and why):
-

**Tools used** (including AI: what it did, what I did, where the transcript or commit is):
-

**Evidence links:**
-

**Next week:**
-
```

## Entries (write these yourself; each stays empty until you write it)

### Up to Week 8 (to A2 submission, 20 Sep 2026)

One short summary for the report. Source material: `fact-log-weeks-1-8.md` (start here), A2 Appendix D, `GENAI-EVIDENCE.md`, `REPORT.md`.

### Mid-session break (21 Sep to 4 Oct 2026)

### Week 9 (5 to 11 Oct 2026)

### Week 10 (12 to 18 Oct 2026)

Include a dated entry for 17 Oct on the evaluation decision (no study with other people; you evaluate ChangeLens yourself). Source material: `fact-log-weeks-9-10.md` section 4, where your reasons from that day are quoted.

### Week 11 (19 to 25 Oct 2026)

The solo evaluation runs this week (`deliverable-5/self-evaluation-plan.md`). Write the Create entry `[goal evidence]` on the same day as an SE2 first read of a reserve week, straight after it, never before.

### Week 12 (26 Oct to 1 Nov 2026)

### Week 13 (2 to 8 Nov 2026)

## Weekly routine (10 minutes)

1. Open `hours-log.csv` and `hours-entries.csv`; make sure the week's hours are entered.
2. Skim `git log --all --format='%h %ad %an %s' --date=short` for the week.
3. Write the entry from the template.
4. Commit it the same day so the history shows the cadence.

## From diary to report (Week 13)

For each week keep: the roadblock or breakthrough, one concrete achievement, any plan change. Cut everything else. Target about 80 words per week (five weeks, about 400) and about 100 for the break and "up to Week 8" together, to land near 500 words. Cross-check with the hour variances in `deliverable-9/` so the story is the same in both places.
