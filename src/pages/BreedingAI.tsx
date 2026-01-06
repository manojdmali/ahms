import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Dna, Calendar, FlaskConical, BarChart3, FileText, Download } from 'lucide-react';
import { AIServiceForm } from '../components/breeding/AIServiceForm';
import { PregnancyTracker } from '../components/breeding/PregnancyTracker';
import { SemenInventory } from '../components/breeding/SemenInventory';
import { BreedingAnalytics } from '../components/breeding/BreedingAnalytics';
import { useLanguage } from '../contexts/LanguageContext';

type ViewMode = 'overview' | 'pregnancy' | 'inventory' | 'analytics';

export default function BreedingAI() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [isAIFormOpen, setIsAIFormOpen] = useState(false);

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
            <h2 className="text-slate-900 mb-1">{t('Breeding & AI Services', 'प्रजनन और AI सेवाएं', 'ପ୍ରଜନନ ଓ କୃତ୍ରିମ ଗର୍ଭାଧାନ')}</h2>
            <p className="text-sm text-slate-600">{t('Manage artificial insemination and breeding programs', 'कृत्रिम गर्भाधान और प्रजनन कार्यक्रम प्रबंधित करें', 'କୃତ୍ରିମ ଗର୍ଭାଧାନ ଏବଂ ପ୍ରଜନନ କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା କରନ୍ତୁ')}</p>
          </div>
          <button
            onClick={() => setIsAIFormOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2"
          >
            <Plus size={20} />
            {t('Request AI Service', 'AI सेवा अनुरोध करें', 'AI ସେବା ଅନୁରୋଧ କରନ୍ତୁ')}
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/70 rounded-xl p-1 border border-white/30 w-fit">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'overview'
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Dna size={16} />
              {t('Overview', 'अवलोकन', 'ସାରାଂଶ')}
            </span>
          </button>
          <button
            onClick={() => setViewMode('pregnancy')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'pregnancy'
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {t('Pregnancy Tracking', 'गर्भावस्था ट्रैकिंग', 'ଗର୍ଭଧାରଣ ଟ୍ରାକିଂ')}
            </span>
          </button>
          <button
            onClick={() => setViewMode('inventory')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'inventory'
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <FlaskConical size={16} />
              {t('Semen Inventory', 'वीर्य इन्वेंटरी', 'ବୀଜ ଭଣ୍ଡାର')}
            </span>
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'analytics'
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart3 size={16} />
              {t('Analytics', 'विश्लेषण', 'ବିଶ୍ଳେଷଣ')}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">{t('AI Services (Dec)', 'AI सेवाएं (दिसंबर)', 'AI ସେବା (ଡିସେମ୍ବର)')}</p>
              <p className="text-slate-900 font-mono mb-1">345</p>
              <p className="text-xs text-green-600">{t('+12% from Nov', '+12% नवंबर से', '+12% ନଭେମ୍ବରରୁ')}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">{t('Conception Rate', 'गर्भाधान दर', 'ଗର୍ଭଧାରଣ ହାର')}</p>
              <p className="text-slate-900 font-mono mb-1">74%</p>
              <p className="text-xs text-green-600">{t('+8% from last month', '+8% पिछले महीने से', '+8% ଗତ ମାସରୁ')}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">{t('Pregnant Animals', 'गर्भवती पशु', 'ଗର୍ଭବତୀ ପଶୁ')}</p>
              <p className="text-slate-900 font-mono mb-1">1,266</p>
              <p className="text-xs text-blue-600">{t('Actively tracked', 'सक्रिय रूप से ट्रैक किया गया', 'ସକ୍ରିୟ ଭାବରେ ଟ୍ରାକ୍ ହୋଇଛି')}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">{t('Due in 30 Days', '30 दिनों में नियत', '30 ଦିନରେ ନିର୍ଦ୍ଧାରିତ')}</p>
              <p className="text-slate-900 font-mono mb-1">47</p>
              <p className="text-xs text-amber-600">{t('Calving expected', 'ब्याने की उम्मीद', 'ପ୍ରସବ ଆଶା କରାଯାଉଛି')}</p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => setIsAIFormOpen(true)}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <Dna className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Request AI Service', 'AI सेवा अनुरोध करें', 'AI ସେବା ଅନୁରୋଧ କରନ୍ତୁ')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Schedule AI service for animals in heat', 'गर्मी में पशुओं के लिए AI सेवा शेड्यूल करें', 'ଉତ୍ତାପରେ ଥିବା ପଶୁମାନଙ୍କ ପାଇଁ AI ସେବା ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('Create Request', 'अनुरोध बनाएं', 'ଅନୁରୋଧ ସୃଷ୍ଟି କରନ୍ତୁ')}
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => setViewMode('pregnancy')}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Pregnancy Tracking', 'गर्भावस्था ट्रैकिंग', 'ଗର୍ଭଧାରଣ ଟ୍ରାକିଂ')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Monitor pregnancy progress and calving dates', 'गर्भावस्था की प्रगति और ब्याने की तारीखों की निगरानी करें', 'ଗର୍ଭଧାରଣ ପ୍ରଗତି ଏବଂ ପ୍ରସବ ତାରିଖ ମନିଟର୍ କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('View Tracker', 'ट्रैकर देखें', 'ଟ୍ରାକର୍ ଦେଖନ୍ତୁ')}
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => setViewMode('inventory')}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg">
                <FlaskConical className="text-white" size={24} />
              </div>
              <h3 className="text-slate-800 mb-1">{t('Semen Inventory', 'वीर्य इन्वेंटरी', 'ବୀଜ ଭଣ୍ଡାର')}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {t('Manage frozen semen stock and quality', 'जमी हुई वीर्य स्टॉक और गुणवत्ता प्रबंधित करें', 'ଫ୍ରିଜ୍ ବୀଜ ଷ୍ଟକ୍ ଏବଂ ଗୁଣବତ୍ତା ପରିଚାଳନା କରନ୍ତୁ')}
              </p>
              <button className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press">
                {t('Check Stock', 'स्टॉक चेक करें', 'ଷ୍ଟକ୍ ଯାଞ୍ଚ କରନ୍ତୁ')}
              </button>
            </motion.div>
          </div>

          {/* Recent AI Services */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-slate-800 mb-1">{t('Recent AI Services', 'हाल की AI सेवाएं', 'ସାମ୍ପ୍ରତିକ AI ସେବା')}</h3>
                <p className="text-sm text-slate-600">{t('Latest artificial insemination records', 'नवीनतम कृत्रिम गर्भाधान रिकॉर्ड', 'ନୂତନ କୃତ୍ରିମ ଗର୍ଭାଧାନ ରେକର୍ଡ')}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all text-sm flex items-center gap-2">
                  <Download size={16} />
                  {t('Export', 'निर्यात', 'ରପ୍ତାନି')}
                </button>
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  {t('View All', 'सभी देखें', 'ସମସ୍ତ ଦେଖନ୍ତୁ')} →
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  tag: 'OD-KHD-001234',
                  breed: 'HF Cross',
                  date: t('Today, 10:30 AM', 'आज, 10:30 AM', 'ଆଜି, 10:30 AM'),
                  technician: 'Rajesh Kumar',
                  bullBreed: 'Holstein Friesian',
                  status: t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ'),
                  checkDue: t('45 days', '45 दिन', '45 ଦିନ')
                },
                {
                  tag: 'OD-KHD-001235',
                  breed: 'Jersey',
                  date: t('Today, 2:15 PM', 'आज, 2:15 PM', 'ଆଜି, 2:15 PM'),
                  technician: 'Prakash Mohanty',
                  bullBreed: 'Jersey',
                  status: t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ'),
                  checkDue: t('45 days', '45 दिन', '45 ଦିନ')
                },
                {
                  tag: 'OD-KHD-001236',
                  breed: 'Murrah Buffalo',
                  date: t('Yesterday, 4:00 PM', 'कल, 4:00 PM', 'ଗତକାଲି, 4:00 PM'),
                  technician: 'Suresh Patel',
                  bullBreed: 'Murrah',
                  status: t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ'),
                  checkDue: t('44 days', '44 दिन', '44 ଦିନ')
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                      <Dna size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 font-mono mb-1">{service.tag}</p>
                      <p className="text-xs text-slate-600">
                        {service.breed} • {service.bullBreed} {t('semen', 'वीर्य', 'ବୀଜ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">{t('Technician', 'तकनीशियन', 'ଟେକ୍ନିସିଆନ୍')}</p>
                      <p className="text-sm text-slate-900">{service.technician}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">{t('Service Date', 'सेवा तिथि', 'ସେବା ତାରିଖ')}</p>
                      <p className="text-sm text-slate-900">{service.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">{t('Check Due In', 'जांच नियत है', 'ଯାଞ୍ଚ ନିର୍ଦ୍ଧାରିତ')}</p>
                      <p className="text-sm font-mono text-purple-600">{service.checkDue}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technician Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-slate-800 mb-4">{t('AI Technicians', 'AI तकनीशियन', 'AI ଟେକ୍ନିସିଆନ୍')}</h3>
              <div className="space-y-3">
                {[
                  { name: 'Rajesh Kumar', id: 'AI001', services: 234, rate: 82, available: true },
                  { name: 'Prakash Mohanty', id: 'AI002', services: 198, rate: 78, available: true },
                  { name: 'Suresh Patel', id: 'AI003', services: 187, rate: 75, available: false },
                  { name: 'Mahesh Sahu', id: 'AI004', services: 156, rate: 72, available: true }
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-white/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-slate-900">{tech.name}</p>
                          <span className={`w-2 h-2 rounded-full ${tech.available ? 'bg-green-500' : 'bg-slate-400'}`} />
                        </div>
                        <p className="text-xs text-slate-600">ID: {tech.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-purple-600">{tech.rate}%</p>
                      <p className="text-xs text-slate-500">{tech.services} {t('services', 'सेवाएं', 'ସେବା')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-slate-800 mb-4">{t('Upcoming Pregnancy Checks', 'आगामी गर्भावस्था जांच', 'ଆଗାମୀ ଗର୍ଭଧାରଣ ଯାଞ୍ଚ')}</h3>
              <div className="space-y-3">
                {[
                  { tag: 'OD-KHD-001230', daysLeft: 2, aiDate: 'Nov 18, 2024' },
                  { tag: 'OD-KHD-001231', daysLeft: 5, aiDate: 'Nov 21, 2024' },
                  { tag: 'OD-KHD-001232', daysLeft: 8, aiDate: 'Nov 24, 2024' },
                  { tag: 'OD-KHD-001233', daysLeft: 12, aiDate: 'Nov 28, 2024' }
                ].map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-white/30"
                  >
                    <div>
                      <p className="text-sm text-slate-900 font-mono mb-1">{check.tag}</p>
                      <p className="text-xs text-slate-600">AI: {check.aiDate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-mono ${check.daysLeft <= 3 ? 'text-red-600' : 'text-amber-600'}`}>
                        {check.daysLeft} {t('days', 'दिन', 'ଦିନ')}
                      </p>
                      <p className="text-xs text-slate-500">{t('Check due', 'जांच नियत', 'ଯାଞ୍ଚ ନିର୍ଦ୍ଧାରିତ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'pregnancy' && <PregnancyTracker />}
      {viewMode === 'inventory' && <SemenInventory />}
      {viewMode === 'analytics' && <BreedingAnalytics />}

      {/* AI Service Form Modal */}
      <AIServiceForm isOpen={isAIFormOpen} onClose={() => setIsAIFormOpen(false)} />
    </motion.div>
  );
}
