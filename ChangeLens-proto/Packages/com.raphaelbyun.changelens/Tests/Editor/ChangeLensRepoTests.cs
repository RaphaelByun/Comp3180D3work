// ChangeLensRepoTests.cs
// ---------------------------------------------------------------------------
// Tests for four cases the frozen study weeks never hit:
//
//   * merges: the people who wrote the merged work are counted and listed,
//     including a "foxtrot" week where main was merged into a branch and main
//     then fast-forwarded onto it;
//   * a script deleted during the week still has a name;
//   * the user's own git config cannot change what the page says;
//   * an asset edited and then renamed or moved in the same week is one asset.
//
// The end-to-end tests build a small throwaway git repository in the temp
// folder and run the real export (WeekExport.FromGit) on it. They are skipped
// (Inconclusive) when git is not on the PATH.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    /// <summary>A throwaway git repository with fixed authors and dates.</summary>
    internal sealed class TempRepo : IDisposable
    {
        public readonly string Dir;
        private readonly string _emptyConfig;

        public TempRepo()
        {
            Dir = Path.Combine(Path.GetTempPath(), "changelens-test-" + Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(Dir);
            _emptyConfig = Path.Combine(Dir, "..", Path.GetFileName(Dir) + ".gitconfig");
            File.WriteAllText(_emptyConfig, "");
            Git("init -q -b main");
        }

        public static bool GitAvailable()
        {
            try
            {
                var psi = new ProcessStartInfo("git", "--version")
                {
                    RedirectStandardOutput = true, RedirectStandardError = true,
                    UseShellExecute = false, CreateNoWindow = true
                };
                using (Process p = Process.Start(psi)) { p.StandardOutput.ReadToEnd(); p.WaitForExit(); return p.ExitCode == 0; }
            }
            catch (Exception) { return false; }
        }

        /// <summary>Runs git for SETUP only, with the user's own config switched off.</summary>
        public string Git(string args, string who = "Setup", string date = "2021-03-01T12:00:00+0000")
        {
            var psi = new ProcessStartInfo("git", "-c commit.gpgsign=false " + args)
            {
                WorkingDirectory = Dir,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                StandardOutputEncoding = Encoding.UTF8
            };
            psi.EnvironmentVariables["GIT_CONFIG_NOSYSTEM"] = "1";
            psi.EnvironmentVariables["GIT_CONFIG_GLOBAL"] = _emptyConfig;
            psi.EnvironmentVariables["GIT_AUTHOR_NAME"] = who;
            psi.EnvironmentVariables["GIT_AUTHOR_EMAIL"] = who.ToLowerInvariant() + "@example.com";
            psi.EnvironmentVariables["GIT_COMMITTER_NAME"] = who;
            psi.EnvironmentVariables["GIT_COMMITTER_EMAIL"] = who.ToLowerInvariant() + "@example.com";
            psi.EnvironmentVariables["GIT_AUTHOR_DATE"] = date;
            psi.EnvironmentVariables["GIT_COMMITTER_DATE"] = date;
            using (Process p = Process.Start(psi))
            {
                string err = p.StandardError.ReadToEndAsync().Result;
                string output = p.StandardOutput.ReadToEnd();
                p.WaitForExit();
                if (p.ExitCode != 0) throw new InvalidOperationException("git " + args + " failed: " + err);
                return output;
            }
        }

        public void Write(string relativePath, string text)
        {
            string full = Path.Combine(Dir, relativePath);
            Directory.CreateDirectory(Path.GetDirectoryName(full));
            File.WriteAllText(full, text.Replace("\r\n", "\n"));
        }

        public void Delete(string relativePath)
        {
            File.Delete(Path.Combine(Dir, relativePath));
        }

        public void Commit(string who, string date, string message)
        {
            Git("add -A", who, date);
            Git("commit -q -m \"" + message + "\"", who, date);
        }

        public void Dispose()
        {
            try { File.Delete(_emptyConfig); } catch (Exception) { }
            try
            {
                foreach (string f in Directory.GetFiles(Dir, "*", SearchOption.AllDirectories))
                    File.SetAttributes(f, FileAttributes.Normal);
                Directory.Delete(Dir, true);
            }
            catch (Exception) { /* a temp folder left behind is not a test failure */ }
        }
    }

    internal static class Yaml
    {
        public const string OldGuid = "e3ca3459aaaabbbbccccddddeeeeffff";
        public const string KeepGuid = "7af9ca4d0000111122223333444455aa";

        public static string Meta(string guid)
        {
            return "fileFormatVersion: 2\nguid: " + guid + "\nMonoImporter:\n  serializedVersion: 2\n";
        }

        public static string Script(string guid, long id, string field)
        {
            return "--- !u!114 &" + id + "\n" +
                   "MonoBehaviour:\n" +
                   "  m_ObjectHideFlags: 0\n" +
                   "  m_GameObject: {fileID: 100}\n" +
                   "  m_Enabled: 1\n" +
                   "  m_Script: {fileID: 11500000, guid: " + guid + ", type: 3}\n" +
                   "  m_Name: \n" +
                   "  " + field + "\n";
        }

        public static string Prefab(string name, string x, params string[] blocks)
        {
            return "%YAML 1.1\n%TAG !u! tag:unity3d.com,2011:\n" +
                   "--- !u!1 &100\n" +
                   "GameObject:\n" +
                   "  m_ObjectHideFlags: 0\n" +
                   "  m_Layer: 0\n" +
                   "  m_Name: " + name + "\n" +
                   "  m_TagString: Untagged\n" +
                   "  m_IsActive: 1\n" +
                   "--- !u!4 &101\n" +
                   "Transform:\n" +
                   "  m_ObjectHideFlags: 0\n" +
                   "  m_GameObject: {fileID: 100}\n" +
                   "  m_LocalRotation: {x: 0, y: 0, z: 0, w: 1}\n" +
                   "  m_LocalPosition: {x: " + x + ", y: 0, z: 0}\n" +
                   "  m_LocalScale: {x: 1, y: 1, z: 1}\n" +
                   "  m_Children: []\n" +
                   "  m_Father: {fileID: 0}\n" +
                   string.Concat(blocks);
        }
    }

    public class ChangeLensRepoTests
    {
        private const string WeekStart = "2021-03-08";
        private const string WeekEnd = "2021-03-15";

        private static void RequireGit()
        {
            if (!TempRepo.GitAvailable()) Assert.Inconclusive("git is not on the PATH");
        }

        private static string PageB(TempRepo repo, out WeekExport export)
        {
            export = WeekExport.FromGit(repo.Dir, WeekStart, WeekEnd);
            return export.BuildReport(ReportCondition.Treatment, "test week").ToMarkdown();
        }

        // ---- Merges ----------------------------------------------------------

        // Alice and Bob work on a branch, Maint merges it with --no-ff, Carol
        // commits on main. Before the fix the page said "2 changes by 2 people".
        [Test]
        public void NoFastForwardMerge_CountsAndListsTheMergedWork()
        {
            RequireGit();
            using (var repo = new TempRepo())
            {
                repo.Write("README.md", "start\n");
                repo.Commit("Setup", "2021-03-01T12:00:00+0000", "Start");
                repo.Git("checkout -q -b feature");
                repo.Write("Assets/Scripts/Door.cs", "class Door {}\n");
                repo.Commit("Alice", "2021-03-09T10:00:00+0000", "Add door script");
                repo.Write("Assets/Prefabs/Door.prefab", Yaml.Prefab("Door", "0"));
                repo.Commit("Bob", "2021-03-10T10:00:00+0000", "Add door prefab");
                repo.Git("checkout -q main");
                repo.Git("merge -q --no-ff -m \"Merge pull request #1 from team/feature\" feature", "Maint", "2021-03-11T10:00:00+0000");
                repo.Write("Assets/Scripts/Menu.cs", "class Menu {}\n");
                repo.Commit("Carol", "2021-03-12T10:00:00+0000", "Fix menu");

                WeekExport export;
                string page = PageB(repo, out export);
                StringAssert.Contains("2 changes by 4 people", page);
                StringAssert.Contains("↳ brings in 2 changes by Bob, Alice", page);
                StringAssert.Contains("↳ Add door script (Alice)", page);
                StringAssert.Contains("↳ Add door prefab (Bob)", page);
                StringAssert.Contains("Merge pull request #1 from team/feature | 2 |", page);
            }
        }

        // A teammate merges main into their branch, then main fast-forwards onto
        // it. The main line now runs through the branch, and main's own commits
        // arrive only inside the merge.
        [Test]
        public void MainMergedIntoBranchThenFastForwarded_ShowsMainsWork()
        {
            RequireGit();
            using (var repo = new TempRepo())
            {
                repo.Write("README.md", "start\n");
                repo.Commit("Setup", "2021-03-01T12:00:00+0000", "Start");
                repo.Git("checkout -q -b dev");
                repo.Write("Assets/Scripts/Long.cs", "class Long {}\n");
                repo.Commit("Long", "2021-03-09T09:00:00+0000", "Long work");
                repo.Git("checkout -q main");
                repo.Write("Assets/Scripts/Gate.cs", "class Gate {}\n");
                repo.Commit("Peng", "2021-03-09T10:00:00+0000", "Key and exit gate system");
                repo.Write("Assets/Scripts/Start.cs", "class Start {}\n");
                repo.Commit("Peng", "2021-03-10T10:00:00+0000", "Start scene done");
                repo.Git("checkout -q dev");
                repo.Git("merge -q --no-ff -m \"Merge branch main into dev\" main", "Long", "2021-03-11T10:00:00+0000");
                repo.Git("checkout -q main");
                repo.Git("merge -q --ff-only dev");

                WeekExport export;
                string page = PageB(repo, out export);
                StringAssert.Contains("2 changes by 2 people", page);
                StringAssert.Contains("↳ brings in 2 changes by Peng", page);
                StringAssert.Contains("↳ Key and exit gate system (Peng)", page);
                StringAssert.Contains("↳ Start scene done (Peng)", page);
                Assert.IsNotEmpty(export.MergedText);

                // The frozen export carries the merged list, so a saved week reads the same.
                string folder = Path.Combine(repo.Dir, "..", Path.GetFileName(repo.Dir) + "-export");
                try
                {
                    export.SaveTo(folder);
                    string again = WeekExport.FromFolder(folder).BuildReport(ReportCondition.Treatment, "test week").ToMarkdown();
                    Assert.AreEqual(page, again);
                }
                finally { Directory.Delete(folder, true); }
            }
        }

        [Test]
        public void MergedText_IsParsedAndAttachedFromAFrozenExport()
        {
            const string merge = "184a4af0000000000000000000000000000000aa";
            var export = new WeekExport
            {
                LogText =
                    "commit " + merge + "\n" +
                    "Merge: 1111111 2222222\n" +
                    "Author: Maint <maint@example.com>\n" +
                    "Date:   2021-03-11 10:00:00 +0000\n\n" +
                    "    Merge pull request #1\n\n" +
                    "A\tAssets/Scripts/New.cs\n",
                MergedText =
                    merge + "\taaaa\tAlice <alice@example.com>\t2021-03-09 10:00:00 +0000\tAdd new script\n" +
                    merge + "\tbbbb\tBob <bob@example.com>\t2021-03-10 10:00:00 +0000\tTidy | pipes\n"
            };
            ProducerReport b = export.BuildReport(ReportCondition.Baseline, "t");
            string page = b.ToMarkdown();
            Assert.IsTrue(b.Counts.Commits[0].IsMerge);
            Assert.AreEqual(2, b.Counts.Commits[0].MergedCommits.Count);
            StringAssert.Contains("1 change by 3 people", page);
            StringAssert.Contains("| Wed 10 Mar | ↳ Tidy \\| pipes (Bob) |  |  |", page);
            Assert.IsTrue(b.Claims.Exists(c => c.Commits.Contains("aaaa")));
        }

        [Test]
        public void ManyMergedChanges_AreCappedWithAndNMore()
        {
            const string merge = "cccc000000000000000000000000000000000000";
            var sb = new StringBuilder();
            for (int i = 0; i < ProducerReport.MergedRowsShown + 3; i++)
                sb.Append(merge + "\th" + i + "\tDev <dev@example.com>\t2021-03-09 10:00:00 +0000\tChange " + i + "\n");
            var export = new WeekExport
            {
                LogText = "commit " + merge + "\nMerge: 1 2\nAuthor: Dev <dev@example.com>\nDate:   2021-03-11 10:00:00 +0000\n\n    Merge\n",
                MergedText = sb.ToString()
            };
            string page = export.BuildReport(ReportCondition.Baseline, "t").ToMarkdown();
            StringAssert.Contains("↳ and 3 more", page);
            StringAssert.DoesNotContain("Change " + (ProducerReport.MergedRowsShown + 1), page);
        }

        // ---- A script deleted during the week ---------------------------------

        private static void BuildDeletedScriptWeek(TempRepo repo)
        {
            repo.Write("Assets/Scripts/Old.cs", "class Old {}\n");
            repo.Write("Assets/Scripts/Old.cs.meta", Yaml.Meta(Yaml.OldGuid));
            repo.Write("Assets/Scripts/Keep.cs", "class Keep {}\n");
            repo.Write("Assets/Scripts/Keep.cs.meta", Yaml.Meta(Yaml.KeepGuid));
            repo.Write("Assets/Prefabs/Door.prefab",
                       Yaml.Prefab("Door", "0", Yaml.Script(Yaml.OldGuid, 200, "speed: 1"), Yaml.Script(Yaml.KeepGuid, 300, "open: 0")));
            repo.Commit("Setup", "2021-03-01T12:00:00+0000", "Start");

            repo.Delete("Assets/Scripts/Old.cs");
            repo.Delete("Assets/Scripts/Old.cs.meta");
            repo.Write("Assets/Prefabs/Door.prefab",
                       Yaml.Prefab("Door", "0", Yaml.Script(Yaml.KeepGuid, 300, "open: 0")));
            repo.Commit("Dev", "2021-03-09T10:00:00+0000", "Remove the old door script");

            repo.Write("Assets/Prefabs/Door.prefab",
                       Yaml.Prefab("Door", "0", Yaml.Script(Yaml.KeepGuid, 300, "open: 1")));
            repo.Commit("Dev", "2021-03-10T10:00:00+0000", "Open the door");
        }

        [Test]
        public void ScriptDeletedDuringTheWeek_IsStillNamed()
        {
            RequireGit();
            using (var repo = new TempRepo())
            {
                BuildDeletedScriptWeek(repo);
                WeekExport export;
                string page = PageB(repo, out export);
                StringAssert.Contains("removed Old script", page);
                StringAssert.Contains("edited Keep script settings", page);
                StringAssert.DoesNotContain("unidentified", page);
            }
        }

        [Test]
        public void AppendMissing_AddsOnlyGuidsTheNewestTableLacks()
        {
            string newest = "abc:Assets/Scripts/Renamed.cs.meta:guid: " + Yaml.KeepGuid + "\n";
            string older =
                "def:Assets/Scripts/Old.cs.meta:guid: " + Yaml.OldGuid + "\n" +
                "def:Assets/Scripts/Keep.cs.meta:guid: " + Yaml.KeepGuid + "\n";
            GuidIndex index = GuidIndex.Parse(GuidIndex.AppendMissing(newest, older));
            Assert.AreEqual("Old", GuidIndex.NameFor(index, Yaml.OldGuid));
            // A script renamed during the week keeps its new name, not "Renamed or Keep".
            Assert.AreEqual("Renamed", GuidIndex.NameFor(index, Yaml.KeepGuid));
            Assert.AreEqual(newest, GuidIndex.AppendMissing(newest, ""));
        }

        // ---- The user's own git config ------------------------------------------

        // Settings a developer may well have. Each one used to change the page
        // without any error: no dates, an empty scene section, unnamed scripts.
        [Test]
        public void UserGitConfig_DoesNotChangeThePage()
        {
            RequireGit();
            string plain, configured;
            using (var repo = new TempRepo())
            {
                BuildDeletedScriptWeek(repo);
                WeekExport export;
                plain = PageB(repo, out export);
            }
            using (var repo = new TempRepo())
            {
                BuildDeletedScriptWeek(repo);
                foreach (string setting in new[]
                         {
                             "format.pretty fuller", "diff.noprefix true", "diff.mnemonicPrefix true",
                             "grep.lineNumber true", "grep.column true", "color.ui always", "log.abbrevCommit true"
                         })
                    repo.Git("config " + setting);
                WeekExport export;
                configured = PageB(repo, out export);
            }
            Assert.AreEqual(plain, configured);
            StringAssert.Contains("9 March 2021 to 10 March 2021", configured);
            StringAssert.Contains("**Door** (prefab", configured);
            StringAssert.DoesNotContain("unidentified", configured);
        }

        [Test]
        public void EveryGitCall_PinsTheSettingsTheParsersRead()
        {
            string args = WeekExport.GitArguments("log");
            foreach (string pinned in new[]
                     {
                         "-c core.quotepath=false", "-c diff.noprefix=false", "-c diff.mnemonicPrefix=false",
                         "-c grep.lineNumber=false", "-c grep.column=false", "-c color.ui=false",
                         "-c log.showSignature=false", "-c log.abbrevCommit=false"
                     })
                StringAssert.Contains(pinned, args);
            StringAssert.EndsWith(" log", args);

            foreach (string a in new[] { WeekExport.LogArgs(WeekStart, WeekEnd), WeekExport.PatchArgs(WeekStart, WeekEnd) })
                StringAssert.Contains("--pretty=medium --no-color", a);
            StringAssert.Contains("--src-prefix=a/ --dst-prefix=b/ --no-ext-diff --no-textconv",
                                  WeekExport.PatchArgs(WeekStart, WeekEnd));
        }

        // ---- The fidelity checklist ----------------------------------------------

        [Test]
        public void Checklist_TellsTheScorerToOpenMergesAsFirstParentDiffs()
        {
            ProducerReport r = new WeekExport { LogText = SamplePatch.Log }.BuildReport(ReportCondition.Baseline, "t");
            string checklist = r.FidelityChecklistMarkdown();
            StringAssert.Contains("`git show --diff-merges=first-parent <hash>`", checklist);
            StringAssert.Contains("`git log --no-merges <hash>^1..<hash>`", checklist);
        }

        // ---- An asset renamed or moved during the week -----------------------------

        [Test]
        public void AssetEditedThenRenamedThenMoved_IsOneAsset()
        {
            RequireGit();
            using (var repo = new TempRepo())
            {
                repo.Write("Assets/Türen b/Tür Ä.prefab", Yaml.Prefab("Tür", "0"));
                repo.Commit("Setup", "2021-03-01T12:00:00+0000", "Start");
                repo.Write("Assets/Türen b/Tür Ä.prefab", Yaml.Prefab("Tür", "1"));
                repo.Commit("Dev", "2021-03-09T10:00:00+0000", "Move the door");
                repo.Git("mv \"Assets/Türen b/Tür Ä.prefab\" \"Assets/Türen b/Tür Ö.prefab\"");
                repo.Commit("Dev", "2021-03-10T10:00:00+0000", "Rename the door");
                Directory.CreateDirectory(Path.Combine(repo.Dir, "Assets", "Neu"));
                repo.Git("mv \"Assets/Türen b/Tür Ö.prefab\" \"Assets/Neu/Tür Ö.prefab\"");
                repo.Write("Assets/Neu/Tür Ö.prefab", Yaml.Prefab("Tür", "2"));
                repo.Commit("Dev", "2021-03-11T10:00:00+0000", "File the door");

                WeekExport export;
                string page = PageB(repo, out export);
                StringAssert.Contains("1 scene or prefab changed", page);
                StringAssert.Contains("**Tür Ö** (prefab, in `Assets/Neu`)", page);
                StringAssert.DoesNotContain("**Tür Ä**", page);
                StringAssert.Contains("\"Rename the door\": renamed from Tür Ä (then at `Assets/Türen b/Tür Ö.prefab`).", page);
                StringAssert.Contains("(then at `Assets/Türen b/Tür Ä.prefab`).", page);

                ProducerReport b = export.BuildReport(ReportCondition.Treatment, "test week");
                StringAssert.Contains(" of 1 ", StudyExport.NamingSummary(b));
            }
        }

        // A new file that reuses an old name after a rename is a different asset.
        [Test]
        public void FinalPaths_FollowRenamesOnlyBackwardsInTime()
        {
            var newestFirst = new List<AssetChange>
            {
                new AssetChange { Path = "Assets/A.prefab", FileAdded = true },          // new file reusing the name
                new AssetChange { Path = "Assets/C.prefab", RenamedFrom = "Assets/B.prefab" },
                new AssetChange { Path = "Assets/B.prefab", RenamedFrom = "Assets/A.prefab" },
                new AssetChange { Path = "Assets/A.prefab" }                              // edit before the renames
            };
            CollectionAssert.AreEqual(
                new[] { "Assets/A.prefab", "Assets/C.prefab", "Assets/C.prefab", "Assets/C.prefab" },
                ProducerReport.FinalPaths(newestFirst));
        }
    }
}
