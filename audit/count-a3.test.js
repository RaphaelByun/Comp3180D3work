// Tests for count-a3.js. Run: node audit/count-a3.test.js
'use strict';
const assert = require('assert');
const { words, count, report, sectionName } = require('./count-a3.js');

let n = 0;
function test(name, fn) { fn(); n++; console.log('ok ' + n + ' - ' + name); }

test('words skips Markdown marks, links and table bars', () => {
  assert.strictEqual(words('**Bold** text, a [link](http://x.y/z) and | a | cell |'), 7);
  assert.strictEqual(words('![Figure 1](figures/a.png) caption'), 3);
  assert.strictEqual(words('<!-- note to self --> one'), 1);
});

test('section headings match with numbering and at any level', () => {
  assert.strictEqual(sectionName('## 3 Evaluation'), 'Evaluation');
  assert.strictEqual(sectionName('# 1. Project Deliverables'), 'Project Deliverables');
  assert.strictEqual(sectionName('### Method'), null);
  assert.strictEqual(sectionName('Evaluation'), null);
});

test('counted sections stop at Appendices; later sections are not counted', () => {
  const md = [
    '# Report', 'Name: X',
    '# Project Deliverables', 'one two three',
    '# Development Diary Summary', '## Week 9', 'four five',
    '# Evaluation', 'six',
    '# Learning Reflection', 'seven',
    '# Industry Relevance and Future Work', 'eight',
    '# Appendices', 'many many many words here',
    '# Statement on Generative AI use', 'ai ai',
    '# References', 'ref'
  ].join('\n');
  const t = count(md);
  assert.strictEqual(t['Project Deliverables'], 5);
  assert.strictEqual(t['Development Diary Summary'], 3 + 2 + 2);
  assert.strictEqual(t['Appendices'], 6);
  const r = report(t);
  assert.strictEqual(r.total, 5 + 7 + 2 + 3 + 6);
  assert.ok(/within the limit/.test(r.text));
});

test('a heading inside a code fence does not start a section', () => {
  const t = count('# Evaluation\none\n```\n# References\n```\ntwo');
  assert.strictEqual(t['References'], undefined);
});

test('a missing section and an over-limit total are reported', () => {
  const r = report({ '(before the first section)': 0, 'Evaluation': 2600 });
  assert.ok(/Project Deliverables\s+MISSING/.test(r.text));
  assert.ok(/OVER the limit by 100/.test(r.text));
});

test('budget notes and ": suffix" are stripped from headings', () => {
  assert.strictEqual(sectionName('## 1 Project Deliverables (300)'), 'Project Deliverables');
  assert.strictEqual(sectionName('## 2 Development Diary Summary (480): fact outline'), 'Development Diary Summary');
  assert.strictEqual(sectionName('## 3 Evaluation (1000)'), 'Evaluation');
  assert.strictEqual(sectionName('## 5 Industry Relevance and Future Work (200)'), 'Industry Relevance and Future Work');
  assert.strictEqual(sectionName('## Statement on Generative AI use: draft (uncounted)'), 'Statement on Generative AI use');
  assert.strictEqual(sectionName('## References (uncounted)'), 'References');
  assert.strictEqual(sectionName('### Method (190)'), null);
  assert.strictEqual(sectionName('### Opening (~50)'), null);
  assert.strictEqual(sectionName('## Evaluation Method'), null);
  assert.strictEqual(sectionName('## Word budget (counted body; limit 2500)'), null);
});

test('"Appendix X:" headings count as Appendices', () => {
  assert.strictEqual(sectionName('## Appendix A: variance from the plan (uncounted)'), 'Appendices');
  assert.strictEqual(sectionName('## Appendix B'), 'Appendices');
  assert.strictEqual(sectionName('# Appendices'), 'Appendices');
  assert.strictEqual(sectionName('## Appendixes are fun'), null);
});

test('a draft in the budget-note style is counted, not reported as 0', () => {
  const md = [
    '# Draft v0', '## Word budget (counted body; limit 2500)', 'alpha beta',
    '## 1 Project Deliverables (300)', 'one two three',
    '## 2 Development Diary Summary (480): fact outline', 'four five',
    '## 3 Evaluation (1000)', '### Method (190)', 'six',
    '## 4 Learning Reflection (500)', 'seven',
    '## 5 Industry Relevance and Future Work (200)', 'eight',
    '## Appendix A: extra (uncounted)', 'lots of words in here',
    '## References (uncounted)', 'ref'
  ].join('\n');
  const t = count(md);
  const r = report(t);
  assert.deepStrictEqual(r.missing, []);
  assert.ok(r.ok);
  assert.strictEqual(t['Evaluation'], 3 + 2 + 1);
  assert.strictEqual(t['Appendices'], 4 + 5);
  assert.ok(/within the limit/.test(r.text));
  assert.ok(!/NOT COUNTED/.test(r.text));
});

test('no recognised sections: NOT COUNTED, never "within the limit"', () => {
  const r = report(count('# Something\nlots of words but no template headings'));
  assert.strictEqual(r.total, 0);
  assert.strictEqual(r.missing.length, 5);
  assert.strictEqual(r.ok, false);
  assert.ok(/NOT COUNTED: 5 of 5/.test(r.text));
  assert.ok(!/within the limit/.test(r.text));
});

test('one missing counted section fails even when the total is small', () => {
  const r = report({ '(before the first section)': 0, 'Project Deliverables': 10, 'Development Diary Summary': 10, 'Evaluation': 10, 'Learning Reflection': 10 });
  assert.deepStrictEqual(r.missing, ['Industry Relevance and Future Work']);
  assert.strictEqual(r.ok, false);
  assert.ok(/NOT COUNTED: 1 of 5/.test(r.text));
});

test('the command line exits non-zero when sections are missing', () => {
  const cp = require('child_process'), os = require('os'), path = require('path'), fs = require('fs');
  const f = path.join(os.tmpdir(), 'count-a3-test-' + process.pid + '.md');
  fs.writeFileSync(f, '# Nothing here\nfiller words');
  const res = cp.spawnSync(process.execPath, [path.join(__dirname, 'count-a3.js'), f], { encoding: 'utf8' });
  fs.unlinkSync(f);
  assert.strictEqual(res.status, 1);
  assert.ok(/NOT COUNTED/.test(res.stdout));
});

console.log(n + ' tests passed.');
