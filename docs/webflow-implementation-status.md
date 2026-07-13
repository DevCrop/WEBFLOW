# Webflow Implementation Status

마지막 문서 정리: 2026-07-14

## Live Context

- site: `intellectualdata`
- site ID: `6a38f39fe95d43bbdbe5c71c`
- 마지막 확인 page: About Us
- page ID: `6a531d3f86942d09a5323036`
- 상태: draft 작업, production publish 미승인

## Target

- 구조: `section.[main-*|sub-*].section-padding > no-container 계열 > *-xxx__inner > sub-section-txt + section-contents`
- 고유 layout: root prefix BEM
- 최종 타이포: `../section-typography.md`의 11개 `section-*` class
- display 역할: `188`, `88`만 사용
- 일반 heading 최댓값: `72`
- 기본 본문: desktop `21`, mobile portrait `16`

## Measured Legacy State

이전 Designer 측정에서 `section-*` selector가 123개였고 같은 이름의 combo selector와 중복 body/eyebrow 체계가 확인됐습니다. 따라서 문서 정리는 완료됐지만 실제 Webflow 마이그레이션은 아직 완료로 간주하지 않습니다.

## Remaining Migration

1. 전체 page와 Component에서 `section-*` 사용 요소를 다시 수집합니다.
2. 같은 이름의 combo selector를 global selector와 구분해 정규화합니다.
3. `section-typography.md`의 Legacy Mapping에 따라 body와 eyebrow를 통합합니다.
4. title class를 최종 scale에 맞추고 네 breakpoint 값을 적용합니다.
5. 텍스트의 구조 class, 중복 색상 class, 텍스트 태그의 `bg-*` 오염을 제거합니다.
6. 전체 page, Component instance, `/components` 카탈로그를 다시 조회해 레거시 참조가 0인지 확인합니다.
7. desktop, tablet, mobile landscape, mobile portrait에서 시각 검증합니다.

## Completion Gate

- 최종 11개 타이포 class의 breakpoint 값 확인
- 레거시 body/eyebrow 및 미승인 title 참조 0
- 같은 이름 combo selector 0 또는 명시된 예외만 존재
- `container`/`*__container` 섹션 사용 0; Header 예외만 존재
- 구조·Component 변경 문서 동기화 완료
- 사용자 publish 승인 확보

위 조건을 만족하기 전에는 production publish하지 않습니다.
