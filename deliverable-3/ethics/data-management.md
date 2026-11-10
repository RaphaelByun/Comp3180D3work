# Data management plan: COMP3180 A3 user study

Draft, 14 Oct 2026. Every date and location marked [CONFIRM] is a proposal for Raphael and the approving body to settle. Macquarie policy: collection, storage, retention and disposal must follow the approved application (Human Research Ethics Policy cl 18-19, https://policies.mq.edu.au/document/view.php?id=206, retrieved 14 Oct 2026). The National Statement treats identifiability as a continuum: a coded dataset can be re-identified if the key is unlocked or data are linked (2023 edition, Ch 3.1 Element 4; https://www.swslhd.health.nsw.gov.au/Ethics/content/pdf/National-Statement-Ethical-Conduct-Human-Research-2023.pdf, retrieved 14 Oct 2026). Macquarie's Research Data Management Policy also applies; I did not read it. [CONFIRM required retention period for student research from that policy or the Secretariat]

## 1. What is collected

| Item | Identifying? | Notes |
|---|---|---|
| Consent form (name, signature or tick, date, contact for withdrawal) | Yes | Needed to prove consent and to allow withdrawal. |
| Code key (participant code to name and contact) | Yes | Separate file. |
| Participant code (P00 pilot, P01 ... P08) | No on its own | Not based on names, initials or student IDs. |
| Role label (COMP3151 producer or proxy), session date | Low | Report only as aggregated counts. [CONFIRM: do not record year level or team] |
| Comprehension answers (six items per report, scored) | Coded | Linked to code only. |
| Ten-need sheet classifications | Coded | Linked to code only. |
| Think-aloud notes (timestamped, six readers) | Coded; may contain slips with names | See de-identification below. |
| Audio | Yes | Only if the reader opts in. Default none. [CONFIRM: drop audio entirely?] |
| Researcher's marking and coding (scores, kappa, coded information types) | Coded | Analysis files. |
| Generated reports | Not about participants | Contain public SS3D contributor usernames; pseudonymised in study copies. |

Not collected: student IDs beyond the consent form, grades, email content, health data, location, device data.

## 2. De-identification steps
1. At sign-up, the sign-up list holds name and contact only. It is not shared. Sessions are booked by Raphael alone.
2. At the session, assign the next code (P01...) and write it on the answer sheet and the notes page. Never write the name on these.
3. Record the name-to-code link only in the code key, which sits apart from the data (separate folder, separate password or encryption).
4. Notes: shorthand, timestamps, no verbatim quotes unless short and non-identifying. If a reader names a person, write "[name]" or a role ("a teammate"). Remove any name that slipped in the same day.
5. Scoring and coding use the code only.
6. Reporting: aggregate and per-code figures only; no quotes that reveal role, team, unusual detail or prac; small numbers (n up to 9) mean even the code-to-person link can be guessed by classmates, so do not publish a table that lets a reader work out who scored what from the session timetable. Do not publish session dates or times.
7. Public-repo contributor names in reports: replace real names, emails and avatars with pseudonyms or "a contributor" in study copies and appendices.
8. After the withdrawal date, the code key is the only link; delete it at the destruction date below (this makes the retained data de-identified, as far as is practicable; classmates may still guess).

## 3. Storage and security
- Location: [CONFIRM: a university-managed OneDrive folder or other storage the approving body accepts; not a personal cloud, a group repo, or messaging apps]. Raphael's working device must be password-protected and encrypted [CONFIRM].
- Three separate places inside it: (a) consent forms and code key; (b) coded data (answers, sheets, notes); (c) analysis outputs.
- Paper (answer sheets, signed forms if on paper): scanned the same day, paper destroyed after verification, or kept in a locked place until then [CONFIRM].
- Audio (if any): on one device only, copied nowhere; transcribed by [CONFIRM date], then deleted.
- No participant data in the project's GitHub repo, the video, the report appendices or any AI tool [CONFIRM: if an AI assistant is used to help analyse notes, it sees coded, name-free text only, and only if the approval allows it].
- Breach: report to the convenor and the Secretariat per the policy [CONFIRM contact].

## 4. Who can see what

| Data | Raphael | Convenor | Markers | Other participants / teammates | Public |
|---|---|---|---|---|---|
| Consent forms, code key | Yes | Only if audited [CONFIRM] | No | No | No |
| Coded data and notes | Yes | On request [CONFIRM] | No (report only) | No | No |
| Aggregate results | Yes | Yes | Yes | Yes | Yes (in report/video) |

## 5. Retention and destruction (proposed)

| Item | Proposed retention | Proposed destruction |
|---|---|---|
| Sign-up list | Until sessions are booked | Delete by end of Week 12 [CONFIRM] |
| Audio (if any) | Until transcribed | Delete within 7 days of session, and by 1 Nov 2026 [CONFIRM] |
| Code key | Until withdrawal date has passed and marks are released | Delete by [CONFIRM: e.g. 14 days after the assessment result is released, or Dec 2026] |
| Consent forms | Per Macquarie requirement for consent records [CONFIRM] | [CONFIRM] |
| Coded data, notes, analysis files | Until the unit result is final, plus time to answer review queries | Delete or keep as de-identified aggregate only; [CONFIRM: e.g. end of Feb 2027] |
| Aggregate results in the submitted report | Kept as part of the assessment record | Not destroyed |

Data are kept no longer than the approving body allows. If the approving body or Macquarie sets a longer minimum retention for student research data, follow that and say who holds the data (probably the convenor). [CONFIRM]

## 6. Withdrawal
- Until [CONFIRM: 7 days after the session]: delete everything for that code, including the key entry, and exclude from analysis.
- After that date: data cannot be separated and stay in aggregates; the participant is told this in the information sheet.

## 7. Sharing and re-use
- No sharing of identifiable or coded raw data.
- Re-use: none planned beyond this assessment [CONFIRM].
- If the project is published later, new approval may be needed [CONFIRM with convenor].
