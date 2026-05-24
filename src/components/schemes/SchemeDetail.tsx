import { motion } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Users,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertCircle,
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
  TrendingUp
} from 'lucide-react';
import { GovernmentScheme } from '../../data/governmentSchemesData';
import { formatDisplayDate } from '../../utils/dateFormat';

interface SchemeDetailProps {
  scheme: GovernmentScheme;
  onBack: () => void;
}

export function SchemeDetail({ scheme, onBack }: SchemeDetailProps) {
  const statusConfig = {
    active: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Active' },
    upcoming: { bg: 'bg-blue-50', text: 'text-blue-700', icon: Clock, label: 'Upcoming' },
    closed: { bg: 'bg-red-50', text: 'text-red-700', icon: AlertCircle, label: 'Closed' }
  };

  const categoryConfig: Record<string, { bg: string; gradient: string; icon: string }> = {
    subsidy: { 
      bg: 'bg-green-100',
      gradient: 'from-green-100 to-emerald-100',
      icon: '💰'
    },
    insurance: {
      bg: 'bg-blue-100',
      gradient: 'from-blue-100 to-cyan-100',
      icon: '🛡️'
    },
    training: {
      bg: 'bg-purple-100',
      gradient: 'from-purple-100 to-pink-100',
      icon: '📚'
    },
    infrastructure: {
      bg: 'bg-orange-100',
      gradient: 'from-orange-100 to-amber-100',
      icon: '🏗️'
    },
    welfare: {
      bg: 'bg-pink-100',
      gradient: 'from-pink-100 to-rose-100',
      icon: '❤️'
    },
    dairy: {
      bg: 'bg-cyan-100',
      gradient: 'from-cyan-100 to-blue-100',
      icon: '🥛'
    }
  };

  const StatusIcon = statusConfig[scheme.status].icon;
  const categoryStyle = categoryConfig[scheme.category] || categoryConfig['subsidy'];

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
            <h2 className="text-slate-900 mb-1">Scheme Details</h2>
            <p className="text-sm text-slate-600 font-odia">ଯୋଜନା ବିବରଣୀ</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
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

        {/* Scheme Info Header */}
        <div className="flex gap-6">
          {/* Icon */}
          <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${categoryStyle.gradient} flex-shrink-0 flex items-center justify-center`}>
            <span className="text-6xl">{categoryStyle.icon}</span>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-slate-900">{scheme.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusConfig[scheme.status].bg} ${statusConfig[scheme.status].text}`}>
                    <StatusIcon size={14} />
                    {statusConfig[scheme.status].label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${categoryStyle.bg}`}>
                    {categoryStyle.icon} {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-odia mb-2">{scheme.nameOdia}</p>
                <p className="text-sm text-slate-600 font-mono">Scheme ID: {scheme.schemeId}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} />
                <div>
                  <p className="text-xs text-slate-500">Launched</p>
                  <p className="text-slate-900">{formatDisplayDate(scheme.launchedDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} />
                <div>
                  <p className="text-xs text-slate-500">Beneficiaries</p>
                  <p className="text-slate-900">{scheme.beneficiaries.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <IndianRupee size={16} />
                <div>
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="text-slate-900">₹{(scheme.budget / 10000000).toFixed(2)}Cr</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Building size={16} />
                <div>
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-slate-900 text-xs">{scheme.department.split(' ').slice(0, 3).join(' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-4 gap-4">
        {(scheme.subsidyAmount || scheme.coverageAmount) && (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="text-green-600" size={20} />
              <span className="text-sm text-slate-600">Benefit Amount</span>
            </div>
            <p className="text-2xl text-slate-900 mb-1">{scheme.subsidyAmount || scheme.coverageAmount}</p>
            <p className="text-xs text-green-600">Per beneficiary</p>
          </div>
        )}

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-600" size={20} />
            <span className="text-sm text-slate-600">Total Beneficiaries</span>
          </div>
          <p className="text-2xl text-slate-900 mb-1">{scheme.beneficiaries.toLocaleString()}</p>
          <p className="text-xs text-blue-600">Farmers enrolled</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-sm text-slate-600">Budget Allocated</span>
          </div>
          <p className="text-2xl text-slate-900 mb-1">₹{(scheme.budget / 10000000).toFixed(2)}Cr</p>
          <p className="text-xs text-purple-600">Total allocation</p>
        </div>

        {scheme.applicationDeadline && (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-amber-600" size={20} />
              <span className="text-sm text-slate-600">Deadline</span>
            </div>
            <p className="text-2xl text-slate-900 mb-1">
              {formatDisplayDate(scheme.applicationDeadline)}
            </p>
            <p className="text-xs text-amber-600">Apply before</p>
          </div>
        )}
      </div>

      {/* Overview and Target */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Info size={20} />
            Scheme Overview
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-700 mb-2">{scheme.description}</p>
              <p className="text-sm text-slate-600 font-odia">{scheme.descriptionOdia}</p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className="text-green-600" />
                <p className="text-sm font-medium text-slate-900">Target Audience</p>
              </div>
              <p className="text-sm text-slate-700">{scheme.targetAudience}</p>
              <p className="text-sm text-slate-600 font-odia">{scheme.targetAudienceOdia}</p>
            </div>

            {scheme.duration && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-blue-600" />
                  <p className="text-sm font-medium text-slate-900">Duration</p>
                </div>
                <p className="text-sm text-slate-700">{scheme.duration}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Phone size={20} />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Contact Person</p>
              <p className="text-sm font-medium text-slate-900">{scheme.contactPerson}</p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-green-600" />
                <p className="text-xs text-slate-600">Phone Number</p>
              </div>
              <a href={`tel:${scheme.contactPhone}`} className="text-sm font-medium text-green-600 hover:text-green-700">
                {scheme.contactPhone}
              </a>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-blue-600" />
                <p className="text-xs text-slate-600">Email Address</p>
              </div>
              <a href={`mailto:${scheme.contactEmail}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {scheme.contactEmail}
              </a>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Building size={16} className="text-purple-600" />
                <p className="text-xs text-slate-600">Department</p>
              </div>
              <p className="text-sm text-slate-900">{scheme.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <ClipboardCheck size={20} />
          Eligibility Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-600 mb-3">English</p>
            <ul className="space-y-2">
              {scheme.eligibility.map((item, index) => (
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
              {scheme.eligibilityOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Award size={20} />
          Scheme Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-600 mb-3">English</p>
            <ul className="space-y-2">
              {scheme.benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-3 font-odia">ଓଡ଼ିଆ</p>
            <ul className="space-y-2">
              {scheme.benefitsOdia.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Required Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-600 mb-3">English</p>
            <div className="space-y-2">
              {scheme.documents.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-3 font-odia">ଓଡ଼ିଆ</p>
            <div className="space-y-2">
              {scheme.documentsOdia.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-sm text-slate-700 font-odia">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <List size={20} />
          How to Apply
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-600 mb-3">English</p>
            <div className="space-y-3">
              {scheme.applicationProcess.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 pt-1">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-3 font-odia">ଓଡ଼ିଆ</p>
            <div className="space-y-3">
              {scheme.applicationProcessOdia.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 font-odia pt-1">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2">
              <Download size={18} />
              Download Guidelines
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center gap-2">
              <Printer size={18} />
              Print Details
            </button>
          </div>
          {scheme.status === 'active' && (
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press">
              Apply for This Scheme
            </button>
          )}
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-slate-500">
        Last updated: {formatDisplayDate(scheme.lastUpdated)}
      </div>
    </motion.div>
  );
}
