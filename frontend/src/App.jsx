import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CitizenCommandCenter from "./pages/CitizenCommandCenter.jsx";
import OfficerDashboard from "./pages/OfficerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";

// Layout component to conditionally render Navbar
function AppLayout() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/citizen';

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased">
            {/* Navbar hidden on Citizen Command Center which has its own header */}
            {!hideNavbar && <Navbar />}

            {/* Main content area */}
            <main className="w-full flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Citizen Command Center - accessible for demo */}
                    <Route path="/citizen" element={<CitizenCommandCenter />} />
                    <Route path="/officer" element={
                        <ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                            <OfficerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={['ADMIN']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
