import { useState } from 'react';
import { 
  Home, 
  Users, 
  Beef, 
  Syringe, 
  Dna, 
  Milk, 
  FileText, 
  Shield, 
  Store, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavItem {
  icon: React.ReactNode;
  labelEn: string;
  labelHi: string;
  labelOd: string;
  path: string;
  active?: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Sidebar({ isCollapsed, onToggle, currentPage = 'dashboard', onNavigate }: SidebarProps) {
  const [activeItem, setActiveItem] = useState(currentPage);
  const { t, language } = useLanguage();
  
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', labelOd: 'ଡ୍ୟାସବୋର୍ଡ', path: 'dashboard', active: true },
    { icon: <Users size={20} />, labelEn: 'Farmers', labelHi: 'किसान', labelOd: 'କୃଷକ', path: 'farmers' },
    { icon: <Beef size={20} />, labelEn: 'Livestock', labelHi: 'पशुधन', labelOd: 'ପଶୁଧନ', path: 'livestock' },
    { icon: <Syringe size={20} />, labelEn: 'Health & Vaccination', labelHi: 'स्वास्थ्य और टीकाकरण', labelOd: 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଟିକାକରଣ', path: 'health' },
    { icon: <Dna size={20} />, labelEn: 'Breeding & AI', labelHi: 'प्रजनन और AI', labelOd: 'ପ୍ରଜନନ ଏବଂ AI', path: 'breeding' },
    { icon: <Milk size={20} />, labelEn: 'Dairy Collection', labelHi: 'दुग्ध संग्रह', labelOd: 'ଦୁଗ୍ଧ ସଂଗ୍ରହ', path: 'dairy' },
    { icon: <FileText size={20} />, labelEn: 'Government Schemes', labelHi: 'सरकारी योजनाएं', labelOd: 'ସରକାରୀ ଯୋଜନା', path: 'schemes' },
    { icon: <Shield size={20} />, labelEn: 'Insurance', labelHi: 'बीमा', labelOd: 'ବୀମା', path: 'insurance' },
    { icon: <Store size={20} />, labelEn: 'Market', labelHi: 'बाज़ार', labelOd: 'ବଜାର', path: 'market' },
    { icon: <BookOpen size={20} />, labelEn: 'Training', labelHi: 'प्रशिक्षण', labelOd: 'ପ୍ରଶିକ୍ଷଣ', path: 'training' },
    { icon: <MessageSquare size={20} />, labelEn: 'Grievances', labelHi: 'शिकायतें', labelOd: 'ଅଭିଯୋଗ', path: 'grievances' },
    { icon: <BarChart3 size={20} />, labelEn: 'Reports & Analytics', labelHi: 'रिपोर्ट और विश्लेषण', labelOd: 'ରିପୋର୍ଟ ଏବଂ ବିଶ୍ଳେଷଣ', path: 'reports' },
    { icon: <Settings size={20} />, labelEn: 'Settings', labelHi: 'सेटिंग्स', labelOd: 'ସେଟିଂସ୍', path: 'settings' },
  ];

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const getLabel = (item: NavItem) => {
    if (language === 'en') return item.labelEn;
    if (language === 'hi') return item.labelHi;
    return item.labelOd;
  };
  
  return (
    <aside
      className={`fixed left-0 top-0 h-screen glass-card-darker transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
              <Beef className="text-white" size={24} />
            </div>
            <div>
              <h1 className={`text-slate-800 font-semibold ${language === 'od' ? 'font-odia' : ''}`}>
                {t('AHMS', 'AHMS', 'AHMS')}
              </h1>
              <p className={`text-xs text-slate-600 ${language === 'od' ? 'font-odia' : ''}`}>
                {t('Odisha', 'ओडिशा', 'ଓଡିଶା')}
              </p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mx-auto">
            <Beef className="text-white" size={24} />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md hover:shadow-lg transition-all button-press"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)]">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all button-press ${
              activeItem === item.path
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                : 'text-slate-700 hover:bg-white/50'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? getLabel(item) : ''}
          >
            <span className={activeItem === item.path ? 'scale-110' : ''}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className={`text-sm font-medium ${language === 'od' ? 'font-odia' : ''}`}>
                {getLabel(item)}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
