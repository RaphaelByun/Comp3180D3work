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
    }
}
