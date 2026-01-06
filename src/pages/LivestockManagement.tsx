import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Download, Grid, List } from 'lucide-react';
import { AnimalCard } from '../components/livestock/AnimalCard';
import { RegistrationWizard } from '../components/livestock/RegistrationWizard';
import { AnimalProfile } from '../components/livestock/AnimalProfile';
import { useLanguage } from '../contexts/LanguageContext';

type ViewMode = 'list' | 'grid' | 'profile';

export default function LivestockManagement() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Mock data
  const animals = [
    {
      tag: 'OD-KHD-2024-001234',
      breed: 'Holstein Friesian Cross',
      gender: 'Female' as const,
      age: '3 years 4 months',
      owner: 'Ramesh Kumar',
      location: 'Balipatna, Khordha',
      healthScore: 85,
      insurance: true,
      milkYield: '14L',
      lastVaccine: '15 days ago'
    },
    {
      tag: 'OD-KHD-2024-001235',
      breed: 'Murrah Buffalo',
      gender: 'Female' as const,
      age: '5 years 2 months',
      owner: 'Suresh Patel',
      location: 'Tangi, Khordha',
      healthScore: 92,
      insurance: true,
      milkYield: '12L',
      lastVaccine: '8 days ago'
    },
    {
      tag: 'OD-KHD-2024-001236',
      breed: 'Sahiwal',
      gender: 'Female' as const,
      age: '4 years 8 months',
      owner: 'Mahendra Sahu',
      location: 'Bhubaneswar',
      healthScore: 78,
      insurance: false,
      milkYield: '10L',
      lastVaccine: '22 days ago'
    },
    {
      tag: 'OD-KHD-2024-001237',
      breed: 'HF Cross',
      gender: 'Male' as const,
      age: '2 years 1 month',
      owner: 'Bijay Kumar',
      location: 'Jatni, Khordha',
      healthScore: 88,
      insurance: true,
      lastVaccine: '12 days ago'
    },
    {
      tag: 'OD-KHD-2024-001238',
      breed: 'Indigenous Desi',
      gender: 'Female' as const,
      age: '6 years',
      owner: 'Sanjay Mohanty',
      location: 'Balipatna, Khordha',
      healthScore: 65,
      insurance: false,
      milkYield: '6L',
      lastVaccine: '30 days ago'
    },
    {
      tag: 'OD-KHD-2024-001239',
      breed: 'Jersey Cross',
      gender: 'Female' as const,
      age: '3 years',
      owner: 'Prakash Jena',
      location: 'Khordha',
      healthScore: 90,
      insurance: true,
      milkYield: '16L',
      lastVaccine: '5 days ago'
    }
  ];

  if (viewMode === 'profile') {
    return <AnimalProfile onBack={() => setViewMode('grid')} />;
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
            <h2 className="text-slate-900 mb-1">{t('Livestock Management', 'पशुधन प्रबंधन', 'ପଶୁଧନ ପରିଚାଳନା')}</h2>
            <p className="text-sm text-slate-600">{t('Track and manage all registered animals', 'सभी पंजीकृत पशुओं को ट्रैक और प्रबंधित करें', 'ସମସ୍ତ ପଞ୍ଜୀକୃତ ପଶୁମାନଙ୍କୁ ଟ୍ରାକ୍ ଏବଂ ପରିଚାଳନା କରନ୍ତୁ')}</p>
          </div>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2"
          >
            <Plus size={20} />
            {t('Register New Livestock', 'नया पशु पंजीकृत करें', 'ନୂତନ ପଶୁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ')}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search by tag ID, breed, owner name...', 'टैग ID, नस्ल, मालिक के नाम से खोजें...', 'ଟ୍ୟାଗ୍ ID, ପ୍ରଜାତି, ମାଲିକଙ୍କ ନାମରେ ଖୋଜନ୍ତୁ...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Species Filter */}
          <div>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Species', 'सभी प्रजातियां', 'ସମସ୍ତ ପ୍ରଜାତି')}</option>
              <option value="cattle">{t('Cattle', 'गाय/बैल', 'ଗୋରୁ')}</option>
              <option value="buffalo">{t('Buffalo', 'भैंस', 'ମହିଷ')}</option>
              <option value="goat">{t('Goat', 'बकरी', 'ଛେଳି')}</option>
              <option value="sheep">{t('Sheep', 'भेड़', 'ମେଣ୍ଢା')}</option>
              <option value="poultry">{t('Poultry', 'मुर्गी', 'କୁକୁଡ଼ା')}</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Blocks', 'सभी ब्लॉक', 'ସମସ୍ତ ବ୍ଲକ')}</option>
              <option value="balipatna">Balipatna</option>
              <option value="tangi">Tangi</option>
              <option value="bhubaneswar">Bhubaneswar</option>
              <option value="jatni">Jatni</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-sm">
              <Filter size={16} />
              {t('Advanced Filters', 'उन्नत फिल्टर', 'ଉନ୍ନତ ଫିଲ୍ଟର୍')}
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-sm">
              <Download size={16} />
              {t('Export', 'निर्यात', 'ରପ୍ତାନି')}
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white/70 rounded-xl p-1 border border-white/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-green-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-green-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{t('Total Animals', 'कुल पशु', 'କୁଲ ପଶୁ')}</p>
          <p className="text-slate-900 font-mono mb-1">45,789</p>
          <p className="text-xs text-green-600">{t('+234 this month', '+234 इस महीने', '+234 ଏହି ମାସରେ')}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{t('Healthy', 'स्वस्थ', 'ସୁସ୍ଥ')}</p>
          <p className="text-slate-900 font-mono mb-1">42,156</p>
          <p className="text-xs text-green-600">92.1%</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{t('Under Treatment', 'उपचार के अधीन', 'ଚିକିତ୍ସାଧୀନ')}</p>
          <p className="text-slate-900 font-mono mb-1">1,234</p>
          <p className="text-xs text-amber-600">2.7%</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{t('Insured', 'बीमाकृत', 'ବୀମାଭୁକ୍ତ')}</p>
          <p className="text-slate-900 font-mono mb-1">38,456</p>
          <p className="text-xs text-blue-600">84%</p>
        </div>
      </div>

      {/* Animals Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {animals.map((animal, index) => (
            <AnimalCard
              key={index}
              {...animal}
              onClick={() => setViewMode('profile')}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/50 border-b border-white/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Tag ID', 'टैग ID', 'ଟ୍ୟାଗ୍ ID')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Breed', 'नस्ल', 'ପ୍ରଜାତି')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Owner', 'मालिक', 'ମାଲିକ')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Location', 'स्थान', 'ସ୍ଥାନ')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Health Score', 'स्वास्थ्य स्कोर', 'ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Status', 'स्थिति', 'ସ୍ଥିତି')}</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">{t('Actions', 'क्रियाएं', 'କାର୍ଯ୍ୟ')}</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal, index) => (
                <tr
                  key={index}
                  onClick={() => setViewMode('profile')}
                  className="border-b border-white/20 hover:bg-white/30 cursor-pointer transition-all"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-900">{animal.tag}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{animal.breed}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{animal.owner}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{animal.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            animal.healthScore >= 80
                              ? 'bg-green-500'
                              : animal.healthScore >= 60
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${animal.healthScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-slate-700">{animal.healthScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {animal.insurance ? (
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        {t('Insured', 'बीमाकृत', 'ବୀମାଭୁକ୍ତ')}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                        {t('Not Insured', 'अबीमाकृत', 'ବୀମାଭୁକ୍ତ ନୁହେଁ')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-green-600 hover:text-green-700">
                      {t('View', 'देखें', 'ଦେଖନ୍ତୁ')} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="glass-card rounded-xl p-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">1-6</span> {t('of', 'का', 'ର')}{' '}
          <span className="font-mono text-slate-900">45,789</span> {t('animals', 'पशु', 'ପଶୁ')}
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 text-sm transition-all">
            {t('Previous', 'पिछला', 'ପୂର୍ବ')}
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-sm">1</button>
          <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 text-sm transition-all">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 text-sm transition-all">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white border border-white/30 text-sm transition-all">
            {t('Next', 'अगला', 'ପରବର୍ତ୍ତୀ')}
          </button>
        </div>
      </div>

      {/* Registration Wizard Modal */}
      <RegistrationWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </motion.div>
  );
}
