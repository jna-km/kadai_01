#!/bin/bash

# .env設定が必要ならコピー
if [ ! -f .env ]; then
  cp .env.example .env
fi

# composer install（vendorが無ければ）
if [ ! -d vendor ]; then
  composer install
fi

# DBが起動するのを待つ（最大30秒）
echo "Waiting for MySQL..."
for i in {1..30}; do
  if php artisan migrate:status > /dev/null 2>&1; then
    echo "MySQL is up!"
    break
  fi
  echo "..."
  sleep 1
done

# マイグレーションが未実行なら実行（sessions テーブルを例に確認）
if ! php artisan db:table sessions > /dev/null 2>&1; then
  echo "Running migration..."
  php artisan migrate --force
fi

# npm install（node_modulesが無ければ）
if [ ! -d node_modules ]; then
  npm install
fi

# Vite開発サーバー起動（バックグラウンド）
npm run dev -- --host &

# PHP-FPMをフォアグラウンドで起動
exec php-fpm