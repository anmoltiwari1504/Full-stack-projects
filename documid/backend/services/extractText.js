const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(file) {
  switch (file.mimetype) {
    case 'application/pdf': {
      // pdf-parse v2: pass buffer in constructor options, then call load() + getText()
      const parser = new PDFParse({ data: file.buffer, verbosity: 0 });
      await parser.load();
      const result = await parser.getText();
      return result.text || '';
    }

    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return (await mammoth.extractRawText({ buffer: file.buffer })).value;

    case 'text/plain':
      return file.buffer.toString('utf-8');

    default:
      return null;
  }
}

module.exports = { extractText };
