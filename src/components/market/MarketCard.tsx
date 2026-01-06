import { motion } from 'motion/react';
import { 
  MapPin, 
  IndianRupee, 
  Phone,
  Star,
  CheckCircle,
  TrendingUp,
  ShoppingCart,
  Package,
  Clock,
  Shield
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MarketCardProps {
  listingId: string;
  title: string;
  titleOdia: string;
  category: string;
  type: 'sell' | 'buy';
  price: number;
  unit: string;
  sellerName: string;
  sellerLocation: string;
  images: string[];
  quality: 'premium' | 'standard' | 'economy';
  verified: boolean;
  rating: number;
  reviews: number;
  status: 'available' | 'limited' | 'sold';
  negotiable: boolean;
  onClick?: () => void;
}

export function MarketCard({
  listingId,
  title,
  titleOdia,
  category,
  type,
  price,
  unit,
  sellerName,
  sellerLocation,
  images,
  quality,
  verified,
  rating,
  reviews,
  status,
  negotiable,
  onClick
}: MarketCardProps) {
  const { t, language } = useLanguage();

  // Display title based on current language
  const displayTitle = language === 'odia' ? titleOdia : title;

  const statusConfig = {
    available: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Available', 'उपलब्ध', 'ଉପଲବ୍ଧ') 
    },
    limited: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      icon: Clock, 
      label: t('Limited Stock', 'सीमित स्टॉक', 'ସୀମିତ ଷ୍ଟକ୍') 
    },
    sold: { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      icon: Package, 
      label: t('Sold Out', 'बिक गया', 'ବିକ୍ରି ହୋଇଗଲା') 
    }
  };

  const categoryConfig: Record<string, { bg: string; icon: string }> = {
    livestock: { bg: 'bg-green-100 text-green-700', icon: '🐄' },
    dairy: { bg: 'bg-blue-100 text-blue-700', icon: '🥛' },
    feed: { bg: 'bg-amber-100 text-amber-700', icon: '🌾' },
    equipment: { bg: 'bg-purple-100 text-purple-700', icon: '⚙️' },
    produce: { bg: 'bg-pink-100 text-pink-700', icon: '🌽' },
    services: { bg: 'bg-cyan-100 text-cyan-700', icon: '🔧' }
  };

  const qualityConfig = {
    premium: { 
      bg: 'bg-purple-100 text-purple-700', 
      label: t('Premium', 'प्रीमियम', 'ପ୍ରିମିୟମ୍') 
    },
    standard: { 
      bg: 'bg-blue-100 text-blue-700', 
      label: t('Standard', 'मानक', 'ମାନକ') 
    },
    economy: { 
      bg: 'bg-gray-100 text-gray-700', 
      label: t('Economy', 'किफायती', 'ଅର୍ଥନୀତି') 
    }
  };

  const StatusIcon = statusConfig[status].icon;
  const categoryStyle = categoryConfig[category] || categoryConfig['livestock'];
  const qualityStyle = qualityConfig[quality];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {images[0] ? (
          <img 
            src={images[0]} 
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {categoryStyle.icon}
          </div>
        )}
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs backdrop-blur-sm bg-white/90 ${statusConfig[status].text}`}>
              {statusConfig[status].label}
            </span>
            {verified && (
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs backdrop-blur-sm bg-green-500 text-white flex items-center gap-1">
                <Shield size={12} />
                <span className="hidden sm:inline">{t('Verified', 'सत्यापित', 'ଯାଞ୍ଚିତ')}</span>
              </span>
            )}
          </div>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs backdrop-blur-sm bg-white/90 ${
            type === 'sell' ? 'text-blue-700' : 'text-purple-700'
          }`}>
            {type === 'sell' ? t('For Sale', 'बिक्री के लिए', 'ବିକ୍ରୟ ପାଇଁ') : t('Wanted', 'चाहिए', 'ଚାହୁଁଛି')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category & Quality */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${categoryStyle.bg}`}>
            {categoryStyle.icon} <span className="hidden sm:inline">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </span>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${qualityStyle.bg}`}>
            {qualityStyle.label}
          </span>
        </div>

        {/* Title - ONLY display selected language */}
        <h4 className="text-slate-900 mb-3 line-clamp-2">{displayTitle}</h4>

        {/* Price */}
        <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-baseline gap-2">
            <IndianRupee size={20} className="text-green-600" />
            <span className="text-2xl sm:text-3xl font-mono font-medium text-green-900">
              {price.toLocaleString()}
            </span>
            <span className="text-sm text-green-700">/{unit}</span>
          </div>
          {negotiable && (
            <p className="text-xs text-green-600 mt-1">{t('Price negotiable', 'मूल्य परक्राम्य', 'ମୂଲ୍ୟ ବୁଝାମଣା')}</p>
          )}
        </div>

        {/* Seller Info */}
        <div className="mb-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-slate-900 line-clamp-1">{sellerName}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin size={12} />
            <span className="line-clamp-1">{sellerLocation}</span>
          </div>
        </div>

        {/* Rating & ID */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium text-slate-900">{rating}</span>
            <span className="text-xs text-slate-600">({reviews})</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">ID: {listingId.split('-').pop()}</span>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
            <Phone size={14} />
            <span className="hidden sm:inline">{t('Contact Seller', 'विक्रेता से संपर्क करें', 'ବିକ୍ରେତାଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ')}</span>
            <span className="sm:hidden">{t('Contact', 'संपर्क', 'ଯୋଗାଯୋଗ')}</span>
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-1">
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">{t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')}</span>
            <span className="sm:hidden">{t('View', 'देखें', 'ଦେଖନ୍ତୁ')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
