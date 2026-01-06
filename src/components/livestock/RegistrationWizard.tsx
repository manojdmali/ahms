import { useState } from 'react';
import { X, Check, ChevronRight, ChevronLeft, Upload, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FarmerSelector } from '../farmers/FarmerSelector';

interface RegistrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationWizard({ isOpen, onClose }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    farmerId: '',
    farmerData: null as any,
    species: 'cattle',
    breed: '',
    gender: 'female',
    dob: '',
    // Step 2: Physical Details
    color: '',
    identificationMarks: '',
    weight: '',
    height: '',
    // Step 3: Photos
    photos: [] as string[],
    // Step 4: Additional
    purchaseDate: '',
    purchasePrice: '',
    purpose: 'dairy'
  });

  const totalSteps = 4;

  const handleFarmerSelect = (farmer: any) => {
    setFormData(prev => ({
      ...prev,
      farmerId: farmer.id,
      farmerData: farmer
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-slate-900">Register New Livestock</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">ନୂଆ ପଶୁ ପଞ୍ଜୀକରଣ</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step < currentStep
                        ? 'bg-green-600 text-white'
                        : step === currentStep
                        ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg'
                        : 'bg-white/70 text-slate-400 border border-white/30'
                    }`}
                  >
                    {step < currentStep ? <Check size={18} /> : step}
                  </div>
                  <span className={`text-xs ${step <= currentStep ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step === 1 && 'Basic Info'}
                    {step === 2 && 'Physical Details'}
                    {step === 3 && 'Photos'}
                    {step === 4 && 'Confirm'}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      step < currentStep ? 'bg-green-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Select Farmer <span className="text-red-500">*</span>
                  </label>
                  <FarmerSelector
                    onSelect={handleFarmerSelect}
                    selectedFarmerId={formData.farmerId}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Species <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.species}
                      onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="cattle">Cattle</option>
                      <option value="buffalo">Buffalo</option>
                      <option value="goat">Goat</option>
                      <option value="sheep">Sheep</option>
                      <option value="poultry">Poultry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Breed <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Breed</option>
                      <option value="holstein">Holstein Friesian</option>
                      <option value="hf-cross">HF Cross</option>
                      <option value="jersey">Jersey</option>
                      <option value="sahiwal">Sahiwal</option>
                      <option value="gir">Gir</option>
                      <option value="indigenous">Indigenous/Desi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="text-green-600"
                        />
                        <span className="text-sm">Female ♀</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 cursor-pointer hover:bg-white transition-all">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="text-green-600"
                        />
                        <span className="text-sm">Male ♂</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Physical Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Color/Coat
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => updateFormData('color', e.target.value)}
                      placeholder="e.g., White with black patches"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      placeholder="Enter weight"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                      placeholder="Enter height"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Purpose
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => updateFormData('purpose', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="dairy">Dairy</option>
                      <option value="breeding">Breeding</option>
                      <option value="dual">Dual Purpose</option>
                      <option value="draught">Draught</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Identification Marks
                  </label>
                  <textarea
                    value={formData.identificationMarks}
                    onChange={(e) => updateFormData('identificationMarks', e.target.value)}
                    placeholder="Describe any unique marks, scars, or features"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Upload clear photos of the animal from multiple angles (minimum 2 photos required)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Upload Buttons */}
                  <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-green-500 transition-all flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-green-600">
                    <Upload size={32} />
                    <span className="text-sm">Upload Photo</span>
                  </button>
                  <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-green-500 transition-all flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-green-600">
                    <Camera size={32} />
                    <span className="text-sm">Take Photo</span>
                  </button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Tips for good photos:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1 ml-4 list-disc">
                    <li>Take photos in good natural light</li>
                    <li>Capture full body side view</li>
                    <li>Include close-up of face and identification marks</li>
                    <li>Ensure animal is standing properly</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-slate-900 mb-4">Review Information</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Farmer ID:</span>
                        <p className="text-slate-900 font-mono">{formData.farmerId || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Species:</span>
                        <p className="text-slate-900 capitalize">{formData.species}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Breed:</span>
                        <p className="text-slate-900">{formData.breed || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Gender:</span>
                        <p className="text-slate-900 capitalize">{formData.gender}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Date of Birth:</span>
                        <p className="text-slate-900">{formData.dob || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Purpose:</span>
                        <p className="text-slate-900 capitalize">{formData.purpose}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800">
                    ✓ A unique tag ID will be generated automatically upon registration
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2.5 rounded-xl bg-white/70 border border-white/30 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all flex items-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Check size={18} />
              Register Livestock
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}