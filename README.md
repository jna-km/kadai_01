# kadai_01

---

📘 開発ルールについては [こちら（docs/coding-rules.md）](docs/coding-rules.md) を参照してください。

## 🚀 セットアップ手順（Docker構成）

このプロジェクトは Docker を使用して Laravel + MySQL + Mailpit 環境を構築します。

### 🔧 前提条件
- Docker / Docker Compose がインストール済み

### 📦 初期セットアップ

```bash
# コンテナ起動
docker compose up -d

# Laravelプロジェクト初期化済み（composer install 済）

# .env 設定ファイル作成
cp .env.example .env

# アプリケーションキー生成
docker compose exec app php artisan key:generate

# マイグレーション実行
docker compose exec app php artisan migrate
```

### 🔍 開発用URL一覧

| サービス     | URL                     | 備考            |
|--------------|--------------------------|-----------------|
| アプリ       | http://localhost:8080   | Laravel画面     |
| phpMyAdmin   | http://localhost:8081   | user / password |
| Mailpit      | http://localhost:8025   | メール確認UI    |

### 🧾 その他補足

- `.env.example` を元に各自 `.env` を作成してください
- PR単位で進捗をレビュー・管理する運用です
