# Laravel & Vite 環境構築・テスト・カバレッジ・デプロイまとめ

---

## 1. 環境構築

### 1-1. Laravelセットアップ詳細

- **.envファイルの設定例**  
  本番・開発環境ごとに`.env`を分離し、`DB_CONNECTION`, `DB_HOST`, `MAIL_MAILER`などの必須変数を明記。
- **キャッシュ管理**  
  ```bash
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  ```
  不具合時のクリア例：  
  ```bash
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```
- **マイグレーション・シーディング運用**  
  ```bash
  php artisan migrate --seed
  ```
  バージョン管理との整合を重視。

---

### 1-2. Node.js / Viteセットアップ

- **依存関係の管理**  
  `package.json`でReact, Vite, @vitejs/plugin-react等を管理。
- **ローカル開発サーバー起動**  
  Laravel APIとReact/Viteを別プロセスで起動（例: `npm run dev` + `php artisan serve`）。
- **ビルドと本番反映**  
  ```bash
  npm run build
  ```
  ビルド成果物は `public/build` 配下。`vite.config.ts`でパスや公開先を調整。

---

## 2. テスト

### 2-1. PHP(Pest)テスト

- **基本コマンド**  
  ```bash
  ./vendor/bin/pest
  ./vendor/bin/pest --filter=User
  ./vendor/bin/pest --coverage --coverage-html storage/coverage/
  ```
  ※カバレッジレポート出力先は現状 `storage/coverage/` に統一
- **composerスクリプト例**  
  ```json
  "scripts": {
    "pest": "pest",
    "coverage": "pest --coverage --coverage-html storage/coverage/"
  }
  ```
- **CI連携例**  
  `.github/workflows/ci.yml` で `php artisan test` や `pest` を自動実行。  
  カバレッジ成果物はGitHub ActionsのArtifactsとして保存・確認可能。

---

### 2-2. JavaScript(Vitest)テスト

- **設定ファイル**  
  `vitest.config.ts`で`include`/`exclude`/`coverage`などを明示。
- **テスト実行フロー**  
  ```bash
  npm run test
  npm run coverage
  ```
- **カバレッジレポート出力先**  
  `coverage/` ディレクトリ配下（`coverage/lcov-report/index.html`など）。
- **CI/CD連携**  
  `.github/workflows/ci.yml` で `npm run test`・`npm run coverage` を自動実行。  
  レポートはGitHub ActionsのArtifactsでダウンロード可能。

---

## 3. カバレッジ

### 3-1. Pestカバレッジ

- **実行例**  
  ```bash
  ./vendor/bin/pest --coverage --coverage-html storage/coverage/
  ```
- **レポート活用法**  
  `storage/coverage/`配下のHTMLをブラウザで確認。  
  未テスト部分の抽出や優先度決定に活用。

### 3-2. Vitestカバレッジ

- **出力先**  
  `coverage/` ディレクトリ配下（`lcov-report/index.html`など）。
- **メモリ管理**  
  必要に応じて `NODE_OPTIONS=--max-old-space-size=4096` を指定。
- **CI成果物**  
  レポートはCIのArtifactsで確認・ダウンロード可能。

---

## 4. デプロイ

- **現状の位置づけ**  
  本番環境への自動デプロイは**未設定**。  
  手動デプロイ時は下記手順を推奨。
- **手動デプロイ手順例**  
  1. テスト・カバレッジ確認（CI通過必須）
  2. `npm run build` でフロントエンドビルド
  3. `php artisan migrate --force` でDBマイグレーション
  4. キャッシュクリア（`php artisan config:clear` など）
  5. 必要に応じて `storage/coverage/` や `coverage/` を成果物として保存
- **今後の検討事項**  
  - CI/CDパイプライン導入（GitHub Actions等）
  - 自動デプロイ・ロールバック・バージョニング運用
  - デプロイ後のキャッシュクリア・マイグレーション自動化
  - 管理用ドキュメント集約ページの新設

---

## 5. ドキュメント運用の提案

- **READMEの役割**  
  プロジェクト全体像と主要ドキュメントへの導線を明記。
- **ドキュメント整理ルール**  
  更新手順・レビュー基準を明文化。
- **追加推奨ドキュメント**  
  - 開発フロー・ブランチ運用
  - コミットメッセージ規約
  - FAQ・トラブルシューティング
  - セキュリティ方針・依存更新ルール
  - 管理用ドキュメント集約ページの新設

---

## 6. 主要コマンド一覧と実行例

### 6-1. Composer (PHP) 関連コマンド

| コマンド名    | 内容                                           | 実行例                                      |
| ------------- | ---------------------------------------------- | ------------------------------------------- |
| `pest`        | Pestによるテスト実行                           | `composer run pest` または `php ./vendor/bin/pest`  |
| `coverage`    | カバレッジ計測付きテスト、HTMLレポート生成     | `composer run coverage`                       |

---

### 6-2. npm (JavaScript) 関連コマンド

| コマンド名 | 内容                                   | 実行例              |
| ---------- | ------------------------------------ | ------------------- |
| `test`     | Vitestでテスト実行                   | `npm run test`       |
| `coverage` | カバレッジ測定付きテスト実行          | `npm run coverage`   |
| `format`   | Prettierによるコードフォーマット      | `npm run format`     |

---

### 6-3. コンテナ内での実行例

- PHP（Pest）テスト実行  
  ```bash
  docker-compose exec app ./vendor/bin/pest
  ```
- カバレッジ測定付きPest実行  
  ```bash
  docker-compose exec app ./vendor/bin/pest --coverage --coverage-html storage/coverage/
  ```
- npmテスト実行  
  ```bash
  docker-compose exec app npm run test
  ```
