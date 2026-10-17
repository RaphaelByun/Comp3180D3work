#!/usr/bin/env node
'use strict';
/*
 * Turns one Claude Code session log (.jsonl) into a readable Markdown transcript,
 * for the GenAI evidence appendix. No dependencies.
 *
 *   node tools/export-transcript.js <session.jsonl> [--out transcript.md]
 *        [--no-tool-output] [--max-output 1500] [--from 2026-10-17T00:00] [--to 2026-10-17T23:59]
 *        [--sidechains] [--keep-reminders]
 *
 * What it writes, in order, each with its timestamp (UTC):
 *   - every prompt typed by the user;
 *   - the assistant's text replies;
 *   - the name of every tool the assistant called (with the tool's own one-line description, if it gave one);
 *   - each tool's output, cut to --max-output characters, unless --no-tool-output is given.
 * It leaves out the model's hidden reasoning, harness notices (<system-reminder> blocks, unless
 * --keep-reminders), and sub-agent turns (unless --sidechains).
 * It masks e-mail addresses as [email] and the user folder in Windows paths as C:\Users\[user].
 * Read the result before using it: masking is by pattern and cannot catch everything.
 *
 * The person choosing the evidence picks the session and the excerpts; this only formats them.
 */
const fs = require('fs');

function parseArgs(argv) {
  const opts = { toolOutput: true, maxOutput: 1500, sidechains: false, keepReminders: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') opts.out = argv[++i];
    else if (a === '--no-tool-output') opts.toolOutput = false;
    else if (a === '--max-output') opts.maxOutput = Number(argv[++i]);
    else if (a === '--from') opts.from = argv[++i];
    else if (a === '--to') opts.to = argv[++i];
    else if (a === '--sidechains') opts.sidechains = true;
    else if (a === '--keep-reminders') opts.keepReminders = true;
    else if (a.startsWith('--')) throw new Error('Unknown option ' + a);
    else rest.push(a);
  }
  if (rest.length !== 1) throw new Error('Give exactly one .jsonl file.');
  if (!(opts.maxOutput >= 0)) throw new Error('--max-output must be a number.');
  opts.input = rest[0];
  return opts;
}

/** Masks e-mail addresses and the Windows user folder. */
function mask(text) {
  return String(text)
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[email]')
    .replace(/([A-Za-z]:[\\/]+Users[\\/]+)[^\\/\s"'`]+/gi, '$1[user]')
    .replace(/(\/[a-z]\/Users\/)[^\/\s"'`]+/g, '$1[user]')
    .replace(/(C--Users-)[^-\s"'`\\/]+/g, '$1[user]');
}

function stripReminders(text) {
  return text.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
}

/** The text of a message's content, which is a string or a list of blocks. */
function textOf(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.filter(b => b && b.type === 'text').map(b => b.text).join('\n\n');
}

function resultText(block) {
  if (typeof block.content === 'string') return block.content;
  if (Array.isArray(block.content)) {
    return block.content.map(c => (c.type === 'text' ? c.text : '[' + c.type + ']')).join('\n');
  }
  return '';
}

function fence(text) {
  const longest = Math.max(2, ...(text.match(/`+/g) || ['']).map(s => s.length));
  const f = '`'.repeat(longest + 1);
  return f + '\n' + text + '\n' + f;
}

function cut(text, max) {
  return text.length <= max ? text : text.slice(0, max) + '\n[... ' + (text.length - max) + ' more characters cut]';
}

function stamp(ts) {
  return ts ? ts.replace('T', ' ').replace(/\.\d+Z$/, 'Z') : '';
}

function inWindow(ts, opts) {
  if (!ts) return true;
  if (opts.from && ts < opts.from) return false;
  if (opts.to && ts > opts.to + (opts.to.length <= 16 ? ':59.999Z' : '')) return false;
  return true;
}

/** Builds the Markdown for the lines of one .jsonl file. */
function toMarkdown(lines, opts, name) {
  const out = [];
  let first = '', last = '', prompts = 0, replies = 0, calls = 0, skipped = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    let o;
    try { o = JSON.parse(line); } catch (e) { skipped++; continue; }
    if (!o.message || (o.type !== 'user' && o.type !== 'assistant')) continue;
    if (o.isSidechain && !opts.sidechains) continue;
    if (o.isMeta) continue;
    if (!inWindow(o.timestamp, opts)) continue;
    const when = stamp(o.timestamp);
    const content = o.message.content;

    if (o.type === 'user') {
      let text = textOf(content);
      if (!opts.keepReminders) text = stripReminders(text);
      if (text) {
        out.push('### User · ' + when, '', mask(text), '');
        prompts++;
      }
      if (opts.toolOutput && Array.isArray(content)) {
        for (const b of content) {
          if (!b || b.type !== 'tool_result') continue;
          let r = resultText(b);
          if (!opts.keepReminders) r = stripReminders(r);
          out.push('Tool output' + (b.is_error ? ' (error)' : '') + ':', '', fence(mask(cut(r, opts.maxOutput))), '');
        }
      }
    } else {
      const blocks = Array.isArray(content) ? content : [{ type: 'text', text: textOf(content) }];
      const text = blocks.filter(b => b && b.type === 'text').map(b => b.text).join('\n\n').trim();
      const tools = blocks.filter(b => b && b.type === 'tool_use');
      if (!text && tools.length === 0) continue;
      out.push('### Claude · ' + when, '');
      if (text) { out.push(mask(text), ''); replies++; }
      for (const t of tools) {
        const desc = t.input && typeof t.input.description === 'string' ? ': ' + mask(t.input.description) : '';
        out.push('- Tool call: `' + t.name + '`' + desc);
        calls++;
      }
      if (tools.length) out.push('');
    }
    if (!first) first = when;
    last = when;
  }
  const head = [
    '# Claude Code session transcript',
    '',
    '- Session log: `' + mask(name) + '`',
    '- From ' + (first || '(none)') + ' to ' + (last || '(none)') + ' (UTC)',
    '- ' + prompts + ' user prompts, ' + replies + ' assistant replies, ' + calls + ' tool calls' +
      (opts.toolOutput ? ', tool output cut to ' + opts.maxOutput + ' characters' : ', tool output left out'),
    '- Exported by `tools/export-transcript.js`. E-mail addresses and the Windows user folder are masked.' +
      (skipped ? ' ' + skipped + ' unreadable lines were skipped.' : ''),
    ''
  ];
  return head.concat(out).join('\n');
}

function main() {
  let opts;
  try { opts = parseArgs(process.argv.slice(2)); } catch (e) {
    console.error(e.message);
    console.error('Usage: node tools/export-transcript.js <session.jsonl> [--out file.md] [--no-tool-output] [--max-output N] [--from ISO] [--to ISO] [--sidechains] [--keep-reminders]');
    process.exit(2);
  }
  const lines = fs.readFileSync(opts.input, 'utf8').split('\n');
  const md = toMarkdown(lines, opts, require('path').basename(opts.input));
  if (opts.out) { fs.writeFileSync(opts.out, md); console.log('Wrote ' + opts.out); }
  else process.stdout.write(md);
}

if (require.main === module) main();
module.exports = { toMarkdown, mask, parseArgs };
