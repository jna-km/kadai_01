
---

📘 開発ルールについては [こちら（docs/coding-rules.md）](docs/coding-rules.md) を参照してください。


このプロジェクトは Docker を使用して Laravel + React + MySQL + Mailpit 環境を構築します。

## ✅ 新規追加・改善点（2025/07/23）
- UI改善ガイドを追加：[docs/ui_improvement_guide.md](docs/ui_improvement_guide.md)
- 共通UIコンポーネント設計（Input / Select）Props仕様を整備
- Service層の責務分離を完了し、Controller → Service → Repository 構成を導入
- HolidayFactory / TimeSlotFactory / ReservationTokenFactory を追加
- Pestによるサービス層テストを拡充（tests/Feature/Services/ 配下）

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

# マイグレーション実行（シーディングも実施）
docker compose exec app php artisan migrate --seed

# React の依存パッケージインストール（初回のみ）
docker compose exec app npm install

# React 開発サーバー起動（ポート5173で立ち上がります）
docker compose exec app npm run dev -- --host
```

#### 🔐 Sanctum認証の設定
- `.env` に以下を追加してください：
```
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```
- NginxでSPAリロード対応のため `try_files $uri /index.html;` を設定。

#### ✅ Reactビルドと配信
- 開発時: `http://localhost:5173`  
- 本番: `npm run build` → `public/build` 配下に出力、Nginx経由で配信。

### 🔍 開発用URL一覧

| サービス     | URL                      | 備考                |
|--------------|---------------------------|---------------------|
| アプリ       | http://localhost:88      | Laravel画面         |
| phpMyAdmin   | http://localhost:8081    | user / password     |
| Mailpit      | http://localhost:8025    | メール確認UI        |
| React Dev    | http://localhost:5173    | Vite 開発サーバー   |
| Swagger UI   | http://localhost:88/swagger/ | APIドキュメント確認用 |

### Reactで確認できる主要ページ
- `/dashboard/reservations` … 予約一覧
- `/dashboard/reservations/create` … 予約作成
- `/dashboard/reservations/edit/{id}` … 予約編集

## 🛠 開発補助スクリプト（scripts/）

以下のショートカットスクリプトで Docker × Laravel 開発を効率化できます。

| スクリプト名          | 内容                                      |
|------------------------|-------------------------------------------|
| `scripts/dc.sh`        | 任意の `docker compose` コマンドを実行   |
| `scripts/into.sh`      | Laravelコンテナ（app）に入る              |

```bash
# 使用例
./scripts/dc.sh up -d
./scripts/into.sh
```

## 📄 ドキュメント一覧（docs/）

- [ユースケース（予約作成）](docs/usecase_reserve.md)
- [機能一覧](docs/function_list.md)
- [画面一覧](docs/screen_list.md)
- [機能と画面の対応表](docs/function_screen_map.md)
- [画面遷移図（PDF）](docs/画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](docs/ワイヤーフレーム.pdf)
- [UI改善ガイド](docs/ui_improvement_guide.md)

-### 🆕 最近の変更点（2025/07/22）
- サービス層の実装を完了（Reservation, TimeSlot, WorkingHour, Notice, Holiday）
- 各Repositoryとインターフェースを定義・実装し、バインド設定を整備
- Reservation関連のCRUDテストを修正し、全件通過
- findByIdメソッドをfindメソッドに統一し、コード整合性を確保

### 🆕 最近の変更点（2025/07/18）
- v0.5対応を完了：
  - SPAリロード時404対策（Nginx設定）
  - Reactでの予約CRUD UIを実装（新規作成・編集・削除）
  - オペレーターとサービスの動的連携フォーム対応
  - AxiosによるAPI認証テスト完了
  - Tailwind CSS導入でUI改善

### 🆕 最近の変更点（2025/07/15）

- 予約管理機能のユーザー向けUIをReactで実装（一覧・新規作成・削除）
- Laravel API連携を完了（`/api/my-reservations`、`POST /api/reservations`、`DELETE /api/reservations/{id}`）
- 状態管理を改善し、削除後の即時UI更新を実装
- UIデザインを微修正（テーブル表示、ボタン配置）
- コードクリーンアップ（不要ログ削除、import整理）

### 🆕 最近の変更点（2025/07/11）

- 一時的に vendor ディレクトリを含めた状態でGitにpushし、依存パッケージの差異による挙動確認を実施

### 🆕 最近の変更点（2025/07/09）

