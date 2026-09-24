# 국문·영문 문구 띄어쓰기 점검

점검일: 2026-09-15. 최초 점검은 읽기 전용으로 진행했으며, 이후 사용자 승인으로 아래 확정 항목만 Webflow에 저장했다. Publish는 하지 않았다.

## 최종 승인 범위 및 처리 결과

아래의 기존 전체 표는 최초 후보 목록이지 일괄 수정 대상이 아니다. 사용자가 사소한 표기 차이는 제외하도록 요청했으므로 아래 명백한 단어/문장 접합만 수정했다.

| 원본 위치 | 저장한 수정 | 확인 |
|---|---|---|
| Careers 직원 인용문 | `배울 수있다는` → `배울 수 있다는`, `보람 있는일입니다` → `보람 있는 일입니다` | 네이티브 요소 재조회 |
| About Us Our Standard 01 | `보유한최고 수준` → `보유한 최고 수준` | 네이티브 요소 재조회; 영문은 해당 기본 문구 상속 |
| Reveal 수상 제목 2개 | `AwardseDiscovery`, `SoftwareNamed`의 접합 위치에 개행 문자 삽입 | 네이티브 텍스트와 HTML 재조회; HTML에는 개행 문자로 저장되며 강제 `br`은 아님 |
| 영문 Kiteworks VDR 설명 | `access[ZWJ]management` → `access management` | 기존 `br` 및 `strong` 서식 유지 확인 |
| 영문 Data Security 제목 | `Behavioral Pattern[ZWJ]Authentication System` → `Behavioral Pattern Authentication System` | 컴포넌트 인스턴스 제목 속성 재조회; 설명 유지 |
| Insights 356 | `말했습니다.모의해킹을` → `말했습니다. 모의해킹을` | CMS 본문 HTML의 기존 span 경계 유지 |
| Insights 256 | `되었습니다.특히` → `되었습니다. 특히` | CMS 재조회 |
| Insights 249, 115 | `허용됩니다.또` → `허용됩니다. 또` | CMS 재조회 |
| Insights 236 | `반대입니다.예외적으로` → `반대입니다. 예외적으로` | CMS 재조회 |

- CMS 5건은 기대한 치환 결과와 본문 전체가 정확히 일치했다. 다른 필드, draft 상태, lastPublished는 변경 전과 동일했다.
- About Us 및 Reveal의 해당 제목/문단은 영문 개별 override가 없어 기본 언어의 문구를 상속한다. 영문 페이지 전체 번역은 하지 않았다.
- 수정 후 공개 사이트의 시각 검증은 하지 않았다. 미게시 저장 상태의 API 재조회 검증이며, 공개 화면 반영에는 별도 게시가 필요하다.
- Insights 258, 252, 229의 `tokens truncated` 본문 손상은 미수정이다. 로컬 관련 자료 검색 및 기존 원문 URL 접근으로 복원 가능한 원문을 확보하지 못했다. 임의 문장 보완이나 표시만 삭제하지 않았으며, 원문 제공 후 별도 복원이 필요하다. 세 글의 본문이 그대로임을 CMS 재조회로 확인했다.

## 점검 범위

- 공개 사이트 326개 경로 요청: HTTP 200 195개(국문 경로 162, 영문 경로 33).
- 미처리 경로: 0개. 접근 실패 내역은 마지막 표에 기재.
- 기존 페이지 목록과 공개 내부 링크를 따라 CMS 상세까지 순회했다. 영문 주소라는 이유만으로 본문이 영문이라고 가정하지 않았다.
- 공개 DOM 텍스트를 수집하고 공백 누락·문장 접합·보이지 않는 문자 패턴을 전수 검색한 뒤, 확인한 표현을 표로 정리했다. 모든 문장의 맞춤법·문법을 전문 교열한 결과는 아니다.
- 명시적인 줄바꿈(br/개행)은 유지한다. 아래 표에서 ↵는 기존 줄바꿈, [ZWJ]는 눈에 보이지 않는 U+200D 문자이다. ZWJ는 일반 공백이 아니다.
- 제품명·API명·고유 명칭은 임의 분리하지 않았다. 전문 복합 명사의 띄어쓰기는 확정 오류와 분리하여 표기 통일 권장으로 표시했다.
- 미게시 Designer 변경, draft/보호 페이지 본문, 이미지 내부 글자, 모든 숨김 탭·모달·모바일 전용 문구 및 검색어/페이지네이션의 모든 상태는 이 공개 DOM 감사만으로 검증되지 않는다. sitemap.xml은 404였다.
- 같은 문구가 메인/목록/관련 글에도 나오면 해당 경로를 각각 적었다. 원본 CMS 본문과 요약 필드를 구분해 수정해야 하며 문장 전체를 자동 치환하라는 뜻은 아니다.

## 요약

| 분류 | 페이지별 중복 제거 항목 수 |
|---|---:|
| 본문 손상: 원문 복원 필요 | 3 |
| 공백 누락 | 115 |
| 문장 사이 공백 누락 | 5 |
| 과다 공백 | 13 |
| 표기 통일 권장 | 47 |
| 별도 오탈자 | 8 |
| 원문 확인 필요 | 6 |

