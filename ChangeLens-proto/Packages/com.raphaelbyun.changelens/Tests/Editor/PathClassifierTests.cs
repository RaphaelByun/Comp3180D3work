// PathClassifierTests.cs
// ---------------------------------------------------------------------------
// EditMode tests for the rules that sort a path into a category.
// The interesting case is ".meta": the sidecar itself is always Meta, but it
// also has to remember what KIND of asset it belongs to.
// ---------------------------------------------------------------------------

using ChangeLens.Editor;
using NUnit.Framework;

namespace ChangeLens.Editor.Tests
{
    public class PathClassifierTests
    {
        [Test]
        public void Code_FilesLandInTheCodeCategory()
        {
            Assert.AreEqual(PathCategory.Code, PathClassifier.CategoryOf("Assets/Scripts/Player.cs"));
            Assert.AreEqual(PathCategory.Code, PathClassifier.CategoryOf("Assets/Shaders/Water.shader"));
            Assert.AreEqual(PathCategory.Code, PathClassifier.CategoryOf("Assets/UI/Panel.uxml"));
        }

        [Test]
        public void ScenesAndPrefabs_AreTheirOwnCategory()
        {
            Assert.AreEqual(PathCategory.ScenePrefab, PathClassifier.CategoryOf("Assets/Scenes/Level1.unity"));
            Assert.AreEqual(PathCategory.ScenePrefab, PathClassifier.CategoryOf("Assets/Prefabs/Enemy.prefab"));
        }

        [Test]
        public void Art_Audio_AndData_AreSortedByExtension()
        {
            Assert.AreEqual(PathCategory.Art, PathClassifier.CategoryOf("Assets/Art/hero.png"));
            Assert.AreEqual(PathCategory.Art, PathClassifier.CategoryOf("Assets/Models/ship.fbx"));
            Assert.AreEqual(PathCategory.Audio, PathClassifier.CategoryOf("Assets/Audio/theme.wav"));
            Assert.AreEqual(PathCategory.DataConfig, PathClassifier.CategoryOf("Assets/Data/balance.json"));
        }

        [Test]
        public void UnknownExtensions_FallBackToOther()
        {
            Assert.AreEqual(PathCategory.Other, PathClassifier.CategoryOf("Assets/Notes.qqq"));
            Assert.AreEqual(PathCategory.Other, PathClassifier.CategoryOf("LICENSE"));
        }

        [Test]
        public void Meta_IsItsOwnCategoryButRemembersItsSibling()
        {
            ClassifiedPath codeMeta = PathClassifier.Classify("Assets/Scripts/Player.cs.meta");

            Assert.IsTrue(codeMeta.IsMeta);
            Assert.AreEqual(PathCategory.Meta, codeMeta.Category, "The sidecar itself is Meta, never Code.");
            Assert.AreEqual(PathCategory.Code, codeMeta.SiblingCategory, "Its sibling is a .cs file.");

            ClassifiedPath artMeta = PathClassifier.Classify("Assets/Art/hero.png.meta");
            Assert.AreEqual(PathCategory.Art, artMeta.SiblingCategory);
        }

        [Test]
        public void SiblingPathOfMeta_ChopsOffTheSuffix()
        {
            Assert.AreEqual("Assets/Art/hero.png",
                PathClassifier.SiblingPathOfMeta("Assets/Art/hero.png.meta"));

            // A path that is not a .meta comes back unchanged.
            Assert.AreEqual("Assets/Art/hero.png",
                PathClassifier.SiblingPathOfMeta("Assets/Art/hero.png"));
        }

        [Test]
        public void ExtensionOf_ReadsOnlyTheLastPathSegment()
        {
            Assert.AreEqual(".cs", PathClassifier.ExtensionOf("Assets/Scripts/Player.cs"));
            Assert.AreEqual(".png", PathClassifier.ExtensionOf("Assets/Art/HERO.PNG"), "Extensions are lower-cased.");
            Assert.AreEqual("", PathClassifier.ExtensionOf("My.Folder/README"), "A dot in a folder is not an extension.");
        }

        [Test]
        public void TopLevelFolder_IsTheFirstSegment()
        {
            Assert.AreEqual("Assets", PathClassifier.TopLevelFolder("Assets/Scripts/Player.cs"));
            Assert.AreEqual("Packages", PathClassifier.TopLevelFolder("Packages/com.example/Editor/Tool.cs"));
            Assert.AreEqual("(root)", PathClassifier.TopLevelFolder("README.md"));
        }

        [Test]
        public void DisplayOrder_CoversEveryCategoryExactlyOnce()
        {
            // If someone adds a category to the enum but forgets the display
            // list, the table in the window would silently lose a row.
            int enumCount = System.Enum.GetValues(typeof(PathCategory)).Length;

            Assert.AreEqual(enumCount, PathClassifier.DisplayOrder.Length);
        }
    }
}
