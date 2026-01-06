import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Download, Droplet, TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';
import { CollectionCard } from '../components/dairy/CollectionCard';
import { CollectionEntryForm } from '../components/dairy/CollectionEntryForm';
import { CollectionDetail } from '../components/dairy/CollectionDetail';
import { dairyCollectionData, DairyCollection as DairyCollectionType } from '../data/dairyCollectionData';
import { useLanguage } from '../contexts/LanguageContext';

export default function DairyCollection() {
  const { t } = useLanguage();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<DairyCollectionType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedSession, setSelectedSession] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCenter, setSelectedCenter] = useState('all');

  const collections = dairyCollectionData;

  // If a collection is selected, show detail view
  if (selectedCollection) {
    return (
      <CollectionDetail
        collection={selectedCollection}
        onBack={() => setSelectedCollection(null)}
      />
    );
  }

  // Get unique dates
  const dates = Array.from(new Set(collections.map(c => c.date))).sort().reverse();
  
  // Get unique centers
  const centers = Array.from(new Set(collections.map(c => c.collectionCenter)));

  // Filter collections
  const filteredCollections = collections.filter(collection => {
    const matchesSearch = 
      collection.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.collectionId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = selectedDate === 'all' || collection.date === selectedDate;
    const matchesSession = selectedSession === 'all' || collection.session === selectedSession;
    const matchesStatus = selectedStatus === 'all' || collection.status === selectedStatus;
    const matchesCenter = selectedCenter === 'all' || collection.collectionCenter === selectedCenter;

    return matchesSearch && matchesDate && matchesSession && matchesStatus && matchesCenter;
  });

  // Calculate statistics
  const todayCollections = collections.filter(c => c.date === new Date().toISOString().split('T')[0]);
  const totalQuantityToday = todayCollections.reduce((sum, c) => sum + c.quantity, 0);
  const totalAmountToday = todayCollections.reduce((sum, c) => sum + c.totalAmount, 0);
  const uniqueFarmersToday = new Set(todayCollections.map(c => c.farmerId)).size;
  
  const totalQuantity = filteredCollections.reduce((sum, c) => sum + c.quantity, 0);
  const totalAmount = filteredCollections.reduce((sum, c) => sum + c.totalAmount, 0);
  const avgFat = filteredCollections.reduce((sum, c) => sum + c.fat, 0) / (filteredCollections.length || 1);
  const avgSNF = filteredCollections.reduce((sum, c) => sum + c.snf, 0) / (filteredCollections.length || 1);

  const pendingPayments = collections.filter(c => c.status === 'pending' || c.status === 'approved');
  const pendingAmount = pendingPayments.reduce((sum, c) => sum + c.totalAmount, 0);

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
            <h2 className="text-slate-900 mb-1">{t('Dairy Collection Management', 'दुग्ध संग्रह प्रबंधन', 'ଦୁଗ୍ଧ ସଂଗ୍ରହ ପରିଚାଳନା')}</h2>
            <p className="text-sm text-slate-600">{t('Track daily milk collection and quality', 'दैनिक दूध संग्रह और गुणवत्ता ट्रैक करें', 'ଦୈନିକ କ୍ଷୀର ସଂଗ୍ରହ ଏବଂ ଗୁଣବତ୍ତା ଟ୍ରାକ୍ କରନ୍ତୁ')}</p>
          </div>
          <button
            onClick={() => setIsEntryFormOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2"
          >
            <Plus size={20} />
            {t('Add Collection Entry', 'संग्रह प्रविष्टि जोड़ें', 'ସଂଗ୍ରହ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ')}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search by farmer name or collection ID...', 'किसान के नाम या संग्रह ID से खोजें...', 'କୃଷକଙ୍କ ନାମ କିମ୍ବା ସଂଗ୍ରହ ID ରେ ଖୋଜନ୍ତୁ...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Dates', 'सभी तारीखें', 'ସମସ୍ତ ତାରିଖ')}</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {/* Session Filter */}
          <div>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Sessions', 'सभी सत्र', 'ସମସ୍ତ ଅଧିବେଶନ')}</option>
              <option value="morning">🌅 {t('Morning', 'सुबह', 'ସକାଳ')}</option>
              <option value="evening">🌆 {t('Evening', 'शाम', 'ସନ୍ଧ୍ୟା')}</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('All Status', 'सभी स्थिति', 'ସମସ୍ତ ସ୍ଥିତି')}</option>
              <option value="pending">{t('Pending', 'लंबित', 'ବିଚାରାଧୀନ')}</option>
              <option value="approved">{t('Approved', 'स्वीकृत', 'ଅନୁମୋଦିତ')}</option>
              <option value="paid">{t('Paid', 'भुगतान किया', 'ଦେୟ ପ୍ରଦାନ କରାଯାଇଛି')}</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-sm">
              <Filter size={16} />
              {t('More Filters', 'अधिक फिल्टर', 'ଅଧିକ ଫିଲ୍ଟର୍')}
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2 text-sm">
              <Download size={16} />
              {t('Export Report', 'रिपोर्ट निर्यात करें', 'ରିପୋର୍ଟ ରପ୍ତାନି କରନ୍ତୁ')}
            </button>
          </div>

          <p className="text-sm text-slate-600">
            {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredCollections.length}</span> {t('of', 'का', 'ର')}{' '}
            <span className="font-mono text-slate-900">{collections.length}</span> {t('collections', 'संग्रह', 'ସଂଗ୍ରହ')}
          </p>
        </div>
      </div>

      {/* Today's Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-blue-600" size={20} />
            <span className="text-sm text-slate-600">{t("Today's Collection", 'आज का संग्रह', 'ଆଜିର ସଂଗ୍ରହ')}</span>
          </div>
          <p className="text-2xl text-slate-900 font-mono mb-1">{totalQuantityToday.toFixed(2)}L</p>
          <p className="text-xs text-blue-600">{todayCollections.length} {t('entries', 'प्रविष्टियाँ', 'ଏଣ୍ଟ୍ରି')}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-600" size={20} />
            <span className="text-sm text-slate-600">{t("Today's Amount", 'आज की राशि', 'ଆଜିର ପରିମାଣ')}</span>
          </div>
          <p className="text-2xl text-slate-900 font-mono mb-1">₹{totalAmountToday.toFixed(2)}</p>
          <p className="text-xs text-green-600">{uniqueFarmersToday} {t('farmers', 'किसान', 'କୃଷକ')}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-sm text-slate-600">{t('Avg Quality', 'औसत गुणवत्ता', 'ହାରାହାରି ଗୁଣବତ୍ତା')}</span>
          </div>
          <div className="flex gap-2">
            <div>
              <p className="text-sm text-slate-900 font-mono">{avgFat.toFixed(2)}%</p>
              <p className="text-xs text-slate-500">{t('Fat', 'वसा', 'ଚର୍ବି')}</p>
            </div>
            <div className="border-l border-slate-200 pl-2">
              <p className="text-sm text-slate-900 font-mono">{avgSNF.toFixed(2)}%</p>
              <p className="text-xs text-slate-500">SNF</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-amber-600" size={20} />
            <span className="text-sm text-slate-600">{t('Pending Payments', 'लंबित भुगतान', 'ବିଚାରାଧୀନ ଦେୟ')}</span>
          </div>
          <p className="text-2xl text-slate-900 font-mono mb-1">₹{pendingAmount.toFixed(2)}</p>
          <p className="text-xs text-amber-600">{pendingPayments.length} {t('collections', 'संग्रह', 'ସଂଗ୍ରହ')}</p>
        </div>
      </div>

      {/* Filter Summary */}
      {selectedDate !== 'all' && (
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-800 mb-1">{t('Filter Summary', 'फिल्टर सारांश', 'ଫିଲ୍ଟର୍ ସାରାଂଶ')}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>{t('Total', 'कुल', 'କୁଲ')}: <span className="font-mono text-slate-900">{totalQuantity.toFixed(2)}L</span></span>
                <span>{t('Amount', 'राशि', 'ପରିମାଣ')}: <span className="font-mono text-green-600">₹{totalAmount.toFixed(2)}</span></span>
                <span>{t('Avg Fat', 'औसत वसा', 'ହାରାହାରି ଚର୍ବି')}: <span className="font-mono text-slate-900">{avgFat.toFixed(2)}%</span></span>
                <span>{t('Avg SNF', 'औसत SNF', 'ହାରାହାରି SNF')}: <span className="font-mono text-slate-900">{avgSNF.toFixed(2)}%</span></span>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDate('all');
                setSelectedSession('all');
                setSelectedStatus('all');
                setSelectedCenter('all');
              }}
              className="text-sm text-green-600 hover:text-green-700"
            >
              {t('Clear All Filters', 'सभी फिल्टर साफ करें', 'ସମସ୍ତ ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
            </button>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collectionId={collection.collectionId}
            farmerName={collection.farmerName}
            farmerNameOdia={collection.farmerNameOdia}
            date={collection.date}
            session={collection.session}
            quantity={collection.quantity}
            fat={collection.fat}
            snf={collection.snf}
            quality={collection.quality}
            totalAmount={collection.totalAmount}
            status={collection.status}
            onClick={() => setSelectedCollection(collection)}
          />
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Droplet className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No collections found', 'कोई संग्रह नहीं मिला', 'କୌଣସି ସଂଗ୍ରହ ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDate('all');
              setSelectedSession('all');
              setSelectedStatus('all');
              setSelectedCenter('all');
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t('Clear Filters', 'फिल्टर साफ करें', 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ')}
          </button>
        </div>
      )}

      {/* Collection Centers Summary */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4">{t("Collection Centers - Today's Summary", "संग्रह केंद्र - आज का सारांश", 'ସଂଗ୍ରହ କେନ୍ଦ୍ର - ଆଜିର ସାରାଂଶ')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {centers.map((center) => {
            const centerCollections = todayCollections.filter(c => c.collectionCenter === center);
            const centerQuantity = centerCollections.reduce((sum, c) => sum + c.quantity, 0);
            const centerAmount = centerCollections.reduce((sum, c) => sum + c.totalAmount, 0);
            
            return (
              <div
                key={center}
                className="p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all cursor-pointer"
                onClick={() => setSelectedCenter(center)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Droplet size={16} className="text-blue-600" />
                  <p className="text-sm text-slate-900 font-medium">{center.split(' ')[0]}</p>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>{t('Quantity', 'मात्रा', 'ପରିମାଣ')}: <span className="font-mono text-slate-900">{centerQuantity.toFixed(2)}L</span></p>
                  <p>{t('Amount', 'राशि', 'ପରିମାଣ')}: <span className="font-mono text-green-600">₹{centerAmount.toFixed(2)}</span></p>
                  <p>{t('Collections', 'संग्रह', 'ସଂଗ୍ରହ')}: <span className="font-mono text-slate-900">{centerCollections.length}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collection Entry Form Modal */}
      <CollectionEntryForm
        isOpen={isEntryFormOpen}
        onClose={() => setIsEntryFormOpen(false)}
      />
    </motion.div>
  );
}
