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

## 📄 ドキュメント一覧（docs/）

- [ユースケース（予約作成）](docs/usecase_reserve.md)
- [機能一覧](docs/function_list.md)
- [画面一覧](docs/screen_list.md)
- [機能と画面の対応表](docs/function_screen_map.md)
- [画面遷移図（PDF）](docs/画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](docs/ワイヤーフレーム.pdf)

## 🆕 最近の変更点（2025/07/04）

- `docs/usecase_reserve.md` を新規追加：予約作成のユースケースを文書化
- `docs/画面遷移図.pdf` を追加：一般ユーザー・管理者両方の画面遷移図
- `docs/ワイヤーフレーム.pdf` を追加：共通レイアウト用の簡易ワイヤーを作成

### 🧾 その他補足

- `.env.example` を元に各自 `.env` を作成してください
- PR単位で進捗をレビュー・管理する運用です
- React 開発時は `npm run dev -- --host` で Vite サーバーを起動してください

## 🧩 実装予定の主な機能（予約くん）
小規模店舗向けのオンライン予約受付・管理システムです。

### 管理者機能
- 管理者ログイン（認証機能）
- 予約の一覧／削除
- 営業時間・定休日の設定
- 臨時休業／休憩時間の指定
- 予約可能枠の管理

### 一般ユーザー機能
- 予約フォーム（日時選択・名前・メール）
- 空き枠カレンダー表示
- 予約完了通知メール送信
- キャンセル機能（メールからリンク）

<!-- 共通フッター（自動更新されます） -->
--- フッター開始 ---

[← READMEに戻る]()

## 📚 ドキュメント一覧

- [プロジェクト概要](docs/project-overview.md)
- [機能一覧](docs/features.md)
- [画面・機能対応表](docs/function_screen_map.md)
- [画面定義](docs/screens.md)
- [ユースケース定義](docs/usecase_reserve.md)
- [機能要件](docs/functional_requirements.md)
- [コーディングルール](docs/coding-rules.md)
- [作業ログ（2025-07-07）](docs/logs/2025-07-07.md)
- [画面遷移図（PDF）](docs/画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](docs/ワイヤーフレーム.pdf)

--- フッター終了 ---