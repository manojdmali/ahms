import { useState } from 'react';
import { X, Plus, Trash2, Camera, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HealthRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  duration: string;
}

export function HealthRecordForm({ isOpen, onClose }: HealthRecordFormProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    farmerId: '',
    recordType: 'checkup',
    symptoms: [] as string[],
    diagnosis: '',
    treatment: '',
    temperature: '',
    followupRequired: false,
    followupDate: ''
  });

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  const symptomOptions = [
    'Fever',
    'Lethargy',
    'Loss of Appetite',
    'Diarrhea',
    'Coughing',
    'Nasal Discharge',
    'Lameness',
    'Swelling',
    'Skin Lesions',
    'Eye Discharge',
    'Reduced Milk Yield',
    'Difficulty Breathing'
  ];

  const diseaseOptions = [
    'Foot and Mouth Disease (FMD)',
    'Haemorrhagic Septicaemia (HS)',
    'Black Quarter (BQ)',
    'Lumpy Skin Disease (LSD)',
    'Mastitis',
    'Pneumonia',
    'Gastroenteritis',
    'Parasitic Infestation',
    'Bloat',
    'Milk Fever',
    'Retained Placenta',
    'Other'
  ];

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const addMedicine = () => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      duration: ''
    };
    setMedicines([...medicines, newMedicine]);
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const updateMedicine = (id: string, field: keyof Medicine, value: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSubmit = () => {
    console.log('Health record submitted:', { formData, medicines, photos });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card-darker rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900">Add Health Record</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଯୋଗ କରନ୍ତୁ</p>
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
          {/* Animal Selection */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Animal Tag ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.animalTag}
                onChange={(e) => setFormData({ ...formData, animalTag: e.target.value })}
                placeholder="Search by tag ID or scan barcode"
                className="w-full px-4 py-2.5 pr-12 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                <Camera size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Farmer details will be automatically fetched from livestock registry
            </p>
          </div>

          {/* Record Type */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Record Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                <input
                  type="radio"
                  name="recordType"
                  value="checkup"
                  checked={formData.recordType === 'checkup'}
                  onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                  className="text-green-600"
                />
                <span className="text-sm">Routine Checkup</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                <input
                  type="radio"
                  name="recordType"
                  value="treatment"
                  checked={formData.recordType === 'treatment'}
                  onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                  className="text-green-600"
                />
                <span className="text-sm">Treatment</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                <input
                  type="radio"
                  name="recordType"
                  value="emergency"
                  checked={formData.recordType === 'emergency'}
                  onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                  className="text-green-600"
                />
                <span className="text-sm">Emergency</span>
              </label>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Temperature (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="101.5"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                placeholder="60-80"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Respiratory Rate
              </label>
              <input
                type="number"
                placeholder="15-30"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Symptoms Observed
            </label>
            <div className="grid grid-cols-3 gap-2">
              {symptomOptions.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-green-600 text-white border-green-700 shadow-md'
                      : 'bg-white/70 text-slate-700 border-white/30 hover:bg-white'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Diagnosis
            </label>
            <select
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select diagnosis</option>
              {diseaseOptions.map(disease => (
                <option key={disease} value={disease}>{disease}</option>
              ))}
            </select>
          </div>

          {/* Treatment Given */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Treatment Given
            </label>
            <textarea
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              placeholder="Describe the treatment provided..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-slate-700">
                Medicines Administered
              </label>
              <button
                onClick={addMedicine}
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition-all flex items-center gap-1"
              >
                <Plus size={16} />
                Add Medicine
              </button>
            </div>

            {medicines.length === 0 ? (
              <div className="p-6 rounded-xl bg-white/50 border border-white/30 text-center">
                <p className="text-sm text-slate-500">No medicines added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medicines.map((medicine) => (
                  <div key={medicine.id} className="grid grid-cols-12 gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      value={medicine.name}
                      onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                      className="col-span-5 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                      className="col-span-3 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={medicine.duration}
                      onChange={(e) => updateMedicine(medicine.id, 'duration', e.target.value)}
                      className="col-span-3 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => removeMedicine(medicine.id)}
                      className="col-span-1 w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Attach Photos/Documents
            </label>
            <div className="grid grid-cols-4 gap-3">
              <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-green-500 transition-all flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-green-600">
                <Upload size={24} />
                <span className="text-xs">Upload</span>
              </button>
              <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-green-500 transition-all flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-green-600">
                <Camera size={24} />
                <span className="text-xs">Camera</span>
              </button>
            </div>
          </div>

          {/* Follow-up */}
          <div className="p-4 rounded-xl bg-white/50 border border-white/30">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.followupRequired}
                onChange={(e) => setFormData({ ...formData, followupRequired: e.target.checked })}
                className="w-5 h-5 text-green-600 rounded"
              />
              <span className="text-sm text-slate-700">Follow-up Required</span>
            </label>
            
            {formData.followupRequired && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                <label className="block text-sm text-slate-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={formData.followupDate}
                  onChange={(e) => setFormData({ ...formData, followupDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </motion.div>
            )}
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Ensure all vital signs are recorded accurately</li>
                <li>Upload clear photos of visible symptoms</li>
                <li>Complete medicine details for proper tracking</li>
              </ul>
            </div>
          </div>
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
            Save Health Record
          </button>
        </div>
      </motion.div>
    </div>
  );
}