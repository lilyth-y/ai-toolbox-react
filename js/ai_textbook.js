const STORAGE_KEY = "ai_textbook_weekly_checks_v1";

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
  const checkboxes = document.querySelectorAll("#weeklyChecklist input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    const key = checkbox.getAttribute("data-key");
    checkbox.checked = Boolean(state[key]);

    checkbox.addEventListener("change", () => {
      state[key] = checkbox.checked;
      saveCheckState(state);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScroll();
  initChecklistPersistence();
});
