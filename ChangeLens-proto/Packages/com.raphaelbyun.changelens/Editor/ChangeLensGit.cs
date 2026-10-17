// ChangeLensGit.cs
// ---------------------------------------------------------------------------
// The Editor-side plumbing for the committed tier:
//
//   * WeekExport - runs git against a repository for a date range and keeps the
//     three texts ChangeLens needs (name-status log, scene/prefab patch, script
//     guid table). Saved to a folder, an export is FROZEN: the study reads the
//     same bytes in every session, and the fidelity check reads them too.
//   * AssetDatabaseGuidResolver - resolves guids through Unity itself when the
//     repository being reported on is the open project.
//   * StudyExport - writes Version A (baseline), Version B (treatment) and a
//     fidelity checklist for each, from one frozen export.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using UnityEditor;

namespace ChangeLens.Editor
{
    public class WeekExport
    {
        public const string LogFile = "log.txt";
        public const string PatchFile = "assets.patch";
        public const string GuidFile = "guids.txt";
        public const string MergedFile = "merged.txt";

        public string LogText = "";
        public string PatchText = "";
        public string GuidText = "";

        /// <summary>
        /// The commits each merge brought in, one per line (see
        /// <see cref="GitLogParser.ParseMerged"/>). Empty for a week with no merges.
        /// </summary>
        public string MergedText = "";

        /// <summary>Things the export noticed but could not fix (not saved with the export).</summary>
        public List<string> Warnings = new List<string>();

        /// <summary>Runs git for [since, until) in <paramref name="repoPath"/>.</summary>
        public static WeekExport FromGit(string repoPath, string since, string until)
        {
            var export = new WeekExport();
            export.LogText = RunGit(repoPath, LogArgs(since, until));
            export.PatchText = RunGit(repoPath, PatchArgs(since, until));

            List<CommitRecord> commits = GitLogParser.Parse(export.LogText);
            if (commits.Count > 0)
            {
                // Script guids as they stood at the week's newest commit.
                string newest = RunGit(repoPath, GuidArgs(commits[0].Hash));

                // Then as they stood just before the week's oldest commit, so a
                // script deleted during the week still has a name. Only guids the
                // newest table lacks are added: a script renamed during the week
                // keeps its new name and is not made ambiguous.
                string before = "";
                string parent = RunGit(repoPath, "rev-parse -q --verify " + commits[commits.Count - 1].Hash + "^").Trim();
                if (parent.Length > 0) before = RunGit(repoPath, GuidArgs(parent));
                export.GuidText = GuidIndex.AppendMissing(newest, before);

                // What each merge on the main line brought in.
                var merged = new StringBuilder();
                foreach (CommitRecord c in commits)
                {
                    if (!c.IsMerge) continue;
                    string brought = RunGit(repoPath, MergedArgs(c.Hash));
                    foreach (string line in brought.Replace("\r\n", "\n").Split('\n'))
                        if (line.Length > 0) merged.Append(c.Hash).Append('\t').Append(line).Append('\n');
                }
                export.MergedText = merged.ToString();
            }
            return export;
        }

        /// <summary>
        /// The git arguments for every script guid line at one commit.
        /// --no-color and -G (basic regex) are set here because color.grep and
        /// grep.patternType are not covered by color.ui: with color.grep=always
        /// the lines carry colour codes, and with grep.patternType=fixed
        /// "^guid:" matches nothing.
        /// </summary>
        public static string GuidArgs(string commit)
        {
            return "grep --no-color -I -G -e \"^guid:\" " + commit + " -- \"*.cs.meta\"";
        }

        /// <summary>
        /// The git arguments for the commits a merge brought in: everything
        /// reachable from the merge but not from its first parent, merges left out.
        /// One line each: hash, author, date, subject, tab-separated.
        /// </summary>
        public static string MergedArgs(string merge)
        {
            return "log --no-merges --no-color --date=iso \"--format=%H%x09%aN <%aE>%x09%ad%x09%s\" " +
                   merge + "^1.." + merge;
        }

