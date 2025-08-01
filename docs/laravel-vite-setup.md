# Laravel & Vite 環境構築・テスト・カバレッジ・デプロイまとめ

# まとめ

## 1. 環境構築

### 1-1. Laravelセットアップ詳細

- **.envファイルの設定例**  
  本番・開発環境に応じた設定の分離と管理方法を明示。  
  例）`DB_CONNECTION`, `DB_HOST`, `MAIL_MAILER`などの必須環境変数を網羅。  

- **キャッシュ管理**  
  ```bash
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  ```
  動作不具合時のキャッシュクリアも解説：  
  ```bash
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

- **マイグレーション・シーディング運用**  
  マイグレーション実行方法：  
  ```bash
  php artisan migrate --seed
  ```  
  バージョン管理との整合を保つための運用ルール例を記載。

---

### 1-2. Node.js / Viteセットアップ

- **依存関係の管理**  
  `package.json`の主な依存パッケージ（React, vite, @vitejs/plugin-reactなど）の説明。  

- **ローカル開発サーバー起動**  
  Laravel APIとReact開発サーバーを別プロセスで起動する方法（例: `npm run dev` + `php artisan serve`）。  

- **ビルドと本番反映**  
  ```bash
  npm run build
  ```  
  ビルド結果は `public/build` に配置。Laravelと連携するための設定例を解説。  

---

## 2. テスト

### 2-1. PHP(Pest)テスト

- **基本実行コマンド**  
  ```bash
  ./vendor/bin/pest
  ./vendor/bin/pest --filter=User
  ./vendor/bin/pest --coverage --coverage-html coverage/
  ```
- **composerスクリプト例**  
  ```json
  "scripts": {
    "pest": "pest",
    "coverage": "pest --coverage --coverage-html coverage/"
  }
  ```
- **CI連携例**  
  GitHub Actions等でのテスト自動実行設定サンプル。  

- **テストコード構成**  
  Feature、Unitテストフォルダ構成とモック利用のガイドライン。

---

### 2-2. JavaScript(Vitest)テスト

- **設定ファイルの概要**  
  `vitest.config.ts`の主要オプション説明（`include`, `exclude`, `coverage`設定など）。  

- **テスト実行フロー**  
  ```bash
  npm run test
  npm run coverage
  ```
- **問題解決ポイント**  
  ヒープメモリエラー回避のためのNodeオプション設定例。  

---

## 3. カバレッジ

### 3-1. Pestカバレッジ

- **実行例**  
  ```bash
  ./vendor/bin/pest --coverage --coverage-html coverage/
  ```
- **レポート活用法**  
  HTMLレポートの見方、未テスト部分の抽出、テスト優先度の決め方。

### 3-2. Vitestカバレッジ

- **プロバイダー比較**  
  `istanbul`と`v8`の特徴と選定理由。  

- **メモリ管理**  
  Node.jsのメモリ制限調整方法例（`NODE_OPTIONS=--max-old-space-size=4096`など）。  

- **ソースマップ問題対応**  
  ビルド設定とカバレッジの整合性確保方法。

---

## 4. デプロイ

- **現状の位置づけ**  
  本プロジェクトでは本番環境への自動デプロイは未設定。  

- **今後の検討事項**  
  - CI/CDパイプライン導入（GitHub Actionsなど）  
  - Laravelのキャッシュクリアやマイグレーション自動実行  
  - Viteビルドの本番配置とキャッシュ戦略  
  - 管理用ドキュメント集約ページを作成予定で、今後の各種ドキュメントをまとめて管理する計画です。

- **安定リリース運用のためのロールバック・バージョニング方針検討**

---

## 5. ドキュメント運用の提案

- **READMEの役割**  
  プロジェクトの全体像と主要ドキュメントへの明確な導線を示す。  

- **ドキュメント整理ルール**  
  更新手順、レビュー基準の策定。  

- **追加推奨ドキュメント**  
  - 開発フロー・ブランチ運用  
  - コミットメッセージ規約  
  - FAQ・トラブルシューティング  
  - セキュリティ方針・依存更新ルール  
  - 管理用ドキュメント集約ページを新設し、関連ドキュメントを一元管理する予定です。

---

## 6. 主要コマンド一覧と実行例

### 6-1. Composer (PHP) 関連コマンド

| コマンド名    | 内容                                           | 実行例                                      |
| ------------- | ---------------------------------------------- | ------------------------------------------- |
| `pest`        | Pestによるテスト実行                           | `composer run pest` または `php ./vendor/bin/pest`  |
| `pest-compact`| コンパクトなテスト結果で実行                   | `composer run pest-compact`                  |
| `coverage`    | カバレッジ計測付きテスト、HTMLレポート生成     | `composer run coverage`                       |
| `cvr`         | `coverage` と同じ                              | `composer run cvr`                            |

---

### 6-2. npm (JavaScript) 関連コマンド

| コマンド名 | 内容                                   | 実行例              |
| ---------- | ------------------------------------ | ------------------- |
| `test`     | Vitestでテスト実行                   | `npm run test`       |
| `t`        | `test` のショートカット               | `npm run t`          |
| `coverage` | カバレッジ測定付きテスト実行（ウォッチ）| `npm run coverage`   |
| `cvr`      | `coverage` のショートカット           | `npm run cvr`        |
| `c`        | `coverage` のショートカット           | `npm run c`          |
| `format`   | Prettierによるコードフォーマット      | `npm run format`     |

---

### 6-3. コンテナ内での実行例

- PHP（Pest）テスト実行  
  ```bash
  docker-compose exec app ./vendor/bin/pest
  ```

- カバレッジ測定付きPest実行  
  ```bash
  docker-compose exec app ./vendor/bin/pest --coverage --coverage-html coverage/
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
  - PHPのバージョンが対応しているか確認してください（推奨: 8.0以上）。  
  - 依存関係を最新化するために、`composer install`や`composer update`を実行してください。  
  - キャッシュが原因の場合は、`php artisan config:clear`などのキャッシュクリアコマンドを試してください。

