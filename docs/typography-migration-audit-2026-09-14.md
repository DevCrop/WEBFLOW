# Typography Migration Audit

점검일: 2026-09-14. 사이트: intellectualdata / 6a38f39fe95d43bbdbe5c71c.

## 결론 및 앞선 답변 정정

banner-title 반응형이 누락되었다는 앞선 판단은 잘못이었다. MCP get_variables의 modeValues: []만으로 누락을 판단할 수 없다. 공개 CSS 및 브라우저 계산값은 64/46/38/34px이다. 이번 점검에서는 사이트를 수정하거나 publish하지 않았다.

실제 문제는 일부 대체 변수명, 중복 선택자, 레거시 combo, 중첩 strong, 문서와 현재 구현의 불일치다. 크기를 줄이는 디자인 판단과 구현 오류를 구분한다.

## 범위 및 제한

- Webflow 저장 상태의 스타일 레코드 2029개 전체, 기본 타이포 속성이 있는 레코드 365개를 조사했다. 레코드 수는 고유 클래스명 수가 아니다.
- 변수 235개, 컴포넌트 54개 메타데이터를 조사했다.
- 공개 공통 CSS에서 타이포/변수 관련 규칙 1081개를 추출했다.
- 관련 선택자 158개를 1440/1274/992/991/767/479/390px에서 임시 DOM으로 측정했다. 임시 DOM은 브라우저 로컬에서만 생성하고 제거했다.
- 실제 DOM은 홈, INDA, Data Analytics, Kiteworks, SessionGuardian, LPO, About Us, Docusign 8페이지를 1274/390px에서 측정했다. 모두 HTTP 200이고 페이지 가로 넘침은 없었다. 측정한 표시 텍스트에서도 수평 넘침은 없었다.
- 전체 페이지의 모든 CMS 항목, 숨겨진 탭/모달, 모든 언어 및 component variant 조합을 시각 검증한 것은 아니다. CSS 단독 probe는 조상, variant, custom code에 의한 실제 인스턴스 결과를 대신하지 않는다.
- native 목록은 기본 속성 inventory다. 전 breakpoint/variant native 재조회는 수행하지 않았다. 반응형 표는 공개 CSS 계산값이며 미게시 변경의 최종 결과를 보증하지 않는다.
- get_variables의 빈 modeValues를 누락 근거로 사용하지 않는다. 조회한 변수 목록에서 찾지 못한 ID도 실제 삭제된 변수로 단정하지 않는다.

## 우선순위별 마이그레이션 대상

### P1: 실제 불일치

1. section-normal-title-1-2 / section-normal-title-1-2-3: 현재 normal은 38/34/28/26px인데 이 두 선택자는 54/44/36/30px이다. --type--section--normal--title--font-size는 검사 문맥에서 정의되지 않았고 정상 변수는 --_typography---type--section--normal--title--font-size다. 대체값 경로를 정식 변수 바인딩으로 교체할 대상이다. 같은 패턴의 micro-title/body -1-2 및 -1-2-3도 크기가 우연히 일치할 뿐 변수 연결 정리가 필요하다.
2. 중첩 strong: INDA intro eyebrow의 INDA FullDiscovery®와 Kiteworks intro eyebrow의 Secure File Transfer Protocol (SFTP)는 부모 medium 500인데 strong이 700이다. uniform eyebrow의 중복 strong만 정리할 대상이다. 본문에서 의미상 강조된 strong은 일괄 제거하지 않는다.
3. intro-title 컴포넌트 설명은 60/50/40/34 및 EN 66/55/44/37을 기록하지만 현재 기본 title은 56/46/38/32, native Garamond 기본 변수는 62다. 설명/검증 기준을 실제 승인값과 일치시켜야 한다.
4. sub-visual-media-* 설명은 부모 제목 72/64/54/44를 언급하지만 현재 sub-visual 기본은 64/50/40/34다. media가 제목을 소유하지 않는다는 원칙은 유지하고 오래된 숫자만 정리할 대상이다.

### P2: 위계 및 유지보수

5. banner-title: 1274px에서 64px, line-height 141% = 90.24px. 섹션 컴포넌트 제목 42px보다 커서 CTA가 시각적으로 과해질 수 있다. 48/40/32/28px은 제안값이며 아직 승인/적용되지 않았다. 배너 높이, 패딩, 문장 길이를 함께 검증해야 한다.
6. 메인 히어로: 실제 홈 제목에 sub-visual-title + section-display + is-display-en + main-hero-title-scale이 함께 붙는다. 164/124/88/42px로 작동하지만 세 크기 역할이 겹친다. 최종 크기 소유자를 하나로 정리하고 언어와 굵기는 별도 축으로 유지한다.
7. section-head-title + section-title__title-text는 56 계층을 42 계층으로 덮어쓰는 의도적 컴포넌트 예외다. 오류로 제거하지 말고 section-title의 역할 토큰이 단독 소유하도록 정리한다. intro-title의 lang-variant + regular + 내부 weight600도 같은 소유권 정리 대상이다.
8. section-ui-label은 전 구간 22px이다. 누락이라 단정하지 않지만 UI/title 18→16px, subtitle 17→15px, body 16→15px와 위계가 역전되어 용도 확인이 필요하다. 버튼의 전역 최소 16px 기준과 일반 보조 UI 14/15px은 별도로 관리한다.
9. section-stat-value는 120/96/72/56px로 반응형이 정상이나 숫자 리터럴로 관리된다. 전용 통계 토큰에 옮길 대상이다. 모든 0, inherit, 단위없는 행간을 무조건 변수화할 필요는 없다.
10. card-title/content-title, card-desc/content-body, num-card의 legacy combo, review의 rc-* 및 본문 역할을 비교해 카드 종류별로 크기를 소유하는 클래스 하나만 남긴다. content→micro는 모든 카드에 일괄 적용하지 않는다.
11. section-title__title / __body / __eyebrow, section-title-body, section-content-sub-title, * Copy 등 이전 토큰 계열을 사용하는 선택자는 사용처를 확인한 뒤 현재 section 역할로 흡수한다.
12. section-padding, u-section-padding 및 중첩 combo는 120px/96px 리터럴과 변수 방식이 혼재한다. section-contents의 padding/gap 및 banner-inner의 var(--space-xl)와 개별 좌우 padding도 함께 정리한다. 레이아웃만의 반응형 필요까지 이번 폰트 점검으로 확정하지 않는다.
13. fm-en/fm-ko 단독 및 section-head-title fm-en, section-micro-title fm-en 조합은 정상이다. 다만 역할 없이 fm-base만 적용하면 현재 body 기본을 상속해 14px이 된다. family 클래스는 크기 클래스가 아니므로 본문 기본 역할을 별도로 지정해야 한다.

### P3: 정리 후보

14. legacy 포함 레코드 39개, Copy 포함 레코드 63개, 동일 selector 중복 그룹 18개. 존재만으로 현재 화면 오류나 미사용을 뜻하지 않는다. 삭제 전 참조/바인딩/variant를 확인한다. 전체 목록은 아래에 기록했다.
15. button과 cta-button이 각각 존재한다. 바로 병합하지 말고 콘텐츠 props와 CTA 동작, size/icon variant 조합을 먼저 맞춘 뒤 하나의 공통 기반으로 통합할 후보이다.
16. 기본 card 컴포넌트 instanceCount는 0이고 실제 카드는 icon-card, num-card 등 여러 레이아웃 컴포넌트에 분산되어 있다. 단순 이름 수를 줄이기 위한 병합보다 공통 내부 타이포 역할 공유가 우선이다.
17. 저장소 규칙은 display-1/heading-*/body-*를 기준으로 하지만 현재 사이트는 section-head/lead/normal/content/micro/ui 계층을 사용한다. official-workflow.md에는 금지된 모호 클래스 예시도 남아 있다. 먼저 현행 위계의 기준 문서를 확정하고 구 문서를 정리해야 재발을 막을 수 있다.

## 핵심 크기표

단위 px. 기본/태블릿/모바일 가로/모바일 세로는 실제 1274/991/767/390px probe 결과다.

| Selector | 1274 | 991 | 767 | 390 |
|---|---:|---:|---:|---:|
| .section-content-body | 19px | 18px | 18px | 18px |
| .section-display | 108px | 64px | 44px | 32px |
| .section-lead-eyebrow | 18px | 17px | 16px | 15px |
| .section-normal-eyebrow | 17px | 16px | 15px | 14px |
| .section-content-eyebrow | 16px | 15px | 14px | 14px |
| .section-lead-body | 21px | 20px | 19px | 18px |
| .section-micro-title | 26px | 24px | 22px | 20px |
| .section-micro-subtitle | 20px | 19px | 18px | 18px |
| .section-micro-eyebrow | 15px | 14px | 14px | 14px |
| .sub-visual-title | 64px | 50px | 40px | 34px |
| .section-content-subtitle | 22px | 21px | 20px | 19px |
| .section-normal-body | 20px | 19px | 18px | 18px |
| .section-head-subtitle | 28px | 25px | 23px | 22px |
| .main-hero-title-scale | 164px | 124px | 88px | 42px |
| .banner-title | 64px | 46px | 38px | 34px |
| .section-head-body | 22px | 20px | 19px | 18px |
| .section-normal-title | 38px | 34px | 28px | 26px |
| .section-content-title | 32px | 29px | 24px | 22px |
| .section-head-title | 56px | 48px | 34px | 30px |
| .section-head-eyebrow | 19px | 18px | 17px | 16px |
| .section-ui-title | 18px | 18px | 17px | 16px |
| .section-normal-subtitle | 24px | 22px | 21px | 20px |
| .section-ui-subtitle | 17px | 16px | 16px | 15px |
| .section-ui-body | 16px | 16px | 15px | 15px |
| .section-ui-eyebrow | 15px | 15px | 14px | 14px |
| .section-micro-body | 17px | 17px | 16px | 16px |
| .section-ui-label | 22px | 22px | 22px | 22px |
| .section-lead-title | 46px | 40px | 30px | 28px |
| .section-stat-value | 120px | 96px | 72px | 56px |
| .section-lead-subtitle | 26px | 24px | 22px | 21px |

