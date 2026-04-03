import { Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// Notice it now receives `complaints` and `loading` as props!
const ComplaintList = ({ complaints = [], loading = false }) => {

    const getStatusBadge = (status) => {
        switch (status) {
            case 'OPEN': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle className="w-3 h-3" /> Open</span>;
            case 'IN_PROGRESS': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Loader2 className="w-3 h-3 animate-spin" /> In Progress</span>;
            case 'RESOLVED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
            default: return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">Unknown</span>;
        }
    };

    if (loading) return <div className="text-center py-10 text-slate-500">Loading your grievances...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                        <th className="p-4 font-semibold">ID</th>
                        <th className="p-4 font-semibold">Title</th>
                        <th className="p-4 font-semibold">Department</th>
                        <th className="p-4 font-semibold">Date Submitted</th>
                        <th className="p-4 font-semibold">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {complaints.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">No grievances submitted yet.</td></tr>
                    ) : (
                        complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-sm text-slate-500">#{complaint.id}</td>
                                <td className="p-4 text-sm font-medium text-slate-800">{complaint.title}</td>
                                <td className="p-4 text-sm text-slate-600">{complaint.departmentName}</td>
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="p-4">{getStatusBadge(complaint.status)}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplaintList;