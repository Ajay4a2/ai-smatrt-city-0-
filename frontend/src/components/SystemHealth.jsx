import React, { useState, useEffect } from 'react';
import { Cpu, Database, Wifi, Server, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SystemHealth = ({ realTimeData }) => {
  const [systems, setSystems] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Mock system data
    setSystems([
      { name: 'AI Engine', status: 'operational', latency: '47ms', uptime: '99.98%' },
      { name: 'Data Cluster', status: 'operational', latency: '12ms', uptime: '99.99%' },
      { name: 'IoT Hub', status: 'degraded', latency: '156ms', uptime: '98.45%' },
      { name: 'API Gateway', status: 'operational', latency: '23ms', uptime: '99.95%' },
      { name: 'Message Broker', status: 'operational', latency: '8ms', uptime: '99.97%' },
      { name: 'Cache Service', status: 'operational', latency: '2ms', uptime: '99.99%' }
    ]);

    // Mock metrics
    setMetrics({
      cpu: 45,
      memory: 68,
      storage: 42,
      network: 520,
      activeConnections: 1247,
      dataThroughput: '2.4 GB/s'
    });
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Grid */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Infrastructure Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system, index) => (
            <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(system.status)}
                  <span className="text-white font-medium">{system.name}</span>
                </div>
                <span className={`text-sm font-semibold ${getStatusColor(system.status)}`}>
                  {system.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-blue-400">{system.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="text-green-400">{system.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Usage */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Resource Utilization</h3>
          <div className="space-y-4">
            {[
              { name: 'CPU Load', value: metrics.cpu, icon: Cpu, color: 'blue' },
              { name: 'Memory Usage', value: metrics.memory, icon: Database, color: 'green' },
              { name: 'Storage Usage', value: metrics.storage, icon: Server, color: 'purple' },
              { name: 'Network Load', value: 75, icon: Wifi, color: 'orange' }
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 text-${resource.color}-400`} />
                      <span className="text-slate-300 text-sm">{resource.name}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{resource.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${resource.color}-500 transition-all duration-300`}
                      style={{ width: `${resource.value}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Metrics */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Operational Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Active Connections', value: metrics.activeConnections, change: '+12%' },
              { label: 'Data Throughput', value: metrics.dataThroughput, change: '+5.2%' },
              { label: 'API Requests / min', value: '12.4k', change: '+8.7%' },
              { label: 'Error Rate', value: '0.12%', change: '-0.03%' },
              { label: 'Average Response Time', value: '87ms', change: '-12ms' },
              { label: 'Connected IoT Devices', value: '2,847', change: '+23' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <span className="text-slate-300">{metric.label}</span>
                <div className="text-right">
                  <span className="text-white font-medium">{metric.value}</span>
                  <span className={`text-xs ml-2 ${
                    metric.change.startsWith('+') ? 'text-green-400' : 
                    metric.change.startsWith('-') ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent System Events</h3>
        <div className="space-y-3">
          {[
            { 
              service: 'IoT Hub', 
              issue: 'High latency detected', 
              status: 'Resolved', 
              time: '2 hours ago',
              duration: '15 minutes'
            },
            { 
              service: 'Data Cluster', 
              issue: 'Connection pool saturation', 
              status: 'Investigating', 
              time: '45 minutes ago',
              duration: 'Ongoing'
            },
            { 
              service: 'Cache Service', 
              issue: 'Memory threshold exceeded', 
              status: 'Resolved', 
              time: '6 hours ago',
              duration: '8 minutes'
            }
          ].map((incident, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  incident.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{incident.service}</p>
                  <p className="text-slate-400 text-sm">{incident.issue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  incident.status === 'Resolved' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {incident.status}
                </p>
                <p className="text-slate-400 text-sm">{incident.time}</p>
                <p className="text-slate-500 text-xs">{incident.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