## 반응형 크기 고정 후보

관련 선택자 probe에서 26px 이상이면서 4구간 같은 크기인 항목. 실제 사용 여부 및 의도는 별도 확인해야 한다.

- .heading-64: 60px / 60px / 60px / 60px (ID acbebbb1-fa3a-1a73-33d5-4d22e9e6a51d)
- .display-188: 188px / 188px / 188px / 188px (ID 68edfdd1-7a77-b4ab-1953-5627ae57eaea)
- .heading-32: 36px / 36px / 36px / 36px (ID 54bcaebb-7812-a324-47fa-6a1c55f5c4bf)

## 레거시 전체 목록

이름에 legacy/deprecat/delete가 포함된 레코드. 즉시 삭제 목록이 아니라 마이그레이션 후보다.

- .sub-reveal-voice__role.section-content-body--legacy-01 (ID 9424d191-c578-5fdd-d647-950bc192c69f)
- .num-card-num.section-micro-title--legacy-21.section-micro-title--legacy-19 (ID d683424b-e4cd-1a6d-1a07-684e5d7ef50a)
- .div-block-72.z-legacy-section-contents-dv72 (ID d48993ea-19d5-a467-0ff9-c0ff7a24276a)
- .card-desc.section-content-body--legacy-02 (ID e24a76ed-29f1-837f-6274-4baa73a27cbf)
- .heading-89.section-micro-title--legacy-resolver-02 (ID ec5ff289-744e-93e0-0335-f06563715b9a)
- .paragraph-17.section-micro-title--legacy-resolver-03 (ID edfb0215-32e4-acf8-176c-76e7eeaef28f)
- .sub-insights__card-title.section-micro-title--legacy-02 (ID 00d22116-db98-93b9-cbe6-b86ea6cd5090)
- .heading-87.section-micro-title--legacy-resolver-04 (ID 701d2d58-898a-9548-351b-8c42b3014537)
- .sub-careers-voice__role.section-content-body--legacy-07 (ID 18658436-9301-b874-2989-d2b88f17d915)
- .news-summary.section-micro-body--legacy-02 (ID 7308878a-cf9b-a760-f882-9fcfd2bbef03)
- .sub-news-list__meta.text-body-invert.section-micro-body--legacy-03 (ID a16b3eb7-c67f-1262-82d1-1e489e4d7300)
- .heading-86.section-micro-title--legacy-resolver-05 (ID 01c1f9f2-c9cd-1d60-f7ad-94f7b819168b)
- .heading-99.section-micro-title--legacy-resolver-06 (ID 02b7f67e-db1f-ed0d-ca5e-aad65bb1382b)
- .heading-88.section-micro-title--legacy-resolver-07 (ID 78af9071-b4c0-84a9-930c-faa897955951)
- .sub-reveal-awards__context.section-content-body--legacy-09 (ID 3b5e85ae-f574-bb2b-b3cb-8ce74ad8f15c)
- .sub-ediscovery-why__caption.section-content-title--legacy-02 (ID af560d67-33cf-5ad5-5152-6f68f9b59b7f)
- .heading-78.section-content-body--legacy-10 (ID 098ebf39-54eb-4d1e-2bbf-fcef53d0a4db)
- .sub-kdisc-service__list.section-content-body--legacy-11 (ID fea40ace-d856-874f-d17c-5a255fadc3e8)
- .paragraph-7.section-micro-title--legacy-05 (ID 194492d9-93ad-2889-cddb-d20b5936a73d)
- .rc-quote.section-micro-title--legacy-07 (ID be5c85e8-d6d1-ca0a-37f8-479cc8bf2dec)
- .rc-name.section-micro-title--legacy-08 (ID 34d572a0-87b1-45aa-c8d3-922972725d02)
- .num-card-num.section-micro-title--legacy-21 (ID 2b890470-897e-0979-5d08-4b7b709f9999)
- .paragraph-16.section-micro-title--legacy-resolver-08 (ID da48329d-a68a-137b-93d2-129e7a786b95)
- .num-card-title.section-micro-title--legacy-22.section-content-title--legacy-09 (ID 18d1b9e1-55b3-3917-b829-9f383fbed438)
- .sub-careers-voice__name.section-micro-title--legacy-11 (ID 3ebe4452-d0ee-943e-234a-1e10d3b39576)
- .sub-reveal-voice__name.section-micro-title--legacy-resolver-09 (ID 8aca7684-8c22-6f18-196f-91d53149db3f)
- .num-card-title.section-micro-title--legacy-22 (ID 09a5a090-a153-9a63-e923-f8d5e783e78e)
- .section-normal-title.section-normal-title--legacy-07 (ID a00a4096-50b8-3941-2282-a6c3dafa08bb)
- .text-block-7.section-micro-title--legacy-resolver-10 (ID 0ed00247-1819-f9a9-79c8-39392e4b72cf)
- .section-micro-title--legacy-resolver-11 (ID 834e1cc3-df5d-e86e-023b-bf8629501710)
- .sub-ediscovery-why__caption.section-micro-title--legacy-14 (ID e025bc97-8748-face-8f6d-02a55f6c3af0)
- .heading-90.section-micro-title--legacy-resolver-12 (ID 2f1c6c27-c9eb-1e1c-6694-3c13ff564f25)
- .button-inner.section-content-body--legacy-18 (ID ee7cfffc-327d-2c7e-39fb-05af380de5f2)
- .sub-reveal-awards__highlight.section-micro-title--legacy-16 (ID aa33f3bc-5aeb-e8eb-fece-3a64a2ec8dba)
- .rc-metric.section-micro-body--legacy-11 (ID 53a0bf1d-0e8f-c3a2-3414-2f5da6a9932d)
- .card-title.section-content-title--legacy-10 (ID 96370b99-f045-d219-1a15-315faf4c85b2)
- .heading-98.section-micro-title--legacy-resolver-13 (ID b0593827-9929-4ad5-3d54-c52f5ed621d5)
- .heading-94.section-micro-title--legacy-resolver-14 (ID 82a4ac18-eb96-21f7-edf7-163ef1dc62df)
- .sub-reveal-voice__role.section-micro-body--legacy-12 (ID cadf446f-9307-0552-ece8-ea06172796b3)

## 같은 Selector 중복 전체 목록

같은 말단 이름의 서로 다른 combo는 정상일 수 있다. 아래는 전체 selector 문자열이 같은 별도 레코드들이다.

