import {useState} from "react";
import {List, PlusCircle} from "lucide-react";
import ComplaintForm from "../components/citizen/ComplaintForm.jsx";
import ComplaintList from "../components/citizen/ComplaintList.jsx";

const CitizenPortal = () => {
    const [activeTab, setActiveTab] = useState('new') // State to track which tab is open

    return (
        <div className="py-6 max-w-5xl mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Citizen Portal</h1>
                <p className="text-slate-600 mt-2">Manage your civic requests and track resolution progress.</p>
            </div>

            {/* Modern Pill-Style Tab Navigation */}
            <div className="flex space-x-2 bg-slate-200/60 p-1.5 rounded-xl mb-8 w-fit">
                <button
                    onClick={() => setActiveTab('new')}
                    className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'new' ? 'bg-white text-[#000080] shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                    }`}
                >
                    <PlusCircle className="w-4 h-4" /> New Grievance
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'history' ? 'bg-white text-[#000080] shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                    }`}
                >
                    <List className="w-4 h-4"/> My History
                </button>
            </div>

            {/* Tab Content Area */}
            <div className="transition-all duration-300">
                {activeTab === 'new' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ComplaintForm />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ComplaintList />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CitizenPortal;