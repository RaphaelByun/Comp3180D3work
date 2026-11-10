#!/usr/bin/env node
'use strict';
// Tests for sum-hours.js. Run: node deliverable-8/test.js
// The entries below are made-up test values, not Raphael's hours.
const assert = require('assert');
const { sum, format, fill } = require('./sum-hours');

const head = 'date,week,deliverable,hours,in_prac,what_i_did,evidence';

// Header only: nothing to total.
assert.deepStrictEqual(sum(head + '\r\n'), {});

// Hand-computed: D2 = 1.5 + 2 + 0.5 = 4 (in prac 1 + 0 + 0.5 = 1.5); D5 = 3 (in prac 0).
const entries = [head,
  '2026-10-13,10,2,1.5,1,"fix, then test",commit abc',
  '2026-10-14,10,5,3,,coding,',
  '2026-10-15,10,2,2,no,tests,',
  '2026-10-16,10,2,0.5,yes,prac demo,'].join('\r\n');
const t = sum(entries);
assert.deepStrictEqual(t, { 2: { hours: 4, in_prac: 1.5 }, 5: { hours: 3, in_prac: 0 } });
assert.strictEqual(format(t), 'deliverable,actual_hours,actual_in_prac\n2,4,1.5\n5,3,0\n');

// Floating point: 0.1 + 0.2 totals to 0.3.
assert.deepStrictEqual(sum([head, 'd,1,1,0.1,,,', 'd,1,1,0.2,,,'].join('\n')), { 1: { hours: 0.3, in_prac: 0 } });

// Fill writes only the actual and variance cells; A2, why, comments, total row and CRLF stay as they were.
// variance_hours = actual - a2_hours (D2: 4 - 16 = -12; D5: 3 - 18 = -15).
const log = [
  '# A2 budget note, kept',
  'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_hours,variance_why',
  '1,Production-tool UX study and design spec,10,2,,,,',
  '2,"ChangeLens Unity Editor package (both conditions)",16,5,9,9,,"why, kept"',
  '5,Sessions run and coded,18,4,,,,',
  'total,,65,15,,,,'].join('\r\n');
assert.strictEqual(fill(log, t), [
  '# A2 budget note, kept',
  'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_hours,variance_why',
  '1,Production-tool UX study and design spec,10,2,,,,',
  '2,"ChangeLens Unity Editor package (both conditions)",16,5,4,1.5,-12,"why, kept"',
  '5,Sessions run and coded,18,4,3,0,-15,',
  'total,,65,15,,,,'].join('\r\n'));

// Stale actuals are cleared: a deliverable with no entries gets blank actual and variance
// cells (not 0), and its why cell is kept.
const stale = [
  'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_hours,variance_why',
  '1,UX study,10,2,7,1,-3,"a why, kept"',
  '2,Package,16,5,9,9,-7,',
  'total,,65,15,,,,'].join('\n');
assert.strictEqual(fill(stale, { 2: { hours: 20, in_prac: 2 } }), [
  'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_hours,variance_why',
  '1,UX study,10,2,,,,"a why, kept"',
  '2,Package,16,5,20,2,4,',
  'total,,65,15,,,,'].join('\n'));
assert.strictEqual(fill(stale, {}).split('\n')[2], '2,Package,16,5,,,,');

// Over budget gives a positive variance, rounded to two places (2.1 - 2 = 0.1).
const diary = 'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_hours,variance_why\n8,Diary,2,0,,,,';
assert.strictEqual(fill(diary, { 8: { hours: 2.1, in_prac: 0 } }).split('\n')[1], '8,Diary,2,0,2.1,0,0.1,');

// A log without a variance_hours column still fills the two actual cells.
assert.strictEqual(fill('deliverable,a2_hours,actual_hours,actual_in_prac\n3,4,,', { 3: { hours: 1, in_prac: 0 } }),
  'deliverable,a2_hours,actual_hours,actual_in_prac\n3,4,1,0');

// Bad input is refused, not guessed.
assert.throws(() => sum([head, '2026-10-13,10,2,,,,'].join('\n')), /number of hours/);
assert.throws(() => sum([head, '2026-10-13,10,2,1,2,,'].join('\n')), /more than hours/);
assert.throws(() => sum([head, '2026-10-13,10,2,1,maybe,,'].join('\n')), /in_prac must be/);
assert.throws(() => fill(log, { 7: { hours: 1, in_prac: 0 } }), /No row .* 7/);

// The committed log and entries files still parse.
const fs = require('fs'); const path = require('path');
const real = sum(fs.readFileSync(path.join(__dirname, 'hours-entries.csv'), 'utf8'));
fill(fs.readFileSync(path.join(__dirname, 'hours-log.csv'), 'utf8'), real);

console.log('sum-hours tests passed');
