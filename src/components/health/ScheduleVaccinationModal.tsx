import { useState } from 'react';
import { X, Calendar, MapPin, Users, Syringe } from 'lucide-react';
import { motion } from 'motion/react';

interface ScheduleVaccinationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVaccinationModal({ isOpen, onClose }: ScheduleVaccinationModalProps) {
  const [formData, setFormData] = useState({
    vaccineType: '',
    campDate: '',
    campTime: '',
    location: '',
    block: '',
    expectedAnimals: '',
    veterinarian: '',
    notes: ''
  });

  const vaccineTypes = [
    { value: 'FMD', label: 'Foot and Mouth Disease (FMD)', doses: 2, frequency: '6 months' },
    { value: 'HS', label: 'Haemorrhagic Septicaemia (HS)', doses: 1, frequency: 'Annual' },
    { value: 'BQ', label: 'Black Quarter (BQ)', doses: 1, frequency: 'Annual' },
    { value: 'Rabies', label: 'Rabies', doses: 1, frequency: 'Annual' },
    { value: 'Anthrax', label: 'Anthrax', doses: 1, frequency: 'Annual' },
    { value: 'Deworming', label: 'Deworming', doses: 1, frequency: '3 months' }
  ];

  const blocks = [
    'Balipatna',
    'Tangi',
    'Khordha',
    'Jatni',
    'Bhubaneswar',
    'Bolagarh',
    'Chilika'
  ];

  const veterinarians = [
    'Dr. Sanjay Mohanty',
    'Dr. Priya Patel',
    'Dr. Ramesh Kumar',
    'Dr. Anjali Singh',
    'Dr. Suresh Nayak'
  ];

  const handleSubmit = () => {
    console.log('Vaccination camp scheduled:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card-darker rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900">Schedule Vaccination Camp</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">ଟିକାକରଣ କାର୍ଯ୍ୟକ୍ରମ</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-5">
          {/* Vaccine Type */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Vaccine Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vaccineType}
              onChange={(e) => setFormData({ ...formData, vaccineType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select vaccine type</option>
              {vaccineTypes.map((vaccine) => (
                <option key={vaccine.value} value={vaccine.value}>
                  {vaccine.label} - {vaccine.frequency}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Camp Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="date"
                  value={formData.campDate}
                  onChange={(e) => setFormData({ ...formData, campDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Camp Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.campTime}
                onChange={(e) => setFormData({ ...formData, campTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Block <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select block</option>
                {blocks.map((block) => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Specific Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Village/Community center"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Expected Animals and Veterinarian */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Expected Animals
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={formData.expectedAnimals}
                  onChange={(e) => setFormData({ ...formData, expectedAnimals: e.target.value })}
                  placeholder="Estimated count"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Veterinarian <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.veterinarian}
                onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Assign veterinarian</option>
                {veterinarians.map((vet) => (
                  <option key={vet} value={vet}>{vet}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special instructions or requirements..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Info Box */}
          {formData.vaccineType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
            >
              <div className="flex gap-3">
                <Syringe className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Vaccine Information:</p>
                  {vaccineTypes
                    .filter((v) => v.value === formData.vaccineType)
                    .map((vaccine) => (
                      <ul key={vaccine.value} className="list-disc ml-4 space-y-1">
                        <li>Doses Required: {vaccine.doses}</li>
                        <li>Frequency: {vaccine.frequency}</li>
                        <li>Ensure proper cold chain maintenance</li>
                        <li>Record all vaccinated animals in the system</li>
                      </ul>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/70 border border-white/30 hover:bg-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Calendar size={18} />
            Schedule Camp
          </button>
        </div>
      </motion.div>
    </div>
  );
}
