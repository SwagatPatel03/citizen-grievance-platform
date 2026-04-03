import {BellRing, Megaphone, Calendar} from "lucide-react";

const NoticeBoard = () => {
    // For the MVP, we use static data tailored to localized civic events.
    const notices = [
        {
            id: 1,
            type: 'alert',
            title: 'Scheduled Maintenance',
            description: 'BMC announces smart-LED street light maintenance in Patia and Khandagiri areas this weekend. Expect temporary outages.',
            date: 'April 4, 2026',
            icon: <BellRing className="w-4 h-4 text-amber-600" />
        },
        {
            id: 2,
            type: 'info',
            title: 'Digital KYC Mandate',
            description: 'State authorities mandate digital KYC linking for all registered users for rapid grievance redressal starting next month.',
            date: 'April 2, 2026',
            icon: <Megaphone className="w-4 h-4 text-blue-600" />
        },
        {
            id: 3,
            type: 'event',
            title: 'E-Waste Collection Drive',
            description: 'Drop off old electronics at designated university zones or municipal ward offices this Sunday.',
            date: 'March 28, 2026',
            icon: <Calendar className="w-4 h-4 text-green-600"/>
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold tracking-wide">Official Broadcasts</h3>
            </div>

            <div className="divide-y divide-slate-100">
                {notices.map((notice) => (
                    <div key={notice.id} className="p-5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                                notice.type === 'alert' ? 'bg-amber-100' : notice.type === 'info' ? 'bg-blue-100' : 'bg-green-100'
                            }`}>
                                {notice.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">{notice.title}</h4>
                                <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">{notice.description}</p>
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{notice.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeBoard;