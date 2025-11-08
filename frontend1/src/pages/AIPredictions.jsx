import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Car, Shield, Clock } from 'lucide-react';

const AIPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const samplePredictions = [
    {
      id: 1,
      type: 'TRAFFIC',
      location: 'Highway I-95 North',
      prediction: 'Heavy congestion expected',
      confidence: 92,
      timeframe: 'Next 2 hours',
      impact: 'HIGH',
      recommendation: 'Adjust traffic signals and suggest alternate routes'
    },
    {
      id: 2,
      type: 'WEATHER',
      location: 'Downtown Area',
      prediction: 'Heavy rainfall likely',
      confidence: 88,
      timeframe: 'Next 4 hours',
      impact: 'MEDIUM',
      recommendation: 'Prepare drainage systems and issue public alert'
    },
    {
      id: 3,
      type: 'SECURITY',
      location: 'Central Station',
      prediction: 'Increased crowd density expected',
      confidence: 76,
      timeframe: 'Next 6 hours',
      impact: 'LOW',
      recommendation: 'Deploy additional security personnel'
    },
    {
      id: 4,
      type: 'UTILITY',
      location: 'Power Grid Sector B',
      prediction: 'High energy demand spike',
      confidence: 85,
      timeframe: 'Next 3 hours',
      impact: 'HIGH',
      recommendation: 'Activate backup generators and optimize load distribution'
    },
    {
      id: 5,
      type: 'PUBLIC_SAFETY',
      location: 'Waterfront Area',
      prediction: 'Strong winds and potential flooding',
      confidence: 79,
      timeframe: 'Next 8 hours',
      impact: 'MEDIUM',
      recommendation: 'Close waterfront parks and issue safety warnings'
    }
  ];

  const aiModels = [
    {
      name: 'Traffic Flow Predictor',
      accuracy: 94.2,
      status: 'ACTIVE',
      lastTraining: '2 hours ago',
      predictionsToday: 1247
    },
    {
      name: 'Anomaly Detection Engine',
      accuracy: 96.8,
      status: 'ACTIVE',
      lastTraining: '4 hours ago',
      predictionsToday: 892
    },
    {
      name: 'Resource Optimizer',
      accuracy: 91.5,
      status: 'ACTIVE',
      lastTraining: '6 hours ago',
      predictionsToday: 567
    },
    {
      name: 'Emergency Response Predictor',
      accuracy: 88.3,
      status: 'TRAINING',
      lastTraining: 'In progress',
      predictionsToday: 234
    }
  ];

  useEffect(() => {
    setPredictions(samplePredictions);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'TRAFFIC': return <Car className="w-5 h-5" />;
      case 'SECURITY': return <Shield className="w-5 h-5" />;
      case 'UTILITY': return <Zap className="w-5 h-5" />;
      case 'WEATHER': return <TrendingUp className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'HIGH': return 'text-red-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <span>AI Predictions & Analytics</span>
            </h1>
            <p className="text-slate-400 mt-1">Machine learning predictions and intelligent insights for city operations</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Model Accuracy</p>
              <p className="text-2xl font-bold text-green-400">92.7%</p>
            </div>
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Models Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">AI Models Status</h2>
            <div className="space-y-4">
              {aiModels.map((model, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{model.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      model.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {model.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Accuracy</span>
                      <span className="text-green-400 font-medium">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Training</span>
                      <span className="text-slate-300">{model.lastTraining}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Predictions Today</span>
                      <span className="text-blue-400 font-medium">{model.predictionsToday}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Model Controls</h2>
            <div className="space-y-3">
              {[
                { label: 'Retrain All Models', action: 'Retrain' },
                { label: 'Update Training Data', action: 'Update' },
                { label: 'Run Predictions', action: 'Run' },
                { label: 'Export Insights', action: 'Export' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex justify-between items-center"
                >
                  <span className="text-slate-300">{action.label}</span>
                  <span className="text-blue-400 text-sm font-medium">{action.action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Predictions List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Active Predictions</h2>
              <div className="flex items-center space-x-4">
                <span className="text-slate-400 text-sm">{predictions.length} active predictions</span>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                  Generate New Predictions
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {predictions.map(prediction => (
                <div key={prediction.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        {getTypeIcon(prediction.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{prediction.type.replace('_', ' ')}</span>
                          <span className={`text-xs px-2 py-1 rounded ${getImpactColor(prediction.impact)} bg-opacity-20`}>
                            {prediction.impact} Impact
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm mt-1">{prediction.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </div>
                      <p className="text-slate-400 text-sm">Confidence</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-slate-300 font-medium">{prediction.prediction}</p>
                    <p className="text-slate-400 text-sm mt-1">{prediction.recommendation}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{prediction.timeframe}</span>
                      </div>
                      <span>•</span>
                      <span>Generated 15 minutes ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Analytics */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Prediction Analytics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Predictions', value: '2,847', change: '+12%' },
                { label: 'Accuracy Rate', value: '92.7%', change: '+2.1%' },
                { label: 'Active Models', value: '4', change: '+1' },
                { label: 'Avg Response Time', value: '3.2s', change: '-0.8s' }
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-700/50 text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                  <p className={`text-xs mt-1 ${
                    stat.change.startsWith('+') || !stat.change.includes('%') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;
