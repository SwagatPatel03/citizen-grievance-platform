import {Link, useLocation} from "react-router-dom";
import {Home, LayoutDashboard, User, LogIn, ShieldCheck} from "lucide-react";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
        ? "bg-blue-800 text-white"
            : "text-slate-300 hover:bg-blue-800 hover:text-white transition-colors duration-200";
    }

    return(
        <nav className="bg-slate-900 sticky top-0 z-50 shadow-md border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo and Brand*/}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <ShieldCheck className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                            <span className="font-bold text-xl text-white tracking-wide">LokShikayat</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links*/}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/')}`}>
                            <Home className="h-4 w-4" /> Home
                        </Link>
                        <Link to="/citizen" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/citizen')}`}>
                            <User className="h-4 w-4" /> Citizen Portal
                        </Link>
                        <Link to="/officer" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/officer')}`}>
                            <LayoutDashboard className="h-4 w-4" /> Officer Dashboard
                        </Link>
                        <Link to="/admin" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive('/admin')}`}>
                            <User className="h-4 w-4" /> Admin Dashboard
                        </Link>
                    </div>

                    {/* Right side - Login/Profile Action */}
                    <div className="flex items-center">
                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                        >
                            <LogIn className="h-4 w-4" /> Sign In
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;