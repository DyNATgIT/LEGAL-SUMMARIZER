from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from services.ai_service import analyze_contract_text

app = FastAPI(title="Legal Summarizer API")

# ------------------------------------------------------------------
# CORS (for local dev)
# ------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Allow all origins for the MVP (simplifies Vercel/Render connection)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Legal Summarizer API is running"}


@app.post("/api/summarize")
async def summarize_contract_endpoint(file: UploadFile = File(...)):
    """
    Accepts a PDF/DOCX (or any text file) and returns the summary.
    """
    if not file.filename.lower().endswith((".pdf", ".docx", ".txt")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Read file content (assuming text for now)
    try:
        content = await file.read()
        # In a real app you’d use PyMuPDF / python-docx or Google Document AI OCR.
        text = content.decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read file: {e}")

    analysis = analyze_contract_text(text)

    # Check for error in analysis result
    if "error" in analysis:
        # If it's a configuration error (missing ID), we still return 200 with the error displayed in JSON for the prototype
        pass

    return JSONResponse(content=analysis)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
