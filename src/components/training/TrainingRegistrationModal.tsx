import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Award,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Calendar,
  Users
} from 'lucide-react';
import { Training } from '../../data/trainingData';

interface TrainingRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  training: Training;
}

export function TrainingRegistrationModal({
  isOpen,
  onClose,
  training
}: TrainingRegistrationModalProps) {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerNameOdia: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    block: '',
    experience: '',
    farmSize: '',
    purpose: '',
    hasLaptop: 'no',
    paymentMode: 'online'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      farmerName: '',
      farmerNameOdia: '',
      phone: '',
      email: '',
      address: '',
      district: '',
      block: '',
      experience: '',
      farmSize: '',
      purpose: '',
      hasLaptop: 'no',
      paymentMode: 'online'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          {step === 'form' ? (
            // Registration Form
            <div>
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6 rounded-t-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white mb-2">Register for Training</h3>
                    <p className="text-sm text-green-50 line-clamp-2">{training.title}</p>
                    <p className="text-xs text-green-100 font-odia mt-1">{training.titleOdia}</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Training Info Summary */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-600" />
                    <div>
                      <p className="text-xs text-slate-600">Start Date</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(training.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-600">Seats Left</p>
                      <p className="text-sm font-medium text-slate-900">{training.seatsAvailable}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-purple-600" />
                    <div>
                      <p className="text-xs text-slate-600">Fees</p>
                      <p className="text-sm font-medium text-slate-900">₹{training.netFees.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-amber-600" />
                    <div>
                      <p className="text-xs text-slate-600">Certificate</p>
                      <p className="text-sm font-medium text-slate-900">{training.certification ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-slate-800 mb-4 flex items-center gap-2">
                    <User size={18} />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.farmerName}
                        onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name (Odia)
                      </label>
                      <input
                        type="text"
                        value={formData.farmerNameOdia}
                        onChange={(e) => setFormData({ ...formData, farmerNameOdia: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 font-odia"
                        placeholder="ଆପଣଙ୍କ ପୂରା ନାମ"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Phone size={14} className="inline mr-1" />
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Mail size={14} className="inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin size={18} />
                    Address Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Village/Town, Post Office"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        District *
                      </label>
                      <select
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select District</option>
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
                        required
                        value={formData.block}
                        onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter block name"
                      />
                    </div>
                  </div>
                </div>

                {/* Farm & Experience Information */}
                <div>
                  <h4 className="text-slate-800 mb-4 flex items-center gap-2">
                    <FileText size={18} />
                    Farm & Experience Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Farming Experience *
                      </label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Experience</option>
                        <option value="beginner">Beginner (0-2 years)</option>
                        <option value="intermediate">Intermediate (2-5 years)</option>
                        <option value="experienced">Experienced (5+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Farm Size/Animals *
                      </label>
                      <select
                        required
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Farm Size</option>
                        <option value="1-3">1-3 animals</option>
                        <option value="4-10">4-10 animals</option>
                        <option value="11-20">11-20 animals</option>
                        <option value="20+">20+ animals</option>
                        <option value="planning">Planning to start</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Purpose of Training *
                      </label>
                      <textarea
                        required
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Why do you want to attend this training?"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Requirements (for online/hybrid) */}
                {(training.type === 'online' || training.type === 'hybrid') && (
                  <div>
                    <h4 className="text-slate-800 mb-4 flex items-center gap-2">
                      <CheckCircle size={18} />
                      Technical Requirements
                    </h4>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasLaptop === 'yes'}
                          onChange={(e) => setFormData({ ...formData, hasLaptop: e.target.checked ? 'yes' : 'no' })}
                          className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            I have access to a smartphone/laptop with internet connection
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Required for {training.type} training sessions
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                <div>
                  <h4 className="text-slate-800 mb-4 flex items-center gap-2">
                    <IndianRupee size={18} />
                    Payment Details
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Original Fees:</span>
                        <span className="text-sm text-slate-900 line-through">₹{training.fees.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Government Subsidy ({training.subsidy}%):</span>
                        <span className="text-sm text-green-600">- ₹{(training.fees - training.netFees).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-green-200">
                        <span className="text-base font-medium text-slate-900">Amount Payable:</span>
                        <span className="text-xl font-mono font-bold text-green-600">₹{training.netFees.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Payment Mode *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="online"
                            checked={formData.paymentMode === 'online'}
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Online Payment (UPI/Card/Net Banking)</p>
                            <p className="text-xs text-slate-600">Instant confirmation</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="offline"
                            checked={formData.paymentMode === 'offline'}
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Pay at Training Center</p>
                            <p className="text-xs text-slate-600">Pay on first day of training</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-medium mb-1">Important Information:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Registration is subject to seat availability</li>
                        <li>• Minimum 75% attendance required for certificate</li>
                        <li>• Registration fee is non-refundable</li>
                        <li>• You will receive confirmation via SMS and email</li>
                        <li>• Carry a valid ID proof on the first day</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press"
                  >
                    {formData.paymentMode === 'online' ? 'Proceed to Payment' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Confirmation Screen
            <div>
              {/* Success Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 sm:p-8 rounded-t-2xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-white mb-2">Registration Successful!</h3>
                <p className="text-sm text-green-50">ପଞ୍ଜୀକରଣ ସଫଳ ହେଲା!</p>
              </div>

              {/* Confirmation Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="text-center">
                  <p className="text-lg text-slate-900 mb-2">
                    Thank you for registering, <strong>{formData.farmerName}</strong>!
                  </p>
                  <p className="text-sm text-slate-600">
                    Your registration has been confirmed for:
                  </p>
                  <p className="text-base font-medium text-green-700 mt-2">
                    {training.title}
                  </p>
                </div>

                {/* Registration Summary */}
                <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <h4 className="text-slate-800 mb-4">Registration Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Registration ID:</span>
                      <span className="text-sm font-mono font-medium text-slate-900">
                        REG-{Date.now().toString().slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Training Start Date:</span>
                      <span className="text-sm font-medium text-slate-900">
                        {new Date(training.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Fees Paid/Payable:</span>
                      <span className="text-sm font-medium text-green-600">₹{training.netFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Contact:</span>
                      <span className="text-sm font-medium text-slate-900">{formData.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="text-slate-800 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-blue-600" />
                    Next Steps
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">1.</span>
                      <span>You will receive a confirmation SMS and email within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">2.</span>
                      <span>Training materials will be shared 2 days before start date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">3.</span>
                      <span>Please carry a valid ID proof on the first day</span>
                    </li>
                    {formData.paymentMode === 'offline' && (
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">4.</span>
                        <span>Pay ₹{training.netFees.toLocaleString()} at the training center on first day</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Contact Support */}
                <div className="text-center text-sm text-slate-600">
                  <p className="mb-2">For any queries, contact:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={`tel:${training.contactPhone}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                      <Phone size={16} />
                      <span>{training.contactPhone}</span>
                    </a>
                    <a href={`mailto:${training.contactEmail}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <Mail size={16} />
                      <span className="break-all">{training.contactEmail}</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FileText size={18} />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
