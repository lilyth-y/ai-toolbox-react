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
export declare const geminiProxy: import("firebase-functions/v2/https").HttpsFunction;
/**
 * Firebase Cloud Function - API Health Check
 * Returns basic health status of the API
 */
export declare const apiHealth: import("firebase-functions/v2/https").HttpsFunction;
