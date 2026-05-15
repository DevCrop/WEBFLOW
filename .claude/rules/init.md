# Webflow Project Init — Intellectual Data
# Run this checklist in order before any page build work.

---

## 0. Project Background (from Notion history)

### Client Info

| Field     | Value                                       |
|-----------|---------------------------------------------|
| 담당자    | 김민아 팀장                                  |
| 연락처    | 010-5205-2047 / 02-6207-1122               |
| 이메일    | mina@intellectualdata.com                   |
| 기존 사이트 | https://intellectualdata.com/             |
| 진행상태  | 계약 중 (현재 시안 단계)                      |
| 담당 매니저 | 양매니저                                   |

### Why This Project Exists

인텔렉추얼데이터는 2024년 리브랜딩 후 사이트를 새로 제작했으나 **기술적 문제**가 발생했고, 기존 제작 업체가 폐업하면서 **트라우마**가 있는 상태. 웹플로우 선택의 핵심 이유는 **납품 후 직접 편집**하기 위함. 이전 사이트 제작 비용을 투입한 지 얼마 되지 않았기 때문에 디자인·인터랙션에서 **명확한 차별점**을 보여줘야 함.

### Functional Requirements

| Category        | Requirements                                                              |
|-----------------|---------------------------------------------------------------------------|
| CMS             | 전체 페이지 관리자 편집 가능, 관계형 CMS, 관리자 권한 구조                |
| 게시판          | Insight, Newsroom, (솔루션) 릴리스 노트 → 총 3개 이상, 확장 가능         |
| 접근 제어       | 특정인만 접근 가능한 페이지 구현                                          |
| DB 이관         | Insight, Newsroom 콘텐츠 + Contact Us 폼 데이터 + Newsletter 구독 DB      |
| 다국어          | 국문 / 영문 동시 운영, 향후 언어 확장 가능 구조 (add-on 예정)             |
| 폼              | 저장 기능, 관리자 Export                                                  |
| 파일            | 파일 업로드 / 다운로드                                                    |
| 뉴스레터        | 구독 기능                                                                 |
| 검색            | 사이트 내 검색 기능                                                       |
| SEO             | 페이지별 메타 (키워드·설명 고객 제공), hreflang, 글로벌 URL 전략          |
| 추적코드        | GA4 + GTM + DataLayer, 카카오·페이스북 픽셀 (고객이 코드 전달 예정)       |
| 인터랙션        | 고도화된 인터랙션 필수 (클라이언트 최우선 요구사항), Figma 프로토타입 컨펌 |
| 교육/매뉴얼    | 오픈 시 웹플로우 편집 교육 + 매뉴얼 제작 필요                             |

### Sitemap Notes (as of 04.28 meeting)

- 솔루션 메뉴: 아직 미확정 → 시안 컨펌 전까지 고객이 전달 예정
- 솔루션 하위 신규 페이지 "루미넌스" 추가 예정
- 솔루션 하위 릴리스 노트 게시판 추가
- 영문 사이트 게시판 추가 검토
- 내부 콘텐츠 증가 대응 → 탭 방식 사용
- CTA: 플로팅바 → 모달 아닌 페이지 이동 방식으로 변경
- 총 페이지 수: 약 22개 (메인 + 서브)
- 콘텐츠 전달 방식: 구글 Docs (04.28 고객 동의)

### Project Milestone

| Phase                  | 기간                      | 내용                                              |
|------------------------|---------------------------|---------------------------------------------------|
| 시안 (Figma)           | 04/09 ~ 04/20 (8일)       | 메인×2 · 서브×2 · 인터랙션 프로토타입            |
| 시안 컨펌·수정         | 04/21 ~ 04/27 (5일)       |                                                   |
| 웹플로우 제작          | 04/28 ~ 05/07 (7일)       | 기존 사이트 기준 20페이지                         |
| 웹플로우 컨펌·수정     | 05/08 ~ 05/14 (5일)       |                                                   |
| 기능 적용              | 05/15 (1일)               | 폼 저장 · 파일 다운로드 · 뉴스레터 구독          |
| 오픈 및 교육           | 05/18 (1일)               | 편집 교육 · SEO · GA4 · 추적코드 설치             |

