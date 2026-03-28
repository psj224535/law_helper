import { GoogleGenerativeAI } from '@google/generative-ai';
import { CitationData, MessageData, AccuracyLevel } from './types';

// VITE 환경 변수에서 API 키 가져오기
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || 'MISSING_API_KEY');

const SYSTEM_INSTRUCTION = `
You are a legal assistant algorithm. The user will ask legal questions.
You must respond in a specific JSON array format so the frontend can render text and highlighted legal citations.
You must NOT return markdown. Return ONLY valid JSON.

Your response MUST be an array of objects. Each object represents a segment of your answer.
A segment is either plain text or a citation.

Format:
[
  { "type": "text", "content": "plain text of your explanation." },
  {
    "type": "citation",
    "text": "The summarized text indicating the law or precedent",
    "accuracy": "high" | "mid" | "low",
    "source": {
      "id": "unique-id",
      "title": "Title of the law or precedent (e.g., 민법 제548조)",
      "fullText": "The full exact text of the relevant law article or precedent used",
      "matchText": "The exact substring inside fullText that justifies your citation"
    }
  }
]

Accuracy guide:
- "high": Direct citation from a very relevant law or supreme court precedent (80%+ match)
- "mid": Interpretation or lower court precedent (60%+ match)
- "low": Broad principles or less certain connection (<60% match)

Example JSON:
[
  { "type": "text", "content": "네, 계약 해제 시에는 " },
  {
    "type": "citation",
    "text": "민법에 따라 반환할 금전에 이자를 가산해야 합니다.",
    "accuracy": "high",
    "source": {
      "id": "s1",
      "title": "민법 제548조 제2항",
      "fullText": "② 전항의 경우에 반환할 금전에는 그 받은 날로부터 이자를 가산하여야 한다.",
      "matchText": "반환할 금전에는 그 받은 날로부터 이자를 가산하여야 한다."
    }
  }
]

Make sure to provide rich legal answers by combining text and citation objects.
`;

export async function askGemini(question: string): Promise<MessageData['content']> {
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY가 설정되지 않았습니다. .env 파일에 API 키를 추가해주세요.');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(question);
    const textResp = result.response.text();
    
    // Parse the JSON array
    const parsed = JSON.parse(textResp);
    
    // Convert to our MessageData content format
    const content: MessageData['content'] = parsed.map((item: any, idx: number) => {
      if (item.type === 'text') {
        return item.content;
      } else if (item.type === 'citation') {
        const cit: CitationData = {
          id: `cit-${Date.now()}-${idx}`,
          text: item.text,
          accuracy: item.accuracy as AccuracyLevel,
          source: item.source
        };
        return cit;
      }
      return '';
    });

    return content;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
