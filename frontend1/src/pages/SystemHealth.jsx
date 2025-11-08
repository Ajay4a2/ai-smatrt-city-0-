import React, { useState, useEffect } from 'react';
import { Heart, Cpu, Database, Wifi, Server, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SystemHealth = () => {
  const [systems, setSystems] = useState([]);
  const [metrics, setMetrics] = useState({});

  const systemStatus = [
    {
      id: 1,
      name: 'Backend API Server',
      type: 'SERVER',
      status: 'HEALTHY',
      uptime: '99.8%',
      responseTime: '47ms',
      lastIncident: '7 days ago',
      cpu: 45,
      memory: 68,
      description: 'Main application server handling API requests'
    },
    {
      id: 2,
      name: 'AI Service Cluster',
      type: 'AI',
      status: 'HEALTHY',
      uptime: '98.7%',
      responseTime: '120ms',
      lastIncident: '2 days ago',
      cpu: 72,
      memory: 85,
      description: 'Machine learning model serving and predictions'
    },
    {
      id: 3,
      name: 'Database Cluster',
      type: 'DATABASE',
      status: 'DEGRADED',
      uptime: '95.2%',
      responseTime: '89ms',
      lastIncident: '4 hours ago',
      cpu: 88,
      memory: 92,
      description: 'Primary MySQL database cluster'
    },
    {
      id: 4,
      name: 'IoT Gateway',
      type: 'NETWORK',
      status: 'HEALTHY',
      uptime: '99.9%',
      responseTime: '23ms',
      lastIncident: '14 days ago',
      cpu: 32,
      memory: 45,
      description: 'IoT device communication gateway'
    },
    {
      id: 5,
      name: 'Message Queue',
      type: 'MESSAGING',
      status: 'WARNING',
      uptime: '97.4%',
      responseTime: '56ms',
      lastIncident: '1 day ago',
      cpu: 65,
      memory: 78,
      description: 'Real-time message processing queue'
    },
    {
      id: 6,
      name: 'Cache Layer',
      type: 'CACHE',
      status: 'HEALTHY',
      uptime: '99.5%',
      responseTime: '12ms',
      lastIncident: '3 days ago',
      cpu: 28,
      memory: 34,
      description: 'Redis cache for performance optimization'
    }
  ];

  const healthMetrics = {
    overallHealth: 94,
    activeAlerts: 2,
    systemsOnline: 4,
    systemsTotal: 6,
    dataThroughput: '2.4 GB/s',
    requestRate: '1,247 req/s',
    errorRate: '0.8%'
  };

  useEffect(() => {
    setSystems(systemStatus);
    setMetrics(healthMetrics);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'HEALTHY': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'DEGRADED': return <XCircle className="w-5 h-5 text-orange-400" />;
      default: return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'HEALTHY': return 'bg-green-500';
      case 'WARNING': return 'bg-yellow-500';
      case 'DEGRADED': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'SERVER': return <Server className="w-5 h-5" />;
      case 'AI': return <Cpu className="w-5 h-5" />;
      case 'DATABASE': return <Database className="w-5 h-5" />;
      case 'NETWORK': return <Wifi className="w-5 h-5" />;
      case 'MESSAGING': return <AlertTriangle className="w-5 h-5" />;
      case 'CACHE': return <Database className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getCpuColor = (usage) => {
    if (usage > 80) return 'text-red-400';
    if (usage > 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getMemoryColor = (usage) => {
    if (usage > 85) return 'text-red-400';
    if (usage > 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-400" />
              <span>System Health Monitor</span>
            </h1>
            <p className="text-slate-400 mt-1">Real-time monitoring of all system components and infrastructure</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Overall Health</p>
              <p className="text-2xl font-bold text-green-400">{metrics.overallHealth}%</p>
            </div>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Systems Online', value: `${metrics.systemsOnline}/${metrics.systemsTotal}`, color: 'text-green-400' },
          { label: 'Active Alerts', value: metrics.activeAlerts, color: 'text-red-400' },
          { label: 'Data Throughput', value: metrics.dataThroughput, color: 'text-blue-400' },
          { label: 'Error Rate', value: metrics.errorRate, color: 'text-yellow-400' }
        ].map((stat, index) => (
          <div key={index} className="glass-effect rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status List */}
        <div className="space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">System Components</h2>
            <div className="space-y-4">
              {systems.map(system => (
                <div key={system.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(system.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{system.name}</span>
                          {getStatusIcon(system.status)}
                        </div>
                        <p className="text-slate-400 text-sm">{system.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)} bg-opacity-20 text-opacity-90`}>
                      {system.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Uptime:</span>
                      <span className="text-white ml-2">{system.uptime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Response:</span>
                      <span className="text-white ml-2">{system.responseTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">CPU:</span>
                      <span className={`ml-2 ${getCpuColor(system.cpu)}`}>{system.cpu}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Memory:</span>
                      <span className={`ml-2 ${getMemoryColor(system.memory)}`}>{system.memory}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-600 flex justify-between text-xs text-slate-500">
                    <span>Last incident: {system.lastIncident}</span>
                    <button className="text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Metrics & Actions */}
        <div className="space-y-6">
          {/* Resource Usage */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Resource Usage</h2>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: 68, max: 100, color: 'bg-blue-500' },
                { label: 'Memory Usage', value: 72, max: 100, color: 'bg-green-500' },
                { label: 'Disk I/O', value: 45, max: 100, color: 'bg-purple-500' },
                { label: 'Network', value: 83, max: 100, color: 'bg-orange-500' }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{metric.label}</span>
                    <span className="text-slate-400">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${metric.color} transition-all duration-300`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">System Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Restart Services', action: 'Restart', color: 'bg-yellow-500 hover:bg-yellow-600' },
                { label: 'Run Diagnostics', action: 'Diagnose', color: 'bg-blue-500 hover:bg-blue-600' },
                { label: 'Clear Cache', action: 'Clear', color: 'bg-green-500 hover:bg-green-600' },
                { label: 'Backup Now', action: 'Backup', color: 'bg-purple-500 hover:bg-purple-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg text-white font-medium text-sm transition-colors ${action.color}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Incidents</h2>
            <div className="space-y-3">
              {[
                { time: '2 hours ago', system: 'Database Cluster', issue: 'High CPU usage', status: 'Resolved' },
                { time: '6 hours ago', system: 'AI Service', issue: 'Memory leak detected', status: 'Monitoring' },
                { time: '1 day ago', system: 'Message Queue', issue: 'Queue backlog', status: 'Resolved' }
              ].map((incident, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <div>
                    <p className="text-white text-sm">{incident.system}</p>
                    <p className="text-slate-400 text-xs">{incident.issue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">{incident.time}</p>
                    <p className={`text-xs ${
                      incident.status === 'Resolved' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {incident.status}
                    </p>
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

export default SystemHealth;
