import React from 'react';
import { Play, Square, RefreshCw, AlertTriangle, Map, Settings } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Play,
      label: 'Start Emergency Protocol',
      description: 'Activate city-wide emergency response',
      color: 'red',
      onClick: () => console.log('Emergency protocol started')
    },
    {
      icon: Square,
      label: 'Stop All Systems',
      description: 'Immediate system shutdown',
      color: 'orange',
      onClick: () => console.log('Systems stopped')
    },
    {
      icon: RefreshCw,
      label: 'Refresh Data',
      description: 'Force update all data streams',
      color: 'blue',
      onClick: () => console.log('Data refreshed')
    },
    {
      icon: AlertTriangle,
      label: 'Test Alerts',
      description: 'Simulate emergency scenarios',
      color: 'yellow',
      onClick: () => console.log('Alert test started')
    },
    {
      icon: Map,
      label: 'Update Zones',
      description: 'Modify operational boundaries',
      color: 'green',
      onClick: () => console.log('Zones updated')
    },
    {
      icon: Settings,
      label: 'System Config',
      description: 'Adjust system parameters',
      color: 'purple',
      onClick: () => console.log('Config opened')
    }
  ];

  const colorClasses = {
    red: 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20',
    green: 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20'
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${colorClasses[action.color]}`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs opacity-75 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
