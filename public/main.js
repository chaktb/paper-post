// 페이지 로드 확인용 — 자유롭게 수정하세요.
console.log("Site loaded ✨");

// ── 다크/라이트 테마 토글 ──
(function () {
  const KEY = "pdl-theme";

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btns = document.querySelectorAll(".theme-toggle");
    btns.forEach((btn) => {
      const icon = btn.querySelector(".icon");
      const label = btn.querySelector(".label");
      if (icon) icon.textContent = theme === "light" ? "🌙" : "☀️";
      if (label) label.textContent = theme === "light" ? "다크" : "라이트";
      btn.setAttribute("aria-label", theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환");
    });
  }

  function current() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function toggle() {
    const next = current() === "light" ? "dark" : "light";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  }

  // 저장된 값(head 인라인 스크립트가 이미 적용했을 수 있음)으로 버튼 상태 동기화
  function init() {
    apply(current());
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
  }

  // main.js가 <body> 끝에서 로드되면 DOMContentLoaded가 이미 지났을 수 있으므로 즉시 실행.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
