import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

export function LivestockPieChart() {
  const { t, language } = useLanguage();

  const data = [
    { 
      name: 'Cattle',
      nameEn: 'Cattle', 
      nameHi: 'गाय/बैल',
      nameOd: 'ଗୋରୁ',
      value: 18456, 
      color: '#22c55e' 
    },
    { 
      name: 'Buffalo',
      nameEn: 'Buffalo', 
      nameHi: 'भैंस',
      nameOd: 'ମହିଷ',
      value: 12234, 
      color: '#f59e0b' 
    },
    { 
      name: 'Goat',
      nameEn: 'Goat', 
      nameHi: 'बकरी',
      nameOd: 'ଛେଳି',
      value: 8765, 
      color: '#e16652' 
    },
    { 
      name: 'Sheep',
      nameEn: 'Sheep', 
      nameHi: 'भेड़',
      nameOd: 'ମେଣ୍ଢା',
      value: 4321, 
      color: '#3b82f6' 
    },
    { 
      name: 'Poultry',
      nameEn: 'Poultry', 
      nameHi: 'मुर्गी',
      nameOd: 'କୁକୁଡ଼ା',
      value: 2013, 
      color: '#a855f7' 
    }
  ];

  const getName = (item: typeof data[0]) => {
    if (!item) return '';
    if (language === 'en') return item.nameEn;
    if (language === 'hi') return item.nameHi;
    return item.nameOd;
  };

  // Create data with localized names for the chart
  const chartData = data.map(item => ({
    ...item,
    displayName: getName(item)
  }));

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-slate-800 mb-1">{t('Livestock Distribution', 'पशुधन वितरण', 'ପଶୁଧନ ବଣ୍ଟନ')}</h3>
        <p className="text-sm text-slate-600">{t('By animal type', 'पशु प्रकार के अनुसार', 'ପଶୁ ପ୍ରକାର ଅନୁଯାୟୀ')}</p>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ displayName, percent }) => `${displayName} ${(percent * 100).toFixed(0)}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => value.toLocaleString()}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div key={item.nameEn} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-slate-700">{getName(item)}: </span>
            <span className="text-sm font-mono text-slate-900">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
