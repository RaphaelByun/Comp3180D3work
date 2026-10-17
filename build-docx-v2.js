// Build the A2 final-sprint .docx from a Markdown file, in the School/JS house style.
// v2 of the a2-draft-2-sep-2026/build-docx.js script — adds figure embedding, a cover
// page driven by %-metadata lines, a configurable header, %PAGEBREAK, and HTML-comment
// skipping. Everything the v1 script did (headings, tables, bullets, numbered lists,
// bold/italic runs, boxed placeholder paragraphs, header/footer, A4 page, Calibri house
// style) still works unchanged.
//
// Usage (from the repo root):  node build-docx-v2.js <in.md> <out.docx>
// Needs the docx package (version in package.json). In a fresh clone run `npm install` first.
// On Raphael's PC Node also finds it in School/node_modules, a parent folder of this repo.
//
// Markdown extensions recognised by v2:
//   %TITLE: / %SUBTITLE: / %NAME: / %ID: / %CATEGORY:   -> cover page (rendered first, in this order)
//   %HEADER: <text>                                     -> page header text (default: empty)
//   %PAGEBREAK                                          -> explicit page break
//   <!-- any HTML comment on its own line -->            -> ignored
//   any other %... line                                 -> ignored
//   ![Figure N. Caption](path/to/image.png|.jpg|.jpeg)  -> centred image + centred caption
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, ImageRun, PageBreak,
} = (() => {
  try {
    return require('docx');
  } catch (e) {
    console.error('Cannot load the docx package. Run "npm install" in ' + __dirname + ' first.');
    process.exit(1);
  }
})();

const FONT = 'Calibri';
const BODY = 22, SMALL = 20, TINY = 18;
const grey = '404040', accent = '1F3A5F';
const bd = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: bd, bottom: bd, left: bd, right: bd };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// Max figure width: 15.5 cm, expressed in the pixel unit docx's ImageRun transformation
// expects (it converts pixels -> EMU internally at 9525 EMU/px, i.e. 96 px/inch).
const MAX_FIGURE_WIDTH_PX = 15.5 * (96 / 2.54);

function runs(text, size, extra) {
  const sz = size || BODY;
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  const push = (t, style) => { if (t) out.push(new TextRun(Object.assign({ text: t, font: FONT, size: sz }, extra || {}, style))); };
  while ((m = re.exec(text)) !== null) {
    push(text.slice(last, m.index), {});
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true }); else push(tok.slice(1, -1), { italics: true });
    last = re.lastIndex;
  }
  push(text.slice(last), {});
  return out.length ? out : [new TextRun({ text: '', font: FONT, size: sz })];
}
const stripMd = s => s.split('**').join('').split('*').join('');

function mkTable(rowsRaw) {
  const head = rowsRaw[0], body = rowsRaw.slice(1), nCols = head.length, total = 9360;
  let widths;
  if (nCols === 4 && head[0].trim() === '#') widths = [700, total - 700 - 2600 - 1000, 2600, 1000];
  else if (nCols === 4) widths = [2100, 2420, 2420, 2420];
  else if (nCols === 5) widths = [600, 2600, total - 600 - 2600 - 900 - 900, 900, 900];
  else widths = head.map(() => Math.floor(total / nCols));
  const cell = (c, i, isHead) => new TableCell({
    borders, width: { size: widths[i], type: WidthType.DXA }, margins: cellMargins,
    shading: isHead ? { fill: 'D9E2F3', type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({ spacing: { before: 20, after: 20, line: 250 }, children: isHead ? [new TextRun({ text: stripMd(c), font: FONT, size: SMALL, bold: true, color: grey })] : runs(c, SMALL) })],
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ cantSplit: true, tableHeader: true, children: head.map((c, i) => cell(c, i, true)) })]
      .concat(body.map(cells => new TableRow({ cantSplit: true, children: cells.map((c, i) => cell(c, i, false)) }))),
  });
}

// Boxed grey placeholder paragraph — used both for the original [FIGURE|NOTE|...]
// editorial-note lines and for missing/unembeddable figure images.
function placeholderBox(text) {
  return new Paragraph({ spacing: { before: 60, after: 140, line: 260 }, shading: { fill: 'F2F2F2', type: ShadingType.CLEAR }, border: { top: bd, bottom: bd, left: bd, right: bd }, children: runs(text, SMALL, { italics: true, color: grey }) });
}

