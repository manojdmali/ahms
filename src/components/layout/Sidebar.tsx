import { useEffect, useState } from 'react';
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
  ChevronRight,
  ChevronDown,
  Map,
  AlertTriangle,
  ArrowRightLeft,
  ClipboardList,
  FlaskConical,
  Sparkles,
  Warehouse,
  Barcode,
  Bot,
  Camera,
  CloudOff,
  Package,
  Route,
  Truck
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_MENU_ACCESS } from '../../data/mockUsers';

interface NavItem {
  icon: React.ReactNode;
  labelEn: string;
  labelHi: string;
  labelOd: string;
  path: string;
  active?: boolean;
  children?: NavItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Sidebar({ isCollapsed, onToggle, currentPage = 'dashboard', onNavigate }: SidebarProps) {
  const [activeItem, setActiveItem] = useState(currentPage);
  const [expandedSubmenus, setExpandedSubmenus] = useState<string[]>([]);
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const allowedPaths = user ? ROLE_MENU_ACCESS[user.role] : [];
  const navigableParentPaths = ['semen-dashboard', 'cdvo-semen', 'lac-medicine-home', 'mvu-command','bvo-mvu-inventory','mvu-team-home'];

  useEffect(() => {
    setActiveItem(currentPage);
  }, [currentPage]);

  const toggleSubmenu = (path: string) => {
    setExpandedSubmenus(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };
  
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', labelOd: 'ଡ୍ୟାସବୋର୍ଡ', path: 'dashboard', active: true },
    {
      icon: <Map size={20} />,
      labelEn: 'Semen Dashboard',
      labelHi: 'Semen Dashboard',
      labelOd: 'Semen Dashboard',
      path: 'semen-dashboard',
      children: [
        { icon: <Warehouse size={20} />, labelEn: 'District Drilldown', labelHi: 'District Drilldown', labelOd: 'District Drilldown', path: 'semen-drilldown' },
        { icon: <Syringe size={20} />, labelEn: 'District-wise allocation', labelHi: 'District-wise allocation', labelOd: 'District-wise allocation', path: 'semen-allocation' },
        { icon: <ArrowRightLeft size={20} />, labelEn: 'Stock Redistribution', labelHi: 'Stock Redistribution', labelOd: 'Stock Redistribution', path: 'semen-redistribution' },
        { icon: <ClipboardList size={20} />, labelEn: 'Restocking Requests', labelHi: 'Restocking Requests', labelOd: 'Restocking Requests', path: 'semen-requests' },
        { icon: <BarChart3 size={20} />, labelEn: 'Semen Reports', labelHi: 'Semen Reports', labelOd: 'Semen Reports', path: 'semen-reports' },
      ]
    },
    { icon: <Sparkles size={20} />, labelEn: 'AI Forecasting', labelHi: 'AI Forecasting', labelOd: 'AI Forecasting', path: 'semen-forecasting' },
    {
      icon: <FlaskConical size={20} />,
      labelEn: 'CDVO Semen',
      labelHi: 'CDVO Semen',
      labelOd: 'CDVO Semen',
      path: 'cdvo-semen',
      children: [
        // { icon: <Home size={20} />, labelEn: 'District Dashboard', labelHi: 'District Dashboard', labelOd: 'District Dashboard', path: 'cdvo-semen-dashboard' },
        { icon: <Syringe size={20} />, labelEn: 'Block Allocation', labelHi: 'Block Allocation', labelOd: 'Block Allocation', path: 'cdvo-semen-allocation' },
        { icon: <ClipboardList size={20} />, labelEn: 'Request Approval', labelHi: 'Request Approval', labelOd: 'Request Approval', path: 'cdvo-semen-approval' },
        { icon: <Package size={20} />, labelEn: 'Restocking Request', labelHi: 'Restocking Request', labelOd: 'Restocking Request', path: 'cdvo-semen-restocking' },
        { icon: <BarChart3 size={20} />, labelEn: 'District Reports', labelHi: 'District Reports', labelOd: 'District Reports', path: 'cdvo-semen-reports' },
      ],
    },
    { icon: <FlaskConical size={20} />, labelEn: 'SDVO Semen', labelHi: 'SDVO Semen', labelOd: 'SDVO Semen', path: 'sdvo-semen' },
    {
      icon: <Package size={20} />,
      labelEn: 'LAC Medicine Home',
      labelHi: 'LAC Medicine Home',
      labelOd: 'LAC Medicine Home',
      path: 'lac-medicine-home',
      children: [
        { icon: <Syringe size={20} />, labelEn: 'Log Medicine', labelHi: 'Log Medicine', labelOd: 'Log Medicine', path: 'lac-medicine-log' },
        { icon: <Users size={20} />, labelEn: 'Farmer Profile', labelHi: 'Farmer Profile', labelOd: 'Farmer Profile', path: 'lac-medicine-farmer' },
        { icon: <Barcode size={20} />, labelEn: 'Barcode Receipt', labelHi: 'Barcode Receipt', labelOd: 'Barcode Receipt', path: 'lac-medicine-barcode' },
        { icon: <ClipboardList size={20} />, labelEn: 'Raise Request', labelHi: 'Raise Request', labelOd: 'Raise Request', path: 'lac-medicine-request' },
        { icon: <Warehouse size={20} />, labelEn: 'Inventory', labelHi: 'Inventory', labelOd: 'Inventory', path: 'lac-medicine-inventory' },
        { icon: <CloudOff size={20} />, labelEn: 'Offline Mode', labelHi: 'Offline Mode', labelOd: 'Offline Mode', path: 'lac-medicine-offline' },
      ],
    },
    { icon: <Package size={20} />, labelEn: 'Farmer Medicine Login', labelHi: 'Farmer Medicine Login', labelOd: 'Farmer Medicine Login', path: 'farmer-medicine-login' },
    { icon: <Syringe size={20} />, labelEn: 'Medicine Service', labelHi: 'Medicine Service', labelOd: 'Medicine Service', path: 'farmer-medicine-request' },
    { icon: <ClipboardList size={20} />, labelEn: 'Medicine History', labelHi: 'Medicine History', labelOd: 'Medicine History', path: 'farmer-medicine-history' },
    { icon: <Bot size={20} />, labelEn: 'Medicine Chatbot', labelHi: 'Medicine Chatbot', labelOd: 'Medicine Chatbot', path: 'farmer-medicine-chatbot' },
    { icon: <AlertTriangle size={20} />, labelEn: 'BVO Medicine Queue', labelHi: 'BVO Medicine Queue', labelOd: 'BVO Medicine Queue', path: 'bvo-medicine-queue' },
    {
      icon: <Truck size={20} />,
      labelEn: 'MVU Command',
      labelHi: 'MVU Command',
      labelOd: 'MVU Command',
      path: 'mvu-command',
      children: [
        { icon: <ClipboardList size={20} />, labelEn: 'Compliance Report', labelHi: 'Compliance Report', labelOd: 'Compliance Report', path: 'mvu-compliance' },
        { icon: <Route size={20} />, labelEn: 'MVU Fleet Tracking', labelHi: 'MVU Fleet Tracking', labelOd: 'MVU Fleet Tracking', path: 'mvu-fleet' },
        { icon: <Users size={20} />, labelEn: 'Manpower', labelHi: 'Manpower', labelOd: 'Manpower', path: 'mvu-manpower' },
        { icon: <BarChart3 size={20} />, labelEn: 'Targets', labelHi: 'Targets', labelOd: 'Targets', path: 'mvu-targets' },
      ],
    },
    { icon: <Truck size={20} />, labelEn: 'CDVO MVU', labelHi: 'CDVO MVU', labelOd: 'CDVO MVU', path: 'cdvo-mvu' },

    {
      icon: <Package size={20} />,
      labelEn: 'BVO MVU Inventory',
      labelHi: 'BVO MVU Inventory',
      labelOd: 'BVO MVU Inventory',
      path: 'bvo-mvu-inventory',
      children: [
        { icon: <Route size={20} />, labelEn: 'BVO Tour Plan', labelHi: 'BVO Tour Plan', labelOd: 'BVO Tour Plan', path: 'bvo-mvu-plan' },
        { icon: <Package size={20} />, labelEn: 'Medicine Inventory', labelHi: 'Medicine Inventory', labelOd: 'Medicine Inventory', path: 'lac-medicine-inventory' },
        { icon: <ClipboardList size={20} />, labelEn: 'Assignments', labelHi: 'Assignments', labelOd: 'Assignments', path: 'bvo-mvu-assignment' },
      ],
    },
    {
      icon: <Truck size={20} />,
      labelEn: 'MVU Team Home',
      labelHi: 'MVU Team Home',
      labelOd: 'MVU Team Home',
      path: 'mvu-team-home',
      children: [
        { icon: <Camera size={20} />, labelEn: 'Visit Log', labelHi: 'Visit Log', labelOd: 'Visit Log', path: 'mvu-team-visit' },
        { icon: <ClipboardList size={20} />, labelEn: 'Daily Form', labelHi: 'Daily Form', labelOd: 'Daily Form', path: 'mvu-team-daily' },
        { icon: <Package size={20} />, labelEn: 'Stock Update', labelHi: 'Stock Update', labelOd: 'Stock Update', path: 'mvu-team-stock' },
      ],
    },
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

  useEffect(() => {
    const activeParent = navItems.find((item) => {
      const visibleChildren = item.children?.filter((child) => allowedPaths.includes(child.path)) ?? [];
      const isChildActive = visibleChildren.some((child) => child.path === currentPage);
      const shouldExpandActiveParent = item.path === currentPage && !navigableParentPaths.includes(item.path);
      return visibleChildren.length > 0 && (shouldExpandActiveParent || isChildActive);
    });
    if (activeParent) {
      setExpandedSubmenus((prev) => (prev.includes(activeParent.path) ? prev : [...prev, activeParent.path]));
    }
  }, [currentPage, user?.role]);

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
                {t('ARD', 'एआरडी', 'ARD')}
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
        {navItems.filter((item) => allowedPaths.includes(item.path)).map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const filteredChildren = hasChildren ? item.children.filter((child) => allowedPaths.includes(child.path)) : [];
          const hasVisibleChildren = filteredChildren.length > 0;
          const isExpanded = expandedSubmenus.includes(item.path);
          const isChildActive = filteredChildren.some((child) => child.path === activeItem);
          const isParentActive = activeItem === item.path || isChildActive;

          return (
            <div key={item.path}>
              <button
                onClick={() => {
                  if (hasVisibleChildren) {
                    if (navigableParentPaths.includes(item.path)) {
                      handleNavClick(item.path);
                      if (!isCollapsed) {
                        toggleSubmenu(item.path);
                      }
                      return;
                    }
                    if (isCollapsed) {
                      handleNavClick(filteredChildren[0].path);
                      return;
                    }
                    toggleSubmenu(item.path);
                  } else {
                    handleNavClick(item.path);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all button-press ${
                  isParentActive
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-white/50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? getLabel(item) : ''}
              >
                <span className={isParentActive ? 'scale-110' : ''}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className={`text-sm font-medium flex-1 text-left ${language === 'od' ? 'font-odia' : ''}`}>
                      {getLabel(item)}
                    </span>
                    {hasVisibleChildren && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    )}
                  </>
                )}
              </button>
              {hasVisibleChildren && isExpanded && !isCollapsed && (
                <div className="pl-4 space-y-1 mt-1">
                  {filteredChildren.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavClick(child.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm button-press ${
                        activeItem === child.path
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-slate-600 hover:bg-white/30'
                      }`}
                      title={getLabel(child)}
                    >
                      <span className={activeItem === child.path ? 'scale-105' : ''}>
                        {child.icon}
                      </span>
                      <span className={language === 'od' ? 'font-odia' : ''}>
                        {getLabel(child)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
