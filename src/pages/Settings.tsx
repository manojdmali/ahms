import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Lock,
  Database,
  Link2,
  HelpCircle,
  Download,
  Trash2
} from 'lucide-react';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { SystemPreferences } from '../components/settings/SystemPreferences';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { useLanguage } from '../contexts/LanguageContext';

type SettingsTab = 'profile' | 'preferences' | 'notifications' | 'security' | 'data' | 'integrations' | 'about';

export default function Settings() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, label: t('Profile', 'प्रोफ़ाइल', 'ପ୍ରୋଫାଇଲ୍'), icon: User },
    { id: 'preferences' as SettingsTab, label: t('Preferences', 'प्राथमिकताएं', 'ପସନ୍ଦ'), icon: SettingsIcon },
    { id: 'notifications' as SettingsTab, label: t('Notifications', 'सूचनाएं', 'ବିଜ୍ଞପ୍ତି'), icon: Bell },
    { id: 'security' as SettingsTab, label: t('Security', 'सुरक्षा', 'ସୁରକ୍ଷା'), icon: Lock },
    { id: 'data' as SettingsTab, label: t('Data & Privacy', 'डेटा और गोपनीयता', 'ତଥ୍ୟ ଏବଂ ଗୋପନୀୟତା'), icon: Database },
    { id: 'integrations' as SettingsTab, label: t('Integrations', 'एकीकरण', 'ସଂଯୋଗ'), icon: Link2 },
    { id: 'about' as SettingsTab, label: t('About', 'बारे में', 'ବିଷୟରେ'), icon: HelpCircle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'preferences':
        return <SystemPreferences />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'data':
        return <DataPrivacySettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-4 sm:p-6">
        <h2 className="text-slate-900 mb-1">{t('Settings', 'सेटिंग्स', 'ସେଟିଂସ୍')}</h2>
        <p className="text-sm text-slate-600">{t('Manage your account and preferences', 'अपना खाता और प्राथमिकताएं प्रबंधित करें', 'ଆପଣଙ୍କର ଖାତା ଏବଂ ପସନ୍ଦ ପରିଚାଳନା କରନ୍ତୁ')}</p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-2 sm:p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-white/70'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tab.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Data & Privacy Settings Component
function DataPrivacySettings() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Download size={20} />
          {t('Export Your Data', 'अपना डेटा निर्यात करें', 'ଆପଣଙ୍କର ତଥ୍ୟ ରପ୍ତାନି କରନ୍ତୁ')}
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          {t('Download a copy of your data including livestock records, health records, transactions, and more.', 'पशुधन रिकॉर्ड, स्वास्थ्य रिकॉर्ड, लेनदेन और अधिक सहित अपने डेटा की एक प्रति डाउनलोड करें।', 'ପଶୁଧନ ରେକର୍ଡ, ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ, କାରବାର ଏବଂ ଅଧିକ ସହିତ ଆପଣଙ୍କର ତଥ୍ୟର ଏକ କପି ଡାଉନଲୋଡ୍ କରନ୍ତୁ।')}
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-slate-900">{t('Livestock Records', 'पशुधन रिकॉर्ड', 'ପଶୁଧନ ରେକର୍ଡ')}</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-slate-900">{t('Health & Vaccination Records', 'स्वास्थ्य और टीकाकरण रिकॉर्ड', 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଟିକାକରଣ ରେକର୍ଡ')}</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-slate-900">{t('Dairy Collection Data', 'दुग्ध संग्रह डेटा', 'ଦୁଗ୍ଧ ସଂଗ୍ରହ ତଥ୍ୟ')}</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-slate-900">{t('Financial Transactions', 'वित्तीय लेनदेन', 'ଆର୍ଥିକ କାରବାର')}</span>
          </label>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm">
            {t('Export as CSV', 'CSV के रूप में निर्यात करें', 'CSV ଭାବରେ ରପ୍ତାନି କରନ୍ତୁ')}
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm">
            {t('Export as Excel', 'Excel के रूप में निर्यात करें', 'Excel ଭାବରେ ରପ୍ତାନି କରନ୍ତୁ')}
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all text-sm">
            {t('Export as PDF', 'PDF के रूप में निर्यात करें', 'PDF ଭାବରେ ରପ୍ତାନି କରନ୍ତୁ')}
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Lock size={20} />
          {t('Privacy Settings', 'गोपनीयता सेटिंग्स', 'ଗୋପନୀୟତା ସେଟିଂସ୍')}
        </h4>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{t('Make my profile visible to other officers', 'मेरी प्रोफ़ाइल अन्य अधिकारियों को दिखाएं', 'ମୋର ପ୍ରୋଫାଇଲ୍ ଅନ୍ୟ ଅଧିକାରୀମାନଙ୍କୁ ଦେଖାନ୍ତୁ')}</p>
              <p className="text-xs text-slate-600">{t('Allow other district officers to view your profile', 'अन्य जिला अधिकारियों को अपनी प्रोफ़ाइल देखने की अनुमति दें', 'ଅନ୍ୟ ଜିଲ୍ଲା ଅଧିକାରୀମାନଙ୍କୁ ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ଦେଖିବାକୁ ଅନୁମତି ଦିଅନ୍ତୁ')}</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{t('Share anonymized data for research', 'अनुसंधान के लिए गुमनाम डेटा साझा करें', 'ଅନୁସନ୍ଧାନ ପାଇଁ ଅଜ୍ଞାତ ତଥ୍ୟ ସେୟାର୍ କରନ୍ତୁ')}</p>
              <p className="text-xs text-slate-600">{t('Help improve livestock management practices', 'पशुधन प्रबंधन प्रथाओं में सुधार करने में मदद करें', 'ପଶୁଧନ ପରିଚାଳନା ପ୍ରଥା ଉନ୍ନତି କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ')}</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{t('Allow data sharing with state departments', 'राज्य विभागों के साथ डेटा साझा करने की अनुमति दें', 'ରାଜ୍ୟ ବିଭାଗମାନଙ୍କ ସହିତ ତଥ୍ୟ ସେୟାର୍ କରିବାକୁ ଅନୁମତି ଦିଅନ୍ତୁ')}</p>
              <p className="text-xs text-slate-600">{t('Share data for state-level analytics and planning', 'राज्य स्तर के विश्लेषण और योजना के लिए डेटा साझा करें', 'ରାଜ୍ୟ ସ୍ତରୀୟ ବିଶ୍ଳେଷଣ ଏବଂ ଯୋଜନା ପାଇଁ ତଥ୍ୟ ସେୟାର୍ କରନ୍ତୁ')}</p>
            </div>
          </label>
        </div>
      </div>

      {/* Data Retention */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Database size={20} />
          {t('Data Retention', 'डेटा प्रतिधारण', 'ତଥ୍ୟ ସଂରକ୍ଷଣ')}
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          {t('Configure how long your data is stored in the system', 'कॉन्फ़िगर करें कि आपका डेटा सिस्टम में कितने समय तक संग्रहीत रहता है', 'ଆପଣଙ୍କର ତଥ୍ୟ ସିଷ୍ଟମରେ କେତେ ସମୟ ରଖାଯାଏ ତାହା ବିନ୍ୟାସ କରନ୍ତୁ')}
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
            <span className="text-sm text-slate-900">{t('Livestock Records', 'पशुधन रिकॉर्ड', 'ପଶୁଧନ ରେକର୍ଡ')}</span>
            <select className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm">
              <option>{t('Keep Forever', 'हमेशा के लिए रखें', 'ସବୁଦିନ ପାଇଁ ରଖନ୍ତୁ')}</option>
              <option>{t('5 Years', '5 वर्ष', '5 ବର୍ଷ')}</option>
              <option>{t('3 Years', '3 वर्ष', '3 ବର୍ଷ')}</option>
              <option>{t('1 Year', '1 वर्ष', '1 ବର୍ଷ')}</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
            <span className="text-sm text-slate-900">{t('Transaction Logs', 'लेनदेन लॉग', 'କାରବାର ଲଗ୍')}</span>
            <select className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm">
              <option>{t('Keep Forever', 'हमेशा के लिए रखें', 'ସବୁଦିନ ପାଇଁ ରଖନ୍ତୁ')}</option>
              <option>{t('5 Years', '5 वर्ष', '5 ବର୍ଷ')}</option>
              <option>{t('3 Years', '3 वर्ष', '3 ବର୍ଷ')}</option>
              <option>{t('1 Year', '1 वर्ष', '1 ବର୍ଷ')}</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
            <span className="text-sm text-slate-900">{t('Activity Logs', 'गतिविधि लॉग', 'କାର୍ଯ୍ୟକଳାପ ଲଗ୍')}</span>
            <select className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm">
              <option>{t('6 Months', '6 महीने', '6 ମାସ')}</option>
              <option>{t('3 Months', '3 महीने', '3 ମାସ')}</option>
              <option>{t('1 Month', '1 महीना', '1 ମାସ')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="glass-card rounded-2xl p-6 border-2 border-red-200">
        <h4 className="text-red-600 mb-4 flex items-center gap-2">
          <Trash2 size={20} />
          {t('Delete Account', 'खाता हटाएं', 'ଖାତା ବିଲୋପ କରନ୍ତୁ')}
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          {t('Permanently delete your account and all associated data. This action cannot be undone.', 'अपने खाते और सभी संबंधित डेटा को स्थायी रूप से हटा दें। इस क्रिया को पूर्ववत नहीं किया जा सकता है।', 'ଆପଣଙ୍କର ଖାତା ଏବଂ ସମସ୍ତ ସଂଶ୍ଳିଷ୍ଟ ତଥ୍ୟ ସ୍ଥାୟୀ ଭାବରେ ବିଲୋପ କରନ୍ତୁ। ଏହି କାର୍ଯ୍ୟକୁ ପୂର୍ବବତ୍ କରାଯାଇପାରିବ ନାହିଁ।')}
        </p>
        <button className="px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-sm flex items-center gap-2">
          <Trash2 size={16} />
          {t('Delete My Account', 'मेरा खाता हटाएं', 'ମୋର ଖାତା ବିଲୋପ କରନ୍ତୁ')}
        </button>
      </div>
    </div>
  );
}

// Integrations Settings Component
function IntegrationsSettings() {
  const { t } = useLanguage();
  
  const integrations = [
    {
      name: 'National Dairy Development Board (NDDB)',
      description: t('Sync dairy collection data with NDDB portal', 'NDDB पोर्टल के साथ दुग्ध संग्रह डेटा सिंक करें', 'NDDB ପୋର୍ଟାଲ୍ ସହିତ ଦୁଗ୍ଧ ସଂଗ୍ରହ ତଥ୍ୟ ସିଙ୍କ୍ କରନ୍ତୁ'),
      status: 'connected',
      lastSync: t('2 hours ago', '2 घंटे पहले', '2 ଘଣ୍ଟା ପୂର୍ବରୁ')
    },
    {
      name: 'Government e-Marketplace (GeM)',
      description: t('Integrate procurement and marketplace listings', 'खरीद और मार्केटप्लेस सूचियों को एकीकृत करें', 'କ୍ରୟ ଏବଂ ମାର୍କେଟପ୍ଲେସ୍ ତାଲିକା ଏକୀକୃତ କରନ୍ତୁ'),
      status: 'not-connected',
      lastSync: null
    },
    {
      name: 'State Insurance Portal',
      description: t('Auto-sync insurance claims and policies', 'बीमा दावों और नीतियों को ऑटो-सिंक करें', 'ବୀମା ଦାବି ଏବଂ ନୀତିଗୁଡିକୁ ଅଟୋ-ସିଙ୍କ୍ କରନ୍ତୁ'),
      status: 'connected',
      lastSync: t('1 day ago', '1 दिन पहले', '1 ଦିନ ପୂର୍ବରୁ')
    },
    {
      name: 'DigiLocker Integration',
      description: t('Store and verify digital documents', 'डिजिटल दस्तावेज़ों को संग्रहीत और सत्यापित करें', 'ଡିଜିଟାଲ୍ ଦସ୍ତାବେଜଗୁଡ଼ିକୁ ଗଚ୍ଛିତ ଏବଂ ଯାଞ୍ଚ କରନ୍ତୁ'),
      status: 'not-connected',
      lastSync: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Connected Services */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Link2 size={20} />
          {t('Connected Services', 'जुड़ी सेवाएं', 'ସଂଯୁକ୍ତ ସେବା')}
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          {t('Manage integrations with external services and government portals', 'बाहरी सेवाओं और सरकारी पोर्टल के साथ एकीकरण प्रबंधित करें', 'ବାହ୍ୟ ସେବା ଏବଂ ସରକାରୀ ପୋର୍ଟାଲ୍ ସହିତ ଏକୀକରଣ ପରିଚାଳନା କରନ୍ତୁ')}
        </p>
        <div className="space-y-3">
          {integrations.map((integration, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 mb-1">{integration.name}</p>
                <p className="text-xs text-slate-600 mb-2">{integration.description}</p>
                {integration.status === 'connected' && integration.lastSync && (
                  <p className="text-xs text-green-600">{t('Last synced', 'अंतिम सिंक', 'ଶେଷ ସିଙ୍କ୍')}: {integration.lastSync}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {t('Connected', 'जुड़ा हुआ', 'ସଂଯୁକ୍ତ')}
                    </span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-xs">
                      {t('Configure', 'कॉन्फ़िगर करें', 'ବିନ୍ୟାସ କରନ୍ତୁ')}
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all text-xs">
                    {t('Connect', 'कनेक्ट करें', 'ସଂଯୋଗ କରନ୍ତୁ')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Access */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4">{t('API Access', 'API एक्सेस', 'API ଆକ୍ସେସ୍')}</h4>
        <p className="text-sm text-slate-600 mb-4">
          {t('Generate API keys for programmatic access to your data', 'अपने डेटा तक प्रोग्रामेटिक पहुंच के लिए API कुंजियाँ जेनरेट करें', 'ଆପଣଙ୍କର ତଥ୍ୟକୁ ପ୍ରୋଗ୍ରାମେଟିକ୍ ଆକ୍ସେସ୍ ପାଇଁ API କି ସୃଷ୍ଟି କରନ୍ତୁ')}
        </p>
        <button className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm">
          {t('Generate API Key', 'API कुंजी जेनरेट करें', 'API କି ସୃଷ୍ଟି କରନ୍ତୁ')}
        </button>
      </div>
    </div>
  );
}

// About Settings Component
function AboutSettings() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* System Information */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4">{t('System Information', 'सिस्टम की जानकारी', 'ସିଷ୍ଟମ୍ ସୂଚନା')}</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">{t('Version', 'संस्करण', 'ସଂସ୍କରଣ')}</span>
            <span className="text-sm font-mono text-slate-900">v2.4.1</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">{t('Last Updated', 'अंतिम अपडेट', 'ଶେଷ ଅପଡେଟ୍')}</span>
            <span className="text-sm text-slate-900">December 2, 2024</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-sm text-slate-600">{t('Environment', 'वातावरण', 'ପରିବେଶ')}</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{t('Production', 'प्रोडक्शन', 'ଉତ୍ପାଦନ')}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-600">{t('License', 'लाइसेंस', 'ଲାଇସେନ୍ସ')}</span>
            <span className="text-sm text-slate-900">Government of Odisha</span>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4">{t('Support & Resources', 'समर्थन और संसाधन', 'ସହାୟତା ଏବଂ ଉତ୍ସ')}</h4>
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            <span className="text-sm text-slate-900">{t('Documentation', 'दस्तावेज़ीकरण', 'ଦସ୍ତାବେଜୀକରଣ')}</span>
            <span className="text-slate-400">→</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            <span className="text-sm text-slate-900">{t('Video Tutorials', 'वीडियो ट्यूटोरियल', 'ଭିଡିଓ ଟ୍ୟୁଟୋରିଆଲ୍')}</span>
            <span className="text-slate-400">→</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            <span className="text-sm text-slate-900">{t('Contact Support', 'सहायता से संपर्क करें', 'ସହାୟତା ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ')}</span>
            <span className="text-slate-400">→</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            <span className="text-sm text-slate-900">{t('Report a Bug', 'बग की रिपोर्ट करें', 'ବଗ୍ ରିପୋର୍ଟ କରନ୍ତୁ')}</span>
            <span className="text-slate-400">→</span>
          </a>
        </div>
      </div>

      {/* About */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4">{t('About AHMS', 'AHMS के बारे में', 'AHMS ବିଷୟରେ')}</h4>
        <p className="text-sm text-slate-600 mb-4">
          {t(
            'Animal Husbandry Management System (AHMS) is a comprehensive digital platform developed for the Department of Animal Husbandry & Veterinary Services, Government of Odisha. The system enables efficient management of livestock registration, health monitoring, breeding services, dairy operations, and farmer engagement across all districts of Odisha.',
            'पशुपालन प्रबंधन प्रणाली (AHMS) एक व्यापक डिजिटल प्लेटफ़ॉर्म है जो पशुपालन और पशु चिकित्सा सेवा विभाग, ओडिशा सरकार के लिए विकसित किया गया है। यह प्रणाली ओडिशा के सभी जिलों में पशुधन पंजीकरण, स्वास्थ्य निगरानी, प्रजनन सेवाओं, डेयरी संचालन और किसान सहभागिता के कुशल प्रबंधन को सक्षम बनाती है।',
            'ପଶୁପାଳନ ପରିଚାଳନା ବ୍ୟବସ୍ଥା (AHMS) ହେଉଛି ଏକ ବ୍ୟାପକ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ ଯାହା ପଶୁପାଳନ ଏବଂ ପଶୁଚିକିତ୍ସା ସେବା ବିଭାଗ, ଓଡ଼ିଶା ସରକାରଙ୍କ ପାଇଁ ବିକଶିତ ହୋଇଛି। ଏହି ବ୍ୟବସ୍ଥା ଓଡ଼ିଶାର ସମସ୍ତ ଜିଲ୍ଲାରେ ପଶୁଧନ ପଞ୍ଜୀକରଣ, ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ, ପ୍ରଜନନ ସେବା, ଦୁଗ୍ଧ କାର୍ଯ୍ୟ ଏବଂ କୃଷକ ସହଭାଗିତାର ଦକ୍ଷ ପରିଚାଳନାକୁ ସକ୍ଷମ କରେ।'
          )}
        </p>
        <p className="text-sm text-slate-600">
          {t('© 2024 Government of Odisha. All rights reserved.', '© 2024 ओडिशा सरकार। सर्वाधिकार सुरक्षित।', '© 2024 ଓଡ଼ିଶା ସରକାର। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।')}
        </p>
      </div>
    </div>
  );
}