        /// <summary>
        /// The git arguments for the week's name-status log. The export walks the
        /// main line only (--first-parent) and shows each merge as everything it
        /// brought in (--diff-merges=first-parent). So work done on a branch is
        /// reported in the week it was merged, not the week it was committed,
        /// which a weekly report run on the day would never see.
        /// --pretty=medium and --no-color fix the layout the parser reads, whatever
        /// the user's own git settings say (format.pretty=fuller, color.ui=always).
        /// </summary>
        public static string LogArgs(string since, string until)
        {
            return "log --first-parent --diff-merges=first-parent --pretty=medium --no-color --name-status --date=iso " +
                   Range(since, until);
        }

        /// <summary>
        /// The git arguments for the week's scene and prefab patch (see <see cref="LogArgs"/>).
        /// The a/ and b/ prefixes are pinned because the patch parser reads them,
        /// and textconv and external diff tools are turned off so the patch is git's own.
        /// </summary>
        public static string PatchArgs(string since, string until)
        {
            return "log -p --first-parent --diff-merges=first-parent --pretty=medium --no-color " +
                   "--src-prefix=a/ --dst-prefix=b/ --no-ext-diff --no-textconv --date=iso " + Range(since, until) +
                   " -- \"*.prefab\" \"*.unity\"";
        }

        /// <summary>
        /// Settings passed with every git call so the output does not depend on
        /// the user's git config. Each one, if set the other way, changes text
        /// the parsers read: diff prefixes, grep line numbers and columns,
        /// colour codes, signature lines, short hashes, rename detection and
        /// the output encoding.
        /// </summary>
        public const string PinnedConfig =
            "-c core.quotepath=false -c diff.noprefix=false -c diff.mnemonicPrefix=false " +
            "-c grep.lineNumber=false -c grep.column=false -c color.ui=false -c log.showSignature=false " +
            "-c log.abbrevCommit=false -c diff.renames=true -c i18n.logOutputEncoding=UTF-8";

        /// <summary>The full argument string handed to git: <see cref="PinnedConfig"/> then the command.</summary>
        public static string GitArguments(string args)
        {
            return PinnedConfig + " " + args;
        }

        private static string Range(string since, string until)
        {
            return "--since=" + DateBound(since) + " --until=" + UntilBound(until);
        }

        /// <summary>
        /// The day after the week's last day as yyyy-MM-dd, always on the
        /// Gregorian calendar. The machine's own culture could be Thai or Persian,
        /// where the same date would print as 2564 or 1400.
        /// </summary>
        public static string WeekEnd(DateTime start, int days)
        {
            return start.AddDays(days).ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// The end bound handed to git. Git's --until includes a commit made at
        /// exactly that second, so a date-only end ("2021-07-26") becomes one
        /// second before that midnight UTC ("2021-07-25T23:59:59+0000"). A commit
        /// at 00:00:00 then falls in the next week only, not in both.
        /// </summary>
        public static string UntilBound(string value)
        {
            string trimmed = value == null ? "" : value.Trim();
            DateTime day;
            if (trimmed.Length != 10 ||
                !DateTime.TryParseExact(trimmed, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture,
                                        System.Globalization.DateTimeStyles.None, out day))
                return trimmed;
            return day.AddDays(-1).ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture) +
                   "T23:59:59+0000";
        }

        /// <summary>
        /// Pins a date-only bound ("2021-07-19") to midnight UTC. Git fills a missing
        /// time with the CURRENT time of day and reads it in the machine's own time
        /// zone, so a bare date would make the same week export different commits
        /// depending on when, and where, it was run. Study weeks are UTC weeks.
        /// </summary>
        public static string DateBound(string value)
        {
            string trimmed = value == null ? "" : value.Trim();
            DateTime ignored;
            bool dateOnly = trimmed.Length == 10 &&
                DateTime.TryParseExact(trimmed, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out ignored);
            return dateOnly ? trimmed + "T00:00:00+0000" : trimmed;
        }

