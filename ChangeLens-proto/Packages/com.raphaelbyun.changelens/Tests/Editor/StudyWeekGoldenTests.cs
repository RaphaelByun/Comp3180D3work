// StudyWeekGoldenTests.cs
// ---------------------------------------------------------------------------
// Pins the pages readers see. Each frozen week under study/ (two study weeks,
// two reserves) is rebuilt from its own export folder with the current code
// and compared with the committed files: both reports, both fidelity
// checklists and the naming measures. A code change that alters a committed
// page fails here instead of passing silently.
//
// The study weeks keep their scored fidelity checklists, which carry the
// older "git show <hash>" line, so that one line is not compared for them.
//
// The February study week is frozen as scored, before two repairs (17 Oct
// 2026): pepperspray's script swap and Wet Floor Sign counted once. The
// current code differs from it in exactly those rows, listed in FebruaryRepairs.
// Its Version B checklist is not compared, because removing one asset
// renumbers its rows.
//
// The tests are Inconclusive when the study folder cannot be found.
// ---------------------------------------------------------------------------

using System.Collections.Generic;
using System.IO;
using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    public class StudyWeekGoldenTests
    {
        private const string Feb = "week1-2021-02-08";

        private static readonly string[] Weeks =
        {
            Feb, "week2-2021-07-19", "reserve/2020-12-14", "reserve/2021-09-27"
        };

        /// <summary>
        /// What the current code writes differently from the frozen February page:
        /// (file, frozen text, current text). Each pair is one repair.
        /// </summary>
        private static readonly string[][] FebruaryRepairs =
        {
            new[]
            {
                "report-B-treatment.md",
                "26 scenes and prefabs changed.",
                "25 scenes and prefabs changed."
            },
            new[]
            {
                "report-B-treatment.md",
                "- \"Make floor sign openable/closeable  (#609)\": new prefab added.\n",
                "- \"Make floor sign openable/closeable  (#609)\": moved from `Assets/Content/Items/Functional/Tools/Custodial` and rebuilt.\n"
            },
            new[]
            {
                "report-B-treatment.md",
                "**Wet Floor Sign** (prefab, in `Assets/Content/Items/Functional/Tools/Custodial`)\n" +
                "- \"Make floor sign openable/closeable  (#609)\": prefab deleted.\n" +
                "  - objects named in the change: Attachment\n\n",
                ""
            },
            new[]
            {
                "report-B-treatment.md",
                "added Audio Source; removed ItemExaminable script;",
                "added Audio Source, PepperSpray script; removed Item script, ItemExaminable script;"
            },
            new[] { "naming.md", "(strict, A2 measure): 21 of 26", "(strict, A2 measure): 20 of 25" },
            new[] { "naming.md", "(object, component or add/delete): 26 of 26", "(object, component or add/delete): 25 of 25" },
            new[] { "naming.md", "other than the asset itself: 7 of 26", "other than the asset itself: 6 of 25" }
        };

        /// <summary>The repository's study/ folder, found by walking up from the test and working folders.</summary>
        private static string StudyFolder()
        {
            foreach (string start in new[] { TestContext.CurrentContext.TestDirectory, Directory.GetCurrentDirectory() })
            {
                string dir = start;
                while (!string.IsNullOrEmpty(dir))
                {
                    string candidate = Path.Combine(dir, "study");
                    if (Directory.Exists(Path.Combine(candidate, Feb, "export"))) return candidate;
                    dir = Path.GetDirectoryName(dir);
                }
            }
            return null;
        }

        private static string Read(string path)
        {
            return File.ReadAllText(path).Replace("\r\n", "\n");
        }

        /// <summary>Drops the checklist's instruction line (line 3), which the study weeks keep in its older form.</summary>
        private static string WithoutInstruction(string checklist)
        {
            string[] lines = checklist.Split('\n');
            if (lines.Length > 2) lines[2] = "";
            return string.Join("\n", lines);
        }

        [Test]
        public void EveryFrozenWeek_RebuildsToItsCommittedFiles()
        {
            string study = StudyFolder();
            if (study == null) Assert.Inconclusive("study/ folder not found");

            foreach (string week in Weeks)
            {
                string folder = Path.Combine(study, week);
                WeekExport export = WeekExport.FromFolder(Path.Combine(folder, "export"));
                string firstLine = Read(Path.Combine(folder, "report-A-baseline.md")).Split('\n')[0];
                string title = firstLine.Substring("# What changed: ".Length);

                ProducerReport a = export.BuildReport(ReportCondition.Baseline, title);
                ProducerReport b = export.BuildReport(ReportCondition.Treatment, title);
                var rebuilt = new Dictionary<string, string>
                {
                    { "report-A-baseline.md", a.ToMarkdown() },
                    { "report-B-treatment.md", b.ToMarkdown() },
                    { "fidelity-A.md", a.FidelityChecklistMarkdown() },
                    { "fidelity-B.md", b.FidelityChecklistMarkdown() },
                    { "naming.md", StudyExport.NamingSummary(b) }
                };

                foreach (KeyValuePair<string, string> file in rebuilt)
                {
                    if (week == Feb && file.Key == "fidelity-B.md") continue;
                    string committed = Read(Path.Combine(folder, file.Key));
                    string current = file.Value.Replace("\r\n", "\n");
                    if (week == Feb)
                    {
                        foreach (string[] repair in FebruaryRepairs)
                        {
                            if (repair[0] != file.Key) continue;
                            StringAssert.Contains(repair[1], committed, "frozen February " + file.Key + " no longer has: " + repair[1]);
                            committed = committed.Replace(repair[1], repair[2]);
                        }
                    }
                    if (file.Key.StartsWith("fidelity", System.StringComparison.Ordinal) && !week.StartsWith("reserve", System.StringComparison.Ordinal))
                    {
                        committed = WithoutInstruction(committed);
                        current = WithoutInstruction(current);
                    }
                    Assert.AreEqual(committed, current, week + "/" + file.Key + " no longer rebuilds from its export");
                }
            }
        }
    }
}
