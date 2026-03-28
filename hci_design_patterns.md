# AI 환각(Hallucination) 및 치명적 오류 완화를 위한 HCI / UX 디자인 패턴

AI가 생성하는 정보는 본질적으로 확률적(Probabilistic)이기 때문에, 잘못된 정보(Hallucination)나 출처를 제공할 수 있습니다. 특히 사용자 신뢰(Trust)가 중요한 도메인에서는 이러한 기술적 한계를 UX/UI 디자인 패턴으로 완화하고 '조정된 신뢰(Calibrated Trust)'를 구축하는 것이 매우 중요합니다.

법률 도메인뿐만 아니라 범용 AI 서비스 디자인에서도 널리 쓰이는 시도와 해결책은 다음과 같습니다.

## 1. 투명성과 설명 가능성 (Transparency & Explainability)
사용자가 AI의 판단 근거를 시각적으로 인지할 수 있도록 돕는 디자인입니다.
* **신뢰도 시각화 (Confidence Visualization):** AI가 내놓은 답변의 확신 정도를 색상(초록/노랑/빨강), 확률 바(Bar), 또는 텍스트("확실함", "가능성 있음", "불확실함")로 명시적으로 보여줍니다.
* **명확한 출처 표기 (Provenance & Data Sources):** 답변 문장마다 인용구(Citation) 마커를 달고, 클릭 시 원문 데이터나 링크가 팝업/사이드바 형태로 뜨도록 하여 사용자가 직접 교차 검증(Cross-validation)할 수 있게 합니다.
* **한계의 시각화 (Making Limits Visible):** 로딩 화면이나 빈 화면(Empty state)에서 "AI는 완벽하지 않으며 지속적으로 학습 중입니다"라는 문구를 빈번하게 노출하여 사용자의 맹신을 방지합니다.

## 2. 사용자 통제력 및 개입 (User Control & Agency)
AI가 모든 것을 결정하는 것이 아니라, 사용자가 개입하여 결과를 통제하고 수정할 수 있는 권한을 부여합니다.
왜곡의 많은 부분이 정확하게 지정하지 않은 프롬프트에서 발생한다. -> 프롬프트 가이던스. -> 마치 사람의 포트폴리오를 고르듯이 가시화. : 

* **피드백 루프 (Feedback Loops):** 답변 하단에 좋아요/싫어요(Thumbs up/down) 버튼뿐만 아니라, "이 출처는 틀렸습니다" 혹은 "더 나은 답변 입력하기" 기능을 제공하여 사용성을 공동 창작(Co-creation)의 영역으로 끌어들입니다.
* **조절 가능한 매개변수 (Adjustable Control):** 창의적인 답변을 원할지, 아니면 '사실 기반의 보수적인 답변(Strict/Grounded)'을 원할지 토글(Toggle)이나 슬라이더로 사용자가 직접 선택하게 합니다.
* **오버라이드 및 폴백 (Overrides & Fallback Options):** AI가 스스로 불확실성이 높다고 판단될 경우, 답변을 제시하는 대신 "이 내용은 복잡하여 인간 전문가의 검토가 필요합니다"라며 수동 모드로 전환하게 하거나 Undo(되돌리기) 옵션을 명확히 제공합니다. 

## 3. 답변의 프레이밍과 언어적 톤다운 (Clear Response Framing)
* **단정적 어조 피하기:** "이것은 A입니다." 대신 "제가 찾은 자료에 따르면 A일 가능성이 있습니다."와 같이 AI의 응답 형태(Framing) 자체를 확률적이고 겸손한 어조로 디자인합니다.
* **질문으로 되묻기 (Query Refinement):** 사용자의 입력이 애매하거나 AI가 환각을 일으킬 확률이 높은 모호한 쿼리일 경우, 섣불리 대답하지 않고 "혹시 A를 의미하시나요, 아니면 B를 의미하시나요?"라고 역으로 질문하는 UX를 채택합니다. (예: 다이얼로그 플로우 내의 Clarification Prompt)

