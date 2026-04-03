import {useEffect, useState} from "react";
import {getAllComplaints} from "../services/api.jsx";
import {AlertCircle, BarChart3, CheckCircle, Users} from "lucide-react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllData()
    }, []);

    const fetchAllData = async () => {
        try {
            const response = await getAllComplaints()
            setComplaints(response.data)
        } catch (error) {
            console.error("Failed to fetch all complaints", error)
        } finally {
            setLoading(false)
        }
    }

    // --- Analytics Processing ---
    const totalComplaints = complaints.length;
    const resolvedComplaints = complaints.filter(c => c.status === 'RESOLVED').length;
    const openComplaints = complaints.filter(c => c.status === 'OPEN' || c.status === 'IN_PROGRESS').length;

    // Process data for the Recharts Bar Chart (Counting complaints per department)
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

    if (loading) return <div className="text-center py-10">Loading analytics engine...</div>;

    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-[#000080]" />
                    Executive Analytics
                </h1>
                <p className="text-slate-600 mt-2">Platform-wide overview of civic grievances and resolution metrics.</p>
            </div>

            {/* Top Level Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Total Grievances</p>
                            <h3 className="text-3xl font-bold text-slate-800">{totalComplaints}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg"><Users className="w-6 h-6 text-blue-600" /></div>
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

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-green-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Successfully Resolved</p>
                            <h3 className="text-3xl font-bold text-slate-800">{resolvedComplaints}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                    </div>
                </div>
            </div>

            {/* Recharts Visualization */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Grievances by Department</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="#000080" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;