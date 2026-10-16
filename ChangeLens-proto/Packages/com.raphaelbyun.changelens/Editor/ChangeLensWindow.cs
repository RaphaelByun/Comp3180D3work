// ChangeLensWindow.cs
// ---------------------------------------------------------------------------
// The one and only screen of ChangeLens: an EditorWindow you open from
// Window > ChangeLens.
//
// What it does, top to bottom:
//   1. lets you type or browse to a git log export (.txt)
//   2. "Load" reads the file, parses it, and builds a ChangeReport
//   3. shows the summary block (commits, dates, entries, code-file percentage)
//   4. shows the category table with Added / Modified / Deleted / Renamed
//   5. shows a foldout list, one per commit, with its files inside
//   6. "Export report (.md)" writes the markdown report next to the export
//
// The UI is IMGUI (EditorGUILayout), which is the older "draw the whole
// window every frame" system. It is used here on purpose: it is the smallest
// amount of code for a tool window, and every widget is one readable line.
//
// This is the ONLY file in the package that touches UnityEditor. All of the
// actual thinking happens in GitLogParser, PathClassifier and ChangeReport.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace ChangeLens.Editor
{
    public class ChangeLensWindow : EditorWindow
    {
        // ---- state that lives as long as the window is open ---------------

        /// <summary>The path typed into the text field at the top.</summary>
        private string _exportPath = "";

        /// <summary>The report built by the last successful Load (null before that).</summary>
        private ChangeReport _report;

        /// <summary>A message shown under the buttons: what happened last.</summary>
        private string _status = "Choose a git log export, then press Load.";

        /// <summary>True when the last thing that happened was an error.</summary>
        private bool _statusIsError;

        /// <summary>Which commit foldouts are currently open, by commit index.</summary>
        private readonly HashSet<int> _openCommits = new HashSet<int>();

        /// <summary>How far the window is scrolled.</summary>
        private Vector2 _scroll;

        // The key we remember the last-used path under, so it survives a restart.
        private const string PathPrefsKey = "ChangeLens.LastExportPath";

        // -------------------------------------------------------------------
        // OPENING THE WINDOW
        // -------------------------------------------------------------------

        /// <summary>
        /// Puts "ChangeLens" in Unity's Window menu. Selecting it runs this.
        /// </summary>
        [MenuItem("Window/ChangeLens")]
        public static ChangeLensWindow ShowWindow()
        {
            ChangeLensWindow window = GetWindow<ChangeLensWindow>("ChangeLens");
            window.minSize = new Vector2(520f, 400f);
            window.Show();
            return window;
        }

        private void OnEnable()
        {
            // Remember whatever export was loaded last time.
            _exportPath = EditorPrefs.GetString(PathPrefsKey, "");
        }

        // -------------------------------------------------------------------
        // DRAWING
        // -------------------------------------------------------------------

        private void OnGUI()
        {
            DrawHeader();
            DrawSourceRow();
            DrawButtons();
            DrawStatus();

            EditorGUILayout.Space();

            _scroll = EditorGUILayout.BeginScrollView(_scroll);
            if (_report == null)
            {
                EditorGUILayout.HelpBox(
                    "No report yet.\n\n" +
                    "Produce an export with:\n" +
                    "    git -c core.quotepath=false log --first-parent --diff-merges=first-parent\n" +
                    "        --name-status --date=iso --since=<start> --until=<end> > week.txt\n\n" +
                    "then point the field above at that file and press Load.",
                    MessageType.Info);
            }
            else
            {
                DrawSummary(_report);
                EditorGUILayout.Space();
                DrawCategoryTable(_report);
                EditorGUILayout.Space();
                DrawFolders(_report);
                EditorGUILayout.Space();
                DrawCommits(_report);
            }
            EditorGUILayout.EndScrollView();
        }

        private void DrawHeader()
        {
            EditorGUILayout.Space();
            EditorGUILayout.LabelField("ChangeLens", EditorStyles.boldLabel);
            EditorGUILayout.LabelField(
                "Reads a git log --name-status export and groups the changed files.",
                EditorStyles.miniLabel);
            EditorGUILayout.Space();
        }

        /// <summary>The "Export file" text field with a Browse button beside it.</summary>
        private void DrawSourceRow()
        {
            EditorGUILayout.BeginHorizontal();
            _exportPath = EditorGUILayout.TextField("Export file", _exportPath);

            if (GUILayout.Button("Browse", GUILayout.Width(70f)))
            {
                string startFolder = GuessStartFolder(_exportPath);
                string chosen = EditorUtility.OpenFilePanel("Choose a git log export", startFolder, "txt");
                if (!string.IsNullOrEmpty(chosen))
                {
                    _exportPath = chosen;
                    GUI.FocusControl(null); // stop the text field showing stale text
                }
            }
            EditorGUILayout.EndHorizontal();
        }

        private void DrawButtons()
        {
            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("Load", GUILayout.Height(24f)))
            {
                LoadReport(_exportPath);
            }

            // Exporting only makes sense once something has been loaded.
            using (new EditorGUI.DisabledScope(_report == null))
            {
                if (GUILayout.Button("Export report (.md)", GUILayout.Height(24f)))
                {
                    ExportMarkdown();
                }
            }

            EditorGUILayout.EndHorizontal();
        }

        private void DrawStatus()
        {
            if (string.IsNullOrEmpty(_status)) return;
            EditorGUILayout.HelpBox(_status, _statusIsError ? MessageType.Error : MessageType.Info);
        }

        /// <summary>The five headline numbers.</summary>
        private void DrawSummary(ChangeReport report)
        {
            EditorGUILayout.LabelField("Summary", EditorStyles.boldLabel);
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            EditorGUILayout.LabelField("Commits", report.CommitCount.ToString());
            EditorGUILayout.LabelField("Date range", report.DateRangeText);
            EditorGUILayout.LabelField("Changed-file entries", report.TotalFileEntries.ToString());
            EditorGUILayout.LabelField("Code-file entries", report.CodeFileEntries.ToString());

            // The headline figure, drawn in bold so it is the thing you see.
            EditorGUILayout.LabelField("Code-file percentage", report.CodeFilePercentText,
                EditorStyles.boldLabel);

            EditorGUILayout.LabelField(
                "(one entry = one file touched by one commit; .meta counts as non-code)",
                EditorStyles.miniLabel);

            EditorGUILayout.EndVertical();
        }

        /// <summary>One row per category, with its A / M / D / R counts.</summary>
        private void DrawCategoryTable(ChangeReport report)
        {
            EditorGUILayout.LabelField("Changes by category", EditorStyles.boldLabel);
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            // Header row.
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.LabelField("Category", EditorStyles.miniBoldLabel, GUILayout.Width(120f));
            EditorGUILayout.LabelField("A", EditorStyles.miniBoldLabel, GUILayout.Width(45f));
            EditorGUILayout.LabelField("M", EditorStyles.miniBoldLabel, GUILayout.Width(45f));
            EditorGUILayout.LabelField("D", EditorStyles.miniBoldLabel, GUILayout.Width(45f));
            EditorGUILayout.LabelField("R", EditorStyles.miniBoldLabel, GUILayout.Width(45f));
            EditorGUILayout.LabelField("Total", EditorStyles.miniBoldLabel, GUILayout.Width(55f));
            EditorGUILayout.EndHorizontal();

            foreach (PathCategory category in PathClassifier.DisplayOrder)
            {
                CategoryCounts counts = report.CountsFor(category);

                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.LabelField(category.ToString(), GUILayout.Width(120f));
                EditorGUILayout.LabelField(counts.Added.ToString(), GUILayout.Width(45f));
                EditorGUILayout.LabelField(counts.Modified.ToString(), GUILayout.Width(45f));
                EditorGUILayout.LabelField(counts.Deleted.ToString(), GUILayout.Width(45f));
                EditorGUILayout.LabelField(counts.Renamed.ToString(), GUILayout.Width(45f));
                EditorGUILayout.LabelField(counts.Total.ToString(), GUILayout.Width(55f));
                EditorGUILayout.EndHorizontal();
            }

            EditorGUILayout.EndVertical();
        }

        private void DrawFolders(ChangeReport report)
        {
            EditorGUILayout.LabelField("Top-level folders touched", EditorStyles.boldLabel);
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);

            if (report.FoldersTouched.Count == 0)
            {
                EditorGUILayout.LabelField("(none)");
            }
            else
            {
                foreach (KeyValuePair<string, int> folder in report.FoldersTouched)
                {
                    EditorGUILayout.LabelField(folder.Key, folder.Value + " entries");
                }
            }

            EditorGUILayout.EndVertical();
        }

        /// <summary>A collapsible block per commit, listing its files when opened.</summary>
        private void DrawCommits(ChangeReport report)
        {
            EditorGUILayout.LabelField("Commits (" + report.CommitCount + ")", EditorStyles.boldLabel);

            for (int i = 0; i < report.Commits.Count; i++)
            {
                CommitRecord commit = report.Commits[i];

                string title = commit.ShortHash + "  " + commit.DateOnly + "  " +
                               Shorten(commit.Subject, 60) + "   (" + commit.Changes.Count + " files)";

                bool wasOpen = _openCommits.Contains(i);
                bool isOpen = EditorGUILayout.Foldout(wasOpen, title, true);

                if (isOpen != wasOpen)
                {
                    if (isOpen) _openCommits.Add(i);
                    else _openCommits.Remove(i);
                }

                if (!isOpen) continue;

                EditorGUI.indentLevel++;
                EditorGUILayout.LabelField("Author", commit.Author);

                foreach (FileChange change in commit.Changes)
                {
                    ClassifiedPath classified = PathClassifier.Classify(change.Path);

                    string label = StatusLetter(change.Status) + "  [" + classified.Category + "]";
                    string value = change.OldPath == null
                        ? change.Path
                        : change.OldPath + "  ->  " + change.Path;

                    EditorGUILayout.LabelField(label, value, EditorStyles.miniLabel);
                }
                EditorGUI.indentLevel--;

                EditorGUILayout.Space(2f);
            }
        }

        // -------------------------------------------------------------------
        // ACTIONS
        // -------------------------------------------------------------------

        /// <summary>
        /// Reads the file at <paramref name="path"/>, parses it and stores the
        /// resulting report. Public so ScreenshotBootstrap can drive the window.
        /// </summary>
        public void LoadReport(string path)
        {
            _openCommits.Clear();

            if (string.IsNullOrEmpty(path))
            {
                Fail("Type a path to a git log export, or press Browse.");
                return;
            }

            if (!File.Exists(path))
            {
                Fail("No file at:\n" + path);
                return;
            }

            try
            {
                string text = File.ReadAllText(path);
                List<CommitRecord> commits = GitLogParser.Parse(text);
                _report = ChangeReport.Build(commits, Path.GetFileName(path));

                _exportPath = path;
                EditorPrefs.SetString(PathPrefsKey, path);

                if (_report.CommitCount == 0)
                {
                    Fail("That file parsed, but no commits were found in it. " +
                         "Was it produced with 'git log --name-status'?");
                    return;
                }

                Succeed("Loaded " + _report.CommitCount + " commits and " +
                        _report.TotalFileEntries + " changed-file entries from " +
                        Path.GetFileName(path) + ".");
            }
            catch (Exception error)
            {
                // Anything unexpected is shown in the window rather than only
                // in the console, so the tool never fails silently.
                _report = null;
                Fail("Could not read that file: " + error.Message);
            }
        }

        /// <summary>
        /// Writes the markdown report beside the export that produced it.
        /// Public so ScreenshotBootstrap can press this button for you.
        /// </summary>
        public void ExportMarkdown()
        {
            if (_report == null) return;

            try
            {
                string folder = Path.GetDirectoryName(_exportPath);
                if (string.IsNullOrEmpty(folder)) folder = Directory.GetCurrentDirectory();

                string outputPath = Path.Combine(
                    folder,
                    Path.GetFileNameWithoutExtension(_exportPath) + "-changelens-report.md");

                File.WriteAllText(outputPath, _report.ToMarkdown());
                Succeed("Report written to:\n" + outputPath);
                Debug.Log("[ChangeLens] Report written to " + outputPath);
            }
            catch (Exception error)
            {
                Fail("Could not write the report: " + error.Message);
            }
        }

        // -------------------------------------------------------------------
        // SMALL HELPERS
        // -------------------------------------------------------------------

        private void Succeed(string message)
        {
            _status = message;
            _statusIsError = false;
            Repaint();
        }

        private void Fail(string message)
        {
            _status = message;
            _statusIsError = true;
            Repaint();
        }

        /// <summary>The single letter shown beside each file in the commit list.</summary>
        private static string StatusLetter(ChangeStatus status)
        {
            switch (status)
            {
                case ChangeStatus.Added: return "A";
                case ChangeStatus.Modified: return "M";
                case ChangeStatus.Deleted: return "D";
                case ChangeStatus.Renamed: return "R";
                case ChangeStatus.Copied: return "C";
                case ChangeStatus.TypeChanged: return "T";
                default: return "?";
            }
        }

        /// <summary>Cuts long commit subjects so the foldout title stays on one line.</summary>
        private static string Shorten(string text, int maxLength)
        {
            if (string.IsNullOrEmpty(text)) return "(no subject)";
            return text.Length <= maxLength ? text : text.Substring(0, maxLength - 1) + "...";
        }

        /// <summary>Opens the file dialog somewhere sensible.</summary>
        private static string GuessStartFolder(string currentPath)
        {
            try
            {
                if (!string.IsNullOrEmpty(currentPath))
                {
                    string folder = Path.GetDirectoryName(currentPath);
                    if (!string.IsNullOrEmpty(folder) && Directory.Exists(folder)) return folder;
                }
            }
            catch (Exception)
            {
                // A malformed path is not worth an error; just fall through.
            }
            return Application.dataPath;
        }
    }
}
