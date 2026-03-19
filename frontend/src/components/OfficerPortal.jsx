import { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { getDepartmentComplaints, updateComplaintStatus } from '../services/api';

const OfficerPortal = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoding department id to 1 until we implement JWT Login
    const departmentId = 1;

    useEffect(() => {
        fetchDepartmentComplaints()
    }, []);

    const fetchDepartmentComplaints = async () => {
        try {
            const response = await getDepartmentComplaints(departmentId)
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch department complaints", error);
        } finally {
            setLoading(false);
        }
    }

    const handleStatusChange = async (complaintId, newStatus) => {
        try {
            // Optimistically update the UI so it feels lightning fast
            setComplaints(complaints.map(c =>
            c.id === complaintId ? {...c, status: newStatus} : c)
            )
            // Send the PATCH request to update the server
            await updateComplaintStatus(complaintId, newStatus)
        } catch (error) {
            console.error("Failed to update complaint status", error);
            // If it fails, refresh from the server to get the true state
            fetchDepartmentComplaints();
        }
    }

    if (loading) {
        return <div className="text-center py-10">Loading department queue...</div>
    }

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <ShieldAlert className="w-8 h-8 text-[#FF671F]" /> {/* Saffron accent */}
                        Department Queue
                    </h1>
                    <p className="text-slate-600 mt-2">Manage and resolve active citizen grievances.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-900 text-white text-sm">
                        <th className="p-4 font-medium rounded-tl-xl">ID</th>
                        <th className="p-4 font-medium">Citizen</th>
                        <th className="p-4 font-medium">Issue Description</th>
                        <th className="p-4 font-medium">Date Logged</th>
                        <th className="p-4 font-medium rounded-tr-xl">Action / Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                    {complaints.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">No active grievances in your department.</td></tr>
                    ) : (
                        complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-sm font-semibold text-slate-600">#{complaint.id}</td>
                                <td className="p-4 text-sm text-slate-800 font-medium">{complaint.citizenName}</td>
                                <td className="p-4 text-sm text-slate-600 max-w-md">
                                    <p className="font-semibold text-slate-800">{complaint.title}</p>
                                    <p className="truncate mt-1">{complaint.description}</p>
                                </td>
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
                                </td>
                                <td className="p-4">
                                    {/* The Status Dropdown to trigger the PATCH API */}
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                        className={`text-sm font-medium rounded-lg px-3 py-1.5 border outline-none cursor-pointer transition-colors
                        ${complaint.status === 'RESOLVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                            complaint.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-amber-50 text-amber-700 border-amber-200'}`}
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

export default OfficerPortal;