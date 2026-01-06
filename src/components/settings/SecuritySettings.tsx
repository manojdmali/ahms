import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Key,
  Shield,
  Smartphone,
  Clock,
  LogOut,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1500);
  };

  const activeSessions = [
    {
      id: 1,
      device: 'Windows PC',
      browser: 'Chrome 120',
      location: 'Bhubaneswar, Odisha',
      ipAddress: '49.207.xxx.xxx',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Android Mobile',
      browser: 'Chrome Mobile',
      location: 'Bhubaneswar, Odisha',
      ipAddress: '49.207.xxx.xxx',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: 3,
      device: 'iPad',
      browser: 'Safari',
      location: 'Cuttack, Odisha',
      ipAddress: '103.114.xxx.xxx',
      lastActive: '1 day ago',
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Lock size={20} />
          Change Password
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-900 font-medium mb-2">Password Requirements:</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-600" />
                Minimum 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-600" />
                At least one uppercase letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-600" />
                At least one number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-600" />
                At least one special character
              </li>
            </ul>
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Key size={18} />
            {isSaving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Shield size={20} />
          Two-Factor Authentication (2FA)
        </h4>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-slate-700 mb-1">
              Add an extra layer of security to your account
            </p>
            <p className="text-xs text-slate-600">
              Require a verification code in addition to your password when signing in
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-start gap-3">
                <Smartphone className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">2FA Enabled</p>
                  <p className="text-xs text-green-700">
                    Verification codes will be sent to: <strong>+91 9876543210</strong>
                  </p>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
              <Key size={16} />
              Generate Backup Codes
            </button>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-slate-800 flex items-center gap-2">
            <Clock size={20} />
            Active Sessions
          </h4>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
            <LogOut size={16} />
            End All Sessions
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Manage and monitor devices that are currently logged into your account
        </p>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-slate-900">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">•</span>
                      {session.browser}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">•</span>
                      {session.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">•</span>
                      IP: {session.ipAddress}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">•</span>
                      Last active: {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all text-xs flex items-center gap-1">
                    <LogOut size={14} />
                    End
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Alerts */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          Security Alerts
        </h4>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">Email me when a new device signs in</p>
              <p className="text-xs text-slate-600">Get notified about unrecognized login attempts</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">Alert me for unusual account activity</p>
              <p className="text-xs text-slate-600">Detect suspicious actions and notify immediately</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">Weekly security summary</p>
              <p className="text-xs text-slate-600">Receive weekly reports about account security</p>
            </div>
          </label>
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
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Save size={18} />
          Save Security Settings
        </button>
      </div>
    </div>
  );
}