- .div-block-148-copy: 2개. IDs: 659493ac-5d6e-9675-6223-37574b59884f, 2b731acc-b31f-f02a-2079-534f6c5b1852
- .sub-ai-adopt-process-copy: 5개. IDs: 65238689-1a47-0846-f78b-a16f9cbeec93, a99fc1ed-0c0b-87f9-ecd4-a51eb0424b60, 5d46af99-eb60-04d3-8790-d56b9267c5b4, a29a02c8-dad6-36d3-58b8-14962cf21e4a, 7d50fc6c-0836-48f1-08c1-c694471e31a9
- .sub-kdisc-qualification__meta: 2개. IDs: 85379464-dbfe-0c8f-38af-86f12c4d08fa, 3bc8600d-2a52-1fcf-681d-596348f6793d
- .sub-kdisc-qualification__media: 2개. IDs: f325b49d-0556-7eda-1b93-2c22e0463451, 85379464-dbfe-0c8f-38af-86f12c4d08fc
- .section-micro-body-copy: 2개. IDs: 4e1f34e5-369f-0730-0da6-b7b44ce28e3d, 94c6eb00-c671-407d-bd7c-74d111c1c73a
- .sub-ep-features__row-copy: 2개. IDs: daee4469-54e7-aae3-df55-9426629dce11, fc31daef-ae25-0de1-8063-f72c2196aa24
- .sub-ai-adopt-process-copy.u-section-padding: 5개. IDs: 94f43dd9-f673-263b-ab74-da62d3e9651b, df3d68fd-f6c4-db40-1ec4-4d19047b956d, ead31df5-d37d-5e02-1762-e752908217e9, 941eb4af-295b-f0a6-85a8-e698cbb36a0c, 0448edd7-f400-a2e7-b93a-7801ce1e66ea
- .sub-kdisc-qualification__seal: 2개. IDs: 85379464-dbfe-0c8f-38af-86f12c4d08fd, e29af87c-273c-3f68-2fa5-f94cf742789e
- .banner-box-1-copy: 6개. IDs: b2e0c715-40f6-f777-c385-6a42ca729af6, 9e7199d8-c857-09ea-ca2d-b8b391151a12, 2ecd43dd-c6fc-2de7-4f77-af06bf520a40, abb4cb7c-98a3-a799-648c-2dd6946f38ee, 9335cab3-4710-d052-0136-17bc9d3e4685, 48eed8cb-7520-93bd-687b-9ae58972f9df
- .edge-gradient__left-top-copy: 2개. IDs: 5f98322a-1b1d-4c2a-d0c0-2ba619a7927b, 2338cff4-7acb-d9a8-ffa1-45169a0963e6
- .div-block-93-copy: 2개. IDs: 9ce37412-0d84-0cd3-8fa1-c9945fde94db, 57e69c39-ce90-9f30-d8cb-3d022bb719d5
- .sub-feature__inner-copy: 2개. IDs: 84b795d6-dec3-7170-48f1-4a5f8e86f4ba, 42ec2d04-48b3-0898-7a98-b1e2eb2b5c10
- .div-block-54-copy: 3개. IDs: 8a0609a1-9585-14e3-be15-1295b178dc36, 60d7d295-a5c3-a62b-2d85-8fb6c2660d10, ffc2001b-ff7e-b507-1708-32a5b7c77d2c
- .sub-intro-copy: 2개. IDs: a4285311-ee80-52cd-0913-7f611c013e09, d612f686-7c2c-b499-33a0-e8bdea84cafc
- .sub-kdisc-qualification__layout: 2개. IDs: f90b1f40-537b-2aa3-9ecb-0111d7dc161c, 85379464-dbfe-0c8f-38af-86f12c4d08f8
- .sub-ai-adopt-process-copy.u-section-padding.bg-secondary: 5개. IDs: 71cd50d0-b4c4-7ad3-e6a8-40b7564b1d6c, 02afc2a4-d527-2e50-c97c-90455749460c, 8ce7e2dc-ca41-d11f-5ae5-96813bbd7005, 885d3ef6-61f7-e5e2-b2d1-4d23195cd765, af8d0a33-3e0a-c66a-6d15-dbf170e1d6d7
- .div-block-5-copy-copy: 2개. IDs: 714068e5-2eb7-82f9-c44a-f12d43299932, 201fe1cb-428d-7865-ba6b-8ce32389599c
- .sub-kdisc-service__card-copy: 2개. IDs: 3fb3cf39-3562-ed4f-bc51-7c6f97096c18, c2a9b5e6-016e-9fa8-6563-dfea738d6a08

## Copy 전체 목록

- .div-block-148-copy (ID 659493ac-5d6e-9675-6223-37574b59884f)
- .number-item-copy (ID 13eb978f-d376-d589-4c0c-ae2cd100320b)
- .div-block-5-copy-copy-copy (ID 515d5f6a-edf8-7c60-5915-b6a5e218e984)
- .sub-ai-adopt-process-copy (ID 65238689-1a47-0846-f78b-a16f9cbeec93)
- .sub-sg-industry__layout-copy (ID 146c6a61-9fac-6a91-84d1-94404494ec1b)
- .section-micro-body-copy (ID 4e1f34e5-369f-0730-0da6-b7b44ce28e3d)
- .sub-ep-features__row-copy (ID daee4469-54e7-aae3-df55-9426629dce11)
- .sub-ediscovery-sanction__inner-copy (ID bdfb7e3c-a0c2-0e40-4eed-d88d1bdcafb1)
- .section-micro-title--legacy-resolver-11.bold.card-num-copy (ID 1c73cee1-e005-501e-f5ab-df0229e17fb5)
- .div-block-144-copy-copy (ID 6f2ba814-d68a-74ef-cade-01db2c3fe7b3)
- .banner-box-1-copy (ID b2e0c715-40f6-f777-c385-6a42ca729af6)
- .image-256-copy (ID 4a7fb7c7-4f7a-cb9c-da83-430eba1471fa)
- .edge-gradient__left-top-copy (ID 5f98322a-1b1d-4c2a-d0c0-2ba619a7927b)
- .div-block-93-copy (ID 9ce37412-0d84-0cd3-8fa1-c9945fde94db)
- .card-num-copy (ID 25f4a278-80bb-429a-07aa-5b3fc5f97a6d)
- .sub-ai-adopt-process-copy-copy-copy (ID 1334f846-0682-a2c3-ba12-4ceb9f8a775b)
- .sub-feature__inner-copy (ID 84b795d6-dec3-7170-48f1-4a5f8e86f4ba)
- .div-block-54-copy (ID 8a0609a1-9585-14e3-be15-1295b178dc36)
- .sub-litera-feature-copy (ID ee4d354a-cdb0-f8a2-9f3b-376419d800a6)
- .sub-intro-copy (ID a4285311-ee80-52cd-0913-7f611c013e09)
- .text-block-5.section-micro-body-copy (ID 53c11558-d7a4-cc95-693d-dcfacb33cb63)
- .div-block-163-copy (ID aa11c0dd-50de-0d33-2bfb-8cd53790c15c)
- .sub-lumi-security__copy (ID 57616bdd-17e3-98bd-6be0-6e89413ce4ab)
- .sub-ep-features__media-copy (ID 174ddf2b-42c7-f269-0f68-66f185ead68a)
- .banner-box-1-copy (ID 9e7199d8-c857-09ea-ca2d-b8b391151a12)
- .div-block-54-copy (ID 60d7d295-a5c3-a62b-2d85-8fb6c2660d10)
- .sub-ai-adopt-process-copy (ID a99fc1ed-0c0b-87f9-ecd4-a51eb0424b60)
- .sub-kite-nist__copy (ID f855bfd5-e115-bd53-5317-91aa0adbe305)
- .banner-box-1-copy (ID 2ecd43dd-c6fc-2de7-4f77-af06bf520a40)
- .banner-box-1-copy (ID abb4cb7c-98a3-a799-648c-2dd6946f38ee)
- .edge-gradient__left-top-copy (ID 2338cff4-7acb-d9a8-ffa1-45169a0963e6)
- .sub-intro-copy (ID d612f686-7c2c-b499-33a0-e8bdea84cafc)
- .case-quote-copy (ID 00ba8168-f3a6-6d22-0876-2cadcbd18191)
- .div-block-5-copy-copy (ID 714068e5-2eb7-82f9-c44a-f12d43299932)
- .div-block-100-copy (ID 567ea615-98f9-d702-fc5a-8744938d701b)
- .banner-box-1-copy (ID 9335cab3-4710-d052-0136-17bc9d3e4685)
- .sub-feature__inner-copy (ID 42ec2d04-48b3-0898-7a98-b1e2eb2b5c10)
- .case-quote-copy-copy (ID 8d3a65f8-a4ca-3587-9a1f-9db2b0ae47bf)
- .div-block-93-copy (ID 57e69c39-ce90-9f30-d8cb-3d022bb719d5)
- .div-block-5-copy-copy (ID 201fe1cb-428d-7865-ba6b-8ce32389599c)
- .banner-box-1-copy (ID 48eed8cb-7520-93bd-687b-9ae58972f9df)
- .sub-careers-voice__mark-copy (ID 70fd3199-873e-2fc1-fe33-885597e0b6c2)
- .section-micro-body-copy (ID 94c6eb00-c671-407d-bd7c-74d111c1c73a)
- .sub-solution-grid-copy (ID 5d8ee736-c21e-629a-4794-62eb4d0bc60a)
- .banner-box-1-copy-copy-copy (ID 7b35380e-739a-554b-ed5c-b8573e11fd08)
- .div-block-93-copy-copy (ID aa823ef6-1412-160d-8731-969a88bc9499)
- .sub-ai-adopt-process-copy (ID 5d46af99-eb60-04d3-8790-d56b9267c5b4)
- .text-block-4.section-micro-body-copy (ID 7cfcaebc-6e9c-278a-a2a7-688c16dadef1)
- .div-block-54-copy (ID ffc2001b-ff7e-b507-1708-32a5b7c77d2c)
- .sub-ai-adopt-process-copy (ID a29a02c8-dad6-36d3-58b8-14962cf21e4a)
- .edge-gradient__left-top-copy-copy (ID 208f82fa-8fe4-f6e0-6908-37654bab9183)
- .div-block-80-copy (ID f3154d99-8c71-7a60-f42b-a31e674b0860)
- .sub-kdisc-service__card-copy (ID 3fb3cf39-3562-ed4f-bc51-7c6f97096c18)
- .heading-81-copy (ID 02c7c00d-c748-51d4-eb82-c1a824beac94)
- .sub-ai-adopt-process-copy (ID 7d50fc6c-0836-48f1-08c1-c694471e31a9)
- .section-6-copy (ID 49795aa0-af71-be41-8833-f7aad06e8d88)
- .footer__copyright (ID c6116dae-a043-e8a8-bd8e-0086c28ce953)
- .sub-kdisc-service__card-copy (ID c2a9b5e6-016e-9fa8-6563-dfea738d6a08)
- .div-block-148-copy (ID 2b731acc-b31f-f02a-2079-534f6c5b1852)
- .sub-ep-features__row-copy (ID fc31daef-ae25-0de1-8063-f72c2196aa24)
- .sub-insights__card-summary-copy (ID ffa3ccb2-e017-34a1-7478-973aecf40992)
- .section-micro-body-copy-copy (ID f993b417-a0f9-caa2-8210-bd90292ae8ae)
- .sub-sg-industry__grid-copy (ID 2bfbdab6-046a-ea6e-f514-f888b85dc45e)

