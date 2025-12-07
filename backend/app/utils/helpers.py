# Placeholder for helper functions
def generate_interview_id(length: int = 8) -> str:
    """Generate random interview ID"""
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
