import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Package,
  Truck,
  Shield,
  Award,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { MarketListing } from '../../data/marketData';

interface MarketDetailProps {
  listing: MarketListing;
  onBack: () => void;
}

export function MarketDetail({ listing, onBack }: MarketDetailProps) {
  const statusConfig = {
    available: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Available' },
    limited: { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock, label: 'Limited Stock' },
    sold: { bg: 'bg-red-50', text: 'text-red-700', icon: Package, label: 'Sold Out' }
  };

  const categoryConfig: Record<string, { gradient: string; icon: string }> = {
    livestock: { gradient: 'from-green-100 to-emerald-100', icon: '🐄' },
    dairy: { gradient: 'from-blue-100 to-cyan-100', icon: '🥛' },
    feed: { gradient: 'from-amber-100 to-orange-100', icon: '🌾' },
    equipment: { gradient: 'from-purple-100 to-pink-100', icon: '⚙️' },
    produce: { gradient: 'from-pink-100 to-rose-100', icon: '🌽' },
    services: { gradient: 'from-cyan-100 to-blue-100', icon: '🔧' }
  };

  const StatusIcon = statusConfig[listing.status].icon;
  const categoryStyle = categoryConfig[listing.category] || categoryConfig['livestock'];

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
            <h2 className="text-slate-900 mb-1">Listing Details</h2>
            <p className="text-sm text-slate-600 font-odia">ତାଲିକା ବିବରଣୀ</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 flex items-center justify-center transition-all">
              <Heart size={18} />
            </button>
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-white/30 items-center justify-center transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {listing.images.map((image, index) => (
            <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              <img 
                src={image} 
                alt={`${listing.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {listing.images.length === 0 && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-6xl">{categoryStyle.icon}</span>
            </div>
          )}
        </div>

        {/* Title & Badges */}
        <div className="flex flex-wrap items-start gap-2 mb-4">
          <h3 className="text-slate-900 flex-1 min-w-0">{listing.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusConfig[listing.status].bg} ${statusConfig[listing.status].text}`}>
            <StatusIcon size={14} />
            {statusConfig[listing.status].label}
          </span>
          {listing.verified && (
            <span className="px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center gap-1">
              <Shield size={14} />
              Verified
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 font-odia mb-4">{listing.titleOdia}</p>
        <p className="text-xs sm:text-sm text-slate-600 font-mono">Listing ID: {listing.listingId}</p>
      </div>

      {/* Price & Action */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-2">Price</p>
            <div className="flex items-baseline gap-2 mb-2">
              <IndianRupee size={28} className="text-green-600" />
              <span className="text-3xl sm:text-4xl font-mono font-medium text-green-900">
                {listing.price.toLocaleString()}
              </span>
              <span className="text-lg text-green-700">/{listing.unit}</span>
            </div>
            {listing.negotiable && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                Price is negotiable
              </p>
            )}
            {listing.minOrder && (
              <p className="text-xs text-slate-600 mt-2">
                Minimum order: {listing.minOrder} {listing.unit}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-3 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2">
              <Phone size={18} />
              <span>Call Seller</span>
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seller Information */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Award size={20} />
          Seller Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/50 rounded-xl">
            <p className="text-xs text-slate-600 mb-1">Seller Name</p>
            <p className="text-sm font-medium text-slate-900">{listing.sellerName}</p>
            <p className="text-sm text-slate-600 font-odia">{listing.sellerNameOdia}</p>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-green-600" />
              <p className="text-xs text-slate-600">Location</p>
            </div>
            <p className="text-sm font-medium text-slate-900">{listing.sellerLocation}</p>
            <p className="text-sm text-slate-600 font-odia">{listing.sellerLocationOdia}</p>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-blue-600" />
              <p className="text-xs text-slate-600">Phone Number</p>
            </div>
            <a href={`tel:${listing.sellerContact}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
              {listing.sellerContact}
            </a>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-purple-600" />
              <p className="text-xs text-slate-600">Email Address</p>
            </div>
            <a href={`mailto:${listing.sellerEmail}`} className="text-sm font-medium text-purple-600 hover:text-purple-700 break-all">
              {listing.sellerEmail}
            </a>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <p className="text-xs text-slate-600">Rating</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-medium text-slate-900">{listing.rating}/5</p>
              <p className="text-xs text-slate-600">({listing.reviews} reviews)</p>
            </div>
          </div>

          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-green-600" />
              <p className="text-xs text-slate-600">Listed Date</p>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {new Date(listing.listedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-slate-800 mb-4 flex items-center gap-2">
          <Info size={20} />
          Description
        </h3>
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-700">{listing.description}</p>
          <p className="text-sm sm:text-base text-slate-600 font-odia">{listing.descriptionOdia}</p>
        </div>
      </div>

      {/* Features & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Features */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle size={20} />
            Key Features
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-600 mb-3">English</p>
              <ul className="space-y-2">
                {listing.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-3 font-odia">ଓଡ଼ିଆ</p>
              <ul className="space-y-2">
                {listing.featuresOdia.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-odia">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Package size={20} />
            Specifications
          </h3>
          <div className="space-y-3">
            {listing.specifications.map((spec, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 mb-1">{spec.label}</p>
                    <p className="text-sm font-medium text-slate-900">{spec.value}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-slate-600 mb-1 font-odia">{spec.labelOdia}</p>
                    <p className="text-sm font-medium text-slate-900 font-odia">{spec.valueOdia}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Delivery */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Truck size={20} />
            Delivery Information
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-slate-900">
                  {listing.delivery.available ? 'Delivery Available' : 'Pickup Only'}
                </p>
                {listing.delivery.available && (
                  <CheckCircle size={16} className="text-green-600" />
                )}
              </div>
              {listing.delivery.available && (
                <>
                  <p className="text-sm text-slate-700 mb-1">
                    <span className="text-slate-600">Radius:</span> {listing.delivery.radius}
                  </p>
                  <p className="text-sm text-slate-700 mb-1">
                    <span className="text-slate-600">Charges:</span> {listing.delivery.charges}
                  </p>
                  <p className="text-sm text-slate-600 font-odia mt-3">
                    {listing.delivery.radiusOdia} - {listing.delivery.chargesOdia}
                  </p>
                </>
              )}
            </div>

            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-sm font-medium text-slate-900 mb-2">Availability</p>
              <p className="text-sm text-slate-700">
                Quantity Available: <span className="font-mono font-medium">{listing.quantityAvailable}</span> {listing.unit}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        {listing.certification && listing.certification.length > 0 && (
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <Award size={20} />
              Certifications
            </h3>
            <div className="space-y-2">
              {listing.certification.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                  <Shield size={16} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{cert}</p>
                    {listing.certificationOdia && listing.certificationOdia[index] && (
                      <p className="text-sm text-slate-600 font-odia">{listing.certificationOdia[index]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2">
              <Heart size={18} />
              <span>Save</span>
            </button>
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/30 transition-all flex items-center justify-center gap-2">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          <button className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all button-press">
            Contact Seller Now
          </button>
        </div>
      </div>

      {/* Warning */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900 mb-1">Safety Tips</p>
            <p className="text-sm text-amber-800">
              Always verify the seller's identity and product quality before making payment. 
              Meet in a safe public place and check all certifications. Never share your personal banking details.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
