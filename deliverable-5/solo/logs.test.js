'use strict';
// Checks that each header-only log in solo/logs/ matches the columns in self-evaluation-plan.md section 3,
// and that the needs log keeps the D5 coding layout so recode-sample.js works on it.
// Run: node deliverable-5/solo/logs.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');

const plan = fs.readFileSync(path.join(__dirname, '..', 'self-evaluation-plan.md'), 'utf8');
const logs = path.join(__dirname, 'logs');
// Every column list in the plan is a backtick line of comma-separated names.
const planHeaders = [...plan.matchAll(/`([A-Za-z0-9_]+(?:,[A-Za-z0-9_]+){3,})`/g)].map(m => m[1]);
const firstLine = f => fs.readFileSync(path.join(logs, f), 'utf8').replace(/^﻿/, '').split(/\r?\n/)[0];

const expected = {
  'se1-fidelity-handcheck.csv': 'week,version,row,raphael_verdict',
  'se2-reads.csv': 'read_id,date,week,version,read_order,seen_before',
  'se2-item-scores.csv': 'read_id,week,version,read_order,item,level',
  'se2-need-answers.csv': 'read_id,week,version,read_order,need_id',
  'se2-needs-log.csv': 'segment_id,participant,timestamp',
  'se2-second-scorer.csv': 'read_id,kind,id,score',
  'se3-walkthrough.csv': 'task_id,step_no,correct_action',
  'se4-heuristic-problems.csv': 'id,heuristic,task_location',
  'se4-task-outcomes.csv': 'task,completed,seconds',
};

let passed = 0;
function test(name, fn) { fn(); passed++; console.log('ok - ' + name); }

test('logs/ holds exactly the nine logs in plan section 3', () => {
  assert.deepStrictEqual(fs.readdirSync(logs).filter(f => f.endsWith('.csv')).sort(), Object.keys(expected).sort());
});

for (const [file, start] of Object.entries(expected)) {
  test(`${file} is header-only and matches the plan`, () => {
    const text = fs.readFileSync(path.join(logs, file), 'utf8');
    assert.strictEqual(text.split(/\r?\n/).filter(l => l.trim()).length, 1, 'no data rows');
    const head = firstLine(file);
    const match = planHeaders.filter(h => h.startsWith(start));
    assert.strictEqual(match.length, 1, `one plan header starts with ${start}`);
    assert.strictEqual(head, match[0]);
  });
}

test('the needs log has the D5 coding layout, so recode-sample.js reads it', () => {
  const d5 = fs.readFileSync(path.join(__dirname, '..', 'think-aloud-coding-sheet.csv'), 'utf8').split(/\r?\n/)[0];
  assert.strictEqual(firstLine('se2-needs-log.csv'), d5);
});

console.log(`${passed} tests passed.`);
