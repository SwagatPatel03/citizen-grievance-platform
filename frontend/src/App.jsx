import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ComplaintForm from "./components/ComplaintForm.jsx";
import ComplaintList from "./components/ComplaintList.jsx";
import {useState} from "react";
import {List, PlusCircle} from "lucide-react";
import OfficerPortal from "./components/OfficerPortal.jsx";

// Dummy pages to test the routing
const Home = () => <div className="p-8 text-2xl font-bold text-slate-800">Welcome to LokShikayat</div>
const CitizenDashboard = () => {
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
                    <List className="w-4 h-4" /> My History
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
const OfficerDashboard = () => (
    <div className="py-6 max-w-5xl mx-auto px-4">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Officer Portal</h1>
            <p className="text-slate-600 mt-2">...</p>
        </div>
        <OfficerPortal />
    </div>
)

function App() {
    return(
        <Router>
            {/* The background color of the entire app */}
            <div className="min-h-screen bg-slate-50 font-sans">

                {/* Persistent Navbar */}
                <Navbar />

                {/* The main content are where the pages will render */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/citizen" element={<CitizenDashboard />} />
                        <Route path="/officer" element={<OfficerDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;