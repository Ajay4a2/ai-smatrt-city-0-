import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Shield } from 'lucide-react';

const AIPredictions = () => {
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock AI predictions data
    setPredictions({
      traffic: {
        prediction: 'Heavy congestion expected in downtown area during evening rush hour',
        confidence: 87,
        impact: 'HIGH',
        recommendation: 'Deploy additional traffic control units and adjust traffic light timing'
      },
      security: {
        prediction: 'Low risk of security incidents in commercial districts',
        confidence: 92,
        impact: 'LOW',
        recommendation: 'Maintain current security patrol levels'
      },
      utilities: {
        prediction: 'Increased power consumption expected due to temperature drop',
        confidence: 78,
        impact: 'MEDIUM',
        recommendation: 'Prepare backup power systems and optimize grid distribution'
      },
      emergency: {
        prediction: 'Higher probability of emergency calls in residential areas',
        confidence: 81,
        impact: 'MEDIUM',
        recommendation: 'Pre-position emergency response teams in key locations'
      }
    });
  }, []);

  const runAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In real implementation, this would call the backend API
    }, 2000);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'HIGH': return 'text-red-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">AI-Powered Predictions</h2>
              <p className="text-slate-400">Machine learning insights for proactive city management</p>
            </div>
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Predictions */}
          <div className="glass-effect rounded-lg p-4 border border-slate-700">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Traffic Patterns</h3>
            </div>
            {predictions.traffic && (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">{predictions.traffic.prediction}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-blue-400 font-semibold">{predictions.traffic.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Impact:</span>
                  <span className={getImpactColor(predictions.traffic.impact)}>
                    {predictions.traffic.impact}
                  </span>
                </div>
                <div className="p-3 rounded bg-slate-800/50">
                  <p className="text-slate-300 text-sm">{predictions.traffic.recommendation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Security Predictions */}
          <div className="glass-effect rounded-lg p-4 border border-slate-700">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Security Risk</h3>
            </div>
            {predictions.security && (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">{predictions.security.prediction}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-blue-400 font-semibold">{predictions.security.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Impact:</span>
                  <span className={getImpactColor(predictions.security.impact)}>
                    {predictions.security.impact}
                  </span>
                </div>
                <div className="p-3 rounded bg-slate-800/50">
                  <p className="text-slate-300 text-sm">{predictions.security.recommendation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Utilities Predictions */}
          <div className="glass-effect rounded-lg p-4 border border-slate-700">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Utilities Demand</h3>
            </div>
            {predictions.utilities && (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">{predictions.utilities.prediction}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-blue-400 font-semibold">{predictions.utilities.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Impact:</span>
                  <span className={getImpactColor(predictions.utilities.impact)}>
                    {predictions.utilities.impact}
                  </span>
                </div>
                <div className="p-3 rounded bg-slate-800/50">
                  <p className="text-slate-300 text-sm">{predictions.utilities.recommendation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Predictions */}
          <div className="glass-effect rounded-lg p-4 border border-slate-700">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Emergency Services</h3>
            </div>
            {predictions.emergency && (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">{predictions.emergency.prediction}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-blue-400 font-semibold">{predictions.emergency.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Impact:</span>
                  <span className={getImpactColor(predictions.emergency.impact)}>
                    {predictions.emergency.impact}
                  </span>
                </div>
                <div className="p-3 rounded bg-slate-800/50">
                  <p className="text-slate-300 text-sm">{predictions.emergency.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI Model Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Traffic Model', accuracy: 94.2, latency: '47ms' },
            { name: 'Security Model', accuracy: 96.8, latency: '52ms' },
            { name: 'Utilities Model', accuracy: 91.5, latency: '38ms' },
            { name: 'Emergency Model', accuracy: 89.7, latency: '61ms' }
          ].map((model, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-white font-medium">{model.name}</p>
              <p className="text-green-400 text-lg font-bold mt-2">{model.accuracy}%</p>
              <p className="text-slate-400 text-sm">Accuracy</p>
              <p className="text-blue-400 text-sm mt-1">{model.latency}</p>
              <p className="text-slate-400 text-xs">Response Time</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;
