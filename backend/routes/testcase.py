from fastapi import APIRouter
from pydantic import BaseModel
from services.azure_openai import call_ai

router = APIRouter()

class TestCaseRequest(BaseModel):
    user_story: str
    app_type: str = "web"

@router.post("/generate-testcases")
async def generate_test_cases(request: TestCaseRequest):
    system_prompt = """You are a senior QA Engineer with 10+ years experience.
    Generate comprehensive test cases in structured JSON format.
    Always include positive, negative, and edge cases."""

    user_prompt = f"""
    Generate test cases for this user story:
    User Story: {request.user_story}
    Application Type: {request.app_type}

    Return ONLY valid JSON:
    {{
        "feature": "feature name",
        "total_cases": 0,
        "test_cases": [
            {{
                "id": "TC001",
                "title": "test title",
                "type": "positive",
                "priority": "high",
                "preconditions": "...",
                "steps": ["step 1", "step 2"],
                "expected_result": "..."
            }}
        ]
    }}
    """
    result = call_ai(system_prompt, user_prompt)
    return {"success": True, "data": result}