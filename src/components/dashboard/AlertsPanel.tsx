import { AlertTriangle, Calendar, Clock, FileText } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'reminder' | 'deadline' | 'info';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export function AlertsPanel() {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Vaccination Due',
      description: '156 cattle pending FMD booster dose in Khordha block',
      action: 'Schedule Now',
      priority: 'high'
    },
    {
      id: '2',
      type: 'deadline',
      title: 'Scheme Deadline',
      description: 'Gokul Mission applications close in 12 days',
      action: 'View Details',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Pregnancy Check',
      description: '23 animals due for pregnancy confirmation this week',
      action: 'View List',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      title: 'Training Program',
      description: 'AI technician training on 25 Jan at District HQ',
      action: 'Register',
      priority: 'low'
    }
  ];

  const icons = {
    warning: <AlertTriangle size={16} />,
    reminder: <Calendar size={16} />,
    deadline: <Clock size={16} />,
    info: <FileText size={16} />
  };

  const colors = {
    high: 'bg-red-50 border-red-200 text-red-700',
    medium: 'bg-amber-50 border-amber-200 text-amber-700',
    low: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  const iconColors = {
    high: 'text-red-600',
    medium: 'text-amber-600',
    low: 'text-blue-600'
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-slate-800 mb-1">Alerts & Reminders</h3>
        <p className="text-sm text-slate-600 font-odia">ସତର୍କତା ଓ ସ୍ମାରକପତ୍ର</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border ${colors[alert.priority]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 ${iconColors[alert.priority]}`}>
                {icons[alert.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 mb-1">{alert.title}</p>
                <p className="text-xs text-slate-600 mb-2">{alert.description}</p>
                {alert.action && (
                  <button className="text-xs font-medium hover:underline">
                    {alert.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm text-green-600 hover:text-green-700 transition-colors">
        View All Alerts →
      </button>
    </div>
  );
}
