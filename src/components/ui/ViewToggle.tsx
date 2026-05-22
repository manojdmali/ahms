import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  value: 'grid' | 'list';
  onChange: (v: 'grid' | 'list') => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-white/70 border border-white/30 rounded-xl p-1 gap-1">
      <button
        onClick={() => onChange('grid')}
        title="Grid view"
        className={`p-1.5 rounded-lg transition-all ${value === 'grid' ? 'bg-green-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
      >
        <LayoutGrid size={15} />
      </button>
      <button
        onClick={() => onChange('list')}
        title="List view"
        className={`p-1.5 rounded-lg transition-all ${value === 'list' ? 'bg-green-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
      >
        <List size={15} />
      </button>
    </div>
  );
}
