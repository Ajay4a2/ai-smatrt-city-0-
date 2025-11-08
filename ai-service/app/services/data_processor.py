import pandas as pd
import numpy as np
from datetime import datetime

class DataProcessor:
    def __init__(self):
        pass
    
    def process_traffic_data(self, raw_data):
        """Process raw traffic data for ML models"""
        processed = []
        
        for data_point in raw_data:
            processed.append({
                'location': data_point['location'],
                'congestion': data_point['congestion_level'],
                'hour': data_point['timestamp'].hour,
                'day_of_week': data_point['timestamp'].weekday(),
                'month': data_point['timestamp'].month,
                'vehicles': data_point['vehicle_count']
            })
        
        return pd.DataFrame(processed)
    
    def process_emergency_data(self, raw_data):
        """Process raw emergency data for ML models"""
        processed = []
        
        for data_point in raw_data:
            processed.append({
                'location': data_point['location'],
                'type': data_point['incident_type'],
                'severity': data_point['severity'],
                'hour': data_point['reported_at'].hour,
                'day_of_week': data_point['reported_at'].weekday(),
                'month': data_point['reported_at'].month
            })
        
        return pd.DataFrame(processed)
