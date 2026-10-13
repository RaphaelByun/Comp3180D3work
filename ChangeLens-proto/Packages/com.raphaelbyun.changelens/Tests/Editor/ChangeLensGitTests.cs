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

        [Test]
        public void NonDateBound_IsPassedThroughForGitToRead()
        {
            Assert.AreEqual("2.weeks.ago", WeekExport.DateBound("2.weeks.ago"));
            Assert.AreEqual("", WeekExport.DateBound(null));
        }
    }
}
