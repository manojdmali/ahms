import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Download, MapPin, Users, LayoutGrid, List } from 'lucide-react';
import { FarmerCard } from '../components/farmers/FarmerCard';
import { FarmerDetail } from '../components/farmers/FarmerDetail';
import { farmersData } from '../data/farmersData';
import { useLanguage } from '../contexts/LanguageContext';

type ViewMode = 'list' | 'detail';
type DisplayMode = 'grid' | 'list';

export default function FarmersManagement() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedKycStatus, setSelectedKycStatus] = useState('all');

  // Use the imported farmers data
  const farmers = farmersData;

  // Get unique blocks
  const blocks = Array.from(new Set(farmers.map(f => f.address.block)));

  // Filter farmers
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.farmerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.contact.includes(searchQuery) ||
      farmer.address.village.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBlock = selectedBlock === 'all' || farmer.address.block === selectedBlock;
    const matchesKyc = selectedKycStatus === 'all' || farmer.kycStatus === selectedKycStatus;

    return matchesSearch && matchesBlock && matchesKyc;
  });

  const handleFarmerClick = (farmer: any) => {
    setSelectedFarmer(farmer);
    setViewMode('detail');
  };

  if (viewMode === 'detail' && selectedFarmer) {
    return <FarmerDetail farmer={selectedFarmer} onBack={() => setViewMode('list')} />;
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
            <h2 className="text-slate-900 mb-1">{t('Farmers Management', 'किसान प्रबंधन', 'କୃଷକ ପରିଚାଳନା')}</h2>
            <p className="text-sm text-slate-600">{t('Manage and track farmer registrations', 'किसान पंजीकरण प्रबंधित और ट्रैक करें', 'କୃଷକ ପଞ୍ଜୀକରଣ ପରିଚାଳନା ଏବଂ ଟ୍ରାକ୍ କରନ୍ତୁ')}</p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2">
            <Plus size={20} />
            {t('Register New Farmer', 'नया किसान पंजीकृत करें', 'ନୂତନ କୃଷକ ପଞ୍ଜୀକରଣ କରନ୍ତୁ')}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search by name, ID, phone, or village...', 'नाम, ID, फोन या गांव से खोजें...', 'ନାମ, ID, ଫୋନ୍ କିମ୍ବା ଗାଁ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Block Filter */}
          <div>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Blocks', 'सभी ब्लॉक', 'ସମସ୍ତ ବ୍ଲକ')}</option>
              {blocks.map((block) => (
                <option key={block} value={block}>{block}</option>
              ))}
            </select>
          </div>

          {/* KYC Status Filter */}
          <div>
            <select
              value={selectedKycStatus}
              onChange={(e) => setSelectedKycStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Status', 'सभी स्थिति', 'ସମସ୍ତ ସ୍ଥିତି')}</option>
              <option value="Verified">{t('KYC Verified', 'KYC सत्यापित', 'KYC ଯାଞ୍ଚ ହୋଇଛି')}</option>
              <option value="Pending">{t('KYC Pending', 'KYC लंबित', 'KYC ବିଚାରାଧୀନ')}</option>
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

          <div className="flex items-center gap-3">
            {/* List / Grid toggle */}
            <div className="flex items-center bg-white/70 border border-white/30 rounded-xl p-1 gap-1">
              <button
                onClick={() => setDisplayMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  displayMode === 'grid' ? 'bg-green-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Grid view"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setDisplayMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  displayMode === 'list' ? 'bg-green-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'
                }`}
                title="List view"
              >
                <List size={15} />
              </button>
            </div>

            <p className="text-sm text-slate-600">
              {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredFarmers.length}</span> {t('of', 'का', 'ର')}{' '}
              <span className="font-mono text-slate-900">{farmers.length}</span> {t('farmers', 'किसान', 'କୃଷକ')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-green-600" size={20} />
            <span className="text-sm text-slate-600">{t('Total Farmers', 'कुल किसान', 'କୁଲ କୃଷକ')}</span>
          </div>
          <p className="text-slate-900 font-mono mb-1">{farmers.length}</p>
          <p className="text-xs text-green-600">{t('All registered', 'सभी पंजीकृत', 'ସମସ୍ତ ପଞ୍ଜୀକୃତ')}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-blue-600" size={20} />
            <span className="text-sm text-slate-600">{t('Blocks Covered', 'कवर किए गए ब्लॉक', 'କଭର୍ ହୋଇଥିବା ବ୍ଲକ')}</span>
          </div>
          <p className="text-slate-900 font-mono mb-1">{blocks.length}</p>
          <p className="text-xs text-blue-600">{t('Khordha District', 'खोर्धा जिला', 'ଖୋର୍ଦ୍ଧା ଜିଲ୍ଲା')}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-sm text-slate-600">{t('KYC Verified', 'KYC सत्यापित', 'KYC ଯାଞ୍ଚ ହୋଇଛି')}</span>
          </div>
          <p className="text-slate-900 font-mono mb-1">
            {farmers.filter(f => f.kycStatus === 'Verified').length}
          </p>
          <p className="text-xs text-green-600">
            {((farmers.filter(f => f.kycStatus === 'Verified').length / farmers.length) * 100).toFixed(0)}%
          </p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-600 text-xl">🐄</span>
            <span className="text-sm text-slate-600">{t('Total Livestock', 'कुल पशुधन', 'କୁଲ ପଶୁଧନ')}</span>
          </div>
          <p className="text-slate-900 font-mono mb-1">
            {farmers.reduce((sum, f) => sum + f.totalLivestock, 0)}
          </p>
          <p className="text-xs text-purple-600">{t('Across all farmers', 'सभी किसानों में', 'ସମସ୍ତ କୃଷକଙ୍କ ମଧ୍ୟରେ')}</p>
        </div>
      </div>

      {/* Farmers List/Grid */}
      {displayMode === 'list' ? (
        <div className="glass-card-darker rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Farmer</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Livestock</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">KYC</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Insurance</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="bg-white/40">
                {filteredFarmers.map((farmer) => (
                  <FarmerCard
                    key={farmer.id}
                    id={farmer.id}
                    farmerId={farmer.farmerId}
                    name={farmer.name}
                    nameOdia={farmer.nameOdia}
                    contact={farmer.contact}
                    village={farmer.address.village}
                    block={farmer.address.block}
                    totalLivestock={farmer.totalLivestock}
                    livestock={farmer.livestock}
                    kycStatus={farmer.kycStatus}
                    insuranceStatus={farmer.insuranceStatus}
                    schemes={farmer.schemes}
                    onClick={() => handleFarmerClick(farmer)}
                    viewMode="list"
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFarmers.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              id={farmer.id}
              farmerId={farmer.farmerId}
              name={farmer.name}
              nameOdia={farmer.nameOdia}
              contact={farmer.contact}
              village={farmer.address.village}
              block={farmer.address.block}
              totalLivestock={farmer.totalLivestock}
              livestock={farmer.livestock}
              kycStatus={farmer.kycStatus}
              insuranceStatus={farmer.insuranceStatus}
              schemes={farmer.schemes}
              onClick={() => handleFarmerClick(farmer)}
              viewMode="grid"
            />
          ))}
        </div>
      )}

      {filteredFarmers.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No farmers found', 'कोई किसान नहीं मिला', 'କୌଣସି କୃଷକ ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4">
            {t('Try adjusting your search or filter criteria', 'अपनी खोज या फ़िल्टर मानदंड समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର ମାନଦଣ୍ଡ ସଜାଡ଼ିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBlock('all');
              setSelectedKycStatus('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t('Clear Filters', 'फिल्टर साफ़ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Block-wise Summary */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4">{t('Block-wise Distribution', 'ब्लॉक-वार वितरण', 'ବ୍ଲକ-ଅନୁସାରେ ବିତରଣ')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {blocks.map((block) => {
            const blockFarmers = farmers.filter(f => f.address.block === block);
            const blockLivestock = blockFarmers.reduce((sum, f) => sum + f.totalLivestock, 0);
            
            return (
              <div
                key={block}
                className="p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all cursor-pointer"
                onClick={() => setSelectedBlock(block)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-green-600" />
                  <p className="text-sm text-slate-900 font-medium">{block}</p>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>{t('Farmers', 'किसान', 'କୃଷକ')}: <span className="font-mono text-slate-900">{blockFarmers.length}</span></p>
                  <p>{t('Livestock', 'पशुधन', 'ପଶୁଧନ')}: <span className="font-mono text-slate-900">{blockLivestock}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
