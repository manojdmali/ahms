import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  IndianRupee,
  MapPin,
  Star,
  Award,
  CheckCircle,
  Phone,
  Mail,
  BookOpen,
  Target,
  List,
  Download,
  Share2,
  Video,
  Globe,
  Info
} from 'lucide-react';
import { Training } from '../../data/trainingData';
import { TrainingRegistrationModal } from './TrainingRegistrationModal';
import { formatDisplayDate } from '../../utils/dateFormat';

interface TrainingDetailProps {
  training: Training;
  onBack: () => void;
}

export function TrainingDetail({ training, onBack }: TrainingDetailProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const statusConfig = {
    'registration-open': { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Registration Open' },
    'upcoming': { bg: 'bg-blue-50', text: 'text-blue-700', icon: Clock, label: 'Upcoming' },
    'ongoing': { bg: 'bg-purple-50', text: 'text-purple-700', icon: Award, label: 'Ongoing' },
    'completed': { bg: 'bg-gray-50', text: 'text-gray-700', icon: Award, label: 'Completed' }
  };

  const typeIcons = {
    online: { icon: Video, label: 'Online', color: 'text-blue-600' },
    offline: { icon: MapPin, label: 'Offline', color: 'text-green-600' },
    hybrid: { icon: Globe, label: 'Hybrid', color: 'text-purple-600' }
  };

  const StatusIcon = statusConfig[training.status].icon;
  const TypeConfig = typeIcons[training.type];
  const TypeIcon = TypeConfig.icon;

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
            <h2 className="text-slate-900 mb-1">Training Details</h2>
            <p className="text-sm text-slate-600 font-odia">ତାଲିମ ବିବରଣୀ</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center gap-2 transition-all">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Title & Status */}
        <div className="flex flex-wrap items-start gap-2 mb-4">
          <h3 className="text-slate-900 flex-1 min-w-0">{training.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusConfig[training.status].bg} ${statusConfig[training.status].text}`}>
            <StatusIcon size={14} />
            {statusConfig[training.status].label}
          </span>
        </div>
        <p className="text-sm text-slate-600 font-odia mb-4">{training.titleOdia}</p>
        <p className="text-xs sm:text-sm text-slate-600 font-mono">Training ID: {training.trainingId}</p>
      </div>

      {/* Key Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className={TypeConfig.color} size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Mode</span>
          </div>
          <p className="text-base sm:text-lg text-slate-900 capitalize mb-1">{training.type}</p>
          <p className="text-xs text-slate-600">{TypeConfig.label} Training</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Duration</span>
          </div>
          <p className="text-base sm:text-lg text-slate-900 mb-1">{training.duration.split('(')[0]}</p>
          <p className="text-xs text-slate-600">{training.duration.match(/\(([^)]+)\)/)?.[1]}</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Seats</span>
          </div>
          <p className="text-base sm:text-lg text-slate-900 mb-1">{training.seatsAvailable}/{training.seatsTotal}</p>
          <p className="text-xs text-purple-600">Available</p>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-amber-600" size={20} />
            <span className="text-xs sm:text-sm text-slate-600">Rating</span>
          </div>
          <p className="text-base sm:text-lg text-slate-900 mb-1">{training.rating}/5</p>
          <p className="text-xs text-amber-600">{training.reviews} reviews</p>
        </div>
      </div>

      {/* Description & Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Info size={20} />
            About This Training
          </h3>
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-700">{training.description}</p>
            <p className="text-sm sm:text-base text-slate-600 font-odia">{training.descriptionOdia}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <IndianRupee size={20} />
            Fees & Registration
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-baseline gap-2 mb-2">
                <IndianRupee size={24} className="text-green-600" />
                <span className="text-3xl sm:text-4xl font-mono font-medium text-green-900">
                  {training.netFees.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-green-700 mb-2">After {training.subsidy}% subsidy</p>
              <p className="text-xs text-slate-600">Original Fees: ₹{training.fees.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Registration Deadline</p>
              <p className="text-sm font-medium text-slate-900">
                {formatDisplayDate(training.registrationDeadline)}
              </p>
            </div>

            <button 
              onClick={() => setShowRegistrationModal(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Instructor & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Award size={20} />
            Instructor Details
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Name</p>
              <p className="text-sm font-medium text-slate-900">{training.instructor}</p>
              <p className="text-sm text-slate-600 font-odia">{training.instructorOdia}</p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Qualification</p>
              <p className="text-sm text-slate-900">{training.instructorQualification}</p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Organization</p>
              <p className="text-sm font-medium text-slate-900">{training.organization}</p>
              <p className="text-sm text-slate-600 font-odia">{training.organizationOdia}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Schedule & Venue
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Start Date</p>
              <p className="text-sm font-medium text-slate-900">
                {formatDisplayDate(training.startDate)}
              </p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">End Date</p>
              <p className="text-sm font-medium text-slate-900">
                {formatDisplayDate(training.endDate)}
              </p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Schedule</p>
              <p className="text-sm text-slate-900">{training.schedule}</p>
              <p className="text-sm text-slate-600 font-odia">{training.scheduleOdia}</p>
            </div>

            {training.venue && (
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-green-600" />
                  <p className="text-xs text-slate-600">Venue</p>
                </div>
                <p className="text-sm font-medium text-slate-900">{training.venue}</p>
                <p className="text-sm text-slate-600 font-odia">{training.venueOdia}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Target size={20} />
          Learning Objectives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <ul className="space-y-2">
              {training.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {training.objectivesOdia.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Syllabus */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <List size={20} />
          Course Syllabus
        </h3>
        <div className="space-y-4">
          {training.syllabus.map((module, idx) => (
            <div key={idx} className="p-4 bg-white/50 rounded-xl">
              <h4 className="text-slate-900 mb-2">{module.module}</h4>
              <p className="text-sm text-slate-600 font-odia mb-3">{module.moduleOdia}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {module.topics.map((topic, tidx) => (
                  <li key={tidx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-green-600">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle size={20} />
            Prerequisites
          </h3>
          <ul className="space-y-2">
            {training.prerequisites.map((prereq, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-600 flex-shrink-0">✓</span>
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <ul className="space-y-2">
              {training.prerequisitesOdia.map((prereq, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                  <span className="text-blue-600 flex-shrink-0">✓</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Award size={20} />
            Benefits
          </h3>
          <ul className="space-y-2">
            {training.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-green-600 flex-shrink-0">★</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Materials & Certification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen size={20} />
            Training Materials
          </h3>
          <div className="space-y-2">
            {training.materials.map((material, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <Download size={16} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{material}</span>
              </div>
            ))}
          </div>
        </div>

        {training.certification && (
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <Award size={20} />
              Certification
            </h3>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Certificate Included</p>
                  <p className="text-xs text-slate-600">Upon completion</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-2">{training.certificationDetails}</p>
              <p className="text-sm text-slate-600 font-odia">{training.certificationDetailsOdia}</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 rounded-xl">
            <p className="text-xs text-slate-600 mb-2">Contact Person</p>
            <p className="text-sm font-medium text-slate-900">{training.contactPerson}</p>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-green-600" />
              <p className="text-xs text-slate-600">Phone</p>
            </div>
            <a href={`tel:${training.contactPhone}`} className="text-sm font-medium text-green-600 hover:text-green-700">
              {training.contactPhone}
            </a>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-blue-600" />
              <p className="text-xs text-slate-600">Email</p>
            </div>
            <a href={`mailto:${training.contactEmail}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all">
              {training.contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2">
              <Download size={18} />
              <span>Brochure</span>
            </button>
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          <button 
            onClick={() => setShowRegistrationModal(true)}
            className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press"
          >
            Register for This Training
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      <TrainingRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        training={training}
      />
    </motion.div>
  );
}
