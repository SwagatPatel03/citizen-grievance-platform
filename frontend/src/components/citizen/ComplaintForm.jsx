import { useState, useEffect } from 'react';
import { MapPin, FileText, Send, AlertCircle, CheckCircle2, Navigation } from 'lucide-react';
import { submitComplaint, getAllDepartments } from '../../services/api.jsx';

const ComplaintForm = () => {
    const [departments, setDepartments] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    // We hardcode citizenId to 1 for now until JWT Login is built
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        departmentId: '',
        latitude: '',
        longitude: '',
        citizenId: 1
    });

    // Fetch departments when the component loads to populate the dropdown
    useEffect(() => {
        const fetchDepts = async () => {
            try {
                const response = await getAllDepartments();
                setDepartments(response.data);
            } catch (error) {
                console.error("Failed to load departments", error);
            }
        };
        fetchDepts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // HTML5 Geolocation API to get the user's exact coordinates
    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData({
                    ...formData,
                    latitude: position.coords.latitude.toFixed(6),
                    longitude: position.coords.longitude.toFixed(6)
                });
            }, (error) => {
                alert("Please allow location access in your browser to use this feature.");
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await submitComplaint(formData);
            setStatus('success');
            // Reset form after 2 seconds
            setTimeout(() => {
                setStatus('idle');
                setFormData({ ...formData, title: '', description: '', departmentId: '', latitude: '', longitude: '' });
            }, 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-2">
            {/* The Form Card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

                {/* Subtle Tiranga Gradient Accent Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-[#FF671F] via-[#FFFFFF] to-[#046A38] border-b border-slate-100"></div>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-50 p-3 rounded-full">
                            {/* Using Navy Blue (#000080) for the Chakra thematic color */}
                            <FileText className="w-6 h-6 text-[#000080]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Lodge a Grievance</h2>
                            <p className="text-slate-500 text-sm mt-1">Submit your issue directly to the concerned department.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title & Department Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Issue Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Broken Streetlight"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                                <select
                                    name="departmentId"
                                    required
                                    value={formData.departmentId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all bg-white"
                                >
                                    <option value="" disabled>Select a department...</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Detailed Description</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Please describe the issue in detail..."
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Location (With Auto-Detect) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Incident Location</label>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="Latitude, Longitude"
                                        value={formData.latitude ? `${formData.latitude}, ${formData.longitude}` : ''}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-600 outline-none"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-300"
                                >
                                    <Navigation className="w-4 h-4" /> Detect
                                </button>
                            </div>
                        </div>

                        {/* Submit Button & Status Messages */}
                        <div className="pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full flex justify-center items-center gap-2 bg-[#046A38] hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-70"
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Submit Grievance'}
                                {status !== 'submitting' && <Send className="w-4 h-4" />}
                            </button>

                            {/* Feedback States */}
                            {status === 'success' && (
                                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
                                    <CheckCircle2 className="w-5 h-5" /> Grievance registered successfully!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-200">
                                    <AlertCircle className="w-5 h-5" /> Failed to submit grievance. Please try again.
                                </div>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplaintForm;