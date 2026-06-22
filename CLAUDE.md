# 프로젝트 가이드 (Claude Code용)

## 개요
GitHub에 push하면 Cloudflare Workers(Static Assets)가 자동으로 빌드·배포하는 정적 사이트.

## 구조
- `public/` — **배포되는 모든 웹 파일은 여기에 둔다** (Cloudflare 자산 디렉토리)
  - `public/index.html`, `public/about.html` — 페이지
  - `public/style.css` — 스타일
  - `public/main.js` — 클라이언트 스크립트
- `wrangler.toml` — Cloudflare Workers 설정 (`directory = "./public"`)
- 루트의 `node_modules`, `package.json` 등은 배포되지 않는다.

⚠️ 새 페이지/자산은 반드시 `public/` 안에 만든다. 루트에 두면 배포에 포함되지 않는다.

## 작업 규칙 (Cloudflare 라우팅 주의)
Cloudflare는 기본 `html_handling: "auto-trailing-slash"`로 동작한다:
- `/about.html` 요청 → **307 redirect** → `/about`
- `/about` 요청 → 200 (about.html 서빙)

따라서 **링크/경로 작성 규칙**:
1. 내부 링크는 확장자 없이: `<a href="/about">` (O), `<a href="about.html">` (X)
2. 홈 링크: `<a href="/">`
3. 자산·fetch는 절대경로: `/style.css`, `fetch('/data.json')` (O) — 상대경로 지양
4. 페이지 내 앵커: `/#section` (O), `index.html#section` (X)

## 배포 흐름
1. 로컬에서 파일 수정
2. `git add -A && git commit -m "..." && git push`
3. Cloudflare가 자동 빌드·배포 (30~90초)

## 로컬 미리보기
```bash
npx wrangler dev     # Cloudflare 환경 그대로 로컬에서 미리보기
```

## 파일 크기 제한 (무료 플랜)
- 자산 개별: 25 MiB
- 전체: 20,000개 파일 / 200 MiB
- 큰 데이터(JSON 등)는 압축·요약 후 커밋
