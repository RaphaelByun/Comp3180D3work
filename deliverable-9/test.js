#!/usr/bin/env node
'use strict';
// Tests for variance-table.js. Run: node deliverable-9/test.js
const assert = require('assert');
const { build } = require('./variance-table');

const head = 'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_why';
const total = s => s.trim().split('\n').pop();

// Nothing logged: no empty bold markers in the Total row.
const none = build([head, '1,A,10,2,,,', '2,B,4,1,,,'].join('\n'));
assert.ok(!total(none).includes('****'), total(none));
assert.strictEqual(total(none), '| | **Total** | **14** | **3** |  |  | **incomplete** | |');

// All logged: totals and variance are bold.
const all = build([head, '1,A,10,2,12,3,', '2,B,4,1,4,1,'].join('\n'));
assert.strictEqual(total(all), '| | **Total** | **14** | **3** | **16** | **4** | **+2** | |');

console.log('variance-table tests passed');
