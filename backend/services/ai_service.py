import vertexai
from vertexai.generative_models import GenerativeModel
import os


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
            "summary": "Mock Summary: Project ID missing.",
            "risks": [],
        }

    model = GenerativeModel("gemini-1.0-pro")

    prompt = f"""
    You are a legal expert. Analyze the following contract text.
    
    1. Provide a concise plain-language summary (max 3 sentences).
    2. Identify key risk clauses (Indemnity, Termination, Liability) and rate them (Low, Medium, High).
    3. Extract key entities (Parties, Effective Date, Jurisdiction).

    Format the output as JSON with keys: 'summary', 'risks' (list of objects with 'clause', 'risk_level', 'explanation'), 'entities'.

    Contract Text:
    {text[:10000]}  # Truncate for prototype to avoid token limits if needed
    """

    try:
        response = model.generate_content(prompt)
        # In a real app, we would parse the JSON from response.text using json.loads
        # For this MVP, we return the raw text to demonstrate connection
        return {"raw_analysis": response.text}
    except Exception as e:
        return {"error": str(e)}
