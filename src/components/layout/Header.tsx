import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { METHODOLOGY_STAGES } from '../../data/mockData';

export function Header() {
  const { progress } = useStore();
  const currentStage = METHODOLOGY_STAGES[progress.currentStage - 1];

  return (
    <header className="sticky top-0 bg-bg-elevated/80 backdrop-blur-md border-b border-border z-40">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">XKOL</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-subtle rounded-full">
            <span className="text-xs text-text-tertiary">Stage {progress.currentStage}</span>
            <span className="text-xs font-medium text-text-primary">{currentStage?.nameZh}</span>
          </div>
          
          <button className="p-2 hover:bg-bg-subtle rounded-lg transition-colors">
            <Settings size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
