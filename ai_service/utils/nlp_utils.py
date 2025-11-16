import re
from typing import Dict, List

def analyze_text(text: str) -> Dict:
    """
    Analyze text to extract sentiment and key topics.
    Placeholder implementation - replace with actual NLP model.
    """
    # Simple keyword extraction
    keywords = extract_keywords(text)
    sentiment = analyze_sentiment(text)
    
    return {
        'keywords': keywords,
        'sentiment': sentiment,
        'topics': extract_topics(text)
    }

def extract_keywords(text: str) -> List[str]:
    """Extract keywords from text."""
    # Simple keyword extraction (replace with NLTK/spaCy in production)
    words = re.findall(r'\b\w+\b', text.lower())
    # Filter common words
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    keywords = [w for w in words if w not in stop_words and len(w) > 3]
    return list(set(keywords))[:10]

def analyze_sentiment(text: str) -> str:
    """Simple sentiment analysis (replace with actual model)."""
    positive_words = ['love', 'like', 'enjoy', 'amazing', 'beautiful', 'great', 'wonderful']
    negative_words = ['hate', 'dislike', 'bad', 'terrible', 'awful']
    
    text_lower = text.lower()
    positive_count = sum(1 for word in positive_words if word in text_lower)
    negative_count = sum(1 for word in negative_words if word in text_lower)
    
    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'

def extract_topics(text: str) -> List[str]:
    """Extract topics from text."""
    topics = []
    topic_keywords = {
        'beach': ['beach', 'ocean', 'sea', 'coast', 'sand'],
        'mountain': ['mountain', 'hiking', 'trail', 'summit', 'peak'],
        'culture': ['museum', 'art', 'culture', 'history', 'heritage'],
        'food': ['food', 'restaurant', 'cuisine', 'dining', 'eat'],
        'adventure': ['adventure', 'sports', 'activity', 'outdoor', 'extreme'],
    }
    
    text_lower = text.lower()
    for topic, keywords in topic_keywords.items():
        if any(keyword in text_lower for keyword in keywords):
            topics.append(topic)
    
    return topics

def extract_preferences(text: str) -> Dict:
    """Extract travel preferences from text."""
    preferences = {
        'interests': extract_topics(text),
        'budget': extract_budget(text),
        'duration': extract_duration(text),
    }
    return preferences

def extract_budget(text: str) -> str:
    """Extract budget information from text."""
    # Look for budget patterns like "$1000", "1000 dollars", etc.
    patterns = [
        r'\$(\d+)',
        r'(\d+)\s*dollars?',
        r'budget.*?(\d+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text.lower())
        if match:
            return match.group(1)
    
    return ''

def extract_duration(text: str) -> str:
    """Extract duration information from text."""
    # Look for duration patterns like "7 days", "one week", etc.
    patterns = [
        r'(\d+)\s*days?',
        r'(\d+)\s*weeks?',
        r'duration.*?(\d+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text.lower())
        if match:
            return match.group(1)
    
    return ''

