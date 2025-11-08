import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def train(self, data):
        """Train anomaly detection model"""
        try:
            # Scale the data
            scaled_data = self.scaler.fit_transform(data)
            
            # Train model
            self.model.fit(scaled_data)
            self.is_trained = True
            
            # Save model
            joblib.dump({
                'model': self.model,
                'scaler': self.scaler
            }, 'models/anomaly_detector.joblib')
            
            return True
        except Exception as e:
            print(f"Error training anomaly detector: {str(e)}")
            return False
    
    def detect(self, data):
        """Detect anomalies in data"""
        if not self.is_trained:
            return np.array([False] * len(data))
        
        scaled_data = self.scaler.transform(data)
        predictions = self.model.predict(scaled_data)
        return predictions == -1
