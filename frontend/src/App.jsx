import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const Home = () => <h1>LokShikayat Portal</h1>
const CitizenDashboard = () => <h1>Citizen Dashboard</h1>
const OfficerDashboard = () => <h1>Officer Dashboard</h1>

function App() {
    return(
        <Router>
            <div className="app-container">
                {/* We will add a persistent Navbar component here later */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/citizen" element={<CitizenDashboard />} />
                    <Route path="/officer" element={<OfficerDashboard />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;