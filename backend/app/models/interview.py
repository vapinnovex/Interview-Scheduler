from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class InterviewType(str, Enum):
    AI_BASED = "ai_based"
    AI_ASSISTED = "ai_assisted"


class InterviewStatus(str, Enum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    EXPIRED = "expired"


class InterviewCreate(BaseModel):
    candidate_id: str
    job_description: str
    interview_type: InterviewType
    expiry_date: datetime


class Interview(BaseModel):
    id: str = Field(alias="_id")
    interview_id: str
    candidate_id: str
    admin_id: str
    job_description: str
    interview_type: str
    status: str
    scheduled_at: datetime
    expiry_date: datetime
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        populate_by_name = True
