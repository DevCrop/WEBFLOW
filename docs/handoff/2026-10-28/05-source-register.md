# 원문과 근거 자료 등록부

## 우선순위

현재 서비스 저장값·운영 화면 → 가장 최근 사용자의 명시적 수정 지시 → 고객 최종 원고/메일 → 오래된 QA 기록. 같은 문서에서 '미게시' 이력과 '최종 게시 후 검수'가 함께 있으면 최신 절을 우선한다.

## 고객 원문

원본 메일 전문과 비공개 Google 문서 링크는 공개 저장소에 복제하지 않는다. 권한 있는 메일/Drive 계정에서 아래 제목·업무 문맥으로 조회한다.

| 별칭 | 찾을 원문 | 확인 포인트 |
|---|---|---|
| MAIL-PROJECT | 사이트 진행 현황 & 업데이트 내용 | 가이드·CMS·내부 코드 문서화, 운영/백업 프로젝트 구분 |
| MAIL-MARKETING | 광고태그 추가 정리 / 홈페이지 전환 이벤트 | GTM 단일 관리, 3개 이벤트, 고객의 GA 주요 이벤트·Ads 전환 등록 |
| MAIL-COOKIE | 쿠키 설정 동작 문의 | 미선택·동의별 실행, 저장·철회·필수 항목 |
| MAIL-REPORT | 자료 다운로드 페이지·최종 PDF·모달 개선 | 최신 국영문 원고·PDF·썸네일·폼·버튼·모달 흐름 |
| MAIL-BOARDS | Newsroom·Insights 게시판 일괄 점검 | 11개 요청 및 알림 언어·URL 추가 |
| SHEET-REQ | 개발요건정의서 / 전체 프로젝트 완료 및 남은 작업 | 개발사 확인란, 요건7-1~7-6 |
| DOC-REPORT | 2026 eDiscovery 리포트 뉴스룸 원고 | 최신 KR '건수', EN 'volume and type' 등 최종 수정 |
| DOC-PRESS | 국영문 보도자료 게시 요청 | 신규 보도자료와 리포트 소개글 구분 |
| DRIVE-ASSETS | 고객 최종 PDF·PNG 폴더 | PDF 다운로드용 / PNG 썸네일용, 최종 파일 일시 확인 |

원문 첨부 텍스트 4묶음은 작성 PC에서 대조했다. 과거 파일 경로와 계정 세션은 다른 컴퓨터에서 자동 복구되지 않는다. 원문이 꼭 필요한 판단은 승인된 계정으로 다시 조회한다.

## 이 저장소 패키지

- figma-v13/: 현재96쪽의 원고·페이지 ID·판형. figma-snapshot/과 figma-final/은 이전 판본이다. 어느 쪽도 편집 가능한 Figma 원본의 대체가 아니다.
- evidence/: 문서 QA 및 선별한 공개 화면.
- reference-code/: 리포트 관련 파일형 코드·시험 참조. 자동 배포 대상 아님.
- pdf/: 검수 통과한 최종 결과만 배치.

## 작성 PC의 관련 기록

다음은 원본 작업 디렉터리 기준 상대 경로다. 전부를 공개 패키지에 복제한 것은 아니다.

- docs/webflow/report-modal-prepublish-2026-10-22.md
- docs/webflow/report-modal-inline-download-2026-10-22.md
- docs/webflow/report-form-metadata-2026-10-23.md
- docs/webflow/report-customer-content-final-qa-2026-10-21.md
- docs/webflow/report-customer-final-copy-2026-10-21.md
- docs/webflow/board-finish-2026-10-26.md
- docs/webflow/search-fulltext-2026-10-26.md
- docs/webflow/redirect-live-verification-2026-10-26.md
- docs/webflow/sitemap-auto-operation-2026-10-27.md
- outputs/operations-manual-captures-2026-10-27/final-document-additions-qa.json
- outputs/operations-manual-captures-2026-10-27/final-live-fact-recheck.json
- outputs/operations-manual-captures-2026-10-27/final-code-values-recheck.json

과거 figma-guide-layout-v02 / guide-capture-update 기록의 8쪽·빈 캡처·미완료 설명을 현재96쪽 문서의 상태로 인용하지 않는다.

## 공식 기준

- [Webflow CMS 저장·게시·Unpublish·Archive](https://help.webflow.com/hc/en-us/articles/33961230697107-Save-and-publish-Collection-items)
- [Webflow Site search](https://help.webflow.com/hc/en-us/articles/33961242348179-Site-search)
- [Webflow Form submissions](https://help.webflow.com/hc/en-us/articles/33961344521235-Form-submissions)
- [Microsoft: Opening CSV UTF-8 files correctly in Excel](https://support.microsoft.com/en-gb/excel/opening-csv-utf-8-files-correctly-in-excel): UTF-8 CSV를 BOM 포함으로 열거나 Excel 데이터 → 텍스트/CSV로 가져오는 방식을 안내한다. Webflow 도움말이 CSV 인코딩을 명시한다고 과장하지 않는다.
