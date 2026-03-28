# 법 공부 도우미 참고용 오픈소스 프로젝트 요약

## 1. LawGlance
- URL: https://github.com/LawGlance/LawGlance
- 주요 참고 포인트:
  - RAG(검색 증강 생성) 기반 법률 어시스턴트 설계 아키텍처
  - 접근성이 높은 친화적 UI 구성 (Agentic AI 활용)
  - 헌법, 형법, 정보통신망법 등 특정 조문에 기반해 빠르고 정확한 판별 제공 방식

## 2. LegalLens (zainthecoder)
- URL: https://github.com/zainthecoder/LegalLens
- 주요 참고 포인트:
  - 프라이버시가 중요한 법률 문서 특성을 반영한 셀프 호스팅 지원 설계
  - 최신 기술 스택 활용: FastAPI(백엔드) + MongoDB + Svelte(프론트엔드) + OpenAI
  - 문서 업로드 시 의무 조항이나 리스크를 식별하는 컨텍스트 기반 추출(Extract) 로직

## 3. LegalNexus
- URL: https://github.com/daniel-debrun/LegalNexus
- 주요 참고 포인트:
  - 벡터 DB 기반 스토리지와 AI 추론 모델을 결합한 리서치 & 대시보드 구조
  - 높은 신뢰성 구축을 위한 자체 환각(Hallucination) 감지 도구 기능
  - 답변에 대한 정확한 출처(Citation/Reference) 및 평가(Grading) 구현 구조

## 4. OpenJustice.ai 관련 (OpenJustice.be)
- URL: https://github.com/openjusticebe
- 주요 참고 포인트:
  - 법률 데이터를 공유하고 AI와 연결하는 Data API 교환 구조
  - 다국어/글로벌 기반보다는 특정 도메인 맞춤 학습 데이터셋 수집 및 정제 시스템 구축 접근법