const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const { extractText } = require('../services/extractText');
const { summarizeText, summarizeImage } = require('../services/summarizer');
const { buildSummaryPdf } = require('../services/pdfExport');

const router = express.Router();

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/png',
  'image/jpeg',
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true);
    cb(Object.assign(new Error('Unsupported file type'), { status: 400 }));
  },
});

// Background mein chalta hai, response ke baad
async function processDocument(id, file, length) {
  try {
    let summary;
    let text = null;

    if (file.mimetype.startsWith('image/')) {
      summary = await summarizeImage(file.buffer, file.mimetype, length);
    } else {
      text = await extractText(file);
      if (!text || !text.trim()) throw new Error('No readable text found');
      summary = await summarizeText(text, length);
    }

    await Document.findByIdAndUpdate(id, {
      extractedText: text,
      summary,
      status: 'done',
    });
  } catch (err) {
    console.error(`Processing failed for ${id}:`, err.message);
    await Document.findByIdAndUpdate(id, { status: 'failed' });
  }
}

// Multer error handler middleware
function handleUpload(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res
        .status(err.status || 400)
        .json({ error: err.message || 'File upload error' });
    }
    next();
  });
}

// POST /api/documents/upload
router.post('/upload', handleUpload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const length = ['short', 'medium', 'long'].includes(req.body.length)
    ? req.body.length
    : 'medium';

  const doc = await Document.create({
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    length,
  });

  res.status(202).json({ id: doc._id, status: 'processing' });

  processDocument(doc._id, req.file, length);
});

// GET /api/documents/:id
router.get('/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id).select('-extractedText');
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  res.json(doc);
});

// PATCH /api/documents/:id/summary
router.patch('/:id/summary', async (req, res) => {
  const { overview, keyPoints, conclusion } = req.body;
  const doc = await Document.findByIdAndUpdate(
    req.params.id,
    { summary: { overview, keyPoints, conclusion } },
    { new: true }
  ).select('-extractedText');

  if (!doc) return res.status(404).json({ error: 'Document not found' });
  res.json(doc);
});

// GET /api/documents/:id/pdf
router.get('/:id/pdf', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="summary-${doc._id}.pdf"`);
  buildSummaryPdf(doc).pipe(res);
});

module.exports = router;