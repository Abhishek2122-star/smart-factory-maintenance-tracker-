import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddMaintenance from "./pages/AddMaintenance";
import Reports from "./pages/Reports";
import CalendarView from "./pages/CalendarView";
import SpareParts from "./pages/SpareParts";
import FirebaseTest from "./pages/FirebaseTest";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h2>🏭 Smart Factory Maintenance Tracker</h2>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/add">Add Maintenance</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/spare-parts">🔧 Spare Parts</Link>
            <Link to="/test">🔥 Firebase Test</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddMaintenance />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/test" element={<FirebaseTest />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 Smart Factory Tracker | Built with ❤️ for Hackathon</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
