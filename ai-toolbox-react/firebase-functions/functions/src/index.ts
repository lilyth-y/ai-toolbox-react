import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';
import cors from 'cors';

// Define secret for Gemini API key
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

// Initialize CORS
const corsHandler = cors({ origin: true });

/**
 * Firebase Cloud Function - Gemini API Proxy
 * 
 * This function acts as a proxy for the Gemini API to protect the API key.
 * The API key is stored securely in Firebase Secret Manager.
 * 
 * Request format:
 * POST /gemini-proxy
 * {
 *   "prompt": "Your prompt here",
 *   "model": "gemini-pro" (optional, defaults to gemini-pro)
 * }
 * 
 * Response format:
 * {
 *   "success": true,
 *   "data": "Generated response from Gemini API"
 * }
 */
export const geminiProxy = onRequest(
  { secrets: [GEMINI_API_KEY] },
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        // Only allow POST requests
        if (req.method !== 'POST') {
          return res.status(405).json({
            success: false,
            error: 'Method Not Allowed. Use POST.',
          });
        }

        // Validate request body
        const { prompt, model = 'gemini-2.0-flash' } = req.body;

        if (!prompt) {
          return res.status(400).json({
            success: false,
            error: 'Missing required field: prompt',
          });
        }

        // Call Gemini API
        const apiKey = GEMINI_API_KEY.value();
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        });

        if (!response.ok) {
          const error = await response.json() as Record<string, any>;
          return res.status(response.status).json({
            success: false,
            error: error.error?.message || 'Gemini API Error',
          });
        }

        const data = await response.json() as Record<string, any>;

        // Extract text from response
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        return res.status(200).json({
          success: true,
          data: text,
        });
      } catch (error) {
        console.error('Error in geminiProxy:', error);
        return res.status(500).json({
          success: false,
          error: 'Internal Server Error',
        });
      }
    });
  }
);

/**
 * Firebase Cloud Function - API Health Check
 * Returns basic health status of the API
 */
export const apiHealth = onRequest(async (req, res) => {
  corsHandler(req, res, () => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });
});
