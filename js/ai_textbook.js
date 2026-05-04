const STORAGE_KEY = "ai_textbook_course_checks_v1";
const COURSE_ITEM_SELECTOR = "input[type='checkbox'][data-key]";
const CHAPTER_ITEM_SELECTOR = ".chapter-check input[type='checkbox'][data-key]";

function loadCheckState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    console.error("Failed to load checklist state:", error);
    return {};
  }
}

function saveCheckState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
    localStorage.setItem("ai_textbook_theme", isDark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("ai_textbook_theme");
  applyTheme(savedTheme === "dark");

  toggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    applyTheme(!isDark);
  });
}

function initSmoothScroll() {
  document.querySelectorAll(".quick-nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });
}

function initChecklistPersistence() {
  const state = loadCheckState();
  const checkboxes = document.querySelectorAll(COURSE_ITEM_SELECTOR);

  checkboxes.forEach((checkbox) => {
    const key = checkbox.getAttribute("data-key");
    checkbox.checked = Boolean(state[key]);

    checkbox.addEventListener("change", () => {
      state[key] = checkbox.checked;
      saveCheckState(state);
    });
  });
}

function updateCourseProgress() {
  const items = document.querySelectorAll(COURSE_ITEM_SELECTOR);
  const done = document.querySelectorAll(`${COURSE_ITEM_SELECTOR}:checked`);
  const ratio = items.length === 0 ? 0 : Math.round((done.length / items.length) * 100);
  const fill = document.getElementById("progressBar");
  const label = document.getElementById("progressText");
  const hint = document.getElementById("nextStepHint");

  if (fill) fill.style.width = `${ratio}%`;
  if (label) label.textContent = `${ratio}%`;

  if (hint) {
    const chapterChecks = Array.from(document.querySelectorAll(CHAPTER_ITEM_SELECTOR));
    const nextUnchecked = chapterChecks.find((checkbox) => !checkbox.checked);

    if (!nextUnchecked) {
      hint.textContent = "다음 권장 단계: 코스 완주 완료. End 회고를 팀 운영 계획으로 전환하세요.";
    } else {
      const chapterTitle = nextUnchecked.closest(".chapter")?.querySelector("h2")?.textContent;
      hint.textContent = chapterTitle
        ? `다음 권장 단계: ${chapterTitle}`
        : "다음 권장 단계: 다음 챕터를 진행하세요.";
    }
  }
}

function bindCourseProgress() {
  document.querySelectorAll(COURSE_ITEM_SELECTOR).forEach((checkbox) => {
    checkbox.addEventListener("change", updateCourseProgress);
  });
  updateCourseProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScroll();
  initChecklistPersistence();
  bindCourseProgress();
});
