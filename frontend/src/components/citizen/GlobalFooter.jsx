import { 
  ShieldCheck, Phone, Heart, Flame, 
  Globe, ExternalLink 
} from 'lucide-react';

const GlobalFooter = () => {
  const emergencyNumbers = [
    { name: 'Police', number: '100', icon: ShieldCheck, color: 'text-blue-400' },
    { name: 'Ambulance', number: '108', icon: Heart, color: 'text-emerald-400' },
    { name: 'Fire', number: '101', icon: Flame, color: 'text-orange-400' }
  ];

  const footerLinks = {
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'RTI Guidelines', href: '#' }
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'API Documentation', href: '#' },
      { name: 'Accessibility', href: '#' }
    ]
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'or', name: 'ଓଡ଼ିଆ' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 py-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-white text-lg">LokShikayat</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering citizens with transparent and efficient grievance redressal. 
              Your voice matters in building a better community.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Toggle */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                    ${index === 0 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Numbers Bar */}
        <div className="py-6 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Emergency Helplines
            </span>
            <div className="flex items-center gap-6">
              {emergencyNumbers.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.number}
                    href={`tel:${item.number}`}
                    className="flex items-center gap-2 group"
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <span className="text-xs text-slate-500 block">{item.name}</span>
                      <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.number}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2024 LokShikayat. An initiative under the Digital India Programme.
          </p>
          <div className="flex items-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png" 
              alt="Government of India Emblem" 
              className="h-8 opacity-50"
            />
            <span className="text-xs text-slate-500">
              Government of India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
