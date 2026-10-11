param([string]$Docx, [string]$Pdf)
$word = New-Object -ComObject Word.Application
$word.Visible = $false; $word.DisplayAlerts = 0
$doc = $word.Documents.Open($Docx, $false, $true)
$paras = $doc.Paragraphs
$introStart = -1; $refStart = -1; $stmtStart = -1; $appStart = -1
for ($i = 1; $i -le $paras.Count; $i++) {
  $t = $paras.Item($i).Range.Text.Trim()
  if ($introStart -lt 0 -and $t -eq 'Introduction') { $introStart = $paras.Item($i).Range.Start }
  if ($refStart -lt 0 -and $t -eq 'References') { $refStart = $paras.Item($i).Range.Start }
  if ($stmtStart -lt 0 -and $t -like 'Statement on Generative AI*') { $stmtStart = $paras.Item($i).Range.Start }
  if ($appStart -lt 0 -and $t -like 'Appendix A*') { $appStart = $paras.Item($i).Range.Start }
}
$body = $doc.Range($introStart, $refStart).ComputeStatistics(0)
$cover = $doc.Range(0, $introStart).ComputeStatistics(0)
$refs = $doc.Range($refStart, $stmtStart).ComputeStatistics(0)
$stmt = $doc.Range($stmtStart, $appStart).ComputeStatistics(0)
$app = $doc.Range($appStart, $doc.Content.End).ComputeStatistics(0)
"BODY=$body COVER=$cover BODY+COVER=$($body+$cover) REFS=$refs STMT=$stmt APPX=$app PAGES=$($doc.ComputeStatistics(2))"
if ($Pdf) { $doc.SaveAs2($Pdf, 17); "PDF written: $Pdf" }
$doc.Close(0); $word.Quit()
