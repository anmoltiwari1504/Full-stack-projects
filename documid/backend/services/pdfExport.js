const PDFDocument = require('pdfkit');

function buildSummaryPdf(doc) {
  const pdf = new PDFDocument({ margin: 50 });
  const s = doc.summary || {};

  pdf.fontSize(20).text('DocuMind AI Summary');
  pdf.moveDown(0.3);
  pdf.fontSize(10).fillColor('gray').text(`Source: ${doc.originalName}`);

  pdf.moveDown().fillColor('black').fontSize(14).text('Overview');
  pdf.fontSize(11).text(s.overview || 'No overview available.');

  pdf.moveDown().fontSize(14).text('Key Points');
  (s.keyPoints || []).forEach((point) => {
    pdf.fontSize(11).text(`• ${point}`, { indent: 10 });
  });

  pdf.moveDown().fontSize(14).text('Conclusion');
  pdf.fontSize(11).text(s.conclusion || 'No conclusion available.');

  pdf.end();
  return pdf;
}

module.exports = { buildSummaryPdf };
