# pages

GitHub push → Cloudflare Workers 자동 빌드·배포 정적 사이트.

## 배포

`main` 브랜치에 push하면 Cloudflare가 자동 배포합니다.

```bash
git add -A
git commit -m "변경 내용"
git push
```

## 로컬 미리보기

```bash
npx wrangler dev
```

## 바이브 코딩

이 저장소는 [Claude Code](https://claude.com/claude-code)로 작업하도록 설정되어 있습니다.
작업 규칙은 [CLAUDE.md](CLAUDE.md) 참고.
