import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { registerUser } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await registerUser(formData);
            setStatus({ type: 'success', message: 'Account created! Redirecting to login...' });

            // Send them to the login page after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            const errorMsg = error.response?.data || "Registration failed. Please try again.";
            setStatus({ type: 'error', message: typeof errorMsg === 'string' ? errorMsg : "Registration failed." });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                {/* Brand Header */}
                <div className="bg-[#000080] px-8 py-10 text-center">
                    <ShieldCheck className="w-12 h-12 text-white mx-auto mb-3" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">Join LokShikayat</h2>
                    <p className="text-blue-200 mt-2 text-sm">Create your secure citizen account today.</p>
                </div>

                {/* Form Section */}
                <div className="px-8 py-8">
                    {status.message && (
                        <div className={`mb-6 p-3 rounded-lg text-sm font-medium border ${
                            status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Swagat Swaroop Patel"
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Secure Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength="6"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 bg-[#046A38] hover:bg-green-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-md disabled:opacity-70 mt-4"
                        >
                            {isLoading ? 'Creating Account...' : 'Register as Citizen'}
                            {!isLoading && <UserPlus className="w-4 h-4" />}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-[#000080] hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                                Sign in here <ArrowRight className="w-3 h-3" />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;