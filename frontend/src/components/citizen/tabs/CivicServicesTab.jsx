import { 
  Building, Trash2, FileCheck, UserCheck, 
  ArrowRight, Clock, CheckCircle2, ExternalLink,
  CreditCard, Truck, FileText, Shield
} from 'lucide-react';

// ==================== MOCK DATA ====================
const mockCivicServices = [
  {
    id: 1,
    title: 'Property Tax Payment',
    description: 'Pay your annual property tax online. View past payments and download receipts.',
    icon: CreditCard,
    category: 'Payments',
    status: 'available',
    estimatedTime: 'Instant',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Schedule Bulk Waste Pickup',
    description: 'Request collection for large items, construction debris, or bulk household waste.',
    icon: Truck,
    category: 'Sanitation',
    status: 'available',
    estimatedTime: '2-3 days',
    color: 'emerald'
  },
  {
    id: 3,
    title: 'Apply for Certificates',
    description: 'Request birth, death, income, or residence certificates online.',
    icon: FileText,
    category: 'Documentation',
    status: 'available',
    estimatedTime: '5-7 days',
    color: 'amber'
  },
  {
    id: 4,
    title: 'Verify Aadhaar/KYC',
    description: 'Link and verify your Aadhaar for faster grievance redressal and service access.',
    icon: Shield,
    category: 'Identity',
    status: 'available',
    estimatedTime: 'Instant',
    color: 'slate'
  },
  {
    id: 5,
    title: 'Building Plan Approval',
    description: 'Submit building plans for approval. Track application status and download permits.',
    icon: Building,
    category: 'Planning',
    status: 'coming_soon',
    estimatedTime: '15-30 days',
    color: 'indigo'
  },
  {
    id: 6,
    title: 'Trade License Renewal',
    description: 'Renew your trade license online. View compliance requirements and fees.',
    icon: FileCheck,
    category: 'Business',
    status: 'coming_soon',
    estimatedTime: '7-10 days',
    color: 'rose'
  }
];

const CivicServicesTab = () => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        icon: 'bg-blue-100 text-blue-600',
        hover: 'hover:border-blue-300 hover:shadow-blue-100/50'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        icon: 'bg-emerald-100 text-emerald-600',
        hover: 'hover:border-emerald-300 hover:shadow-emerald-100/50'
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        icon: 'bg-amber-100 text-amber-600',
        hover: 'hover:border-amber-300 hover:shadow-amber-100/50'
      },
      slate: {
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        icon: 'bg-slate-200 text-slate-600',
        hover: 'hover:border-slate-300 hover:shadow-slate-100/50'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        icon: 'bg-indigo-100 text-indigo-600',
        hover: 'hover:border-indigo-300 hover:shadow-indigo-100/50'
      },
      rose: {
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        icon: 'bg-rose-100 text-rose-600',
        hover: 'hover:border-rose-300 hover:shadow-rose-100/50'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 2xl:px-16 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Civic Services</h1>
        <p className="text-slate-500">
          Access municipal services, make payments, and apply for certificates - all in one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCivicServices.map((service) => {
          const Icon = service.icon;
          const colorClasses = getColorClasses(service.color);
          const isComingSoon = service.status === 'coming_soon';

          return (
            <div
              key={service.id}
              className={`
                bg-white rounded-2xl border transition-all duration-200 overflow-hidden group
                ${isComingSoon 
                  ? 'border-slate-200 opacity-75' 
                  : `${colorClasses.border} ${colorClasses.hover} hover:shadow-lg cursor-pointer`
                }
              `}
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isComingSoon ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      Available
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.estimatedTime}</span>
                  </div>
                  
                  {!isComingSoon && (
                    <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                      Access Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links Section */}
      <div className="mt-12 bg-slate-900 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Need Help?</h2>
            <p className="text-slate-400">
              Contact our support team or visit the nearest municipal office for in-person assistance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:1800-XXX-XXXX"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-colors"
            >
              Call Helpline
              <ExternalLink className="w-4 h-4" />
            </a>
            <button className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-700 transition-colors border border-slate-700">
              Find Nearest Office
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CivicServicesTab;
