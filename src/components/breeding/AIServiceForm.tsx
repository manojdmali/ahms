import { useState } from 'react';
import { X, Calendar, Search, User, FlaskConical, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIServiceForm({ isOpen, onClose }: AIServiceFormProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    farmerName: '',
    farmerContact: '',
    serviceDate: '',
    serviceTime: '',
    heatDetectedDate: '',
    technician: '',
    bullBreed: '',
    semenBatch: '',
    semenSource: '',
    previousAI: '',
    lactationNumber: '',
    lastCalvingDate: '',
    serviceType: 'first',
    notes: ''
  });

  const bullBreeds = [
    'Holstein Friesian',
    'Jersey',
    'Sahiwal',
    'Gir',
    'Murrah (Buffalo)',
    'Red Sindhi',
    'Tharparkar',
    'Crossbred HF',
    'Crossbred Jersey'
  ];

  const technicians = [
    'Rajesh Kumar - AI Tech (ID: AI001)',
    'Prakash Mohanty - AI Tech (ID: AI002)',
    'Suresh Patel - AI Tech (ID: AI003)',
    'Mahesh Sahu - AI Tech (ID: AI004)',
    'Ramesh Jena - AI Tech (ID: AI005)'
  ];

  const semenSources = [
    'BAIF Development Research Foundation',
    'NDDB - Sabarmati Ashram Gaushala',
    'Central Frozen Semen Production',
    'State Cattle Breeding Farm',
    'Odisha State Livestock Development'
  ];

  const handleSubmit = () => {
    console.log('AI Service Request:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card-darker rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900">AI Service Request</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">କୃତ୍ରିମ ପ୍ରଜନନ ସେବା</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {/* Animal & Farmer Information */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <Search size={18} />
              Animal & Farmer Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Animal Tag ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.animalTag}
                  onChange={(e) => setFormData({ ...formData, animalTag: e.target.value })}
                  placeholder="Search or scan tag ID"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Farmer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  placeholder="Auto-filled from tag"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Farmer Contact
                </label>
                <input
                  type="tel"
                  value={formData.farmerContact}
                  onChange={(e) => setFormData({ ...formData, farmerContact: e.target.value })}
                  placeholder="Mobile number"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Last Calving Date
                </label>
                <input
                  type="date"
                  value={formData.lastCalvingDate}
                  onChange={(e) => setFormData({ ...formData, lastCalvingDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={18} />
              Service Scheduling
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Heat Detected On <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.heatDetectedDate}
                  onChange={(e) => setFormData({ ...formData, heatDetectedDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Service Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Service Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.serviceTime}
                  onChange={(e) => setFormData({ ...formData, serviceTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                    <input
                      type="radio"
                      name="serviceType"
                      value="first"
                      checked={formData.serviceType === 'first'}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="text-purple-600"
                    />
                    <span className="text-sm">First AI</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                    <input
                      type="radio"
                      name="serviceType"
                      value="repeat"
                      checked={formData.serviceType === 'repeat'}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="text-purple-600"
                    />
                    <span className="text-sm">Repeat AI</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Lactation Number
                </label>
                <input
                  type="number"
                  value={formData.lactationNumber}
                  onChange={(e) => setFormData({ ...formData, lactationNumber: e.target.value })}
                  placeholder="1, 2, 3..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Semen Details */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <FlaskConical size={18} />
              Semen & Bull Details
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Bull Breed <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bullBreed}
                  onChange={(e) => setFormData({ ...formData, bullBreed: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select breed</option>
                  {bullBreeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Semen Batch No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.semenBatch}
                  onChange={(e) => setFormData({ ...formData, semenBatch: e.target.value })}
                  placeholder="Batch number"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Semen Source <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.semenSource}
                  onChange={(e) => setFormData({ ...formData, semenSource: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select source</option>
                  {semenSources.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Technician Assignment */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <User size={18} />
              AI Technician Assignment
            </h3>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Assigned Technician <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.technician}
                onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select technician</option>
                {technicians.map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
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
              placeholder="Any observations or special instructions..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex gap-3">
            <AlertCircle className="text-purple-600 flex-shrink-0" size={20} />
            <div className="text-sm text-purple-800">
              <p className="font-medium mb-1">AI Service Guidelines:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Best time for AI: 12-18 hours after heat detection</li>
                <li>Ensure proper semen handling and cold chain maintenance</li>
                <li>Schedule pregnancy check 45-60 days post-AI</li>
                <li>Record all service details for accurate tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <p className="mb-1">Pregnancy Check Due: <span className="font-mono text-slate-900">45 days from service date</span></p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/70 border border-white/30 hover:bg-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg transition-all flex items-center gap-2"
            >
              Submit AI Request
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
