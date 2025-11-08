from .traffic_predictor import AdvancedTrafficModel
from .anomaly_detector import AnomalyDetector
from .emergency_predictor import EmergencyPredictor
from .data_processor import DataProcessor

class MLService:
    def __init__(self):
        self.traffic_model = AdvancedTrafficModel()
        self.anomaly_detector = AnomalyDetector()
        self.emergency_predictor = EmergencyPredictor()
        self.data_processor = DataProcessor()
        
    def initialize_models(self):
        """Initialize all ML models"""
        print("Initializing ML models...")
        
        # Train traffic model
        self.traffic_model.train()
        
        # Note: Anomaly detector and emergency predictor would be trained
        # with real data in a production environment
        
        print("ML models initialized successfully!")
    
    def predict_traffic(self, location, time_data=None):
        """Predict traffic conditions"""
        return self.traffic_model.predict(location, **time_data if time_data else {})
    
    def detect_anomalies(self, data):
        """Detect anomalies in sensor data"""
        return self.anomaly_detector.detect(data)
    
    def predict_emergency_risk(self, location, emergency_type, time_data):
        """Predict emergency risk level"""
        return self.emergency_predictor.predict(
            location, emergency_type, 
            time_data['hour'], time_data['day_of_week'], time_data['month']
        )