        public static WeekExport FromFolder(string folder)
        {
            return new WeekExport
            {
                LogText = ReadIfExists(Path.Combine(folder, LogFile)),
                PatchText = ReadIfExists(Path.Combine(folder, PatchFile)),
                GuidText = ReadIfExists(Path.Combine(folder, GuidFile)),
                MergedText = ReadIfExists(Path.Combine(folder, MergedFile))
            };
        }

        public void SaveTo(string folder)
        {
            Directory.CreateDirectory(folder);
            File.WriteAllText(Path.Combine(folder, LogFile), LogText);
            File.WriteAllText(Path.Combine(folder, PatchFile), PatchText);
            File.WriteAllText(Path.Combine(folder, GuidFile), GuidText);
            // Written only for a week with merges, so a week without them saves
            // the same three files it always did.
            if (!string.IsNullOrEmpty(MergedText))
                File.WriteAllText(Path.Combine(folder, MergedFile), MergedText);
        }

        public ProducerReport BuildReport(ReportCondition condition, string title, IGuidResolver extraResolver = null)
        {
            List<CommitRecord> commits = GitLogParser.Parse(LogText);
            GitLogParser.AttachMerged(commits, GitLogParser.ParseMerged(MergedText));
            ChangeReport counts = ChangeReport.Build(commits, title);
            List<AssetChange> assets = AssetDiffParser.Parse(PatchText);
            GuidIndex index = GuidIndex.Parse(GuidText);
            IGuidResolver resolver = extraResolver == null
                ? (IGuidResolver)index
                : new FirstMatchResolver(index, extraResolver);
            return ProducerReport.Build(counts, assets, resolver, condition, title);
        }

        public static string RunGit(string repoPath, string args)
        {
            var psi = new ProcessStartInfo("git", GitArguments(args))
            {
                WorkingDirectory = repoPath,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                StandardOutputEncoding = Encoding.UTF8
            };
            using (Process p = Process.Start(psi))
            {
                // Read stderr asynchronously so a full stderr pipe cannot deadlock stdout.
                var err = new StringBuilder();
                p.ErrorDataReceived += (s, e) => { if (e.Data != null) err.AppendLine(e.Data); };
                p.BeginErrorReadLine();
                string output = p.StandardOutput.ReadToEnd();
                p.WaitForExit();
                // git grep exits 1 when nothing matches; that is not an error here.
                if (p.ExitCode > 1)
                    throw new InvalidOperationException("git " + args + " failed: " + err);
                return output;
            }
        }

        private static string ReadIfExists(string path)
        {
            return File.Exists(path) ? File.ReadAllText(path) : "";
        }
    }

    /// <summary>Asks each resolver in turn; the first non-null answer wins.</summary>
    public class FirstMatchResolver : IGuidResolver
    {
        private readonly IGuidResolver[] _resolvers;
        public FirstMatchResolver(params IGuidResolver[] resolvers) { _resolvers = resolvers; }

        public string PathFor(string guid)
        {
            foreach (IGuidResolver r in _resolvers)
            {
                string p = r == null ? null : r.PathFor(guid);
                if (!string.IsNullOrEmpty(p)) return p;
            }
            return null;
        }
    }

    /// <summary>Resolves guids in the open Unity project.</summary>
    public class AssetDatabaseGuidResolver : IGuidResolver
    {
        public string PathFor(string guid)
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            return string.IsNullOrEmpty(path) ? null : path;
        }
    }

    public static class StudyExport
    {
        /// <summary>
        /// Writes the study materials for one frozen week into
        /// <paramref name="folder"/>: report-A-baseline.md, report-B-treatment.md
        /// and a fidelity checklist for each. Returns a one-line summary.
        /// </summary>
        public static string WriteStudyFiles(WeekExport export, string folder, string title)
        {
            Directory.CreateDirectory(folder);
            ProducerReport a = export.BuildReport(ReportCondition.Baseline, title);
            ProducerReport b = export.BuildReport(ReportCondition.Treatment, title);
            File.WriteAllText(Path.Combine(folder, "report-A-baseline.md"), a.ToMarkdown());
            File.WriteAllText(Path.Combine(folder, "report-B-treatment.md"), b.ToMarkdown());
            File.WriteAllText(Path.Combine(folder, "fidelity-A.md"), a.FidelityChecklistMarkdown());
            File.WriteAllText(Path.Combine(folder, "fidelity-B.md"), b.FidelityChecklistMarkdown());
            File.WriteAllText(Path.Combine(folder, "naming.md"), NamingSummary(b));
            return title + ": " + a.Counts.CommitCount + " commits, " + a.Counts.TotalFileEntries +
                   " file changes, claims A " + a.Claims.Count + " / B " + b.Claims.Count;
        }

        /// <summary>
        /// The Deliverable 2 measures for one week: categorised share and the
        /// share of changed scenes/prefabs the treatment page names something inside.
        /// </summary>
        public static string NamingSummary(ProducerReport b)
        {
            int total = b.Counts.TotalFileEntries;
            int other = b.Counts.CountsFor(PathCategory.Other).Total;
            // Two measures, reported side by side so neither flatters the other:
            //   strict  - an object name (m_Name) appears in the changed text or its
            //             context: the measure export-week.py used for the A2 scoping.
            //   broad   - the page says anything about the inside: an object name,
            //             a component type, or the file being added/deleted.
            //   shown   - the page lists an object name other than the asset's own
            //             name. The page drops the asset's own root name, so this
            //             is what a reader sees, and it is lower than strict.
            var strict = new Dictionary<string, bool>();
            var broad = new Dictionary<string, bool>();
            var shown = new Dictionary<string, bool>();
            // Keyed on each asset's final path, so a renamed asset counts once.
            List<string> finalPaths = ProducerReport.FinalPaths(b.AssetChanges);
            for (int k = 0; k < b.AssetChanges.Count; k++)
            {
                AssetChange a = b.AssetChanges[k];
                string key = finalPaths[k];
                bool s = a.ObjectNames.Count > 0;
                bool w = s || a.TypesTouched.Count > 0 || a.AddedTypes.Count > 0 ||
                         a.RemovedTypes.Count > 0 || a.FileAdded || a.FileDeleted;
                bool n = a.ObjectNames.Exists(name => name != a.AssetName);
                bool prior;
                strict[key] = (strict.TryGetValue(key, out prior) && prior) || s;
                broad[key] = (broad.TryGetValue(key, out prior) && prior) || w;
                shown[key] = (shown.TryGetValue(key, out prior) && prior) || n;
            }
            int strictCount = 0, broadCount = 0, shownCount = 0;
            foreach (bool v in strict.Values) if (v) strictCount++;
            foreach (bool v in broad.Values) if (v) broadCount++;
            foreach (bool v in shown.Values) if (v) shownCount++;

            var sb = new StringBuilder();
            sb.AppendLine("# Deliverable 2 measures: " + b.Title);
            sb.AppendLine();
            sb.AppendLine("- Changed-file entries categorised (not Other): " + (total - other) + " of " + total +
                          (total > 0 ? " (" + Math.Round(100.0 * (total - other) / total) + "%)" : "") + " — target 90%");
            sb.AppendLine("- Changed scenes/prefabs with an object name in the change (strict, A2 measure): " +
                          strictCount + " of " + strict.Count + " — target 60%");
            sb.AppendLine("- Changed scenes/prefabs the page describes inside (object, component or add/delete): " +
                          broadCount + " of " + broad.Count);
            sb.AppendLine("- Changed scenes/prefabs whose page entry names an object other than the asset itself: " +
                          shownCount + " of " + shown.Count);
            return sb.ToString();
        }
    }
}
