<!DOCTYPE html>
<html>
<head>
    <title>予約くん - ダッシュボード</title>
</head>
<body>
    <h1>予約くん 管理メニュー</h1>

    <ul>
        <li><a href="{{ route('users.index') }}">ユーザー管理画面</a></li>
        <li><a href="{{ route('reservations.index') }}">予約一覧画面</a></li>
        <li><a href="{{ route('services.index') }}">サービス管理画面</a></li>
        <li><a href="{{ route('notices.index') }}">お知らせ管理画面</a></li>
        <li><a href="{{ route('working_hours.index') }}">勤務時間管理画面</a></li>
        <li><a href="{{ route('timeslots.index') }}">タイムスロット管理画面</a></li>
    </ul>
</body>
</html>
