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

console.log(n + ' tests passed.');
