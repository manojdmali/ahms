import { motion } from 'motion/react';
import { 
  FileText, 
  Calendar, 
  Users, 
  IndianRupee, 
  CheckCircle, 
  Clock,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SchemeCardProps {
  schemeId: string;
  name: string;
  nameOdia: string;
  category: string;
  description: string;
  subsidyAmount?: string;
  coverageAmount?: string;
  beneficiaries: number;
  status: 'active' | 'upcoming' | 'closed';
  applicationDeadline?: string;
  onClick?: () => void;
}

export function SchemeCard({
  schemeId,
  name,
  nameOdia,
  category,
  description,
  subsidyAmount,
  coverageAmount,
  beneficiaries,
  status,
  applicationDeadline,
  onClick
}: SchemeCardProps) {
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
    upcoming: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Clock, 
      label: t('Upcoming', 'आगामी', 'ଆଗାମୀ') 
    },
    closed: { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      icon: AlertCircle, 
      label: t('Closed', 'बंद', 'ବନ୍ଦ') 
    }
  };

  const categoryConfig: Record<string, { bg: string; icon: string }> = {
    subsidy: { bg: 'bg-green-100 text-green-700', icon: '💰' },
    insurance: { bg: 'bg-blue-100 text-blue-700', icon: '🛡️' },
    training: { bg: 'bg-purple-100 text-purple-700', icon: '📚' },
    infrastructure: { bg: 'bg-orange-100 text-orange-700', icon: '🏗️' },
    welfare: { bg: 'bg-pink-100 text-pink-700', icon: '❤️' },
    dairy: { bg: 'bg-cyan-100 text-cyan-700', icon: '🥛' }
  };

  const StatusIcon = statusConfig[status].icon;
  const categoryStyle = categoryConfig[category] || categoryConfig['subsidy'];

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

      {/* ID */}
      <p className="text-xs text-slate-500 font-mono mb-3">ID: {schemeId}</p>

      {/* Description */}
      <p className="text-sm text-slate-700 mb-4 line-clamp-2">{description}</p>

      {/* Key Info Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        {(subsidyAmount || coverageAmount) && (
          <div className="p-2 sm:p-3 bg-green-50 rounded-xl">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee size={14} className="text-green-600" />
              <p className="text-xs text-green-700">{t('Benefit', 'लाभ', 'ଲାଭ')}</p>
            </div>
            <p className="text-xs sm:text-sm font-medium text-green-900 line-clamp-1">
              {subsidyAmount || coverageAmount}
            </p>
          </div>
        )}
        
        <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-1 mb-1">
            <Users size={14} className="text-blue-600" />
            <p className="text-xs text-blue-700">{t('Beneficiaries', 'लाभार्थी', 'ଲାଭାର୍ଥୀ')}</p>
          </div>
          <p className="text-xs sm:text-sm font-medium text-blue-900">
            {beneficiaries.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Deadline Warning */}
      {applicationDeadline && status === 'active' && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-amber-600" />
            <div>
              <p className="text-xs text-amber-700">{t('Application Deadline', 'आवेदन की अंतिम तिथि', 'ଆବେଦନ ଶେଷ ତାରିଖ')}</p>
              <p className="text-sm font-medium text-amber-900">
                {new Date(applicationDeadline).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <FileText size={12} />
          <span>{t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')}</span>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          {t('Apply Now', 'अभी आवेदन करें', 'ବର୍ତ୍ତମାନ ଆବେଦନ କରନ୍ତୁ')} →
        </button>
      </div>
    </motion.div>
  );
}
