import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, FileText, Calendar, Activity, Download, Search, Filter } from 'lucide-react';
import { VaccinationCalendar } from '../components/health/VaccinationCalendar';
import { HealthRecordForm } from '../components/health/HealthRecordForm';
import { DiseaseAlertBanner } from '../components/health/DiseaseAlertBanner';
import { HealthStatistics } from '../components/health/HealthStatistics';
import { ScheduleVaccinationModal } from '../components/health/ScheduleVaccinationModal';
import { HealthRecordCard } from '../components/health/HealthRecordCard';
import { HealthRecordDetail } from '../components/health/HealthRecordDetail';
import { useLanguage } from '../contexts/LanguageContext';

type ViewMode = 'overview' | 'calendar' | 'records' | 'detail';

// Sample health records data
const sampleHealthRecords = [
  {
    recordId: 'HR-2024-001',
    animalTag: 'OD-KHD-001234',
    animalName: 'Ganga',
    breed: 'HF Cross',
    farmerId: 'F-001',
    farmerName: 'Ramesh Kumar',
    date: '2024-12-03T10:30:00',
    type: 'treatment' as const,
    status: 'followup-required' as const,
    vetOfficer: {
      name: 'Dr. Rajesh Mohanty',
      phone: '+91-9876543210',
      email: 'dr.mohanty@odisha.gov.in',
      license: 'VET/OD/2020/1234'
    },
    symptoms: ['Loss of appetite', 'Reduced milk production', 'Swelling in udder', 'Fever'],
    diagnosis: 'Subclinical mastitis with bacterial infection. Elevated somatic cell count detected.',
    disease: 'Mastitis',
    severity: 'moderate' as const,
    temperature: 103.5,
    heartRate: 85,
    respiratoryRate: 28,
    treatment: {
      medicines: [
        {
          name: 'Amoxicillin 500mg',
          dosage: '2 tablets',
          frequency: 'Twice daily',
          duration: '7 days'
        },
        {
          name: 'Meloxicam 15mg',
          dosage: '1 tablet',
          frequency: 'Once daily',
          duration: '5 days'
        }
      ],
      procedures: [
        'Udder cleaning and disinfection',
        'Intramammary antibiotic infusion',
        'Supportive fluid therapy'
      ],
      instructions: 'Keep the animal in clean, dry environment. Monitor temperature daily. Ensure proper milking hygiene. Isolate from other animals until recovery.'
    },
    followUp: {
      date: '2024-12-10',
      reason: 'Check infection resolution and milk quality',
      completed: false
    },
    cost: 850.00,
    notes: 'Farmer advised to maintain proper milking hygiene and sanitize equipment regularly. Continue monitoring for next 2 weeks.',
    location: 'Khordha Block, Village Bhubaneswar',
    attachments: []
  },
  {
    recordId: 'HR-2024-002',
    animalTag: 'OD-KHD-001235',
    animalName: 'Lakshmi',
    breed: 'Jersey Cross',
    farmerId: 'F-002',
    farmerName: 'Sita Devi',
    date: '2024-12-03T14:00:00',
    type: 'vaccination' as const,
    status: 'completed' as const,
    vetOfficer: {
      name: 'Dr. Priya Patel',
      phone: '+91-9876543211',
      email: 'dr.patel@odisha.gov.in',
      license: 'VET/OD/2019/5678'
    },
    disease: 'FMD Prevention',
    vaccination: {
      vaccine: 'Foot and Mouth Disease (FMD) Vaccine',
      manufacturer: 'Indian Immunologicals Ltd.',
      batchNo: 'FMD-2024-B123',
      expiryDate: '2025-06-30',
      nextDose: '2025-06-03'
    },
    temperature: 101.0,
    status: 'completed' as const,
    cost: 250.00,
    notes: 'Vaccination administered successfully. Animal showed no adverse reactions. Next dose due in 6 months.',
    location: 'Khordha Block, Village Balakati'
  },
  {
    recordId: 'HR-2024-003',
    animalTag: 'OD-KHD-001236',
    breed: 'Indigenous',
    farmerId: 'F-003',
    farmerName: 'Krishna Swain',
    date: '2024-12-02T16:30:00',
    type: 'emergency' as const,
    status: 'completed' as const,
    vetOfficer: {
      name: 'Dr. Suresh Nayak',
      phone: '+91-9876543212',
      email: 'dr.nayak@odisha.gov.in',
      license: 'VET/OD/2021/9012'
    },
    symptoms: ['Abdominal distention', 'Difficulty breathing', 'Restlessness', 'Reduced rumination'],
    diagnosis: 'Acute bloat due to legume pasture consumption',
    disease: 'Bloat (Tympany)',
    severity: 'severe' as const,
    temperature: 102.8,
    heartRate: 95,
    respiratoryRate: 45,
    treatment: {
      medicines: [
        {
          name: 'Bloat Guard Solution',
          dosage: '500ml',
          frequency: 'Single dose',
          duration: '1 day'
        }
      ],
      procedures: [
        'Stomach tube insertion for gas relief',
        'Anti-foam agent administration',
        'Gentle massage of left flank'
      ],
      instructions: 'Monitor closely for next 24 hours. Gradually introduce dry roughage. Avoid legume pasture for 1 week.'
    },
    cost: 1200.00,
    notes: 'Emergency treatment successful. Animal recovered within 3 hours. Farmer educated about bloat prevention.',
    location: 'Khordha Block, Village Jatni'
  },
  {
    recordId: 'HR-2024-004',
    animalTag: 'OD-KHD-001237',
    animalName: 'Saraswati',
    breed: 'HF Cross',
    farmerId: 'F-001',
    farmerName: 'Ramesh Kumar',
    date: '2024-12-01T09:00:00',
    type: 'checkup' as const,
    status: 'completed' as const,
    vetOfficer: {
      name: 'Dr. Rajesh Mohanty',
      phone: '+91-9876543210',
      email: 'dr.mohanty@odisha.gov.in',
      license: 'VET/OD/2020/1234'
    },
    diagnosis: 'Routine health checkup - All parameters normal',
    temperature: 101.5,
    heartRate: 72,
    respiratoryRate: 24,
    cost: 150.00,
    notes: 'Animal in good health. Regular deworming recommended in 3 months.',
    location: 'Khordha Block, Village Bhubaneswar'
  }
];

