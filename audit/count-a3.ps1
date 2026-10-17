# count-a3.ps1
# Word count for the A3 Final Project Report, built on the A3 template
# (Final Project Report Template.docx). Uses Word itself (COM), so the
# numbers are the ones Word shows.
#
# Counted: the five sections from "Project Deliverables" up to "Appendices".
# Not counted: cover, table of contents, Appendices, Statement on Generative
# AI use and References. Each section's count includes its own headings.
# The section guides are the template's (they sum to 2500). Only the total
# limit is penalised.
#
# Usage:
#   powershell -File audit\count-a3.ps1 -Docx "C:\full\path\report.docx"
#   powershell -File audit\count-a3.ps1 -Docx "C:\full\path\report.docx" -Pdf "C:\full\path\report.pdf"
param([Parameter(Mandatory = $true)][string]$Docx, [string]$Pdf)

$counted = [ordered]@{
  'Project Deliverables'               = 300
  'Development Diary Summary'          = 500
  'Evaluation'                         = 1000
  'Learning Reflection'                = 500
  'Industry Relevance and Future Work' = 200
}
$uncounted = @('Appendices', 'Statement on Generative AI use', 'References')
$limit = 2500

$word = New-Object -ComObject Word.Application
$word.Visible = $false; $word.DisplayAlerts = 0
try {
  $doc = $word.Documents.Open($Docx, $false, $true)

  # Top-level headings (outline level 1), in document order. Table of
  # contents lines are body text, so they are not picked up.
  $heads = @()
  foreach ($p in $doc.Paragraphs) {
    if ($p.OutlineLevel -eq 1) {
      $heads += [pscustomobject]@{ Text = $p.Range.Text.Trim(); Start = $p.Range.Start }
    }
  }

  $sections = @{}
  for ($i = 0; $i -lt $heads.Count; $i++) {
    $end = if ($i + 1 -lt $heads.Count) { $heads[$i + 1].Start } else { $doc.Content.End }
    $words = $doc.Range($heads[$i].Start, $end).ComputeStatistics(0)
    $sections[$heads[$i].Text] = $words
  }

  $total = 0
  "Counted sections (words / template guide):"
  foreach ($name in $counted.Keys) {
    if ($sections.ContainsKey($name)) {
      $n = $sections[$name]; $total += $n
      "  {0,-36} {1,5} / {2}" -f $name, $n, $counted[$name]
    } else {
      "  {0,-36} MISSING (no top-level heading with this text)" -f $name
    }
  }
  $status = if ($total -le $limit) { 'within the limit' } else { 'OVER the limit by ' + ($total - $limit) }
  "  {0,-36} {1,5} / {2}  ({3})" -f 'TOTAL', $total, $limit, $status
  ""
  "Not counted:"
  $first = if ($heads.Count -gt 0) { $heads[0].Start } else { $doc.Content.End }
  "  {0,-36} {1,5}" -f 'Cover and table of contents', $doc.Range(0, $first).ComputeStatistics(0)
  foreach ($name in $uncounted) {
    if ($sections.ContainsKey($name)) { "  {0,-36} {1,5}" -f $name, $sections[$name] }
    else { "  {0,-36} MISSING" -f $name }
  }
  foreach ($h in $heads) {
    if (-not $counted.Contains($h.Text) -and $uncounted -notcontains $h.Text) {
      "  Unexpected top-level heading, not counted: '{0}' ({1} words)" -f $h.Text, $sections[$h.Text]
    }
  }
  "Pages: $($doc.ComputeStatistics(2))"

  if ($Pdf) { $doc.SaveAs2($Pdf, 17); "PDF written: $Pdf" }
  $doc.Close(0)
} finally {
  $word.Quit()
}
