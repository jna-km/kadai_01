# 機能と画面の対応表（簡易一覧）

| 機能カテゴリ | 機能名 | 関連画面 | 備考 |
|--------------|--------|----------|------|
| ユーザー管理 | ログイン・ログアウト | /login（ログイン画面）、/dashboard（ユーザーダッシュボード） | 一般ユーザー・管理者共通 |
| ユーザー管理 | アカウント登録・編集 | /register（登録画面）、/profile/edit（プロフィール編集画面） | 一般ユーザー向け |
| 予約管理 | 予約の確認・新規作成・編集・キャンセル | /reservations（予約一覧）、/reservations/new（予約フォーム）、/reservations/:id（予約詳細） | 一般ユーザー向け |
| カレンダー連携 | Googleカレンダーとの連携設定 | /settings/calendar（カレンダー設定画面） | OAuth認証を利用 |
| 管理設定 | 予約可能枠、営業時間、休憩、定休日の設定 | /admin/settings/schedule（管理設定画面） | 管理者専用 |
| 管理設定 | 予約状況の確認と管理 | /admin/reservations（予約一覧）、/admin/reservations/:id（詳細） | 管理者向け |
| お知らせ管理 | お知らせの投稿・閲覧 | /notices（お知らせ一覧）、/admin/notices/new（投稿画面） | 任意機能（初期は省略可） |

---

## 簡易画面遷移メモ

```text
[一般ユーザーの流れ]
  └─ /login → /dashboard
                     ├─ /reservations（予約一覧）
                     │        ├─ /reservations/new（新規作成）
                     │        └─ /reservations/:id（詳細・編集・キャンセル）
                     └─ /settings/calendar（Googleカレンダー連携設定）

[管理者の流れ]
  └─ /login → /dashboard（管理者向け表示）
                     ├─ /admin/reservations（予約一覧・検索）
                     │        └─ /admin/reservations/:id（予約詳細・管理）
                     └─ /admin/settings/schedule（営業時間・定休日などの設定）
                     └─ /admin/notices/new（お知らせ投稿）

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

| 機能 | 対応する画面 | 備考 |
|------|----------------|------|
| 管理者ログイン         | /login（ログイン画面） | 一般ユーザーと共通 |
| ダッシュボード表示     | /dashboard（管理者向け表示） | ログイン後初期画面 |
| 予約一覧の確認         | /admin/reservations | 日付やユーザーで絞り込み |
| 予約枠の設定           | /admin/settings/schedule | 営業時間・休憩時間・定休日など |
| ユーザー予約状況確認   | /admin/reservations/:id | 管理者による確認と管理 |
| 管理者パスワード変更   | /profile/edit | プロフィール編集で対応予定 |

### 一般ユーザー機能と画面の対応

| 機能 | 対応する画面 | 備考 |
|------|----------------|------|
| 予約の閲覧・登録       | /reservations, /reservations/new | 一般ユーザーのみアクセス可 |
| 予約詳細・キャンセル    | /reservations/:id | 自身の予約のみ閲覧可 |
| Googleカレンダー連携   | /settings/calendar | OAuth 認証による連携 |
| アカウント作成・編集   | /register, /profile/edit | 登録後は /login 画面へ遷移 |
| ログイン・ログアウト    | /login, /dashboard | 管理者と共通ページ |