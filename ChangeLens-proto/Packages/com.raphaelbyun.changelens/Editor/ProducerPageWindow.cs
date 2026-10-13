// ProducerPageWindow.cs
// ---------------------------------------------------------------------------
// The committed tier inside the Editor: Window > ChangeLens Producer Page.
//
// ChangeLensWindow (the prototype) reads a log file and sorts files. This
// window shows what a producer actually reads in the study:
//   1. "From repository": pick a git repository and a week, press Generate.
//      ChangeLens runs git itself (WeekExport.FromGit) and builds both pages.
//   2. "Frozen study week": pick a folder that holds an export/ folder (for
//      example study/week2-2021-07-19) and the pages are rebuilt from those
//      saved files, so you see exactly what a participant sees.
//   3. Flip between Version A (baseline) and Version B (treatment, names the
//      scenes and prefabs) with the toolbar.
//   4. "Save study files" writes the export plus both reports, the fidelity
//      checklists and the naming measures into a folder you choose.
//
// The page is the same markdown the study prints; it is drawn here with a
// tiny renderer (headings, tables, bullets, bold) rather than a web view.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEngine;

namespace ChangeLens.Editor
{
    public class ProducerPageWindow : EditorWindow
    {
        private enum Source { Repository, FrozenWeek }

        private Source _source = Source.Repository;
        private string _repoPath = "";
        private string _weekStart = "";
        private int _days = 7;
        private string _frozenFolder = "";

        private WeekExport _export;
        private string _title = "";
        private ProducerReport _baseline;
        private ProducerReport _treatment;
        private int _version = 1; // 0 = A baseline, 1 = B treatment
        private List<string> _lines = new List<string>();

        private string _status = "Pick a source, then press Generate.";
        private bool _statusIsError;
        private Vector2 _scroll;
        private GUIStyle _body, _heading, _cell, _cellBold;

        private const string RepoKey = "ChangeLens.Producer.Repo";
        private const string WeekKey = "ChangeLens.Producer.Week";
        private const string FrozenKey = "ChangeLens.Producer.Frozen";

        [MenuItem("Window/ChangeLens Producer Page")]
        public static ProducerPageWindow ShowWindow()
        {
            ProducerPageWindow window = GetWindow<ProducerPageWindow>("ChangeLens Producer Page");
            window.minSize = new Vector2(640f, 480f);
            window.Show();
            return window;
        }

        private void OnEnable()
        {
            _repoPath = EditorPrefs.GetString(RepoKey, "");
            _weekStart = EditorPrefs.GetString(WeekKey, "");
            _frozenFolder = EditorPrefs.GetString(FrozenKey, "");
        }

        // -------------------------------------------------------------------
        // DRAWING
        // -------------------------------------------------------------------

        private void OnGUI()
        {
            MakeStyles();

            EditorGUILayout.Space();
            _source = (Source)GUILayout.Toolbar((int)_source, new[] { "From repository", "Frozen study week" });
            EditorGUILayout.Space();

            if (_source == Source.Repository) DrawRepositoryInputs();
            else DrawFrozenInputs();

            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("Generate", GUILayout.Height(24f))) Generate();
            using (new EditorGUI.DisabledScope(_export == null))
            {
                if (GUILayout.Button("Save study files...", GUILayout.Height(24f))) SaveStudyFiles();
            }
            EditorGUILayout.EndHorizontal();

            if (!string.IsNullOrEmpty(_status))
                EditorGUILayout.HelpBox(_status, _statusIsError ? MessageType.Error : MessageType.Info);

            if (_baseline == null) return;

            EditorGUILayout.Space();
            int chosen = GUILayout.Toolbar(_version, new[] { "Version A (baseline)", "Version B (treatment)" });
            if (chosen != _version)
            {
                _version = chosen;
                ShowVersion();
            }

            _scroll = EditorGUILayout.BeginScrollView(_scroll);
            DrawMarkdown(_lines);
            EditorGUILayout.EndScrollView();
        }

        private void DrawRepositoryInputs()
        {
            EditorGUILayout.BeginHorizontal();
            _repoPath = EditorGUILayout.TextField("Repository", _repoPath);
            if (GUILayout.Button("Browse", GUILayout.Width(70f)))
            {
                string chosen = EditorUtility.OpenFolderPanel("Choose a git repository", _repoPath, "");
                if (!string.IsNullOrEmpty(chosen)) { _repoPath = chosen; GUI.FocusControl(null); }
            }
            EditorGUILayout.EndHorizontal();
            _weekStart = EditorGUILayout.TextField(new GUIContent("Week starts", "yyyy-mm-dd, read as midnight UTC"), _weekStart);
            _days = Mathf.Clamp(EditorGUILayout.IntField("Days", _days), 1, 31);
            EditorGUILayout.LabelField("Week start as yyyy-mm-dd, e.g. 2021-07-19. Weeks run from midnight UTC.", EditorStyles.miniLabel);
        }

