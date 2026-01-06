import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Printer, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  User,
  CreditCard,
  Building2,
  Beef,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AddAnimalModal } from './AddAnimalModal';

interface FarmerDetailProps {
  farmer: any;
  onBack: () => void;
}

export function FarmerDetail({ farmer, onBack }: FarmerDetailProps) {
  const [isAddAnimalModalOpen, setIsAddAnimalModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h2 className="text-slate-900 mb-1">Farmer Profile</h2>
            <p className="text-sm text-slate-600 font-odia">କୃଷକ ପ୍ରୋଫାଇଲ୍</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Edit size={18} />
              <span className="text-sm">Edit</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Printer size={18} />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Farmer Info Header */}
        <div className="flex gap-6">
          {/* Photo */}
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 flex-shrink-0 flex items-center justify-center">
            <User className="text-green-600" size={48} />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-slate-900">{farmer.name}</h3>
                  {farmer.kycStatus === 'Verified' && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-1">
                      <CheckCircle size={14} />
                      KYC Verified
                    </span>
                  )}
                  {farmer.insuranceStatus === 'Active' && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                      <Shield size={14} />
                      Insured
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 font-odia mb-2">{farmer.nameOdia}</p>
                <p className="text-sm text-slate-600 font-mono">Farmer ID: {farmer.farmerId}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} />
                <div>
                  <p className="text-slate-900">{farmer.contact}</p>
                  {farmer.alternateContact && (
                    <p className="text-xs">{farmer.alternateContact}</p>
                  )}
                </div>
              </div>
              {farmer.email && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} />
                  <div>
                    <p className="text-slate-900">{farmer.email}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} />
                <div>
                  <p className="text-slate-900">Registered</p>
                  <p className="text-xs">{new Date(farmer.registrationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
            <span className="text-2xl">🐄</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Cattle</p>
          <p className="text-slate-900 font-mono">{farmer.livestock.cattle}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <span className="text-2xl">🐃</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Buffalo</p>
          <p className="text-slate-900 font-mono">{farmer.livestock.buffalo}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
            <span className="text-2xl">🐐</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Goat</p>
          <p className="text-slate-900 font-mono">{farmer.livestock.goat}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
            <span className="text-2xl">🐑</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Sheep</p>
          <p className="text-slate-900 font-mono">{farmer.livestock.sheep}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
            <span className="text-2xl">🐔</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">Poultry</p>
          <p className="text-slate-900 font-mono">{farmer.livestock.poultry}</p>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <User size={20} />
            Personal Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Full Name:</span>
              <span className="text-slate-900">{farmer.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Father's Name:</span>
              <span className="text-slate-900">{farmer.fatherName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Age:</span>
              <span className="text-slate-900">{farmer.age} years</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Gender:</span>
              <span className="text-slate-900">{farmer.gender}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Aadhaar:</span>
              <span className="text-slate-900 font-mono">{farmer.aadhaar}</span>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Address
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Village:</span>
              <span className="text-slate-900">{farmer.address.village}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Panchayat:</span>
              <span className="text-slate-900">{farmer.address.panchayat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Block:</span>
              <span className="text-slate-900">{farmer.address.block}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">District:</span>
              <span className="text-slate-900">{farmer.address.district}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">PIN Code:</span>
              <span className="text-slate-900 font-mono">{farmer.address.pincode}</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <CreditCard size={20} />
            Bank Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Bank Name:</span>
              <span className="text-slate-900">{farmer.bankDetails.bankName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Branch:</span>
              <span className="text-slate-900">{farmer.bankDetails.branch}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Account No:</span>
              <span className="text-slate-900 font-mono">{farmer.bankDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">IFSC Code:</span>
              <span className="text-slate-900 font-mono">{farmer.bankDetails.ifsc}</span>
            </div>
          </div>
        </div>

        {/* Schemes & Benefits */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={20} />
            Government Schemes
          </h3>
          <div className="space-y-2">
            {farmer.schemes.map((scheme: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-white/50 rounded-lg"
              >
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm text-slate-900">{scheme}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Livestock Summary */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Beef size={20} />
          Livestock Summary
        </h3>
        <div className="text-center py-8">
          <div className="inline-block p-4 bg-green-50 rounded-2xl">
            <p className="text-4xl font-mono text-green-600 mb-2">{farmer.totalLivestock}</p>
            <p className="text-sm text-slate-600">Total Animals Registered</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              View All Livestock
            </button>
            <button
              className="px-6 py-2.5 bg-white/70 hover:bg-white border border-white/30 rounded-xl transition-all"
              onClick={() => setIsAddAnimalModalOpen(true)}
            >
              Add New Animal
            </button>
          </div>
        </div>
      </div>

      {/* Add Animal Modal */}
      <AddAnimalModal
        isOpen={isAddAnimalModalOpen}
        onClose={() => setIsAddAnimalModalOpen(false)}
        farmer={farmer}
      />
    </motion.div>
  );
}