# Section Typography

Webflow에 적용할 최종 반응형 타이포그래피 규격입니다. 이 문서는 목표 상태이며, 실제 Designer 반영 완료 여부는 `docs/webflow-implementation-status.md`에서 관리합니다.

## Final Scale

단위는 모두 `px`입니다.

| class | Desktop | Tablet | Mobile L | Mobile P | role |
|---|---:|---:|---:|---:|---|
| `section-main-hero-title` | 188 | 140 | 96 | 64 | 메인 전용 대형 디스플레이 |
| `section-main-statement` | 88 | 64 | 48 | 36 | 메인 전용 메시지 |
| `section-head-title` | 72 | 56 | 44 | 36 | 페이지 대표 제목 |
| `section-lead-title` | 64 | 48 | 40 | 32 | 주요 섹션 제목 |
| `section-normal-title` | 48 | 40 | 32 | 28 | 표준 섹션 제목 |
| `section-content-title` | 40 | 34 | 28 | 24 | 콘텐츠 블록 제목 |
| `section-content-sub-title` | 32 | 30 | 28 | 24 | 콘텐츠 하위 제목 |
| `section-micro-title` | 24 | 22 | 20 | 18 | 카드·소형 제목 |
| `section-lead-body` | 24 | 22 | 20 | 18 | 강조 본문 |
| `section-body` | 21 | 19 | 17 | 16 | 기본 본문 |
| `section-eyebrow` | 18 | 17 | 16 | 15 | 보조 라벨 |

`display` 역할은 `188`과 `88`만 사용하며, 일반 heading의 최댓값은 `72`입니다. 타이포 클래스 자체가 네 breakpoint 값을 포함하므로 별도 반응형 타이포 클래스를 조합하지 않습니다.

## Composition

크기, 색상, 굵기, 글꼴을 분리합니다.

```text
section-head-title text-title bold
section-body text-body regular
section-body text-body-invert regular
```

- 밝은 surface: `text-title`, `text-body`
- 어두운 surface: `text-title-invert`, `text-body-invert`
- 굵기: `regular`, `medium`, `semibold`, `bold`
- 글꼴은 필요할 때만 `fm-ko`, `fm-en` 추가

## Legacy Mapping

| legacy class | final class |
|---|---|
| `section-head-body` | `section-lead-body` |
| `section-normal-body` | `section-lead-body` |
| `section-content-body` | `section-body` |
| `section-content-sub-body` | `section-body` |
| `section-micro-body` | `section-body` |
| 모든 `section-*-eyebrow` | `section-eyebrow` |

기존 title class는 위 Final Scale에 존재하는 이름만 유지합니다. 마이그레이션은 전체 페이지와 Component instance를 조회해 참조 수가 0인지 확인한 뒤 종료하며, 확인 전에는 live publish하지 않습니다.
