import { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface PregnancyRecord {
  id: string;
  animalTag: string;
  breed: string;
  aiDate: Date;
  pregnancyConfirmed: boolean;
  confirmationDate?: Date;
  expectedCalvingDate: Date;
  daysPregnant: number;
  trimester: 1 | 2 | 3;
  status: 'confirmed' | 'pending-check' | 'not-confirmed';
}

export function PregnancyTracker() {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'due-soon'>('all');

  // Mock pregnancy records
  const pregnancyRecords: PregnancyRecord[] = [
    {
      id: '1',
      animalTag: 'OD-KHD-001234',
      breed: 'HF Cross',
      aiDate: new Date(2024, 8, 15), // Sept 15, 2024
      pregnancyConfirmed: true,
      confirmationDate: new Date(2024, 10, 1), // Nov 1, 2024
      expectedCalvingDate: new Date(2025, 5, 22), // June 22, 2025
      daysPregnant: 138,
      trimester: 2,
      status: 'confirmed'
    },
    {
      id: '2',
      animalTag: 'OD-KHD-001235',
      breed: 'Murrah Buffalo',
      aiDate: new Date(2024, 7, 20), // Aug 20, 2024
      pregnancyConfirmed: true,
      confirmationDate: new Date(2024, 9, 5), // Oct 5, 2024
      expectedCalvingDate: new Date(2025, 4, 15), // May 15, 2025
      daysPregnant: 164,
      trimester: 2,
      status: 'confirmed'
    },
    {
      id: '3',
      animalTag: 'OD-KHD-001236',
      breed: 'Jersey',
      aiDate: new Date(2024, 11, 1), // Dec 1, 2024
      pregnancyConfirmed: false,
      expectedCalvingDate: new Date(2025, 8, 8), // Sept 8, 2025
      daysPregnant: 31,
      trimester: 1,
      status: 'pending-check'
    },
    {
      id: '4',
      animalTag: 'OD-KHD-001237',
      breed: 'Sahiwal',
      aiDate: new Date(2024, 4, 10), // May 10, 2024
      pregnancyConfirmed: true,
      confirmationDate: new Date(2024, 6, 1), // July 1, 2024
      expectedCalvingDate: new Date(2025, 1, 15), // Feb 15, 2025
      daysPregnant: 250,
      trimester: 3,
      status: 'confirmed'
    }
  ];

  const getDaysUntilCalving = (expectedDate: Date) => {
    const today = new Date();
    const diffTime = expectedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (record: PregnancyRecord) => {
    const daysUntil = getDaysUntilCalving(record.expectedCalvingDate);
    
    if (record.status === 'pending-check') {
      return { text: 'Check Due', color: 'bg-amber-100 text-amber-700', icon: Clock };
    } else if (daysUntil <= 30) {
      return { text: 'Due Soon', color: 'bg-red-100 text-red-700', icon: AlertCircle };
    } else {
      return { text: 'Confirmed', color: 'bg-green-100 text-green-700', icon: CheckCircle };
    }
  };

  const getProgressColor = (trimester: number) => {
    if (trimester === 1) return 'bg-blue-500';
    if (trimester === 2) return 'bg-purple-500';
    return 'bg-green-500';
  };

  const filteredRecords = pregnancyRecords.filter(record => {
    if (filter === 'confirmed') return record.status === 'confirmed';
    if (filter === 'pending') return record.status === 'pending-check';
    if (filter === 'due-soon') return getDaysUntilCalving(record.expectedCalvingDate) <= 30;
    return true;
  });

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-800 mb-1">Pregnancy Tracking</h3>
          <p className="text-sm text-slate-600 font-odia">ଗର୍ଭଧାରଣ ଟ୍ରାକିଂ</p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All', count: pregnancyRecords.length },
            { value: 'confirmed', label: 'Confirmed', count: pregnancyRecords.filter(r => r.status === 'confirmed').length },
            { value: 'pending', label: 'Pending Check', count: pregnancyRecords.filter(r => r.status === 'pending-check').length },
            { value: 'due-soon', label: 'Due Soon', count: pregnancyRecords.filter(r => getDaysUntilCalving(r.expectedCalvingDate) <= 30).length }
          ].map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filter === value
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
                  : 'bg-white/70 text-slate-700 border border-white/30 hover:bg-white'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Pregnancy Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => {
          const badge = getStatusBadge(record);
          const daysUntil = getDaysUntilCalving(record.expectedCalvingDate);
          const progressPercent = Math.min((record.daysPregnant / 280) * 100, 100); // 280 days avg gestation
          const BadgeIcon = badge.icon;

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-slate-900">{record.animalTag}</span>
                    <span className="text-sm text-slate-600">• {record.breed}</span>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${badge.color}`}>
                      <BadgeIcon size={12} />
                      {badge.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      AI: {record.aiDate.toLocaleDateString()}
                    </span>
                    {record.pregnancyConfirmed && (
                      <span className="flex items-center gap-1">
                        <CheckCircle size={14} />
                        Confirmed: {record.confirmationDate?.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">Expected Calving</p>
                  <p className="text-slate-900 font-mono mb-1">
                    {record.expectedCalvingDate.toLocaleDateString()}
                  </p>
                  <p className={`text-sm font-mono ${daysUntil <= 30 ? 'text-red-600' : 'text-green-600'}`}>
                    {daysUntil > 0 ? `${daysUntil} days remaining` : 'Overdue'}
                  </p>
                </div>
              </div>

              {/* Pregnancy Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
                  <span>Trimester {record.trimester} • Day {record.daysPregnant}</span>
                  <span>{progressPercent.toFixed(0)}% Complete</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(record.trimester)} transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className={record.daysPregnant >= 45 ? 'text-green-600' : 'text-slate-400'}>
                    ✓ Pregnancy Check (Day 45)
                  </span>
                  <span className={record.daysPregnant >= 150 ? 'text-green-600' : 'text-slate-400'}>
                    {record.daysPregnant >= 150 ? '✓' : '○'} Mid-Pregnancy (Day 150)
                  </span>
                  <span className={record.daysPregnant >= 240 ? 'text-green-600' : 'text-slate-400'}>
                    {record.daysPregnant >= 240 ? '✓' : '○'} Pre-Calving Care (Day 240)
                  </span>
                </div>

                <button className="text-purple-600 hover:text-purple-700">
                  View Details →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-purple-600" size={32} />
          </div>
          <p className="text-slate-600">No pregnancy records found</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm text-slate-600 mb-3">Trimester Color Code:</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-sm text-slate-700">1st Trimester (0-93 days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500" />
            <span className="text-sm text-slate-700">2nd Trimester (94-186 days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-sm text-slate-700">3rd Trimester (187-280 days)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
