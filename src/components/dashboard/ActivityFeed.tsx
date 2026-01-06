import { Beef, Syringe, FileCheck, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'registration' | 'vaccination' | 'scheme' | 'alert';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

export function ActivityFeed() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'registration',
      title: 'New Livestock Registered',
      description: 'Holstein Cross cow registered by Ramesh Kumar, Balipatna',
      time: '15 mins ago',
      icon: <Beef size={16} />,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'vaccination',
      title: 'Vaccination Camp Completed',
      description: '234 animals vaccinated in Khordha block for FMD',
      time: '2 hours ago',
      icon: <Syringe size={16} />,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'scheme',
      title: 'Scheme Application Approved',
      description: 'Gokul Mission subsidy approved for Suresh Patel',
      time: '4 hours ago',
      icon: <FileCheck size={16} />,
      color: 'text-amber-600'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Disease Alert',
      description: 'Lumpy skin disease reported in Puri district',
      time: '6 hours ago',
      icon: <AlertCircle size={16} />,
      color: 'text-red-600'
    },
    {
      id: '5',
      type: 'registration',
      title: 'New Farmer Registered',
      description: 'Mahendra Sahu added with 8 cattle in Bhubaneswar',
      time: '1 day ago',
      icon: <Beef size={16} />,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-slate-800 mb-1">Recent Activities</h3>
        <p className="text-sm text-slate-600 font-odia">ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
            <div className={`w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-800 mb-1">{activity.title}</p>
              <p className="text-xs text-slate-600 mb-2">{activity.description}</p>
              <p className="text-xs text-slate-500 font-mono">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm text-green-600 hover:text-green-700 transition-colors">
        View All Activities →
      </button>
    </div>
  );
}
