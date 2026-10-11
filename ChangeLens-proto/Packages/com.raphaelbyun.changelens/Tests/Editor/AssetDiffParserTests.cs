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

        [Test]
        public void SplitCamel_ReadsLikeWords()
        {
            Assert.AreEqual("Audio Source", ProducerReport.SplitCamel("AudioSource"));
            Assert.AreEqual("UI Layout", ProducerReport.SplitCamel("UILayout"));
        }
    }
}
