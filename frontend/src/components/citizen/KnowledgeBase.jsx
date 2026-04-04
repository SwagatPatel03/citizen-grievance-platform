import { BookOpen, Clock, CheckCircle, Info } from 'lucide-react';

const KnowledgeBase = () => {
    const guidelines = [
        {
            icon: <Clock className="w-5 h-5 text-blue-500" />,
            title: "Expected Timelines",
            text: "Electricity issues (24h), Water supply (48h), Road repairs (7-14 days). Please wait for the SLA to expire before reopening a ticket."
        },
        {
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            title: "Provide Exact Locations",
            text: "Always use the 'Detect Location' button or provide precise landmarks. Tickets with vague addresses may be delayed."
        },
        {
            icon: <Info className="w-5 h-5 text-amber-500" />,
            title: "Avoid Duplicates",
            text: "If you see your issue already listed on the Notice Board (e.g., scheduled maintenance), please do not file a new grievance."
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-700" />
                <h3 className="text-slate-800 font-semibold tracking-wide">Filing Guidelines</h3>
            </div>

            <div className="p-5 space-y-6">
                {guidelines.map((guide, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md">
                            {guide.icon}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-1">{guide.title}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{guide.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeBase;