import vertexai
from vertexai.generative_models import GenerativeModel
import os
import json

# Initialize Vertex AI
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")

if PROJECT_ID:
    vertexai.init(project=PROJECT_ID, location=LOCATION)


def analyze_contract_text(text: str) -> dict:
    """
    Analyzes contract text using Gemini Pro to extract summaries and risks.
    """
    if not PROJECT_ID:
        return {
            "error": "Google Cloud Project ID not set",
            "summary": "Mock Summary (Project ID missing): This is a placeholder summary because the backend is not connected to a Google Cloud Project.",
            "risks": [],
            "extracted_clauses": {},
        }

    # Using Gemini 1.5 Pro as requested
    try:
        model = GenerativeModel("gemini-1.5-pro")
    except Exception:
        # Fallback to 1.0 if 1.5 not available in region or project
        model = GenerativeModel("gemini-1.0-pro")

    system_prompt = (
        "You are a legal assistant. Summarise the following contract in plain "
        "language, extract key clauses (e.g., Termination, Indemnity, Liability), "
        "and flag any clauses that appear risky or ambiguous."
    )

    user_prompt = f"""
    Contract:
    
    {text[:20000]} 
    
    Please return JSON with keys: 
    - summary (string) 
    - risk_flags (list of strings: names of risky clauses)
    - risks (list of objects with 'clause', 'risk_level', 'explanation')
    - extracted_clauses (dict mapping clause name -> text)
    """

    try:
        response = model.generate_content(
            [system_prompt, user_prompt],
            generation_config={"response_mime_type": "application/json"},
        )

        # Parse standard JSON response
        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            # Fallback if model didn't output strict JSON despite mime_type hint
            return {"raw_analysis": response.text}

    except Exception as e:
        return {"error": str(e)}
