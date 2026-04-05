import { ArrowRight, ShieldCheck, CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        { icon: CheckCircle2, title: 'Track Progress', description: 'Real-time status updates' },
        { icon: Clock, title: 'Fast Resolution', description: 'SLA-guaranteed timelines' },
        { icon: BarChart3, title: 'Transparency', description: 'Full visibility on actions' }
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="bg-blue-600/10 p-4 rounded-2xl mb-6 border border-blue-100">
                    <ShieldCheck className="w-14 h-14 text-blue-600" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4 text-balance">
                    LokShikayat
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    The transparent, secure, and AI-powered grievance redressal portal.
                    Report local issues and track their resolution in real-time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                        to="/citizen"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-105"
                    >
                        Open Command Center <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-sm flex items-center justify-center"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Quick Features */}
                <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="flex items-center gap-3 text-left">
                                <div className="bg-emerald-50 p-2 rounded-lg">
                                    <Icon className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">{feature.title}</p>
                                    <p className="text-slate-500 text-xs">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-slate-900 text-center py-4 px-4">
                <p className="text-slate-400 text-sm">
                    An initiative under Digital India Programme • Government of India
                </p>
            </div>
        </div>
    );
};

export default Home;
