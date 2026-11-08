// ChangeLensGitTests.cs
// ---------------------------------------------------------------------------
// EditMode tests for the date bounds handed to git. A bare date has to be
// pinned to midnight UTC, or git fills in the current time of day in the
// machine's time zone and the same study week exports a different set of
// commits depending on when and where it is run.
// ---------------------------------------------------------------------------

using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    public class ChangeLensGitTests
    {
        [Test]
        public void DateOnlyBound_IsPinnedToMidnightUtc()
        {
            Assert.AreEqual("2021-07-19T00:00:00+0000", WeekExport.DateBound("2021-07-19"));
            Assert.AreEqual("2021-07-26T00:00:00+0000", WeekExport.DateBound(" 2021-07-26 "));
        }

        [Test]
        public void BoundWithATime_IsLeftAlone()
        {
            Assert.AreEqual("2021-07-19T12:30:00", WeekExport.DateBound("2021-07-19T12:30:00"));
            Assert.AreEqual("2021-07-19T00:00:00Z", WeekExport.DateBound("2021-07-19T00:00:00Z"));
        }

        // Git's --until includes a commit at exactly that second, so a commit at
        // midnight on the boundary was reported in two weeks.
        [Test]
        public void DateOnlyUntil_StopsOneSecondBeforeMidnightUtc()
        {
            Assert.AreEqual("2021-07-25T23:59:59+0000", WeekExport.UntilBound("2021-07-26"));
            Assert.AreEqual("2021-02-28T23:59:59+0000", WeekExport.UntilBound("2021-03-01"));
            Assert.AreEqual("2021-07-26T12:00:00", WeekExport.UntilBound("2021-07-26T12:00:00"));
            Assert.AreEqual("", WeekExport.UntilBound(null));
        }

        [Test]
        public void WeekEnd_IsGregorianWhateverTheCulture()
        {
            var saved = System.Threading.Thread.CurrentThread.CurrentCulture;
            try
            {
                foreach (string name in new[] { "th-TH", "fa-IR", "ar-SA", "en-AU" })
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(name);
                    Assert.AreEqual("2021-07-26", WeekExport.WeekEnd(new System.DateTime(2021, 7, 19), 7), name);
                }
            }
            finally
            {
                System.Threading.Thread.CurrentThread.CurrentCulture = saved;
            }
        }

        // Branch work is reported in the week it reached the main line.
        [Test]
        public void ExportWalksTheMainLineAndShowsMerges()
        {
            string log = WeekExport.LogArgs("2021-07-19", "2021-07-26");
            string patch = WeekExport.PatchArgs("2021-07-19", "2021-07-26");
            foreach (string args in new[] { log, patch })
            {
                StringAssert.Contains("--first-parent --diff-merges=first-parent", args);
                StringAssert.DoesNotContain("--no-merges", args);
                StringAssert.Contains("--since=2021-07-19T00:00:00+0000 --until=2021-07-25T23:59:59+0000", args);
            }
            StringAssert.Contains("--name-status", log);
            StringAssert.EndsWith("-- \"*.prefab\" \"*.unity\"", patch);
        }

        [Test]
        public void NonDateBound_IsPassedThroughForGitToRead()
        {
            Assert.AreEqual("2.weeks.ago", WeekExport.DateBound("2.weeks.ago"));
            Assert.AreEqual("", WeekExport.DateBound(null));
        }

        // Unity runs in ChangeLens-proto, and study/ sits one level up, so the
        // hinted "study/week2-2021-07-19" has to be found from the parent too.
        [Test]
        public void StudyFolder_TypedRelativePath_IsFoundFromTheRepositoryRoot()
        {
            string root = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "cl-study-" + System.Guid.NewGuid().ToString("N"));
            string project = System.IO.Path.Combine(root, "ChangeLens-proto");
            string week = System.IO.Path.Combine(root, "study", "week2-2021-07-19");
            try
            {
                System.IO.Directory.CreateDirectory(project);
                System.IO.Directory.CreateDirectory(System.IO.Path.Combine(week, "export"));
                System.IO.File.WriteAllText(System.IO.Path.Combine(week, "export", WeekExport.LogFile), "");

                string full = System.IO.Path.GetFullPath(week);
                Assert.AreEqual(full, WeekExport.FindStudyFolder("study/week2-2021-07-19", project));
                Assert.AreEqual(full, WeekExport.FindStudyFolder("study/week2-2021-07-19", root));
                Assert.AreEqual(week, WeekExport.FindStudyFolder(week, project));
                Assert.IsNull(WeekExport.FindStudyFolder("study/week9", project));
                Assert.IsNull(WeekExport.FindStudyFolder(" ", project));
            }
            finally
            {
                if (System.IO.Directory.Exists(root)) System.IO.Directory.Delete(root, true);
            }
        }

        // Evaluation fix, 8 Nov 2026 (SE4 CL-05/06): ask before replacing a saved
        // week, and save one shareable page with no git export.

        [Test]
        public void ExistingStudyFiles_ListsOnlyWhatWouldBeReplaced()
        {
            string root = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "cl-save-" + System.Guid.NewGuid().ToString("N"));
            try
            {
                Assert.IsEmpty(StudyExport.ExistingStudyFiles(root), "missing folder");
                System.IO.Directory.CreateDirectory(root);
                System.IO.File.WriteAllText(System.IO.Path.Combine(root, "notes.txt"), "mine");
                Assert.IsEmpty(StudyExport.ExistingStudyFiles(root), "unrelated file");
                System.IO.File.WriteAllText(System.IO.Path.Combine(root, "report-B-treatment.md"), "x");
                System.IO.Directory.CreateDirectory(System.IO.Path.Combine(root, "export"));
                CollectionAssert.AreEqual(new[] { "export", "report-B-treatment.md" }, StudyExport.ExistingStudyFiles(root));
                Assert.IsEmpty(StudyExport.ExistingStudyFiles(null));
            }
            finally
            {
                if (System.IO.Directory.Exists(root)) System.IO.Directory.Delete(root, true);
            }
        }

        [Test]
        public void DefaultPageFileName_NamesTheVersionAndDropsUnsafeCharacters()
        {
            Assert.AreEqual("week 2021-07-19 (version B).md",
                StudyExport.DefaultPageFileName("week 2021-07-19", ReportCondition.Treatment));
            Assert.AreEqual("a-b-c (version A).md", StudyExport.DefaultPageFileName("a/b:c", ReportCondition.Baseline));
            Assert.AreEqual("What changed (version A).md", StudyExport.DefaultPageFileName("  ", ReportCondition.Baseline));
        }

        [Test]
        public void WritePage_WritesOnlyThePageOnScreen()
        {
            string study = null;
            foreach (string start in new[] { TestContext.CurrentContext.TestDirectory, System.IO.Directory.GetCurrentDirectory() })
            {
                for (string dir = start; !string.IsNullOrEmpty(dir) && study == null; dir = System.IO.Path.GetDirectoryName(dir))
                {
                    string candidate = System.IO.Path.Combine(dir, "study", "week2-2021-07-19");
                    if (System.IO.Directory.Exists(System.IO.Path.Combine(candidate, "export"))) study = candidate;
                }
            }
            if (study == null) Assert.Inconclusive("study/week2-2021-07-19 not found");

            string root = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "cl-page-" + System.Guid.NewGuid().ToString("N"));
            try
            {
                WeekExport export = WeekExport.FromFolder(System.IO.Path.Combine(study, "export"));
                string path = System.IO.Path.Combine(root, "page.md");
                Assert.AreEqual(path, StudyExport.WritePage(export, ReportCondition.Treatment, "t", path));
                Assert.AreEqual(export.BuildReport(ReportCondition.Treatment, "t").ToMarkdown(), System.IO.File.ReadAllText(path));
                CollectionAssert.AreEqual(new[] { path }, System.IO.Directory.GetFileSystemEntries(root), "one file, no export folder");
                StringAssert.DoesNotContain("@", System.IO.File.ReadAllText(path), "no e-mail addresses");
            }
            finally
            {
                if (System.IO.Directory.Exists(root)) System.IO.Directory.Delete(root, true);
            }
        }
    }
}
