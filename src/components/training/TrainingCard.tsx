import { motion } from 'motion/react';
import { 
  Calendar,
  Clock,
  Users,
  IndianRupee,
  MapPin,
  Star,
  Award,
  CheckCircle,
  TrendingUp,
  Video,
  BookOpen,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TrainingCardProps {
  trainingId: string;
  title: string;
  titleOdia: string;
  category: string;
  type: 'online' | 'offline' | 'hybrid';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  organization: string;
  startDate: string;
  fees: number;
  netFees: number;
  subsidy: number;
  seatsAvailable: number;
  seatsTotal: number;
  rating: number;
  reviews: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'registration-open';
  certification: boolean;
  onClick?: () => void;
  onRegister?: (e: React.MouseEvent) => void;
}

export function TrainingCard({
  trainingId,
  title,
  titleOdia,
  category,
  type,
  duration,
  level,
  instructor,
  organization,
  startDate,
  netFees,
  subsidy,
  seatsAvailable,
  seatsTotal,
  rating,
  reviews,
  status,
  certification,
  onClick,
  onRegister
}: TrainingCardProps) {
  const { t, language } = useLanguage();

  // Display title based on current language
  const displayTitle = language === 'odia' ? titleOdia : title;

  const statusConfig = {
    'registration-open': { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Open', 'खुला', 'ଖୋଲା') 
    },
    'upcoming': { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Clock, 
      label: t('Upcoming', 'आगामी', 'ଆଗାମୀ') 
    },
    'ongoing': { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      icon: TrendingUp, 
      label: t('Ongoing', 'चालू', 'ଚାଲୁଛି') 
    },
    'completed': { 
      bg: 'bg-gray-50', 
      text: 'text-gray-700', 
      icon: Award, 
      label: t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ') 
    }
  };

  const categoryConfig: Record<string, { bg: string; icon: string }> = {
    technical: { bg: 'bg-blue-100 text-blue-700', icon: '⚙️' },
    management: { bg: 'bg-green-100 text-green-700', icon: '📊' },
    healthcare: { bg: 'bg-pink-100 text-pink-700', icon: '🏥' },
    breeding: { bg: 'bg-purple-100 text-purple-700', icon: '🧬' },
    dairy: { bg: 'bg-cyan-100 text-cyan-700', icon: '🥛' },
    entrepreneurship: { bg: 'bg-amber-100 text-amber-700', icon: '💼' }
  };

  const levelConfig = {
    beginner: { 
      bg: 'bg-green-100 text-green-700', 
      label: t('Beginner', 'शुरुआती', 'ଆରମ୍ଭକର୍ତ୍ତା') 
    },
    intermediate: { 
      bg: 'bg-blue-100 text-blue-700', 
      label: t('Intermediate', 'मध्यवर्ती', 'ମଧ୍ୟବର୍ତ୍ତୀ') 
    },
    advanced: { 
      bg: 'bg-purple-100 text-purple-700', 
      label: t('Advanced', 'उन्नत', 'ଉନ୍ନତ') 
    }
  };

  const typeIcons = {
    online: Video,
    offline: MapPin,
    hybrid: Globe
  };

  const StatusIcon = statusConfig[status].icon;
  const TypeIcon = typeIcons[type];
  const categoryStyle = categoryConfig[category] || categoryConfig['technical'];
  const levelStyle = levelConfig[level];

  const seatsFilling = ((seatsTotal - seatsAvailable) / seatsTotal) * 100;

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
              {categoryStyle.icon} <span className="hidden sm:inline">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </span>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${levelStyle.bg}`}>
              {levelStyle.label}
            </span>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs flex items-center gap-1 ${statusConfig[status].bg} ${statusConfig[status].text}`}>
              <StatusIcon size={12} />
              {statusConfig[status].label}
            </span>
          </div>
        </div>
      </div>

      {/* Title - ONLY display selected language */}
      <h4 className="text-slate-900 mb-3 line-clamp-2">{displayTitle}</h4>

      {/* Instructor & Organization */}
      <div className="mb-3 pb-3 border-b border-slate-200">
        <p className="text-sm text-slate-700 mb-1 line-clamp-1">{instructor}</p>
        <p className="text-xs text-slate-600 line-clamp-1">{organization}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <TypeIcon size={14} className="text-green-600 flex-shrink-0" />
          <span className="capitalize text-xs sm:text-sm">{t(type, type === 'online' ? 'ऑनलाइन' : type === 'offline' ? 'ऑफलाइन' : 'हाइब्रिड', type === 'online' ? 'ଅନଲାଇନ୍' : type === 'offline' ? 'ଅଫଲାଇନ୍' : 'ହାଇବ୍ରିଡ୍')}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Clock size={14} className="text-blue-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm line-clamp-1">{duration.split('(')[0]}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Calendar size={14} className="text-purple-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm">
            {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Users size={14} className="text-amber-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{seatsAvailable}/{seatsTotal}</span>
        </div>
      </div>

      {/* Seats Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
          <span>{t('Seats Filling', 'सीटें भर रहीं', 'ସିଟ୍ ଭର୍ତ୍ତି')}</span>
          <span className="font-mono">{seatsFilling.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${
              seatsFilling > 75 ? 'bg-red-500' : seatsFilling > 50 ? 'bg-amber-500' : 'bg-green-500'
            }`}
            style={{ width: `${seatsFilling}%` }}
          />
        </div>
      </div>

      {/* Price & Features */}
      <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
        <div className="flex items-baseline gap-2 mb-1">
          <IndianRupee size={16} className="text-green-600" />
          <span className="text-xl sm:text-2xl font-mono font-medium text-green-900">
            {netFees.toLocaleString()}
          </span>
          <span className="text-xs text-green-700">{t('after', 'के बाद', 'ପରେ')} {subsidy}% {t('subsidy', 'सब्सिडी', 'ସବସିଡି')}</span>
        </div>
        {certification && (
          <div className="flex items-center gap-1 text-xs text-green-700 mt-1">
            <Award size={12} />
            <span>{t('Certificate included', 'प्रमाणपत्र शामिल', 'ପ୍ରମାଣପତ୍ର ଅନ୍ତର୍ଭୁକ୍ତ')}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium text-slate-900">{rating}</span>
            <span className="text-xs text-slate-600">({reviews})</span>
          </div>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
            <span>{t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')}</span>
            <span>→</span>
          </button>
        </div>

        {/* Register Button */}
        {status === 'registration-open' && seatsAvailable > 0 && onRegister && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister(e);
            }}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
          >
            {t('Register Now', 'अभी पंजीकरण करें', 'ବର୍ତ୍ତମାନ ପଞ୍ଜୀକରଣ କରନ୍ତୁ')}
          </button>
        )}
      </div>
    </motion.div>
  );
}
