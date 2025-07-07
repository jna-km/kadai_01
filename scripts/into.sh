#!/bin/bash

# Laravel開発用：コンテナに bash で入るショートカット
# 使用例: ./scripts/into.sh

SERVICE_NAME="app"

echo "🔄 Laravelコンテナ（$SERVICE_NAME）に入ります..."
docker compose exec $SERVICE_NAME bash