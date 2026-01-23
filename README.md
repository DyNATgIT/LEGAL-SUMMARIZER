⚖️ Legal Summarizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com/DyNATgIT/LEGAL-SUMMARIZER)

**Legal Summarizer** is an NLP-powered tool designed to simplify complex legal documents. By leveraging [State specific model/library, e.g., Large Language Models (LLMs) / Hugging Face Transformers], this application extracts key information and generates concise summaries from lengthy contracts, court rulings, and terms of service.

---

## 🚀 Features

- **Document Parsing:** Supports uploading of `.pdf`, `.docx`, and `.txt` files.
- **Abstractive Summarization:** Generates human-readable summaries rather than just extracting sentences.
- **Key Entity Extraction:** Identifies parties involved, dates, and monetary amounts.
- **Customizable Length:** Choose between Short, Medium, or Detailed summaries.
- **User-Friendly Interface:** Built with React for easy interaction.

## 🛠️ Tech Stack

- **Language:** Python ,TYPESCRIPT,JAVASCRIPT
- **NLP Engine:** VERTEX AI ,ANTIGRAVITY ,GEMINI 3 PRO
- **Frontend/UI:** NEXTJS

## 📸 Screenshots

<img width="1918" height="882" alt="image" src="https://github.com/user-attachments/assets/05be0bb9-e0db-456d-84ff-e9e93afb4311" />


## 📦 Installation

Follow these steps to set up the project locally.

### Prerequisites
- Python 3.8 or higher
- GEMINI3 PRO AI API Key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DyNATgIT/LEGAL-SUMMARIZER.git
   cd LEGAL-SUMMARIZER
   ```

2. **Create a Virtual Environment (Recommended)**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables USING GEMINI 3 PRO**
   create a `.env` file in the root directory:
   ```env
   GEMINI3PRO_API_KEY=your_api_key_here
   ```

5. **Run the Application**
   ```bash
   # If using Streamlit
   streamlit run app.py

   # If using Python/Flask
   python app.py
   ```

## 📖 Usage

1. Open the local URL provided in the terminal (usually `http://localhost:8501` or `http://127.0.0.1:5000`).
2. Upload a legal document (PDF or Text).
3. Select your desired summary settings.
4. Click **Summarize**.
5. Copy or download the resulting text.

## ⚠️ Disclaimer

This tool is for **informational purposes only**. It uses Artificial Intelligence to generate summaries and may contain errors or omissions. It should **not** be considered as a substitute for professional legal advice. Always consult with a qualified attorney for legal matters.

## 🗺️ Roadmap

- [ ] Add support for OCR (Scanned PDFs).
- [ ] Multi-language support.
- [ ] Export summaries to PDF/Word.
- [ ] "Chat with your PDF" feature.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**DyNATgIT** - [GitHub Profile](https://github.com/DyNATgIT)

Project Link: https://legal-contract-summarizer.vercel.app/
```



