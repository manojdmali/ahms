import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDisplayDate } from '../../utils/dateFormat';

type ViewMode = 'month' | 'week' | 'day';

interface VaccinationEvent {
  id: string;
  date: Date;
  type: 'FMD' | 'HS' | 'BQ' | 'Rabies' | 'Deworming';
  animals: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function VaccinationCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025

  const vaccineColors = {
    FMD: 'bg-blue-500 border-blue-600',
    HS: 'bg-purple-500 border-purple-600',
    BQ: 'bg-green-500 border-green-600',
    Rabies: 'bg-red-500 border-red-600',
    Deworming: 'bg-amber-500 border-amber-600'
  };

  const events: VaccinationEvent[] = [
    { id: '1', date: new Date(2025, 0, 15), type: 'FMD', animals: 234, location: 'Balipatna Block', status: 'completed' },
    { id: '2', date: new Date(2025, 0, 18), type: 'HS', animals: 156, location: 'Tangi Block', status: 'scheduled' },
    { id: '3', date: new Date(2025, 0, 22), type: 'Deworming', animals: 89, location: 'Khordha Block', status: 'scheduled' },
    { id: '4', date: new Date(2025, 0, 25), type: 'BQ', animals: 198, location: 'Jatni Block', status: 'scheduled' },
    { id: '5', date: new Date(2025, 0, 28), type: 'Rabies', animals: 45, location: 'Bhubaneswar', status: 'scheduled' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: number) => {
    return events.filter(event => 
      event.date.getDate() === date && 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-800 mb-1">Vaccination Calendar</h3>
          <p className="text-sm text-slate-600 font-odia">ଟିକାକରଣ କ୍ୟାଲେଣ୍ଡର</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/70 rounded-xl p-1 border border-white/30">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              viewMode === 'month'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              viewMode === 'week'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              viewMode === 'day'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <CalendarIcon size={20} className="text-green-600" />
          <h4 className="text-slate-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
        </div>

        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-slate-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Calendar Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getEventsForDate(day);
          const isToday = day === 2 && currentDate.getMonth() === 0; // Mock today as Jan 2

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square rounded-xl border p-2 cursor-pointer transition-all ${
                isToday
                  ? 'bg-green-50 border-green-500 shadow-md'
                  : 'bg-white/50 border-white/30 hover:bg-white'
              }`}
            >
              <div className={`text-sm mb-1 ${isToday ? 'text-green-700 font-bold' : 'text-slate-700'}`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs px-1 py-0.5 rounded border ${vaccineColors[event.type]} text-white truncate`}
                    title={`${event.type} - ${event.animals} animals`}
                  >
                    {event.type}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-slate-500">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm text-slate-600 mb-3">Vaccine Types:</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(vaccineColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${color}`} />
              <span className="text-sm text-slate-700">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <h4 className="text-slate-800 mb-3">Upcoming Vaccinations</h4>
        <div className="space-y-2">
          {events
            .filter(e => e.status === 'scheduled')
            .slice(0, 3)
            .map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-white/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${vaccineColors[event.type]}`} />
                  <div>
                    <p className="text-sm text-slate-900">
                      {event.type} - {event.location}
                    </p>
                    <p className="text-xs text-slate-600">
                      {formatDisplayDate(event.date)} • {event.animals} animals
                    </p>
                  </div>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700">
                  View Details →
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
