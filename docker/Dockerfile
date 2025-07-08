FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    zip unzip curl git \
    libpq-dev libzip-dev \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer


# 一番下に追加
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]