# ATS Resume Scorer

A web app that scores how well a resume matches a job description and returns actionable feedback. Built with FastAPI + React, using spaCy and Sentence Transformers for NLP and the Groq API for LLM-generated suggestions.

## What it does

1. Upload a resume (PDF / DOC / DOCX) and paste a job description.
2. The backend parses the resume, extracts skills and experience, and compares them to the JD using semantic similarity.
3. You get an ATS score, a breakdown by category (formatting, keywords, content, skill validation, ATS compatibility), and LLM-written suggestions for what to improve.
4. Past analyses are saved to your account so you can revisit them.

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** FastAPI (Python)
- **NLP:** spaCy (`en_core_web_md`), Sentence Transformers (`all-MiniLM-L6-v2`)
- **LLM:** Groq API (Llama 3)
- **Auth + Database:** Supabase (email/password and Google OAuth)
- **PDF report export:** xhtml2pdf + Jinja2

## Project structure

```
ATS-resume-scorer/
├── backend/              FastAPI app, NLP services, API routes
│   ├── api/              Routes and auth middleware
│   ├── core/             Configuration
│   ├── database/         Supabase client
│   ├── models/           Pydantic schemas
│   ├── services/         ATS scoring, parsing, feedback, PDF export
│   ├── templates/        HTML templates for PDF reports
│   └── utils/            File utilities, keyword matching
├── frontend/             React + Vite app
│   ├── src/
│   │   ├── components/   Reusable React components
│   │   ├── context/      Auth context provider
│   │   ├── pages/        Page-level components
│   │   └── services/     API and Supabase clients
│   └── package.json      NPM dependencies
├── jupyter_notebooks/    Research and dataset prep (not used at runtime)
├── dataset/              Training data (not used at runtime)
├── requirements.txt      Python backend dependencies
└── .env                  Environment variables (not committed)
```

## Setup

### 1. Clone and create a virtual environment

```bash
git clone <repo-url>
cd ATS-resume-scorer
python -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
```

### 2. Install backend dependencies

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_md
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Configure environment variables

Copy the template and fill in your keys:

```bash
cp .env.example .env
```

You need:

- A **Supabase** project — grab `SUPABASE_URL`, `SUPABASE_KEY` (service role), and `SUPABASE_ANON_KEY` from Project Settings → API.
- A **Groq** API key from [console.groq.com](https://console.groq.com).
- (Optional) Google OAuth set up in the Supabase dashboard if you want Google sign-in.

The React frontend reads Supabase config from `frontend/.env` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### 5. Run the backend

From the project root:

```bash
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API is now at `http://localhost:8000`.

### 6. Run the frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The app opens at `http://localhost:5173`.

## Notes

- **Never commit `.env`** — it holds API keys. It's in `.gitignore`; check before you push.
- The first run downloads the Sentence Transformer model (~80 MB). It's cached afterwards.
- If you don't have a Groq key yet, the scoring still works — only the LLM suggestions section will be empty.
- `jupyter_notebooks/` and `dataset/` are for experimentation and aren't required to run the app.