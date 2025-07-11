FROM python:3.11-slim

WORKDIR /tests

# seleniumと必要ライブラリをインストール
RUN pip install --no-cache-dir selenium

# テスト用スクリプトをコピー（後で作成）
COPY ./docker/selenium-tests /tests

CMD ["python", "test_sample.py"]
