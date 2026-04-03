import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CitizenPortal from "./pages/CitizenPortal.jsx";
import OfficerDashboard from "./pages/OfficerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";

// Dummy pages to test the routing
const Home = () => <div className="p-8 text-2xl font-bold text-slate-800">Welcome to LokShikayat</div>

function App() {
    return(
        <Router>
            {/* The background color of the entire app */}
            <div className="min-h-screen bg-slate-50 font-sans">

                {/* Persistent Navbar */}
                <Navbar />

                {/* The main content are where the pages will render */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/citizen" element={<CitizenPortal />} />
                        <Route path="/officer" element={<OfficerDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;