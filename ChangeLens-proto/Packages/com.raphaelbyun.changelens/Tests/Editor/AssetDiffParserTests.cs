// AssetDiffParserTests.cs
// ---------------------------------------------------------------------------
// EditMode tests for the committed tier: AssetDiffParser, GuidIndex and the
// two versions of the ProducerReport page.
//
// The sample patch below is cut down from a real SS3D week (commits #611 and
// #610, February 2021): one prefab whose AudioSource settings changed, and one
// prefab that gained two script components.
// ---------------------------------------------------------------------------

using System.Collections.Generic;
using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    internal static class SamplePatch
    {
        public const string Text =
            "commit ea23f08c38c39ccc4ff9abf6ae496cedc53a8c50\n" +
            "Author: Dev One <one@example.com>\n" +
            "Date:   2021-02-14 21:42:42 +0100\n" +
            "\n" +
            "    Add sound fall off to airlocks (#611)\n" +
            "\n" +
            "diff --git a/Assets/Doors/Airlock Classic.prefab b/Assets/Doors/Airlock Classic.prefab\n" +
            "index 133b340a..8ff43c6a 100644\n" +
            "--- a/Assets/Doors/Airlock Classic.prefab\n" +
            "+++ b/Assets/Doors/Airlock Classic.prefab\n" +
            "@@ -163,7 +163,7 @@ AudioSource:\n" +
            "   m_PlayOnAwake: 0\n" +
            "-  m_Volume: 0.25\n" +
            "+  m_Volume: 1\n" +
            "   m_Pitch: 1\n" +
            "commit 61a96bf1cba77aa508867fdc1d651442977cdff7\n" +
            "Author: Dev Two <two@example.com>\n" +
            "Date:   2021-02-13 10:00:00 +0100\n" +
            "\n" +
            "    Add emergency light and light interactions (#610)\n" +
            "\n" +
            "diff --git a/Assets/Lights/Emergency Light Fixture.prefab b/Assets/Lights/Emergency Light Fixture.prefab\n" +
            "index 1..2 100644\n" +
            "--- a/Assets/Lights/Emergency Light Fixture.prefab\n" +
            "+++ b/Assets/Lights/Emergency Light Fixture.prefab\n" +
            "@@ -471,6 +471,7 @@ GameObject:\n" +
            "   - component: {fileID: 5034072719782870709}\n" +
            "+  - component: {fileID: -809169823751194735}\n" +
            "   m_Layer: 0\n" +
            "   m_Name: Bulb Socket\n" +
            "@@ -535,3 +537,12 @@ MonoBehaviour:\n" +
            "   tileState:\n" +
            "+--- !u!114 &-809169823751194735\n" +
            "+MonoBehaviour:\n" +
            "+  m_GameObject: {fileID: 8824907131049981641}\n" +
            "+  m_Script: {fileID: 11500000, guid: 307b90d11903d8c42bef2ae0d15ce5f9, type: 3}\n" +
            "+  m_Name: \n" +
            "+--- !u!54 &123\n" +
            "+Rigidbody:\n" +
            "+  m_Mass: 1\n" +
            "diff --git a/Assets/Scripts/Light.cs b/Assets/Scripts/Light.cs\n" +
            "@@ -1,1 +1,1 @@\n" +
            "-old\n" +
            "+new\n";

        public const string Log =
            "commit ea23f08c38c39ccc4ff9abf6ae496cedc53a8c50\n" +
            "Author: Dev One <one@example.com>\n" +
            "Date:   2021-02-14 21:42:42 +0100\n" +
            "\n" +
            "    Add sound fall off to airlocks (#611)\n" +
            "\n" +
            "M\tAssets/Doors/Airlock Classic.prefab\n" +
            "\n" +
            "commit 61a96bf1cba77aa508867fdc1d651442977cdff7\n" +
            "Author: Dev Two <two@example.com>\n" +
            "Date:   2021-02-13 10:00:00 +0100\n" +
            "\n" +
            "    Add emergency light and light interactions (#610)\n" +
            "\n" +
            "M\tAssets/Lights/Emergency Light Fixture.prefab\n" +
            "M\tAssets/Scripts/Light.cs\n" +
            "A\tAssets/Art/bulb.png\n" +
            "A\tAssets/Art/bulb.png.meta\n";

        public const string Guids =
            "61a96bf1cba77aa508867fdc1d651442977cdff7:Assets/Scripts/EmergencyLight.cs.meta:guid: 307b90d11903d8c42bef2ae0d15ce5f9\n" +
            "61a96bf1cba77aa508867fdc1d651442977cdff7:Assets/Scripts/Other.cs.meta:guid: 9b91ecbcc199f4492b9a91e820070131\n";
    }

    public class AssetDiffParserTests
    {
        [Test]
        public void Parse_KeepsOnlyScenesAndPrefabs()
        {
            List<AssetChange> changes = AssetDiffParser.Parse(SamplePatch.Text);
            Assert.AreEqual(2, changes.Count);
            Assert.AreEqual("Airlock Classic", changes[0].AssetName);
            Assert.AreEqual("Emergency Light Fixture", changes[1].AssetName);
        }

        [Test]
        public void Parse_AttributesChangedLinesToTheHunkHeaderType()
        {
            AssetChange airlock = AssetDiffParser.Parse(SamplePatch.Text)[0];
            CollectionAssert.AreEqual(new[] { "AudioSource" }, airlock.TypesTouched);
            Assert.AreEqual(1, airlock.LinesAdded);
            Assert.AreEqual(1, airlock.LinesRemoved);
            Assert.AreEqual("ea23f08c38c39ccc4ff9abf6ae496cedc53a8c50", airlock.CommitHash);
        }

        [Test]
        public void Parse_FindsAddedBlocksScriptGuidsAndObjectNames()
        {
            AssetChange light = AssetDiffParser.Parse(SamplePatch.Text)[1];
            CollectionAssert.AreEquivalent(new[] { "MonoBehaviour", "Rigidbody" }, light.AddedTypes);
            CollectionAssert.AreEqual(new[] { "307b90d11903d8c42bef2ae0d15ce5f9" }, light.AddedScriptGuids);
            CollectionAssert.AreEqual(new[] { "Bulb Socket" }, light.ObjectNames);
            CollectionAssert.Contains(light.TypesTouched, "GameObject");
        }

        [Test]
        public void Parse_ReadsNameOverridesOnPlacedPrefabs()
        {
            string patch =
                "commit abc\n" +
                "diff --git a/Assets/Scenes/Station.unity b/Assets/Scenes/Station.unity\n" +
                "@@ -10,4 +10,4 @@ PrefabInstance:\n" +
                "     - target: {fileID: 1}\n" +
                "       propertyPath: m_Name\n" +
                "-      value: Airlock (2)\n" +
                "+      value: Airlock (3)\n";
            AssetChange scene = AssetDiffParser.Parse(patch)[0];
            Assert.IsTrue(scene.IsScene);
            CollectionAssert.Contains(scene.ObjectNames, "Airlock (2)");
            CollectionAssert.Contains(scene.ObjectNames, "Airlock (3)");
            CollectionAssert.Contains(scene.TypesTouched, "PrefabInstance");
        }

        [Test]
        public void Parse_FlagsNewFiles()
        {
            string patch =
                "commit abc\n" +
                "diff --git a/Assets/New.prefab b/Assets/New.prefab\n" +
                "new file mode 100644\n" +
                "@@ -0,0 +1,2 @@\n" +
                "+--- !u!1 &1\n" +
                "+GameObject:\n";
            Assert.IsTrue(AssetDiffParser.Parse(patch)[0].FileAdded);
        }

        [Test]
        public void Helpers_HandleSpacesAndBadInput()
        {
            Assert.AreEqual("Assets/A B/C D.prefab",
                AssetDiffParser.PathFromDiffHeader("diff --git a/Assets/A B/C D.prefab b/Assets/A B/C D.prefab"));
            Assert.AreEqual("AudioSource", AssetDiffParser.TypeFromKeyLine("AudioSource:"));
            Assert.IsNull(AssetDiffParser.TypeFromKeyLine("  m_Volume: 1"));
            Assert.IsNull(AssetDiffParser.TypeFromKeyLine("m_Volume: 1"));
            Assert.IsNull(AssetDiffParser.GuidIn("guid: 123"));
            Assert.AreEqual(0, AssetDiffParser.Parse(null).Count);
        }

        // Found in the reserve week of 14 Dec 2020 (#577): a prefab moved with no
        // content change has no hunk, so the page said "changed (0 lines)".
        [Test]
        public void Parse_ReadsAPureRename()
        {
            string patch =
                "commit abc\n" +
                "diff --git a/Assets/Tools/Welder_Flame.prefab b/Assets/Tools/Welder/Welder_Flame.prefab\n" +
                "similarity index 100%\n" +
                "rename from Assets/Tools/Welder_Flame.prefab\n" +
                "rename to Assets/Tools/Welder/Welder_Flame.prefab\n";
            AssetChange change = AssetDiffParser.Parse(patch)[0];
            Assert.AreEqual("Assets/Tools/Welder/Welder_Flame.prefab", change.Path);
            Assert.AreEqual("Assets/Tools/Welder_Flame.prefab", change.RenamedFrom);
            Assert.AreEqual(0, change.LinesAdded + change.LinesRemoved);
        }

        // A folder whose name ends in " b" used to cut the path at the last " b/".
        [Test]
        public void Parse_KeepsAFolderEndingInB()
        {
            Assert.AreEqual("Assets/Level b/Door.prefab",
                AssetDiffParser.PathFromDiffHeader("diff --git a/Assets/Level b/Door.prefab b/Assets/Level b/Door.prefab"));
            string patch =
                "commit abc\n" +
                "diff --git a/Assets/Level b/Door.prefab b/Assets/Level b/Door.prefab\n" +
                "index 1..2 100644\n" +
                "--- a/Assets/Level b/Door.prefab\t\n" +
                "+++ b/Assets/Level b/Door.prefab\t\n" +
                "@@ -1,2 +1,2 @@ GameObject:\n" +
                "-  m_Layer: 0\n" +
                "+  m_Layer: 8\n";
            Assert.AreEqual("Assets/Level b/Door.prefab", AssetDiffParser.Parse(patch)[0].Path);
        }

        // Without core.quotepath=false git quotes non-ASCII paths, octal-escaped.
        [Test]
        public void Parse_UnquotesNonAsciiPaths()
        {
            string patch =
                "commit abc\n" +
                "diff --git \"a/Assets/Prefabs/Kiste_\\303\\204pfel.prefab\" \"b/Assets/Prefabs/Kiste_\\303\\204pfel.prefab\"\n" +
                "index 1..2 100644\n" +
                "--- \"a/Assets/Prefabs/Kiste_\\303\\204pfel.prefab\"\n" +
                "+++ \"b/Assets/Prefabs/Kiste_\\303\\204pfel.prefab\"\n" +
                "@@ -1,2 +1,2 @@ GameObject:\n" +
                "-  m_Layer: 0\n" +
                "+  m_Layer: 8\n";
            List<AssetChange> changes = AssetDiffParser.Parse(patch);
            Assert.AreEqual(1, changes.Count);
            Assert.AreEqual("Assets/Prefabs/Kiste_\u00C4pfel.prefab", changes[0].Path);
            Assert.AreEqual("Kiste_\u00C4pfel", changes[0].AssetName);
        }

        [Test]
        public void Parse_ReadsTheOldPathOfADeletedFile()
        {
            string patch =
                "commit abc\n" +
                "diff --git a/Assets/Old Door.prefab b/Assets/Old Door.prefab\n" +
                "deleted file mode 100644\n" +
                "--- a/Assets/Old Door.prefab\t\n" +
                "+++ /dev/null\n" +
                "@@ -1,2 +0,0 @@\n" +
                "---- !u!1 &1\n" +
                "-GameObject:\n";
            AssetChange change = AssetDiffParser.Parse(patch)[0];
            Assert.AreEqual("Assets/Old Door.prefab", change.Path);
            Assert.IsTrue(change.FileDeleted);
        }

        // Found by the February fidelity check (pepperspray, #604): a "stripped"
        // block is a reference stub to an object inside a nested prefab, so
        // adding one does not add a Particle System.
        [Test]
        public void Parse_StrippedBlocksAreNotAdditions()
        {
            List<AssetChange> changes = AssetDiffParser.Parse(
                "commit 0059f5da\n" +
                "diff --git a/Assets/Items/pepperspray.prefab b/Assets/Items/pepperspray.prefab\n" +
                "@@ -10,3 +10,9 @@ PrefabInstance:\n" +
                "   m_SourcePrefab: {fileID: 100100000, guid: 7fc08e70000000000000000000000000, type: 3}\n" +
                "+--- !u!198 &5571 stripped\n" +
                "+ParticleSystem:\n" +
                "+  m_CorrespondingSourceObject: {fileID: 1}\n" +
                "+--- !u!114 &5572\n" +
                "+MonoBehaviour:\n" +
                "+  m_Script: {fileID: 11500000, guid: 307b90d11903d8c42bef2ae0d15ce5f9, type: 3}\n");

            Assert.AreEqual(1, changes.Count);
            CollectionAssert.DoesNotContain(changes[0].AddedTypes, "ParticleSystem");
            CollectionAssert.AreEqual(new[] { "MonoBehaviour" }, changes[0].AddedTypes);
            CollectionAssert.AreEqual(new[] { "307b90d11903d8c42bef2ae0d15ce5f9" }, changes[0].AddedScriptGuids);
        }

        // Found by the February fidelity check (EmptyMapScene, #588): a block
        // whose id is both removed and added only moved within the file.
        [Test]
        public void Parse_BlocksThatOnlyMoveAreNotAddedOrRemoved()
        {
            List<AssetChange> changes = AssetDiffParser.Parse(
                "commit 37e22a35\n" +
                "diff --git a/Assets/Maps/EmptyMapScene.unity b/Assets/Maps/EmptyMapScene.unity\n" +
                "@@ -100,6 +100,0 @@ Transform:\n" +
                "---- !u!114 &77\n" +
                "-MonoBehaviour:\n" +
                "-  m_Script: {fileID: 11500000, guid: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, type: 3}\n" +
                "@@ -900,0 +894,6 @@ Transform:\n" +
                "+--- !u!114 &77\n" +
                "+MonoBehaviour:\n" +
                "+  m_Script: {fileID: 11500000, guid: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, type: 3}\n" +
                "+--- !u!4 &78\n" +
                "+Transform:\n" +
                "+  m_LocalPosition: {x: 0, y: 0, z: 0}\n");

            Assert.AreEqual(1, changes.Count);
            CollectionAssert.AreEqual(new[] { "Transform" }, changes[0].AddedTypes);
            CollectionAssert.IsEmpty(changes[0].RemovedTypes);
            CollectionAssert.IsEmpty(changes[0].AddedScriptGuids);
            CollectionAssert.IsEmpty(changes[0].RemovedScriptGuids);
            Assert.AreEqual("114 &77", AssetDiffParser.BlockIdOf("--- !u!114 &77 stripped"));
        }

        // Found by the February fidelity check (Server Lobby, #588): git can pair
        // a removed header with an added one above a single shared type line.
        [Test]
        public void Parse_PairedHeadersAboveASharedTypeLineAreBothCounted()
        {
            List<AssetChange> changes = AssetDiffParser.Parse(
                "commit 37e22a35\n" +
                "diff --git a/Assets/Scenes/Server Lobby.unity b/Assets/Scenes/Server Lobby.unity\n" +
                "@@ -5960,6 +5960,6 @@ Canvas:\n" +
                "   m_TargetDisplay: 0\n" +
                "---- !u!1001 &500182125\n" +
                "+--- !u!1001 &443733060\n" +
                " PrefabInstance:\n" +
                "   m_ObjectHideFlags: 0\n");

            CollectionAssert.AreEqual(new[] { "PrefabInstance" }, changes[0].AddedTypes);
            CollectionAssert.AreEqual(new[] { "PrefabInstance" }, changes[0].RemovedTypes);
        }

        // Found by the February fidelity check: SS3D has two .meta files with
        // one guid, so the page must not pick one of them silently.
        [Test]
        public void GuidIndex_NamesEveryCandidateForADuplicatedGuid()
        {
            GuidIndex index = GuidIndex.Parse(
                "abc:Assets/Managers/LoadingScreenManager.cs.meta:guid: 0ec239178bc4ef641bdaa2c430aa2918\n" +
                "abc:Assets/Tile/TileBase.cs.meta:guid: 0ec239178bc4ef641bdaa2c430aa2918\n");
            Assert.AreEqual("LoadingScreenManager or TileBase", GuidIndex.NameFor(index, "0ec239178bc4ef641bdaa2c430aa2918"));
        }

        [Test]
        public void GuidIndex_StripsRevisionAndMetaSuffix()
        {
            GuidIndex index = GuidIndex.Parse(SamplePatch.Guids);
            Assert.AreEqual(2, index.Count);
            Assert.AreEqual("Assets/Scripts/EmergencyLight.cs", index.PathFor("307b90d11903d8c42bef2ae0d15ce5f9"));
            Assert.AreEqual("EmergencyLight", GuidIndex.NameFor(index, "307B90D11903D8C42BEF2AE0D15CE5F9"));
            Assert.IsNull(GuidIndex.NameFor(index, "00000000000000000000000000000000"));
        }
    }

    public class ProducerReportTests
    {
        private static ProducerReport Build(ReportCondition condition)
        {
            ChangeReport counts = ChangeReport.Build(GitLogParser.Parse(SamplePatch.Log), "sample");
            return ProducerReport.Build(counts, AssetDiffParser.Parse(SamplePatch.Text),
                                        GuidIndex.Parse(SamplePatch.Guids), condition, "Sample game");
        }

        [Test]
        public void Baseline_NeverNamesScenesOrPrefabs()
        {
            string page = Build(ReportCondition.Baseline).ToMarkdown();
            StringAssert.DoesNotContain("Scenes and prefabs changed", page);
            StringAssert.DoesNotContain("Airlock Classic", page);
            StringAssert.DoesNotContain("EmergencyLight", page);
            StringAssert.Contains("Where the work went", page);
        }

        [Test]
        public void Treatment_NamesAssetsComponentsAndScripts()
        {
            string page = Build(ReportCondition.Treatment).ToMarkdown();
            StringAssert.Contains("**Airlock Classic** (prefab", page);
            StringAssert.Contains("edited Audio Source", page);
            StringAssert.Contains("added physics body, EmergencyLight script", page);
            StringAssert.Contains("objects named in the change: Bulb Socket", page);
        }

        [Test]
        public void Header_CountsChangesPeopleAndFiles()
        {
            string page = Build(ReportCondition.Baseline).ToMarkdown();
            StringAssert.Contains("2 changes by 2 people · 5 file changes", page);
            StringAssert.Contains("| Scenes and prefabs | 2 | 40% |", page);
        }

        [Test]
        public void EveryClaimPointsAtACommit()
        {
            ProducerReport report = Build(ReportCondition.Treatment);
            report.ToMarkdown();
            Assert.Greater(report.Claims.Count, 5);
            foreach (Claim claim in report.Claims)
            {
                Assert.IsNotEmpty(claim.Commits, "claim without a source: " + claim.Text);
            }
            StringAssert.Contains("S / C / U", report.FidelityChecklistMarkdown());
        }

        // On a tie the page used to name whichever area came first in the list.
        [Test]
        public void LargestArea_NamesEveryAreaOnATie()
        {
            string log =
                "commit aaaa000000000000000000000000000000000000\n" +
                "Author: Dev <dev@example.com>\n" +
                "Date:   2021-03-09 10:00:00 +0000\n\n" +
                "    Tie\n\n" +
                "M\tAssets/Scripts/Door.cs\n" +
                "M\tAssets/Prefabs/Door.prefab\n" +
                "M\tAssets/Art/door.png\n";
            ProducerReport tie = ProducerReport.Build(ChangeReport.Build(GitLogParser.Parse(log), "t"), null, null,
                                                      ReportCondition.Baseline, "t");
            StringAssert.Contains("Largest areas this week: **Code**, **Scenes and prefabs** and **Art** (1 each of 3 file changes).",
                                  tie.ToMarkdown());

            string page = Build(ReportCondition.Baseline).ToMarkdown();
            StringAssert.Contains("Largest area this week: **", page);
            StringAssert.DoesNotContain("Largest areas", page);
        }

        [Test]
        public void SplitCamel_ReadsLikeWords()
        {
            Assert.AreEqual("Audio Source", ProducerReport.SplitCamel("AudioSource"));
            Assert.AreEqual("UI Layout", ProducerReport.SplitCamel("UILayout"));
        }

        [Test]
        public void Treatment_SaysWhereAMovedOrRenamedAssetCameFrom()
        {
            ProducerReport report = Build(ReportCondition.Treatment);
            List<string> names;

            var moved = new AssetChange { Path = "Assets/Tools/Welder/welder.prefab", RenamedFrom = "Assets/Tools/welder.prefab" };
            Assert.AreEqual("moved from `Assets/Tools`.", report.DescribeInside(moved, out names));

            var renamed = new AssetChange { Path = "Assets/Tools/Torch.prefab", RenamedFrom = "Assets/Tools/welder.prefab" };
            Assert.AreEqual("renamed from welder.", report.DescribeInside(renamed, out names));

            var both = new AssetChange { Path = "Assets/Gear/Torch.prefab", RenamedFrom = "Assets/Tools/welder.prefab" };
            both.TypesTouched.Add("Transform");
            StringAssert.StartsWith("moved and renamed from `Assets/Tools/welder.prefab`; edited ",
                                    report.DescribeInside(both, out names));
        }
    }
}
