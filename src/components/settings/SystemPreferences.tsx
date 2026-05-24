import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Moon,
  Sun,
  Bell,
  Monitor,
  Calendar,
  DollarSign,
  Save
} from 'lucide-react';

export function SystemPreferences() {
  const [preferences, setPreferences] = useState({
    language: 'english',
    theme: 'system',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: '24h',
    currency: 'INR',
    numberFormat: 'indian',
    timezone: 'Asia/Kolkata',
    dataRefresh: 'auto'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Preferences updated successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Globe size={20} />
          Language & Regional Settings
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Interface Language
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, language: 'english' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.language === 'english'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900">English</p>
                <p className="text-xs text-slate-600 mt-1">Default language</p>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, language: 'odia' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.language === 'odia'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900 font-odia">ଓଡ଼ିଆ</p>
                <p className="text-xs text-slate-600 mt-1">Regional language</p>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, language: 'bilingual' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.language === 'bilingual'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900">Both</p>
                <p className="text-xs text-slate-600 mt-1">English + Odia</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Monitor size={20} />
          Appearance & Theme
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.theme === 'light'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Sun size={24} className="text-amber-500 mb-2 mx-auto" />
                <p className="font-medium text-slate-900">Light</p>
                <p className="text-xs text-slate-600 mt-1">Bright interface</p>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.theme === 'dark'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Moon size={24} className="text-indigo-500 mb-2 mx-auto" />
                <p className="font-medium text-slate-900">Dark</p>
                <p className="text-xs text-slate-600 mt-1">Easy on eyes</p>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, theme: 'system' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  preferences.theme === 'system'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Monitor size={24} className="text-blue-500 mb-2 mx-auto" />
                <p className="font-medium text-slate-900">System</p>
                <p className="text-xs text-slate-600 mt-1">Match device</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Date & Time Format */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Date & Time Format
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date Format
            </label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="DD-MM-YYYY">DD-MM-YYYY (02-12-2024)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/02/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-02)</option>
              <option value="DD MMM YYYY">DD MMM YYYY (02 Dec 2024)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Time Format
            </label>
            <select
              value={preferences.timeFormat}
              onChange={(e) => setPreferences({ ...preferences, timeFormat: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="24h">24-Hour (14:30)</option>
              <option value="12h">12-Hour (2:30 PM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Number & Currency Format */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <DollarSign size={20} />
          Number & Currency Format
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Currency
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number Format
            </label>
            <select
              value={preferences.numberFormat}
              onChange={(e) => setPreferences({ ...preferences, numberFormat: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="indian">Indian (1,23,45,678)</option>
              <option value="international">International (12,345,678)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-900">
                <strong>Preview:</strong> {preferences.currency === 'INR' ? '₹' : '$'}
                {preferences.numberFormat === 'indian' ? '1,23,45,678.50' : '12,345,678.50'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Refresh Settings */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Bell size={20} />
          Data Refresh Settings
        </h4>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Auto Refresh Dashboard
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
              <input
                type="radio"
                name="dataRefresh"
                value="auto"
                checked={preferences.dataRefresh === 'auto'}
                onChange={(e) => setPreferences({ ...preferences, dataRefresh: e.target.value })}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Auto (Every 5 minutes)</p>
                <p className="text-xs text-slate-600">Recommended for real-time monitoring</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
              <input
                type="radio"
                name="dataRefresh"
                value="manual"
                checked={preferences.dataRefresh === 'manual'}
                onChange={(e) => setPreferences({ ...preferences, dataRefresh: e.target.value })}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Manual Only</p>
                <p className="text-xs text-slate-600">Refresh data manually when needed</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
              <input
                type="radio"
                name="dataRefresh"
                value="custom"
                checked={preferences.dataRefresh === 'custom'}
                onChange={(e) => setPreferences({ ...preferences, dataRefresh: e.target.value })}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Custom Interval</p>
                <p className="text-xs text-slate-600">Set your own refresh interval</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
