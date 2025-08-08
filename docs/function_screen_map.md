# 機能と画面の対応表（現状最新版）

| ID   | 機能カテゴリ | 機能名 | 関連画面 | 種別 | 備考 |
|------|--------------|--------|----------|------|------|
| F01  | ユーザー管理 | ログイン・ログアウト | /user/login（ユーザーログイン）、/user/dashboard（ダッシュボード） | ユーザー | /user/dashboardはログイン必須 |
| F02  | ユーザー管理 | アカウント登録・編集 | ※未実装・検討中 | ユーザー | 今後の拡張候補 |
| F03  | 予約管理 | 予約の確認・新規作成・編集・キャンセル | /user/reserve（予約フォーム）、/user/reserve/complete（完了）、/user/reserve/confirm?token=xxx（確認） | ユーザー | カレンダー連動・バリデーションあり |
| F04  | お問い合わせ | お問い合わせ送信 | /user/contact | ユーザー | 任意機能 |
| F05  | 規約表示 | 利用規約・プライバシーポリシー | /user/terms, /user/privacy | ユーザー | 静的ページ |
| F06  | オペレーター管理 | ログイン・ダッシュボード | /operator/login, /operator/dashboard | オペレーター | ログイン必須 |
| F07  | オペレーター予約管理 | 予約一覧・新規追加・詳細・編集 | /operator/reservations, /operator/reservations/new, /operator/reservations/:id | オペレーター | 日付・状態でフィルタ可能 |
| F08  | オペレーター設定 | 営業時間・休業日・予約枠設定 | /operator/settings | オペレーター | |
| F09  | オペレーター管理 | パスワード変更 | /operator/profile/password | オペレーター | セキュリティ向上目的 |
| F10  | オペレーター管理 | 操作履歴の確認 | /operator/logs | オペレーター | 予約の更新／削除履歴など |
| F11  | メールテンプレ管理 | 通知メールテンプレ編集 | /operator/mails | オペレーター | 任意機能。文面カスタムなど |
| F12  | オペレーターアカウント管理 | アカウント管理 | /operator/users | オペレーター | 新規追加。今後拡張予定あり |
| F13  | 一般公開 | オペレーター一覧・詳細 | /operators, /operators/:id | ユーザー未登録 | 現状この2画面のみ。今後拡張可能性あり |

---

## 簡易画面遷移メモ

```text
[ユーザー]
  └─ /user/login → /user/dashboard
                     ├─ /user/reserve（予約フォーム）
                     │        └─ /user/reserve/complete（完了）
                     └─ /user/reserve/confirm?token=xxx（予約確認・キャンセル）
                     └─ /user/contact（問い合わせ）
                     └─ /user/terms, /user/privacy（規約・ポリシー）

[オペレーター]
  └─ /operator/login → /operator/dashboard
                     ├─ /operator/reservations（予約一覧）
                     │        ├─ /operator/reservations/new（新規作成）
                     │        └─ /operator/reservations/:id（詳細・編集）
                     └─ /operator/settings（設定）
                     └─ /operator/profile/password（パスワード変更）
                     └─ /operator/logs（操作履歴）
                     └─ /operator/mails（メールテンプレ管理）
                     └─ /operator/users（アカウント管理）

[ユーザー未登録者]
  └─ /operators（オペレーター一覧）
  └─ /operators/:id（オペレーター詳細）

```

---

## 機能と画面の対応メモ（文章まとめ）

- 各画面・機能のURLは `resources/js/router.tsx` の現状に準拠しています。
- 一部機能（例：ユーザーのアカウント登録・編集）は**未実装または検討中**です。今後の要件や運用方針に応じて追加・変更の可能性があります。
- ユーザー未登録者向け画面は現状「オペレーター一覧」「オペレーター詳細」のみです。今後拡張予定があれば追記してください。
- 画面ごとの「権限」や「アクセス制御」も今後明記すると運用・保守時の混乱防止に役立ちます。
- 画面遷移図PDFやワイヤーフレームPDFと連携し、画面間の遷移や操作フローも併記するとより分かりやすいです。
- 新規追加・削除・仕様変更があった場合は、必ずこの表も即時更新する運用を徹底してください。
- API連携や主要なUIコンポーネントも併記すると設計・実装・レビュー時に役立ちます。

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
- [2025-07期まとめ](logs/2025-07.md)
- [2025-08-08](logs/2025-08-08.md)

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
