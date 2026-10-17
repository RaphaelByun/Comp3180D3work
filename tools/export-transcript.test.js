#!/usr/bin/env node
'use strict';
// Tests for export-transcript.js on a small made-up session log. Run: node tools/export-transcript.test.js
const assert = require('assert');
const { toMarkdown, mask, parseArgs } = require('./export-transcript.js');

const log = [
  { type: 'permission-mode', permissionMode: 'default' },
  { type: 'user', timestamp: '2026-10-17T01:00:00.000Z', message: { role: 'user', content: 'Fix the test in C:\\Users\\someone\\repo please. <system-reminder>harness text</system-reminder>' } },
  { type: 'user', isMeta: true, timestamp: '2026-10-17T01:00:01.000Z', message: { role: 'user', content: 'meta line' } },
  { type: 'assistant', timestamp: '2026-10-17T01:00:05.000Z', message: { role: 'assistant', content: [
    { type: 'thinking', thinking: 'hidden reasoning' },
    { type: 'text', text: 'Running the tests.' },
    { type: 'tool_use', id: 't1', name: 'Bash', input: { command: 'dotnet test', description: 'Run the tests' } }
  ] } },
  { type: 'user', timestamp: '2026-10-17T01:00:09.000Z', message: { role: 'user', content: [
    { type: 'tool_result', tool_use_id: 't1', content: 'Passed! 76 tests. Mail me at dev@example.com. ' + 'x'.repeat(50) }
  ] } },
  { type: 'assistant', isSidechain: true, timestamp: '2026-10-17T01:00:10.000Z', message: { role: 'assistant', content: [{ type: 'text', text: 'sub-agent text' }] } },
  { type: 'assistant', timestamp: '2026-10-18T01:00:00.000Z', message: { role: 'assistant', content: [{ type: 'text', text: 'Next day.' }] } }
].map(o => JSON.stringify(o)).concat(['{not json']);

let passed = 0;
function test(name, fn) { fn(); passed++; console.log('ok - ' + name); }

test('prompts, replies and tool names are written with timestamps', () => {
  const md = toMarkdown(log, parseArgs(['x.jsonl']), 'x.jsonl');
  assert.ok(md.includes('### User · 2026-10-17 01:00:00Z'));
  assert.ok(md.includes('Running the tests.'));
  assert.ok(md.includes('- Tool call: `Bash`: Run the tests'));
  assert.ok(md.includes('Passed! 76 tests.'));
  assert.ok(md.includes('1 user prompts, 2 assistant replies, 1 tool calls'));
  assert.ok(md.includes('1 unreadable lines were skipped'));
});

test('hidden reasoning, harness notices, meta lines and sub-agents are left out', () => {
  const md = toMarkdown(log, parseArgs(['x.jsonl']), 'x.jsonl');
  for (const hidden of ['hidden reasoning', 'harness text', 'meta line', 'sub-agent text']) assert.ok(!md.includes(hidden), hidden);
  assert.ok(toMarkdown(log, parseArgs(['x.jsonl', '--sidechains']), 'x.jsonl').includes('sub-agent text'));
});

test('e-mail addresses and the user folder are masked', () => {
  const md = toMarkdown(log, parseArgs(['x.jsonl']), 'x.jsonl');
  assert.ok(!md.includes('dev@example.com') && md.includes('[email]'));
  assert.ok(!md.includes('someone') && md.includes('C:\\Users\\[user]\\repo'));
  assert.strictEqual(mask('/c/Users/bob/x C:/Users/bob/y C--Users-bob-Documents'), '/c/Users/[user]/x C:/Users/[user]/y C--Users-[user]-Documents');
});

test('tool output can be cut or left out, and a time window applies', () => {
  const cutMd = toMarkdown(log, parseArgs(['x.jsonl', '--max-output', '10']), 'x.jsonl');
  assert.ok(cutMd.includes('more characters cut'));
  const none = toMarkdown(log, parseArgs(['x.jsonl', '--no-tool-output']), 'x.jsonl');
  assert.ok(!none.includes('Passed! 76') && none.includes('tool output left out'));
  const day = toMarkdown(log, parseArgs(['x.jsonl', '--from', '2026-10-18T00:00']), 'x.jsonl');
  assert.ok(day.includes('Next day.') && !day.includes('Running the tests.'));
});

test('bad arguments stop with a message', () => {
  assert.throws(() => parseArgs([]), /exactly one/);
  assert.throws(() => parseArgs(['a', '--bogus']), /Unknown option/);
});

console.log(passed + ' tests passed.');
