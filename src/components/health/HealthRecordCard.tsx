import { motion } from 'motion/react';
import {
  Calendar,
  User,
  Stethoscope,
  Syringe,
  Pill,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  MapPin,
  Thermometer
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HealthRecordCardProps {
  recordId: string;
  animalTag: string;
  animalName?: string;
  farmerName: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'surgery' | 'emergency';
  status: 'scheduled' | 'ongoing' | 'completed' | 'followup-required';
  vetOfficer: string;
  diagnosis?: string;
  disease?: string;
  temperature?: number;
  severity?: 'mild' | 'moderate' | 'severe' | 'critical';
  followUpDate?: string;
  onClick?: () => void;
}

export function HealthRecordCard({
  recordId,
  animalTag,
  animalName,
  farmerName,
  date,
  type,
  status,
  vetOfficer,
  diagnosis,
  disease,
  temperature,
  severity,
  followUpDate,
  onClick
}: HealthRecordCardProps) {
  const { t } = useLanguage();

  const typeConfig = {
    checkup: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Stethoscope, 
      label: t('Checkup', 'जांच', 'ଯାଞ୍ଚ') 
    },
    vaccination: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: Syringe, 
      label: t('Vaccination', 'टीकाकरण', 'ଟିକାକରଣ') 
    },
    treatment: { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      icon: Pill, 
      label: t('Treatment', 'उपचार', 'ଚିକିତ୍ସା') 
    },
    surgery: { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      icon: Activity, 
      label: t('Surgery', 'शल्य चिकित्सा', 'ଅସ୍ତ୍ରୋପଚାର') 
    },
    emergency: { 
      bg: 'bg-orange-50', 
      text: 'text-orange-700', 
      icon: AlertCircle, 
      label: t('Emergency', 'आपातकाल', 'ଜରୁରୀକାଳୀନ') 
    }
  };

  const statusConfig = {
    scheduled: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Clock, 
      label: t('Scheduled', 'निर्धारित', 'ନିର୍ଦ୍ଧାରିତ') 
    },
    ongoing: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      icon: Activity, 
      label: t('Ongoing', 'चालू', 'ଚାଲୁଛି') 
    },
    completed: { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      icon: CheckCircle, 
      label: t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ') 
    },
    'followup-required': { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      icon: Bell, 
      label: t('Follow-up', 'अनुवर्ती', 'ଫଲୋ-ଅପ୍') 
    }
  };

  const severityConfig = {
    mild: { bg: 'bg-green-100', text: 'text-green-700', label: t('Mild', 'हल्का', 'ହାଲକା') },
    moderate: { bg: 'bg-amber-100', text: 'text-amber-700', label: t('Moderate', 'मध्यम', 'ମଧ୍ୟମ') },
    severe: { bg: 'bg-orange-100', text: 'text-orange-700', label: t('Severe', 'गंभीर', 'ଗମ୍ଭୀର') },
    critical: { bg: 'bg-red-100', text: 'text-red-700', label: t('Critical', 'गंभीर', 'ଗୁରୁତର') }
  };

  const TypeIcon = typeConfig[type].icon;
  const StatusIcon = statusConfig[status].icon;

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
            <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${typeConfig[type].bg} ${typeConfig[type].text}`}>
              <TypeIcon size={14} />
              {typeConfig[type].label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${statusConfig[status].bg} ${statusConfig[status].text}`}>
              <StatusIcon size={14} />
              {statusConfig[status].label}
            </span>
            {severity && (
              <span className={`px-3 py-1 rounded-full text-xs ${severityConfig[severity].bg} ${severityConfig[severity].text}`}>
                {severityConfig[severity].label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-slate-900 font-mono">{animalTag}</h4>
            {animalName && <span className="text-sm text-slate-600">• {animalName}</span>}
          </div>
          <p className="text-xs text-slate-500 font-mono">ID: {recordId}</p>
        </div>
      </div>

      {/* Disease/Diagnosis */}
      {(disease || diagnosis) && (
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
          {disease && (
            <p className="text-sm font-medium text-amber-900 mb-1">{disease}</p>
          )}
          {diagnosis && (
            <p className="text-xs text-amber-700 line-clamp-2">{diagnosis}</p>
          )}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-slate-700 text-xs sm:text-sm">
            {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <User size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-slate-700 text-xs sm:text-sm truncate">{farmerName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Stethoscope size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-slate-700 text-xs sm:text-sm truncate">{vetOfficer}</span>
        </div>

        {temperature && (
          <div className="flex items-center gap-2 text-sm">
            <Thermometer size={14} className="text-red-500 flex-shrink-0" />
            <span className="text-slate-700 text-xs sm:text-sm">{temperature}°F</span>
          </div>
        )}
      </div>

      {/* Follow-up Alert */}
      {followUpDate && (
        <div className="mb-4 p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center gap-2">
          <Bell size={14} className="text-purple-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-purple-700">
              {t('Follow-up on', 'अनुवर्ती', 'ଫଲୋ-ଅପ୍')} {new Date(followUpDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          {t('Added', 'जोड़ा गया', 'ଯୋଡ଼ାଗଲା')} {new Date(date).toLocaleDateString()}
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          {t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')} →
        </button>
      </div>
    </motion.div>
  );
}
