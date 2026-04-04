import { Phone, ShieldAlert, HeartPulse, Flame } from 'lucide-react';

const EmergencyDirectory = () => {
    const contacts = [
        { name: 'Police Control Room', number: '100', icon: <ShieldAlert className="w-4 h-4 text-white" />, color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
        { name: 'Ambulance & Health', number: '108', icon: <HeartPulse className="w-4 h-4 text-white" />, color: 'bg-green-600', hover: 'hover:bg-green-700' },
        { name: 'Fire & Rescue', number: '101', icon: <Flame className="w-4 h-4 text-white" />, color: 'bg-red-600', hover: 'hover:bg-red-700' },
        { name: 'Women Helpline', number: '1091', icon: <Phone className="w-4 h-4 text-white" />, color: 'bg-pink-600', hover: 'hover:bg-pink-700' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-slate-800 font-semibold tracking-wide">Quick Emergency Dial</h3>
                <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
            </div>

            <div className="p-5 space-y-3">
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={`tel:${contact.number}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${contact.color} shadow-sm group-hover:scale-105 transition-transform`}>
                                {contact.icon}
                            </div>
                            <span className="font-medium text-sm text-slate-700 group-hover:text-slate-900">{contact.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 tracking-wider">
              {contact.number}
            </span>
                    </a>
                ))}
                <p className="text-[11px] text-center text-slate-400 mt-4 leading-tight">
                    Tap a number to dial directly from your mobile device. For non-emergencies, please lodge a grievance.
                </p>
            </div>
        </div>
    );
};

export default EmergencyDirectory;