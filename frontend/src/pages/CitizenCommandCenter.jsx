import { useState, useEffect, useCallback } from 'react';
import { 
  AlertTriangle, ShieldCheck, TrendingUp, CheckCircle2, 
  FileText, ClipboardList, Building2, MapPin 
} from 'lucide-react';
import { getCitizenComplaints } from '../services/api';

// Tab Content Components
import MyGrievancesTab from '../components/citizen/tabs/MyGrievancesTab';
import LodgeGrievanceTab from '../components/citizen/tabs/LodgeGrievanceTab';
import CivicServicesTab from '../components/citizen/tabs/CivicServicesTab';
import MyWardTab from '../components/citizen/tabs/MyWardTab';
import LokMitraChat from '../components/citizen/LokMitraChat';
import GlobalFooter from '../components/citizen/GlobalFooter';

// ==================== MOCK DATA ====================
// Represents data that would be fetched from a Spring Boot API
const mockUserData = {
  name: 'Rajesh Kumar',
  civicTrustScore: 87,
  totalFiled: 12,
  resolved: 9
};

const mockCommunityAlerts = [
  {
    id: 1,
    message: 'Water supply disruption in Sectors 4-7 on April 6th, 8 AM - 2 PM due to pipeline maintenance.',
    type: 'warning',
    timestamp: '2 hours ago'
  }
];

// ==================== MAIN COMPONENT ====================
const CitizenCommandCenter = () => {
  const [activeTab, setActiveTab] = useState('my-grievances');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const citizenId = localStorage.getItem('user_id');
  const citizenName = localStorage.getItem('user_name') || mockUserData.name;

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCitizenComplaints(citizenId);
      setComplaints(response.data);
      if (response.data.length > 0 && !selectedComplaint) {
        setSelectedComplaint(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch complaints", error);
      // Use empty array for graceful handling
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  }, [citizenId, selectedComplaint]);

  useEffect(() => {
    if (citizenId) fetchComplaints();
  }, [citizenId, fetchComplaints]);

  const stats = {
    civicTrustScore: mockUserData.civicTrustScore,
    totalFiled: complaints.length || mockUserData.totalFiled,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length || mockUserData.resolved
  };

  const tabs = [
    { id: 'my-grievances', label: 'My Grievances', icon: ClipboardList },
    { id: 'lodge-grievance', label: 'Lodge Grievance', icon: FileText },
    { id: 'civic-services', label: 'Civic Services', icon: Building2 },
    { id: 'my-ward', label: 'My Ward', icon: MapPin }
  ];

  const handleComplaintSubmitted = () => {
    fetchComplaints();
    setActiveTab('my-grievances');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* ==================== GLOBAL ALERT TICKER ==================== */}
      {mockCommunityAlerts.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-amber-100 p-1.5 rounded-full">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-800 font-medium">
                <span className="font-bold">City Alert:</span> {mockCommunityAlerts[0].message}
              </p>
              <span className="hidden sm:block text-xs text-amber-600 ml-auto flex-shrink-0">
                {mockCommunityAlerts[0].timestamp}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ENTERPRISE HEADER ==================== */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Left: Logo & Welcome */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Welcome, {citizenName}
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  Citizen Command Center • LokShikayat
                </p>
              </div>
            </div>

            {/* Right: Glass-morphic Stats Row */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Civic Trust Score */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Civic Trust Score</p>
                  <p className="text-xl font-bold text-white">{stats.civicTrustScore}<span className="text-sm text-slate-400">/100</span></p>
                </div>
              </div>

              {/* Total Filed */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Total Filed</p>
                  <p className="text-xl font-bold text-white">{stats.totalFiled}</p>
                </div>
              </div>

              {/* Resolved */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Resolved</p>
                  <p className="text-xl font-bold text-white">{stats.resolved}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN WORKSPACE NAVIGATION (TABS) ==================== */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          <nav className="flex gap-1 -mb-px overflow-x-auto" aria-label="Main navigation tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap
                    ${isActive 
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main className="flex-1 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          {activeTab === 'my-grievances' && (
            <MyGrievancesTab 
              complaints={complaints} 
              loading={loading}
              selectedComplaint={selectedComplaint}
              onSelectComplaint={setSelectedComplaint}
            />
          )}
          {activeTab === 'lodge-grievance' && (
            <LodgeGrievanceTab onComplaintSubmitted={handleComplaintSubmitted} />
          )}
          {activeTab === 'civic-services' && (
            <CivicServicesTab />
          )}
          {activeTab === 'my-ward' && (
            <MyWardTab />
          )}
        </div>
      </main>

      {/* ==================== GLOBAL FOOTER ==================== */}
      <GlobalFooter />

      {/* ==================== FLOATING LOKMITRA AI BUTTON ==================== */}
      <LokMitraChat />
    </div>
  );
};

export default CitizenCommandCenter;
