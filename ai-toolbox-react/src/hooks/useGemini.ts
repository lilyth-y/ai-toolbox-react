import { useState, useCallback } from 'react';

interface GeminiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * useGemini Hook - Updated to use Firebase Cloud Functions proxy
 * 
 * This hook now calls the backend proxy instead of directly calling Gemini API.
 * The API key is no longer exposed on the client side.
 * 
 * Usage:
 * const { callApi, loading, error } = useGemini();
 * const response = await callApi('Your prompt');
 */
export const useGemini = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(
    async (prompt: string): Promise<string | null> => {
      if (!prompt.trim()) {
        setError('Prompt cannot be empty');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        // Call Firebase Cloud Function proxy
        const functionUrl = import.meta.env.VITE_GEMINI_PROXY_URL || 
          'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/geminiProxy';

        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt,
            model: 'gemini-2.0-flash',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'API request failed');
        }

        const data: GeminiResponse = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'API returned an error');
        }

        return data.data || null;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Gemini API Error:', errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    callApi,
    loading,
    error,
    clearError,
  };
};

export default useGemini;
