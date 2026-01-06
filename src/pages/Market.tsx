import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, TrendingUp, Package, ShoppingCart, Users, IndianRupee } from 'lucide-react';
import { MarketCard } from '../components/market/MarketCard';
import { MarketDetail } from '../components/market/MarketDetail';
import { marketData, marketCategories, MarketListing } from '../data/marketData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Market() {
  const { t } = useLanguage();
  const [selectedListing, setSelectedListing] = useState<MarketListing | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');

  const listings = marketData;

  // If a listing is selected, show detail view
  if (selectedListing) {
    return (
      <MarketDetail
        listing={selectedListing}
        onBack={() => setSelectedListing(null)}
      />
    );
  }

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.listingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesType = selectedType === 'all' || listing.type === selectedType;
    const matchesQuality = selectedQuality === 'all' || listing.quality === selectedQuality;

    return matchesSearch && matchesCategory && matchesType && matchesQuality;
  });

  // Calculate statistics
  const totalListings = listings.length;
  const sellListings = listings.filter(l => l.type === 'sell' && l.status === 'available').length;
  const buyRequests = listings.filter(l => l.type === 'buy').length;
  const avgRating = (listings.reduce((sum, l) => sum + l.rating, 0) / listings.length).toFixed(1);
  const totalValue = listings.filter(l => l.type === 'sell').reduce((sum, l) => sum + (l.price * l.quantityAvailable), 0);

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
            <h2 className="text-slate-900 mb-1">{t('Marketplace', 'बाजार', 'ବଜାର')}</h2>
            <p className="text-sm text-slate-600">{t('Buy and sell livestock, products, and equipment', 'पशुधन, उत्पाद और उपकरण खरीदें और बेचें', 'ପଶୁଧନ, ଉତ୍ପାଦ ଏବଂ ଯନ୍ତ୍ରପାତି କିଣନ୍ତୁ ଏବଂ ବିକ୍ରୟ କରନ୍ତୁ')}</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2">
            <Plus size={18} />
            <span>{t('Post Listing', 'लिस्टिंग पोस्ट करें', 'ତାଲିକା ପୋଷ୍ଟ କରନ୍ତୁ')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('Search products, sellers...', 'उत्पाद, विक्रेता खोजें...', 'ଉତ୍ପାଦ, ବିକ୍ରେତା ଖୋଜନ୍ତୁ...')}
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
              {marketCategories.map((cat) => (
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
              <option value="sell">{t('For Sale', 'बिक्री के लिए', 'ବିକ୍ରୟ ପାଇଁ')}</option>
              <option value="buy">{t('Wanted', 'चाहिए', 'ଆବଶ୍ୟକ')}</option>
            </select>
          </div>

          {/* Quality Filter */}
          <div>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              <option value="all">{t('All Quality', 'सभी गुणवत्ता', 'ସମସ୍ତ ଗୁଣବତ୍ତା')}</option>
              <option value="premium">{t('Premium', 'प्रीमियम', 'ପ୍ରିମିୟମ୍')}</option>
              <option value="standard">{t('Standard', 'मानक', 'ମାନକ')}</option>
              <option value="economy">{t('Economy', 'अर्थव्यवस्था', 'ଅର୍ଥନୀତି')}</option>
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
              <TrendingUp size={16} />
              <span className="hidden sm:inline">{t('Sort by Price', 'कीमत से क्रमबद्ध करें', 'ମୂଲ୍ୟ ଅନୁସାରେ ସଜାନ୍ତୁ')}</span>
              <span className="sm:hidden">{t('Sort', 'क्रमबद्ध करें', 'ସଜାନ୍ତୁ')}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            {t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')} <span className="font-mono text-slate-900">{filteredListings.length}</span> {t('of', 'का', 'ର')}{' '}
            <span className="font-mono text-slate-900">{listings.length}</span> {t('listings', 'लिस्टिंग', 'ତାଲିକା')}
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-green-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Active Listings', 'सक्रिय लिस्टिंग', 'ସକ୍ରିୟ ତାଲିକା')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{sellListings}</p>
          <p className="text-xs text-green-600">{t('Available for sale', 'बिक्री के लिए उपलब्ध', 'ବିକ୍ରୟ ପାଇଁ ଉପଲବ୍ଧ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="text-blue-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Buy Requests', 'खरीद अनुरोध', 'କ୍ରୟ ଅନୁରୋଧ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{buyRequests}</p>
          <p className="text-xs text-blue-600">{t('Looking to buy', 'खरीदने की तलाश में', 'କିଣିବାକୁ ଖୋଜୁଛନ୍ତି')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Avg Rating', 'औसत रेटिंग', 'ହାରାହାରି ମୂଲ୍ୟାୟନ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">{avgRating} ⭐</p>
          <p className="text-xs text-purple-600">{t('Seller ratings', 'विक्रेता रेटिंग', 'ବିକ୍ରେତା ମୂଲ୍ୟାୟନ')}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-amber-600" size={18} />
            <span className="text-xs sm:text-sm text-slate-600">{t('Total Value', 'कुल मूल्य', 'ମୋଟ ମୂଲ୍ୟ')}</span>
          </div>
          <p className="text-2xl sm:text-3xl text-slate-900 font-mono mb-1">₹{(totalValue / 100000).toFixed(0)}L</p>
          <p className="text-xs text-amber-600">{t('Market value', 'बाजार मूल्य', 'ବଜାର ମୂଲ୍ୟ')}</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4">{t('Browse by Category', 'श्रेणी के अनुसार ब्राउज़ करें', 'ବର୍ଗ ଅନୁଯାୟୀ ବ୍ରାଉଜ୍ କରନ୍ତୁ')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {marketCategories.slice(1).map((cat) => {
            const count = listings.filter(l => l.category === cat.value && l.type === 'sell' && l.status === 'available').length;
            const categoryIcons: Record<string, string> = {
              livestock: '🐄',
              dairy: '🥛',
              feed: '🌾',
              equipment: '⚙️',
              produce: '🌽',
              services: '🔧'
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

      {/* Featured Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedType('sell')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'sell'
              ? 'bg-green-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          🏪 {t('For Sale', 'बिक्री के लिए', 'ବିକ୍ରୟ ପାଇଁ')} ({listings.filter(l => l.type === 'sell').length})
        </button>
        <button
          onClick={() => setSelectedType('buy')}
          className={`px-4 py-2 rounded-xl transition-all ${
            selectedType === 'buy'
              ? 'bg-blue-600 text-white'
              : 'bg-white/70 text-slate-700 hover:bg-white'
          }`}
        >
          🔍 {t('Wanted', 'चाहिए', 'ଆବଶ୍ୟକ')} ({listings.filter(l => l.type === 'buy').length})
        </button>
        <button
          onClick={() => {
            const verifiedListings = listings.filter(l => l.verified);
            if (verifiedListings.length > 0) setSelectedType('all');
          }}
          className="px-4 py-2 rounded-xl bg-white/70 text-slate-700 hover:bg-white transition-all"
        >
          ✅ {t('Verified Sellers', 'सत्यापित विक्रेता', 'ଯାଞ୍ଚିତ ବିକ୍ରେତା')} ({listings.filter(l => l.verified).length})
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredListings.map((listing) => (
          <MarketCard
            key={listing.id}
            listingId={listing.listingId}
            title={listing.title}
            titleOdia={listing.titleOdia}
            category={listing.category}
            type={listing.type}
            price={listing.price}
            unit={listing.unit}
            sellerName={listing.sellerName}
            sellerLocation={listing.sellerLocation}
            images={listing.images}
            quality={listing.quality}
            verified={listing.verified}
            rating={listing.rating}
            reviews={listing.reviews}
            status={listing.status}
            negotiable={listing.negotiable}
            onClick={() => setSelectedListing(listing)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="text-slate-400" size={32} />
          </div>
          <h3 className="text-slate-800 mb-2">{t('No listings found', 'कोई लिस्टिंग नहीं मिली', 'କୌଣସି ତାଲିକା ମିଳିଲା ନାହିଁ')}</h3>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            {t('Try adjusting your search or filter criteria', 'अपने खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें', 'ଆପଣଙ୍କର ସନ୍ଧାନ କିମ୍ବା ଫିଲ୍ଟର୍ ମାନଦଣ୍ଡ ସମାୟୋଜନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
              setSelectedQuality('all');
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
            <ShoppingCart className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{t('Want to Sell Your Products?', 'अपने उत्पाद बेचना चाहते हैं?', 'ଆପଣଙ୍କର ଉତ୍ପାଦ ବିକ୍ରୟ କରିବାକୁ ଚାହୁଁଛନ୍ତି କି?')}</h3>
            <p className="text-sm text-slate-600 mb-4">
              {t(
                'List your livestock, dairy products, equipment, or services on our marketplace. Reach thousands of farmers and buyers across Odisha. Free listing for registered farmers!',
                'अपने पशुधन, डेयरी उत्पादों, उपकरण या सेवाओं को हमारे बाजार में सूचीबद्ध करें। ओडिशा भर में हजारों किसानों और खरीदारों तक पहुंचें। पंजीकृत किसानों के लिए मुफ्त लिस्टिंग!',
                'ଆମର ବଜାରରେ ଆପଣଙ୍କର ପଶୁଧନ, ଦୁଗ୍ଧ ଉତ୍ପାଦ, ଯନ୍ତ୍ରପାତି କିମ୍ବା ସେବା ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ। ଓଡ଼ିଶା ଜୁଡ଼ିକ ହଜାର ହଜାର କୃଷକ ଏବଂ କ୍ରେତାଙ୍କ ନିକଟରେ ପହଞ୍ଚନ୍ତୁ। ପଞ୍ଜୀକୃତ କୃଷକଙ୍କ ପାଇଁ ମାଗଣା ତାଲିକା!'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-white rounded-xl border border-white/30 text-sm hover:shadow transition-all">
                {t('Learn More', 'और जानें', 'ଅଧିକ ଜାଣନ୍ତୁ')}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm hover:shadow-lg transition-all">
                {t('Post Your Listing', 'अपनी लिस्टिंग पोस्ट करें', 'ଆପଣଙ୍କର ତାଲିକା ପୋଷ୍ଟ କରନ୍ତୁ')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
