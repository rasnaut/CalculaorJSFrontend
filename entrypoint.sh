#!/bin/sh
set -e

# Дефолты задаём здесь, а не в шаблоне
: "${BACKEND_URL:=http://localhost:8080}"
: "${APP_STAGE:=dev}"
: "${PUBLIC_SENTRY_DSN:=}"

# Белый список переменных для подстановки
ALLOWED_VARS='${BACKEND_URL} ${APP_STAGE} ${PUBLIC_SENTRY_DSN}'
# Генерим config.js из шаблона
envsubst "$ALLOWED_VARS" \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js

exec nginx -g "daemon off;"
