import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

class EmergencyPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.location_encoder = LabelEncoder()
        self.type_encoder = LabelEncoder()
        self.is_trained = False
    
    def train(self, historical_data):
        """Train emergency prediction model"""
        try:
            # Encode categorical variables
            locations_encoded = self.location_encoder.fit_transform(historical_data['location'])
            types_encoded = self.type_encoder.fit_transform(historical_data['type'])
            
            # Prepare features
            X = np.column_stack([
                locations_encoded,
                types_encoded,
                historical_data['hour'],
                historical_data['day_of_week'],
                historical_data['month']
            ])
            
            y = historical_data['severity'] > 3  # Predict if severe
            
            # Train model
            self.model.fit(X, y)
            self.is_trained = True
            
            return True
        except Exception as e:
            print(f"Error training emergency predictor: {str(e)}")
            return False
    
    def predict(self, location, emergency_type, hour, day_of_week, month):
        """Predict emergency severity"""
        try:
            if not self.is_trained:
                return 0.5  # Default probability
            
            # Encode inputs
            location_encoded = self.location_encoder.transform([location])[0]
            type_encoded = self.type_encoder.transform([emergency_type])[0]
            
            # Prepare features
            X = np.array([[location_encoded, type_encoded, hour, day_of_week, month]])
            
            probability = self.model.predict_proba(X)[0][1]
            return probability
            
        except Exception as e:
            print(f"Error in emergency prediction: {str(e)}")
            return 0.5
