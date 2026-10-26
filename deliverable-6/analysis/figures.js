#!/usr/bin/env node
'use strict';
/*
 * The time-and-confidence figure and the report tables for the A3 Evaluation section
 * (COMP3180 A3, Deliverable 6, solo evaluation decided 17 Oct 2026).
 * Plain Node.js, no dependencies. Reads the same CSVs as analyse.js and uses its checks.
 *
 * Usage:
 *   node figures.js                                  (FAKE sample-*.csv data, tables printed only)
 *   node figures.js --reads se2-reads.csv --needs se2-need-answers.csv --log se2-needs-log.csv \
 *                   --heur se4-heuristic-problems.csv --tasks se4-task-outcomes.csv [--d1 d1-problems.csv] \
 *                   [--d1tasks d1-task-outcomes.csv] --outdir deliverable-6/data/figures --figure 5
 *
 * --d1 and --d1tasks are optional: give them only once the D1 files exist in data/. A named file that is
 * not found is skipped with a WARNING line, not a crash.
 *
 * --figure N sets the figure's number in its title and in tables.md (default 1). The report-wide
 * numbering list in deliverable-7/README.md makes this Figure 5, so give --figure 5 for the report.
 *
 * With --outdir it writes figure-time-confidence.svg and tables.md there, and a PNG copy of the figure
 * (figure-time-confidence.png, at twice the SVG size) for the Word builder, which embeds PNG or JPG only.
 * The PNG is made by an installed Chrome or Edge in headless mode (no npm package): set CHROME_PATH if it
 * is not found, or give --png no to skip it. Without --outdir, the tables are printed and no image is
 * written. Anything built from a sample-*.csv file is stamped FAKE.
 *
 *   Figure:  top, minutes per read (four bars: first reads filled, second reads hollow, so it prints in grey);
 *            bottom, need answers counted by confidence (1 to 5) and git-log result (C, PC, W, NA), with
 *            the wrong answers at confidence 4 or 5 outlined. It replaces the A2 paired-differences plot.
 *   Tables:  B (ten needs by read), C (key against observed), F (heuristic problems beside D1), G (needs log).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const { pathToFileURL } = require('url');
const A = require('./analyse.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function mdTable(head, rows) {
  return ['| ' + head.join(' | ') + ' |', '|' + head.map(() => '---').join('|') + '|']
    .concat(rows.map(r => '| ' + r.join(' | ') + ' |')).join('\n');
}

// ---------- the figure ----------
// T is analyse.js timeConfidence(): { reads: [{read, first, minutes}], grid: {C|PC|W|NA: [n at conf 1..5]}, n, highWrong }.
function figureSvg(T, opts) {
  const fake = opts && opts.fake;
  const num = (opts && opts.number) || 1;
  const W = 640, left = 110, right = 40;
  const ink = '#1F3A5F', grey = '#404040', grid = '#D0D0D0';
  let y = fake ? 40 : 14;
  const o = [];
  const body = [];
  // panel 1: minutes per read
  const maxMin = Math.max(10, ...T.reads.map(r => r.minutes || 0));
  const top = Math.ceil(maxMin / 10) * 10;
  const bx = m => left + (m / top) * (W - left - right);
  body.push(`<text x="${left}" y="${y + 16}" font-size="14" font-weight="bold" fill="${grey}">Minutes per read (filled: first read; hollow: second read)</text>`);
  y += 30;
  const barTop = y;
  T.reads.forEach((r, i) => {
    const cy = barTop + i * 26;
    body.push(`<text x="${left - 10}" y="${cy + 15}" text-anchor="end" font-size="12" fill="${grey}">${esc(r.read)}</text>`);
    if (r.minutes === null) {
      body.push(`<text x="${left + 6}" y="${cy + 15}" font-size="12" fill="${grey}">no time recorded</text>`);
      return;
    }
    const wdt = Math.max(0, bx(r.minutes) - left);
    body.push(`<rect class="bar" x="${left}" y="${cy + 3}" width="${wdt.toFixed(1)}" height="16" fill="${r.first ? ink : '#FFFFFF'}" stroke="${ink}" stroke-width="2"><title>${esc(r.read)} ${r.minutes} minutes</title></rect>`);
    body.push(`<text x="${(left + wdt + 6).toFixed(1)}" y="${cy + 15}" font-size="12" fill="${grey}">${r.minutes}</text>`);
  });
  y = barTop + T.reads.length * 26 + 4;
  for (let t = 0; t <= top; t += top / 5) {
    body.push(`<line x1="${bx(t)}" y1="${y}" x2="${bx(t)}" y2="${y + 4}" stroke="${grey}"/>`);
    body.push(`<text x="${bx(t)}" y="${y + 18}" text-anchor="middle" font-size="11" fill="${grey}">${t}</text>`);
  }
  y += 40;
  // panel 2: confidence against git-log result
  body.push(`<text x="${left}" y="${y}" font-size="14" font-weight="bold" fill="${grey}">Need answers by confidence and git-log result (n = ${T.n})</text>`);
  y += 18;
  const cw = (W - left - right) / 5, rh = 34, maxC = Math.max(1, ...Object.values(T.grid).reduce((a, r) => a.concat(r), []));
  ['C', 'PC', 'W', 'NA'].forEach((res, ri) => {
    const cy = y + ri * rh + rh / 2;
    const name = { C: 'C correct', PC: 'PC partly', W: 'W wrong', NA: 'NA blank' }[res];
    body.push(`<text x="${left - 10}" y="${cy + 4}" text-anchor="end" font-size="12" fill="${grey}">${name}</text>`);
    body.push(`<line x1="${left}" y1="${cy}" x2="${W - right}" y2="${cy}" stroke="${grid}"/>`);
    T.grid[res].forEach((k, ci) => {
      const cx = left + ci * cw + cw / 2;
      if (res === 'W' && ci >= 3) body.push(`<rect class="highwrong" x="${cx - cw / 2 + 3}" y="${cy - rh / 2 + 2}" width="${cw - 6}" height="${rh - 4}" fill="none" stroke="${grey}" stroke-width="2" stroke-dasharray="5 3"/>`);
      if (!k) return;
      const r = 4 + 9 * Math.sqrt(k / maxC);
      body.push(`<circle class="dot" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="${ink}"><title>${res} at confidence ${ci + 1}: ${k}</title></circle>`);
      body.push(`<text x="${(cx + r + 4).toFixed(1)}" y="${cy + 4}" font-size="11" fill="${grey}">${k}</text>`);
    });
  });
  y += 4 * rh + 4;
  for (let c = 1; c <= 5; c++) body.push(`<text x="${left + (c - 1) * cw + cw / 2}" y="${y + 12}" text-anchor="middle" font-size="12" fill="${grey}">${c}</text>`);
  body.push(`<text x="${left + 2.5 * cw}" y="${y + 30}" text-anchor="middle" font-size="12" fill="${grey}">confidence: 1 a guess, 5 certain. Dashed box: wrong at confidence 4 or 5 (${T.highWrong})</text>`);
  y += 44;
  const H = Math.round(y);
  o.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Calibri, Arial, sans-serif" role="img" aria-labelledby="t d">`);
  o.push(`<title id="t">Figure ${num}: time and confidence</title>`);
  o.push(`<desc id="d">Minutes per read: ${esc(T.reads.map(r => `${r.read} ${r.minutes === null ? 'n/a' : r.minutes}`).join('; '))}. ` +
    `Need answers by confidence and result: ${esc(['C', 'PC', 'W', 'NA'].map(k => `${k} ${T.grid[k].join('/')}`).join('; '))}.</desc>`);
  o.push(`<rect width="${W}" height="${H}" fill="#FFFFFF"/>`);
  if (fake) o.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="16" font-weight="bold" fill="#B00020">FAKE DATA: sample files, not a result</text>`);
  o.push(...body);
  o.push('</svg>');
  return o.join('\n') + '\n';
}

// ---------- tables (report subset; analyse.js prints them all) ----------
function tablesMd(f) {
  const rd = k => (f[k] ? A.readCSV(f[k]) : null);
  const out = [];
  const needs = rd('needs');
  if (needs) { out.push(A.render(A.tableB(needs), mdTable)); out.push(A.render(A.tableC(needs), mdTable)); }
  const heur = rd('heur'), tasks = rd('tasks');
  if (heur || tasks) out.push(A.render(A.tableF(heur, tasks, rd('d1'), rd('d1tasks')), mdTable));
  const log = rd('log');
  if (log) out.push(A.render(A.tableG(log), mdTable));
  return out.join('\n');
}

// ---------- PNG copy of the figure ----------
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

function build(f, opts) {
  const num = (opts && opts.number) || 1;
  const fake = A.isFake(f);
  const M = A.dropMissing(f);
  f = M.files;
  const md = [`# ChangeLens solo evaluation: Figure ${num} and Tables B, C, F and G`];
  if (fake) md.push('', '**FAKE DATA: one or more inputs are sample-*.csv files. Nothing below is a result.**');
  md.push('', 'Inputs: ' + Object.entries(f).filter(([, v]) => v).map(([k, v]) => `${k}=${path.basename(v)}`).join(', '));
  if (M.warnings.length) md.push('', M.warnings.join('\n'));
  let svg = null;
  if (f.reads || f.needs) {
    const T = A.timeConfidence(f.reads ? A.readCSV(f.reads) : null, f.needs ? A.readCSV(f.needs) : null);
    svg = figureSvg(T, { fake, number: num });
    md.push('', `Figure ${num}: time and confidence. ${T.n} need answer(s) with a confidence and a result; ${T.highWrong} wrong at confidence 4 or 5.`);
    T.warnings.forEach(w => md.push('', w));
  }
  md.push('', tablesMd(f));
  md.push('', '---', A.FOOTER);
  return { md: md.join('\n') + '\n', svg, fake };
}

function main() {
  const a = args(process.argv.slice(2));
  const f = A.inputFiles(a, __dirname);
  if (a.figure !== undefined && !/^[1-9]\d*$/.test(a.figure)) {
    process.stderr.write(`--figure must be a whole number from 1 (got "${a.figure}").\n`);
    process.exit(1);
  }
  const r = build(f, { number: a.figure ? Number(a.figure) : 1 });
  if (a.outdir) {
    fs.mkdirSync(a.outdir, { recursive: true });
    const stem = r.fake ? 'FAKE-' : '';
    fs.writeFileSync(path.join(a.outdir, `${stem}tables.md`), r.md);
    const written = [`${stem}tables.md`];
    let note = '';
    if (r.svg) {
      const svgFile = path.join(a.outdir, `${stem}figure-time-confidence.svg`);
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
    process.stdout.write(r.md + (r.svg ? `\nFigure ${a.figure || 1} SVG not written: give --outdir to save it.\n` : ''));
  }
}

module.exports = { figureSvg, tablesMd, build, findChrome, pngSize, svgToPng, mdTable };
if (require.main === module) main();
