#!/bin/sh
set -e

# composer install や npm install は初回に手動実行を推奨

# MySQLの起動を待つ
echo "Waiting for MySQL to be ready..."
until php -r "try { new PDO('mysql:host=db;dbname=laravel', 'user', 'password'); } catch (PDOException \$e) { exit(1); }"
do
    echo "MySQL is unavailable - sleeping"
    sleep 1
done
echo "MySQL is up!"

# artisan migrate も初回に手動実行を推奨

# storageとbootstrap/cacheのパーミッションを設定
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Supervisorを起動するCMDに処理を渡す
exec "$@"
