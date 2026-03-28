import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CitationLegend } from './components/CitationLegend';
import { ChatArea } from './components/ChatArea';
import { ReferencePanel } from './components/ReferencePanel';
import { MessageData, CitationData } from './types';
import { Search, Loader2 } from 'lucide-react';
import { askGemini } from './gemini';

const initialMessages: MessageData[] = [
  {
    id: 'intro',
    role: 'assistant',
    content: '안녕하세요! 저는 AI 법률 서포터입니다. 법과 관련된 질문을 입력해주시면 관련 법조문, 판례 등 출처와 함께 답변해 드립니다! (실제 동작을 위해서는 .env 파일에 VITE_GEMINI_API_KEY 설정이 필요합니다)'
  }
];

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);
  const [hoveredCitation, setHoveredCitation] = useState<CitationData | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [loading, setLoading] = useState(false);

  // The displayed citation is the hovered one, falling back to the clicked/locked one.
  const displayCitation = hoveredCitation || activeCitation;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() && !loading) {
      const question = searchValue.trim();
      setSearchValue('');
      
      // 사용자 메시지 추가
      const userMsg: MessageData = { id: Date.now().toString(), role: 'user', content: question };
      setMessages(prev => [...prev, userMsg]);
      setLoading(true);

      try {
        // Gemini API 호출
        const responseContent = await askGemini(question);
        
        // Assistant 메시지 추가
        const assistMsg: MessageData = { id: (Date.now() + 1).toString(), role: 'assistant', content: responseContent };
        setMessages(prev => [...prev, assistMsg]);
      } catch (error: any) {
        const errorMsg: MessageData = { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: `오류가 발생했습니다: ${error.message}`
        };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Sidebar selectedModel={selectedModel} onSelectModel={setSelectedModel} />
        <CitationLegend />
      </div>

      <div className="main-content glass-panel" style={{ position: 'relative' }}>
        <div className="search-header">
          <div className="search-input-wrapper">
            <Search size={20} color="var(--text-secondary)" />
            <input 
              className="search-input" 
              placeholder="Q. 법률 질문을 입력하세요... (Enter 키로 전송)" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            {loading && <Loader2 className="animate-spin" size={20} color="var(--text-secondary)" />}
          </div>
        </div>
        
        <ChatArea 
          messages={messages}
          activeCitationId={displayCitation?.id || null}
          onHoverCitation={setHoveredCitation}
          onLeaveCitation={() => setHoveredCitation(null)}
          onClickCitation={(cit) => {
            if (activeCitation?.id === cit.id) {
              setActiveCitation(null); // toggle off
            } else {
              setActiveCitation(cit);
            }
          }}
        />

        <ReferencePanel 
          citation={displayCitation} 
          onClose={() => {
            setActiveCitation(null);
            setHoveredCitation(null);
          }} 
        />
      </div>
    </div>
  );
}

export default App;
