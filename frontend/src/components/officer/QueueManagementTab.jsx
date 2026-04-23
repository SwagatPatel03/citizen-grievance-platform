import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { getDepartmentComplaints, updateComplaintStatus } from '../../services/api.jsx';

const QueueManagementTab = ({ departmentId }) => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchDepartmentComplaints();
    }, [departmentId]);

    const fetchDepartmentComplaints = async () => {
        try {
            const response = await getDepartmentComplaints(departmentId);
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch department complaints", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (complaintId, newStatus) => {
        try {
            // Optimistically update the UI
            setComplaints(complaints.map(c => c.id === complaintId ? { ...c, status: newStatus } : c));
            await updateComplaintStatus(complaintId, newStatus);
        } catch (error) {
            console.error("Failed to update status", error);
            fetchDepartmentComplaints(); // Revert on failure
        }
    };

    const filteredComplaints = complaints.filter(c => filter === 'ALL' ? true : c.status === filter);

    if (loading) return <div className="text-center py-10 text-slate-500">Loading department queue...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-300">
            {/* Action Toolbar */}
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search ticket ID..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#000080] outline-none" />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full sm:w-auto text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#000080]">
                        <option value="ALL">All Statuses</option>
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                    </select>
                </div>
            </div>

            {/* Data Grid */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="p-4 font-semibold">Ticket ID</th>
                        <th className="p-4 font-semibold">Citizen Info</th>
                        <th className="p-4 font-semibold w-2/5">Issue Details</th>
                        <th className="p-4 font-semibold">Date Logged</th>
                        <th className="p-4 font-semibold">Action Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filteredComplaints.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">No active grievances match your criteria.</td></tr>
                    ) : (
                        filteredComplaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4 text-sm font-mono text-slate-500">#{complaint.id}</td>
                                <td className="p-4 text-sm text-slate-800 font-medium">{complaint.citizenName}</td>
                                <td className="p-4 text-sm text-slate-600">
                                    <p className="font-bold text-slate-800 line-clamp-1">{complaint.title}</p>
                                    <p className="line-clamp-1 mt-1">{complaint.description}</p>
                                </td>
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
                                </td>
                                <td className="p-4">
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                        className={`text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-1.5 border outline-none cursor-pointer transition-colors
                                                ${complaint.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500' :
                                            complaint.status === 'IN_PROGRESS' ? 'bg-blue-50 text-[#000080] border-blue-200 focus:ring-[#000080]' :
                                                'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500'}`}
                                    >
                                        <option value="OPEN">Open</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueueManagementTab;