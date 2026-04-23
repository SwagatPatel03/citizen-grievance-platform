import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PortalProvider } from "./context/PortalContext";
import Navbar from "./components/Navbar.jsx";
import CitizenCommandCenter from "./pages/CitizenCommandCenter.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import OfficerPortal from "./pages/OfficerPortal.jsx";

// Layout component to conditionally render Navbar
function AppLayout() {

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased">
            <Navbar />

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
                            <OfficerPortal />
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
            <AuthProvider>
                <PortalProvider>
                    <AppLayout />
                </PortalProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
