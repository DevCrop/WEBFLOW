# Intellectual Data Webflow MCP 2.0.1

Intellectual Data Webflow 사이트의 디자인 시스템을 Webflow MCP로 감사·마이그레이션하기 위한 운영 저장소입니다. Webflow 사이트 소스 export 저장소가 아니라, 에이전트 규칙·계약·관측 기록을 관리하는 문서 허브입니다.

## Start here

1. [`AGENTS.md`](AGENTS.md)에서 작업 권한과 금지 조건을 확인합니다.
2. [`docs/webflow/mcp-2-setup.md`](docs/webflow/mcp-2-setup.md)에 따라 Webflow 연결과 브라우저를 준비합니다.
3. [프로젝트 Webflow skill](.agents/skills/webflow-design-system/SKILL.md)을 읽습니다.
4. [클래스·변수 계약](.agents/skills/webflow-design-system/references/class-contract.md)과 [마이그레이션 절차](.agents/skills/webflow-design-system/references/migration-workflow.md)를 적용합니다.
5. 사이트의 `rules/design-system.md`와 로컬 `contract_version`을 맞춘 뒤 쓰기를 시작합니다.

## Canonical documents

| 문서 | 역할 |
| --- | --- |
| [`AGENTS.md`](AGENTS.md) | 저장소 전체 실행 규칙과 안전 게이트 |
| [`docs/README.md`](docs/README.md) | 전체 문서 색인과 우선순위 |
| [`docs/webflow/mcp-2-setup.md`](docs/webflow/mcp-2-setup.md) | 컴퓨터·브라우저·OAuth·Bridge 설정 |
| [Webflow design-system skill](.agents/skills/webflow-design-system/SKILL.md) | 작업 트리거와 실행 순서 |
| [Class contract](.agents/skills/webflow-design-system/references/class-contract.md) | 타이포·컬러·변수·선택자 단일 계약 |
| [Migration workflow](.agents/skills/webflow-design-system/references/migration-workflow.md) | 감사·변환·검증·삭제 절차 |
| [`docs/webflow/audit-baseline.md`](docs/webflow/audit-baseline.md) | 현재 사이트 관측 근거 |
| [`docs/webflow/migration-register.md`](docs/webflow/migration-register.md) | 대상별 마이그레이션 상태와 검증 근거 |
| [`llms.txt`](llms.txt) | AI 문서 탐색용 짧은 색인 |

현재 계약 버전은 `2026-08-23.7`, 프로젝트 skill의 기준 Webflow MCP 버전은 `2.0.1`입니다. 사이트 삭제와 publish는 각각 별도 승인 전까지 금지됩니다.

## Official sources

- [Webflow MCP overview](https://developers.webflow.com/mcp/reference/overview)
- [Webflow MCP getting started](https://developers.webflow.com/mcp/reference/getting-started)
- [Webflow MCP 2.0/2.0.1 skill migration](https://developers.webflow.com/mcp/skills/skill-migration)
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Codex skills](https://developers.openai.com/codex/skills)
