from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class QAMapping(BaseModel):
    question: str
    answer: str
    evaluation: str
    score: float


class TechnicalAssessment(BaseModel):
    coding_skills: float
    problem_solving: float
    communication: float
    technical_knowledge: float


class Report(BaseModel):
    id: str = Field(alias="_id")
    interview_id: str
    qa_mapping: List[QAMapping]
    performance_score: float
    strengths: List[str]
    weaknesses: List[str]
    technical_assessment: TechnicalAssessment
    recommendation: str  # "hire", "reject", "maybe"
    detailed_analysis: str
    generated_at: datetime

    class Config:
        populate_by_name = True


class ReportCreate(BaseModel):
    interview_id: str
    qa_mapping: List[QAMapping]
    performance_score: float
    strengths: List[str]
    weaknesses: List[str]
    technical_assessment: TechnicalAssessment
    recommendation: str
    detailed_analysis: str
