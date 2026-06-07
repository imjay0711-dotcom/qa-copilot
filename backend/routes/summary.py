from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.azure_openai import call_ai

router = APIRouter()

class TestResult(BaseModel):
    test_name: str
    status: str
    module: str

class SummaryRequest(BaseModel):
    sprint_name: str
    results: List[TestResult]

@router.post("/generate-summary")
async def generate_summary(request: SummaryRequest):
    results_text = "\n".join([
        f"- {r.test_name} | {r.status} | {r.module}"
        for r in request.results
    ])

    system_prompt = """You are a QA Lead writing executive test reports.
    Be concise, professional, highlight risks clearly."""

    user_prompt = f"""
    Generate test summary for:
    Sprint: {request.sprint_name}
    Results:
    {results_text}

    Return ONLY valid JSON:
    {{
        "summary": "executive summary",
        "total_tests": 0,
        "passed": 0,
        "failed": 0,
        "pass_rate": "0%",
        "risk_level": "medium",
        "recommendation": "go/no-go",
        "key_observations": ["obs 1", "obs 2"]
    }}
    """
    result = call_ai(system_prompt, user_prompt)
    return {"success": True, "data": result}