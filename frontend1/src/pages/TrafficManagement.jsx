import React, { useState } from 'react';
import { Car, TrafficCone, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useWebSocket } from '../contexts/WebSocketContext';

const TrafficManagement = () => {
  const { realTimeData } = useWebSocket();
  const [selectedArea, setSelectedArea] = useState('ALL');

  const trafficData = [
    {
      id: 1,
      location: 'Highway I-95 North',
      congestionLevel: 9,
      averageSpeed: 15,
      vehicleCount: 850,
      status: 'CRITICAL',
      trend: 'increasing',
      lastUpdate: '2 min ago'
    },
    {
      id: 2,
      location: 'Main Street Downtown',
      congestionLevel: 7,
      averageSpeed: 25,
      vehicleCount: 420,
      status: 'HIGH',
      trend: 'stable',
      lastUpdate: '5 min ago'
    },
    {
      id: 3,
      location: 'Central Bridge',
      congestionLevel: 4,
      averageSpeed: 45,
      vehicleCount: 280,
      status: 'MODERATE',
      trend: 'decreasing',
      lastUpdate: '8 min ago'
    },
    {
      id: 4,
      location: 'Westside Expressway',
      congestionLevel: 2,
      averageSpeed: 58,
      vehicleCount: 150,
      status: 'LOW',
      trend: 'stable',
      lastUpdate: '10 min ago'
    },
    {
      id: 5,
      location: 'Airport Access Road',
      congestionLevel: 6,
      averageSpeed: 30,
      vehicleCount: 320,
      status: 'MODERATE',
      trend: 'increasing',
      lastUpdate: '3 min ago'
    }
  ];

  const trafficIncidents = [
    {
      id: 1,
      type: 'ACCIDENT',
      location: 'I-95 Exit 15',
      severity: 'HIGH',
      description: 'Multi-vehicle collision blocking two lanes',
      response: 'EMS and tow trucks dispatched',
      eta: '8 minutes'
    },
    {
      id: 2,
      type: 'ROADWORK',
      location: 'Main St & 5th Ave',
      severity: 'MEDIUM',
      description: 'Scheduled maintenance reducing lanes',
      response: 'Traffic control active',
      eta: 'Ongoing'
    },
    {
      id: 3,
      type: 'WEATHER',
      location: 'Central District',
      severity: 'LOW',
      description: 'Heavy rain affecting visibility',
      response: 'Speed limits adjusted',
      eta: 'Monitoring'
    }
  ];

  const getCongestionColor = (level) => {
    if (level >= 8) return 'text-red-400';
    if (level >= 6) return 'text-orange-400';
    if (level >= 4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MODERATE': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Car className="w-8 h-8 text-blue-400" />
              <span>Traffic Management Center</span>
            </h1>
            <p className="text-slate-400 mt-1">Real-time traffic monitoring and incident response</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Citywide Congestion</p>
              <p className="text-2xl font-bold text-orange-400">68%</p>
            </div>
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
              <TrafficCone className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Status Grid */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Live Traffic Status</h2>
            <div className="space-y-3">
              {trafficData.map(traffic => (
                <div key={traffic.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(traffic.status)}`}></div>
                    <div>
                      <p className="text-white font-medium">{traffic.location}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                        <span>Speed: {traffic.averageSpeed} mph</span>
                        <span>Vehicles: {traffic.vehicleCount}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{traffic.lastUpdate}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 justify-end">
                      <span className={`text-xl font-bold ${getCongestionColor(traffic.congestionLevel)}`}>
                        {traffic.congestionLevel}/10
                      </span>
                      <TrendingUp className={`w-4 h-4 ${
                        traffic.trend === 'increasing' ? 'text-red-400' : 
                        traffic.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'
                      }`} />
                    </div>
                    <p className="text-slate-400 text-sm mt-1 capitalize">{traffic.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Incidents */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Active Incidents</span>
              </h2>
              <span className="text-slate-400 text-sm">{trafficIncidents.length} incidents</span>
            </div>
            
            <div className="space-y-4">
              {trafficIncidents.map(incident => (
                <div key={incident.id} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium bg-red-500/20 px-2 py-1 rounded text-sm">
                        {incident.type}
                      </span>
                      <span className="text-slate-300 text-sm">{incident.location}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      incident.severity === 'HIGH' ? 'bg-red-500 text-white' :
                      incident.severity === 'MEDIUM' ? 'bg-orange-500 text-white' :
                      'bg-yellow-500 text-gray-800'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3">{incident.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Response: {incident.response}</span>
                    <span className="text-blue-400">ETA: {incident.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Controls */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Traffic Controls</h2>
            <div className="space-y-3">
              {[
                { label: 'Adjust Signal Timing', action: 'Optimize' },
                { label: 'Deploy Traffic Units', action: 'Dispatch' },
                { label: 'Update Road Signs', action: 'Configure' },
                { label: 'Clear Incident', action: 'Resolve' },
                { label: 'Reroute Traffic', action: 'Redirect' }
              ].map((control, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{control.label}</span>
                    <span className="text-blue-400 text-sm font-medium">{control.action}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Traffic Stats */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Traffic Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Average Speed', value: '32 mph', change: '-5%' },
                { label: 'Total Vehicles', value: '12,847', change: '+2%' },
                { label: 'Incidents Today', value: '24', change: '+8%' },
                { label: 'Response Time', value: '6.2 min', change: '-12%' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-400">{stat.label}</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{stat.value}</span>
                    <span className={`text-xs block ${
                      stat.change.startsWith('+') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficManagement;
