FROM php:8.2-fpm

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    zip unzip curl git \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer