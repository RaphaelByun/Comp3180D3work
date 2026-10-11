// ChangeReport.cs
// ---------------------------------------------------------------------------
// Takes the commits from GitLogParser, runs every changed path through
// PathClassifier, and adds everything up into the numbers the ChangeLens
// window shows:
//
//   * how many commits, and the first and last date they cover
//   * how many "changed-file entries" there are in total
//     (one entry = one file touched by one commit, so a file edited in three
//      commits counts three times - that is what a git log actually reports)
//   * per category: how many were added / modified / deleted / renamed
//   * the CODE-FILE PERCENTAGE: what share of those entries are code files.
//     Unity ".meta" sidecars are counted as NOT code - this is the basis used
//     in the research proposal, and it matters, because a Unity repository
//     produces one .meta next to almost every asset, which would otherwise
//     inflate or deflate the figure depending on how you counted it.
//   * which top-level folders were touched
//
// It can also render the whole thing as a one-page markdown report.
//
// Still pure C#: no UnityEditor, no UnityEngine.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace ChangeLens.Editor
{
    /// <summary>
    /// The A / M / D / R tally for a single category.
    /// </summary>
    public class CategoryCounts
    {
        public int Added;
        public int Modified;
        public int Deleted;
        public int Renamed;   // includes copies, which git reports the same way
        public int Other;     // type changes and anything unexpected

        /// <summary>Every entry in this category, whatever its status.</summary>
        public int Total
        {
            get { return Added + Modified + Deleted + Renamed + Other; }
        }

        /// <summary>Adds one file change into this tally.</summary>
        public void Add(ChangeStatus status)
        {
            switch (status)
            {
                case ChangeStatus.Added: Added++; break;
                case ChangeStatus.Modified: Modified++; break;
                case ChangeStatus.Deleted: Deleted++; break;
                case ChangeStatus.Renamed: Renamed++; break;
                case ChangeStatus.Copied: Renamed++; break;
                default: Other++; break;
            }
        }
    }

    /// <summary>
    /// A finished, ready-to-display summary of one git log export.
    /// Build one with <see cref="Build"/>; never change it afterwards.
    /// </summary>
    public class ChangeReport
    {
        /// <summary>The commits this report was built from, newest first (git's own order).</summary>
        public List<CommitRecord> Commits = new List<CommitRecord>();

        public int CommitCount { get { return Commits.Count; } }

        /// <summary>Earliest commit date in the export, as "yyyy-MM-dd" ("" if unknown).</summary>
        public string FirstDate = "";

        /// <summary>Latest commit date in the export, as "yyyy-MM-dd" ("" if unknown).</summary>
        public string LastDate = "";

        /// <summary>One file touched by one commit = one entry.</summary>
        public int TotalFileEntries;

        /// <summary>How many of those entries are code files (.meta never counts).</summary>
        public int CodeFileEntries;

        /// <summary>
        /// CodeFileEntries as a percentage of TotalFileEntries, 0 when there is
        /// nothing to divide by. This is the headline number in the proposal.
        /// </summary>
        public float CodeFilePercent;

        /// <summary>The A/M/D/R tally for every category, including empty ones.</summary>
        public Dictionary<PathCategory, CategoryCounts> ByCategory =
            new Dictionary<PathCategory, CategoryCounts>();

        /// <summary>
        /// For .meta entries only: what kind of asset each sidecar belonged to.
        /// Useful for sanity-checking that .meta churn tracks real asset churn.
        /// </summary>
        public Dictionary<PathCategory, int> MetaBySibling =
            new Dictionary<PathCategory, int>();

        /// <summary>Top-level folders touched, most-changed first.</summary>
        public List<KeyValuePair<string, int>> FoldersTouched =
            new List<KeyValuePair<string, int>>();

        /// <summary>Where the export came from, purely for the report header.</summary>
        public string SourceLabel = "";

        // -------------------------------------------------------------------
        // BUILDING
        // -------------------------------------------------------------------

        /// <summary>
        /// Adds up a list of commits into a finished report.
        /// Safe to call with null or an empty list.
        /// </summary>
        public static ChangeReport Build(List<CommitRecord> commits, string sourceLabel = "")
        {
            var report = new ChangeReport();
            report.SourceLabel = sourceLabel ?? "";
            report.Commits = commits ?? new List<CommitRecord>();

            // Start every category at zero so the table never has holes in it.
            foreach (PathCategory category in PathClassifier.DisplayOrder)
            {
                report.ByCategory[category] = new CategoryCounts();
            }

            var folderCounts = new Dictionary<string, int>();

            foreach (CommitRecord commit in report.Commits)
            {
                // Track the date range as we go (ISO dates sort correctly as text).
                string day = commit.DateOnly;
                if (day.Length > 0)
                {
                    if (report.FirstDate.Length == 0 || string.CompareOrdinal(day, report.FirstDate) < 0)
                    {
                        report.FirstDate = day;
                    }
                    if (report.LastDate.Length == 0 || string.CompareOrdinal(day, report.LastDate) > 0)
                    {
                        report.LastDate = day;
                    }
                }

                foreach (FileChange change in commit.Changes)
                {
                    ClassifiedPath classified = PathClassifier.Classify(change.Path);

                    report.TotalFileEntries++;
                    report.ByCategory[classified.Category].Add(change.Status);

                    // The code-file percentage. A .meta lands in the Meta
                    // category, so it can never be counted as code here.
                    if (classified.Category == PathCategory.Code)
                    {
                        report.CodeFileEntries++;
                    }

                    // Record what kind of asset each .meta was sitting next to.
                    if (classified.IsMeta)
                    {
                        int existing;
                        report.MetaBySibling.TryGetValue(classified.SiblingCategory, out existing);
                        report.MetaBySibling[classified.SiblingCategory] = existing + 1;
                    }

                    string folder = PathClassifier.TopLevelFolder(change.Path);
                    int folderTally;
                    folderCounts.TryGetValue(folder, out folderTally);
                    folderCounts[folder] = folderTally + 1;
                }
            }

            report.CodeFilePercent = report.TotalFileEntries == 0
                ? 0f
                : (100f * report.CodeFileEntries) / report.TotalFileEntries;

            // Sort folders by how much changed in them, then alphabetically.
            foreach (var pair in folderCounts)
            {
                report.FoldersTouched.Add(pair);
            }
            report.FoldersTouched.Sort(delegate (KeyValuePair<string, int> a, KeyValuePair<string, int> b)
            {
                int byCount = b.Value.CompareTo(a.Value);
                return byCount != 0 ? byCount : string.CompareOrdinal(a.Key, b.Key);
            });

            return report;
        }

        // -------------------------------------------------------------------
        // DISPLAY HELPERS
        // -------------------------------------------------------------------

        /// <summary>"2024-02-19 to 2024-02-25", or "(no dates)" when empty.</summary>
        public string DateRangeText
        {
            get
            {
                if (FirstDate.Length == 0 && LastDate.Length == 0) return "(no dates)";
                if (FirstDate == LastDate) return FirstDate;
                return FirstDate + " to " + LastDate;
            }
        }

        /// <summary>The code-file percentage written the way the window shows it.</summary>
        public string CodeFilePercentText
        {
            get { return CodeFilePercent.ToString("0.0", CultureInfo.InvariantCulture) + "%"; }
        }

        /// <summary>The tally for a category, never null.</summary>
        public CategoryCounts CountsFor(PathCategory category)
        {
            CategoryCounts counts;
            return ByCategory.TryGetValue(category, out counts) ? counts : new CategoryCounts();
        }

        // -------------------------------------------------------------------
        // MARKDOWN
        // -------------------------------------------------------------------

        /// <summary>
        /// Renders the whole report as a one-page markdown document - the thing
        /// the window's "Export report (.md)" button writes to disk.
        /// </summary>
        public string ToMarkdown()
        {
            var sb = new StringBuilder();

            sb.AppendLine("# ChangeLens report");
            sb.AppendLine();
            if (SourceLabel.Length > 0)
            {
                sb.AppendLine("**Source export:** `" + SourceLabel + "`");
            }
            sb.AppendLine("**Generated:** " + DateTime.Now.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture));
            sb.AppendLine();

            // ---- Summary -------------------------------------------------
            sb.AppendLine("## Summary");
            sb.AppendLine();
            sb.AppendLine("| Measure | Value |");
            sb.AppendLine("| --- | --- |");
            sb.AppendLine("| Commits | " + CommitCount + " |");
            sb.AppendLine("| Date range | " + DateRangeText + " |");
            sb.AppendLine("| Changed-file entries | " + TotalFileEntries + " |");
            sb.AppendLine("| Code-file entries | " + CodeFileEntries + " |");
            sb.AppendLine("| Code-file percentage | " + CodeFilePercentText + " |");
            sb.AppendLine();
            sb.AppendLine("*One changed-file entry = one file touched by one commit. " +
                          "Unity `.meta` sidecars are counted as non-code.*");
            sb.AppendLine();

            // ---- Categories ----------------------------------------------
            sb.AppendLine("## Changes by category");
            sb.AppendLine();
            sb.AppendLine("| Category | Added | Modified | Deleted | Renamed | Total |");
            sb.AppendLine("| --- | ---: | ---: | ---: | ---: | ---: |");
            foreach (PathCategory category in PathClassifier.DisplayOrder)
            {
                CategoryCounts c = CountsFor(category);
                sb.AppendLine("| " + category + " | " + c.Added + " | " + c.Modified + " | " +
                              c.Deleted + " | " + c.Renamed + " | " + c.Total + " |");
            }
            sb.AppendLine();

            // ---- .meta breakdown -----------------------------------------
            if (MetaBySibling.Count > 0)
            {
                sb.AppendLine("## .meta sidecars, by the asset they belong to");
                sb.AppendLine();
                foreach (PathCategory category in PathClassifier.DisplayOrder)
                {
                    int count;
                    if (MetaBySibling.TryGetValue(category, out count) && count > 0)
                    {
                        sb.AppendLine("- " + category + ": " + count);
                    }
                }
                sb.AppendLine();
            }

            // ---- Folders --------------------------------------------------
            sb.AppendLine("## Top-level folders touched");
            sb.AppendLine();
            if (FoldersTouched.Count == 0)
            {
                sb.AppendLine("*(none)*");
            }
            else
            {
                foreach (var folder in FoldersTouched)
                {
                    sb.AppendLine("- `" + folder.Key + "` - " + folder.Value + " entries");
                }
            }
            sb.AppendLine();

            // ---- Commits --------------------------------------------------
            sb.AppendLine("## Commits");
            sb.AppendLine();
            foreach (CommitRecord commit in Commits)
            {
                sb.AppendLine("- `" + commit.ShortHash + "` " + commit.DateOnly + " - " +
                              commit.Subject + " (" + commit.Changes.Count + " files)");
            }
            sb.AppendLine();

            return sb.ToString();
        }
    }
}
