'use strict';
// Tests for recode-sample.js on made-up sheets in a temp folder. Run: node deliverable-5/recode-sample.test.js
const fs = require('fs'), os = require('os'), path = require('path'), assert = require('assert');
const { execFileSync } = require('child_process');
const { parse } = require('./recode-sample.js');

const HEAD = 'segment_id,participant,timestamp,report_condition,quote_note,pass1_code,pass1_date,pass2_code,pass2_date,final_code,resolution_rule';
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'recode-test-'));
const tool = path.join(__dirname, 'recode-sample.js');
function run(args) {
  try { return { code: 0, out: execFileSync('node', [tool, ...args], { encoding: 'utf8', stdio: 'pipe' }) }; }
  catch (e) { return { code: e.status, out: String(e.stdout) + String(e.stderr) }; }
}
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('ok - ' + name); }

// Sheet with a stray quote mid-field (5" door) and a quoted comma, plus one pilot row.
const rows = [
  'S01,R01,00:01,B,who did the 5" door,a2,2026-10-30,,,,',
  'S02,R01,00:02,B,"fixed, then broke",b1,2026-10-30,,,,',
];
for (let i = 3; i <= 8; i++) rows.push(`S0${i},R01,00:0${i},B,note ${i},d1,2026-10-30,,,,`);
rows.push('S09,P01,00:09,B,pilot note,a1,2026-10-30,,,,');
const sheet = path.join(tmp, 'sheet.csv');
fs.writeFileSync(sheet, HEAD + '\n' + rows.join('\n') + '\n');

test('stray quote stays text and a quoted comma stays one cell', () => {
  const p = parse(fs.readFileSync(sheet, 'utf8'));
  assert.strictEqual(p.rows.length, 9);
  assert.strictEqual(p.rows[0].quote_note, 'who did the 5" door');
  assert.strictEqual(p.rows[0].pass1_code, 'a2');
  assert.strictEqual(p.rows[1].quote_note, 'fixed, then broke');
  assert.strictEqual(p.rows[1].pass1_code, 'b1');
});

const blind = path.join(tmp, 'blind.csv');
test('draw takes a quarter (rounded up) of the 8 non-pilot coded rows', () => {
  const r = run(['draw', '--in', sheet, '--out', blind, '--seed', '2026']);
  assert.strictEqual(r.code, 0, r.out);
  assert.match(r.out, /pilot excluded\): 8\. Drew 2/);
  const b = parse(fs.readFileSync(blind, 'utf8'));
  assert.strictEqual(b.rows.length, 2);
  assert.ok(!('pass1_code' in b.rows[0]));
  assert.ok(b.rows.every(x => x.participant !== 'P01'));
});

