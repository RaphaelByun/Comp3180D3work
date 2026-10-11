// ScreenshotBootstrap.cs
// ---------------------------------------------------------------------------
// A small automation helper used ONCE, to produce the two figures in the
// research proposal. It is not part of how ChangeLens is used day to day -
// you can delete this file and the tool still works.
//
// It drives the Editor like a very patient person would:
//   1. open the ChangeLens window as a floating 900x700 window
//   2. load the sample export that ships in Samples~
//   3. wait for the window to actually repaint, then photograph it
//   4. select the package folder in the Project window
//   5. photograph the whole Editor
//   6. quit Unity
//
// Each step waits about 40 editor "update ticks" before the next one, because
// screenshots taken immediately after a step catch a half-drawn window.
//
// Run it from a command line (NOT in -batchmode, which draws nothing):
//   Unity.exe -projectPath <project> -executeMethod ChangeLens.Editor.ScreenshotBootstrap.Run
// ---------------------------------------------------------------------------

using System;
using System.IO;
using UnityEditor;
using UnityEngine;
using UnityEditorInternal;

namespace ChangeLens.Editor
{
    public static class ScreenshotBootstrap
    {
        // Where the two figures are written.
        private const string FiguresFolder =
            @"C:\Users\rapha\Documents\School\Unit 3 Sem 2\COMP3180\Working folder\a2-final-sprint-17-sep-2026\figures";

        private const string Figure1 = "fig1-changelens-window.png";
        private const string Figure2 = "fig2-package-in-project.png";

        private const string PackageFolder = "Packages/com.raphaelbyun.changelens";
        private const string SampleRelativePath = PackageFolder + "/Samples~/ss3d-week.txt";

        /// <summary>How many editor update ticks to wait between steps.</summary>
        private const int TicksPerStep = 40;

        private static int _step;
        private static int _ticks;
        private static ChangeLensWindow _window;

        /// <summary>Entry point for -executeMethod.</summary>
        public static void Run()
        {
            Log("starting");
            _step = 0;
            _ticks = 0;
            EditorApplication.update -= Tick;
            EditorApplication.update += Tick;
        }

        /// <summary>
        /// Called every editor frame. It counts ticks and, every time enough
        /// have gone by, performs the next step.
        /// </summary>
        private static void Tick()
        {
            _ticks++;
            if (_ticks < TicksPerStep) return;
            _ticks = 0;

            try
            {
                switch (_step)
                {
                    case 0: StepOpenWindow(); break;
                    case 1: StepLoadSample(); break;
                    case 2: StepCaptureWindow(); break;
                    case 3: StepExportReport(); break;
                    case 4: StepRevealPackage(); break;
                    case 5: StepCaptureEditor(); break;
                    default: StepQuit(); return;
                }
            }
            catch (Exception error)
            {
                Debug.LogError("[ChangeLens screenshots] step " + _step + " failed: " + error);
                _step = 99; // skip to the quit step rather than looping forever
                return;
            }

            _step++;
        }

        // -------------------------------------------------------------------
        // THE STEPS
        // -------------------------------------------------------------------

        private static void StepOpenWindow()
        {
            Directory.CreateDirectory(FiguresFolder);

            _window = ScriptableObject.CreateInstance<ChangeLensWindow>();
            _window.titleContent = new GUIContent("ChangeLens");
            _window.ShowUtility();                                  // floating, not docked
            _window.position = new Rect(40f, 60f, 900f, 700f);      // near the top-left
            _window.Focus();
            _window.Repaint();

            Log("window opened at " + _window.position);
        }

        private static void StepLoadSample()
        {
            string full = Path.Combine(Directory.GetCurrentDirectory(), SampleRelativePath);
            full = full.Replace('/', Path.DirectorySeparatorChar);

            if (!File.Exists(full))
            {
                Debug.LogError("[ChangeLens screenshots] sample not found at " + full);
                return;
            }

            _window.LoadReport(full);
            _window.Repaint();

            Log("sample loaded from " + full);
        }

        private static void StepCaptureWindow()
        {
            Rect area = _window.position;
            Capture(area, Path.Combine(FiguresFolder, Figure1));
        }

        /// <summary>
        /// Presses the window's "Export report (.md)" button, so the run also
        /// leaves behind the markdown report the proposal quotes.
        /// </summary>
        private static void StepExportReport()
        {
            if (_window == null) return;
            _window.ExportMarkdown();
            Log("exported the markdown report");
        }

        private static void StepRevealPackage()
        {
            EditorApplication.ExecuteMenuItem("Window/General/Project");
            EditorUtility.FocusProjectWindow();

            // Select the package folder so the Project window highlights it.
            UnityEngine.Object folder = AssetDatabase.LoadMainAssetAtPath(PackageFolder);
            if (folder != null)
            {
                Selection.activeObject = folder;
                EditorGUIUtility.PingObject(folder);
                Log("package pinged in the Project window");
            }
            else
            {
                Debug.LogWarning("[ChangeLens screenshots] could not load " + PackageFolder);
            }

            // Then select a script INSIDE the package, so the Project window
            // browses into the Editor folder and the figure shows the actual
            // source files rather than just a highlighted folder icon.
            UnityEngine.Object script =
                AssetDatabase.LoadMainAssetAtPath(PackageFolder + "/Editor/ChangeLensWindow.cs");
            if (script != null)
            {
                Selection.activeObject = script;
                EditorGUIUtility.PingObject(script);
                Log("selected ChangeLensWindow.cs inside the package");
            }

            if (_window != null) _window.Close(); // get the floating window out of the shot
        }

        private static void StepCaptureEditor()
        {
            Rect area;
            try
            {
                area = EditorGUIUtility.GetMainWindowPosition();
            }
            catch (Exception)
            {
                // Fall back to the whole screen if the main window is unknown.
                area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height);
            }

            if (area.width < 2f || area.height < 2f)
            {
                area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height);
            }

            Capture(area, Path.Combine(FiguresFolder, Figure2));
        }

        private static void StepQuit()
        {
            EditorApplication.update -= Tick;
            Log("done; quitting");
            EditorApplication.Exit(0);
        }

        // -------------------------------------------------------------------
        // CAPTURE
        // -------------------------------------------------------------------

        /// <summary>
        /// Photographs a rectangle of the actual screen and writes it as a PNG.
        /// ReadScreenPixel hands back the raw pixels under that rectangle.
        /// </summary>
        private static void Capture(Rect area, string outputPath)
        {
            int width = Mathf.Max(1, Mathf.RoundToInt(area.width));
            int height = Mathf.Max(1, Mathf.RoundToInt(area.height));

            Color[] pixels = InternalEditorUtility.ReadScreenPixel(area.position, width, height);
            if (pixels == null || pixels.Length == 0)
            {
                Debug.LogError("[ChangeLens screenshots] ReadScreenPixel returned nothing for " + area);
                return;
            }

            var texture = new Texture2D(width, height, TextureFormat.RGB24, false);
            texture.SetPixels(pixels);
            texture.Apply();

            byte[] png = texture.EncodeToPNG();
            UnityEngine.Object.DestroyImmediate(texture);

            Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
            File.WriteAllBytes(outputPath, png);

            Log("wrote " + outputPath + " (" + width + "x" + height + ")");
        }

        private static void Log(string message)
        {
            Debug.Log("[ChangeLens screenshots] " + message);
            Console.WriteLine("[ChangeLens screenshots] " + message);
        }
    }
}
