import React from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';
import { 
  Activity, 
  Car, 
  Shield, 
  Zap, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Clock,
  Eye
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import AlertPanel from '../components/Dashboard/AlertPanel';
import MetricsPanel from '../components/Dashboard/MetricsPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';
import QuickActions from '../components/Dashboard/QuickActions';

const Dashboard = () => {
  const { realTimeData } = useWebSocket();

  const stats = [
    {
      title: 'Active Operations',
      value: realTimeData.operations?.length || 24,
      change: '+12%',
      icon: Activity,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Traffic Incidents',
      value: realTimeData.traffic?.filter(t => t.congestionLevel > 7)?.length || 8,
      change: '-5%',
      icon: Car,
      color: 'orange',
      trend: 'down'
    },
    {
      title: 'Security Alerts',
      value: realTimeData.operations?.filter(op => op.operationType === 'SECURITY' && op.severity > 3)?.length || 3,
      change: '+2%',
      icon: Shield,
      color: 'red',
      trend: 'up'
    },
    {
      title: 'System Uptime',
      value: '98.7%',
      change: '+0.3%',
      icon: Zap,
      color: 'green',
      trend: 'up'
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      type: 'TRAFFIC',
      location: 'Highway I-95 North',
      severity: 'CRITICAL',
      time: '2 min ago',
      description: 'Major accident blocking three lanes - Emergency response dispatched',
      status: 'active'
    },
    {
      id: 2,
      type: 'UTILITY',
      location: 'Downtown Power Grid',
      severity: 'WARNING',
      time: '15 min ago',
      description: 'Voltage fluctuation detected in sector 4B',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'SECURITY',
      location: 'Central Station',
      severity: 'WARNING',
      time: '25 min ago',
      description: 'Unusual activity detected - Security team alerted',
      status: 'monitoring'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">City Operations Dashboard</h1>
            <p className="text-slate-400 mt-1">Real-time monitoring and management of smart city systems</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Eye className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <AlertPanel alerts={criticalAlerts} />
          <QuickActions />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <MetricsPanel />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
