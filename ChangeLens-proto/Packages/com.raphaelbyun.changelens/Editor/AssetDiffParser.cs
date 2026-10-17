// AssetDiffParser.cs
// ---------------------------------------------------------------------------
// The committed tier's "object naming" step. Reads the patch text produced by:
//
//     git -c core.quotepath=false log -p --first-parent --diff-merges=first-parent
//         --date=iso -- "*.prefab" "*.unity"
//
// and works out, for every scene or prefab a commit touched, WHAT inside it
// changed: which objects (GameObject names), which component types (Transform,
// AudioSource, a script...), and which components were added or removed.
//
// Why this works: Unity saves scenes and prefabs as text (YAML). Every object
// in the file starts with a block header and a type line:
//
//     --- !u!82 &4210036883970617636
//     AudioSource:
//       m_GameObject: {fileID: 8824907131049981641}
//       m_Volume: 0.25
//
// and git's hunk header repeats the nearest unindented line above a change:
//
//     @@ -163,7 +163,7 @@ AudioSource:
//
// So a changed line can be attributed to the component type it sits in
// without opening Unity. GameObject names appear as "m_Name: Airlock" and a
// script component carries "m_Script: {fileID: 11500000, guid: <32 hex>}";
// the guid is resolved to a script name later (see GuidIndex).
//
// Pure C#, no UnityEditor dependency, so it is unit-tested like the parser.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace ChangeLens.Editor
{
    /// <summary>
    /// What changed inside ONE scene or prefab in ONE commit.
    /// </summary>
    public class AssetChange
    {
        public string CommitHash = "";
        public string Path = "";

        /// <summary>Component/object types that had at least one changed line.</summary>
        public List<string> TypesTouched = new List<string>();

        /// <summary>Non-empty GameObject names seen in the changed text or its context.</summary>
        public List<string> ObjectNames = new List<string>();

        /// <summary>Whole blocks added ("--- !u!" header on a + line), by type.</summary>
        public List<string> AddedTypes = new List<string>();

        /// <summary>Whole blocks removed ("--- !u!" header on a - line), by type.</summary>
        public List<string> RemovedTypes = new List<string>();

        /// <summary>Script guids of MonoBehaviour blocks that were added.</summary>
        public List<string> AddedScriptGuids = new List<string>();

        /// <summary>Script guids of MonoBehaviour blocks that were removed.</summary>
        public List<string> RemovedScriptGuids = new List<string>();

        /// <summary>Script guids seen anywhere in a changed MonoBehaviour hunk.</summary>
        public List<string> TouchedScriptGuids = new List<string>();

        public int LinesAdded;
        public int LinesRemoved;

        /// <summary>True when git reported the file as new or deleted outright.</summary>
        public bool FileAdded;
        public bool FileDeleted;

        /// <summary>The old path when git reported the file as moved or renamed; otherwise null.</summary>
        public string RenamedFrom;

        /// <summary>The asset's own name: file name without folder or extension.</summary>
        public string AssetName
        {
            get { return AssetDiffParser.AssetNameOf(Path); }
        }

        public bool IsScene
        {
            get { return Path.EndsWith(".unity", StringComparison.OrdinalIgnoreCase); }
        }
    }

    public static class AssetDiffParser
    {
        /// <summary>
        /// Reads a whole "git log -p" export and returns one AssetChange per
        /// (commit, scene/prefab file) pair, in file order. Non-scene, non-prefab
        /// diffs are skipped, so the export may safely contain other files.
        /// </summary>
        public static List<AssetChange> Parse(string patchText)
        {
            var result = new List<AssetChange>();
            if (string.IsNullOrEmpty(patchText)) return result;

            string[] lines = patchText.Replace("\r\n", "\n").Replace('\r', '\n').Split('\n');

            string commitHash = "";
            AssetChange current = null;   // null while outside a scene/prefab diff
            bool inHunk = false;
            string currentType = "";      // the YAML block type the cursor is inside
            bool lastWasNameOverride = false;
            var blocks = new List<Block>(); // whole blocks added/removed in the current file diff

            // A diff interleaves two files. Each side is its own run of blocks, so
            // a '-' line belongs to the last '-' header and a '+' line to the last
            // '+' header; a context header starts a new block on both sides.
            Block removedBlock = null, addedBlock = null;
            int oldLine = 0, newLine = 0; // the next line number on each side of the hunk

            foreach (string line in lines)
            {
                if (line.StartsWith("commit ", StringComparison.Ordinal))
                {
                    commitHash = FirstToken(line.Substring("commit ".Length).Trim());
                    FinishBlocks(current, blocks);
                    removedBlock = addedBlock = null;
                    current = null;
                    inHunk = false;
                    continue;
                }

                if (line.StartsWith("diff --git ", StringComparison.Ordinal))
                {
                    string path = PathFromDiffHeader(line);
                    FinishBlocks(current, blocks);
                    removedBlock = addedBlock = null;
                    current = null;
                    inHunk = false;
                    currentType = "";
                    if (IsSceneOrPrefab(path))
                    {
                        current = new AssetChange { CommitHash = commitHash, Path = path };
                        result.Add(current);
                    }
                    continue;
                }

                if (current == null) continue;

                if (!inHunk)
                {
                    if (line.StartsWith("new file mode", StringComparison.Ordinal)) current.FileAdded = true;
                    else if (line.StartsWith("deleted file mode", StringComparison.Ordinal)) current.FileDeleted = true;
                    else if (line.StartsWith("rename from ", StringComparison.Ordinal))
                        current.RenamedFrom = GitLogParser.UnquoteGitPath(line.Substring("rename from ".Length));
                    else if (line.StartsWith("rename to ", StringComparison.Ordinal))
                        current.Path = GitLogParser.UnquoteGitPath(line.Substring("rename to ".Length));
                    else if (line.StartsWith("+++ ", StringComparison.Ordinal) || line.StartsWith("--- ", StringComparison.Ordinal))
                    {
                        // "+++ b/<path>" names the file after the change, "--- a/<path>"
                        // before it; /dev/null stands in for the missing side.
                        string side = PathFromFileLine(line, line[0] == '+' ? "b/" : "a/");
                        if (side != null) current.Path = side;
                    }
                }

                if (line.StartsWith("@@", StringComparison.Ordinal))
                {
                    inHunk = true;
                    // "@@ -163,7 +163,7 @@ AudioSource:" -> "AudioSource"
                    int close = line.IndexOf("@@", 2, StringComparison.Ordinal);
                    string context = close >= 0 ? line.Substring(close + 2).Trim() : "";
                    currentType = TypeFromKeyLine(context) ?? "";
                    int nextOld, nextNew;
                    HunkStarts(line, out nextOld, out nextNew);
                    removedBlock = StillOpen(removedBlock, currentType, nextOld);
                    addedBlock = StillOpen(addedBlock, currentType, nextNew);
                    oldLine = nextOld;
                    newLine = nextNew;
                    continue;
                }

                if (!inHunk || line.Length == 0) continue;
                if (line.StartsWith("--- a/", StringComparison.Ordinal) ||
                    line.StartsWith("+++ b/", StringComparison.Ordinal)) continue;

                char sign = line[0];
                if (sign != '+' && sign != '-' && sign != ' ') continue; // "\ No newline..." etc.
                string body = line.Substring(1);

                // This line's number on its own side of the diff.
                int lineNo = sign == '+' ? newLine : oldLine;
                if (sign != '+') oldLine++;
                if (sign != '-') newLine++;

                // A block header: "--- !u!114 &-809169823751194735".
                if (body.StartsWith("--- !u!", StringComparison.Ordinal))
                {
                    currentType = "";
                    lastWasNameOverride = false;
                    Block opened = sign == ' ' ? null : new Block
                    {
                        Id = BlockIdOf(body),
                        Sign = sign,
                        HeaderLine = lineNo,
                        Stripped = body.TrimEnd().EndsWith(" stripped", StringComparison.Ordinal)
                    };
                    if (opened != null) blocks.Add(opened);
                    if (sign != '+') removedBlock = opened;
                    if (sign != '-') addedBlock = opened;
                    CountLine(current, sign);
                    continue;
                }

                // Lines inside a wholly added/removed block belong to that block;
                // FinishBlocks decides afterwards what they mean.
                Block own = sign == '-' ? removedBlock : sign == '+' ? addedBlock : null;
                if (own != null) own.Body.Append(body).Append('\n');
                if (sign == ' ')
                {
                    if (removedBlock != null) removedBlock.Body.Append(body).Append('\n');
                    if (addedBlock != null) addedBlock.Body.Append(body).Append('\n');
                }

                // An unindented "TypeName:" line starts the block body. A context
                // type line is shared: git paired a removed header with an added
                // one above it, so it types whichever block on each side waits.
                string keyType = TypeFromKeyLine(body);
                if (keyType != null)
                {
                    currentType = keyType;
                    if (sign != '+' && removedBlock != null && removedBlock.Type == null) removedBlock.Type = keyType;
                    if (sign != '-' && addedBlock != null && addedBlock.Type == null) addedBlock.Type = keyType;
                    if (sign != ' ' && own == null) AddUnique(current.TypesTouched, keyType);
                    CountLine(current, sign);
                    continue;
                }

                string trimmed = body.Trim();

                if (trimmed.StartsWith("m_Name:", StringComparison.Ordinal))
                {
                    string name = trimmed.Substring("m_Name:".Length).Trim();
                    if (name.Length > 0) AddName(current, own, name);
                }

                // Prefab instances in scenes rename objects through overrides:
                //   - target: {...}
                //     propertyPath: m_Name
                //     value: Airlock (3)
                if (lastWasNameOverride && trimmed.StartsWith("value:", StringComparison.Ordinal))
                {
                    string name = trimmed.Substring("value:".Length).Trim();
                    if (name.Length > 0) AddName(current, own, name);
                }
                lastWasNameOverride = trimmed == "propertyPath: m_Name" ||
                                      (lastWasNameOverride && trimmed.StartsWith("value:", StringComparison.Ordinal));

                if (trimmed.StartsWith("m_Script:", StringComparison.Ordinal))
                {
                    string guid = GuidIn(trimmed);
                    if (guid != null)
                    {
                        bool claimed = false;
                        foreach (Block b in new[] { own, sign == ' ' ? removedBlock : null, sign == ' ' ? addedBlock : null })
                        {
                            if (b == null || b.Type != "MonoBehaviour") continue;
                            if (b.ScriptGuid == null) b.ScriptGuid = guid;
                            claimed = true;
                        }
                        if (!claimed && currentType == "MonoBehaviour") AddUnique(current.TouchedScriptGuids, guid);
                    }
                }

                if (sign != ' ')
                {
                    if (currentType.Length > 0 && own == null) AddUnique(current.TypesTouched, currentType);
                    CountLine(current, sign);
                }
            }

            FinishBlocks(current, blocks);
            return result;
        }

        /// <summary>One "--- !u!" block that a diff shows as wholly added or removed.</summary>
        private class Block
        {
            public string Id = "";
            public char Sign;
            public int HeaderLine; // line number of the "--- !u!" header on its own side
            public string Type;
            public string ScriptGuid;
            public bool Stripped;
            public readonly System.Text.StringBuilder Body = new System.Text.StringBuilder();
            public readonly List<string> Names = new List<string>();
        }

        /// <summary>
        /// Unity writes a script component's m_Script line nine lines below its
        /// "--- !u!114" header (MonoBehaviour:, then seven fixed fields).
        /// </summary>
        private const int ScriptLineOffset = 9;

        /// <summary>
        /// Whether a wholly added or removed block carries on into the next hunk.
        /// Git can split one block across two hunks: pepperspray (#604) changed a
        /// script component's id in one hunk and its m_Script line in the next, so
        /// the swapped script was lost. A block stays open only when it is a
        /// script component still waiting for its m_Script line, the next hunk
        /// is inside a MonoBehaviour, and that hunk starts before the block's
        /// m_Script line would be, so no other block can start in the gap.
        /// </summary>
        private static Block StillOpen(Block block, string hunkType, int nextStart)
        {
            if (block == null || block.Type != "MonoBehaviour" || block.ScriptGuid != null) return null;
            if (hunkType != "MonoBehaviour") return null;
            int gap = nextStart - block.HeaderLine;
            return gap > 0 && gap <= ScriptLineOffset ? block : null;
        }

        /// <summary>"@@ -163,7 +165,7 @@" -> 163 and 165. Zero when the header does not parse.</summary>
        public static void HunkStarts(string header, out int oldStart, out int newStart)
        {
            oldStart = newStart = 0;
            int minus = header.IndexOf(" -", StringComparison.Ordinal);
            int plus = header.IndexOf(" +", StringComparison.Ordinal);
            if (minus >= 0) oldStart = LeadingNumber(header, minus + 2);
            if (plus >= 0) newStart = LeadingNumber(header, plus + 2);
        }

        private static int LeadingNumber(string text, int start)
        {
            int n = 0, i = start;
            while (i < text.Length && char.IsDigit(text[i]) && n < 100000000) n = n * 10 + (text[i++] - '0');
            return n;
        }

        /// <summary>Names seen outside whole blocks, per file, so a dropped block only drops its own names.</summary>
        private static readonly Dictionary<AssetChange, HashSet<string>> NamesOutsideBlocks =
            new Dictionary<AssetChange, HashSet<string>>();

        private static void AddName(AssetChange change, Block block, string name)
        {
            AddUnique(change.ObjectNames, name);
            if (block != null) { AddUnique(block.Names, name); return; }
            HashSet<string> outside;
            if (!NamesOutsideBlocks.TryGetValue(change, out outside))
                NamesOutsideBlocks[change] = outside = new HashSet<string>();
            outside.Add(name);
        }

        /// <summary>
        /// Turns the file's added/removed blocks into AddedTypes/RemovedTypes and
        /// the script guid lists. Three kinds of block are NOT additions or removals:
        ///   * a "stripped" block is only a reference stub to an object that lives
        ///     in a nested prefab, so adding one neither adds nor edits the object;
        ///   * a block whose id is both removed and added with the same text only
        ///     moved within the file (git aligned the text differently): nothing
        ///     changed, and names seen only inside it are not "named in the change";
        ///   * the same, but with different text: the object was edited, not added.
        /// </summary>
        private static void FinishBlocks(AssetChange change, List<Block> blocks)
        {
            if (change != null)
            {
                var addedBody = new Dictionary<string, string>();
                var removedBody = new Dictionary<string, string>();
                foreach (Block b in blocks)
                {
                    if (b.Id.Length == 0) continue;
                    (b.Sign == '+' ? addedBody : removedBody)[b.Id] = b.Body.ToString();
                }

                var keptNames = new HashSet<string>();
                var droppedNames = new List<string>();
                foreach (Block b in blocks)
                {
                    bool moved = addedBody.ContainsKey(b.Id) && removedBody.ContainsKey(b.Id);
                    bool unchanged = moved && addedBody[b.Id] == removedBody[b.Id];
                    if (b.Stripped || unchanged || b.Type == null)
                    {
                        droppedNames.AddRange(b.Names);
                        continue;
                    }
                    foreach (string n in b.Names) keptNames.Add(n);
                    if (moved)
                    {
                        AddUnique(change.TypesTouched, b.Type);
                        if (b.Type == "MonoBehaviour" && b.ScriptGuid != null)
                            AddUnique(change.TouchedScriptGuids, b.ScriptGuid);
                        continue;
                    }
                    bool isAdd = b.Sign == '+';
                    AddUnique(isAdd ? change.AddedTypes : change.RemovedTypes, b.Type);
                    if (b.Type == "MonoBehaviour" && b.ScriptGuid != null)
                        AddUnique(isAdd ? change.AddedScriptGuids : change.RemovedScriptGuids, b.ScriptGuid);
                }

                HashSet<string> outside;
                NamesOutsideBlocks.TryGetValue(change, out outside);
                foreach (string n in droppedNames)
                    if (!keptNames.Contains(n) && (outside == null || !outside.Contains(n)))
                        change.ObjectNames.Remove(n);
                NamesOutsideBlocks.Remove(change);
            }
            blocks.Clear();
        }

        /// <summary>"--- !u!114 &amp;-8091 stripped" -> "114 &amp;-8091" (class id and file id).</summary>
        public static string BlockIdOf(string header)
        {
            string rest = header.Substring("--- !u!".Length).Trim();
            if (rest.EndsWith(" stripped", StringComparison.Ordinal))
                rest = rest.Substring(0, rest.Length - " stripped".Length).TrimEnd();
            return rest;
        }

        // -------------------------------------------------------------------
        // HELPERS (public where the tests check them directly)
        // -------------------------------------------------------------------

        /// <summary>True for paths ending in .prefab or .unity.</summary>
        public static bool IsSceneOrPrefab(string path)
        {
            if (string.IsNullOrEmpty(path)) return false;
            return path.EndsWith(".prefab", StringComparison.OrdinalIgnoreCase) ||
                   path.EndsWith(".unity", StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>"Assets/Doors/Airlock Classic.prefab" -> "Airlock Classic".</summary>
        public static string AssetNameOf(string path)
        {
            if (string.IsNullOrEmpty(path)) return "";
            int slash = path.LastIndexOfAny(new[] { '/', '\\' });
            string file = slash >= 0 ? path.Substring(slash + 1) : path;
            int dot = file.LastIndexOf('.');
            return dot > 0 ? file.Substring(0, dot) : file;
        }

        /// <summary>
        /// "diff --git a/X b/X" -> "X". The header is only a first guess: the
        /// "rename to", "+++ b/" and "--- a/" lines that follow it name the file
        /// exactly, and Parse takes the path from them when they are there.
        /// Paths may contain spaces, and a folder may end in " b", so an unquoted
        /// header is split in the middle when both halves name the same file.
        /// Quoted halves ("a/..." "b/...") are unquoted.
        /// </summary>
        public static string PathFromDiffHeader(string line)
        {
            string rest = line.StartsWith("diff --git ", StringComparison.Ordinal)
                ? line.Substring("diff --git ".Length).TrimEnd('\r', '\n')
                : line;

            // The new side is quoted: take the last quoted token.
            if (rest.EndsWith("\"", StringComparison.Ordinal))
            {
                int q = rest.LastIndexOf(" \"b/", StringComparison.Ordinal);
                if (q >= 0) return StripSide(GitLogParser.UnquoteGitPath(rest.Substring(q + 1)), "b/");
            }

            // No rename: "a/X b/X" has the same X twice around the middle space.
            if (rest.StartsWith("a/", StringComparison.Ordinal) && rest.Length % 2 == 1)
            {
                int n = (rest.Length - 5) / 2;
                if (n > 0)
                {
                    string first = rest.Substring(2, n);
                    if (rest.Substring(n + 2) == " b/" + first) return first;
                }
            }

            int b = rest.LastIndexOf(" b/", StringComparison.Ordinal);
            return b >= 0 ? rest.Substring(b + 3).Trim() : "";
        }

        /// <summary>
        /// "+++ b/Assets/X.prefab" -> "Assets/X.prefab". Git ends the line with a
        /// tab when the path has a space, and quotes unusual paths. Returns null
        /// for /dev/null (the side that does not exist).
        /// </summary>
        public static string PathFromFileLine(string line, string prefix)
        {
            if (line.Length < 4) return null;
            string text = line.Substring(4).TrimEnd('\t', '\r');
            if (text == "/dev/null") return null;
            text = GitLogParser.UnquoteGitPath(text);
            return text.StartsWith(prefix, StringComparison.Ordinal) ? text.Substring(prefix.Length) : null;
        }

        private static string StripSide(string path, string prefix)
        {
            return path.StartsWith(prefix, StringComparison.Ordinal) ? path.Substring(prefix.Length) : path;
        }

        /// <summary>
        /// "AudioSource:" -> "AudioSource"; anything indented, empty, or not a
        /// bare identifier followed by a colon -> null.
        /// </summary>
        public static string TypeFromKeyLine(string text)
        {
            if (string.IsNullOrEmpty(text)) return null;
            if (text[0] == ' ' || text[0] == '\t' || text[0] == '-') return null;
            string t = text.TrimEnd();
            if (t.Length < 2 || t[t.Length - 1] != ':') return null;
            string name = t.Substring(0, t.Length - 1);
            foreach (char c in name)
            {
                if (!char.IsLetterOrDigit(c) && c != '_') return null;
            }
            return char.IsLetter(name[0]) ? name : null;
        }

        /// <summary>Pulls the 32-hex guid out of "{fileID: ..., guid: abc..., type: 3}".</summary>
        public static string GuidIn(string text)
        {
            int g = text.IndexOf("guid:", StringComparison.Ordinal);
            if (g < 0) return null;
            string rest = text.Substring(g + "guid:".Length).TrimStart();
            int end = 0;
            while (end < rest.Length && Uri.IsHexDigit(rest[end])) end++;
            return end == 32 ? rest.Substring(0, 32).ToLowerInvariant() : null;
        }

        private static void CountLine(AssetChange change, char sign)
        {
            if (sign == '+') change.LinesAdded++;
            else if (sign == '-') change.LinesRemoved++;
        }

        private static void AddUnique(List<string> list, string value)
        {
            if (!list.Contains(value)) list.Add(value);
        }

        private static string FirstToken(string text)
        {
            int space = text.IndexOf(' ');
            return space < 0 ? text : text.Substring(0, space);
        }
    }
}
