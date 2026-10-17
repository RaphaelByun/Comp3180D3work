// ProducerReport.cs
// ---------------------------------------------------------------------------
// The committed tier: the one-page report a PRODUCER reads.
//
// ChangeReport (the prototype) counts files for a developer. This page says
// the same facts in a producer's words, in two versions the study compares:
//
//   Baseline  - the week's changes and where the work went (code, scenes and
//               prefabs, art, audio), from the git log alone.
//   Treatment - the same page PLUS a section naming every changed scene and
//               prefab and what changed inside it (objects, components,
//               scripts), read from the asset text (AssetDiffParser) with
//               script names resolved through a GuidIndex or the AssetDatabase.
//
// Every line on the page is a fact computed from the repository; nothing is
// guessed or written by a language model. Each fact is also recorded as a
// Claim with the commits it came from, so the fidelity check (Deliverable 4)
// can be done by reading each commit's diff against a printed checklist.
//
// Pure C#, unit-tested.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace ChangeLens.Editor
{
    public enum ReportCondition
    {
        Baseline,
        Treatment
    }

    /// <summary>One checkable statement on the page and where it came from.</summary>
    public class Claim
    {
        public string Section = "";
        public string Text = "";
        public List<string> Commits = new List<string>();
    }

    public class ProducerReport
    {
        public ReportCondition Condition;
        public string Title = "";
        public ChangeReport Counts;
        public List<AssetChange> AssetChanges = new List<AssetChange>();
        public List<Claim> Claims = new List<Claim>();

        private IGuidResolver _resolver;

        /// <summary>The categories a producer reads as "areas of work", in page order.</summary>
        public static readonly PathCategory[] WorkAreas =
        {
            PathCategory.Code,
            PathCategory.ScenePrefab,
            PathCategory.Art,
            PathCategory.Audio
        };

        public static ProducerReport Build(ChangeReport counts, List<AssetChange> assetChanges,
                                           IGuidResolver resolver, ReportCondition condition, string title)
        {
            var report = new ProducerReport
            {
                Counts = counts ?? ChangeReport.Build(null),
                AssetChanges = assetChanges ?? new List<AssetChange>(),
                Condition = condition,
                Title = string.IsNullOrEmpty(title) ? "this project" : title,
                _resolver = resolver
            };
            return report;
        }

        // -------------------------------------------------------------------
        // WORDING
        // -------------------------------------------------------------------

        public static string AreaName(PathCategory category)
        {
            switch (category)
            {
                case PathCategory.Code: return "Code";
                case PathCategory.ScenePrefab: return "Scenes and prefabs";
                case PathCategory.Art: return "Art";
                case PathCategory.Audio: return "Audio";
                case PathCategory.DataConfig: return "Data and settings";
                case PathCategory.Meta: return "Unity import settings (.meta)";
                default: return "Other";
            }
        }

        private static string ShortArea(PathCategory category, int n)
        {
            switch (category)
            {
                case PathCategory.Code: return n + " code";
                case PathCategory.ScenePrefab: return n + (n == 1 ? " scene/prefab" : " scenes/prefabs");
                case PathCategory.Art: return n + " art";
                case PathCategory.Audio: return n + " audio";
                case PathCategory.DataConfig: return n + " data/settings";
                case PathCategory.Meta: return n + " .meta";
                default: return n + " other";
            }
        }

        /// <summary>
        /// A Unity type name as a producer reads it: "AudioSource" -> "Audio Source",
        /// with a few common types given plainer descriptions.
        /// </summary>
        public static string FriendlyType(string type)
        {
            switch (type)
            {
                case "Transform": return "position/rotation/scale";
                case "RectTransform": return "UI layout";
                case "GameObject": return "object setup";
                case "PrefabInstance": return "placed-prefab overrides";
                case "MonoBehaviour": return "script settings";
                case "Rigidbody":
                case "Rigidbody2D": return "physics body";
                default: return SplitCamel(type);
            }
        }

        public static string SplitCamel(string s)
        {
            if (string.IsNullOrEmpty(s)) return s;
            var sb = new StringBuilder();
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                bool boundary = i > 0 && char.IsUpper(c) &&
                                (char.IsLower(s[i - 1]) || (i + 1 < s.Length && char.IsLower(s[i + 1]) && char.IsUpper(s[i - 1])));
                if (boundary) sb.Append(' ');
                sb.Append(c);
            }
            return sb.ToString();
        }

        private static string ShortDate(string isoDay)
        {
            DateTime d;
            if (DateTime.TryParseExact(isoDay, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
                return d.ToString("ddd d MMM", CultureInfo.InvariantCulture);
            return isoDay;
        }

        private static string LongDate(string isoDay)
        {
            DateTime d;
            if (DateTime.TryParseExact(isoDay, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
                return d.ToString("d MMMM yyyy", CultureInfo.InvariantCulture);
            return isoDay;
        }

        /// <summary>"EmergencyLight script", or "an unidentified script" when no resolver knows the guid.</summary>
        private string ScriptLabel(string guid)
        {
            string name = GuidIndex.NameFor(_resolver, guid);
            return name == null ? "an unidentified script" : name + " script";
        }

        // -------------------------------------------------------------------
        // PAGE
        // -------------------------------------------------------------------

        /// <summary>Renders the page as markdown and fills <see cref="Claims"/>.</summary>
        public string ToMarkdown()
        {
            Claims.Clear();
            var sb = new StringBuilder();
            ChangeReport c = Counts;

            // ---- Header ----------------------------------------------------
            sb.AppendLine("# What changed: " + Title);
            sb.AppendLine();
            string range = c.FirstDate.Length == 0 ? "(no dates)"
                : c.FirstDate == c.LastDate ? LongDate(c.FirstDate)
                : LongDate(c.FirstDate) + " to " + LongDate(c.LastDate);
            // People who wrote the work, including the work a merge brought in,
            // not only the person who made the merge.
            int people = c.Commits.Select(x => x.Author)
                          .Concat(c.Commits.SelectMany(x => x.MergedCommits).Select(m => m.Author))
                          .Where(a => a.Length > 0).Distinct().Count();
            string headline = range + " · " + c.CommitCount + (c.CommitCount == 1 ? " change" : " changes") +
                              " by " + people + (people == 1 ? " person" : " people") +
                              " · " + c.TotalFileEntries + " file changes";
            sb.AppendLine("**" + headline + "**");
            AddClaim("Header", headline, AllHashes());
            sb.AppendLine();
            sb.AppendLine("*A \"file change\" is one file touched by one change; a file edited twice counts twice.*");
            sb.AppendLine();

            // ---- Where the work went ----------------------------------------
            sb.AppendLine("## Where the work went");
            sb.AppendLine();
            sb.AppendLine("| Area | File changes | Share of all file changes |");
            sb.AppendLine("| --- | ---: | ---: |");
            foreach (PathCategory area in WorkAreas)
            {
                int n = c.CountsFor(area).Total;
                string row = AreaName(area) + ": " + n + " (" + Percent(n, c.TotalFileEntries) + ")";
                sb.AppendLine("| " + AreaName(area) + " | " + n + " | " + Percent(n, c.TotalFileEntries) + " |");
                AddClaim("Where the work went", row, HashesTouching(area));
            }
            int data = c.CountsFor(PathCategory.DataConfig).Total;
            int meta = c.CountsFor(PathCategory.Meta).Total;
            int other = c.CountsFor(PathCategory.Other).Total;
            sb.AppendLine();
            string supporting = "Supporting files: " + data + " data and settings, " + meta +
                                " Unity import settings (.meta), " + other + " other.";
            sb.AppendLine(supporting);
            AddClaim("Where the work went", supporting, AllHashes());
            sb.AppendLine();

            // On a tie every area with the top count is named, so the page never
            // calls one area the largest when another is just as large.
            int top = WorkAreas.Max(a => c.CountsFor(a).Total);
            List<PathCategory> largest = WorkAreas.Where(a => c.CountsFor(a).Total == top).ToList();
            if (top > 0)
            {
                string line = largest.Count == 1
                    ? "Largest area this week: **" + AreaName(largest[0]) + "** (" +
                      top + " of " + c.TotalFileEntries + " file changes)."
                    : "Largest areas this week: " + JoinAnd(largest.Select(a => "**" + AreaName(a) + "**").ToList()) +
                      " (" + top + " each of " + c.TotalFileEntries + " file changes).";
                sb.AppendLine(line);
                AddClaim("Where the work went", line.Replace("**", ""),
                         largest.SelectMany(HashesTouching).Distinct().ToList());
                sb.AppendLine();
            }

            // ---- Changes ----------------------------------------------------
            sb.AppendLine("## Changes, newest first");
            sb.AppendLine();
            sb.AppendLine("| Date | Change (as its author described it) | Files | What kind of files |");
            sb.AppendLine("| --- | --- | ---: | --- |");
            foreach (CommitRecord commit in c.Commits)
            {
                string kinds = KindsFor(commit);
                sb.AppendLine("| " + ShortDate(commit.DateOnly) + " | " + EscapeCell(commit.Subject) + " | " +
                              commit.Changes.Count + " | " + kinds + " |");
                AddClaim("Changes", commit.DateOnly + " \"" + commit.Subject + "\": " + commit.Changes.Count +
                                    " files (" + kinds + ")", new List<string> { commit.Hash });
                AppendMergedRows(sb, commit);
            }
            sb.AppendLine();

            // ---- Treatment only: the asset layer ---------------------------
            if (Condition == ReportCondition.Treatment)
            {
                AppendAssetSection(sb);
            }

            sb.AppendLine("---");
            // The counting rule goes on the footer line, not a new line, so line
            // numbers that study instruments cite stay put.
            sb.AppendLine("*Generated by ChangeLens from the project's version history. " +
                          (Condition == ReportCondition.Treatment
                              ? "Version B. In \"and N more\", scripts the project does not contain " +
                                "(such as Unity's own UI scripts) count together as one."
                              : "Version A.") + "*");
            return sb.ToString();
        }

        /// <summary>The most brought-in commits listed under one merge row.</summary>
        public const int MergedRowsShown = 5;

        /// <summary>
        /// Under a merge row: who wrote the work it brought in, then that work's
        /// own changes (newest first, up to <see cref="MergedRowsShown"/>). The
        /// merge row's file count is everything the merge brought in.
        /// </summary>
        private void AppendMergedRows(StringBuilder sb, CommitRecord merge)
        {
            List<CommitRecord> brought = merge.MergedCommits;
            if (brought.Count == 0) return;

            List<string> authors = brought.Select(m => m.Author).Where(a => a.Length > 0).Distinct()
                                          .Select(PersonName).ToList();
            string summary = "↳ brings in " + brought.Count + (brought.Count == 1 ? " change" : " changes") +
                             (authors.Count > 0 ? " by " + Cap(authors, 4) : "");
            sb.AppendLine("|  | " + EscapeCell(summary) + " |  |  |");
            AddClaim("Changes", "\"" + merge.Subject + "\" " + summary.Substring(2), new List<string> { merge.Hash });

            foreach (CommitRecord m in brought.Take(MergedRowsShown))
            {
                string who = PersonName(m.Author);
                sb.AppendLine("| " + ShortDate(m.DateOnly) + " | ↳ " + EscapeCell(m.Subject) +
                              (who.Length > 0 ? " (" + EscapeCell(who) + ")" : "") + " |  |  |");
                AddClaim("Changes", m.DateOnly + " \"" + m.Subject + "\" by " + who + ", brought in by \"" +
                                    merge.Subject + "\"", new List<string> { m.Hash });
            }
            if (brought.Count > MergedRowsShown)
                sb.AppendLine("|  | ↳ and " + (brought.Count - MergedRowsShown) + " more |  |  |");
        }

        /// <summary>"Jane Dev &lt;jane@example.com&gt;" -> "Jane Dev".</summary>
        public static string PersonName(string author)
        {
            if (string.IsNullOrEmpty(author)) return "";
            int lt = author.IndexOf(" <", StringComparison.Ordinal);
            return lt > 0 ? author.Substring(0, lt).Trim() : author.Trim();
        }

        private void AppendAssetSection(StringBuilder sb)
        {
            sb.AppendLine("## Scenes and prefabs changed");
            sb.AppendLine();
            if (AssetChanges.Count == 0)
            {
                sb.AppendLine("*No scenes or prefabs changed.*");
                sb.AppendLine();
                return;
            }

            var subjects = new Dictionary<string, string>();
            foreach (CommitRecord commit in Counts.Commits) subjects[commit.Hash] = commit.Subject;

            // Group by asset, keeping first-seen (newest-first) order. An asset
            // renamed or moved during the week is keyed on its final path, so
            // its earlier changes under the old path are listed with it.
            var order = new List<string>();
            var byPath = new Dictionary<string, List<AssetChange>>();
            List<string> finalPaths = FinalPaths(AssetChanges);
            for (int k = 0; k < AssetChanges.Count; k++)
            {
                AssetChange a = AssetChanges[k];
                string key = finalPaths[k];
                if (!byPath.ContainsKey(key)) { byPath[key] = new List<AssetChange>(); order.Add(key); }
                byPath[key].Add(a);
            }

            // Busiest assets first so the eye lands on what moved most.
            order = order.OrderByDescending(p => byPath[p].Count)
                         .ThenByDescending(p => byPath[p].Sum(x => x.LinesAdded + x.LinesRemoved))
                         .ThenBy(p => p, StringComparer.Ordinal).ToList();

            sb.AppendLine(order.Count + (order.Count == 1 ? " scene or prefab" : " scenes and prefabs") +
                          " changed. Each is listed with what changed inside it.");
            AddClaim("Scenes and prefabs changed", order.Count + " scenes and prefabs changed",
                     AssetChanges.Select(a => a.CommitHash).Distinct().ToList());
            sb.AppendLine();

            // Assets that went through exactly the same changes (nine airlock
            // prefabs edited by the same two commits, say) are listed once, so
            // the page stays readable on a week of bulk edits.
            var groups = new List<List<string>>();
            var groupOf = new Dictionary<string, List<string>>();
            foreach (string path in order)
            {
                string key = string.Join("\n", byPath[path].Select(a =>
                {
                    List<string> ignored;
                    return a.CommitHash + "|" + (byPath[path][0].IsScene ? "s" : "p") + "|" +
                           (a.Path == path ? "" : a.Path) + "|" + DescribeInside(a, out ignored);
                }));
                List<string> group;
                if (!groupOf.TryGetValue(key, out group))
                {
                    group = new List<string>();
                    groupOf[key] = group;
                    groups.Add(group);
                }
                group.Add(path);
            }

            foreach (List<string> group in groups)
            {
                List<AssetChange> changes = byPath[group[0]];
                AssetChange first = changes[0];
                string kind = first.IsScene ? "scene" : "prefab";
                string label;
                if (group.Count == 1)
                {
                    label = AssetDiffParser.AssetNameOf(group[0]);
                    sb.AppendLine("**" + label + "** (" + kind + ", in `" + FolderOf(group[0]) + "`)");
                }
                else
                {
                    var assetNames = group.Select(AssetDiffParser.AssetNameOf).ToList();
                    label = group.Count + " " + kind + "s (" + string.Join(", ", assetNames) + ")";
                    sb.AppendLine("**" + group.Count + " " + kind + "s with the same changes:** " +
                                  string.Join(", ", assetNames) + " (in `" + CommonFolder(group) + "`)");
                }

                for (int i = 0; i < changes.Count; i++)
                {
                    AssetChange a = changes[i];
                    string subject;
                    subjects.TryGetValue(a.CommitHash, out subject);
                    string what = DescribeInside(a, out List<string> names);
                    // A change made before a later rename or move says where the asset was then.
                    if (a.Path != group[0]) what = what.TrimEnd('.') + " (then at `" + a.Path + "`).";
                    string line = "- " + (subject != null ? "\"" + subject + "\": " : "") + what;
                    sb.AppendLine(line);
                    AddClaim("Scenes and prefabs changed", label + " — " + line.Substring(2),
                             new List<string> { a.CommitHash });

                    // Object names from every asset in the group for this change.
                    var allNames = new List<string>(names);
                    foreach (string other in group.Skip(1))
                    {
                        List<string> more;
                        DescribeInside(byPath[other][i], out more);
                        allNames.AddRange(more);
                    }
                    allNames = allNames.Distinct().ToList();
                    if (allNames.Count > 0)
                    {
                        string objects = "  - objects named in the change: " + Cap(allNames, 6);
                        sb.AppendLine(objects);
                        AddClaim("Scenes and prefabs changed", label + " —" + objects.Substring(3),
                                 new List<string> { a.CommitHash });
                    }
                }
                sb.AppendLine();
            }
        }

        /// <summary>
        /// For each change (in the given newest-first order), the path its asset
        /// has at the end of the week. A rename or move maps every OLDER change
        /// at the old path onto the new one; a newer file that reuses the old
        /// path is not affected, because the mapping only applies past the rename.
        /// </summary>
        public static List<string> FinalPaths(List<AssetChange> newestFirst)
        {
            var result = new List<string>();
            var finalOf = new Dictionary<string, string>();
            foreach (AssetChange a in newestFirst ?? new List<AssetChange>())
            {
                string final;
                if (!finalOf.TryGetValue(a.Path, out final)) final = a.Path;
                result.Add(final);
                if (!string.IsNullOrEmpty(a.RenamedFrom) && a.RenamedFrom != a.Path)
                    finalOf[a.RenamedFrom] = final;
            }
            return result;
        }

        /// <summary>"a, b, c and 4 more" once a list passes <paramref name="max"/> items.</summary>
        public static string Cap(List<string> items, int max)
        {
            if (items.Count <= max) return string.Join(", ", items);
            return string.Join(", ", items.Take(max)) + " and " + (items.Count - max) + " more";
        }

        /// <summary>"a", "a and b", "a, b and c".</summary>
        public static string JoinAnd(List<string> items)
        {
            if (items.Count <= 1) return items.Count == 0 ? "" : items[0];
            return string.Join(", ", items.Take(items.Count - 1)) + " and " + items[items.Count - 1];
        }

        private static string CommonFolder(List<string> paths)
        {
            string common = FolderOf(paths[0]);
            foreach (string p in paths.Skip(1))
            {
                string folder = FolderOf(p);
                while (common.Length > 0 && !(folder == common || folder.StartsWith(common + "/", StringComparison.Ordinal)))
                {
                    int slash = common.LastIndexOf('/');
                    common = slash > 0 ? common.Substring(0, slash) : "";
                }
            }
            return common.Length == 0 ? "(root)" : common;
        }

        /// <summary>
        /// One plain sentence about what changed inside an asset in one commit,
        /// plus the object names (other than the asset's own) found in the change.
        /// </summary>
        public string DescribeInside(AssetChange a, out List<string> names)
        {
            names = a.ObjectNames.Where(n => n != a.AssetName).ToList();
            var parts = new List<string>();

            if (a.FileAdded) parts.Add("new " + (a.IsScene ? "scene" : "prefab") + " added");
            if (a.FileDeleted) parts.Add((a.IsScene ? "scene" : "prefab") + " deleted");
            if (!string.IsNullOrEmpty(a.RenamedFrom) && a.RenamedFrom != a.Path)
            {
                bool sameFolder = FolderOf(a.RenamedFrom) == FolderOf(a.Path);
                bool sameName = AssetDiffParser.AssetNameOf(a.RenamedFrom) == a.AssetName;
                string moved;
                if (sameName && !sameFolder) moved = "moved from `" + FolderOf(a.RenamedFrom) + "`";
                else if (sameFolder) moved = "renamed from " + AssetDiffParser.AssetNameOf(a.RenamedFrom);
                else moved = "moved and renamed from `" + a.RenamedFrom + "`";
                parts.Add(a.Rebuilt ? moved + " and rebuilt" : moved);
            }

            // A rebuilt asset's diff shows every block as new, so it says nothing
            // about what changed inside.
            if (!a.FileAdded && !a.FileDeleted && !a.Rebuilt)
            {
                var added = new List<string>();
                foreach (string t in a.AddedTypes.Where(t => t != "MonoBehaviour" && t != "GameObject"))
                    added.Add(FriendlyType(t));
                foreach (string g in a.AddedScriptGuids) added.Add(ScriptLabel(g));
                if (a.AddedTypes.Contains("GameObject")) added.Insert(0, "new objects");
                if (added.Count > 0) parts.Add("added " + Cap(added.Distinct().ToList(), 4));

                var removed = new List<string>();
                foreach (string t in a.RemovedTypes.Where(t => t != "MonoBehaviour" && t != "GameObject"))
                    removed.Add(FriendlyType(t));
                foreach (string g in a.RemovedScriptGuids) removed.Add(ScriptLabel(g));
                if (a.RemovedTypes.Contains("GameObject")) removed.Insert(0, "objects");
                if (removed.Count > 0) parts.Add("removed " + Cap(removed.Distinct().ToList(), 4));

                var edited = new List<string>();
                foreach (string t in a.TypesTouched)
                {
                    if (a.AddedTypes.Contains(t) || a.RemovedTypes.Contains(t)) continue;
                    if (t == "MonoBehaviour")
                    {
                        if (a.TouchedScriptGuids.Count > 0)
                            foreach (string g in a.TouchedScriptGuids) edited.Add(ScriptLabel(g) + " settings");
                        else edited.Add("script settings");
                    }
                    else edited.Add(FriendlyType(t));
                }
                if (edited.Count > 0) parts.Add("edited " + Cap(edited.Distinct().ToList(), 4));
            }

            if (parts.Count == 0) parts.Add("changed (" + (a.LinesAdded + a.LinesRemoved) + " lines)");
            return string.Join("; ", parts) + ".";
        }

        // -------------------------------------------------------------------
        // FIDELITY CHECKLIST (Deliverable 4)
        // -------------------------------------------------------------------

        /// <summary>
        /// A printable checklist: every claim on the page with the commits to
        /// open, and a Supported / Contradicted / Unclear column to fill by hand.
        /// </summary>
        /// <summary>
        /// How the scorer opens a commit. Plain `git show` prints a merge as a
        /// combined diff, which is usually empty, so the checklist asks for the
        /// first-parent diff: the same view the export counts.
        /// </summary>
        public const string ChecklistInstruction =
            "Open each commit's diff (`git show --diff-merges=first-parent <hash>`) and mark every claim. " +
            "For a merge, `git log --no-merges <hash>^1..<hash>` lists the changes it brought in. " +
            "Pass rule (A2): none contradicted and at least 90% supported.";

        public string FidelityChecklistMarkdown()
        {
            if (Claims.Count == 0) ToMarkdown();
            var sb = new StringBuilder();
            sb.AppendLine("# Fidelity checklist: " + Title + " (" +
                          (Condition == ReportCondition.Treatment ? "Version B, treatment" : "Version A, baseline") + ")");
            sb.AppendLine();
            sb.AppendLine(ChecklistInstruction);
            sb.AppendLine();
            sb.AppendLine("| # | Section | Claim | Commits | S / C / U |");
            sb.AppendLine("| ---: | --- | --- | --- | --- |");
            for (int i = 0; i < Claims.Count; i++)
            {
                Claim cl = Claims[i];
                string hashes = cl.Commits.Count > 4
                    ? cl.Commits.Count + " commits (all)"
                    : string.Join(", ", cl.Commits.Select(h => h.Length >= 7 ? h.Substring(0, 7) : h));
                sb.AppendLine("| " + (i + 1) + " | " + cl.Section + " | " + EscapeCell(cl.Text) + " | " + hashes + " |  |");
            }
            sb.AppendLine();
            sb.AppendLine("Supported: ___ of " + Claims.Count + " · Contradicted: ___ · Unclear: ___");
            return sb.ToString();
        }

        // -------------------------------------------------------------------
        // SMALL HELPERS
        // -------------------------------------------------------------------

        private string KindsFor(CommitRecord commit)
        {
            var counts = new Dictionary<PathCategory, int>();
            foreach (FileChange ch in commit.Changes)
            {
                PathCategory cat = PathClassifier.CategoryOf(ch.Path);
                int n;
                counts.TryGetValue(cat, out n);
                counts[cat] = n + 1;
            }
            var parts = new List<string>();
            foreach (PathCategory cat in PathClassifier.DisplayOrder)
            {
                int n;
                if (counts.TryGetValue(cat, out n) && n > 0) parts.Add(ShortArea(cat, n));
            }
            return parts.Count == 0 ? "—" : string.Join(" · ", parts);
        }

        private List<string> AllHashes()
        {
            return Counts.Commits.Select(x => x.Hash).ToList();
        }

        /// <summary>
        /// Commits with a file in the category. A zero count is a claim about
        /// every commit ("none of them touched audio"), so it points at all of them.
        /// </summary>
        private List<string> HashesTouching(PathCategory category)
        {
            List<string> hashes = Counts.Commits.Where(x => x.Changes.Any(ch => PathClassifier.CategoryOf(ch.Path) == category))
                                                .Select(x => x.Hash).ToList();
            return hashes.Count > 0 ? hashes : AllHashes();
        }

        private void AddClaim(string section, string text, List<string> commits)
        {
            Claims.Add(new Claim { Section = section, Text = text, Commits = commits ?? new List<string>() });
        }

        private static string Percent(int n, int total)
        {
            if (total == 0) return "0%";
            return RoundedPercent(n, total).ToString(CultureInfo.InvariantCulture) + "%";
        }

        /// <summary>
        /// n of total as a whole percent, with a half rounded up (1 of 8 is 13%),
        /// the way a reader checking by hand rounds. Math.Round's default rounds
        /// a half to the even number (12%). Integer maths, so no float error.
        /// </summary>
        public static long RoundedPercent(int n, int total)
        {
            if (total <= 0) return 0;
            return (200L * n + total) / (2L * total);
        }

        private static string FolderOf(string path)
        {
            int slash = path.LastIndexOf('/');
            return slash > 0 ? path.Substring(0, slash) : "(root)";
        }

        private static string EscapeCell(string text)
        {
            return (text ?? "").Replace("|", "\\|");
        }
    }
}