- READMEのログ記述位置を時系列順に修正
- `StoreReservationRequest` のフォームリクエストとテスト整備（`StoreReservationRequestTest`）
- テスト基盤に `.env.testing` を導入し、バリデーションテスト項目を追加

### 🆕 最近の変更点（2025/07/08）

- `.env.testing` を追加し、テスト用DB環境を構築（laravel_test）
- `phpunit` → `Pest` に移行、`pest-plugin-laravel` を導入しユニットテスト基盤を整備
- Featureテスト：`ReservationControllerTest.php` を新規作成し、CRUD動作の検証
- `Reservation` モデルの `$fillable` および `casts` の整備、リレーションの確認
- テスト実行環境と`docker-compose.yml`調整、PHPバージョン8.3に対応済み

## 🆕 最近の変更点（2025/07/04）

- `docs/usecase_reserve.md` を新規追加：予約作成のユースケースを文書化
- `docs/画面遷移図.pdf` を追加：一般ユーザー・管理者両方の画面遷移図
- `docs/ワイヤーフレーム.pdf` を追加：共通レイアウト用の簡易ワイヤーを作成

### 🧪 SeleniumによるE2Eテスト（予定）

現在、E2Eテスト自動化のために Selenium の導入を検討中です。  
ブラウザ操作を通じて、予約フォームや管理画面の一連の動作確認を行う予定です。

- 使用予定ライブラリ：`laravel/dusk` または `Selenium WebDriver` + `PHPUnit`
- 主な対象機能：
  - ユーザーによる予約作成〜完了メールの送信まで
  - 管理者による予約削除や営業時間設定の確認
  - 不正な入力やバリデーションエラーの再現確認
- CI/CD との連携も検討中

### 🧾 その他補足

- `.env.example` を元に各自 `.env` を作成してください
- PR単位で進捗をレビュー・管理する運用です
- React 開発時は `npm run dev -- --host` で Vite サーバーを起動してください
- UIはTailwind CSSを採用
- v0.6以降でフォーム共通化やUI改善を予定

### 🧪 Python仮想環境の利用（local-tests専用）

Pythonベースのテスト（例：Selenium）を `local-tests` ディレクトリで実行するための仮想環境を用意しています。

#### ✅ 初回セットアップ手順

```bash
cd local-tests
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-local.txt
```

#### 🔁 毎回の作業時

```bash
cd local-tests
source venv/bin/activate
```

#### 🛠 自動有効化したい場合（任意）

```bash
brew install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
cd local-tests
echo 'source venv/bin/activate' > .envrc
direnv allow
```

※ `.envrc` は `.gitignore` に含めてください（共有不要）

## 🧩 実装予定の主な機能（予約くん）
 
### APIドキュメント (Swagger)

本プロジェクトでは、REST API のインターフェースを確認するために Swagger UI を使用しています。

- Swagger UI アクセス: [http://localhost:88/swagger/](http://localhost:88/swagger/)
- 定義ファイル: `public/swagger/openapi.yaml`

API仕様は `openapi.yaml` に記述されており、変更は直接このファイルを編集することで反映されます。
※フロントやバックエンドの実装変更時は、API定義ファイルも忘れずに更新してください。
小規模店舗向けのオンライン予約受付・管理システムです。

#### APIテスト補足
- Swaggerで認証テストする場合は `/operator/login` → `Bearer Token` を付与。
- Axiosテスト用スクリプトは `resources/js/testAxios.js` または `local-tests/test_swagger_auth.py` を参照。

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
- [APIレスポンス設計ガイドライン](docs/api_response.md)
- [ショートカット](docs/shortcuts.md)
- [UI改善ガイド](docs/ui_improvement_guide.md)
- [画面遷移図（PDF）](docs/画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](docs/ワイヤーフレーム.pdf)

### 作業ログ
- [2025-07-07](docs/logs/2025-07-07.md)
- [2025-07-08](docs/logs/2025-07-08.md)
- [2025-07-09](docs/logs/2025-07-09.md)
- [2025-07-10](docs/logs/2025-07-10.md)
- [2025-07-11](docs/logs/2025-07-11.md)
- [2025-07-15](docs/logs/2025-07-15.md)
- [2025-07-17](docs/logs/2025-07-17.md)
- [2025-07-18](docs/logs/2025-07-18.md)
- [2025-07-22](docs/logs/2025-07-22.md)
- [2025-07-23](docs/logs/2025-07-23.md)
- [2025-07-24](docs/logs/2025-07-24.md)

--- フッター終了 ---
