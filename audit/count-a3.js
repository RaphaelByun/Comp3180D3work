// count-a3.js
// Rough word count for a Markdown draft of the A3 Final Project Report.
// Same sections and guides as count-a3.ps1, which uses Word and gives the
// count that matters. This one is for drafts before they go into the template.
//
// A section starts at a heading whose text (after any "1." or "1 " numbering,
// and without a trailing "(300)", "(~50)" or "(uncounted)" note) is one of the
// template's top-level section names, at any heading level. The name may be
// followed by ": anything" (e.g. "Development Diary Summary (480): fact outline").
// "Appendix A: ..." headings count as the Appendices section.
// Its count runs to the next such heading and includes its own headings.
// Words are runs of non-space characters with a letter or digit in them,
// after link targets, image paths, HTML comments and Markdown marks are removed.
//
// If any of the five counted sections is not found, the report says
// NOT COUNTED and the script exits non-zero, so a draft whose headings were
// not recognised can never show a false "within the limit".
//
// Usage: node audit/count-a3.js path/to/draft.md
// Exit code: 0 when all five sections are found and the total is within 2500; 1 otherwise.
'use strict';
const fs = require('fs');

const COUNTED = [
  ['Project Deliverables', 300],
  ['Development Diary Summary', 500],
  ['Evaluation', 1000],
  ['Learning Reflection', 500],
  ['Industry Relevance and Future Work', 200],
];
const UNCOUNTED = ['Appendices', 'Statement on Generative AI use', 'References'];
const LIMIT = 2500;
const NAMES = COUNTED.map(c => c[0]).concat(UNCOUNTED);

function words(text) {
  const clean = text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|]/g, ' ');
  return clean.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
}

function sectionName(line) {
  const m = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
  if (!m) return null;
  let text = m[1].replace(/^\d+(\.\d+)*\.?\s+/, '').trim();
  // Drop parenthetical notes such as "(300)", "(~50)" or "(uncounted)",
  // wherever they sit, then tidy the spacing.
  text = text.replace(/\s*\([^()]*\)/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  if (/^appendi(x|ces)\b/.test(text)) {
    const rest = text.replace(/^appendi(x|ces)\b/, '');
    if (/^\s*[a-z0-9]{0,3}\s*(:|$)/.test(rest)) return 'Appendices';
  }
  return NAMES.find(n => {
    const l = n.toLowerCase();
    return text === l || text.startsWith(l + ':');
  }) || null;
}

function count(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const totals = { '(before the first section)': 0 };
  let current = '(before the first section)';
  let inFence = false;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; }
    const name = inFence ? null : sectionName(line);
    if (name) { current = name; totals[current] = totals[current] || 0; }
    totals[current] += words(line);
  }
  return totals;
}

function report(totals) {
  const out = ['Counted sections (words / template guide), approximate:'];
  let total = 0;
  const missing = [];
  for (const [name, guide] of COUNTED) {
    if (name in totals) {
      total += totals[name];
      out.push(`  ${name.padEnd(36)} ${String(totals[name]).padStart(5)} / ${guide}`);
    } else {
      missing.push(name);
      out.push(`  ${name.padEnd(36)} MISSING`);
    }
  }
  const parts = [];
  if (missing.length) parts.push(`NOT COUNTED: ${missing.length} of ${COUNTED.length} counted sections not found, so this total is incomplete`);
  if (total > LIMIT) parts.push(`OVER the limit by ${total - LIMIT}`);
  if (!parts.length) parts.push('within the limit');
  const status = parts.join('; ');
  out.push(`  ${'TOTAL'.padEnd(36)} ${String(total).padStart(5)} / ${LIMIT}  (${status})`);
  out.push('', 'Not counted:');
  out.push(`  ${'Before the first section'.padEnd(36)} ${String(totals['(before the first section)']).padStart(5)}`);
  for (const name of UNCOUNTED) {
    out.push(`  ${name.padEnd(36)} ${name in totals ? String(totals[name]).padStart(5) : 'MISSING'}`);
  }
  out.push('', 'Check the final count with count-a3.ps1 in Word.');
  const ok = missing.length === 0 && total <= LIMIT;
  return { text: out.join('\n'), total, missing, ok };
}

module.exports = { words, count, report, sectionName };

if (require.main === module) {
  const file = process.argv[2];
  if (!file) { console.error('usage: node audit/count-a3.js draft.md'); process.exit(2); }
  const r = report(count(fs.readFileSync(file, 'utf8')));
  console.log(r.text);
  process.exit(r.ok ? 0 : 1);
}
