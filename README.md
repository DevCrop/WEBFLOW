# Intellectual Data Webflow Rebuild

Codex와 Claude Code가 동일한 규칙으로 Intellectual Data Webflow 리빌드를 운영하기 위한 저장소입니다. 실제 사이트 변경은 Webflow MCP를 사용하고, production publish는 별도 승인 후 진행합니다.

## Source of Truth

- `AGENTS.md`: 프로젝트 운영 규칙
- `section-typography.md`: 최종 반응형 타이포그래피
- `docs/webflow-design-system.md`: 구조·BEM·컴포넌트 규칙
- `docs/webflow-layout-flow-examples.md`: 섹션 구조 예시
- `docs/webflow-implementation-status.md`: 실제 Webflow 측정 상태와 남은 작업
- `docs/official-workflow.md`: MCP 작업·검증·publish 절차

## Base Structure

```text
section.[main-*|sub-*].section-padding
  no-container | no-container-xl
    [main/sub]-xxx__inner
      sub-section-txt
      section-contents
```

섹션 전용 wrapper는 root prefix를 공유하는 짧은 BEM으로 작성합니다. 섹션에서 `container` 또는 `*__container`를 만들지 않으며 Header만 `header__container`를 사용합니다.

## Working Order

1. `AGENTS.md`와 관련 Source of Truth를 읽습니다.
2. Webflow에서 site, page, element ID와 현재 상태를 측정합니다.
3. 변경 계획과 영향 범위를 보고합니다.
4. 섹션·컴포넌트 단위로 적용하고 breakpoint별로 검증합니다.
5. `docs/webflow-implementation-status.md`를 동기화합니다.
6. 승인 전까지 publish하지 않습니다.

레거시 원문, 임시 프롬프트, 완료된 이관 계획은 저장소의 운영 문서로 유지하지 않습니다.
