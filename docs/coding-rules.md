

# kadai_01 開発ルール

## 1. 基本コーディングスタイル

- PSR-12 に準拠
- 現時点ではコードチェックツールは使用しない

---

## 2. 命名規則（厳格）

| 対象 | 記法 | ルール・例 |
|------|------|------------|
| 変数（PHP） | `camelCase` | ✅ `$userName`, `$postList`<br>❌ `$User_name`, `$user_name` |
| メソッド名 | `camelCase` | ✅ `getUserById()`, `sendMail()` |
| クラス名 | `PascalCase` | ✅ `UserController`, `AuthService` |
| ファイル名（クラス系） | `PascalCase.php` | ✅ `UserService.php` |
| Bladeテンプレート内変数 | `snake_case` | ✅ `{{ $user_name }}`, `{{ $post_list }}`<br>❌ `{{ $userName }}` |
| JavaScript変数 | `camelCase` | ✅ `const userName = ...` |
| Bladeファイル名 | `snake_case.blade.php` | ✅ `user_profile.blade.php` |
| DBカラム名 | `snake_case` | ✅ `user_id`, `created_at`<br>❌ `userId` |
| Route名 | `kebab-case` | ✅ `/user-profile/edit`<br>❌ `/user_profile/edit` |

### 補足ルール
- ❌ 略語は禁止（`$usr`, `$cfg` など）
- ❌ 意味のない変数名禁止（`$a`, `$b` など）
- ✅ 単数形 / 複数形 を適切に
  - `$user`：1件, `$users`：配列/コレクション

---

## 3. レイヤー分類と役割

| 層 | 役割 | 詳細 |
|------|------|------|
| Controller | 入出力管理 | リクエスト受け取り、レスポンス返信のみ |
| Request | バリデーション | FormRequestを継承／入力値検証 |
| Service | ビジネスロジック | DB操作以外の動作はなるべくここに |
| Repository | DBアクセス | Eloquent / QueryBuilder を分離 |

---

## 4. 記述ルール

### Controller
- ロジックを持たずServiceに委譲
- 型定義、PHPDoc はなるべく付ける

### Service
- 単一責務、再利用性を意識
- 型定義 + 必要な場所にPHPDoc

### Request
- `authorize()` は true
- `rules()` のみを利用

### Repository
- DBロジックはここに分離
- 複雑なJOINや条件はここに集約

---

## 5. 型定義 + PHPDoc 例

```php
/**
 * @param int $id
 * @return \App\Models\User|null
 */
public function findById(int $id): ?User
```

---

## 6. 禁止事項

- ❌ Bladeに直接CSS/JSを記述すること
  - → Vite / `@vite` / `@push` を使用
- ❌ ControllerにロジックやDB操作を記述
- ❌ 変数に略語、意味のない名前を使用

---

## 7. 運用方針

- 現時点ではコードレビューなし
- PR または README に自分で実装方針や意図を記録
- 毎日の作業は `feature/kd01-YYYYMMDD` ブランチで管理
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
- [作業ログ（2025-07-07）](logs/2025-07-07.md)
- [画面遷移図（PDF）](画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](ワイヤーフレーム.pdf)

--- フッター終了 ---