## 4. 우아한 저하 및 오류 예측 (Designing for Uncertainty & Graceful Degradation)
* **오류의 기본값화 (Anticipating Errors):** '에러가 날 수 있음'을 기본 전제로 깔고 디자인합니다. 잘못된 출처 링크를 클릭했을 때 단순 404 창을 띄우는 대신, "AI가 생성한 링크가 끊어졌거나 유효하지 않습니다. 다음 키워드로 직접 재검색해보시겠어요?" 라는 대체 흐름(Fallback flow)을 제공합니다.

---
**요약:**
HCI 관점에서 AI의 환각을 해결하는 핵심은 **'AI의 완벽함을 연기하지 않는 것'**입니다. 모델의 불확실성을 UI로 투명하게 드러내고, 사용자가 언제든 AI의 결과를 검증하고 수정할 수 있는 권한을 주는 형태(Human-in-the-loop)의 디자인이 가장 효과적인 해결책으로 평가받고 있습니다.

## 💡 참고해볼 만한 실제 프로덕트 예시 (Reference Cases)
위에서 언급된 디자인 패턴들이 실제로 구현되어 있는 제품들입니다. 직접 접속해 보시면서 UX/UI를 참고해 보세요.

### 1. Perplexity AI (퍼플렉시티)
* **링크:** [https://www.perplexity.ai](https://www.perplexity.ai)
* **참고 포인트:** **투명성과 인용(Citation) UI의 교과서.** 답변을 시작하기 전 상단에 '어떤 출처들을 참고했는지'를 아이콘 형태로 명시하고, 생성된 텍스트 문장 끝마다 [1], [2] 와 같이 각주를 달아 클릭하면 원문 하이라이트 창이 뜹니다.

### 2. Google NotebookLM (노트북LM)
* **링크:** [https://notebooklm.google.com](https://notebooklm.google.com)
* **참고 포인트:** **사용자 통제력 및 Grounding(정보 제한) 패턴.** 오픈 도메인 검색이 아니라 사용자가 직접 업로드한 소스 문서들 내에서만 대답하도록 구조화했습니다. 답변 클릭 시 우측 패널에 원문의 정확한 라인과 문장을 하이라이트(스니펫) 해줍니다. 

### 3. Elicit (엘리싯)
* **링크:** [https://elicit.com](https://elicit.com)
* **참고 포인트:** **도메인 특화 데이터 시각화의 투명성.** 논문 분석에 특화된 AI로, 검색 결과를 뭉뚱그려 글로 요약하는 대신 "표(Table)" 형태로 데이터를 스크래핑해 보여줍니다. 정보의 누락이 있는지, 환각이 있는지 한눈에 표의 빈칸들로 검증(Verify)할 수 있도록 디자인되었습니다.

### 4. GitHub Copilot (깃허브 코파일럿 / IDE 인터페이스)
* **링크:** [https://github.com/features/copilot](https://github.com/features/copilot) (직접적인 체험은 VS Code 등에서 플러그인 설치)
* **참고 포인트:** **우아한 저하 및 제안(Suggestion) 프레이밍.** 코드를 '수정'하는 것이 아니라 회색 텍스트(Ghost Text)로 '제안'만 띄우며, 사용자가 `Tab`을 눌러 명시적으로 수락(Approval)해야만 반영되는 **Human-in-the-loop**의 완벽한 예시입니다. 확신이 없을 때는 여러 개의 대안(Alternatives) 탭을 띄워 사용자가 직접 취사선택하게 만듭니다.

멀티 에이전트 ai 오케스트레이션 
https://www.langchain.com

https://suprmind.ai/hub/

사용 정보/ui 예시
https://notebooklm.google.com/notebook/c03c7674-44e4-4dcf-823f-c2da06317f50