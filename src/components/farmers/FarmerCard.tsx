import { motion } from 'motion/react';
import { User, MapPin, Phone, Beef, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FarmerCardProps {
  id: string;
  farmerId: string;
  name: string;
  nameOdia: string;
  contact: string;
  village: string;
  block: string;
  totalLivestock: number;
  livestock: {
    cattle: number;
    buffalo: number;
    goat: number;
    sheep: number;
    poultry: number;
  };
  kycStatus: string;
  insuranceStatus: string;
  schemes: string[];
  onClick?: () => void;
}

export function FarmerCard({
  farmerId,
  name,
  nameOdia,
  contact,
  village,
  block,
  totalLivestock,
  livestock,
  kycStatus,
  insuranceStatus,
  schemes,
  onClick
}: FarmerCardProps) {
  const { t, language } = useLanguage();

  // Display name based on current language
  const displayName = language === 'odia' ? nameOdia : name;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl p-4 sm:p-6 card-hover cursor-pointer"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Farmer Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 flex items-center justify-center">
          <User className="text-green-600" size={28} />
        </div>

        {/* Farmer Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-slate-900 truncate">{displayName}</h3>
                {kycStatus === 'Verified' && (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <CheckCircle size={12} />
                    {t('Verified', 'सत्यापित', 'ଯାଞ୍ଚିତ')}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono">ID: {farmerId}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="truncate">{village}, {block}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} className="flex-shrink-0" />
              <span className="font-mono">{contact}</span>
            </div>
          </div>

          {/* Livestock Summary */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-600 flex items-center gap-1">
                <Beef size={14} />
                {t('Total Livestock', 'कुल पशुधन', 'ମୋଟ ପଶୁଧନ')}
              </span>
              <span className="text-xs font-mono text-slate-900">{totalLivestock} {t('animals', 'जानवर', 'ପଶୁ')}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {livestock.cattle > 0 && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded flex items-center gap-1">
                  <span>🐄</span>
                  <span>{livestock.cattle}</span>
                </span>
              )}
              {livestock.buffalo > 0 && (
                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded flex items-center gap-1">
                  <span>🐃</span>
                  <span>{livestock.buffalo}</span>
                </span>
              )}
              {livestock.goat > 0 && (
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded flex items-center gap-1">
                  <span>🐐</span>
                  <span>{livestock.goat}</span>
                </span>
              )}
              {livestock.sheep > 0 && (
                <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded flex items-center gap-1">
                  <span>🐑</span>
                  <span>{livestock.sheep}</span>
                </span>
              )}
              {livestock.poultry > 0 && (
                <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded flex items-center gap-1">
                  <span>🐔</span>
                  <span>{livestock.poultry}</span>
                </span>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-1 rounded-full whitespace-nowrap ${
                insuranceStatus === 'Active' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-amber-50 text-amber-700'
              }`}>
                {insuranceStatus === 'Active' 
                  ? `✓ ${t('Insured', 'बीमित', 'ବୀମାଭୁକ୍ତ')}` 
                  : `⏳ ${t('Pending', 'लंबित', 'ବିଚାରାଧୀନ')}`}
              </span>
              <span className="text-slate-500 whitespace-nowrap">
                {schemes.length} {t('Schemes', 'योजनाएं', 'ଯୋଜନା')}
              </span>
            </div>
            <button className="text-green-600 hover:text-green-700 whitespace-nowrap">
              {t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')} →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
