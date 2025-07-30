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
- onChangeベースのエラー表示も段階的に導入（リアルタイムバリデーション）

※Inputコンポーネントで `type="textarea"` を指定した場合も、バリデーション表示仕様（赤枠＋エラーメッセージ）は共通で適用される。

---

## 8. 今後の拡張
- Inputに`type="password"`や`textarea`対応
- Selectに`disabled`、`multiple`対応
- Textareaコンポーネントの追加と共通エラーハンドリング
- フォームの自動保存・バリデーション即時表示機能の検討
- Inputコンポーネント内で `type="textarea"` を指定した場合、自動で `<textarea>` を出力するように拡張

---

> 📝 **注意**：このガイドは2025年7月時点の構成に基づいており、以後のUI仕様変更により内容が変更される可能性があります。

## 9. UIデザイン共通ガイドライン（2025/07版）

### 9.1 カラーパレット（Color Palette）

| 用途       | カラーコード | 備考                             |
|------------|--------------|----------------------------------|
| メイン     | `#4A8BFF`     | ヘッダー、ボタンなど主に使用     |
| 背景       | `#F9FAFB`     | サイドバーなど淡色背景に         |
| 成功表示   | `#4CAF50`     | 成功・完了系メッセージ用         |
| エラー表示 | `#F44336`     | バリデーションなど               |
| テキスト   | `#333333`     | 基本文字                         |

### 9.2 レイアウト構成（Layout）

| 要素     | 説明                                                                 |
|----------|----------------------------------------------------------------------|
| Header   | 高さ60px、メインカラー `#4A8BFF` を背景に使用。右上にログアウトボタン配置。 |
| Sidebar  | 幅220px、背景色 `#F9FAFB`。リンク一覧は縦スクロール可能に。             |
| Footer   | 高さ50px。共通文言を中央寄せ。全ページで共通使用。                       |
| Main     | `padding: 2rem`。レスポンシブ対応。横スクロール禁止。                   |

### 9.3 フォームUI（Form Components）

| コンポーネント | 特徴                                                |
|----------------|-----------------------------------------------------|
| Input          | 枠線は `border-gray-300`。エラー時は `border-red-500` + メッセージ表示。type="textarea"指定で自動的に `<textarea>` を出力 |
| Select         | 同様に `border` 色変更と下部にエラー表示              |
| ErrorMessage   | 共通で `text-sm text-red-500` を使用                 |
| Textarea       | エラーハンドリングはInputと同様。行数指定や拡張可。             |

### 9.4 ボタン（Buttons）

| 種別   | 背景色     | テキスト色   | 補足                                               |
|--------|------------|--------------|----------------------------------------------------|
| 通常   | `#4A8BFF`  | `#ffffff`    | ホバー時に少し濃くなる、`type="submit"`を忘れずに指定      |
| 警告   | `#FFC107`  | `#000000`    | 確認系操作                                          |
| 削除   | `#F44336`  | `#ffffff`    | 破壊的操作                                           |
| 無効   | `#E0E0E0`  | `#9E9E9E`    | `cursor-not-allowed` 等追加                         |

### 9.5 その他

- **レスポンシブ**：スマホ時はサイドバー非表示／上部ナビに変更予定
- **文字サイズ**：基本 `text-base`。タイトル等は `text-xl`, `text-2xl`
- **フォント**：デフォルトシステムフォント（明朝などは避ける）
- **余白**：基本 `mb-4`, `py-2 px-4` をベースとする


## 10. アクセシビリティ対応（2025/07）

- **ラベルと入力欄の関連付け**: `label`要素の`htmlFor`と入力欄の`id`を必ず一致させる。
- **エラー表示の視認性**: 色だけでなくアイコンやテキストでもエラーを伝える。
- **キーボード操作**: Tabキーによる遷移順序、Enter/Spaceでのボタン操作を必ず確認。
- **ARIA属性**: 必要に応じて`aria-invalid`、`aria-describedby`を付与する。
- **コントラスト比**: テキストと背景のコントラスト比は4.5:1以上を推奨。

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
- [UIガイドライン](ui_guideline.md)
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
- [2025-07-28](logs/2025-07-28.md)
- [2025-07-29](logs/2025-07-29.md)
- [2025-07-30](logs/2025-07-30.md)

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
