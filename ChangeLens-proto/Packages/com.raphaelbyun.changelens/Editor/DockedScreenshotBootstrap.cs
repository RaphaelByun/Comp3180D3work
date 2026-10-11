// DockedScreenshotBootstrap.cs
// ---------------------------------------------------------------------------
// Second one-off automation helper (18 Sep 2026), used to produce the proposal's
// Figure 2 with the Unity Editor chrome visible: the ChangeLens window is docked
// and maximised inside the main Editor window, so the title bar (which carries
// the Unity version), the menu bar and the toolbar all appear in the capture.
// Like ScreenshotBootstrap.cs it is not part of the tool and can be deleted.
//
// Run it from a command line (NOT in -batchmode, which draws nothing):
//   Unity.exe -projectPath <project> -executeMethod ChangeLens.Editor.DockedScreenshotBootstrap.Run
// ---------------------------------------------------------------------------

using System;
using System.IO;
using System.Reflection;
using UnityEditor;
using UnityEngine;
using UnityEditorInternal;

namespace ChangeLens.Editor
{
    public static class DockedScreenshotBootstrap
    {
        private const string FiguresFolder =
            @"C:\Users\rapha\Documents\School\Unit 3 Sem 2\COMP3180\Working folder\a2-final-sprint-17-sep-2026\figures";

        private const string OutputFile = "fig2-changelens-docked-raw.png";

        private const string PackageFolder = "Packages/com.raphaelbyun.changelens";
        private const string SampleRelativePath = PackageFolder + "/Samples~/ss3d-week.txt";

        private const int TicksPerStep = 60;

        private static int _step;
        private static int _ticks;
        private static ChangeLensWindow _window;

        public static void Run()
        {
            Log("starting");
            _step = 0;
            _ticks = 0;
            EditorApplication.update -= Tick;
            EditorApplication.update += Tick;
        }

        private static void Tick()
        {
            _ticks++;
            if (_ticks < TicksPerStep) return;
            _ticks = 0;

            try
            {
                switch (_step)
                {
                    case 0: StepResizeMainWindow(); break;
                    case 1: StepOpenDocked(); break;
                    case 2: StepLoadSample(); break;
                    case 3: StepMaximise(); break;
                    case 4: StepCaptureEditor(); break;
                    case 5: StepRestore(); break;
                    default: StepQuit(); return;
                }
            }
            catch (Exception error)
            {
                Debug.LogError("[ChangeLens docked screenshot] step " + _step + " failed: " + error);
                _step = 99;
                return;
            }

            _step++;
        }

        // Shrink the main Editor window so the capture stays legible when it is
        // printed at 15 cm wide. Uses an internal method through reflection and
        // simply carries on at the current size if it is not available.
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern bool MoveWindow(IntPtr hWnd, int x, int y, int width, int height, bool repaint);

        private const int WindowWidth = 1000;
        private const int WindowHeight = 760;

        private static void StepResizeMainWindow()
        {
            Directory.CreateDirectory(FiguresFolder);

            // The Editor opens maximised, which ignores position changes, so restore it
            // through the Windows API first and then set the size.
            try
            {
                IntPtr handle = System.Diagnostics.Process.GetCurrentProcess().MainWindowHandle;
                if (handle != IntPtr.Zero)
                {
                    ShowWindow(handle, 9); // SW_RESTORE
                    MoveWindow(handle, 24, 24, WindowWidth, WindowHeight, true);
                    Log("main window restored and moved through user32");
                }
                else
                {
                    Log("no main window handle; skipping user32 resize");
                }
            }
            catch (Exception error)
            {
                Log("user32 resize skipped: " + error.Message);
            }

            try
            {
                MethodInfo setter = typeof(EditorGUIUtility).GetMethod(
                    "SetMainWindowPosition",
                    BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static);
                if (setter != null)
                {
                    setter.Invoke(null, new object[] { new Rect(24f, 24f, WindowWidth, WindowHeight) });
                    Log("main window resized to " + WindowWidth + "x" + WindowHeight);
                }
                else
                {
                    Log("SetMainWindowPosition not found; keeping current size");
                }
            }
            catch (Exception error)
            {
                Log("resize skipped: " + error.Message);
            }
        }

        private static void StepOpenDocked()
        {
            // Dock the window into the Scene view's tab group, then bring its tab to the front.
            _window = EditorWindow.GetWindow<ChangeLensWindow>(typeof(SceneView));
            _window.titleContent = new GUIContent("ChangeLens");
            _window.Focus();
            _window.Repaint();
            Log("window docked at " + _window.position);
        }

        // The sample export and the output file can be overridden from the launching shell
        // (CHANGELENS_SAMPLE = full path of a git log export; CHANGELENS_OUTPUT = PNG file name),
        // so the same helper can photograph any team-week without a recompile.
        private static string SamplePath()
        {
            string env = Environment.GetEnvironmentVariable("CHANGELENS_SAMPLE");
            if (!string.IsNullOrEmpty(env)) return env;
            string full = Path.Combine(Directory.GetCurrentDirectory(), SampleRelativePath);
            return full.Replace('/', Path.DirectorySeparatorChar);
        }

        private static string OutputName()
        {
            string env = Environment.GetEnvironmentVariable("CHANGELENS_OUTPUT");
            return string.IsNullOrEmpty(env) ? OutputFile : env;
        }

        private static void StepLoadSample()
        {
            string full = SamplePath();
            if (!File.Exists(full))
            {
                Debug.LogError("[ChangeLens docked screenshot] sample not found at " + full);
                return;
            }
            _window.LoadReport(full);
            _window.Repaint();
            Log("sample loaded from " + full);
        }

        private static void StepMaximise()
        {
            if (_window == null) return;
            try
            {
                _window.maximized = true;
                Log("window maximised");
            }
            catch (Exception error)
            {
                Log("maximise skipped: " + error.Message);
            }
            _window.Focus();
            _window.Repaint();
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
                area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height);
            }
            if (area.width < 2f || area.height < 2f)
            {
                area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height);
            }
            Capture(area, Path.Combine(FiguresFolder, OutputName()));
        }

        private static void StepRestore()
        {
            if (_window == null) return;
            try { _window.maximized = false; } catch (Exception) { }
            _window.Close();
            Log("window closed");
        }

        private static void StepQuit()
        {
            EditorApplication.update -= Tick;
            Log("done; quitting");
            EditorApplication.Exit(0);
        }

        private static void Capture(Rect area, string outputPath)
        {
            int width = Mathf.Max(1, Mathf.RoundToInt(area.width));
            int height = Mathf.Max(1, Mathf.RoundToInt(area.height));

            Color[] pixels = InternalEditorUtility.ReadScreenPixel(area.position, width, height);
            if (pixels == null || pixels.Length == 0)
            {
                Debug.LogError("[ChangeLens docked screenshot] ReadScreenPixel returned nothing for " + area);
                return;
            }

            var texture = new Texture2D(width, height, TextureFormat.RGB24, false);
            texture.SetPixels(pixels);
            texture.Apply();
            byte[] png = texture.EncodeToPNG();
            UnityEngine.Object.DestroyImmediate(texture);

            File.WriteAllBytes(outputPath, png);
            Log("wrote " + outputPath + " (" + width + "x" + height + ")");
        }

        private static void Log(string message)
        {
            Debug.Log("[ChangeLens docked screenshot] " + message);
            Console.WriteLine("[ChangeLens docked screenshot] " + message);
        }
    }
}
