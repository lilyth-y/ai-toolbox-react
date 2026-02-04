import React, { useState, useRef, useEffect, FC } from 'react';
import { Play, Sparkles, User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@context/ToastContext';
import { useGemini } from '@hooks/useGemini';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface ChatMessage {
  type: 'user' | 'ai';
  text: string;
}

interface AnalysisData {
  s: number;
  r: number;
  c: number;
  score: number;
}

const PromptLab: FC = () => {
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([
    { type: 'ai', text: '안녕하세요! 프롬프트를 입력하면 제가 어떻게 반응하는지 미리 테스트해볼 수 있습니다.' }
  ]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();
  const { callApi } = useGemini();
  const { t } = useAppTranslation();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const runSimulation = async () => {
    if (!input.trim()) return;

    const newChat: ChatMessage[] = [...chat, { type: 'user', text: input }];
    setChat(newChat);
    setLoading(true);

    try {
      const responseText = await callApi(input);
      
      if (responseText) {
        setChat(prev => [...prev, { type: 'ai', text: responseText }]);
        
        // Simple analysis
        const s = Math.min(100, (input.length / 500) * 100);
        const r = Math.random() * 100;
        const c = Math.min(100, (input.split(/[.!?]/g).length - 1) * 20);
        const score = (s + r + c) / 3;
        
        setAnalysis({ s, r, c, score });
        addToast(t('messages.success') || '완료했습니다!', 'success');
      } else {
        addToast(t('messages.error') || '오류가 발생했습니다', 'error');
      }
    } catch (error) {
      addToast(t('messages.error') || '오류가 발생했습니다', 'error');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast(t('messages.copied') || '복사되었습니다!', 'success');
  };

  return (
    <div className="prompt-lab">
      <h2>{t('promptLab.title') || 'Prompt Lab'}</h2>
      <p>{t('promptLab.subtitle') || 'Test your prompts with AI'}</p>

      <div className="prompt-container">
        <div className="chat-area" ref={chatRef}>
          {chat.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <div className="message-icon">
                {msg.type === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className="message-content">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {msg.type === 'ai' && (
                  <button className="copy-btn" onClick={() => handleCopy(msg.text)}>
                    <Copy size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message ai">
              <div className="message-icon"><Bot size={20} /></div>
              <div className="spinner">{t('promptLab.thinking') || 'AI is thinking...'}</div>
            </div>
          )}
        </div>

        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('promptLab.placeholder') || 'Enter your prompt here...'}
            disabled={loading}
          />
          <button onClick={runSimulation} disabled={loading || !input.trim()}>
            {loading ? <Sparkles size={20} /> : <Play size={20} />}
            {t('promptLab.send') || 'Send'}
          </button>
        </div>

        {analysis && (
          <div className="analysis">
            <h4>{t('promptLab.response') || 'Analysis'}</h4>
            <div className="score-bars">
              <div className="bar">
                <label>Structure</label>
                <div className="progress">
                  <div style={{ width: `${analysis.s}%` }}></div>
                </div>
              </div>
              <div className="bar">
                <label>Relevance</label>
                <div className="progress">
                  <div style={{ width: `${analysis.r}%` }}></div>
                </div>
              </div>
              <div className="bar">
                <label>Clarity</label>
                <div className="progress">
                  <div style={{ width: `${analysis.c}%` }}></div>
                </div>
              </div>
            </div>
            <p>Overall Score: {analysis.score.toFixed(1)}/100</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptLab;
