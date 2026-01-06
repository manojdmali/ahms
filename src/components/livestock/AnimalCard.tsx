import { motion } from 'motion/react';
import { Syringe, Activity, Dna, Milk, MapPin, Calendar, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AnimalCardProps {
  tag: string;
  breed: string;
  gender: 'Male' | 'Female';
  age: string;
  owner: string;
  location: string;
  healthScore: number;
  insurance: boolean;
  photo?: string;
  milkYield?: string;
  lastVaccine?: string;
  onClick?: () => void;
}

export function AnimalCard({
  tag,
  breed,
  gender,
  age,
  owner,
  location,
  healthScore,
  insurance,
  photo,
  milkYield,
  lastVaccine,
  onClick
}: AnimalCardProps) {
  const { t } = useLanguage();

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card rounded-2xl p-4 sm:p-6 card-hover cursor-pointer"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Animal Photo */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 overflow-hidden">
          {photo ? (
            <img src={photo} alt={breed} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Animal Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono text-slate-500">🏷️ {tag}</span>
                {insurance && (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <Shield size={12} />
                    {t('Insured', 'बीमित', 'ବୀମାଭୁକ୍ତ')}
                  </span>
                )}
              </div>
              <h3 className="text-slate-900 mb-1 truncate">{breed}</h3>
              <p className="text-sm text-slate-600">
                {gender === 'Female' ? '♀' : '♂'} {t(gender, gender === 'Male' ? 'नर' : 'मादा', gender === 'Male' ? 'ପୁରୁଷ' : 'ମହିଳା')} • {age}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{owner}, {location}</span>
          </div>

          {/* Health Score */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-600">{t('Health Score', 'स्वास्थ्य स्कोर', 'ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର')}</span>
              <span className={`text-xs font-mono ${getHealthColor(healthScore)}`}>{healthScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getHealthBgColor(healthScore)} transition-all duration-500`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            <button className="p-1.5 sm:p-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 transition-all flex flex-col items-center gap-0.5 sm:gap-1 text-blue-600">
              <Syringe size={14} />
              <span className="text-[10px] sm:text-xs">{t('Vaccine', 'टीका', 'ଟିକା')}</span>
            </button>
            <button className="p-1.5 sm:p-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 transition-all flex flex-col items-center gap-0.5 sm:gap-1 text-green-600">
              <Activity size={14} />
              <span className="text-[10px] sm:text-xs">{t('Health', 'स्वास्थ्य', 'ସ୍ୱାସ୍ଥ୍ୟ')}</span>
            </button>
            <button className="p-1.5 sm:p-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 transition-all flex flex-col items-center gap-0.5 sm:gap-1 text-purple-600">
              <Dna size={14} />
              <span className="text-[10px] sm:text-xs">{t('Breed', 'प्रजनन', 'ପ୍ରଜନନ')}</span>
            </button>
            <button className="p-1.5 sm:p-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 transition-all flex flex-col items-center gap-0.5 sm:gap-1 text-amber-600">
              <Milk size={14} />
              <span className="text-[10px] sm:text-xs">{t('Milk', 'दूध', 'କ୍ଷୀର')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      {(milkYield || lastVaccine) && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 gap-2">
          {milkYield && (
            <div className="flex items-center gap-1">
              <Milk size={12} />
              <span>{t('Daily', 'दैनिक', 'ଦୈନିକ')}: {milkYield}</span>
            </div>
          )}
          {lastVaccine && (
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{t('Vaccine', 'टीका', 'ଟିକା')}: {lastVaccine}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
