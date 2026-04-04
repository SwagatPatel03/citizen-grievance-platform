import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, User, LayoutDashboard, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if token exists to determine if user is logged in
    const isAuthenticated = !!localStorage.getItem('jwt_token');
    const userRole = localStorage.getItem('user_role');

    const handleLogout = () => {
        // 1. Wipe the local storage
        localStorage.clear();

        // 2. Redirect to home or login page
        navigate('/login');

        // 3. Force a reload to clear any leftover React state in memory
        window.location.reload();
    };

    const isActive = (path) => {
        return location.pathname === path
            ? "bg-blue-800 text-white"
            : "text-slate-300 hover:bg-blue-800 hover:text-white transition-colors duration-200";
    };

    return (
        <nav className="bg-slate-900 sticky top-0 z-50 shadow-md border-b border-slate-700">
            <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
                <div className="flex justify-between h-16">

                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <ShieldCheck className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                            <span className="font-bold text-xl text-white tracking-wide">LokShikayat</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/')}`}>
                            <Home className="h-4 w-4" /> Home
                        </Link>

                        {/* Conditionally render tabs based on role */}
                        {(userRole === 'CITIZEN' || !isAuthenticated) && (
                            <Link to="/citizen" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/citizen')}`}>
                                <User className="h-4 w-4" /> Citizen Portal
                            </Link>
                        )}
                        {userRole === 'OFFICER' && (
                            <Link to="/officer" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/officer')}`}>
                                <LayoutDashboard className="h-4 w-4" /> Officer Dashboard
                            </Link>
                        )}
                        {userRole === 'ADMIN' && (
                            <Link to="/admin" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/admin')}`}>
                                <LayoutDashboard className="h-4 w-4" /> Admin Analytics
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center">
                        {/* Toggle between Sign In and Log Out */}
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                            >
                                <LogIn className="h-4 w-4" /> Sign In
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;