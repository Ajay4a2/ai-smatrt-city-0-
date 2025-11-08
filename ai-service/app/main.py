from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import random
from datetime import datetime, timedelta
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock AI models
traffic_model = None
trend_model = None

class TrafficPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.location_encoder = LabelEncoder()
        self.is_trained = False
        
    def train_model(self):
        """Train a simple traffic prediction model with mock data"""
        try:
            # Generate mock training data
            np.random.seed(42)
            locations = ['Main St & 1st Ave', 'Central Square', 'Highway I-95', 'Bridge Entrance', 'Tunnel Exit']
            n_samples = 1000
            
            data = []
            for _ in range(n_samples):
                location = random.choice(locations)
                hour = random.randint(0, 23)
                day_of_week = random.randint(0, 6)
                is_weekend = 1 if day_of_week >= 5 else 0
                
                # Base congestion based on location and time
                base_congestion = {
                    'Main St & 1st Ave': 5 + 2 * np.sin(hour * np.pi / 12),
                    'Central Square': 4 + 3 * np.sin(hour * np.pi / 12),
                    'Highway I-95': 3 + 4 * np.sin((hour - 7) * np.pi / 12),
                    'Bridge Entrance': 6 + 3 * np.sin((hour - 8) * np.pi / 12),
                    'Tunnel Exit': 7 + 2 * np.sin((hour - 17) * np.pi / 12)
                }
                
                congestion = max(1, min(10, base_congestion[location] + random.gauss(0, 1)))
                
                data.append({
                    'location': location,
                    'hour': hour,
                    'day_of_week': day_of_week,
                    'is_weekend': is_weekend,
                    'congestion': congestion
                })
            
            df = pd.DataFrame(data)
            
            # Encode locations
            locations_encoded = self.location_encoder.fit_transform(df['location'])
            
            # Prepare features
            X = np.column_stack([
                locations_encoded,
                df['hour'],
                df['day_of_week'],
                df['is_weekend']
            ])
            y = df['congestion']
            
            # Train model
            self.model.fit(X, y)
            self.is_trained = True
            logger.info("Traffic prediction model trained successfully")
            
        except Exception as e:
            logger.error(f"Error training traffic model: {str(e)}")
            self.is_trained = False
    
    def predict(self, location, hour=None, day_of_week=None):
        """Predict traffic congestion for a location"""
        try:
            if not self.is_trained:
                self.train_model()
            
            if hour is None:
                hour = datetime.now().hour
            if day_of_week is None:
                day_of_week = datetime.now().weekday()
            
            is_weekend = 1 if day_of_week >= 5 else 0
            
            # Encode location
            if location not in self.location_encoder.classes_:
                # If unknown location, use average
                return random.randint(3, 7)
            
            location_encoded = self.location_encoder.transform([location])[0]
            
            # Prepare features
            X = np.array([[location_encoded, hour, day_of_week, is_weekend]])
            
            prediction = self.model.predict(X)[0]
            return max(1, min(10, round(prediction)))
            
        except Exception as e:
            logger.error(f"Error predicting traffic: {str(e)}")
            # Fallback prediction
            return random.randint(3, 7)

class TrendAnalyzer:
    def __init__(self):
        self.operation_types = ['TRAFFIC', 'SECURITY', 'UTILITY', 'EMERGENCY']
    
    def analyze_trends(self, operations_data=None):
        """Analyze trends in city operations"""
        try:
            # Mock trend analysis
            trends = {
                "overall_trend": "stable",
                "alerts": [
                    {
                        "type": "TRAFFIC",
                        "level": "warning",
                        "message": "Increased congestion expected during evening rush hour"
                    },
                    {
                        "type": "SECURITY", 
                        "level": "info",
                        "message": "All security systems operational"
                    }
                ],
                "recommendations": [
                    "Deploy additional traffic control units to downtown area",
                    "Schedule utility maintenance during off-peak hours",
                    "Monitor weather conditions for potential emergency response needs"
                ],
                "metrics": {
                    "total_incidents_today": random.randint(15, 25),
                    "average_response_time": f"{random.randint(5, 15)} minutes",
                    "system_efficiency": f"{random.randint(85, 95)}%"
                }
            }
            
            return trends
            
        except Exception as e:
            logger.error(f"Error analyzing trends: {str(e)}")
            return {"error": "Trend analysis temporarily unavailable"}

# Initialize models
traffic_predictor = TrafficPredictor()
trend_analyzer = TrendAnalyzer()

@app.route('/')
def home():
    return jsonify({
        "message": "Smart City AI Service",
        "status": "operational",
        "endpoints": {
            "traffic_prediction": "/predict/traffic?location=<location>",
            "trend_analysis": "/analyze/trends",
            "health": "/health"
        }
    })

@app.route('/predict/traffic')
def predict_traffic():
    location = request.args.get('location', 'Central Square')
    
    try:
        # Get current time for prediction
        now = datetime.now()
        hour = now.hour
        day_of_week = now.weekday()
        
        # Predict congestion
        congestion = traffic_predictor.predict(location, hour, day_of_week)
        
        # Generate prediction message based on congestion level
        if congestion <= 3:
            status = "Light"
            message = f"Light traffic expected at {location}"
        elif congestion <= 6:
            status = "Moderate" 
            message = f"Moderate traffic expected at {location}"
        else:
            status = "Heavy"
            message = f"Heavy traffic expected at {location}"
        
        response = {
            "location": location,
            "predicted_congestion": congestion,
            "status": status,
            "message": message,
            "timestamp": now.isoformat(),
            "confidence": round(random.uniform(0.7, 0.95), 2)
        }
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in traffic prediction: {str(e)}")
        return jsonify({
            "error": "Prediction service temporarily unavailable",
            "fallback_prediction": "Moderate traffic expected"
        }), 500

@app.route('/analyze/trends')
def analyze_trends():
    try:
        trends = trend_analyzer.analyze_trends()
        return jsonify(trends)
    except Exception as e:
        logger.error(f"Error in trend analysis: {str(e)}")
        return jsonify({
            "error": "Trend analysis service temporarily unavailable"
        }), 500

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "ai-service",
        "timestamp": datetime.now().isoformat(),
        "models_loaded": True
    })

@app.route('/simulate/emergency')
def simulate_emergency():
    """Simulate emergency data for testing"""
    emergencies = [
        {
            "type": "TRAFFIC",
            "location": "Highway I-95",
            "severity": random.randint(3, 5),
            "description": "Multi-vehicle collision reported",
            "timestamp": datetime.now().isoformat()
        },
        {
            "type": "UTILITY", 
            "location": "Downtown",
            "severity": random.randint(2, 4),
            "description": "Power outage affecting multiple buildings",
            "timestamp": datetime.now().isoformat()
        },
        {
            "type": "SECURITY",
            "location": "Central Park",
            "severity": random.randint(1, 3),
            "description": "Security alert - suspicious activity",
            "timestamp": datetime.now().isoformat()
        }
    ]
    
    return jsonify({
        "emergencies": emergencies,
        "total": len(emergencies),
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    # Train models on startup
    traffic_predictor.train_model()
    
    app.run(host='0.0.0.0', port=5000, debug=True)
