import { Search, Bell, Globe, User } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  isCollapsed: boolean;
}

export function Header({ isCollapsed }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [notifications] = useState(3);

  return (
    <header
      className={`fixed top-0 right-0 h-16 glass-card-darker border-b border-white/20 z-30 transition-all duration-300 ${
        isCollapsed ? 'left-20' : 'left-72'
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search farmers, livestock, tag ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Language Toggle */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all">
              <Globe size={16} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-800">
                {language === 'en' && 'English'}
                {language === 'hi' && 'हिंदी'}
                {language === 'od' && 'ଓଡ଼ିଆ'}
              </span>
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-all first:rounded-t-xl ${
                  language === 'en' ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-all ${
                  language === 'hi' ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-700'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('od')}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-all last:rounded-b-xl font-odia ${
                  language === 'od' ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-700'
                }`}
              >
                ଓଡ଼ିଆ
              </button>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all button-press">
            <Bell size={20} className="text-slate-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-mono">
                {notifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-800">Dr. Sanjay Mohanty</p>
              <p className="text-xs text-slate-500">District Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
