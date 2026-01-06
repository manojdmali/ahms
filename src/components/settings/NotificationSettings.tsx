import { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Mail, MessageSquare, Smartphone, Save } from 'lucide-react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      livestock: true,
      health: true,
      breeding: true,
      dairy: true,
      schemes: false,
      training: true,
      reports: false,
      system: true
    },
    sms: {
      livestock: false,
      health: true,
      breeding: false,
      dairy: true,
      schemes: false,
      training: false,
      reports: false,
      system: true
    },
    push: {
      livestock: true,
      health: true,
      breeding: true,
      dairy: true,
      schemes: true,
      training: true,
      reports: true,
      system: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Notification preferences updated successfully!');
    }, 1500);
  };

  const categories = [
    { key: 'livestock', label: 'Livestock Registration', icon: '🐄' },
    { key: 'health', label: 'Health & Vaccination', icon: '💉' },
    { key: 'breeding', label: 'Breeding & AI Services', icon: '🧬' },
    { key: 'dairy', label: 'Dairy Collection', icon: '🥛' },
    { key: 'schemes', label: 'Government Schemes', icon: '🏛️' },
    { key: 'training', label: 'Training Programs', icon: '📚' },
    { key: 'reports', label: 'Reports & Analytics', icon: '📊' },
    { key: 'system', label: 'System Updates', icon: '⚙️' }
  ];

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="text-blue-600" size={20} />
            <h4 className="text-slate-800">Email Notifications</h4>
          </div>
          <button
            onClick={() => {
              const allEnabled = Object.values(notifications.email).every(v => v);
              const newState = { ...notifications };
              Object.keys(newState.email).forEach(key => {
                newState.email[key as keyof typeof newState.email] = !allEnabled;
              });
              setNotifications(newState);
            }}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Toggle All
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Receive email notifications at: <strong>rajesh.kumar@odisha.gov.in</strong>
        </p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.key}
              className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm text-slate-900">{cat.label}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.email[cat.key as keyof typeof notifications.email]}
                onChange={(e) => {
                  setNotifications({
                    ...notifications,
                    email: {
                      ...notifications.email,
                      [cat.key]: e.target.checked
                    }
                  });
                }}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-green-600" size={20} />
            <h4 className="text-slate-800">SMS Notifications</h4>
          </div>
          <button
            onClick={() => {
              const allEnabled = Object.values(notifications.sms).every(v => v);
              const newState = { ...notifications };
              Object.keys(newState.sms).forEach(key => {
                newState.sms[key as keyof typeof newState.sms] = !allEnabled;
              });
              setNotifications(newState);
            }}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Toggle All
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Receive SMS notifications at: <strong>+91 9876543210</strong>
        </p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.key}
              className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm text-slate-900">{cat.label}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms[cat.key as keyof typeof notifications.sms]}
                onChange={(e) => {
                  setNotifications({
                    ...notifications,
                    sms: {
                      ...notifications.sms,
                      [cat.key]: e.target.checked
                    }
                  });
                }}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="text-purple-600" size={20} />
            <h4 className="text-slate-800">Push Notifications</h4>
          </div>
          <button
            onClick={() => {
              const allEnabled = Object.values(notifications.push).every(v => v);
              const newState = { ...notifications };
              Object.keys(newState.push).forEach(key => {
                newState.push[key as keyof typeof newState.push] = !allEnabled;
              });
              setNotifications(newState);
            }}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Toggle All
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Receive instant push notifications on your browser and mobile devices
        </p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.key}
              className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm text-slate-900">{cat.label}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.push[cat.key as keyof typeof notifications.push]}
                onChange={(e) => {
                  setNotifications({
                    ...notifications,
                    push: {
                      ...notifications.push,
                      [cat.key]: e.target.checked
                    }
                  });
                }}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Notification Schedule */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Bell size={20} />
          Quiet Hours
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          Set time periods when you don't want to receive notifications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              From
            </label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              To
            </label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Enable Quiet Hours</p>
                <p className="text-xs text-slate-600">Mute all notifications during specified hours</p>
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
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Notifications'}
        </button>
      </div>
    </div>
  );
}
