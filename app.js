// AI Toolbox 애플리케이션 로직

const ALLOWED_TOOL_CATEGORIES = new Set(['llm', 'research', 'design', 'coding', 'other']);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeHttpUrl(value) {
  try {
    const url = new URL(String(value ?? ''), window.location.origin);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch (error) {
    // Ignore parsing errors and fall back to safe no-op URL.
  }
  return '#';
}

// 카드 생성 함수
function createCard(tool) {
  const card = document.createElement('article');
  const safeCategory = ALLOWED_TOOL_CATEGORIES.has(tool.category) ? tool.category : 'other';
  const safeName = escapeHtml(tool.name);
  const safeOptimized = escapeHtml(tool.optimized);
  const safePurpose = escapeHtml(tool.purpose);
  const safeMethod = escapeHtml(tool.method);
  const safeToolUrl = normalizeHttpUrl(tool.url);
  const safeButtonText = escapeHtml(tool.buttonText || '바로가기');
  const safeId = String(tool.id ?? '');
  card.className = 'card';
  card.setAttribute('data-category', safeCategory);
  card.setAttribute('data-educator', tool.educator);
  card.setAttribute('data-id', safeId);

  // 카테고리 배지
  const categoryLabel = tool.categoryLabel || 
    (safeCategory === 'llm' ? 'LLM' :
     safeCategory === 'research' ? '연구' :
     safeCategory === 'design' ? '디자인' :
     safeCategory === 'coding' ? '코딩' : '기타');
  const safeCategoryLabel = escapeHtml(categoryLabel);

  let badgeHTML = `<span class="category-badge cat-${safeCategory}">${safeCategoryLabel}</span>`;
  if (tool.educator) {
    const eduBadgeText = escapeHtml(tool.educatorBadge || '교수/교사 가능');
    badgeHTML += `<span class="edu-badge">${eduBadgeText}</span>`;
  }

  // 가격 정보
  let priceHTML = escapeHtml(tool.cost);
  if (tool.originalPrice) {
    priceHTML += ` <span class="original-price">${escapeHtml(tool.originalPrice)}</span>`;
  }

  // 태그
  const tags = Array.isArray(tool.tags) ? tool.tags : [];
  const tagsHTML = tags.map(tag => 
    `<span class="tag" data-tag="${escapeHtml(tag)}" role="button" tabindex="0" aria-label="${escapeHtml(tag)} 태그 필터">#${escapeHtml(tag)}</span>`
  ).join('');

  card.innerHTML = `
    <div class="card-header">
      <div class="badge-group">
        ${badgeHTML}
      </div>
    </div>
    <h3 class="program-name">${safeName}</h3>
    <div class="cost-info">${priceHTML}</div>
    <table class="data-table">
      <tr class="data-row">
        <td class="data-label">최적화</td>
        <td class="data-val optimized-text">${safeOptimized}</td>
      </tr>
      <tr class="data-row">
        <td class="data-label">사용 목적</td>
        <td class="data-val">${safePurpose}</td>
      </tr>
      <tr class="data-row">
        <td class="data-label">사용 방법</td>
        <td class="data-val">${safeMethod}</td>
      </tr>
    </table>
    <div class="tags">
      ${tagsHTML}
    </div>
    <div class="action-area" style="display: flex; gap: 10px;">
      <a href="${safeToolUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="btn-link" 
         style="flex: 1;"
         data-url="${safeToolUrl}"
         aria-label="${safeButtonText} - ${safeName}">
        ${safeButtonText}
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>
      <button class="share-btn" 
              data-url="${safeToolUrl}" 
              aria-label="링크 복사"
              type="button">
        <svg style="width:20px;height:20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
          </path>
        </svg>
      </button>
    </div>
  `;

  return card;
}

// 통계 업데이트
function updateStats() {
  const cards = document.querySelectorAll('.card');
  const totalCount = document.getElementById('totalCount');
  const freeCount = document.getElementById('freeCount');
  const eduCount = document.getElementById('eduCount');
  const visibleCount = document.getElementById('visibleCount');

  const visibleCards = Array.from(cards).filter(card => 
    card.style.display !== 'none'
  );

  totalCount.textContent = cards.length;
  freeCount.textContent = Array.from(cards).filter(card => {
    const costInfo = card.querySelector('.cost-info').textContent;
    return costInfo.includes('무료') || costInfo.includes('FREE');
  }).length;
  eduCount.textContent = document.querySelectorAll('.card[data-educator="true"]').length;
  
  if (visibleCount) {
    visibleCount.textContent = visibleCards.length;
  }
}

// 디바운스 함수
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 빈 상태 표시
function showEmptyState() {
  const grid = document.getElementById('resourceGrid');
  const emptyState = document.getElementById('emptyState');
  const visibleCards = Array.from(grid.querySelectorAll('.card')).filter(card => 
    card.style.display !== 'none'
  );

  if (visibleCards.length === 0) {
    if (!emptyState) {
      const emptyDiv = document.createElement('div');
      emptyDiv.id = 'emptyState';
      emptyDiv.className = 'empty-state';
      emptyDiv.innerHTML = `
        <p style="text-align: center; padding: 40px; color: var(--text-sub);">
          검색 결과가 없습니다.
        </p>
        <button class="filter-btn" onclick="clearFilters()" style="display: block; margin: 0 auto;">
          필터 초기화
        </button>
      `;
      grid.appendChild(emptyDiv);
    } else {
      emptyState.style.display = 'block';
    }
  } else {
    if (emptyState) {
      emptyState.style.display = 'none';
    }
  }
}

// 필터 초기화
function clearFilters() {
  const searchInput = document.getElementById('toolSearch');
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  
  searchInput.value = '';
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === 'all') {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  
  activeFilter = 'all';
  activeTag = null;
  updateDisplay();
}

// 메인 애플리케이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  let cards = document.querySelectorAll('.card'); // 나중에 업데이트됨
  const searchInput = document.getElementById('toolSearch');
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const toast = document.getElementById('toast');
  const guideBtn = document.getElementById('guideBtn');
  const guideModal = document.getElementById('guideModal');
  const closeModal = document.getElementById('closeModal');
  const grid = document.getElementById('resourceGrid');

  // 초기 통계
  updateStats();

  // 상태
  let activeFilter = 'all';
  let activeTag = null;

  // 카드 렌더링 (tools-data.js의 데이터로 추가 카드 생성)
  if (typeof toolsData !== 'undefined' && toolsData.length > 0) {
    // 기존 카드가 있는지 확인
    const existingCardIds = Array.from(cards).map(card => card.getAttribute('data-id'));
    
    toolsData.forEach(tool => {
      // 기존에 없는 카드만 추가
      if (!existingCardIds.includes(tool.id)) {
        const card = createCard(tool);
        grid.appendChild(card);
      }
    });
    
    // 카드 목록 다시 가져오기
    const allCards = document.querySelectorAll('.card');
    updateStats();
  }

  function updateDisplay() {
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCount = 0;
    
    // 카드 목록 다시 가져오기 (동적으로 추가된 카드 포함)
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
      const name = card.querySelector('.program-name').textContent.toLowerCase();
      const optimized = card.querySelector('.optimized-text')?.textContent.toLowerCase() || '';
      const purpose = card.querySelector('.data-val')?.textContent.toLowerCase() || '';
      const category = card.getAttribute('data-category');
      const isEdu = card.getAttribute('data-educator') === 'true';
      const cardTags = Array.from(card.querySelectorAll('.tag')).map(t => t.getAttribute('data-tag'));

      let matchesFilter = false;
      if (activeFilter === 'all') matchesFilter = true;
      else if (activeFilter === 'edu') matchesFilter = isEdu;
      else matchesFilter = (category === activeFilter);

      const matchesSearch = !searchTerm || 
        name.includes(searchTerm) || 
        optimized.includes(searchTerm) ||
        purpose.includes(searchTerm);
      const matchesTag = !activeTag || cardTags.includes(activeTag);

      if (matchesFilter && matchesSearch && matchesTag) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    showEmptyState();
    updateStats();
    
    // 카드 목록 업데이트
    cards = document.querySelectorAll('.card');
  }

  // 필터 버튼 이벤트
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.getAttribute('data-filter');
      activeTag = null;
      updateDisplay();
    });
  });

  // 검색 입력 (디바운싱)
  const debouncedUpdate = debounce(updateDisplay, 300);
  searchInput.addEventListener('input', debouncedUpdate);

  // 검색 입력 키보드 이벤트
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      updateDisplay();
      searchInput.focus();
    }
  });

  // 태그 클릭 (이벤트 위임)
  grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
      const tagVal = e.target.getAttribute('data-tag');
      if (activeTag === tagVal) {
        activeTag = null;
        e.target.classList.remove('active');
      } else {
        activeTag = tagVal;
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
      }
      updateDisplay();
    }
  });

  // 태그 키보드 이벤트
  grid.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('tag') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      e.target.click();
    }
  });

  // 공유 버튼 (이벤트 위임)
  grid.addEventListener('click', (e) => {
    if (e.target.closest('.share-btn')) {
      const btn = e.target.closest('.share-btn');
      const url = btn.getAttribute('data-url');
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          toast.classList.add('show');
          toast.setAttribute('role', 'status');
          toast.setAttribute('aria-live', 'polite');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2000);
        }).catch(() => {
          toast.textContent = '링크 복사에 실패했습니다.';
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
            toast.textContent = '링크가 복사되었습니다!';
          }, 2000);
        });
      } else {
        // 폴백: URL을 선택 가능한 텍스트로 표시
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.classList.add('show');
        } catch (err) {
          toast.textContent = '링크 복사에 실패했습니다.';
          toast.classList.add('show');
        }
        document.body.removeChild(textArea);
        setTimeout(() => {
          toast.classList.remove('show');
          toast.textContent = '링크가 복사되었습니다!';
        }, 2000);
      }
    }
  });

  // 테마 토글
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', '다크 모드로 전환');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', '라이트 모드로 전환');
    }
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  // 저장된 테마 불러오기
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }

  // 가이드 모달
  guideBtn.addEventListener('click', () => {
    guideModal.classList.add('show');
    guideModal.setAttribute('aria-hidden', 'false');
    closeModal.focus();
  });

  closeModal.addEventListener('click', () => {
    guideModal.classList.remove('show');
    guideModal.setAttribute('aria-hidden', 'true');
    guideBtn.focus();
  });

  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) {
      guideModal.classList.remove('show');
      guideModal.setAttribute('aria-hidden', 'true');
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && guideModal.classList.contains('show')) {
      guideModal.classList.remove('show');
      guideModal.setAttribute('aria-hidden', 'true');
      guideBtn.focus();
    }
  });

  // 포커스 트랩 (모달 내부)
  const focusableElements = guideModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  guideModal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });

  // 초기 표시 업데이트
  updateDisplay();
});

// 전역 함수로 노출 (필터 초기화용)
window.clearFilters = function() {
  const searchInput = document.getElementById('toolSearch');
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  
  searchInput.value = '';
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === 'all') {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  
  // activeFilter와 activeTag는 클로저 내부에 있으므로 직접 접근 불가
  // 대신 updateDisplay를 다시 호출하기 위해 이벤트를 트리거
  searchInput.dispatchEvent(new Event('input'));
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
};
