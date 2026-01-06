import { 
  AlertTriangle, 
  X, 
  MapPin, 
  TrendingUp, 
  FileText, 
  Calendar,
  Users,
  Activity,
  Shield,
  Syringe,
  Heart,
  AlertCircle,
  CheckCircle,
  Info,
  Phone,
  Mail,
  Send,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DiseaseAlert {
  id: string;
  disease: string;
  diseaseHindi: string;
  diseaseOdia: string;
  severity: 'high' | 'medium' | 'low';
  affectedAreas: string[];
  casesReported: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  lastUpdated: string;
  description: string;
  descriptionHindi: string;
  descriptionOdia: string;
  symptoms: string[];
  symptomsHindi: string[];
  symptomsOdia: string[];
  prevention: string[];
  preventionHindi: string[];
  preventionOdia: string[];
  treatment: string[];
  treatmentHindi: string[];
  treatmentOdia: string[];
  vaccination?: {
    available: boolean;
    name: string;
    schedule: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
  };
}

export function DiseaseAlertBanner() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<DiseaseAlert[]>([
    {
      id: '1',
      disease: 'Lumpy Skin Disease',
      diseaseHindi: 'लम्पी स्किन डिजीज',
      diseaseOdia: 'ଲମ୍ପି ସ୍କିନ୍ ରୋଗ',
      severity: 'high',
      affectedAreas: ['Brahmagiri Block', 'Krushnaprasad Block', 'Satyabadi Block'],
      casesReported: 47,
      trend: 'increasing',
      lastUpdated: '2 hours ago',
      description: 'Lumpy Skin Disease (LSD) is a viral disease affecting cattle, causing fever, nodules on skin, and reduced milk production. Immediate isolation and veterinary care required.',
      descriptionHindi: 'लम्पी स्किन डिजीज एक वायरल बीमारी है जो मवेशियों को प्रभावित करती है, जिससे बुखार, त्वचा पर गांठें और दूध उत्पादन में कमी होती है। तत्काल अलगाव और पशु चिकित्सा देखभाल की आवश्यकता है।',
      descriptionOdia: 'ଲମ୍ପି ସ୍କିନ୍ ରୋଗ ଗୋରୁମାନଙ୍କୁ ପ୍ରଭାବିତ କରୁଥିବା ଏକ ଭାଇରାଲ୍ ରୋଗ, ଯାହା ଜ୍ୱର, ଚର୍ମରେ ଗୁଟି ଏବଂ କ୍ଷୀର ଉତ୍ପାଦନ ହ୍ରାସ କରେ।',
      symptoms: [
        'Round nodules on skin (2-5 cm diameter)',
        'High fever (40-41°C)',
        'Reduced milk production',
        'Loss of appetite',
        'Nasal and eye discharge',
        'Swelling in legs',
        'Depression and weakness'
      ],
      symptomsHindi: [
        'त्वचा पर गोल गांठें (2-5 सेमी व्यास)',
        'तेज बुखार (40-41°C)',
        'दूध उत्पादन में कमी',
        'भूख में कमी',
        'नाक और आंख से स्राव',
        'पैरों में सूजन',
        'उदासी और कमजोरी'
      ],
      symptomsOdia: [
        'ଚର୍ମରେ ଗୋଲାକାର ଗୁଟି (2-5 ସେମି)',
        'ଉଚ୍ଚ ଜ୍ୱର (40-41°C)',
        'କ୍ଷୀର ଉତ୍ପାଦନ ହ୍ରାସ',
        'ଭୋକ କମିଯିବା',
        'ନାକ ଓ ଆଖିରୁ ସ୍ରାବ',
        'ଗୋଡ଼ରେ ଫୁଲା',
        'ଦୁର୍ବଳତା'
      ],
      prevention: [
        'Isolate infected animals immediately',
        'Vaccinate all susceptible cattle',
        'Control mosquitoes and flies (disease vectors)',
        'Disinfect animal sheds regularly',
        'Avoid sharing equipment between animals',
        'Maintain proper hygiene and sanitation',
        'Monitor animals daily for symptoms',
        'Restrict animal movement from affected areas'
      ],
      preventionHindi: [
        'संक्रमित पशुओं को तुरंत अलग करें',
        'सभी संवेदनशील मवेशियों का टीकाकरण करें',
        'मच्छरों और मक्खियों को नियंत्रित करें',
        'पशु शेड को नियमित रूप से कीटाणुरहित करें',
        'पशुओं के बीच उपकरण साझा न करें',
        'उचित स्वच्छता बनाए रखें',
        'पशुओं की दैनिक निगरानी करें',
        'प्रभावित क्षेत्रों से पशुओं की आवाजाही पर रोक लगाएं'
      ],
      preventionOdia: [
        'ସଂକ୍ରମିତ ପଶୁମାନଙ୍କୁ ତୁରନ୍ତ ପୃଥକ କରନ୍ତୁ',
        'ସମସ୍ତ ସମ୍ବେଦନଶୀଳ ଗୋରୁଙ୍କୁ ଟିକା ଦିଅନ୍ତୁ',
        'ମଶା ଓ ମାଛି ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ',
        'ପଶୁ ଶେଡ୍ ନିୟମିତ ଜୀବାଣୁମୁକ୍ତ କରନ୍ତୁ',
        'ପଶୁମାନଙ୍କ ମଧ୍ୟରେ ଯନ୍ତ୍ରପାତି ସେୟାର୍ କରନ୍ତୁ ନାହିଁ',
        'ଉଚିତ ସ୍ୱଚ୍ଛତା ବଜାୟ ରଖନ୍ତୁ',
        'ପଶୁମାନଙ୍କୁ ପ୍ରତିଦିନ ନିରୀକ୍ଷଣ କରନ୍ତୁ',
        'ପ୍ରଭାବିତ କ୍ଷେତ୍ରରୁ ପଶୁ ଗତିବିଧି ସୀମିତ କରନ୍ତୁ'
      ],
      treatment: [
        'Supportive therapy with antipyretics',
        'Antibiotics for secondary infections',
        'Anti-inflammatory drugs',
        'Wound care for skin lesions',
        'Fluid therapy if dehydrated',
        'Nutritional support',
        'Regular monitoring by veterinarian'
      ],
      treatmentHindi: [
        'ज्वरनाशक के साथ सहायक चिकित्सा',
        'द्वितीयक संक्रमण के लिए एंटीबायोटिक्स',
        'सूजन रोधी दवाएं',
        'त्वचा के घावों की देखभाल',
        'निर्जलीकरण होने पर द्रव चिकित्सा',
        'पोषण सहायता',
        'पशु चिकित्सक द्वारा नियमित निगरानी'
      ],
      treatmentOdia: [
        'ଜ୍ୱରନାଶକ ସହିତ ସହାୟକ ଚିକିତ୍ସା',
        'ଦ୍ୱିତୀୟ ସଂକ୍ରମଣ ପାଇଁ ଆଣ୍ଟିବାୟୋଟିକ୍',
        'ପ୍ରଦାହ ବିରୋଧୀ ଔଷଧ',
        'ଚର୍ମ କ୍ଷତର ଯତ୍ନ',
        'ନିର୍ଜଳୀକରଣ ହେଲେ ତରଳ ଚିକିତ୍ସା',
        'ପୁଷ୍ଟି ସହାୟତା',
        'ପଶୁ ଚିକିତ୍ସକଙ୍କ ଦ୍ୱାରା ନିୟମିତ ନିରୀକ୍ଷଣ'
      ],
      vaccination: {
        available: true,
        name: 'Lumpy Skin Disease Vaccine',
        schedule: 'Single dose, annual booster recommended'
      },
      emergencyContact: {
        name: 'Dr. Rajesh Mohanty',
        phone: '+91-9876543210',
        email: 'emergency@odisha-vet.gov.in'
      }
    },
    {
      id: '2',
      disease: 'Foot and Mouth Disease',
      diseaseHindi: 'खुरपका-मुंहपका रोग',
      diseaseOdia: 'ଖୁରା ପାଟି ରୋଗ',
      severity: 'medium',
      affectedAreas: ['Puri Block'],
      casesReported: 12,
      trend: 'stable',
      lastUpdated: '1 day ago',
      description: 'FMD is a highly contagious viral disease affecting cloven-hoofed animals. Causes blisters in mouth and feet, fever, and excessive salivation.',
      descriptionHindi: 'खुरपका-मुंहपका रोग एक अत्यधिक संक्रामक वायरल बीमारी है। मुंह और पैरों में छाले, बुखार और अत्यधिक लार आना।',
      descriptionOdia: 'FMD ଖୁରା ଥିବା ପଶୁମାନଙ୍କୁ ପ୍ରଭାବିତ କରୁଥିବା ଏକ ଅତ୍ୟଧିକ ସଂକ୍ରାମକ ଭାଇରାଲ୍ ରୋଗ।',
      symptoms: [
        'Blisters in mouth, tongue, and feet',
        'High fever (104-105°F)',
        'Excessive salivation',
        'Lameness',
        'Loss of appetite',
        'Reduced milk production',
        'Difficulty eating'
      ],
      symptomsHindi: [
        'मुंह, जीभ और पैरों में छाले',
        'तेज बुखार (104-105°F)',
        'अत्यधिक लार आना',
        'लंगड़ापन',
        'भूख में कमी',
        'दूध उत्पादन में कमी',
        'खाने में कठिनाई'
      ],
      symptomsOdia: [
        'ପାଟି, ଜିଭ ଓ ଗୋଡ଼ରେ ଫୁଲା',
        'ଉଚ୍ଚ ଜ୍ୱର (104-105°F)',
        'ଅଧିକ ଲାଳ ଝରିବା',
        'ଛୋଟା ହେବା',
        'ଭୋକ କମିବା',
        'କ୍ଷୀର ଉତ୍ପାଦନ ହ୍ରାସ',
        'ଖାଇବାରେ କଷ୍ଟ'
      ],
      prevention: [
        'Vaccinate all animals regularly (every 6 months)',
        'Quarantine new animals for 21 days',
        'Disinfect footbaths at farm entrance',
        'Restrict visitor access to farm',
        'Report suspected cases immediately',
        'Do not share equipment between farms',
        'Maintain biosecurity protocols'
      ],
      preventionHindi: [
        'सभी पशुओं का नियमित टीकाकरण (हर 6 महीने)',
        'नए पशुओं को 21 दिनों के लिए क्वारंटाइन करें',
        'फार्म प्रवेश द्वार पर फुटबाथ कीटाणुरहित करें',
        'आगंतुकों की पहुंच सीमित करें',
        'संदिग्ध मामलों की तुरंत रिपोर्ट करें',
        'फार्मों के बीच उपकरण साझा न करें',
        'जैव सुरक्षा प्रोटोकॉल बनाए रखें'
      ],
      preventionOdia: [
        'ସମସ୍ତ ପଶୁଙ୍କୁ ନିୟମିତ ଟିକା ଦିଅନ୍ତୁ (ପ୍ରତି 6 ମାସ)',
        'ନୂତନ ପଶୁମାନଙ୍କୁ 21 ଦିନ ପାଇଁ କ୍ୱାରେଣ୍ଟାଇନ୍ କରନ୍ତୁ',
        'ଫାର୍ମ ପ୍ରବେଶ ଦ୍ୱାରରେ ଫୁଟବାଥ୍ ଜୀବାଣୁମୁକ୍ତ କରନ୍ତୁ',
        'ପରିଦର୍ଶକଙ୍କ ପ୍ରବେଶ ସୀମିତ କରନ୍ତୁ',
        'ସନ୍ଦେହଜନକ ମାମଲା ତୁରନ୍ତ ରିପୋର୍ଟ କରନ୍ତୁ',
        'ଫାର୍ମ ମଧ୍ୟରେ ଯନ୍ତ୍ରପାତି ସେୟାର୍ କରନ୍ତୁ ନାହିଁ',
        'ଜୈବ ସୁରକ୍ଷା ପ୍ରୋଟୋକଲ୍ ବଜାୟ ରଖନ୍ତୁ'
      ],
      treatment: [
        'No specific treatment - supportive care only',
        'Soft food and clean water',
        'Antiseptic mouth washes',
        'Foot care and hoof treatment',
        'Antibiotics for secondary infections',
        'Isolation until recovery (2-3 weeks)'
      ],
      treatmentHindi: [
        'कोई विशिष्ट उपचार नहीं - केवल सहायक देखभाल',
        'नरम भोजन और स्वच्छ पानी',
        'एंटीसेप्टिक माउथवॉश',
        'पैर की देखभाल और खुर उपचार',
        'द्वितीयक संक्रमण के लिए एंटीबायोटिक्स',
        'ठीक होने तक अलगाव (2-3 सप्ताह)'
      ],
      treatmentOdia: [
        'କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଚିକିତ୍ସା ନାହିଁ - କେବଳ ସହାୟକ ଯତ୍ନ',
        'ନରମ ଖାଦ୍ୟ ଏବଂ ସଫା ପାଣି',
        'ଆଣ୍ଟିସେପ୍ଟିକ୍ ମାଉଥ୍ ୱାଶ୍',
        'ପାଦ ଯତ୍ନ ଏବଂ ଖୁରା ଚିକିତ୍ସା',
        'ଦ୍ୱିତୀୟ ସଂକ୍ରମଣ ପାଇଁ ଆଣ୍ଟିବାୟୋଟିକ୍',
        'ସୁସ୍ଥ ହେବା ପର୍ଯ୍ୟନ୍ତ ପୃଥକତା (2-3 ସପ୍ତାହ)'
      ],
      vaccination: {
        available: true,
        name: 'FMD Vaccine (Trivalent)',
        schedule: 'Every 6 months'
      },
      emergencyContact: {
        name: 'Dr. Priya Patel',
        phone: '+91-9876543211',
        email: 'emergency@odisha-vet.gov.in'
      }
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<DiseaseAlert | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    farmerName: '',
    farmerId: '',
    phone: '',
    location: '',
    animalTag: '',
    animalType: '',
    symptomsObserved: '',
    dateFirstNoticed: '',
    numberOfAffected: '',
    photos: [] as File[]
  });

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleViewDetails = (alert: DiseaseAlert) => {
    setSelectedAlert(alert);
  };

  const handleReportCase = (alert: DiseaseAlert) => {
    setSelectedAlert(alert);
    setShowReportModal(true);
  };

  const handleViewGuidelines = (alert: DiseaseAlert) => {
    setSelectedAlert(alert);
    setShowGuidelinesModal(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('Case reported successfully! A veterinary officer will contact you shortly.', 'केस सफलतापूर्वक रिपोर्ट किया गया! एक पशु चिकित्सा अधिकारी जल्द ही आपसे संपर्क करेगा।', 'ମାମଲା ସଫଳତାର ସହିତ ରିପୋର୍ଟ ହୋଇଛି! ଏକ ପଶୁ ଚିକିତ୍ସକ ଶୀଘ୍ର ଆପଣଙ୍କୁ ଯୋଗାଯୋଗ କରିବେ।'));
    setShowReportModal(false);
    setReportFormData({
      farmerName: '',
      farmerId: '',
      phone: '',
      location: '',
      animalTag: '',
      animalType: '',
      symptomsObserved: '',
      dateFirstNoticed: '',
      numberOfAffected: '',
      photos: []
    });
  };

  const severityConfig = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: 'text-red-600',
      badge: 'bg-red-600 text-white'
    },
    medium: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      icon: 'text-amber-600',
      badge: 'bg-amber-600 text-white'
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      badge: 'bg-blue-600 text-white'
    }
  };

  const trendIcons = {
    increasing: <TrendingUp size={14} className="text-red-600" />,
    stable: <span className="text-amber-600">→</span>,
    decreasing: <TrendingUp size={14} className="text-green-600 rotate-180" />
  };

  if (alerts.length === 0) return null;

  return (
    <>
      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`glass-card rounded-2xl p-4 sm:p-5 border-l-4 ${config.bg} ${config.border}`}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 ${config.icon}`}>
                    <AlertTriangle size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`font-medium ${config.text}`}>
                          {t('ALERT:', 'अलर्ट:', 'ଆଲର୍ଟ:')} {t(alert.disease, alert.diseaseHindi, alert.diseaseOdia)} {t('Outbreak', 'प्रकोप', 'ମହାମାରୀ')}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${config.badge}`}>
                          {t(alert.severity.toUpperCase(), alert.severity === 'high' ? 'उच्च' : alert.severity === 'medium' ? 'मध्यम' : 'कम', alert.severity === 'high' ? 'ଉଚ୍ଚ' : alert.severity === 'medium' ? 'ମଧ୍ୟମ' : 'କମ୍')}
                        </span>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="w-8 h-8 rounded-lg bg-white/50 hover:bg-white flex items-center justify-center transition-all flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className={`mt-0.5 ${config.icon} flex-shrink-0`} />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-600 mb-1">{t('Affected Areas:', 'प्रभावित क्षेत्र:', 'ପ୍ରଭାବିତ କ୍ଷେତ୍ର:')}</p>
                          <p className={`text-sm ${config.text} truncate`}>
                            {alert.affectedAreas.join(', ')}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 mb-1">{t('Cases Reported:', 'रिपोर्ट किए गए मामले:', 'ରିପୋର୍ଟ ହୋଇଥିବା ମାମଲା:')}</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-mono ${config.text}`}>
                            {alert.casesReported} {t('animals', 'पशु', 'ପଶୁ')}
                          </p>
                          {trendIcons[alert.trend]}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 mb-1">{t('Last Updated:', 'अंतिम अपडेट:', 'ଶେଷ ଅପଡେଟ୍:')}</p>
                        <p className={`text-sm ${config.text}`}>{alert.lastUpdated}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleViewDetails(alert)}
                        className={`px-4 py-2 rounded-lg ${config.bg} border ${config.border} ${config.text} text-sm hover:bg-white transition-all`}
                      >
                        {t('View Details', 'विवरण देखें', 'ବିବରଣୀ ଦେଖନ୍ତୁ')}
                      </button>
                      <button 
                        onClick={() => handleReportCase(alert)}
                        className={`px-4 py-2 rounded-lg ${config.bg} border ${config.border} ${config.text} text-sm hover:bg-white transition-all flex items-center gap-1`}
                      >
                        <FileText size={14} />
                        {t('Report Case', 'केस रिपोर्ट करें', 'ମାମଲା ରିପୋର୍ଟ କରନ୍ତୁ')}
                      </button>
                      <button 
                        onClick={() => handleViewGuidelines(alert)}
                        className={`px-4 py-2 rounded-lg ${config.bg} border ${config.border} ${config.text} text-sm hover:bg-white transition-all`}
                      >
                        {t('Guidelines', 'दिशानिर्देश', 'ଦିଗନ୍ତ')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && !showReportModal && !showGuidelinesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${severityConfig[selectedAlert.severity].bg} flex items-center justify-center ${severityConfig[selectedAlert.severity].icon}`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-slate-900">
                    {t(selectedAlert.disease, selectedAlert.diseaseHindi, selectedAlert.diseaseOdia)}
                  </h2>
                  <p className="text-sm text-slate-600">{t('Disease Alert Details', 'रोग अलर्ट विवरण', 'ରୋଗ ଆଲର୍ଟ ବିବରଣୀ')}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Info size={18} className="text-blue-600" />
                  {t('Overview', 'अवलोकन', 'ସାରାଂଶ')}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t(selectedAlert.description, selectedAlert.descriptionHindi, selectedAlert.descriptionOdia)}
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={18} className="text-red-600" />
                    <p className="text-xs text-slate-600">{t('Cases Reported', 'रिपोर्ट किए गए मामले', 'ରିପୋର୍ଟ ହୋଇଥିବା ମାମଲା')}</p>
                  </div>
                  <p className="text-2xl font-mono font-medium text-slate-900">{selectedAlert.casesReported}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={18} className="text-orange-600" />
                    <p className="text-xs text-slate-600">{t('Affected Blocks', 'प्रभावित ब्लॉक', 'ପ୍ରଭାବିତ ବ୍ଲକ')}</p>
                  </div>
                  <p className="text-2xl font-mono font-medium text-slate-900">{selectedAlert.affectedAreas.length}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity size={18} className={selectedAlert.trend === 'increasing' ? 'text-red-600' : selectedAlert.trend === 'stable' ? 'text-amber-600' : 'text-green-600'} />
                    <p className="text-xs text-slate-600">{t('Trend', 'प्रवृत्ति', 'ଧାରା')}</p>
                  </div>
                  <p className="text-base font-medium text-slate-900 capitalize">{selectedAlert.trend}</p>
                </div>
              </div>

              {/* Symptoms */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                  <Heart size={18} className="text-red-600" />
                  {t('Symptoms to Watch For', 'देखने योग्य लक्षण', 'ଦେଖିବାକୁ ଥିବା ଲକ୍ଷଣ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedAlert.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">
                        {t(symptom, selectedAlert.symptomsHindi[index], selectedAlert.symptomsOdia[index])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-purple-600" />
                  {t('Treatment Protocol', 'उपचार प्रोटोकॉल', 'ଚିକିତ୍ସା ପ୍ରୋଟୋକଲ୍')}
                </h3>
                <ul className="space-y-2">
                  {selectedAlert.treatment.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-purple-600 mt-1">•</span>
                      {t(item, selectedAlert.treatmentHindi[index], selectedAlert.treatmentOdia[index])}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vaccination */}
              {selectedAlert.vaccination && (
                <div className="glass-card rounded-xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Syringe size={18} className="text-green-600" />
                    {t('Vaccination Available', 'टीकाकरण उपलब्ध', 'ଟିକା ଉପଲବ୍ଧ')}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p><strong>{t('Vaccine:', 'टीका:', 'ଟିକା:')}</strong> {selectedAlert.vaccination.name}</p>
                    <p><strong>{t('Schedule:', 'अनुसूची:', 'ସମୟସୂଚୀ:')}</strong> {selectedAlert.vaccination.schedule}</p>
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              <div className="glass-card rounded-xl p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                  <Phone size={18} className="text-blue-600" />
                  {t('Emergency Contact', 'आपातकालीन संपर्क', 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ')}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-900"><strong>{selectedAlert.emergencyContact.name}</strong></p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={14} className="text-blue-600" />
                    {selectedAlert.emergencyContact.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={14} className="text-blue-600" />
                    {selectedAlert.emergencyContact.email}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleReportCase(selectedAlert)}
                  className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  {t('Report Suspected Case', 'संदिग्ध मामला रिपोर्ट करें', 'ସନ୍ଦେହଜନକ ମାମଲା ରିପୋର୍ଟ କରନ୍ତୁ')}
                </button>
                <button
                  onClick={() => handleViewGuidelines(selectedAlert)}
                  className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <Shield size={18} />
                  {t('View Prevention Guidelines', 'रोकथाम दिशानिर्देश देखें', 'ନିବାରଣ ଦିଗନ୍ତ ଦେଖନ୍ତୁ')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Report Case Modal */}
      {showReportModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-slate-900">
                    {t('Report Disease Case', 'रोग ���ा मामला रिपोर्ट करें', 'ରୋଗ ମାମଲା ରିପୋର୍ଟ କରନ୍ତୁ')}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t(selectedAlert.disease, selectedAlert.diseaseHindi, selectedAlert.diseaseOdia)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReport} className="p-6 space-y-4">
              {/* Farmer Details */}
              <div className="space-y-4">
                <h3 className="text-slate-900 font-medium">{t('Farmer Details', 'किसान विवरण', 'କୃଷକ ବିବରଣୀ')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Farmer Name', 'किसान का नाम', 'କୃଷକ ନାମ')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportFormData.farmerName}
                      onChange={(e) => setReportFormData({ ...reportFormData, farmerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Farmer ID', 'किसान ID', 'କୃଷକ ID')}
                    </label>
                    <input
                      type="text"
                      value={reportFormData.farmerId}
                      onChange={(e) => setReportFormData({ ...reportFormData, farmerId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Phone Number', 'फोन नंबर', 'ଫୋନ୍ ନମ୍ବର')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={reportFormData.phone}
                      onChange={(e) => setReportFormData({ ...reportFormData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Location', 'स्थान', 'ସ୍ଥାନ')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportFormData.location}
                      onChange={(e) => setReportFormData({ ...reportFormData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Animal Details */}
              <div className="space-y-4">
                <h3 className="text-slate-900 font-medium">{t('Animal Details', 'पशु विवरण', 'ପଶୁ ବିବରଣୀ')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Animal Tag ID', 'पशु टैग ID', 'ପଶୁ ଟ୍ୟାଗ୍ ID')}
                    </label>
                    <input
                      type="text"
                      value={reportFormData.animalTag}
                      onChange={(e) => setReportFormData({ ...reportFormData, animalTag: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Animal Type', 'पशु का प्रकार', 'ପଶୁ ପ୍ରକାର')} *
                    </label>
                    <select
                      required
                      value={reportFormData.animalType}
                      onChange={(e) => setReportFormData({ ...reportFormData, animalType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    >
                      <option value="">{t('Select Type', 'प्रकार चुनें', 'ପ୍ରକାର ବାଛନ୍ତୁ')}</option>
                      <option value="cattle">{t('Cattle', 'गाय/बैल', 'ଗାଈ')}</option>
                      <option value="buffalo">{t('Buffalo', 'भैंस', 'ମହିଷ')}</option>
                      <option value="goat">{t('Goat', 'बकरी', 'ଛେଳି')}</option>
                      <option value="sheep">{t('Sheep', 'भेड़', 'ମେଣ୍ଢା')}</option>
                      <option value="other">{t('Other', 'अन्य', 'ଅନ୍ୟ')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Number of Affected Animals', 'प्रभावित पशुओं की संख्या', 'ପ୍ରଭାବିତ ପଶୁ ସଂଖ୍ୟା')} *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={reportFormData.numberOfAffected}
                      onChange={(e) => setReportFormData({ ...reportFormData, numberOfAffected: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      {t('Date First Noticed', 'पहली बार कब देखा', 'ପ୍ରଥମ ଥର ଦେଖିବା')} *
                    </label>
                    <input
                      type="date"
                      required
                      value={reportFormData.dateFirstNoticed}
                      onChange={(e) => setReportFormData({ ...reportFormData, dateFirstNoticed: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  {t('Symptoms Observed', 'देखे गए लक्षण', 'ଦେଖାଯାଇଥିବା ଲକ୍ଷଣ')} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={reportFormData.symptomsObserved}
                  onChange={(e) => setReportFormData({ ...reportFormData, symptomsObserved: e.target.value })}
                  placeholder={t('Describe all symptoms you have noticed...', 'आपने जो लक्षण देखे हैं उनका वर्णन करें...', 'ଆପଣ ଲକ୍ଷ୍ୟ କରିଥିବା ସମସ୍ତ ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ...')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>

              {/* Photos */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  {t('Upload Photos (Optional)', 'फोटो अपलोड करें (वैकल्पिक)', 'ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ (ବୈକଳ୍ପିକ)')}
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-green-500 transition-all cursor-pointer">
                  <ImageIcon size={32} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 mb-1">
                    {t('Click to upload or drag and drop', 'अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें', 'ଅପଲୋଡ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ')}
                  </p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Alert Box */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">
                    {t('Important', 'महत्वपूर्ण', 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ')}
                  </p>
                  <p>
                    {t('A veterinary officer will contact you within 2-4 hours. Please isolate the affected animal(s) immediately.', 'एक पशु चिकित्सा अधिकारी 2-4 घंटे के भीतर आपसे संपर्क करेगा। कृपया प्रभावित पशु(ओं) को तुरंत अलग करें।', 'ଏକ ପଶୁ ଚିକିତ୍ସକ 2-4 ଘଣ୍ଟା ମଧ୍ୟରେ ଆପଣଙ୍କୁ ଯୋଗାଯୋଗ କରିବେ। ଦୟାକରି ପ୍ରଭାବିତ ପଶୁମାନଙ୍କୁ ତୁରନ୍ତ ପୃଥକ କରନ୍ତୁ।')}
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
                >
                  {t('Cancel', 'रद्द करें', 'ବାତିଲ୍')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {t('Submit Report', 'रिपोर्ट सबमिट करें', 'ରିପୋର୍ଟ ଦାଖଲ କରନ୍ତୁ')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Guidelines Modal */}
      {showGuidelinesModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-slate-900">
                    {t('Prevention Guidelines', 'रोकथाम दिशानिर्देश', 'ନିବାରଣ ଦିଗନ୍ତ')}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t(selectedAlert.disease, selectedAlert.diseaseHindi, selectedAlert.diseaseOdia)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Prevention Measures */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  {t('Prevention Measures', 'रोकथाम के उपाय', 'ନିବାରଣ ପଦକ୍ଷେପ')}
                </h3>
                <div className="space-y-3">
                  {selectedAlert.prevention.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-slate-700 flex-1">
                        {t(item, selectedAlert.preventionHindi[index], selectedAlert.preventionOdia[index])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    {t("DO's", 'करें', 'କରନ୍ତୁ')}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {t('Isolate sick animals immediately', 'बीमार पशुओं को तुरंत अलग करें', 'ଅସୁସ୍ଥ ପଶୁମାନଙ୍କୁ ତୁରନ୍ତ ପୃଥକ କରନ୍ତୁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {t('Maintain proper hygiene', 'उचित स्वच्छता बनाए रखें', 'ଉଚିତ ସ୍ୱଚ୍ଛତା ବଜାୟ ରଖନ୍ତୁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {t('Consult vet immediately', 'तुरंत पशु चिकित्सक से परामर्श करें', 'ତୁରନ୍ତ ପଶୁ ଚିକିତ୍ସକଙ୍କୁ ପରାମର୍ଶ କରନ୍ତୁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {t('Follow vaccination schedule', 'टीकाकरण कार्यक्रम का पालन करें', 'ଟିକାକରଣ କାର୍ଯ୍ୟସୂଚୀ ଅନୁସରଣ କରନ୍ତୁ')}
                    </li>
                  </ul>
                </div>

                <div className="glass-card rounded-xl p-5 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
                  <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                    <X size={18} className="text-red-600" />
                    {t("DON'Ts", 'न करें', 'କରନ୍ତୁ ନାହିଁ')}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      {t('Do not ignore symptoms', 'लक्षणों को नजरअंदाज न करें', 'ଲକ୍ଷଣକୁ ଅଣଦେଖା କରନ୍ତୁ ନାହିଁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      {t('Do not share equipment', 'उपकरण साझा न करें', 'ଯନ୍ତ୍ରପାତି ସେୟାର୍ କରନ୍ତୁ ନାହିଁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      {t('Do not delay treatment', 'उपचार में देरी न करें', 'ଚିକିତ୍ସାରେ ବିଳମ୍ବ କରନ୍ତୁ ନାହିଁ')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      {t('Do not allow animal movement', 'पशुओं की आवाजाही न करें', 'ପଶୁ ଗତିବିଧି ଅନୁମତି ଦିଅନ୍ତୁ ନାହିଁ')}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="glass-card rounded-xl p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Phone size={18} className="text-blue-600" />
                  {t('Need Help? Contact Us', 'मदद चाहिए? हमसे संपर्क करें', 'ସାହାଯ୍ୟ ଦରକାର? ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ')}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-900"><strong>{selectedAlert.emergencyContact.name}</strong></p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={14} className="text-blue-600" />
                    <a href={`tel:${selectedAlert.emergencyContact.phone}`} className="hover:text-blue-600">
                      {selectedAlert.emergencyContact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={14} className="text-blue-600" />
                    <a href={`mailto:${selectedAlert.emergencyContact.email}`} className="hover:text-blue-600">
                      {selectedAlert.emergencyContact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setShowGuidelinesModal(false);
                  handleReportCase(selectedAlert);
                }}
                className="w-full px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                {t('Report Suspected Case Now', 'अभी संदिग्ध मामला रिपोर्ट करें', 'ବର୍ତ୍ତମାନ ସନ୍ଦେହଜନକ ମାମଲା ରିପୋର୍ଟ କରନ୍ତୁ')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
