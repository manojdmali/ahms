import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Download, FileText, TrendingUp, Users, IndianRupee, Award } from 'lucide-react';
import { ViewToggle } from '../components/ui/ViewToggle';
import { SchemeCard } from '../components/schemes/SchemeCard';
import { SchemeDetail } from '../components/schemes/SchemeDetail';
import { governmentSchemesData, schemeCategories, GovernmentScheme } from '../data/governmentSchemesData';
import { useLanguage } from '../contexts/LanguageContext';

export default function GovernmentSchemes() {
  const { t } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const schemes = governmentSchemesData;

  // If a scheme is selected, show detail view
  if (selectedScheme) {
    return (
      <SchemeDetail
        scheme={selectedScheme}
        onBack={() => setSelectedScheme(null)}
      />
    );
  }

  // Filter schemes
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.schemeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || scheme.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const activeSchemes = schemes.filter(s => s.status === 'active').length;
  const totalBeneficiaries = schemes.reduce((sum, s) => sum + s.beneficiaries, 0);
  const totalBudget = schemes.reduce((sum, s) => sum + s.budget, 0);
  const upcomingSchemes = schemes.filter(s => s.status === 'upcoming').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-slate-900 mb-1">{t('Government Schemes', 'सरकारी योजनाएं', 'ସରକାରୀ ଯୋଜନା')}</h2>
            <p className="text-sm text-slate-600">{t('Browse and apply for livestock welfare schemes', 'पशुधन कल्याण योजनाओं के लिए ब्राउज़ करें और आवेदन करें', 'ପଶୁଧନ କଲ୍ୟାଣ ଯୋଜନା ବ୍ରାଉଜ୍ କରନ୍ତୁ ଏବଂ ଆବେଦନ କରନ୍ତୁ')}</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2 text-sm sm:text-base">
            <Award size={18} />
            <span>{t('My Applications', 'मेरे आवेदन', 'ମୋର ଆବେଦନ')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search schemes...', 'योजनाएं खोजें...', 'ଯୋଜନା ଖୋଜନ୍ତୁ...')}
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
              {schemeCategories.map((cat) => (
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
              <option value="upcoming">{t('Upcoming', 'आगामी', 'ଆଗାମୀ')}</option>
              <option value="closed">{t('Closed', 'बंद', 'ବନ୍ଦ')}</option>
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
              {t('Export Schemes', 'योजनाएं निर्यात करें', 'ଯୋଜନା ରପ୍ତାନି କରନ୍ତୁ')}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ViewToggle value={displayMode} onChange={setDisplayMode} />
            <p className="text-sm text-slate-600">
              {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredSchemes.length}</span> {t('of', 'का', 'ର')}{' '}
              <span className="font-mono text-slate-900">{schemes.length}</span> {t('schemes', 'योजनाएं', 'ଯୋଜନା')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-green-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Active', 'सक्रिय', 'ସକ୍ରିୟ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{activeSchemes}</p>
          <p className="text-xs text-green-600">{t('Accepting apps', 'आवेदन स्वीकार कर रहे हैं', 'ଆବେଦନ ଗ୍ରହଣ କରୁଛନ୍ତି')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Beneficiaries', 'लाभार्थी', 'ହିତାଧିକାରୀ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalBeneficiaries.toLocaleString()}</p>
          <p className="text-xs text-blue-600">{t('Enrolled', 'नामांकित', 'ନାମାଙ୍କିତ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-purple-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Budget', 'बजट', 'ବଜେଟ୍')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">₹{(totalBudget / 10000000).toFixed(2)}Cr</p>
          <p className="text-xs text-purple-600">{t('Allocated', 'आवंटित', 'ବଣ୍ଟନ କରାଯାଇଛି')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-amber-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Upcoming', 'आगामी', 'ଆଗାମୀ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{upcomingSchemes}</p>
          <p className="text-xs text-amber-600">{t('Coming soon', 'जल्द आ रहा है', 'ଶୀଘ୍ର ଆସୁଛି')}</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4">{t('Schemes by Category', 'श्रेणी के अनुसार योजनाएं', 'ବର୍ଗ ଅନୁଯାୟୀ ଯୋଜନା')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {schemeCategories.slice(1).map((cat) => {
            const count = schemes.filter(s => s.category === cat.value && s.status === 'active').length;
            const categoryIcons: Record<string, string> = {
              subsidy: '💰',
              insurance: '🛡️',
              training: '📚',
              infrastructure: '🏗️',
              welfare: '❤️',
              dairy: '🥛'
            };
            
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedCategory === cat.value
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white/50 border-white/30 hover:bg-white'
                }`}
              >
                <span className="text-2xl mb-2 block">{categoryIcons[cat.value]}</span>
                <p className="text-xs text-slate-600 mb-1">{cat.label}</p>
                <p className="text-sm font-mono text-slate-900">{count} {t('active', 'सक्रिय', 'ସକ୍ରିୟ')}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes Grid / List */}
      {displayMode === 'list' ? (
        <div className="glass-card-darker rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Scheme</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Subsidy</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Beneficiaries</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Deadline</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="bg-white/40">
                {filteredSchemes.map((s) => (
                  <tr key={s.id} onClick={() => setSelectedScheme(s)} className="border-b border-slate-100 last:border-0 hover:bg-green-50/50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900 max-w-[200px] truncate">{s.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{s.schemeId}</p>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">{s.category}</span></td>
                    <td className="px-4 py-3 font-mono text-sm text-green-700">{s.subsidyAmount ? `₹${s.subsidyAmount.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 font-mono text-sm text-slate-700">{s.beneficiaries.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{s.applicationDeadline || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        s.status === 'active' ? 'bg-green-50 text-green-700' :
                        s.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right"><span className="text-xs text-green-600">View →</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              schemeId={scheme.schemeId}
              name={scheme.name}
              nameOdia={scheme.nameOdia}
              category={scheme.category}
              description={scheme.description}
              subsidyAmount={scheme.subsidyAmount}
              coverageAmount={scheme.coverageAmount}
              beneficiaries={scheme.beneficiaries}
              status={scheme.status}
              applicationDeadline={scheme.applicationDeadline}
              onClick={() => setSelectedScheme(scheme)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No schemes found', 'कोई योजना नहीं मिली', 'କୌଣସି ଯୋଜନା ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t('Clear Filters', 'फिल्टर साफ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <FileText className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{t('Need Help with Applications?', 'आवेदनों में सहायता चाहिए?', 'ଆବେଦନରେ ସାହାଯ୍ୟ ଆବଶ୍ୟକ କି?')}</h3>
            <p className="text-sm text-slate-600 mb-4">
              {t(
                'Our team is available to assist you with scheme applications and documentation. Contact us via phone or visit your nearest veterinary office.',
                'हमारी टीम योजना आवेदन और दस्तावेज़ीकरण में आपकी सहायता के लिए उपलब्ध है। फोन के माध्यम से हमसे संपर्क करें या अपने निकटतम पशु चिकित्सा कार्यालय में जाएं।',
                'ଆମର ଦଳ ଯୋଜନା ଆବେଦନ ଏବଂ ଦସ୍ତାବେଜୀକରଣରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଉପଲବ୍ଧ। ଫୋନ୍ ମାଧ୍ୟମରେ ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ କିମ୍ବା ଆପଣଙ୍କର ନିକଟସ୍ଥ ପଶୁଚିକିତ୍ସା କାର୍ଯ୍ୟାଳୟ ପରିଦର୍ଶନ କରନ୍ତୁ।'
              )}
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white rounded-xl border border-white/30 text-sm hover:shadow transition-all">
                {t('Call Helpline: 1800-XXX-XXXX', 'हेल्पलाइन कॉल करें: 1800-XXX-XXXX', 'ହେଲ୍ପଲାଇନ୍ କଲ୍ କରନ୍ତୁ: 1800-XXX-XXXX')}
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
