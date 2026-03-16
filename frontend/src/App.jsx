import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Dummy pages to test the routing
const Home = () => <div className="p-8 text-2xl font-bold text-slate-800">Welcome to LokShikayat</div>
const CitizenDashboard = () => <div className="p-8 text-2xl font-bold text-slate-800">Citizen Dashboard</div>
const OfficerDashboard = () => <div className="p-8 text-2xl font-bold text-slate-800">Officer Dashboard</div>

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
                        <Route path="/citizen" element={<CitizenDashboard />} />
                        <Route path="/officer" element={<OfficerDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;