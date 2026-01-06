import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Edit, 
  Printer, 
  MapPin, 
  Phone, 
  Calendar,
  Syringe,
  Activity,
  Dna,
  Milk,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AnimalProfileProps {
  onBack: () => void;
}

export function AnimalProfile({ onBack }: AnimalProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'breeding' | 'production'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', labelOdia: 'ସାମଗ୍ରିକ' },
    { id: 'health', label: 'Health Records', labelOdia: 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ' },
    { id: 'breeding', label: 'Breeding', labelOdia: 'ପ୍ରଜନନ' },
    { id: 'production', label: 'Production', labelOdia: 'ଉତ୍ପାଦନ' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h2 className="text-slate-900 mb-1">Animal Profile</h2>
            <p className="text-sm text-slate-600 font-odia">ପଶୁ ପ୍ରୋଫାଇଲ୍</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Edit size={18} />
              <span className="text-sm">Edit</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Printer size={18} />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Animal Info Header */}
        <div className="flex gap-6">
          {/* Photo */}
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-24 h-24 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-slate-900">Holstein Friesian Cross</h3>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-1">
                    <Shield size={14} />
                    Insured
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-mono mb-2">🏷️ Tag: OD-KHD-2024-001234</p>
                <p className="text-sm text-slate-600">♀ Female • 3 Years 4 Months</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} />
                <div>
                  <p className="text-slate-900">Ramesh Kumar</p>
                  <p className="text-xs">Balipatna, Khordha</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} />
                <div>
                  <p className="text-slate-900">9876543210</p>
                  <p className="text-xs">Farmer Contact</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} />
                <div>
                  <p className="text-slate-900">Registered</p>
                  <p className="text-xs">15 Jan 2024</p>
                </div>
              </div>
            </div>

            {/* Health Score */}
            <div className="bg-white/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Health Score</span>
                <span className="text-sm font-mono text-green-600">85% Excellent</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[85%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
            <Syringe className="text-white" size={24} />
          </div>
          <p className="text-sm text-slate-600 mb-1">Vaccinations</p>
          <p className="text-slate-900 font-mono mb-1">8 Completed</p>
          <p className="text-xs text-slate-500">Last: 15 days ago</p>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
            <Activity className="text-white" size={24} />
          </div>
          <p className="text-sm text-slate-600 mb-1">Health Checkups</p>
          <p className="text-slate-900 font-mono mb-1">12 Records</p>
          <p className="text-xs text-slate-500">Last: 5 days ago</p>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
            <Dna className="text-white" size={24} />
          </div>
          <p className="text-sm text-slate-600 mb-1">AI Services</p>
          <p className="text-slate-900 font-mono mb-1">3 Times</p>
          <p className="text-xs text-slate-500">Last: 45 days ago</p>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-3">
            <Milk className="text-white" size={24} />
          </div>
          <p className="text-sm text-slate-600 mb-1">Avg. Daily Milk</p>
          <p className="text-slate-900 font-mono mb-1">14 Liters</p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp size={12} />
            +8% this month
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card-darker rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white/70 text-slate-900 border-b-2 border-green-600'
                  : 'text-slate-600 hover:bg-white/30'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-xs font-odia mt-0.5">{tab.labelOdia}</div>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-slate-800 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Species:</span>
                      <span className="text-slate-900">Cattle</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Breed:</span>
                      <span className="text-slate-900">Holstein Friesian Cross</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Color:</span>
                      <span className="text-slate-900">White with black patches</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Weight:</span>
                      <span className="text-slate-900 font-mono">425 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Height:</span>
                      <span className="text-slate-900 font-mono">135 cm</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-slate-800 mb-3">Production Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Purpose:</span>
                      <span className="text-slate-900">Dairy</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Lactation:</span>
                      <span className="text-slate-900">2nd Lactation</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Calving Date:</span>
                      <span className="text-slate-900">12 Oct 2024</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Peak Milk:</span>
                      <span className="text-slate-900 font-mono">18 L/day</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">Current Milk:</span>
                      <span className="text-slate-900 font-mono">14 L/day</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-slate-800 mb-4">Recent Timeline</h4>
                <div className="space-y-4">
                  <TimelineItem
                    icon={<Milk size={16} className="text-amber-600" />}
                    title="Milk Yield Recorded"
                    description="Morning: 8L, Evening: 6L (Total: 14L)"
                    time="Today, 6:30 PM"
                    status="success"
                  />
                  <TimelineItem
                    icon={<Syringe size={16} className="text-blue-600" />}
                    title="Deworming Completed"
                    description="Administered by Dr. Mohanty"
                    time="3 days ago"
                    status="success"
                  />
                  <TimelineItem
                    icon={<Syringe size={16} className="text-blue-600" />}
                    title="FMD Vaccination"
                    description="Booster dose administered"
                    time="15 days ago"
                    status="success"
                  />
                  <TimelineItem
                    icon={<Dna size={16} className="text-purple-600" />}
                    title="AI Performed"
                    description="Pregnancy check due in 30 days"
                    time="45 days ago"
                    status="pending"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="text-green-600" size={32} />
              </div>
              <p className="text-slate-600">Health records content goes here</p>
            </div>
          )}

          {/* Other tabs similarly */}
        </div>
      </div>
    </motion.div>
  );
}

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'pending' | 'warning';
}

function TimelineItem({ icon, title, description, time, status }: TimelineItemProps) {
  const statusColors = {
    success: 'bg-green-100 border-green-300',
    pending: 'bg-amber-100 border-amber-300',
    warning: 'bg-red-100 border-red-300'
  };

  return (
    <div className="flex gap-4 pb-4 border-b border-slate-200 last:border-0">
      <div className={`w-10 h-10 rounded-xl border ${statusColors[status]} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-900 mb-1">{title}</p>
        <p className="text-xs text-slate-600 mb-2">{description}</p>
        <p className="text-xs text-slate-500 font-mono">{time}</p>
      </div>
      {status === 'success' && (
        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
      )}
      {status === 'pending' && (
        <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
      )}
    </div>
  );
}
