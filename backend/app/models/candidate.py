from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class CandidateProject(BaseModel):
    title: str
    description: str
    technologies: List[str]


class CandidateCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    skills: List[str] = []


class Candidate(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: str
    phone: Optional[str] = None
    resume_url: Optional[str] = None
    skills: List[str] = []
    experience: Optional[str] = None
    education: Optional[str] = None
    projects: List[CandidateProject] = []
    achievements: List[str] = []
    summary: Optional[str] = None
    parsed_data: Optional[Dict[str, Any]] = None
    created_at: datetime
    created_by: str

    class Config:
        populate_by_name = True
