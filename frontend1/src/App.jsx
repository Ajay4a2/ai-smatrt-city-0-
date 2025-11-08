import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OperationsMap from './pages/OperationsMap';
import TrafficManagement from './pages/TrafficManagement';
import SecurityCenter from './pages/SecurityCenter';
import UtilityManagement from './pages/UtilityManagement';
import EmergencyResponse from './pages/EmergencyResponse';
import AIPredictions from './pages/AIPredictions';
import SystemHealth from './pages/SystemHealth';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
  return (
    <WebSocketProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/operations-map" element={<OperationsMap />} />
            <Route path="/traffic" element={<TrafficManagement />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/utilities" element={<UtilityManagement />} />
            <Route path="/emergency" element={<EmergencyResponse />} />
            <Route path="/ai-predictions" element={<AIPredictions />} />
            <Route path="/system-health" element={<SystemHealth />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </WebSocketProvider>
  );
};

export default App;
