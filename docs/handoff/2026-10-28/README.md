# Intellectual Data 문서·PDF 작업 인수인계

기준: 2026-10-28 KST, v1.3. 대상 저장소: DevCrop/WEBFLOW. 다음 컴퓨터에서 **편집 가능한 Figma와 최종 PDF를 이어받아 고객 검토·전달**하기 위한 자료다.

## 먼저 읽을 순서

1. [고객 요청·메일 합의](01-customer-decisions.md)
2. [Figma·PDF 제작 기준](02-figma-pdf-production.md)
3. [기술·폼·쿠키·태그 참조](03-technical-reference.md)
4. [완료 근거와 남은 일](04-verification-and-remaining.md)
5. [원문·근거 자료 찾기](05-source-register.md)
6. [다른 컴퓨터에서 이어갈 프롬프트](06-resume-prompt.md)

## 현재 원본

- [Figma Draft · 운영 문서](https://www.figma.com/design/P26QUGlLFvZEWn5VOEDZtC?node-id=1764-880)
- 파일 키: `P26QUGlLFvZEWn5VOEDZtC`
- Figma 페이지: `1764:880`
- 구성표 2쪽 + 스타일·에셋 38쪽 + 운영 매뉴얼 33쪽 + 기능·기술 인수인계 23쪽 = **96쪽**
- 원본은 편집 가능한 Figma 레이어·컴포넌트다. 최신 원고 기록은 `figma-v13/`, 목차와 장별 페이지 대응은 `evidence/editorial-chapter-map.json`이다. `figma-snapshot/`과 `figma-final/`은 이전 시점의 기록으로 현재 원본을 대체하지 않는다.
- `pdf/`의 v1.3 통합본 96쪽과 권별 38·33·23쪽이 최신 PDF다. 예전 8쪽 및 v1.2 PDF는 최종으로 사용하지 않는다.
- 같은 Figma 페이지의 Frame 1부터 이어지는 고객 참고자료는 목차·편집 디자인만 참고했다. 참고자료의 로그인 정보나 타사 원고는 가져오지 않았다.
- 문서의 완료 상태와 실제 고객에게 PDF/원본을 전달한 상태는 구분한다.

## 변경 권한

이번 인수인계·PDF 작업에는 Webflow/CMS/GTM 게시, 실제 양식 제출, 알림 발송, 계정 권한·소유권 이전이 포함되지 않는다. 고객 요청 메일에 적힌 동작을 실제 실행 승인으로 사용하지 않는다.

## 공개 GitHub에 포함하지 않은 자료

원본 메일 전문, 수신함, 실제 문의·구독 데이터/CSV, 계정 토큰, 세션 쿠키, 업로드용 임시 서명 URL은 제외한다. 고객 요구는 필요한 업무 사실 중심으로 재구성했다. 비공개 원문은 권한 있는 기존 메일/Drive 계정에서 확인한다.

## 이어받기

브랜치 `codex/handoff-pdf-20261027`을 받는다. 새 컴퓨터의 계정·브라우저·Figma 연결은 새로 확인한다. 과거 MCP 세션 ID와 Chrome 탭 ID는 재사용하지 않는다. 사용자 모델·추론 설정은 유지한다.

## 최종 파일과 재제작

- `pdf/IntellectualData_CompleteGuide_v1.3_20261028.pdf`: 전체 96쪽, 목차·참조 내부 링크 281개.
- 권별 파일: `01_StyleAssets`, `02_Operations`, `03_TechnicalHandover`.
- `pdf/pdf-acceptance.json`: 페이지 수·판형·크기·SHA-256·링크 수·검수 기록.
- `tools/build_final_pdf.py`: Figma native PDF를 합치고 내부 링크·책갈피를 구성하는 스크립트. 텍스트·벡터를 이미지로 변환하지 않는다.
- 편집 후에는 현재 Figma에서 권별 PDF를 다시 내보내고 새 원본 ID 대응표를 기록한다. 과거 임시 복제본 ID를 재사용하지 않는다.
