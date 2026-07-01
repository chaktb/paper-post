# 본문 블록 예시 ({{BODY}} 채우기용)

`post.html`의 `{{BODY}}`에 넣을 HTML 조각 모음. 각 섹션은 `<section>` + `<div class="card">` 패턴을 쓰며, 내용 없는 섹션은 통째로 뺀다. 아래를 복사·수정해서 조립한다.

## TL;DR (한 줄 요약)
```html
    <section>
      <h2>한 줄 요약</h2>
      <div class="card">
        <p style="margin:0;">여기에 1~2문장 TL;DR. <strong>핵심 키워드</strong>는 강조.</p>
      </div>
    </section>
```

## 핵심 내용 (불릿)
```html
    <section>
      <h2>핵심 내용</h2>
      <div class="card">
        <ul>
          <li>핵심 포인트 1</li>
          <li>핵심 포인트 2
            <ul>
              <li>하위 세부 사항</li>
            </ul>
          </li>
          <li>핵심 포인트 3 — <strong>중요 수치·결론</strong></li>
        </ul>
      </div>
    </section>
```

## 방법 / 접근
```html
    <section>
      <h2>방법 / 접근</h2>
      <div class="card">
        <ul>
          <li>사용한 방법·모델·실험 설계</li>
        </ul>
      </div>
    </section>
```

## 결과 / 수치 (표가 어울릴 때)
```html
    <section>
      <h2>결과</h2>
      <div class="card">
        <table>
          <thead>
            <tr><th>항목</th><th>값</th><th>비고</th></tr>
          </thead>
          <tbody>
            <tr><td>삽입손실</td><td><code>0.02 dB/cm</code></td><td>현재</td></tr>
            <tr><td>목표</td><td><code>0.0002 dB/cm</code></td><td>개선 필요</td></tr>
          </tbody>
        </table>
      </div>
    </section>
```

## 의의 / 한계
```html
    <section>
      <h2>의의 / 한계</h2>
      <div class="card">
        <ul>
          <li><strong>의의:</strong> 왜 중요한지</li>
          <li><strong>한계:</strong> 남은 과제·제약</li>
        </ul>
      </div>
    </section>
```

## 이미지 (사용자가 사진을 준 경우)
```html
    <section>
      <h2>그림</h2>
      <figure class="figure">
        <img src="/assets/{{slug}}/fig1.png" alt="설명" />
        <figcaption>그림 1. 캡션</figcaption>
      </figure>
    </section>
```

## 메모 (PDL 관점 시사점)
```html
    <section>
      <h2>메모</h2>
      <div class="card">
        <ul>
          <li>우리 프로젝트 관점의 시사점</li>
        </ul>
      </div>
    </section>
```
