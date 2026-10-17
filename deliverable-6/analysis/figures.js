#!/usr/bin/env node
'use strict';
/*
 * Figure 1 and Tables 1-3 for the A3 Evaluation section (COMP3180 A3, Deliverable 6).
 * Plain Node.js, no dependencies. Reads the same CSVs as analyse.js and uses its checks
 * (complete readers only, pilot excluded, think-aloud segments keyed by reader + segment_id).
 *
 * Usage:
 *   node figures.js                                  (FAKE sample-*.csv data, tables printed only)
 *   node figures.js --scores item-scores.csv --needs need-classifications.csv --key marking-key.csv \
 *                   --codes think-aloud-coding-sheet.csv --outdir deliverable-6/data/figures
 *
 * With --outdir it writes figure-1-paired-differences.svg and tables.md there, and a PNG copy of the
 * figure (figure-1-paired-differences.png, at twice the SVG size) for the Word builder, which embeds
 * PNG or JPG only. The PNG is made by an installed Chrome or Edge in headless mode (no npm package):
 * set CHROME_PATH if it is not found, or give --png no to skip it. Without --outdir, the tables are
 * printed and no image is written. Anything built from a sample-*.csv file is stamped FAKE.
 *
 *   Figure 1: dot plot, one dot per complete reader, treatment minus baseline (-10 to +10).
 *             Producers are filled circles, proxies hollow squares (shape, not colour, so it prints).
 *   Table 1:  all ten needs, the key class, readers matching the key n/N (N = readers who classified it).
 *   Table 2:  full-mark counts by item and condition, and by week within condition (complete readers only).
 *   Table 2b: item 6 Pass / Hedged / Over-claim counts per version (complete readers only).
 *   Table 3:  segment counts per Ko et al. (2007) information type, with the type's question. A segment
 *             counts under its final_code when the D5 resolve step set one, else under its pass 1 code.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const { pathToFileURL } = require('url');
const A = require('./analyse.js');

// The 21 types, from deliverable-5/think-aloud-coding-sheet.md (checked against Ko et al., 2007,
// Section 5 and Figure 3, on 13 Oct 2026). The last three codes are Raphael's own, not Ko et al.'s.
const KO_TYPES = {
  c1: ['Writing Code', 'What data structures or functions can be used to implement this behavior?'],
  c2: ['Writing Code', 'How do I use this data structure or function?'],
  c3: ['Writing Code', 'How can I coordinate this code with this other data structure or function?'],
  s1: ['Submitting a Change', 'Did I make any mistakes in my new code?'],
  s2: ['Submitting a Change', "Did I follow my team's conventions?"],
  s3: ['Submitting a Change', 'Which changes are part of this submission?'],
  b1: ['Triaging Bugs', 'Is this a legitimate problem?'],
  b2: ['Triaging Bugs', 'How difficult will this problem be to fix?'],
  b3: ['Triaging Bugs', 'Is the problem worth fixing?'],
  r1: ['Reproducing a Failure', 'What does the failure look like?'],
  r2: ['Reproducing a Failure', 'In what situations does this failure occur?'],
  u1: ['Understanding Execution Behavior', 'What code could have caused this behavior?'],
  u2: ['Understanding Execution Behavior', "What's statically related to this code?"],
  u3: ['Understanding Execution Behavior', 'What code caused this program state?'],
  d1: ['Reasoning about Design', 'What is the purpose of this code?'],
  d2: ['Reasoning about Design', 'What is the program supposed to do?'],
  d3: ['Reasoning about Design', 'Why was this code implemented this way?'],
  d4: ['Reasoning about Design', 'What are the implications of this change?'],
  a1: ['Maintaining Awareness', 'How have resources I depend on changed?'],
  a2: ['Maintaining Awareness', 'What have my coworkers been doing?'],
  a3: ['Maintaining Awareness', 'What information was relevant to my task?'],
};
const EXTRA_CODES = {
  none: ['Not an information need (extra code, not Ko et al.)', ''],
  other: ['Need outside the 21 types (extra code, not Ko et al.)', ''],
  unclear: ['Cannot tell from the note (extra code, not Ko et al.)', ''],
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function mdTable(head, rows) {
  return ['| ' + head.join(' | ') + ' |', '|' + head.map(() => '---').join('|') + '|']
    .concat(rows.map(r => '| ' + r.join(' | ') + ' |')).join('\n');
}

// ---------- Figure 1 ----------
function figure1Svg(diffs, opts) {
  const fake = opts && opts.fake;
  const W = 640, left = 90, right = 30, top = fake ? 74 : 54, rowH = 26;
  const plotH = Math.max(1, diffs.length) * rowH;
  const H = top + plotH + 70;
  const x = d => left + ((d + 10) / 20) * (W - left - right);
  const ink = '#1F3A5F', grey = '#404040', grid = '#D0D0D0';
  const o = [];
  o.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Calibri, Arial, sans-serif" role="img" aria-labelledby="t d">`);
  o.push(`<title id="t">Figure 1: paired difference per reader</title>`);
  o.push(`<desc id="d">Treatment score minus baseline score out of 10 for each of ${diffs.length} readers. ` +
    esc(diffs.map(r => `${r.p} (${r.role || 'no role'}) ${r.d > 0 ? '+' : ''}${r.d}`).join('; ')) + '.</desc>');
  o.push(`<rect width="${W}" height="${H}" fill="#FFFFFF"/>`);
  if (fake) o.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="16" font-weight="bold" fill="#B00020">FAKE DATA: sample files, not a result</text>`);
  o.push(`<text x="${left}" y="${top - 26}" font-size="14" font-weight="bold" fill="${grey}">Treatment minus baseline, points out of 10 (n = ${diffs.length})</text>`);
  // grid and axis
  for (let t = -10; t <= 10; t += 2) {
    o.push(`<line x1="${x(t)}" y1="${top - 8}" x2="${x(t)}" y2="${top + plotH}" stroke="${t === 0 ? grey : grid}" stroke-width="${t === 0 ? 1.5 : 1}"/>`);
    o.push(`<text x="${x(t)}" y="${top + plotH + 18}" text-anchor="middle" font-size="12" fill="${grey}">${t > 0 ? '+' : ''}${t}</text>`);
  }
  o.push(`<text x="${x(-5)}" y="${top + plotH + 36}" text-anchor="middle" font-size="12" fill="${grey}">lower with names</text>`);
  o.push(`<text x="${x(5)}" y="${top + plotH + 36}" text-anchor="middle" font-size="12" fill="${grey}">higher with names</text>`);
  diffs.forEach((r, i) => {
    const cy = top + i * rowH + rowH / 2, cx = x(r.d);
    o.push(`<text x="${left - 12}" y="${cy + 4}" text-anchor="end" font-size="12" fill="${grey}">${esc(r.p)}</text>`);
    if (/^prod/i.test(r.role)) o.push(`<circle cx="${cx}" cy="${cy}" r="6" fill="${ink}"><title>${esc(r.p)} producer ${r.d > 0 ? '+' : ''}${r.d}</title></circle>`);
    else o.push(`<rect x="${cx - 5.5}" y="${cy - 5.5}" width="11" height="11" fill="#FFFFFF" stroke="${ink}" stroke-width="2"><title>${esc(r.p)} ${esc(r.role || 'no role')} ${r.d > 0 ? '+' : ''}${r.d}</title></rect>`);
  });
  // legend
  const ly = top + plotH + 56;
  o.push(`<circle cx="${left + 6}" cy="${ly - 4}" r="6" fill="${ink}"/><text x="${left + 18}" y="${ly}" font-size="12" fill="${grey}">producer</text>`);
  o.push(`<rect x="${left + 100}" y="${ly - 9.5}" width="11" height="11" fill="#FFFFFF" stroke="${ink}" stroke-width="2"/><text x="${left + 118}" y="${ly}" font-size="12" fill="${grey}">proxy</text>`);
  o.push('</svg>');
  return o.join('\n') + '\n';
}

// ---------- Tables ----------
function table1(needRows, keyRows) {
  const N = A.prepareNeeds(needRows, keyRows);
  const rows = N.perNeed.map(x => [x.id, x.key, `${x.matching}/${x.classified}`]);
  const out = ['**Table 1. The ten needs: the marking key and readers matching it** (D derivable, P partly, N not; n/N = readers matching / readers who classified that need)\n\n' +
    mdTable(['Need', 'Key', 'Readers matching'], rows)];
  N.warnings.forEach(w => out.push('', w));
  return out.join('\n');
}

// Table 2: full-mark counts by condition, then by week within condition (W1/W2 columns).
// Table 2b: item 6 codes per version. Both use the same analyse.js helpers as analyse.js's own tables.
function table2(scoreRows) {
  const S = A.prepareScores(scoreRows);
  const all = A.fullMarkCounts(S), wk = A.fullMarkCounts(S, true);
  const weekHead = wk.length ? wk[0].cells.map(c => `${c.week} ${c.cond === 'baseline' ? 'baseline' : 'treatment'}`) : [];
  const rows = all.map((x, i) => [x.item].concat(x.cells.map(c => `${c.full}/${c.n}`), wk[i].cells.map(c => `${c.full}/${c.n}`)));
  const six = A.item6Counts(S).map(x => [x.code].concat(x.cells.map(c => `${c.k}/${c.n}`)));
  return [`**Table 2. Full marks (2 of 2) per item by condition, and by week within condition** (complete readers only, n = ${S.complete.length})`, '',
    mdTable(['Item', 'Baseline (no names)', 'Treatment (names)'].concat(weekHead), rows), '',
    `**Table 2b. Item 6 (unanswerable) codes per version** (complete readers only, n = ${S.complete.length}; Over-claim is the count that matters, Hedged is shown beside it)`, '',
    mdTable(['Code', 'Baseline (no names)', 'Treatment (names)'], six)].join('\n');
}

// Table 3 counts each segment by its final code where the D5 resolve step set one, else by its pass 1 code.
function table3(codeRows) {
  const C = A.prepareCodes(codeRows);
  const cnt = {};
  let resolved = 0;
  Object.values(C.by).forEach(s => {
    const c = s.f || s['1'];
    if (s.f) resolved++;
    if (c) cnt[c] = (cnt[c] || 0) + 1;
  });
  const total = Object.values(cnt).reduce((a, b) => a + b, 0);
  const codes = Object.keys(cnt).sort((p, q) => cnt[q] - cnt[p] || p.localeCompare(q));
  const unknown = codes.filter(c => !KO_TYPES[c] && !EXTRA_CODES[c]);
  const rows = codes.map(c => {
    const t = KO_TYPES[c] || EXTRA_CODES[c] || ['UNKNOWN CODE: check the sheet', ''];
    return [c, t[0], t[1], String(cnt[c])];
  });
  const never = Object.keys(KO_TYPES).filter(c => !cnt[c]);
  const out = [`**Table 3. Think-aloud segments by information type** (final code after resolution, else pass 1 code; ${resolved} segment(s) with a final code; pilot excluded, ${total} segments; types from Ko et al., 2007)`, '',
    mdTable(['Code', 'Category', 'Information type', 'Segments'], rows)];
  out.push('', `Types never coded: ${never.length ? never.join(', ') : 'none'}.`);
  if (unknown.length) out.push(`WARNING: codes not in the codebook: ${unknown.join(', ')}.`);
  C.warnings.forEach(w => out.push(w));
  return out.join('\n');
}

// ---------- PNG copy of Figure 1 ----------
// The Word builder (build-docx-v2.js) embeds .png/.jpg only. Chrome or Edge in headless mode renders the
// SVG to a PNG, so the tool keeps no npm dependencies. CHROME_PATH wins over the usual install places.
function findChrome(env) {
  env = env || process.env;
  const c = [env.CHROME_PATH];
  for (const base of [env.PROGRAMFILES, env['PROGRAMFILES(X86)'], env.LOCALAPPDATA]) {
    if (!base) continue;
    c.push(path.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    c.push(path.join(base, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
  }
  c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser');
  return c.find(p => p && fs.existsSync(p)) || null;
}

// Width and height from a PNG's IHDR chunk (bytes 16-23); null if the bytes are not a PNG.
function pngSize(buf) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!buf || buf.length < 24 || sig.some((b, i) => buf[i] !== b)) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

// Renders svgFile to pngFile at `scale` times the SVG's own width and height. Throws with the reason on failure.
function svgToPng(svgFile, pngFile, chrome, scale) {
  scale = scale || 2;
  const svg = fs.readFileSync(svgFile, 'utf8');
  const tag = (/<svg[^>]*>/.exec(svg) || [''])[0];
  const w = Number((/\swidth="(\d+)"/.exec(tag) || [])[1]), h = Number((/\sheight="(\d+)"/.exec(tag) || [])[1]);
  if (!w || !h) throw new Error('no width and height on the <svg> element');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-chrome-'));
  try {
    if (fs.existsSync(pngFile)) fs.unlinkSync(pngFile);
    cp.execFileSync(chrome, ['--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
      `--user-data-dir=${profile}`, `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`,
      '--default-background-color=FFFFFFFF', `--screenshot=${path.resolve(pngFile)}`, pathToFileURL(path.resolve(svgFile)).href],
    { stdio: 'ignore', timeout: 60000 });
  } finally {
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* the browser may still hold a file; harmless */ }
  }
  const size = fs.existsSync(pngFile) ? pngSize(fs.readFileSync(pngFile)) : null;
  if (!size) throw new Error('the browser wrote no PNG');
  return size;
}

