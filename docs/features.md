# 機能一覧（予約くん）

## 管理者機能

| 機能名                     | 内容                                                     | 実装予定 |
|--------------------------|----------------------------------------------------------|----------|
| 管理者ログイン             | Breezeを使った認証機能                                  | ✅        |
| 予約一覧の閲覧             | 登録された予約データを一覧表示（削除のみ可能）           | ✅        |
| 予約削除                   | 管理者が予約を取り消す                                   | ✅        |
| 営業時間・定休日の設定     | 管理画面で時間や曜日の指定                              | ✅        |
| 臨時休業・休憩時間の設定   | カレンダーや時間範囲で指定可能                           | ✅        |
| 予約可能枠の設定           | 各日あたりの予約枠数を設定                               | ✅        |
| パスワード変更機能         | 管理者が自身のログインパスワードを変更可能             | ⬜️        |
| ログ閲覧機能               | 管理者がアクセスログや予約履歴を確認可能               | ⬜️        |
| メールテンプレート管理     | 管理者が通知メールの内容を編集                         | ⬜️        |

## 一般ユーザー機能

| 機能名                     | 内容                                                     | 実装予定 |
|--------------------------|----------------------------------------------------------|----------|
| 予約フォーム              | 名前・メール・日時を入力し送信                           | ✅        |
| 空き枠カレンダー表示       | 週または日単位で予約枠を表示（選択式）                   | ✅        |
| 完了通知メール            | 予約完了時に確認メール送信（Mailpit確認）                | ✅        |
| キャンセル機能             | メールのリンクから予約をキャンセル（予約ID or トークン） | ✅        |
| 予約確認画面              | 一般ユーザーが自身の予約内容を確認                     | ✅        |
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

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
