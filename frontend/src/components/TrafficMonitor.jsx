import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Car, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

const TrafficMonitor = ({ realTimeData }) => {
  const [trafficData, setTrafficData] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Mock traffic data
    const mockData = [
      { time: '08:00', congestion: 8, vehicles: 450, speed: 25 },
      { time: '09:00', congestion: 9, vehicles: 520, speed: 20 },
      { time: '10:00', congestion: 6, vehicles: 380, speed: 35 },
      { time: '11:00', congestion: 4, vehicles: 290, speed: 45 },
      { time: '12:00', congestion: 5, vehicles: 320, speed: 40 },
      { time: '13:00', congestion: 7, vehicles: 410, speed: 30 },
      { time: '14:00', congestion: 8, vehicles: 480, speed: 25 },
      { time: '15:00', congestion: 9, vehicles: 550, speed: 18 }
    ];
    setTrafficData(mockData);

    // Mock prediction
    setPrediction({
      nextHour: 7,
      trend: 'decreasing',
      confidence: 85,
      recommendation: 'Consider alternative routes for downtown area'
    });
  }, []);

  const currentTraffic = [
    { location: 'Highway I-95 North', congestion: 9, status: 'Heavy', delay: '15 min' },
    { location: 'Central Bridge', congestion: 7, status: 'Moderate', delay: '8 min' },
    { location: 'Downtown Loop', congestion: 8, status: 'Heavy', delay: '12 min' },
    { location: 'East Expressway', congestion: 4, status: 'Light', delay: '2 min' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Overview */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Car className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
          </div>
          <div className="space-y-4">
            {currentTraffic.map((traffic, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <div>
                  <p className="text-white font-medium">{traffic.location}</p>
                  <p className="text-slate-400 text-sm">{traffic.status}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    traffic.congestion >= 8 ? 'text-red-400' : 
                    traffic.congestion >= 6 ? 'text-orange-400' : 'text-green-400'
                  }`}>
                    {traffic.congestion}/10
                  </p>
                  <p className="text-slate-400 text-sm">Delay: {traffic.delay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prediction */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">AI Prediction</h2>
          </div>
          {prediction && (
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-2xl font-bold text-white">{prediction.nextHour}/10</p>
                <p className="text-slate-300">Expected Congestion (Next Hour)</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Trend:</span>
                  <span className={`font-semibold ${
                    prediction.trend === 'increasing' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {prediction.trend.charAt(0).toUpperCase() + prediction.trend.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-blue-400 font-semibold">{prediction.confidence}%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-slate-300 text-sm">{prediction.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Traffic Alerts */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
          </div>
          <div className="space-y-3">
            {[
              { type: 'Accident', location: 'I-95 Exit 15', time: '5 min ago' },
              { type: 'Roadwork', location: 'Main St', time: '25 min ago' },
              { type: 'Weather', location: 'City Wide', time: '1 hour ago' }
            ].map((alert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-white text-sm font-medium">{alert.type}</p>
                  <p className="text-slate-400 text-xs">{alert.location}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-slate-400 text-xs">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Congestion Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="congestion" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Congestion Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Legend />
              <Bar 
                dataKey="vehicles" 
                fill="#3B82F6" 
                name="Vehicles per hour"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrafficMonitor;