- npmカバレッジ測定付きテスト実行  
  ```bash
  docker-compose exec app npm run coverage
  ```

---

### 6-4. 補足・運用ポイント

- コマンドは用途に応じて使い分けることが望ましいです。
- ショートカットは操作を簡略化しますが、初めての方は正式名称のコマンドも合わせて覚えましょう。
- カバレッジ測定時はメモリ不足に注意し、必要に応じて `NODE_OPTIONS=--max-old-space-size=4096` 等の設定を検討してください。
- ドキュメントは随時更新し、最新状態を保つよう心がけてください。

---

## 7. FAQ・トラブルシューティング

### 7-1. Pest関連のよくある問題と対処法

- **Pestが動かない・エラーが出る**  
  - PHPバージョン（8.0以上推奨）や依存関係を確認
  - `composer install`や`composer update`で依存を最新化
  - キャッシュクリアコマンドを試す

- **Pest実行時にカバレッジが正しく生成されない**  
  - `--coverage`オプションを付けて実行
  - レポートは`storage/coverage/`配下に生成

### 7-2. Vitest関連のよくある問題と対処法

- **メモリエラー（heap out of memory）が発生する**  
  - `NODE_OPTIONS=--max-old-space-size=4096 npm run coverage` で実行
  - テスト対象の`include`・`exclude`設定を見直す

- **カバレッジレポートのソースマップ警告**  
  - 依存パッケージのソースマップ警告は基本無視でOK
  - ビルド設定や`vitest.config.ts`の`coverage`設定を調整

### 7-3. 環境構築・マイグレーションのトラブルシューティング

- **DB接続エラーが出る**  
  - `.env`のDB設定やDBサーバー起動状況を確認

- **マイグレーション・シーディングが失敗する**  
  - 先にDBのキャッシュをクリア
  - マイグレーションファイルや外部キー制約違反を確認

- **Nodeモジュール関連の問題**  
  - `node_modules`削除＆`npm ci`で再インストール
  - Node.jsのバージョンも確認

### 7-4. カバレッジ測定時の注意点

- カバレッジ測定はメモリ消費が大きいので、必要に応じてメモリ設定を調整
- 対象ファイルの範囲設定（`include`、`exclude`）を明確にし、不要なファイルを除外

### 7-5. よくあるコマンドの失敗時の対処例

| コマンド            | 失敗例                           | 対処法                                  |
|---------------------|--------------------------------|---------------------------------------|
| `composer run pest`  | PHPのバージョンエラー           | PHPのバージョンを確認・アップデート  |
| `npm run coverage`   | メモリ不足エラー                | `NODE_OPTIONS=--max-old-space-size=4096`設定 |
| `php artisan migrate`| DB接続エラー                   | `.env`設定とDBサーバー起動を確認       |
| `npm run test`       | 依存関係の不整合               | `rm -rf node_modules && npm ci`         |

---

# まとめ

本ドキュメントは、環境構築からテスト、カバレッジ、デプロイまでの一連の流れを統合的にまとめることを目標としています。  
単なる手順書に留まらず、「なぜそうするのか」や「問題になりやすいポイント」も含めて記述することで、プロジェクトの質と運用効率を高めます。

---

## 強いて言えば・今後の改善案

- CI/CDの自動デプロイ・ロールバック・バージョニング運用の早期導入
- カバレッジレポートの自動公開やSlack通知などの自動化
- テスト・カバレッジ成果物の保存先や命名規則の統一
- ドキュメント集約ページの新設と、関連ドキュメントの一元管理
- 新規参加者向けのセットアップ手順やトラブルシューティングの充実

--- フッター開始 ---

[← READMEに戻る](../README.md)

## 📚 ドキュメント一覧

- [プロジェクト概要](project-overview.md)
- [機能一覧](features.md)
- [画面・機能対応表](function_screen_map.md)
- [画面定義](screens.md)
- [ユースケース定義](usecase_reserve.md)
- [機能要件](functional_requirements.md)
- [コーディングルール](coding-rules.md)
- [APIレスポンス設計ガイドライン](api_response.md)
- [ショートカット](shortcuts.md)
- [バリデーション設計仕様](validation_spec.md)
- [UIガイドライン](ui_guideline.md)
- [UI改善ガイド](ui_improvement_guide.md)
- [アクセシビリティガイド](accessibility_guide.md) 
- [Zustand 状態管理ガイド](zustand_guide.md)
- [Laravel + Supervisor 設定ガイド](supervisor.md)
- [Laravel & Vite 環境構築・テスト・デプロイまとめ](laravel-vite-setup.md)
- [画面遷移図（PDF）](画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](ワイヤーフレーム.pdf)

### 作業ログ
- [2025-07-07](logs/2025-07-07.md)
- [2025-07-08](logs/2025-07-08.md)
- [2025-07-09](logs/2025-07-09.md)
- [2025-07-10](logs/2025-07-10.md)
- [2025-07-11](logs/2025-07-11.md)
- [2025-07-15](logs/2025-07-15.md)
- [2025-07-17](logs/2025-07-17.md)
- [2025-07-18](logs/2025-07-18.md)
- [2025-07-22](logs/2025-07-22.md)
- [2025-07-23](logs/2025-07-23.md)
- [2025-07-24](logs/2025-07-24.md)
- [2025-07-25](logs/2025-07-25.md)
- [2025-07-28](logs/2025-07-28.md)
- [2025-07-29](logs/2025-07-29.md)
- [2025-07-30](logs/2025-07-30.md)
- [2025-07-31](logs/2025-07-31.md)
- [2025-08-01](logs/2025-08-01.md)

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
