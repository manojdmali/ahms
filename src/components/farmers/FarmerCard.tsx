import { motion } from 'motion/react';
import { User, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
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
  viewMode?: 'grid' | 'list';
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
  onClick,
  viewMode = 'grid',
}: FarmerCardProps) {
  const { t, language } = useLanguage();
  const displayName = language === 'odia' ? nameOdia : name;

  const LivestockTags = () => (
    <div className="flex flex-wrap gap-1">
      {livestock.cattle > 0 && <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">🐄 {livestock.cattle}</span>}
      {livestock.buffalo > 0 && <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">🐃 {livestock.buffalo}</span>}
      {livestock.goat > 0 && <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs">🐐 {livestock.goat}</span>}
      {livestock.sheep > 0 && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-xs">🐑 {livestock.sheep}</span>}
      {livestock.poultry > 0 && <span className="px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded text-xs">🐔 {livestock.poultry}</span>}
    </div>
  );

  /* ── TABLE ROW (list mode) ── rendered as <tr> by parent table */
  if (viewMode === 'list') {
    return (
      <tr
        onClick={onClick}
        className="hover:bg-green-50/50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
      >
        {/* Farmer */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 flex items-center justify-center">
              <User className="text-green-600" size={13} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate max-w-[140px]">{displayName}</p>
              <p className="text-xs text-slate-400 font-mono">{farmerId}</p>
            </div>
          </div>
        </td>

        {/* Location */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin size={11} className="flex-shrink-0 text-slate-400" />
            <span className="truncate max-w-[130px]">{village}, {block}</span>
          </div>
        </td>

        {/* Contact */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Phone size={11} className="flex-shrink-0 text-slate-400" />
            <span className="font-mono whitespace-nowrap">{contact}</span>
          </div>
        </td>

        {/* Livestock */}
        <td className="px-4 py-3">
          <LivestockTags />
        </td>

        {/* KYC */}
        <td className="px-4 py-3">
          {kycStatus === 'Verified'
            ? <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap"><CheckCircle size={10} /> Verified</span>
            : <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap"><AlertCircle size={10} /> Pending</span>}
        </td>

        {/* Insurance */}
        <td className="px-4 py-3">
          <span className={`inline-flex text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
            insuranceStatus === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {insuranceStatus === 'Active' ? '✓ Active' : '⏳ Pending'}
          </span>
        </td>

        {/* Action */}
        <td className="px-4 py-3 text-right">
          <span className="text-xs text-green-600 hover:text-green-700 font-medium">View →</span>
        </td>
      </tr>
    );
  }

  /* ── GRID CARD ── */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="glass-card rounded-xl p-4 card-hover cursor-pointer overflow-hidden"
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 flex items-center justify-center">
          <User className="text-green-600" size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
            {kycStatus === 'Verified' && <CheckCircle size={12} className="text-green-500 flex-shrink-0" />}
          </div>
          <p className="text-xs text-slate-400 font-mono">{farmerId}</p>
        </div>
      </div>

      {/* Location + Contact */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={11} className="flex-shrink-0 text-slate-400" />
          <span className="truncate">{village}, {block}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Phone size={11} className="flex-shrink-0 text-slate-400" />
          <span className="font-mono">{contact}</span>
        </div>
      </div>

      {/* Livestock */}
      <div className="mb-3">
        <LivestockTags />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full ${
            insuranceStatus === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {insuranceStatus === 'Active' ? `✓ ${t('Insured', 'बीमित', 'ବୀମାଭୁକ୍ତ')}` : `⏳ ${t('Pending', 'लंबित', 'ବିଚାରାଧୀନ')}`}
          </span>
          <span className="text-slate-400">{schemes.length} {t('Schemes', 'योजनाएं', 'ଯୋଜନା')}</span>
        </div>
        <button className="text-green-600 hover:text-green-700 font-medium flex-shrink-0">
          {t('Details', 'विवरण', 'ବିବରଣୀ')} →
        </button>
      </div>
    </motion.div>
  );
}
