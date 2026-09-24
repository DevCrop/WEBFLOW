# Runtime 검증 스크립트

이 폴더의 루트 스크립트는 Webflow 저장 후보를 공개 DOM에 임시 적용하거나 공개 상태를 읽어 반응형 결과를 검증한다. 스크립트 실행은 Webflow를 publish하지 않는다.

주요 스크립트:

- `audit-ko-responsive-br-request.mjs`: KO 반응형 BR 요청 검증
- `audit-en-banners-390.mjs`: EN 배너 390px 검사
- `audit-subvisual-desc-390.mjs`: KO·EN sub-visual 설명 검사
- `audit-en-garamond-desktop.mjs`: EB Garamond desktop 제목 검사
- `inspect-about-en-type.mjs`: About Us sub-visual/banner 1440·390 비교
- `inspect-stat-band.mjs`: stats-band KO·EN 크기와 넘침 검사
- `check-button-fonts.cjs`, `check-typography-migration.cjs`: 타이포 회귀 검사
- `check-site-fixes.cjs`, `audit-site-links.cjs`: 주요 수정과 링크 검사

일부 브라우저 검사는 로컬 Edge CDP 포트 `9333`을 사용한다. 스크립트의 저장 후보 값은 날짜가 지난 뒤 현재 Webflow 저장값과 다를 수 있으므로 실행 전 [현재 상태 문서](../docs/current-webflow-state-2026-09-25.md)와 대조한다.

캡처, 브라우저 프로필, 생성 CSS, 영상 검토 도구는 `.gitignore` 대상이다.
