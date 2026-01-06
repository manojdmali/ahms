import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Download, Shield, TrendingUp, Users, IndianRupee, Award, FileText } from 'lucide-react';
import { InsuranceCard } from '../components/insurance/InsuranceCard';
import { InsuranceDetail } from '../components/insurance/InsuranceDetail';
import { insuranceData, insuranceCategories, Insurance as InsuranceType } from '../data/insuranceData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Insurance() {
  const { t } = useLanguage();
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const insurances = insuranceData;

  // If an insurance is selected, show detail view
  if (selectedInsurance) {
    return (
      <InsuranceDetail
        insurance={selectedInsurance}
        onBack={() => setSelectedInsurance(null)}
      />
    );
  }

  // Filter insurances
  const filteredInsurances = insurances.filter(insurance => {
    const matchesSearch = 
      insurance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insurance.policyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insurance.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || insurance.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || insurance.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const totalPolicies = insurances.length;
  const activePolicies = insurances.reduce((sum, ins) => sum + ins.activePolicies, 0);
  const totalClaims = insurances.reduce((sum, ins) => sum + ins.totalClaims, 0);
  const avgSettlementRatio = (insurances.reduce((sum, ins) => sum + ins.claimSettlementRatio, 0) / insurances.length).toFixed(1);
  const totalCoverage = insurances.reduce((sum, ins) => sum + ins.coverageAmount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-slate-900 mb-1">{t('Insurance Policies', 'बीमा पॉलिसियां', 'ବୀମା ପଲିସି')}</h2>
            <p className="text-sm text-slate-600">{t('Protect your livestock with comprehensive insurance', 'व्यापक बीमा के साथ अपने पशुधन की रक्षा करें', 'ବ୍ୟାପକ ବୀମା ସହିତ ଆପଣଙ୍କର ପଶୁଧନକୁ ସୁରକ୍ଷା ଦିଅନ୍ତୁ')}</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2 text-sm sm:text-base">
            <Award size={18} />
            <span>{t('My Policies', 'मेरी पॉलिसियां', 'ମୋର ପଲିସି')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search by name, policy ID, or provider...', 'नाम, पॉलिसी ID या प्रदाता से खोजें...', 'ନାମ, ପଲିସି ID କିମ୍ବା ପ୍ରଦାତା ଦ୍ୱାରା ଖୋଜନ୍ତୁ...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              {insuranceCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              <option value="all">{t('All Status', 'सभी स्थिति', 'ସମସ୍ତ ସ୍ଥିତି')}</option>
              <option value="active">{t('Active', 'सक्रिय', 'ସକ୍ରିୟ')}</option>
              <option value="popular">{t('Popular', 'लोकप्रिय', 'ଲୋକପ୍ରିୟ')}</option>
              <option value="new">{t('New', 'नया', 'ନୂତନ')}</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 sm:px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-xs sm:text-sm">
              <Filter size={16} />
              <span className="hidden sm:inline">{t('Advanced Filters', 'उन्नत फिल्टर', 'ଉନ୍ନତ ଫିଲ୍ଟର୍')}</span>
              <span className="sm:hidden">{t('Filters', 'फिल्टर', 'ଫିଲ୍ଟର୍')}</span>
            </button>
            <button className="px-3 sm:px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-xs sm:text-sm">
              <Download size={16} />
              <span className="hidden sm:inline">{t('Export Policies', 'पॉलिसियां निर्यात करें', 'ପଲିସି ରପ୍ତାନି କରନ୍ତୁ')}</span>
              <span className="sm:hidden">{t('Export', 'निर्यात', 'ରପ୍ତାନି')}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredInsurances.length}</span> {t('of', 'का', 'ର')}{' '}
            <span className="font-mono text-slate-900">{insurances.length}</span> {t('policies', 'पॉलिसियां', 'ପଲିସି')}
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-green-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Available Policies', 'उपलब्ध पॉलिसियां', 'ଉପଲବ୍ଧ ପଲିସି')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalPolicies}</p>
          <p className="text-xs text-green-600">{t('Different options', 'विभिन्न विकल्प', 'ବିଭିନ୍ନ ବିକଳ୍ପ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Active Policies', 'सक्रिय पॉलिसियां', 'ସକ୍ରିୟ ପଲିସି')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{activePolicies.toLocaleString()}</p>
          <p className="text-xs text-blue-600">{t('Farmers insured', 'बीमित किसान', 'ବୀମାଭୁକ୍ତ କୃଷକ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Settlement Rate', 'निपटान दर', 'ସମାଧାନ ହାର')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{avgSettlementRatio}%</p>
          <p className="text-xs text-purple-600">{t('Average success', 'औसत सफलता', 'ହାରାହାରି ସଫଳତା')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-amber-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Coverage', 'कुल कवरेज', 'ମୋଟ କଭରେଜ୍')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">₹{(totalCoverage / 100000).toFixed(0)}L</p>
          <p className="text-xs text-amber-600">{t('Combined value', 'संयुक्त मूल्य', 'ମିଳିତ ମୂଲ୍ୟ')}</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4">{t('Policies by Category', 'श्रेणी के अनुसार पॉलिसियां', 'ବର୍ଗ ଅନୁଯାୟୀ ପଲିସି')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {insuranceCategories.slice(1).map((cat) => {
            const count = insurances.filter(ins => ins.category === cat.value).length;
            const categoryIcons: Record<string, string> = {
              livestock: '🐄',
              dairy: '🥛',
              poultry: '🐔',
              comprehensive: '🛡️',
              health: '❤️',
              accident: '⚠️'
            };
            
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`p-3 sm:p-4 rounded-xl border transition-all text-left ${
                  selectedCategory === cat.value
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white/50 border-white/30 hover:bg-white'
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-2 block">{categoryIcons[cat.value]}</span>
                <p className="text-xs text-slate-600 mb-1 line-clamp-2">{cat.label}</p>
                <p className="text-sm font-mono text-slate-900">{count}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Insurance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredInsurances.map((insurance) => (
          <InsuranceCard
            key={insurance.id}
            policyId={insurance.policyId}
            name={insurance.name}
            nameOdia={insurance.nameOdia}
            provider={insurance.provider}
            category={insurance.category}
            coverageAmount={insurance.coverageAmount}
            premiumAmount={insurance.premiumAmount}
            netPremium={insurance.netPremium}
            subsidyPercentage={insurance.subsidyPercentage}
            activePolicies={insurance.activePolicies}
            claimSettlementRatio={insurance.claimSettlementRatio}
            status={insurance.status}
            rating={insurance.rating}
            reviews={insurance.reviews}
            onClick={() => setSelectedInsurance(insurance)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredInsurances.length === 0 && (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No policies found', 'कोई पॉलिसी नहीं मिली', 'କୌଣସି ପଲିସି ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            {t('Clear Filters', 'फिल्टर साफ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <FileText className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{t('Need Help Choosing a Policy?', 'पॉलिसी चुनने में मदद चाहिए?', 'ପଲିସି ବାଛିବାରେ ସାହାଯ୍ୟ ଆବଶ୍ୟକ କି?')}</h3>
            <p className="text-sm text-slate-600 mb-4">
              {t(
                'Our insurance advisors are available to help you select the right policy based on your needs. Get personalized recommendations and assistance with documentation.',
                'हमारे बीमा सलाहकार आपकी आवश्यकताओं के आधार पर सही पॉलिसी चुनने में आपकी मदद के लिए उपलब्ध हैं। व्यक्तिगत अनुशंसाएं और दस्तावेज़ीकरण में सहायता प्राप्त करें।',
                'ଆମର ବୀମା ପରାମର୍ଶଦାତାମାନେ ଆପଣଙ୍କର ଆବଶ୍ୟକତା ଆଧାରରେ ସଠିକ୍ ପଲିସି ବାଛିବାରେ ସାହାଯ୍ୟ କରିବାକୁ ଉପଲବ୍ଧ। ବ୍ୟକ୍ତିଗତ ସୁପାରିଶ ଏବଂ ଦସ୍ତାବେଜୀକରଣରେ ସହାୟତା ପ୍ରାପ୍ତ କରନ୍ତୁ।'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-white rounded-xl border border-white/30 text-sm hover:shadow transition-all">
                {t('Call: 1800-XXX-XXXX', 'कॉल करें: 1800-XXX-XXXX', 'କଲ୍ କରନ୍ତୁ: 1800-XXX-XXXX')}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm hover:shadow-lg transition-all">
                {t('Schedule Consultation', 'परामर्श शेड्यूल करें', 'ପରାମର୍ଶ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
