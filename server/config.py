import os
from datetime import timedelta
from dotenv import load_dotenv
import multiprocessing

load_dotenv()  # Load environment variables from .env file


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URL") or "sqlite:///tastetribe.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    # Gunicorn configuration
    GUNICORN_BIND = f"0.0.0.0:{os.environ.get('PORT', '5000')}"
    GUNICORN_WORKERS = multiprocessing.cpu_count() * 2 + 1
    GUNICORN_THREADS = 2
    GUNICORN_TIMEOUT = 120
    GUNICORN_ACCESSLOG = "-"
    GUNICORN_ERRORLOG = "-"
    GUNICORN_LOGLEVEL = os.environ.get("GUNICORN_LOGLEVEL", "info")
