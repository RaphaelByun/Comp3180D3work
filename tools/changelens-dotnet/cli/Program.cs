using System; using ChangeLens.Editor;
// usage: cli <repo> <since> <until> <outFolder> <title>
//        cli --regen <studyFolder> <outFolder> <title>   (rebuild the study files from <studyFolder>/export)
class P { static int Main(string[] a) {
  if (a.Length > 0 && a[0] == "--regen") {
    var frozen = WeekExport.FromFolder(System.IO.Path.Combine(a[1], "export"));
    Console.WriteLine(StudyExport.WriteStudyFiles(frozen, a[2], a[3])); return 0; }
  var ex = WeekExport.FromGit(a[0], a[1], a[2]);
  foreach (string w in ex.Warnings) Console.Error.WriteLine("warning: " + w);
  ex.SaveTo(System.IO.Path.Combine(a[3], "export"));
  Console.WriteLine(StudyExport.WriteStudyFiles(ex, a[3], a[4])); return 0; } }
