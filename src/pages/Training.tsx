import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Calendar, Award, Users, BookOpen, TrendingUp, CheckCircle } from 'lucide-react';
import { ViewToggle } from '../components/ui/ViewToggle';
import { TrainingCard } from '../components/training/TrainingCard';
import { TrainingDetail } from '../components/training/TrainingDetail';
import { TrainingRegistrationModal } from '../components/training/TrainingRegistrationModal';
import { trainingData, trainingCategories, Training as TrainingType } from '../data/trainingData';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDisplayDate } from '../utils/dateFormat';

export default function Training() {
  const { t } = useLanguage();
  const [selectedTraining, setSelectedTraining] = useState<TrainingType | null>(null);
  const [registrationTraining, setRegistrationTraining] = useState<TrainingType | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const trainings = trainingData;

  // If a training is selected, show detail view
  if (selectedTraining) {
    return (
      <TrainingDetail
        training={selectedTraining}
        onBack={() => setSelectedTraining(null)}
      />
    );
  }

  // Filter trainings
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.trainingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || training.category === selectedCategory;
    const matchesType = selectedType === 'all' || training.type === selectedType;
    const matchesLevel = selectedLevel === 'all' || training.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesType && matchesLevel;
  });

  // Calculate statistics
  const totalTrainings = trainings.length;
  const openRegistrations = trainings.filter(t => t.status === 'registration-open').length;
  const totalEnrolled = trainings.reduce((sum, t) => sum + t.enrolled, 0);
  const avgRating = (trainings.reduce((sum, t) => sum + t.rating, 0) / trainings.length).toFixed(1);

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
            <h2 className="text-slate-900 mb-1">{t('Training Programs', 'प्रशिक्षण कार्यक्रम', 'ତାଲିମ କାର୍ଯ୍ୟକ୍ରମ')}</h2>
            <p className="text-sm text-slate-600">{t('Enhance your skills with expert-led courses', 'विशेषज्ञ नेतृत्व वाले पाठ्यक्रमों के साथ अपने कौशल को बढ़ाएं', 'ବିଶେଷଜ୍ଞ ନେତୃତ୍ୱ ପାଠ୍ୟକ୍ରମ ସହିତ ଆପଣଙ୍କର କୌଶଳ ବୃଦ୍ଧି କରନ୍ତୁ')}</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2">
            <Award size={18} />
            <span>{t('My Trainings', 'मेरे प्रशिक्षण', 'ମୋର ତାଲିମ')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search trainings...', 'प्रशिक्षण खोजें...', 'ତାଲିମ ଖୋଜନ୍ତୁ...')}
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
              {trainingCategories.map((cat) => (
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
              <option value="online">{t('Online', 'ऑनलाइन', 'ଅନଲାଇନ୍')}</option>
              <option value="offline">{t('Offline', 'ऑफलाइन', 'ଅଫଲାଇନ୍')}</option>
              <option value="hybrid">{t('Hybrid', 'हाइब्रिड', 'ହାଇବ୍ରିଡ୍')}</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              <option value="all">{t('All Levels', 'सभी स्तर', 'ସମସ୍ତ ସ୍ତର')}</option>
              <option value="beginner">{t('Beginner', 'शुरुआती', 'ଆରମ୍ଭକର୍ତ୍ତା')}</option>
              <option value="intermediate">{t('Intermediate', 'मध्यवर्ती', 'ମଧ୍ୟବର୍ତ୍ତୀ')}</option>
              <option value="advanced">{t('Advanced', 'उन्नत', 'ଉନ୍ନତ')}</option>
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
              <span className="hidden sm:inline">{t('View Calendar', 'कैलेंडर देखें', 'କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ')}</span>
              <span className="sm:hidden">{t('Calendar', 'कैलेंडर', 'କ୍ୟାଲେଣ୍ଡର')}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ViewToggle value={displayMode} onChange={setDisplayMode} />
            <p className="text-xs sm:text-sm text-slate-600">
              {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredTrainings.length}</span> {t('of', 'का', 'ର')}{' '}
              <span className="font-mono text-slate-900">{trainings.length}</span> {t('trainings', 'प्रशिक्षण', 'ତାଲିମ')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-green-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Programs', 'कुल कार्यक्रम', 'ମୋଟ କାର୍ଯ୍ୟକ୍ରମ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalTrainings}</p>
          <p className="text-xs text-green-600">{t('Available courses', 'उपलब्ध पाठ्यक्रम', 'ଉପଲବ୍ଧ ପାଠ୍ୟକ୍ରମ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-blue-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Open Registration', 'पंजीकरण खुला', 'ପଞ୍ଜୀକରଣ ଖୋଲା')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{openRegistrations}</p>
          <p className="text-xs text-blue-600">{t('Register now', 'अभी पंजीकरण करें', 'ବର୍ତ୍ତମାନ ପଞ୍ଜୀକରଣ କରନ୍ତୁ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Enrolled', 'कुल नामांकित', 'ମୋଟ ନାମାଙ୍କିତ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{totalEnrolled}</p>
          <p className="text-xs text-purple-600">{t('Active learners', 'सक्रिय शिक्षार्थी', 'ସକ୍ରିୟ ଶିକ୍ଷାର୍ଥୀ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-amber-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Avg Rating', 'औसत रेटिंग', 'ହାରାହାରି ମୂଲ୍ୟାୟନ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{avgRating} ⭐</p>
          <p className="text-xs text-amber-600">{t('Course quality', 'पाठ्यक्रम गुणवत्ता', 'ପାଠ୍ୟକ୍ରମ ଗୁଣବତ୍ତା')}</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4">{t('Browse by Category', 'श्रेणी के अनुसार ब्राउज़ करें', 'ବର୍ଗ ଅନୁଯାୟୀ ବ୍ରାଉଜ୍ କରନ୍ତୁ')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {trainingCategories.slice(1).map((cat) => {
            const count = trainings.filter(t => t.category === cat.value && t.status === 'registration-open').length;
            const categoryIcons: Record<string, string> = {
              technical: '⚙️',
              management: '📊',
              healthcare: '🏥',
              breeding: '🧬',
              dairy: '🥛',
              entrepreneurship: '💼'
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
          onClick={() => setSelectedType('online')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'online'
              ? 'bg-blue-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          🌐 {t('Online', 'ऑनलाइन', 'ଅନଲାଇନ୍')} ({trainings.filter(t => t.type === 'online').length})
        </button>
        <button
          onClick={() => setSelectedType('offline')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'offline'
              ? 'bg-green-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          📍 {t('Offline', 'ऑफलाइन', 'ଅଫଲାଇନ୍')} ({trainings.filter(t => t.type === 'offline').length})
        </button>
        <button
          onClick={() => setSelectedType('hybrid')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'hybrid'
              ? 'bg-purple-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          🔀 {t('Hybrid', 'हाइब्रिड', 'ହାଇବ୍ରିଡ୍')} ({trainings.filter(t => t.type === 'hybrid').length})
        </button>
        <button
          onClick={() => {
            const certifiedTrainings = trainings.filter(t => t.certification);
            if (certifiedTrainings.length > 0) setSelectedCategory('all');
          }}
          className="px-4 py-2 rounded-xl bg-white/70 text-slate-700 hover:bg-white transition-all"
        >
          🎓 {t('Certified', 'प्रमाणित', 'ପ୍ରମାଣିତ')} ({trainings.filter(t => t.certification).length})
        </button>
      </div>

      {/* Trainings Grid / List */}
      {displayMode === 'list' ? (
        <div className="glass-card-darker rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Training</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Level</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Instructor</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Start Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Seats</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Fees</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="bg-white/40">
                {filteredTrainings.map((tr) => (
                  <tr key={tr.id} onClick={() => setSelectedTraining(tr)} className="border-b border-slate-100 last:border-0 hover:bg-green-50/50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900 max-w-[180px] truncate">{tr.title}</p>
                      <p className="text-xs text-slate-400 font-mono">{tr.trainingId}</p>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">{tr.type}</span></td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full capitalize">{tr.level}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-600 max-w-[120px] truncate">{tr.instructor}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatDisplayDate(tr.startDate)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{tr.seatsAvailable}/{tr.seatsTotal}</td>
                    <td className="px-4 py-3 font-mono text-sm text-green-700">{tr.netFees === 0 ? 'Free' : `₹${tr.netFees}`}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        tr.status === 'registration-open' ? 'bg-green-50 text-green-700' :
                        tr.status === 'ongoing' ? 'bg-blue-50 text-blue-700' :
                        tr.status === 'completed' ? 'bg-slate-100 text-slate-500' :
                        'bg-amber-50 text-amber-700'
                      }`}>{tr.status.replace('-', ' ')}</span>
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
          {filteredTrainings.map((training) => (
            <TrainingCard
              key={training.id}
              trainingId={training.trainingId}
              title={training.title}
              titleOdia={training.titleOdia}
              category={training.category}
              type={training.type}
              duration={training.duration}
              level={training.level}
              instructor={training.instructor}
              organization={training.organization}
              startDate={training.startDate}
              fees={training.fees}
              netFees={training.netFees}
              subsidy={training.subsidy}
              seatsAvailable={training.seatsAvailable}
              seatsTotal={training.seatsTotal}
              rating={training.rating}
              reviews={training.reviews}
              status={training.status}
              certification={training.certification}
              onClick={() => setSelectedTraining(training)}
              onRegister={(e) => {
                e.stopPropagation();
                setRegistrationTraining(training);
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredTrainings.length === 0 && (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No trainings found', 'कोई प्रशिक्षण नहीं मिला', 'କୌଣସି ତାଲିମ ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
              setSelectedLevel('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t('Clear Filters', 'फिल्टर साफ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <Award className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{t('Upgrade Your Skills', 'अपने कौशल को उन्नत करें', 'ଆପଣଙ୍କର କୌଶଳ ଉନ୍ନତ କରନ୍ତୁ')}</h3>
            <p className="text-sm text-slate-600 mb-4">
              {t(
                'Join our training programs to enhance your knowledge in animal husbandry, dairy management, breeding techniques, and business development. Get certified and boost your farming success with government-subsidized courses!',
                'पशुपालन, डेयरी प्रबंधन, प्रजनन तकनीकों और व्यवसाय विकास में अपने ज्ञान को बढ़ाने के लिए हमारे प्रशिक्षण कार्यक्रमों में शामिल हों। सरकारी सब्सिडी वाले पाठ्यक्रमों के साथ प्रमाणित हों और अपनी खेती की सफलता को बढ़ावा दें!',
                'ପଶୁପାଳନ, ଦୁଗ୍ଧ ପରିଚାଳନା, ପ୍ରଜନନ କୌଶଳ ଏବଂ ବ୍ୟବସାୟ ବିକାଶରେ ଆପଣଙ୍କର ଜ୍ଞାନ ବୃଦ୍ଧି କରିବାକୁ ଆମର ତାଲିମ କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗ ଦିଅନ୍ତୁ। ସରକାରୀ ସବସିଡି ପାଠ୍ୟକ୍ରମ ସହିତ ପ୍ରମାଣିତ ହୁଅନ୍ତୁ ଏବଂ ଆପଣଙ୍କର କୃଷି ସଫଳତା ବୃଦ୍ଧି କରନ୍ତୁ!'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-white rounded-xl border border-white/30 text-sm hover:shadow transition-all">
                {t('Browse Catalog', 'कैटलॉग ब्राउज़ करें', 'କ୍ୟାଟାଲଗ୍ ବ୍ରାଉଜ୍ କରନ୍ତୁ')}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm hover:shadow-lg transition-all">
                {t('Request Custom Training', 'कस्टम प्रशिक्षण का अनुरोध करें', 'କଷ୍ଟମ୍ ତାଲିମ ଅନୁରୋଧ କରନ୍ତୁ')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {registrationTraining && (
        <TrainingRegistrationModal
          isOpen={!!registrationTraining}
          onClose={() => setRegistrationTraining(null)}
          training={registrationTraining}
        />
      )}
    </motion.div>
  );
}
