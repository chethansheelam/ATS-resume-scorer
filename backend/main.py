import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Optimize memory for low-resource environments (e.g. Render 512MB free tier)
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"

from backend.core.config import (
    ALLOWED_ORIGINS, 
    APP_DESCRIPTION, 
    APP_TITLE, 
    APP_VERSION, 
    SPACY_MODEL_PRIMARY, 
    SPACY_MODEL_SECONDARY, 
    SENTENCE_TRANSFORMER_MODEL
)
from backend.api.routes import router

logger = logging.getLogger('ats_resume_scorer')

class LazyEmbedder:
    """Lazily loads SentenceTransformer on first use to prevent boot-time OOM."""
    def __init__(self, model_name: str):
        self.model_name = model_name
        self._model = None

    def _load(self):
        if self._model is None:
            logger.info(f'Loading SentenceTransformer: {self.model_name} (CPU mode)...')
            try:
                import torch
                torch.set_num_threads(1)
            except Exception:
                pass
            from sentence_transformers import SentenceTransformer
            self._model = SentenceTransformer(self.model_name, device="cpu")
            logger.info(f'Loaded {self.model_name}')
        return self._model

    def encode(self, *args, **kwargs):
        return self._load().encode(*args, **kwargs)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Starting ATS Resume Analyzer API...')

    logger.info(f'Loading spaCy NLP model: {SPACY_MODEL_PRIMARY}')
    import spacy
    try:
        app.state.nlp = spacy.load(SPACY_MODEL_PRIMARY)
        logger.info(f'Loaded {SPACY_MODEL_PRIMARY}')
    except OSError:
        logger.warning(f'{SPACY_MODEL_PRIMARY} not found — falling back to {SPACY_MODEL_SECONDARY}')
        try:
            app.state.nlp = spacy.load(SPACY_MODEL_SECONDARY)
            logger.info(f'Loaded {SPACY_MODEL_SECONDARY} (fallback)')
        except OSError:
            logger.warning(f'Downloading {SPACY_MODEL_SECONDARY}...')
            from spacy.cli import download
            download(SPACY_MODEL_SECONDARY)
            app.state.nlp = spacy.load(SPACY_MODEL_SECONDARY)

    app.state.embedder = LazyEmbedder(SENTENCE_TRANSFORMER_MODEL)
    logger.info('API is ready to serve requests.')

    yield

    logger.info('Shutting down the API.')

app=FastAPI(
    title=APP_TITLE, 
    description=APP_DESCRIPTION, 
    version=APP_VERSION, 
    lifespan=lifespan,
    docs_url='/docs',
    redoc_url='/redoc'
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True, 
    allow_methods     = ['*'],
    allow_headers     = ['*'],
)

app.include_router(router)

@app.get('/')
async def root():
    return {
        'name':      'ATS Resume Analyzer API',
        'version':   '2.0.0',
        'endpoints': {
            'POST   /api/v1/analyze-resume': 'Analyze a resume',
            'GET    /api/v1/history':        'Get user history',
            'DELETE /api/v1/history/:id':    'Delete a history entry',
            'GET    /api/v1/health':         'Health check',
            'POST   /api/v1/generate-pdf':   'Generate PDF report from data',
        },
    }

if __name__=='__main__':
    import uvicorn
    uvicorn.run(
        'backend.main:app',
        host    = '0.0.0.0',
        port    = 8000,
        reload  = True,    # Auto-restart on code changes (dev only)
    )