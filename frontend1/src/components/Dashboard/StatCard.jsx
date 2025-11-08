import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="glass-effect rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className={`text-sm mt-1 flex items-center ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            <span className={`inline-block transform ${trend === 'up' ? 'rotate-0' : 'rotate-180'}`}>
              ↗
            </span>
            {change} from last hour
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} bg-opacity-10`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