        private void DrawFrozenInputs()
        {
            EditorGUILayout.BeginHorizontal();
            _frozenFolder = EditorGUILayout.TextField("Study week folder", _frozenFolder);
            if (GUILayout.Button("Browse", GUILayout.Width(70f)))
            {
                string chosen = EditorUtility.OpenFolderPanel("Choose a study week (holds export/)", _frozenFolder, "");
                if (!string.IsNullOrEmpty(chosen)) { _frozenFolder = chosen; GUI.FocusControl(null); }
            }
            EditorGUILayout.EndHorizontal();
            EditorGUILayout.LabelField("e.g. study/week2-2021-07-19 in the project repository", EditorStyles.miniLabel);
        }

        // -------------------------------------------------------------------
        // ACTIONS (public so a batch or screenshot helper can drive them)
        // -------------------------------------------------------------------

        public void Generate()
        {
            try
            {
                if (_source == Source.Repository) GenerateFromRepository();
                else GenerateFromFrozen();
            }
            catch (Exception error)
            {
                ClearReports();
                Fail("Could not build the page: " + error.Message);
            }
            finally
            {
                EditorUtility.ClearProgressBar();
            }
        }

        public void GenerateFromRepository(string repo, string weekStart, int days)
        {
            _source = Source.Repository;
            _repoPath = repo;
            _weekStart = weekStart;
            _days = days;
            Generate();
        }

        public void GenerateFromFrozen(string folder)
        {
            _source = Source.FrozenWeek;
            _frozenFolder = folder;
            Generate();
        }

        private void GenerateFromRepository()
        {
            if (!Directory.Exists(_repoPath)) { Fail("No folder at:\n" + _repoPath); return; }
            DateTime start;
            if (!DateTime.TryParseExact(_weekStart.Trim(), "yyyy-MM-dd",
                    System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out start))
            {
                Fail("Week start must look like 2021-07-19.");
                return;
            }
            string until = start.AddDays(_days).ToString("yyyy-MM-dd");

            EditorUtility.DisplayProgressBar("ChangeLens", "Running git log for the week...", 0.3f);
            _export = WeekExport.FromGit(_repoPath, _weekStart.Trim(), until);
            _title = Path.GetFileName(_repoPath.TrimEnd('/', '\\')) + " week of " + _weekStart.Trim();
            EditorPrefs.SetString(RepoKey, _repoPath);
            EditorPrefs.SetString(WeekKey, _weekStart.Trim());
            BuildReports();
        }

        private void GenerateFromFrozen()
        {
            string exportFolder = Path.Combine(_frozenFolder, "export");
            if (!File.Exists(Path.Combine(exportFolder, WeekExport.LogFile)))
            {
                Fail("No export/" + WeekExport.LogFile + " inside:\n" + _frozenFolder);
                return;
            }
            _export = WeekExport.FromFolder(exportFolder);
            _title = TitleFromSavedReport(_frozenFolder) ?? Path.GetFileName(_frozenFolder.TrimEnd('/', '\\'));
            EditorPrefs.SetString(FrozenKey, _frozenFolder);
            BuildReports();
        }

        private void BuildReports()
        {
            _baseline = _export.BuildReport(ReportCondition.Baseline, _title);
            _treatment = _export.BuildReport(ReportCondition.Treatment, _title);
            ShowVersion();
            _scroll = Vector2.zero;

            if (_baseline.Counts.CommitCount == 0)
                Fail("No commits found for that week. Check the dates and the repository.");
            else
                Succeed(_title + ": " + _baseline.Counts.CommitCount + " changes, " +
                        _baseline.Counts.TotalFileEntries + " file changes.");
        }

        private void SaveStudyFiles()
        {
            string folder = EditorUtility.SaveFolderPanel("Save the study files into", _frozenFolder, "");
            if (string.IsNullOrEmpty(folder)) return;
            try
            {
                _export.SaveTo(Path.Combine(folder, "export"));
                Succeed(StudyExport.WriteStudyFiles(_export, folder, _title) + "\nSaved to " + folder);
            }
            catch (Exception error)
            {
                Fail("Could not save: " + error.Message);
            }
        }

        /// <summary>A saved report starts "# What changed: &lt;title&gt;"; reuse that title.</summary>
        private static string TitleFromSavedReport(string folder)
        {
            string saved = Path.Combine(folder, "report-A-baseline.md");
            if (!File.Exists(saved)) return null;
            foreach (string line in File.ReadAllLines(saved))
            {
                const string prefix = "# What changed: ";
                if (line.StartsWith(prefix)) return line.Substring(prefix.Length).Trim();
            }
            return null;
        }

        /// <summary>0 shows Version A (baseline), 1 shows Version B (treatment).</summary>
        public void SelectVersion(int version)
        {
            _version = Mathf.Clamp(version, 0, 1);
            _scroll = Vector2.zero;
            if (_baseline != null) ShowVersion();
        }

