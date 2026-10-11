// ChangeReportTests.cs
// ---------------------------------------------------------------------------
// EditMode tests for the totals. These are the numbers the window prints, so
// if one of these fails the report on screen is wrong.
//
// Worked through by hand, the shared sample log (see GitLogParserTests.cs)
// contains 7 changed-file entries:
//
//   Assets/Scripts/Game.cs                 M   Code
//   Assets/Art/hero.png                    A   Art
//   Assets/Art/hero.png.meta               A   Meta   (sibling: Art)
//   Assets/Scripts/New/Player.cs           R   Code
//   Assets/Audio/old-theme.wav             D   Audio
//   Assets/Scenes/Level1.unity             M   ScenePrefab
//   Assets/Data/balance.json               M   DataConfig
//
// So 2 of 7 entries are code => 28.6%.
// ---------------------------------------------------------------------------

using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    public class ChangeReportTests
    {
        /// <summary>Builds the report used by every test in this file.</summary>
        private static ChangeReport BuildSampleReport()
        {
            return ChangeReport.Build(GitLogParser.Parse(SampleLog.Text), "sample.txt");
        }

        [Test]
        public void Build_CountsCommitsAndFileEntries()
        {
            ChangeReport report = BuildSampleReport();

            Assert.AreEqual(2, report.CommitCount);
            Assert.AreEqual(7, report.TotalFileEntries);
        }

        [Test]
        public void Build_FindsTheDateRange()
        {
            ChangeReport report = BuildSampleReport();

            Assert.AreEqual("2025-03-04", report.FirstDate);
            Assert.AreEqual("2025-03-06", report.LastDate);
            Assert.AreEqual("2025-03-04 to 2025-03-06", report.DateRangeText);
        }

        [Test]
        public void CodeFilePercentage_TreatsMetaAsNonCode()
        {
            ChangeReport report = BuildSampleReport();

            Assert.AreEqual(2, report.CodeFileEntries, "Game.cs and the renamed Player.cs.");
            Assert.AreEqual(28.6f, report.CodeFilePercent, 0.05f, "2 of 7 entries is 28.6%.");
            Assert.AreEqual("28.6%", report.CodeFilePercentText);
        }

        [Test]
        public void CategoryTable_HasTheRightAddModifyDeleteRenameCounts()
        {
            ChangeReport report = BuildSampleReport();

            CategoryCounts code = report.CountsFor(PathCategory.Code);
            Assert.AreEqual(1, code.Modified, "Game.cs was modified.");
            Assert.AreEqual(1, code.Renamed, "Player.cs was renamed.");
            Assert.AreEqual(2, code.Total);

            CategoryCounts art = report.CountsFor(PathCategory.Art);
            Assert.AreEqual(1, art.Added, "hero.png was added.");

            CategoryCounts audio = report.CountsFor(PathCategory.Audio);
            Assert.AreEqual(1, audio.Deleted, "old-theme.wav was deleted.");

            CategoryCounts meta = report.CountsFor(PathCategory.Meta);
            Assert.AreEqual(1, meta.Added, "hero.png.meta was added alongside the art.");
        }

        [Test]
        public void MetaSidecars_AreAttributedToTheirSiblingAsset()
        {
            ChangeReport report = BuildSampleReport();

            Assert.AreEqual(1, report.MetaBySibling[PathCategory.Art],
                "The one .meta in the sample belongs to an art file.");
            Assert.IsFalse(report.MetaBySibling.ContainsKey(PathCategory.Code));
        }

        [Test]
        public void FoldersTouched_ListsAssetsOnly()
        {
            ChangeReport report = BuildSampleReport();

            Assert.AreEqual(1, report.FoldersTouched.Count);
            Assert.AreEqual("Assets", report.FoldersTouched[0].Key);
            Assert.AreEqual(7, report.FoldersTouched[0].Value);
        }

        [Test]
        public void EmptyInput_ProducesAnEmptyButUsableReport()
        {
            ChangeReport report = ChangeReport.Build(GitLogParser.Parse(""), "nothing.txt");

            Assert.AreEqual(0, report.CommitCount);
            Assert.AreEqual(0, report.TotalFileEntries);
            Assert.AreEqual(0f, report.CodeFilePercent, 0.001f, "No division by zero.");
            Assert.AreEqual("(no dates)", report.DateRangeText);
        }

        [Test]
        public void ToMarkdown_ContainsTheHeadlineNumbers()
        {
            string markdown = BuildSampleReport().ToMarkdown();

            StringAssert.Contains("# ChangeLens report", markdown);
            StringAssert.Contains("28.6%", markdown);
            StringAssert.Contains("| Code |", markdown, "The category table has a Code row.");
            StringAssert.Contains("Assets", markdown);
        }
    }
}
