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
- [ショートカット](shortcuts.md)
- [画面遷移図（PDF）](画面遷移図.pdf)
- [ワイヤーフレーム（PDF）](ワイヤーフレーム.pdf)

### 作業ログ
- [2025-07-07](logs/2025-07-07.md)
- [2025-07-08](logs/2025-07-08.md)
- [2025-07-09](logs/2025-07-09.md)

--- フッター終了 ---
