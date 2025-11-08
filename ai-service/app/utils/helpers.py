import json
from datetime import datetime

def json_serializer(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def save_model_metrics(model_name, metrics):
    """Save model metrics to file"""
    try:
        with open(f'models/{model_name}_metrics.json', 'w') as f:
            json.dump(metrics, f, default=json_serializer, indent=2)
    except Exception as e:
        print(f"Error saving model metrics: {str(e)}")

def load_model_metrics(model_name):
    """Load model metrics from file"""
    try:
        with open(f'models/{model_name}_metrics.json', 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading model metrics: {str(e)}")
        return {}
