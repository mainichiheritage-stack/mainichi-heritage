import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# --- Path Settings ---
BASE_DIR = Path(__file__).resolve().parent.parent

# .envの読み込み（ローカル開発用）
env_path = BASE_DIR / ".env"
if not env_path.exists():
    env_path = BASE_DIR.parent / ".env"
load_dotenv(env_path)

# --- Environment Flags ---
DEBUG = os.getenv('DEBUG', 'False') == 'True'
IS_PRODUCTION = os.getenv('RENDER', 'False') == 'True'

# --- Helper Function ---
def get_env_list(var_name, default):
    """環境変数をカンマ区切りで取得し、空白を除去してリスト化する"""
    raw_val = os.getenv(var_name, default)
    if not raw_val:
        return []
    return [item.strip() for item in raw_val.split(',') if item.strip()]

# --- Core Settings ---
SECRET_KEY = os.getenv('SECRET_KEY')

# ホスト許可設定
ALLOWED_HOSTS = get_env_list('ALLOWED_HOSTS', 'localhost,127.0.0.1,backend')

# --- Security & HTTPS ---
if IS_PRODUCTION:
    # 本番（Render）環境
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = False
    # HSTS設定（ブラウザにHTTPSを記憶させる。必要に応じて有効化）
    # SECURE_HSTS_SECONDS = 31536000
    # SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    # SECURE_HSTS_PRELOAD = True
else:
    # ローカル開発環境
    SECURE_SSL_REDIRECT = False

# --- Application Definition ---
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
    'corsheaders.middleware.CorsMiddleware',  # 最優先
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # 静的ファイル用
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --- CORS / CSRF Settings ---
CORS_ALLOW_ALL_ORIGINS = False
# 環境変数からリストを取得（空白混入対策済み）
CORS_ALLOWED_ORIGINS = get_env_list('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')
CSRF_TRUSTED_ORIGINS = get_env_list('CSRF_TRUSTED_ORIGINS', 'http://localhost:8000,http://localhost:3000')

ROOT_URLCONF = 'config.urls'

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

WSGI_APPLICATION = 'config.wsgi.application'

# --- Database ---
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL', 
            f"postgres://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        ),
        conn_max_age=600,
    )
}

# --- Others ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 15,
}