# バリデーション設計仕様

---

## 1. バリデーション関連ファイル一覧

以下は本プロジェクトにおける主なバリデーション関連ファイルです。  
各ファイルの役割も簡潔に記載しています。

- `app/Http/Requests/UserStoreRequest.php`  
  → ユーザー新規登録時のバリデーションルール定義

- `app/Http/Requests/UserUpdateRequest.php`  
  → ユーザー情報更新時のバリデーションルール定義

- `app/Http/Controllers/UserController.php`  
  → バリデーション済みリクエストを受け取るコントローラー

- `app/Services/UserService.php`  
  → 複雑なビジネスロジックや追加チェックを実装

- `resources/js/components/form/Input.tsx`  
  → 入力コンポーネント。リアルタイムバリデーション補助を担当（※現状、リアルタイムバリデーションは未実装）

- `resources/js/components/form/Select.tsx`  
  → セレクトコンポーネント。バリデーション表示の補助を担当

---

## 2. バリデーションの実装場所

- **Laravelバックエンド**
  - Form Requestクラス（推奨）：`app/Http/Requests/UserStoreRequest.php` など  
    - バリデーションロジックを集約し、コントローラをシンプルに保つ
  - Controller：簡易なバリデーションや一時的な処理のみ
  - Service層：複雑な業務ロジックや複数モデルにまたがる場合

- **Reactフロントエンド**
  - 各フォームコンポーネント内で実装（例：`Input.tsx`、`Select.tsx`）
  - バリデーションライブラリ（React Hook Form, Yup, Zod等）の活用推奨
  - ※現状、unique制約やリアルタイムバリデーションは未実装

---

## 3. 主なバリデーションルールの種類

| ルール名      | 説明                                 | Laravel | React | 実装状況・備考                       |
|---------------|--------------------------------------|---------|-------|--------------------------------------|
| required      | 必須項目                             | ○       | ○     | 実装済                               |
| email         | メールアドレス形式                   | ○       | ○     | 実装済                               |
| unique        | DB内で一意                           | ○       | △（API連携）| **現状未実装。今後の拡張予定**      |
| confirmed     | パスワード確認（2回入力一致）         | ○       | ○     | 実装済                               |
| min/max       | 文字数・数値の最小/最大               | ○       | ○     | 実装済                               |
| regex         | 正規表現によるパターンチェック        | ○       | ○     | 実装済                               |
| date          | 日付形式                             | ○       | ○     | 実装済                               |
| numeric       | 数値のみ                             | ○       | ○     | 実装済                               |
| in/not_in     | 許可値・禁止値リスト                 | ○       | ○     | 実装済                               |
| リアルタイム  | JS側での即時バリデーション            | ×       | △     | **現状は未対応。今後のUI改善で検討** |

---

## 4. バリデーション実行のタイミング

- **Reactフロントエンド**
  - `onChange`：入力値変更時に即時バリデーション（※現状は未対応）
  - `onBlur`：入力欄からフォーカスが外れたタイミングでバリデーション
  - `submit`：フォーム送信時に全項目を一括検証

- **Laravelバックエンド**
  - コントローラ到達時（Form Requestで自動実行）

---

## 5. エラーメッセージの設計方針

- ユーザーが理解しやすい日本語で記述
- 具体的な入力例や修正方法を示す
- 複数エラーがある場合は、優先度の高いもの（必須→形式→長さ→重複）から表示
- フィールドごとに個別メッセージを設定
- Laravelでは`resources/lang/ja/validation.php`でカスタマイズ可能

---

## 6. アクセシビリティ対応

- エラー発生時は`aria-invalid="true"`を付与
- エラーメッセージは`aria-describedby`で入力欄と関連付け
- スクリーンリーダーでエラー内容が読み上げられるようにする
- 色だけでなくアイコンやテキストでもエラーを伝える

---

## 7. ユーザー誘導の方法

- エラー発生時は最初のエラー項目に自動でフォーカス移動
- 必要に応じてエラー欄までスクロール
- エラー箇所を赤枠やアイコンで強調
- 入力補助（例：プレースホルダー、説明文）を活用

---

## 8. UIバリデーション詳細化

### 8.1 エラーパターン一覧
- 必須未入力：赤枠＋「必須です」表示
- 形式不正（メールアドレス等）：赤枠＋「形式が正しくありません」表示
- 重複（unique）：赤枠＋「既に登録されています」表示（※現状は未実装）
- 文字数不足・超過：赤枠＋「○文字以上／以内で入力してください」表示
- 値範囲外：赤枠＋「有効な値を入力してください」表示
- 確認不一致：赤枠＋「一致しません」表示

### 8.2 操作フロー例
1. 入力開始
2. onChange/onBlurでバリデーション実行（※onChangeは今後対応予定）
3. エラーがあれば即時表示・フォーカス移動
4. エラー解消でUI更新
5. 全てOKならsubmit可能

### 8.3 表示方法と動作整理
- エラー時は赤枠＋メッセージ＋アイコン
- 最初のエラー項目に自動スクロール・フォーカス
- エラー解消時は即座にUI更新
- 複数エラー時は優先度順に表示

---

## 9. 実装例

### 9.1 Laravel Form Requestのルール記述例

```php
// filepath: app/Http/Requests/UserStoreRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '名前は必須です。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは8文字以上で入力してください。',
            'password.confirmed' => 'パスワードが一致しません。',
        ];
    }
}
```

### 9.2 React Inputコンポーネントのバリデーション補助例

```tsx
// filepath: resources/js/components/form/Input.tsx
import React from 'react';

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label, name, type = 'text', value, onChange, onBlur, placeholder, error
}) => (
  <div className="mb-4">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`border p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="text-red-500 text-sm" role="alert">
        {error}
      </p>
    )}
  </div>
);
```

---

## 10. 注意点・よくある失敗例

- バリデーションルールの漏れ（例：`confirmed`を忘れる）
- エラーメッセージが英語のまま（日本語化漏れ）
- エラー時に`aria-invalid`や`aria-describedby`を付与しない
- フロントとバックエンドでルールが不一致
- エラー発生時にフォーカス移動・スクロール誘導がない
- 複数エラーを一度に表示しすぎてユーザーが混乱

---

## 11. 補足・現状の実装範囲について

- unique制約やリアルタイムバリデーション（入力中の即時エラー表示）は現時点では未実装です。
- 今後、UI改善や要件追加に応じて順次対応予定です。
- ドキュメントと実装の差分が発生した場合は、必ず本ドキュメントも更新してください。

---

## 12. 参考リンク

- [Laravel バリデーション公式](https://laravel.com/docs/validation)
- [React Hook Form](https://react-hook-form.com/)
- [WCAG 2.1 アクセシビリティ基準](https://waic.jp/guideline/)

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

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
