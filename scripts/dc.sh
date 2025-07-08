#!/bin/bash

# docker compose のショートカットラッパー
# 使い方例:
#   ./scripts/dc.sh up -d
#   ./scripts/dc.sh exec app bash
#   ./scripts/dc.sh logs -f

echo "🐳 docker compose $@"
docker compose "$@"