// ---------- main ----------
function args(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i];
  return o;
}

function build(f) {
  const fake = Object.values(f).some(x => x && path.basename(x).startsWith('sample-'));
  const md = ['# ChangeLens evaluation: Figure 1 and Tables 1-3'];
  if (fake) md.push('', '**FAKE DATA: one or more inputs are sample-*.csv files. Nothing below is a result.**');
  md.push('', 'Inputs: ' + Object.entries(f).filter(([, v]) => v).map(([k, v]) => `${k}=${path.basename(v)}`).join(', '));
  let svg = null;
  if (f.scores) {
    const sRows = A.readCSV(f.scores);
    const S = A.prepareScores(sRows);
    svg = figure1Svg(A.pairedDiffs(S), { fake });
    md.push('', `Figure 1 uses ${S.complete.length} complete reader(s).` +
      (S.excluded.length ? ` Left out: ${S.excluded.map(x => `${x.p} (${x.reasons.join('; ')})`).join('; ')}.` : ''));
    S.warnings.forEach(w => md.push('', w));
    if (S.complete.length < A.FLOOR) md.push('**Below the five-reader floor: A2 fallback. Report this arm as descriptive only and the think-alouds first.**');
  }
  if (f.needs && f.key) md.push('', table1(A.readCSV(f.needs), A.readCSV(f.key)));
  if (f.scores) md.push('', table2(A.readCSV(f.scores)));
  if (f.codes) md.push('', table3(A.readCSV(f.codes)));
  return { md: md.join('\n') + '\n', svg, fake };
}

