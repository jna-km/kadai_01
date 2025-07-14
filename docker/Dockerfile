FROM php:8.3-fpm

WORKDIR /var/www

# Supervisorとその他必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    supervisor \
    zip unzip curl git \
    libpq-dev libzip-dev \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Supervisorの設定ファイルをコンテナにコピー
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# エントリーポイントスクリプトをコピー
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh # 実行権限を付与

# エントリーポイントとしてentrypoint.shを実行
ENTRYPOINT ["entrypoint.sh"]

# コンテナ起動時にSupervisorを実行するようCMDを変更
CMD ["/usr/bin/supervisord"]
