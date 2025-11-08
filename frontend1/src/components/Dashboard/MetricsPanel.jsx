import React from 'react';
import { Users, TrendingUp, Clock, Zap, Cpu, Wifi } from 'lucide-react';

const MetricsPanel = () => {
  const metrics = [
    { icon: Users, label: 'Connected Devices', value: '1,247', change: '+5.2%' },
    { icon: TrendingUp, label: 'Data Processed', value: '2.4TB', change: '+12.7%' },
    { icon: Clock, label: 'Response Time', value: '47ms', change: '-8.3%' },
    { icon: Zap, label: 'AI Accuracy', value: '94.2%', change: '+1.5%' },
    { icon: Cpu, label: 'CPU Usage', value: '68%', change: '+3.1%' },
    { icon: Wifi, label: 'Network Health', value: '99.8%', change: '+0.2%' }
  ];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">System Metrics</h2>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith('+');
          
          return (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-slate-700">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">{metric.label}</p>
                  <p className="text-white font-semibold">{metric.value}</p>
                </div>
              </div>
              
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">System Status</span>
          <span className="text-green-400 font-medium">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