function main() {
  const a = args(process.argv.slice(2));
  const dir = __dirname;
  const useSample = !a.scores && !a.needs && !a.key && !a.codes;
  const f = {
    scores: a.scores || (useSample ? path.join(dir, 'sample-item-scores.csv') : null),
    needs: a.needs || (useSample ? path.join(dir, 'sample-need-classifications.csv') : null),
    key: a.key || (useSample ? path.join(dir, 'sample-marking-key.csv') : null),
    codes: a.codes || (useSample ? path.join(dir, 'sample-think-aloud-codes.csv') : null),
  };
  const r = build(f);
  if (a.outdir) {
    fs.mkdirSync(a.outdir, { recursive: true });
    const stem = r.fake ? 'FAKE-' : '';
    fs.writeFileSync(path.join(a.outdir, `${stem}tables.md`), r.md);
    const written = [`${stem}tables.md`];
    let note = '';
    if (r.svg) {
      const svgFile = path.join(a.outdir, `${stem}figure-1-paired-differences.svg`);
      fs.writeFileSync(svgFile, r.svg);
      written.push(path.basename(svgFile));
      if (a.png !== 'no') {
        const chrome = findChrome();
        const pngFile = svgFile.replace(/\.svg$/, '.png');
        if (!chrome) note = 'PNG not written: no Chrome or Edge found. Set CHROME_PATH to chrome.exe or msedge.exe and run again.\n';
        else {
          try { const s = svgToPng(svgFile, pngFile, chrome); written.push(`${path.basename(pngFile)} (${s.width} x ${s.height})`); }
          catch (e) { note = `PNG not written: ${e.message}. The SVG is fine; set CHROME_PATH or convert it by hand.\n`; }
        }
      }
    }
    process.stdout.write(r.md + `\nWritten to ${a.outdir}: ${written.join(', ')}\n` + note);
  } else {
    process.stdout.write(r.md + (r.svg ? '\nFigure 1 SVG not written: give --outdir to save it.\n' : ''));
  }
}

module.exports = { figure1Svg, table1, table2, table3, build, KO_TYPES, findChrome, pngSize, svgToPng };
if (require.main === module) main();
