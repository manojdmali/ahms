import { Plus, Calendar, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  titleOdia: string;
  description: string;
  buttonText: string;
  color: string;
  onClick?: () => void;
}

function ActionCard({ icon, title, titleOdia, description, buttonText, color, onClick }: ActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 card-hover"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 font-odia mb-2">{titleOdia}</p>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <button 
        onClick={onClick}
        className="w-full py-2.5 px-4 bg-white/70 hover:bg-white border border-white/30 rounded-xl text-sm text-slate-800 transition-all button-press"
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

export function QuickActions() {
  const actions = [
    {
      icon: <Plus className="text-white" size={24} />,
      title: 'Register New Livestock',
      titleOdia: 'ନୂଆ ପଶୁ ପଞ୍ଜୀକରଣ',
      description: 'Add new animal to the system with complete details',
      buttonText: '+ Add Animal',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Calendar className="text-white" size={24} />,
      title: 'Schedule Vaccination',
      titleOdia: 'ଟିକାକରଣ କାର୍ଯ୍ୟକ୍ରମ',
      description: 'Book vaccination camp for your block',
      buttonText: 'Book Camp',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FileText className="text-white" size={24} />,
      title: 'Apply for Scheme',
      titleOdia: 'ଯୋଜନା ପାଇଁ ଆବେଦନ',
      description: 'Browse and apply for government schemes',
      buttonText: 'Browse Schemes',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <ActionCard key={index} {...action} />
      ))}
    </div>
  );
}
