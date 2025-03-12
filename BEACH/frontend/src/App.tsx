import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BeachMap } from './pages/BeachMap';
import { BeachDetails } from './pages/BeachDetails';
import { SafetyTips } from './pages/SafetyTips';
import { AlertsPage } from './pages/AlertsPage';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<BeachMap />} />
            <Route path="/beach/:id" element={<BeachDetails />} />
            <Route path="/safety" element={<SafetyTips />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
