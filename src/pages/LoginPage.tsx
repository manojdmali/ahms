import { useState } from 'react';
import { Beef, LogIn, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_USERS } from '../data/mockUsers';

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const selectedUser = MOCK_USERS.find((u) => u.id === selectedUserId);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedUserId) { setError('Please select a role to login.'); return; }
    const ok = login(selectedUserId, password);
    if (!ok) setError('Invalid credentials. Check the hint below.');
  };

  const handleRoleSelect = (userId: string) => {
    setSelectedUserId(userId);
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Beef className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">AHMS Odisha</h1>
          <p className="text-slate-500 text-sm mt-1">Animal Husbandry Management System</p>
        </div>

        <div className="glass-card-darker rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-green-600" />
            <h2 className="text-lg font-semibold text-slate-800">Sign In</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Role</label>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_USERS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleRoleSelect(u.id)}
                    className={`text-left px-3 py-2.5 rounded-xl border transition-all text-xs ${
                      selectedUserId === u.id
                        ? 'bg-green-600 text-white border-green-600 shadow-md'
                        : 'bg-white/60 text-slate-700 border-white/40 hover:bg-white/80'
                    }`}
                  >
                    <div className="font-semibold">{u.roleLabel}</div>
                    <div className={`truncate mt-0.5 ${selectedUserId === u.id ? 'text-green-100' : 'text-slate-500'}`}>
                      {u.designation}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected User Info */}
            {selectedUser && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
                <p className="font-medium text-green-800">{selectedUser.name}</p>
                <p className="text-green-600 text-xs mt-0.5">{selectedUser.district ? `${selectedUser.district} — ` : ''}{selectedUser.designation}</p>
                <p className="text-green-500 text-xs mt-1">Hint: password is <span className="font-mono font-semibold">{selectedUser.password}</span></p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all button-press"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Department of Animal Husbandry & Veterinary Services, Odisha
        </p>
      </div>
    </div>
  );
}