- **Pest実行時にカバレッジが正しく生成されない**  
  - PestはPHPUnit互換なので、`--coverage`オプションを付けて実行してください。  
  - 生成されるカバレッジレポートの保存先は基本的に`coverage/`フォルダです。  

- **テスト結果の表示が冗長・簡潔にしたい**  
  - `--compact`オプションを使うことで、コンパクトな出力に変更できます。  
  - composerのスクリプトで`pest-compact`や`pestc`が設定されている場合があります。

---

### 7-2. Vitest関連のよくある問題と対処法

- **メモリエラー（heap out of memory）が発生する**  
  - Node.jsのメモリ制限を拡張するために、環境変数を指定して実行してください。  
    ```bash
    NODE_OPTIONS=--max-old-space-size=4096 npm run coverage
    ```  
  - メモリ不足が頻発する場合は、テスト対象の`include`・`exclude`設定を見直し不要なファイルを除外してください。

- **カバレッジレポートのソースマップ警告**  
  - 依存パッケージのソースマップが見つからない場合の警告はありますが、基本的には無視して問題ありません。  
  - ビルド設定や`vitest.config.ts`の`coverage`設定で対象範囲を適切に調整してください。

---

### 7-3. 環境構築・マイグレーションのトラブルシューティング

- **DB接続エラーが出る**  
  - `.env`の`DB_CONNECTION`、`DB_HOST`、`DB_PORT`、`DB_DATABASE`、`DB_USERNAME`、`DB_PASSWORD`の設定が正しいか再確認してください。  
  - ローカルのDBサーバーが起動しているか、接続可能かをチェックしてください。

- **マイグレーション・シーディングが失敗する**  
  - 先にDBのキャッシュをクリアしてください。  
    ```bash
    php artisan config:clear
    php artisan cache:clear
    ```  
  - マイグレーションファイルの記述ミスや、外部キー制約違反がないか確認してください。

- **Nodeモジュール関連の問題**  
  - 依存関係の不整合がある場合は、一度`node_modules`フォルダを削除し、再度インストールしてください。  
    ```bash
    rm -rf node_modules
    npm ci
    ```  
  - Node.jsのバージョンが推奨環境か確認し、必要ならバージョン管理ツールで切り替えてください。

---

### 7-4. カバレッジ測定時の注意点

- カバレッジ測定はメモリ消費が激しくなる場合があります。  
- 実行時に`heap out of memory`エラーが出たら、Node.jsのメモリ設定を調整してください。  
- 対象ファイルの範囲設定（`include`、`exclude`）を明確にし、無駄なファイルを含めないことが安定運用のポイントです。

---

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
