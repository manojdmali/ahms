import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Building, Save, Camera } from 'lucide-react';

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: 'Dr. Rajesh Kumar',
    nameOdia: 'ଡ. ରାଜେଶ କୁମାର',
    email: 'rajesh.kumar@odisha.gov.in',
    phone: '+91 9876543210',
    designation: 'District Livestock Officer',
    designationOdia: 'ଜିଲ୍ଲା ପଶୁପାଳନ ଅଧିକାରୀ',
    department: 'Animal Husbandry & Veterinary Services',
    district: 'Khordha',
    block: 'Bhubaneswar',
    address: 'Directorate of Animal Husbandry, Unit-6, Bhubaneswar',
    employeeId: 'AH-OD-2024-1234',
    joinDate: '2024-01-15'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4">Profile Photo</h4>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl">
              RK
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all">
              <Camera size={18} className="text-green-600" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-3">
              Upload a professional photo. Maximum file size: 2MB. Accepted formats: JPG, PNG.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all text-sm">
                Upload Photo
              </button>
              <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <User size={20} />
          Personal Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name (English) *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name (Odia)
            </label>
            <input
              type="text"
              value={formData.nameOdia}
              onChange={(e) => setFormData({ ...formData, nameOdia: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 font-odia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={14} className="inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone size={14} className="inline mr-1" />
              Mobile Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={formData.employeeId}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Join Date
            </label>
            <input
              type="date"
              value={formData.joinDate}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <Building size={20} />
          Professional Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Designation (English) *
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Designation (Odia)
            </label>
            <input
              type="text"
              value={formData.designationOdia}
              onChange={(e) => setFormData({ ...formData, designationOdia: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 font-odia"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-slate-800 mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Location Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              District *
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Khordha">Khordha</option>
              <option value="Cuttack">Cuttack</option>
              <option value="Puri">Puri</option>
              <option value="Ganjam">Ganjam</option>
              <option value="Balasore">Balasore</option>
              <option value="Sambalpur">Sambalpur</option>
              <option value="Sundargarh">Sundargarh</option>
              <option value="Mayurbhanj">Mayurbhanj</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Block *
            </label>
            <input
              type="text"
              value={formData.block}
              onChange={(e) => setFormData({ ...formData, block: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Office Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
