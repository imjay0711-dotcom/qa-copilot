from fastapi import APIRouter, Form
from services.azure_openai import call_ai

router = APIRouter()

@router.post("/generate-bugreport")
async def generate_bug_report(description: str = Form(...)):
    system_prompt = """You are a senior QA Engineer.
    Generate professional detailed bug reports in JSON format."""

    user_prompt = f"""
    Create a bug report for:
    Description: {description}

    Return ONLY valid JSON:
    {{
        "title": "bug title",
        "severity": "high",
        "priority": "P1",
        "steps_to_reproduce": ["step 1", "step 2"],
        "expected_result": "...",
        "actual_result": "...",
        "possible_cause": "...",
        "suggested_fix": "..."
    }}
    """
    result = call_ai(system_prompt, user_prompt)
    return {"success": True, "data": result}