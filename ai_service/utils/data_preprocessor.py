from typing import Dict, Any

def preprocess_preferences(preferences: Dict[str, Any]) -> Dict[str, Any]:
    """
    Preprocess user preferences for ML model input.
    """
    processed = {
        'budget': normalize_budget(preferences.get('budget', '')),
        'duration': normalize_duration(preferences.get('duration', '')),
        'interests': normalize_interests(preferences.get('interests', [])),
        'accommodation': preferences.get('accommodation', ''),
        'transportation': preferences.get('transportation', ''),
        'activities': normalize_activities(preferences.get('activities', [])),
        'climate': preferences.get('climate', ''),
        'season': preferences.get('season', ''),
    }
    
    return processed

def normalize_budget(budget: str) -> int:
    """Normalize budget string to integer."""
    if not budget:
        return 0
    
    # Extract numbers from budget string (e.g., "$1000-$2000" -> 2000)
    import re
    numbers = re.findall(r'\d+', budget)
    if numbers:
        # Take the maximum value if range is provided
        return max(int(n) for n in numbers)
    return 0

def normalize_duration(duration: str) -> int:
    """Normalize duration string to integer (days)."""
    if not duration:
        return 0
    
    try:
        return int(duration)
    except (ValueError, TypeError):
        return 0

def normalize_interests(interests: list) -> list:
    """Normalize interests list."""
    if isinstance(interests, str):
        # Split comma-separated string
        return [i.strip().lower() for i in interests.split(',')]
    elif isinstance(interests, list):
        return [str(i).strip().lower() for i in interests]
    return []

def normalize_activities(activities: list) -> list:
    """Normalize activities list."""
    if isinstance(activities, str):
        return [a.strip().lower() for a in activities.split(',')]
    elif isinstance(activities, list):
        return [str(a).strip().lower() for a in activities]
    return []

