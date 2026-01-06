import { Activity, Syringe, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

export function HealthStatistics() {
  const vaccinationData = [
    { month: 'Jul', FMD: 1200, HS: 890, BQ: 650, Rabies: 230 },
    { month: 'Aug', FMD: 1450, HS: 1020, BQ: 780, Rabies: 280 },
    { month: 'Sep', FMD: 1680, HS: 1150, BQ: 820, Rabies: 320 },
    { month: 'Oct', FMD: 1890, HS: 1280, BQ: 910, Rabies: 380 },
    { month: 'Nov', FMD: 2100, HS: 1420, BQ: 980, Rabies: 420 },
    { month: 'Dec', FMD: 2340, HS: 1560, BQ: 1050, Rabies: 470 },
  ];

  const healthTrendData = [
    { month: 'Jul', healthy: 92, treated: 6, critical: 2 },
    { month: 'Aug', healthy: 91, treated: 7, critical: 2 },
    { month: 'Sep', healthy: 93, treated: 5, critical: 2 },
    { month: 'Oct', healthy: 94, treated: 5, critical: 1 },
    { month: 'Nov', healthy: 93, treated: 6, critical: 1 },
    { month: 'Dec', healthy: 95, treated: 4, critical: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <span className="text-xs font-mono text-green-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +2.1%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Healthy Animals</p>
          <p className="text-slate-900 font-mono mb-1">42,156</p>
          <p className="text-xs text-slate-500">92.1% of total</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Syringe className="text-blue-600" size={20} />
            </div>
            <span className="text-xs font-mono text-blue-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +18%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Vaccinated (Dec)</p>
          <p className="text-slate-900 font-mono mb-1">8,234</p>
          <p className="text-xs text-slate-500">Coverage: 87%</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Activity className="text-amber-600" size={20} />
            </div>
            <span className="text-xs font-mono text-amber-600">Active</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Under Treatment</p>
          <p className="text-slate-900 font-mono mb-1">1,234</p>
          <p className="text-xs text-slate-500">2.7% of total</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <span className="text-xs font-mono text-red-600 flex items-center gap-1">
              ↓ -15%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Critical Cases</p>
          <p className="text-slate-900 font-mono mb-1">89</p>
          <p className="text-xs text-slate-500">0.2% of total</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vaccination Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-800 mb-1">Vaccination Trend (6 Months)</h3>
            <p className="text-sm text-slate-600 font-odia">ଟିକାକରଣ ଧାରା</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vaccinationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
              />
              <Legend />
              <Bar dataKey="FMD" fill="#3b82f6" name="FMD" />
              <Bar dataKey="HS" fill="#a855f7" name="HS" />
              <Bar dataKey="BQ" fill="#22c55e" name="BQ" />
              <Bar dataKey="Rabies" fill="#ef4444" name="Rabies" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-600">FMD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-slate-600">HS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-600">BQ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-600">Rabies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Status Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-800 mb-1">Health Status Distribution (%)</h3>
            <p className="text-sm text-slate-600 font-odia">ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="healthy" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Healthy"
                dot={{ fill: '#22c55e', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="treated" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Under Treatment"
                dot={{ fill: '#f59e0b', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="critical" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Critical"
                dot={{ fill: '#ef4444', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-600">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-600">Treatment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-600">Critical</span>
              </div>
            </div>
            <div className="text-green-600 font-mono">↑ 2.1% Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
}
