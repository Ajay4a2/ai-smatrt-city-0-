import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OperationsMap = ({ realTimeData }) => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockOperations = [
      {
        id: 1,
        type: 'TRAFFIC',
        location: 'Highway I-95',
        severity: 5,
        lat: 40.7128,
        lng: -74.0060,
        description: 'Major accident with injuries'
      },
      {
        id: 2,
        type: 'SECURITY',
        location: 'Central Park',
        severity: 3,
        lat: 40.7829,
        lng: -73.9654,
        description: 'Security patrol increased'
      },
      {
        id: 3,
        type: 'UTILITY',
        location: 'Downtown',
        severity: 2,
        lat: 40.7589,
        lng: -73.9851,
        description: 'Power maintenance scheduled'
      },
      {
        id: 4,
        type: 'EMERGENCY',
        location: 'Main Hospital',
        severity: 5,
        lat: 40.7411,
        lng: -73.9897,
        description: 'Ambulance dispatch required'
      }
    ];
    setOperations(mockOperations);
  }, []);

  const getMarkerColor = (severity) => {
    if (severity >= 4) return 'red';
    if (severity >= 3) return 'orange';
    return 'green';
  };

  const center = [40.7128, -74.0060];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">City Operations Map</h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {operations.map(op => (
            <CircleMarker
              key={op.id}
              center={[op.lat, op.lng]}
              radius={15}
              pathOptions={{
                color: getMarkerColor(op.severity),
                fillColor: getMarkerColor(op.severity),
                fillOpacity: 0.6
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{op.type} Alert</h3>
                  <p className="text-sm">{op.location}</p>
                  <p className="text-sm mt-1">{op.description}</p>
                  <p className={`text-sm font-semibold mt-1 ${
                    op.severity >= 4 ? 'text-red-600' : 
                    op.severity >= 3 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    Severity: {op.severity}/5
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-slate-300">Critical (4-5)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-slate-300">Warning (3)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-300">Normal (1-2)</span>
        </div>
        <div className="text-sm text-slate-400">
          {operations.length} Active Operations
        </div>
      </div>
    </div>
  );
};

export default OperationsMap;