## 본문 손상: 원문 복원 필요

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | …5563 tokens truncated… | 해당 생략 표식을 삭제하는 것만으로 해결되지 않음. 원문 대조 후 누락된 본문 복원 | 경제적/사회적 피해를 모두 일으킬 수 있는 종합 범…5563 tokens truncated…는 국내에서 아직 낯선 제도이다 보니 기존에 경험이 없다면 매우 당황스러운 경우가 |
| [/insights/252](https://intellectualdata.webflow.io/insights/252) | sub-insights-detail sub-insights-detail__spacing section-padding / p | …7062 tokens truncated… | 해당 생략 표식을 삭제하는 것만으로 해결되지 않음. 원문 대조 후 누락된 본문 복원 | 편하게 공유할 수 있는 플랫폼을 제공합니다. 또한 …7062 tokens truncated…을 해치고, 작업 효율을 떨어뜨리는 결과가 나올 수도 있기 때문입니다. |
| [/insights/229](https://intellectualdata.webflow.io/insights/229) | sub-insights-detail sub-insights-detail__spacing section-padding / p | …3815 tokens truncated… | 해당 생략 표식을 삭제하는 것만으로 해결되지 않음. 원문 대조 후 누락된 본문 복원 | 여기서만 약 1.39억 달러의 손…3815 tokens truncated…다. |

## 공백 누락

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/en/LPO](https://intellectualdata.webflow.io/en/LPO) | section-padding / p / section-head-body regular | LPO(Legal Process Outsourcing) services | LPO (Legal Process Outsourcing) services | ertise, Intellectual Data’s LPO(Legal Process Outsourcing) services bring together qualified professionals, inte |
| [/board/Careers](https://intellectualdata.webflow.io/board/Careers) | u-section-padding / p / section-content-title bold text-title | 수있다는 | 수 있다는 | 문에 풍부한 노하우와 실무 경험을 가까이에서 배울 수있다는 점이 Project Manager로서 가장 보람 있는일입니다. |
| [/board/Careers](https://intellectualdata.webflow.io/board/Careers) | u-section-padding / p / section-content-title bold text-title | 있는일입니다 | 있는 일입니다 |  점이 Project Manager로서 가장 보람 있는일입니다. |
| [/board/Newsroom](https://intellectualdata.webflow.io/board/Newsroom) | sub-news-list u-section-padding / p / section-micro-body regular text-body-invert | 전세계 | 전 세계 | 는 KINPA 컨퍼런스는 매년 1,000명 이상의 전세계 지식재산(IP) 관계자가 참석하는 국내 최대 규모의 IP 행사로, 올해는 AI  |
| [/board/Insights](https://intellectualdata.webflow.io/board/Insights) | sub-insights / p / section-micro-body regular text-body | 상호간의 | 상호 간의 |  소송 양측에 대한 답변과 질의가 진행되며, 특히 상호간의 투명하게 문서제출(디스커버리) 과정을 거치는 것이 가장 큰 차이점입니다. 본 소 |
| [/board/Insights](https://intellectualdata.webflow.io/board/Insights) | p / section-micro-body regular text-body-invert | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/page/About_Us](https://intellectualdata.webflow.io/page/About_Us) | u-section-padding / p / section-content-body regular text-body | 보유한최고 | 보유한 최고 |  가장 오래된 경력과 다수의 해외분쟁 지원 경험을 보유한최고 수준의 eDiscovery 전문가들이 컨설팅, 프로젝트 매니징, 엔지니어링, 개 |
| [/en/page/About_Us](https://intellectualdata.webflow.io/en/page/About_Us) | u-section-padding / p / section-content-body regular text-body | 보유한최고 | 보유한 최고 |  가장 오래된 경력과 다수의 해외분쟁 지원 경험을 보유한최고 수준의 eDiscovery 전문가들이 컨설팅, 프로젝트 매니징, 엔지니어링, 개 |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | sub-intro u-section-padding / h4 / section-micro-title bold | IT환경 | IT 환경 |  & On-Premise Solution[ZWJ] ↵ [ZWJ]기업 IT환경에 맞춘 솔루션 |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | u-section-padding bg-secondary / h3 / section-micro-title text-title-invert | AwardseDiscovery | Awards eDiscovery | galweek Leaders in Tech Law AwardseDiscovery Technology Winner |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | u-section-padding bg-secondary / h3 / section-micro-title text-title-invert | SoftwareNamed | Software Named | dwide End-to-End eDiscovery SoftwareNamed a Leader |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | u-section-padding bg-secondary / p / section-content-body regular text-body-invert | 정보간 | 정보 간 |  데이터로 시각화합니다. 다양한 데이터 속에서 각 정보간 패턴과 관계를 빠르게 보여줌으로써 분석을 위한 강력한 인사이트를 제공합니다. |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | sub-intro u-section-padding / p / section-head-body regular | AI기반 | AI 기반 | Reveal®은 세계적인 수준의 AI기반 eDiscovery 및 비정형 데이터 분석 플랫폼입니다. 데이터 분석에 대한 인 |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | case-quote-copy-copy bg-placeholder-1 / p / section-content-title bold text-title | 지역인만큼 | 지역인 만큼 | 은 Reveal의 APAC 진출 전략에 있어 핵심 지역인만큼, 이번 기회를 통해 한국에서 가장 뛰어난 eDiscovery 서비스 제공업체와  |
| [/en/page/Reveal](https://intellectualdata.webflow.io/en/page/Reveal) | u-section-padding bg-secondary / h3 / section-micro-title text-title-invert | AwardseDiscovery | Awards eDiscovery | galweek Leaders in Tech Law AwardseDiscovery Technology Winner |
| [/en/page/Reveal](https://intellectualdata.webflow.io/en/page/Reveal) | u-section-padding bg-secondary / h3 / section-micro-title text-title-invert | SoftwareNamed | Software Named | dwide End-to-End eDiscovery SoftwareNamed a Leader |
| [/page/TypingDNA](https://intellectualdata.webflow.io/page/TypingDNA) | sub-intro u-section-padding / p / section-content-body regular text-body | 필요없는 | 필요 없는 | 핸드폰 필요없는 2단계 인증 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-intro u-section-padding / p / section-micro-body regular w-variant-f8af5e96-483b-cc15-6117-09f872687bb1 | 이용중인 | 이용 중인 | 승인된 로그인 정보를 이용중인 사용자여도 실제로 그 사람이 아닐 수 있습니다. |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-sg-industry section-padding bg-secondary / p / section-content-body regular text-body-invert | 검토하는데 이상적 | 검토하는 데 이상적 | Web 버전은 보안이 필요하거나 웹 전용인 문서를 검토하는데 이상적입니다. SessionGuardian® Web은 중요한 문서를 빠르고 안전하게 접 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-sg-industry section-padding bg-secondary / p / section-micro-body regular | 유지하는데 있어 | 유지하는 데 있어 | 민의 개인정보, 국가 안보, 경제 안정성을 지키고 유지하는데 있어 가장 중요합니다. IBM Security에 따르면, 정부 또는 공공기관의 데이터 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-sg-industry section-padding bg-secondary / p / section-micro-body regular | Teams내에서 | Teams 내에서 | n®은 Office 365 또는 Microsoft Teams내에서 조직 간 프로젝트를 지원하고 협업할 수 있도록 다양한 업무를 안전하게 진행할 수 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-sg-industry section-padding bg-secondary / p / section-micro-body regular | 최소 한번 | 최소 한 번 | ociation)에 따르면, 로펌 4곳 중 1곳이 최소 한번 이상 데이터 유출을 경험한 것으로 나타났습니다. 법률 업계에서 데이터 유출로 인 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-intro u-section-padding / p / section-head-body regular text-body | 전세계 | 전 세계 | 전세계 사용자 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-solution / p / section-content-body regular text-body | 회사내에 | 회사 내에 | 회사내에 설치 가능 (기업에서 데이터를 자체적으로 관리) |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-solution / p / section-content-body regular text-body-invert | 두개의 | 두 개의 | 를 암호화하고 인증을 요구합니다. 또한, FTP는 두개의 채널을 사용하여 파일을 전송하는 반면, SFTP는 고객과 서버 간에 SSH 프로 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-nist / p / section-head-body regular w-variant-074e5492-6613-dccc-c151-0f15c0cd3155 | AI기술 | AI 기술 | 정되었습니다. AISIC는 신뢰할 수 있고 안전한 AI기술의 개발 및 배포를 지원하기 위해 설립되었으며 Kiteworks®는 GenAI로  |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-intro u-section-padding / p / section-head-body regular | 1억명 | 1억 명 | 다. 전세계 3,650개가 넘는 기업과 정부기관, 1억명 이상의 사용자가 입증하고 있는 Kiteworks®의 우수성을 인텔렉추얼데이터의  |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-usecase / p / section-content-body regular text-body | 미 사용중인 | 미사용 중인 | 안 또는 조직의 다양한 목적을 위해 전송 중이거나 미 사용중인 데이터를 추적 및 관리하는 기능이 필요합니다. 예를 들어, 잠재 고객이나 투자자 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-solution / p / section-content-body regular text-body-invert | 시일내에 | 시일 내에 |  프로토콜입니다. 익명으로 정보를 전송하거나 빠른 시일내에 보안이 필요하지 않은 정보를 전송할 때 FTP가 사용됩니다. 하지만, 파일을 네 |
| [/en/page/Kiteworks](https://intellectualdata.webflow.io/en/page/Kiteworks) | sub-kite-solution / p / section-micro-body regular text-body | access[ZWJ]management | access management | ess, downloading, ↵ [ZWJ]and user access[ZWJ]management |
| [/en/page/Data_Security](https://intellectualdata.webflow.io/en/page/Data_Security) | sub-ds-protection sub-ai-adopt-process-copy-copy-copy u-section-padding / h4 / section-micro-title bold | Pattern[ZWJ]Authentication | Pattern Authentication | Behavioral Pattern[ZWJ]Authentication System |
| [/page/K_Discovery](https://intellectualdata.webflow.io/page/K_Discovery) | sub-kdisc-insights sub-ai-adopt-process u-section-padding / p / sub-gallery__summary | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-checkpoint u-section-padding bg-secondary / h3 / section-micro-title bold | IT환경 | IT 환경 | 국내 IT환경에 적합한 전문가 선택 |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-caution bg-secondary / p / section-micro-body regular | 제출해야하며 | 제출해야 하며 | 법원의 증거제출명령기한 내에 적시된 자료를 제출해야하며, 제출에 실패할 경우 벌금이나 불리한 판결 등의 결과를 초래할 수 있습니다. |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-caution bg-secondary / p / section-head-body regular w-variant-d6167a22-0486-3422-c2a3-d825c590f954 | 지켜야할 | 지켜야 할 | 보다 eDiscovery와 관련된 법률, 당사자가 지켜야할 원칙과 의무를 이해하고 지키는 것이 매우 중요합니다. |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-sanction u-section-padding / p / section-content-body regular | eDiscovery규정 | eDiscovery 규정 | 적으로 활용하는 경우가 많습니다. 해외 소송 혹은 eDiscovery규정에 대해 친숙하지 않은 국내 기업의 경우 소송 사안과 관계없이 eDiscovery |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-insights u-section-padding / p / sub-gallery__summary sub-gallery__summary-2line | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/page/Data_Analytics](https://intellectualdata.webflow.io/page/Data_Analytics) | sub-data-analytics-insights sub-ai-adopt-process u-section-padding / p / sub-gallery__summary text-body | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/en/page/Data_Analytics](https://intellectualdata.webflow.io/en/page/Data_Analytics) | sub-data-analytics-intro sub-ai-adopt-process u-section-padding / h3 / section-micro-title text-title-invert | SVM(Support Vector Machine) type | SVM (Support Vector Machine) type | Learning with AL = SVM(Support Vector Machine) type |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-gallery u-section-padding insights-section / p / sub-gallery__summary | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/](https://intellectualdata.webflow.io/) | main-insights / p / sub-gallery__summary sub-gallery__summary-2line | 양국간의 | 양국 간의 | , 새로운 사이버 냉전의 시작 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/insights/393](https://intellectualdata.webflow.io/insights/393) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 티나지 | 티 나지 | 정말로 숨길 의도가 있었다면 더 깔끔한 방법으로, 티나지 않게 숨길 수가 있거든요. |
| [/insights/393](https://intellectualdata.webflow.io/insights/393) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 된거죠 | 된 거죠 | ct, 미국 법무부(DOJ) 등의 정책이 충돌하게 된거죠. 프레임워크를 비롯해 데이터 관리에 있어서 까지 국제 공조, 조화가 시급한 과제 |
| [/insights/393](https://intellectualdata.webflow.io/insights/393) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있는거죠 | 있는 거죠 | 주소가 하드코딩되어 있다는 것을 증거라고 주장하고 있는거죠. 그런데 실제 개발을 해 보면 서버 주소나 암호화 키 등은 암호화가 되어 숨겨집 |
| [/insights/381](https://intellectualdata.webflow.io/insights/381) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 양국간의 | 양국 간의 | 통상뿐만 아닙니다. 양국간의 사이버 전쟁 역시 치열하게 벌어지고 있습니다. 바로 한국시간 17일, 블룸버그는 |
| [/insights/366](https://intellectualdata.webflow.io/insights/366) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | eDiscovery성공 | eDiscovery 성공 | SNS 데이터의 eDiscovery성공 사례와 2025년 트렌드 전망 |
| [/insights/366](https://intellectualdata.webflow.io/insights/366) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 전세계 | 전 세계 | 터 스토리지의 보안 자물쇠는 너무나 허술했습니다. 전세계에서 완성차 기업 top5 순위권에 위치한 대기업인 폭스바겐 조차도 약 백만명에  |
| [/insights/364](https://intellectualdata.webflow.io/insights/364) | sub-insights-detail sub-insights-detail__spacing section-padding / h1 / section-normal-title bold text-title-invert | eDiscovery성공 | eDiscovery 성공 | SNS 데이터의 eDiscovery성공 사례와 2025년 트렌드 전망 |
| [/insights/360](https://intellectualdata.webflow.io/insights/360) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | eDiscovery성공 | eDiscovery 성공 | SNS 데이터의 eDiscovery성공 사례와 2025년 트렌드 전망 |
| [/insights/360](https://intellectualdata.webflow.io/insights/360) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 전세계 | 전 세계 |  대한 신고가능성은 있다고 본다", "특정세력에서 전세계의 언론들과 유명인 SNS정보를 지속적으로 업데이트한다"라 언급하기도 했습니다.  |
| [/insights/356](https://intellectualdata.webflow.io/insights/356) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 볼수 있습니다 | 볼 수 있습니다 | 없는 일을 만들어 내서 저지른 황당무계한 사건으로 볼수 있습니다. |
| [/insights/356](https://intellectualdata.webflow.io/insights/356) | sub-insights-detail sub-insights-detail__spacing section-padding / a | 24시간내내 | 24시간 내내 |  원자력발전소도, 혹은 군내부 통신망인 인트라넷도 24시간내내 보안취약점에 노출되어 있고, 해커가 적절한 기술과 방법, 그리고 의도만 있다면  |
| [/insights/356](https://intellectualdata.webflow.io/insights/356) | sub-insights-detail sub-insights-detail__spacing section-padding / a | 대답한거죠 | 대답한 거죠 | 선거가 가능한가'라는 질문에 '그럴 수도 있다'고 대답한거죠. 심지어 수많은 보안 장벽을 모의해킹이라는 특수한 상황을 적용하여 전부 우회하거 |
| [/insights/350](https://intellectualdata.webflow.io/insights/350) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 보유중인 | 보유 중인 | 동적 호스트 구성 프로토콜)과 같이 접속할 때마다 보유중인 IP들중 하나를 분배해주는 식으로 고정된자원을 아껴 쓰게 되는데요. 이렇게 되면 |
| [/insights/350](https://intellectualdata.webflow.io/insights/350) | sub-insights-detail sub-insights-detail__spacing section-padding / p | IP들중 | IP들 중 | 트 구성 프로토콜)과 같이 접속할 때마다 보유중인 IP들중 하나를 분배해주는 식으로 고정된자원을 아껴 쓰게 되는데요. 이렇게 되면 "IP  |
| [/insights/337](https://intellectualdata.webflow.io/insights/337) | sub-insights-detail sub-insights-detail__spacing section-padding / p | eDiscovery제도 | eDiscovery 제도 | 미국 소송에서 eDiscovery제도는 모든 민사소송에서 필수적으로 진행되는 과정으로, 양측 당사자가 소송 관련 증거 |
| [/insights/333](https://intellectualdata.webflow.io/insights/333) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 되는것이죠 | 되는 것이죠 |  사용자가 악의적 목적을 가졌다면 너무나 쉽게 파훼되는것이죠. 물론 아직까지는 그런 최악의 악용사례가 비트코인이나 이더리움 등 메이저 가상자 |
| [/insights/329](https://intellectualdata.webflow.io/insights/329) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 전세계 | 전 세계 | Kiteworks는 전세계 3,650개 기업과 정부기관, 총 1억 명의 사용자를 보유한 대표적인 기업보안전 |
| [/insights/329](https://intellectualdata.webflow.io/insights/329) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 검토해야할 | 검토해야 할 | 데이터를 보호할 수 있는 Kiteworks 도입을 검토해야할 때입니다. |
| [/insights/312](https://intellectualdata.webflow.io/insights/312) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 고려해야할 | 고려해야 할 |  데이터를 수집하고 처리해야 하기 때문에 진행 시 고려해야할 사항이 매우 많습니다. 무엇보다 가장 중요하면서 가장 처음 고민해야할 점은 E- |
| [/insights/312](https://intellectualdata.webflow.io/insights/312) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 고민해야할 | 고민해야 할 | 우 많습니다. 무엇보다 가장 중요하면서 가장 처음 고민해야할 점은 E-Discovery를 담당할 업체를 선정하는 일일 것입니다. |
| [/insights/300](https://intellectualdata.webflow.io/insights/300) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 만드는거죠 | 만드는 거죠 |  직접 컴파일러링을 수행해서 실시간으로 프로그램을 만드는거죠. 마이크로소프트에서 사용하는 엔진은 차크라 엔진인데요. |
| [/insights/300](https://intellectualdata.webflow.io/insights/300) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 배포하는거죠 | 배포하는 거죠 | 한 라이브러리를 컴파일하여 실행 프로그램의 형태로 배포하는거죠. |
| [/insights/300](https://intellectualdata.webflow.io/insights/300) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 된거죠 | 된 거죠 | 스크립트를 받은 PC는 악성코드에 감염될 수 있게 된거죠. 공격자는 감염된 PC에 원격 명령을 내려 정보를 빼내거나 다른 시스템을 공격했 |
| [/insights/297](https://intellectualdata.webflow.io/insights/297) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 조작할수도 | 조작할 수도 | 당연한 의문이 하나 들게 됩니다. 증거를 숨기거나 조작할수도 있지 않을까? 하는 의문 말입니다. 특히 전자증거는 종이로 된 서류보다 조작이나 |
| [/insights/261](https://intellectualdata.webflow.io/insights/261) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 상호간의 | 상호 간의 |  소송 양측에 대한 답변과 질의가 진행되며, 특히 상호간의 투명하게 문서제출(디스커버리) 과정을 거치는 것이 가장 큰 차이점입니다. 본 소 |
| [/insights/262](https://intellectualdata.webflow.io/insights/262) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 주는거죠 | 주는 거죠 | 에 대한 옵션을 선택하고 대리점에서는 이걸 주문해 주는거죠. 주문대로 공장에서 생산해 주는거고요. |
| [/insights/262](https://intellectualdata.webflow.io/insights/262) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 주는거고요 | 주는 거고요 |  이걸 주문해 주는거죠. 주문대로 공장에서 생산해 주는거고요. |
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있는거죠 | 있는 거죠 | 문에 신속 대응이라는 측면에서는 문제가 발생할 수 있는거죠. |
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있다는거죠 | 있다는 거죠 |  근거해 범죄수사를 위한 통신제한조치가 허가될 수 있다는거죠. |
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 상호간의 | 상호 간의 |  소송 양측에 대한 답변과 질의가 진행되며, 특히 상호간의 투명하게 문서제출(디스커버리) 과정을 거치는 것이 가장 큰 차이점입니다. 본 소 |
| [/insights/253](https://intellectualdata.webflow.io/insights/253) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 1억명 | 1억 명 | 글로벌 사용자 1억명! 기업용 보안 전송 프로토콜 Kiteworks |
| [/insights/253](https://intellectualdata.webflow.io/insights/253) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 검토중이라고 | 검토 중이라고 |  '비고 라이브'와 함께 텔레그램을 차단하는 것을 검토중이라고 밝힌 바 있습니다. EU도 이 흐름에 동참했습니다. |
| [/insights/253](https://intellectualdata.webflow.io/insights/253) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 뒤집어버린거죠 | 뒤집어 버린 거죠 | 온라인 통신에 대한 검열과 성인물을 뒤섞어 논의를 뒤집어버린거죠. |
| [/insights/253](https://intellectualdata.webflow.io/insights/253) | sub-insights-detail sub-insights-detail__spacing section-padding / p | AI기술 | AI 기술 | 2)를 근거조항으로 쓸 수 있다는 것이죠. 여기에 AI기술 등 다양한 협업 프레임워크가 결합해야 기술뿐 아니라 법률적으로도 딥페이크와의 싸 |
| [/insights/252](https://intellectualdata.webflow.io/insights/252) | sub-insights-detail sub-insights-detail__spacing section-padding / h1 / section-normal-title bold text-title-invert | 1억명 | 1억 명 | 글로벌 사용자 1억명! 기업용 보안 전송 프로토콜 Kiteworks |
| [/insights/252](https://intellectualdata.webflow.io/insights/252) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 전세계 | 전 세계 | 사용되고 있습니다. 특히 Kiteworks는 이미 전세계 3,650개 기업 및 정부기관, 1억 명 이상 사용자를 보유한 대표적인 보안 전 |
| [/insights/251](https://intellectualdata.webflow.io/insights/251) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 1억명 | 1억 명 | 글로벌 사용자 1억명! 기업용 보안 전송 프로토콜 Kiteworks |
| [/insights/251](https://intellectualdata.webflow.io/insights/251) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있었던거죠 | 있었던 거죠 | IP 등 개인정보가 유출되도록 해킹 코드가 심어져 있었던거죠. |
| [/insights/251](https://intellectualdata.webflow.io/insights/251) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 아니라는거죠 | 아니라는 거죠 | 이 수치를 근거로 똑같은 주장을 폈습니다. 별 일 아니라는거죠. |
| [/insights/251](https://intellectualdata.webflow.io/insights/251) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 사용하는거죠 | 사용하는 거죠 | 사진을 크롤링, 딥페이크 음란물을 합성하는 용도로 사용하는거죠. 딱히 제약이 있는 것도 아닙니다. 아무나, 누구나 들어갈 수 있습니다. 비공개 |
| [/insights/248](https://intellectualdata.webflow.io/insights/248) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 한다는거죠 | 한다는 거죠 | 그래서 SALT나 Pepper를 함께 사용해야 한다는거죠. 과거 2012년, SALT를 추가하지 않은 해시값으로 비밀번호를 만들었다가 해 |
| [/insights/248](https://intellectualdata.webflow.io/insights/248) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 보완하는거죠 | 보완하는 거죠 |  SALT나 Pepper를 사용해서 보안 취약성을 보완하는거죠. |
| [/insights/248](https://intellectualdata.webflow.io/insights/248) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 된거죠 | 된 거죠 | 유출 사고를 당하고, 국가 핵심 정보들이 다량 유출된거죠. 단순히 법령이 제정되던 시기에 써먹을 수 있는 기술만을 권고하는 것이 아니라, |
| [/insights/248](https://intellectualdata.webflow.io/insights/248) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 10분이내에 | 10분 이내에 | 해시값을 만드는데 걸리는 시간은 보통의 컴퓨터로도 10분이내에 가능한데요. 이런 해킹 방식을 '레인보우 테이블(Rainbow Table)'이라 |
| [/insights/247](https://intellectualdata.webflow.io/insights/247) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 되어버린거죠 | 되어 버린 거죠 | 장에선 사용할 수 없는 제품군으로 전락한지 오래가 되어버린거죠. |
| [/insights/247](https://intellectualdata.webflow.io/insights/247) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 발생할때 | 발생할 때 | 의 제고가 필요하다고 생각합니다. 시스템에 사고가 발생할때는 가장 취약한 부분에서, 사람이 지켜보고 있지 않을 때 발생합니다. 델타는 어떻 |
| [/insights/247](https://intellectualdata.webflow.io/insights/247) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 맡긴것이 | 맡긴 것이 | 빠르게 대응을 하지 않고 시스템 관리를 아웃소싱에 맡긴것이 문제가 되지 않나 생각됩니다. |
| [/insights/244](https://intellectualdata.webflow.io/insights/244) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 전세계 | 전 세계 | 전세계 시스템 마비의 원인, Null Pointer Reference Exception |
| [/insights/243](https://intellectualdata.webflow.io/insights/243) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 없는거죠 | 없는 거죠 | 이 제대로 확립되지 않아 각 개발사를 믿을 수밖에 없는거죠. 데이터가 안전하다고 하면, 유출 정황이 있다 하더라도 믿을 수밖에 없게 됩니다 |
| [/insights/243](https://intellectualdata.webflow.io/insights/243) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있다는거죠 | 있다는 거죠 | 초 해고당했다는겁니다. 조직 내부에 심각한 문제가 있다는거죠. 심지어 그의 제안은 완전히 파기당했죠. 오픈AI 측은 그가 보안성 제고를 위해 |
| [/insights/242](https://intellectualdata.webflow.io/insights/242) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있는것이 | 있는 것이 | 측이 이런 민감한 데이터를 과도한 범위로 보유하고 있는것이 옳은가에 대해 곳곳에서 갑론을박이 일어나고 있는 상태입니다. 적절한 조치조차 하 |
| [/insights/241](https://intellectualdata.webflow.io/insights/241) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 넘어갔다는거죠 | 넘어갔다는 거죠 | 니다. 이를 사용할지 여부는 소비자의 판단 몫으로 넘어갔다는거죠. 하지만 KT는 여전히 전체 이용자의 망 관리를 내세워, 그리드 서비스를 '악성 |
| [/insights/240](https://intellectualdata.webflow.io/insights/240) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 가하는거죠 | 가하는 거죠 | 같은 신상정보를 입수, 보이스피싱/협박전화 공격을 가하는거죠. |
| [/insights/236](https://intellectualdata.webflow.io/insights/236) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 지레짐작하는거죠 | 지레짐작하는 거죠 | 도 사측에서 이를 보지 않고 볼 수 없을 것이라고 지레짐작하는거죠. |
| [/insights/236](https://intellectualdata.webflow.io/insights/236) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있었다는거죠 | 있었다는 거죠 | 들어갈 수 있었다"고 덧붙이기도 했습니다. 사례가 있었다는거죠. |
| [/insights/235](https://intellectualdata.webflow.io/insights/235) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 커진다는거죠 | 커진다는 거죠 | 고, 편리하게 만들면 사고가 날 수 있는 가능성이 커진다는거죠. 대표적 사례가 지난번 네이버 사건에서 트집이 잡혔던 싱글 사인 온, 그리고 비 |
| [/insights/234](https://intellectualdata.webflow.io/insights/234) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있다는거죠 | 있다는 거죠 | 민의 데이터가 유출돼 경제와 안보에 위협이 될 수 있다는거죠. 이 사건 뿐만이 아닙니다. 지난 4월 조 바이든 미국 대통령은 국가 안보를 이 |
| [/insights/233](https://intellectualdata.webflow.io/insights/233) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 깨지는거죠 | 깨지는 거죠 | 초만에 모든 로그인 자체가 암호의 길이에 무관하게 깨지는거죠. |
| [/insights/233](https://intellectualdata.webflow.io/insights/233) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있는거죠 | 있는 거죠 | 가 역시 강력한 컴플라이언스의 규제를 받을 필요가 있는거죠. |
| [/insights/232](https://intellectualdata.webflow.io/insights/232) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 한다는거죠 | 한다는 거죠 | 어 탐지 시스템은 브라우저 기반 랜섬웨어를 막지 못한다는거죠. 결국 브라우저, 파일 시스템, 사용자 등 다양한 수준에서 다양한 층위의 보안  |
| [/insights/232](https://intellectualdata.webflow.io/insights/232) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 못한다는거죠 | 못한다는 거죠 | 웨어 탐지 시스템은 브라우저 기반 랜섬웨어를 막지 못한다는거죠. 결국 브라우저, 파일 시스템, 사용자 등 다양한 수준에서 다양한 층위의 보안  |
| [/insights/232](https://intellectualdata.webflow.io/insights/232) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 공격을 하는거죠 | 공격을 하는 거죠 | 아니라 단순히 돈만이기 때문에 아무나 걸려라 하는 공격을 하는거죠. 랜섬웨어 피해가 산업 전반을 가리지 않고 곳곳에서 발생하는 것도 이 때문입니다 |
| [/insights/232](https://intellectualdata.webflow.io/insights/232) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 유포하는거죠 | 유포하는 거죠 | 뒤, 고객과 미디어에 연락해 사건 혹은 개인정보를 유포하는거죠. 이렇게 되면 피해자측이 입은 누적 피해 규모는 상상을 초월해질 정도로 커지게  |
| [/insights/191](https://intellectualdata.webflow.io/insights/191) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 없는거죠 | 없는 거죠 | 이고 시스템에는 문제가 없다는 식으로 넘어갈 수는 없는거죠. |
| [/insights/191](https://intellectualdata.webflow.io/insights/191) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 침입하는거죠 | 침입하는 거죠 | 고 있습니다. 이후 보안 취약점을 이용해 시스템에 침입하는거죠. |
| [/insights/116](https://intellectualdata.webflow.io/insights/116) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 10분이내에 | 10분 이내에 | 해시값을 만드는데 걸리는 시간은 보통의 컴퓨터로도 10분이내에 가능한데요. 이런 해킹 방식을 '레인보우 테이블(Rainbow Table)'이라 |
| [/insights/116](https://intellectualdata.webflow.io/insights/116) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 된거죠 | 된 거죠 | 유출 사고를 당하고, 국가 핵심 정보들이 다량 유출된거죠. 단순 ↵ 법령이 제정되던 시기에 써먹을 수 있는 기술만을 권고하는 것이 아니라,  |
| [/insights/116](https://intellectualdata.webflow.io/insights/116) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 보완하는거죠 | 보완하는 거죠 |  SALT나 Pepper를 사용해서 보안 취약성을 보완하는거죠. ↵ 두 방식의 차이는 개인마다 랜덤하게 생성되는 값으로 데이터베이스에 저장되는지( |
| [/insights/116](https://intellectualdata.webflow.io/insights/116) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 한다는거죠 | 한다는 거죠 |  ↵ 그래서 SALT나 Pepper를 함께 사용해야 한다는거죠. 과거 2012년, SALT를 추가하지 않은 해시값으로 비밀번호를 만들었다가 해 |
| [/insights/114](https://intellectualdata.webflow.io/insights/114) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 사용하는거죠 | 사용하는 거죠 | 사진을 크롤링, 딥페이크 음란물을 합성하는 용도로 사용하는거죠. 딱히 제약이 있는 것도 아닙니다. 아무나, 누구나 들어갈 수 있습니다. 비공개 |
| [/insights/114](https://intellectualdata.webflow.io/insights/114) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있었던거죠 | 있었던 거죠 | IP 등 개인정보가 유출되도록 해킹 코드가 심어져 있었던거죠. ↵ 이는 과거 N번방 가해자들의 범행 수법과 동일합니다. 딥페이크 가해자들도 별 |
| [/insights/114](https://intellectualdata.webflow.io/insights/114) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 아니라는거죠 | 아니라는 거죠 | 이 수치를 근거로 똑같은 주장을 폈습니다. 별 일 아니라는거죠. |
| [/newsroom/187](https://intellectualdata.webflow.io/newsroom/187) | sub-news-detail cms-detail__spacing section-padding / p | 전세계 | 전 세계 | rks도 함께 선보인다. Kiteworks는 이미 전세계 3,650개 글로벌 기업과 정부기관에서 사용하고 있는 데이터 보안 전송 솔루션으 |
| [/newsroom/523](https://intellectualdata.webflow.io/newsroom/523) | sub-news-detail cms-detail__spacing section-padding / p | 전세계 | 전 세계 | 는 KINPA 컨퍼런스는 매년 1,000명 이상의 전세계 지식재산(IP) 관계자가 참석하는 국내 최대 규모의 IP 행사로, 올해는 AI  |

## 문장 사이 공백 누락

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/insights/356](https://intellectualdata.webflow.io/insights/356) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 말했습니다.모의해킹을 | 말했습니다. 모의해킹을 | 발견하여 선관위에 개선 조치를 권고한 바 있다"고 말했습니다.모의해킹을 수행한 뒤 최악의 경우를 상정해서 개선 조치 보고서를 제출했다는 의미입니다. 그 |
| [/insights/256](https://intellectualdata.webflow.io/insights/256) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 되었습니다.특히 | 되었습니다. 특히 | 제안하면서 잠재적 위협성은 실체적 위협으로 변하게 되었습니다.특히 지난해 10월 팔레스타인 무장 정파 하마스와 이스라엘의 가자전쟁이 시작된 뒤 무 |
| [/insights/249](https://intellectualdata.webflow.io/insights/249) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 허용됩니다.또 | 허용됩니다. 또 | 를 보안/고객관리까지 넓히고 모바일 단말기 사용도 허용됩니다.또 가명화된 개인신용정보는 생성형 AI나 SaaS를 활용해 처리할 수 있도록 했습니 |
| [/insights/236](https://intellectualdata.webflow.io/insights/236) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 반대입니다.예외적으로 | 반대입니다. 예외적으로 | 프랑스 같은 경우는 반대입니다.예외적으로 정당한 이유가 인정될 때만 직원대표조직과 사전협의를 거쳐 정보 주체에게 개별적으 |
| [/insights/115](https://intellectualdata.webflow.io/insights/115) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 허용됩니다.또 | 허용됩니다. 또 | 를 보안/고객관리까지 넓히고 모바일 단말기 사용도 허용됩니다.또 가명화된 개인신용정보는 생성형 AI나 SaaS를 활용해 처리할 수 있도록 했습니 |

## 과다 공백

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/board/Insights](https://intellectualdata.webflow.io/board/Insights) | p / section-micro-body regular text-body-invert | 이 뿐만 | 이뿐만 |  분석했습니다. 하지만 미국이 밝힌 중국의 공격은 이 뿐만이 아니었습니다. 미 연방수사국(FBI)이 중국의 사이버 공격… |
| [/page/TypingDNA](https://intellectualdata.webflow.io/page/TypingDNA) | sub-dna-principle bg-secondary / p / section-micro-body regular | Typing DNA® 는 | TypingDNA®는 | 기업의 End-Point에 무단 접속이 감지되면 Typing DNA® 는 그 즉시 접속을 차단할 뿐만 아니라 접속 시간과 접속 시도 프로그램 등 접속 시 |
| [/page/TypingDNA](https://intellectualdata.webflow.io/page/TypingDNA) | sub-dna-principle bg-secondary / p / section-head-body regular w-variant-d6167a22-0486-3422-c2a3-d825c590f954 | 보안 인증) 을 | 보안 인증)을 | factor authentication / 2단계 보안 인증) 을 제공하는 보안 솔루션입니다. 핸드폰과 같은 외부 기기나 추가적인 장치 없이도 훨 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-kite-solution / p / section-content-body regular text-body-invert | (FTP) 와 | (FTP)와 | File Transfer Protocol (FTP) 와 Secure File Transfer Protocol (SFTP)은 파일 전송  |
| [/page/Legal_System](https://intellectualdata.webflow.io/page/Legal_System) | sub-legal-functions / p / section-micro-body w-variant-b6beda23-bc30-42e9-2b90-abd6842b7eee regular | 끊임 없이 | 끊임없이 | 관리하고 업데이트 하는 것도 쉽지 않은 일입니다. 끊임 없이 서류를 찾아보며 계약 관리를 하지 않고도 간편하게 계약만기를 알림 받고 처리할  |
| [/en/page/Docusign](https://intellectualdata.webflow.io/en/page/Docusign) | section-23 / p / section-head-body regular | old problem:    inefficient | old problem: inefficient |  a brand-new solution to an old problem:    inefficient agreements cost you almost as much value as  |
| [/insights/393](https://intellectualdata.webflow.io/insights/393) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 있어서 까지 | 있어서까지 | 돌하게 된거죠. 프레임워크를 비롯해 데이터 관리에 있어서 까지 국제 공조, 조화가 시급한 과제가 되고 있는 상황입니다. |
| [/insights/381](https://intellectualdata.webflow.io/insights/381) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 이 뿐만 | 이뿐만 |  분석했습니다. 하지만 미국이 밝힌 중국의 공격은 이 뿐만이 아니었습니다. |
| [/insights/381](https://intellectualdata.webflow.io/insights/381) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 그 뿐만 | 그뿐만 | 그 뿐만이 아닙니다. 차기 백악관 국가안보 보좌관으로 지명된 마이크 왈츠 연방 하원의원은 |
| [/insights/359](https://intellectualdata.webflow.io/insights/359) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 손실 뿐만 | 손실뿐만 | 을 내렸습니다. 이처럼 기술 유출은 기업에 재정적 손실 뿐만 아니라 시장 신뢰도까지 훼손하는 결과를 초래합니다. |
| [/insights/350](https://intellectualdata.webflow.io/insights/350) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 그 뿐만 | 그뿐만 | 그 뿐만이 아닙니다. 비상계엄이 선포되기 직전부터 육군 특수전사령부와 수도방위사령부 군인 |
| [/insights/333](https://intellectualdata.webflow.io/insights/333) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 그 뿐만 | 그뿐만 | 아무런 저항 없이 시스템에 접속할 수 있었습니다. 그 뿐만 아니라 고객들이 거래소를 통해 빈번하게 거래할 때 내부 수수료를 물지 않기 위해 |
| [/insights/247](https://intellectualdata.webflow.io/insights/247) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 손실 뿐만 | 손실뿐만 | 버를 수동으로 재설정했으며 취소 승객에 대한 매출 손실 뿐만 아니라 하루에 수천만 달러의 보상금과 호텔 비용을 포함, 5억 달러의 손실을 입 |

## 표기 통일 권장

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/board/Insights](https://intellectualdata.webflow.io/board/Insights) | sub-insights / p / section-micro-body regular text-body | 국내기업 | 국내 기업 | 것도 쉽지 않습니다. 인텔렉추얼데이터는 오랜 기간 국내기업의 e디스커버리를 지원해 온 전문기업으로써 풍부한 실무 경험을 기반으로 실제 전자 |
| [/page/Reveal](https://intellectualdata.webflow.io/page/Reveal) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Relativity](https://intellectualdata.webflow.io/page/Relativity) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Relativity](https://intellectualdata.webflow.io/page/Relativity) | sub-rela-intro / p / section-head-body regular | 문서리뷰 | 문서 리뷰 | elativity®는 하나의 플랫폼에서 문서처리, 문서리뷰 및 데이터 분석 등 다양한 기능을 제공하는 만큼, 사용자의 숙련도와 전문성에 따 |
| [/page/TypingDNA](https://intellectualdata.webflow.io/page/TypingDNA) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/SessionGuardian](https://intellectualdata.webflow.io/page/SessionGuardian) | sub-sg-industry section-padding bg-secondary / p / section-micro-body regular | 문서리뷰 | 문서 리뷰 | SessionGuardian®의 신원 보증 기능은 문서리뷰, 소스코드 리뷰 및 민감한 법적 정보를 보호하기 위해 설계된 솔루션입니다. 미국 |
| [/page/Endpoint_Protector](https://intellectualdata.webflow.io/page/Endpoint_Protector) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Endpoint_Protector](https://intellectualdata.webflow.io/page/Endpoint_Protector) | sub-visual / p / section-head-body regular | 정보유출 | 정보 유출 | 정보유출 방지를 위한 End-point 보안 솔루션 |
| [/page/Nymi_Band](https://intellectualdata.webflow.io/page/Nymi_Band) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Nymi_Band](https://intellectualdata.webflow.io/page/Nymi_Band) | sub-nymi-feature / p / section-content-body regular text-body | 외부서버 | 외부 서버 | 생체데이터는 오직 Nymi® 밴드 자체에 저장되며 외부서버로 정보가 이관되지 않아 개인정보보호법 준수가 가능합니다. |
| [/page/Nymi_Band](https://intellectualdata.webflow.io/page/Nymi_Band) | sub-nymi-feature / p / section-content-body regular text-body | 업무지속성 | 업무 지속성 | 착용한 상태에서도 쉽고 빠른 비접촉식 인증을 통해 업무지속성을 유지하고 업무 효율성을 높입니다. |
| [/page/Nymi_Band](https://intellectualdata.webflow.io/page/Nymi_Band) | sub-nymi-feature / p / section-content-body regular text-body | 업무활용 | 업무 활용 | 어된 환경 내에서도 Nymi® 밴드를 통해 효율적 업무활용이 가능합니다. IP66 및 IP67 방수 등급, 폴리카보네이트 TPU 스트랩,  |
| [/page/ESG_Management](https://intellectualdata.webflow.io/page/ESG_Management) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Kiteworks](https://intellectualdata.webflow.io/page/Kiteworks) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Litera](https://intellectualdata.webflow.io/page/Litera) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Luminance](https://intellectualdata.webflow.io/page/Luminance) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Legal_System](https://intellectualdata.webflow.io/page/Legal_System) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Legal_System](https://intellectualdata.webflow.io/page/Legal_System) | sub-legal-problems / p / section-micro-body regular | 계약만기 | 계약 만기 | 서류를 찾아보며 계약 관리를 하지 않고도 간편하게 계약만기를 알림 받고 처리할 수 있다면 업무 효율이 높아질 것입니다. |
| [/page/Docusign](https://intellectualdata.webflow.io/page/Docusign) | sub-visual / p / cta-button__label | 도입문의 | 도입 문의 | 도입문의 |
| [/page/Data_Security](https://intellectualdata.webflow.io/page/Data_Security) | sub-ds-transfer sub-ai-adopt-process u-section-padding / p / section-head-body regular | 기업간 | 기업 간 | Kiteworks®와 같은 글로벌 솔루션을 활용해 기업간 계약서, 기업 데이터와 같이 보안성이 우수한 데이터 전송 시스템 구축을 도와드립 |
| [/page/Data_Security](https://intellectualdata.webflow.io/page/Data_Security) | sub-ds-transfer sub-ai-adopt-process u-section-padding / p / section-content-body regular text-body | 정보유출 | 정보 유출 | 기존의 종이서류 방식의 계약서는 정보유출, 분실, 위변조 등 위협에 노출되어 있습니다. 전자계약 시스템을 도입하면 계약  |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-ediscovery-sanction u-section-padding / p / section-content-body regular | 국내기업 | 국내 기업 | 해외 경쟁 기업들은 국내기업의 해외진출을 견제하려는 목적으로 소송 및 ITC 조사를 적극적으로 활용하는 경우 |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-intro-copy u-section-padding / p / section-content-subtitle semibold text-subtitle | 기업환경 | 기업 환경 | 국내 기업환경에 최적화된 데이터 처리 |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-intro-copy u-section-padding / h3 / section-content-title bold text-title | 진행과정 | 진행 과정 | INDA FullDiscovery® 진행과정 |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-intro-copy u-section-padding / p / section-content-subtitle semibold text-subtitle | 문서리뷰 | 문서 리뷰 | 소송비용을 가장 효과적으로 줄일 수 있는 문서리뷰 |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-intro-copy u-section-padding / p / section-content-body regular text-body | 국내기업 | 국내 기업 | 인텔렉추얼데이터는 국내기업의 주요 특징 중 하나인 DRM 처리 및 기업 자체개발 문서 처리에 대한 다양한  |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-intro-copy u-section-padding / p / section-content-body regular text-body | 자체개발 | 자체 개발 | 기업의 주요 특징 중 하나인 DRM 처리 및 기업 자체개발 문서 처리에 대한 다양한 사례와 경험을 기반으로 주도적인 대응을 지원합니다. |
| [/insights/345](https://intellectualdata.webflow.io/insights/345) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 정보유출 | 정보 유출 | 위가 공개한 '유형별 사이버 공격 현황'에 따르면 정보유출 시도, 비인가 접근 시도, 정보수집 시도, 시스템 권한 획득 시도, 악성코드 감 |
| [/insights/339](https://intellectualdata.webflow.io/insights/339) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 초기비용부담 | 초기 비용 부담 | 경우 아직은 직접 정보보호 인력을 제대로 갖추거나 초기비용부담이 큰 보안 솔루션을 직접 도입하기보단, 자체적으로 기본적인 보안이 된 업체를 활 |
| [/insights/305](https://intellectualdata.webflow.io/insights/305) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 국내기업 | 국내 기업 | 국내기업 대상 미국특허소송 피소의 70% 이상! 특허괴물 NPE가 뭐길래? |
| [/insights/261](https://intellectualdata.webflow.io/insights/261) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 국내기업 | 국내 기업 | 인텔렉추얼데이터는 오랜 기간 국내기업의 e디스커버리를 지원해 온 전문기업으로써 풍부한 실무 경험을 기반으로 실제 전자 |
| [/insights/261](https://intellectualdata.webflow.io/insights/261) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 기업환경 | 기업 환경 | 풍부한 e디스커버리 경험을 갖춘 것은 물론, 국내 기업환경에 대한 충분한 이해가 바탕이 되는 전문 파트너십을 찾는 것은 소송의 성패에 매우 |
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 국내기업 | 국내 기업 | 인텔렉추얼데이터는 오랜 기간 국내기업의 e디스커버리를 지원해 온 전문기업으로써 풍부한 실무 경험을 기반으로 실제 전자 |
| [/insights/258](https://intellectualdata.webflow.io/insights/258) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 기업환경 | 기업 환경 | 풍부한 e디스커버리 경험을 갖춘 것은 물론, 국내 기업환경에 대한 충분한 이해가 바탕이 되는 전문 파트너십을 찾는 것은 소송의 성패에 매우 |
| [/insights/240](https://intellectualdata.webflow.io/insights/240) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 정보유출 | 정보 유출 | 정보유출과 피해 방지를 위한 기본적인 대비책 |
| [/insights/196](https://intellectualdata.webflow.io/insights/196) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 국내기업 | 국내 기업 | iscovery는 국내와 관계없어 보이지만, 최근 국내기업들의 해외 진출이 증가하면서 해외에서 특허분쟁 등 민사 소송의 사례가 증가하고 있 |
| [/insights/192](https://intellectualdata.webflow.io/insights/192) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 정보유출 | 정보 유출 | 리함 속에 숨은 위협! 한 통의 이메일로 시작되는 정보유출 |
| [/insights/191](https://intellectualdata.webflow.io/insights/191) | sub-insights-detail sub-insights-detail__spacing section-padding / h1 / section-normal-title bold text-title-invert | 정보유출 | 정보 유출 | 리함 속에 숨은 위협! 한 통의 이메일로 시작되는 정보유출 |
| [/insights/190](https://intellectualdata.webflow.io/insights/190) | sub-insights-detail sub-insights-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 정보유출 | 정보 유출 | 리함 속에 숨은 위협! 한 통의 이메일로 시작되는 정보유출 |
| [/newsroom/160](https://intellectualdata.webflow.io/newsroom/160) | sub-news-detail cms-detail__spacing section-padding / h1 / section-normal-title bold text-title-invert | 국내기업 | 국내 기업 | 인텔렉추얼데이터, 국내기업에 이디스커버리 등 법률 서비스 본격 지원 |
| [/newsroom/161](https://intellectualdata.webflow.io/newsroom/161) | sub-news-detail cms-detail__spacing section-padding / p | 정보유출 | 정보 유출 | 체를 문서 리뷰 전 사전에 검사, 랜섬웨어·APT·정보유출 바이러스 보유 여부를 확인해 데이터 손실 및 유출 위험을 낮추는 역할을 한다. |
| [/newsroom/162](https://intellectualdata.webflow.io/newsroom/162) | sub-news-detail cms-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 국내기업 | 국내 기업 | 인텔렉추얼데이터, 국내기업에 이디스커버리 등 법률 서비스 본격 지원 |
| [/newsroom/162](https://intellectualdata.webflow.io/newsroom/162) | sub-news-detail cms-detail__spacing section-padding / p | 문서리뷰 | 문서 리뷰 | 해외소송, 자동차부품 기업의 해외 집단소송에 대한 문서리뷰 등 수많은 이디스커버리 프로젝트와 소송지원 서비스를 진행하며 발 빠른 성장을 이 |
| [/newsroom/162](https://intellectualdata.webflow.io/newsroom/162) | sub-news-detail cms-detail__spacing section-padding / p | 정보유출 | 정보 유출 | 를 문서 리뷰 전에 검사해 랜섬웨어 · APT · 정보유출 바이러스의 보유 여부를 확인함으로써 데이터 손실 및 유출 위험을 낮추는 역할을  |
| [/newsroom/173](https://intellectualdata.webflow.io/newsroom/173) | sub-news-detail cms-detail__spacing section-padding / p | 자체개발 | 자체 개발 | 설팅 경험을 보유한 인텔렉추얼데이터는 국내 기업의 자체개발 솔루션과 연동이 가능하도록 ‘도큐사인 이시그니쳐 API 스페셜리스트(Docusi |
| [/newsroom/306](https://intellectualdata.webflow.io/newsroom/306) | sub-news-detail cms-detail__spacing section-padding / h2 / section-micro-title bold text-title-invert | 국내기업 | 국내 기업 | 인텔렉추얼데이터, 국내기업에 이디스커버리 등 법률 서비스 본격 지원 |

## 별도 오탈자

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/en/board/Careers](https://intellectualdata.webflow.io/en/board/Careers) | u-section-padding / p / section-micro-body regular | upport for communication | Support for communication | upport for communication expenses and snacks, subscription to four ma |
| [/page/About_Us](https://intellectualdata.webflow.io/page/About_Us) | banner w-variant-eaa38fbe-596c-f4f1-a7ac-4f522952d01e / p / cta-button__label | 전문자 자문 받기 | 전문가 자문 받기 | 전문자 자문 받기 |
| [/en/page/Relativity](https://intellectualdata.webflow.io/en/page/Relativity) | sub-rela-stats / h3 / section-content-body regular text-body | Am Raw 200 | Am Law 200 | Firms in the Am Raw 200 ↵ Using Relativity® |
| [/page/Nymi_Band](https://intellectualdata.webflow.io/page/Nymi_Band) | sub-nymi-industries / p / section-head-body regular w-variant-d6167a22-0486-3422-c2a3-d825c590f954 | 복합한 보안 인증 | 복잡한 보안 인증 | 지속적인 보안성 유지가 필수적이지만 복합한 보안 인증 방식으로 인해 업무 효율성이 떨어지거나 교대 근무 등으로 인해 같은 업무 공간에 |
| [/en/page/Luminance](https://intellectualdata.webflow.io/en/page/Luminance) | sub-lumi-partner / p / section-micro-body regular | egal-Grade™ AI that understands | Legal-Grade™ AI that understands | egal-Grade™ AI that understands contracts in full context and retains negoti |
| [/insights/333](https://intellectualdata.webflow.io/insights/333) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 가능게한 | 가능하게 한 | 거래소는 보안키 값 하나만 알면 모든 자산 탈취를 가능게한 문제가 발생합니다.. 이를 벗어나고자 나온 것이 DEX(Decentralized |
| [/insights/255](https://intellectualdata.webflow.io/insights/255) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 인렉추얼데이터 | 인텔렉추얼데이터 |  도입, 활용되고 있습니다. 기업 보안 전문 기업 인렉추얼데이터는 Nymi의 국내 최초 공식 파트너사로써 국내 업무 환경에 적합한 Nymi 솔루 |
| [/insights/252](https://intellectualdata.webflow.io/insights/252) | sub-insights-detail sub-insights-detail__spacing section-padding / p | 인렉추얼데이터 | 인텔렉추얼데이터 |  도입, 활용되고 있습니다. 기업 보안 전문 기업 인렉추얼데이터는 Nymi의 국내 최초 공식 파트너사로써 국내 업무 환경에 적합한 Nymi 솔루 |

## 원문 확인 필요

| 페이지 | 위치 | 현재 문구 | 수정 제안 | 주변 문맥 |
|---|---|---|---|---|
| [/en/page/Luminance](https://intellectualdata.webflow.io/en/page/Luminance) | sub-lumi-partner / h2 / section-head-title bold section-title__title-text | [SB3] | 원문 편집 코멘트 표식인지 확인 후 삭제 | nce implementation in Korea [SB3] |
| [/page/eDiscovery](https://intellectualdata.webflow.io/page/eDiscovery) | sub-inda-numbers w-variant-fdb7f363-ecbb-aa30-9322-8475ac94822c u-section-padding / h3 / section-micro-subtitle | 운영1 | 운영 (숫자 1이 각주인지 확인 후 삭제) | 한국·미국 데이터센터 운영1 |
| [/page/Data_Analytics](https://intellectualdata.webflow.io/page/Data_Analytics) | sub-inda-numbers u-section-padding / h3 / section-micro-subtitle | 운영1 | 운영 (숫자 1이 각주인지 확인 후 삭제) | 한국·미국 데이터센터 운영1 |
| [/page/INDA_FullDiscovery](https://intellectualdata.webflow.io/page/INDA_FullDiscovery) | sub-inda-numbers u-section-padding / h3 / section-micro-subtitle | 운영1 | 운영 (숫자 1이 각주인지 확인 후 삭제) | 한국·미국 데이터센터 운영1 |
| [/](https://intellectualdata.webflow.io/) | main-num / p / section-micro-title text-title | 운영1 | 운영 (숫자 1이 각주인지 확인 후 삭제) | 한국·미국 데이터센터 운영1 |
| [/en/](https://intellectualdata.webflow.io/en/) | main-num / p / section-micro-title text-title | 운영1 | 운영 (숫자 1이 각주인지 확인 후 삭제) | 한국·미국 데이터센터 운영1 |

## 영문 경로의 국문 잔여 확인 후보

띄어쓰기 오류와는 별개다. 원래 국문을 병기하려는 영역이면 유지한다. 전체 번역 교정은 수행하지 않았다.

| 페이지 | 현재 문구 예시 | 확인 방향 |
|---|---|---|
| [/en/401](https://intellectualdata.webflow.io/en/401) | 비공개 자료실 / 안내받으신 비밀번호를 입력해 주세요. / 비밀번호 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/search-results](https://intellectualdata.webflow.io/en/search-results) | 사이트 검색 / Intellectual Data의 서비스, 솔루션, 인사이트와 회사 정보를 통합 검색합니다. / 서비스명, 솔루션명, 주제로 검색 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/board/Careers](https://intellectualdata.webflow.io/en/board/Careers) | 현재 진행 중인 공고가 없습니다. | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/board/Insights](https://intellectualdata.webflow.io/en/board/Insights) | 전문가가 분석한 최신 업계 동향과 인사이트를 확인하세요. / 전문가 자문 받기 / 데이터, 비즈니스, 기업보안에 이르기까지 인텔렉추얼데이터의 전문가들이 이야기하는 최신의 정보와 의견을 확인해보세요. | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/Contact_Us](https://intellectualdata.webflow.io/en/page/Contact_Us) | eDiscovery부터 다양한 글로벌 솔루션까지, 각 분야의 전문가들과 빠르게 상담하세요. / 문의 종류를 선택해 주세요. | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/About_Us](https://intellectualdata.webflow.io/en/page/About_Us) | 대한민국 eDiscovery의 절대적 기준 / 대한민국 최고의 eDiscovery 전문 기업입니다. / 인텔렉추얼데이터는 한국 기업에 대한 깊은 이해력, ↵ 글로벌 역량, 고도화된 기술력을 바탕으로 대한민국 기업의 글로벌 성공을 돕습니다. | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/SessionGuardian](https://intellectualdata.webflow.io/en/page/SessionGuardian) | 사용할 기기의 위험성 확인 / 네트워크(IP/VPN)에 따른 사용 제한 / 지리적 위치에 따른 사용 제한 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/Luminance](https://intellectualdata.webflow.io/en/page/Luminance) | 기업 계약 특화 글로벌 리걸 AI 솔루션 / Providing consultancy to in-house teams throughout the entire implementation process. ↵ 고객사  / Delivering dedicated local support in Korean, ensuring your organization receives accurate | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/Docusign](https://intellectualdata.webflow.io/en/page/Docusign) | 글로벌 전자서명 및 계약관리 솔루션 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/AI](https://intellectualdata.webflow.io/en/page/AI) | 기업용 AI 도입 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/page/eDiscovery](https://intellectualdata.webflow.io/en/page/eDiscovery) | 국내 기업들의 해외 진출이 증가하면서 해외 기업들로부터 특허침해 등의 소송을 당하는 분쟁 사례가 증가하고 있습니다. 해외 기업들은 국내 기업의 해외진출을 견제하려 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/release-notes](https://intellectualdata.webflow.io/en/release-notes) | 주요 솔루션의 신규 기능, 업데이트와 버그 수정 내역을 확인하세요. / 전문가 자문 받기 / 조건에 맞는 Release Note가 없습니다. | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
| [/en/](https://intellectualdata.webflow.io/en/) | 우리는 국내 최초의 / 전문 한국 기업입니다 / 국내 4대 그룹사 및 주요 기업 ↵ 케이스 수행 | 국문 병기 의도가 아니라면 해당 영문 locale 문구로 교체 |
## 페이지별 점검 목록

발견 없음은 위 검사에서 확정한 항목이 없다는 뜻이며 완전 무오류 보장은 아니다.

| 경로 | HTTP | 발견 항목 |
|---|---:|---:|
| /LPO | 200 | 0 |
| /en/LPO | 200 | 1 |
| /search | 200 | 0 |
| /en/search | 200 | 0 |
| /401 | 200 | 0 |
| /en/401 | 200 | 0 |
| /private-resources | 401 | 0 |
| /en/private-resources | 401 | 0 |
| /search-results | 200 | 0 |
| /en/search-results | 200 | 0 |
| /board/Careers | 200 | 2 |
| /en/board/Careers | 200 | 1 |
| /board/Newsroom | 200 | 1 |
| /en/board/Newsroom | 200 | 0 |
| /board/Insights | 200 | 4 |
| /en/board/Insights | 200 | 0 |
| /page/Contact_Us | 200 | 0 |
| /en/page/Contact_Us | 200 | 0 |
| /page/Locations | 200 | 0 |
| /en/page/Locations | 200 | 0 |
| /page/About_Us | 200 | 2 |
| /en/page/About_Us | 200 | 1 |
| /page/Reveal | 200 | 7 |
| /en/page/Reveal | 200 | 2 |
| /page/Relativity | 200 | 2 |
| /en/page/Relativity | 200 | 1 |
| /page/TypingDNA | 200 | 4 |
| /en/page/TypingDNA | 200 | 0 |
| /page/SessionGuardian | 200 | 7 |
| /en/page/SessionGuardian | 200 | 0 |
| /page/Endpoint_Protector | 200 | 2 |
| /en/page/Endpoint_Protector | 200 | 0 |
| /page/Nymi_Band | 200 | 5 |
| /en/page/Nymi_Band | 200 | 0 |
| /page/ESG_Management | 200 | 1 |
| /en/page/ESG_Management | 200 | 0 |
| /page/Kiteworks | 200 | 9 |
| /en/page/Kiteworks | 200 | 1 |
| /page/Litera | 200 | 1 |
| /en/page/Litera | 200 | 0 |
| /page/Luminance | 200 | 1 |
| /en/page/Luminance | 200 | 2 |
| /page/Legal_System | 200 | 3 |
| /en/page/Legal_System | 200 | 0 |
| /page/Docusign | 200 | 1 |
| /en/page/Docusign | 200 | 1 |
| /page/AI | 200 | 0 |
| /en/page/AI | 200 | 0 |
| /page/NCT | 200 | 0 |
| /en/page/NCT | 200 | 0 |
| /page/Data_Security | 200 | 2 |
| /en/page/Data_Security | 200 | 1 |
| /page/K_Discovery | 200 | 1 |
| /en/page/K_Discovery | 200 | 0 |
| /page/eDiscovery | 200 | 7 |
| /en/page/eDiscovery | 200 | 0 |
| /page/Data_Analytics | 200 | 2 |
| /en/page/Data_Analytics | 200 | 1 |
| /page/INDA_FullDiscovery | 200 | 7 |
| /en/page/INDA_FullDiscovery | 200 | 0 |
| /terms-of-use | 200 | 0 |
| /en/terms-of-use | 200 | 0 |
| /privacy-policy-cookie-policy | 200 | 0 |
| /en/privacy-policy-cookie-policy | 200 | 0 |
| /release-notes | 200 | 0 |
| /en/release-notes | 200 | 0 |
| / | 200 | 2 |
| /en/ | 200 | 1 |
| /insights/career-interview-ediscovery-project-manager | 200 | 0 |
| /insights/393 | 200 | 4 |
| /insights/381 | 200 | 3 |
| /insights/373 | 200 | 0 |
| /insights/366 | 200 | 2 |
| /insights/364 | 200 | 1 |
| /insights/360 | 200 | 2 |
| /insights/359 | 200 | 1 |
| /insights/356 | 200 | 4 |
| /insights/354 | 200 | 0 |
| /insights/350 | 200 | 3 |
| /insights/348 | 200 | 0 |
| /insights/345 | 200 | 1 |
| /insights/344 | 200 | 0 |
| /insights/339 | 200 | 1 |
| /insights/337 | 200 | 1 |
| /insights/333 | 200 | 3 |
| /insights/329 | 200 | 2 |
| /insights/327 | 200 | 0 |
| /insights/325 | 200 | 0 |
| /insights/324 | 200 | 0 |
| /insights/318 | 200 | 0 |
| /insights/369 | 200 | 0 |
| /insights/310 | 200 | 0 |
| /insights/314 | 200 | 0 |
| /insights/312 | 200 | 2 |
| /insights/305 | 200 | 1 |
| /insights/300 | 200 | 3 |
| /insights/297 | 200 | 1 |
| /insights/261 | 200 | 3 |
| /insights/260 | 200 | 0 |
| /insights/259 | 200 | 0 |
| /insights/262 | 200 | 2 |
| /insights/258 | 200 | 6 |
| /insights/257 | 200 | 0 |
| /insights/255 | 200 | 1 |
| /insights/254 | 200 | 0 |
| /insights/253 | 200 | 4 |
| /insights/256 | 200 | 1 |
| /insights/252 | 200 | 4 |
| /insights/251 | 200 | 4 |
| /insights/250 | 200 | 0 |
| /insights/249 | 200 | 1 |
| /insights/248 | 200 | 4 |
| /insights/247 | 200 | 4 |
| /insights/246 | 200 | 0 |
| /insights/245 | 200 | 0 |
| /insights/244 | 200 | 1 |
| /insights/243 | 200 | 2 |
| /insights/242 | 200 | 1 |
| /insights/241 | 200 | 1 |
| /insights/240 | 200 | 2 |
| /insights/239 | 200 | 0 |
| /insights/238 | 200 | 0 |
| /insights/237 | 200 | 0 |
| /insights/236 | 200 | 3 |
| /insights/235 | 200 | 1 |
| /insights/234 | 200 | 1 |
| /insights/233 | 200 | 2 |
| /insights/230 | 200 | 0 |
| /insights/232 | 200 | 4 |
| /insights/231 | 200 | 0 |
| /insights/229 | 200 | 1 |
| /insights/199 | 200 | 0 |
| /insights/198 | 200 | 0 |
| /insights/197 | 200 | 0 |
| /insights/196 | 200 | 1 |
| /insights/195 | 200 | 0 |
| /insights/194 | 200 | 0 |
| /insights/193 | 200 | 0 |
| /insights/192 | 200 | 1 |
| /insights/191 | 200 | 3 |
| /insights/190 | 200 | 1 |
| /insights/189 | 200 | 0 |
| /insights/188 | 200 | 0 |
| /insights/116 | 200 | 4 |
| /insights/115 | 200 | 1 |
| /insights/114 | 200 | 3 |
| /insights/ai-ediscovery-heppner-warner | 200 | 0 |
| /newsroom/159 | 200 | 0 |
| /newsroom/160 | 200 | 1 |
| /newsroom/161 | 200 | 1 |
| /newsroom/162 | 200 | 3 |
| /newsroom/163 | 200 | 0 |
| /newsroom/164 | 200 | 0 |
| /newsroom/165 | 200 | 0 |
| /newsroom/166 | 200 | 0 |
| /newsroom/167 | 200 | 0 |
| /newsroom/168 | 200 | 0 |
| /newsroom/169 | 200 | 0 |
| /newsroom/170 | 200 | 0 |
| /newsroom/171 | 200 | 0 |
| /newsroom/172 | 200 | 0 |
| /newsroom/173 | 200 | 1 |
| /newsroom/174 | 200 | 0 |
| /newsroom/175 | 200 | 0 |
| /newsroom/176 | 200 | 0 |
| /newsroom/177 | 200 | 0 |
| /newsroom/178 | 200 | 0 |
| /newsroom/179 | 200 | 0 |
| /newsroom/180 | 200 | 0 |
| /newsroom/181 | 200 | 0 |
| /newsroom/182 | 200 | 0 |
| /newsroom/183 | 200 | 0 |
| /newsroom/184 | 200 | 0 |
| /newsroom/185 | 200 | 0 |
| /newsroom/186 | 200 | 0 |
| /newsroom/187 | 200 | 1 |
| /newsroom/306 | 200 | 1 |
| /newsroom/429 | 200 | 0 |
| /newsroom/446 | 200 | 0 |
| /newsroom/470 | 200 | 0 |
| /newsroom/509 | 200 | 0 |
| /newsroom/523 | 200 | 1 |
| /newsroom/560 | 200 | 0 |
| /newsroom/678 | 200 | 0 |
| /newsroom/691 | 200 | 0 |
| /newsroom/746 | 200 | 0 |
| /newsroom/760 | 200 | 0 |
| /newsroom/793 | 200 | 0 |
| /release-notes/test-attachment-download-02 | 200 | 0 |
| /release-notes/test-attachment-download-01 | 200 | 0 |
| /release-notes/docusign-iam-ai-web-form-generation | 200 | 0 |
| /release-notes/docusign-iam-clause-library | 200 | 0 |
| /release-notes/docusign-embedded-signing-url-domain-update | 200 | 0 |
| /release-notes/docusign-watermark-language-support | 200 | 0 |
| /careers-jobs/career-security-consultant | 200 | 0 |
| /careers-jobs/career-data-engineer | 200 | 0 |
| /careers-jobs/career-ediscovery-project-manager | 200 | 0 |
| /page/detail_insights | 404 | 0 |
| /en/insights/393 | 404 | 0 |
| /en/insights/381 | 404 | 0 |
| /en/insights/373 | 404 | 0 |
| /en/insights/366 | 404 | 0 |
| /en/insights/364 | 404 | 0 |
| /en/insights/360 | 404 | 0 |
| /en/insights/359 | 404 | 0 |
| /en/insights/356 | 404 | 0 |
| /en/insights/354 | 404 | 0 |
| /en/insights/350 | 404 | 0 |
| /en/insights/348 | 404 | 0 |
| /en/insights/345 | 404 | 0 |
| /en/insights/344 | 404 | 0 |
| /en/insights/339 | 404 | 0 |
| /en/insights/337 | 404 | 0 |
| /en/insights/333 | 404 | 0 |
| /en/insights/329 | 404 | 0 |
| /en/insights/327 | 404 | 0 |
| /en/insights/325 | 404 | 0 |
| /en/insights/324 | 404 | 0 |
| /en/insights/318 | 404 | 0 |
| /en/insights/369 | 404 | 0 |
| /en/insights/310 | 404 | 0 |
| /en/insights/314 | 404 | 0 |
| /en/insights/312 | 404 | 0 |
| /en/insights/305 | 404 | 0 |
| /en/insights/300 | 404 | 0 |
| /en/insights/297 | 404 | 0 |
| /en/insights/261 | 404 | 0 |
| /en/insights/260 | 404 | 0 |
| /en/insights/259 | 404 | 0 |
| /en/insights/262 | 404 | 0 |
| /en/insights/258 | 404 | 0 |
| /en/insights/257 | 404 | 0 |
| /en/insights/255 | 404 | 0 |
| /en/insights/254 | 404 | 0 |
| /en/insights/253 | 404 | 0 |
| /en/insights/256 | 404 | 0 |
| /en/insights/252 | 404 | 0 |
| /en/insights/251 | 404 | 0 |
| /en/insights/250 | 404 | 0 |
| /en/insights/249 | 404 | 0 |
| /en/insights/248 | 404 | 0 |
| /en/insights/247 | 404 | 0 |
| /en/insights/246 | 404 | 0 |
| /en/insights/245 | 404 | 0 |
| /en/insights/244 | 404 | 0 |
| /en/insights/243 | 404 | 0 |
| /en/insights/242 | 404 | 0 |
| /en/insights/241 | 404 | 0 |
| /en/insights/240 | 404 | 0 |
| /en/insights/239 | 404 | 0 |
| /en/insights/238 | 404 | 0 |
| /en/insights/237 | 404 | 0 |
| /en/insights/236 | 404 | 0 |
| /en/insights/235 | 404 | 0 |
| /en/insights/234 | 404 | 0 |
| /en/insights/233 | 404 | 0 |
| /en/insights/230 | 404 | 0 |
| /en/insights/232 | 404 | 0 |
| /en/insights/231 | 404 | 0 |
| /en/insights/229 | 404 | 0 |
| /en/insights/199 | 404 | 0 |
| /en/insights/198 | 404 | 0 |
| /en/insights/197 | 404 | 0 |
| /en/insights/196 | 404 | 0 |
| /en/insights/195 | 404 | 0 |
| /en/insights/194 | 404 | 0 |
| /en/insights/193 | 404 | 0 |
| /en/insights/192 | 404 | 0 |
| /en/insights/191 | 404 | 0 |
| /en/insights/190 | 404 | 0 |
| /en/insights/189 | 404 | 0 |
| /en/insights/188 | 404 | 0 |
| /en/insights/116 | 404 | 0 |
| /en/insights/115 | 404 | 0 |
| /en/insights/114 | 404 | 0 |
| /en/insights/ai-ediscovery-heppner-warner | 404 | 0 |
| /en/newsroom/159 | 404 | 0 |
| /en/newsroom/160 | 404 | 0 |
| /en/newsroom/161 | 404 | 0 |
| /en/newsroom/162 | 404 | 0 |
| /en/newsroom/163 | 404 | 0 |
| /en/newsroom/164 | 404 | 0 |
| /en/newsroom/165 | 404 | 0 |
| /en/newsroom/166 | 404 | 0 |
| /en/newsroom/167 | 404 | 0 |
| /en/newsroom/168 | 404 | 0 |
| /en/newsroom/169 | 404 | 0 |
| /en/newsroom/170 | 404 | 0 |
| /en/newsroom/171 | 404 | 0 |
| /en/newsroom/172 | 404 | 0 |
| /en/newsroom/173 | 404 | 0 |
| /en/newsroom/174 | 404 | 0 |
| /en/newsroom/175 | 404 | 0 |
| /en/newsroom/176 | 404 | 0 |
| /en/newsroom/177 | 404 | 0 |
| /en/newsroom/178 | 404 | 0 |
| /en/newsroom/179 | 404 | 0 |
| /en/newsroom/180 | 404 | 0 |
| /en/newsroom/181 | 404 | 0 |
| /en/newsroom/182 | 404 | 0 |
| /en/newsroom/183 | 404 | 0 |
| /en/newsroom/184 | 404 | 0 |
| /en/newsroom/185 | 404 | 0 |
| /en/newsroom/186 | 404 | 0 |
| /en/newsroom/187 | 404 | 0 |
| /en/newsroom/306 | 404 | 0 |
| /en/newsroom/429 | 404 | 0 |
| /en/newsroom/446 | 404 | 0 |
| /en/newsroom/470 | 404 | 0 |
| /en/newsroom/509 | 404 | 0 |
| /en/newsroom/523 | 404 | 0 |
| /en/newsroom/560 | 404 | 0 |
| /en/newsroom/678 | 404 | 0 |
| /en/newsroom/691 | 404 | 0 |
| /en/newsroom/746 | 404 | 0 |
| /en/newsroom/760 | 404 | 0 |
| /en/newsroom/793 | 404 | 0 |
| /en/release-notes/test-attachment-download-02 | 404 | 0 |
| /en/release-notes/test-attachment-download-01 | 404 | 0 |
| /en/release-notes/docusign-iam-ai-web-form-generation | 404 | 0 |
| /en/release-notes/docusign-iam-clause-library | 404 | 0 |
| /en/release-notes/docusign-embedded-signing-url-domain-update | 404 | 0 |
| /en/release-notes/docusign-watermark-language-support | 404 | 0 |
| /en/careers-jobs/career-security-consultant | 404 | 0 |
| /en/careers-jobs/career-data-engineer | 404 | 0 |
| /en/careers-jobs/career-ediscovery-project-manager | 404 | 0 |

## 접근 실패

| 경로 | 결과 |
|---|---|
| /private-resources | 401 |
| /en/private-resources | 401 |
| /page/detail_insights | 404 |
| /en/insights/393 | 404 |
| /en/insights/381 | 404 |
| /en/insights/373 | 404 |
| /en/insights/366 | 404 |
| /en/insights/364 | 404 |
| /en/insights/360 | 404 |
| /en/insights/359 | 404 |
| /en/insights/356 | 404 |
| /en/insights/354 | 404 |
| /en/insights/350 | 404 |
| /en/insights/348 | 404 |
| /en/insights/345 | 404 |
| /en/insights/344 | 404 |
| /en/insights/339 | 404 |
| /en/insights/337 | 404 |
| /en/insights/333 | 404 |
| /en/insights/329 | 404 |
| /en/insights/327 | 404 |
| /en/insights/325 | 404 |
| /en/insights/324 | 404 |
| /en/insights/318 | 404 |
| /en/insights/369 | 404 |
| /en/insights/310 | 404 |
| /en/insights/314 | 404 |
| /en/insights/312 | 404 |
| /en/insights/305 | 404 |
| /en/insights/300 | 404 |
| /en/insights/297 | 404 |
| /en/insights/261 | 404 |
| /en/insights/260 | 404 |
| /en/insights/259 | 404 |
| /en/insights/262 | 404 |
| /en/insights/258 | 404 |
| /en/insights/257 | 404 |
| /en/insights/255 | 404 |
| /en/insights/254 | 404 |
| /en/insights/253 | 404 |
| /en/insights/256 | 404 |
| /en/insights/252 | 404 |
| /en/insights/251 | 404 |
| /en/insights/250 | 404 |
| /en/insights/249 | 404 |
| /en/insights/248 | 404 |
| /en/insights/247 | 404 |
| /en/insights/246 | 404 |
| /en/insights/245 | 404 |
| /en/insights/244 | 404 |
| /en/insights/243 | 404 |
| /en/insights/242 | 404 |
| /en/insights/241 | 404 |
| /en/insights/240 | 404 |
| /en/insights/239 | 404 |
| /en/insights/238 | 404 |
| /en/insights/237 | 404 |
| /en/insights/236 | 404 |
| /en/insights/235 | 404 |
| /en/insights/234 | 404 |
| /en/insights/233 | 404 |
| /en/insights/230 | 404 |
| /en/insights/232 | 404 |
| /en/insights/231 | 404 |
| /en/insights/229 | 404 |
| /en/insights/199 | 404 |
| /en/insights/198 | 404 |
| /en/insights/197 | 404 |
| /en/insights/196 | 404 |
| /en/insights/195 | 404 |
| /en/insights/194 | 404 |
| /en/insights/193 | 404 |
| /en/insights/192 | 404 |
| /en/insights/191 | 404 |
| /en/insights/190 | 404 |
| /en/insights/189 | 404 |
| /en/insights/188 | 404 |
| /en/insights/116 | 404 |
| /en/insights/115 | 404 |
| /en/insights/114 | 404 |
| /en/insights/ai-ediscovery-heppner-warner | 404 |
| /en/newsroom/159 | 404 |
| /en/newsroom/160 | 404 |
| /en/newsroom/161 | 404 |
| /en/newsroom/162 | 404 |
| /en/newsroom/163 | 404 |
| /en/newsroom/164 | 404 |
| /en/newsroom/165 | 404 |
| /en/newsroom/166 | 404 |
| /en/newsroom/167 | 404 |
| /en/newsroom/168 | 404 |
| /en/newsroom/169 | 404 |
| /en/newsroom/170 | 404 |
| /en/newsroom/171 | 404 |
| /en/newsroom/172 | 404 |
| /en/newsroom/173 | 404 |
| /en/newsroom/174 | 404 |
| /en/newsroom/175 | 404 |
| /en/newsroom/176 | 404 |
| /en/newsroom/177 | 404 |
| /en/newsroom/178 | 404 |
| /en/newsroom/179 | 404 |
| /en/newsroom/180 | 404 |
| /en/newsroom/181 | 404 |
| /en/newsroom/182 | 404 |
| /en/newsroom/183 | 404 |
| /en/newsroom/184 | 404 |
| /en/newsroom/185 | 404 |
| /en/newsroom/186 | 404 |
| /en/newsroom/187 | 404 |
| /en/newsroom/306 | 404 |
| /en/newsroom/429 | 404 |
| /en/newsroom/446 | 404 |
| /en/newsroom/470 | 404 |
| /en/newsroom/509 | 404 |
| /en/newsroom/523 | 404 |
| /en/newsroom/560 | 404 |
| /en/newsroom/678 | 404 |
| /en/newsroom/691 | 404 |
| /en/newsroom/746 | 404 |
| /en/newsroom/760 | 404 |
| /en/newsroom/793 | 404 |
| /en/release-notes/test-attachment-download-02 | 404 |
| /en/release-notes/test-attachment-download-01 | 404 |
| /en/release-notes/docusign-iam-ai-web-form-generation | 404 |
| /en/release-notes/docusign-iam-clause-library | 404 |
| /en/release-notes/docusign-embedded-signing-url-domain-update | 404 |
| /en/release-notes/docusign-watermark-language-support | 404 |
| /en/careers-jobs/career-security-consultant | 404 |
| /en/careers-jobs/career-data-engineer | 404 |
| /en/careers-jobs/career-ediscovery-project-manager | 404 |
