from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class Transcript(BaseModel):
    id: str = Field(alias="_id")
    interview_id: str
    speaker: str  # "ai", "candidate", "interviewer"
    text: str
    timestamp: datetime
    audio_url: Optional[str] = None
    sequence: int

    class Config:
        populate_by_name = True


class TranscriptCreate(BaseModel):
    interview_id: str
    speaker: str
    text: str
    audio_url: Optional[str] = None
