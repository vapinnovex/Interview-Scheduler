import os
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ai_interview_system")

# Async client for FastAPI
client: AsyncIOMotorClient = None
database: AsyncIOMotorDatabase = None


async def connect_to_mongo():
    """Connect to MongoDB"""
    global client, database
    client = AsyncIOMotorClient(MONGODB_URL)
    database = client[DATABASE_NAME]
    await create_indexes()
    print(f"✓ Connected to MongoDB: {DATABASE_NAME}")


async def close_mongo_connection():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("✓ MongoDB connection closed")


async def create_indexes():
    """Create indexes for all collections"""
    # Users collection
    users_collection = database.get_collection("users")
    await users_collection.create_index("email", unique=True)
    
    # Interviews collection
    interviews_collection = database.get_collection("interviews")
    await interviews_collection.create_index("interview_id", unique=True)
    await interviews_collection.create_index("candidate_id")
    await interviews_collection.create_index("admin_id")
    
    # Transcripts collection
    transcripts_collection = database.get_collection("transcripts")
    await transcripts_collection.create_index([("interview_id", 1), ("sequence", 1)])
    
    # Candidates collection
    candidates_collection = database.get_collection("candidates")
    await candidates_collection.create_index("email")
    
    # Reports collection
    reports_collection = database.get_collection("reports")
    await reports_collection.create_index("interview_id")
    
    print("✓ MongoDB indexes created")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return database
