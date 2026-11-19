const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  length: { type: String, enum: ['short', 'medium', 'long'], default: 'medium' },
  status: {
    type: String,
    enum: ['processing', 'done', 'failed'],
    default: 'processing',
    
  },
  extractedText: String,
  summary: {
    overview: String,
    keyPoints: [String],
    conclusion: String,
    
  },

},
  {timestamps : true }
)

module.exports = mongoose.model('Document', documentSchema);