## 직접 지정 Font Size 전체 목록

값이 문자열인 font-size. px 고정값, CSS 함수 및 CSS var 직접 참조가 포함된다. 모두 오류라는 뜻은 아니다.

| Selector | Native value | Published sizes 1274/991/767/390 |
|---|---|---|
| .sub-contact__label | 18px | not probed / not probed / not probed / not probed |
| .cookie-modal__row-desc | 14px | not probed / not probed / not probed / not probed |
| .floating-button__top-native | 18px | 18px / 18px / 18px / 18px |
| .ui-modal-close | 22px | not probed / not probed / not probed / not probed |
| .sub-lpo-head-title | var(--type--section--head--title--font-size) | not probed / not probed / not probed / not probed |
| .text-20 | 64px | not probed / not probed / not probed / not probed |
| .sub-rela-stats__plus | 30px | not probed / not probed / not probed / not probed |
| .text-21 | 64px | not probed / not probed / not probed / not probed |
| .story-card__firm | 20px | 20px / 20px / 20px / 20px |
| .sub-insights__feature-title | 30px | not probed / not probed / not probed / not probed |
| .header__mobile-group-title | 20px | not probed / not probed / not probed / not probed |
| .paragraph-9 | 128px | not probed / not probed / not probed / not probed |
| .sub-release-detail__solution | 13px | not probed / not probed / not probed / not probed |
| .sub-lpo-head-body | var(--type--section--head--body--font-size) | not probed / not probed / not probed / not probed |
| .paragraph-24 | 36px | not probed / not probed / not probed / not probed |
| .fortune-100-99-500-450-docusign | 18px | not probed / not probed / not probed / not probed |
| .news-title-invert | 1.875rem | not probed / not probed / not probed / not probed |
| .sub-reveal-voice__mark | 120px | not probed / not probed / not probed / not probed |
| .sub-kdisc-qualification__seal-check | 24px | not probed / not probed / not probed / not probed |
| .sub-ediscovery-checkpoint__num | 22px | not probed / not probed / not probed / not probed |
| .sub-reveal-voice__quote | 32px | not probed / not probed / not probed / not probed |
| .sub-insights__card-title | 19px | 19px / 19px / 19px / 19px |
| .sub-contact__category-toggle | 16px | not probed / not probed / not probed / not probed |
| .sub-release-detail__category | 14px | not probed / not probed / not probed / not probed |
| .sub-kdisc-service__list | 17px | not probed / not probed / not probed / not probed |
| .sub-rela-stats__unit | 20px | not probed / not probed / not probed / not probed |
| .rc-quote | 26px | not probed / not probed / not probed / not probed |
| .st-color-desc-4 | 22px | not probed / not probed / not probed / not probed |
| .heading-80 | 40px | not probed / not probed / not probed / not probed |
| .body-20 | 20px | 20px / 20px / 20px / 20px |
| .sub-release-detail__date | 14px | not probed / not probed / not probed / not probed |
| .news-summary | 0.9375rem | not probed / not probed / not probed / not probed |
| .story-card__tag | 16px | 16px / 16px / 16px / 16px |
| .section-normal-body-5 | 22px | 22px / 22px / 22px / 22px |
| .sub-lpo-content-subtitle | var(--type--section--content--subtitle--font-size) | not probed / not probed / not probed / not probed |
| .case-quote__mark | 88px | not probed / not probed / not probed / not probed |
| .sub-insights__feature-summary | 17px | not probed / not probed / not probed / not probed |
| .tag | 14px | not probed / not probed / not probed / not probed |
| .main-insights__card-badge-text | 13px | 13px / 13px / 13px / 13px |
| .sub-lpo-number__text | 24px | not probed / not probed / not probed / not probed |
| .sub-ediscovery-process__num | 18px | not probed / not probed / not probed / not probed |
| .rc-name | 22px | not probed / not probed / not probed / not probed |
| .sub-insights__feature-foot | 15px | not probed / not probed / not probed / not probed |
| .u-body-18 | 18px | 18px / 18px / 16px / 16px |
| .sub-release-detail__attachment-icon | 22px | not probed / not probed / not probed / not probed |
| .sub-lpo-content-body | var(--type--section--content--body--font-size) | not probed / not probed / not probed / not probed |
| .stat-sub | 14px | not probed / not probed / not probed / not probed |
| .sub-gallery__headline | 22px | not probed / not probed / not probed / not probed |
| .section-normal-eyebrow-3 | 18px | 18px / 18px / 18px / 18px |
| body | 14px | not probed / not probed / not probed / not probed |
| .rc-metric | 18px | not probed / not probed / not probed / not probed |
| .sub-contact__input | 16px | not probed / not probed / not probed / not probed |
| .section-head-title-3 | 64px | 64px / 52px / 34px / 34px |
| .badge | 16px | not probed / not probed / not probed / not probed |
| .news-title | 32px | not probed / not probed / not probed / not probed |
| .section-normal-title-1 | var(--type--section--normal--title--font-size, 54px) | 54px / 44px / 36px / 30px |
| .sub-ediscovery-process-compact__num | 20px | not probed / not probed / not probed / not probed |
| .section-head-body-3 | 26px | 26px / 28px / 26px / 22px |
| .header__search-title | 30px | not probed / not probed / not probed / not probed |
| .sub-rela-stats__num | 60px | not probed / not probed / not probed / not probed |
| .section-micro-title-1 | var(--type--section--micro--title--font-size, 26px) | 26px / 24px / 22px / 20px |
| .section-normal-title-1-2-3 | 54px | 54px / 44px / 36px / 30px |
| .sub-inda-stats__num | 88px | not probed / not probed / not probed / not probed |
| .card-num-copy.section-content-head-title | 1.75rem | 28px / 20px / 20px / 16px |
| .section-micro-title-1-2-3 | 26px | 26px / 24px / 22px / 20px |
| .paragraph-8 | 16px | not probed / not probed / not probed / not probed |
| .sub-inda-stats__unit | 24px | not probed / not probed / not probed / not probed |
| ._80-docusign | 20px | not probed / not probed / not probed / not probed |
| .component-catalog__title | 44px | not probed / not probed / not probed / not probed |
| .heading-96 | 48px | not probed / not probed / not probed / not probed |
| .section-micro-body-1 | var(--type--section--micro--body--font-size, 17px) | 17px / 17px / 16px / 16px |
| .circle-arrow | 20px | not probed / not probed / not probed / not probed |
| .section-micro-body-1-2-3 | 17px | 17px / 17px / 16px / 16px |
| .fortune-100-99-500-450-docusign-0 | 18px | not probed / not probed / not probed / not probed |
| .components-review-card__label | 14px | 14px / 14px / 14px / 14px |
| .component-catalog__description | 18px | not probed / not probed / not probed / not probed |
| .footer__meta-label | 16px | not probed / not probed / not probed / not probed |
| .sub-careers-voice__mark-copy | 220px | not probed / not probed / not probed / not probed |
| .display-188 | 188px | 188px / 188px / 188px / 188px |
| .breadcrumb__separator | 16px | not probed / not probed / not probed / not probed |
| .header__search-close | 22px | not probed / not probed / not probed / not probed |
| .heading-28 | 28px | 28px / 26px / 24px / 22px |
| .story-card__desc | 20px | 20px / 20px / 20px / 20px |
| .breadcrumb__icon | 14px | not probed / not probed / not probed / not probed |
| .sub-contact__category-option | 15px | not probed / not probed / not probed / not probed |
| .section-normal-title-1-2 | var(--type--section--normal--title--font-size, 54px) | 54px / 44px / 36px / 30px |
| .product-tab-link | 16px | not probed / not probed / not probed / not probed |
| .fm-en.display-188 | 148px | 148px / 108px / 76px / 50px |
| .sub-kite-stats__num | 52px | not probed / not probed / not probed / not probed |
| .sub-ediscovery-process-alt__num | 20px | not probed / not probed / not probed / not probed |
| .cookie-modal__row-title | 17px | not probed / not probed / not probed / not probed |
| .stat-num | 48px | not probed / not probed / not probed / not probed |
| .section-micro-title-1-2 | var(--type--section--micro--title--font-size, 26px) | 26px / 24px / 22px / 20px |
| .sub-careers-modal__close | 26px | not probed / not probed / not probed / not probed |
| .cookie-banner__text | 16px | 16px / 16px / 16px / 16px |
| .main-num | 108px | not probed / not probed / not probed / not probed |
| .sub-careers-voice__mark | 220px | not probed / not probed / not probed / not probed |
| .section-micro-body-1-2 | var(--type--section--micro--body--font-size, 17px) | 17px / 17px / 16px / 16px |
| .num-card-num | 28px | 28px / 26px / 24px / 20px |
| .cookie-btn-outline | 15px | not probed / not probed / not probed / not probed |
| .num-64 | 20px | not probed / not probed / not probed / not probed |
| h3 | 24px | not probed / not probed / not probed / not probed |
| .st-color-desc-4.base-center-14 | 20px | not probed / not probed / not probed / not probed |
| .header__mobile-title | 18px | not probed / not probed / not probed / not probed |
| .sub-lpo-number | 24px | not probed / not probed / not probed / not probed |
| .header__mobile-link | 16px | not probed / not probed / not probed / not probed |
| .heading-32 | 36px | 36px / 36px / 36px / 36px |
| .text-19 | 80px | not probed / not probed / not probed / not probed |
| .sub-inda-stats__plus | 40px | not probed / not probed / not probed / not probed |
| .breadcrumb | 15px | not probed / not probed / not probed / not probed |
| .sub-nav-link | 18px | not probed / not probed / not probed / not probed |
| .main-core-services__arrow | 42px | not probed / not probed / not probed / not probed |
| .stat-label | 17px | not probed / not probed / not probed / not probed |
| .main-global-infra-webgl__region-name | 30px | not probed / not probed / not probed / not probed |
| .sub-insights__card-foot | 15px | 15px / 15px / 15px / 15px |
| .header__drawer-title | 18px | not probed / not probed / not probed / not probed |
| .header__search-input | 16px | not probed / not probed / not probed / not probed |
| .footer__copyright | 14px | not probed / not probed / not probed / not probed |
| .main-global-infra-webgl__region-desc | 18px | not probed / not probed / not probed / not probed |
| .sub-reveal-solution__check-mark | 13px | not probed / not probed / not probed / not probed |
| .cookie-btn-fill | 15px | not probed / not probed / not probed / not probed |
| .breadcrumb__option | 15px | not probed / not probed / not probed / not probed |
| .sub-insights__card-summary-copy | 18px | 18px / 18px / 18px / 18px |
| .breadcrumb__label | 17px | not probed / not probed / not probed / not probed |
| .sub-reveal-solution__num | 64px | not probed / not probed / not probed / not probed |
| .sub-reveal-solution__check-label | 16px | not probed / not probed / not probed / not probed |
| .ins-topic | 13px | not probed / not probed / not probed / not probed |
| .section-stat-value | 120px | 120px / 96px / 72px / 56px |
| .sub-release-board__search-icon | 20px | not probed / not probed / not probed / not probed |
| .story-card__quote | 26px | 26px / 22px / 20px / 20px |
| .sub-reveal-solution__name | 28px | not probed / not probed / not probed / not probed |
| .footer__meta-value | 16px | not probed / not probed / not probed / not probed |
| .header__mobile-subhead | 16px | not probed / not probed / not probed / not probed |
| .icon-card__chip | 16px | 16px / 16px / 16px / 16px |

