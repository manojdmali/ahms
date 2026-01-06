import { useState } from 'react';
import { X, Check, Upload, Camera, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: any;
}

export function AddAnimalModal({ isOpen, onClose, farmer }: AddAnimalModalProps) {
  const [formData, setFormData] = useState({
    species: 'cattle',
    breed: '',
    gender: 'female',
    dob: '',
    color: '',
    identificationMarks: '',
    weight: '',
    height: '',
    purchaseDate: '',
    purchasePrice: '',
    purpose: 'dairy',
    healthStatus: 'healthy',
    vaccinationStatus: 'up-to-date',
    photos: [] as string[]
  });

  const speciesOptions = {
    cattle: {
      label: 'Cattle 🐄',
      breeds: ['Holstein Friesian', 'HF Cross', 'Jersey', 'Sahiwal', 'Gir', 'Red Sindhi', 'Indigenous/Desi']
    },
    buffalo: {
      label: 'Buffalo 🐃',
      breeds: ['Murrah', 'Jaffarabadi', 'Mehsana', 'Surti', 'Nagpuri', 'Indigenous']
    },
    goat: {
      label: 'Goat 🐐',
      breeds: ['Jamunapari', 'Beetal', 'Barbari', 'Sirohi', 'Black Bengal', 'Indigenous']
    },
    sheep: {
      label: 'Sheep 🐑',
      breeds: ['Merino', 'Dorper', 'Indigenous', 'Crossbreed']
    },
    poultry: {
      label: 'Poultry 🐔',
      breeds: ['Broiler', 'Layer', 'Kadaknath', 'Aseel', 'Indigenous/Desi']
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique tag ID
    const tagId = `${formData.species.toUpperCase().slice(0, 3)}-${farmer.farmerId.split('-')[2]}-${Date.now().toString().slice(-4)}`;
    
    const newAnimal = {
      tagId,
      farmerId: farmer.id,
      farmerName: farmer.name,
      ...formData,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    console.log('New animal registered:', newAnimal);
    
    // Show success message
    alert(`Animal registered successfully!\nTag ID: ${tagId}\nFarmer: ${farmer.name}`);
    
    onClose();
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto = `photo-${Date.now()}.jpg`;
    setFormData({ ...formData, photos: [...formData.photos, newPhoto] });
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
              <h2 className="text-slate-900">Register New Animal</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">ନୂତନ ପଶୁ ପଞ୍ଜିକରଣ କରନ୍ତୁ</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Farmer Info Display */}
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                <span className="text-2xl">👨‍🌾</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-900">{farmer.name}</p>
                  <span className="text-xs text-slate-500 font-mono">{farmer.farmerId}</span>
                </div>
                <p className="text-sm text-slate-600 font-odia">{farmer.nameOdia}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {farmer.address.village}, {farmer.address.block} | Current Livestock: {farmer.totalLivestock}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-250px)] space-y-6">
          {/* Animal Type & Breed */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Animal Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value, breed: '' })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                {Object.entries(speciesOptions).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
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
                required
              >
                <option value="">Select Breed</option>
                {speciesOptions[formData.species as keyof typeof speciesOptions].breeds.map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender & Date of Birth */}
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
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Physical Characteristics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Color/Coat
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g., Black & White, Brown, White"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Identification Marks
              </label>
              <input
                type="text"
                value={formData.identificationMarks}
                onChange={(e) => setFormData({ ...formData, identificationMarks: e.target.value })}
                placeholder="e.g., White spot on forehead"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Weight & Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Enter weight in kg"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="Enter height in cm"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Purchase Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Purchase/Acquisition Date
              </label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Purchase Price (₹)
              </label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                placeholder="Enter amount in rupees"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Purpose & Health Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Primary Purpose
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="dairy">Dairy/Milk Production</option>
                <option value="breeding">Breeding</option>
                <option value="meat">Meat Production</option>
                <option value="draft">Draft/Labor</option>
                <option value="eggs">Egg Production</option>
                <option value="mixed">Mixed Purpose</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Current Health Status
              </label>
              <select
                value={formData.healthStatus}
                onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="healthy">Healthy</option>
                <option value="under-treatment">Under Treatment</option>
                <option value="recovering">Recovering</option>
                <option value="quarantine">Quarantine</option>
              </select>
            </div>
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Vaccination Status
            </label>
            <select
              value={formData.vaccinationStatus}
              onChange={(e) => setFormData({ ...formData, vaccinationStatus: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="up-to-date">Up to Date</option>
              <option value="partial">Partially Vaccinated</option>
              <option value="due">Vaccination Due</option>
              <option value="none">Not Vaccinated</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Animal Photos
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="flex-1 px-4 py-3 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center gap-2 transition-all"
              >
                <Upload size={18} />
                <span className="text-sm">Upload Photo</span>
              </button>
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="flex-1 px-4 py-3 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center gap-2 transition-all"
              >
                <Camera size={18} />
                <span className="text-sm">Take Photo</span>
              </button>
            </div>
            {formData.photos.length > 0 && (
              <p className="text-xs text-green-600 mt-2">
                ✓ {formData.photos.length} photo(s) uploaded
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            All fields marked with <span className="text-red-500">*</span> are required
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center gap-2"
            >
              <Save size={18} />
              Register Animal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
