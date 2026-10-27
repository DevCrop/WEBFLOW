# 기술·폼·쿠키·태그 참고

이 파일은 2026-10-27 문서 및 공개 배포 코드 대조 기록을 정리한다. 실제 수정 전에는 현재 Webflow를 다시 읽는다.

## 리포트

- 기사: `/[en/]newsroom/2026-korean-companies-ediscovery-survey-report`
- 대체 페이지: `/[en/]ediscovery-survey-2026`
- 컴포넌트: Report request modal / `68927533-09d5-5199-6b7b-df97043ad52e`
- Newsroom Template: `6a50840a1b7df41d1cf52e7e`
- 폼 Name: `2026 eDiscovery Survey Report Request`
- 폼 DOM ID: `wf-form-2026-eDiscovery-Survey-Report-Request`
- 수신처: `info@intellectualdata.com`
- 접수 언어: KO/EN. URL은 origin+pathname, query/hash 제외.
- 파일명: `Intellectual_Data_2026_eDiscovery_Survey_Report_Korean_Companies_KR.pdf` / `_EN.pdf`.

| 코드 ID | 위치 | 기능 |
|---|---|---|
| report-newsroom-modal | Newsroom Template의 모달 바깥 Embed | 정확한 기사·본문 링크만 native dialog로 열기. 실패 시 원래 링크 이동 |
| report-modal-pdf-download | Report request modal 내부 Embed | 실제 Webflow 성공 신호 후 PDF fetch/Blob 저장, 로딩·재시도 |
| id-report-form-metadata | Site settings → Custom Code → Footer | 리포트 폼에 언어·URL hidden fields |
| report-modal-native-behavior / report-modal-native-scroll | 모달 내부 Embed | 중앙·backdrop·배경 스크롤 잠금·닫기·복원 |

정상 제출=클릭이 아니다. 브라우저 필수값 통과→Webflow 성공 처리 후에만 다운로드한다. 다운로드 요청과 실제 로컬 파일 저장 완료도 구분한다. 새 리포트의 slug·대체 링크·폼 이름·PDF·이벤트는 함께 맞춰야 한다.

## 현재 광고·분석 연결

| 플랫폼 | 설정 ID | 동의 |
|---|---|---|
| GTM | GTM-52VQ4ZL5 | 사이트 동의 bridge |
| GA4 | G-D0DYTC3BMS | 분석 |
| Google Ads | AW-443791280 | 광고 |
| Meta Pixel | 299152338334930 | 광고 |
| LinkedIn Partner | 5680204 | 광고 |
| Naver 공통키 | s_35d2ba51e3c9 | 광고 |

| 행동 / GA 이름 | Meta | Naver | LinkedIn |
|---|---|---|---|
| contactus_form_submit | 동일 custom event | lead | 29594012 |
| contactus_page_view | 동일 custom event | view_content | 기본 방문, 별도 전환 없음 |
| newsletter_form_submit | 동일 custom event | subscribe | 29594020 |

설치 태그 7개: GA Google tag 1 + GA Event 3 + Ads Google tag 1 + Meta/LinkedIn 통합 1 + Naver 1. Google Ads 기본 태그 설치와 전환 액션 등록은 다르다. 고객이 GA 주요 이벤트 지정 및 Google Ads 전환 등록을 수행하기로 한 범위를 유지한다.

리포트 모달 열기/성공 접수/PDF 다운로드 전용 이벤트는 위 3개에 포함되지 않는다. 추가 이벤트는 현재 적용됐다고 문서에 쓰지 않는다.

## 새 이벤트를 추가할 때의 최소 설계

1. 고객과 이벤트 이름·실제 발생 조건·대상 언어·매체·중복 방지 기준을 먼저 정한다.
2. 버튼 클릭, 폼 정상 접수, 파일 다운로드 요청을 서로 다른 행동으로 정의한다.
3. 필요한 경우 사이트 성공 신호에서 개인정보 없이 dataLayer custom event를 push한다. 이름·이메일·전화·문의 본문을 GA/광고 parameter로 보내지 않는다.
4. GTM Custom Event trigger와 GA4 Event tag를 만들고 분석 동의 조건을 연결한다. 광고 매체는 별도 광고 동의·플랫폼 이벤트/전환 ID를 확인한다.
5. 미리보기에서 미선택/거절·분석만·광고만·모두 허용을 검수한다. 동일 행동 1회·실패 제출 0회인지 확인한다.
6. 게시 승인을 별도로 받고 GTM 버전을 게시한다. 고객 계정에서 수신·주요 이벤트·전환 등록을 확인한다.

이는 확장 절차이며 리포트 전용 태그를 이미 생성·게시했다는 뜻이 아니다.

## 쿠키

- 미선택/필수만: 분석·광고 모두 거절 상태가 기본.
- 분석 허용: GA와 해당 분석 이벤트 조건.
- 광고 허용: 각 광고 태그 조건. 분석 동의와 별개.
- 동의 쿠키 `id_cookie_consent`: 365일.
- localStorage `id_cookie_consent_v1`: 자동 만료 없음. 쿠키 만료와 동의 기록 전체 만료를 같다고 설명하지 않는다.
- 기기·브라우저·프로필별 저장. 자동 기기 간 동기화 아님.
- 철회 후 새 수집 제어. 기존 전송 데이터는 회수하지 않음. 광고 철회 시 기존 코드의 새로고침 처리를 확인.
- 동의 저장 항목과 Webflow/공급자의 전체 필수 저장소 목록은 다름.

## 기타 기능 기록

- 글 본문 폭 880px, 모바일 장문 18px / 28.98px 검수 기록.
- Search fulltext v2: CMS+일반 콘텐츠. native search index 기반, 최대 60건, 언어별 필터, 5분 session cache. PDF/이미지 OCR 아님.
- /search 및 /en/search utility는 검색 의존성. 기본 흰 화면이 보인다고 삭제하지 않는다.
- 자동 sitemap 유지. search utility·미운영 EN·비공개·내부·테스트 페이지 제외.
- 대응 구주소는 콘텐츠 301 우선. 알 수 없는 주소는 기존 404+브라우저 홈 이동. 이를 전부 서버 301이라고 설명하지 않는다.
