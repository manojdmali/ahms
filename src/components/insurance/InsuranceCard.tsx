import { motion } from 'motion/react';
import { 
  Shield, 
  IndianRupee, 
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  Zap,
  Award
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface InsuranceCardProps {
  policyId: string;
  name: string;
  nameOdia: string;
  provider: string;
  category: string;
  coverageAmount: number;
  premiumAmount: number;
  netPremium: number;
  subsidyPercentage: number;
  activePolicies: number;
  claimSettlementRatio: number;
  status: 'active' | 'popular' | 'new';
  rating: number;
  reviews: number;
  onClick?: () => void;
}

export function InsuranceCard({
  policyId,
  name,
  nameOdia,
  provider,
  category,
  coverageAmount,
  netPremium,
  subsidyPercentage,
  activePolicies,
  claimSettlementRatio,
  status,
  rating,
  reviews,
  onClick
}: InsuranceCardProps) {
  const { t, language } = useLanguage();

  // Display name based on current language
  const displayName = language === 'odia' ? nameOdia : name;

  const statusConfig = {
    active: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Active', 'सक्रिय', 'ସକ୍ରିୟ') 
    },
    popular: { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      icon: TrendingUp, 
      label: t('Popular', 'लोकप्रिय', 'ଲୋକପ୍ରିୟ') 
    },
    new: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Zap, 
      label: t('New', 'नया', 'ନୂତନ') 
    }
  };

  const categoryConfig: Record<string, { bg: string; icon: string }> = {
    livestock: { bg: 'bg-green-100 text-green-700', icon: '🐄' },
    dairy: { bg: 'bg-blue-100 text-blue-700', icon: '🥛' },
    poultry: { bg: 'bg-amber-100 text-amber-700', icon: '🐔' },
    comprehensive: { bg: 'bg-purple-100 text-purple-700', icon: '🛡️' },
    health: { bg: 'bg-pink-100 text-pink-700', icon: '❤️' },
    accident: { bg: 'bg-red-100 text-red-700', icon: '⚠️' }
  };

  const StatusIcon = statusConfig[status].icon;
  const categoryStyle = categoryConfig[category] || categoryConfig['livestock'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl p-4 sm:p-5 card-hover cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${categoryStyle.bg}`}>
              {categoryStyle.icon} <span className="hidden sm:inline">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </span>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs flex items-center gap-1 ${statusConfig[status].bg} ${statusConfig[status].text}`}>
              <StatusIcon size={12} />
              {statusConfig[status].label}
            </span>
          </div>
          {/* Title - ONLY display selected language */}
          <h4 className="text-slate-900 mb-3 line-clamp-2">{displayName}</h4>
        </div>
      </div>

      {/* Provider & ID */}
      <div className="mb-4 pb-4 border-b border-slate-200">
        <p className="text-sm text-slate-700 mb-1">{provider}</p>
        <p className="text-xs text-slate-500 font-mono">Policy: {policyId}</p>
      </div>

      {/* Coverage & Premium Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-1 mb-1">
            <Shield size={14} className="text-green-600" />
            <p className="text-xs text-green-700">{t('Coverage', 'कवरेज', 'କଭରେଜ୍')}</p>
          </div>
          <p className="text-base sm:text-lg font-mono font-medium text-green-900">
            ₹{(coverageAmount / 1000).toFixed(0)}K
          </p>
        </div>
        
        <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-1 mb-1">
            <IndianRupee size={14} className="text-blue-600" />
            <p className="text-xs text-blue-700">{t('Net Premium', 'शुद्ध प्रीमियम', 'ନିଟ୍ ପ୍ରିମିୟମ୍')}</p>
          </div>
          <p className="text-base sm:text-lg font-mono font-medium text-blue-900">
            ₹{netPremium.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Subsidy Badge */}
      <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-amber-600" />
            <span className="text-sm text-amber-900 font-medium">{subsidyPercentage}% {t('Subsidy', 'सब्सिडी', 'ସବସିଡି')}</span>
          </div>
          <span className="text-xs text-amber-700">{t('by Govt.', 'सरकार द्वारा', 'ସରକାରଙ୍କ ଦ୍ୱାରା')}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="p-2 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <p className="text-sm font-medium text-slate-900">{rating}</p>
          </div>
          <p className="text-xs text-slate-600">{reviews} {t('reviews', 'समीक्षा', 'ସମୀକ୍ଷା')}</p>
        </div>
        
        <div className="p-2 bg-white/50 rounded-lg">
          <p className="text-sm font-medium text-slate-900 mb-1">{claimSettlementRatio}%</p>
          <p className="text-xs text-slate-600">{t('Settlement', 'निपटान', 'ସମାଧାନ')}</p>
        </div>
        
        <div className="p-2 bg-white/50 rounded-lg">
          <p className="text-sm font-medium text-slate-900 mb-1">{activePolicies.toLocaleString()}</p>
          <p className="text-xs text-slate-600">{t('Active', 'सक्रिय', 'ସକ୍ରିୟ')}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Clock size={12} />
          <span className="hidden sm:inline">{t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')}</span>
          <span className="sm:hidden">{t('Details', 'विवरण', 'ବିବରଣୀ')}</span>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          {t('Get Quote', 'कोट प्राप्त करें', 'କୋଟ୍ ପାଆନ୍ତୁ')} →
        </button>
      </div>
    </motion.div>
  );
}
