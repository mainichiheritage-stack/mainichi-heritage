import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
env_path = BASE_DIR / ".env"
if not env_path.exists():
    env_path = BASE_DIR.parent / ".env"
load_dotenv(env_path)

# Environment Flags
DEBUG = os.getenv('DEBUG', 'False') == 'True'
IS_PRODUCTION = os.getenv('RENDER', 'False') == 'True'

def get_env_list(var_name, default):
    raw_val = os.getenv(var_name, default)
    return [item.strip() for item in raw_val.split(',') if item.strip()] if raw_val else []

# Core Settings
SECRET_KEY = os.getenv('SECRET_KEY')
ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

# Security & Hosts
RENDER_EXTERNAL_HOSTNAME = os.getenv('RENDER_EXTERNAL_HOSTNAME')

if RENDER_EXTERNAL_HOSTNAME:
    # 本番（Render）環境
    ALLOWED_HOSTS = [RENDER_EXTERNAL_HOSTNAME, 'mainichi-heritage-api.onrender.com', '.onrender.com']
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = False
else:
    # ローカル開発環境
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', '*']
    SECURE_SSL_REDIRECT = False

# Application Definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework',
    'corsheaders',
    'heritages',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS / CSRF Settings
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = get_env_list('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')
CSRF_TRUSTED_ORIGINS = get_env_list('CSRF_TRUSTED_ORIGINS', 'http://localhost:8000,http://localhost:3000')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL', 
            f"postgres://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        ),
        conn_max_age=600,
    )
}

# Static files
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
os.makedirs(STATIC_ROOT, exist_ok=True)

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# API Settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
}

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Logging & Validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': f'django.contrib.auth.password_validation.{v}'} 
    for v in ['UserAttributeSimilarityValidator', 'MinimumLengthValidator', 'CommonPasswordValidator', 'NumericPasswordValidator']
]

# --- Axiom Logging Settings ---
AXIOM_TOKEN = os.getenv("AXIOM_TOKEN")
AXIOM_DATASET = os.getenv("AXIOM_DATASET")
AXIOM_ORG_ID = os.getenv("AXIOM_ORG_ID")

def get_axiom_handler():
    from axiom_py import Client
    from axiom_py.logging import AxiomHandler
    import logging

    # AxiomのUI用にフィールドを整形するフィルター
    class AxiomUiFilter(logging.Filter):
        def filter(self, record):
            # Axiomが色付けに使用する 'level' フィールドを追加
            # 例: 'WARNING' -> 'warning', 'INFO' -> 'info'
            record.level = record.levelname.lower()
            return True

    client = Client(AXIOM_TOKEN, AXIOM_ORG_ID)
    handler = AxiomHandler(client, AXIOM_DATASET)
    
    # フィルターをハンドラに追加
    handler.addFilter(AxiomUiFilter())
    
    return handler

# ベース設定
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.utils.autoreload': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO' if IS_PRODUCTION else 'DEBUG',
    },
}

# Axiomハンドラ（ローカル環境からAxiomにログ出力したい場合には条件をAXIOM_TOKENだけにする）
# if AXIOM_TOKEN:
if IS_PRODUCTION and AXIOM_TOKEN:
    try:
        # '()' を使うことで、関数を呼び出して直接ハンドラを取得
        LOGGING['handlers']['axiom'] = {
            'level': 'INFO',
            '()': get_axiom_handler,
        }
        LOGGING['root']['handlers'].append('axiom')
    except Exception as e:
        print(f"Axiom setup error: {e}")