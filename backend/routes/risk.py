from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.azure_openai import call_ai

router = APIRouter()

class RiskRequest(BaseModel):
    release_notes: str
    changed_modules: List[str]

@router.post("/analyze-risk")
async def analyze_risk(request: RiskRequest):
    system_prompt = """You are a QA Architect specializing in risk-based testing.
    Identify high-risk areas and prioritize testing."""

    user_prompt = f"""
    Analyze risk for:
    Release Notes: {request.release_notes}
    Changed Modules: {', '.join(request.changed_modules)}

    Return ONLY valid JSON:
    {{
        "risk_level": "high",
        "high_priority_areas": ["area 1"],
        "test_focus": ["what to test first"],
        "regression_scope": "full",
        "estimated_effort": "8 hours",
        "risk_factors": ["risk 1"]
    }}
    """
    result = call_ai(system_prompt, user_prompt)
    return {"success": True, "data": result}