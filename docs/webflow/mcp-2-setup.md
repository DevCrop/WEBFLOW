# Webflow MCP 2.0.1 Setup

verified_on: `2026-08-23`

이 문서는 현재 저장소 계약을 컴퓨터와 브라우저에서 재현하기 위한 최소 설정입니다. Webflow MCP 서버는 원격 OAuth 방식이며 로컬 Webflow API key를 저장할 필요가 없습니다.

## 1. Prerequisites

- MCP 서버 또는 Webflow 앱을 지원하는 최신 AI client
- 접근 가능한 Webflow 계정과 사이트
- MCP 서버와 MCP Bridge App을 승인할 수 있는 해당 사이트의 owner 또는 admin 권한
- 저장소의 `AGENTS.md`와 프로젝트 skill을 읽을 수 있는 로컬 checkout

하나의 OAuth 승인은 하나의 Webflow Workspace에 연결됩니다. Workspace를 바꾸려면 client에서 Webflow 연결을 제거한 뒤 다시 인증합니다.

## 2. Connect Webflow

### ChatGPT app

1. ChatGPT의 Webflow app listing에서 **Connect**를 선택합니다.
2. **Sign in with Webflow**로 로그인합니다.
3. 접근할 사이트 또는 Workspace를 선택하고 **Authorize App**을 실행합니다.
4. 대화에서 `@Webflow`를 명시해 첫 읽기 요청을 실행합니다.

ChatGPT는 기본적으로 Webflow 변경 action을 실행하기 전에 승인을 요청하며, 연결은 ChatGPT **Settings → Connected apps**에서 관리합니다.

### Generic MCP client

Client가 직접 MCP endpoint를 받는 경우 다음 현재 endpoint를 사용하고 OAuth를 완료합니다.

```text
https://mcp.webflow.com/mcp
```

구형 `/sse` endpoint, 로컬 API key 기반 우회 설정, 과거 MCP v1 tool 이름을 새 설정에 사용하지 않습니다. 연결이 client에 표시되지 않으면 client를 완전히 종료 후 재시작하고 최신 버전인지 확인합니다.

## 3. Headless work and Designer work

| 작업 | Designer / Bridge 필요 여부 |
| --- | --- |
| 페이지·요소·컴포넌트·스타일·변수·CMS·에셋 데이터 읽기/쓰기 | 필요 없음. `data_*` 도구 사용 |
| URL에서 이미지를 직접 upload | 필요. `asset_tool.upload_image_by_url` 사용 |
| 현재 선택·페이지·mode·branch 읽기/변경 | 필요 |
| Designer canvas 탐색·breakpoint 읽기 | 필요 |
| element snapshot 캡처 | 필요 |

MCP 2.0부터 대부분의 편집은 Data API 기반 headless 도구로 동작합니다. 단순 스타일·변수 작업을 위해 Designer 연결을 기다리지 않습니다.

## 4. Webflow Designer Bridge

live Designer 기능이 필요한 경우:

1. 대상 사이트를 Webflow Designer에서 엽니다.
2. `E` 키로 Apps panel을 엽니다.
3. **Webflow MCP Bridge App**을 실행합니다.
4. MCP server 연결 완료를 기다립니다.
5. canvas 변경은 도구가 요구하는 mode, 일반적으로 Build mode인지 확인합니다.

Bridge App은 OAuth 승인 중 사이트에 자동 설치되며 public App Marketplace에서 별도로 설치하지 않습니다. 연결 뒤 최소화할 수 있지만 live Designer 기능을 쓰는 동안에는 App을 열린 상태로 유지합니다.

## 5. Browser stability

Chrome 권장 설정:

1. `chrome://settings/performance`를 엽니다.
2. **Always keep these sites active**로 이동합니다.
3. `webflow.com`을 추가합니다.
4. Designer tab을 고정하고 작업 중 닫지 않습니다.

Firefox에서는 `about:config`의 `browser.tabs.unloadOnLowMemory`를 `false`로 설정하거나 Designer tab을 고정할 수 있습니다. Safari는 같은 내장 예외 설정이 없으므로 Designer tab을 활성·고정하거나 Chrome/Firefox를 사용합니다.

## 6. Repository startup

새 작업 세션은 다음 순서로 시작합니다.

1. [`../../AGENTS.md`](../../AGENTS.md)를 읽습니다.
2. [프로젝트 skill](../../.agents/skills/webflow-design-system/SKILL.md)을 읽습니다.
3. [class contract](../../.agents/skills/webflow-design-system/references/class-contract.md)과 필요한 경우 [migration workflow](../../.agents/skills/webflow-design-system/references/migration-workflow.md)을 읽습니다.
4. `webflow_guide_tool`을 먼저 호출합니다.
5. 사이트 Agent Instructions의 `rules/design-system.md`와 로컬 `contract_version`을 비교합니다.
6. `data_variable_tool`과 `data_style_tool`로 현재 변수·스타일을 headless 조회합니다.
7. canvas 문맥이나 snapshot이 필요할 때만 Designer Bridge를 연결합니다.

프로젝트 skill은 Webflow MCP `2.0.1` tool layout을 기준으로 합니다. `style_tool`, `variable_tool`, `element_tool`, `de_page_tool`, `de_component_tool` 같은 구형 이름을 활성 지침에 추가하지 않습니다.

## 7. Connection verification

다음 순서로 최소 검증합니다.

- 연결된 site와 Workspace를 읽는다.
- variable collections와 variables를 읽는다.
- `data_style_tool.get_styles`로 대상 selector를 읽는다.
- Bridge 연결 후에만 현재 page/mode 또는 snapshot을 읽는다.
- 쓰기 전 정확한 site/style/variable ID와 변경 범위를 보고한다.
- 쓰기 후 같은 ID를 다시 읽어 binding과 resolved value를 확인한다.
- 별도 승인 없이 class/variable/component를 삭제하거나 site를 publish하지 않는다.

## 8. Troubleshooting

- **MCP server가 보이지 않음:** client 완전 재시작 → client update → endpoint/config 확인 → OAuth 재인증 순서로 확인합니다.
- **사이트가 비활성화됨:** site owner/admin 권한으로 승인했는지 확인합니다.
- **Designer 연결 실패:** Designer에서 `E` → Bridge App 실행 → 연결 완료 → 요구 mode 확인 순서로 확인합니다.
- **Designer timeout:** browser tab sleep 예외와 tab 고정을 확인합니다.
- **ModeForbidden:** 도구 설명의 허용 mode로 Designer를 전환하고 재시도합니다.
- **과거 tool call 실패:** 공식 [Skill Migration](https://developers.webflow.com/mcp/skills/skill-migration) 표에서 현재 v2.0.1 도구로 변환합니다.

## Official sources

- [Getting started](https://developers.webflow.com/mcp/reference/getting-started)
- [ChatGPT installation](https://developers.webflow.com/mcp/installing/chatgpt)
- [How Webflow MCP works](https://developers.webflow.com/mcp/reference/how-it-works)
- [FAQs and troubleshooting](https://developers.webflow.com/mcp/faqs)
- [MCP overview and limitations](https://developers.webflow.com/mcp/reference/overview)
- [Data tools](https://developers.webflow.com/mcp/tools/data-tools)
- [Designer Session tools](https://developers.webflow.com/mcp/tools/designer-tools)
- [Skill Migration: v1.3 → v2.0 → v2.0.1](https://developers.webflow.com/mcp/skills/skill-migration)
