# Webflow Design System

이 문서는 Webflow 구조와 클래스 설계의 목표 상태를 정의합니다. 실제 적용 상태는 `webflow-implementation-status.md`를 기준으로 판단합니다.

## Section Structure

```text
section.[main-*|sub-*].section-padding
  no-container | no-container-xl
    [main/sub]-xxx__inner
      sub-section-txt
      section-contents
```

- 메인 페이지 고유 root는 `main-*`, 서브 페이지 고유 root는 `sub-*`로 시작합니다.
- root 식별 class를 먼저, `section-padding`을 뒤에 둡니다.
- 섹션 폭 wrapper는 `no-container` 또는 `no-container-xl`만 사용합니다.
- Header만 `header__container`를 사용할 수 있습니다.
- `sub-section-txt`와 `section-contents`는 기본적으로 같은 inner의 형제입니다.

## BEM

공통 구조 class는 재사용하고, 섹션 고유 wrapper만 root prefix와 일치하는 짧은 BEM을 사용합니다.

```text
sub-legal-problems
sub-legal-problems__inner
sub-legal-problems__grid
sub-legal-problems__card
```

- root class는 고유해야 합니다. 공유 root 예외는 `sub-visual`, `sub-intro`, `main-cta`, `sub-cta`입니다.
- `left`, `right`, `cnt`, `txt`, `item`, `list`, `Div Block*`처럼 역할이 불명확한 새 class를 만들지 않습니다.
- 텍스트 전용 `*-title`, `*-desc` BEM class를 만들지 않습니다. 텍스트에는 타이포, 색상, 굵기 utility를 조합합니다.
- 섹션별 card wrapper에는 `bg-*`, `surface-*`, `border-*`, `radius-*` utility를 누적하지 않고 단일 소유 class에서 관리합니다.

## Typography

최종 class와 breakpoint 값은 `../section-typography.md`가 유일한 원본입니다.

```text
section-head-title text-title bold
section-body text-body regular
```

- 크기는 `section-*`, 색은 `text-*`, 굵기는 weight class로 분리합니다.
- dark surface에서는 invert 색상 class만 남기고 일반 색상 class와 함께 쓰지 않습니다.
- `bg-*`는 section 또는 명시적 surface wrapper에만 사용합니다.
- 반응형 크기는 각 타이포 class 자체에 포함하며 별도 breakpoint 타이포 class를 만들지 않습니다.

## Native Elements and Components

Slider, Dropdown, Navbar, Tabs, Form, CMS List와 Component/variant/property는 Webflow native 기능을 우선합니다. native 기능으로 충족할 수 없을 때만 custom code를 쓰고 element ID와 이유를 상태 문서에 기록합니다.

- 공유 Component: `header`, `footer`, `breadcrumb`, `sub-visual`, `button`, `card`, `banner`
- CTA root: 메인은 `main-cta`, 서브는 `sub-cta`
- 페이지별 CTA 차이는 텍스트, 링크, 이미지 등 content/property로 처리합니다.
- Component 구조나 variant를 바꾸면 draft-only `/components` 카탈로그도 같은 작업에서 갱신합니다.

## Migration

- 레거시 class는 재사용하지 않고 최종 class로 흡수합니다.
- 전체 page, Component, CMS 렌더 결과를 점검해 레거시 참조가 0인지 확인합니다.
- 같은 이름의 combo selector가 있으면 먼저 global utility layer로 정규화합니다.
- 변경 후 desktop, tablet, mobile landscape, mobile portrait를 검증합니다.
- 문서 동기화와 사용자 승인 전에는 publish하지 않습니다.
