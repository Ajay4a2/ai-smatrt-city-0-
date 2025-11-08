import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

const AlertPanel = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500';
      case 'WARNING': return 'bg-yellow-500';
      case 'INFO': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'investigating': return 'text-yellow-400';
      case 'monitoring': return 'text-blue-400';
      case 'resolved': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span>Critical Alerts</span>
        </h2>
        <span className="text-slate-400 text-sm">{alerts.length} active</span>
      </div>
      
      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 highlight-update">
            <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(alert.severity)}`}></div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium bg-red-500/20 px-2 py-1 rounded text-sm">
                    {alert.type}
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400 text-sm">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{alert.location}</span>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {alert.description}
              </p>
              
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                  Acknowledge
                </button>
                <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;
