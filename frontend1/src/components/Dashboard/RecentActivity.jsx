import React from 'react';
import { format } from 'date-fns';

const RecentActivity = () => {
  const activities = [
    { 
      action: 'Traffic pattern analyzed and optimized', 
      time: new Date(), 
      type: 'AI',
      user: 'System'
    },
    { 
      action: 'Emergency vehicle routed through downtown', 
      time: new Date(Date.now() - 2 * 60000), 
      type: 'SYSTEM',
      user: 'Auto-Router'
    },
    { 
      action: 'Power consumption optimized in commercial district', 
      time: new Date(Date.now() - 5 * 60000), 
      type: 'AI',
      user: 'Energy AI'
    },
    { 
      action: 'Security camera alert processed', 
      time: new Date(Date.now() - 8 * 60000), 
      type: 'IoT',
      user: 'Camera #247'
    },
    { 
      action: 'Weather data integrated into predictions', 
      time: new Date(Date.now() - 12 * 60000), 
      type: 'SENSOR',
      user: 'Weather Station'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'AI': return 'bg-purple-500';
      case 'SYSTEM': return 'bg-blue-500';
      case 'IoT': return 'bg-green-500';
      case 'SENSOR': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 py-2">
            <div className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(activity.type)}`}></div>
            
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-sm leading-relaxed">
                {activity.action}
              </p>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-slate-500 text-xs">
                  by {activity.user}
                </span>
                <span className="text-slate-500 text-xs">
                  {format(activity.time, 'HH:mm:ss')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-center text-blue-400 hover:text-blue-300 text-sm font-medium border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
