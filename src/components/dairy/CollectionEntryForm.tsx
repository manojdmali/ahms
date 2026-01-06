import { useState } from 'react';
import { X, Save, Droplet, Thermometer, Beaker, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { FarmerSelector } from '../farmers/FarmerSelector';
import { farmersData } from '../../data/farmersData';

interface CollectionEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CollectionEntryForm({ isOpen, onClose }: CollectionEntryFormProps) {
  const [formData, setFormData] = useState({
    farmerId: '',
    farmerData: null as any,
    date: new Date().toISOString().split('T')[0],
    session: 'morning',
    quantity: '',
    fat: '',
    snf: '',
    clr: '',
    temperature: '',
    collectionCenter: 'Balipatna Dairy Center',
    collectorName: '',
    remarks: ''
  });

  const [calculatedData, setCalculatedData] = useState({
    quality: 'good',
    ratePerLiter: 40,
    totalAmount: 0
  });

  const handleFarmerSelect = (farmer: any) => {
    setFormData(prev => ({
      ...prev,
      farmerId: farmer.id,
      farmerData: farmer
    }));
  };

  const calculateQualityAndRate = () => {
    const fat = parseFloat(formData.fat);
    const snf = parseFloat(formData.snf);
    const temp = parseFloat(formData.temperature);

    if (!fat || !snf) return;

    let quality = 'average';
    let rate = 38;

    // Quality determination based on fat and SNF
    if (fat >= 4.2 && snf >= 8.5) {
      quality = 'excellent';
      rate = 44;
    } else if (fat >= 3.8 && snf >= 8.2) {
      quality = 'good';
      rate = 40;
    } else if (fat >= 3.5 && snf >= 8.0) {
      quality = 'average';
      rate = 38;
    } else {
      quality = 'poor';
      rate = 35;
    }

    // Temperature penalty
    if (temp > 35) {
      rate -= 2;
    }

    const quantity = parseFloat(formData.quantity) || 0;
    const totalAmount = quantity * rate;

    setCalculatedData({
      quality,
      ratePerLiter: rate,
      totalAmount
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate when relevant fields change
    if (['quantity', 'fat', 'snf', 'temperature'].includes(field)) {
      setTimeout(calculateQualityAndRate, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const collectionId = `DC-${Date.now()}`;
    
    const newCollection = {
      collectionId,
      farmerId: formData.farmerId,
      farmerName: formData.farmerData?.name,
      farmerNameOdia: formData.farmerData?.nameOdia,
      ...formData,
      ...calculatedData,
      status: 'pending'
    };

    console.log('New collection entry:', newCollection);
    alert(`Collection recorded successfully!\nCollection ID: ${collectionId}\nAmount: ₹${calculatedData.totalAmount.toFixed(2)}`);
    
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
              <h2 className="text-slate-900">Milk Collection Entry</h2>
              <p className="text-sm text-slate-600 font-odia mt-1">କ୍ଷୀର ସଂଗ୍ରହ ଏଣ୍ଟ୍ରି</p>
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {/* Farmer Selection */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Select Farmer <span className="text-red-500">*</span>
            </label>
            <FarmerSelector
              onSelect={handleFarmerSelect}
              selectedFarmerId={formData.farmerId}
            />
          </div>

          {/* Date and Session */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Collection Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Session <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.session}
                onChange={(e) => handleInputChange('session', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="morning">🌅 Morning</option>
                <option value="evening">🌆 Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Quantity (Liters) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  step="0.1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="0.0"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Quality Parameters */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Beaker size={20} />
              Quality Parameters
            </h3>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Fat % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fat}
                  onChange={(e) => handleInputChange('fat', e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  SNF % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.snf}
                  onChange={(e) => handleInputChange('snf', e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  CLR
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.clr}
                  onChange={(e) => handleInputChange('clr', e.target.value)}
                  placeholder="Auto-calculated"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Temperature (°C) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="0.0"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Auto-calculated Results */}
            {formData.quantity && formData.fat && formData.snf && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator size={18} className="text-green-600" />
                  <h4 className="text-sm font-medium text-green-900">Calculated Values</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-green-700 mb-1">Quality Grade</p>
                    <p className="text-sm font-medium text-green-900 capitalize">{calculatedData.quality}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 mb-1">Rate per Liter</p>
                    <p className="text-sm font-medium text-green-900">₹{calculatedData.ratePerLiter.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 mb-1">Total Amount</p>
                    <p className="text-lg font-mono font-medium text-green-900">₹{calculatedData.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collection Center Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Collection Center <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.collectionCenter}
                onChange={(e) => handleInputChange('collectionCenter', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="Balipatna Dairy Center">Balipatna Dairy Center</option>
                <option value="Tangi Dairy Center">Tangi Dairy Center</option>
                <option value="Jatni Dairy Center">Jatni Dairy Center</option>
                <option value="Bolagarh Dairy Center">Bolagarh Dairy Center</option>
                <option value="Bhubaneswar Dairy Center">Bhubaneswar Dairy Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Collector Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.collectorName}
                onChange={(e) => handleInputChange('collectorName', e.target.value)}
                placeholder="Enter collector name"
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Remarks (Optional)
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              placeholder="Any additional notes or observations..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
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
              Save Collection
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
