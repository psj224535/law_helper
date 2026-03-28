import { MessageData, CitationData } from '../types';

interface ChatAreaProps {
  messages: MessageData[];
  activeCitationId: string | null;
  onHoverCitation: (citation: CitationData) => void;
  onLeaveCitation: () => void;
  onClickCitation: (citation: CitationData) => void;
}

export function ChatArea({ 
  messages, 
  activeCitationId, 
  onHoverCitation, 
  onLeaveCitation,
  onClickCitation
}: ChatAreaProps) {
  
  return (
    <div className="chat-area">
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.role}`}>
          {msg.role === 'user' ? (
            <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              <span style={{ color: '#58a6ff', marginRight: '8px' }}>Q.</span>
              {msg.content as string}
            </div>
          ) : (
            <div>
              <span style={{ fontWeight: 600, color: '#ff7b72', marginRight: '8px', fontSize: '1.2rem' }}>Ans.</span>
              {Array.isArray(msg.content) ? (
                msg.content.map((part, i) => {
                  if (typeof part === 'string') {
                    return <span key={i}>{part}</span>;
                  } else {
                    const citation = part as CitationData;
                    const isActive = activeCitationId === citation.id;
                    return (
                      <span
                        key={i}
                        className={`citation ${citation.accuracy} ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => onHoverCitation(citation)}
                        onMouseLeave={onLeaveCitation}
                        onClick={() => onClickCitation(citation)}
                      >
                        {citation.text}
                      </span>
                    );
                  }
                })
              ) : (
                msg.content
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