// Scan every line for "%KEY: value" metadata (used for the cover page + header text).
// Any %-line not matching this (e.g. %PAGEBREAK) is handled separately in the main loop.
function parseMeta(lines) {
  const meta = {};
  const re = /^%([A-Za-z_]+):\s*(.*)$/;
  for (const line of lines) {
    const m = line.match(re);
    if (m) meta[m[1].toUpperCase()] = m[2].trim();
  }
  return meta;
}

function buildCover(meta) {
  const out = [];
  if (meta.TITLE) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1200, after: 240 }, children: [new TextRun({ text: meta.TITLE, font: FONT, size: 52, bold: true, color: accent })] }));
  if (meta.SUBTITLE) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 }, children: [new TextRun({ text: meta.SUBTITLE, font: FONT, size: 28, bold: true, color: grey })] }));
  const infoLine = (label, value) => value ? new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: label + ': ' + value, font: FONT, size: 24 })] }) : null;
  [infoLine('Name', meta.NAME), infoLine('Student ID', meta.ID), infoLine('Topic Category', meta.CATEGORY)].filter(Boolean).forEach(p => out.push(p));
  out.push(new Paragraph({ children: [new PageBreak()] }));
  return out;
}

// Read a PNG's pixel dimensions straight from its IHDR chunk (bytes 16-23), no deps.
function pngDimensions(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) throw new Error('not a valid PNG (bad signature)');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

// Read a JPEG's pixel dimensions by walking its marker segments to the first SOFn
// (start-of-frame) marker, which carries height/width as two big-endian uint16s.
function jpegDimensions(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('not a valid JPEG (bad SOI marker)');
  let offset = 2;
  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) { offset++; continue; }
    let marker = buf[offset + 1];
    while (marker === 0xff && offset + 2 < buf.length) { offset++; marker = buf[offset + 1]; } // skip 0xFF fill bytes
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) { offset += 2; continue; }
    if (offset + 4 > buf.length) break;
    const segLength = buf.readUInt16BE(offset + 2);
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) {
      if (offset + 9 > buf.length) throw new Error('truncated JPEG SOF segment');
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + segLength;
  }
  throw new Error('no SOF marker found in JPEG');
}

// ![Figure N. Caption](path) -> [centred image paragraph, centred caption paragraph],
// or [boxed "MISSING IMAGE: <path>" placeholder] if the file is missing/unreadable —
// never throws.
function buildFigure(caption, rawPath, mdDir, maxCm) {
  const resolved = path.isAbsolute(rawPath) ? rawPath : path.resolve(mdDir, rawPath);
  try {
    if (!fs.existsSync(resolved)) throw new Error('file not found');
    const ext = path.extname(resolved).toLowerCase();
    const type = ext === '.png' ? 'png' : (ext === '.jpg' || ext === '.jpeg') ? 'jpg' : null;
    if (!type) throw new Error('unsupported image extension "' + ext + '" (only .png/.jpg/.jpeg are embeddable)');
    const data = fs.readFileSync(resolved);
    const dims = type === 'png' ? pngDimensions(data) : jpegDimensions(data);
    if (!dims.width || !dims.height) throw new Error('could not read image dimensions');
    const maxPx = (maxCm ? maxCm : 15.5) * (96 / 2.54);
    const wPx = Math.min(dims.width, maxPx);
    const hPx = Math.round(dims.height * (wPx / dims.width));
    return [
      new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 40 }, children: [new ImageRun({ type, data, transformation: { width: Math.round(wPx), height: hPx } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: runs(caption, SMALL, { italics: true, color: grey }) }),
    ];
  } catch (e) {
    console.error('WARNING: figure "' + rawPath + '" (resolved: ' + resolved + ') could not be embedded: ' + e.message + ' — inserting placeholder.');
    return [placeholderBox('MISSING IMAGE: ' + rawPath)];
  }
}

