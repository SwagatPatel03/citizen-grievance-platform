import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck, Home, User, LayoutDashboard,
    LogIn, LogOut, UserPlus, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, userRole, logout } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // ─── Scroll-aware styling (#8) ───────────────────────────
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // ─── Logout without hard reload (#2, #13) ───────────────
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // ─── Active link helper with transition (#11) ───────────
    const linkClasses = (path) => {
        const base =
            'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';
        return location.pathname === path
            ? `${base} bg-slate-800 text-white`
            : `${base} text-slate-300 hover:bg-slate-800 hover:text-white`;
    };

    // ─── Build nav links based on role (#3) ─────────────────
    const navLinks = [
        { to: '/', label: 'Home', icon: Home, show: true },
        {
            to: '/citizen',
            label: 'Command Center',
            icon: User,
            show: isAuthenticated && userRole === 'CITIZEN',
        },
        {
            to: '/officer',
            label: 'Officer Dashboard',
            icon: LayoutDashboard,
            show: isAuthenticated && userRole === 'OFFICER',
        },
        {
            to: '/admin',
            label: 'Admin Analytics',
            icon: LayoutDashboard,
            show: isAuthenticated && userRole === 'ADMIN',
        },
    ].filter((l) => l.show);

    return (
        <nav
            aria-label="Main navigation" /* #4 */
            className={`sticky top-0 z-50 border-b border-slate-800 transition-all duration-300 ${
                scrolled
                    ? 'bg-slate-900/85 backdrop-blur-md shadow-xl'
                    : 'bg-slate-900 shadow-lg'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* #10 — matches page content */}
                <div className="flex justify-between h-16">

                    {/* ── Logo (#9 — hover animation) ────────── */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
                        >
                            <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/30 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-200">
                                <ShieldCheck className="h-6 w-6 text-blue-400" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight group-hover:text-blue-300 transition-colors duration-200">
                                LokShikayat
                            </span>
                        </Link>
                    </div>

                    {/* ── Desktop Nav Links ────────────────── */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={linkClasses(link.to)}
                                    aria-current={location.pathname === link.to ? 'page' : undefined} /* #7 */
                                >
                                    <Icon className="h-4 w-4" /> {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ── Desktop Auth Buttons (#5, #6) ───── */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 border border-slate-700 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                                        location.pathname === '/login'
                                            ? 'text-white bg-slate-800'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                    aria-current={location.pathname === '/login' ? 'page' : undefined}
                                >
                                    <LogIn className="h-4 w-4" /> Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className={`px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                                        location.pathname === '/register'
                                            ? 'bg-blue-700 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                    aria-current={location.pathname === '/register' ? 'page' : undefined}
                                >
                                    <UserPlus className="h-4 w-4" /> Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ── Mobile Hamburger Button (#1) ─────── */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="text-slate-300 hover:text-white p-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Slide-down Menu (#1) ─────────────── */}
            <div
                id="mobile-nav-menu"
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 pb-4 pt-2 space-y-1 border-t border-slate-800">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block ${linkClasses(link.to)}`}
                                aria-current={location.pathname === link.to ? 'page' : undefined}
                            >
                                <Icon className="h-4 w-4" /> {link.label}
                            </Link>
                        );
                    })}

                    <div className="border-t border-slate-800 pt-3 mt-3 space-y-1">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors duration-200"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                                        location.pathname === '/login'
                                            ? 'text-white bg-slate-800'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <LogIn className="h-4 w-4" /> Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors duration-200"
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
