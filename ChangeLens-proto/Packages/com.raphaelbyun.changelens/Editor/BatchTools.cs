// BatchTools.cs
// ---------------------------------------------------------------------------
// Two batch-mode entry points used for the proposal's scoping evidence (18 Sep 2026).
// Neither is part of how ChangeLens is used day to day; delete the file freely.
//
//   ExportReport   - parses the git log export named by CHANGELENS_SAMPLE and writes
//                    the markdown report to CHANGELENS_REPORT_OUT, with no window.
//   BuildAndReport - builds an empty scene for Windows, then reads Unity's BuildReport
//                    (the object the stretch tier would parse) and writes its summary,
//                    steps and largest packed assets to CHANGELENS_BUILDREPORT_OUT.
//
//   Unity.exe -batchmode -nographics -quit -projectPath <project>
//             -executeMethod ChangeLens.Editor.BatchTools.ExportReport
//   Unity.exe -batchmode -quit -projectPath <project> -buildTarget Win64
//             -executeMethod ChangeLens.Editor.BatchTools.BuildAndReport
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ChangeLens.Editor
{
    public static class BatchTools
    {
        public static void ExportReport()
        {
            string sample = Environment.GetEnvironmentVariable("CHANGELENS_SAMPLE");
            string output = Environment.GetEnvironmentVariable("CHANGELENS_REPORT_OUT");
            if (string.IsNullOrEmpty(sample) || string.IsNullOrEmpty(output))
            {
                Console.WriteLine("[ChangeLens batch] CHANGELENS_SAMPLE and CHANGELENS_REPORT_OUT must be set");
                EditorApplication.Exit(2);
                return;
            }
            string text = File.ReadAllText(sample);
            List<CommitRecord> commits = GitLogParser.Parse(text);
            ChangeReport report = ChangeReport.Build(commits, Path.GetFileName(sample));
            File.WriteAllText(output, report.ToMarkdown());
            Console.WriteLine("[ChangeLens batch] wrote " + output + " (" + report.CommitCount + " commits, " +
                              report.TotalFileEntries + " entries, code " + report.CodeFilePercent.ToString("0.0") + "%)");
            EditorApplication.Exit(0);
        }

        /// <summary>
        /// Committed tier, batch form: freezes one week of a repository and writes
        /// the study files (Version A, Version B, fidelity checklists, naming measures).
        ///   CHANGELENS_REPO, CHANGELENS_SINCE, CHANGELENS_UNTIL, CHANGELENS_OUT, CHANGELENS_TITLE
        /// </summary>
        public static void ExportStudyWeek()
        {
            string repo = Environment.GetEnvironmentVariable("CHANGELENS_REPO");
            string since = Environment.GetEnvironmentVariable("CHANGELENS_SINCE");
            string until = Environment.GetEnvironmentVariable("CHANGELENS_UNTIL");
            string output = Environment.GetEnvironmentVariable("CHANGELENS_OUT");
            string title = Environment.GetEnvironmentVariable("CHANGELENS_TITLE") ?? "";
            if (string.IsNullOrEmpty(repo) || string.IsNullOrEmpty(since) ||
                string.IsNullOrEmpty(until) || string.IsNullOrEmpty(output))
            {
                Console.WriteLine("[ChangeLens batch] CHANGELENS_REPO, _SINCE, _UNTIL and _OUT must be set");
                EditorApplication.Exit(2);
                return;
            }
            try
            {
                WeekExport export = WeekExport.FromGit(repo, since, until);
                export.SaveTo(Path.Combine(output, "export"));
                string summary = StudyExport.WriteStudyFiles(export, output, title);
                Console.WriteLine("[ChangeLens batch] " + summary);
                EditorApplication.Exit(0);
            }
            catch (Exception e)
            {
                Console.WriteLine("[ChangeLens batch] failed: " + e);
                EditorApplication.Exit(1);
            }
        }

        public static void BuildAndReport()
        {
            string output = Environment.GetEnvironmentVariable("CHANGELENS_BUILDREPORT_OUT");
            if (string.IsNullOrEmpty(output))
            {
                Console.WriteLine("[ChangeLens batch] CHANGELENS_BUILDREPORT_OUT must be set");
                EditorApplication.Exit(2);
                return;
            }

            // The project has no scene, so make a minimal one to give the build something to pack.
            Directory.CreateDirectory("Assets/Scenes");
            Scene scene = EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);
            var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.name = "BuildReportProbe";
            EditorSceneManager.SaveScene(scene, "Assets/Scenes/BuildReportProbe.unity");

            string buildDir = Path.Combine(Path.GetTempPath(), "ChangeLensBuild");
            Directory.CreateDirectory(buildDir);
            var options = new BuildPlayerOptions
            {
                scenes = new[] { "Assets/Scenes/BuildReportProbe.unity" },
                locationPathName = Path.Combine(buildDir, "ChangeLensProbe.exe"),
                target = BuildTarget.StandaloneWindows64,
                options = BuildOptions.None,
            };

            BuildReport report = BuildPipeline.BuildPlayer(options);
            var sb = new StringBuilder();
            sb.AppendLine("Unity BuildReport read by ChangeLens BatchTools.BuildAndReport, " + DateTime.Now.ToString("yyyy-MM-dd HH:mm"));
            sb.AppendLine("Editor: " + Application.unityVersion + " | target: " + report.summary.platform +
                          " | result: " + report.summary.result);
            sb.AppendLine("Total time: " + report.summary.totalTime.TotalSeconds.ToString("0") + " s | total size: " +
                          (report.summary.totalSize / 1024.0 / 1024.0).ToString("0.0") + " MB | errors: " +
                          report.summary.totalErrors + " | warnings: " + report.summary.totalWarnings);
            sb.AppendLine();
            sb.AppendLine("Build steps (name, duration):");
            foreach (BuildStep step in report.steps)
            {
                sb.AppendLine("  " + new string(' ', step.depth * 2) + step.name + " - " +
                              step.duration.TotalSeconds.ToString("0.00") + " s" +
                              (step.messages.Any(m => m.type == LogType.Error) ? " [ERROR]" : ""));
            }
            sb.AppendLine();
            sb.AppendLine("Largest packed assets (source path, packed size):");
            var contents = new List<PackedAssetInfo>();
            foreach (PackedAssets packed in report.packedAssets)
                contents.AddRange(packed.contents);
            foreach (PackedAssetInfo info in contents.OrderByDescending(c => c.packedSize).Take(10))
            {
                sb.AppendLine("  " + (string.IsNullOrEmpty(info.sourceAssetPath) ? "(built-in " + info.type.Name + ")" : info.sourceAssetPath) +
                              " - " + (info.packedSize / 1024.0).ToString("0.0") + " KB");
            }
            sb.AppendLine();
            sb.AppendLine("Packed asset files: " + report.packedAssets.Length + " | packed entries: " + contents.Count);

            File.WriteAllText(output, sb.ToString());
            Console.WriteLine("[ChangeLens batch] wrote " + output + " (result " + report.summary.result + ")");
            EditorApplication.Exit(report.summary.result == BuildResult.Succeeded ? 0 : 1);
        }
    }
}