function convert(mdPath, opts) {
  const mdDir = path.dirname(path.resolve(mdPath));
  const src = fs.readFileSync(mdPath, 'utf8').replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  const meta = parseMeta(lines);
  const kids = [];
  if (meta.TITLE || meta.SUBTITLE || meta.NAME || meta.ID || meta.CATEGORY) kids.push(...buildCover(meta));
  let i = 0;
  const isSep = l => { const t = l.trim(); return t.startsWith('|') && /^[|\s:-]+$/.test(t) && t.includes('-'); };
  const cellsOf = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  while (i < lines.length) {
    const s = lines[i].trim();
    if (s === '') { i++; continue; }
    if (/^%PAGEBREAK\s*$/.test(s)) { kids.push(new Paragraph({ children: [new PageBreak()] })); i++; continue; }
    if (/^%[A-Za-z_]+:/.test(s)) { i++; continue; } // metadata line, already consumed by parseMeta
    if (s.startsWith('%')) { i++; continue; } // any other %-line: ignored
    if (/^<!--.*-->$/.test(s)) { i++; continue; } // HTML comment on its own line: ignored
    if (/^-{3,}$/.test(s)) { kids.push(new Paragraph({ spacing: { before: 80, after: 80 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'BFBFBF', space: 1 } }, children: [new TextRun({ text: '', font: FONT, size: TINY })] })); i++; continue; }
    if (s.startsWith('|') && i + 1 < lines.length && isSep(lines[i + 1])) {
      const block = [cellsOf(lines[i])]; i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) { block.push(cellsOf(lines[i])); i++; }
      kids.push(mkTable(block));
      kids.push(new Paragraph({ spacing: { after: 140 }, children: [new TextRun({ text: '', font: FONT, size: TINY })] }));
      continue;
    }
    const hm = s.match(/^(#{1,4})\s+(.*)$/);
    if (hm) {
      const lvl = hm[1].length, txt = stripMd(hm[2]);
      const spec = lvl === 1 ? [HeadingLevel.HEADING_1, 32, accent, 240, 160] : lvl === 2 ? [HeadingLevel.HEADING_2, 26, accent, 220, 100] : [HeadingLevel.HEADING_3, 23, grey, 180, 80];
      kids.push(new Paragraph({ heading: spec[0], keepNext: true, spacing: { before: spec[3], after: spec[4] }, children: [new TextRun({ text: txt, font: FONT, size: spec[1], bold: true, color: spec[2] })] }));
      i++; continue;
    }
    const fig = s.match(/^!\[([^\]]*)\]\(([^)]*)\)\s*$/);
    if (fig) {
      let rp = fig[2].trim(); let wcm;
      const wm = rp.match(/^(.*?)\s+"w=([\d.]+)"$/);
      if (wm) { rp = wm[1]; wcm = parseFloat(wm[2]); }
      kids.push(...buildFigure(fig[1], rp, mdDir, wcm)); i++; continue;
    }
    if (s.startsWith('> ')) { kids.push(new Paragraph({ indent: { left: 720, right: 720 }, spacing: { before: 60, after: 160, line: 300 }, children: runs(s.slice(2), BODY, { italics: true }) })); i++; continue; }
    // figure placeholder / editorial note -> boxed italic grey paragraph
    if (/^\[(FIGURE|NOTE|RB-|FALLBACK|PROTOTYPE|DRAFT)/i.test(s)) { kids.push(placeholderBox(s)); i++; continue; }
    const bm = s.match(/^[-*]\s+(.*)$/), nm = s.match(/^(\d+)\.\s+(.*)$/);
    if (bm || nm) { kids.push(new Paragraph({ numbering: { reference: nm ? 'nums' : 'bullets', level: 0 }, spacing: { after: 80, line: 300 }, children: runs(bm ? bm[1] : nm[2]) })); i++; continue; }
    if (s.startsWith('*') && !s.startsWith('**') && s.endsWith('*') && !s.endsWith('**')) { kids.push(new Paragraph({ spacing: { after: 140, line: 300 }, children: [new TextRun({ text: s.slice(1, -1), font: FONT, size: SMALL, italics: true, color: grey })] })); i++; continue; }
    kids.push(new Paragraph({ spacing: { after: 140, line: 300, lineRule: 'auto' }, alignment: AlignmentType.LEFT, children: runs(s) }));
    i++;
  }
  return new Document({
    creator: 'Raphael Byun', title: meta.TITLE || opts.title,
    styles: { default: { document: { run: { font: FONT, size: BODY } } } },
    numbering: { config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 620, hanging: 320 } } } }] },
      { reference: 'nums', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 620, hanging: 320 } } } }] },
    ] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: meta.HEADER || '', font: FONT, size: TINY, color: grey })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'COMP3180 Research Proposal — Raphael Byun — Page ', font: FONT, size: TINY, color: grey }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: TINY, color: grey })] })] }) },
      children: kids,
    }],
  });
}

(async () => {
  const [inMd, outDocx] = process.argv.slice(2);
  if (!inMd || !outDocx) { console.error('usage: node build-docx-v2.js <in.md> <out.docx>'); process.exit(2); }
  const doc = convert(inMd, { title: 'COMP3180 Research Proposal' });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outDocx, buf);
  console.log('OK ' + outDocx + ' (' + buf.length + ' bytes)');
})().catch(e => { console.error('ERROR:', e); process.exit(1); });
