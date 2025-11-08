import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

class AdvancedTrafficModel:
    def __init__(self):
        self.model = None
        self.location_encoder = LabelEncoder()
        self.model_path = "models/traffic_model.joblib"
        self.is_trained = False
        
    def create_synthetic_data(self, n_samples=5000):
        """Create comprehensive synthetic traffic data"""
        locations = [
            'Main St & 1st Ave', 'Central Square', 'Highway I-95', 
            'Bridge Entrance', 'Tunnel Exit', 'Shopping District',
            'Financial District', 'Residential Area North', 'Industrial Zone'
        ]
        
        data = []
        for _ in range(n_samples):
            location = np.random.choice(locations)
            hour = np.random.randint(0, 24)
            day_of_week = np.random.randint(0, 7)
            month = np.random.randint(1, 13)
            is_weekend = 1 if day_of_week >= 5 else 0
            is_holiday = np.random.choice([0, 1], p=[0.95, 0.05])
            weather = np.random.choice(['clear', 'rain', 'snow'], p=[0.7, 0.25, 0.05])
            
            # Complex congestion calculation
            base_congestion = self._calculate_base_congestion(location, hour, day_of_week)
            weather_impact = self._get_weather_impact(weather)
            holiday_impact = 0.2 if is_holiday else 0
            random_variation = np.random.normal(0, 0.5)
            
            congestion = base_congestion + weather_impact + holiday_impact + random_variation
            congestion = max(1, min(10, round(congestion)))
            
            data.append({
                'location': location,
                'hour': hour,
                'day_of_week': day_of_week,
                'month': month,
                'is_weekend': is_weekend,
                'is_holiday': is_holiday,
                'weather': weather,
                'congestion': congestion
            })
        
        return pd.DataFrame(data)
    
    def _calculate_base_congestion(self, location, hour, day_of_week):
        """Calculate base congestion based on location and time patterns"""
        # Location-specific base congestion
        location_bases = {
            'Main St & 1st Ave': 5,
            'Central Square': 6,
            'Highway I-95': 4,
            'Bridge Entrance': 7,
            'Tunnel Exit': 8,
            'Shopping District': 6,
            'Financial District': 7,
            'Residential Area North': 3,
            'Industrial Zone': 4
        }
        
        base = location_bases.get(location, 5)
        
        # Time patterns
        rush_hour_penalty = 0
        if (7 <= hour <= 9) or (16 <= hour <= 18):  # Rush hours
            rush_hour_penalty = 2
        elif day_of_week >= 5:  # Weekend
            rush_hour_penalty = -1 if hour < 12 else 1
        
        return base + rush_hour_penalty
    
    def _get_weather_impact(self, weather):
        """Get congestion impact based on weather"""
        weather_impacts = {
            'clear': 0,
            'rain': 1.5,
            'snow': 2.5
        }
        return weather_impacts.get(weather, 0)
    
    def train(self):
        """Train the advanced traffic model"""
        try:
            print("Generating synthetic traffic data...")
            df = self.create_synthetic_data(5000)
            
            # Encode categorical variables
            location_encoded = self.location_encoder.fit_transform(df['location'])
            weather_encoded = LabelEncoder().fit_transform(df['weather'])
            
            # Prepare features
            X = np.column_stack([
                location_encoded,
                df['hour'],
                df['day_of_week'],
                df['month'],
                df['is_weekend'],
                df['is_holiday'],
                weather_encoded
            ])
            
            y = df['congestion']
            
            # Train model
            self.model = RandomForestRegressor(
                n_estimators=200,
                max_depth=15,
                min_samples_split=5,
                random_state=42
            )
            
            self.model.fit(X, y)
            self.is_trained = True
            
            # Save model
            os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
            joblib.dump({
                'model': self.model,
                'location_encoder': self.location_encoder
            }, self.model_path)
            
            print("Advanced traffic model trained and saved successfully!")
            return True
            
        except Exception as e:
            print(f"Error training advanced model: {str(e)}")
            return False
    
    def load_model(self):
        """Load pre-trained model"""
        try:
            if os.path.exists(self.model_path):
                loaded = joblib.load(self.model_path)
                self.model = loaded['model']
                self.location_encoder = loaded['location_encoder']
                self.is_trained = True
                print("Advanced traffic model loaded successfully!")
                return True
        except Exception as e:
            print(f"Error loading model: {str(e)}")
        
        return False
    
    def predict(self, location, hour=None, day_of_week=None, month=None, weather='clear'):
        """Make prediction using advanced model"""
        try:
            if not self.is_trained and not self.load_model():
                return self._fallback_prediction()
            
            from datetime import datetime
            now = datetime.now()
            
            if hour is None:
                hour = now.hour
            if day_of_week is None:
                day_of_week = now.weekday()
            if month is None:
                month = now.month
            
            is_weekend = 1 if day_of_week >= 5 else 0
            is_holiday = 0  # Simplified
            
            # Encode inputs
            if location not in self.location_encoder.classes_:
                return self._fallback_prediction()
            
            location_encoded = self.location_encoder.transform([location])[0]
            weather_encoded = 0  # Default to clear
            
            # Prepare features
            X = np.array([[
                location_encoded,
                hour,
                day_of_week,
                month,
                is_weekend,
                is_holiday,
                weather_encoded
            ]])
            
            prediction = self.model.predict(X)[0]
            confidence = min(0.95, max(0.7, 1 - (abs(prediction - round(prediction)) * 2)))
            
            return {
                'prediction': max(1, min(10, round(prediction))),
                'confidence': round(confidence, 2),
                'model': 'advanced'
            }
            
        except Exception as e:
            print(f"Advanced prediction error: {str(e)}")
            return self._fallback_prediction()
    
    def _fallback_prediction(self):
        """Fallback prediction when model is unavailable"""
        return {
            'prediction': random.randint(3, 7),
            'confidence': 0.5,
            'model': 'fallback'
        }
