# 🚀 Deployment Guide

## 1. Frontend (Next.js) -> Vercel

The easiest way to deploy the frontend is using **Vercel**.

1.  **Push your code** to GitHub.
2.  Go to [Vercel Dashboard](https://vercel.com/new).
3.  Import your repository `legal-contract-summarizer`.
4.  Configure **Root Directory** to `frontend`.
5.  Click **Deploy**.

## 2. Backend (FastAPI) -> Google Cloud Run

To deploy the backend, we use **Google Cloud Run**.

### Prerequisites
- Google Cloud CLI (`gcloud`) installed.
- A Google Cloud Project with billing enabled.
- Vertex AI API enabled.

### Steps

1.  **Navigate to backend**:
    ```bash
    cd backend
    ```

2.  **Create a `Dockerfile`**:
    *(Already provided below if needed, but Cloud Run can also build from source)*

3.  **Deploy using gcloud source deploy**:
    ```bash
    gcloud run deploy legal-summarizer-api \
      --source . \
      --region us-central1 \
      --allow-unauthenticated \
      --set-env-vars GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
    ```

4.  **Copy the URL**:
    Once deployed, you will get a URL like `https://legal-summarizer-api-xyz.a.run.app`.

## 3. Connecting Frontend to Backend

1.  Go back to your **Vercel Project Settings** -> **Environment Variables**.
2.  Add a new variable:
    -   Key: `NEXT_PUBLIC_API_URL`
    -   Value: `https://legal-summarizer-api-xyz.a.run.app` (Your Cloud Run URL)
3.  **Redeploy** the Frontend.

---

### Dockerfile (Backend) reference
If you need a custom Dockerfile for the backend:

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```
