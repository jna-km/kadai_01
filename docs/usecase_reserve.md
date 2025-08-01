# ユースケース（予約作成）

このドキュメントは、予約くんにおける「予約作成」機能について、ユースケースの観点から簡潔に整理したものである。

## 対象機能
- 予約作成（一般ユーザー）

## ユースケース一覧（現時点）

- UC01: 予約作成（一般ユーザー）  
  → ユーザーが予約内容と日時を入力し、予約を登録する

- UC02: 予約確認・キャンセル（一般ユーザー）  
  → ユーザーが自分の予約状況を確認し、必要に応じてキャンセルする

- UC03: 管理者による予約一覧確認・編集  
  → 管理者が全ユーザーの予約を一覧・検索し、内容を確認・変更・キャンセルできる

- UC04: 営業時間・定休日の設定（管理者）  
  → 管理者が曜日や時間帯ごとの予約受付条件を設定・更新する

- UC05: Googleカレンダー連携（管理者／任意機能）  
  → 管理者がGoogleカレンダーと予約システムを連携させることで、外部と同期を取る

## ユースケース要約
- 一般ユーザーが、予約可能な日時・内容を選択して予約を登録する

## 前提条件
- ユーザーはログイン済みである
- システム側に設定された予約枠が存在している

## 基本フロー
- ユーザーが「予約作成」画面を開く
- 日時・内容などの必要情報を選択・入力する
- 「予約する」ボタンを押す
- バリデーションチェックが実行される（入力必須・重複チェックなど）
- 問題がなければ、予約が登録され、完了画面または一覧画面に遷移する

## 代替フロー
- 入力が不完全な場合：エラーメッセージを表示し、画面に留まる
- 希望日時が埋まっていた場合：再選択を促す、または別の枠を提案する
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
