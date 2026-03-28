export type AccuracyLevel = 'high' | 'mid' | 'low';

export interface SourceDocument {
  id: string;
  title: string;
  fullText: string;
  matchText: string;
}

export interface CitationData {
  id: string;
  text: string;
  accuracy: AccuracyLevel;
  source: SourceDocument;
}

export interface MessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string | (string | CitationData)[];
}
