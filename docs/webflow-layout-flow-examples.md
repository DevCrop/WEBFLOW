# Webflow Layout Flow Examples

Webflow 섹션을 새로 만들거나 재구성하기 전에 이 문서를 확인합니다. 모든 예시는 `section-padding`, `no-container` 계열, `sub-section-txt`, `section-contents`를 공통 축으로 사용합니다.

## Standard Section

```text
section.sub-feature.section-padding
  no-container
    sub-feature__inner
      sub-section-txt
        section-eyebrow
        section-normal-title
        section-body
      section-contents
        sub-feature__grid
          sub-feature__card
```

제목과 본문에는 구조 class를 붙이지 않고 타이포·색상·굵기 class만 적용합니다.

## Wide Media Section

```text
section.sub-gallery.section-padding
  no-container-xl
    sub-gallery__inner
      sub-section-txt
      section-contents
        sub-gallery__media
```

콘텐츠 폭이 넓어야 할 때만 `no-container-xl`을 선택합니다. 별도 `*__container`를 만들지 않습니다.

## Split or Sticky Section

```text
section.sub-process.section-padding
  no-container
    sub-process__inner
      sub-section-txt
      section-contents
        sub-process__sticky
        sub-process__steps
```

sticky, grid, media 같은 고유 layout wrapper는 root prefix BEM으로 소유합니다. `left`/`right`처럼 위치에 묶인 이름은 사용하지 않습니다.

## Shared CTA

```text
section.sub-cta.section-padding
  no-container
    sub-cta__inner
      sub-cta__bg
      sub-cta__body
      sub-cta__actions
```

CTA는 페이지별 root를 만들지 않습니다. 메인 페이지는 `main-cta`, 서브 페이지는 `sub-cta`를 재사용합니다.

## Checklist

- root가 `main-*` 또는 `sub-*`이고 페이지 안에서 고유한가
- root 다음에 `section-padding`이 오는가
- 폭 wrapper가 `no-container` 또는 `no-container-xl`인가
- `sub-section-txt`와 `section-contents`의 역할이 분리됐는가
- 고유 wrapper가 root prefix BEM을 따르는가
- 텍스트가 `section-*` 타이포 + `text-*` + weight 조합인가
- Webflow native element로 해결 가능한 구조를 임의 div나 custom code로 만들지 않았는가
