const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  },
});

const LENGTH_GUIDE = {
  short: 'about 3 key points, one or two sentences each',
  medium: 'about 5 to 7 key points',
  long: 'about 8 to 12 key points with supporting detail',
};

function buildPrompt(length) {
  return `You are a precise document summarizer.
Respond ONLY with JSON in exactly this shape:
{"overview": "string", "keyPoints": ["string"], "conclusion": "string"}
Length guidance: ${LENGTH_GUIDE[length]}.
Do not invent facts that are not in the content.`;
}

// Retry up to 3 times on 503 / network errors with exponential backoff
async function withRetry(fn, retries = 3, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRetryable =
        err.status === 503 ||
        err.status === 429 ||
        err.message?.includes('fetch failed');
      if (isRetryable && attempt < retries) {
        console.warn(`Gemini attempt ${attempt} failed (${err.status || 'network'}), retrying in ${delayMs}ms...`);
        await new Promise((r) => setTimeout(r, delayMs));
        delayMs *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}

async function summarizeText(text, length = 'medium') {
  return withRetry(async () => {
    const result = await model.generateContent([buildPrompt(length), text]);
    return JSON.parse(result.response.text());
  });
}

async function summarizeImage(buffer, mimeType, length = 'medium') {
  return withRetry(async () => {
    const result = await model.generateContent([
      buildPrompt(length),
      { inlineData: { data: buffer.toString('base64'), mimeType } },
    ]);
    return JSON.parse(result.response.text());
  });
}

module.exports = { summarizeText, summarizeImage };
