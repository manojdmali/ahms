import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Edit, 
  Printer, 
  Calendar,
  Clock,
  User,
  Droplet,
  Thermometer,
  Beaker,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  TrendingUp,
  Activity
} from 'lucide-react';
import { DairyCollection } from '../../data/dairyCollectionData';

interface CollectionDetailProps {
  collection: DairyCollection;
  onBack: () => void;
}

export function CollectionDetail({ collection, onBack }: CollectionDetailProps) {
  const qualityConfig = {
    excellent: { bg: 'bg-green-50', text: 'text-green-700', icon: '⭐', label: 'Excellent' },
    good: { bg: 'bg-blue-50', text: 'text-blue-700', icon: '✓', label: 'Good' },
    average: { bg: 'bg-amber-50', text: 'text-amber-700', icon: '○', label: 'Average' },
    poor: { bg: 'bg-red-50', text: 'text-red-700', icon: '✗', label: 'Poor' }
  };

  const statusConfig = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertCircle, label: 'Pending' },
    approved: { bg: 'bg-blue-50', text: 'text-blue-700', icon: CheckCircle, label: 'Approved' },
    paid: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Paid' }
  };

  const StatusIcon = statusConfig[collection.status].icon;

  // Calculate CLR (Combined Lactometer Reading)
  const calculatedCLR = (collection.fat + collection.snf).toFixed(2);

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
            <h2 className="text-slate-900 mb-1">Collection Details</h2>
            <p className="text-sm text-slate-600 font-odia">ସଂଗ୍ରହ ବିବରଣୀ</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Edit size={18} />
              <span className="text-sm">Edit</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Download size={18} />
              <span className="text-sm">Download</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Printer size={18} />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Collection Info Header */}
        <div className="flex gap-6">
          {/* Icon */}
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 flex-shrink-0 flex items-center justify-center">
            <Droplet className="text-blue-600" size={48} />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-slate-900">{collection.farmerName}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${qualityConfig[collection.quality].bg} ${qualityConfig[collection.quality].text}`}>
                    {qualityConfig[collection.quality].icon} {qualityConfig[collection.quality].label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusConfig[collection.status].bg} ${statusConfig[collection.status].text}`}>
                    <StatusIcon size={14} />
                    {statusConfig[collection.status].label}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-odia mb-2">{collection.farmerNameOdia}</p>
                <p className="text-sm text-slate-600 font-mono">Collection ID: {collection.collectionId}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Farmer ID: {collection.farmerId}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} />
                <div>
                  <p className="text-slate-900">{new Date(collection.date).toLocaleDateString('en-IN', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} />
                <div>
                  <p className="text-slate-900 capitalize flex items-center gap-1">
                    {collection.session === 'morning' ? '🌅' : '🌆'} {collection.session}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} />
                <div>
                  <p className="text-slate-900">{collection.collectionCenter}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User size={16} />
                <div>
                  <p className="text-slate-900">{collection.collectorName}</p>
                  <p className="text-xs text-slate-500">Collector</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-blue-600" size={20} />
            <span className="text-sm text-slate-600">Quantity</span>
          </div>
          <p className="text-3xl text-slate-900 font-mono mb-1">{collection.quantity.toFixed(2)}L</p>
          <p className="text-xs text-slate-500">Milk Collected</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-600" size={20} />
            <span className="text-sm text-slate-600">Amount</span>
          </div>
          <p className="text-3xl text-slate-900 font-mono mb-1">₹{collection.totalAmount.toFixed(2)}</p>
          <p className="text-xs text-slate-500">@ ₹{collection.ratePerLiter.toFixed(2)}/L</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-sm text-slate-600">Fat Content</span>
          </div>
          <p className="text-3xl text-slate-900 font-mono mb-1">{collection.fat.toFixed(2)}%</p>
          <p className="text-xs text-slate-500">Fat Percentage</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-amber-600" size={20} />
            <span className="text-sm text-slate-600">SNF Content</span>
          </div>
          <p className="text-3xl text-slate-900 font-mono mb-1">{collection.snf.toFixed(2)}%</p>
          <p className="text-xs text-slate-500">Solid Not Fat</p>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Parameters */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Beaker size={20} />
            Quality Test Results
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Fat Percentage</span>
                <span className="text-2xl font-mono text-blue-600">{collection.fat.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(collection.fat / 6) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">SNF (Solid Not Fat)</span>
                <span className="text-2xl font-mono text-purple-600">{collection.snf.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${(collection.snf / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">CLR (Combined Lactometer Reading)</span>
                <span className="text-2xl font-mono text-green-600">{calculatedCLR}</span>
              </div>
              <p className="text-xs text-slate-500">Fat + SNF = {collection.fat.toFixed(2)} + {collection.snf.toFixed(2)}</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700 flex items-center gap-2">
                  <Thermometer size={16} />
                  Temperature
                </span>
                <span className="text-2xl font-mono text-orange-600">{collection.temperature.toFixed(2)}°C</span>
              </div>
              <p className="text-xs text-slate-500">
                {collection.temperature > 35 ? '⚠️ Above optimal range' : '✓ Within optimal range'}
              </p>
            </div>
          </div>

          {/* Quality Grade Badge */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Overall Quality Grade</p>
                <p className="text-2xl font-medium text-slate-900 capitalize flex items-center gap-2">
                  {qualityConfig[collection.quality].icon} {qualityConfig[collection.quality].label}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 mb-1">Rate per Liter</p>
                <p className="text-2xl font-mono text-green-600">₹{collection.ratePerLiter.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <DollarSign size={20} />
            Payment Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Quantity Collected:</span>
              <span className="text-slate-900 font-mono">{collection.quantity.toFixed(2)} Liters</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Rate per Liter:</span>
              <span className="text-slate-900 font-mono">₹{collection.ratePerLiter.toFixed(2)}/L</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Base Amount:</span>
              <span className="text-slate-900 font-mono">₹{collection.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Deductions:</span>
              <span className="text-slate-900 font-mono">₹0.00</span>
            </div>
            <div className="flex justify-between py-4 bg-green-50 -mx-6 px-6 rounded-xl">
              <span className="font-medium text-slate-900">Net Payable Amount:</span>
              <span className="text-2xl font-mono text-green-600">₹{collection.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Payment Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${statusConfig[collection.status].bg} ${statusConfig[collection.status].text}`}>
                  <StatusIcon size={12} />
                  {statusConfig[collection.status].label}
                </span>
              </div>
              {collection.paymentDate && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Payment Date:</span>
                  <span className="text-slate-900">
                    {new Date(collection.paymentDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              {collection.paymentMode && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Payment Mode:</span>
                  <span className="text-slate-900">{collection.paymentMode}</span>
                </div>
              )}
            </div>
          </div>

          {collection.status === 'pending' && (
            <div className="mt-6">
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press">
                Process Payment
              </button>
            </div>
          )}

          {collection.status === 'approved' && (
            <div className="mt-6">
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all button-press">
                Mark as Paid
              </button>
            </div>
          )}
        </div>

        {/* Collection Center Details */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Collection Center Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Center Name:</span>
              <span className="text-slate-900">{collection.collectionCenter}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Collector Name:</span>
              <span className="text-slate-900">{collection.collectorName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Collection Date:</span>
              <span className="text-slate-900">
                {new Date(collection.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Session:</span>
              <span className="text-slate-900 capitalize flex items-center gap-1">
                {collection.session === 'morning' ? '🌅' : '🌆'} {collection.session}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={20} />
            Additional Information
          </h3>
          
          {collection.remarks ? (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Remarks:</p>
              <p className="text-sm text-slate-900 p-3 bg-white/50 rounded-lg border border-slate-200">
                {collection.remarks}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic mb-4">No remarks added</p>
          )}

          <div className="space-y-2 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={14} className="text-green-600" />
              <span>Quality test completed</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={14} className="text-green-600" />
              <span>Temperature recorded</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={14} className="text-green-600" />
              <span>Payment calculation verified</span>
            </div>
            {collection.status === 'paid' && (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle size={14} className="text-green-600" />
                <span>Payment completed</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button className="w-full px-4 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all text-sm">
              Add Remark / Note
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2">
              <Download size={18} />
              Download Receipt
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2">
              <Printer size={18} />
              Print Receipt
            </button>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press">
            Send SMS to Farmer
          </button>
        </div>
      </div>
    </motion.div>
  );
}
