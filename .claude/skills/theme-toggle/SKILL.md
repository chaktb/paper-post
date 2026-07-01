---
name: theme-toggle
description: 이 정적 사이트(public/, Cloudflare Workers)의 페이지에 다크/라이트 테마 토글 버튼을 추가하거나, 새 페이지를 만들 때 테마 토글이 처음부터 동작하도록 보장하는 스킬. 사용자가 "다크모드", "라이트모드", "테마 토글", "dark/light 전환", "테마 버튼 넣어줘", "새 페이지에도 테마 적용" 등을 요청하거나, public/ 아래에 새 HTML 페이지를 추가할 때 반드시 이 스킬을 사용하라. CSS 변수 오버라이드(:root[data-theme="light"]) + localStorage 저장 + FOUC 방지 인라인 스크립트로 구현하며, 이미 검증된 style.css / main.js 규약을 따른다.
---

# theme-toggle — 다크/라이트 테마 토글

이 사이트는 `:root`의 CSS 변수(다크가 기본)를 `:root[data-theme="light"]`가 오버라이드하는 방식으로 테마를 전환한다. 상태는 `localStorage`의 `pdl-theme` 키에 저장되고, 페이지 렌더 전에 `<head>` 인라인 스크립트가 저장된 값을 적용해 **깜빡임(FOUC)을 방지**한다. 토글 로직은 `/main.js`에 있다.

이 3요소(CSS 변수 · main.js · 페이지 마크업)가 **한 세트로 맞아야** 동작한다. 하나라도 빠지면 조용히 실패하므로, 새 페이지를 만들거나 테마를 손볼 때 아래 규약을 그대로 따른다.

## 언제 이 스킬을 쓰나
- `public/` 아래에 **새 HTML 페이지**를 추가할 때 → 테마 3요소를 반드시 포함(안 넣으면 그 페이지만 토글이 안 됨).
- 기존 페이지에 테마 토글을 **처음 넣을 때**.
- 테마 색상·전환·버튼 위치를 **수정할 때**.

## 왜 3요소가 다 필요한가 (디버깅 시 참고)
- **`<head>` 인라인 스크립트**: 저장된 테마를 렌더 전에 적용. 없으면 새로고침 때 다크→라이트 깜빡임이 보인다.
- **`main.js`**: 버튼 클릭 핸들러 + 저장. `main.js`는 `<body>` 끝에서 로드되므로 `DOMContentLoaded`가 이미 지났을 수 있다 → `readyState` 가드로 즉시 실행해야 한다. (이 가드가 없으면 클릭이 아무 반응 없이 실패한다 — 실제로 겪은 버그.)
- **버튼 마크업**: `.theme-toggle` 클래스 + `.icon`/`.label` 자식. main.js가 이 구조를 찾아 아이콘·라벨을 갱신한다.

## 새 페이지에 넣어야 할 3요소

### 1) `<head>` — 스타일시트 링크 바로 다음에 인라인 스크립트
```html
  <link rel="stylesheet" href="/style.css" />
  <script>(function(){try{var t=localStorage.getItem("pdl-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})();</script>
</head>
```

### 2) `<nav>` — GitHub 링크 다음에 토글 버튼
```html
      <a href="https://github.com/chaktb/pages">GitHub</a>
      <button class="theme-toggle" type="button"><span class="icon">☀️</span><span class="label">라이트</span></button>
    </nav>
```
초기 표기는 다크 기준(`☀️ 라이트` = "라이트로 전환"). main.js가 로드되며 현재 테마에 맞게 자동 갱신하므로 초기값은 이대로 두면 된다.

### 3) `</body>` 직전 — main.js 로드
```html
  <script src="/main.js"></script>
</body>
```
페이지에 다른 `<script>`(예: 계산기)가 있다면 그 **앞에** `/main.js`를 둔다.

## 공용 자산 (사이트 전역, 이미 존재)
아래 두 파일은 사이트에 이미 반영돼 있다. 새 사이트로 이식하거나 참고가 필요하면 `assets/`의 사본을 쓴다.
- **`assets/theme.css`** — `:root` / `:root[data-theme="light"]` 변수 블록 + 전환 + `.theme-toggle` 버튼 스타일. `public/style.css` 상단에 이 내용이 들어가 있어야 한다.
- **`assets/main.js`** — 검증된 토글 로직(readyState 가드 포함). `public/main.js`가 이 내용을 담고 있어야 한다.

CSS에서 색은 **하드코딩하지 말고 변수**(`var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--core)`, `var(--pre-bg)`, `var(--header-grad)` 등)로 쓴다. 그래야 라이트 모드에서 자동으로 맞는다. 예외: 캔버스/SVG를 **계기판 스타일**로 일부러 어둡게 유지하는 건 의도된 디자인이라 그대로 둬도 좋다(라이트 배경 위 어두운 차트 패널은 또렷하게 잘 보인다).

## 검증 방법 (로컬)
정적 서버로 미리보기하되, **브라우저가 옛 `main.js`/`style.css`를 캐싱**할 수 있음에 주의한다(실제로 디버깅을 헷갈리게 한 원인). 확실히 확인하려면:
- 서버 재시작 후에도 캐시가 남으면, `link.href`/`script.src`에 `?bust=<타임스탬프>`를 붙여 강제 새로고침.
- 배포 사이트(Cloudflare)는 `must-revalidate` 헤더로 매 배포마다 최신 파일을 주므로 사용자 측 캐시 문제는 없다.

확인 항목: 버튼 클릭 시 `document.documentElement`의 `data-theme`가 바뀌고, `localStorage['pdl-theme']`가 저장되고, 새로고침·페이지 이동 후에도 유지되는지.

## 배포
파일 수정 후 커밋·푸시하면 Cloudflare가 자동 배포한다:
```bash
git add -A && git commit -m "..." && git push
```

## 관련 스킬
새 요약 포스트를 만드는 [[paper-post]] 스킬의 `templates/post.html`에도 이 3요소가 이미 포함돼 있어, 그 스킬로 만든 포스트는 자동으로 테마를 지원한다.
