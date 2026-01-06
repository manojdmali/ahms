import { TrendingUp, Target, Award, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

export function BreedingAnalytics() {
  const conceptionRateData = [
    { month: 'Jul', firstAI: 68, repeatAI: 52, average: 60 },
    { month: 'Aug', firstAI: 72, repeatAI: 58, average: 65 },
    { month: 'Sep', firstAI: 75, repeatAI: 60, average: 67.5 },
    { month: 'Oct', firstAI: 78, repeatAI: 65, average: 71.5 },
    { month: 'Nov', firstAI: 76, repeatAI: 62, average: 69 },
    { month: 'Dec', firstAI: 80, repeatAI: 68, average: 74 }
  ];

  const breedDistribution = [
    { name: 'Holstein Friesian', value: 35, color: '#3b82f6' },
    { name: 'Jersey', value: 25, color: '#8b5cf6' },
    { name: 'HF Cross', value: 20, color: '#10b981' },
    { name: 'Murrah Buffalo', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 8, color: '#64748b' }
  ];

  const aiServicesData = [
    { month: 'Jul', services: 234, pregnancies: 156 },
    { month: 'Aug', services: 267, pregnancies: 189 },
    { month: 'Sep', services: 298, pregnancies: 212 },
    { month: 'Oct', services: 312, pregnancies: 234 },
    { month: 'Nov', services: 289, pregnancies: 208 },
    { month: 'Dec', services: 345, pregnancies: 267 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Target className="text-purple-600" size={20} />
            </div>
            <span className="text-xs font-mono text-purple-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +8%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Conception Rate</p>
          <p className="text-slate-900 font-mono mb-1">74%</p>
          <p className="text-xs text-slate-500">December 2024</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Award className="text-green-600" size={20} />
            </div>
            <span className="text-xs font-mono text-green-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +12%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Total AI Services</p>
          <p className="text-slate-900 font-mono mb-1">1,745</p>
          <p className="text-xs text-slate-500">Last 6 months</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <AlertCircle className="text-blue-600" size={20} />
            </div>
            <span className="text-xs font-mono text-blue-600">Active</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Pregnant Animals</p>
          <p className="text-slate-900 font-mono mb-1">1,266</p>
          <p className="text-xs text-slate-500">Currently tracked</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Target className="text-amber-600" size={20} />
            </div>
            <span className="text-xs font-mono text-amber-600">Goal: 75%</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">First AI Success</p>
          <p className="text-slate-900 font-mono mb-1">80%</p>
          <p className="text-xs text-green-600">Above target</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conception Rate Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-800 mb-1">Conception Rate Trend</h3>
            <p className="text-sm text-slate-600 font-odia">ଗର୍ଭଧାରଣ ହାର ଧାରା</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={conceptionRateData}>
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
                label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#64748b' } }}
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
                dataKey="firstAI" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="First AI"
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="repeatAI" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Repeat AI"
                dot={{ fill: '#3b82f6', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Average"
                dot={{ fill: '#10b981', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="text-sm text-purple-800">
              <strong>Insight:</strong> Conception rate improved by 8% over the past 6 months. 
              First AI success rate is consistently above 75%.
            </p>
          </div>
        </div>

        {/* Breed Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-800 mb-1">AI Services by Breed</h3>
            <p className="text-sm text-slate-600 font-odia">ପ୍ରଜାତି ଅନୁସାରେ</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={breedDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {breedDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {breedDistribution.map((breed) => (
              <div key={breed.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: breed.color }} />
                  <span className="text-slate-700">{breed.name}</span>
                </div>
                <span className="font-mono text-slate-900">{breed.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Services vs Pregnancies */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-slate-800 mb-1">AI Services vs Confirmed Pregnancies</h3>
          <p className="text-sm text-slate-600 font-odia">ସେବା ବନାମ ଗର୍ଭଧାରଣ</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aiServicesData}>
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
            <Bar dataKey="services" fill="#8b5cf6" name="AI Services" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pregnancies" fill="#10b981" name="Pregnancies" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 bg-white/50 rounded-lg border border-white/30 text-center">
            <p className="text-xs text-slate-600 mb-1">Total Services</p>
            <p className="text-slate-900 font-mono">1,745</p>
          </div>
          <div className="p-3 bg-white/50 rounded-lg border border-white/30 text-center">
            <p className="text-xs text-slate-600 mb-1">Confirmed Pregnancies</p>
            <p className="text-slate-900 font-mono">1,266</p>
          </div>
          <div className="p-3 bg-white/50 rounded-lg border border-white/30 text-center">
            <p className="text-xs text-slate-600 mb-1">Average Success Rate</p>
            <p className="text-green-600 font-mono">72.5%</p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-slate-800 mb-4">Top Performing Technicians</h4>
          <div className="space-y-3">
            {[
              { name: 'Rajesh Kumar', services: 234, rate: 82 },
              { name: 'Prakash Mohanty', services: 198, rate: 78 },
              { name: 'Suresh Patel', services: 187, rate: 75 }
            ].map((tech, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">{tech.name}</p>
                    <p className="text-xs text-slate-600">{tech.services} services</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-green-600">{tech.rate}%</p>
                  <p className="text-xs text-slate-500">Success</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h4 className="text-slate-800 mb-4">Monthly Targets</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-700">AI Services Target</span>
                <span className="font-mono text-slate-900">345/300</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 w-[115%]" />
              </div>
              <p className="text-xs text-green-600 mt-1">✓ 15% above target</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-700">Conception Rate Target</span>
                <span className="font-mono text-slate-900">74%/70%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[106%]" />
              </div>
              <p className="text-xs text-green-600 mt-1">✓ 6% above target</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-700">Pregnancy Confirmations</span>
                <span className="font-mono text-slate-900">267/250</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[107%]" />
              </div>
              <p className="text-xs text-green-600 mt-1">✓ 7% above target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
