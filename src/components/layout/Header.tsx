import { Search, Bell, Globe, User, LogOut, MapPin, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useDistrict, ALL_DISTRICTS } from '../../contexts/DistrictContext';

interface HeaderProps {
  isCollapsed: boolean;
}

const WEB_ROLES = ['directorate', 'cdvo', 'sdvo', 'bvo'];

export function Header({ isCollapsed }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const { selectedDistrict, setSelectedDistrict } = useDistrict();
  const [notifications] = useState(3);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const showDistrictFilter = user && WEB_ROLES.includes(user.role);

  const filtered = ALL_DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDistrictOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const isAll = selectedDistrict.id === 'all';

  return (
    <header
      className={`fixed top-0 right-0 h-16 glass-card-darker border-b border-white/20 z-30 transition-all duration-300 ${
        isCollapsed ? 'left-20' : 'left-72'
      }`}
    >
      <div className="flex items-center justify-between h-full px-6 gap-4">

        {/* Search Bar */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search farmers, livestock, tag ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        {/* District Filter — only for web roles */}
        {showDistrictFilter && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => { setDistrictOpen(v => !v); setSearch(''); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm font-medium min-w-[160px] ${
                isAll
                  ? 'bg-white/50 border-white/30 text-slate-700 hover:bg-white'
                  : 'bg-green-600 border-green-600 text-white shadow-md'
              }`}
            >
              <MapPin size={14} className={isAll ? 'text-slate-500' : 'text-white'} />
              <span className="flex-1 text-left truncate">{selectedDistrict.name}</span>
              {!isAll && (
                <span
                  onClick={(e) => { e.stopPropagation(); setSelectedDistrict(ALL_DISTRICTS[0]); }}
                  className="ml-1 hover:bg-green-700 rounded p-0.5 cursor-pointer"
                >
                  <X size={12} />
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${districtOpen ? 'rotate-180' : ''}`} />
            </button>

            {districtOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                {/* Search inside dropdown */}
                <div className="p-2 border-b border-slate-100">
                  <div className="relative">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search district..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* District list */}
                <div className="max-h-64 overflow-y-auto">
                  {filtered.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { setSelectedDistrict(d); setDistrictOpen(false); setSearch(''); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                        selectedDistrict.id === d.id
                          ? 'bg-green-50 text-green-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d.id === 'all' ? (
                        <span className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      )}
                      {d.name}
                      {selectedDistrict.id === d.id && (
                        <span className="ml-auto text-green-600 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">No districts found</p>
                  )}
                </div>

                {/* Footer count */}
                <div className="px-3 py-2 border-t border-slate-100 bg-slate-50">
                  <p className="text-xs text-slate-500">{ALL_DISTRICTS.length - 1} districts · Odisha</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Language Toggle */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all">
              <Globe size={15} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-800">
                {language === 'en' && 'EN'}
                {language === 'hi' && 'HI'}
                {language === 'od' && 'OD'}
              </span>
              <ChevronDown size={13} className="text-slate-500" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'od', label: 'ଓଡ଼ିଆ' },
              ].map((lang, i) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'en' | 'hi' | 'od')}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-all ${
                    i === 0 ? 'rounded-t-xl' : i === 2 ? 'rounded-b-xl' : ''
                  } ${language === lang.code ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-700'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all button-press">
            <Bell size={18} className="text-slate-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-mono">
                {notifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[100px]">{user?.name ?? 'Guest'}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{user?.roleLabel ?? ''}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-white/50 border border-white/30 hover:bg-red-50 hover:border-red-200 transition-all button-press"
            title="Logout"
          >
            <LogOut size={16} className="text-slate-500 hover:text-red-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
