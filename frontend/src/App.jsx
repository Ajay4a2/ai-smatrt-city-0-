import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import OperationsMap from './components/OperationsMap';
import TrafficMonitor from './components/TrafficMonitor';
import AIPredictions from './components/AIPredictions';
import SystemHealth from './components/SystemHealth';
import io from 'socket.io-client';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('operations_update', (data) => {
      setRealTimeData(prev => ({ ...prev, operations: data }));
    });

    newSocket.on('traffic_update', (data) => {
      setRealTimeData(prev => ({ ...prev, traffic: data }));
    });

    newSocket.on('system_metrics', (data) => {
      setRealTimeData(prev => ({ ...prev, metrics: data }));
    });

    newSocket.on('iot_data', (data) => {
      setRealTimeData(prev => ({ ...prev, iot: data }));
    });

    return () => newSocket.close();
  }, []);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'map', name: 'Operations Map', icon: '🗺️' },
    { id: 'traffic', name: 'Traffic Monitor', icon: '🚦' },
    { id: 'ai', name: 'AI Predictions', icon: '🤖' },
    { id: 'health', name: 'System Health', icon: '❤️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard realTimeData={realTimeData} />;
      case 'map':
        return <OperationsMap realTimeData={realTimeData} />;
      case 'traffic':
        return <TrafficMonitor realTimeData={realTimeData} />;
      case 'ai':
        return <AIPredictions />;
      case 'health':
        return <SystemHealth realTimeData={realTimeData} />;
      default:
        return <Dashboard realTimeData={realTimeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏙️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Smart Management System</h1>
                <p className="text-sm text-slate-300">Real-time IoT & AI-powered city operations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-300">Live</span>
              </div>
              <div className="text-sm text-slate-300">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-effect border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
