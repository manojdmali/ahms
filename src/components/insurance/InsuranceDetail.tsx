import { motion } from 'motion/react';
import {
  ArrowLeft,
  Shield,
  IndianRupee,
  TrendingUp,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  Share2,
  Phone,
  Mail,
  Building,
  Award,
  List,
  ClipboardCheck,
  Info,
  Star,
  Users,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Insurance } from '../../data/insuranceData';
import { formatDisplayDate } from '../../utils/dateFormat';

interface InsuranceDetailProps {
  insurance: Insurance;
  onBack: () => void;
}

export function InsuranceDetail({ insurance, onBack }: InsuranceDetailProps) {
  const statusConfig = {
    active: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Active' },
    popular: { bg: 'bg-purple-50', text: 'text-purple-700', icon: TrendingUp, label: 'Popular' },
    new: { bg: 'bg-blue-50', text: 'text-blue-700', icon: AlertCircle, label: 'New' }
  };

  const categoryConfig: Record<string, { bg: string; gradient: string; icon: string }> = {
    livestock: { bg: 'bg-green-100', gradient: 'from-green-100 to-emerald-100', icon: '🐄' },
    dairy: { bg: 'bg-blue-100', gradient: 'from-blue-100 to-cyan-100', icon: '🥛' },
    poultry: { bg: 'bg-amber-100', gradient: 'from-amber-100 to-orange-100', icon: '🐔' },
    comprehensive: { bg: 'bg-purple-100', gradient: 'from-purple-100 to-pink-100', icon: '🛡️' },
    health: { bg: 'bg-pink-100', gradient: 'from-pink-100 to-rose-100', icon: '❤️' },
    accident: { bg: 'bg-red-100', gradient: 'from-red-100 to-orange-100', icon: '⚠️' }
  };

  const StatusIcon = statusConfig[insurance.status].icon;
  const categoryStyle = categoryConfig[insurance.category] || categoryConfig['livestock'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="glass-card-darker rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-slate-900 mb-1">Insurance Details</h2>
            <p className="text-sm text-slate-600 font-odia">ବୀମା ବିବରଣୀ</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Download size={18} />
              <span className="text-sm">Download</span>
            </button>
          </div>
        </div>

        {/* Insurance Info Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Icon */}
          <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${categoryStyle.gradient} flex-shrink-0 flex items-center justify-center mx-auto sm:mx-0`}>
            <span className="text-5xl sm:text-6xl">{categoryStyle.icon}</span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-2 sm:mb-4">
              <h3 className="text-slate-900 text-lg sm:text-xl">{insurance.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 ${statusConfig[insurance.status].bg} ${statusConfig[insurance.status].text}`}>
                <StatusIcon size={14} />
                {statusConfig[insurance.status].label}
              </span>
            </div>
            <p className="text-sm text-slate-600 font-odia mb-2">{insurance.nameOdia}</p>
            <p className="text-sm text-slate-700 mb-2">{insurance.provider}</p>
            <p className="text-xs sm:text-sm text-slate-600 font-mono">Policy ID: {insurance.policyId}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Star size={16} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Rating</p>
                  <p className="text-slate-900">{insurance.rating}/5</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Active</p>
                  <p className="text-slate-900">{insurance.activePolicies.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp size={16} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Settlement</p>
                  <p className="text-slate-900">{insurance.claimSettlementRatio}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Tenure</p>
                  <p className="text-slate-900 text-xs">{insurance.tenure}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-green-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Coverage</span>
          </div>
          <p className="text-xl sm:text-2xl text-slate-900 mb-1">₹{(insurance.coverageAmount / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600">Maximum coverage</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-blue-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Premium</span>
          </div>
          <p className="text-xl sm:text-2xl text-slate-900 mb-1">₹{insurance.netPremium.toFixed(2)}</p>
          <p className="text-xs text-blue-600">After {insurance.subsidyPercentage}% subsidy</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-purple-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Subsidy</span>
          </div>
          <p className="text-xl sm:text-2xl text-slate-900 mb-1">{insurance.subsidyPercentage}%</p>
          <p className="text-xs text-purple-600">Government support</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-amber-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Settlement</span>
          </div>
          <p className="text-xl sm:text-2xl text-slate-900 mb-1">{insurance.claimSettlementRatio}%</p>
          <p className="text-xs text-amber-600">Success rate</p>
        </div>
      </div>

      {/* Overview and Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Overview */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Info size={20} />
            Policy Overview
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-700 mb-2">{insurance.description}</p>
              <p className="text-sm text-slate-600 font-odia">{insurance.descriptionOdia}</p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Tenure</p>
                  <p className="text-slate-900">{insurance.tenure}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Active Policies</p>
                  <p className="text-slate-900">{insurance.activePolicies.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Claims</p>
                  <p className="text-slate-900">{insurance.totalClaims}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <p className="text-slate-900">{insurance.rating} ({insurance.reviews})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Phone size={20} />
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Contact Person</p>
              <p className="text-sm font-medium text-slate-900">{insurance.contactPerson}</p>
            </div>

            <div className="p-3 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-green-600" />
                <p className="text-xs text-slate-600">Phone Number</p>
              </div>
              <a href={`tel:${insurance.contactPhone}`} className="text-sm font-medium text-green-600 hover:text-green-700">
                {insurance.contactPhone}
              </a>
            </div>

            <div className="p-3 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-blue-600" />
                <p className="text-xs text-slate-600">Email Address</p>
              </div>
              <a href={`mailto:${insurance.contactEmail}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all">
                {insurance.contactEmail}
              </a>
            </div>

            <div className="p-3 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Building size={16} className="text-purple-600" />
                <p className="text-xs text-slate-600">Provider</p>
              </div>
              <p className="text-sm text-slate-900">{insurance.provider}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Award size={20} />
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-xs text-slate-600 mb-3">English</p>
            <ul className="space-y-2">
              {insurance.features.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-3 font-odia">ଓଡ଼ିଆ</p>
            <ul className="space-y-2">
              {insurance.featuresOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Shield size={20} />
          What's Covered
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <ul className="space-y-2">
              {insurance.coverage.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {insurance.coverageOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Exclusions */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <XCircle size={20} />
          What's Not Covered
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <ul className="space-y-2">
              {insurance.exclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {insurance.exclusionsOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <ClipboardCheck size={20} />
          Eligibility Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <ul className="space-y-2">
              {insurance.eligibility.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {insurance.eligibilityOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Documents & Claim Process */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Documents */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={20} />
            Required Documents
          </h3>
          <div className="space-y-2">
            {insurance.documents.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-white/50 rounded-lg">
                <FileText size={16} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Process */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <List size={20} />
            Claim Process
          </h3>
          <div className="space-y-3">
            {insurance.claimProcess.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <Download size={18} />
              <span>Download</span>
            </button>
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <Printer size={18} />
              <span>Print</span>
            </button>
          </div>
          <button className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press text-sm sm:text-base">
            Buy This Policy
          </button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-xs sm:text-sm text-slate-500">
        Last updated: {formatDisplayDate(insurance.lastUpdated)}
      </div>
    </motion.div>
  );
}
