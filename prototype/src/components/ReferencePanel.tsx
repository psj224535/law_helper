import { CitationData } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface ReferencePanelProps {
  citation: CitationData | null;
  onClose: () => void;
}

export function ReferencePanel({ citation, onClose }: ReferencePanelProps) {
  if (!citation) return null;

  const { source, accuracy } = citation;

  // Split the fullText to render the highlighted matchText
  const parts = source.fullText.split(source.matchText);

  return (
    <div className="reference-panel glass-panel">
      <div className="ref-header">
        <div className="ref-title">
          <ExternalLink size={16} />
          {source.title}
        </div>
        <button className="ref-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <div className="ref-content">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className={`ref-highlight ${accuracy}`}>
                {source.matchText}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
