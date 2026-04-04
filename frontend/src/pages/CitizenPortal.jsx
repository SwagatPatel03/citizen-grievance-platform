import { useState, useEffect } from 'react';
import { PlusCircle, List } from 'lucide-react';
import { getCitizenComplaints } from '../services/api';
import ComplaintForm from '../components/citizen/ComplaintForm';
import ComplaintList from '../components/citizen/ComplaintList';
import NoticeBoard from '../components/citizen/NoticeBoard';
import EmergencyDirectory from '../components/citizen/EmergencyDirectory';
import CivicImpactStats from '../components/citizen/CivicImpactStats';
import KnowledgeBase from '../components/citizen/KnowledgeBase';
import RatingBanner from '../components/citizen/RatingBanner';
import LocalFeed from "../components/citizen/LocalFeed.jsx";
import LokMitraChat from "../components/citizen/LokMitraChat.jsx";

const CitizenPortal = () => {
    const [activeTab, setActiveTab] = useState('history');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const citizenId = localStorage.getItem('user_id');
    const citizenName = localStorage.getItem('user_name');

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await getCitizenComplaints(citizenId);
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch complaints", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (citizenId) fetchComplaints();
    }, [citizenId]);

    // Determine if we should show the rating banner (if any complaint is RESOLVED)
    const hasResolvedComplaint = complaints.some(c => c.status === 'RESOLVED');

    return (
        // 1. TRUE FLUID WRAPPER: Removed all max-w caps. Uses dynamic padding to hug the edges.
        <div className="py-8 w-full min-h-screen bg-slate-50 px-4 sm:px-8 lg:px-12 2xl:px-16">

            {/* 2. HEADER: Spans the full width of the new grid */}
            <div className="mb-8 w-full">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{citizenName}</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your civic requests and stay updated with local broadcasts.</p>
            </div>

            {/* 3. THE 12-COLUMN FLUID GRID: Spreads across 100% of the screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

                {/* ================= LEFT SIDEBAR (25% Width) ================= */}
                {/* Hugs the far left edge of the screen */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 flex flex-col gap-6">
                        <NoticeBoard />
                        <LocalFeed />
                    </div>
                </div>

                {/* ================= MAIN FEED (50% Width) ================= */}
                {/* Unconstrained to fill the exact center half of the monitor */}
                <div className="lg:col-span-6 flex flex-col gap-6 w-full">

                    {hasResolvedComplaint && <RatingBanner />}

                    <CivicImpactStats complaints={complaints} />

                    {/* Tab Navigation */}
                    <div className="flex space-x-2 bg-white border border-slate-200 p-1.5 rounded-xl w-full">
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`flex-1 flex justify-center items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                activeTab === 'history' ? 'bg-slate-100 text-[#000080]' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                        >
                            <List className="w-4 h-4" /> My History
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`flex-1 flex justify-center items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                activeTab === 'new' ? 'bg-slate-100 text-[#000080]' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" /> New Grievance
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="transition-all duration-300 min-h-[400px] w-full">
                        {activeTab === 'history' ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ComplaintList complaints={complaints} loading={loading} />
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ComplaintForm
                                    onComplaintSubmitted={fetchComplaints}
                                    onSuccessSwitchTab={() => setActiveTab('history')}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* ================= RIGHT SIDEBAR (25% Width) ================= */}
                {/* Hugs the far right edge of the screen */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 flex flex-col gap-6">
                        <KnowledgeBase />
                        <EmergencyDirectory />
                    </div>
                </div>

                {/* Mobile Fallback */}
                <div className="block lg:hidden w-full mt-6">
                    <NoticeBoard />
                </div>

                <LokMitraChat />

            </div>
        </div>
    );
};

export default CitizenPortal;