<?php

use Illuminate\Support\Facades\Route;

// コントローラーのuse文を整理・追加
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckLoginController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\OperatorAuthController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TimeSlotController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkingHourController;


// ====================================================
// 公開ルート（認証不要なエンドポイント）
// ====================================================

// ユーザー認証
Route::post('/login', [AuthController::class, 'login'])->name('login');

// オペレーター認証
Route::post('/operator/login', [OperatorAuthController::class, 'login'])->name('operator.login');

// ログイン状態確認（デバッグ用など）
Route::get('/check-login', [CheckLoginController::class, 'check'])->name('check-login');

// 誰でも担当者一覧を取得（予約フォームで担当者リストをロードするため）
Route::get('/operators', [OperatorController::class, 'index'])->name('operators.index');

// デバッグ/疎通確認用
Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});


// ====================================================
// 認証済みルート（auth:sanctum ミドルウェアで保護）
// ====================================================
Route::middleware('auth:sanctum')->group(function () {

    // 共通の認証情報関連（ユーザー・オペレーター共通）
    // $request->user() で認証済みモデル（UserまたはOperator）が取得できる
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/me', [AuthController::class, 'me'])->name('me');

    // 予約関連
    // ユーザーは自分の予約を作成・閲覧でき、オペレーターは全予約を管理できる
    // この認可ロジックはコントローラー層またはGate/Policyで実装
    Route::apiResource('reservations', ReservationController::class);
    Route::get('/my-reservations', [ReservationController::class, 'myReservations'])->name('reservations.my');

    // ====================================================
    // 管理者専用ルート (例: オペレーターのみアクセス可能)
    // ここでは 'can:admin' のような認可ミドルウェアを適用することを強く推奨します。
    // このミドルウェアは App\Providers\AuthServiceProvider で定義します。
    // 例: Gate::define('admin', fn ($user) => $user instanceof \App\Models\Operator);
    // ====================================================
    Route::middleware('can:admin')->group(function () {
        // オペレーター管理 (indexは公開されているのでexceptで除外)
        Route::apiResource('operators', OperatorController::class)->except(['index']);

        // その他、管理者のみが操作できるリソース
        Route::apiResource('users', UserController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('notices', NoticeController::class);
        Route::apiResource('holidays', HolidayController::class);
        Route::apiResource('time-slots', TimeSlotController::class);
        Route::apiResource('working-hours', WorkingHourController::class);
    });
});
