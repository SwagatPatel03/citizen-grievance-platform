import { useState, useEffect } from 'react';
import { ShieldCheck, ListTodo, Megaphone, Activity, CheckCircle } from 'lucide-react';
import QueueManagementTab from '../components/officer/QueueManagementTab';
import CommunityBroadcastTab from '../components/officer/QueueManagementTab'; // Ensure you have this from earlier!
import { getDepartmentComplaints } from '../services/api.jsx';

const OfficerPortal = () => {
    const [activeTab, setActiveTab] = useState('queue');
    const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

    const officerName = localStorage.getItem('user_name') || "Officer";
    const departmentId = 1; // You will dynamically set this from the JWT later

    // Fetch stats for the header
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDepartmentComplaints(departmentId);
                const complaints = response.data;
                setStats({
                    total: complaints.length,
                    resolved: complaints.filter(c => c.status === 'RESOLVED').length,
                    pending: complaints.filter(c => c.status !== 'RESOLVED').length
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, [departmentId]);

    return (
        <div className="w-full flex flex-col min-h-screen bg-slate-50">

            {/* ENTERPRISE HEADER */}
            <div className="w-full relative overflow-hidden bg-[#0B1120] border-b border-slate-800 pt-10 pb-10">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-[#000080]" />
                            Department Command
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium">Welcome, {officerName}. Manage operations and community outreach.</p>
                    </div>

                    {/* Live Stats */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="bg-slate-800/60 backdrop-blur shadow-sm border border-slate-700/50 px-5 py-3 rounded-xl flex items-center gap-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg"><Activity className="w-5 h-5 text-amber-400" /></div>
                            <div>
                                <div className="text-2xl font-bold text-white leading-none">{stats.pending}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Pending Action</div>
                            </div>
                        </div>
                        <div className="bg-slate-800/60 backdrop-blur shadow-sm border border-slate-700/50 px-5 py-3 rounded-xl flex items-center gap-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg"><CheckCircle className="w-5 h-5 text-emerald-400" /></div>
                            <div>
                                <div className="text-2xl font-bold text-white leading-none">{stats.resolved}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Resolved</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN WORKSPACE */}
            <div className="w-full flex-grow flex flex-col">

                {/* TOP NAV TABS */}
                <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
                    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex">
                        <button onClick={() => setActiveTab('queue')} className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === 'queue' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                            <ListTodo className="w-4 h-4" /> Queue Management
                        </button>
                        <button onClick={() => setActiveTab('broadcast')} className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === 'broadcast' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                            <Megaphone className="w-4 h-4" /> Community Broadcast
                        </button>
                    </div>
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex-grow max-w-[100rem] mx-auto w-full px-4 sm:px-8 lg:px-12 py-8">
                    {activeTab === 'queue' && <QueueManagementTab departmentId={departmentId} />}
                    {activeTab === 'broadcast' && <CommunityBroadcastTab />}
                </div>
            </div>
        </div>
    );
};

export default OfficerPortal;