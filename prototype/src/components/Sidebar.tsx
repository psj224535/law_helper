import { Bot, Sparkles, MessageSquare } from 'lucide-react';

interface SidebarProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export function Sidebar({ selectedModel, onSelectModel }: SidebarProps) {
  const models = [
    { id: 'grok', name: 'Grok', icon: <Bot size={18} /> },
    { id: 'gemini', name: 'Gemini', icon: <Sparkles size={18} /> },
    { id: 'gpt', name: 'GPT', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="model-list">
        <div style={{ padding: '0 12px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          모델 선택
        </div>
        {models.map(model => (
          <div 
            key={model.id}
            className={`model-item ${selectedModel === model.id ? 'active' : ''}`}
            onClick={() => onSelectModel(model.id)}
          >
            {model.icon}
            <span>{model.name}</span>
            {selectedModel === model.id && (
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7ee787' }} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