export default function HealthVaccination() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [isHealthFormOpen, setIsHealthFormOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record);
    setViewMode('detail');
  };

  const handleBackFromDetail = () => {
    setSelectedRecord(null);
    setViewMode('records');
  };

  // Filter records
  const filteredRecords = sampleHealthRecords.filter(record => {
    const matchesSearch = 
      record.animalTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.disease?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Show detail view
  if (viewMode === 'detail' && selectedRecord) {
    return (
      <HealthRecordDetail
        record={selectedRecord}
        onBack={handleBackFromDetail}
        onEdit={() => {
          setIsHealthFormOpen(true);
        }}
        onDelete={() => {
          handleBackFromDetail();
          alert('Record deleted successfully');
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-slate-900 mb-1">{t('Health & Vaccination Management', 'स्वास्थ्य और टीकाकरण प्रबंधन', 'ସ୍ୱାସ୍ଥ୍ୟ ଓ ଟିକାକରଣ ପରିଚାଳନା')}</h2>
            <p className="text-sm text-slate-600">{t('Track health records and vaccination schedules', 'स्वास्थ्य रिकॉर्ड और टीकाकरण कार्यक्रम ट्रैक करें', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଏବଂ ଟିକାକରଣ କାର୍ଯସୂଚୀ ଟ୍ରାକ୍ କରନ୍ତୁ')}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 hover:bg-white transition-all flex items-center gap-2"
            >
              <Calendar size={18} />
              <span className="text-sm">{t('Schedule Camp', 'कैंप शेड्यूल करें', 'କ୍ୟାମ୍ପ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')}</span>
            </button>
            <button
              onClick={() => setIsHealthFormOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2"
            >
              <Plus size={20} />
              {t('Add Health Record', 'स्वास्थ्य रिकॉर्ड जोड़ें', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ')}
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/70 rounded-xl p-1 border border-white/30 w-fit">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'overview'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Activity size={16} />
              {t('Overview', 'अवलोकन', 'ସାରାଂଶ')}
            </span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'calendar'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {t('Calendar', 'कैलेंडर', 'କ୍ୟାଲେଣ୍ଡର')}
            </span>
          </button>
          <button
            onClick={() => setViewMode('records')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'records'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText size={16} />
              {t('Health Records', 'स्वास्थ्य रिकॉर्ड', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ')}
            </span>
          </button>
        </div>
      </div>

      {/* Disease Alerts */}
      <DiseaseAlertBanner />

      {/* Main Content */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Statistics */}
          <HealthStatistics />

          {/* Quick Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 font-medium mb-1">
                  {t('Click on any health record card below to view full details', 'नीचे किसी भी स्वास्थ्य रिकॉर्ड कार्ड पर क्लिक करें पूर्ण विवरण देखने के लिए', 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ଦେଖିବା ପାଇଁ ନିମ୍ନରେ ଯେକୌଣସି ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ କାର୍ଡରେ କ୍ଲିକ୍ କରନ୍ତୁ')}
                </p>
                <p className="text-xs text-slate-600">
                  {t('View medicines, treatments, vital signs, and more', 'दवाएं, उपचार, महत्वपूर्ण संकेत और अधिक देखें', 'ଔଷଧ, ଚିକିତ୍ସା, ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସଙ୍କେତ ଏବଂ ଅଧିକ ଦେଖନ୍ତୁ')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Schedule Vaccination', 'टीकाकरण शेड्यूल करें', 'ଟିକାକରଣ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Organize vaccination camps for your block', 'अपने ब्लॉक के लिए टीकाकरण शिविर आयोजित करें', 'ଆପଣଙ୍କ ବ୍ଲକ ପାଇଁ ଟିକାକରଣ ଶିବିର ଆୟୋଜନ କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('Book Camp', 'कैंप बुक करें', 'କ୍ୟାମ୍ପ ବୁକ୍ କରନ୍ତୁ')}
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => setIsHealthFormOpen(true)}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg">
                <FileText className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Record Health Check', 'स्वास्थ्य जांच रिकॉर्ड करें', 'ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା ରେକର୍ଡ କରନ୍ତୁ')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Document health checkups and treatments', 'स्वास्थ्य जांच और उपचार दस्तावेज़ करें', 'ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଏବଂ ଚିକିତ୍ସା ଦସ୍ତାବେଜ କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('Add Record', 'रिकॉर्ड जोड़ें', 'ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ')}
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg">
                <Download className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Download Reports', 'रिपोर्ट डाउनलोड करें', 'ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Generate health and vaccination reports', 'स्वास्थ्य और टीकाकरण रिपोर्ट जेनरेट करें', 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଟିକାକରଣ ରିପୋର୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('Generate Report', 'रिपोर्ट जेनरेट करें', 'ରିପୋର୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ')}
              </button>
            </motion.div>
          </div>

          {/* Recent Health Records */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-slate-800 mb-1">{t('Recent Health Records', 'हाल के स्वास्थ्य रिकॉर्ड', 'ସାମ୍ପ୍ରତିକ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ')}</h3>
                <p className="text-sm text-slate-600">{t('Latest health checkups and treatments', 'नवीनतम स्वास्थ्य जांच और उपचार', 'ନୂତନ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଏବଂ ଚିକିତ୍ସା')}</p>
              </div>
              <button 
                onClick={() => setViewMode('records')}
                className="text-sm text-green-600 hover:text-green-700"
              >
                {t('View All', 'सभी देखें', 'ସମସ୍ତ ଦେଖନ୍ତୁ')} →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleHealthRecords.slice(0, 4).map((record, index) => (
                <HealthRecordCard
                  key={index}
                  recordId={record.recordId}
                  animalTag={record.animalTag}
                  animalName={record.animalName}
                  farmerName={record.farmerName}
                  date={record.date}
                  type={record.type}
                  status={record.status}
                  vetOfficer={record.vetOfficer.name}
                  diagnosis={record.diagnosis}
                  disease={record.disease}
                  temperature={record.temperature}
                  severity={record.severity}
                  followUpDate={record.followUp?.date}
                  onClick={() => handleRecordClick(record)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VaccinationCalendar />
          </div>
          
          <div className="space-y-6">
            {/* Vaccine Inventory */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-slate-800 mb-4">{t('Vaccine Inventory', 'टीका इन्वेंटरी', 'ଟୀକା ଭଣ୍ଡାର')}</h3>
              <div className="space-y-3">
                {[
                  { name: 'FMD', stock: 450, unit: t('doses', 'खुराक', 'ଡୋଜ୍'), status: t('Good', 'अच्छा', 'ଭଲ') },
                  { name: 'HS', stock: 230, unit: t('doses', 'खुराक', 'ଡୋଜ୍'), status: t('Good', 'अच्छा', 'ଭଲ') },
                  { name: 'BQ', stock: 85, unit: t('doses', 'खुराक', 'ଡୋଜ୍'), status: t('Low', 'कम', 'କମ୍') },
                  { name: 'Rabies', stock: 340, unit: t('doses', 'खुराक', 'ଡୋଜ୍'), status: t('Good', 'अच्छा', 'ଭଲ') }
                ].map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                    <div>
                      <p className="text-sm text-slate-900">{vaccine.name}</p>
                      <p className="text-xs text-slate-600">{vaccine.stock} {vaccine.unit}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vaccine.status.includes('Good') || vaccine.status.includes('अच्छा') || vaccine.status.includes('ଭଲ')
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {vaccine.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-slate-800 mb-4">{t("Today's Schedule", 'आज का कार्यक्रम', 'ଆଜିର କାର୍ଯ୍ୟସୂଚୀ')}</h3>
              <p className="text-sm text-slate-600 text-center py-6">
                {t('No camps scheduled for today', 'आज के लिए कोई शिविर निर्धारित नहीं है', 'ଆଜି ପାଇଁ କୌଣସି ଶିବିର ନିର୍ଦ୍ଧାରିତ ନାହିଁ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'records' && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-slate-800 mb-1">{t('Health Records', 'स्वास्थ्य रिकॉर्ड', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ')}</h3>
              <p className="text-sm text-slate-600">{t('Manage health records for your block', 'अपने ब्लॉक के लिए स्वास्थ्य रिकॉर्ड प्रबंधित करें', 'ଆପଣଙ୍କ ବ୍ଲକ ପାଇଁ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ପରିଚାଳନ କରନ୍ତୁ')}</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('Search records', 'रिकॉर्ड खोजें', 'ରେକର୍ଡ ଖୋଜନ୍ତୁ')}
                  className="px-10 py-2.5 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all w-48"
                />
              </div>
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-10 py-2.5 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all w-48"
                >
                  <option value="all">{t('All Types', 'सभी प्रकार', 'ସମସ୍ତ ପ୍ରକାର')}</option>
                  <option value="treatment">{t('Treatment', 'उपचार', 'ଚିକିତ୍ସା')}</option>
                  <option value="vaccination">{t('Vaccination', 'टीकाकरण', 'ଟିକାକରଣ')}</option>
                  <option value="emergency">{t('Emergency', 'आपातकालीन', 'ଜରୁରୀ')}</option>
                  <option value="checkup">{t('Checkup', 'जांच', 'ଯାଞ୍ଚ')}</option>
                </select>
              </div>
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-10 py-2.5 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all w-48"
                >
                  <option value="all">{t('All Statuses', 'सभी स्थिति', 'ସମସ୍ତ ସ୍ଥିତି')}</option>
                  <option value="completed">{t('Completed', 'पूरा हुआ', 'ପୂରା ହୋଇଛି')}</option>
                  <option value="followup-required">{t('Followup Required', 'फ़ॉलोअप आवश्यक', 'ଫାଲୋअପ ଆବଶ୍ୟକ')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRecords.map((record, index) => (
              <HealthRecordCard
                key={index}
                recordId={record.recordId}
                animalTag={record.animalTag}
                animalName={record.animalName}
                farmerName={record.farmerName}
                date={record.date}
                type={record.type}
                status={record.status}
                vetOfficer={record.vetOfficer.name}
                diagnosis={record.diagnosis}
                disease={record.disease}
                temperature={record.temperature}
                severity={record.severity}
                followUpDate={record.followUp?.date}
                onClick={() => handleRecordClick(record)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <HealthRecordForm 
        isOpen={isHealthFormOpen} 
        onClose={() => setIsHealthFormOpen(false)} 
      />
      <ScheduleVaccinationModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </motion.div>
  );
}