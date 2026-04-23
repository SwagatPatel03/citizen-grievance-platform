import { useEffect, useState } from "react";
import { getAllComplaints, createDepartment, getAllDepartments, registerOfficer } from "../services/api.jsx";
import { AlertCircle, BarChart3, CheckCircle, Users, Shield, Building2, UserPlus, CheckCircle2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboard = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState('analytics'); // Default to your awesome charts!

    // Data States
    const [complaints, setComplaints] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const adminName = localStorage.getItem('user_name') || "Super Admin";

    // Form States
    const [deptStatus, setDeptStatus] = useState('idle');
    const [deptForm, setDeptForm] = useState({ name: '', description: '', headOfficer: '' });
    const [officerStatus, setOfficerStatus] = useState('idle');
    const [officerForm, setOfficerForm] = useState({ fullName: '', email: '', password: '', departmentIds: [] });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            // Fetch both complaints (for your charts) and departments (for the forms) at once!
            const [complaintsRes, deptsRes] = await Promise.all([
                getAllComplaints(),
                getAllDepartments()
            ]);
            setComplaints(complaintsRes.data);
            setDepartments(deptsRes.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Analytics Processing (From your original file) ---
    const totalComplaints = complaints.length;
    const resolvedComplaints = complaints.filter(c => c.status === 'RESOLVED').length;
    const openComplaints = complaints.filter(c => c.status === 'OPEN' || c.status === 'IN_PROGRESS').length;

    const departmentData = complaints.reduce((acc, complaint) => {
        const deptName = complaint.departmentName || 'Unknown';
        const existingDept = acc.find(d => d.name === deptName)
        if (existingDept) {
            existingDept.count += 1;
        } else {
            acc.push({name: deptName, count: 1});
        }
        return acc;
    }, []);

    // --- Form Handlers (From our new secure backend logic) ---
    const handleDeptChange = (e) => setDeptForm({ ...deptForm, [e.target.name]: e.target.value });

    const handleDeptSubmit = async (e) => {
        e.preventDefault();
        setDeptStatus('submitting');
        try {
            await createDepartment(deptForm);
            setDeptStatus('success');
            // Refresh the departments list!
            const newDepts = await getAllDepartments();
            setDepartments(newDepts.data);
            setTimeout(() => {
                setDeptStatus('idle');
                setDeptForm({ name: '', description: '', headOfficer: '' });
            }, 3000);
        } catch (error) {
            setDeptStatus('error');
            setTimeout(() => setDeptStatus('idle'), 3000);
        }
    };

    const handleOfficerChange = (e) => setOfficerForm({ ...officerForm, [e.target.name]: e.target.value });

    const handleCheckboxChange = (deptId) => {
        setOfficerForm(prev => ({
            ...prev,
            departmentIds: prev.departmentIds.includes(deptId)
                ? prev.departmentIds.filter(id => id !== deptId)
                : [...prev.departmentIds, deptId]
        }));
    };

    const handleOfficerSubmit = async (e) => {
        e.preventDefault();
        if (officerForm.departmentIds.length === 0) {
            alert("Please assign the officer to at least one department.");
            return;
        }
        setOfficerStatus('submitting');
        try {
            await registerOfficer(officerForm);
            setOfficerStatus('success');
            setTimeout(() => {
                setOfficerStatus('idle');
                setOfficerForm({ fullName: '', email: '', password: '', departmentIds: [] });
            }, 3000);
        } catch (error) {
            setOfficerStatus('error');
            setTimeout(() => setOfficerStatus('idle'), 3000);
        }
    };

    if (loading) return <div className="text-center py-20 text-slate-500 font-medium text-lg">Loading Executive Command Center...</div>;

    return (
        <div className="w-full flex flex-col min-h-screen bg-slate-50">

            {/* ENTERPRISE HEADER */}
            <div className="w-full relative overflow-hidden bg-[#0B1120] border-b border-slate-800 pt-10 pb-10">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

                <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-500" />
                            System Administration
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium">Welcome, {adminName}. Manage platform infrastructure and personnel.</p>
                    </div>
                </div>
            </div>

            {/* MAIN WORKSPACE */}
            <div className="w-full flex-grow flex flex-col">

                {/* TOP NAV TABS */}
                <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
                    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 flex">
                        <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === 'analytics' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                            <BarChart3 className="w-4 h-4" /> Global Analytics
                        </button>
                        <button onClick={() => setActiveTab('departments')} className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === 'departments' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                            <Building2 className="w-4 h-4" /> Manage Departments
                        </button>
                        <button onClick={() => setActiveTab('officers')} className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-4 ${activeTab === 'officers' ? 'border-[#000080] text-[#000080]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                            <UserPlus className="w-4 h-4" /> Onboard Officers
                        </button>
                    </div>
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex-grow max-w-[100rem] mx-auto w-full px-4 sm:px-8 lg:px-12 py-8">

                    {/* === TAB 1: YOUR ORIGINAL ANALYTICS === */}
                    {activeTab === 'analytics' && (
                        <div className="animate-in fade-in duration-300">
                            {/* Top Level Metric Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-[#000080]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">Total Grievances</p>
                                            <h3 className="text-3xl font-bold text-slate-800">{totalComplaints}</h3>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg"><Users className="w-6 h-6 text-[#000080]" /></div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">Active / Pending</p>
                                            <h3 className="text-3xl font-bold text-slate-800">{openComplaints}</h3>
                                        </div>
                                        <div className="p-3 bg-amber-50 rounded-lg"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">Successfully Resolved</p>
                                            <h3 className="text-3xl font-bold text-slate-800">{resolvedComplaints}</h3>
                                        </div>
                                        <div className="p-3 bg-emerald-50 rounded-lg"><CheckCircle className="w-6 h-6 text-emerald-600" /></div>
                                    </div>
                                </div>
                            </div>

                            {/* Recharts Visualization */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-8">Grievances by Department</h3>
                                <div className="h-96 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={departmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="count" fill="#000080" radius={[4, 4, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === TAB 2: DEPARTMENTS (50/50 Split) === */}
                    {activeTab === 'departments' && (
                        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
                            {/* Left: Create Form */}
                            <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-sm border border-slate-200 h-fit">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Register New Department</h2>
                                <form onSubmit={handleDeptSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Department Name</label>
                                        <input type="text" name="name" required value={deptForm.name} onChange={handleDeptChange} placeholder="e.g., Water Works" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#000080]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                        <textarea name="description" required rows="3" value={deptForm.description} onChange={handleDeptChange} placeholder="Responsibilities..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#000080] resize-none"></textarea>
                                    </div>
                                    <button type="submit" disabled={deptStatus === 'submitting'} className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors">
                                        {deptStatus === 'submitting' ? 'Creating...' : 'Create Department'}
                                    </button>
                                    {deptStatus === 'success' && <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Created successfully</div>}
                                </form>
                            </div>

                            {/* Right: Existing Departments List */}
                            <div className="lg:w-1/2">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Active Departments</h2>
                                <div className="space-y-3">
                                    {departments.length === 0 ? <p className="text-slate-500">No departments found.</p> : departments.map(dept => (
                                        <div key={dept.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#000080] transition-colors">
                                            <div className="bg-blue-50 p-3 rounded-lg"><Building2 className="w-5 h-5 text-[#000080]"/></div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{dept.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{dept.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === TAB 3: OFFICERS === */}
                    {activeTab === 'officers' && (
                        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <UserPlus className="w-6 h-6 text-[#000080]" />
                                Provision Internal Officer
                            </h2>
                            <form onSubmit={handleOfficerSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                        <input type="text" name="fullName" required value={officerForm.fullName} onChange={handleOfficerChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#000080]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Official Email</label>
                                        <input type="email" name="email" required value={officerForm.email} onChange={handleOfficerChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#000080]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Secure Password</label>
                                    <input type="password" name="password" required value={officerForm.password} onChange={handleOfficerChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#000080]" />
                                </div>

                                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                                    <label className="block text-sm font-semibold text-slate-900 mb-3">Assign to Departments</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {departments.map(dept => (
                                            <label key={dept.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-[#000080] transition-colors shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={officerForm.departmentIds.includes(dept.id)}
                                                    onChange={() => handleCheckboxChange(dept.id)}
                                                    className="w-4 h-4 text-[#000080] rounded border-slate-300 focus:ring-[#000080]"
                                                />
                                                <span className="text-sm font-medium text-slate-700">{dept.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" disabled={officerStatus === 'submitting'} className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md">
                                    {officerStatus === 'submitting' ? 'Registering...' : 'Provision Officer Account'}
                                </button>

                                {officerStatus === 'success' && <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Officer provisioned successfully!</div>}
                                {officerStatus === 'error' && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Failed to register officer. Email may exist.</div>}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;