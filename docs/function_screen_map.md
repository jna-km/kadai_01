# 機能と画面の対応表（簡易一覧）

| ID   | 機能カテゴリ | 機能名 | 関連画面 | 種別 | 備考 |
|------|--------------|--------|----------|------|------|
| F01  | ユーザー管理 | ログイン・ログアウト | /login（ログイン画面）、/dashboard（ユーザーダッシュボード） | 共通 | 一般ユーザー・管理者共通 |
| F02  | ユーザー管理 | アカウント登録・編集 | /register（登録画面）、/profile/edit（プロフィール編集画面） | 一般 | 一般ユーザー向け |
| F03  | 予約管理 | 予約の確認・新規作成・編集・キャンセル | /reservations（予約一覧）、/reservations/new（予約フォーム）、/reservations/:id（予約詳細） | 一般 | 一般ユーザー向け |
| F04  | カレンダー連携 | Googleカレンダーとの連携設定 | /admin/settings/calendar（カレンダー設定画面） | 管理者 | OAuth認証による予約同期（時間に余裕があれば対応） |
| F05  | 管理設定 | 予約可能枠、営業時間、休憩、定休日の設定 | /admin/settings/schedule（管理設定画面） | 管理者 | 管理者専用 |
| F06  | 管理設定 | 予約状況の確認と管理 | /admin/reservations（予約一覧）、/admin/reservations/:id（詳細） | 管理者 | 管理者向け |
| F07  | お知らせ管理 | お知らせの投稿・閲覧 | /notices（お知らせ一覧）、/admin/notices/new（投稿画面） | 任意 | 任意機能（初期は省略可） |

---

## 簡易画面遷移メモ

```text
[一般ユーザーの流れ]
  └─ /login → /dashboard
                     ├─ /reservations（予約一覧）
                     │        ├─ /reservations/new（新規作成）
                     │        └─ /reservations/:id（詳細・編集・キャンセル）

[管理者の流れ]
  └─ /login → /dashboard（管理者向け表示）
                     ├─ /admin/reservations（予約一覧・検索）
                     │        └─ /admin/reservations/:id（予約詳細・管理）
                     └─ /admin/settings/schedule（営業時間・定休日などの設定）
                     └─ /admin/notices/new（お知らせ投稿）
                     └─ /admin/settings/calendar（Googleカレンダー連携設定）

[共通]
  └─ /register（アカウント作成） → /login
  └─ /profile/edit（プロフィール編集）
  └─ /notices（お知らせ一覧）

```

---

## 機能と画面の対応メモ（文章まとめ）

※このセクションでは、上記の簡易一覧に対してより詳細な設計意図や運用の補足を記述しています。

本システムにおける主要な機能と、それに対応する画面の対応関係を以下に整理します。

### 管理者機能と画面の対応

| ID   | 機能 | 対応する画面 | 備考 |
|------|------|----------------|------|
| F01  | 管理者ログイン         | /login（ログイン画面） | 一般ユーザーと共通 |
| F01  | ダッシュボード表示     | /dashboard（管理者向け表示） | ログイン後初期画面 |
| F06  | 予約一覧の確認         | /admin/reservations | 日付やユーザーで絞り込み |
| F05  | 予約枠の設定           | /admin/settings/schedule | 営業時間・休憩時間・定休日など |
| F06  | ユーザー予約状況確認   | /admin/reservations/:id | 管理者による確認と管理 |
| F02  | 管理者パスワード変更   | /profile/edit | プロフィール編集で対応予定 |
| F04  | Googleカレンダー連携設定 | /admin/settings/calendar | OAuth連携により予約をGoogleカレンダーと同期（時間があれば対応） |

### 一般ユーザー機能と画面の対応

| ID   | 機能 | 対応する画面 | 備考 |
|------|------|----------------|------|
| F03  | 予約の閲覧・登録       | /reservations, /reservations/new | 一般ユーザーのみアクセス可 |
| F03  | 予約詳細・キャンセル    | /reservations/:id | 自身の予約のみ閲覧可 |
| F02  | アカウント作成・編集   | /register, /profile/edit | 登録後は /login 画面へ遷移 |
| F01  | ログイン・ログアウト    | /login, /dashboard | 管理者と共通ページ |
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

--- フッター終了 ---
