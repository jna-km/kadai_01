FROM php:8.3-fpm

WORKDIR /var/www

# Supervisorとその他必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    supervisor \
    zip unzip curl git \
    libpq-dev libzip-dev \
    build-essential autoconf automake libtool make gcc g++ \
    pkg-config libxml2-dev zlib1g-dev libssl-dev \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# --- ここから修正 ---

# 最初にアプリケーションの全ファイルをコピーする
COPY . .

# npm依存関係をインストール
# この時点でホストにあるtailwind.config.jsやpostcss.config.jsもコピーされている
RUN npm install

# ★★★ Tailwindの初期化コマンドは削除する ★★★
# このコマンドはホストOSで一度実行すればよく、Dockerfile内では不要です。
# RUN node ./node_modules/tailwindcss/dist/lib.mjs init -p

# --- ここまで修正 ---

# Supervisorの設定ファイルをコンテナにコピー
# （COPY . . で既にコピー済みですが、念のため残してもOK）
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# エントリーポイントスクリプトをコピー
# （COPY . . で既にコピー済みですが、念のため残してもOK）
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
# 実行権限を付与
RUN chmod +x /usr/local/bin/entrypoint.sh

# エントリーポイントとしてentrypoint.shを実行
ENTRYPOINT ["entrypoint.sh"]

# コンテナ起動時にSupervisorを実行するようCMDを変更
CMD ["/usr/bin/supervisord"]
