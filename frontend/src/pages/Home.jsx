import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
                <ShieldCheck className="w-16 h-16 text-[#000080]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 tracking-tight mb-4">
                LokShikayat
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">
                The transparent, secure, and AI-powered grievance redressal portal.
                Report local issues and track their resolution in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/register"
                    className="bg-[#000080] hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                    to="/login"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-sm flex items-center justify-center"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default Home;