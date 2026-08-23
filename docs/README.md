# Documentation Index

이 색인은 현재 Webflow MCP 2.0.1 운영 문서의 탐색 순서와 책임 범위를 정의합니다.

## Authority order

1. 연결된 Webflow 사이트의 현재 데이터와 Agent Instructions
2. 루트 [`AGENTS.md`](../AGENTS.md)의 안전·실행 게이트
3. [Webflow design-system skill](../.agents/skills/webflow-design-system/SKILL.md)
4. [클래스·변수 계약](../.agents/skills/webflow-design-system/references/class-contract.md)
5. [마이그레이션 절차](../.agents/skills/webflow-design-system/references/migration-workflow.md)
6. [감사 기준선](webflow/audit-baseline.md)과 [마이그레이션 등록부](webflow/migration-register.md)의 관측 근거

규칙과 현재 관측이 충돌하면 규칙을 임의로 완화하지 않습니다. 현재 사이트를 다시 조회하고 계약 버전 또는 관측 문서를 같은 작업에서 동기화합니다.

## Active Webflow documents

| 문서 | 언제 읽는가 | 갱신 조건 |
| --- | --- | --- |
| [`webflow/mcp-2-setup.md`](webflow/mcp-2-setup.md) | 최초 연결, 인증, Bridge 오류, 타임아웃 | 공식 연결 방식이나 요구 조건 변경 시 |
| [Design-system skill](../.agents/skills/webflow-design-system/SKILL.md) | 타이포·컬러·간격·컴포넌트 작업 시작 전 | Webflow MCP 도구명·작업 순서 변경 시 |
| [Class contract](../.agents/skills/webflow-design-system/references/class-contract.md) | 선택자·변수·반응형 값 결정 전 | 승인된 디자인 시스템 규칙 변경 시 |
| [Migration workflow](../.agents/skills/webflow-design-system/references/migration-workflow.md) | 감사·재바인딩·삭제 작업 전 | 검증·승인 절차 변경 시 |
| [`webflow/audit-baseline.md`](webflow/audit-baseline.md) | 현재 사이트 상태 판단 시 | 재조회로 현재 사실이 바뀐 경우 |
| [`webflow/migration-register.md`](webflow/migration-register.md) | 대상별 진행 상태 판단 시 | 각 배치 관측·변환·검증 직후 |

## Supporting product documents

`docusign.md`, `legal-system.md`, `litera.md`, `luminance.md`, `nymi band.md`는 제품·콘텐츠 참고 자료입니다. 디자인 시스템 규칙이나 MCP 실행 계약을 재정의하지 않습니다.

## Indexing rules

- 저장소 진입점은 루트 [`README.md`](../README.md)입니다.
- AI용 짧은 진입점은 루트 [`llms.txt`](../llms.txt)입니다.
- Webflow 공식 문서는 `https://developers.webflow.com/llms.txt`와 각 문서의 `.md` 표현을 우선 사용할 수 있습니다.
- 영구 규칙에는 Webflow·OpenAI 공식 문서만 근거로 사용합니다. 현재 사실은 사이트 재조회 결과와 ID를 함께 기록합니다.
- 구형 MCP 도구명, `/sse` endpoint, Claude 전용 브리지 문서, vendored skill 사본은 활성 문서로 복원하지 않습니다.
