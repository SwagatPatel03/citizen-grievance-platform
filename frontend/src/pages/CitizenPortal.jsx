import { useState, useEffect } from 'react';
import { PlusCircle, List, MapPin, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getCitizenComplaints } from '../services/api';
import ComplaintForm from '../components/citizen/ComplaintForm';
import NoticeBanner from '../components/citizen/NoticeBanner';
import LokMitraChat from '../components/citizen/LokMitraChat';
import LocalFeed from '../components/citizen/LocalFeed';
import EmergencyDirectory from '../components/citizen/EmergencyDirectory';
import CommandCenterHeader from '../components/citizen/CommandCenterHeader';

const CitizenPortal = () => {
    const [activeTab, setActiveTab] = useState('history');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const citizenId = localStorage.getItem('user_id');
    const citizenName = localStorage.getItem('user_name');

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await getCitizenComplaints(citizenId);
            setComplaints(response.data);
            if (response.data.length > 0) {
                setSelectedComplaint(response.data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch complaints", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (citizenId) fetchComplaints();
    }, [citizenId]);

    return (
        <div className="w-full flex flex-col min-h-screen bg-slate-50">
            {/* 1. EXTRACTED ENTERPRISE HEADER */}
            <CommandCenterHeader citizenName={citizenName} complaints={complaints} />

            {/* MAIN WORKSPACE WRAPPER */}
            <div className="w-full flex-grow flex flex-col">

                {/* 2. GLOBAL ALERT BANNER: Moved below the header to act as a bridge */}
                <NoticeBanner />

                {/* TOP NAV: Crisp white background with primary blue accents */}
                <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
                    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex">
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${
                                activeTab === 'history' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                        >
                            <List className="w-4 h-4" /> My Grievances
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${
                                activeTab === 'new' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" /> Lodge New Grievance
                        </button>
                        <button
                            onClick={() => setActiveTab('community')}
                            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${
                                activeTab === 'community' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                        >
                            <MapPin className="w-4 h-4" /> My Community
                        </button>
                    </div>
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex-grow max-w-[100rem] mx-auto w-full px-4 sm:px-8 lg:px-12 py-8">

                    {/* === TAB 1: HISTORY === */}
                    {activeTab === 'history' && (
                        <div className="flex w-full h-[650px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            {/* Left Side: The Master List */}
                            <div className="w-1/3 border-r border-slate-200 overflow-y-auto bg-slate-50/50">
                                {loading ? (
                                    <div className="p-8 text-center text-slate-500">Loading records...</div>
                                ) : complaints.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">No grievances found.</div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {complaints.map(complaint => (
                                            <div
                                                key={complaint.id}
                                                onClick={() => setSelectedComplaint(complaint)}
                                                className={`p-5 cursor-pointer transition-all border-l-4 ${
                                                    selectedComplaint?.id === complaint.id ? 'bg-blue-50/50 border-[#000080]' : 'border-transparent hover:bg-slate-100'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`font-semibold line-clamp-1 ${selectedComplaint?.id === complaint.id ? 'text-[#000080]' : 'text-slate-800'}`}>
                                                        {complaint.title}
                                                    </h3>
                                                    <span className="text-xs font-mono text-slate-400">#{complaint.id}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-3">{complaint.departmentName || 'Assigned'}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                                        complaint.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {complaint.status}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-400">
                                                        {new Date(complaint.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Side: The Detail View */}
                            <div className="w-2/3 p-10 overflow-y-auto bg-white">
                                {selectedComplaint ? (
                                    <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
                                        <div className="flex items-center gap-2 text-[#000080] text-sm font-bold mb-4 uppercase tracking-wider">
                                            <span>Ticket #{selectedComplaint.id}</span>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                            <span className="text-slate-500">{selectedComplaint.departmentName}</span>
                                        </div>

                                        <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">{selectedComplaint.title}</h2>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10 text-slate-700 leading-relaxed text-lg shadow-sm">
                                            {selectedComplaint.description}
                                        </div>

                                        {/* Timeline */}
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Resolution Timeline</h3>
                                        <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#000080] before:via-slate-200 before:to-transparent">

                                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#000080] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                                                    <div className="font-bold text-slate-900">Grievance Submitted</div>
                                                    <div className="text-sm text-slate-500 mt-1">{new Date(selectedComplaint.createdAt).toLocaleString()}</div>
                                                </div>
                                            </div>

                                            {selectedComplaint.status === 'RESOLVED' && (
                                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-emerald-500 text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-emerald-100 bg-emerald-50 shadow-sm">
                                                        <div className="font-bold text-emerald-800">Issue Resolved</div>
                                                        <div className="text-sm text-emerald-600 mt-1">Official has marked this closed.</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                        <FileText className="w-16 h-16 mb-6 text-slate-200" />
                                        <p className="text-lg">Select a grievance from the list to view details.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* === TAB 2: NEW GRIEVANCE === */}
                    {activeTab === 'new' && (
                        <div className="w-full animate-in fade-in duration-300">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Side (70%): The Form */}
                                <div className="lg:w-2/3 xl:w-3/4">
                                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                        <ComplaintForm
                                            onComplaintSubmitted={fetchComplaints}
                                            onSuccessSwitchTab={() => setActiveTab('history')}
                                        />
                                    </div>
                                </div>

                                {/* 3. Right Side (30%): Guidelines removed, Feed & Directory injected */}
                                <div className="lg:w-1/3 xl:w-1/4">
                                    <div className="sticky top-24 flex flex-col gap-6">
                                        {/* Injecting the local community context right next to the form */}
                                        <LocalFeed />

                                        {/* Emergency directory provides an immediate alternative to filling out a form */}
                                        <EmergencyDirectory />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === TAB 3: COMMUNITY === */}
                    {activeTab === 'community' && (
                        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-12">
                            <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-300">
                                <MapPin className="w-16 h-16 text-blue-100 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Civic Updates</h2>
                                <p className="text-slate-500 text-lg mb-8">Recent resolutions and official broadcasts for your community.</p>
                                <div className="p-12 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl text-slate-400 font-medium">
                                    Community Feed integration coming soon...
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
                <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-400">
                    <div>LokShikayat © 2026 • Official Portal</div>
                    <div className="flex gap-6">
                        <a href="tel:100" className="hover:text-white transition-colors">Police: 100</a>
                        <a href="tel:108" className="hover:text-white transition-colors">Ambulance: 108</a>
                        <a href="tel:101" className="hover:text-white transition-colors">Fire: 101</a>
                    </div>
                </div>
            </footer>

            <LokMitraChat />
        </div>
    );
};

export default CitizenPortal;