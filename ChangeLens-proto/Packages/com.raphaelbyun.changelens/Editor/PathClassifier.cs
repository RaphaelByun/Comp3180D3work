// PathClassifier.cs
// ---------------------------------------------------------------------------
// Decides what KIND of file a path is, using nothing but the file extension
// (and, for ".meta" files, the extension of the asset sitting next to it).
//
// This is the "lens" part of ChangeLens: a git log only knows about paths, so
// to say anything useful about a week of work we first have to sort those
// paths into human categories - code, scenes and prefabs, art, audio, data,
// and Unity's .meta sidecar files.
//
// The rules live in one place (the dictionaries below) so they are easy to
// edit. Add an extension to a list and the whole report follows automatically.
//
// Like GitLogParser this file is pure C# with no UnityEditor dependency.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace ChangeLens.Editor
{
    /// <summary>
    /// The buckets ChangeLens sorts every changed path into.
    /// </summary>
    public enum PathCategory
    {
        Code,
        ScenePrefab,
        Art,
        Audio,
        DataConfig,
        Meta,
        Other
    }

    /// <summary>
    /// The answer for one path: its category, plus - when the path is a Unity
    /// ".meta" sidecar - the category of the asset it belongs to.
    /// </summary>
    public struct ClassifiedPath
    {
        /// <summary>The path exactly as it came out of the git log.</summary>
        public string Path;

        /// <summary>Which bucket the path itself falls into.</summary>
        public PathCategory Category;

        /// <summary>True when the path ends in ".meta".</summary>
        public bool IsMeta;

        /// <summary>
        /// For a ".meta" file: the category of the sibling asset, i.e. the same
        /// path with ".meta" chopped off ("Player.cs.meta" -> Code).
        /// For everything else this is the same value as <see cref="Category"/>.
        /// </summary>
        public PathCategory SiblingCategory;

        public override string ToString()
        {
            return IsMeta
                ? Path + " [Meta of " + SiblingCategory + "]"
                : Path + " [" + Category + "]";
        }
    }

    /// <summary>
    /// The rule table and the lookup helpers. Everything is static because
    /// there is only ever one set of rules in a project.
    /// </summary>
    public static class PathClassifier
    {
        // -------------------------------------------------------------------
        // THE RULES. Edit these lists to change how files are grouped.
        // Extensions are written lower-case and include the leading dot.
        // -------------------------------------------------------------------

        public static readonly List<string> CodeExtensions = new List<string>
        {
            ".cs", ".shader", ".compute", ".cginc", ".hlsl",
            ".asmdef", ".asmref", ".uxml", ".uss"
        };

        public static readonly List<string> ScenePrefabExtensions = new List<string>
        {
            ".unity", ".prefab"
        };

        public static readonly List<string> ArtExtensions = new List<string>
        {
            ".png", ".jpg", ".jpeg", ".tga", ".psd", ".tif", ".exr",
            ".fbx", ".obj", ".blend",
            ".anim", ".controller", ".mat", ".mask",
            ".physicmaterial", ".spriteatlas", ".cubemap"
        };

        public static readonly List<string> AudioExtensions = new List<string>
        {
            ".wav", ".ogg", ".mp3", ".aiff"
        };

        public static readonly List<string> DataConfigExtensions = new List<string>
        {
            ".asset", ".json", ".xml", ".yaml", ".yml",
            ".txt", ".csv", ".preset", ".playable"
        };

        /// <summary>The suffix Unity uses for its sidecar import-settings files.</summary>
        public const string MetaSuffix = ".meta";

        // -------------------------------------------------------------------
        // LOOKUPS
        // -------------------------------------------------------------------

        /// <summary>
        /// Full answer for one path, including the sibling category of a .meta.
        /// </summary>
        public static ClassifiedPath Classify(string path)
        {
            var result = new ClassifiedPath();
            result.Path = path ?? "";

            if (string.IsNullOrEmpty(path))
            {
                result.Category = PathCategory.Other;
                result.SiblingCategory = PathCategory.Other;
                return result;
            }

            if (IsMetaPath(path))
            {
                result.IsMeta = true;
                result.Category = PathCategory.Meta;
                // "Assets/Player.cs.meta" -> "Assets/Player.cs" -> Code
                result.SiblingCategory = CategoryForExtension(SiblingPathOfMeta(path));
                return result;
            }

            result.IsMeta = false;
            result.Category = CategoryForExtension(path);
            result.SiblingCategory = result.Category;
            return result;
        }

        /// <summary>Shorthand when only the bucket is wanted.</summary>
        public static PathCategory CategoryOf(string path)
        {
            return Classify(path).Category;
        }

        /// <summary>True when the path ends in ".meta" (case-insensitively).</summary>
        public static bool IsMetaPath(string path)
        {
            return !string.IsNullOrEmpty(path) &&
                   path.EndsWith(MetaSuffix, StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// The asset a ".meta" file belongs to: the same path without ".meta".
        /// Given a path that is not a .meta, the path comes back unchanged.
        /// </summary>
        public static string SiblingPathOfMeta(string metaPath)
        {
            if (!IsMetaPath(metaPath)) return metaPath;
            return metaPath.Substring(0, metaPath.Length - MetaSuffix.Length);
        }

        /// <summary>
        /// The bucket for a path based on its extension alone. This is the one
        /// place the rule lists above are consulted.
        /// </summary>
        public static PathCategory CategoryForExtension(string path)
        {
            string ext = ExtensionOf(path);
            if (ext.Length == 0) return PathCategory.Other;

            if (CodeExtensions.Contains(ext)) return PathCategory.Code;
            if (ScenePrefabExtensions.Contains(ext)) return PathCategory.ScenePrefab;
            if (ArtExtensions.Contains(ext)) return PathCategory.Art;
            if (AudioExtensions.Contains(ext)) return PathCategory.Audio;
            if (DataConfigExtensions.Contains(ext)) return PathCategory.DataConfig;

            return PathCategory.Other;
        }

        /// <summary>
        /// The lower-case extension of a path, dot included ("a/b/Player.cs" -> ".cs").
        /// Returns "" when there is no extension in the final path segment.
        /// </summary>
        public static string ExtensionOf(string path)
        {
            if (string.IsNullOrEmpty(path)) return "";

            // Only look at the last segment, so a dot in a folder name
            // ("My.Folder/README") is never mistaken for an extension.
            int lastSlash = path.LastIndexOfAny(new[] { '/', '\\' });
            string fileName = lastSlash >= 0 ? path.Substring(lastSlash + 1) : path;

            int dot = fileName.LastIndexOf('.');
            if (dot < 0 || dot == fileName.Length - 1) return "";

            return fileName.Substring(dot).ToLowerInvariant();
        }

        /// <summary>
        /// The first folder in a path ("Assets/Scripts/Player.cs" -> "Assets").
        /// A file at the repository root reports "(root)".
        /// </summary>
        public static string TopLevelFolder(string path)
        {
            if (string.IsNullOrEmpty(path)) return "(root)";

            int firstSlash = path.IndexOfAny(new[] { '/', '\\' });
            if (firstSlash <= 0) return "(root)";

            return path.Substring(0, firstSlash);
        }

        /// <summary>
        /// The categories in the order the report shows them. Keeping the order
        /// in one place means the window and the markdown always agree.
        /// </summary>
        public static readonly PathCategory[] DisplayOrder =
        {
            PathCategory.Code,
            PathCategory.ScenePrefab,
            PathCategory.Art,
            PathCategory.Audio,
            PathCategory.DataConfig,
            PathCategory.Meta,
            PathCategory.Other
        };
    }
}
