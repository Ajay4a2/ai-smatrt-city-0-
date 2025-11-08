import React, { useState } from 'react';
import { Shield, Camera, AlertTriangle, Users, MapPin, Clock } from 'lucide-react';

const SecurityCenter = () => {
  const [securityFeeds, setSecurityFeeds] = useState([
    {
      id: 1,
      location: 'Central Station',
      status: 'ACTIVE',
      alerts: 2,
      lastActivity: '2 min ago',
      cameras: 8
    },
    {
      id: 2,
      location: 'Financial District',
      status: 'MONITORING',
      alerts: 0,
      lastActivity: '15 min ago',
      cameras: 12
    },
    {
      id: 3,
      location: 'Shopping Mall',
      status: 'ALERT',
      alerts: 5,
      lastActivity: 'Just now',
      cameras: 6
    },
    {
      id: 4,
      location: 'University Campus',
      status: 'ACTIVE',
      alerts: 1,
      lastActivity: '8 min ago',
      cameras: 10
    }
  ]);

  const securityAlerts = [
    {
      id: 1,
      type: 'SUSPICIOUS_ACTIVITY',
      location: 'Central Park West',
      severity: 'HIGH',
      description: 'Unidentified vehicle circling the area',
      time: '5 minutes ago',
      status: 'INVESTIGATING'
    },
    {
      id: 2,
      type: 'UNAUTHORIZED_ACCESS',
      location: 'Government Building A',
      severity: 'MEDIUM',
      description: 'Access attempt after hours',
      time: '12 minutes ago',
      status: 'RESOLVED'
    },
    {
      id: 3,
      type: 'CROWD_FORMATION',
      location: 'Main Square',
      severity: 'LOW',
      description: 'Large crowd gathering detected',
      time: '20 minutes ago',
      status: 'MONITORING'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'MONITORING': return 'bg-blue-500';
      case 'ALERT': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'HIGH': return 'text-red-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span>Security Center</span>
            </h1>
            <p className="text-slate-400 mt-1">Monitoring and managing city security systems</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Active Alerts</p>
              <p className="text-2xl font-bold text-red-400">8</p>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Feeds */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Security Zones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityFeeds.map(zone => (
                <div key={zone.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`}></div>
                      <span className="text-white font-medium">{zone.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Camera className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">{zone.cameras} cams</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">{zone.alerts} alerts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">{zone.lastActivity}</span>
                      </div>
                    </div>
                    
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      View Feed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Active Security Alerts</span>
              </h2>
              <span className="text-slate-400 text-sm">{securityAlerts.length} alerts</span>
            </div>
            
            <div className="space-y-4">
              {securityAlerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium bg-red-500/20 px-2 py-1 rounded text-sm">
                        {alert.type.replace('_', ' ')}
                      </span>
                      <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">{alert.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{alert.location}</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-500 text-sm">Status: {alert.status}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        Dispatch Unit
                      </button>
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Controls */}
        <div className="space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Security Controls</h2>
            <div className="space-y-3">
              {[
                { label: 'Activate Patrols', action: 'Activate' },
                { label: 'Lockdown Zone', action: 'Lockdown' },
                { label: 'Monitor Activity', action: 'Monitor' },
                { label: 'Review Footage', action: 'Review' },
                { label: 'Alert Authorities', action: 'Alert' }
              ].map((control, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex justify-between items-center"
                >
                  <span className="text-slate-300">{control.label}</span>
                  <span className="text-blue-400 text-sm font-medium">{control.action}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Security Stats */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Security Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Total Cameras', value: '148', change: '+12' },
                { label: 'Patrol Units', value: '24', change: '+2' },
                { label: 'Incidents Today', value: '8', change: '-3' },
                { label: 'Response Time', value: '4.2min', change: '-0.8min' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-400">{stat.label}</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{stat.value}</span>
                    <span className={`text-xs block ${
                      stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
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

export default SecurityCenter;
