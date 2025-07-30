# UIガイドライン

## 1. 目的
- UI設計の標準化と統一
- アクセシビリティ対応の徹底
- 保守・拡張しやすいコンポーネント設計
- ドキュメントと実装の整合性担保

## 2. 適用範囲
- プロジェクト全体のフロントエンドUIコンポーネント
- 主にInput、Selectなどフォーム系コンポーネント
- バリデーションUI、エラー表示
- アクセシビリティ関連の属性付与と動作設計

## 3. 基本方針
- コンポーネントは `components/ui` と `components/form` に分類
- Tailwind CSS のユーティリティクラスを活用しつつ、スタイルの一貫性を保つ
- アクセシビリティ属性（`aria-*`）は必須
- バリデーションはリアルタイムかつ明確なエラーメッセージ表示
- ドキュメントは常に最新の実装に合わせて更新

## 4. 運用ルール
- UI改善や課題は `ui_improvement_guide.md` に記録
- PRレビュー時には本ガイドライン準拠のチェックを必須
- 実装例や使用例は都度ドキュメントに追記

## 5. コンポーネント設計例

### 5.1 Inputコンポーネント
- ラベルは必ず関連付ける（`htmlFor` と `id`）
- エラー時は赤枠＋赤テキストで明示
- `className` は拡張可能にし、Tailwindユーティリティでスタイル管理

#### Props設計
| Prop名       | 型                                    | 必須 | 説明                       |
|-------------|-------------------------------------|------|--------------------------|
| `label`     | `string`                            | ❌   | フィールドラベル          |
| `name`      | `string`                            | ✅   | フィールド名              |
| `type`      | `string`                            | ❌   | デフォルトは `text`       |
| `value`     | `string`                            | ✅   | 入力値                    |
| `onChange`  | `(e: React.ChangeEvent<HTMLInputElement>) => void` | ✅   | 値変更ハンドラ            |
| `placeholder` | `string`                          | ❌   | プレースホルダー          |
| `error`     | `string`                            | ❌   | バリデーションエラーメッセージ |

#### 実装例
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
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="text-red-500 text-sm">{error}</p>}
  </div>
);
```

### 5.2 Selectコンポーネント
- ラベルと入力欄の関連付け必須
- エラー時は赤枠＋赤メッセージ

#### Props設計
| Prop名      | 型                                  | 必須 | 説明                 |
|------------|-----------------------------------|------|--------------------|
| `label`    | `string`                          | ❌   | フィールドラベル      |
| `name`     | `string`                          | ✅   | フィールド名          |
| `options`  | `{ value: string; label: string }[]` | ✅   | 選択肢配列             |
| `value`    | `string`                          | ✅   | 選択中の値             |
| `onChange` | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | ✅ | 値変更ハンドラ         |
| `error`    | `string`                          | ❌   | バリデーションエラーメッセージ |

#### 実装例
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
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p id={`${name}-error`} className="text-red-500 text-sm">{error}</p>}
  </div>
);
```

### 5.3 DatePickerコンポーネント
- 日付入力はカレンダー表示＋直接入力対応
- エラー時は赤枠＋メッセージ

#### Props設計
| Prop名       | 型                                    | 必須 | 説明                       |
|-------------|-------------------------------------|------|--------------------------|
| `label`     | `string`                            | ❌   | フィールドラベル          |
| `name`      | `string`                            | ✅   | フィールド名              |
| `value`     | `string`（ISO8601形式推奨）        | ✅   | 選択中の日付              |
| `onChange`  | `(date: string) => void`            | ✅   | 日付変更ハンドラ          |
| `minDate`   | `string`                           | ❌   | 選択可能な最小日付        |
| `maxDate`   | `string`                           | ❌   | 選択可能な最大日付        |
| `error`     | `string`                            | ❌   | バリデーションエラーメッセージ |

#### 実装例
```tsx
interface DatePickerProps {
  label?: string;
  name: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, name, value, onChange, minDate, maxDate, error }) => (
  <div className="mb-4">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
      min={minDate}
      max={maxDate}
      className={`border p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="text-red-500 text-sm">{error}</p>}
  </div>
);
```

### 5.4 Buttonコンポーネント
- ホバー・フォーカス時に視覚的変化
- 無効状態は操作不可デザイン
- キーボード操作・スクリーンリーダー対応

#### Props設計
| Prop名      | 型                       | 必須 | 説明                             |
|-------------|--------------------------|------|----------------------------------|
| `type`      | `'button' | 'submit' | 'reset'` | ❌   | ボタンタイプ（デフォルトは`button`）|
| `variant`   | `'default' | 'warning' | 'danger' | 'disabled'` | ❌   | スタイルの種類                    |
| `onClick`   | `() => void`             | ❌   | クリック時の処理                  |
| `disabled`  | `boolean`                | ❌   | ボタンの有効/無効状態            |
| `children`  | `React.ReactNode`        | ✅   | ボタン内の表示内容                |

#### 実装例
```tsx
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'warning' | 'danger' | 'disabled';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
  warning: 'bg-yellow-400 text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500',
  disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'default',
  onClick,
  disabled = false,
  children,
}) => {
  const className = disabled ? variantClasses.disabled : variantClasses[variant];
  return (
    <button
      type={type}
      className={`${className} px-4 py-2 rounded`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};
```

## 6. アクセシビリティ対応基準
- すべてのインタラクティブ要素に適切な`aria-*`属性を付与
- キーボード操作が自然に行えるようにフォーカス管理を徹底
- スクリーンリーダーでの読み上げ順序を意識したDOM構造
- コントラスト比は4.5:1以上を推奨

## 7. バリデーションUI
- 入力エラーは色・アイコン・メッセージで明確に表示
- エラーメッセージは入力フィールドの近傍に表示
- リアルタイムバリデーションを実装

## 8. 今後の拡張
- Inputに`type="password"`や`textarea`対応
- Selectに`disabled`、`multiple`対応
- Textareaコンポーネントの追加と共通エラーハンドリング
- フォームの自動保存・バリデーション即時表示機能の検討
- Inputコンポーネント内で `type="textarea"` を指定した場合、自動で `<textarea>` を出力するように拡張

## 9. UIデザイン共通ガイドライン
- カラーパレット、レイアウト、フォームUI、ボタン、レスポンシブ、余白、フォントなどは表形式で整理
- 詳細は別途デザイン仕様書参照

## 10. ドキュメント運用ルール
- 本ガイドラインは実装に合わせて定期的に更新
- PRレビューでは本ガイドラインの遵守を必須
- すべてのコンポーネントは使用例・コードスニペットをドキュメントに追加

## 用語整理
- **運用ルール**：UIガイドライン全体の運用・レビュー・改善記録に関するルール
- **ドキュメント運用ルール**：このガイドライン文書自体の更新・管理・記載方法に関するルール

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
- [Zustand 状態管理ガイド](zustand_guide.md)
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
- [2025-07-28](logs/2025-07-28.md)
- [2025-07-29](logs/2025-07-29.md)
- [2025-07-30](logs/2025-07-30.md)

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
