import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ReportCardProps {
  reportId: string;
  title: string;
  titleOdia: string;
  category: string;
  type: string;
  period: string;
  generatedDate: string;
  status: 'ready' | 'generating' | 'scheduled';
  downloads: number;
  views: number;
  metrics: {
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
  }[];
  onClick?: () => void;
}

export function ReportCard({
  reportId,
  title,
  titleOdia,
  category,
  type,
  period,
  generatedDate,
  status,
  downloads,
  views,
  metrics,
  onClick
}: ReportCardProps) {
  const { t, language } = useLanguage();

  // Display title based on current language
  const displayTitle = language === 'odia' ? titleOdia : title;

  const statusConfig = {
    ready: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Ready', 'तैयार', 'ପ୍ରସ୍ତୁତ') 
    },
    generating: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Clock, 
      label: t('Generating', 'जनरेट हो रहा है', 'ସୃଷ୍ଟି ହେଉଛି') 
    },
    scheduled: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      icon: AlertCircle, 
      label: t('Scheduled', 'निर्धारित', 'ନିର୍ଦ୍ଧାରିତ') 
    }
  };

  const categoryConfig: Record<string, { bg: string; icon: string }> = {
    livestock: { bg: 'bg-green-100 text-green-700', icon: '🐄' },
    health: { bg: 'bg-pink-100 text-pink-700', icon: '💉' },
    breeding: { bg: 'bg-purple-100 text-purple-700', icon: '🧬' },
    dairy: { bg: 'bg-cyan-100 text-cyan-700', icon: '🥛' },
    financial: { bg: 'bg-blue-100 text-blue-700', icon: '💰' },
    farmers: { bg: 'bg-amber-100 text-amber-700', icon: '👨‍🌾' },
    training: { bg: 'bg-indigo-100 text-indigo-700', icon: '📚' },
    schemes: { bg: 'bg-teal-100 text-teal-700', icon: '🏛️' },
    insurance: { bg: 'bg-orange-100 text-orange-700', icon: '🛡️' }
  };

  const StatusIcon = statusConfig[status].icon;
  const categoryStyle = categoryConfig[category] || categoryConfig['livestock'];

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp size={12} className="text-green-600" />;
    if (trend === 'down') return <TrendingDown size={12} className="text-red-600" />;
    return <Minus size={12} className="text-slate-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl p-4 sm:p-5 card-hover cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${categoryStyle.bg}`}>
              {categoryStyle.icon} <span className="hidden sm:inline capitalize">{category}</span>
            </span>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${statusConfig[status].bg} ${statusConfig[status].text} flex items-center gap-1`}>
              <StatusIcon size={12} />
              {statusConfig[status].label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Eye size={14} />
            <span className="font-mono">{views}</span>
          </div>
        </div>
      </div>

      {/* Title - ONLY display selected language */}
      <h4 className="text-slate-900 mb-3 line-clamp-2">{displayTitle}</h4>

      {/* Period & Type */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Calendar size={14} className="text-green-600" />
          <span>{period}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <BarChart3 size={14} className="text-blue-600" />
          <span className="capitalize">{type}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
        {metrics.slice(0, 4).map((metric, idx) => (
          <div key={idx} className="p-2 sm:p-3 bg-white/50 rounded-xl">
            <p className="text-xs text-slate-600 mb-1 line-clamp-1">{metric.label}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-sm sm:text-base font-mono font-medium text-slate-900">
                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              </p>
              {metric.change !== undefined && (
                <div className="flex items-center gap-0.5">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs font-mono ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-slate-400'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <FileText size={14} />
          <span className="font-mono">{reportId}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Download size={14} className="text-green-600" />
            <span className="font-mono">{downloads}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
          >
            <span>{t('View', 'देखें', 'ଦେଖନ୍ତୁ')}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
