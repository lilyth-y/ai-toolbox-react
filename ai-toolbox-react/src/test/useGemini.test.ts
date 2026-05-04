import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGemini } from '../hooks/useGemini';

describe('useGemini', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('초기 상태가 올바르게 설정됨', () => {
    const { result } = renderHook(() => useGemini());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('빈 프롬프트 시 에러 반환', async () => {
    const { result } = renderHook(() => useGemini());

    let response: string | null = null;
    await act(async () => {
      response = await result.current.callApi('');
    });

    expect(response).toBeNull();
    expect(result.current.error).toBe('Prompt cannot be empty');
  });

  it('에러 클리어 기능 작동', () => {
    const { result } = renderHook(() => useGemini());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('API 호출이 올바른 형식을 사용함', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: 'test response'
        }),
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useGemini());

    await act(async () => {
      await result.current.callApi('test prompt');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: expect.stringContaining('test prompt')
      })
    );
  });

  it('API 에러 처리', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          error: 'API Error'
        }),
      })
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useGemini());

    await act(async () => {
      await result.current.callApi('test prompt');
    });

    expect(result.current.error).toBe('API Error');
  });
});
