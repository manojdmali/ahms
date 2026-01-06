import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Share2,
  Printer,
  FileText,
  Calendar,
  User,
  MapPin,
  Stethoscope,
  Pill,
  Syringe,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  TrendingUp,
  Activity,
  Thermometer,
  Heart,
  ClipboardList,
  Bell,
  Image as ImageIcon,
  Plus,
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HealthRecordDetailProps {
  record: {
    recordId: string;
    animalTag: string;
    animalName?: string;
    breed?: string;
    farmerId: string;
    farmerName: string;
    date: string;
    type: 'checkup' | 'vaccination' | 'treatment' | 'surgery' | 'emergency';
    status: 'scheduled' | 'ongoing' | 'completed' | 'followup-required';
    vetOfficer: {
      name: string;
      phone: string;
      email: string;
      license: string;
    };
    symptoms?: string[];
    diagnosis?: string;
    disease?: string;
    severity?: 'mild' | 'moderate' | 'severe' | 'critical';
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    treatment?: {
      medicines: {
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
      }[];
      procedures?: string[];
      instructions?: string;
    };
    vaccination?: {
      vaccine: string;
      manufacturer: string;
      batchNo: string;
      expiryDate: string;
      nextDose?: string;
    };
    followUp?: {
      date: string;
      reason: string;
      completed: boolean;
    };
    cost?: number;
    notes?: string;
    attachments?: string[];
    location?: string;
  };
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function HealthRecordDetail({ record, onBack, onEdit, onDelete }: HealthRecordDetailProps) {
  const { t } = useLanguage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'treatment' | 'history'>('overview');

  const typeConfig = {
    checkup: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      icon: Stethoscope, 
      label: t('Routine Checkup', 'नियमित जांच', 'ନିୟମିତ ଯାଞ୍ଚ') 
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
      label: t('Follow-up Required', 'अनुवर्ती आवश्यक', 'ଫଲୋ-ଅପ୍ ଆବଶ୍ୟକ') 
    }
  };

  const severityConfig = {
    mild: { bg: 'bg-green-100', text: 'text-green-700', label: t('Mild', 'हल्का', 'ହାଲକା') },
    moderate: { bg: 'bg-amber-100', text: 'text-amber-700', label: t('Moderate', 'मध्यम', 'ମଧ୍ୟମ') },
    severe: { bg: 'bg-orange-100', text: 'text-orange-700', label: t('Severe', 'गंभीर', 'ଗମ୍ଭୀର') },
    critical: { bg: 'bg-red-100', text: 'text-red-700', label: t('Critical', 'गंभीर', 'ଗୁରୁତର') }
  };

  const TypeIcon = typeConfig[record.type].icon;
  const StatusIcon = statusConfig[record.status].icon;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download logic
    alert(t('Downloading health record...', 'स्वास्थ्य रिकॉर्ड डाउनलोड हो रहा है...', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଡାଉନଲୋଡ୍ ହେଉଛି...'));
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete?.();
    setShowDeleteModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-white/50 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-slate-900 mb-1">
                {t('Health Record Details', 'स्वास्थ्य रिकॉर्ड विवरण', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବିବରଣୀ')}
              </h2>
              <p className="text-sm text-slate-600 font-mono">ID: {record.recordId}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-lg bg-white/70 border border-white/30 hover:bg-white transition-all"
              title={t('Print', 'प्रिंट', 'ମୁଦ୍ରଣ')}
            >
              <Printer size={18} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-lg bg-white/70 border border-white/30 hover:bg-white transition-all"
              title={t('Download', 'डाउनलोड', 'ଡାଉନଲୋଡ୍')}
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg bg-white/70 border border-white/30 hover:bg-white transition-all"
              title={t('Share', 'साझा करें', 'ସେୟାର୍')}
            >
              <Share2 size={18} />
            </button>
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Edit size={18} />
                <span className="hidden sm:inline">{t('Edit', 'संपादित करें', 'ସମ୍ପାଦନ')}</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                title={t('Delete', 'हटाएं', 'ଡିଲିଟ୍')}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${typeConfig[record.type].bg} ${typeConfig[record.type].text}`}>
            <TypeIcon size={16} />
            {typeConfig[record.type].label}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${statusConfig[record.status].bg} ${statusConfig[record.status].text}`}>
            <StatusIcon size={16} />
            {statusConfig[record.status].label}
          </span>
          {record.severity && (
            <span className={`px-3 py-1.5 rounded-full text-sm ${severityConfig[record.severity].bg} ${severityConfig[record.severity].text}`}>
              {severityConfig[record.severity].label}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Animal & Farmer Info */}
        <div className="space-y-6">
          {/* Animal Info */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-green-600" />
              {t('Animal Information', 'पशु जानकारी', 'ପଶୁ ସୂଚନା')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('Tag ID', 'टैग ID', 'ଟ୍ୟାଗ୍ ID')}</p>
                <p className="text-sm font-mono text-slate-900">{record.animalTag}</p>
              </div>
              {record.animalName && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t('Name', 'नाम', 'ନାମ')}</p>
                  <p className="text-sm text-slate-900">{record.animalName}</p>
                </div>
              )}
              {record.breed && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t('Breed', 'नस्ल', 'ପ୍ରଜାତି')}</p>
                  <p className="text-sm text-slate-900">{record.breed}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('Date', 'तारीख', 'ତାରିଖ')}</p>
                <p className="text-sm text-slate-900">
                  {new Date(record.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              {record.location && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t('Location', 'स्थान', 'ସ୍ଥାନ')}</p>
                  <p className="text-sm text-slate-900 flex items-center gap-1">
                    <MapPin size={14} />
                    {record.location}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Farmer Info */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <User size={18} className="text-green-600" />
              {t('Farmer Information', 'किसान की जानकारी', 'କୃଷକ ସୂଚନା')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('Name', 'नाम', 'ନାମ')}</p>
                <p className="text-sm text-slate-900">{record.farmerName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('Farmer ID', 'किसान ID', 'କୃଷକ ID')}</p>
                <p className="text-sm font-mono text-slate-900">{record.farmerId}</p>
              </div>
            </div>
          </div>

          {/* Veterinary Officer Info */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Stethoscope size={18} className="text-green-600" />
              {t('Veterinary Officer', 'पशु चिकित्सा अधिकारी', 'ପଶୁ ଚିକିତ୍ସକ')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('Name', 'नाम', 'ନାମ')}</p>
                <p className="text-sm text-slate-900">{record.vetOfficer.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">{t('License', 'लाइसेंस', 'ଲାଇସେନ୍ସ')}</p>
                <p className="text-sm font-mono text-slate-900">{record.vetOfficer.license}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Phone size={14} className="text-green-600" />
                {record.vetOfficer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Mail size={14} className="text-green-600" />
                {record.vetOfficer.email}
              </div>
            </div>
          </div>

          {/* Cost */}
          {record.cost && (
            <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <h3 className="text-slate-900 mb-2 flex items-center gap-2">
                <FileText size={18} className="text-green-600" />
                {t('Total Cost', 'कुल लागत', 'ମୋଟ ଖର୍ଚ୍ଚ')}
              </h3>
              <p className="text-3xl font-mono font-medium text-green-900">
                ₹{record.cost.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Medical Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="glass-card rounded-2xl p-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white shadow-sm text-green-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('Overview', 'अवलोकन', 'ସାରାଂଶ')}
              </button>
              <button
                onClick={() => setActiveTab('treatment')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === 'treatment'
                    ? 'bg-white shadow-sm text-green-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('Treatment', 'उपचार', 'ଚିକିତ୍ସା')}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === 'history'
                    ? 'bg-white shadow-sm text-green-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('History', 'इतिहास', 'ଇତିହାସ')}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Vital Signs */}
              {(record.temperature || record.heartRate || record.respiratoryRate) && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-red-600" />
                    {t('Vital Signs', 'महत्वपूर्ण संकेत', 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସଙ୍କେତ')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {record.temperature && (
                      <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer size={16} className="text-red-600" />
                          <p className="text-xs text-red-700">{t('Temperature', 'तापमान', 'ତାପମାତ୍ରା')}</p>
                        </div>
                        <p className="text-2xl font-mono font-medium text-red-900">{record.temperature}°F</p>
                      </div>
                    )}
                    {record.heartRate && (
                      <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart size={16} className="text-pink-600" />
                          <p className="text-xs text-pink-700">{t('Heart Rate', 'हृदय गति', 'ହୃଦୟ ଗତି')}</p>
                        </div>
                        <p className="text-2xl font-mono font-medium text-pink-900">{record.heartRate} bpm</p>
                      </div>
                    )}
                    {record.respiratoryRate && (
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity size={16} className="text-blue-600" />
                          <p className="text-xs text-blue-700">{t('Respiratory Rate', 'श्वसन दर', 'ଶ୍ୱାସ ହାର')}</p>
                        </div>
                        <p className="text-2xl font-mono font-medium text-blue-900">{record.respiratoryRate} /min</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              {record.symptoms && record.symptoms.length > 0 && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-amber-600" />
                    {t('Symptoms', 'लक्षण', 'ଲକ୍ଷଣ')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {record.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnosis */}
              {(record.diagnosis || record.disease) && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <ClipboardList size={18} className="text-purple-600" />
                    {t('Diagnosis', 'निदान', 'ନିଦାନ')}
                  </h3>
                  {record.disease && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-1">{t('Disease', 'रोग', 'ରୋଗ')}</p>
                      <p className="text-base font-medium text-slate-900">{record.disease}</p>
                    </div>
                  )}
                  {record.diagnosis && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t('Details', 'विवरण', 'ବିବରଣୀ')}</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{record.diagnosis}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Vaccination Details */}
              {record.vaccination && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Syringe size={18} className="text-green-600" />
                    {t('Vaccination Details', 'टीकाकरण विवरण', 'ଟିକାକରଣ ବିବରଣୀ')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t('Vaccine Name', 'टीका का नाम', 'ଟିକା ନାମ')}</p>
                      <p className="text-sm font-medium text-slate-900">{record.vaccination.vaccine}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t('Manufacturer', 'निर्माता', 'ଉତ୍ପାଦକ')}</p>
                      <p className="text-sm text-slate-700">{record.vaccination.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t('Batch No.', 'बैच नंबर', 'ବ୍ୟାଚ୍ ନମ୍ବର')}</p>
                      <p className="text-sm font-mono text-slate-700">{record.vaccination.batchNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t('Expiry Date', 'समाप्ति तिथि', 'ସମାପ୍ତି ତାରିଖ')}</p>
                      <p className="text-sm text-slate-700">
                        {new Date(record.vaccination.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    {record.vaccination.nextDose && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-slate-500 mb-1">{t('Next Dose Due', 'अगली खुराक', 'ପରବର୍ତ୍ତୀ ମାତ୍ରା')}</p>
                        <p className="text-sm font-medium text-green-700">
                          {new Date(record.vaccination.nextDose).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {record.notes && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-slate-600" />
                    {t('Additional Notes', 'अतिरिक्त नोट्स', 'ଅତିରିକ୍ତ ନୋଟ୍')}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{record.notes}</p>
                </div>
              )}

              {/* Attachments */}
              {record.attachments && record.attachments.length > 0 && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <ImageIcon size={18} className="text-blue-600" />
                    {t('Attachments', 'संलग्नक', 'ସଂଲଗ୍ନକ')} ({record.attachments.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {record.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg bg-slate-100 overflow-hidden cursor-pointer hover:ring-2 ring-green-500 transition-all"
                      >
                        <img
                          src={attachment}
                          alt={`Attachment ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'treatment' && (
            <div className="space-y-6">
              {/* Medicines */}
              {record.treatment?.medicines && record.treatment.medicines.length > 0 && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Pill size={18} className="text-purple-600" />
                    {t('Prescribed Medicines', 'निर्धारित दवाएं', 'ନିର୍ଦ୍ଧାରିତ ଔଷଧ')}
                  </h3>
                  <div className="space-y-3">
                    {record.treatment.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                      >
                        <h4 className="text-base font-medium text-slate-900 mb-3">{medicine.name}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">{t('Dosage', 'खुराक', 'ମାତ୍ରା')}</p>
                            <p className="text-slate-700">{medicine.dosage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">{t('Frequency', 'आवृत्ति', 'ଆବୃତ୍ତି')}</p>
                            <p className="text-slate-700">{medicine.frequency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">{t('Duration', 'अवधि', 'ଅବଧି')}</p>
                            <p className="text-slate-700">{medicine.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Procedures */}
              {record.treatment?.procedures && record.treatment.procedures.length > 0 && (
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-blue-600" />
                    {t('Procedures Performed', 'की गई प्रक्रियाएं', 'କରାଯାଇଥିବା ପ୍ରକ୍ରିୟା')}
                  </h3>
                  <ul className="space-y-2">
                    {record.treatment.procedures.map((procedure, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {record.treatment?.instructions && (
                <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-amber-600" />
                    {t('Care Instructions', 'देखभाल निर्देश', 'ଯତ୍ନ ନିର୍ଦ୍ଦେଶ')}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{record.treatment.instructions}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-slate-600" />
                {t('Medical History', 'चिकित्सा इतिहास', 'ଚିକିତ୍ସା ଇତିହାସ')}
              </h3>
              <div className="space-y-4">
                {/* Sample history - in real app, fetch from API */}
                <div className="flex gap-4 pb-4 border-b border-slate-200 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{t('Current Record', 'वर्तमान रिकॉर्ड', 'ବର୍ତ୍ତମାନ ରେକର୍ଡ')}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${statusConfig[record.status].bg} ${statusConfig[record.status].text}`}>
                        {statusConfig[record.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{typeConfig[record.type].label}</p>
                  </div>
                </div>
                
                <div className="text-center py-8 text-slate-500 text-sm">
                  {t('No previous records found', 'कोई पिछला रिकॉर्ड नहीं मिला', 'କୌଣସି ପୂର୍ବ ରେକର୍ଡ ମିଳିଲା ନାହିଁ')}
                </div>
              </div>
            </div>
          )}

          {/* Follow-up Required */}
          {record.followUp && !record.followUp.completed && (
            <div className="glass-card rounded-2xl p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-start gap-3">
                <Bell size={24} className="text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-2 flex items-center gap-2">
                    {t('Follow-up Required', 'अनुवर्ती आवश्यक', 'ଫଲୋ-ଅପ୍ ଆବଶ୍ୟକ')}
                  </h3>
                  <p className="text-sm text-slate-700 mb-2">{record.followUp.reason}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-purple-600" />
                    <span className="font-medium text-purple-900">
                      {new Date(record.followUp.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm">
                  {t('Schedule', 'निर्धारित करें', 'ସମୟ ନିର୍ଦ୍ଧାରଣ')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">
                  {t('Delete Health Record?', 'स्वास्थ्य रिकॉर्ड हटाएं?', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଡିଲିଟ୍ କରିବେ?')}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {t('This action cannot be undone.', 'इस क्रिया को पूर्ववत नहीं किया जा सकता।', 'ଏହି କାର୍ଯ୍ୟ ପୂର୍ବବତ୍ କରାଯାଇପାରିବ ନାହିଁ।')}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
              >
                {t('Cancel', 'रद्द करें', 'ବାତିଲ୍')}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                {t('Delete', 'हटाएं', 'ଡିଲିଟ୍')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-900">
                {t('Share Health Record', 'स्वास्थ्य रिकॉर्ड साझा करें', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ସେୟାର୍ କରନ୍ତୁ')}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all flex items-center gap-3 text-left">
                <Mail size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t('Email', 'ईमेल', 'ଇମେଲ୍')}</p>
                  <p className="text-xs text-slate-600">{t('Send via email', 'ईमेल के माध्यम से भेजें', 'ଇମେଲ୍ ମାଧ୍ୟମରେ ପଠାନ୍ତୁ')}</p>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-all flex items-center gap-3 text-left">
                <Phone size={20} className="text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t('WhatsApp', 'व्हाट्सएप', 'ହ୍ୱାଟସ୍‌ଆପ୍')}</p>
                  <p className="text-xs text-slate-600">{t('Share on WhatsApp', 'व्हाट्सएप पर साझा करें', 'ହ୍ୱାଟସ୍‌ଆପ୍‌ରେ ସେୟାର୍ କରନ୍ତୁ')}</p>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all flex items-center gap-3 text-left">
                <Download size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t('Download PDF', 'PDF डाउनलोड करें', 'PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ')}</p>
                  <p className="text-xs text-slate-600">{t('Save as PDF file', 'PDF फ़ाइल के रूप में सहेजें', 'PDF ଫାଇଲ୍ ଭାବରେ ସଂରକ୍ଷଣ କରନ୍ତୁ')}</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
