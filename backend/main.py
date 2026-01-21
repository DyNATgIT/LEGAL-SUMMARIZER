from fastapi import FastAPI, UploadFile, File
import uvicorn
from services.ai_service import analyze_contract_text

app = FastAPI(title="Legal Summarizer API")


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Legal Summarizer API is running"}


@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(...)):
    # Read file content (assuming text for now)
    content = await file.read()
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        text = "Binary file content placeholder"

    analysis = analyze_contract_text(text)
    return {"filename": file.filename, "analysis": analysis}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
