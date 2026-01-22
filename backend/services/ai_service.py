import google.generativeai as genai
import os
import json

# Configure Gemini API
# Get your free API key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def analyze_contract_text(text: str) -> dict:
    """
    Analyzes contract text using Gemini 1.5 Pro (via Google AI Studio) to extract summaries and risks.
    """
    if not GEMINI_API_KEY:
        return {
            "error": "GEMINI_API_KEY not set",
            "summary": "Mock Summary (API Key missing): Please set GEMINI_API_KEY in your environment variables.",
            "risk_flags": [],
            "extracted_clauses": {},
        }

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")

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
        - extracted_clauses (dict mapping clause name -> text)
        """

        # Set generation config to enforce JSON response
        generation_config = genai.GenerationConfig(
            response_mime_type="application/json"
        )

        response = model.generate_content(
            [system_prompt, user_prompt], generation_config=generation_config
        )

        # Parse standard JSON response
        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            return {"raw_analysis": response.text}

    except Exception as e:
        return {"error": str(e)}
