import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  labelOdia?: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'secondary' | 'accent' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

export function StatCard({
  icon: Icon,
  label,
  labelOdia,
  value,
  change,
  trend = 'neutral',
  color = 'primary',
  actionLabel = 'View All',
  onAction
}: StatCardProps) {
  const colorClasses = {
    primary: 'from-green-500 to-green-600',
    secondary: 'from-orange-500 to-orange-600',
    accent: 'from-amber-500 to-amber-600',
    info: 'from-blue-500 to-blue-600'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
      onClick={onAction}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-mono ${trendColors[trend]}`}>
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '→'} {change}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <p className="text-slate-600 text-sm mb-1">{label}</p>
        {labelOdia && <p className="text-slate-500 text-xs font-odia">{labelOdia}</p>}
      </div>
      
      <p className="text-slate-900 font-mono mb-3">{value}</p>
      
      <button className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center gap-1">
        {actionLabel} <span>→</span>
      </button>
    </motion.div>
  );
}
