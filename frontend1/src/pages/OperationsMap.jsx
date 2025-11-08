import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl } from 'react-leaflet';
import { useWebSocket } from '../contexts/WebSocketContext';
import { AlertTriangle, Car, Zap, Shield, Eye } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OperationsMap = () => {
  const { realTimeData } = useWebSocket();
  const [center] = useState([40.7128, -74.0060]); // New York coordinates
  const [selectedType, setSelectedType] = useState('ALL');

  const operations = [
    {
      id: 1,
      type: 'TRAFFIC',
      location: 'Highway I-95',
      severity: 5,
      lat: 40.7128,
      lng: -74.0060,
      description: 'Major accident with injuries - Emergency response en route',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'SECURITY',
      location: 'Central Park',
      severity: 3,
      lat: 40.7829,
      lng: -73.9654,
      description: 'Security alert - Suspicious activity detected',
      timestamp: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 3,
      type: 'UTILITY',
      location: 'Financial District',
      severity: 2,
      lat: 40.7074,
      lng: -74.0113,
      description: 'Power fluctuation - Monitoring situation',
      timestamp: new Date(Date.now() - 30 * 60000)
    },
    {
      id: 4,
      type: 'EMERGENCY',
      location: 'Times Square',
      severity: 4,
      lat: 40.7580,
      lng: -73.9855,
      description: 'Medical emergency - EMS dispatched',
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 5,
      type: 'TRAFFIC',
      location: 'Brooklyn Bridge',
      severity: 3,
      lat: 40.7061,
      lng: -73.9969,
      description: 'Heavy congestion - Adjusting traffic signals',
      timestamp: new Date(Date.now() - 10 * 60000)
    }
  ];

  const getIconColor = (type, severity) => {
    if (severity >= 4) return 'red';
    if (severity >= 3) return 'orange';
    
    switch (type) {
      case 'TRAFFIC': return 'blue';
      case 'SECURITY': return 'purple';
      case 'UTILITY': return 'green';
      case 'EMERGENCY': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'TRAFFIC': return <Car className="w-4 h-4" />;
      case 'SECURITY': return <Shield className="w-4 h-4" />;
      case 'UTILITY': return <Zap className="w-4 h-4" />;
      case 'EMERGENCY': return <AlertTriangle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const filteredOperations = selectedType === 'ALL' 
    ? operations 
    : operations.filter(op => op.type === selectedType);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">City Operations Map</h1>
            <p className="text-slate-400 mt-1">Real-time monitoring of all city operations and incidents</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Operations</option>
              <option value="TRAFFIC">Traffic</option>
              <option value="SECURITY">Security</option>
              <option value="UTILITY">Utilities</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
            
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>{filteredOperations.length} Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 glass-effect rounded-xl overflow-hidden">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Standard">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Dark">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {filteredOperations.map(operation => (
            <CircleMarker
              key={operation.id}
              center={[operation.lat, operation.lng]}
              radius={operation.severity * 3}
              fillColor={getIconColor(operation.type, operation.severity)}
              color="#fff"
              weight={2}
              opacity={1}
              fillOpacity={0.6}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(operation.type)}
                    <span className="font-bold text-gray-800">{operation.type}</span>
                    <span className={`px-2 py-1 rounded text-xs text-white ${
                      operation.severity >= 4 ? 'bg-red-500' : 
                      operation.severity >= 3 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      Level {operation.severity}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">{operation.location}</p>
                  <p className="text-sm text-gray-600 mt-1">{operation.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {operation.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="glass-effect rounded-xl p-4 mt-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-slate-300">Emergency/Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-slate-300">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-slate-300">Traffic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-slate-300">Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-300">Utilities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsMap;
