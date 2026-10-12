using System; using ChangeLens.Editor;
// usage: cli <repo> <since> <until> <outFolder> <title>
class P { static int Main(string[] a) {
  var ex = WeekExport.FromGit(a[0], a[1], a[2]);
  ex.SaveTo(System.IO.Path.Combine(a[3], "export"));
  Console.WriteLine(StudyExport.WriteStudyFiles(ex, a[3], a[4])); return 0; } }
