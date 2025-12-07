from pydantic import BaseModel
from typing import List, Dict, Any, Optional


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


class ReportSchema(BaseModel):
    interview_id: str
    qa_mapping: List[QAMapping]
    performance_score: float
    strengths: List[str]
    weaknesses: List[str]
    technical_assessment: TechnicalAssessment
    recommendation: str  # "hire", "reject", "maybe"
    detailed_analysis: str
    additional_notes: Optional[Dict[str, Any]] = None
