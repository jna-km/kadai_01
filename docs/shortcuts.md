# 🚀 ショートカットコマンド早見表

Laravel + Docker 開発でよく使う `.sh` スクリプトや alias の一覧です。

---

## 🔧 .shスクリプト（scripts/ 配下）

| コマンド                      | 説明                             |
|------------------------------|----------------------------------|
| `./scripts/dc.sh`            | docker compose を実行           |
| `./scripts/into.sh`          | Laravelコンテナに入る            |
| `./scripts/update-footer.sh` | Markdownフッターを一括更新       |
<!-- | `./scripts/artisan.sh`       | artisanコマンドをラップする      | -->
<!-- | `./scripts/fresh.sh`         | migrate:fresh + seed を実行     | -->

---

## ⚡ エイリアス（~/.zshrc / ~/.bashrc）

```bash
alias dcb="docker compose exec app bash"
alias art="docker compose exec app php artisan"
alias fresh="docker compose exec app php artisan migrate:fresh --seed"
```
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
