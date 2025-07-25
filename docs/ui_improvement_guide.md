# UI改善ガイド

---

## 1. 目的
- フォームUIのコード重複を排除し、メンテナンス性を向上させる。
- バリデーションエラー表示の一貫性とUX改善を実現する。

---

## 2. 対象コンポーネント
- Inputコンポーネント（テキスト、メール、パスワードなど）
- Selectコンポーネント（ドロップダウン）

---

## 3. ディレクトリ構成案
```
resources/js/components/ui/
├── Input.tsx
├── Select.tsx
```

---

## 4. Props設計

### Input Props
| Prop名       | 型                                    | 必須 | 説明                       |
|-------------|-------------------------------------|------|--------------------------|
| `label`     | `string`                            | ❌   | フィールドラベル          |
| `name`      | `string`                            | ✅   | フィールド名              |
| `type`      | `string`                            | ❌   | デフォルトは `text`       |
| `value`     | `string`                            | ✅   | 入力値                    |
| `onChange`  | `(e: React.ChangeEvent<HTMLInputElement>) => void` | ✅   | 値変更ハンドラ            |
| `placeholder` | `string`                          | ❌   | プレースホルダー          |
| `error`     | `string`                            | ❌   | バリデーションエラーメッセージ |

---

### Select Props
| Prop名      | 型                                  | 必須 | 説明                 |
|------------|-----------------------------------|------|--------------------|
| `label`    | `string`                          | ❌   | フィールドラベル      |
| `name`     | `string`                          | ✅   | フィールド名          |
| `options`  | `{ value: string; label: string }[]` | ✅   | 選択肢配列             |
| `value`    | `string`                          | ✅   | 選択中の値             |
| `onChange` | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | ✅ | 値変更ハンドラ         |
| `error`    | `string`                          | ❌   | バリデーションエラーメッセージ |

---

## 5. UI設計指針
- エラー表示は赤文字＋Input枠を赤色
- エラーメッセージは `error` Propで受け取り、Input/Select直下に表示
- classNameをPropsで追加可能にして拡張性を確保

---

## 6. 実装例

### Input.tsx
```tsx
interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, placeholder, error }) => (
  <div className="mb-4">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
```

### Select.tsx
```tsx
interface SelectProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, value, onChange, error }) => (
  <div className="mb-4">
    {label && <label htmlFor={name}>{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`border p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
```

---

## 7. バリデーションUX改善
- 表示タイミング：
  - `onBlur` 時に即時表示
  - Submit時に全体検証
- UI仕様：
  - エラー時：赤枠、下部にメッセージ
- 将来的にReact Hook Form対応を検討

---

## 8. 今後の拡張
- Inputに`type="password"`や`textarea`対応
- Selectに`disabled`、`multiple`対応
- i18nによるラベル翻訳
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
- [UI改善ガイド](ui_improvement_guide.md)
- [Laravel + Supervisor 設定ガイド](supervisor.md)
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

--- フッター終了 ---