### History Log

| 날짜 | 내용 |
|------|------|
| 26.02.26 | 최초 문의. RFP 수신. 기존 사이트 콘텐츠 유지 방향 확인. DB 이관 범위(Insight·Newsroom·Contact·Newsletter) 확정. |
| 26.03.19 | 마일스톤 전달 완료. |
| 26.04.21 | 착수자료 수신. 브랜드 에셋 Google Drive, 기존 사이트 URL, 사이트맵 변경사항, 콘텐츠 수정사항, 이용약관·개인정보처리방침 전달. |
| 26.04.24 | 고객 진행상황 문의 수신. 가이드라인 유선 안내 예정. 착수자료 회신 문서 작성 중. |
| 26.04.28 | 오전 10시 미팅. 솔루션 메뉴 미확정, 루미넌스 신규 페이지, 릴리스 노트 게시판, 영문 게시판, CTA 개선 논의. |
| 26.05.11 | 와이어프레임(스토리보드) Figma 공유 링크 전달. 메인 2타입. 컨셉 확인 용도. |
| 26.05.12 | Figma 링크 메일 발송 완료. 고객 피드백 작성 중. |
| 26.05.13 | (현재) 고객이 와이어프레임에 Figma 코멘트 작성 중. |

### Key Constraints for Claude

- **인터랙션 최우선**: 클라이언트가 인터랙션을 가장 중요하게 생각함. IX2 + GSAP/AOS로 충분히 구현. Lottie 사용 금지.
- **자체 편집 가능 구조**: 클라이언트가 직접 편집할 예정 → 복잡한 nested symbol 구조 지양. CMS 구조 명확하게.
- **접근 권한 설계**: 특정 페이지 멤버십 제어 필요 → Webflow Memberships plan 이상 필요.
- **다국어 add-on**: 현재는 국문 우선. 영문은 별도 페이지 or Webflow Localization add-on 결정 필요.
- **Webflow plan**: 기능 요구사항 기준 **Business 플랜 이상** ($49/mo+) 필요. Memberships 포함 시 추가 add-on 비용 고객 사전 안내 필요.

---

## 1. Site Settings

| Setting             | Value                                                           |
|---------------------|-----------------------------------------------------------------|
| Site name           | Intellectual Data                                               |
| Default language    | Korean (ko)                                                     |
| Favicon             | `docs/.../2. Logo/PNG/1_Navy/` — square symbol variant         |
| Default meta title  | Intellectual Data                                               |
| Default meta desc   | [TODO: 고객으로부터 페이지별 수신 예정]                         |
| OG image            | `[IntellectualData]KV(3840x2160).png` cropped to 1200×630      |
| Theme color (meta)  | [TODO: brand-navy hex]                                          |

---

## 2. Font Upload (Site Settings → Custom Fonts)

Upload in this order. Use exact font-family names as shown.

### Pretendard — Korean Primary
- Path: `docs/.../3. Font/Korean/Pretendard/OTF/`
- Weights: 400 (Regular) · 500 (Medium) · 600 (SemiBold) · 700 (Bold)
- Font-family name: `Pretendard`

### Inter — English Primary
- Path: `docs/.../3. Font/English/Inter/`
- Weights: 400 · 500 · 600 · 700
- Font-family name: `Inter`

### Noto Serif KR — Korean Serif Display
- Path: `docs/.../3. Font/Korean/Noto Serif KR/`
- Weights: 400 · 600 · 700
- Font-family name: `Noto Serif KR`

### EB Garamond — English Serif Display
- Path: `docs/.../3. Font/English/EB_Garamond/`
- Weights: 400 · 500 · 700 (+ Italic variants)
- Font-family name: `EB Garamond`

> Rule: 4 weights max per family. Do not upload all 9 weights — each is an extra request.

---

## 3. Global Styles (Designer → All Elements / Body)

