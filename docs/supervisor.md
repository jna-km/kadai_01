
# Laravel + Supervisor 設定ガイド

## 1. Supervisorとは
- Laravelのキューワーカーやスケジューラーを常駐化するためのプロセスマネージャ。
- キュー（`php artisan queue:work`）やスケジュール（`php artisan schedule:run`）を自動再起動で運用。

---

## 2. インストール
```bash
sudo apt-get update
sudo apt-get install supervisor
```

---

## 3. 設定ファイルの作成
- 設定ファイルディレクトリ：`/etc/supervisor/conf.d/laravel-worker.conf`

```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/html/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/html/storage/logs/worker.log
stopwaitsecs=3600
```

---

## 4. Supervisorコマンド
```bash
# 設定読み込み
sudo supervisorctl reread
sudo supervisorctl update

# ステータス確認
sudo supervisorctl status

# 再起動
sudo supervisorctl restart laravel-worker:*
```

---

## 5. 運用メモ
- **ログ確認**：`tail -f storage/logs/worker.log`
- **障害対応**：`supervisorctl restart laravel-worker:*`
- **複数キュー対応**：`numprocs`を増やす or プログラム定義を複製。

---

## 6. 今後やること（メモ）
- 本番デプロイ時にSupervisor設定を追加。
- Horizonを導入する場合はSupervisorでHorizonを管理。
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

### 色々やること
- [今後のTODOメモ](todo.md)

--- フッター終了 ---
