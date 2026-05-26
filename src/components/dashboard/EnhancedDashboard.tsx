import { motion } from 'motion/react';
import { Users, Beef, Syringe, FileText, Droplet, TrendingUp, Calendar, Award, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { StatCard } from './StatCard';
import { LivestockPieChart } from '../charts/LivestockPieChart';
import { MilkProductionChart } from '../charts/MilkProductionChart';
import { QuickActions } from './QuickActions';
import { ActivityFeed } from './ActivityFeed';
import { AlertsPanel } from './AlertsPanel';
import OdishaMapDashboard from '../OdishaMap';

type Page = 'dashboard' | 'livestock' | 'health' | 'breeding' | 'farmers' | 'dairy' | 'schemes' | 'insurance' | 'market' | 'training' | 'reports' | 'settings';

interface EnhancedDashboardProps {
  onNavigate: (page: Page) => void;
}

export function EnhancedDashboard({ onNavigate }: EnhancedDashboardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Welcome Section with Enhanced Design */}
      {/* <div className="glass-card-darker rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-amber-400/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
        
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-slate-900 mb-2">
                {t('Welcome to Animal Husbandry Management System', 'पशुपालन प्रबंधन प्रणाली में आपका स्वागत है', 'ପଶୁପାଳନ ପରିଚାଳନା ବ୍ୟବସ୍ଥାରେ ସ୍ୱାଗତ')}
              </h1>
              <p className="text-slate-600">
                {t('Khordha District, Odisha', 'खोर्धा जिला, ओडिशा', 'ଖୋର୍ଦ୍ଧା ଜିଲ୍ଲା, ଓଡିଶା')} • {t('Last updated: 2 minutes ago', 'अंतिम अपडेट: 2 मिनट पहले', 'ଶେଷ ଅପଡେଟ୍: ୨ ମିନିଟ୍ ପୂର୍ବରୁ')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 rounded-xl bg-white/70 border border-white/30 hover:bg-white transition-all flex items-center justify-center gap-2">
                <Calendar size={18} />
                <span className="text-sm">{t('Today', 'आज', 'ଆଜି')}: Dec 2, 2024</span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <TrendingUp size={18} />
                <span className="text-sm">{t('View Analytics', 'विश्लेषण देखें', 'ବିଶ୍ଳେଷଣ ଦେଖନ୍ତୁ')}</span>
              </button>
            </div>
          </div>

        
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3 bg-white/50 rounded-xl border border-white/30">
              <p className="text-xs text-slate-600 mb-1">{t('District Rank', 'जिला रैंक', 'ଜିଲ୍ଲା ର୍ୟାଙ୍କ')}</p>
              <p className="text-xl font-mono text-green-600">#2</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl border border-white/30">
              <p className="text-xs text-slate-600 mb-1">{t('Target Achieved', 'लक्ष्य प्राप्त', 'ଲକ୍ଷ୍ୟ ପ୍ରାପ୍ତି')}</p>
              <p className="text-xl font-mono text-blue-600">87%</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl border border-white/30">
              <p className="text-xs text-slate-600 mb-1">{t('Active Blocks', 'सक्रिय ब्लॉक', 'ସକ୍ରିୟ ବ୍ଲକ')}</p>
              <p className="text-xl font-mono text-purple-600">18/18</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl border border-white/30">
              <p className="text-xs text-slate-600 mb-1">{t('Success Rate', 'सफलता दर', 'ସଫଳତା ହାର')}</p>
              <p className="text-xl font-mono text-amber-600">94%</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Stats Row with Enhanced Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            icon={Users}
            label={t('Total Farmers', 'कुल किसान', 'କୁଲ କୃଷକ')}
            labelOdia=""
            value="12,456"
            change="+12%"
            trend="up"
            color="primary"
            onAction={() => onNavigate('farmers')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            icon={Beef}
            label={t('Total Livestock', 'कुल पशुधन', 'କୁଲ ପଶୁଧନ')}
            labelOdia=""
            value="45,789"
            change="+8%"
            trend="up"
            color="secondary"
            onAction={() => onNavigate('livestock')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            icon={Droplet}
            label={t('Milk Collection Today', 'आज का दुग्ध संग्रह', 'ଆଜିର ଦୁଗ୍ଧ ସଂଗ୍ରହ')}
            labelOdia=""
            value="2,456L"
            change="+5%"
            trend="up"
            color="info"
            onAction={() => onNavigate('dairy')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            icon={Syringe}
            label={t('Vaccinations This Month', 'इस महीने टीकाकरण', 'ଏହି ମାସର ଟିକାକରଣ')}
            labelOdia=""
            value="8,234"
            change="+15%"
            trend="up"
            color="secondary"
            onAction={() => onNavigate('health')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatCard
            icon={FileText}
            label={t('Pending Applications', 'लंबित आवेदन', 'ବିଚାରାଧୀନ ଆବେଦନ')}
            labelOdia=""
            value="156"
            change="-5%"
            trend="down"
            color="accent"
          />
        </motion.div>
      </div>
      {/* Interactive Map Section */}
      <div className="glass-card rounded-2xl p-6" style={{ height: '100vh' }}>
        <OdishaMapDashboard />
      </div>
      {/* Performance Metrics */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-slate-800 mb-1">{t('Monthly Performance', 'मासिक प्रदर्शन', 'ମାସିକ ପ୍ରଦର୍ଶନ')}</h3>
            <p className="text-sm text-slate-600">{t('November 2026', 'नवंबर 2026', 'ନଭେମ୍ବର ୨୦୨୬')}</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-white/70 border border-white/30 hover:bg-white transition-all text-sm">
            {t('View Details', 'विवरण देखें', 'ବିସ୍ତୃତ ଦେଖନ୍ତୁ')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
                <Award className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-green-700">{t('Schemes Enrolled', 'नामांकित योजनाएं', 'ଯୋଜନା ନାମାଙ୍କନ')}</p>
                <p className="text-2xl font-mono text-green-900">3,456</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-700">
              <TrendingUp size={14} />
              <span>{t('+18% from last month', 'पिछले महीने से +18%', 'ଗତ ମାସ ତୁଳନାରେ +୧୮%')}</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Syringe className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-blue-700">{t('Health Camps', 'स्वास्थ्य शिविर', 'ସ୍ୱାସ୍ଥ୍ୟ କ୍ୟାମ୍ପ')}</p>
                <p className="text-2xl font-mono text-blue-900">48</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-700">
              <TrendingUp size={14} />
              <span>{t('+12 from last month', 'पिछले महीने से +12', 'ଗତ ମାସ ତୁଳନାରେ +୧୨')}</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                <Beef className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-purple-700">{t('AI Services', 'AI सेवाएं', 'AI ସେବା')}</p>
                <p className="text-2xl font-mono text-purple-900">2,890</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-700">
              <TrendingUp size={14} />
              <span>{t('+24% from last month', 'पिछले महीने से +24%', 'ଗତ ମାସ ତୁଳନାରେ +୨୪%')}</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-amber-700">{t('Training Sessions', 'प्रशिक्षण सत्र', 'ତାଲିମ ଅଧିବେଶନ')}</p>
                <p className="text-2xl font-mono text-amber-900">156</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <TrendingUp size={14} />
              <span>{t('+32% from last month', 'पिछले महीने से +32%', 'ଗତ ମାସ ତୁଳନାରେ +୩୨%')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LivestockPieChart />
        <MilkProductionChart />
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-4">
          <h2 className="text-slate-800 mb-1">{t('Quick Actions', 'त्वरित कार्य', 'ତ୍ୱରିତ କାର୍ଯ୍ୟ')}</h2>
          <p className="text-sm text-slate-600">
            {t('Common tasks and operations', 'सामान्य कार्य और संचालन', 'ସାଧାରଣ କାର୍ଯ୍ୟ ଏବଂ କାର୍ଯ୍ୟକଳାପ')}
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Activity & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <AlertsPanel />
      </div>

      {/* District Insights */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-slate-800 mb-1">{t('District Insights', 'जिला अंतर्दृष्टि', 'ଜିଲ୍ଲା ଅନ୍ତର୍ଦୃଷ୍ଟି')}</h2>
          <p className="text-sm text-slate-600">
            {t('Key insights and recommendations for your district', 'आपके जिले के लिए मुख्य अंतर्दृष्टि और सिफारिशें', 'ଆପଣଙ୍କ ଜିଲ୍ଲା ପାଇଁ ମୁଖ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି ଏବଂ ସୁପାରିଶ')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-slate-800 mb-2">
                  {t('Vaccination Coverage Alert', 'टीकाकरण कवरेज चेतावनी', 'ଟିକାକରଣ କଭରେଜ୍ ଚେତାବନୀ')}
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  {t('3 blocks require immediate attention for FMD vaccination coverage', 'FMD टीकाकरण कवरेज के लिए 3 ब्लॉकों को तत्काल ध्यान देने की आवश्यकता है', '୩ ଟି ବ୍ଲକରେ FMD ଟିକାକରଣ କଭରେଜ୍ ପାଇଁ ତୁରନ୍ତ ଧ୍ୟାନ ଆବଶ୍ୟକ')}
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {t('View Details →', 'विवरण देखें →', 'ବିସ୍ତୃତ ଦେଖନ୍ତୁ →')}
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-slate-800 mb-2">
                  {t('Milk Production Increase', 'दुग्ध उत्पादन वृद्धि', 'ଦୁଗ୍ଧ ଉତ୍ପାଦନ ବୃଦ୍ଧି')}
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  {t('District showing 15% increase in daily milk collection this quarter', 'जिले में इस तिमाही में दैनिक दुग्ध संग्रह में 15% की वृद्धि दिख रही है', 'ଜିଲ୍ଲାରେ ଏହି ତ୍ରୈମାସିକରେ ଦୈନିକ ଦୁଗ୍ଧ ସଂଗ୍ରହରେ ୧୫% ବୃଦ୍ଧି ଦେଖାଯାଉଛି')}
                </p>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  {t('View Report →', 'रिपोर्ट देखें →', 'ରିପୋର୍ଟ ଦେଖନ୍ତୁ →')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>{t('© 2024 Odisha Animal Husbandry Department', '© 2024 ओडिशा पशुपालन विभाग', '© ୨୦୨୪ ଓଡିଶା ପଶୁପାଳନ ବିଭାଗ')}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-green-600 transition-colors">{t('Help', 'मदद', 'ସହାୟତା')}</a>
            <a href="#" className="hover:text-green-600 transition-colors">{t('Documentation', 'दस्तावेज़ीकरण', 'ଡକ୍ୟୁମେଣ୍ଟେସନ୍')}</a>
            <a href="#" className="hover:text-green-600 transition-colors">{t('Contact', 'संपर्क', 'ଯୋଗାଯୋଗ')}</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
