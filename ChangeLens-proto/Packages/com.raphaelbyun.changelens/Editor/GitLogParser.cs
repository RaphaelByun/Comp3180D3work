// GitLogParser.cs
// ---------------------------------------------------------------------------
// Turns the plain text produced by:
//
//     git -c core.quotepath=false log --first-parent --diff-merges=first-parent
//         --name-status --date=iso
//
// into ordinary C# objects that the rest of ChangeLens can work with.
//
// IMPORTANT: this file is deliberately *pure C#*. It does not use UnityEditor
// or UnityEngine at all. That keeps the parsing logic easy to read, easy to
// unit-test, and independent of the Unity Editor.
//
// A git log export looks like this (one block per commit):
//
//     commit 3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f40
//     Author: Jane Dev <jane@example.com>
//     Date:   2025-03-04 10:22:11 +1100
//
//         Fix player jump height
//
//     M	Assets/Scripts/Player.cs
//     A	Assets/Art/hero.png
//     A	Assets/Art/hero.png.meta
//     D	Assets/Old/Legacy.cs
//     R094	Assets/Scripts/Old.cs	Assets/Scripts/New.cs
//
// The single-letter codes mean: A = added, M = modified, D = deleted,
// T = type change, R### = renamed (with a similarity score), C### = copied.
// Rename and copy lines carry TWO paths separated by a tab: old then new.
//
// Git wraps a path in double quotes, C style, when it holds a character it
// will not print as is: "Assets/Kiste_\303\204pfel.prefab". Without
// core.quotepath=false that is any non-ASCII name. With it, a name holding a
// double quote, a backslash or a control character is still quoted.
// UnquoteGitPath undoes this.
// ---------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace ChangeLens.Editor
{
    /// <summary>
    /// The kind of change git recorded for one file inside one commit.
    /// </summary>
    public enum ChangeStatus
    {
        Added,
        Modified,
        Deleted,
        Renamed,
        Copied,
        TypeChanged,
        Unknown
    }

    /// <summary>
    /// One file touched by one commit: "this path was added / modified / ...".
    /// For a rename, <see cref="Path"/> is the NEW path and
    /// <see cref="OldPath"/> is where the file used to live.
    /// </summary>
    public class FileChange
    {
        public ChangeStatus Status;
        public string Path;
        public string OldPath;      // null unless Status is Renamed or Copied
        public int SimilarityScore; // the number in R094 / C100; 0 if absent

        public FileChange(ChangeStatus status, string path, string oldPath = null, int similarityScore = 0)
        {
            Status = status;
            Path = path;
            OldPath = oldPath;
            SimilarityScore = similarityScore;
        }

        public override string ToString()
        {
            return OldPath == null
                ? Status + " " + Path
                : Status + " " + OldPath + " -> " + Path;
        }
    }

    /// <summary>
    /// One commit: who made it, when, its subject line, and every file it touched.
    /// </summary>
    public class CommitRecord
    {
        public string Hash = "";
        public string Author = "";

        /// <summary>The raw date text exactly as git printed it (ISO format).</summary>
        public string Date = "";

        public string Subject = "";
        public List<FileChange> Changes = new List<FileChange>();

        /// <summary>
        /// The date part only ("2025-03-04") taken off the front of <see cref="Date"/>.
        /// Returns an empty string when there is no date.
        /// </summary>
        public string DateOnly
        {
            get
            {
                if (string.IsNullOrEmpty(Date)) return "";
                // ISO dates start with yyyy-MM-dd, which is always 10 characters.
                return Date.Length >= 10 ? Date.Substring(0, 10) : Date;
            }
        }

        /// <summary>A short 7-character hash, the way git itself abbreviates them.</summary>
        public string ShortHash
        {
            get { return Hash.Length >= 7 ? Hash.Substring(0, 7) : Hash; }
        }
    }

    /// <summary>
    /// The parser itself. Call <see cref="Parse"/> with the whole text of a
    /// git log export and you get back a list of commits, in file order.
    /// </summary>
    public static class GitLogParser
    {
        /// <summary>
        /// Reads a whole "git log --name-status" export and returns its commits.
        /// Unrecognised lines are skipped rather than causing an error, because
        /// real exports contain blank lines, commit bodies and stray text.
        /// </summary>
        public static List<CommitRecord> Parse(string logText)
        {
            var commits = new List<CommitRecord>();
            if (string.IsNullOrEmpty(logText))
            {
                return commits; // nothing to do; hand back an empty list, not null
            }

            CommitRecord current = null;
            bool subjectTaken = false; // only the FIRST indented line is the subject

            // Split on both Windows and Unix line endings.
            string[] lines = logText.Replace("\r\n", "\n").Replace('\r', '\n').Split('\n');

            foreach (string rawLine in lines)
            {
                if (rawLine.Length == 0)
                {
                    continue; // blank separator line
                }

                // --- 1. A new commit starts ----------------------------------
                if (rawLine.StartsWith("commit ", StringComparison.Ordinal))
                {
                    current = new CommitRecord();
                    current.Hash = FirstToken(rawLine.Substring("commit ".Length).Trim());
                    subjectTaken = false;
                    commits.Add(current);
                    continue;
                }

                if (current == null)
                {
                    continue; // header junk before the first commit
                }

                // --- 2. Author / Date headers --------------------------------
                if (rawLine.StartsWith("Author:", StringComparison.Ordinal))
                {
                    current.Author = rawLine.Substring("Author:".Length).Trim();
                    continue;
                }
                if (rawLine.StartsWith("Date:", StringComparison.Ordinal))
                {
                    current.Date = rawLine.Substring("Date:".Length).Trim();
                    continue;
                }
                if (rawLine.StartsWith("Merge:", StringComparison.Ordinal) ||
                    rawLine.StartsWith("AuthorDate:", StringComparison.Ordinal) ||
                    rawLine.StartsWith("CommitDate:", StringComparison.Ordinal) ||
                    rawLine.StartsWith("Commit:", StringComparison.Ordinal))
                {
                    continue; // headers ChangeLens does not need
                }

                // --- 3. The indented commit message --------------------------
                // git indents the message by four spaces. The first such line is
                // the subject; anything after it is the body, which we ignore.
                if (rawLine.StartsWith("    ", StringComparison.Ordinal) ||
                    rawLine.StartsWith("\t", StringComparison.Ordinal))
                {
                    if (!subjectTaken)
                    {
                        current.Subject = rawLine.Trim();
                        subjectTaken = true;
                    }
                    continue;
                }

                // --- 4. A name-status line -----------------------------------
                FileChange change = ParseStatusLine(rawLine);
                if (change != null)
                {
                    current.Changes.Add(change);
                }
            }

            return commits;
        }

        /// <summary>
        /// Reads ONE name-status line such as "M&lt;tab&gt;Assets/Player.cs" or
        /// "R094&lt;tab&gt;old.cs&lt;tab&gt;new.cs". Returns null when the line is not one.
        /// Public so the unit tests can check it on its own.
        /// </summary>
        public static FileChange ParseStatusLine(string line)
        {
            if (string.IsNullOrEmpty(line)) return null;

            // Every name-status line is "<code>TAB<path>[TAB<path2>]".
            string[] parts = line.Split('\t');
            if (parts.Length < 2) return null;

            string code = parts[0].Trim();
            if (code.Length == 0) return null;

            char letter = char.ToUpperInvariant(code[0]);
            string tail = code.Substring(1); // the digits after R / C, if any

            switch (letter)
            {
                case 'A':
                    return new FileChange(ChangeStatus.Added, UnquoteGitPath(parts[1].Trim()));
                case 'M':
                    return new FileChange(ChangeStatus.Modified, UnquoteGitPath(parts[1].Trim()));
                case 'D':
                    return new FileChange(ChangeStatus.Deleted, UnquoteGitPath(parts[1].Trim()));
                case 'T':
                    return new FileChange(ChangeStatus.TypeChanged, UnquoteGitPath(parts[1].Trim()));

                case 'R':
                case 'C':
                {
                    // Rename/copy lines carry the old path then the new path.
                    // If the new path is missing we fall back to the old one so
                    // the report still has something sensible to show.
                    string oldPath = UnquoteGitPath(parts[1].Trim());
                    string newPath = parts.Length >= 3 ? UnquoteGitPath(parts[2].Trim()) : oldPath;
                    ChangeStatus status = letter == 'R' ? ChangeStatus.Renamed : ChangeStatus.Copied;
                    return new FileChange(status, newPath, oldPath, ReadScore(tail));
                }
            }

            return null; // not a status line we recognise
        }

        /// <summary>
        /// Undoes git's C-style path quoting, so "Assets/Kiste_\303\204pfel.prefab"
        /// in double quotes becomes Assets/Kiste_Äpfel.prefab. Octal escapes are
        /// UTF-8 bytes. A path not wrapped in double quotes is returned unchanged.
        /// </summary>
        public static string UnquoteGitPath(string path)
        {
            if (path == null || path.Length < 2 || path[0] != '"' || path[path.Length - 1] != '"')
                return path;

            var bytes = new List<byte>();
            int end = path.Length - 1; // index of the closing quote
            for (int i = 1; i < end; i++)
            {
                char c = path[i];
                if (c != '\\' || i + 1 >= end)
                {
                    bytes.AddRange(System.Text.Encoding.UTF8.GetBytes(c.ToString()));
                    continue;
                }
                char e = path[++i];
                if (IsOctal(e) && i + 2 < end && IsOctal(path[i + 1]) && IsOctal(path[i + 2]))
                {
                    bytes.Add((byte)(((e - '0') << 6) | ((path[i + 1] - '0') << 3) | (path[i + 2] - '0')));
                    i += 2;
                    continue;
                }
                switch (e)
                {
                    case 'a': bytes.Add(7); break;
                    case 'b': bytes.Add(8); break;
                    case 't': bytes.Add(9); break;
                    case 'n': bytes.Add(10); break;
                    case 'v': bytes.Add(11); break;
                    case 'f': bytes.Add(12); break;
                    case 'r': bytes.Add(13); break;
                    default: bytes.AddRange(System.Text.Encoding.UTF8.GetBytes(e.ToString())); break; // \" and \\
                }
            }
            return System.Text.Encoding.UTF8.GetString(bytes.ToArray());
        }

        private static bool IsOctal(char c)
        {
            return c >= '0' && c <= '7';
        }

        /// <summary>Reads the numeric similarity score out of "094"; 0 when absent.</summary>
        private static int ReadScore(string digits)
        {
            int value;
            return int.TryParse(digits, out value) ? value : 0;
        }

        /// <summary>Returns the text up to the first space.</summary>
        private static string FirstToken(string text)
        {
            int space = text.IndexOf(' ');
            return space < 0 ? text : text.Substring(0, space);
        }
    }
}
