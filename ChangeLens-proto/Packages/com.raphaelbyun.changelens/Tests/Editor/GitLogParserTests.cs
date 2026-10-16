// GitLogParserTests.cs
// ---------------------------------------------------------------------------
// EditMode tests for the parser. Run them from Window > General > Test Runner,
// EditMode tab, "Run All".
//
// The sample log at the top of this file is shared by all three test files.
// It deliberately contains the three awkward cases ChangeLens has to handle:
//   * a RENAME  (R094, two paths on one line)
//   * a .META sidecar sitting next to a real asset
//   * a DELETION
// ---------------------------------------------------------------------------

using ChangeLens.Editor;
using NUnit.Framework;
using System.Collections.Generic;

namespace ChangeLens.Editor.Tests
{
    /// <summary>
    /// One small, hand-written git log export used by every test below.
    /// It is built with explicit "\t" tabs because git separates the status
    /// code from the path with a real tab character, and a tab is invisible.
    /// </summary>
    public static class SampleLog
    {
        public const string Text =
            "commit aaaaaaaabbbbbbbbccccccccdddddddd11111111\n" +
            "Author: Ada Lovelace <ada@example.com>\n" +
            "Date:   2025-03-04 10:22:11 +1100\n" +
            "\n" +
            "    Add hero art and move the player script\n" +
            "\n" +
            "M\tAssets/Scripts/Game.cs\n" +
            "A\tAssets/Art/hero.png\n" +
            "A\tAssets/Art/hero.png.meta\n" +
            "R094\tAssets/Scripts/Old/Player.cs\tAssets/Scripts/New/Player.cs\n" +
            "D\tAssets/Audio/old-theme.wav\n" +
            "\n" +
            "commit aaaaaaaabbbbbbbbccccccccdddddddd22222222\n" +
            "Author: Grace Hopper <grace@example.com>\n" +
            "Date:   2025-03-06 09:00:00 +1100\n" +
            "\n" +
            "    Tune the first level\n" +
            "    (this second line is the commit body and must be ignored)\n" +
            "\n" +
            "M\tAssets/Scenes/Level1.unity\n" +
            "M\tAssets/Data/balance.json\n";
    }

    public class GitLogParserTests
    {
        [Test]
        public void Parse_FindsBothCommits()
        {
            List<CommitRecord> commits = GitLogParser.Parse(SampleLog.Text);

            Assert.AreEqual(2, commits.Count, "The sample log contains two commits.");
        }

        [Test]
        public void Parse_ReadsHashAuthorDateAndSubject()
        {
            CommitRecord first = GitLogParser.Parse(SampleLog.Text)[0];

            Assert.AreEqual("aaaaaaaabbbbbbbbccccccccdddddddd11111111", first.Hash);
            Assert.AreEqual("Ada Lovelace <ada@example.com>", first.Author);
            Assert.AreEqual("2025-03-04", first.DateOnly);
            Assert.AreEqual("Add hero art and move the player script", first.Subject);
        }

        [Test]
        public void Parse_IgnoresTheCommitBody()
        {
            CommitRecord second = GitLogParser.Parse(SampleLog.Text)[1];

            // Only the FIRST indented line is the subject.
            Assert.AreEqual("Tune the first level", second.Subject);
            Assert.AreEqual(2, second.Changes.Count, "The body line must not be read as a file.");
        }

        [Test]
        public void Parse_ReadsEveryFileOfTheFirstCommit()
        {
            CommitRecord first = GitLogParser.Parse(SampleLog.Text)[0];

            Assert.AreEqual(5, first.Changes.Count);
            Assert.AreEqual(ChangeStatus.Modified, first.Changes[0].Status);
            Assert.AreEqual("Assets/Scripts/Game.cs", first.Changes[0].Path);
        }

        [Test]
        public void Parse_HandlesARename()
        {
            CommitRecord first = GitLogParser.Parse(SampleLog.Text)[0];
            FileChange rename = first.Changes[3];

            Assert.AreEqual(ChangeStatus.Renamed, rename.Status);
            Assert.AreEqual("Assets/Scripts/New/Player.cs", rename.Path, "Path is the NEW location.");
            Assert.AreEqual("Assets/Scripts/Old/Player.cs", rename.OldPath, "OldPath is where it was.");
            Assert.AreEqual(94, rename.SimilarityScore, "R094 means a 94% similarity score.");
        }

        [Test]
        public void Parse_HandlesADeletion()
        {
            CommitRecord first = GitLogParser.Parse(SampleLog.Text)[0];
            FileChange deletion = first.Changes[4];

            Assert.AreEqual(ChangeStatus.Deleted, deletion.Status);
            Assert.AreEqual("Assets/Audio/old-theme.wav", deletion.Path);
            Assert.IsNull(deletion.OldPath, "A plain deletion has no old path.");
        }

        [Test]
        public void ParseStatusLine_RejectsLinesThatAreNotStatusLines()
        {
            Assert.IsNull(GitLogParser.ParseStatusLine("Author: Someone <a@b.c>"));
            Assert.IsNull(GitLogParser.ParseStatusLine(""));
            Assert.IsNull(GitLogParser.ParseStatusLine("Z\tAssets/Weird.cs"), "Z is not a git status code.");
        }

        [Test]
        public void Parse_OnEmptyInput_ReturnsAnEmptyListNotNull()
        {
            Assert.IsNotNull(GitLogParser.Parse(""));
            Assert.AreEqual(0, GitLogParser.Parse("").Count);
            Assert.AreEqual(0, GitLogParser.Parse(null).Count);
        }

        [Test]
        public void Parse_AcceptsWindowsLineEndings()
        {
            string windowsStyle = SampleLog.Text.Replace("\n", "\r\n");
            List<CommitRecord> commits = GitLogParser.Parse(windowsStyle);

            Assert.AreEqual(2, commits.Count);
            Assert.AreEqual(5, commits[0].Changes.Count);
        }

        [Test]
        public void UnquoteGitPath_DecodesGitsQuoting()
        {
            Assert.AreEqual("Assets/Kiste_\u00C4pfel.prefab",
                GitLogParser.UnquoteGitPath("\"Assets/Kiste_\\303\\204pfel.prefab\""));
            Assert.AreEqual("Assets/say \"hi\"\\tab\there.cs",
                GitLogParser.UnquoteGitPath("\"Assets/say \\\"hi\\\"\\\\tab\\there.cs\""));
            Assert.AreEqual("Assets/Plain Name.cs", GitLogParser.UnquoteGitPath("Assets/Plain Name.cs"));
            Assert.IsNull(GitLogParser.UnquoteGitPath(null));
        }

        [Test]
        public void ParseStatusLine_UnquotesNonAsciiPaths()
        {
            FileChange added = GitLogParser.ParseStatusLine("A\t\"Assets/Prefabs/Kiste_\\303\\204pfel.prefab\"");
            Assert.AreEqual("Assets/Prefabs/Kiste_\u00C4pfel.prefab", added.Path);

            FileChange renamed = GitLogParser.ParseStatusLine("R100\t\"Assets/\\303\\204.cs\"\tAssets/A.cs");
            Assert.AreEqual("Assets/\u00C4.cs", renamed.OldPath);
            Assert.AreEqual("Assets/A.cs", renamed.Path);
        }

        [Test]
        public void ShortHash_IsSevenCharacters()
        {
            CommitRecord first = GitLogParser.Parse(SampleLog.Text)[0];

            Assert.AreEqual("aaaaaaa", first.ShortHash);
        }
    }
}