## 전체 타이포 선택자 Inventory

조회한 기본 스타일에서 폰트/행간/자간 속성이 있는 모든 레코드. unresolved는 이번 조회 변수 목록에서 확인되지 않은 ID이며 삭제된 변수라는 뜻이 아니다.

| Selector | Font size source | Line height source | Weight | Family |
|---|---|---|---|---|
| .cms-detail__summary.section-normal-body | type/section/normal/body/font-size | type/section/normal/body/line-height | 400 | Font/Base |
| .sub-contact__label | 18px | 141% | 500 | inherit |
| .cookie-modal__row-desc | 14px | 1.55 | inherit | inherit |
| .sub-reveal-voice__role.section-content-body--legacy-01 | type/section/content/body/font-size | 1.60 | inherit | inherit |
| .lang-en | inherit | inherit | inherit | Font/En |
| .floating-button__top-native | 18px | 1 | inherit | inherit |
| .heading-81-copy.section-normal-title | type/section/normal/title/font-size | type/section/normal/title/line-height | 700 | Font/Base |
| .num-card-num.section-micro-title--legacy-21.section-micro-title--legacy-19 | type/section/micro/title/font-size | inherit | 700 | inherit |
| .fm-base | inherit | inherit | inherit | Pretendard, sans-serif |
| .sub-ediscovery-why__caption | inherit | 1.5 | inherit | inherit |
| .sub-careers-modal__list-item | Body/03/Size | 1.6 | Weight/Regular | Font/Base |
| .cms-detail__action | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .sub-visual-title.section-display | inherit | inherit | 400 | Font/Ko |
| .sub-release-board__row-arrow | type/section/micro/body/font-size | inherit | inherit | inherit |
| .sub-release-board__row-solution | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | Weight/Medium | Font/Base |
| .section-content-body | type/section/content/body/font-size | type/section/content/body/line-height | 400 | Font/Base |
| .ui-modal-close | 22px | 1 | inherit | inherit |
| .sub-lpo-head-title | var(--type--section--head--title--font-size) | var(--type--section--head--title--line-height) | 700 | inherit |
| .fm-en.section-ui-label.regular | inherit | inherit | 400 | inherit |
| .slider-arrow-icon | inherit | 0 | inherit | inherit |
| .text-20 | 64px | 100% | 300 | inherit |
| .section-display | type/section/display/title/font-size | 111% | 400 | inherit |
| .heading-64 | Typography/Size/60 | 141% | 400 | Font/Ko |
| .section-lead-eyebrow | type/section/lead/eyebrow/font-size | type/section/lead/eyebrow/line-height | 600 | Font/Base |
| .heading-100.section-micro-title-source | type/section/micro/title/font-size | 141% | 700 | Font/Base |
| .u-semibold | inherit | inherit | 600 | inherit |
| .sub-rela-stats__plus | 30px | 1.2 | 400 | inherit |
| .fm-en | inherit | inherit | 400 | EB Garamond, serif |
| .text-21 | 64px | 100% | 300 | inherit |
| .card-desc.section-content-body--legacy-02 | type/section/content/body/font-size | inherit | inherit | inherit |
| .section-title__body | Body/03/Size | Body/03/Line Height | Weight/Regular | Font/Base |
| .story-card__firm | 20px | 1.4 | 700 | inherit |
| .section-micro-eyebrow.medium | inherit | inherit | Weight/Medium | inherit |
| .section-micro-body-copy | Body/Content/Size | 151% | inherit | inherit |
| .sub-insights__feature-title | 30px | 1.3 | 700 | inherit |
| .header__mobile-group-title | 20px | 1.35 | 700 | inherit |
| .section-normal-eyebrow | type/section/normal/eyebrow/font-size | type/section/normal/eyebrow/line-height | 600 | Font/Base |
| .heading-89.section-micro-title--legacy-resolver-02 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .paragraph-9 | 128px | 100% | 400 | inherit |
| .cta-button__label | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .sub-release-board__row-preview | type/section/micro/body/font-size | type/section/micro/body/line-height | Weight/Regular | Font/Base |
| .section-content-eyebrow | type/section/content/eyebrow/font-size | type/section/content/eyebrow/line-height | 600 | Font/Base |
| .section-content-sub-title | Content/Sub Title/Size | Body/02/Line Height | inherit | inherit |
| .paragraph-17.section-micro-title--legacy-resolver-03 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .bold-parent.bold | inherit | inherit | Weight/Bold | inherit |
| .sub-insights__card-title.section-micro-title--legacy-02 | type/section/micro/title/font-size | 141% | inherit | inherit |
| .sub-release-board__mobile-filter-button | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .sub-careers-modal__list-label | Body/03/Size | inherit | Weight/Bold | Font/Base |
| .card-title | type/section/content/title/font-size | type/section/content/title/line-height | 700 | Font/Base |
| .section-micro-title--legacy-resolver-11.bold.card-num-copy | type/section/micro/title/font-size | inherit | inherit | inherit |
| .sub-release-detail__solution | 13px | 1.2 | 600 | inherit |
| .heading-87.section-micro-title--legacy-resolver-04 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .password-access__error | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .sub-lpo-head-body | var(--type--section--head--body--font-size) | var(--type--section--head--body--line-height) | 400 | inherit |
| .footer | inherit | inherit | inherit | Font/Base |
| .section-head-title.bold.section-title__title-text | type/component/section-title/title/font-size | inherit | inherit | inherit |
| .paragraph-24 | 36px | inherit | inherit | inherit |
| .search-results__query | type/section/ui/title/font-size | type/section/ui/title/line-height | Weight/Bold | Font/Base |
| .fortune-100-99-500-450-docusign | 18px | 141% | 400 | inherit |
| .sub-careers-modal__answer-strong | Body/03/Size | 1.65 | Weight/SemiBold | Font/Base |
| .section-lead-body | type/section/lead/body/font-size | type/section/lead/body/line-height | 400 | Font/Base |
| .news-title-invert | 1.875rem | 1.35 | 700 | inherit |
| .sub-reveal-voice__mark | 120px | 0.7 | inherit | "EB Garamond",serif |
| .paragraph-29.section-head-body | type/section/head/body/font-size | type/section/head/body/line-height | 400 | Font/Base |
| .number-item-head | inherit | inherit | inherit | inherit |
| .cta-button__icon | inherit | 1 | inherit | inherit |
| .sub-careers-jobs__meta | Body/04/Size | inherit | Weight/Regular | Font/Base |
| .header__menu-label | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .sub-kdisc-qualification__seal-check | 24px | 1 | inherit | inherit |
| .section-micro-title | type/section/micro/title/font-size | type/section/micro/title/line-height | 700 | Font/Base |
| .section-micro-subtitle | type/section/micro/subtitle/font-size | type/section/micro/subtitle/line-height | 600 | Font/Base |
| .sub-ediscovery-checkpoint__num | 22px | 1 | 700 | inherit |
| .heading-54 | Heading/54/Size | 141% | inherit | inherit |
| .sub-reveal-voice__quote | 32px | 1.45 | 500 | inherit |
| .sub-insights__card-title | 19px | 1.4 | 700 | inherit |
| .section-title-body | Body/Content/Size | 161.8% | inherit | inherit |
| .heading-101.section-head-title | type/section/head/title/font-size | type/section/head/title/line-height | 700 | Font/Base |
| .sub-contact__category-toggle | 16px | 1.5 | inherit | inherit |
| .password-access__label | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | Weight/Medium | Font/Base |
| .sub-contact__submit | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .body | inherit | inherit | inherit | Pretendard |
| .section-micro-eyebrow | type/section/micro/eyebrow/font-size | type/section/micro/eyebrow/line-height | 600 | Font/Base |
| .sub-careers-voice__role.section-content-body--legacy-07 | type/section/content/body/font-size | inherit | inherit | inherit |
| .sub-release-detail__category | 14px | 141% | 600 | inherit |
| .news-summary.section-micro-body--legacy-02 | type/section/micro/body/font-size | inherit | inherit | inherit |
| .paragraph-6 | inherit | inherit | 400 | inherit |
| .paragraph-28.section-head-eyebrow | type/section/head/eyebrow/font-size | type/section/head/eyebrow/line-height | 600 | Font/Base |
| .sub-news-list__meta.text-body-invert.section-micro-body--legacy-03 | type/section/micro/body/font-size | inherit | inherit | inherit |
| .card-num-copy | inherit | inherit | inherit | inherit |
| .password-access__button | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .footer__field | type/section/ui/title/font-size | 1.2 | Weight/Regular | inherit |
| .sub-visual-title | type/component/sub-visual/title/font-size | type/section/head/title/line-height | Weight/Regular | Font/Ko |
| .sub-release-board__row-title | type/section/micro/title/font-size | type/section/micro/title/line-height | Weight/Bold | Font/Base |
| .section-content-index | type/section/content/title/font-size | type/section/content/title/line-height | inherit | Font/Base |
| .sub-kdisc-service__list | 17px | 1.6 | inherit | inherit |
| .body-18 | Body/03/Size | 161.8% | inherit | inherit |
| .section-normal-title.section-normal-title--legacy-07.base-center-26 | type/section/normal/title/font-size | inherit | inherit | inherit |
| .text-body-invert.migration-temp-micro-body-4 | type/section/micro/body/font-size | inherit | inherit | inherit |
| .sub-rela-stats__unit | 20px | 1.6 | 600 | inherit |
| .breadcrumb__option--active | inherit | inherit | 600 | inherit |
| .section-content-eyebrow.medium | inherit | inherit | var(--font--weight-medium) | inherit |
| .header__menu-toggle | Body/04/Size | inherit | Weight/Medium | Font/Base |
| .header__search-submit | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .search-results__arrow | type/section/ui/title/font-size | type/section/ui/title/line-height | Weight/Bold | Font/Base |
| .rc-quote | 26px | 1.45 | 600 | inherit |
| .st-color-desc-4 | 22px | 151% | 400 | inherit |
| .heading-80 | 40px | 141% | inherit | inherit |
| .sub-visual-title.is-sub-visual-en | inherit | inherit | 400 | Font/En |
| .body-20 | 20px | 1.5 | inherit | inherit |
| .heading-97.section-content-title | type/section/content/title/font-size | type/section/content/title/line-height | 700 | Font/Base |
| .sub-release-detail__date | 14px | 1.4 | inherit | inherit |
| .search-results__input | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .news-summary | 0.9375rem | 1.6 | inherit | inherit |
| .story-card__tag | 16px | 1.5 | inherit | inherit |
| .section-normal-body-5 | 22px | 151% | 400 | inherit |
| .sub-lpo-content-subtitle | var(--type--section--content--subtitle--font-size) | var(--type--section--content--subtitle--line-height) | 600 | inherit |
| .heading-86.section-micro-title--legacy-resolver-05 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .case-quote__mark | 88px | 56px | 600 | EB Garamond, serif |
| .section-content-subtitle | type/section/content/subtitle/font-size | type/section/content/subtitle/line-height | 600 | Font/Base |
| .section-normal-body | type/section/normal/body/font-size | type/section/normal/body/line-height | Weight/Regular | Font/Base |
| .sub-insights__feature-summary | 17px | 1.65 | inherit | inherit |
| .section-head-subtitle | type/section/head/subtitle/font-size | type/section/head/subtitle/line-height | 600 | Font/Base |
| .tag | 14px | 1.2 | 500 | inherit |
| .main-hero-title-scale | type/component/main-hero/title/font-size | 100% | inherit | inherit |
| .news-meta | inherit | 141% | inherit | inherit |
| .card-desc | type/section/content/body/font-size | type/section/content/body/line-height | 400 | Font/Base |
| .main-insights__card-badge-text | 13px | 1 | 500 | inherit |
| .heading-99.section-micro-title--legacy-resolver-06 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .section-micro-title--legacy-resolver-11.text-title.bold | inherit | inherit | Weight/Bold | inherit |
| .heading-88.section-micro-title--legacy-resolver-07 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .sub-careers-jobs__empty | Body/03/Size | inherit | inherit | Font/Base |
| .sub-reveal-awards__context.section-content-body--legacy-09 | type/section/content/body/font-size | inherit | inherit | inherit |
| .sub-lpo-number__text | 24px | 1 | 700 | inherit |
| .banner-title | type/component/banner/title/font-size | type/section/head/title/line-height | 700 | Font/Base |
| .section-head-body | type/section/head/body/font-size | type/section/head/body/line-height | inherit | Font/Base |
| .sub-ediscovery-process__num | 18px | 1 | 600 | inherit |
| .sub-release-detail__attachment-label | inherit | 1.4 | 600 | inherit |
| .semibold-1-parent.semibold-1 | inherit | inherit | Weight/SemiBold | inherit |
| .rc-name | 22px | 1.3 | 700 | inherit |
| .header__lang-link | Body/04/Size | inherit | inherit | Font/Base |
| .sub-ediscovery-why__caption.section-content-title--legacy-02 | type/section/content/title/font-size | inherit | inherit | inherit |
| .sub-release-board__search-input | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .header__menu-link | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .section-normal-title | type/section/normal/title/font-size | type/section/normal/title/line-height | Weight/Bold | Font/Base |
| .sub-insights__feature-foot | 15px | inherit | inherit | inherit |
| .u-body-18 | 18px | 1.55 | inherit | inherit |
| .header__lang-toggle | Body/04/Size | inherit | Weight/Medium | Font/Base |
| .fm-en.section-display-title | type/section/display/title/font-size | type/section/display/title/line-height | inherit | inherit |
| .regular-1-parent.regular-1 | inherit | inherit | Weight/Regular | inherit |
| .sub-release-detail__attachment-icon | 22px | inherit | inherit | inherit |
| .password-access__input | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .sub-lpo-content-body | var(--type--section--content--body--font-size) | var(--type--section--content--body--line-height) | 400 | inherit |
| .semibold | inherit | inherit | 600 | inherit |
| .cms-detail__back | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .stat-sub | 14px | 1.4 | 400 | inherit |
| .sub-release-board__filter-option | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .search-results__filter-button | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .sub-visual-title.section-main-statement | inherit | inherit | 400 | Font/Ko |
| .sub-gallery__headline | 22px | 1.35 | 700 | inherit |
| .sub-release-board__row-date | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .heading-78.section-content-body--legacy-10 | type/section/content/body/font-size | inherit | inherit | inherit |
| .sub-careers-voice__role | Body/04/Size | inherit | Weight/Regular | Font/Base |
| .section-normal-eyebrow-3 | 18px | 151% | 600 | inherit |
| .num | inherit | 1 | 700 | inherit |
| .footer__consent-text | type/section/ui/body/font-size | 141% | Weight/Regular | inherit |
| .search-results__title | type/section/head/title/font-size | type/section/head/title/line-height | Weight/Bold | Font/Base |
| .section-content-title | type/section/content/title/font-size | type/section/content/title/line-height | 700 | Font/Base |
| .sub-kdisc-service__list.section-content-body--legacy-11 | type/section/content/body/font-size | inherit | inherit | inherit |
| .search-results__category | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | Weight/Medium | Font/Base |
| .section-title__subtitle | Body/02/Size | Body/02/Line Height | Weight/SemiBold | Font/Base |
| .cta-button__arrow | Body/04/Size | 1 | inherit | Font/Base |
| body | 14px | 20px | inherit | Arial |
| .sub-release-board__filter-chevron | type/section/micro/body/font-size | inherit | inherit | inherit |
| .is-filter-active | inherit | inherit | 600 | inherit |
| .section-head-body.regular.intro-title__body-text | type/section/head/body/font-size | type/section/head/body/line-height | inherit | inherit |
| .section-head-title | type/section/head/title/font-size | type/section/head/title/line-height | Weight/Bold | Font/Base |
| .rc-metric | 18px | 1.5 | 600 | inherit |
| .paragraph-7.section-micro-title--legacy-05 | type/section/micro/title/font-size | inherit | 600 | inherit |
| .sub-contact__input | 16px | 1.5 | inherit | inherit |
| .section-head-title-3 | 64px | 121% | 700 | inherit |
| .sub-private-resource__download | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .badge | 16px | 141% | inherit | inherit |
| .news-title | 32px | 141% | inherit | inherit |
| .section-normal-title-1 | var(--type--section--normal--title--font-size, 54px) | 141% | inherit | inherit |
| .button-inner.section-content-body--legacy-18.outline-white-5 | type/section/content/body/font-size | type/section/content/body/line-height | inherit | inherit |
| .heading-100.section-micro-title-source.bold.sub-data-analytics-text-title-invert | type/section/micro/title/font-size | inherit | inherit | inherit |
| .bold | inherit | inherit | var(--font--weight-bold) | inherit |
| .sub-ediscovery-process-compact__num | 20px | 100% | 600 | inherit |
| .sub-release-board__filter-heading | type/section/micro/eyebrow/font-size | type/section/micro/eyebrow/line-height | Weight/Medium | Font/Base |
| .heading-70.section-head-title.bold | inherit | inherit | Weight/Bold | inherit |
| .cms-detail__badge | type/section/micro/eyebrow/font-size | type/section/micro/eyebrow/line-height | inherit | Font/Base |
| .section-head-body-3 | 26px | 151% | 400 | inherit |
| .header__search-title | 30px | 1.3 | 700 | Font/Base |
| .sub-rela-stats__num | 60px | 1 | 600 | inherit |
| .search-results__button | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .section-head-eyebrow | type/section/head/eyebrow/font-size | type/section/head/eyebrow/line-height | inherit | Font/Base |
| .sub-reveal-awards__highlight | inherit | 1.35 | inherit | inherit |
| .section-micro-title-1 | var(--type--section--micro--title--font-size, 26px) | 121% | inherit | inherit |
| .section-head-eyebrow.medium.intro-title__eyebrow-text | type/section/head/eyebrow/font-size | type/section/head/eyebrow/line-height | inherit | inherit |
| .section-normal-title-1-2-3 | 54px | 141% | inherit | inherit |
| .sub-inda-stats__num | 88px | 1 | 600 | inherit |
| .cms-detail__date | type/section/micro/eyebrow/font-size | type/section/micro/eyebrow/line-height | inherit | Font/Base |
| .rc-quote.section-micro-title--legacy-07 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .section-ui-title | type/section/ui/title/font-size | type/section/ui/title/line-height | 600 | Font/Base |
| .heading-92 | inherit | inherit | 400 | inherit |
| .card-num-copy.section-content-head-title | 1.75rem | 1 | 600 | inherit |
| .section-normal-subtitle | type/section/normal/subtitle/font-size | type/section/normal/subtitle/line-height | 600 | Font/Base |
| .search-results__card-desc | type/section/content/body/font-size | type/section/content/body/line-height | Weight/Regular | Font/Base |
| .section-micro-title-1-2-3 | 26px | 121% | inherit | inherit |
| .paragraph-8 | 16px | 141% | inherit | Font/Base |
| .sub-inda-stats__unit | 24px | 1.6 | 600 | inherit |
| ._80-docusign | 20px | 141% | 500 | inherit |
| .component-catalog__title | 44px | 1.15 | inherit | inherit |
| .rc-name.section-micro-title--legacy-08 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .section-ui-subtitle | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | 600 | Font/Base |
| .section-head-eyebrow.medium | inherit | inherit | Weight/Medium | inherit |
| .heading-96 | 48px | 121% | inherit | inherit |
| .fm-ko | inherit | inherit | inherit | Noto Serif KR, serif |
| .section-micro-body-1 | var(--type--section--micro--body--font-size, 17px) | 161.8% | inherit | inherit |
| .circle-arrow | 20px | 1 | inherit | inherit |
| .section-micro-body-1-2-3 | 17px | 161.8% | inherit | inherit |
| .sub-careers-voice__name | Body/03/Size | inherit | Weight/SemiBold | Font/Base |
| .fortune-100-99-500-450-docusign-0 | 18px | 141% | 700 | inherit |
| .components-review-card__label | 14px | 1.4 | 700 | inherit |
| .num-card-num.section-micro-title--legacy-21 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .paragraph-16.section-micro-title--legacy-resolver-08 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .num-card-title.section-micro-title--legacy-22.section-content-title--legacy-09 | type/section/content/title/font-size | 141% | inherit | inherit |
| .component-catalog__description | 18px | 1.5 | inherit | inherit |
| .footer__meta-label | 16px | 1.5 | Weight/Regular | inherit |
| .section-ui-body | type/section/ui/body/font-size | type/section/ui/body/line-height | 400 | Font/Base |
| .search-results__count | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .icon-card-desc | Body/02/Size | inherit | inherit | inherit |
| .cms-detail__summary.section-normal-body.regular | inherit | inherit | Weight/Regular | inherit |
| .sub-careers-voice__mark-copy | 220px | 1 | inherit | EB Garamond, serif |
| .sub-careers-voice__name.section-micro-title--legacy-11 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .section-micro-body-copy | Body/Content/Size | 151% | inherit | inherit |
| .display-188 | 188px | 1.1 | inherit | inherit |
| .sub-reveal-voice__name.section-micro-title--legacy-resolver-09 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .search-results__filter-empty | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .sub-gallery__summary | type/section/micro/body/font-size | 161.8% | 400 | Font/Base |
| .section-ui-eyebrow | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | 600 | Font/Base |
| .num-row__number | Typography/Size/28 | component/icon-num-card/num-line-height | Weight/Bold | Font/Base |
| .breadcrumb__separator | 16px | 1 | 300 | inherit |
| .header__lang-label | inherit | 1 | inherit | inherit |
| .num-card-title.section-micro-title--legacy-22 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .header__search-close | 22px | 1 | inherit | inherit |
| .heading-28 | 28px | 141% | inherit | inherit |
| .story-card__desc | 20px | 141% | inherit | inherit |
| .breadcrumb__icon | 14px | 1 | inherit | inherit |
| .sub-contact__category-option | 15px | 1.5 | inherit | inherit |
| .section-title__title | Heading/01/Size | Heading/01/Line Height | Weight/Bold | Font/Base |
| .sub-release-board__filters-label | type/section/micro/subtitle/font-size | type/section/micro/subtitle/line-height | Weight/SemiBold | Font/Base |
| .sub-release-board__row-category | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | Weight/Medium | Font/Base |
| .section-normal-title-1-2 | var(--type--section--normal--title--font-size, 54px) | 141% | inherit | inherit |
| .section-display.is-display-en | inherit | inherit | inherit | EB Garamond, serif |
| .product-tab-link | 16px | 1 | 600 | Font/Base |
| .fm-en.display-188 | 148px | inherit | inherit | inherit |
| .sub-kite-stats__num | 52px | 1.1 | 600 | inherit |
| .sub-ediscovery-process-alt__num | 20px | 100% | 600 | inherit |
| .sub-insights__meta-row | inherit | 141% | inherit | inherit |
| .section-normal-title.section-normal-title--legacy-07 | type/section/normal/title/font-size | inherit | inherit | inherit |
| .cookie-modal__row-title | 17px | 1.4 | 700 | inherit |
| .sub-release-board__reset | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .stat-num | 48px | 1.05 | 800 | inherit |
| .section-micro-title-1-2 | var(--type--section--micro--title--font-size, 26px) | 121% | inherit | inherit |
| .lang-variant | inherit | inherit | inherit | Font/Ko |
| .heading-52 | Heading/02/Size | 1.25 | inherit | inherit |
| .text-block-7.section-micro-title--legacy-resolver-10 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .sub-careers-modal__close | 26px | 1 | inherit | inherit |
| .cookie-banner__text | 16px | 1.5 | 600 | inherit |
| .sub-careers-modal__title | Heading/05/Size | 1.3 | Weight/Bold | Font/Base |
| .heading-78 | inherit | inherit | 700 | inherit |
| .main-num | 108px | 1.1 | 700 | inherit |
| .section-micro-body | type/section/micro/body/font-size | type/section/micro/body/line-height | inherit | Font/Base |
| .sub-careers-voice__mark | 220px | 1 | inherit | EB Garamond, serif |
| .section-micro-body-1-2 | var(--type--section--micro--body--font-size, 17px) | 161.8% | inherit | inherit |
| .num-card-num | 28px | component/icon-num-card/num-line-height | Weight/Bold | Font/Base |
| .cookie-btn-outline | 15px | inherit | 600 | inherit |
| .heading-72 | Heading/72/Size | 141% | 400 | Font/Ko |
| .button-label | inherit | inherit | inherit | inherit |
| .section-micro-title--legacy-resolver-11 | type/section/micro/title/font-size | 141% | inherit | inherit |
| .sub-ediscovery-why__caption.section-micro-title--legacy-14 | type/section/micro/title/font-size | 141% | inherit | inherit |
| .num-64 | 20px | inherit | inherit | inherit |
| h3 | 24px | 30px | bold | inherit |
| .heading-90.section-micro-title--legacy-resolver-12 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .main-hero__scroll-title.fm-en.section-micro-body--context-03 | type/section/micro/body/font-size | 141% | inherit | inherit |
| .st-color-desc-4.base-center-14 | 20px | inherit | inherit | inherit |
| .header__mobile-title | 18px | 1.4 | 600 | inherit |
| .sub-lpo-number | 24px | 1 | 700 | inherit |
| .header__mobile-link | 16px | 1.4 | inherit | inherit |
| .regular | inherit | inherit | 400 | inherit |
| .heading-91.section-lead-title | type/section/lead/title/font-size | type/section/lead/title/line-height | 700 | Font/Base |
| .button-inner.section-content-body--legacy-18 | type/section/content/body/font-size | inherit | inherit | inherit |
| .fm-en.section-display-title.regular | inherit | inherit | 400 | inherit |
| .heading-32 | 36px | 1.35 | inherit | inherit |
| .sub-visual-desc.section-lead-body | type/section/lead/body/font-size | inherit | inherit | inherit |
| .cms-pagination | type/section/ui/body/font-size | type/section/ui/body/line-height | inherit | Font/Base |
| .text-19 | 80px | 100% | 700 | inherit |
| .sub-inda-stats__plus | 40px | 1.2 | 400 | inherit |
| .sub-careers-modal__answer | Body/03/Size | 1.7 | Weight/Regular | Font/Base |
| .breadcrumb | 15px | 1.4 | inherit | inherit |
| .sub-nav-link | 18px | 1 | 500 | Font/Base |
| .sub-reveal-awards__highlight.section-micro-title--legacy-16 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .sub-news-list__pagination-current | inherit | inherit | 700 | inherit |
| .lang-ko | inherit | inherit | inherit | Font/Ko |
| .search-results__card-title | type/section/content/title/font-size | type/section/content/title/line-height | Weight/Bold | Font/Base |
| .rc-metric.section-micro-body--legacy-11 | type/section/micro/body/font-size | inherit | inherit | inherit |
| .section-ui-label | type/section/ui/label/font-size | type/section/ui/label/line-height | inherit | inherit |
| .sub-release-board__attachment | type/section/ui/body/font-size | type/section/ui/body/line-height | Weight/Regular | Font/Base |
| .card-title.section-content-title--legacy-10 | type/section/content/title/font-size | inherit | inherit | inherit |
| .main-core-services__arrow | 42px | 1 | inherit | inherit |
| .section-head-title.lang-variant.regular.intro-title__title-text | type/component/intro-title/title/font-size | inherit | Weight/SemiBold | inherit |
| .stat-label | 17px | 1.4 | 600 | inherit |
| .icon-num-card__num | Typography/Size/28 | component/icon-num-card/num-line-height | Weight/Bold | Font/Base |
| .button | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .heading-98.section-micro-title--legacy-resolver-13 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .main-global-infra-webgl__region-name | 30px | 141% | 700 | inherit |
| .sub-careers-voice__quote | Heading/04/Size | 1.5 | Weight/Medium | Font/Ko |
| .heading-94.section-micro-title--legacy-resolver-14 | type/section/micro/title/font-size | inherit | inherit | inherit |
| .cms-pagination__arrow | inherit | inherit | inherit | inherit |
| .search-results__filter-label | type/section/ui/eyebrow/font-size | type/section/ui/eyebrow/line-height | Weight/Medium | Font/Base |
| .heading-100.section-micro-title-source.bold | inherit | inherit | Weight/Bold | inherit |
| .sub-reveal-voice__role.section-micro-body--legacy-12 | type/section/micro/body/font-size | 141% | inherit | inherit |
| .section-content-body.sub-inda-stats__sub | type/section/content/body/font-size | inherit | inherit | inherit |
| .section-micro-title--legacy-resolver-11.text-title.regular | inherit | inherit | 400 | inherit |
| .sub-insights__card-foot | 15px | inherit | inherit | inherit |
| .section-title__eyebrow | Body/03/Size | Body/03/Line Height | Weight/Medium | Font/Base |
| .heading-81-copy.section-normal-title.bold | inherit | inherit | Weight/Bold | inherit |
| .search-results__lead | type/section/head/body/font-size | type/section/head/body/line-height | Weight/Regular | Font/Base |
| .header__drawer-title | 18px | 1.4 | 600 | inherit |
| .ins-badge | inherit | 1 | inherit | inherit |
| .header__search-input | 16px | 1.5 | 400 | Font/Base |
| .footer__copyright | 14px | 1.5 | Weight/Regular | inherit |
| .main-global-infra-webgl__region-desc | 18px | 141% | 500 | inherit |
| .cms-pagination__number | inherit | inherit | inherit | inherit |
| .password-access | inherit | inherit | inherit | Font/Base |
| .num-card-body | Body/01/Size | inherit | inherit | inherit |
| .fm-en.section-ui-label | type/section/ui/label/font-size | type/section/ui/label/line-height | inherit | inherit |
| .sub-careers-modal__question | Body/02/Size | 1.4 | Weight/Bold | Font/Base |
| .sub-reveal-solution__check-mark | 13px | inherit | 700 | inherit |
| .section-lead-title | type/section/lead/title/font-size | type/section/lead/title/line-height | Weight/Bold | Font/Base |
| .num-badge | Typography/Size/28 | component/icon-num-card/num-line-height | Weight/Bold | Font/Base |
| .cookie-btn-fill | 15px | inherit | 700 | inherit |
| .cookie-banner__link | inherit | inherit | 600 | inherit |
| .footer__stibee-submit | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | Font/Base |
| .breadcrumb__option | 15px | 1.4 | 400 | inherit |
| .section-micro-title--legacy-resolver-11.text-title-invert.bold | inherit | inherit | Weight/Bold | inherit |
| .sub-insights__card-summary-copy | 18px | 141% | inherit | inherit |
| .header__cta-label | type/section/ui/subtitle/font-size | type/section/ui/subtitle/line-height | Weight/SemiBold | inherit |
| .breadcrumb__label | 17px | 151% | 600 | inherit |
| .sub-reveal-solution__num | 64px | 1 | 600 | inherit |
| .sub-reveal-solution__check-label | 16px | 1.35 | 500 | inherit |
| .ins-topic | 13px | inherit | 500 | inherit |
| .section-stat-value | 120px | 100% | 400 | inherit |
| .sub-lpo-content-title | type/section/content/title/font-size | type/section/content/title/line-height | 700 | inherit |
| .cms-detail__body | type/section/content/body/font-size | type/section/content/body/line-height | 400 | Font/Base |
| .section-lead-subtitle | type/section/lead/subtitle/font-size | type/section/lead/subtitle/line-height | 600 | Font/Base |
| .section-micro-body-copy-copy | Body/Content/Size | 151% | inherit | inherit |
| .sub-release-board__search-icon | 20px | inherit | inherit | inherit |
| .story-card__quote | 26px | 1.5 | 600 | inherit |
| .sub-reveal-solution__name | 28px | 1.35 | 700 | inherit |
| .footer__meta-value | 16px | 1.5 | Weight/SemiBold | inherit |
| .div-block-115 | inherit | inherit | 700 | inherit |
| .header__mobile-subhead | 16px | 1.4 | 700 | inherit |
| .icon-card__chip | 16px | 1.4 | inherit | inherit |

