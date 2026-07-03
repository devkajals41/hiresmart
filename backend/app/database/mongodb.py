from motor.motor_asyncio import AsyncIOMotorClient
from app.config.config import settings

client = None
database = None


async def connect_to_mongo():
    global client, database

    client = AsyncIOMotorClient(settings.MONGODB_URI)
    database = client[settings.DATABASE_NAME]

    # Verification
    print("✅ Connected to MongoDB")
   


async def close_mongo_connection():
    global client

    if client:
        client.close()
        print("❌ MongoDB connection closed")