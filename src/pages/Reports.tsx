import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, FileText, Download, Eye, TrendingUp, BarChart3, Calendar, RefreshCw } from 'lucide-react';
import { ViewToggle } from '../components/ui/ViewToggle';
import { ReportCard } from '../components/reports/ReportCard';
import { ReportDetail } from '../components/reports/ReportDetail';
import { reportsData, reportCategories, Report as ReportType } from '../data/reportsData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Reports() {
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const reports = reportsData;

  // If a report is selected, show detail view
  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // Calculate statistics
  const totalReports = reports.length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0);
  const totalViews = reports.reduce((sum, r) => sum + r.views, 0);
  const readyReports = reports.filter(r => r.status === 'ready').length;

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
            <h2 className="text-slate-900 mb-1">{t('Reports & Analytics', 'रिपोर्ट और विश्लेषण', 'ରିପୋର୍ଟ ଏବଂ ବିଶ୍ଳେଷଣ')}</h2>
            <p className="text-sm text-slate-600">{t('Access comprehensive data insights and reports', 'व्यापक डेटा अंतर्दृष्टि और रिपोर्ट तक पहुंचें', 'ବ୍ୟାପକ ଡାଟା ସୂଚନା ଏବଂ ରିପୋର୍ଟ ପହଞ୍ଚନ୍ତୁ')}</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2">
            <RefreshCw size={18} />
            <span>{t('Generate Report', 'रिपोर्ट जनरेट करें', 'ରିପୋର୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search reports...', 'रिपोर्ट खोजें...', 'ରିପୋର୍ଟ ଖୋଜନ୍ତୁ...')}
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
              {reportCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              <option value="all">{t('All Types', 'सभी प्रकार', 'ସମସ୍ତ ପ୍ରକାର')}</option>
              <option value="summary">{t('Summary', 'सारांश', 'ସାରାଂଶ')}</option>
              <option value="detailed">{t('Detailed', 'विस्तृत', 'ବିସ୍ତୃତ')}</option>
              <option value="comparative">{t('Comparative', 'तुलनात्मक', 'ତୁଳନାତ୍ମକ')}</option>
              <option value="trend">{t('Trend Analysis', 'प्रवृत्ति विश्लेषण', 'ଧାରା ବିଶ୍ଳେଷଣ')}</option>
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
              <option value="ready">{t('Ready', 'तैयार', 'ପ୍ରସ୍ତୁତ')}</option>
              <option value="generating">{t('Generating', 'जनरेट हो रहा है', 'ସୃଷ୍ଟି ହେଉଛି')}</option>
              <option value="scheduled">{t('Scheduled', 'निर्धारित', 'ନିର୍ଦ୍ଧାରିତ')}</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 sm:px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-xs sm:text-sm">
              <Filter size={16} />
              <span className="hidden sm:inline">{t('More Filters', 'अधिक फिल्टर', 'ଅଧିକ ଫିଲ୍ଟର୍')}</span>
              <span className="sm:hidden">{t('Filters', 'फिल्टर', 'ଫିଲ୍ଟର୍')}</span>
            </button>
            <button className="px-3 sm:px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-xs sm:text-sm">
              <Calendar size={16} />
              <span className="hidden sm:inline">{t('Date Range', 'तिथि सीमा', 'ତାରିଖ ପରିସର')}</span>
              <span className="sm:hidden">{t('Date', 'तिथि', 'ତାରିଖ')}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ViewToggle value={displayMode} onChange={setDisplayMode} />
            <p className="text-xs sm:text-sm text-slate-600">
              {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredReports.length}</span> {t('of', 'का', 'ର')}{' '}
              <span className="font-mono text-slate-900">{reports.length}</span> {t('reports', 'रिपोर्ट', 'ରିପୋର୍ଟ')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-green-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Reports', 'कुल रिपोर्ट', 'ମୋଟ ରିପୋର୍ଟ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalReports}</p>
          <p className="text-xs text-green-600">{readyReports} {t('ready', 'तैयार', 'ପ୍ରସ୍ତୁତ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Download className="text-blue-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Downloads', 'कुल डाउनलोड', 'ମୋଟ ଡାଉନଲୋଡ୍')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalDownloads.toLocaleString()}</p>
          <p className="text-xs text-blue-600">{t('This month', 'इस महीने', 'ଏହି ମାସ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="text-purple-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Views', 'कुल दृश्य', 'ମୋଟ ଦୃଶ୍ୟ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalViews.toLocaleString()}</p>
          <p className="text-xs text-purple-600">{t('All time', 'सभी समय', 'ସମସ୍ତ ସମୟ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-amber-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Avg Engagement', 'औसत सहभागिता', 'ହାରାହାରି ଯୋଗଦାନ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">
            {((totalViews / totalReports) / 10).toFixed(1)}x
          </p>
          <p className="text-xs text-amber-600">{t('View-to-download', 'देखने-से-डाउनलोड', 'ଦେଖିବା-ରୁ-ଡାଉନଲୋଡ୍')}</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4">{t('Browse by Category', 'श्रेणी के अनुसार ब्राउज़ करें', 'ବର୍ଗ ଅନୁଯାୟୀ ବ୍ରାଉଜ୍ କରନ୍ତୁ')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {reportCategories.slice(1).map((cat) => {
            const count = reports.filter(r => r.category === cat.value && r.status === 'ready').length;
            const categoryIcons: Record<string, string> = {
              livestock: '🐄',
              health: '💉',
              breeding: '🧬',
              dairy: '🥛',
              financial: '💰',
              farmers: '👨‍🌾',
              training: '📚',
              schemes: '🏛️',
              insurance: '🛡️'
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

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedStatus('ready')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedStatus === 'ready'
              ? 'bg-green-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          ✓ {t('Ready', 'तैयार', 'ପ୍ରସ୍ତୁତ')} ({reports.filter(r => r.status === 'ready').length})
        </button>
        <button
          onClick={() => setSelectedType('detailed')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'detailed'
              ? 'bg-blue-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          📊 {t('Detailed', 'विस्तृत', 'ବିସ୍ତୃତ')} ({reports.filter(r => r.type === 'detailed').length})
        </button>
        <button
          onClick={() => setSelectedType('summary')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'summary'
              ? 'bg-purple-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          📝 {t('Summary', 'सारांश', 'ସାରାଂଶ')} ({reports.filter(r => r.type === 'summary').length})
        </button>
        <button
          onClick={() => {
            const thisMonth = new Date().getMonth();
            // Filter logic would go here
          }}
          className="px-4 py-2 rounded-xl bg-white/70 text-slate-700 hover:bg-white transition-all"
        >
          📅 {t('This Month', 'इस महीने', 'ଏହି ମାସ')}
        </button>
      </div>

      {/* Reports Grid / List */}
      {displayMode === 'list' ? (
        <div className="glass-card-darker rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Report</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Period</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Generated</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Downloads</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="bg-white/40">
                {filteredReports.map((r) => (
                  <tr key={r.id} onClick={() => setSelectedReport(r)} className="border-b border-slate-100 last:border-0 hover:bg-green-50/50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900 max-w-[180px] truncate">{r.title}</p>
                      <p className="text-xs text-slate-400 font-mono">{r.reportId}</p>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">{r.category}</span></td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full capitalize">{r.type}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{r.period}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{r.generatedDate}</td>
                    <td className="px-4 py-3 font-mono text-sm text-slate-700">{r.downloads.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        r.status === 'ready' ? 'bg-green-50 text-green-700' :
                        r.status === 'generating' ? 'bg-amber-50 text-amber-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right"><span className="text-xs text-green-600">View →</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              reportId={report.reportId}
              title={report.title}
              titleOdia={report.titleOdia}
              category={report.category}
              type={report.type}
              period={report.period}
              generatedDate={report.generatedDate}
              status={report.status}
              downloads={report.downloads}
              views={report.views}
              metrics={report.metrics}
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No reports found', 'कोई रिपोर्ट नहीं मिली', 'କୌଣସି ରିପୋର୍ଟ ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
              setSelectedStatus('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t('Clear Filters', 'फिल्टर साफ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{t('Data-Driven Insights', 'डेटा-संचालित अंतर्दृष्टि', 'ଡାଟା-ଚାଳିତ ସୂଚନା')}</h3>
            <p className="text-sm text-slate-600 mb-4">
              {t(
                'Access comprehensive reports and analytics to track livestock population, health metrics, dairy production, financial performance, and farmer engagement. Make informed decisions with real-time data visualization and actionable insights.',
                'पशुधन जनसंख्या, स्वास्थ्य मेट्रिक्स, डेयरी उत्पादन, वित्तीय प्रदर्शन और किसान जुड़ाव को ट्रैक करने के लिए व्यापक रिपोर्ट और विश्लेषण तक पहुंचें। वास्तविक समय डेटा विज़ुअलाइज़ेशन और कार्रवाई योग्य अंतर्दृष्टि के साथ सूचित निर्णय लें।',
                'ପଶୁଧନ ଜନସଂଖ୍ୟା, ସ୍ୱାସ୍ଥ୍ୟ ମେଟ୍ରିକ୍ସ, ଦୁଗ୍ଧ ଉତ୍ପାଦନ, ଆର୍ଥିକ ପ୍ରଦର୍ଶନ ଏବଂ କୃଷକ ସହଭାଗିତାକୁ ଟ୍ରାକ୍ କରିବା ପାଇଁ ବ୍ୟାପକ ରିପୋର୍ଟ ଏବଂ ବିଶ୍ଳେଷଣ ପହଞ୍ଚନ୍ତୁ। ରିଅଲ୍-ଟାଇମ୍ ଡାଟା ଭିଜୁଆଲାଇଜେସନ୍ ଏବଂ କାର୍ଯ୍ୟକ୍ଷମ ସୂଚନା ସହିତ ସୂଚିତ ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-white rounded-xl border border-white/30 text-sm hover:shadow transition-all">
                {t('Schedule Report', 'रिपोर्ट शेड्यूल करें', 'ରିପୋର୍ଟ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm hover:shadow-lg transition-all">
                {t('Custom Report Builder', 'कस्टम रिपोर्ट बिल्डर', 'କଷ୍ଟମ୍ ରିପୋର୍ଟ ବିଲ୍ଡର୍')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
