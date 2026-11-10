# Ethics points for the A3 report

Prepared 17 Oct 2026. These are prompts, not report text: write the report lines in your own words.

**Decision (Raphael, 17 Oct 2026).** No ethics application and no email to the convenor. The COMP3180 unit guide sets no ethics requirement, and the Final Project asks for an evaluation of the main deliverable with its target audience, so testing with classmates is how the unit is run. Ethics is still dealt with: the report says what ethical issues the project raises and how each is managed. The 14 Oct research in this folder (`README.md`, `risk-assessment.md`, `application-draft.md`, `data-management.md`) is background you can draw on.

**Where it goes.** The report template has no ethics section. Suggested placement:
- Evaluation, Method (one or two sentences): points 1 and 2.
- Industry Relevance and Future Work: point 3.
- GenAI statement: point 5.
- Anything longer: an appendix (not counted in the 2500 words).

## 1. Testing with classmates

- **Issue.** Readers are classmates, some of them teammates. They may find it hard to say no, or try to give the "right" answers to help the researcher.
- **How it is managed.** A general call-out, not personal asks (`deliverable-5/recruitment-message.md`). Voluntary, with withdrawal at any time and data removal until the date on the information sheet. Nobody is told who took part or who declined. Readers are told the tool is being tested, not them (`participant-info-and-consent.md`).
- **Background.** `risk-assessment.md` R1 (peer pressure) and R8 (you designed the tool and run the sessions, so you may want it to look good; managed by a fixed answer key written before sessions, counterbalancing, reporting every participant, and a second scorer).

## 2. Participant data

- **Issue.** Answer sheets and think-aloud notes could identify a reader.
- **How it is managed.** Codes (R01, R02, ...) on every sheet. The name-to-code list is kept apart from the data and outside the repo. Written notes only, no audio or video. Only data the analysis uses is collected. Quotes are reported by code.
- **Background.** `data-management.md`; `risk-assessment.md` R10.

## 3. What the tool could be used for

- **Issue.** ChangeLens summarises what changed in a team's project each week. A producer tool like this could be used to monitor or blame developers rather than to understand the work, which links to Whitson (2018) on opacity and blame placed on the tool.
- **How it is managed.** The report describes changes to the project, not each person's output or productivity. State this as a design principle and a limit for future work (for example, no per-person counts or rankings).

## 4. Accurate reporting of real people's work

- **Issue.** SS3D is a real open-source project. A wrong summary misrepresents real contributors' work.
- **How it is managed.** The fidelity check: every report claim is scored against the commit diffs. Version B failed on contradicted claims in the February week, the tool was repaired, and it then passed (`deliverable-4-fidelity-check` branch, `study/week1-2021-02-08/FIDELITY-RESULT.md`). A good concrete example of catching and fixing a fault.
- **Open.** Check SS3D's licence (github.com/RE-SS3D/SS3D) allows this use and state it. The local clone has no licence file at the repository root, only licences for bundled third-party code, so check the GitHub page.

## 5. AI use

- **Issue.** AI scored the fidelity checks and drafted analysis and instruments.
- **How it is managed.** Hand-check the AI scoring (D4 to-do) and disclose all AI use in the Statement on Generative AI use.