test('in-place merge keeps rows and pass-1 codes and writes a .bak', () => {
  const b = parse(fs.readFileSync(blind, 'utf8'));
  const filled = HEAD.split(',').slice(0, 5).concat('pass2_code').join(',') + '\n' +
    b.rows.map(x => [x.segment_id, x.participant, x.timestamp, x.report_condition, '"' + x.quote_note.replace(/"/g, '""') + '"', 'zz'].join(',')).join('\n') + '\n';
  fs.writeFileSync(blind, filled);
  const before = parse(fs.readFileSync(sheet, 'utf8')).rows;
  const r = run(['merge', '--in', sheet, '--blind', blind, '--out', sheet]);
  assert.strictEqual(r.code, 0, r.out);
  assert.match(r.out, /Merged 2 pass-2 codes/);
  assert.ok(fs.existsSync(sheet + '.bak'));
  const after = parse(fs.readFileSync(sheet, 'utf8')).rows;
  assert.strictEqual(after.length, before.length);
  after.forEach((x, i) => {
    assert.strictEqual(x.pass1_code, before[i].pass1_code);
    assert.strictEqual(x.quote_note, before[i].quote_note);
  });
  assert.strictEqual(after.filter(x => x.pass2_code === 'zz').length, 2);
});

test('an unclosed quote stops draw and merge and leaves the sheet alone', () => {
  const bad = path.join(tmp, 'bad.csv');
  const text = HEAD + '\nS01,R01,00:01,B,"never closed,a2,2026-10-30,,,,\nS02,R01,00:02,B,note,b1,2026-10-30,,,,\n';
  fs.writeFileSync(bad, text);
  const d = run(['draw', '--in', bad, '--out', path.join(tmp, 'x.csv')]);
  assert.notStrictEqual(d.code, 0);
  assert.match(d.out, /never closed/);
  const m = run(['merge', '--in', bad, '--blind', blind, '--out', bad]);
  assert.notStrictEqual(m.code, 0);
  assert.strictEqual(fs.readFileSync(bad, 'utf8'), text);
});

test('a row with more cells than the header stops the tool', () => {
  const wide = path.join(tmp, 'wide.csv');
  fs.writeFileSync(wide, HEAD + '\nS01,R01,00:01,B,fixed, then broke,b1,2026-10-30,,,,\n');
  const d = run(['draw', '--in', wide, '--out', path.join(tmp, 'y.csv')]);
  assert.notStrictEqual(d.code, 0);
  assert.match(d.out, /line 2 has 12 cells but the header has 11/);
});

test('a segment_id on two rows stops draw and merge and leaves the sheet alone', () => {
  const dup = path.join(tmp, 'dup.csv');
  const text = HEAD + '\nS01,R01,00:01,B,note,a2,2026-10-30,,,,\nS01,R01,00:01,B,note split,d3,2026-10-30,,,,\nS02,R01,00:02,B,note,d1,2026-10-30,,,,\n';
  fs.writeFileSync(dup, text);
  const d = run(['draw', '--in', dup, '--out', path.join(tmp, 'z.csv')]);
  assert.notStrictEqual(d.code, 0);
  assert.match(d.out, /segment_id used on more than one row .*: S01\./);
  assert.ok(!fs.existsSync(path.join(tmp, 'z.csv')));
  const m = run(['merge', '--in', dup, '--blind', blind, '--out', dup]);
  assert.notStrictEqual(m.code, 0);
  assert.strictEqual(fs.readFileSync(dup, 'utf8'), text);
});

// Solo use (17 Oct 2026 decision): the SE2 needs log has one participant, SELF, and read ids as report_condition.
const solo = path.join(tmp, 'se2-needs-log.csv');
const soloRows = [];
for (let i = 1; i <= 9; i++) soloRows.push(`N${String(i).padStart(2, '0')},SELF,10:0${i},${i <= 5 ? 'RX-A1' : 'RY-B1'},made-up need ${i},a2,2026-10-22,,,,`);
fs.writeFileSync(solo, HEAD + '\r\n' + soloRows.join('\r\n') + '\r\n');
const soloBlind = path.join(tmp, 'solo-blind.csv');

test('draw keeps SELF rows and takes a quarter (rounded up) of one participant\'s 9 rows', () => {
  const r = run(['draw', '--in', solo, '--out', soloBlind, '--seed', '2026']);
  assert.strictEqual(r.code, 0, r.out);
  assert.match(r.out, /pilot excluded\): 9\. Drew 3/);
  const b = parse(fs.readFileSync(soloBlind, 'utf8'));
  assert.strictEqual(b.rows.length, 3);
  assert.ok(b.rows.every(x => x.participant === 'SELF'));
});

test('agree refuses before a merge, then prints x of n after one', () => {
  const before = run(['agree', '--in', solo]);
  assert.notStrictEqual(before.code, 0);
  assert.match(before.out, /Run merge first/);
  const b = parse(fs.readFileSync(soloBlind, 'utf8'));
  b.rows.forEach((x, i) => { x.pass2_code = i === 0 ? 'd3' : 'A2'; });
  fs.writeFileSync(soloBlind, require('./recode-sample.js').serialise(b.head, b.rows));
  const m = run(['merge', '--in', solo, '--blind', soloBlind, '--out', solo]);
  assert.strictEqual(m.code, 0, m.out);
  const a = run(['agree', '--in', solo]);
  assert.strictEqual(a.code, 0, a.out);
  assert.match(a.out, /2 of 3 re-coded segments matched\./);
  assert.match(a.out, new RegExp('Differ: ' + b.rows[0].segment_id + '\\.'));
});

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${passed} tests passed.`);
