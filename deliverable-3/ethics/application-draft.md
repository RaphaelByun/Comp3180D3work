# Draft ethics application: COMP3180 A3 user study

Draft, 14 Oct 2026. Written from the plan of record (A2, "Study design"). The Macquarie FoRA form fields are not on disk and the Macquarie pages were blocked to me, so the headings below follow what low-risk applications usually ask, not the actual form. Map them onto the form once you have it. Every [CONFIRM] must be answered by Raphael. Policy requirement: substantial AI help in an application must be disclosed (Macquarie Human Research Ethics Policy cl 13-15, https://policies.mq.edu.au/document/view.php?id=206, retrieved 14 Oct 2026). **Disclosure: this draft was prepared with an AI assistant (Claude); Raphael must check every answer.** [CONFIRM]

## 1. Project details
- Title: Does naming the changed scenes and prefabs help a reader understand a game-development week? A small within-subjects study of generated change reports. [CONFIRM title]
- Context: COMP3180 Virtual Reality and Advanced Game Development, Macquarie University, 2026 Session 2, Assessment 3 (final project, due 8 Nov 2026).
- Chief Investigator: [CONFIRM: COMP3180 convenor, name and staff ID, if the convenor agrees to sponsor].
- Co-Investigator (student): Raphael Byun, [CONFIRM student ID].
- Ethics training completed: [CONFIRM module and date; required before submission].
- Proposed start and end: pilot from 19 Oct 2026, sessions Week 12, analysis to 8 Nov 2026 [CONFIRM dates move if approval is late].
- Risk level proposed: low (discomfort only). Pathway sought: [CONFIRM: unit-level approval / low-risk review / exemption, per convenor].

## 2. Aims and background
- Aim: test whether a generated report that names the changed Unity scenes and prefabs (treatment) helps a reader understand what changed in a game-development week better than one that does not (baseline).
- Sub-question 1: for ten needs surfaced in the earlier tool study (Deliverable 1), which artefact (tracker, repository or Unity asset layer) could supply each? Readers classify the same ten needs on a one-page sheet; I report agreement with my own marking.
- Sub-question 2: does naming scenes and prefabs improve comprehension of the week?
- Why it matters: producers and teammates read weekly summaries to decide what to do next. The study gives early evidence on one design choice.
- Scope: eight readers cannot show statistical significance; the study shows direction and failure points only.

## 3. Method
- Design: within-subjects. Each reader reads two generated reports for different SS3D weeks, one treatment, one baseline. Week and order are counterbalanced.
- Materials: reports generated from the public SS3D GitHub history (an open-source game, MIT-style licence) [CONFIRM licence name from the repo]; six comprehension items per report (Appendix B), scored against fixed answers, one item per report unanswerable from the page; a one-page ten-need sheet; a short think-aloud task (draft a two-minute stand-up update from the report alone).
- Session (45 minutes): 5 min briefing and consent; 12 min per report for two reports; 6 min for the ten-need sheet; 10 min think-aloud (six readers only).
- Pilot: one pilot participant first; excluded from the data.
- Data recorded: item answers, sheet classifications, timestamped researcher notes of think-aloud comments. No audio unless the reader agrees on a separate opt-in. [CONFIRM audio: yes/no at all?]
- Analysis: per-reader treatment-minus-baseline difference over five scored items; agreement percentage and Cohen's kappa for the sheet; think-aloud comments coded against Ko et al.'s (2007) 21 information types, with a quarter re-coded after a week.
- Fidelity check before any session: every claim in both weeks' reports is checked by hand against each commit's diff. Passes when none is contradicted and 90% are supported.
- Deception: one item per report cannot be answered from the page; readers are told this in the briefing, but not which one. [CONFIRM wording]

## 4. Participants
- Who: up to eight adults (18+) plus one pilot. COMP3151 students acting as producers, or teammates briefed as proxies (given a one-page scenario). [CONFIRM whether proxies are limited to COMP3151 or may include COMP3180 students; the plan says recruitment at both pracs.]
- Minimum for the study to be useful: five readers in total (the floor).
- Inclusion: enrolled Macquarie student, 18 or over, comfortable reading English technical text, able to attend a 45-minute session.
- Exclusion: anyone under 18; anyone who worked on the SS3D weeks used (so they cannot read as a naive reader) [CONFIRM]; anyone who has already seen the reports.
- Not recruited: people who are vulnerable, or in a dependent relationship with the researcher (for example a person Raphael supervises or marks). [CONFIRM: no tutors or markers].
- Payment: none. [CONFIRM: any thank-you, such as coffee?]

## 5. Recruitment
- Where and when: a short announcement at the Weeks 9-10 COMP3151 and COMP3180 pracs [CONFIRM tutor permission; CONFIRM that no recruitment happens before approval; if it has, state what was said].
- How: a general call-out with the information sheet and a sign-up form. No personal asking of teammates. Slots are booked by Week 10 [CONFIRM: timetable moves if approval is late].
- Wording: "I am running a short study about how well a written weekly summary of a game project can be understood. It takes 45 minutes, it is voluntary, it will not affect any mark, and you can stop at any time." [CONFIRM final wording and attach as recruitment text]
- Peer-recruitment safeguards: see Risk R1 in risk-assessment.md. Non-participation is not visible to teammates; no one is asked twice; tutors are not told who joined.

## 6. Consent
- Written information sheet read before the session and again briefly at the start. Signed or ticked consent form [CONFIRM: written or online tick].
- Separate opt-in for audio, if audio is offered at all.
- Content to cover: purpose; what happens; time; voluntary; no effect on marks or group standing; the researcher is a classmate; how data are stored; who sees them; the withdrawal date; use of results in an assessed report and possibly a public repo or video; the contact for questions and complaints.
- Time to decide: information sheet is given at least [CONFIRM: 24 hours] before the session where possible.
- Independent contact: convenor or Macquarie ethics contact [CONFIRM names and email] so a participant can ask someone who is not a classmate.
- Complaints: the standard Macquarie ethics complaints statement from the approved template [CONFIRM from the template: wording and contact].

## 7. Withdrawal
- Reader may stop at any time without giving a reason and without consequence.
- Withdrawal of data is possible until [CONFIRM: 7 days after the session]; after that, data are coded and cannot be separated. Withdrawing deletes the session record and the key-file entry.
- Skipping any item, or the think-aloud, is allowed.

## 8. Data management
See data-management.md for detail. Summary:
- Collected: participant code, year level/role label, item answers, sheet classifications, timestamped notes, consent form (with name), optionally audio.
- Stored: [CONFIRM: university OneDrive/approved storage] only; the code key and consent forms are kept apart from the data.
- Access: Raphael; the convenor on request [CONFIRM].
- Retention and destruction: proposed dates in data-management.md [CONFIRM].
- Sharing: only de-identified, aggregated results in the report, video and any repo. Raw notes and the key are never shared.

## 9. Risks and mitigations
Summarised from risk-assessment.md. Main items: peer pressure (R1), being tested (R4), identifiability in a small cohort (R5), names in notes (R6), public contributor names in the reports (R7), dual role (R8). Overall: low risk, discomfort and minor burden only. Mitigations are in that file.

## 10. Benefits
- To participants: no direct benefit [CONFIRM]; they see a worked example of a change report and may find the exercise interesting.
- To others: evidence about whether naming scenes and prefabs helps readers, which may help producers and developers of similar tools; the study also feeds Raphael's assessed project.
- Proportionality: burden is 45 minutes of a student's time; the benefit is small but real; risk is low.

## 11. Conflicts of interest and dual role
- Raphael designs the tool and the reports, runs the sessions, scores the answers and reports the results. He benefits from good results (assessment). [CONFIRM statement]
- Raphael is a peer of the participants and, for some, a teammate.
- Management: fixed answer key before sessions; all participants and failures reported; counterbalancing; pilot excluded; participants are not marked or graded by Raphael; supervision and review by the convenor [CONFIRM].
- No financial interest. [CONFIRM]

## 12. Use of publicly available data
- The reports use public SS3D GitHub history, which names contributors by public username. They have not consented to being part of a study.
- Handling: pseudonymise or remove contributor names in study reports and any appendix; no contact with contributors; no judgement of any individual's work; respect the licence; do not republish raw commit data. [CONFIRM whether the reviewer requires separate consideration]

## 13. Dissemination
- Assessed A3 report, and a video. Possibly a public GitHub repo for the tool (not for participant data). [CONFIRM what goes public]
- Results reported in aggregate and as per-code figures only. No quotes that could identify a person.
- A statement naming the reviewing committee and approval code goes in the report as the Macquarie Policy requires (cl 23).
- Participants may ask for a short summary of the results [CONFIRM: offered or not].

## 14. Attachments to prepare
1. Participant information and consent form (not on disk here; existing draft is on the GitHub branch) [CONFIRM align text].
2. Recruitment text and sign-up form.
3. Appendix B comprehension items, ten-need sheet, think-aloud prompt, briefing script.
4. Risk assessment (risk-assessment.md) and data management plan (data-management.md).
5. Evidence of ethics training.

## 15. Questions the application cannot answer yet
- Who is the Chief Investigator? Which committee? What are the form's exact fields? Are there fixed timelines? These depend on the convenor's reply (see README.md).
