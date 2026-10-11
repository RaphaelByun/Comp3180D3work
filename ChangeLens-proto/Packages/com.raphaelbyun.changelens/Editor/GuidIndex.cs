// GuidIndex.cs
// ---------------------------------------------------------------------------
// Turns Unity asset guids into names a person can read.
//
// A scene or prefab never stores a script's name, only its guid:
//
//     m_Script: {fileID: 11500000, guid: 307b90d11903d8c42bef2ae0d15ce5f9, type: 3}
//
// The guid lives in the script's sidecar file ("EmergencyLight.cs.meta" holds
// "guid: 307b90d1..."). Two ways to look it up:
//
//   * Inside the open project, Unity's own AssetDatabase knows every guid
//     (AssetDatabaseGuidResolver, in ChangeLensGit.cs).
//   * For a repository that is NOT the open project (the study's SS3D weeks),
//     ChangeLens asks git for every .meta file's guid line at the week's last
//     commit and builds the table below from that text:
//
//         git grep -I "^guid:" <commit> -- "*.meta"
//         -> <commit>:Assets/Scripts/EmergencyLight.cs.meta:guid: 307b90d1...
//
// Pure C#, unit-tested.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace ChangeLens.Editor
{
    /// <summary>Anything that can turn a guid into an asset path (or null).</summary>
    public interface IGuidResolver
    {
        string PathFor(string guid);
    }

    /// <summary>A guid -> asset path table built from git grep output.</summary>
    public class GuidIndex : IGuidResolver
    {
        private readonly Dictionary<string, string> _paths = new Dictionary<string, string>();

        public int Count { get { return _paths.Count; } }

        public static GuidIndex Parse(string grepText)
        {
            var index = new GuidIndex();
            if (string.IsNullOrEmpty(grepText)) return index;

            foreach (string raw in grepText.Replace("\r\n", "\n").Split('\n'))
            {
                int marker = raw.IndexOf(".meta:guid:", StringComparison.Ordinal);
                if (marker < 0) continue;

                // Drop the "<commit>:" prefix git adds when grepping a revision.
                string metaPath = raw.Substring(0, marker);
                int colon = metaPath.LastIndexOf(':');
                if (colon >= 0) metaPath = metaPath.Substring(colon + 1);

                string guid = AssetDiffParser.GuidIn(raw.Substring(marker + ".meta:".Length));
                if (guid == null || metaPath.Length == 0) continue;

                index._paths[guid] = metaPath; // the asset path is the .meta path minus ".meta"
            }
            return index;
        }

        public void Add(string guid, string path)
        {
            if (!string.IsNullOrEmpty(guid) && !string.IsNullOrEmpty(path))
                _paths[guid.ToLowerInvariant()] = path;
        }

        public string PathFor(string guid)
        {
            if (string.IsNullOrEmpty(guid)) return null;
            string path;
            return _paths.TryGetValue(guid.ToLowerInvariant(), out path) ? path : null;
        }

        /// <summary>
        /// The readable name for a guid ("Assets/Scripts/EmergencyLight.cs" ->
        /// "EmergencyLight"), or null when no resolver knows it.
        /// </summary>
        public static string NameFor(IGuidResolver resolver, string guid)
        {
            if (resolver == null) return null;
            string path = resolver.PathFor(guid);
            return string.IsNullOrEmpty(path) ? null : AssetDiffParser.AssetNameOf(path);
        }
    }
}