Apply to Body:
- Font-family: `font-family/sans` variable (KR mode → Pretendard, EN mode → Inter)
- Font-size: `body/3/font-size` (16px)
- Line-height: `body/3/line-height` (24px)
- Color: `color/black` (or `color/gray-dark` if softer text preferred)

Apply to All Elements (`*`) selector:
- Box-sizing: `border-box`
- Margin: `0` · Padding: `0`

---

## 4. Variable System Status ✅ Done 2026-05-15

Variables already created — see [webflow.md §"Variable Index — Confirmed & Live"](webflow.md) for the canonical 88-variable index across 5 collections (COLORS / CONTAINER / GAP / TYPO / VARIABLES).

| Collection | Count | Modes | Naming examples |
|---|---|---|---|
| COLORS | 10 | default | `color/navy`, `color/gray-dark`, `color/ivory` |
| CONTAINER | 5 | default | `container/2xl` (1664), `container/lg` (1024) |
| GAP | 9 | default | `gap/xs` (8), `gap/xl` (48), `gap/4xl` (96) |
| TYPO | 60 (15 levels × 4 props) | default | `display/1/font-size`, `body/3/line-height` |
| VARIABLES | 4 | **KR / EN** | `font-family/display`, `input-height` |

Both Figma (file `xPtU89prtaV0S6pDVjyck5`) and Webflow (site `6634a73e3b63bc49b6f08e3d`) are synced 1:1.

Full token definitions → `webflow.md` §1–3.
Tool: `variable_tool`

---

## 5. Custom Code — Head Embed (Site Settings → Custom Code → Head)

```html
<!-- Preload critical fonts (Pretendard Regular + SemiBold) -->
<link rel="preload" href="/fonts/Pretendard-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Pretendard-SemiBold.woff2" as="font" type="font/woff2" crossorigin>

<!-- Theme color -->
<meta name="theme-color" content="[TODO: brand-navy hex]">

<!-- hreflang: 국문/영문 동시 운영 구조 (URL 확정 후 추가) -->
<!-- <link rel="alternate" hreflang="ko" href="https://intellectualdata.com/"> -->
<!-- <link rel="alternate" hreflang="en" href="https://intellectualdata.com/en/"> -->
<!-- <link rel="alternate" hreflang="x-default" href="https://intellectualdata.com/"> -->
```

---

## 6. Custom Code — Footer Embed (Site Settings → Custom Code → Footer)

```html
<!-- Library load order: AOS → GSAP → page-specific init -->
<!-- THREE.js: load per-page only (Page Settings), NOT here globally -->
<!-- Full configuration → custom.md -->

<!-- GA4 / GTM: 고객으로부터 태그 수신 후 삽입 -->
<!-- GTM: <script>(function(w,d,s,l,i){...})</script> -->

<!-- 카카오 픽셀 / 페이스북 픽셀: 고객으로부터 코드 수신 후 삽입 -->
```

---

## 7. Page Creation Order

Current pages (per milestone — 22 pages total):

| Priority | Page         | Slug          | Notes                                  |
|----------|--------------|---------------|----------------------------------------|
| 1        | Home         | `/`           | webflow.md §4 — 시안 완료 후 제작      |
| 2~       | Sub pages    | TBD           | 사이트맵 고객 확정 후 추가             |
| -        | 루미넌스     | TBD           | 솔루션 하위 신규 — 고객 자료 대기 중   |
| -        | 릴리스 노트  | TBD           | CMS Collection 기반 게시판             |

---

## 8. Pre-Publish Checklist

- [ ] All [TODO] color variables filled
- [ ] Fonts uploaded and rendering correctly in Designer
- [ ] Favicon set
- [ ] OG image set (1200×630)
- [ ] hreflang tags set (국문/영문 URL 확정 후)
- [ ] Head / Footer custom code verified
- [ ] GA4 + GTM + 카카오/페이스북 픽셀 삽입 완료 (고객 코드 수신 후)
- [ ] Home page structure complete
- [ ] PageSpeed > 85 desktop / > 70 mobile
- [ ] 고객 편집 교육 매뉴얼 준비 완료
