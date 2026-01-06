import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

const data = [
  { month: 'Jan', monthHi: 'जन', monthOd: 'ଜାନୁ', current: 45000, lastYear: 42000 },
  { month: 'Feb', monthHi: 'फर', monthOd: 'ଫେବୃ', current: 48000, lastYear: 44000 },
  { month: 'Mar', monthHi: 'मार्च', monthOd: 'ମାର୍ଚ୍ଚ', current: 52000, lastYear: 46000 },
  { month: 'Apr', monthHi: 'अप्रै', monthOd: 'ଏପ୍ରିଲ୍', current: 55000, lastYear: 50000 },
  { month: 'May', monthHi: 'मई', monthOd: 'ମଇ', current: 58000, lastYear: 52000 },
  { month: 'Jun', monthHi: 'जून', monthOd: 'ଜୁନ୍', current: 62000, lastYear: 54000 },
  { month: 'Jul', monthHi: 'जुल', monthOd: 'ଜୁଲାଇ', current: 65000, lastYear: 58000 },
  { month: 'Aug', monthHi: 'अग', monthOd: 'ଅଗଷ୍ଟ', current: 68000, lastYear: 60000 },
  { month: 'Sep', monthHi: 'सित', monthOd: 'ସେପ୍ଟେ', current: 70000, lastYear: 62000 },
  { month: 'Oct', monthHi: 'अक्टू', monthOd: 'ଅକ୍ଟୋ', current: 72000, lastYear: 64000 },
  { month: 'Nov', monthHi: 'नव', monthOd: 'ନଭେ', current: 75000, lastYear: 66000 },
  { month: 'Dec', monthHi: 'दिस', monthOd: 'ଡିସେ', current: 78000, lastYear: 68000 }
];

export function MilkProductionChart() {
  const { t, language } = useLanguage();

  const getMonth = (item: typeof data[0]) => {
    if (language === 'en') return item.month;
    if (language === 'hi') return item.monthHi;
    return item.monthOd;
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-slate-800 mb-1">{t('Monthly Milk Collection (Liters)', 'मासिक दुग्ध संग्रह (लीटर)', 'ମାସିକ ଦୁଗ୍ଧ ସଂଗ୍ରହ (ଲିଟର)')}</h3>
        <p className="text-sm text-slate-600">{t('Year over year comparison', 'वर्ष-दर-वर्ष तुलना', 'ବର୍ଷ ଅନୁସାରେ ତୁଳନା')}</p>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey={language === 'en' ? 'month' : language === 'hi' ? 'monthHi' : 'monthOd'}
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            formatter={(value: number) => value.toLocaleString()}
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
            dataKey="current" 
            stroke="#22c55e" 
            strokeWidth={3}
            name={language === 'en' ? '2024' : language === 'hi' ? '2024' : '2024'}
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="lastYear" 
            stroke="#94a3b8" 
            strokeWidth={2}
            name={language === 'en' ? '2023' : language === 'hi' ? '2023' : '2023'}
            strokeDasharray="5 5"
            dot={{ fill: '#94a3b8', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-600">{t('Current Year', 'वर्तमान वर्ष', 'ବର୍ତ୍ତମାନ ବର୍ଷ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-slate-600">{t('Last Year', 'पिछला वर्ष', 'ଗତ ବର୍ଷ')}</span>
          </div>
        </div>
        <div className="text-green-600 font-mono">↑ {t('14.7% Growth', '14.7% वृद्धि', '14.7% ବୃଦ୍ଧି')}</div>
      </div>
    </div>
  );
}
