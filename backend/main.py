from fastapi import FastAPI, UploadFile, File
import uvicorn
import os

app = FastAPI(title="Legal Summarizer API")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Legal Summarizer API is running"}

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    return {"filename": file.filename, "message": "File received"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
