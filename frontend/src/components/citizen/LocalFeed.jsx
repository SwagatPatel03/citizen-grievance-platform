import { MapPin, AlertTriangle, Droplets, Zap } from 'lucide-react';

const LocalFeed = () => {
    // Mock data representing recent localized grievances
    const localIssues = [
        {
            id: 1,
            title: 'Deep Pothole on Main Arterial',
            location: 'Sector 4, Near KIIT Square',
            time: '2 hours ago',
            icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
            bg: 'bg-amber-100'
        },
        {
            id: 2,
            title: 'Water Pipeline Leakage',
            location: 'Patia Station Road',
            time: '5 hours ago',
            icon: <Droplets className="w-4 h-4 text-blue-500" />,
            bg: 'bg-blue-100'
        },
        {
            id: 3,
            title: 'Fallen Tree on Power Line',
            location: 'Khandagiri, Plot 42',
            time: '1 day ago',
            icon: <Zap className="w-4 h-4 text-red-500" />,
            bg: 'bg-red-100'
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-slate-700" />
                <h3 className="text-slate-800 font-semibold tracking-wide">In Your Area</h3>
            </div>

            <div className="divide-y divide-slate-100">
                {localIssues.map((issue) => (
                    <div key={issue.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${issue.bg}`}>
                                {issue.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 leading-tight">{issue.title}</h4>
                                <p className="text-xs text-slate-500 mt-1">{issue.location}</p>
                                <span className="text-[10px] font-medium text-slate-400 mt-2 block">{issue.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    View Interactive Map
                </button>
            </div>
        </div>
    );
};

export default LocalFeed;