import React from 'react';
import { 
  Activity, 
  Car, 
  Shield, 
  Zap, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

const Dashboard = ({ realTimeData }) => {
  const stats = [
    {
      title: 'Ongoing Operations',
      value: realTimeData.operations?.length || 24,
      change: '+12%',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Transit Events',
      value: realTimeData.traffic?.filter(t => t.congestionLevel > 7)?.length || 8,
      change: '-5%',
      icon: Car,
      color: 'orange'
    },
    {
      title: 'Safety Alerts',
      value: realTimeData.operations?.filter(op => op.operationType === 'SECURITY' && op.severity > 3)?.length || 3,
      change: '+2%',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Infrastructure Uptime',
      value: '98%',
      change: '+1%',
      icon: Zap,
      color: 'green'
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      type: 'TRANSIT',
      location: 'I-95 North Expressway',
      severity: 'CRITICAL',
      time: '2 min ago',
      description: 'Severe collision causing multi-lane blockage'
    },
    {
      id: 2,
      type: 'POWER',
      location: 'Downtown Grid Sector',
      severity: 'WARNING',
      time: '15 min ago',
      description: 'Voltage irregularity detected in substation feed'
    },
    {
      id: 3,
      type: 'SAFETY',
      location: 'Central Transit Hub',
      severity: 'WARNING',
      time: '25 min ago',
      description: 'Anomalous movement detected on surveillance'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change} vs previous hour
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-2 glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Priority Alerts</h2>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-4">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="flex items-center space-x-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{alert.type}</span>
                    <span className="text-slate-400 text-sm">{alert.time}</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">{alert.location}</p>
                  <p className="text-slate-400 text-sm mt-1">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Metrics */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">System Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">Active Devices</span>
              </div>
              <span className="text-white font-semibold">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">Data Throughput</span>
              </div>
              <span className="text-white font-semibold">2.4TB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-slate-300">Average Latency</span>
              </div>
              <span className="text-white font-semibold">47ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300">Model Precision</span>
              </div>
              <span className="text-white font-semibold">94.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Recent System Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Transit flow optimized', time: 'Just now', type: 'AI' },
            { action: 'Emergency dispatch adjusted', time: '1 min ago', type: 'SYSTEM' },
            { action: 'Energy load balanced', time: '3 min ago', type: 'AI' },
            { action: 'Surveillance trigger logged', time: '5 min ago', type: 'IoT' },
            { action: 'Climate feed updated', time: '7 min ago', type: 'SENSOR' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'AI' ? 'bg-purple-500' :
                  activity.type === 'SYSTEM' ? 'bg-blue-500' :
                  activity.type === 'IoT' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-slate-300">{activity.action}</span>
              </div>
              <span className="text-slate-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
