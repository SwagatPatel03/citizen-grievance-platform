import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, User, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('jwt_token');
    const userRole = localStorage.getItem('user_role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    const isActive = (path) => {
        return location.pathname === path
            ? "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200";
    };

    return (
        <nav className="bg-slate-900 sticky top-0 z-50 shadow-lg border-b border-slate-800">
            <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
                <div className="flex justify-between h-16">

                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/30 group-hover:bg-blue-600/30 transition-colors">
                                <ShieldCheck className="h-6 w-6 text-blue-400" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">LokShikayat</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/')}`}>
                            <Home className="h-4 w-4" /> Home
                        </Link>

                        {(userRole === 'CITIZEN' || !isAuthenticated) && (
                            <Link to="/citizen" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/citizen')}`}>
                                <User className="h-4 w-4" /> Command Center
                            </Link>
                        )}
                        {userRole === 'OFFICER' && (
                            <Link to="/officer" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/officer')}`}>
                                <LayoutDashboard className="h-4 w-4" /> Officer Dashboard
                            </Link>
                        )}
                        {userRole === 'ADMIN' && (
                            <Link to="/admin" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/admin')}`}>
                                <LayoutDashboard className="h-4 w-4" /> Admin Analytics
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-700 flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <LogIn className="h-4 w-4" /> Sign In
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <UserPlus className="h-4 w-4" /> Register
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
