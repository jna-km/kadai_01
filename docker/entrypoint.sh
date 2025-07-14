#!/bin/bash

# .env 設定が必要ならコピー
[ ! -f .env ] && cp .env.example .env

# Composer install（vendorが無ければ）
[ ! -d vendor ] && composer install

# MySQL の起動を待つ
echo "Waiting for MySQL..."
for i in {1..30}; do
  if php artisan migrate:status > /dev/null 2>&1; then
    echo "MySQL is up!"
    break
  fi
  echo "..."
  sleep 1
done

# マイグレーション未実行なら実行（sessions テーブルを判定）
if ! php artisan migrate:status | grep -q 'sessions'; then
  echo "Running migrations..."
  php artisan migrate --force
fi

# npm install（node_modules 無ければ）
[ ! -d node_modules ] && npm install

# Viteビルド（初回のみ）
if [ ! -d public/build ]; then
  npm run build
fi

# バックグラウンドでViteの開発サーバーを起動
npm run dev -- --host &

# PHP-FPMをフォアグラウンドで起動
exec php-fpm
