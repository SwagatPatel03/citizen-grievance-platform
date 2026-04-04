import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CitizenPortal from "./pages/CitizenPortal.jsx";
import OfficerDashboard from "./pages/OfficerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return(
        <Router>
            {/* The background color of the entire app */}
            <div className="min-h-screen bg-slate-50 font-sans">

                {/* Persistent Navbar */}
                <Navbar />

                {/* The main content are where the pages will render */}
                <main className="w-full flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/citizen" element={<ProtectedRoute allowedRoles={['CITIZEN']}>
                            <CitizenPortal />
                        </ProtectedRoute>} />
                        <Route path="/citizen" element={<ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                            <OfficerDashboard />
                        </ProtectedRoute>} />
                        <Route path="/citizen" element={<ProtectedRoute allowedRoles={['ADMIN']}>
                            <AdminDashboard />
                        </ProtectedRoute>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;