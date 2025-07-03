# kadai_01

---

📘 開発ルールについては [こちら（docs/coding-rules.md）](docs/coding-rules.md) を参照してください。

このプロジェクトは Docker を使用して Laravel + React + MySQL + Mailpit 環境を構築します。

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

# React の依存パッケージインストール（初回のみ）
docker compose exec app npm install

# React 開発サーバー起動（ポート5173で立ち上がります）
docker compose exec app npm run dev -- --host
```

### 🔍 開発用URL一覧

| サービス     | URL                     | 備考            |
|--------------|--------------------------|-----------------|
| アプリ       | http://localhost:88     | Laravel画面     |
| phpMyAdmin   | http://localhost:8081   | user / password |
| Mailpit      | http://localhost:8025   | メール確認UI    |
| React Dev    | http://localhost:5173   | Vite 開発サーバー |

### 🧾 その他補足

- `.env.example` を元に各自 `.env` を作成してください
- PR単位で進捗をレビュー・管理する運用です
- React 開発時は `npm run dev -- --host` で Vite サーバーを起動してください