## 컴포넌트 영향 범위

Webflow instanceCount 값이며 고유 페이지 수가 아니다.

| Component | Instances |
|---|---:|
| section-title | 87 |
| breadcrumb | 31 |
| sub-visual | 30 |
| header | 39 |
| footer | 37 |
| accordion | 0 |
| tag | 0 |
| badge | 3 |
| form-field | 0 |
| input | 0 |
| textarea | 0 |
| select | 0 |
| checkbox | 0 |
| form-message | 0 |
| button | 18 |
| card | 0 |
| banner | 29 |
| sub-nav | 30 |
| intro-title | 26 |
| cta-button | 60 |
| num-card | 39 |
| icon-card | 53 |
| icon-num-card | 16 |
| review-card | 6 |
| icon-card-cms | 1 |
| contact-form | 1 |
| stat | 0 |
| slider-arrow | 17 |
| slider-pagination | 1 |
| num-row | 8 |
| insights-slider | 0 |
| stats-band | 3 |
| story-card | 2 |
| logo-marquee | 0 |
| icon-button | 0 |
| case-card | 14 |
| edge-gradient | 34 |
| floating-button | 39 |
| kiteworks-logo-marquee | 2 |
| typingdna-logo-marquee | 1 |
| sub-visual-media-inda | 1 |
| sub-visual-media-data-analytics | 1 |
| sub-visual-media-data-analytics-mobile | 1 |
| sub-visual-media-inda-mobile | 1 |
| sub-visual-media-ediscovery | 1 |
| sub-visual-media-ediscovery-mobile | 1 |
| sub-visual-media-about | 1 |
| sub-visual-media-about-mobile | 1 |
| sub-visual-media-locations | 1 |
| sub-visual-media-locations-mobile | 1 |
| sub-visual-media-careers | 1 |
| sub-visual-media-careers-mobile | 1 |
| docusign-logo-marquee | 1 |
| lpo-service-card | 6 |

## 권장 실행 순서

1. 기준 문서와 역할별 크기표를 확정한다. 현재 정상 반응형을 보존한다.
2. 잘못된 변수명과 eyebrow 중첩 strong을 먼저 고친다.
3. banner와 좁은 desktop의 위계를 조정한다. 변경은 기존 토큰의 모드별 값으로 제한한다.
4. 메인/intro/section-title의 크기 소유권을 하나로 정리한다.
5. 카드/본문/UI의 임시 클래스와 직접 지정값을 역할 변수로 흡수한다.
6. 실제 사용처와 variant/CMS 바인딩을 보존하며 중복/legacy를 제거한다.
7. components 카탈로그, 문서, 회귀 테스트를 갱신한다. 국영문 및 경계 너비를 포함해 검증한 뒤 별도 승인으로 publish한다.

## 증거 파일

- artifacts/typography-audit-native.json
- artifacts/typography-audit-base-variables.json
- artifacts/typography-audit-browser.json
- runtime/audit-typography.cjs
- runtime/report-typography-audit.cjs
