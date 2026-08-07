const state = {
  role: null,
  goal: null
};

const goals = [
  { id: 'write', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>', label: '글쓰기/문서 작성' },
  { id: 'research', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', label: '자료 조사/논문 검색' },
  { id: 'code', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', label: '코딩/프로그래밍' },
  { id: 'design', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></svg>', label: '디자인/이미지 생성' },
  { id: 'ppt', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 14h6"/><path d="M9 17h4"/></svg>', label: '발표 자료(PPT) 만들기' },
  { id: 'trans', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', label: '번역/외국어 학습' },
  { id: 'video', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', label: '영상 제작/편집 AI' },
  { id: 'music', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>', label: '음악 작곡/BGM 생성' }
];

const recommendations = {
  'write': {
    name: 'ChatGPT / Claude',
    desc: '글쓰기 초안 작성, 교정, 아이디어 확장에 가장 강력합니다.',
    logo: '✍️',
    url: 'https://chat.openai.com'
  },
  'research': {
    name: 'Perplexity',
    desc: '출처가 명확한 실시간 정보와 학술 논문을 검색할 때 최고입니다.',
    logo: '🔎',
    url: 'https://www.perplexity.ai'
  },
  'code': {
    name: 'Cursor',
    desc: 'VS Code 기반의 차세대 AI 에디터. 코드를 "작성"하는 것 뿐만 아니라 전체 프로젝트를 이해합니다.',
    logo: '💻',
    url: 'https://cursor.sh'
  },
  'design': {
    name: 'Midjourney',
    desc: '고품질 이미지 생성이나 쉬운 디자인 편집이 필요할 때 추천합니다.',
    logo: '🎨',
    url: 'https://www.midjourney.com'
  },
  'ppt': {
    name: 'Gamma',
    desc: '텍스트만 입력하면 디자인된 슬라이드를 자동으로 만들어줍니다.',
    logo: '📊',
    url: 'https://gamma.app'
  },
  'trans': {
    name: 'DeepL',
    desc: '가장 자연스러운 AI 번역기입니다. 단순 번역을 넘어 작문 교정까지.',
    logo: '🌐',
    url: 'https://www.deepl.com'
  },
  'video': {
    name: 'Runway / Pika',
    desc: '텍스트나 이미지를 넣으면 고퀄리티 영상으로 변환해주는 크리에이티브 도구입니다.',
    logo: '🎬',
    url: 'https://runwayml.com'
  },
  'music': {
    name: 'Suno AI',
    desc: '가사와 스타일만 입력하면 보컬이 포함된 3분짜리 노래를 뚝딱 만들어줍니다.',
    logo: '🎵',
    url: 'https://suno.com'
  }
};

const GEMINI_API_KEY_STORAGE_KEY = 'gemini_api_key';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toSafeMultilineHtml(value) {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function getGeminiApiKey() {
  // Backward-compat: migrate old localStorage key to sessionStorage.
  const sessionKey = sessionStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
  if (sessionKey) return sessionKey;

  const legacyKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
  if (legacyKey) {
    sessionStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, legacyKey);
    localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    return legacyKey;
  }

  return '';
}

function setGeminiApiKey(key) {
  if (key) {
    sessionStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key);
  } else {
    sessionStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
  }
  // Ensure no long-lived copy remains in localStorage.
  localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
}

function selectRole(role) {
  state.role = role;
  document.getElementById('step1').classList.remove('active');

  const goalContainer = document.getElementById('goalOptions');
  goalContainer.innerHTML = goals.map(g => `
    <div class="option-card" onclick="selectGoal('${g.id}')">
      <div class="option-icon-wrapper">${g.iconHtml}</div>
      <span class="option-label">${g.label}</span>
    </div>
  `).join('');

  setTimeout(() => {
    document.getElementById('step2').classList.add('active');
  }, 100);
}

function selectGoal(goal) {
  state.goal = goal;
  document.getElementById('step2').classList.remove('active');

  const rec = recommendations[goal];
  let finalRec = rec;
  // Special Logic
  if (state.role === 'educator' && goal === 'design') {
    finalRec = {
      name: 'Canva for Education',
      desc: '교사를 위한 강력한 무료 디자인 도구 및 수업 자료 템플릿.',
      logo: '🎨',
      url: 'https://www.canva.com/education/'
    };
  }
  if (state.role === 'student' && goal === 'code') {
    finalRec = {
      name: 'GitHub Student Pack',
      desc: '학생 인증으로 Copilot, JetBrains 등 유료 툴을 무료로 사용하세요.',
      logo: '🎒',
      url: 'https://education.github.com/pack'
    };
  }

  const resultContainer = document.getElementById('recommendationResult');
  resultContainer.innerHTML = `
    <div class="recommendation-card">
      <div class="tool-logo-wrapper">${finalRec.logo}</div>
      <h3 class="tool-name">${finalRec.name}</h3>
      <p class="tool-desc">${finalRec.desc}</p>
      <a href="${finalRec.url}" target="_blank" class="cta-btn">
        지금 써보기 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  `;

  setTimeout(() => {
    document.getElementById('step3').classList.add('active');
  }, 100);
}

function resetWizard() {
  state.role = null;
  state.goal = null;
  document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
  document.getElementById('step1').classList.add('active');
}

// Prompt Lab Logic
/* Settings Modal Logic */
const modal = document.getElementById('settingsModal');
const apiKeyInput = document.getElementById('apiKeyInput');

// Load Key on Start
const savedKey = getGeminiApiKey();
if (savedKey) {
  apiKeyInput.value = savedKey;
  updateBadge(true);
}

function openSettings() {
  modal.classList.add('open');
}

function closeSettings() {
  modal.classList.remove('open');
}

function saveSettings() {
  const key = apiKeyInput.value.trim();
  if (key) {
    setGeminiApiKey(key);
    updateBadge(true);
    alert("API Key가 현재 브라우저 세션에 저장되었습니다. 이제 실제 AI가 동작합니다! 🧠");
  } else {
    setGeminiApiKey('');
    updateBadge(false);
    alert("API Key가 삭제되었습니다. 시뮬레이션 모드로 전환됩니다.");
  }
  closeSettings();
}

function updateBadge(isReal) {
  const badge = document.getElementById('aiModelBadge');
  if (!badge) return;
  if (isReal) {
    badge.innerText = "⚡ Real Gemini AI";
    badge.style.background = "#4f46e5";
    badge.style.color = "white";
  } else {
    badge.innerText = "Simulated AI";
    badge.style.background = "#374151";
    badge.style.color = "#9ca3af";
  }
}

/* API Call Logic */
async function callGemini(prompt) {
  const key = getGeminiApiKey();
  if (!key) return null; // Fallback to simulation

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      console.error("Gemini API Error:", data.error.message);
      alert("API 호출 중 오류가 발생했습니다: " + data.error.message);
      return null;
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    alert("API 호출 중 오류가 발생했습니다. 키를 확인해주세요.");
    return null;
  }
}

async function runSimulation() {
  const input = document.getElementById('labInput').value.trim();
  const chatSim = document.getElementById('chatSim');

  if (!input) return;

  // User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'sim-msg';
  userMsg.innerHTML = `
    <div class="sim-avatar" style="background: #6b7280">👤</div>
    <div class="sim-content" style="background: #4b5563; color: white;">${toSafeMultilineHtml(input)}</div>
  `;
  chatSim.appendChild(userMsg);
  chatSim.scrollTop = chatSim.scrollHeight;

  // Loading Indicator
  const loadingId = 'loading-' + Date.now();
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'sim-msg';
  loadingMsg.id = loadingId;
  loadingMsg.innerHTML = `
    <div class="sim-avatar ai">🤖</div>
    <div class="sim-content">분석 중...</div>
  `;
  chatSim.appendChild(loadingMsg);
  chatSim.scrollTop = chatSim.scrollHeight;

  // Check for Real AI
  const realResponse = await callGemini(`
  You are a strict Prompt Engineering Instructor. 
  Analyze the following prompt: "${input}"
  
  1. Give a score (0-100) for Specificity, Role, and Context.
  2. Provide a short critique (Korean).
  3. If the score is low, ask clarifying questions. If high, praise it and simulate the output.
  
  Output JSON format:
  {
    "scores": {"s": 80, "r": 0, "c": 50},
    "critique": "Your critique here...",
    "response": "Simulated output here..."
  }
  ONLY OUTPUT RAW JSON.
  `);

  // Remove loading
  document.getElementById(loadingId).remove();

  let analysis = { r: 0, s: 0, c: 0, score: 0 };
  let responseText = "";

  if (realResponse) {
    // Process Real AI Response
    try {
      // Simple cleanup if MD block is returned
      let cleanJson = realResponse.replace(/```json/g, '').replace(/```/g, '');
      const data = JSON.parse(cleanJson);
      const critiqueText = typeof data.critique === 'string' ? data.critique : '';
      const responseBodyText = typeof data.response === 'string' ? data.response : '';

      analysis = { ...data.scores, score: (data.scores.s + data.scores.r + data.scores.c) / 3 };

      updateAnalysisPanel(analysis);
      // Show Critique + Response
      responseText = `<strong>[AI 분석]</strong> ${toSafeMultilineHtml(critiqueText)}<br><br><hr style="border-color:#555; margin:8px 0;">${toSafeMultilineHtml(responseBodyText)}`;

    } catch (e) {
      console.error("JSON Parse Error", e);
      responseText = "AI 응답을 해석하는데 실패했습니다. 응답 형식을 다시 확인해주세요.";
    }
  } else {
    // Fallback to Simulation
    analysis = analyzePrompt(input);
    updateAnalysisPanel(analysis);

    if (analysis.score < 50) {
      responseText = "죄송합니다. <strong>어떤 맥락인지, 누구를 대상으로 하는지</strong> 조금 더 구체적으로 알려주시겠어요? 리얼 AI 모드를 켜시면 더 똑똑한 조언을 드릴 수 있어요!";
    } else {
      responseText = "좋네요! 👌 제시해주신 <strong>역할과 상황</strong>에 맞춰 초안을 작성해보겠습니다. (시뮬레이션: 요청하신 의도대로 상세하게 출력 중...)";
    }
  }

  // AI Response
  const aiMsg = document.createElement('div');
  aiMsg.className = 'sim-msg';
  aiMsg.innerHTML = `
    <div class="sim-avatar ai">🤖</div>
    <div class="sim-content">${responseText}</div>
  `;
  chatSim.appendChild(aiMsg);
  chatSim.scrollTop = chatSim.scrollHeight;
}

function analyzePrompt(text) {
  let score = 20;
  let review = { r: 0, s: 0, c: 0, msg: "" };

  // Simple Heuristics (Rule-based)
  if (text.length > 50) score += 20;
  if (text.includes("너는") || text.includes("역할") || text.includes("담당자")) {
    score += 30;
    review.r = 100;
  }
  if (text.includes("작성해줘") || text.includes("요약해줘")) {
    review.s += 50;
  }
  if (text.includes("대상") || text.includes("상황") || text.includes("배경")) {
    score += 20;
    review.c = 100;
  }

  review.s = Math.min(100, (text.length / 100) * 100);
  review.score = Math.min(100, score);
  return review;
}

function updateAnalysisPanel(analysis) {
  const panel = document.getElementById('analysisPanel');
  panel.style.display = 'block';

  document.getElementById('scoreS').style.width = analysis.s + '%';
  document.getElementById('scoreR').style.width = analysis.r + '%';
  document.getElementById('scoreC').style.width = analysis.c + '%';

  const feedback = document.getElementById('feedbackText');
  if (analysis.score < 60) {
    feedback.innerHTML = "⚠️ <strong>개선 필요:</strong> '너는 ~야'라고 역할을 지정하고, 구체적인 상황을 더 설명해주세요.";
    feedback.style.color = "#f87171";
  } else {
    feedback.innerHTML = "✅ <strong>훌륭해요:</strong> AI가 이해하기 충분한 정보를 포함하고 있습니다.";
    feedback.style.color = "#4ade80";
  }
}

function autoOptimize() {
  const input = document.getElementById('labInput');
  const current = input.value;

  if (current.length < 5) {
    alert("최적화할 프롬프트를 먼저 입력해주세요 (5자 이상).");
    return;
  }

  // Check if Real AI is on
  const key = getGeminiApiKey();
  if (key) {
    input.value = "AI가 최적화 중입니다...";
    callGemini(`Refine this prompt using the 'Role-Instruction-Specifics-Parameters' framework. Return ONLY the refined prompt text without markdown.\n\nOriginal: "${current}"`)
      .then(refined => {
        if (refined) {
          input.value = "";
          let i = 0;
          function typeReal() {
            if (i < refined.length) {
              input.value += refined.charAt(i);
              i++;
              setTimeout(typeReal, 10);
            } else {
              runSimulation();
            }
          }
          typeReal();
        }
      });
    return;
  }

  // Fallback Simulation
  const targetText = `너는 전문 에디터야(Role).\n\n${current}에 대해 작성해줘(Instruction).\n문체는 정중하고 신뢰감 있게 하고(Specifics), \n핵심 내용 3가지를 포함해서 불렛 포인트로 정리해줘(Parameters).`;

  input.value = "";
  let i = 0;
  const speed = 20;

  function typeWriter() {
    if (i < targetText.length) {
      input.value += targetText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      runSimulation();
    }
  }

  typeWriter();
}

// Theme Logic
const themeBtn = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(isDark) {
  if (isDark) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

themeBtn.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// Check Init Theme
if (localStorage.getItem('theme') === 'dark') {
  setTheme(true);
}