        private void ShowVersion()
        {
            ProducerReport report = _version == 0 ? _baseline : _treatment;
            _lines = new List<string>(report.ToMarkdown().Replace("\r", "").Split('\n'));
            Repaint();
        }

        private void ClearReports()
        {
            _export = null;
            _baseline = _treatment = null;
            _lines.Clear();
        }

        // -------------------------------------------------------------------
        // A VERY SMALL MARKDOWN RENDERER
        // -------------------------------------------------------------------

        private void DrawMarkdown(List<string> lines)
        {
            int i = 0;
            while (i < lines.Count)
            {
                string line = lines[i];
                if (line.StartsWith("|"))
                {
                    var table = new List<string>();
                    while (i < lines.Count && lines[i].StartsWith("|")) table.Add(lines[i++]);
                    DrawTable(table);
                    continue;
                }
                if (line.StartsWith("# ")) GUILayout.Label(Inline(line.Substring(2)), _heading);
                else if (line.StartsWith("## "))
                {
                    EditorGUILayout.Space(6f);
                    GUILayout.Label(Inline(line.Substring(3)), EditorStyles.boldLabel);
                }
                else if (line.StartsWith("  - ")) Indented(2, "◦ " + line.Substring(4));
                else if (line.StartsWith("- ")) Indented(1, "• " + line.Substring(2));
                else if (line.Trim().Length == 0) EditorGUILayout.Space(4f);
                else if (line.Trim() == "---")
                {
                    EditorGUILayout.Space(4f);
                    Rect rule = EditorGUILayout.GetControlRect(false, 1f);
                    EditorGUI.DrawRect(rule, new Color(0.5f, 0.5f, 0.5f, 0.5f));
                }
                else GUILayout.Label(Inline(line), _body);
                i++;
            }
        }

        private void Indented(int level, string text)
        {
            EditorGUILayout.BeginHorizontal();
            GUILayout.Space(14f * level);
            GUILayout.Label(Inline(text), _body);
            EditorGUILayout.EndHorizontal();
        }

        private void DrawTable(List<string> rows)
        {
            var parsed = new List<List<string>>();
            foreach (string row in rows)
            {
                List<string> cells = SplitRow(row);
                if (!cells.TrueForAll(c => Regex.IsMatch(c, @"^:?-{3,}:?$"))) parsed.Add(cells); // skip the --- line
            }
            if (parsed.Count == 0) return;

            // Fixed widths per column, shared by every row so the columns line up:
            // each column gets room in proportion to its longest cell (capped).
            int columns = parsed[0].Count;
            var weight = new float[columns];
            foreach (List<string> cells in parsed)
                for (int c = 0; c < columns && c < cells.Count; c++)
                    weight[c] = Mathf.Max(weight[c], Mathf.Clamp(cells[c].Length, 6, 60));
            float total = 0f;
            foreach (float w in weight) total += w;
            float available = Mathf.Max(200f, position.width - 50f);

            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            for (int r = 0; r < parsed.Count; r++)
            {
                EditorGUILayout.BeginHorizontal();
                for (int c = 0; c < columns; c++)
                {
                    string cell = c < parsed[r].Count ? parsed[r][c] : "";
                    GUILayout.Label(Inline(cell), r == 0 ? _cellBold : _cell,
                        GUILayout.Width(available * weight[c] / total));
                }
                EditorGUILayout.EndHorizontal();
            }
            EditorGUILayout.EndVertical();
        }

        private static List<string> SplitRow(string row)
        {
            string trimmed = row.Trim().Trim('|');
            var cells = new List<string>();
            foreach (string cell in trimmed.Split('|')) cells.Add(cell.Trim());
            return cells;
        }

        /// <summary>**bold**, *italic* and `code` to Unity rich text.</summary>
        private static string Inline(string text)
        {
            text = Regex.Replace(text, @"\*\*(.+?)\*\*", "<b>$1</b>");
            text = Regex.Replace(text, @"(?<![\w*])\*(?!\s)(.+?)\*(?![\w*])", "<i>$1</i>");
            text = Regex.Replace(text, @"`([^`]+)`", "<i>$1</i>");
            return text;
        }

        private void MakeStyles()
        {
            if (_body != null) return;
            _body = new GUIStyle(EditorStyles.wordWrappedLabel) { richText = true };
            _heading = new GUIStyle(EditorStyles.boldLabel) { richText = true, fontSize = 15, wordWrap = true };
            _cell = new GUIStyle(EditorStyles.wordWrappedMiniLabel) { richText = true };
            _cellBold = new GUIStyle(_cell) { fontStyle = FontStyle.Bold };
        }

        private void Succeed(string message) { _status = message; _statusIsError = false; Repaint(); }
        private void Fail(string message) { _status = message; _statusIsError = true; Repaint(); }
    }
}
