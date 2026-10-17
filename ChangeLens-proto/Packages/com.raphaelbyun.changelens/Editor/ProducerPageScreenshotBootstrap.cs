// ProducerPageScreenshotBootstrap.cs
// ---------------------------------------------------------------------------
// Third one-off automation helper (17 Oct 2026), modelled on
// DockedScreenshotBootstrap.cs. It opens Window > ChangeLens Producer Page
// docked and maximised in the Editor, reopens a frozen study week, and
// captures the Editor three times: Version A, Version B, and Version B
// scrolled down to its "Scenes and prefabs changed" section. Like the other
// two helpers it is not part of the tool and can be deleted.
//
// Run it from a command line (NOT in -batchmode, which draws nothing):
//   Unity.exe -projectPath <project> -executeMethod ChangeLens.Editor.ProducerPageScreenshotBootstrap.Run
// Optional settings from the launching shell:
//   CHANGELENS_WEEK   study week folder (default ../study/week2-2021-07-19)
//   CHANGELENS_SCROLL how far to scroll Version B for the third capture, in pixels
// ---------------------------------------------------------------------------

using System;
using System.IO;
using System.Reflection;
using UnityEditor;
using UnityEditorInternal;
using UnityEngine;

namespace ChangeLens.Editor
{
    public static class ProducerPageScreenshotBootstrap
    {
        private static readonly string FiguresFolder =
            Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "figures"));

        private const int TicksPerStep = 60;
        private const int WindowWidth = 1280;
        private const int WindowHeight = 900;

        private static int _step;
        private static int _ticks;
        private static ProducerPageWindow _window;

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern bool MoveWindow(IntPtr hWnd, int x, int y, int width, int height, bool repaint);

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
                    case 2: StepLoadWeek(); break;
                    case 3: StepMaximise(); break;
                    case 4: _window.SelectVersion(0); break;
                    case 5: Redraw(); break;
                    case 6: Capture("a3-producer-page-A.png"); break;
                    case 7: _window.SelectVersion(1); break;
                    case 8: Redraw(); break;
                    case 9: Capture("a3-producer-page-B.png"); break;
                    case 10: StepScroll(); break;
                    case 11: Redraw(); break;
                    case 12: Capture("a3-producer-page-B-scenes.png"); break;
                    case 13: StepRestore(); break;
                    default: StepQuit(); return;
                }
            }
            catch (Exception error)
            {
                Debug.LogError("[ChangeLens producer screenshot] step " + _step + " failed: " + error);
                _step = 99;
                return;
            }
            _step++;
        }

        private static void StepResizeMainWindow()
        {
            Directory.CreateDirectory(FiguresFolder);
            try
            {
                IntPtr handle = System.Diagnostics.Process.GetCurrentProcess().MainWindowHandle;
                if (handle != IntPtr.Zero)
                {
                    ShowWindow(handle, 9); // SW_RESTORE
                    MoveWindow(handle, 24, 24, WindowWidth, WindowHeight, true);
                }
            }
            catch (Exception error) { Log("user32 resize skipped: " + error.Message); }

            try
            {
                MethodInfo setter = typeof(EditorGUIUtility).GetMethod("SetMainWindowPosition",
                    BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static);
                if (setter != null) setter.Invoke(null, new object[] { new Rect(24f, 24f, WindowWidth, WindowHeight) });
            }
            catch (Exception error) { Log("resize skipped: " + error.Message); }
        }

        private static void StepOpenDocked()
        {
            _window = EditorWindow.GetWindow<ProducerPageWindow>("ChangeLens Producer Page", typeof(SceneView));
            _window.Focus();
            _window.Repaint();
            Log("window docked at " + _window.position);
        }

        private static void StepLoadWeek()
        {
            string week = Environment.GetEnvironmentVariable("CHANGELENS_WEEK");
            if (string.IsNullOrEmpty(week))
                week = "../study/week2-2021-07-19";

            _window.GenerateFromFrozen(week);
            _window.Repaint();
            Log("week loaded from " + week);
        }

        private static void StepMaximise()
        {
            try { _window.maximized = true; } catch (Exception error) { Log("maximise skipped: " + error.Message); }
            _window.Focus();
            _window.Repaint();
        }

        // The window keeps its scroll position in a private field; set it here so
        // the tool itself does not change for a screenshot.
        private static void StepScroll()
        {
            float y;
            if (!float.TryParse(Environment.GetEnvironmentVariable("CHANGELENS_SCROLL"),
                                System.Globalization.NumberStyles.Float,
                                System.Globalization.CultureInfo.InvariantCulture, out y)) y = 440f;
            FieldInfo field = typeof(ProducerPageWindow).GetField("_scroll", BindingFlags.NonPublic | BindingFlags.Instance);
            if (field != null) field.SetValue(_window, new Vector2(0f, y));
            _window.Repaint();
            Log("scrolled to " + y);
        }

        // A change shows on screen only after the window repaints, so every
        // change gets a step of its own and a forced repaint before the capture.
        private static void Redraw()
        {
            _window.Focus();
            _window.Repaint();
            InternalEditorUtility.RepaintAllViews();
        }

        private static void StepRestore()
        {
            try { _window.maximized = false; } catch (Exception) { }
            _window.Close();
        }

        private static void StepQuit()
        {
            EditorApplication.update -= Tick;
            Log("done; quitting");
            EditorApplication.Exit(0);
        }

        private static void Capture(string fileName)
        {
            Rect area;
            try { area = EditorGUIUtility.GetMainWindowPosition(); }
            catch (Exception) { area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height); }
            if (area.width < 2f || area.height < 2f)
                area = new Rect(0f, 0f, Screen.currentResolution.width, Screen.currentResolution.height);

            int width = Mathf.Max(1, Mathf.RoundToInt(area.width));
            int height = Mathf.Max(1, Mathf.RoundToInt(area.height));
            Color[] pixels = InternalEditorUtility.ReadScreenPixel(area.position, width, height);
            if (pixels == null || pixels.Length == 0)
            {
                Debug.LogError("[ChangeLens producer screenshot] ReadScreenPixel returned nothing for " + area);
                return;
            }
            var texture = new Texture2D(width, height, TextureFormat.RGB24, false);
            texture.SetPixels(pixels);
            texture.Apply();
            byte[] png = texture.EncodeToPNG();
            UnityEngine.Object.DestroyImmediate(texture);
            string path = Path.Combine(FiguresFolder, fileName);
            File.WriteAllBytes(path, png);
            Log("wrote " + path + " (" + width + "x" + height + ")");
        }

        private static void Log(string message)
        {
            // Console only: a Debug.Log line would show in the Editor's status bar in the captures.
            Console.WriteLine("[ChangeLens producer screenshot] " + message);
        }
    }
}
