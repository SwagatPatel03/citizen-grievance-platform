import { useState, useEffect } from 'react';
import { PlusCircle, List } from 'lucide-react';
import { getCitizenComplaints } from '../services/api';
import ComplaintForm from '../components/citizen/ComplaintForm';
import ComplaintList from '../components/citizen/ComplaintList';
import NoticeBoard from '../components/citizen/NoticeBoard';
import CivicImpactStats from '../components/citizen/CivicImpactStats';

const CitizenPortal = () => {
    const [activeTab, setActiveTab] = useState('history');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // We pull the logged-in user's ID directly from local storage now!
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

    return (
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, {citizenName}</h1>
                <p className="text-slate-600 mt-2">Manage your civic requests and stay updated with local broadcasts.</p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Stats & Main Content (Takes up 2/3 of the space on desktop) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Feature 1: Civic Impact Stats */}
                    <CivicImpactStats complaints={complaints} />

                    {/* Tab Navigation */}
                    <div className="flex space-x-2 bg-slate-200/60 p-1.5 rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                activeTab === 'history' ? 'bg-white text-[#000080] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <List className="w-4 h-4" /> My History
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                activeTab === 'new' ? 'bg-white text-[#000080] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" /> New Grievance
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="transition-all duration-300 min-h-[400px]">
                        {activeTab === 'history' ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ComplaintList complaints={complaints} loading={loading} />
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Note: We'd normally pass a callback to ComplaintForm to re-fetch data upon submission */}
                                <ComplaintForm
                                    onComplaintSubmitted={fetchComplaints}
                                    onSuccessSwitchTab={() => setActiveTab('history')}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: The Sidebar (Takes up 1/3 of the space on desktop) */}
                <div className="lg:col-span-1">
                    {/* Feature 2: Official Notice Board */}
                    <div className="sticky top-24">
                        <NoticeBoard />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CitizenPortal;