import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useWebSocket } from '../../contexts/WebSocketContext';

const Header = ({ onMenuClick }) => {
  const { isConnected, realTimeData } = useWebSocket();

  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="flex items-center justify-between p-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-slate-700 lg:hidden"
          >
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search city operations..."
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Connection status */}
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-slate-300 hidden sm:block">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-700">
            <Bell className="w-5 h-5 text-slate-400" />
            {realTimeData.alerts?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {realTimeData.alerts.length}
              </span>
            )}
          </button>

          {/* User profile */}
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700">
            <User className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 hidden sm:block">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
