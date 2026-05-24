import { motion } from 'motion/react';
import { Droplet, User, Calendar, Clock, Thermometer, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatDisplayDate } from '../../utils/dateFormat';

interface CollectionCardProps {
  collectionId: string;
  farmerName: string;
  farmerNameOdia: string;
  date: string;
  session: 'morning' | 'evening';
  quantity: number;
  fat: number;
  snf: number;
  quality: 'excellent' | 'good' | 'average' | 'poor';
  totalAmount: number;
  status: 'pending' | 'approved' | 'paid';
  onClick?: () => void;
}

export function CollectionCard({
  collectionId,
  farmerName,
  farmerNameOdia,
  date,
  session,
  quantity,
  fat,
  snf,
  quality,
  totalAmount,
  status,
  onClick
}: CollectionCardProps) {
  const { t, language } = useLanguage();

  // Display name based on current language
  const displayName = language === 'odia' ? farmerNameOdia : farmerName;

  const qualityConfig = {
    excellent: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: '⭐', 
      label: t('Excellent', 'उत्कृष्ट', 'ଉତ୍କୃଷ୍ଟ') 
    },
    good: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: '✓', 
      label: t('Good', 'अच्छा', 'ଭଲ') 
    },
    average: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      icon: '○', 
      label: t('Average', 'औसत', 'ହାରାହାରି') 
    },
    poor: { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      icon: '✗', 
      label: t('Poor', 'खराब', 'ଖରାପ') 
    }
  };

  const statusConfig = {
    pending: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      icon: AlertCircle, 
      label: t('Pending', 'लंबित', 'ବିଚାରାଧୀନ') 
    },
    approved: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: CheckCircle, 
      label: t('Approved', 'स्वीकृत', 'ଅନୁମୋଦିତ') 
    },
    paid: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Paid', 'भुगतान किया', 'ଦେୟ ଦିଆଯାଇଛି') 
    }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl p-5 card-hover cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-slate-900">{displayName}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs ${qualityConfig[quality].bg} ${qualityConfig[quality].text}`}>
              {qualityConfig[quality].icon} {qualityConfig[quality].label}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">ID: {collectionId}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-xl ${statusConfig[status].bg} flex items-center gap-1`}>
          <StatusIcon size={14} className={statusConfig[status].text} />
          <span className={`text-xs ${statusConfig[status].text}`}>{statusConfig[status].label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-xs text-slate-600">{formatDisplayDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            <span className="text-xs text-slate-600 capitalize flex items-center gap-1">
              {session === 'morning' ? '🌅' : '🌆'} {session}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-mono text-green-600 mb-1">{quantity.toFixed(2)}L</p>
          <p className="text-xs text-slate-500">Milk Collected</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-white/50 rounded-xl">
        <div className="text-center">
          <p className="text-xs text-slate-600 mb-1">Fat %</p>
          <p className="text-sm font-mono text-slate-900">{fat.toFixed(2)}%</p>
        </div>
        <div className="text-center border-x border-slate-200">
          <p className="text-xs text-slate-600 mb-1">SNF %</p>
          <p className="text-sm font-mono text-slate-900">{snf.toFixed(2)}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-600 mb-1">CLR</p>
          <p className="text-sm font-mono text-slate-900">{(fat + snf).toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div>
          <p className="text-xs text-slate-600">Payment Amount</p>
          <p className="text-lg font-mono text-green-600">₹{totalAmount.toFixed(2)}</p>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm">
          View Details →
        </button>
      </div>
    </motion.div>
  );
}
