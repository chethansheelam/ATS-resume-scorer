import logging
import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

try:
    from backend.api.routes import router as api_router
    from backend.core.config import ALLOWED_ORIGINS, APP_DESCRIPTION, APP_TITLE, APP_VERSION
except ImportError:
    from api.routes import router as api_router
    from core.config import ALLOWED_ORIGINS, APP_DESCRIPTION, APP_TITLE, APP_VERSION

logger = logging.getLogger('ats_resume_scorer')


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML assets once when the backend starts."""
    try:
        import spacy
        app.state.nlp = spacy.load('en_core_web_md')
        logger.info('Loaded spaCy model: en_core_web_md')
    except Exception as exc:
        app.state.nlp = None
        logger.warning('spaCy model not loaded: %s', exc)

    try:
        from sentence_transformers import SentenceTransformer
        app.state.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        logger.info('Loaded SentenceTransformer model: all-MiniLM-L6-v2')
    except Exception as exc:
        app.state.embedder = None
        logger.warning('SentenceTransformer model not loaded: %s', exc)

    yield

    app.state.nlp = None
    app.state.embedder = None


app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    description=APP_DESCRIPTION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.rstrip('/') for origin in ALLOWED_ORIGINS if origin],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(api_router)


@app.get('/')
async def root():
    return {
        'app': APP_TITLE,
        'version': APP_VERSION,
        'status': 'running',
    }


@app.get('/health')
async def health_check():
    return {
        'status': 'healthy',
        'nlp_loaded': getattr(app.state, 'nlp', None) is not None,
        'embedder_loaded': getattr(app.state, 'embedder', None) is not None,
    }
